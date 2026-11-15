// Arts plastiques — « Apprécier des œuvres d’art » : galerie d’artistes + visite guidée d’un artiste.
// Data: js/content/arts/artistes.js (loaded on demand). CSS: css/arts-artistes.css.
// API: openArtists(back?), openArtist(id, back?), setProjectOpener(fn) where fn(projectId, backToArtist).
import { el } from './util.js';
import { store, save, today } from './store.js';
import { tr, lang } from './i18n.js';
import { speak, sfx, setContentLang, unlockAudio } from './audio.js';
import { screen, backBtn, wallet, refreshWallet } from './ui.js';
import { COIN, addCoins, confetti, floatText } from './game.js';

const T = (fr, en) => ({ fr, en });
const L = {
  gallery: T('Galerie des artistes', 'Artists’ gallery'), intro: T('Touche un tableau pour rencontrer son artiste.', 'Tap a painting to meet its artist.'),
  bio: T('Qui est-ce?', 'Who is it?'), look: T('Regarde bien', 'Look closely'), thought: T('J’y ai pensé 💭', 'I thought about it 💭'),
  famous: T('Une œuvre célèbre', 'A famous work'), quiz: T('Petit quiz', 'Little quiz'), end: T('À ta manière!', 'Your turn!'),
  bravo: T('Bravo!', 'Well done!'), oops: T('Presque! C’était :', 'Almost! It was:'), next: T('Suivant', 'Next'),
  projects: T('Crée une œuvre à la manière de', 'Make an artwork in the style of'), back: T('Retour à la galerie', 'Back to the gallery'),
  met: T('Tu as rencontré', 'You met'), visited: T('visité', 'visited'), words: T('Décrite en mots : imagine-la dans ta tête!', 'Described in words: picture it in your mind!'),
  again: T('Revoir', 'Again'),
  qc: T('Québec et Canada', 'Quebec and Canada'), pn: T('Premières Nations, Métis et Inuit', 'First Nations, Métis and Inuit'), monde: T('Le monde', 'The world'),
};
const GROUPS = [['qc', '🍁'], ['pn', '🌅'], ['monde', '🌍']];

let opener = null, galleryBack = null, data = null;
export const setProjectOpener = (fn) => { opener = fn; };
async function load() { return (data ??= await import('./content/arts/artistes.js')); }
const rec = (id) => { store.arts.artists ??= {}; return (store.arts.artists[id] ??= {}); };
const voice = () => { unlockAudio(); setContentLang(lang() === 'fr' ? 'fr-CA' : 'en-CA'); };
const say = (x) => speak({ text: tr(x) });
const frame = (a, cls = '') => el('div', { class: `aa-frame ${cls}` }, el('div', { class: 'aa-canvas', html: a.style }));

export async function openArtists(back) {
  if (back) galleryBack = back;
  const { artists } = await load();
  voice();
  const card = (a) => el('button', { class: `aa-card ${store.arts.artists?.[a.id]?.seen ? 'seen' : ''}`, onclick: () => { sfx('tap'); openArtist(a.id); } },
    frame(a, 'sm'),
    el('div', { class: 'aa-plaque' }, el('b', {}, a.name), el('small', {}, `${a.flag} ${tr(a.years)}`)),
    store.arts.artists?.[a.id]?.seen ? el('span', { class: 'aa-seen', title: tr(L.visited) }, '✔') : null);
  screen('aa-gallery purple',
    el('header', { class: 'bar' }, backBtn(() => (galleryBack ? galleryBack() : history.back())), el('h1', {}, '🖼️ ', tr(L.gallery)), wallet()),
    el('p', { class: 'aa-intro' }, tr(L.intro)),
    GROUPS.map(([g, icon]) => el('section', { class: 'aa-wall' },
      el('h2', { class: 'aa-wall-title' }, icon, ' ', tr(L[g])),
      el('div', { class: 'aa-grid' }, artists.filter((a) => a.group === g).map(card)))));
  say(L.intro);
}

