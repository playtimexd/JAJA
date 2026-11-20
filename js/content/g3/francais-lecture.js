// Petit Hibou — Français 3e année : LECTURE (g3f1 → g3f6).
// Une ronde de pratique = UN texte et ses questions (session). Facile = repérer l’information explicite (3 choix),
// vrai/faux, ordre de 3 événements ; Moyen = implicite, vocabulaire en contexte, ordre de 4 événements (4 choix) ;
// Difficile = inférence, vrai / faux / « le texte ne le dit pas », ordre complet, meilleur résumé, opinion justifiée écrite.
// Textes originaux (francais-lecture-recits.js, francais-lecture-infos.js, francais-lecture-mots.js).
import { ch, srt, ord, ans, unit, cap } from './francais-lib.js';
import { RECITS, BD } from './francais-lecture-recits.js';
import { INFOS, POEMES } from './francais-lecture-infos.js';
import { MOTS, SENS, STRAT } from './francais-lecture-mots.js';

export const TEXTS = { r: RECITS, b: BD, i: INFOS, p: POEMES };   // banque réutilisée par francais-ecrire.js
const UID = { r: 'g3f1', i: 'g3f2', p: 'g3f3', b: 'g3f4' };

const TIP = {
  e: (r) => `Réponse : « ${r} ». Elle est écrite dans le texte : cherche les mots de la question.`,
  i: (r) => `Réponse : « ${r} ». Ce n’est pas écrit mot à mot : assemble les indices du texte.`,
  v: (r) => `Réponse : « ${r} ». Relis la phrase autour du mot : elle t’aide à trouver le sens.`,
  f: (r) => `Réponse : « ${r} ». Utilise les indices du texte et ce que tu sais déjà.`,
};
const isPoem = (tx) => tx.u === 'p';
const sortedIdx = (n, k, R) => R.sample([...Array(n).keys()], k).sort((a, b) => a - b);

function textQs(tx, ti) {
  const id = UID[tx.u], base = `${id}-t${ti}`, stim = { text: `${tx.title}\n\n${tx.text}` };
  const Q = (kind, k, level) => {
    const [p, r, ...w] = tx[kind][k];
    return ch(`${base}-${kind}${k}`, p, r, w, { n: level === 1 ? 3 : 4, stimulus: stim, tip: TIP[kind](r) });
  };
  const vf = (R) => {
    const tru = tx.vf.map((x, k) => [x, k]).filter(([x]) => x[1]), fal = tx.vf.map((x, k) => [x, k]).filter(([x]) => !x[1]);
    const nt = R.int(1, 3), pick = [...R.sample(tru, nt), ...R.sample(fal, 4 - nt)].sort((a, b) => a[1] - b[1]);
    return srt(`${base}-vf-${pick.map((x) => x[1]).join('.')}`, 'Lis le texte. Classe chaque phrase : vraie ou fausse?', [{ text: 'Vrai', emoji: '✔️' }, { text: 'Faux', emoji: '✖️' }],
      pick.map(([x]) => ({ text: x[0], bin: x[1] ? 0 : 1 })), 'Vérifie chaque phrase dans le texte : si le texte dit le contraire, c’est faux.', { stimulus: stim });
  };
  const nd = (R) => {
    const tru = tx.vf.map((x, k) => [x, k]).filter(([x]) => x[1]), fal = tx.vf.map((x, k) => [x, k]).filter(([x]) => !x[1]);
    const a = R.sample(tru, 2), b = R.sample(fal, 2), c = sortedIdx(tx.nd.length, 2, R);
    const items = R.shuffle([...a.map(([x]) => ({ text: x[0], bin: 0 })), ...b.map(([x]) => ({ text: x[0], bin: 1 })), ...c.map((k) => ({ text: tx.nd[k], bin: 2 }))]);
    return srt(`${base}-nd-${a.map((x) => x[1]).sort().join('.')}-${b.map((x) => x[1]).sort().join('.')}-${c.join('.')}`, 'Vrai, faux, ou le texte ne le dit pas?',
      [{ text: 'Vrai', emoji: '✔️' }, { text: 'Faux', emoji: '✖️' }, { text: 'Le texte ne le dit pas', emoji: '❓' }], items,
      'Si tu ne trouves aucune information sur cette phrase dans le texte, choisis « Le texte ne le dit pas ».', { stimulus: stim });
  };
  const evOrder = (R, k) => {
    const idx = k >= tx.ev.length ? tx.ev.map((_, j) => j) : sortedIdx(tx.ev.length, k, R);
    const poem = isPoem(tx);
    return ord(`${base}-ev-${idx.join('.')}`, poem ? 'Remets ces vers dans l’ordre du poème.' : 'Remets les événements dans l’ordre de l’histoire.', idx.map((j) => tx.ev[j]),
      { stimulus: poem ? undefined : stim, joiner: ' ', tip: poem ? 'Relis le début du poème : chaque vers suit le précédent.' : 'Pense à ce qui arrive au début, au milieu, puis à la fin.' });
  };
  const verse = (R) => {
    const k = R.int(0, tx.ev.length - 1), line = tx.ev[k];
    return ord(`${base}-vers${k}`, 'Remets les mots du vers dans l’ordre.', line.split(' '), { stimulus: stim, tip: `Le vers est : « ${line} »` });
  };
  const sec = (R, nb) => {
    const s = sortedIdx(tx.secs.length, nb, R), items = [], kk = [];
    for (const j of s) { const f = sortedIdx(tx.secs[j][1].length, 2, R); kk.push(`${j}:${f.join('.')}`); for (const m of f) items.push({ text: tx.secs[j][1][m], bin: s.indexOf(j) }); }
    return srt(`${base}-sec-${kk.join('|')}`, 'Dans quelle partie du texte trouve-t-on chaque information? Regarde les intertitres.', s.map((j) => tx.secs[j][0]), R.shuffle(items),
      'Les intertitres annoncent le sujet de chaque partie : relis la partie qui correspond.', { stimulus: stim });
  };
  const res = () => ch(`${base}-res`, 'Quel est le meilleur résumé du texte?', tx.res[0], tx.res.slice(1), { n: 4, stimulus: stim, tip: `Un bon résumé dit l’essentiel en une phrase : « ${tx.res[0]} »` });
  const opin = (k) => ans(`${base}-o${k}`, tx.o[k][0], `${tx.title}\n\n${tx.text}`, tx.o[k][1], 'Donne ton avis, puis ajoute « parce que… » avec une raison ou un indice du texte.', 3);

  return {
    1: (R) => [...tx.e.map((_, k) => Q('e', k, 1)), Q('v', 0, 1), vf(R), tx.secs ? sec(R, 2) : isPoem(tx) ? verse(R) : evOrder(R, 3)],
    2: (R) => [...tx.i.map((_, k) => Q('i', k, 2)), ...tx.v.map((_, k) => Q('v', k, 2)), ...(tx.i.length < 3 ? [Q('e', 0, 2), Q('e', 1, 2)] : []), tx.secs ? sec(R, 3) : evOrder(R, 4), vf(R)],
    3: (R) => [...tx.f.map((_, k) => Q('f', k, 3)), nd(R), ...(tx.secs ? [sec(R, 3)] : [evOrder(R, 99)]), res(), ...tx.o.map((_, k) => opin(k))],
  };
}

