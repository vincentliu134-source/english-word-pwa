(function (global) {
  const ALLOWED_STRATEGIES = Object.freeze([
    "none", "image", "scene", "compound", "syllable", "phrase", "spelling"
  ]);

  const MEANINGFUL_COMPOUNDS = new Set([
    "airport", "sunrise", "peanut", "countryside", "thanksgiving", "wardrobe", "weekend"
  ]);

  const GENERIC_MEMORY_PATTERNS = [
    /先看图片/, /再听一遍/, /遮住中文/, /最后遮住/, /小学生记法/
  ];

  const GENERIC_SPELLING_PATTERNS = [
    /^留意容易写错的字母组合[.。]?$/,
    /^一共\s*\d+\s*个字母[.。]?$/,
    /^三个字母[,，]/,
    /^开头是?\s*[a-z][,，].*结尾是?\s*[a-z][.。]?$/i
  ];

  function text(value) {
    return String(value || "").trim();
  }

  function normalizeEnglish(value) {
    return text(value).toLowerCase().replace(/[^a-z]/g, "");
  }

  function booleanValue(value, defaultValue = false) {
    if (typeof value === "boolean") return value;
    const normalized = text(value).toLowerCase();
    if (!normalized) return defaultValue;
    return ["true", "1", "yes", "y", "是"].includes(normalized);
  }

  function parseStrategies(value) {
    const strategies = text(value)
      .toLowerCase()
      .split(/[;,，、|/\s]+/)
      .filter(Boolean)
      .filter(item => ALLOWED_STRATEGIES.includes(item));
    return [...new Set(strategies)];
  }

  function rawChunk(word) {
    return text(word.chunk_tip || word.chunkTip || word.syllable_split || word.syllableSplit);
  }

  function inferChunkStrategy(word) {
    const english = text(word.english);
    const normalized = normalizeEnglish(english);
    const chunk = rawChunk(word);
    if (!chunk || chunk.toLowerCase() === english.toLowerCase()) return "";
    if (english.includes(" ") && chunk.includes("/")) return "phrase";
    if (MEANINGFUL_COMPOUNDS.has(normalized)) return "compound";
    const pieces = chunk.split(/[-/]+/).map(text).filter(Boolean);
    if (normalized.length >= 8 && pieces.length >= 3) return "syllable";
    return "";
  }

  function getChunkTip(word) {
    const explicitlyShown = word.show_chunk_tip ?? word.showChunkTip;
    if (!booleanValue(explicitlyShown, false)) return "";
    const chunk = rawChunk(word);
    if (!chunk || chunk.toLowerCase() === text(word.english).toLowerCase()) return "";
    const explicitStrategies = parseStrategies(word.memory_strategy || word.memoryStrategy);
    const chunkStrategy = explicitStrategies.find(item => ["compound", "syllable", "phrase"].includes(item))
      || inferChunkStrategy(word);
    return chunkStrategy ? chunk : "";
  }

  function getMemoryTip(word) {
    const value = text(
      word.memory_hook || word.memoryTip || word.memory_tip || word.optimizedMemoryTip || word.memoryHook
    ).replace(/^(联想记忆|记忆)[:：]?\s*/, "");
    if (!value || GENERIC_MEMORY_PATTERNS.some(pattern => pattern.test(value))) return "";
    return value.replace(/[.!！。]+$/g, "") + "。";
  }

  function getSpellingTip(word) {
    const value = text(
      word.spelling_secret || word.spellingSecret || word.spelling_tip || word.spellingTip || word.optimizedSpellingTip
    );
    if (!value || GENERIC_SPELLING_PATTERNS.some(pattern => pattern.test(value))) return "";
    return value;
  }

  function inferStrategies(word) {
    const explicit = parseStrategies(word.memory_strategy || word.memoryStrategy);
    if (explicit.length) return explicit;
    const strategies = [];
    const chunkStrategy = inferChunkStrategy(word);
    if (chunkStrategy && getChunkTip(word)) strategies.push(chunkStrategy);
    if (getMemoryTip(word)) strategies.push("scene");
    if (getSpellingTip(word)) strategies.push("spelling");
    if (!strategies.length && text(word.image || word.image_url)) strategies.push("image");
    return strategies.length ? strategies : ["none"];
  }

  function getAdaptiveCards(word, mastery = {}) {
    const strategies = inferStrategies(word);
    const available = [];
    const chunk = getChunkTip(word);
    const memory = getMemoryTip(word);
    const spelling = getSpellingTip(word);
    if (chunk && strategies.some(item => ["compound", "syllable", "phrase"].includes(item))) {
      const type = strategies.find(item => ["compound", "syllable", "phrase"].includes(item)) || "phrase";
      const labels = { compound: "构词拆分", syllable: "音节分块", phrase: "短语词块" };
      available.push({ type, title: labels[type], icon: type === "phrase" ? "🧩" : "🔤", text: chunk });
    }
    if (memory && strategies.includes("scene")) available.push({ type: "scene", title: "场景联想", icon: "🎬", text: memory });
    if (spelling && strategies.includes("spelling")) available.push({ type: "spelling", title: "拼写小秘密", icon: "✍️", text: spelling });

    const errors = new Set(mastery.error_types || mastery.errorTypes || []);
    const priority = [];
    if (errors.has("spelling_error")) priority.push("spelling");
    if (errors.has("usage_error") || errors.has("meaning_error") || errors.has("confusion_error")) priority.push("scene");
    if (errors.has("phrase_error")) priority.push("phrase", "compound", "syllable");
    const ordered = [
      ...priority.flatMap(type => available.filter(card => card.type === type)),
      ...available
    ].filter((card, index, list) => list.findIndex(item => item.type === card.type) === index);
    return ordered.slice(0, errors.size ? 2 : 3);
  }

  function getSpellingPattern(word) {
    const explicit = text(word.spelling_pattern || word.spellingPattern);
    if (explicit) return explicit;
    const answer = text(word.english);
    const letters = answer.replace(/[^a-z]/gi, "");
    let letterIndex = -1;
    return answer.split("").map(char => {
      if (!/[a-z]/i.test(char)) return char;
      letterIndex += 1;
      if (letters.length <= 4) return letterIndex === 0 || letterIndex === letters.length - 1 ? char : "_";
      if (letters.length === 5) return [0, 3].includes(letterIndex) ? char : "_";
      return letterIndex === 0 || letterIndex % 2 === 0 ? char : "_";
    }).join("");
  }

  global.MemoryCore = Object.freeze({
    ALLOWED_STRATEGIES,
    parseStrategies,
    inferStrategies,
    getChunkTip,
    getMemoryTip,
    getSpellingTip,
    getAdaptiveCards,
    getSpellingPattern
  });
})(window);
