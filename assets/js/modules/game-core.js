(function (global) {
  function normalizeAnswer(text) {
    return String(text || "").toLowerCase().replace(/[^a-z]/g, "");
  }
  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function selectWords(words, count, random = Math.random) {
    return shuffle(words, random).slice(0, Math.min(Math.max(0, count), words.length));
  }
  function scoreAnswer({ correct, hints = 0, firstAttempt = true }) {
    if (!correct) return 0;
    return Math.max(2, 10 - hints * 2 - (firstAttempt ? 0 : 2));
  }
  global.GameCore = Object.freeze({ normalizeAnswer, shuffle, selectWords, scoreAnswer });
})(window);
