import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
function loadBrowserModule(relativePath) {
  const window = {};
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  vm.runInNewContext(source, { window, console });
  return window;
}

test("完整词库覆盖六个年级和三档难度", () => {
  const { WordDatabaseModule } = loadBrowserModule("assets/js/modules/word-database.js");
  assert.deepEqual(Object.keys(WordDatabaseModule.database), ["grade1", "grade2", "grade3", "grade4", "grade5", "grade6"]);
  for (const levels of Object.values(WordDatabaseModule.database)) {
    for (const level of ["easy", "medium", "hard"]) assert.ok(levels[level].length >= 5);
  }
  assert.equal(Object.values(WordDatabaseModule.database.grade6).flat().length, 143);
});

test("六年级 143 个本地图片路径全部存在", () => {
  const { WordDatabaseModule } = loadBrowserModule("assets/js/modules/word-database.js");
  const words = Object.values(WordDatabaseModule.database.grade6).flat();
  const missing = words.filter((word) => !word.image || !fs.existsSync(path.join(root, word.image)));
  assert.deepEqual(missing, []);
});

test("Excel 行别名归一化并通过统一校验", () => {
  const { ImportCore } = loadBrowserModule("assets/js/modules/import-core.js");
  assert.equal(ImportCore.TEMPLATE_HEADERS.length, 34);
  const row = ImportCore.normalizeRow({
    年级: "六年级", 难度: "hard", 英文: "morning tea", 中文: "早茶", Unit: "Unit 1", 词性: "phr.",
    "listen_tip_听一听": "先听再读。", "example_sentence_跟着说": "We have morning tea.",
    "memory_tip_记忆小窍门": "想象早茶。", "spelling_secret_拼写小秘密": "两个词分开写。",
    主动回忆题型: "meaning_to_word;phrase_order", 展示模式: "phrase", spelling_test_mode: "phrase_order",
    "chunk_tip_拆开记": "morning / tea", show_chunk_tip: true,
  });
  row.rowNumber = 2;
  assert.equal(ImportCore.gradeKey(row.grade), "grade6");
  assert.equal(ImportCore.validateRows([row]).length, 0);
});

test("游戏抽词不重复、答案标准化稳定", () => {
  const { GameCore } = loadBrowserModule("assets/js/modules/game-core.js");
  assert.equal(GameCore.normalizeAnswer("Queen’s Park!"), "queenspark");
  const selected = GameCore.selectWords(["a", "b", "c", "d"], 3, () => 0.5);
  assert.equal(selected.length, 3);
  assert.equal(new Set(selected).size, 3);
});

test("统计口径按真实题量汇总", () => {
  const { StatisticsCore } = loadBrowserModule("assets/js/modules/statistics-core.js");
  const result = StatisticsCore.summarize([
    { totalCount: 5, correctCount: 4 },
    { words: [{}, {}, {}], correctCount: 2 },
  ]);
  assert.equal(result.totalStudies, 2);
  assert.equal(result.totalWords, 8);
  assert.equal(result.accuracy, 75);
});

test("HTML 按依赖顺序加载模块和主程序", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const modules = ["word-database.js", "import-core.js", "game-core.js", "statistics-core.js", "enhanced-word-tool.js"];
  const positions = modules.map((name) => html.indexOf(name));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.equal((html.match(/<script\b/g) || []).length, (html.match(/<\/script>/g) || []).length);
});

test("PWA 安装配置完整", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
  const serviceWorker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

  assert.match(html, /<link rel="manifest" href="manifest\.webmanifest">/);
  assert.match(html, /navigator\.serviceWorker\.register\('\.\/service-worker\.js'\)/);
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "./enhanced-word-tool.html");
  assert.ok(manifest.icons.length >= 3);
  for (const icon of manifest.icons) {
    assert.ok(fs.existsSync(path.join(root, icon.src)));
  }
  for (const requiredAsset of ["./enhanced-word-tool.html", "./assets/js/enhanced-word-tool.js", "./assets/css/preview-redesign.css"]) {
    assert.ok(serviceWorker.includes(requiredAsset));
  }
});
