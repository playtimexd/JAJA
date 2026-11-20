# Pourquoi? 十万个为什么 — trilingual science encyclopedia

A children's encyclopedia for a curious 7–9-year-old: 163 topics in 6 domains, each read in **French (Québec)**, **English (Canada)** or **Chinese (simplified + pinyin)**, aloud sentence by sentence, then a quiz.

| domain (`cat`) | shelves (`shelf`) | topics |
|---|---|---|
| `animaux` Animaux et plantes | ici · loin · eau-air · betes · plantes | 31 |
| `corps` Le corps humain | auto · dedans · sens · grandir · sante | 30 |
| `ciel` Ciel et espace | soleil · lune · etoiles · espace | 23 |
| `terre` La Terre et la météo | meteo · tempetes · hiver · planete · eau | 29 |
| `science` Sciences de tous les jours | eau-glace · cuisine · lumiere-son · forces | 26 |
| `techno` Inventions et technologie | grandes · energie · transport · numerique · canada | 24 |

## Files
- `js/content/why/<cat>.js` — `export const topics = [...]` (data only).
- `js/content/why/<cat>-pics.js` — `export const PICS = { [topicId]: [svg, …] }`: the drawn pictures; a slide shows `PICS[id][slide.pic]`, otherwise its emoji big.
- `js/content/why/groups.js` — `CATS` (domains + shelves, labels fr/en/zh) and `MOVED` (old id → new id; progress is carried over).
- `js/why-text.js` — what is read aloud (`slideReading`, `sentences`, headings, praise). Shared by `js/why.js` and `tools/voice-texts.mjs`, so pre-recorded clip keys always match.
- `js/why.js` — UI. `css/why.css` — styles.

## Topic schema
A Chinese text is always `{ hz, py, w }`: `hz` characters; `py` one tone-marked syllable per Han character (neutral tone unmarked, 一/不 tone changes applied, punctuation and digits have none); `w` = word lengths (code points) covering all of `hz` — the words a child can tap, with pinyin over them.

```js
{
  id: 'animaux-guepard', cat: 'animaux', shelf: 'loin', emoji: '🐆', level: 1,   // 1 concrete · 2 · 3 more abstract
  q: { fr: 'Pourquoi le guépard court-il si vite?', en: 'Why is the cheetah so fast?', zh: { hz: '猎豹为什么跑得那么快？', py: 'liè bào wèi shén me pǎo de nà me kuài', w: [2, 3, 1, 1, 2, 1, 1] } },
  slides: [                                   // 5–8 slides
    { kind: 'explain', emoji: '🐆💨🚗', pic: 0, fr: '…', en: '…', zh: { hz, py, w } },   // ≥ 3: one idea, numbers, comparisons, cause → effect
    { kind: 'fact', emoji: '🏎️', fr, en, zh },      // ≥ 1 « Le savais-tu? »
    { kind: 'try', emoji: '⏱️', fr, en, zh },        // « Essaie à la maison » (safe experiment / observation), most topics
    { kind: 'words', emoji: '📖', words: [            // exactly 1, last: 2–4 vocabulary words
      { fr: { t: 'un prédateur', d: 'Un animal qui chasse…' }, en: { t, d }, zh: { t: { hz, py, w }, d: { hz, py, w } } } ] },
  ],
  quiz: [                                     // 4–5 questions, some need reasoning
    { fr: '…?', en: '…?', zh: { hz, py, w }, options: [ { fr, en, zh: { hz, py, w }, emoji: '🐆' }, … ], answer: 0 } ],   // 3–4 options, index before shuffling
}
```

## Writing rules
- Rich and true (a good children's encyclopedia, not baby talk): real numbers and comparisons to things a child knows, cause → effect, no myths; "les scientifiques pensent que…" when science is unsure. Québec/Canada angles when true.
- fr = Québec French, en = Canadian spelling, zh = natural Mandarin for children (no Latin letters, full-width punctuation, Arabic digits OK).
- Sentences are read and highlighted one by one: ≤ 26 words (fr/en) / ≤ 42 characters (zh), ending with . ! ? / 。！？, no abbreviations with a period. A slide ≤ 72 words (fr) / 115 characters (zh).
- Pictures (`*-pics.js`): `viewBox="0 0 400 300"`, flat style, no words, no script/external refs.

## Reading UI
- Language switch FR / EN / 中文 (default = app language; the choice is remembered in `store.settings.whyLang`; when the app language changes, the module follows it). Switching re-renders the slide in place and the voice follows.
- Each slide is read automatically, the current sentence highlighted; every word is tappable (Chinese: jieba words with pinyin on top). 🔊 rereads the slide.
- 🎧 *Écouter tout*: reads the whole topic slide after slide. 🔁 *Les trois langues*: reads every slide in fr → en → zh (text switches with the voice), then moves on.
- Home: domain tabs, shelves with progress (✔ read = reached the last slide, ⭐ quiz done — `store.whyRead`, `store.why`), search over all three languages and pinyin, 🏆 mixed quiz (lightning / balloons).

## Tools
- `node tools/check-why.mjs [cat…]` — schema, three languages, pinyin count = characters, word lengths, slides 5–8, kinds, quiz 4–5 / answer in range, no empty strings, pictures exist.
- `node tools/voice-texts.mjs` — set `why` = exactly the strings `why.js` speaks (fr-CA, en-CA, zh-CN; Chinese keyed on characters only); optional set `whywords` = the tappable words (otherwise spoken by the device voice). Record with `node tools/eleven.mjs --sets why`.
- `tools/why-pinyin.py` — pinyin + word segmentation for new Chinese strings (`echo '["…"]' | localvoice/.venv/Scripts/python.exe -I -X utf8 tools/why-pinyin.py`); always proofread polyphones (长 行 还 得 地 着 重 …).
- Preview all slides: `http://localhost:5180/tools/why-preview.html?cat=terre` (silent screenshots with `tools/shot.mjs`).
