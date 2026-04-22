import baseCandidateQa from './candidateQA.js';
import candidateQaTranslations from './candidateQaTranslations.js';

function mergeCandidateAnswers(baseAnswers = {}, translatedAnswers = {}) {
  const keys = new Set([
    ...Object.keys(baseAnswers),
    ...Object.keys(translatedAnswers),
  ]);

  return Array.from(keys).reduce((accumulator, key) => {
    accumulator[key] = {
      ...(translatedAnswers[key] || {}),
      ...(baseAnswers[key] || {}),
    };
    return accumulator;
  }, {});
}

const candidateQa = Object.entries(baseCandidateQa).reduce((accumulator, [slug, answers]) => {
  accumulator[slug] = mergeCandidateAnswers(answers, candidateQaTranslations[slug]);
  return accumulator;
}, {});

export default candidateQa;
