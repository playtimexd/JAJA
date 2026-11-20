// Grade 3 ESL — Writing units g3e30…g3e33 (type `hand`): answer in writing, write about a picture, postcards & emails, my day.
import { say, hand, mkUnit, PF, COMP_WRITE, cap } from './anglais-core.js';
import { readUnits } from './anglais-read.js';

const EN = 'en-CA';
const tb = (fr, en) => ({ fr, en });
const W = (id, icon, title, fr, gens, extra) => mkUnit(id, icon, title, PF + `${COMP_WRITE} — ${fr}`, gens, extra);
const pk = (R, a) => a[R.int(0, a.length - 1)];

/* ---------- g3e30 Read and write the answer (texts come from the reading units) ---------- */
const POOL = { 1: [], 2: [], 3: [] };
for (const u of readUnits.slice(0, 4)) {
  for (const l of [1, 2, 3]) POOL[l].push(...u.pools[l].filter((e) => !e.seq && e.a && e.w && (e.kind === 'lit' || e.kind === 'inf') && e.a.length > 3));
}
const ansQ = (e, level) => hand({
  mode: 'answer', key: `g3e30:${e.key}`, prompt: e.q, say: say(e.q), stimulus: { text: e.text },
  answerKey: e.a, lines: level === 1 ? 2 : level === 2 ? 2 : 3,
});
const answer = W('g3e30', '📝', { fr: 'Lire et répondre par écrit', en: 'Read and write the answer' }, 'lire un texte et répondre par une phrase complète', {
  1: [(R) => ansQ(pk(R, POOL[1]), 1)], 2: [(R) => ansQ(pk(R, POOL[2]), 2)], 3: [(R) => ansQ(pk(R, POOL[3]), 3)],
}, {
  session(level, R) { const l = POOL[level] ? level : 2; const ids = [...new Set(POOL[l].map((e) => e.textId + e.text.slice(0, 20)))]; const t = pk(R, ids); return POOL[l].filter((e) => e.textId + e.text.slice(0, 20) === t).slice(0, 4).map((e) => ansQ(e, l)); },
});

/* ---------- g3e31 Write about a picture ---------- */
const SUBJ = [['the girl', '👧', 'girl'], ['the boy', '👦', 'boy'], ['the dog', '🐶', 'dog'], ['the cat', '🐱', 'cat'], ['the rabbit', '🐰', 'rabbit'], ['the bear', '🐻', 'bear'], ['the frog', '🐸', 'frog'], ['the duck', '🦆', 'duck'], ['the baby', '👶', 'baby'], ['the teacher', '🧑‍🏫', 'teacher']];
const ACT = [['reads a book', '📖', 'read'], ['plays ball', '⚽', 'play'], ['rides a bike', '🚲', 'ride'], ['swims', '🏊', 'swim'], ['eats an apple', '🍎', 'eat'], ['sleeps', '😴', 'sleep'], ['skates', '⛸️', 'skate'], ['paints a picture', '🎨', 'paint'], ['sings', '🎤', 'sing'], ['dances', '💃', 'dance']];
const PLC = [['in the park', '🌳', 'park'], ['at the beach', '🏖️', 'beach'], ['in the snow', '❄️', 'snow'], ['in the rain', '🌧️', 'rain'], ['at home', '🏠', 'home'], ['at school', '🏫', 'school'], ['by the lake', '🏞️', 'lake'], ['in the garden', '🌷', 'garden']];
const SCENES = [];
for (const s of SUBJ) for (const a of ACT) for (const p of PLC) { if (['the dog', 'the cat', 'the rabbit', 'the bear', 'the frog', 'the duck'].includes(s[0]) && ['reads a book', 'rides a bike', 'paints a picture', 'skates'].includes(a[0])) continue; SCENES.push([s, a, p]); }
const scene = (R) => pk(R, SCENES);
const pic = (R, level) => {
  const [s, a, p] = scene(R); const key = `g3e31:l${level}:${s[2]}:${a[2]}:${p[2]}`; const stim = { emoji: `${s[1]}${a[1]}${p[1]}` };
  if (level === 1) return hand({ mode: 'sentence', key, prompt: tb(`Regarde l’image. Écris une phrase. Utilise : ${s[2]}, ${a[2]}.`, `Look at the picture. Write one sentence. Use: ${s[2]}, ${a[2]}.`), say: say(`Look at the picture. Write one sentence. Use: ${s[2]} and ${a[2]}.`), stimulus: stim, words: [s[2], a[2]], minWords: 4, lines: 2 });
  if (level === 2) return hand({ mode: 'sentence', key, prompt: tb(`Écris deux phrases : qui est-ce, que fait-il et où?`, `Write two sentences: who is it, what is happening and where?`), say: say('Write two sentences about the picture. Who is it? What is happening? Where is it?'), stimulus: stim, words: [s[2], p[2]], minWords: 10, lines: 3 });
  return hand({ mode: 'composition', key, prompt: tb('Écris trois phrases sur l’image. Utilise « because » ou « and » une fois.', 'Write three sentences about the picture. Use “because” or “and” at least once.'), say: say('Write three sentences about the picture. Use because or and at least once.'), stimulus: stim, minWords: 20, lines: 5 });
};
const picture = W('g3e31', '🖼️', { fr: 'J’écris sur une image', en: 'Write about a picture' }, 'écrire une, deux ou trois phrases pour décrire une image', { 1: [(R) => pic(R, 1)], 2: [(R) => pic(R, 2)], 3: [(R) => pic(R, 3)] });

