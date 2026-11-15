# Mes livres — illustrated French storybooks (Québec 2e année and up)

One book per file: `js/content/livres/<id>.js` exporting `book`:

```js
export const book = {
  id: 'trois-petits-cochons',
  title: 'Les trois petits cochons',
  emoji: '🐷',
  level: 1,                 // 1 = début 2e année · 2 = fin 2e année · 3 = 3e année
  minutes: 8,               // reading time
  cover: '<svg viewBox="0 0 400 300">…</svg>',   // title page picture (no words in the SVG)
  pages: [                  // 10–16 pages
    { svg: '<svg viewBox="0 0 400 300">…</svg>', text: 'Il était une fois trois petits cochons. Ils vivaient avec leur maman.' },
  ],
  words: [                  // 6–10 vocabulary words from the story, shown at the end
    { word: 'la paille', emoji: '🌾', def: 'Des tiges de blé sèches et jaunes.' },
  ],
  quiz: [                   // 5–8 comprehension questions (who, where, why, order of events, feelings, vocabulary)
    { q: 'Avec quoi le premier cochon construit-il sa maison?', options: ['De la paille', 'Des briques', 'Du bois'], answer: 0 },
  ],
};
```

Text
- Québec French, correct spelling and agreement, natural sentences a 2e année reader can decode: 1–3 sentences per page (≤ 35 words), mostly frequent words, a few new words explained by the picture or the context. Level 2–3 may use dialogue with « guillemets » and — tirets.
- Warm, funny, kind; a clear beginning, problem, attempts, solution, ending. No violence beyond fairy-tale level (the wolf runs away; nobody is eaten).

Pictures
- `viewBox="0 0 400 300"`, flat picture-book style with full colour backgrounds (sky, ground, rooms), `#3a3f55` outlines (stroke 3–4), soft palette.
- Characters must look THE SAME on every page: write one helper per character (e.g. `cochon(x, y, s, hat)`) and reuse it. Show what the page text says.
- No words in pictures (signs may use simple symbols). No `<script>`, events, external refs, `<image>`. ≤ 40 000 characters per SVG (each picture is shown as an isolated image, so `<style>`, `<defs>`, gradients and ids are safe).

Check: `node tools/check-livres.mjs [id…]`. Preview: `http://localhost:5180/tools/livre-preview.html?id=trois-petits-cochons` (silent screenshots with tools/shot.mjs).
