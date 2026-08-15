(function (global) {
  function recordTotal(record) {
    if (!record) return 0;
    if (typeof record.totalCount === "number" && record.totalCount > 0) return record.totalCount;
    return Array.isArray(record.words) ? record.words.length : 0;
  }
  function wrongAttempts(answerRecord) {
    if (!answerRecord?.answered || answerRecord.firstCorrect) return 0;
    return Math.max(1, (answerRecord.attemptCount || 1) - 1);
  }
  function accuracy(correct, total) {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }
  function summarize(records) {
    const totalStudies = records.length;
    const totalWords = records.reduce((sum, record) => sum + recordTotal(record), 0);
    const weightedCorrect = records.reduce((sum, record) => sum + (Number(record.correctCount) || 0), 0);
    return { totalStudies, totalWords, accuracy: accuracy(weightedCorrect, totalWords) };
  }
  global.StatisticsCore = Object.freeze({ recordTotal, wrongAttempts, accuracy, summarize });
})(window);
