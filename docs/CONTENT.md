# Petit Hibou — content schema

A **subject module** (`js/content/<subject>.js`) is an ES module that exports:

```js
export const units = [
  {
    id: 'f1',                       // unique, prefix m/f/e by subject
    icon: '🔤',                      // one emoji
    title: { fr: 'Les sons', en: 'Sounds' },
    pfeq: 'Lecture — correspondances lettres-sons (PFEQ 1er cycle, 2e année)',
    generate(level, R) { return question },   // level = 1 | 2 | 3 (easy → challenge)
  },
];
```

`generate` is called 8 times per session. It must return a **fresh, valid question** every call,
using only the helper `R` (never `Math.random` directly) so tests can seed it:

```js
R.int(a, b)            // integer in [a, b]
R.pick(arr)            // one element
R.sample(arr, n)       // n distinct elements
R.shuffle(arr)         // shuffled copy
R.chance(p)            // boolean
```

Every question has a `key` string (same key = same question; the session avoids repeats).

## Text fields

- A plain string is shown as-is (use for French-course and English-course content).
- `{ fr, en }` is picked by the UI language (use for math prompts / instructions).
- `say: { text, lang }` — text read aloud by TTS (`lang`: `'fr-CA'` or `'en-CA'`).
  `say: { text: { fr, en } }` (no lang) is read in the UI language. A plain-string `text` without `lang`
  uses the subject's language (French course → fr-CA, English course → en-CA).
- Order `tiles` may be strings or `{ fr, en }`.
  If a question has `say`, it is read automatically and a 🔊 replay button is shown.

## Question types

### `choice` — tap one answer
```js
{ type: 'choice', key, prompt, say?, stimulus?, options: [Option], answer: 0, cols?: 2|3|4 }
```
`stimulus` (optional, shown big above the options): `{ emoji }`, `{ text }`, `{ svg }` (raw SVG string)
or `{ emojis: '🍎', count: 7 }` (repeated emoji to count).
`Option`: `{ text?, emoji?, svg?, say? }` — at least one of text/emoji/svg. `say` reads the option when tapped
the first time (use for listening exercises). `answer` = index of the correct option **before** shuffling;
the engine shuffles options itself unless `fixedOrder: true`.

### `sort` — put each item in the right box
```js
{ type: 'sort', key, prompt, say?, bins: [{ text, emoji? }], items: [{ text?, emoji?, say?, bin: 0 }] }
```
2–3 bins, 4–8 items.

### `order` — tap tiles to build the answer in order
```js
{ type: 'order', key, prompt, say?, stimulus?, tiles: ['bal', 'lon'], extra?: ['ta'], joiner?: '' | ' ' }
```
`tiles` are in the **correct order**; the engine shuffles them and mixes in `extra` distractors.
Use for: syllables → word (`joiner: ''`), letters → word, words → sentence (`joiner: ' '`), numbers in order.

### `keypad` — type a number on the big on-screen keypad
```js
{ type: 'keypad', key, prompt, say?, stimulus?, answer: 42 }
```

### `base10` — build a number with hundreds / tens / ones blocks
```js
{ type: 'base10', key, prompt, answer: 347 }
```

### `numberline` — tap the right spot on a number line
```js
{ type: 'numberline', key, prompt, min: 0, max: 100, step: 10, answer: 70 }
```
`answer` must be a multiple of `step` between min and max.

## Rules for content

- Grade 2 (2e année, Québec). Keep sentences short; one instruction per question.
- Prefer emoji for pictures (they look great on iPad). Each emoji must be unambiguous for a 7-year-old.
- French content uses Québec spelling/vocabulary where it differs (ex. « déjeuner » = breakfast, « dîner » = lunch).
- No question may have two correct options. No duplicate option labels.

