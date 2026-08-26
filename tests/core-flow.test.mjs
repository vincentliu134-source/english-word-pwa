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
  assert.equal(ImportCore.TEMPLATE_HEADERS.length, 36);
  const row = ImportCore.normalizeRow({
    年级: "六年级", 难度: "hard", 英文: "morning tea", 中文: "早茶", Unit: "Unit 1", 词性: "phr.",
    "listen_tip_听一听": "先听再读。", "example_sentence_跟着说": "We have morning tea.",
    "memory_tip_记忆小窍门": "想象早茶。", "spelling_secret_拼写小秘密": "两个词分开写。",
    "memory_strategy_记忆策略": "phrase;scene;spelling", "spelling_pattern_拼写挖空": "m______ tea",
    主动回忆题型: "meaning_to_word;phrase_order", 展示模式: "phrase", spelling_test_mode: "phrase_order",
    "chunk_tip_拆开记": "morning / tea", show_chunk_tip: true,
  });
  row.rowNumber = 2;
  assert.equal(ImportCore.gradeKey(row.grade), "grade6");
  assert.equal(ImportCore.validateRows([row]).length, 0);
});

test("记忆提示是可选字段，但显式策略必须有对应内容", () => {
  const { ImportCore } = loadBrowserModule("assets/js/modules/import-core.js");
  const base = {
    rowNumber: 2, grade: "6", difficulty: "easy", english: "map", chinese: "地图", unit: "Unit 1",
    partOfSpeech: "n.", readTip: "先听再读。", optimizedExample: "I read the map.",
    testFlow: "image_to_word;word_to_meaning", displayMode: "image_first", spellingTestMode: "partial_blank",
  };
  assert.equal(ImportCore.validateRows([base]).length, 0);
  assert.match(ImportCore.validateRows([{ ...base, memoryStrategy: "syllable" }])[0], /chunk_tip/);
  assert.match(ImportCore.validateRows([{ ...base, memoryStrategy: "magic" }])[0], /记忆策略无效/);
});

test("自适应记忆不强拆单音节词，只展示真正有用的卡片", () => {
  const { MemoryCore } = loadBrowserModule("assets/js/modules/memory-core.js");
  const taste = {
    english: "taste", showChunkTip: false, chunkTip: "tas-te", memoryStrategy: "scene;spelling",
    memoryTip: "想象舀一勺汤，先尝一口。", spellingSecret: "注意中间的 st，最后的 e 不发音。",
    spellingPattern: "t__t_",
  };
  assert.equal(MemoryCore.getChunkTip(taste), "");
  assert.equal(Array.from(MemoryCore.getAdaptiveCards(taste), card => card.type).join(","), "scene,spelling");
  assert.equal(MemoryCore.getSpellingPattern(taste), "t__t_");
  assert.equal(MemoryCore.getAdaptiveCards({ english: "map", memoryStrategy: "image", memoryTip: "看地图。" }).length, 0);
  assert.equal(MemoryCore.getChunkTip({ english: "airport", chunkTip: "air + port", showChunkTip: true, memoryStrategy: "compound" }), "air + port");
});

test("小故事优先选薄弱词，并生成2至4个目标词和3道简单检索题", () => {
  const { StoryCore } = loadBrowserModule("assets/js/modules/story-core.js");
  const story = StoryCore.createStory([
    { english: "soup", chinese: "汤", category: "food", exampleSentence: "Mia has hot soup." },
    { english: "taste", chinese: "品尝", category: "food", exampleSentence: "Please taste the soup.", status: "learning", wrong_count: 2 },
    { english: "tea", chinese: "茶", category: "food", exampleSentence: "Mia has some tea." },
    { english: "book", chinese: "书", category: "school", exampleSentence: "This is my book." },
    { english: "astronaut", chinese: "宇航员", category: "daily", exampleSentence: "请先在导入表填写自然例句。" },
  ]);
  assert.ok(story.targetWords.length >= 2 && story.targetWords.length <= 4);
  assert.equal(story.targetWords[0].english, "taste");
  assert.equal(story.questions.length + Number(Boolean(story.cloze)), 3);
  assert.ok(story.sentences.some(sentence => /taste/i.test(sentence)));
  assert.ok(story.sentences.every(sentence => !/导入表|自然例句/.test(sentence)));
  assert.ok(story.sentences.length <= 4);
  assert.ok(story.sentences.every(sentence => sentence.split(/\s+/).length <= 8));
  const alternate = StoryCore.createStory([
    { english: "soup", chinese: "汤", category: "food" },
    { english: "taste", chinese: "品尝", category: "food" },
    { english: "tea", chinese: "茶", category: "food" },
  ], { limit: 2, offset: 1 });
  assert.equal(alternate.targetWords[0].english, "taste");
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
  const modules = ["word-database.js", "import-core.js", "game-core.js", "statistics-core.js", "memory-core.js", "story-core.js", "enhanced-word-tool.js"];
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
  for (const requiredAsset of ["./enhanced-word-tool.html", "./assets/js/enhanced-word-tool.js", "./assets/js/modules/memory-core.js", "./assets/js/modules/story-core.js", "./assets/css/preview-redesign.css"]) {
    assert.ok(serviceWorker.includes(requiredAsset));
  }
});