export async function openArtist(id, back) {
  const { artists, projects } = await load();
  const a = artists.find((x) => x.id === id);
  if (!a) return openArtists();
  const goBack = back || (() => openArtists());
  voice();
  const stages = [
    ...a.bio.map((b, i) => ({ k: 'bio', i })),
    ...a.look.map((q, i) => ({ k: 'look', i })),
    ...a.famous.map((w, i) => ({ k: 'famous', i })),
    ...a.quiz.map((q, i) => ({ k: 'quiz', i })),
    { k: 'end' },
  ];
  const r = rec(id);
  const panel = el('div', { class: 'aa-panel' });
  const dots = el('div', { class: 'aa-dots' });
  let cur = 0;

  const nav = (canNext = true, label) => el('div', { class: 'aa-nav' },
    el('button', { class: 'btn ghost', disabled: cur === 0, onclick: () => { sfx('tap'); show(cur - 1); } }, '◀'),
    canNext ? el('button', { class: 'btn primary', onclick: () => { sfx('tap'); show(cur + 1); } }, label || `${tr(L.next)} ▶`) : null);
  const head = (icon, t, sayIt) => el('div', { class: 'aa-head' }, el('span', { class: 'aa-icon' }, icon), el('h3', {}, tr(t)),
    sayIt ? el('button', { class: 'say-btn', 'aria-label': '🔊', onclick: () => say(sayIt) }, '🔊') : null);

  function show(n) {
    cur = Math.max(0, Math.min(stages.length - 1, n));
    const st = stages[cur];
    dots.innerHTML = '';
    stages.forEach((s, k) => dots.append(el('span', { class: `aa-dot ${s.k} ${k < cur ? 'past' : ''} ${k === cur ? 'now' : ''}` })));
    panel.innerHTML = '';
    panel.className = `aa-panel ${st.k}`;
    if (st.k === 'bio') {
      const b = a.bio[st.i];
      panel.append(head('👩‍🎨', L.bio, b), el('p', { class: 'aa-big' }, tr(b)), nav());
      say(b);
    } else if (st.k === 'look') {
      const q = a.look[st.i];
      panel.append(head('👀', L.look, q), el('p', { class: 'aa-big aa-q' }, tr(q)), el('div', { class: 'aa-nav' },
        el('button', { class: 'btn ghost', onclick: () => { sfx('tap'); show(cur - 1); } }, '◀'),
        el('button', { class: 'btn primary aa-thought', onclick: () => { sfx('good'); show(cur + 1); } }, tr(L.thought))));
      say(q);
    } else if (st.k === 'famous') {
      const w = a.famous[st.i];
      const text = `${tr(w.title)}, ${tr(w.year)}. ${tr(w.desc)}`;
      panel.append(head('🏛️', L.famous, text),
        el('div', { class: 'aa-work' }, el('b', {}, '« ', tr(w.title), ' »'), el('small', {}, tr(w.year)), el('p', {}, tr(w.desc)), el('em', {}, tr(L.words))), nav());
      say(text);
    } else if (st.k === 'quiz') {
      const q = a.quiz[st.i];
      r.q ??= [];
      let done = false;
      const next = el('button', { class: 'btn primary', disabled: true, onclick: () => { sfx('tap'); show(cur + 1); } }, `${tr(L.next)} ▶`);
      const fb = el('div', { class: 'aa-fb' });
      const choices = el('div', { class: 'aa-choices' }, q.choices.map((c, k) => el('button', { class: 'aa-choice', onclick: (e) => {
        if (done) return;
        done = true;
        const btns = [...choices.children];
        btns[q.answer].classList.add('right');
        choices.classList.add('locked');
        if (k === q.answer) {
          const first = !r.q.includes(st.i);
          const coins = first ? 5 : 1;
          if (first) r.q.push(st.i);
          addCoins(coins); save(); refreshWallet();
          sfx('good'); floatText(`+${coins} ${COIN}`, e.clientX, e.clientY);
          fb.textContent = `${tr(L.bravo)} +${coins} ${COIN}`; fb.className = 'aa-fb ok';
          say(L.bravo);
        } else {
          btns[k].classList.add('wrong');
          sfx('bad');
          fb.textContent = `${tr(L.oops)} ${tr(q.choices[q.answer])}`; fb.className = 'aa-fb no';
          say(fb.textContent);
        }
        next.disabled = false;
      } }, tr(c))));
      panel.append(head('❓', L.quiz, q.q), el('p', { class: 'aa-big' }, tr(q.q)), choices, fb, el('div', { class: 'aa-nav' },
        el('button', { class: 'btn ghost', onclick: () => { sfx('tap'); show(cur - 1); } }, '◀'), next));
      say(q.q);
    } else {
      const first = !r.seen;
      r.seen = today(); save();
      if (first) { sfx('win'); confetti(50); }
      const list = a.projects.map((pid) => projects.find((p) => p.id === pid)).filter(Boolean);
      panel.append(head('🎨', L.end),
        el('p', { class: 'aa-big' }, `${tr(L.met)} ${a.name}! ${tr(L.projects)} ${a.name} :`),
        el('div', { class: 'aa-projects' }, list.map((p) => el('button', { class: 'aa-proj', onclick: () => {
          sfx('tap');
          if (opener) opener(p.id, () => openArtist(id, back)); else console.warn('arts-artistes: no project opener set');
        } }, el('div', { class: 'aa-proj-pic', html: p.steps[p.steps.length - 1].svg }), el('b', {}, p.emoji, ' ', tr(p.title)), store.arts.done?.[p.id] ? el('span', { class: 'aa-seen' }, '✔') : null))),
        el('div', { class: 'aa-nav' },
          el('button', { class: 'btn ghost', onclick: () => { sfx('tap'); show(0); } }, '↻ ', tr(L.again)),
          el('button', { class: 'btn primary', onclick: () => { sfx('tap'); goBack(); } }, tr(L.back))));
      say(`${tr(L.met)} ${a.name}! ${tr(L.projects)} ${a.name}.`);
    }
  }

  screen('aa-artist purple',
    el('header', { class: 'bar' }, backBtn(goBack), el('h1', {}, a.flag, ' ', a.name), wallet()),
    el('div', { class: 'aa-body' },
      el('div', { class: 'aa-left' },
        frame(a, 'big'),
        el('div', { class: 'aa-plaque big' }, el('b', {}, a.name), el('small', {}, `${tr(a.years)} · ${tr(a.country)}`), el('small', {}, tr(a.movement))),
        el('p', { class: 'aa-note' }, lang() === 'fr' ? 'Image inventée dans le style de l’artiste.' : 'A made-up picture in the artist’s style.')),
      el('div', { class: 'aa-right' }, dots, panel)));
  show(0);
}