function readingUnit(u, icon, fr, en, pfeq) {
  const list = TEXTS[u], gens = list.map((tx, ti) => textQs(tx, ti));
  const sess = (level, R) => R.pick(gens)[level](R);
  return unit(UID[u], icon, fr, en, pfeq, { 1: [(R) => R.pick(sess(1, R))], 2: [(R) => R.pick(sess(2, R))], 3: [(R) => R.pick(sess(3, R))] },
    { session: sess });
}

const f1 = readingUnit('r', '📖', 'Je lis des récits', 'Reading stories', 'Lecture — texte narratif : repérer l’information explicite et implicite, ordre des événements, inférence, opinion justifiée');
const f2 = readingUnit('i', '🔎', 'Je lis des textes informatifs', 'Reading information texts', 'Lecture — texte informatif : intertitres, information explicite et implicite, vocabulaire, résumé');
const f3 = readingUnit('p', '🌙', 'Je lis des poèmes', 'Reading poems', 'Lecture — texte poétique : vers, strophes, rimes, images, sens figuré, appréciation');
const f4 = readingUnit('b', '💬', 'Bandes dessinées et dialogues', 'Comics and dialogues', 'Lecture — bande dessinée et dialogue : qui parle, cases, tiret de dialogue, inférence sur les personnages');

