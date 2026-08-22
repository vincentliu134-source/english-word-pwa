(function (global) {
  const HEADER_ALIASES = {
    textbook: ["教材版本", "版本", "textbook", "bookversion"],
    grade: ["年级", "grade"],
    volume: ["册别", "上下册", "学期", "volume", "semester"],
    unit: ["unit", "单元"],
    lesson: ["lesson", "课时", "课次"],
    page: ["页码", "page"],
    difficulty: ["难度", "difficulty"],
    chinese: ["中文", "中文意思", "释义", "chinese"],
    english: ["英文", "英语", "单词", "english", "word"],
    partOfSpeech: ["词性", "partofspeech", "pos"],
    topic: ["主题分类", "主题", "topic", "category"],
    curriculum: ["课标要求", "课标", "要求", "curriculum"],
    image: ["图片链接", "图片", "image", "imageurl"],
    imageFileName: ["图片生成文件名", "图片文件名", "imagefilename"],
    audio: ["发音链接", "音频链接", "发音", "audio", "audiourl"],
    sentenceAudio: ["例句音频", "句子音频", "sentence_audio_url", "sentenceaudio", "sentenceaudiourl"],
    phonetic: ["标准发音/音标", "音标", "phonetic", "pronunciation"],
    readTip: ["读一读", "听一听", "listen_tip_听一听", "listentip听一听", "listentip", "listen_tip", "readtip", "read_tip"],
    chunkTip: ["拆一拆", "chunk_tip_拆开记", "chunktip拆开记", "chunktip", "chunk_tip"],
    optimizedExample: ["例句", "example", "sentence", "说一说_例句", "说一说例句", "说一说英文", "example_sentence_跟着说", "examplesentence跟着说", "examplesentence", "example_sentence"],
    optimizedExampleCn: ["例句中文", "例句翻译", "examplecn", "sentencecn", "说一说_中文", "说一说中文", "examplesentencecn", "example_sentence_cn"],
    optimizedMemoryTip: ["记忆方法", "记忆提示", "记忆技巧", "小窍门", "记忆小窍门", "memory_tip_记忆小窍门", "memorytip记忆小窍门", "memory_tip", "memorytip"],
    optimizedSpellingTip: ["写一写要注意", "拼写小秘密", "spelling_secret_拼写小秘密", "spellingsecret拼写小秘密", "spelling_secret", "spellingsecret", "spelling_tip", "spellingtip"],
    memoryStrategy: ["记忆策略", "memory_strategy_记忆策略", "memorystrategy", "memory_strategy"],
    spellingPattern: ["拼写挖空", "spelling_pattern_拼写挖空", "spellingpattern", "spelling_pattern"],
    showChunkTip: ["是否显示拆开记", "show_chunk_tip", "showchunktip"],
    spellingTestMode: ["拼写题模式", "spelling_test_mode", "spellingtestmode"],
    testFlow: ["主动回忆题型", "testflow", "test_flow"],
    displayMode: ["展示模式", "displaymode", "display_mode"],
    showChineseInLearning: ["初学显示中文", "showchineseinlearning", "show_chinese_in_learning"],
    hideChineseInReview: ["复习隐藏中文", "hidechineseinreview", "hide_chinese_in_review"],
    masteryLevel: ["初始复习等级", "复习等级", "掌握等级", "masterylevel"],
  };
  const REQUIRED_FIELDS = [
    ["grade", "年级"], ["difficulty", "难度"], ["english", "英文"], ["chinese", "中文"],
    ["unit", "Unit"], ["partOfSpeech", "词性"], ["readTip", "listen_tip_听一听"],
    ["optimizedExample", "example_sentence_跟着说"],
    ["testFlow", "主动回忆题型"], ["displayMode", "展示模式"],
    ["spellingTestMode", "spelling_test_mode"],
  ];
  const TEMPLATE_HEADERS = [
    "教材版本", "年级", "册别", "Unit", "Lesson", "页码", "序号", "英文", "中文", "词性",
    "主题分类", "课标要求", "难度", "是否短语/专名", "图片生成文件名", "图片链接",
    "发音链接", "标准发音/音标", "sentence_audio_url", "listen_tip_听一听",
    "example_sentence_跟着说", "example_sentence_cn", "chunk_tip_拆开记", "show_chunk_tip",
    "memory_tip_记忆小窍门", "spelling_secret_拼写小秘密", "memory_strategy_记忆策略", "spelling_pattern_拼写挖空",
    "主动回忆题型", "展示模式",
    "spelling_test_mode", "初学显示中文", "复习隐藏中文", "初始复习等级", "学习状态", "备注",
  ];
  const DISPLAY_MODES = ["image_first", "abstract_scene", "place", "phrase", "culture"];
  const SPELLING_MODES = ["letter_bank", "partial_blank", "phrase_order", "full_blank"];
  const MEMORY_STRATEGIES = ["none", "image", "scene", "compound", "syllable", "phrase", "spelling"];

  function normalizeHeader(value) {
    return String(value || "").trim().replace(/\s+/g, "").toLowerCase();
  }
  function normalizeRow(rawRow) {
    const normalized = {};
    for (const [header, value] of Object.entries(rawRow || {})) {
      const key = normalizeHeader(header);
      for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
        if (aliases.some((alias) => normalizeHeader(alias) === key)) {
          normalized[field] = value;
          break;
        }
      }
    }
    return normalized;
  }
  function gradeKey(value) {
    const text = String(value || "").trim().toLowerCase();
    const chinese = { 一年级: "grade1", 二年级: "grade2", 三年级: "grade3", 四年级: "grade4", 五年级: "grade5", 六年级: "grade6" };
    if (chinese[text]) return chinese[text];
    const match = text.match(/[1-6]/);
    return match ? `grade${match[0]}` : "";
  }
  function difficultyKey(value) {
    const text = String(value || "").trim().toLowerCase();
    const values = { easy: "easy", e: "easy", 基础: "easy", 基础难度: "easy", 认识单词: "easy", medium: "medium", med: "medium", m: "medium", normal: "medium", 标准: "medium", 进阶: "medium", 进阶难度: "medium", 会写单词: "medium", hard: "hard", h: "hard", 挑战: "hard", 挑战难度: "hard", 熟练运用: "hard" };
    return values[text] || text;
  }
  function booleanValue(value, defaultValue = false) {
    const text = String(value ?? "").trim().toLowerCase();
    return text ? ["true", "1", "yes", "y", "是"].includes(text) : defaultValue;
  }
  function validateRows(rows) {
    const errors = [];
    for (const item of rows) {
      const row = item.rowNumber || "?";
      for (const [field, label] of REQUIRED_FIELDS) {
        if (!String(item[field] || "").trim()) errors.push(`第${row}行缺少「${label}」`);
      }
      if (!gradeKey(item.grade)) errors.push(`第${row}行年级无效：${item.grade || ""}`);
      if (!["easy", "medium", "hard"].includes(difficultyKey(item.difficulty))) errors.push(`第${row}行难度无效：${item.difficulty || ""}`);
      if (booleanValue(item.showChunkTip, false) && !String(item.chunkTip || "").trim()) errors.push(`第${row}行已开启 show_chunk_tip，请填写「chunk_tip_拆开记」`);
      const strategies = String(item.memoryStrategy || "").trim().toLowerCase().split(/[;,，、|/\s]+/).filter(Boolean);
      const invalidStrategies = strategies.filter(strategy => !MEMORY_STRATEGIES.includes(strategy));
      if (invalidStrategies.length) errors.push(`第${row}行记忆策略无效：${invalidStrategies.join("、")}`);
      if (strategies.includes("scene") && !String(item.optimizedMemoryTip || "").trim()) errors.push(`第${row}行使用 scene 策略时需填写「memory_tip_记忆小窍门」`);
      if (strategies.includes("spelling") && !String(item.optimizedSpellingTip || "").trim()) errors.push(`第${row}行使用 spelling 策略时需填写「spelling_secret_拼写小秘密」`);
      if (strategies.some(strategy => ["compound", "syllable", "phrase"].includes(strategy)) && !String(item.chunkTip || "").trim()) errors.push(`第${row}行使用拆分策略时需填写「chunk_tip_拆开记」`);
      if (item.displayMode && !DISPLAY_MODES.includes(String(item.displayMode).trim())) errors.push(`第${row}行展示模式无效：${item.displayMode}`);
      if (item.spellingTestMode && !SPELLING_MODES.includes(String(item.spellingTestMode).trim())) errors.push(`第${row}行拼写模式无效：${item.spellingTestMode}`);
    }
    return errors;
  }
  global.ImportCore = Object.freeze({
    HEADER_ALIASES, REQUIRED_FIELDS, TEMPLATE_HEADERS, DISPLAY_MODES, SPELLING_MODES, MEMORY_STRATEGIES,
    normalizeHeader, normalizeRow, gradeKey, difficultyKey, booleanValue, validateRows,
  });
})(window);
