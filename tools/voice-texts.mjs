// Collects every sentence worth pre-recording (books, « Pourquoi? », fixed exercise prompts, praise).
// `node tools/voice-texts.mjs` → prints counts; imported by tools/eleven.mjs.
import { makeRng } from '../js/util.js';
import fs from 'node:fs';

// Same hash in the browser (js/audio.js) and here: FNV-1a 32-bit of `${lang}|${text}`.
export function voiceKey(lang, text) {
  let h = 0x811c9dc5;
  const s = `${lang}|${text}`;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}
// Same text normalisation as speak() in js/audio.js.
export const norm = (t) => String(t).replace(/☐/g, '').replace(/_{2,}/g, ' … ').trim();

const root = new URL('../', import.meta.url);
export async function collect({ sets = ['books', 'why', 'prompts', 'arts'] } = {}) {
  const out = new Map();   // key -> { lang, text, set }
  const add = (lang, text, set) => { if (!text) return; const t = norm(text); if (!t) return; const k = voiceKey(lang, t); if (!out.has(k)) out.set(k, { lang, text: t, set }); };

  if (sets.includes('books')) {
    const dir = new URL('js/content/livres/', root);
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
      const { book: b } = await import(new URL(f, dir).href);
      add('fr-CA', b.title, 'books');
      for (const p of b.pages) add('fr-CA', p.text, 'books');
      for (const w of b.words) add('fr-CA', `${w.word}. ${w.def}`, 'books');
      for (const q of b.quiz) add('fr-CA', q.q, 'books');
    }
  }
  if (sets.includes('why')) {
    for (const c of ['animaux', 'corps', 'ciel', 'science']) {
      const { topics } = await import(new URL(`js/content/why/${c}.js`, root).href);
      for (const t of topics) {
        // first slide is read together with the question
        add('zh-CN', `${t.q.zh} ${t.slides[0].zh}`, 'why'); add('fr-CA', `${t.q.fr} ${t.slides[0].fr}`, 'why');
        for (const s of t.slides) { add('zh-CN', s.zh, 'why'); add('fr-CA', s.fr, 'why'); }
        if (t.fact) { add('zh-CN', t.fact.zh, 'why'); add('fr-CA', t.fact.fr, 'why'); }
        for (const q of t.quiz) { add('zh-CN', q.zh, 'why'); add('fr-CA', q.fr, 'why'); }
      }
    }
  }
  if (sets.includes('arts')) {
    // hand-made Arts plastiques projects (what js/arts.js reads aloud), in both UI languages
    const { ART_FILES } = await import(new URL('js/content/arts/index.js', root).href);
    const LANGS = { fr: 'fr-CA', en: 'en-CA' };
    const NEED = { fr: 'Ce qu’il te faut', en: 'What you need' };
    const both = (o) => { if (o && typeof o === 'object') for (const [ui, l] of Object.entries(LANGS)) if (typeof o[ui] === 'string') add(l, o[ui], 'arts'); };
    // lessons and artists first (most voiced reading), then the new techniques
    const PRIO = ['cours', 'artistes', 'peinture', 'collage', 'impression', 'modelage', 'fils'];
    for (const f of [...PRIO, ...ART_FILES.filter((x) => !PRIO.includes(x))]) {
      if (!fs.existsSync(new URL(`js/content/arts/${f}.js`, root))) continue;
      const mod = await import(new URL(`js/content/arts/${f}.js`, root).href);
      for (const p of mod.projects || []) {
        for (const ui of ['fr', 'en']) add(LANGS[ui], `${p.title[ui]}. ${NEED[ui]} : ${p.materials.map((m) => m[ui]).join(', ')}.`, 'arts');
        for (const s of p.steps || []) both(s.text);
      }
      for (const x of mod.lessons || []) { both(x.goal); for (const v of x.vocab || []) { both(v.word); both(v.def); } for (const s of x.teach || []) both(s.text); for (const q of x.retour || []) both(q); }
      for (const a of mod.artists || []) { for (const s of a.bio || []) both(s); for (const q of a.look || []) both(q); for (const w of a.famous || []) both(w.desc); for (const q of a.quiz || []) both(q.q); }
    }
    // generic sentences of the generated libraries (recorded once)
    for (const t of [{ fr: 'Ajoute le trait suivant.', en: 'Add the next line.' }, { fr: 'Continue avec la ligne rose.', en: 'Keep going with the pink line.' },
      { fr: 'Dessine la partie en rose.', en: 'Draw the part in pink.' }, { fr: 'Ajoute un autre trait.', en: 'Add another line.' },
      { fr: 'Ajoute le dernier trait.', en: 'Add the last line.' }, { fr: 'Colorie-le comme tu veux!', en: 'Color it any way you like!' },
      { fr: 'Bravo, artiste!', en: 'Well done, artist!' }]) both(t);
  }
  if (sets.includes('prompts')) {
    // texts that come back again and again in the generated exercises (≥ 8 % of a unit's questions)
    const subj = { francais: 'fr-CA', francais2: 'fr-CA', francais3: 'fr-CA', francais4: 'fr-CA', francais5: 'fr-CA', francais6: 'fr-CA', math: null, anglais: 'en-CA', anglais2: 'en-CA', anglais3: 'en-CA', 'anglais-catch': 'en-CA', chinois: 'zh-CN', chinois2: 'zh-CN', chinois3: 'zh-CN' };
    for (const [file, speech] of Object.entries(subj)) {
      if (!fs.existsSync(new URL(`js/content/${file}.js`, root))) continue;
      const { units } = await import(new URL(`js/content/${file}.js`, root).href);
      // units with fixed sentences (dictations…) list them all
      for (const u of units) for (const sy of (u.allSay?.() || [])) {
        for (const ui of ['fr', 'en']) {
          let text = sy.text, lang = sy.lang;
          if (text && typeof text === 'object') { text = text[ui] ?? text.fr; lang = lang || (ui === 'fr' ? 'fr-CA' : 'en-CA'); }
          if (typeof text === 'string') add(lang || speech || 'fr-CA', text, 'prompts');
        }
      }
      for (const u of units) for (const level of [1, 2, 3]) {
        const R = makeRng(7 + level), seen = new Map(), N = 300;
        for (let i = 0; i < N; i++) {
          const q = u.generate(level, R);
          const say = q.say || (q.prompt ? { text: q.prompt } : null);
          if (!say) continue;
          for (const ui of ['fr', 'en']) {
            let text = say.text, lang = say.lang;
            if (text && typeof text === 'object') { text = text[ui] ?? text.fr; lang = lang || (ui === 'fr' ? 'fr-CA' : 'en-CA'); }
            if (!lang) lang = speech || (ui === 'fr' ? 'fr-CA' : 'en-CA');
            if (typeof text !== 'string') continue;
            const k = `${lang}|${norm(text)}`;
            seen.set(k, (seen.get(k) || 0) + 1);
          }
        }
        for (const [k, n] of seen) if (n >= N * 0.08) { const i = k.indexOf('|'); add(k.slice(0, i), k.slice(i + 1), 'prompts'); }
      }
    }
    const { STRINGS } = await import(new URL('js/i18n.js', root).href).catch(() => ({}));
    if (STRINGS) {
      for (const w of STRINGS.great.fr) add('fr-CA', w, 'prompts');
      for (const w of STRINGS.great.en) add('en-CA', w, 'prompts');
      for (const w of STRINGS.great.zh || []) add('zh-CN', w, 'prompts');
      for (const m of STRINGS.endMsg) { add('fr-CA', m.fr, 'prompts'); add('en-CA', m.en, 'prompts'); }
    }
  }
  return out;
}

if (process.argv[1] && new URL(import.meta.url).pathname.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop())) {
  const all = await collect();
  const by = {};
  for (const v of all.values()) { const k = `${v.set} ${v.lang}`; by[k] ??= { n: 0, chars: 0 }; by[k].n++; by[k].chars += v.text.length; }
  console.table(by);
  console.log('total', all.size, 'clips,', [...all.values()].reduce((a, v) => a + v.text.length, 0), 'characters');
}
