// Petit Hibou — « Les sons » (2e année, Québec) : une unité par son, f40 → f77.
// Chaque unité : vrais mots (liste du MEQ de préférence), mots extraterrestres, phrases originales, mots acceptés pour
// « Écris 2 autres mots avec le son… » et des faux choix « sosies » (jamais de vrais mots).
// Facile = écouter → bonne graphie, mot extraterrestre, mot qui a le son, lire une phrase.
// Moyen = lettres/syllabes à placer, graphie qui manque dans un mot, trier les mots selon leur graphie, compter les syllabes.
// Difficile = dictée de mot et de phrase (`hand`, clavier possible), « Écris 2 autres mots avec le son… » (`hand` answer).
// Format des données : mots 'b[ou].che' ([..] = la graphie du son, « . » = coupure des syllabes); phrases 'Texte.|mot-cible'.
import { MEQ } from './meq-liste.js';

const FR = 'fr-CA';
const say = (text) => ({ text, lang: FR });
const hand = (o) => ({ type: 'hand', lang: 'fr', ...o });
const words = (s) => (s || '').split(/\s+/).filter(Boolean);

/* ---------- lecture des données ---------- */
const parseW = (spec) => {
  const m = spec.match(/^(.*)\[(.+?)\](.*)$/);
  const pre = m[1].replace(/\./g, ''), g = m[2], post = m[3].replace(/\./g, '');
  return { spec, pre, g, post, text: pre + g + post, syl: spec.replace(/[[\]]/g, '').split('.') };
};
const parseS = (s) => { const [text, target] = s.split('|'); return { text, target }; };

/* ---------- mots connus : un faux choix ne doit jamais être un vrai mot ---------- */
const KNOWN = new Set(words(`foque choque coussin rosse boxer asses chaux trot troc doc laic tas loi foi trous bore étole pou barre bourre cor couler mat suce bile tan anneau montage mon moi pote lut rie bis pro mure pare pore pure lot rêne buche hiboux genoux souri suris mande dont ponce maton souple pan ban fan pole ton sin sain lent lient pot dot rat rate pis pic pile pull putes putain con conne cons cul culs bite bites couille couilles merde nique niquer salope pisse pisser chier foutre zob ris chut soc suc pote papa pupa pet pets bit bits sou sue rue ru mi ma mu nu pu tu su vu lu du dû ré né pré thé fée si ci ça sa ta va fa la là le les lé des dés dé dès
  eau au aux haut os ose oh ah eh hé ha rat rate rats râte ras rase pas pâs pa bal balle bas basse bât pic pique pis pi pile pille pull pôle pol
  cul cule cure cuir cuire cour cours court coup cou coût cout cru crue cri cris crie bru brut brute loup lu lui lie lis lit lys fou fous fout foue
  bon bonne bond bons son sont sons sonne ton thon tond tonne mon mont monde mou moue mot maux mal malle mare mars marre masse mât mats
  pain pin pins peint peins plein plaint saint sain sein seins cinq sang sans cent sent sens sève sel selle celle cèle ses ces sept
  vain vin vingt vint vend vent vends van vans dent dans temps tend tant tente tante quand camp champ chant chants chat chats chas
  nom non nonne noms nos nôtre note notes nue nuit nuits noix noie noir noire noires roi rois rouet roue rouge roux rousse
  joie joue jouer jour jouée voie voix vois voit voir voyez soi soie soit soif soir toi toit trois tôt tot tard
  oie oignon ongle poing point pointe poignée coin coins coing loin foin soin soigne besoin bain bains
  feu feux peu peut peux veut veux deux jeu jeux yeux queue queues bleu bleue lieu lieux pneu pneus
  heure heures beurre leur leurs peur peurs cœur cœurs sœur sœurs fleur fleurs
  fille filles bille billes file files vile ville villes mille mil mile quille quilles
  paille pailles pale pâle pales pal peau peaux pot pots paye paie caille cailles cale câle
  soleil sommeil abeille oreille veille vieille vieil vieux seuil feuille feuilles œil deuil
  gai gaie gaz gale gare gars guerre gui gueule guide gage gag garage
  cire cirer cirque cèdre cède scie scène science
  chic chèque chef chaîne chêne chaise chasse chose chou choux chute
  photo phare phase phrase phoque faux fort fer fers fait faite fête
  quai quel quelle qui quoi que quatre kilo kiwi koala kayak képi
  oui ouate ouf où ou ouais gnon gnou gnome agneau mignon ligne signe digne vigne vignes
  nuage nuages nage nages nager rage rager page pages sage sages cage cages ange anges
  ski skis sas sec secs sac sacs rose roses rosé ruse rusé rusée rot rôt roter
  mais mets met mes mer mère maire maires verre vers vert verte ver
  mis mie mit mite midi mine mines mime mimer
  nez ne nef nèfle cet cette ce ceux seule seul
  poule poules pouls poil poils poire poires poivre poison poisson pois poids
  lait laid laide lais laie lai lave laver lac lacs
  bu bue bus but butte bute buse
  fi fil fils fit fie fier fiers
  ex exact exil exige exit
  bête bêtes bette betterave bèche`));
