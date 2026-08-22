(function (global) {
  const SIMPLE_FALLBACK_OPTIONS = Object.freeze(["book", "school", "friend", "home"]);
  const UNCOUNTABLE_WORDS = new Set(["soup", "tea", "water", "milk", "rice", "bread", "homework", "money"]);

  function text(value) {
    return String(value || "").trim();
  }

  function wordKey(word) {
    return `${text(word.english).toLowerCase()}-${text(word.chinese)}`;
  }

  function themeForWord(word) {
    const source = `${word.category || word.topic || ""} ${word.english || ""} ${word.chinese || ""}`.toLowerCase();
    if (/food|meal|soup|tea|dumpling|sandwich|turkey|pot|食|汤|茶|饭/.test(source)) return "food";
    if (/travel|place|culture|airport|palace|museum|bridge|river|park|vacation|旅|机场|宫|博物馆|公园/.test(source)) return "travel";
    if (/animal|mammal|bird|fish|insect|reptile|动物|鱼|鸟/.test(source)) return "animals";
    if (/school|learning|teacher|student|book|library|competition|学习|学校|图书馆|比赛/.test(source)) return "school";
    if (/feeling|angry|happy|sad|worried|excited|proud|scared|情绪|开心|生气|难过/.test(source)) return "feelings";
    return "daily";
  }

  function uniqueWords(words) {
    const seen = new Set();
    return (words || []).filter(word => {
      if (!word || !text(word.english)) return false;
      const key = wordKey(word);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function weaknessScore(word) {
    const errors = word.error_types || word.errorTypes || [];
    return (word.status === "learning" ? 5 : 0)
      + Math.min(4, Number(word.wrong_count || word.totalWrong || word.wrongCount || 0))
      + (errors.length ? 3 : 0)
      + (word.slowRecall || word.slowRecallCount ? 2 : 0);
  }

  function selectTargetWords(words, limit = 5, offset = 0) {
    const candidates = uniqueWords(words);
    const themeCounts = candidates.reduce((counts, word) => {
      const theme = themeForWord(word);
      counts[theme] = (counts[theme] || 0) + 1;
      return counts;
    }, {});
    const preferredTheme = Object.entries(themeCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "daily";
    const ranked = candidates
      .map((word, index) => ({ word, index, score: weaknessScore(word) + (themeForWord(word) === preferredTheme ? 4 : 0) }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map(item => item.word);
    const start = ranked.length ? Math.abs(Number(offset || 0)) % ranked.length : 0;
    return [...ranked.slice(start), ...ranked.slice(0, start)].slice(0, Math.min(limit, ranked.length));
  }

  function cleanExample(word) {
    const example = text(word.example_sentence || word.exampleSentence || word.optimizedExample || word.example);
    if (!example || /\b____\b/.test(example) || /[\u4e00-\u9fff]/.test(example) || /导入表|自然例句|请先|填写/.test(example)) return "";
    if (example.split(/\s+/).length > 7) return "";
    return /[.!?]$/.test(example) ? example : `${example}.`;
  }

  function storyOpening(theme) {
    return {
      food: ["今日的味道小故事", "Mia has lunch."],
      travel: ["今日的旅行小故事", "Mia has a map."],
      animals: ["今日的动物小故事", "Mia sees a picture."],
      school: ["今日的校园小故事", "Mia opens her book."],
      feelings: ["今日的心情小故事", "Mia is with Tom."],
      daily: ["今日的单词小故事", "Mia reads words."]
    }[theme];
  }

  function simpleNounPhrase(word) {
    const english = text(word.english);
    const lower = english.toLowerCase();
    if (!english) return "";
    if (english.includes(" ") || /^the\s/i.test(english) || /proper/.test(text(word.partOfSpeech))) return english;
    if (UNCOUNTABLE_WORDS.has(lower) || /s$/.test(lower)) return english;
    return `${/^[aeiou]/i.test(english) ? "an" : "a"} ${english}`;
  }

  function controlledSentence(word, index) {
    const example = cleanExample(word);
    if (example) return example;
    const english = text(word.english);
    const pos = text(word.partOfSpeech).toLowerCase();
    const isPhrase = english.includes(" ");
    if (isPhrase) return `Mia reads “${english}”.`;
    if (/adj/.test(pos)) return `Mia is ${english}.`;
    if (/^v| verb/.test(pos)) return `Mia can ${english}.`;
    const nounPhrase = simpleNounPhrase(word);
    return index % 2 === 0
      ? `Mia sees ${nounPhrase}.`
      : `Mia finds ${nounPhrase}.`;
  }

  function makeOptions(answer, targetWords) {
    const values = [answer, ...targetWords.map(word => text(word.english)), ...SIMPLE_FALLBACK_OPTIONS];
    return [...new Set(values.filter(Boolean))].slice(0, 4);
  }

  function createStory(words, options = {}) {
    const targetWords = selectTargetWords(words, Math.max(2, Math.min(3, Number(options.limit || 3))), options.offset || 0);
    if (targetWords.length < 2) return null;
    const themeCounts = targetWords.reduce((counts, word) => {
      const theme = themeForWord(word);
      counts[theme] = (counts[theme] || 0) + 1;
      return counts;
    }, {});
    const theme = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0][0];
    const [title, opening] = storyOpening(theme);
    const sentences = [opening, ...targetWords.map(controlledSentence)].slice(0, 4);
    const first = targetWords[0];
    const second = targetWords[1];
    const questions = [
      {
        id: "meaning",
        type: "meaning",
        text: `Which word means “${first.chinese}”?`,
        answer: first.english,
        options: makeOptions(first.english, targetWords),
        word: first
      },
      {
        id: "story-word",
        type: "meaning",
        text: `Which word means “${second.chinese}”?`,
        answer: second.english,
        options: makeOptions(second.english, [second]),
        word: second
      }
    ];
    const clozeWord = targetWords.find(word => cleanExample(word)) || first;
    const sourceSentence = cleanExample(clozeWord) || controlledSentence(clozeWord, 0);
    const escaped = text(clozeWord.english).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const clozeSentence = sourceSentence.replace(new RegExp(escaped, "i"), "____");
    const cloze = {
      id: "cloze",
      type: "usage",
      text: clozeSentence,
      answer: clozeWord.english,
      options: makeOptions(clozeWord.english, targetWords),
      word: clozeWord
    };
    return { title, theme, targetWords, sentences, questions, cloze };
  }

  global.StoryCore = Object.freeze({ themeForWord, selectTargetWords, createStory });
})(window);
