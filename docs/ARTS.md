# Arts plastiques — project library schema

Each category is one ES module `js/content/arts/<cat>.js` exporting `projects`:

```js
export const projects = [
  {
    id: 'dessin-chat',              // unique, prefix = category id
    cat: 'dessin',                  // 'dessin' | 'pliage' | 'recup' | 'fetes'
    emoji: '🐱',                    // one emoji for the card
    title: { fr: 'Un chat', en: 'A cat' },
    level: 1,                       // 1 Facile · 2 Moyen · 3 Difficile (for a 7–8 year old)
    minutes: 10,                    // honest time estimate
    theme: 'animaux',               // free tag used for filters: animaux, personnages, vehicules, nature, fantastique, objets, nourriture, jouets, decorations, cartes …
    season: null,                   // optional: 'automne' | 'hiver' | 'printemps' | 'ete' | 'halloween' | 'noel' | 'saint-valentin' | 'paques' | 'fete-des-meres' | 'fete-des-peres' | 'cabane-a-sucre' | 'fete-nationale' | 'jour-de-la-terre'
    materials: [{ fr: 'Feuille blanche', en: 'White paper' }, …],
    adult: false,                   // true if a grown-up must help (cutting thick cardboard, piercing, stapling…)
    steps: [
      { svg: '<svg viewBox="0 0 400 300" …>…</svg>', text: { fr: 'Dessine un grand rond pour la tête.', en: 'Draw a big circle for the head.' } },
      …                             // 4–10 steps; the last step shows the finished, coloured result
    ],
  },
];
```

## Step pictures (SVG)
- `viewBox="0 0 400 300"`, white background is provided by the page (do not paint a full background unless it is part of the art, e.g. coloured paper).
- Self-contained: no `<script>`, no event attributes, no external `href`/images, no `<text>` words (the instruction text is spoken and shown below; small digits like 1 2 3 in circles are OK).
- Keep each step under ~3 KB. Helpers that build SVG strings in the module are encouraged.
- **Drawing (dessin):** strokes already drawn = `#3a3f55`, width 6, round caps; strokes **new in this step** = `#ff5d8f`, width 8. The final step is the coloured finished picture.
- **Folding/cutting:** paper = soft colour fill + `#3a3f55` outline; fold lines = dashed (`stroke-dasharray="10 8"`); motion = curved arrow in `#ff5d8f`; cut lines = dashed with a small ✂ drawn as shapes or just a red dashed line.
- **Making things (récup, fêtes):** show the materials/objects simply (flat shapes, 2–4 colours), the change of this step highlighted in `#ff5d8f` outline or arrow.

## Text
Short sentences a 7–8-year-old understands when read aloud. French is Québec French (« colle », « rouleau de papier de toilette », « carton », « crayons de couleur », « feutres »). One action per step.

## Checking
- `node tools/check-arts.mjs` validates every file.
- Preview all pictures: with `node tools/serve.mjs` running, open `http://localhost:5180/tools/arts-preview.html?cat=dessin`;
  silent screenshot: `node tools/shot.mjs <outDir> "http://localhost:5180/tools/arts-preview.html?cat=dessin&from=0&n=8" <steps.json>` with steps `[{"wait":800,"shot":"p0"}]` and env `H=2400` for a tall page.

## Big generated libraries (OpenMoji, Quick, Draw!)
- `js/content/arts/openmoji.js` (id `om-<hex>`, `gen: 'parts'`) and `quickdraw.js` (id `qd-<word>-<n>`, `gen: 'strokes'`) store NO `steps`. `js/arts-gen.js` builds them when a project is opened (`ensureSteps`) and a thumbnail (`thumbSvg`) for cards. Both files are loaded only when the « Animaux (bibliothèque) » / « Bibliothèque » tabs or the search are used.
- `parts`: `line` = black outline as only `<path>` (72x72; `t="f"` filled, `t="b"` filled+stroked, `w` stroke width, `e` evenodd), `color` = coloured SVG (72x72, `~l` = usual outline attributes). Steps: pieces sorted big to small, 3-7 groups, old parts #3a3f55 / new #ff5d8f, last step = `color`. Very simple drawings split an outline in halves with dashes.
- `strokes`: `"x,y x,y|x,y …"`, 4-14 strokes in a 256 box; 1-2 strokes per step, fitted into 400x300.
- Generated step pictures may be up to 12 KB (limit in check-arts). Each such project shows a credit line (`CREDIT` in arts-gen.js; see docs/CREDITS.md).
- Regenerating: these files were built by scripts outside the repo from the OpenMoji npm package (SVGs), hand-written French/English titles, and Quick, Draw! ndjson samples (first ~1.8 MB per category).

## 2026-11 expansion (art-teacher mode)
- File list lives in `js/content/arts/index.js` (`ART_FILES`, `BIG_FILES`); `js/arts.js` and `tools/check-arts.mjs` read it. New categories: `peinture`, `collage`, `impression`, `modelage`, `fils` (one tab each); more projects in `dessin4` (scenes), `pliage2`, `recup2`, `fetes2`.
- Hub doors on the Arts screen: **Mes cours d'art** (`js/arts-cours.js` + `js/content/arts/cours.js`: 20 ordered lessons, goal → slides → vocabulary → mini-game (sort, mix, symmetry, pattern, spot, quiz) → reflection → project; check `node tools/check-cours.mjs`), **Les artistes** (`js/arts-artistes.js` + `js/content/arts/artistes.js`: 25 artists, Québec/Canada, Premières Nations/Métis/Inuit, world; original pictures "in the style", works only described; check `node tools/check-artistes.mjs`), **Atelier** (`js/atelier.js`: Pencil canvas, fill, mirror, colour mixer, colouring pages `coloriages.js` or any drawing project via « Colorier »), **Mon musée** (`js/musee.js`: photos of real artworks + Atelier saves in IndexedDB `hibou-musee`, only on the iPad).
- Project back buttons can return to the lesson/artist that opened them (`projectBack` in arts.js).
- Voice-over: `tools/voice-texts.mjs` set `arts` (project intro + steps, lessons, artists, generic library lines).