/* ---------- g3e32 Postcards and emails ---------- */
const WHO = ['my grandmother', 'my best friend', 'my teacher', 'my cousin', 'my dad', 'my pen pal', 'my aunt', 'my neighbour', 'my uncle', 'my little brother'];
const WHO_F = { 'my grandmother': 'Grandma', 'my best friend': 'my friend', 'my teacher': 'my teacher', 'my cousin': 'my cousin', 'my dad': 'Dad', 'my pen pal': 'my pen pal', 'my aunt': 'my aunt', 'my neighbour': 'my neighbour', 'my uncle': 'my uncle', 'my little brother': 'my brother' };
const POST = [['the beach', '🏖️'], ['the mountains', '⛰️'], ['Québec City', '🏰'], ['a farm', '🚜'], ['a big lake', '🏞️'], ['the zoo', '🦁'], ['a campsite', '⛺'], ['a snowy village', '❄️'], ['a big city', '🏙️'], ['an island', '🏝️']];
const MAIL = [['thank you for a gift', '🎁'], ['invite to my birthday party', '🎂'], ['say sorry', '🙏'], ['ask for help with a project', '📚'], ['tell about my weekend', '📅'], ['tell about my new school friend', '🧒'], ['ask for a recipe', '🍪'], ['tell about a surprise', '🎉']];
const mail = (R, level) => {
  const w = pk(R, WHO);
  if (level === 1) { const p = pk(R, POST); return hand({ mode: 'composition', key: `g3e32:l1:${w}:${p[0]}`, prompt: tb(`Écris une carte postale à ${w}. Dis bonjour, où tu es et au revoir.`, `Write a postcard to ${w}. Say hello, say where you are, and say goodbye.`), say: say(`Write a postcard to ${w}. Say hello, say where you are, and say goodbye.`), stimulus: { emoji: `✉️${p[1]}` }, minWords: 12, lines: 4 }); }
  if (level === 2) { const p = pk(R, POST); return hand({ mode: 'composition', key: `g3e32:l2:${w}:${p[0]}`, prompt: tb(`Écris une carte postale de ${p[0]} à ${w}. Parle de la météo, de ce que tu fais et de ce que tu manges.`, `Write a postcard from ${p[0]} to ${w}. Tell about the weather, what you do and what you eat.`), say: say(`Write a postcard from ${p[0]} to ${w}. Tell about the weather, what you do and what you eat.`), stimulus: { emoji: `✉️${p[1]}` }, minWords: 30, lines: 6 }); }
  const m = pk(R, MAIL); return hand({ mode: 'composition', key: `g3e32:l3:${w}:${m[0]}`, prompt: tb(`Écris un courriel à ${w} pour : ${m[0]}. Écris un objet, « Dear … », au moins quatre phrases et ta signature.`, `Write an email to ${w} to ${m[0]}. Write a subject line, “Dear …”, at least four sentences and your name at the end.`), say: say(`Write an email to ${w} to ${m[0]}. Write a subject line, Dear, at least four sentences, and your name at the end.`), stimulus: { emoji: `💌${m[1]}` }, minWords: 45, lines: 8 });
};
const letters = W('g3e32', '✉️', { fr: 'Cartes postales et courriels', en: 'Postcards & emails' }, 'écrire une carte postale ou un courriel', { 1: [(R) => mail(R, 1)], 2: [(R) => mail(R, 2)], 3: [(R) => mail(R, 3)] });

