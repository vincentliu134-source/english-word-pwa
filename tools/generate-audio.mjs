#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const databasePath = path.join(root, "assets/js/modules/word-database.js");
const audioRoot = path.join(root, "assets/audio");

const args = new Map();
for (const rawArg of process.argv.slice(2)) {
  const match = rawArg.match(/^--([^=]+)(?:=(.*))?$/);
  if (match) {
    args.set(match[1], match[2] ?? "true");
  }
}

const options = {
  grade: args.get("grade") || "",
  difficulty: args.get("difficulty") || "",
  word: args.get("word") || "",
  voice: args.get("voice") || "Samantha",
  force: args.get("force") === "true",
  dryRun: args.get("dry-run") === "true",
  limit: Number.parseInt(args.get("limit") || "0", 10) || 0
};

function commandExists(command) {
  const result = spawnSync("which", [command], { encoding: "utf8" });
  return result.status === 0;
}

function fail(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function loadWordDatabase() {
  const source = fs.readFileSync(databasePath, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: databasePath });
  const module = sandbox.window.WordDatabaseModule;
  if (!module?.database || !module?.counts) {
    fail("没有在 word-database.js 中读到 WordDatabaseModule。");
  }
  return { database: module.database, counts: module.counts };
}

function slugify(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "word";
}

function collectJobs(database) {
  const jobs = [];
  Object.entries(database).forEach(([gradeKey, difficultyMap]) => {
    if (options.grade && options.grade !== gradeKey && options.grade !== gradeKey.replace("grade", "")) return;

    Object.entries(difficultyMap).forEach(([difficultyKey, words]) => {
      if (options.difficulty && options.difficulty !== difficultyKey) return;

      words.forEach((word, index) => {
        const english = String(word.english || "").trim();
        const sentence = String(word.exampleSentence || word.example_sentence || word.example || "").trim();
        if (!english) return;
        if (options.word && english.toLowerCase() !== options.word.toLowerCase()) return;

        const baseName = `${String(index + 1).padStart(3, "0")}-${slugify(english)}`;
        const wordAudioRel = `assets/audio/words/${gradeKey}/${difficultyKey}/${baseName}.mp3`;
        jobs.push({
          kind: "word",
          text: english,
          rate: 145,
          outputRel: wordAudioRel,
          word
        });

        if (sentence) {
          const sentenceAudioRel = `assets/audio/sentences/${gradeKey}/${difficultyKey}/${baseName}.mp3`;
          jobs.push({
            kind: "sentence",
            text: sentence,
            rate: 132,
            outputRel: sentenceAudioRel,
            word
          });
        }
      });
    });
  });

  const pending = jobs.filter((job) => {
    if (options.force) return true;
    if (!fs.existsSync(path.join(root, job.outputRel))) return true;
    if (job.kind === "word") {
      return !String(job.word.audioUrl || job.word.audio_url || job.word.audio || "").trim();
    }
    return !String(job.word.sentenceAudioUrl || job.word.sentence_audio_url || job.word.sentenceAudio || "").trim();
  });

  return options.limit > 0 ? pending.slice(0, options.limit) : pending;
}

function speakToMp3(text, outputRel, rate) {
  const outputPath = path.join(root, outputRel);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const tempAiff = path.join(os.tmpdir(), `word-audio-${Date.now()}-${Math.random().toString(16).slice(2)}.aiff`);
  const sayResult = spawnSync("say", ["-v", options.voice, "-r", String(rate), "-o", tempAiff, text], {
    encoding: "utf8"
  });
  if (sayResult.status !== 0) {
    throw new Error((sayResult.stderr || sayResult.stdout || "say 生成失败").trim());
  }

  const ffmpegResult = spawnSync("ffmpeg", [
    "-y",
    "-loglevel", "error",
    "-i", tempAiff,
    "-codec:a", "libmp3lame",
    "-q:a", "4",
    outputPath
  ], { encoding: "utf8" });

  fs.rmSync(tempAiff, { force: true });
  if (ffmpegResult.status !== 0) {
    throw new Error((ffmpegResult.stderr || ffmpegResult.stdout || "ffmpeg 转 MP3 失败").trim());
  }
}

function writeDatabase(database, counts) {
  const body = `/* 此文件由 tools/generate-audio.mjs 更新音频字段，请勿手工编辑。 */\n` +
    `(function (global) {\n` +
    `  const database = ${JSON.stringify(database, null, 2)};\n` +
    `  const counts = ${JSON.stringify(counts, null, 2)};\n` +
    `  global.WordDatabaseModule = Object.freeze({ database, counts });\n` +
    `})(window);\n`;
  fs.writeFileSync(databasePath, body, "utf8");
}

function main() {
  const { database, counts } = loadWordDatabase();
  const jobs = collectJobs(database);

  console.log(`准备生成 ${jobs.length} 条音频${options.dryRun ? "（dry-run，不写文件）" : ""}`);
  if (jobs.length === 0) {
    console.log("没有需要生成的音频。");
    return;
  }

  if (!options.dryRun) {
    if (process.platform !== "darwin") {
      fail("默认本地 TTS 使用 macOS 的 say 命令；请在 macOS 上运行，或后续扩展其他 provider。");
    }
    if (!commandExists("say")) {
      fail("未找到 macOS say 命令。");
    }
    if (!commandExists("ffmpeg")) {
      fail("未找到 ffmpeg，无法转成 MP3。可先安装：brew install ffmpeg");
    }
  }

  jobs.forEach((job, index) => {
    console.log(`[${index + 1}/${jobs.length}] ${job.kind === "word" ? "单词" : "例句"}: ${job.text} -> ${job.outputRel}`);
    if (!options.dryRun) {
      speakToMp3(job.text, job.outputRel, job.rate);
    }
    if (job.kind === "word") {
      job.word.audioUrl = job.outputRel;
      job.word.audio_url = job.outputRel;
      job.word.audio = job.outputRel;
    } else {
      job.word.sentenceAudioUrl = job.outputRel;
      job.word.sentence_audio_url = job.outputRel;
      job.word.sentenceAudio = job.outputRel;
    }
  });

  if (!options.dryRun) {
    writeDatabase(database, counts);
    console.log(`\n✅ 已生成音频并写回：${path.relative(root, databasePath)}`);
  }
}

main();