## Chinese (中文) — `js/content/chinois.js`, `js/content/chinois2.js`
Simplified characters + Hanyu Pinyin with tone marks. The child speaks some Mandarin at home but reads almost nothing: start at 人教版一年级 level.
- Character text: `{ hz: '大山', py: 'dà shān' }` — one pinyin syllable per Han character (punctuation has none). The validator checks the counts.
  Allowed on: options (`{ hz, py, emoji?, say? }`), `stimulus: { hz, py }`, order `tiles: [{ hz, py }]`, sort `bins: [{ hz, py }]`, sort items (`{ hz, py, emoji? }`).
  Pinyin-only option (pinyin exercises): `{ py: 'mā' }`. The pinyin shown above characters can be switched off by parents.
- Prompts/instructions: `{ fr, en }` (the child does not read Chinese instructions yet). Put Chinese audio in `say: { text: '山', lang: 'zh-CN' }`.
- Praise is spoken in Chinese automatically.
- New type **write** (stroke order, Hanzi Writer, needs Internet):
  `{ type: 'write', key, prompt, say?, char: '人', py: 'rén' }` — shows the stroke animation, then the child traces each stroke.

## Handwriting — type `hand` (French and English writing units)
The child writes on a lined pad (Apple Pencil or finger); on « Vérifier » the image is transcribed and graded by AI (worker `/ai/write`).
```js
{ type: 'hand', key, lang: 'fr' | 'en',
  mode: 'dictation' | 'answer' | 'sentence' | 'composition',
  prompt,                      // instruction ({fr,en} or plain string in the course language)
  say?: { text, lang },        // dictation: the exact sentence to dictate (read aloud, repeatable)
  stimulus?,                   // answer: { text: <short text> }; sentence/composition: { emoji } or { svg }
  expected?: 'Le chat dort.',  // dictation only: the exact text (graded word by word, accents count)
  answerKey?: 'Parce qu’il a froid.',   // answer only: the gist of a correct answer
  words?: ['neige', 'glisser'],         // sentence: words that must be used
  minWords?: 5,                // sentence/composition: minimum length
  lines?: 2 }                  // writing lines on the pad (1–8)
```
Units that use `hand` also export `allSay()` on the unit: an array of every fixed `say` object (for pre-recording with ElevenLabs).

## « Mes mots de la semaine » — `js/content/francais4.js` (unités f19 → f30)
Le cahier « Semaines » de la classe : une unité par bloc de 3 semaines (`BLOCKS` exporté : semaines, mots avec
`menotte` ⛓ / `special` *, règle, verbe et sa conjugaison, 3 sons à l'étude avec vrais mots, mots extraterrestres et phrases, dictées).
Semaines 1–26 transcrites des photos; 27–35 `proposed: true` (mots de la liste du MEQ 2e année pas encore vus); sons non
photographiés `inferred: true`. Phrases, dictées et mots extraterrestres sont originaux.
- Facile : écouter → mot bien écrit (faux choix sosies, jamais de vrais mots), mot extraterrestre (3 choix à écouter), mot qui a le son, lire une phrase.
- Moyen : lettres à placer, mot dicté (`hand`), règle du bloc (ge, s, te, c, s=[z], m devant p/b, lettre muette, que, eau, ç, ss; ce/cet/cette; petits mots), verbe au présent.
- Difficile : dictée de phrases faites de mots connus (`hand` dictation, clavier possible), mot dicté, « Écris 2 autres mots avec le son… » (`hand` answer, la correction IA reçoit une liste d'exemples acceptés).
Semaine courante : `frWeek()` (js/store.js) — semaine 13 = semaine du lundi 2026-11-16, +1 chaque lundi; corrigeable sur la page Parents
(`settings.frWeek` + `settings.frWeekAt`). La section « Mes mots de la semaine » est la première en français et met le bloc courant en avant;
le Plan du jour (jours de français) utilise ce bloc pour « Mes mots de la semaine » (niveau ≤ Moyen) et « Dictée de la semaine » (Difficile).