/* ---------- g3e33 My day ---------- */
const TOPICS = [['my morning', '🌅', 'wake up, eat breakfast, go to school'], ['after school', '🏠', 'snack, homework, play'], ['my weekend', '🎉', 'family, games, friends'], ['my favourite day', '⭐', 'what I do and why I like it'], ['a rainy day', '🌧️', 'inside games and rain'], ['lunch at school', '🥪', 'food, friends, recess'],
  ['a winter day', '⛄', 'clothes, snow, fun'], ['bedtime', '🌙', 'bath, teeth, story'], ['a day at the park', '🌳', 'friends and games'], ['my birthday', '🎂', 'party, cake, gifts'], ['a day with my grandparents', '👵', 'food, stories, games'], ['a trip to the store', '🛒', 'what I buy and with whom'],
  ['a school day', '🏫', 'classes and friends'], ['a snow day', '🛷', 'sledding and hot chocolate'], ['a sports day', '🏅', 'games and teams'], ['cooking with my family', '🍳', 'what we make'], ['a day at the lake', '🏊', 'swimming and picnic'], ['a busy Saturday', '📅', 'many activities'], ['when I help at home', '🧹', 'chores'], ['a quiet Sunday', '📖', 'rest and relax'], ['a day at the library', '📚', 'books and quiet'], ['a bike ride', '🚲', 'where and with whom'], ['a day with my pet', '🐶', 'walks and play'], ['a class trip', '🚌', 'where we went']];
const day = (R, level) => {
  const t = pk(R, TOPICS), v = R.int(0, 2); const key = `g3e33:l${level}:${t[0]}:${v}`; const stim = { emoji: t[1] };
  if (level === 1) {
    const f = [`Write 3 sentences about ${t[0]}.`, `Tell about ${t[0]}. Write 3 short sentences.`, `What do you do? Write 3 sentences about ${t[0]}.`][v]; const ff = [`Écris 3 phrases sur ${t[0]}.`, `Parle de ${t[0]}. Écris 3 courtes phrases.`, `Qu’est-ce que tu fais? Écris 3 phrases sur ${t[0]}.`][v];
    return hand({ mode: 'composition', key, prompt: tb(ff, f), say: say(f), stimulus: stim, minWords: 10, lines: 4 });
  }
  if (level === 2) {
    const f = [`Describe ${t[0]} with first, then and finally.`, `Write about ${t[0]}. Say what you like and what you do.`, `Write 5 sentences about ${t[0]}. Use the present tense.`][v]; const ff = [`Décris ${t[0]} avec first, then et finally.`, `Écris sur ${t[0]}. Dis ce que tu aimes et ce que tu fais.`, `Écris 5 phrases sur ${t[0]} au présent.`][v];
    return hand({ mode: 'composition', key, prompt: tb(ff, f), say: say(f), stimulus: stim, minWords: 25, lines: 6 });
  }
  const f = [`Write about ${t[0]} last week and what you will do next time.`, `Write a paragraph about ${t[0]}. Use the past tense and say how you felt.`, `Write about ${t[0]}. Say what you did, what you saw and why you liked it.`][v]; const ff = [`Écris sur ${t[0]} la semaine dernière et ce que tu feras la prochaine fois.`, `Écris un paragraphe sur ${t[0]} au passé et dis comment tu te sentais.`, `Écris sur ${t[0]} : ce que tu as fait, ce que tu as vu et pourquoi tu as aimé ça.`][v];
  return hand({ mode: 'composition', key, prompt: tb(ff, f), say: say(f), stimulus: stim, minWords: 40, lines: 8 });
};
const myday = W('g3e33', '📅', { fr: 'Ma journée', en: 'My day' }, 'raconter et décrire sa journée', { 1: [(R) => day(R, 1)], 2: [(R) => day(R, 2)], 3: [(R) => day(R, 3)] });

export const writeUnits = [answer, picture, letters, myday];
