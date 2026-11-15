# Pourquoi? 十万个为什么 — science explainer library

One file per category: `js/content/why/<cat>.js` exporting `topics`:

```js
export const topics = [
  {
    id: 'animaux-chat-ronronne',     // unique, prefix = category id
    cat: 'animaux',                  // 'animaux' | 'corps' | 'ciel' | 'science'
    emoji: '🐱',
    level: 1,                        // 1 easy idea · 2 · 3 more abstract
    q: { zh: '猫为什么会打呼噜？', py: 'māo wèi shén me huì dǎ hū lu', fr: 'Pourquoi le chat ronronne-t-il?' },
    slides: [                        // 2–4 short explanation slides, one idea each
      { svg: '<svg viewBox="0 0 400 300" …>…</svg>',
        zh: '猫咪喉咙里有很小的肌肉，会很快地一松一紧。', py: '…one syllable per Han character…',
        fr: 'Dans sa gorge, le chat a de petits muscles qui bougent très vite.' },
    ],
    fact: { zh, py, fr },            // optional "le savais-tu? 你知道吗？" fun fact
    quiz: [                          // 2–3 questions about what was explained
      { zh: '猫咪开心的时候会怎么样？', py: '…', fr: 'Que fait le chat quand il est content?',
        options: [ { zh: '打呼噜', py: 'dǎ hū lu', fr: 'Il ronronne', emoji: '😺' }, … ],   // 3 options (4 at level 3)
        answer: 0 },                 // index BEFORE shuffling
    ],
  },
];
```

Rules
- Audience: a 7-year-old. Chinese (Simplified) is the main language, read aloud in Mandarin; French is the alternate language (Québec French). Every zh string has `py` with exactly one tone-marked syllable per Han character (punctuation has none; neutral tone unmarked). The validator checks the counts.
- Short sentences (≤ 20 characters in zh). True, simple, not misleading: simplify but never say something false. Canadian/Québec examples welcome (maple leaves, snow, moose, beavers, northern lights).
- Pictures: `viewBox="0 0 400 300"`, flat friendly style, `#3a3f55` outlines, soft colours, no words inside (digits OK), no script/external refs, ≤ 6000 chars each. Show the idea (cut-away, arrows, before/after).
- Quiz options must have exactly one correct answer; wrong ones clearly wrong for an adult.

Check: `node tools/check-why.mjs [cat]`. Preview: `http://localhost:5180/tools/why-preview.html?cat=animaux` (silent screenshots with tools/shot.mjs).
