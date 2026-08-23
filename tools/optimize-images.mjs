#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(decodeURIComponent(new URL("..", import.meta.url).pathname));
const sourceDir = path.join(root, "六年级单词图片");
const outputDir = path.join(root, "assets", "images", "optimized", "六年级单词图片");
const imageExtPattern = /\.(png|jpe?g)$/i;
const maxSize = process.env.WORD_IMAGE_MAX_SIZE || "1200x1200>";
const quality = process.env.WORD_IMAGE_QUALITY || "72";

function findMagick() {
  for (const command of ["magick", "convert"]) {
    const result = spawnSync("which", [command], { encoding: "utf8" });
    if (result.status === 0 && result.stdout.trim()) return command;
  }
  return "";
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

const magick = findMagick();
if (!magick) {
  console.error("未找到 ImageMagick。请先安装：brew install imagemagick");
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  console.error(`未找到图片目录：${sourceDir}`);
  process.exit(1);
}

const sourceImages = walk(sourceDir).filter((file) => imageExtPattern.test(file));
let converted = 0;
let skipped = 0;
let failed = 0;

for (const source of sourceImages) {
  const rel = path.relative(sourceDir, source);
  const target = path.join(outputDir, rel).replace(imageExtPattern, ".webp");
  fs.mkdirSync(path.dirname(target), { recursive: true });

  const sourceStat = fs.statSync(source);
  if (fs.existsSync(target)) {
    const targetStat = fs.statSync(target);
    if (targetStat.mtimeMs >= sourceStat.mtimeMs && targetStat.size > 0) {
      skipped += 1;
      continue;
    }
  }

  const args = [
    source,
    "-auto-orient",
    "-resize",
    maxSize,
    "-strip",
    "-quality",
    quality,
    target
  ];
  const result = spawnSync(magick, args, { encoding: "utf8" });
  if (result.status === 0) {
    converted += 1;
  } else {
    failed += 1;
    console.error(`转换失败：${rel}`);
    if (result.stderr) console.error(result.stderr.trim());
  }
}

const sourceSize = spawnSync("du", ["-sh", sourceDir], { encoding: "utf8" }).stdout.trim();
const outputSize = fs.existsSync(outputDir)
  ? spawnSync("du", ["-sh", outputDir], { encoding: "utf8" }).stdout.trim()
  : "0";

console.log(`图片优化完成：转换 ${converted}，跳过 ${skipped}，失败 ${failed}`);
console.log(`原图目录：${sourceSize}`);
console.log(`压缩目录：${outputSize}`);

if (failed > 0) process.exit(1);
