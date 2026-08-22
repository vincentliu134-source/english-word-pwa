#!/usr/bin/env node
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'video-output', '星词探险-demo', 'frames');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 8765;
const debugPort = 9227;
const baseUrl = `http://127.0.0.1:${port}/enhanced-word-tool.html`;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function startStaticServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
      const decodedPath = decodeURIComponent(url.pathname === '/' ? '/enhanced-word-tool.html' : url.pathname);
      const resolved = path.resolve(root, `.${decodedPath}`);
      if (!resolved.startsWith(root)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      const stat = await fs.stat(resolved);
      const filePath = stat.isDirectory() ? path.join(resolved, 'index.html') : resolved;
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'content-type': mimeTypes[ext] || 'application/octet-stream',
        'cache-control': 'no-store',
      });
      res.end(await fs.readFile(filePath));
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

class CdpClient {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result || {});
        return;
      }
      if (message.method && this.listeners.has(message.method)) {
        for (const listener of this.listeners.get(message.method)) listener(message.params || {});
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 15000);
    });
  }

  once(method) {
    return new Promise((resolve) => {
      const listener = (params) => {
        this.listeners.get(method)?.delete(listener);
        resolve(params);
      };
      if (!this.listeners.has(method)) this.listeners.set(method, new Set());
      this.listeners.get(method).add(listener);
    });
  }
}

async function connectToChrome() {
  for (let i = 0; i < 80; i++) {
    try {
      const tabs = await fetch(`http://127.0.0.1:${debugPort}/json`).then((res) => res.json());
      const tab = tabs.find((item) => item.type === 'page');
      if (tab?.webSocketDebuggerUrl) {
        const ws = new WebSocket(tab.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => {
          ws.addEventListener('open', resolve, { once: true });
          ws.addEventListener('error', reject, { once: true });
        });
        return new CdpClient(ws);
      }
    } catch {
      await wait(250);
    }
  }
  throw new Error('无法连接 Chrome DevTools');
}

async function capture(client, fileName) {
  await client.send('Runtime.evaluate', {
    expression: 'window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0;',
  });
  await wait(500);
  const result = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  await fs.writeFile(path.join(outputDir, fileName), Buffer.from(result.data, 'base64'));
}

async function evaluate(client, expression) {
  return client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
}

async function click(client, selector, settleMs = 900) {
  await evaluate(client, `
    (() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) throw new Error('Missing selector: ${selector}');
      el.scrollIntoView({ block: 'center', inline: 'center' });
      el.click();
      return true;
    })()
  `);
  await wait(settleMs);
}

async function seedDemoStorage(client) {
  const today = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();
  const demoWords = [
    { english: 'taste', chinese: '品尝', word_type: '动词', unit: 'Unit 1' },
    { english: 'soup', chinese: '汤', word_type: '名词', unit: 'Unit 1' },
    { english: 'idea', chinese: '主意；想法', word_type: '名词', unit: 'Unit 1' },
    { english: 'bring', chinese: '带来', word_type: '动词', unit: 'Unit 1' },
    { english: 'happy', chinese: '高兴的', word_type: '形容词', unit: 'Unit 1' },
  ];
  const records = [
    {
      grade: 'grade6',
      gradeText: '六年级',
      difficulty: 'easy',
      difficultyText: '基础',
      source: 'default',
      startTime: today,
      finishTime: today,
      score: 96,
      accuracy: 96,
      correctCount: 24,
      wrongCount: 1,
      firstWrongCount: 1,
      usedTime: 96,
      totalCount: 25,
      requestedCount: 10,
      status: 'completed',
      words: demoWords,
      wordAnswerRecords: demoWords.map((word, index) => ({
        english: word.english,
        chinese: word.chinese,
        firstAnswerCorrect: index !== 1,
        isCorrect: index !== 1,
        attemptCount: index === 1 ? 2 : 1,
        questionType: index === 1 ? 'spelling' : 'meaning_error',
        errorType: index === 1 ? 'spelling_error' : '',
      })),
    },
    {
      grade: 'grade6',
      gradeText: '六年级',
      difficulty: 'easy',
      difficultyText: '基础',
      source: 'default',
      startTime: yesterday,
      finishTime: yesterday,
      score: 90,
      accuracy: 90,
      correctCount: 9,
      wrongCount: 1,
      firstWrongCount: 1,
      usedTime: 83,
      totalCount: 10,
      requestedCount: 10,
      status: 'completed',
      words: demoWords,
      wordAnswerRecords: demoWords.map((word, index) => ({
        english: word.english,
        chinese: word.chinese,
        firstAnswerCorrect: index !== 2,
        isCorrect: index !== 2,
        attemptCount: index === 2 ? 2 : 1,
        questionType: index === 2 ? 'audio_to_english' : 'english_to_chinese',
        errorType: index === 2 ? 'pronunciation_error' : '',
      })),
    },
  ];
  await evaluate(client, `
    (() => {
      localStorage.setItem('englishWordStarProfile', JSON.stringify({
        totalStars: 50,
        todayStars: 8,
        streak: 3,
        date: new Date().toISOString().slice(0, 10),
        lastTitle: '英语冒险家'
      }));
      localStorage.setItem('englishWordStudyRecords', ${JSON.stringify(JSON.stringify(records))});
      localStorage.setItem('englishWordReviewQueue', JSON.stringify({
        soup: { english: 'soup', chinese: '汤', dueAt: new Date().toISOString(), priority: 95, reason: 'spelling_error' },
        idea: { english: 'idea', chinese: '主意；想法', dueAt: new Date().toISOString(), priority: 82, reason: 'pronunciation_error' }
      }));
    })()
  `);
}