/* ---------------------------- g3f5 — Le mot dans le texte ---------------------------- */
const f5 = unit('g3f5', '🔤', 'Le mot dans le texte', 'Words in context',
  'Lecture — vocabulaire : trouver le sens d’un mot à l’aide du contexte, synonymes, mots à plusieurs sens', {
    1: [(R) => {
      const k = R.int(0, MOTS.length - 1), [w, s, m, ...rest] = MOTS[k];
      return ch(`g3f5-m${k}`, `Dans la phrase, que veut dire « ${w} »?`, m, rest.slice(0, 3), { n: 3, stimulus: { text: s }, tip: `« ${cap(w)} » veut dire : ${m}. Les autres mots de la phrase t’aident à le deviner.` });
    }],
    2: [(R) => {
      const k = R.int(0, MOTS.length - 1), [w, s, , , , , syn, ...ws] = MOTS[k];
      return ch(`g3f5-s${k}`, `Quel mot pourrait remplacer « ${w} » dans cette phrase, sans changer le sens?`, syn, ws, { n: 4, stimulus: { text: s }, tip: `On peut dire « ${syn} » : c’est un synonyme dans cette phrase.` });
    }, (R) => {
      const k = R.int(0, MOTS.length - 1), [w, s, m, ...rest] = MOTS[k];
      return ch(`g3f5-m4-${k}`, `Que veut dire « ${w} » dans cette phrase?`, m, rest.slice(0, 3), { n: 4, stimulus: { text: s }, tip: `« ${cap(w)} » veut dire : ${m}.` });
    }],
    3: [(R) => {
      const k = R.int(0, SENS.length - 1), [w, ss] = SENS[k], j = R.int(0, ss.length - 1);
      return ch(`g3f5-p${k}-${j}`, `Dans quelle phrase « ${w} » veut dire « ${ss[j][0]} »?`, ss[j][1], ss.filter((_, x) => x !== j).map((x) => x[1]), { n: 3, tip: `Un même mot peut avoir plusieurs sens. Ici : « ${ss[j][1]} »` });
    }, (R) => {
      const k = R.int(0, SENS.length - 1), [w, ss] = SENS[k], j = R.int(0, ss.length - 1);
      return ch(`g3f5-q${k}-${j}`, `Que veut dire « ${w} » dans cette phrase?`, ss[j][0], ss.filter((_, x) => x !== j).map((x) => x[0]), { n: 3, stimulus: { text: ss[j][1] }, tip: `Dans cette phrase, « ${w} » veut dire : ${ss[j][0]}.` });
    }],
  });

/* ---------------------------- g3f6 — Stratégies de lecture ---------------------------- */
const S = (k) => ({ text: STRAT[k].x });
const f6 = unit('g3f6', '🧭', 'Stratégies de lecture', 'Reading strategies',
  'Lecture — stratégies : prédire, se poser des questions, dégager l’idée principale, résumer', {
    1: [(R) => { const k = R.int(0, STRAT.length - 1), [r, ...w] = STRAT[k].t; return ch(`g3f6-t${k}`, 'Quel titre convient le mieux à ce texte?', r, w, { stimulus: S(k), tip: `Un bon titre annonce le sujet : « ${r} ».` }); },
      (R) => { const k = R.int(0, STRAT.length - 1), [r, ...w] = STRAT[k].p; return ch(`g3f6-p${k}`, 'Prédis : que va-t-il probablement se passer ensuite?', r, w, { stimulus: S(k), tip: 'Pour prédire, utilise les indices du texte : la suite doit être logique.' }); },
      (R) => { const k = R.int(0, STRAT.length - 1), [r, ...w] = STRAT[k].s; return ch(`g3f6-s${k}`, 'De quoi parle surtout ce texte?', r, w, { stimulus: S(k), tip: `Ce texte parle surtout de : ${r}.` }); }],
    2: [(R) => { const k = R.int(0, STRAT.length - 1), [r, ...w] = STRAT[k].m; return ch(`g3f6-m${k}`, 'Quelle est l’idée principale du texte?', r, w, { n: 4, stimulus: S(k), tip: `L’idée principale résume tout le texte, pas seulement un détail : « ${r} »` }); },
      (R) => { const k = R.int(0, STRAT.length - 1), j = R.int(0, 1), r = STRAT[k].qa[j]; return ch(`g3f6-qa${k}-${j}`, 'Je me pose des questions. À quelle question le texte répond-il?', r, STRAT[k].qn, { n: 4, stimulus: S(k), tip: `La réponse à « ${r} » est écrite dans le texte.` }); }],
    3: [(R) => { const k = R.int(0, STRAT.length - 1), [r, ...w] = STRAT[k].r; return ch(`g3f6-r${k}`, 'Quel est le meilleur résumé de ce texte?', r, w, { n: 4, stimulus: S(k), tip: `Un résumé garde l’essentiel en peu de mots : « ${r} »` }); },
      (R) => { const k = R.int(0, STRAT.length - 1), j = R.int(0, 2), r = STRAT[k].qn[j]; return ch(`g3f6-qn${k}-${j}`, 'À quelle question le texte NE répond PAS?', r, STRAT[k].qa, { n: 3, stimulus: S(k), tip: `Le texte ne dit rien sur « ${r} » : on ne peut pas le savoir.` }); }],
  });

export const units = [f1, f2, f3, f4, f5, f6];
