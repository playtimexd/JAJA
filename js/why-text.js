// « Pourquoi? 十万个为什么 » — what is read aloud, shared by js/why.js (browser) and tools/voice-texts.mjs (node).
// Every string why.js passes to speak() comes from here, so the pre-recorded clip keys always match.
export const LANGS = ['fr', 'en', 'zh'];
export const SPEECH = { fr: 'fr-CA', en: 'en-CA', zh: 'zh-CN' };
// headings of the special slides (read before the slide text)
export const KIND = {
  fact: { fr: 'Le savais-tu?', en: 'Did you know?', zh: '你知道吗？' },
  try: { fr: 'Essaie à la maison!', en: 'Try it at home!', zh: '在家试一试！' },
  words: { fr: 'Les mots à retenir.', en: 'Words to remember.', zh: '要记住的词语。' },
};
export const PRAISE = { fr: ['Bravo!', 'Super!', 'Génial!'], en: ['Great job!', 'Super!', 'Awesome!'], zh: ['真棒！', '对啦！', '好厉害！'] };
export const DONE = { fr: 'Bravo! Tu as appris quelque chose!', en: 'Well done! You learned something new!', zh: '太棒了！你学会了！' };

// plain text of an item in a language: fr/en are strings, zh is { hz, py, w }
export const txt = (x, l) => (l === 'zh' ? x?.zh?.hz ?? '' : x?.[l] ?? '');

// Sentences of a text (each one is read and highlighted separately).
export function sentences(text, lang) {
  const s = String(text || '').trim();
  if (!s) return [];
  if (lang === 'zh') return (s.match(/[^。！？]+(?:[。！？]+[”’」』）]*|$)/g) || []).map((x) => x.trim()).filter(Boolean);
  return s.split(/(?<=[.!?…][»”"’)]?)\s+(?=[«"“A-ZÀ-ÖØ-Ý0-9¡¿])/u).map((x) => x.trim()).filter(Boolean);
}

// The utterances of slide i in language l, in reading order: [{ part, text }]
// part: 'q' (question, first slide only) · 'kind' (heading) · 'text' · 'term' / 'def' (+ word index k)
export function slideReading(t, i, l) {
  const s = t.slides[i], out = [];
  if (i === 0) out.push({ part: 'q', text: txt(t.q, l) });
  if (KIND[s.kind]) out.push({ part: 'kind', text: KIND[s.kind][l] });
  if (s.kind === 'words') {
    s.words.forEach((w, k) => {
      out.push({ part: 'term', k, text: l === 'zh' ? w.zh.t.hz : w[l].t });
      for (const x of sentences(l === 'zh' ? w.zh.d.hz : w[l].d, l)) out.push({ part: 'def', k, text: x });
    });
  } else for (const x of sentences(txt(s, l), l)) out.push({ part: 'text', text: x });
  return out;
}
// Quiz: the question is read (options are not).
export const quizSay = (x, l) => txt(x, l);