async function fillDemoReadingStory(client) {
  await evaluate(client, `
    (() => {
      const words = [
        { english: 'taste', chinese: '品尝', partOfSpeech: 'verb', example_sentence: 'Please taste the soup.' },
        { english: 'soup', chinese: '汤', partOfSpeech: 'noun', category: 'food' },
        { english: 'idea', chinese: '主意；想法', partOfSpeech: 'noun', category: 'school' }
      ];
      const story = window.StoryCore?.createStory(words, { limit: 3 }) || {
        title: '今日单词小故事',
        targetWords: words,
        sentences: ['Mia reads words.', 'Please taste the soup.', 'Mia has an idea.'],
        questions: [],
        cloze: null
      };
      const readingEmpty = document.querySelector('#reading-empty');
      const readingContent = document.querySelector('#reading-content');
      const title = document.querySelector('#reading-title');
      const targets = document.querySelector('#reading-target-words');
      const storyEl = document.querySelector('#reading-story');
      const questionList = document.querySelector('#reading-questions-list');
      const clozeList = document.querySelector('#reading-cloze-list');
      const progress = document.querySelector('#reading-progress-summary');
      if (title) title.textContent = story.title || '今日单词小故事';
      if (readingEmpty) readingEmpty.classList.add('hidden');
      if (readingContent) readingContent.classList.remove('hidden');
      if (targets) {
        targets.innerHTML = story.targetWords.map(word => '<span class="reading-target-word">' + word.english + ' · ' + word.chinese + '</span>').join('');
      }
      if (storyEl) {
        const keywordMap = new Map(story.targetWords.map(word => [word.english.toLowerCase(), word.chinese]));
        storyEl.innerHTML = story.sentences.map(sentence => {
          let line = sentence;
          for (const [english, chinese] of keywordMap.entries()) {
            const re = new RegExp('\\\\b(' + english + ')\\\\b', 'gi');
            line = line.replace(re, '<span class="reading-keyword" role="button" tabindex="0" data-chinese="' + chinese + '">$1</span>');
          }
          return '<p><button class="reading-line-audio">🔊</button>' + line + '</p>';
        }).join('');
      }
      const renderOptions = (question) => question.options.map(option => '<button class="reading-option bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 text-sm font-bold">' + option + '</button>').join('');
      if (questionList) {
        questionList.innerHTML = story.questions.map(question =>
          '<section class="reading-question-card"><h3 class="font-bold text-gray-800 mb-3">' + question.text + '</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-2">' + renderOptions(question) + '</div></section>'
        ).join('');
      }
      if (clozeList && story.cloze) {
        clozeList.innerHTML = '<section class="reading-question-card"><h3 class="reading-cloze-sentence mb-3">' + story.cloze.text + '</h3><p class="text-sm text-gray-500 mb-3">提示中文：' + story.cloze.word.chinese + '</p><div class="grid grid-cols-1 sm:grid-cols-3 gap-2">' + renderOptions(story.cloze) + '</div></section>';
      }
      if (progress) progress.textContent = '阅读题：0/3';
      window.scrollTo(0, 0);
    })()
  `);
  await wait(500);
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  if (!(await fileExists(chromePath))) {
    throw new Error(`找不到 Chrome：${chromePath}`);
  }

  const server = await startStaticServer();
  const profileDir = await fs.mkdtemp(path.join(os.tmpdir(), 'starword-demo-profile-'));
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profileDir}`,
    '--window-size=1920,1080',
    `${baseUrl}?capture=${Date.now()}`,
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  try {
    const client = await connectToChrome();
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const load = client.once('Page.loadEventFired');
    await client.send('Page.navigate', { url: `${baseUrl}?capture=${Date.now()}` });
    await load;
    await wait(1800);
    await seedDemoStorage(client);
    const reload = client.once('Page.loadEventFired');
    await client.send('Page.reload', { ignoreCache: true });
    await reload;
    await wait(2500);

    await capture(client, '01-home.png');

    await click(client, '#learn-first-btn', 1800);
    await capture(client, '02-learn-picture.png');

    await click(client, '#preview-main-action-btn', 1800);
    await capture(client, '03-learn-listen-memory.png');

    await click(client, '#preview-main-action-btn', 1800);
    await capture(client, '04-learn-active-recall.png');

    await click(client, '#back-to-start-from-preview-btn', 900);
    await click(client, '#direct-game-btn', 1500);
    await capture(client, '05-challenge.png');

    await click(client, '#back-to-start-from-game-btn', 900);
    await click(client, '#reading-btn', 1600);
    await fillDemoReadingStory(client);
    await capture(client, '06-reading-story.png');

    await click(client, '#back-to-start-from-reading-btn', 900);
    await click(client, '#analysis-btn', 1600);
    await capture(client, '07-data.png');

    await click(client, '#back-to-start-from-analysis-btn', 900);
    await capture(client, '08-closing-home.png');

    console.log(`已生成截图：${outputDir}`);
  } finally {
    chrome.kill('SIGTERM');
    server.close();
    await fs.rm(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }).catch(() => {});
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