const addKnown = (w) => { for (const t of String(w).toLowerCase().split(/[\s/’']+/)) if (t) KNOWN.add(t); };
for (const g of Object.values(MEQ)) for (const e of g) {
  for (const x of [e.w, ...(e.f || []), ...(e.alt ? [e.alt] : [])]) addKnown(x);
  for (const v of e.v || []) addKnown(v);
}
const isReal = (w) => KNOWN.has(w.toLowerCase());

/* ---------- faux choix « sosies » ---------- */
const SUBS = [[/ge$/, 'je'], [/ge$/, 'j'], [/^c(?=[aouô])/, 'k'], [/^c(?=[aouô])/, 'qu'], [/^qu/, 'k'], [/^qu/, 'c'], [/que$/, 'k'], [/que$/, 'c'], [/tte$/, 'te'],
  [/([^t])te$/, '$1tte'], [/([aeiouéè])s([aeiouéè])/, '$1z$2'], [/z/, 's'], [/m(?=[pb])/, 'n'], [/an/, 'en'], [/en/, 'an'], [/eau/, 'o'], [/au/, 'o'], [/é$/, 'er'], [/é$/, 'ez'],
  [/é/, 'è'], [/è/, 'ai'], [/ai/, 'è'], [/ê/, 'è'], [/([bcdfglmnprt])\1/, '$1'], [/([aeiou])([lmnprt])([aeiouéè])/, '$1$2$2$3'], [/[dtsx]$/, ''], [/s$/, 'x'], [/ph/, 'f'],
  [/f/, 'ph'], [/ain/, 'in'], [/ein/, 'in'], [/in(?![aeiouy])/, 'ain'], [/oi/, 'oa'], [/gn/, 'ni'], [/ç/, 'ss'], [/^h/, ''], [/ss/, 's'], [/c(?=[eiy])/, 's'],
  [/o(?![iun])/, 'au'], [/k/, 'c'], [/eu/, 'e'], [/ou/, 'u'], [/on/, 'an'], [/in/, 'en']];
const fakesOf = (w, alts) => {
  const out = [];
  for (const a of alts) if (a !== w.g) out.push(w.pre + a + w.post);
  for (const [re, r] of SUBS) out.push(w.text.replace(re, r));
  return [...new Set(out)].filter((x) => x !== w.text && x.length >= 2 && !isReal(x) && !/^[^aeiouyéèêàâîôûœ]+$/.test(x)).slice(0, 6);
};

/* ---------- gabarits de texte ---------- */
const PROMPT = {
  listen: 'Écoute le mot. Touche le mot bien écrit.',
  pseudo: 'Lis le mot extraterrestre. Écoute les 3 choix et touche le bon.',
  blank: 'Écoute le mot. Complète-le avec les bonnes lettres.',
  tiles: 'Écoute le mot. Écris-le avec les lettres.',
  syl: 'Écoute le mot. Combien de syllabes entends-tu?',
  sylOrder: 'Écoute le mot. Mets les syllabes dans l’ordre.',
  word: 'Écoute le mot et écris-le.',
  dict: 'Écoute et écris la phrase.',
};
const soundPrompt = (u) => `Quel mot a le son « ${u.label} », comme dans « ${u.ex} »?`;
const readPrompt = (u) => `Lis la phrase. Touche le mot qui a le son « ${u.label} ».`;
const sortPrompt = (u) => `Classe les mots selon la façon d’écrire le son « ${u.label} ».`;
const sort2Prompt = (u) => `Est-ce que tu entends le son « ${u.label} »? Classe les mots.`;
const twoPrompt = (u) => `Écris 2 autres mots avec le son « ${u.label} », comme dans « ${u.ex} ».`;
const twoSay = (u) => `Écris deux autres mots avec le son « ${u.label} », comme dans « ${u.ex} ».`;
const cleanWord = (w) => w.replace(/^[«(]+|[.,!?;:»)]+$/g, '');
const tileable = (w) => /^[a-zàâçéèêëîïôûùüœ]{3,10}$/.test(w);
const LETTERS = [...'abcdefgilmnoprstuvéè'];

function makeUnit(d) {
  const W = words(d.w).map(parseW);
  const P = words(d.p).filter((x) => x.includes('[')).map(parseW);
  const S = d.s.map(parseS);
  const near = words(d.near);
  const alts = words(d.alts);
  const galts = Object.fromEntries(Object.entries(d.galts || {}).map(([k, v]) => [k, words(v)]));
  const altsOf = (w) => galts[w.g] || alts;
  const gnear = Object.fromEntries(Object.entries(d.gnear || {}).map(([k, v]) => [k, words(v)]));
  const over = d.over || {};
  const gset = [...new Set([...W.map((x) => x.g), ...P.map((x) => x.g), ...alts, ...Object.values(galts).flat()])].filter((g) => g.length >= 1);
  const containsG = (w) => gset.some((g) => w.toLowerCase().includes(g));
  const OUT = words(d.out).filter((w) => over.raw || !containsG(w));
  const pFind = over.find || soundPrompt(d), pRead = over.read || readPrompt(d), pSort2 = over.sort2 || sort2Prompt(d);
  const pTwo = over.two || twoPrompt(d), pTwoSay = over.twoSay || twoSay(d);
  const id = d.id;
  W.forEach((w) => addKnown(w.text));
  for (const a of words(d.acc)) addKnown(a);

  const listenW = W.filter((w) => fakesOf(w, altsOf(w)).length >= 2);
  const pseudoOK = over.noPseudo ? [] : P.map((p) => ({ p, ch: [p.text, ...(gnear[p.g] || near).map((n) => p.pre + n + p.post)].filter((x, i, a) => a.indexOf(x) === i && (i === 0 || (!isReal(x) && x !== p.text))) })).filter((x) => x.ch.length >= 3);
  const blankW = W.map((w) => ({ w, wrong: [...new Set(galts[w.g] ? altsOf(w) : [...alts, ...near])].filter((a) => a !== w.g && !isReal(w.pre + a + w.post)).slice(0, 5) }))
    .filter((x) => x.wrong.length >= 2 && x.w.text.length >= 3);
  const tileW = W.filter((w) => tileable(w.text));
  const VOW = /[aeiouyéèêàâîôûœ]/;
  const glide = (w) => w.syl.some((y, i) => i > 0 && VOW.test(w.syl[i - 1].slice(-1)) && VOW.test(y[0]));   // a.vi.on : 2 ou 3 syllabes? on évite
  const sylCountW = W.filter((w) => w.syl.length <= 4 && !/e$|es$|ent$/.test(w.text) && !glide(w));
  const sylOrderW = W.filter((w) => w.syl.length >= 2 && w.syl.length <= 4);
  const graphs = [...new Set(W.map((w) => w.g))];
  const readS = over.raw ? [] : S.map((s) => ({ s, bad: [...new Map(s.text.split(/\s+/).map(cleanWord).filter((x) => x.length >= 2 && x.toLowerCase() !== s.target.toLowerCase() && !containsG(x) && !/’/.test(x)).map((x) => [x.toLowerCase(), x])).values()] }))
    .filter((x) => x.bad.length >= 2);

  const qListen = (R) => {
    const w = R.pick(listenW);
    const fk = R.sample(fakesOf(w, altsOf(w)), 2);
    return { type: 'choice', key: `${id}-l-${w.text}`, prompt: PROMPT.listen, say: say(w.text), options: [w.text, ...fk].map((text) => ({ text })), answer: 0 };
  };
  const qPseudo = (R) => {
    const { p, ch } = R.pick(pseudoOK);
    const three = [ch[0], ...R.sample(ch.slice(1), 2)];
    const order = R.shuffle([0, 1, 2]);
    return { type: 'choice', key: `${id}-p-${p.text}`, prompt: PROMPT.pseudo, say: say(PROMPT.pseudo), stimulus: { text: `👽 ${p.text}` }, fixedOrder: true,
      options: order.map((k, n) => ({ text: String(n + 1), emoji: '🔊', say: say(three[k]) })), answer: order.indexOf(0) };
  };
  const qFind = (R) => {
    const w = R.pick(W);
    const bad = R.sample(OUT.filter((x) => x !== w.text), 3);
    return { type: 'choice', key: `${id}-s-${w.text}`, prompt: pFind, say: say(pFind), options: [w.text, ...bad].map((text) => ({ text })), answer: 0 };
  };
  const qRead = (R) => {
    if (!readS.length) return qFind(R);
    const { s, bad } = R.pick(readS);
    const opts = R.sample(bad, Math.min(3, bad.length));
    return { type: 'choice', key: `${id}-r-${s.text}`, prompt: pRead, say: say(pRead), stimulus: { text: s.text }, options: [s.target, ...opts].map((text) => ({ text })), answer: 0 };
  };
  const qBlank = (R) => {
    const { w, wrong } = R.pick(blankW);
    const opts = [w.g, ...R.sample(wrong, 2)];
    return { type: 'choice', key: `${id}-b-${w.text}`, prompt: PROMPT.blank, say: say(w.text), stimulus: { text: `${w.pre}__${w.post}${over.hint?.[w.text] ? `   ( ${over.hint[w.text]} )` : ''}` }, cols: 3, options: opts.map((text) => ({ text })), answer: 0 };
  };
  const qTiles = (R) => {
    const w = R.pick(tileW);
    const letters = [...w.text];
    const extra = R.sample(LETTERS.filter((c) => !letters.includes(c)), 2);
    return { type: 'order', key: `${id}-t-${w.text}`, prompt: PROMPT.tiles, say: say(w.text), tiles: letters, extra, joiner: '' };
  };
  const qSort = (R) => {
    if (graphs.length >= 2) {
      let gs = R.sample(graphs, Math.min(graphs.length, R.chance(0.35) ? 3 : 2));
      for (let t = 0; t < 10 && (d.noPair || []).some((p) => p.split('|').every((x) => gs.includes(x))); t++) gs = R.sample(graphs, gs.length);
      const items = [];
      for (let i = 0; i < gs.length; i++) for (const w of R.sample(W.filter((x) => x.g === gs[i]), gs.length === 3 ? 2 : 3)) items.push({ text: w.text, say: say(w.text), bin: i });
      if (items.length >= 4 && !(d.noPair || []).some((p) => p.split('|').every((x) => gs.includes(x)))) return { type: 'sort', key: `${id}-o-${gs.join('+')}-${items.map((x) => x.text).sort().join(',')}`, prompt: sortPrompt(d), say: say(sortPrompt(d)), bins: gs.map((g) => ({ text: d.binLabel?.[g] || g })), items: R.shuffle(items) };
    }
    const yes = R.sample(W, 3).map((w) => ({ text: w.text, say: say(w.text), bin: 0 }));
    const no = R.sample(OUT, 3).map((text) => ({ text, say: say(text), bin: 1 }));
    return { type: 'sort', key: `${id}-o2-${[...yes, ...no].map((x) => x.text).sort().join(',')}`, prompt: pSort2, say: say(pSort2),
      bins: (over.bins2 || [['Je l’entends', '👂'], ['Je ne l’entends pas', '🙉']]).map(([text, emoji]) => (emoji ? { text, emoji } : { text })), items: R.shuffle([...yes, ...no]) };
  };
  const qSylCount = (R) => {
    const w = R.pick(sylCountW), n = w.syl.length;
    const opts = n <= 2 ? [1, 2, 3] : [2, 3, 4];
    return { type: 'choice', key: `${id}-n-${w.text}`, prompt: PROMPT.syl, say: say(w.text), fixedOrder: true, cols: 3, options: opts.map((x) => ({ text: String(x) })), answer: opts.indexOf(n) };
  };
  const qSylOrder = (R) => {
    const w = R.pick(sylOrderW);
    return { type: 'order', key: `${id}-y-${w.text}`, prompt: PROMPT.sylOrder, say: say(w.text), tiles: w.syl, joiner: '' };
  };
  const qWord = (R) => {
    const w = R.pick(W);
    return hand({ mode: 'dictation', key: `${id}-w-${w.text}`, prompt: { fr: PROMPT.word, en: 'Listen and write the word.' }, say: say(w.text), expected: w.text, lines: 1 });
  };
  const qDict = (R) => {
    const k = R.int(0, S.length - 1), s = S[k].text;
    return hand({ mode: 'dictation', key: `${id}-d-${k}`, prompt: { fr: PROMPT.dict, en: 'Listen and write the sentence.' }, say: say(s), expected: s, lines: s.length > 30 ? 2 : 1 });
  };
  const accepted = words(d.acc).filter((a) => !W.some((w) => w.text === a) && a !== d.ex);
  const qTwo = () => hand({ mode: 'answer', key: `${id}-x`, prompt: pTwo, say: say(pTwoSay),
    stimulus: { text: `Son « ${d.label} » — déjà vus : ${W.map((w) => w.text).join(', ')}. Trouve 2 AUTRES mots.` },
    answerKey: over.keyTwo ? `${over.keyTwo} Exemples acceptés : ${accepted.join(', ')}.` : `Deux vrais mots français, différents de « ${[...W.map((w) => w.text), d.ex].join(', ')} », où l’on entend le son « ${d.label} » (comme dans « ${d.ex} »). `
      + `Exemples acceptés : ${accepted.join(', ')}. Tout autre vrai mot avec ce son est bon; l’orthographe exacte compte peu en 2e année.`, lines: 1 });

  const MIX = {
    1: [[qListen, 35], [pseudoOK.length ? qPseudo : qListen, 25], [qFind, 25], [qRead, 15]],
    2: [[qBlank, 30], [qTiles, 25], [qSort, 20], [qSylOrder, 15], [qSylCount, 10]],
    3: [[qWord, 25], [qDict, 40], [qTwo, 35]],
  };
  const pickGen = (level, R) => { const m = MIX[level] || MIX[2], tot = m.reduce((a, x) => a + x[1], 0); let r = R.int(1, tot); for (const [f, w] of m) if ((r -= w) <= 0) return f; return m[0][0]; };
  const unit = {
    id, icon: d.ic, title: { fr: d.t, en: d.en }, pfeq: 'Lecture / écriture — correspondances lettres-sons (PFEQ 1er cycle, 2e année)',
    generate(level, R) { return pickGen(level, R)(R); },
    allSay() {
      const out = [];
      const add = (t) => out.push(say(t));
      W.forEach((w) => add(w.text));
      pseudoOK.forEach(({ ch }) => ch.forEach(add));
      S.forEach((s) => add(s.text));
      OUT.forEach(add);
      [PROMPT.pseudo, pFind, pRead, sortPrompt(d), pSort2, pTwoSay].forEach(add);
      return [...new Map(out.map((x) => [x.text, x])).values()];
    },
  };
  Object.defineProperty(unit, '_info', { enumerable: false, value: { W, P, S, OUT, listenW, pseudoOK, blankW, tileW, sylCountW, readS, alts, near, gset, nAcc: accepted.length, cands: W.map((w) => ({ w: w.text, fakes: fakesOf(w, altsOf(w)), blank: blankW.find((b) => b.w === w)?.wrong?.map((a) => w.pre + a + w.post) })) } });
  return unit;
}
const U = [];
const def = (o) => U.push(o);

/* ================================================================== */
/*  Les données : une unité par son                                    */
/*  w = vrais mots, p = mots extraterrestres, s = phrases, acc = mots acceptés (« écris 2 autres mots »),  */
/*  out = mots SANS le son (filtrés automatiquement s'ils contiennent une des graphies), alts = graphies sosies (faux choix),  */
/*  near = autres sons proches (faux choix des mots extraterrestres).                                              */
/* ================================================================== */
const OUT_BASE = 'chat loup bol lune sac vache riz pomme pied nuit lapin fleur bonbon livre sirop table zèbre fée jus vélo ciel neige main dent';

/* ---------- voyelles simples ---------- */
def({ id: 'f40', ic: '🅰️', t: 'Le son [a] : a', en: 'Sound [a]: a', label: 'a', ex: 'chat',
  w: 'p[a].pa m[a].man ch[a]t s[a]c v[a]che c[a].rot.te b[a].na.ne [a].vi.on p[â]te ch[a].peau',
  p: 'n[a]mi t[a]po b[a]du l[a]fi s[a]mo r[a]tu z[a]bé', alts: 'à â', near: 'o u é',
  s: ['Papa mange une banane.|banane', 'Maman a un chapeau.|chapeau', 'Le chat dort sur le sac.|chat', 'La vache mange de l’herbe.|vache', 'Papa a mal à la tête.|Papa'],
  out: OUT_BASE, acc: 'ami salade tomate canard radis arbre table cadeau ballon lapin' });

def({ id: 'f41', ic: '🛏️', t: 'Le son [i] : i, y', en: 'Sound [i]: i, y', label: 'i', ex: 'lit',
  w: 'l[i]t v[i]te l[i].vre m[i].di [i].ci s[i].rop r[i]z st[y].lo p[i].ra.te l[i].mo.na.de',
  p: 'm[i]lo t[i]ba l[i]du f[i]ra s[i]po z[y]ta r[i]ko', alts: 'î y', near: 'é u e',
  s: ['Le livre est sur mon lit.|livre', 'Il a un stylo bleu.|stylo', 'À midi, je mange du riz.|riz', 'Maman fait vite le lit.|vite'],
  out: OUT_BASE, acc: 'ami midi lit vite livre île image ski stylo bicyclette' });

def({ id: 'f42', ic: '⭕', t: 'Le son [o] : o, ô', en: 'Sound [o]: o, ô', label: 'o', ex: 'moto',
  w: 'm[o].to p[o]mme b[o]l r[o]be l[o].to b[o]tte p[o]rte n[o]te h[ô].tel c[o]lle',
  p: 'm[o]ti t[o]ba f[o]du l[o]ri s[o]pa r[o]mi z[o]ba', alts: 'ô au eau', near: 'a ou u',
  s: ['Papa a une moto rouge.|moto', 'Léa porte une belle robe.|robe', 'Je mange une pomme.|pomme', 'Je mets la note sur le bol.|bol'],
  out: OUT_BASE, acc: 'photo vélo stylo dodo chocolat école cochon tomate robot bobo' });

def({ id: 'f43', ic: '🌙', t: 'Le son [u] : u, û', en: 'Sound [u]: u, û', label: 'u', ex: 'lune',
  w: 'l[u].ne [u].ne t[u].be j[u]pe r[u]e m[u]r pl[u].me s[u]cre b[u]s fl[û]te',
  p: 'p[u]ko t[u]pa b[u]li s[u]ro z[u]fé r[u]ni c[u]do', alts: 'û ue', near: 'ou i o',
  s: ['La lune est belle ce soir.|lune', 'Léa a une jupe rouge.|jupe', 'Je prends le bus à midi.|bus', 'Il y a un mur dans la rue.|mur'],
  out: OUT_BASE + ' pain pêche', acc: 'musique légume sucre ruban tortue jupe tulipe ruche chaussure' });

def({ id: 'f44', ic: '☕', t: 'Le son [é] : é, ée', en: 'Sound [é]: é, ée', label: 'é', ex: 'café',
  w: 'b[é].bé [é].co.le [é].té v[é].lo [é].toi.le ca.f[é] f[ée] pr[é] cl[é] th[é].â.tre',
  p: 't[é]bo l[é]mi p[é]ru ch[é]li z[é]pa b[é]to f[é]ri', alts: 'è ê er ée', near: 'o u i',
  s: ['Le bébé boit son lait.|bébé', 'À l’école, je lis un livre.|école', 'Papa a un vélo bleu.|vélo', 'La fée a une baguette.|fée', 'Il fait chaud en été.|été'],
  out: OUT_BASE, acc: 'dé thé blé bébé fée épée été lézard légume église téléphone hérisson' });

def({ id: 'f45', ic: '🍃', t: 'Le son [è] : è, ê, ai, ei', en: 'Sound [è]: è, ê, ai, ei', label: 'è', ex: 'mère',
  w: 'm[è]re p[è]re f[ê]te t[ê]te l[ai]t n[ei]ge f[ai]re ba.l[ai] r[ei]ne fo.r[ê]t',
  p: 'm[è]to f[ê]li t[ai]po n[ei]va l[è]bu b[ai]zo p[ê]ri', alts: 'è ê ai ei', near: 'a o u',
  s: ['Ma mère boit du lait.|mère', 'Il neige sur la forêt.|neige', 'Papa a mal à la tête.|tête', 'La reine a un balai.|reine', 'C’est la fête de mon père.|fête'],
  out: OUT_BASE, acc: 'frère fraise chaise treize baleine pêche chèvre zèbre crème fenêtre' });

def({ id: 'f46', ic: '🤫', t: 'Le son [e] : e (comme dans petit)', en: 'Sound [e]: e (as in petit)', label: 'e', ex: 'petit',
  w: 'p[e].tit d[e].main m[e].nu r[e].pas ch[e].val s[e].mai.ne r[e].gar.der v[e].nir f[e].nê.tre g[e].nou',
  p: 'm[e]ta t[e]bo l[e]du f[e]ni s[e]ma r[e]pu n[e]zo', alts: 'é è eu', near: 'a o u',
  s: ['Le petit chat dort.|petit', 'Papa a un cheval.|cheval', 'Maman fait un repas.|repas', 'Mon menu est bon.|menu'],
  out: OUT_BASE + ' dos bras', acc: 'regarder retour reculer revoir demander devoir secret melon jeter' });

/* ---------- ou, on, an, in, ain, un ---------- */
def({ id: 'f47', ic: '🐺', t: 'Le son [ou] : ou', en: 'Sound [ou]: ou', label: 'ou', ex: 'chou',
  w: 'b[ou].che l[ou]p p[ou]le j[ou]r hi.b[ou] ge.n[ou] r[ou]ge s[ou].pe r[ou]e s[ou].ris',
  p: 't[ou]mi b[ou]la p[ou]ré m[ou]ti z[ou]ba f[ou]li r[ou]ga', alts: 'oû oux', near: 'o u on',
  s: ['Le loup court dans la forêt.|loup', 'La poule a un œuf.|poule', 'Je mange de la soupe.|soupe', 'Le hibou dort le jour.|hibou', 'Papa a mal au genou.|genou'],
  out: OUT_BASE, acc: 'tout nous vous sous toujours souvent beaucoup bouteille pour couleur mouchoir' });

def({ id: 'f48', ic: '🎈', t: 'Le son [on] : on, om', en: 'Sound [on]: on, om', label: 'on', ex: 'ballon',
  w: 'b[on].bon mou.t[on] m[on]de p[on]t r[on]d s[on] l[on]g p[om].pier n[om].bre bal.l[on]',
  p: 't[on]da l[on]si m[om]pa b[on]ti r[on]fé s[on]du z[on]ro', alts: 'om on', near: 'an in ou',
  s: ['Le pompier est sur le pont.|pompier', 'Il y a un mouton dans le pré.|mouton', 'Papa mange un bonbon rouge.|bonbon', 'Léa a un ballon bleu.|ballon', 'Le nombre est grand.|nombre'],
  out: OUT_BASE, acc: 'maison avion citron savon garçon cochon melon pigeon crayon salon ombre bon' });

def({ id: 'f49', ic: '🐘', t: 'Les sons an, am, en, em', en: 'Sounds an, am, en, em', label: 'an', ex: 'éléphant',
  w: 'd[en]t v[en]t bl[an]c gr[an]d ch[am].bre l[am].pe j[am].be [en].fant t[em]ps m[an].ger',
  p: 't[an]do l[am]pi b[en]ta m[an]ru s[en]du d[am]pa r[an]fé', alts: 'an am en em', near: 'on in ou',
  s: ['Le vent souffle fort.|vent', 'Maman lit dans ma chambre.|chambre', 'J’ai mal à une dent.|dent', 'Mon pantalon est blanc.|blanc', 'Papa a une lampe jaune.|lampe'],
  out: OUT_BASE, acc: 'maman enfant dans quand chanter orange pantalon éléphant lent tante cent pendant tempête' });

def({ id: 'f50', ic: '🌲', t: 'Les sons in, im', en: 'Sounds in, im', label: 'in', ex: 'sapin',
  w: 'sa.p[in] la.p[in] ma.t[in] v[in] jar.d[in] che.m[in] p[in]ce s[im].ple t[im].bre pr[in].ce',
  p: 'p[in]da r[in]tu f[in]lo m[im]pa s[im]po v[in]tal b[in]ré', alts: 'ain ein im', near: 'on an ou',
  s: ['Le lapin mange une carotte.|lapin', 'Le prince a un chapeau.|prince', 'Il fait beau ce matin.|matin', 'Je mets un timbre sur la lettre.|timbre', 'Papa a un jardin.|jardin'],
  out: OUT_BASE, acc: 'cousin voisin dessin requin impossible important imprimer singe linge cinq quinze dinde patin' });

def({ id: 'f51', ic: '🍞', t: 'Les sons ain, aim, ein', en: 'Sounds ain, aim, ein', label: 'ain', ex: 'pain',
  w: 'p[ain] m[ain] tr[ain] b[ain] de.m[ain] co.p[ain] f[aim] pl[ein] p[ein].tre c[ein].tu.re',
  p: 's[ain]do m[ain]po t[ain]lu fr[ain]é g[ain]di v[aim]bo l[ein]sa', alts: 'in ain ein aim', near: 'an on ou',
  s: ['Je mange du pain.|pain', 'Le train arrive.|train', 'Mon copain joue avec moi.|copain', 'Mon sac est plein.|plein', 'Demain, il y a de la neige.|Demain'],
  out: OUT_BASE, acc: 'grain nain terrain maintenant humain parrain refrain vilain certain prochain craindre éteindre frein rein' });

def({ id: 'f52', ic: '🟤', t: 'Les sons un, um', en: 'Sounds un, um', label: 'un', ex: 'brun',
  w: 'l[un].di br[un] au.c[un] cha.c[un] par.f[um] h[um].ble com.m[un] em.pr[un].ter',
  p: 'b[un]tal l[un]sa m[un]or t[un]cri d[un]ipo f[un]da r[um]pa', alts: 'um un', near: 'on an in',
  s: ['Lundi, je vais au parc.|Lundi', 'Mon chien est tout brun.|brun', 'Aucun ami ne dort.|Aucun', 'Ce parfum sent bon.|parfum'],
  out: OUT_BASE, acc: 'un lundi brun chacun aucun parfum humble commun emprunt opportun défunt' });

/* ---------- oi, oin, eu, eur, au/eau ---------- */
def({ id: 'f53', ic: '👑', t: 'Le son [oi] : oi', en: 'Sound [oi]: oi', label: 'oi', ex: 'roi',
  w: 'r[oi] m[oi] v[oi].tu.re p[oi]re fr[oi]d d[oi]gt n[oi]r é.t[oi].le b[oi]re tr[oi]s',
  p: 't[oi]ba m[oi]lu f[oi]ri z[oi]pa l[oi]set ch[oi]mi v[oi]ta', alts: 'oa oie oit', near: 'ou o on',
  s: ['Le roi a un chat noir.|roi', 'Il fait froid ce matin.|froid', 'Je mange une poire.|poire', 'Papa a une voiture rouge.|voiture', 'Je veux boire de l’eau.|boire'],
  out: OUT_BASE, acc: 'soir poisson oiseau mois bois voir soif armoire histoire noix voix toit quoi pourquoi miroir framboise joie' });

def({ id: 'f54', ic: '📍', t: 'Le son [oin] : oin', en: 'Sound [oin]: oin', label: 'oin', ex: 'coin',
  w: 'l[oin] c[oin] f[oin] p[oin]t be.s[oin] s[oin] p[oin].tu té.m[oin] m[oin]s j[oin].dre',
  p: 'm[oin]da t[oin]li b[oin]lu l[oin]ré ch[oin]ba v[oin]sé z[oin]pa', alts: 'ouin oint oing', near: 'oi on ou',
  s: ['Le chat dort dans le coin.|coin', 'La forêt est loin.|loin', 'Le cheval mange du foin.|foin', 'Léa a besoin de son chandail.|besoin'],
  out: OUT_BASE + ' poire voiture', acc: 'pingouin marsouin rejoindre lointain shampoing poing coincé' });

def({ id: 'f55', ic: '👀', t: 'Le son [eu] : eu, œu', en: 'Sound [eu]: eu, œu', label: 'eu', ex: 'jeu',
  w: 'j[eu] d[eu]x p[eu] f[eu] bl[eu] qu[eu]e y[eu]x che.v[eu]x j[eu].di v[œu]',
  p: 'd[eu]lo m[eu]pa f[eu]ti s[eu]va r[eu]bi n[eu]zo l[œu]ta', alts: 'œu eue', near: 'ou o u',
  s: ['Le ciel est bleu.|bleu', 'Papa fait un feu.|feu', 'Le chien remue la queue.|queue', 'Jeudi, nous jouons dehors.|Jeudi', 'Tu as deux yeux bleus.|deux'],
  out: OUT_BASE, acc: 'jeu deux peu feu bleu jeudi heureux joyeux curieux vieux mieux lieu neveu milieu cheveu nœud' });

def({ id: 'f56', ic: '🌸', t: 'Les sons eur, œur', en: 'Sounds eur, œur', label: 'eur', ex: 'peur',
  w: 'p[eur] fl[eur] h[eur]e b[eur].re cou.l[eur] s[œur] c[œur] chan.t[eur] mo.t[eur] bon.h[eur]',
  p: 't[eur]pa m[eur]do z[eur]li b[eur]la p[eur]to g[eur]sa v[œur]ni', alts: 'œur eure', near: 'our or ar',
  s: ['Maman a une fleur.|fleur', 'Il est quelle heure?|heure', 'Je mets du beurre sur le pain.|beurre', 'Le moteur fait du bruit.|moteur', 'Ma sœur a un beau cœur.|sœur'],
  out: OUT_BASE, acc: 'chaleur docteur coiffeur facteur pêcheur odeur malheur meilleur plusieurs danseur professeur ordinateur' });

def({ id: 'f57', ic: '⛵', t: 'Le son [o] : au, eau, o', en: 'Sound [o]: au, eau, o', label: 'o (au, eau)', ex: 'bateau',
  w: 'ba.t[eau] ch[au]d j[au]ne [au].to cha.p[eau] gâ.t[eau] ca.d[eau] s[au]ce m[o]t r[o]se',
  p: 'm[au]ti t[eau]ba f[au]bi l[au]ri s[eau]pa b[ô]zi r[au]mo', alts: 'o au eau ô', near: 'ou a u', noPair: ['au|eau'],
  s: ['Le bateau est sur l’eau.|bateau', 'Papa fait un gâteau.|gâteau', 'Il fait chaud ici.|chaud', 'Léa a un beau cadeau.|cadeau', 'Ma robe est rose.|rose'],
  out: OUT_BASE, acc: 'beau château manteau couteau tableau nouveau rideau agneau morceau animaux hôpital ruisseau métro piano' });

/* ---------- ill, ail, eil, euil, ouil, ien, tion ---------- */
def({ id: 'f58', ic: '🦋', t: 'Le son [ill] : ill, ille', en: 'Sound [ill]: ill, ille', label: 'ille', ex: 'fille',
  w: 'f[ill]e b[ill]e fa.m[ill]e che.n[ill]e co.qu[ill]e gen.t[ill]e va.n[ill]e myr.t[ill]e pa.p[ill]on qu[ill]e',
  p: 't[ill]o p[ill]u r[ill]é n[ill]a d[ill]on z[ill]ou f[ill]ba', alts: 'il', near: 'il ir al',
  s: ['Ma famille est grande.|famille', 'Le papillon vole sur la fleur.|papillon', 'Je joue aux billes.|billes', 'La chenille mange une feuille.|chenille', 'Léa est gentille.|gentille'],
  out: OUT_BASE, acc: 'fille bille famille chenille papillon coquille gentille vanille myrtille grillon cheville aiguille brindille pastille béquille' });

def({ id: 'f59', ic: '👕', t: 'Les sons ail, aille', en: 'Sounds ail, aille', label: 'ail', ex: 'travail',
  w: 'tra.v[ail] chan.d[ail] p[aill]e mé.d[aill]e ba.t[aill]e c[aill]ou t[aill]e por.t[ail] dé.t[ail] m[aill]ot',
  p: 't[ail]o m[aill]u d[ail]pé s[aill]o f[ail]da r[aill]é b[ail]ti', alts: 'ail aill', binLabel: { aill: 'aille' }, near: 'al oi ol',
  s: ['Mon chandail est bleu.|chandail', 'Je bois avec une paille.|paille', 'Il y a un caillou dans mon soulier.|caillou', 'Papa va au travail.|travail', 'Il a une médaille.|médaille'],
  out: OUT_BASE, acc: 'ail rail corail éventail épouvantail volaille écaille caille tenaille ferraille muraille bétail gouvernail' });

def({ id: 'f60', ic: '☀️', t: 'Les sons eil, eille', en: 'Sounds eil, eille', label: 'eil', ex: 'soleil',
  w: 'so.l[eil] a.b[eill]e o.r[eill]e bou.t[eill]e ré.v[eil] or.t[eil] som.m[eil] con.s[eil] ap.pa.r[eil] mer.v[eill]e',
  p: 't[eil]o m[eill]u b[eil]pa r[eill]é s[eil]da n[eill]o f[eill]ba', alts: 'eil eill', binLabel: { eill: 'eille' }, near: 'al ol el',
  s: ['Le soleil est chaud.|soleil', 'Une abeille vole sur la fleur.|abeille', 'Mon réveil sonne à sept heures.|réveil', 'Léa boit de l’eau dans une bouteille.|bouteille', 'Le chat a mal à l’oreille.|oreille'],
  out: OUT_BASE, acc: 'sommeil réveil orteil conseil appareil pareil oreille abeille bouteille corbeille groseille merveille veille vieille corneille oseille' });

def({ id: 'f61', ic: '🐿️', t: 'Les sons euil, ueil, œil', en: 'Sounds euil, ueil, œil', label: 'euil', ex: 'feuille',
  w: 'f[euill]e é.cu.r[euil] fau.t[euil] che.vr[euil] s[euil] d[euil] ac.c[ueil] or.g[ueil] f[euill]a.ge re.c[ueil]',
  p: 't[euill]o m[euil]pa r[euill]é s[euil]da n[euill]o fl[euil]ou', alts: 'euil euill ueil œil', binLabel: { euill: 'euille' }, near: 'eil ouil eul',
  s: ['La feuille tombe de l’arbre.|feuille', 'Un écureuil mange une noix.|écureuil', 'Papi dort dans son fauteuil.|fauteuil', 'Le chevreuil court dans le bois.|chevreuil', 'Il y a un seuil devant la porte.|seuil'],
  out: OUT_BASE, acc: 'œil bouvreuil cerfeuil portefeuille millefeuille accueil orgueil recueil' });

def({ id: 'f62', ic: '🐸', t: 'Les sons ouil, ouille', en: 'Sounds ouil, ouille', label: 'ouille', ex: 'grenouille',
  w: 'gre.n[ouill]e ci.tr[ouill]e n[ouill]e fe.n[ouil] br[ouill]ard cha.t[ouill]e r[ouill]e b[ouill]ir b[ouill]oire m[ouill]er',
  p: 'm[ouill]o t[ouil]pa r[ouill]é z[ouill]a b[ouil]da p[ouill]u f[ouill]o', alts: 'ouil ouill', binLabel: { ouill: 'ouille' }, near: 'oul ol eil',
  s: ['La grenouille saute dans l’eau.|grenouille', 'Il y a une grosse citrouille.|citrouille', 'J’aime la soupe aux nouilles.|nouilles', 'Il y a du brouillard ce matin.|brouillard', 'La bouilloire est chaude.|bouilloire'],
  out: OUT_BASE, acc: 'gribouiller patrouille fouiller débrouiller quenouille chatouiller dépouille' });

def({ id: 'f63', ic: '🐶', t: 'Le son [ien] : ien', en: 'Sound [ien]: ien', label: 'ien', ex: 'chien',
  w: 'ch[ien] b[ien] r[ien] v[ien]t com.b[ien] an.c[ien] mu.si.c[ien] gar.d[ien] b[ien].tôt t[ien]',
  p: 'm[ien]da t[ien]li b[ien]lu l[ien]ré ch[ien]ba v[ien]sé z[ien]pa', alts: 'ian ient', near: 'in an on',
  s: ['Mon chien est bien sage.|chien', 'Je ne veux rien.|rien', 'Il vient chez moi.|vient', 'Combien de pommes as-tu?|Combien', 'Un gardien est devant la porte.|gardien'],
  out: OUT_BASE, acc: 'tient sien italien canadien pharmacien électricien lien' });

def({ id: 'f64', ic: '🦁', t: 'Les sons ion, tion', en: 'Sounds ion, tion', label: 'ion', ex: 'attention',
  w: 'at.ten.[tion] na.[tion] sta.[tion] ac.[tion] ques.[tion] ré.cré.a.[tion] l[ion] a.v[ion] ca.m[ion] cham.p[ion]',
  galts: { tion: 'sion ssion cion', ion: 'ian ione' }, noPair: ['ion|tion'],
  p: 'f[ion]ba l[ion]ta b[ion]du p[ion]ri m[ion]ta r[ion]ké', alts: 'sion ssion ian', near: 'on an in',
  s: ['Fais attention au chat.|attention', 'Le lion dort dans la savane.|lion', 'Un avion vole dans le ciel.|avion', 'La station est loin.|station', 'J’ai une question pour toi.|question'],
  out: OUT_BASE, acc: 'addition direction invitation solution potion million camion champion' });

/* ---------- gn, ch, ph ---------- */
def({ id: 'f65', ic: '⛰️', t: 'Le son [gn] : gn', en: 'Sound [gn]: gn', label: 'gn', ex: 'montagne',
  w: 'mon.ta.[gn]e cam.pa.[gn]e cham.pi.[gn]on a.rai.[gn]ée li.[gn]e cy.[gn]e si.[gn]e pei.[gn]e a.[gn]eau oi.[gn]on',
  p: 'ti[gn]o pa[gn]é mi[gn]u ra[gn]ol bo[gn]i [gn]apo lu[gn]é', alts: 'nn ni ng', near: 'n g l',
  s: ['La montagne est très haute.|montagne', 'Une araignée monte au mur.|araignée', 'Je trouve un champignon.|champignon', 'Trace une ligne droite.|ligne', 'Mon oncle a un agneau.|agneau'],
  out: OUT_BASE, acc: 'mignon gagner soigner baignoire poignée compagnon châtaigne grognon' });

def({ id: 'f66', ic: '🐴', t: 'Le son [ch] : ch', en: 'Sound [ch]: ch', label: 'ch', ex: 'chat',
  w: '[ch]at [ch]ien [ch]e.val [ch]ou ni.[ch]e va.[ch]e [ch]e.min mou.[ch]e bou.[ch]e mar.[ch]é',
  p: '[ch]alo mi[ch]u [ch]éba ta[ch]o [ch]ipou rou[ch]a lu[ch]é', alts: 'sh sch', near: 's j k',
  s: ['Le chien dort dans sa niche.|niche', 'La vache mange de l’herbe.|vache', 'Le cheval court vite.|cheval', 'Maman mange un chou.|chou', 'Il y a une mouche sur le mur.|mouche'],
  out: 'loup bol lune riz pomme pied nuit lapin livre zèbre vélo jus', acc: 'chaise chaud chambre chanter chapeau chocolat cochon chemise chaussure chandail branche tache ruche cloche poche riche chercher dimanche blanche' });

def({ id: 'f67', ic: '🐬', t: 'Le son [f] : ph', en: 'Sound [f]: ph', label: 'f (ph)', ex: 'photo',
  w: '[ph]o.to [ph]o.que dau.[ph]in té.lé.[ph]o.ne [ph]ar.ma.cie [ph]a.re al.[ph]a.bet é.lé.[ph]ant [ph]ra.se or.[ph]e.lin',
  p: '[ph]alo ti[ph]u [ph]éri mor[ph]a [ph]oudi lu[ph]é ba[ph]o', alts: 'f', near: 'p ch',
  s: ['Le dauphin saute dans la mer.|dauphin', 'L’éléphant a une trompe.|éléphant', 'Le téléphone sonne.|téléphone', 'Le phoque nage dans l’eau.|phoque', 'Cette phrase est courte.|phrase'],
  out: 'chat loup bol lune sac riz pomme pied nuit lapin livre zèbre vélo jus', acc: 'saphir photographe paragraphe géographie typhon pharmacien sophie philippe' });

def({ id: 'f68', ic: '🎸', t: 'Le son [k] : c, qu, k', en: 'Sound [k]: c, qu, k', label: 'k (c, qu, k)', ex: 'cochon',
  w: '[c]o.chon [c]a.nard [c]a.mi.on [qu]a.tre [qu]in.ze [k]i.lo [k]i.wi mu.si.[que] mas.[que] [c]oq',
  galts: { c: 'k qu ck', qu: 'k c ck', k: 'c qu ck', que: 'k c q ck' }, noPair: ['qu|que'],
  p: '[c]ali ti[c]u [k]ébo ba[qu]é [qu]ipa ra[c]ou mi[k]a', alts: 'k qu ck', near: 's g t',
  s: ['Le cochon dort dans la boue.|cochon', 'Mon canard nage.|canard', 'Il a quatre billes.|quatre', 'Papa pèse un kilo de pommes.|kilo', 'J’aime la musique.|musique'],
  out: 'loup bol lune riz pomme pied nuit lapin livre zèbre vélo jus', acc: 'café carotte couleur côté cadeau quand quel banque kayak koala coin' });

def({ id: 'f69', ic: '🍒', t: 'Le son [s] : c, ç', en: 'Sound [s]: c, ç', label: 's (c, ç)', ex: 'cerise',
  w: '[c]e.ri.se [c]i.tron [c]inq [c]iel gla.[ç]on le.[ç]on gar.[ç]on pla.[c]e mer.[c]i prin.[c]e',
  galts: { c: 's ss sc', 'ç': 'c s ss' },
  p: '[c]ibo [c]éra pa[c]i mi[c]é [ç]alo ra[ç]u bo[ç]on', alts: 's ss', near: 'k t z',
  s: ['Je mange une cerise.|cerise', 'Il y a un glaçon dans mon verre.|glaçon', 'Le prince a un cheval.|prince', 'Il y a cinq pommes.|cinq', 'Léa fait sa leçon.|leçon'],
  out: 'loup bol lune pomme pied lapin livre vélo jus', acc: 'cent cinéma cercle certain face glace ici sucre ceinture façon maçon' });

def({ id: 'f70', ic: '🦒', t: 'Le son [j] : ge, gi', en: 'Sound [j]: ge, gi', label: 'j (ge, gi)', ex: 'rouge',
  w: 'rou.[ge] [ge].nou [gi].ra.fe sa.[ge] pa.[ge] i.ma.[ge] vi.sa.[ge] nua.[ge] fro.ma.[ge] pla.[ge]',
  galts: { ge: 'je gue', gi: 'ji gui jhi' }, gnear: { ge: 'se ze che', gi: 'si zi chi' },
  p: 'ta[ge] [ge]mo [gi]po [ge]lo bu[ge] [gi]ra ru[ge]', alts: 'j je gue', near: 's z ch',
  s: ['Papa met du fromage.|fromage', 'Léa a un beau visage.|visage', 'Il y a un nuage rouge.|nuage', 'La girafe mange des feuilles.|girafe', 'Ce genou est rouge.|genou'],
  out: 'chat loup bol lune sac riz pomme pied nuit lapin livre zèbre vélo', acc: 'orange manger neige singe linge cage rage magie gilet gentil légume voyage nager' });

def({ id: 'f71', ic: '🎂', t: 'Le son [g] : g, gu', en: 'Sound [g]: g, gu', label: 'g (g, gu)', ex: 'gâteau',
  w: '[g]a.re [g]om.me [g]â.teau [gu]i.ta.re [gu]er.re va.[gu]e ba.[gu]e lan.[gu]e fi.[gu]e ba.[gu]et.te',
  galts: { g: 'gu gh j', gu: 'g gh gue' },
  p: '[g]alo ti[g]u [g]obi ra[g]o [gu]ipé mi[gu]é [g]udo', alts: 'gu gh', near: 'j k d',
  s: ['Le gâteau est sur la table.|gâteau', 'Papa joue de la guitare.|guitare', 'Il y a une vague sur la mer.|vague', 'Léa a une bague.|bague', 'Je mets un gant rouge.|gant'],
  out: 'loup bol lune riz pomme pied nuit lapin livre zèbre vélo jus', acc: 'gorille gomme gant grand gros glace gare' });

def({ id: 'f72', ic: '🐟', t: 'Le son [s] : s, ss', en: 'Sound [s]: s, ss', label: 's (s, ss)', ex: 'soupe',
  w: '[s]a.pin [s]o.leil [s]ou.pe [s]ou.ris poi.[ss]on ta.[ss]e bro.[ss]e cla.[ss]e pou.[ss]in de.[ss]in',
  galts: { s: 'c z ç ss', ss: 's c ç' },
  p: '[s]ibo [s]uli tu[s]a fi[ss]o mu[ss]a lu[ss]i ro[ss]u', alts: 'c z', near: 't ch f',
  s: ['Le soleil brille sur le sapin.|soleil', 'Maman fait une soupe chaude.|soupe', 'Le poisson nage dans l’eau.|poisson', 'Léa fait un dessin.|dessin', 'Ma tasse est pleine.|tasse'],
  out: 'loup bol lune pomme pied lapin livre vélo jus', acc: 'sac sirop semaine samedi sucre sous sur soir salade savon glisser passer pousser assez aussi princesse' });

def({ id: 'f73', ic: '🌹', t: 'Le son [z] : s entre deux voyelles', en: 'Sound [z]: s between vowels', label: 'z (s)', ex: 'rose',
  w: 'ro.[s]e mai.[s]on oi.[s]eau che.mi.[s]e va.li.[s]e rai.[s]in cou.[s]in frai.[s]e mu.[s]i.que plai.[s]ir',
  galts: { s: 'z ss' },
  p: 'ti[s]a mo[s]o bi[s]é lu[s]i pa[s]ou vo[s]é za[s]u', alts: 'z ss', near: 'ss t ch',
  s: ['Mon cousin a une valise.|cousin', 'La maison est jolie.|maison', 'Je mange une fraise.|fraise', 'Un oiseau chante dans l’arbre.|oiseau', 'Ma chemise est rose.|chemise'],
  out: 'chat loup bol lune pomme pied lapin livre vélo', acc: 'cousine voisin vase prison saison église chaise bise cerise phrase amuser joyeuse heureuse télévision désert arroser rasoir' });

def({ id: 'f74', ic: '🚕', t: 'Le son [ks] : x', en: 'Sound [ks]: x', label: 'ks (x)', ex: 'taxi',
  w: 'ta.[x]i bo.[x]e bo.[x]eur e[x].cu.se e[x].pli.quer e[x].tra sa.[x]o.pho.ne fi.[x]er te[x].te ma.[x]i.mum',
  galts: { x: 'cs ks cks xx' },
  p: 'mo[x]a bi[x]u fa[x]é ru[x]o pe[x]i lu[x]a zi[x]o', alts: 'cs ks', near: 's z gz',
  s: ['Papa prend un taxi.|taxi', 'Le boxeur est fort.|boxeur', 'Léa joue du saxophone.|saxophone', 'Je lis le texte.|texte', 'Je dois m’excuser.|excuser'],
  out: 'chat loup bol lune pomme pied lapin livre vélo', acc: 'taxe fixe lynx mixer extérieur exprès' });

def({ id: 'f75', ic: '🥖', t: 'Le son [é] : er, ez à la fin', en: 'Sound [é]: er, ez at the end', label: 'é (er, ez)', ex: 'rocher',
  w: 'ro.ch[er] pa.pi.[er] pa.ni.[er] ca.hi.[er] es.ca.li.[er] bou.lan.g[er] n[ez] as.s[ez] ch[ez]',
  galts: { er: 'ér èr err', ez: 'éz èz ér' },
  p: 'mapi[er] sali[er] bomi[er] tupi[er] ravi[er] nodi[er] fuli[er]', alts: 'ér èr', near: 'è ê ai',
  s: ['Le boulanger a un panier.|boulanger', 'Je vais chez mon ami.|chez', 'Papa a assez de pain.|assez', 'Mon cahier est sur le rocher.|cahier', 'Léa se mouche le nez.|nez'],
  out: 'chat loup bol lune sac riz pomme pied nuit lapin livre vélo', acc: 'jouer manger chanter arriver monter écouter parler regarder aller danser dîner' });

def({ id: 'f76', ic: '🤐', t: 'Les lettres muettes à la fin', en: 'Silent letters at the end', label: 'lettre muette', ex: 'chat',
  w: 'cha[t] froi[d] gran[d] pe.ti[t] lai[t] bra[s] tro[p] tar[d] chau[d] do[s]',
  alts: 't d s x p', near: 'c l',
  p: 'x', noPseudo: true,
  s: ['Le chat est petit.|chat', 'Il fait froid dehors.|froid', 'Mon sac est trop grand.|trop', 'Il est tard, je dors.|tard', 'Le lait est chaud.|chaud'],
  out: 'sac bol sel mer bus chef neuf lac cap vif mur', acc: 'riz nez bois gris gros fort loup pied dent vent blanc long temps outil tapis bout',
  over: { raw: true, noPseudo: true, hint: { chat: 'chatte', froid: 'froide', grand: 'grande', petit: 'petite', lait: 'laitier', bras: 'brassard', tard: 'tarder', chaud: 'chaude', dos: 'dossier' },
    find: 'Quel mot a une lettre muette à la fin?', sort2: 'Classe les mots : lettre muette à la fin, ou lettre qu’on entend?',
    bins2: [['Lettre muette', '🤫'], ['Je l’entends', '👂']],
    two: 'Écris 2 autres mots qui ont une lettre muette à la fin.', twoSay: 'Écris deux autres mots qui ont une lettre muette à la fin.',
    keyTwo: 'Deux vrais mots français qui se terminent par une lettre muette (comme chat, froid, grand). Tout autre vrai mot de ce genre est bon; l’orthographe exacte compte peu en 2e année.' } });

def({ id: 'f77', ic: '🧱', t: 'm devant p et b : mp, mb', en: 'm before p and b: mp, mb', label: 'm devant p ou b', ex: 'lampe',
  w: 'cha[m].bre la[m].pe ja[m].be to[m].ber po[m].pier o[m].bre no[m].bre si[m].ple ti[m].bre dé.ce[m].bre',
  alts: 'n mm', near: 'n', p: 'x',
  s: ['La chambre est jolie.|chambre', 'Papa a une lampe jaune.|lampe', 'Le pompier est sur le pont.|pompier', 'Je mets un timbre sur la lettre.|timbre', 'Il y a une ombre sous l’arbre.|ombre'],
  out: 'blanc lent pente dent vent manger enfant chanter', acc: 'temps tomber trompette important impossible compter campagne champ printemps novembre',
  over: { raw: true, noPseudo: true, find: 'Quel mot s’écrit avec un m devant p ou b?', sort2: 'Classe les mots : m devant p ou b, ou n?',
    bins2: [['m devant p ou b'], ['n']],
    two: 'Écris 2 autres mots où il y a un m devant p ou b.', twoSay: 'Écris deux autres mots où il y a un m devant p ou b.',
    keyTwo: 'Deux vrais mots français où une voyelle est suivie d’un m devant un p ou un b (comme lampe, chambre, jambe).' } });

/* ------------------------------------------------------------------ */
export const units = U.map(makeUnit);
export const FIRST_ID = 40;