test("手机端使用安全区视口和专用紧凑布局", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(html, /viewport-fit=cover/);
  assert.match(html, /apple-mobile-web-app-status-bar-style" content="black-translucent"/);
  assert.match(css, /MOBILE-POLISH-V31/);
  assert.match(css, /MOBILE-GAME-HEADER-V32/);
  assert.match(css, /MOBILE-GAME-OPTIONS-V33/);
  assert.match(css, /MOBILE-GAME-BALANCED-V34/);
  assert.match(css, /MOBILE-GAME-CARDLIKE-V35/);
  assert.match(css, /MOBILE-GAME-CENTERLINE-V36/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*#app-header \{[\s\S]*padding-top: max\(env\(safe-area-inset-top\), 10px\)/);
  assert.match(css, /body\.mode-game #game-screen \.game-header \{[\s\S]*grid-template-areas:[\s\S]*"mark title more home"[\s\S]*"score timer progress progress"/);
  assert.match(css, /html body\.mode-game #game-screen \.game-header \{[\s\S]*grid-template-areas:[\s\S]*"mark title title title more home"[\s\S]*"score score timer timer progress progress"/);
  assert.match(css, /body\.mode-game #game-screen \.game-header::before \{[\s\S]*content: "单词挑战"/);
  assert.match(css, /body\.mode-game #game-screen \.game-header \.app-mark \{[\s\S]*grid-area: mark !important/);
  assert.match(css, /body\.mode-game #game-screen \.active-recall-options \{[\s\S]*width: min\(100%, 360px\) !important[\s\S]*margin: 6px auto 0 !important/);
  assert.match(css, /body\.mode-game #game-screen \.score-box,[\s\S]*body\.mode-game #game-screen \.game-progress-chip \{[\s\S]*flex: 1 1 calc\(\(100% - 16px\) \/ 3\) !important/);
  assert.match(css, /body\.mode-game #game-screen \.active-recall-options \{[\s\S]*width: min\(100%, 340px\) !important[\s\S]*align-self: center !important/);
  assert.match(css, /html body\.mode-game #game-screen \.active-recall-options \{[\s\S]*width: min\(100%, 340px\) !important[\s\S]*justify-self: center !important/);
  assert.match(css, /body\.mode-reading #reading-screen \.reading-content \{[\s\S]*grid-template-columns: 1fr !important/);
});

test("产品品牌统一为星词探险，手机桌面使用短名星词", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

  assert.match(html, /<title>星词探险<\/title>/);
  assert.match(html, /<meta name="apple-mobile-web-app-title" content="星词">/);
  assert.match(html, /<h1[^>]*>星词探险<\/h1>/);
  assert.match(html, /小学英语 · 看图 · 听读 · 回忆/);
  assert.equal(manifest.name, "星词探险");
  assert.equal(manifest.short_name, "星词");
  assert.match(index, /<title>星词探险<\/title>/);
  assert.match(pkg.description, /星词探险/);
  assert.doesNotMatch(html, /小学英语单词记忆系统|小学英语 · 听读 · 回忆|>单词卡<|背单词|回到单词卡/);
});

test("卡片学习采用含拼写的固定六页核心流程", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const script = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const studyStart = html.indexOf('id="preview-study-step"');
  const helperStart = html.indexOf('id="preview-helper-step"');
  const quizStart = html.indexOf('id="preview-quiz-step"');
  const studyMarkup = html.slice(studyStart, helperStart);
  const helperMarkup = html.slice(helperStart, quizStart);

  assert.doesNotMatch(studyMarkup, /preview-word-audio-btn|preview-sentence-audio-btn/);
  assert.match(helperMarkup, /preview-word-audio-btn/);
  assert.match(helperMarkup, /preview-sentence-audio-btn/);
  assert.match(script, /const coreTypes = \['image_to_english', 'audio_to_english', 'english_to_chinese', 'spelling'\]/);
  assert.match(script, /previewQuizIndex \+ 3/);
  assert.match(script, /pageNumber}\/6/);
});

test("选择题点选即作答，只有拼写题显示按钮并支持回车", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const script = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(script, /e\.key === 'Enter'/);
  assert.match(script, /previewQuizSubmitBtn\.click\(\)/);
  assert.match(script, /function submitPreviewCurrentAnswer/);
  assert.match(script, /button\.addEventListener\('click', \(\) => submitPreviewChoiceAnswer\(option\)\)/);
  assert.match(script, /previewQuizSubmitBtn\.classList\.toggle\('hidden', !isSpelling\)/);
  assert.match(script, /\+1 记忆星/);
  assert.match(css, /preview-quiz-submit-btn\.hidden/);
  assert.doesNotMatch(script, /function selectPreviewChoiceAnswer/);
  assert.doesNotMatch(html, /enter-key-hint|↵ 回车/);
  assert.doesNotMatch(script, /enter-key-hint|↵ 回车/);
});

test("听单词与听句子卡片使用严格对称布局", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");
  assert.match(css, /preview-core-language[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /preview-core-audio,[\s\S]*preview-core-example[\s\S]*grid-template-columns: 104px minmax\(0, 1fr\)/);
});

test("首页按学习路径排列入口，词库管理移入学习设置", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");
  assert.equal((html.match(/id="(?:learn-first-btn|direct-game-btn|analysis-btn|excel-upload-btn|reading-btn)"/g) || []).length, 5);
  assert.match(css, /#start-screen \.compact-action-grid > button[\s\S]*background: linear-gradient\(135deg, #ff8a5b 0%, #f05f3c 100%\)/);
  const actionMarkup = html.slice(html.indexOf('class="playful-action-grid compact-action-grid"'), html.indexOf('</div>', html.indexOf('class="playful-action-grid compact-action-grid"')));
  assert.deepEqual([...actionMarkup.matchAll(/id="([^"]+)"/g)].map((match) => match[1]), ["learn-first-btn", "direct-game-btn", "reading-btn", "analysis-btn"]);
  assert.match(actionMarkup, /学新词/);
  assert.match(actionMarkup, /做挑战/);
  assert.match(actionMarkup, /读故事/);
  assert.match(actionMarkup, /看数据/);
  assert.match(html, /class="home-control-field home-control-settings-field"[\s\S]*for="toggle-settings-btn">学习设置<\/label>[\s\S]*class="settings-header-row"[\s\S]*id="excel-upload-btn"[\s\S]*词库设置[\s\S]*id="toggle-settings-btn"[\s\S]*展开设置/);
  assert.match(css, /\.compact-action-grid \.reading-home-action[\s\S]*grid-column: auto[\s\S]*justify-self: stretch/);
});

test("首页年级、难度和学习设置三条控件使用统一尺寸与节奏", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(html, /<div class="home-control-stack">[\s\S]*for="grade-select">年级<\/label>[\s\S]*id="grade-select"[\s\S]*for="difficulty">难度<\/label>[\s\S]*id="difficulty"[\s\S]*for="toggle-settings-btn">学习设置<\/label>/);
  assert.match(css, /FINAL-HOME-CONTROL-ROWS/);
  assert.match(css, /body\.mode-start #start-screen \.home-control-stack \{[\s\S]*--home-control-height: clamp\(56px, 6\.4vh, 66px\)/);
  assert.match(css, /body\.mode-start #start-screen \.home-control-field > select,[\s\S]*body\.mode-start #start-screen \.home-control-settings-field > \.playful-settings-shell \{[\s\S]*min-height: var\(--home-control-height\) !important[\s\S]*border-radius: 22px !important/);
  assert.match(css, /body\.mode-start #start-screen \.home-control-settings-field \.settings-header-actions \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /body\.mode-start #start-screen \.home-control-settings-field \.library-settings-btn,[\s\S]*body\.mode-start #start-screen \.home-control-settings-field \.settings-toggle-btn \{[\s\S]*border-radius: 999px !important/);
});

test("学习设置提供常用档位和自定义精确设置", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const script = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  assert.match(html, /data-word-count="5"/);
  assert.match(html, /data-word-count="20"/);
  assert.match(html, /data-study-time="5"/);
  assert.match(html, /data-study-time="20"/);
  assert.match(html, /id="word-count-custom-btn"/);
  assert.match(html, /id="time-custom-btn"/);
  assert.match(html, /id="word-count-input"/);
  assert.match(html, /id="time-input"/);
  assert.match(script, /function syncChoiceStates\(\)/);
  assert.match(script, /wordCustomMode = true/);
  assert.match(script, /timeCustomMode = true/);
});

test("首页只保留一条产品定位，移除重复学习流程文案", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  assert.match(html, /让单词真正记住/);
  assert.doesNotMatch(html, /今天的单词旅程|先看图听音|再自己想起来|一节课完成三件事|学新词，做小测，看复习建议|建议先卡片学习，再开始游戏/);
  assert.doesNotMatch(html, /playful-tag-row|playful-hero-copy|playful-home-note|playful-mini-missions/);
});

test("进入学习数据页始终回到顶部，并优先展示关键四项指标", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const script = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");
  const analysisMarkup = html.slice(html.indexOf('id="analysis-screen"'), html.indexOf('</main>'));

  assert.match(analysisMarkup, /学习数据/);
  assert.equal((analysisMarkup.match(/id="(?:total-studies|total-words-count|avg-accuracy|weak-words-count)"/g) || []).length, 4);
  assert.doesNotMatch(analysisMarkup, /id="(?:max-accuracy|first-wrong-words-count)"/);
  assert.match(script, /function goToAnalysisScreen\(\)[\s\S]*scrollToPageTop\(\)/);
  assert.match(script, /function scrollToPageTop\(\)[\s\S]*window\.scrollTo\(0, 0\)/);
  assert.match(css, /body\.mode-analysis main\.container[\s\S]*display: block !important/);
  assert.match(css, /body\.mode-analysis #analysis-screen \.analysis-grid[\s\S]*repeat\(4, minmax\(0, 1fr\)\)/);
});

test("导入页只保留上传主操作，细节说明按需展开", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");
  const importMarkup = html.slice(html.indexOf('id="excel-upload-screen"'), html.indexOf('id="preview-screen"'));

  assert.match(importMarkup, /导入自己的单词/);
  assert.match(importMarkup, /<details class="import-details">/);
  assert.match(importMarkup, /<summary>导入说明<\/summary>/);
  assert.doesNotMatch(importMarkup, /当前词库状态/);
  assert.match(css, /body\.mode-excel \.import-details/);
  assert.match(css, /body\.mode-excel \.upload-dropzone/);
});

test("游戏与结算页默认只展示主操作，其余操作按需展开", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  assert.match(html, /<details class="game-more-actions">[\s\S]*id="study-now-btn"[\s\S]*id="analysis-from-game-btn"/);
  assert.match(html, /<div class="end-primary-actions">[\s\S]*id="read-story-btn"[\s\S]*id="study-more-btn"/);
  assert.match(html, /<details class="end-more-actions">[\s\S]*id="restart-game-btn"[\s\S]*id="back-to-start-from-end-btn"/);
});

test("游戏页将进度和复习建议压缩为辅助信息，答题区保持主角", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const script = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const gameMarkup = html.slice(html.indexOf('id="game-screen"'), html.indexOf('id="end-screen"'));
  assert.match(gameMarkup, /<div id="word-count" class="game-progress-chip">/);
  assert.match(gameMarkup, /<div id="game-review-bar" class="game-review-bar">[\s\S]*id="today-review-summary"[\s\S]*id="start-review-btn"/);
  assert.doesNotMatch(gameMarkup, /<div id="word-count" class="word-count-pill">/);
  assert.match(script, /reviewBar\?\.classList\.add\('hidden'\)/);
});

test("字母拼写支持拖到任意固定槽位，并可交换或指定点击位置", () => {
  const script = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");
  assert.match(script, /selectedLetterIndices = Array\(sanitizeWordCharacters\(word\)\.length\)\.fill\(null\)/);
  assert.match(script, /function placeBankLetter\(bankIndex, targetPosition\)/);
  assert.match(script, /selectedLetterIndices\[targetPosition\] = bankIndex/);
  assert.match(script, /const replacedIndex = selectedLetterIndices\[targetPosition\]/);
  assert.match(script, /selectedTargetSlot = i/);
  assert.match(css, /\.answer-slot\.selected-target/);
});

test("应用标识使用固定单词卡图标，不再把当前年级当作 Logo", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
  const script = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  assert.equal((html.match(/class="app-mark/g) || []).length, 3);
  assert.doesNotMatch(html, /id="(?:preview|game|end)-grade-badge"/);
  assert.ok(manifest.icons.every((icon) => /word-cards-\d+\.png/.test(icon.src)));
  assert.ok(manifest.icons.every((icon) => fs.existsSync(path.join(root, icon.src))));
  assert.doesNotMatch(script, /previewGradeBadge\.textContent|gameGradeBadge\.textContent|endGradeBadge\.textContent/);
});

test("全局布局会随视口放大内容区并压缩顶部横幅", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(html, /<header id="app-header"/);
  assert.match(css, /--app-content-width: min\(1680px, calc\(100vw - \(var\(--app-gutter\) \* 2\)\)\)/);
  assert.match(css, /#app-header > \.container[\s\S]*min-height: calc\(var\(--app-header-height\) - 4px\)/);
  assert.match(css, /body\.mode-start #start-screen \.playful-home-layout[\s\S]*min-height: calc\(100svh/);
  assert.match(css, /body\.mode-reading #reading-screen \{ max-width: 1240px !important; \}/);
  assert.match(css, /@media \(max-width: 900px\) \{[\s\S]*grid-template-columns: 1fr;/);
});

test("四个首页入口使用统一的全视口工作区和对称响应式栅格", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(css, /body\.mode-preview main\.container,[\s\S]*body\.mode-analysis main\.container \{[\s\S]*min-height: calc\(100svh - var\(--app-header-height\)\)/);
  assert.match(css, /body\.mode-preview #preview-screen,[\s\S]*body\.mode-analysis #analysis-screen \{[\s\S]*max-width: var\(--app-content-width\)/);
  assert.match(css, /body\.mode-game #game-screen \.game-card \{[\s\S]*min-height: min\(570px/);
  assert.match(css, /body\.mode-reading #reading-screen \.reading-content \{[\s\S]*grid-template-columns: minmax\(0, 1\.15fr\) minmax\(320px, 0\.85fr\)/);
  assert.match(css, /body\.mode-analysis #analysis-screen \.analysis-grid \{[\s\S]*repeat\(4, minmax\(0, 1fr\)\)/);
});

test("首页左右面板等高，主视觉和四个入口会用完可用高度", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(html, /<body class="theme-playful mode-start/);
  assert.match(html, /class="home-hero-intro"/);
  assert.match(html, /class="home-hero-steps"/);
  assert.match(css, /@media \(min-width: 901px\) \{[\s\S]*\.playful-home-main \{[\s\S]*display: flex !important/);
  assert.match(css, /\.playful-hero \{[\s\S]*flex: 1 1 auto;[\s\S]*justify-content: center;/);
  assert.match(css, /\.compact-action-grid \{[\s\S]*grid-template-rows: repeat\(2, minmax\(clamp\(58px, 8vh, 86px\), 1fr\)\)/);
});

test("学习页与首页使用同一全宽画布，答案区域仍保持易读宽度", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(css, /FINAL-WIDE-CANVAS/);
  assert.match(css, /body\.mode-preview #preview-screen,[\s\S]*body\.mode-excel #excel-upload-screen \{[\s\S]*max-width: none !important/);
  assert.match(css, /body\.mode-preview #preview-screen #single-word-card,[\s\S]*body\.mode-game #game-screen \.game-card \{[\s\S]*width: 100% !important/);
  assert.match(css, /body\.mode-game #game-screen \.game-card > h2,[\s\S]*width: min\(100%, 1060px\)/);
});

test("卡片学习、开始游戏和今日故事复用学习数据页的卡片外壳", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(css, /FINAL-DATA-PAGE-SHELL/);
  assert.match(css, /body\.mode-preview #preview-screen \.preview-header,[\s\S]*body\.mode-reading #reading-screen \.page-header \{[\s\S]*border-radius: 28px !important/);
  assert.match(css, /body\.mode-preview #preview-screen #single-word-card,[\s\S]*body\.mode-game #game-screen \.game-card,[\s\S]*body\.mode-reading #reading-screen \.reading-content \{[\s\S]*background: linear-gradient\(180deg, #fffefd 0%, #fffaf2 100%\) !important/);
  assert.match(css, /body\.mode-reading #reading-screen \.reading-actions \{[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\) !important/);
});

test("听读与记忆的四个选项使用接近一致的卡片高度", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(html, /preview-redesign\.css\?v=20260825-mobile-game-centerline-v36/);
  assert.match(css, /FINAL-HELPER-EQUAL-CARDS/);
  assert.match(css, /\.preview-core-audio,[\s\S]*\.preview-core-example,[\s\S]*\.helper-card \{[\s\S]*min-height: clamp\(96px, 12vh, 124px\)/);
  assert.match(css, /\.helper-card \{[\s\S]*height: 100% !important[\s\S]*justify-content: center/);
});

test("听读与记忆页会按可见卡片数量动态等高均分", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(js, /previewHelperStep\.dataset\.helperCardCount = String\(visibleHelperCardCount\)/);
  assert.match(css, /FINAL-HELPER-DYNAMIC-EQUAL/);
  assert.match(css, /#preview-helper-step:not\(\.hidden\) \.preview-core-language \{[\s\S]*display: contents !important/);
  assert.match(css, /#preview-helper-step\[data-helper-card-count="3"\]:not\(\.hidden\) \{[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)[\s\S]*grid-template-rows: auto auto minmax\(clamp\(112px, 18\.5vh, 164px\), auto\)/);
  assert.match(css, /#preview-helper-step\[data-helper-card-count="4"\]:not\(\.hidden\) \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)[\s\S]*grid-template-rows: auto auto repeat\(2, minmax\(clamp\(92px, 13vh, 126px\), 1fr\)\)/);
  assert.match(css, /#preview-helper-step:not\(\.hidden\) \.preview-core-audio,[\s\S]*#preview-helper-step:not\(\.hidden\) \.preview-helper-empty \{[\s\S]*height: 100% !important[\s\S]*align-self: stretch !important/);
});

test("学习、游戏和阅读页使用同一宽屏画布并保留橙色横幅", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");
  const sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

  assert.match(css, /FINAL-WIDE-APP-SHELL/);
  assert.match(css, /html body\.focus-mode #app-header \{[\s\S]*display: block !important/);
  assert.match(css, /html body\.mode-preview main\.container,[\s\S]*html body\.mode-reading main\.container \{[\s\S]*width: var\(--app-content-width\) !important/);
  assert.match(css, /html body\.mode-preview #preview-screen,[\s\S]*html body\.mode-reading #reading-screen \{[\s\S]*max-width: none !important/);
  assert.match(css, /html body\.mode-preview #preview-screen #single-word-card[\s\S]*min-height: clamp\(560px, 68vh, 860px\)/);
  assert.match(css, /html body\.mode-game #game-screen \.game-card,[\s\S]*html body\.mode-reading #reading-screen \.reading-content \{[\s\S]*min-height: clamp\(560px, 66vh, 820px\)/);
  assert.match(sw, /word-tool-pwa-20260825-mobile-game-centerline-v52/);
});

test("背单词页采用一屏学习面板，顶部、步骤、内容和底部操作同时可见", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(css, /FINAL-PREVIEW-ONE-SCREEN/);
  assert.match(css, /html body\.mode-preview \{[\s\S]*height: 100svh !important[\s\S]*overflow: hidden !important/);
  assert.match(css, /html body\.mode-preview main\.container \{[\s\S]*height: calc\(100svh - var\(--app-header-height\)\) !important[\s\S]*overflow: hidden !important/);
  assert.match(css, /html body\.mode-preview #preview-screen:not\(\.screen-hidden\) \{[\s\S]*grid-template-rows: auto auto minmax\(0, 1fr\) !important[\s\S]*overflow: hidden !important/);
  assert.match(css, /html body\.mode-preview #preview-screen #single-word-card \{[\s\S]*grid-template-rows: minmax\(0, 1fr\) auto !important[\s\S]*overflow: hidden !important/);
  assert.match(css, /html body\.mode-preview #preview-screen \.preview-actions \{[\s\S]*min-height: clamp\(54px, 6\.8vh, 68px\)[\s\S]*grid-template-columns: minmax\(150px, 0\.72fr\) minmax\(260px, 1\.28fr\) minmax\(150px, 0\.72fr\)/);
});

test("看图认词第一页使用扁平学习尺度，和后续页面保持一致", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(css, /FINAL-PREVIEW-ONE-SCREEN/);
  assert.match(css, /#preview-study-step:not\(\.hidden\) \{[\s\S]*grid-template-rows: minmax\(0, 1fr\) auto !important[\s\S]*gap: clamp\(10px, 1\.5vh, 18px\)/);
  assert.match(css, /#preview-study-step:not\(\.hidden\) \.preview-image-stage \{[\s\S]*height: 100% !important[\s\S]*min-height: 0 !important[\s\S]*overflow: hidden !important/);
  assert.match(css, /#preview-study-step:not\(\.hidden\) #preview-word-image,[\s\S]*#preview-study-step:not\(\.hidden\) \.missing-image-state \{[\s\S]*max-width: min\(760px, 72vw\)[\s\S]*max-height: clamp\(230px, 39vh, 420px\)/);
  assert.match(css, /#preview-study-step:not\(\.hidden\) \.preview-word-strip \{[\s\S]*width: min\(860px, 78%\)/);
});

test("背单词六个子页按题型压缩内容，选项、拼写和完成页都能留在一屏内", () => {
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(css, /#preview-helper-step:not\(\.hidden\) \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)[\s\S]*grid-template-rows: auto auto repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /#preview-quiz-step:not\(\.hidden\) \{[\s\S]*justify-content: center !important[\s\S]*gap: clamp\(10px, 1\.6vh, 18px\)/);
  assert.match(css, /#preview-quiz-step\[data-question-type="image_to_english"\] \.quiz-prompt \{[\s\S]*width: min\(720px, 62%\)[\s\S]*max-height: clamp\(150px, 27vh, 280px\)/);
  assert.match(css, /\.active-recall-options \{[\s\S]*width: min\(1080px, 74%\)[\s\S]*gap: clamp\(10px, 1\.5vh, 16px\)/);
  assert.match(css, /\.active-recall-option \{[\s\S]*min-height: clamp\(48px, 6\.3vh, 64px\)/);
  assert.match(css, /\.preview-quiz-spelling \{[\s\S]*width: min\(660px, 62%\)/);
  assert.match(css, /\.preview-complete-card \{[\s\S]*width: min\(920px, 70%\)/);
});

test("看图认词页首次出现和切换新单词时会自动朗读当前单词", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");

  assert.match(js, /let previewAutoPronounceTimer = null/);
  assert.match(js, /function schedulePreviewWordPronunciation\(word, wordIndex\) \{/);
  assert.match(js, /previewAutoPronounceTimer = setTimeout\(\(\) => \{[\s\S]*currentPreviewStep === 'study' && currentPreviewIndex === wordIndex[\s\S]*pronounceWord\(word\.english, getAudioUrlForWord\(word\)\)/);
  assert.match(js, /setPreviewStep\('study'\);\s*schedulePreviewWordPronunciation\(word, currentPreviewIndex\)/);
});

test("答对后的鼓励停留更久，孩子能看清反馈再进入下一题", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");

  assert.match(js, /const PREVIEW_PRAISE_HOLD_MS = 1700/);
  assert.match(js, /const PREVIEW_SPELLING_PRAISE_HOLD_MS = 2100/);
  assert.match(js, /const GAME_PRAISE_HOLD_MS = 1800/);
  assert.match(js, /const CELEBRATION_MESSAGE_HOLD_MS = 2400/);
  assert.match(js, /const advanceDelay = isCorrect\s*\?\s*\(isSpellingLike \? PREVIEW_SPELLING_PRAISE_HOLD_MS : PREVIEW_PRAISE_HOLD_MS\)\s*:\s*PREVIEW_WRONG_FEEDBACK_HOLD_MS/);
  assert.match(js, /setTimeout\(\(\) => message\.remove\(\), CELEBRATION_MESSAGE_HOLD_MS\)/);
  assert.match(js, /}, GAME_PRAISE_HOLD_MS\);/);
  assert.match(js, /}, isCorrect \? GAME_PRAISE_HOLD_MS : GAME_WRONG_FEEDBACK_HOLD_MS\);/);
});

test("整轮单词学完后提示进入由刚学词组成的简单阅读", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(html, /story-core\.js\?v=20260816-home-names-helper-v17/);
  assert.match(html, /enhanced-word-tool\.js\?v=20260825-vivienne-voice-v30/);
  assert.match(js, /function getCurrentLearningRoundWords\(\) \{[\s\S]*completedWords\.length >= 2 \? completedWords : gameWords\.filter\(Boolean\)/);
  assert.match(js, /canReadStory[\s\S]*gameWords\.every\(\(item, index\) => !item \|\| isPreviewWordLearned\(index\)\)/);
  assert.match(js, /读刚学单词小故事/);
  assert.match(js, /previewMainActionBtn\.dataset\.action = 'reading'/);
  assert.match(js, /goToReadingScreen\(getCurrentLearningRoundWords\(\)\)/);
  assert.match(css, /#preview-study-step:not\(\.hidden\) \.preview-word-strip \{[\s\S]*width: 100% !important/);
  assert.match(css, /FINAL-READING-SIMPLE-FIT/);
  assert.match(css, /\.reading-option,[\s\S]*\.reading-builder-choice \{[\s\S]*overflow-wrap: anywhere !important/);
});

test("听读与记忆页明确提示点击听单词和听句子", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");
  const helperMarkup = html.slice(html.indexOf('id="preview-helper-step"'), html.indexOf('id="preview-quiz-step"'));

  assert.match(helperMarkup, /class="preview-helper-instruction">先点“听单词”，再点“听句子”，跟着读一遍。/);
  assert.match(css, new RegExp("\\.preview-helper-instruction \\{[\\s\\S]*grid-column: 1 / -1 !important[\\s\\S]*text-align: center !important"));
  assert.match(css, /FINAL-HELPER-INSTRUCTION/);
  assert.match(css, /\.audio-mini-btn:hover \{[\s\S]*transform: translateY\(-1px\) !important/);
});

test("浏览器本地 TTS 会优选自然英文声音并按单词句子调节节奏", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");

  assert.match(html, /enhanced-word-tool\.js\?v=20260825-vivienne-voice-v30/);
  assert.match(js, /const TTS_WORD_RATE = 0\.84/);
  assert.match(js, /const TTS_SENTENCE_RATE = 0\.92/);
  assert.match(js, /function scoreEnglishVoice\(voice, mode = 'sentence'\)/);
  assert.match(js, /const isVivienne = \/vivienne\/\.test\(name\)/);
  assert.match(js, /if \(isVivienne\) score \+= 1000/);
  assert.match(js, /return lang\.startsWith\('en'\) \|\| \/vivienne\/\.test\(name\)/);
  assert.match(js, /samantha\|ava\|allison\|susan\|victoria\|karen\|serena\|moira/);
  assert.match(js, /function splitSpeechSegments\(text, mode = 'sentence'\)/);
  assert.match(js, /window\.speechSynthesis\.onvoiceschanged = \(\) => \{/);
  assert.match(js, /pronounceWord\(sentence, getSentenceAudioUrlForWord\(word\), previewSentenceAudioBtn, '🔊 听句子', \{ mode: 'sentence' \}\)/);
  assert.match(js, /pronounceWord\(currentReadingStory\.sentences\.join\(' '\), '', readingListenBtn, '🔊 听完整故事', \{ mode: 'story' \}\)/);
});

test("挑战页音频与拼写按钮保持内容宽度，避免拉成整条", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(html, /class="letter-action-row flex flex-wrap gap-2 justify-center"/);
  assert.match(css, /FINAL-REVIEW-QUEUE-UI/);
  assert.match(css, /body\.mode-game #game-screen \.game-card > \.audio-main-btn,[\s\S]*body\.mode-game #game-screen #game-pronounce-btn \{[\s\S]*width: fit-content !important/);
  assert.match(css, /body\.mode-game #game-screen \.game-card > \.letter-action-row,[\s\S]*width: fit-content !important/);
  assert.match(css, /body\.mode-game #game-screen #submit-btn \{[\s\S]*width: fit-content !important/);
});

test("挑战页隐藏底部已完成单词条，卡片撑到底且不留大空白", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(css, /FINAL-GAME-ONE-SCREEN-COMPACT/);
  assert.match(css, /FINAL-GAME-NATURAL-SCROLL-SPELLING-FIT/);
  assert.match(css, /html body\.mode-game \{[\s\S]*overflow-y: auto !important/);
  assert.match(css, /html body\.mode-game #game-screen:not\(\.screen-hidden\) \{[\s\S]*grid-template-rows: auto auto auto auto minmax\(0, 1fr\) !important/);
  assert.match(css, /html body\.mode-game #game-screen \.game-card \{[\s\S]*min-height: calc\(100svh - var\(--app-header-height\) - clamp\(168px, 18vh, 224px\)\) !important/);
  assert.match(css, /html body\.mode-game #game-screen\[data-question-type="spelling"\] \.game-card \{[\s\S]*min-height: clamp\(410px, 55vh, 620px\) !important/);
  assert.match(css, /html body\.mode-game #game-screen #words-list \{[\s\S]*display: none !important/);
  assert.match(js, /gameScreen\.dataset\.questionType = activeQuestion\.type/);
  assert.match(js, /function addToCompletedList\(word, isCorrect\) \{[\s\S]*不再在底部堆叠已完成单词[\s\S]*return;/);
});

test("阅读页有底部渐隐和全对庆祝效果", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(css, /FINAL-READING-BOTTOM-FADE-AND-PERFECT/);
  assert.match(css, /html body\.mode-reading #reading-screen \.reading-story \{[\s\S]*mask-image: linear-gradient\(to bottom, #000 0%, #000 calc\(100% - 52px\), transparent 100%\) !important/);
  assert.match(css, /\.reading-perfect-celebration \{[\s\S]*position: fixed/);
  assert.match(js, /let readingPerfectCelebrated = false/);
  assert.match(js, /function launchReadingPerfectCelebration\(\)/);
  assert.match(js, /readingAnsweredIds\.size === total && readingCorrectCount === total[\s\S]*launchReadingPerfectCelebration\(\)/);
});

test("阅读页点击故事里的绿色目标词显示中文，上方目标词只作目录", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(js, /readingStoryEl\.addEventListener\('click', handleReadingKeywordToggle\)/);
  assert.match(js, /readingStoryEl\.addEventListener\('keydown'[\s\S]*handleReadingKeywordToggle\(event\)/);
  assert.match(js, /function highlightTargetWords\(sentence, targetWords\) \{[\s\S]*class="reading-keyword" role="button" tabindex="0" data-english="\$\{safeEnglish\}" data-chinese="\$\{chinese\}"/);
  assert.match(js, /function handleReadingKeywordToggle\(event\) \{[\s\S]*keyword\.classList\.toggle\('showing-meaning'\)[\s\S]*keyword\.textContent = showingMeaning && chinese \? `\$\{english\} · \$\{chinese\}` : english/);
  assert.match(js, /const matchedWord = currentReadingStory\?\.targetWords\?\.find\(word =>[\s\S]*normalizeWordForGame\(word\.english\) === normalizeWordForGame\(english\)/);
  assert.match(js, /tag\.className = 'reading-target-word'[\s\S]*tag\.disabled = true[\s\S]*目标词 \$\{word\.english\}/);
  assert.doesNotMatch(js, /tag\.addEventListener\('click'[\s\S]*reading-target-word/);
  assert.match(css, /html body\.mode-reading #reading-screen \.reading-keyword\.showing-meaning \{[\s\S]*color: #f05f3c !important/);
  assert.match(css, /html body\.mode-reading #reading-screen \.reading-target-word \{[\s\S]*cursor: default !important/);
});

test("星词积分接入学新词、挑战和读故事，阅读页保持一屏操作区", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/preview-redesign.css"), "utf8");

  assert.match(html, /class="app-brand-area[\s\S]*id="word-star-meter"[\s\S]*id="word-star-title"[\s\S]*id="score"[\s\S]*id="word-star-level-btn"[\s\S]*id="word-star-progress"/);
  assert.match(js, /const WORD_STAR_PROFILE_KEY = 'englishWordStarProfile'/);
  assert.match(js, /const WORD_STAR_LEVELS = \[/);
  assert.match(js, /\{ min: 0, title: '星词启航者' \}/);
  assert.match(js, /\{ min: 1000, title: '单词探险家' \}/);
  assert.match(js, /\{ min: 3000, title: '阅读冒险家' \}/);
  assert.match(js, /\{ min: 8000, title: '星词大师' \}/);
  assert.match(js, /function getWordStarLevel\(totalStars = wordStarProfile\.totalStars\)/);
  assert.match(js, /function awardWordStars\(amount = 1, source = '练习', detail = ''\)/);
  assert.match(js, /awardWordStars\(1, '学新词', word\?\.english \|\| ''\)/);
  assert.match(js, /awardWordStars\(Math\.max\(1, 2 - usedHints\), '做挑战', currentWord\.english\)/);
  assert.match(js, /awardWordStars\(1, '读故事', '阅读题'\)/);
  assert.match(js, /awardWordStars\(3, '读故事', '全对奖励'\)/);
  assert.match(js, /wordStarProfile\.totalStars \+= amount/);
  assert.match(js, /function showWordStarReward\(\{ amount, source, detail, title, titleUpgraded, streak, anchorEl = null \}\)/);
  assert.match(js, /function playWordStarCollectSound\(\)/);
  assert.match(js, /playWordStarCollectSound\(\)/);
  assert.match(js, /function finishPreviewQuizAnswer[\s\S]*if \(isCorrect\) \{[\s\S]*playCelebrationSound\(\);[\s\S]*awardWordStars\(1, '学新词'/);
  assert.match(js, /function showWordStarUpgrade\(\{ title, source, detail, streak \}\)/);
  assert.match(js, /function toggleWordStarLevelPanel\(\)/);
  assert.match(js, /function renderWordStarLevelPanel\(options = \{\}\)/);
  assert.match(js, /function closeWordStarLevelPanel\(\)/);
  assert.match(js, /window\.addEventListener\('scroll', syncReadingScrollState, \{ passive: true \}\)/);
  assert.match(js, /readingScreen\.classList\.toggle\('reading-scrolled', shouldCollapseActions\)/);
  assert.match(css, /FINAL-SCROLL-REWARD-READING-V2/);
  assert.match(css, /FINAL-WORD-STAR-METER-FLY-IN/);
  assert.match(css, /FINAL-STAR-METER-WIDE-POWER-V2/);
  assert.match(css, /FINAL-READING-ONE-SCREEN-NO-SCROLL/);
  assert.match(css, /html body\.mode-game main\.container \{[\s\S]*padding-bottom: clamp\(10px, 1\.6vh, 22px\) !important/);
  assert.match(css, /#reading-screen\.reading-scrolled \.reading-actions \{[\s\S]*max-height: none !important/);
  assert.match(css, /#app-header \.app-brand-area \{[\s\S]*flex: 1 1 auto !important/);
  assert.match(css, /min-width: clamp\(460px, 56vw, 1180px\) !important/);
  assert.match(css, /html body\.mode-reading \{[\s\S]*overflow: hidden !important/);
  assert.match(css, /html body\.mode-reading #reading-screen:not\(\.screen-hidden\) \{[\s\S]*grid-template-rows: auto auto minmax\(0, 1fr\) !important/);
  assert.match(css, /#app-header \.word-star-meter \{/);
  assert.match(css, /#app-header \.word-star-level-btn \{/);
  assert.match(css, /\.word-star-level-panel \{/);
  assert.match(css, /\.word-star-level-panel \{[\s\S]*max-height: min\(72vh, 620px\)[\s\S]*overflow: auto/);
  assert.match(css, /\.word-star-level-item\.current \{/);
  assert.match(css, /\.word-star-fly \{/);
  assert.match(css, /@keyframes wordStarFlyIn/);
  assert.match(css, /transform: translate\(var\(--mid-x\), var\(--mid-y\)\) scale\(1\.18\) rotate\(10deg\)/);
  assert.match(css, /\.word-star-upgrade \{/);
});

test("结算页精简为紧凑结果、复习安排和两个主操作", () => {
  const html = fs.readFileSync(path.join(root, "enhanced-word-tool.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "assets/css/enhanced-word-tool.css"), "utf8");

  assert.match(html, /id="read-story-btn" class="primary-btn">📖 读刚学单词小故事/);
  assert.match(css, /body\.mode-end #end-screen:not\(\.screen-hidden\) \{[\s\S]*display: grid !important/);
  assert.match(css, /body\.mode-end #end-screen \.result-grid \{[\s\S]*grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/);
  assert.match(css, /body\.mode-end #end-screen #result-review-panel \{[\s\S]*border-radius: 28px !important/);
  assert.match(css, /body\.mode-end #end-screen \.end-primary-actions \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /FINAL-END-BANNER-CLEANUP/);
  assert.match(css, /html body\.mode-end #end-screen \.app-mark-large \{[\s\S]*display: none !important/);
  assert.match(css, /html body\.mode-end #time-progress \{[\s\S]*width: 100% !important/);
});

test("真实复习队列按掌握记录生成，今日复习优先读取队列", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");

  assert.match(js, /const REVIEW_QUEUE_STORAGE_KEY = 'englishWordReviewQueue'/);
  assert.match(js, /function loadReviewQueue\(\)/);
  assert.match(js, /function saveReviewQueue\(reviewQueue\)/);
  assert.match(js, /function updateReviewQueueAfterRecord\(masteryRecords = loadMasteryRecords\(\)\)/);
  assert.match(js, /function getDueReviewQueueWords\(limit = 8\)/);
  assert.match(js, /saveMasteryRecords\(masteryRecords\);\s*updateReviewQueueAfterRecord\(masteryRecords\)/);
  assert.match(js, /function getDueReviewWords\(limit = 8\) \{\s*return getDueReviewQueueWords\(limit\);/);
  assert.match(js, /prepareReviewGame\(reviewWords, '今日复习队列'\)/);
});

test("批量生成音频脚本可生成本地 MP3 并写回词库音频字段", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const scriptPath = path.join(root, "tools/generate-audio.mjs");
  const script = fs.readFileSync(scriptPath, "utf8");
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

  assert.equal(pkg.scripts["generate-audio"], "node tools/generate-audio.mjs");
  assert.match(script, /assets\/audio\/words\/\$\{gradeKey\}\/\$\{difficultyKey\}\/\$\{baseName\}\.mp3/);
  assert.match(script, /assets\/audio\/sentences\/\$\{gradeKey\}\/\$\{difficultyKey\}\/\$\{baseName\}\.mp3/);
  assert.match(script, /job\.word\.audioUrl = job\.outputRel/);
  assert.match(script, /job\.word\.audio_url = job\.outputRel/);
  assert.match(script, /job\.word\.sentenceAudioUrl = job\.outputRel/);
  assert.match(script, /job\.word\.sentence_audio_url = job\.outputRel/);
  assert.match(script, /brew install ffmpeg/);
  assert.match(js, /word\.sentence_audio_url \|\| word\.sentenceAudioUrl \|\| word\.sentenceAudio/);
  assert.match(js, /word\.audio_url \|\| word\.audioUrl \|\| word\.audio/);
  assert.match(sw, /mp3\|m4a\|wav\|ogg/);
});

test("弱网和离线模式会缓存图片并提前预热后续单词图", () => {
  const js = fs.readFileSync(path.join(root, "assets/js/enhanced-word-tool.js"), "utf8");
  const sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

  assert.match(sw, /const IMAGE_CACHE = `\$\{CACHE_VERSION\}-images`/);
  assert.match(sw, /function isImageRequest\(request\) \{[\s\S]*request\.destination === "image"/);
  assert.match(sw, /async function imageCacheFirst\(request\)/);
  assert.match(sw, /event\.respondWith\(imageCacheFirst\(request\)\)/);
  assert.match(js, /const IMAGE_PREFETCH_AHEAD_COUNT = 4/);
  assert.match(js, /const WORD_ASSET_PREFETCH_COUNT = 4/);
  assert.match(js, /const WORD_ASSET_PREFETCH_DELAY_MS = 900/);
  assert.match(js, /const OPTIMIZED_IMAGE_PREFIX = 'assets\/images\/optimized\/'/);
  assert.match(js, /function getOptimizedImageCandidate\(imageUrl\)/);
  assert.match(js, /function preloadWordImages\(words, startIndex = 0, count = IMAGE_PREFETCH_AHEAD_COUNT, options = \{\}\)/);
  assert.match(js, /function preloadWordAssets\(words, startIndex = 0, count = WORD_ASSET_PREFETCH_COUNT, options = \{\}\)/);
  assert.match(js, /function scheduleWordAssetPreload\(words, startIndex = 0, count = WORD_ASSET_PREFETCH_COUNT\)/);
  assert.match(js, /CACHE_WORD_ASSETS/);
  assert.match(sw, /async function cacheWordAssets\(urls\)/);
  assert.match(sw, /CACHE_WORD_ASSETS/);
  assert.match(js, /previewWordImage\.fetchPriority = 'high'/);
  assert.match(js, /scheduleWordAssetPreload\(gameWords, 1/);
  assert.match(js, /preloadWordAssets\(gameWords, currentPreviewIndex \+ 1, 2, \{ defer: true, delay: 500 \}\)/);
  assert.match(js, /preloadWordAssets\(gameWords, currentWordIndex \+ 1, 2, \{ defer: true, delay: 500 \}\)/);
});
