// Grade 3 ESL — Grammar units g3e17…g3e26 (simple present, present continuous, simple past, can/can't, there is/are,
// plurals, possessives, prepositions, question words, adjectives & comparatives). All sentences are original, Canadian English.
import { say, mc, blank, which, build, sortQ, mkUnit, PF, COMP_INT, rest, cap, split, P } from './anglais-core.js';

const NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const FN = ['Mia', 'Zoe', 'Ava', 'Ella', 'Lily', 'Nora', 'Ruby', 'Anna'], MN = ['Leo', 'Sam', 'Max', 'Noah', 'Ben', 'Omar', 'Jack', 'Theo'];
const DOUBLE = new Set(['run', 'swim', 'sit', 'stop', 'get', 'dig', 'shop', 'clap', 'hop', 'plan', 'chop', 'hug', 'jog', 'skip', 'rob']);
const s3 = (b) => (b === 'have' ? 'has' : /(s|sh|ch|x|z|o)$/.test(b) ? b + 'es' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ies' : b + 's');
const ing = (b) => (b.endsWith('ie') ? b.slice(0, -2) + 'ying' : (b.endsWith('e') && !b.endsWith('ee') ? b.slice(0, -1) : DOUBLE.has(b) ? b + b.at(-1) : b) + 'ing');
const edF = (b) => (b.endsWith('e') ? b + 'd' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ied' : DOUBLE.has(b) ? b + b.at(-1) + 'ed' : b + 'ed');
const tb = (fr, en) => ({ fr, en });
const U = (id, icon, title, fr, gens) => mkUnit(id, icon, title, PF + `${COMP_INT} / écrire — grammaire : ${fr}`, gens);
const IRR = { go: 'went', see: 'saw', eat: 'ate', have: 'had', make: 'made', take: 'took', come: 'came', give: 'gave', get: 'got', run: 'ran', write: 'wrote', buy: 'bought', swim: 'swam', sit: 'sat', drink: 'drank', find: 'found', say: 'said', sleep: 'slept', bring: 'brought', ride: 'rode', sing: 'sang', draw: 'drew', fly: 'flew' };
const PROPER = new Set(['I', ...FN, ...MN]);
const sj = (x) => (PROPER.has(x) ? x : x[0].toLowerCase() + x.slice(1));
const pickOf = (R, arr, n) => R.sample(arr, n);
const uniq = (a) => [...new Set(a)];

/* ================================================================== */
/*  g3e17 — Simple present                                            */
/* ================================================================== */
const PS = split('play|soccer after school;eat|an apple at lunch;read|a book every night;walk|to school;drink|milk at breakfast;run|in the park;swim|in the lake;sing|in the choir;draw|funny pictures;wash|the dishes;watch|cartoons on Saturday;brush|the dog every morning;go|to the library on Fridays;do|homework after dinner;have|a pet rabbit;study|English on Tuesdays;fly|a kite in spring;try|new foods;catch|the bus at eight;teach|math to children;push|the swing;fix|old bikes;carry|a heavy bag;cry|at sad movies;ride|a bike to the park;write|letters to Grandma;paint|the fence;cook|soup on Sundays;jump|over puddles;help|at home'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const SUBJ = [['I', 'b'], ['You', 'b'], ['We', 'b'], ['They', 'b'], ['The children', 'b'], ['My friends', 'b'], ['He', 's'], ['She', 's'], ['Mia', 's'], ['Leo', 's'], ['My brother', 's'], ['Our teacher', 's']];
const sf = (v, t) => (t === 's' ? s3(v[0]) : v[0]);
const aux = (t, neg) => (t === 's' ? (neg ? 'doesn’t' : 'does') : neg ? 'don’t' : 'do');
const ps = (R) => ({ v: R.pick(PS), s: R.pick(SUBJ) });
const g17 = {
  1: [
    (R) => { const { v, s } = ps(R); return blank(`g17a1:${s[0]}:${v[0]}`, `${s[0]} ___ ${v[1]}.`, sf(v, s[1]), [sf(v, s[1] === 's' ? 'b' : 's'), ing(v[0])].filter((x) => x !== sf(v, s[1])), { tip: tb('Avec he / she / un nom (Mia), on ajoute -s au verbe.', 'With he / she / one name (Mia), add -s to the verb.') }); },
    (R) => { const { v, s } = ps(R); return which(`g17b1:${s[0]}:${v[0]}`, `${s[0]} ${sf(v, s[1])} ${v[1]}.`, [`${s[0]} ${sf(v, s[1] === 's' ? 'b' : 's')} ${v[1]}.`, `${s[0]} ${ing(v[0])} ${v[1]}.`], { tip: tb('He / she → verbe + s. I / you / we / they → verbe sans s.', 'He / she → verb + s. I / you / we / they → verb without s.') }); },
    (R) => { const { v, s } = ps(R); const sent = `${s[0]} ${sf(v, s[1])} ${v[1]}.`; return build(`g17c1:${sent}`, sent, { tip: tb('Sujet, verbe, puis le reste de la phrase.', 'Subject, verb, then the rest of the sentence.') }); },
    (R) => { const v = R.pick(PS); return mc(`g17d1:${v[0]}`, tb('Choisis la bonne forme pour « he ».', 'Choose the right form for “he”.'), s3(v[0]), [v[0], ing(v[0]), v[0] + 'ed'], { stimulus: { text: `He ___ (${v[0]})` } }); },
  ],
  2: [
    (R) => { const { v, s } = ps(R); return blank(`g17a2:${s[0]}:${v[0]}`, `___ ${sj(s[0])} ${v[0]} ${v[1]}?`, cap(aux(s[1])), ['Is', 'Are', s[1] === 's' ? 'Do' : 'Does'], { tip: tb('Question : Do + I / you / we / they, Does + he / she.', 'Question: Do + I / you / we / they, Does + he / she.') }); },
    (R) => { const { v, s } = ps(R); return blank(`g17b2:${s[0]}:${v[0]}`, `${s[0]} ___ ${v[0]} ${v[1]}.`, aux(s[1], true), [s[1] === 's' ? 'don’t' : 'doesn’t', 'isn’t', 'not'], { tip: tb('Négation : don’t / doesn’t + verbe de base (sans s).', 'Negative: don’t / doesn’t + base verb (no s).') }); },
    (R) => { const { v, s } = ps(R); const t = R.int(0, 2); const S = s[0], b = s[1];
      if (t === 0) return which(`g17c2a:${S}:${v[0]}`, `${S} ${sf(v, b)} ${v[1]}.`, [`${S} ${sf(v, b === 's' ? 'b' : 's')} ${v[1]}.`, `${S} does ${v[0]} ${v[1]}.`, `${S} is ${v[0]} ${v[1]}.`]);
      if (t === 1) return which(`g17c2b:${S}:${v[0]}`, `${b === 's' ? 'Does' : 'Do'} ${sj(S)} ${v[0]} ${v[1]}?`, [`${b === 's' ? 'Do' : 'Does'} ${sj(S)} ${v[0]} ${v[1]}?`, `${b === 's' ? 'Does' : 'Do'} ${sj(S)} ${s3(v[0])} ${v[1]}?`, `Is ${sj(S)} ${v[0]} ${v[1]}?`]);
      return which(`g17c2c:${S}:${v[0]}`, `${S} ${aux(b, true)} ${v[0]} ${v[1]}.`, [`${S} ${aux(b, true)} ${sf(v, 's')} ${v[1]}.`, `${S} ${b === 's' ? 'don’t' : 'doesn’t'} ${v[0]} ${v[1]}.`, `${S} not ${v[0]} ${v[1]}.`]); },
    (R) => { const v = R.pick(PS); const n = R.pick([...FN, ...MN]); const f = FN.includes(n); const sc = R.chance(0.5);
      return mc(`g17e2:${n}:${v[0]}:${sc}`, tb('Choisis la bonne réponse courte.', 'Choose the right short answer.'), sc ? `Yes, ${f ? 'she' : 'he'} does.` : `No, ${f ? 'she' : 'he'} doesn’t.`, [sc ? `Yes, ${f ? 'she' : 'he'} do.` : `No, ${f ? 'she' : 'he'} don’t.`, sc ? `Yes, ${f ? 'she' : 'he'} is.` : `No, ${f ? 'she' : 'he'} isn’t.`, sc ? `Yes, ${f ? 'she' : 'he'} ${s3(v[0])}.` : `No, ${f ? 'she' : 'he'} not.`], { stimulus: { text: `Does ${n} ${v[0]} ${v[1]}?  ${sc ? '✅' : '❌'}` }, tip: tb('Réponse courte : Yes, he does. / No, he doesn’t.', 'Short answer: Yes, he does. / No, he doesn’t.') }); },
  ],
  3: [
    (R) => { const v = R.pick(PS); const c = s3(v[0]); const cand = uniq([v[0] + 's', v[0] + 'es', v[0].replace(/y$/, 'ies'), v[0], v[0] + 'ies', v[0] + 'ing']).filter((x) => x !== c);
      return mc(`g17a3:${v[0]}`, tb('Quelle est la bonne orthographe?', 'Which spelling is correct?'), c, R.sample(cand, 3), { stimulus: { text: `She ___ ${v[1]}. (${v[0]})` }, cols: 2, tip: tb('-s / -es (sh, ch, x, o) / consonne + y → -ies. Spéciaux : have → has.', '-s / -es (sh, ch, x, o) / consonant + y → -ies. Special: have → has.') }); },
    (R) => { const v = R.pick(PS), s = R.pick(SUBJ), adv = R.pick(['always', 'usually', 'often', 'sometimes', 'never']); const sent = `${s[0]} ${adv} ${sf(v, s[1])} ${v[1]}.`; return build(`g17b3:${sent}`, sent, { tip: tb('L’adverbe de fréquence va avant le verbe.', 'The frequency adverb goes before the verb.') }); },
    (R) => { const v = R.pick(PS), s = R.pick(SUBJ.filter((x) => x[1] === 's')), adv = R.pick(['always', 'usually', 'often', 'never']);
      return which(`g17c3:${s[0]}:${v[0]}:${adv}`, `${s[0]} ${adv} ${s3(v[0])} ${v[1]}.`, [`${s[0]} ${s3(v[0])} ${adv} ${v[1]}.`, `${s[0]} ${adv} ${v[0]} ${v[1]}.`, `${s[0]} ${adv} is ${s3(v[0])} ${v[1]}.`], { tip: tb('Adverbe avant le verbe, et -s après he / she.', 'Adverb before the verb, and -s after he / she.') }); },
    (R) => { const v = R.pick(PS), s = R.pick(SUBJ), wh = R.pick(['What', 'Where', 'When', 'Why', 'How often']);
      return blank(`g17d3:${wh}:${s[0]}:${v[0]}`, `${wh} ___ ${sj(s[0])} ${v[0]}?`, aux(s[1]), [s[1] === 's' ? 'do' : 'does', 'is', 'are'], { tip: tb('Après what / where / when / why : do ou does + sujet + verbe de base.', 'After what / where / when / why: do or does + subject + base verb.') }); },
    (R) => { const pool = R.sample(PS, 9).map((v) => s3(v[0])); const pl = uniq(pool); const groups = { s: [], es: [], ies: [] }; for (const w of pl) (w.endsWith('ies') ? groups.ies : w.endsWith('es') ? groups.es : groups.s).push(w);
      const ks = Object.keys(groups).filter((k) => groups[k].length >= 1); if (ks.length < 2) return g17[3][0](R);
      const bins = { s: { text: '+ s' }, es: { text: '+ es' }, ies: { text: 'y → ies' } };
      return sortQ(`g17f3:${ks.map((k) => groups[k].slice(0, 2).join('/')).join('|')}`, tb('Classe les verbes selon leur terminaison.', 'Sort the verbs by their ending.'), ks.map((k) => bins[k]), ks.map((k) => groups[k].slice(0, 2)), { tip: tb('Regarde la fin du mot de base.', 'Look at the end of the base word.') }); },
  ],
};

/* ================================================================== */
/*  g3e18 — Present continuous                                        */
/* ================================================================== */
const PC = [['play', 'soccer', '⚽'], ['read', 'a book', '📖'], ['eat', 'an apple', '🍎'], ['run', 'in the park', '🏃'], ['swim', 'in the pool', '🏊'], ['draw', 'a picture', '🎨'], ['sing', 'a song', '🎤'], ['dance', 'in the hall', '💃'],
  ['sleep', 'in bed', '😴'], ['write', 'a letter', '✍️'], ['cook', 'dinner', '🍳'], ['ride', 'a bike', '🚴'], ['skate', 'on the rink', '⛸️'], ['paint', 'a wall', '🖌️'], ['jump', 'on the trampoline', '🤸'], ['make', 'a snowman', '⛄'],
  ['sit', 'on the sofa', '🛋️'], ['stop', 'at the red light', '🚦'], ['drink', 'juice', '🧃'], ['wash', 'the car', '🚗'], ['climb', 'a tree', '🌳'], ['fly', 'a kite', '🪁'], ['listen', 'to music', '🎧'], ['take', 'a photo', '📷'],
  ['dig', 'a hole', '🕳️'], ['build', 'a tower', '🧱'], ['talk', 'on the phone', '📞'], ['shop', 'at the mall', '🛍️']];
const SB = [['I', 'am'], ['You', 'are'], ['He', 'is'], ['She', 'is'], ['We', 'are'], ['They', 'are'], ['Mia', 'is'], ['Leo', 'is'], ['The children', 'are'], ['My dog', 'is'], ['My parents', 'are'], ['Our teacher', 'is']];
const wrongIng = (b) => uniq([b + 'ing', b.slice(0, -1) + 'ing', b + b.at(-1) + 'ing', b + 's', b]).filter((x) => x !== ing(b));
const g18 = {
  1: [
    (R) => { const v = R.pick(PC), n = R.pick([...FN, ...MN]); const o = R.sample(PC.filter((x) => x[0] !== v[0]), 2);
      return mc(`g18a1:${n}:${v[0]}`, tb(`Que fait ${n}?`, `What is ${n} doing?`), `${n} is ${ing(v[0])}.`, o.map((x) => `${n} is ${ing(x[0])}.`), { stimulus: { emoji: v[2] }, say: say(`What is ${n} doing?`), tip: tb('Is + verbe-ing : action en cours.', 'Is + verb-ing: an action happening now.') }); },
    (R) => { const v = R.pick(PC), s = R.pick(SB); return blank(`g18b1:${s[0]}:${v[0]}`, `Look! ${s[0]} ___ ${ing(v[0])} ${v[1]}.`, s[1], rest(['is', 'are', 'am'], s[1]), { tip: tb('I am, you / we / they are, he / she / it is.', 'I am, you / we / they are, he / she / it is.') }); },
    (R) => { const v = R.pick(PC), s = R.pick(SB); return blank(`g18c1:${s[0]}:${v[0]}`, `${s[0]} ${s[1]} ___ ${v[1]}. (${v[0]})`, ing(v[0]), [v[0], s3(v[0]), v[0] + 'ed'], { tip: tb('Après am / is / are, on ajoute -ing au verbe.', 'After am / is / are, add -ing to the verb.') }); },
    (R) => { const v = R.pick(PC), s = R.pick(SB); const sent = `${s[0]} ${s[1]} ${ing(v[0])} ${v[1]}.`; return build(`g18d1:${sent}`, sent); },
  ],
  2: [
    (R) => { const v = R.pick(PC); return mc(`g18a2:${v[0]}`, tb('Quelle est la bonne orthographe?', 'Which spelling is correct?'), ing(v[0]), R.sample(wrongIng(v[0]), 3), { stimulus: { text: `He is ___ ${v[1]}. (${v[0]})` }, cols: 2, tip: tb('Verbe en -e : on enlève le e. Court (run) : on double la consonne.', 'Verb ending in -e: drop the e. Short verb (run): double the last letter.') }); },
    (R) => { const v = R.pick(PC), s = R.pick(SB); return blank(`g18b2:${s[0]}:${v[0]}`, `___ ${sj(s[0])} ${ing(v[0])} ${v[1]}?`, cap(s[1]), rest(['Is', 'Are', 'Am', 'Do'], cap(s[1])).slice(0, 3), { tip: tb('Question : on place am / is / are avant le sujet.', 'Question: put am / is / are before the subject.') }); },
    (R) => { const v = R.pick(PC), s = R.pick(SB.filter((x) => x[0] !== 'I')); return blank(`g18c2:${s[0]}:${v[0]}`, `${s[0]} ___ ${ing(v[0])} ${v[1]}.`, `${s[1]}n’t`.replace('arn’t', 'aren’t').replace('isn’t', 'isn’t'), [s[1] === 'is' ? 'aren’t' : 'isn’t', 'don’t', 'not'], { tip: tb('Négation : isn’t / aren’t + verbe-ing.', 'Negative: isn’t / aren’t + verb-ing.') }); },
    (R) => { const v = R.pick(PC), s = R.pick(SB); const S = s[0]; return which(`g18d2:${S}:${v[0]}`, `${S} ${s[1]} ${ing(v[0])} ${v[1]}.`, [`${S} ${ing(v[0])} ${v[1]}.`, `${S} ${s[1]} ${v[0]} ${v[1]}.`, `${S} ${rest(['am', 'is', 'are'], s[1])[0]} ${ing(v[0])} ${v[1]}.`]); },
    (R) => { const v = R.pick(PC), n = R.pick([...FN, ...MN]); const now = R.chance(0.5); const cue = now ? R.pick(['Right now,', 'At the moment,', 'Look! Today,']) : R.pick(['Every day,', 'Every Saturday,', 'Usually,']);
      return mc(`g18e2:${n}:${v[0]}:${now}:${cue}`, tb('Maintenant ou d’habitude? Choisis la bonne forme.', 'Now or usually? Choose the right form.'), now ? `${n} is ${ing(v[0])}` : `${n} ${s3(v[0])}`, now ? [`${n} ${s3(v[0])}`, `${n} ${v[0]}`, `${n} is ${v[0]}`] : [`${n} is ${ing(v[0])}`, `${n} ${v[0]}`, `${n} are ${ing(v[0])}`], { stimulus: { text: `${cue} ___ ${v[1]}.` }, tip: tb('Maintenant → is + -ing. Habitude → présent simple (-s).', 'Now → is + -ing. Habit → simple present (-s).') }); },
  ],
  3: [
    (R) => { const v = R.pick(PC); const extra = R.sample('abcdefghijklmnopqrstuvwxyz'.split('').filter((c) => !ing(v[0]).includes(c)), 2); return { type: 'order', key: `g18a3:${v[0]}`, prompt: tb('Écris le mot avec -ing. Remets les lettres dans l’ordre.', 'Spell the -ing word. Put the letters in order.'), say: say(ing(v[0])), stimulus: { emoji: v[2] }, tiles: ing(v[0]).split(''), extra, joiner: '' }; },
    (R) => { const v = R.pick(PC), s = R.pick(SB.filter((x) => x[0] !== 'I')); const t = R.int(0, 2);
      const fixed = t === 0 ? `${cap(s[1])} ${sj(s[0])} ${ing(v[0])} ${v[1]}?` : t === 1 ? `${s[0]} ${s[1]}n’t ${ing(v[0])} ${v[1]}.` : `What ${s[1]} ${sj(s[0])} doing?`;
      return build(`g18b3:${t}:${s[0]}:${v[0]}`, fixed, { tip: tb('Question : be + sujet + verbe-ing.', 'Question: be + subject + verb-ing.') }); },
    (R) => { const v = R.pick(PC), n = R.pick([...FN, ...MN]); const f = FN.includes(n); const yes = R.chance(0.5); const sh = f ? 'she' : 'he';
      return mc(`g18c3:${n}:${v[0]}:${yes}`, tb(`Regarde l’image. Est-ce que ${n} ${ing(v[0])}?`, `Look at the picture. Is ${n} ${ing(v[0])}?`), yes ? `Yes, ${sh} is.` : `No, ${sh} isn’t.`, [yes ? `No, ${sh} isn’t.` : `Yes, ${sh} is.`, `Yes, ${sh} does.`, `No, ${sh} doesn’t.`].slice(0, 3), { stimulus: { emoji: yes ? v[2] : R.pick(PC.filter((x) => x[0] !== v[0]))[2] }, say: say(`Is ${n} ${ing(v[0])}?`), tip: tb('Réponse courte : Yes, he is. / No, he isn’t.', 'Short answer: Yes, he is. / No, he isn’t.') }); },
    (R) => { const v = R.pick(PC), n = R.pick([...FN, ...MN]); const t = R.int(0, 2);
      if (t === 0) return blank(`g18d3a:${n}:${v[0]}`, `Listen! ${n} ___ ${v[1]}.`, `is ${ing(v[0])}`, [s3(v[0]), `${v[0]}`, `are ${ing(v[0])}`], { tip: tb('Listen! / Look! → action en cours (-ing).', 'Listen! / Look! → action in progress (-ing).') });
      if (t === 1) return blank(`g18d3b:${n}:${v[0]}`, `${n} always ___ ${v[1]} on Saturdays.`, s3(v[0]), [`is ${ing(v[0])}`, `${v[0]}`, ing(v[0])], { tip: tb('always → présent simple.', 'always → simple present.') });
      return blank(`g18d3c:${n}:${v[0]}`, `Be quiet! ${n} ___ ${v[1]}.`, `is ${ing(v[0])}`, [s3(v[0]), `${v[0]}`, `isn’t ${v[0]}`], { tip: tb('Be quiet! → action en cours.', 'Be quiet! → action in progress.') }); },
    (R) => { const all = ['play', 'read', 'eat', 'sing', 'cook', 'paint', 'run', 'swim', 'sit', 'stop', 'dance', 'write', 'ride', 'make', 'take', 'skate']; const rules = { add: all.slice(0, 8).filter((w) => !DOUBLE.has(w)), dbl: ['run', 'swim', 'sit', 'stop'], drop: ['dance', 'write', 'ride', 'make', 'take', 'skate'] };
      const a = R.sample(rules.add, 2), d = R.sample(rules.dbl, 2), e = R.sample(rules.drop, 2);
      return sortQ(`g18e3:${[...a, ...d, ...e].sort().join(',')}`, tb('Comment écrit-on le -ing?', 'How do we spell the -ing form?'), [{ text: '+ ing' }, { text: 'double + ing' }, { text: 'drop e + ing' }], [a, d, e], { tip: tb('play → playing, run → running, dance → dancing', 'play → playing, run → running, dance → dancing') }); },
    (R) => { const v = R.pick(PC), s = R.pick(SB.filter((x) => x[0] !== 'I' && x[0] !== 'He' && x[0] !== 'She')); return blank(`g18f3:${s[0]}:${v[0]}`, `What ___ ${sj(s[0])} doing?`, s[1], rest(['is', 'are', 'do', 'does'], s[1]), { tip: tb('What + is / are + sujet + doing?', 'What + is / are + subject + doing?') }); },
  ],
};

/* ================================================================== */
/*  g3e19 — Simple past                                               */
/* ================================================================== */
const REG = split('walk|to school;play|hockey with my friends;jump|over the puddle;help|my mom in the kitchen;visit|my grandmother;watch|a funny movie;clean|my room;ask|a question;want|a snack;start|a new book;call|my cousin;open|the window;paint|a big picture;cook|dinner;wash|the car;laugh|at the joke;dance|at the party;bake|a cake;study|for the test;try|a new game;stop|at the red light;plan|a trip;carry|the heavy box;cry|at the sad movie;hop|on one foot'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const IRRV = split('go|to the park;see|a moose near the lake;eat|a big sandwich;have|a great time;make|a snowman;take|a photo;come|home late;give|a gift to my friend;get|a new bike;run|in the race;write|a long letter;buy|some milk;swim|in the lake;sit|by the window;drink|hot chocolate;find|a shiny stone;say|hello to everyone;sleep|for ten hours;bring|my lunch;ride|my bike;sing|a song;draw|a picture;fly|a kite'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const PAST = [...REG, ...IRRV];
const pastOf = (b) => IRR[b] || edF(b);
const CUES = ['Yesterday', 'Last night', 'Last week', 'Two days ago', 'Last summer', 'On Saturday', 'This morning'];
const SBP = ['I', 'You', 'We', 'They', 'He', 'She', 'Mia', 'Leo', 'My brother', 'The children'];
const g19 = {
  1: [
    (R) => { const v = R.pick(PAST), s = R.pick(SBP); const p = pastOf(v[0]); return blank(`g19a1:${s}:${v[0]}`, `Yesterday, ${s} ___ ${v[1]}.`, p, uniq([v[0], ing(v[0]), IRR[v[0]] ? v[0] + 'ed' : s3(v[0])]).filter((x) => x !== p).slice(0, 2), { tip: tb('Passé : verbe + -ed (réguliers) ou forme spéciale (go → went).', 'Past: verb + -ed (regular) or a special form (go → went).') }); },
    (R) => { const v = R.pick(REG); return mc(`g19b1:${v[0]}`, tb('Choisis le verbe au passé.', 'Choose the past form.'), edF(v[0]), [v[0], ing(v[0]), s3(v[0])], { stimulus: { text: v[0] }, say: say(v[0]), tip: tb('Verbe régulier : on ajoute -ed (dance → danced, study → studied).', 'Regular verb: add -ed (dance → danced, study → studied).') }); },
    (R) => { const v = R.pick(PAST), s = R.pick(SBP); const sent = `${R.pick(CUES.slice(0, 3))}, ${s} ${pastOf(v[0])} ${v[1]}.`; return build(`g19c1:${sent}`, sent); },
    (R) => { const a = R.sample(REG, 3), b = R.sample(REG.filter((x) => !a.includes(x)), 3);
      return sortQ(`g19d1:${[...a, ...b].map((x) => x[0]).sort().join(',')}`, tb('Maintenant ou hier? Classe les verbes.', 'Now or before? Sort the verbs.'), [{ text: 'today', emoji: '☀️' }, { text: 'yesterday', emoji: '🌙' }], [a.map((x) => x[0]), b.map((x) => edF(x[0]))], { speak: true }); },
  ],
  2: [
    (R) => { const v = R.pick(IRRV), s = R.pick(SBP), cue = R.pick(CUES); const p = IRR[v[0]]; return blank(`g19a2:${cue}:${s}:${v[0]}`, `${cue}, ${s} ___ ${v[1]}.`, p, [v[0] + 'ed', v[0], ing(v[0])].filter((x) => x !== p), { cols: 2, tip: tb('Verbes irréguliers : go → went, see → saw, eat → ate…', 'Irregular verbs: go → went, see → saw, eat → ate…') }); },
    (R) => { const v = R.pick(PAST), s = R.pick(SBP); return blank(`g19b2:${s}:${v[0]}`, `${s} didn’t ___ ${v[1]}.`, v[0], [pastOf(v[0]), s3(v[0]), ing(v[0])].filter((x) => x !== v[0]), { tip: tb('didn’t + verbe de base (pas de -ed!).', 'didn’t + base verb (no -ed!).') }); },
    (R) => { const v = R.pick(PAST), s = R.pick(SBP.filter((x) => x !== 'I')); return blank(`g19c2:${s}:${v[0]}`, `Did ${sj(s)} ___ ${v[1]}?`, v[0], [pastOf(v[0]), s3(v[0]), ing(v[0])].filter((x) => x !== v[0]), { tip: tb('Did + sujet + verbe de base?', 'Did + subject + base verb?') }); },
    (R) => { const b = R.pick(Object.keys(IRR)); return mc(`g19d2:${b}`, tb('Quel est le passé de ce verbe?', 'What is the past of this verb?'), IRR[b], [b + 'ed', b, ing(b)].filter((x) => x !== IRR[b]), { stimulus: { text: b }, say: say(b), cols: 2, tip: tb(`${b} → ${IRR[b]}`, `${b} → ${IRR[b]}`) }); },
    (R) => { const v = R.pick(IRRV), s = R.pick(SBP); const p = IRR[v[0]]; return which(`g19e2:${s}:${v[0]}`, `${s} ${p} ${v[1]}.`, [`${s} ${v[0]}ed ${v[1]}.`, `${s} did ${p} ${v[1]}.`, `${s} didn’t ${p} ${v[1]}.`], { tip: tb('Pas de did + passé dans la même phrase.', 'Do not use did together with a past form.') }); },
    (R) => { const v = R.pick(REG.filter((x) => /(y|e)$/.test(x[0]) || DOUBLE.has(x[0]))); const c = edF(v[0]); const cand = uniq([v[0] + 'ed', v[0] + 'd', v[0].slice(0, -1) + 'ed', v[0].slice(0, -1) + 'ied', v[0] + v[0].at(-1) + 'ed', v[0] + 'ied']).filter((x) => x !== c);
      return mc(`g19f2:${v[0]}`, tb('Quelle est la bonne orthographe?', 'Which spelling is correct?'), c, R.sample(cand, 3), { stimulus: { text: `${v[0]} → ?` }, cols: 2, tip: tb('study → studied, stop → stopped, dance → danced', 'study → studied, stop → stopped, dance → danced') }); },
  ],
  3: [
    (R) => { const reg = R.sample(REG.map((x) => edF(x[0])), 3), irr = R.sample(Object.values(IRR), 3);
      return sortQ(`g19a3:${[...reg, ...irr].sort().join(',')}`, tb('Verbe régulier (-ed) ou irrégulier?', 'Regular (-ed) or irregular verb?'), [{ text: 'regular (-ed)' }, { text: 'irregular' }], [reg, irr], { tip: tb('Les verbes réguliers se terminent par -ed.', 'Regular verbs end in -ed.') }); },
    (R) => { const b = R.pick(Object.keys(IRR).filter((x) => IRR[x].length >= 4)); const p = IRR[b]; const extra = R.sample('abcdefghijklmnopqrstuvwxyz'.split('').filter((c) => !p.includes(c)), 2);
      return { type: 'order', key: `g19b3:${b}`, prompt: tb('Écris le passé. Remets les lettres dans l’ordre.', 'Spell the past form. Put the letters in order.'), say: say(p), stimulus: { text: b }, tiles: p.split(''), extra, joiner: '' }; },
    (R) => { const v = R.pick(PAST), s = R.pick(SBP.filter((x) => x !== 'I' && x !== 'You' && x !== 'We' && x !== 'They')), t = R.int(0, 2);
      const sent = t === 0 ? `Did ${sj(s)} ${v[0]} ${v[1]} yesterday?` : t === 1 ? `${s} didn’t ${v[0]} ${v[1]} last night.` : `Where did ${sj(s)} ${v[0]} ${v[1]}?`;
      return build(`g19c3:${t}:${s}:${v[0]}`, sent, { tip: tb('Did + sujet + verbe de base; didn’t + verbe de base.', 'Did + subject + base verb; didn’t + base verb.') }); },
    (R) => { const v = R.pick(PAST), s = R.pick(SBP), cue = R.pick(CUES.slice(0, 6)); const p = pastOf(v[0]); return blank(`g19d3:${cue}:${s}:${v[0]}`, `${cue}, ${s} ___ ${v[1]}.`, p, [v[0], `will ${v[0]}`, `${s === 'I' ? 'am' : 'is'} ${ing(v[0])}`], { cols: 2, tip: tb('Yesterday / last … / … ago → passé.', 'Yesterday / last … / … ago → past tense.') }); },
    (R) => { const v = R.pick(PAST), s = R.pick(SBP.filter((x) => x !== 'I')), wh = R.pick(['What', 'Where', 'When', 'Why']);
      return blank(`g19e3:${wh}:${s}:${v[0]}`, `${wh} did ${sj(s)} ___ yesterday?`, v[0], [pastOf(v[0]), s3(v[0]), ing(v[0])].filter((x) => x !== v[0]), { tip: tb('Après did, le verbe reste à la base.', 'After did, the verb stays in its base form.') }); },
    (R) => { const v = R.pick(PAST), s = R.pick(SBP); const p = pastOf(v[0]); const t = R.int(0, 2);
      if (t === 0) return which(`g19f3a:${s}:${v[0]}`, `${s} didn’t ${v[0]} ${v[1]}.`, [`${s} didn’t ${p} ${v[1]}.`, `${s} not ${p} ${v[1]}.`, `${s} don’t ${v[0]} ${v[1]}.`].filter((x) => x !== `${s} didn’t ${v[0]} ${v[1]}.`));
      if (t === 1) return which(`g19f3b:${s}:${v[0]}`, `Did ${sj(s)} ${v[0]} ${v[1]}?`, [`Did ${sj(s)} ${p} ${v[1]}?`, `Do ${sj(s)} ${p} ${v[1]}?`, `Was ${sj(s)} ${v[0]} ${v[1]}?`].filter((x) => x !== `Did ${sj(s)} ${v[0]} ${v[1]}?`));
      return which(`g19f3c:${s}:${v[0]}`, `${s} ${p} ${v[1]}.`, [`${s} ${IRR[v[0]] ? v[0] + 'ed' : v[0]} ${v[1]}.`, `${s} did ${v[0]} ${v[1]}.`, `${s} was ${p} ${v[1]}.`]); },
  ],
};

/* ================================================================== */
/*  g3e20 — can / can't                                               */
/* ================================================================== */
// [subject, verb, true?, emoji]
const CAN = [['A fish', 'swim', 1, '🐟'], ['A fish', 'walk', 0, '🐟'], ['A bird', 'fly', 1, '🐦'], ['A penguin', 'fly', 0, '🐧'], ['A penguin', 'swim', 1, '🐧'], ['A dog', 'run', 1, '🐶'], ['A dog', 'read', 0, '🐶'], ['A cat', 'climb', 1, '🐱'],
  ['A cat', 'drive a car', 0, '🐱'], ['A baby', 'drive a car', 0, '👶'], ['A baby', 'cry', 1, '👶'], ['A kangaroo', 'jump', 1, '🦘'], ['A turtle', 'fly', 0, '🐢'], ['A frog', 'jump', 1, '🐸'], ['A monkey', 'climb', 1, '🐒'], ['A cow', 'fly', 0, '🐄'],
  ['A parrot', 'talk', 1, '🦜'], ['A rabbit', 'hop', 1, '🐰'], ['A whale', 'swim', 1, '🐋'], ['A whale', 'walk', 0, '🐋'], ['A horse', 'run', 1, '🐴'], ['A pencil', 'write', 1, '✏️'], ['A plane', 'fly', 1, '✈️'], ['A bike', 'fly', 0, '🚲'],
  ['A boat', 'float', 1, '⛵'], ['A rock', 'float', 0, '🪨'], ['A snowman', 'run', 0, '⛄'], ['A bee', 'fly', 1, '🐝'], ['A snake', 'run', 0, '🐍'], ['A duck', 'swim', 1, '🦆'], ['A tree', 'walk', 0, '🌳'], ['A teacher', 'read', 1, '👩‍🏫'],
  ['A robot', 'talk', 1, '🤖'], ['A fish', 'climb a tree', 0, '🐟'], ['A bear', 'swim', 1, '🐻'], ['A giraffe', 'run', 1, '🦒'], ['A mouse', 'fly', 0, '🐭'], ['A butterfly', 'fly', 1, '🦋'], ['A dolphin', 'jump', 1, '🐬'], ['An owl', 'fly', 1, '🦉']];
const ABIL = split('swim|fish,whale,duck,frog,penguin,dolphin|rock,tree,shoe,book,lamp,table;fly|bird,bee,butterfly,plane,owl,helicopter|fish,dog,cow,tree,car,turtle;run|dog,horse,cat,rabbit,tiger,kid|tree,house,chair,table,book,bed'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|')).map((x) => [x[0], x[1].split(','), x[2].split(',')]);
const PERSON = split('swim|ride a bike|play the piano|skate|cook|read in English|speak French|draw|dance|jump rope|sing|count to one hundred');
const cant = (b) => (b ? 'can' : 'can’t');
const g20 = {
  1: [
    (R) => { const f = R.pick(CAN); return blank(`g20a1:${f[0]}:${f[1]}`, `${f[0]} ___ ${f[1]}.`, cant(f[2]), [cant(f[2] ? 0 : 1)], { stimulus: undefined, tip: tb('can = il peut, can’t = il ne peut pas.', 'can = able to, can’t = not able to.') }); },
    (R) => { const f = R.pick(CAN); return mc(`g20b1:${f[0]}:${f[1]}`, tb('Regarde l’image et réponds.', 'Look at the picture and answer.'), f[2] ? 'Yes, it can.' : 'No, it can’t.', [f[2] ? 'No, it can’t.' : 'Yes, it can.'], { stimulus: { emoji: f[3] }, say: say(`Can ${f[0].toLowerCase()} ${f[1]}?`), cols: 2 }); },
    (R) => { const f = R.pick(CAN); const sent = `${f[0]} ${cant(f[2])} ${f[1]}.`; return build(`g20c1:${sent}`, sent); },
    (R) => { const a = R.pick(ABIL); const yes = R.sample(a[1], 3), no = R.sample(a[2], 3); return sortQ(`g20d1:${a[0]}:${[...yes, ...no].sort().join(',')}`, tb(`Qui peut ${a[0]}?`, `Who can ${a[0]}? Sort the words.`), [{ text: `can ${a[0]}`, emoji: '✅' }, { text: `can’t ${a[0]}`, emoji: '❌' }], [yes, no], { speak: true }); },
  ],
  2: [
    (R) => { const f = R.pick(CAN); return blank(`g20a2:${f[0]}:${f[1]}`, `___ ${f[0].toLowerCase()} ${f[1]}?`, 'Can', ['Is', 'Does', 'Do'], { tip: tb('Question : Can + sujet + verbe.', 'Question: Can + subject + verb.') }); },
    (R) => { const f = R.pick(CAN); return mc(`g20b2:${f[0]}:${f[1]}`, tb('Choisis la bonne réponse courte.', 'Choose the right short answer.'), f[2] ? 'Yes, it can.' : 'No, it can’t.', [f[2] ? 'No, it can’t.' : 'Yes, it can.', f[2] ? 'Yes, it does.' : 'No, it doesn’t.', 'Yes, it is.'], { stimulus: { text: `Can ${f[0].toLowerCase()} ${f[1]}?` }, say: say(`Can ${f[0].toLowerCase()} ${f[1]}?`), tip: tb('Réponse courte : Yes, it can. / No, it can’t.', 'Short answer: Yes, it can. / No, it can’t.') }); },
    (R) => { const f = R.pick(CAN.filter((x) => !x[1].includes(' '))); const b = f[1]; return mc(`g20c2:${f[0]}:${b}`, tb('Choisis la bonne forme du verbe.', 'Choose the right verb form.'), b, [s3(b), ing(b), `to ${b}`], { stimulus: { text: `${f[0]} can ___.` }, cols: 2, tip: tb('can + verbe de base (jamais de -s, -ing ou to).', 'can + base verb (never -s, -ing or to).') }); },
    (R) => { const v = R.pick(PERSON), p = R.pick(['She', 'He', 'My sister', 'My dad', 'We', 'They', 'I']); return which(`g20d2:${p}:${v}`, `${p} can ${v}.`, [`${p} can ${s3(v.split(' ')[0])}${v.includes(' ') ? ' ' + v.split(' ').slice(1).join(' ') : ''}.`, `${p} cans ${v}.`, `${p} can to ${v}.`], { tip: tb('Toujours can + verbe de base.', 'Always can + base verb.') }); },
    (R) => { const v = R.pick(PERSON), p = R.pick(['you', 'she', 'he', 'your brother', 'they']); const sent = `Can ${p} ${v}?`; return build(`g20e2:${sent}`, sent); },
    (R) => { const v = R.pick(PERSON), p = R.pick(['I', 'She', 'He', 'We', 'They']); const sent = `${p} can’t ${v}.`; return build(`g20f2:${sent}`, sent); },
  ],
  3: [
    (R) => { const REQ = [['Can I open the window?', 'Yes, of course.', 'No, I do not like windows.|It is Tuesday.'], ['Can you help me, please?', 'Sure, what do you need?', 'Yes, I am five.|It is on the table.'], ['Can I borrow your pencil?', 'Sure, here you go.', 'It is yellow.|I can swim.'], ['Can we play outside?', 'Yes, but put on your coat.', 'No, it is a dog.|I like soup.'], ['Can you pass the salt?', 'Here you are.', 'Yes, I am hungry.|Today is Friday.'], ['Can I go to the bathroom?', 'Yes, you can.', 'It is nine o’clock.|I have a cat.'], ['Can you open the door for me?', 'Sure, no problem.', 'I am eight.|The door is red.'], ['Can I sit here?', 'Of course. Go ahead.', 'Yes, it is a chair.|I am tired.'], ['Can you speak slowly, please?', 'Sure. I will speak more slowly.', 'No, I am eating.|It is a pencil.'], ['Can we have some water, please?', 'Of course. Here you are.', 'I can swim.|It is raining.']];
      const r = R.pick(REQ); return mc(`g20a3:${r[0]}`, P.reply, r[1], r[2].split('|'), { stimulus: { text: r[0] }, say: say(r[0]), cols: 1, tip: tb('Can I / Can you … ? sert à demander quelque chose poliment.', 'Can I / Can you … ? is a polite way to ask for something.') }); },
    (R) => { const v = R.pick(PERSON), p = R.pick(['She', 'He', 'My dad', 'My sister', 'We', 'They', 'I']); return blank(`g20b3:${p}:${v}`, `${p} ___ ${v}.`, 'can’t', ['don’t can', 'not can', p === 'She' || p === 'He' ? 'doesn’t can' : 'isn’t can'], { stimulus: { text: `${p} ___ ${v}. (✖)` }, cols: 2, tip: tb('Négatif : can’t + verbe de base.', 'Negative: can’t + base verb.') }); },
    (R) => { const [a, b] = R.sample(PERSON, 2), p = R.pick(['I', 'She', 'He', 'We', 'They', 'My brother']); const sent = `${p} can ${a} but ${p === 'I' ? 'I' : p.toLowerCase() === p ? p : p} can’t ${b}.`; return build(`g20c3:${p}:${a}:${b}`, `${p} can ${a} but ${p === 'My brother' ? 'he' : p === 'She' ? 'she' : p === 'He' ? 'he' : p === 'We' ? 'we' : p === 'They' ? 'they' : 'I'} can’t ${b}.`, { tip: tb('Deux idées reliées par but (mais).', 'Two ideas joined by but.') }); },
    (R) => { const [a, b] = R.sample(PERSON, 2); const [n1, n2, n3] = R.sample([...FN, ...MN], 3); const q = R.int(0, 1); const who = q ? n2 : n1;
      return mc(`g20d3:${n1}:${n2}:${n3}:${a}:${b}:${q}`, tb('Lis. Qui peut le faire?', 'Read. Who can do it?'), who, rest([n1, n2, n3], who), { stimulus: { text: `${n1} can ${a} but can’t ${b}. ${n2} can ${b} but can’t ${a}. ${n3} can’t ${a} or ${b}. Who can ${q ? b : a}?` }, cols: 3, tip: tb('Cherche le nom qui a « can » pour cette action.', 'Find the name with “can” for that action.') }); },
    (R) => { const a = R.pick(ABIL); const yes = R.sample(a[1], 3), no = R.sample(a[2], 3); return sortQ(`g20e3:${a[0]}:${[...yes, ...no].sort().join(',')}`, tb(`Qui peut ${a[0]}?`, `Who can ${a[0]}?`), [{ text: `can ${a[0]}` }, { text: `can’t ${a[0]}` }], [yes, no]); },
    (R) => { const f = R.pick(CAN); const n = R.pick(['A', 'The']); return which(`g20f3:${f[0]}:${f[1]}`, `${f[0]} ${cant(f[2])} ${f[1]}.`, [`${f[0]} ${f[2] ? 'can’t' : 'can'} ${f[1]}.`, `${f[0]} ${f[2] ? 'cannot not' : 'can not'} ${f[1]}.`.replace('can not', 'doesn’t can'), `${f[0]} ${f[2] ? 'don’t can' : 'cans'} ${f[1]}.`].filter((x) => x !== `${f[0]} ${cant(f[2])} ${f[1]}.`), { prompt: tb('Quelle phrase est vraie ET bien écrite?', 'Which sentence is true AND correctly written?') }); },
  ],
};

/* ================================================================== */
/*  g3e21 — there is / there are                                      */
/* ================================================================== */
const NOUNS = [['apple', 'apples', '🍎'], ['cat', 'cats', '🐱'], ['book', 'books', '📖'], ['star', 'stars', '⭐'], ['bird', 'birds', '🐦'], ['tree', 'trees', '🌳'], ['ball', 'balls', '⚽'], ['car', 'cars', '🚗'], ['flower', 'flowers', '🌸'], ['duck', 'ducks', '🦆'],
  ['cookie', 'cookies', '🍪'], ['balloon', 'balloons', '🎈'], ['house', 'houses', '🏠'], ['hat', 'hats', '🎩'], ['bee', 'bees', '🐝'], ['clock', 'clocks', '🕒'], ['pencil', 'pencils', '✏️'], ['kite', 'kites', '🪁'], ['fish', 'fish', '🐟'], ['snowman', 'snowmen', '⛄'],
  ['dog', 'dogs', '🐶'], ['bus', 'buses', '🚌'], ['pizza', 'pizzas', '🍕'], ['moon', 'moons', '🌙'], ['rabbit', 'rabbits', '🐰']];
const MASS = [['milk', '🥛'], ['water', '💧'], ['juice', '🧃'], ['snow', '❄️'], ['bread', '🍞'], ['cheese', '🧀'], ['rice', '🍚'], ['soup', '🍲'], ['sugar', '🍬'], ['honey', '🍯']];
const PLACES = ['in the picture', 'in the park', 'near the school', 'at the party', 'in the yard', 'in the street'];
const nwA = (n) => (n === 1 ? 'a' : NUMW[n]);
const g21 = {
  1: [
    (R) => { const n = R.pick(NOUNS), c = R.int(1, 6); const sent = c === 1 ? `There ___ a ${n[0]}.` : `There ___ ${NUMW[c]} ${n[1]}.`; return mc(`g21a1:${n[0]}:${c}`, tb('Compte. Choisis is ou are.', 'Count. Choose is or are.'), c === 1 ? 'is' : 'are', [c === 1 ? 'are' : 'is'], { stimulus: { emojis: n[2], count: c }, say: undefined, tip: tb('1 → There is. 2 ou plus → There are.', '1 → There is. 2 or more → There are.') }); },
    (R) => { const n = R.pick(NOUNS), c = R.int(1, 5); const right = c === 1 ? `There is a ${n[0]}.` : `There are ${NUMW[c]} ${n[1]}.`; const wrong = [c === 1 ? `There are a ${n[0]}.` : `There is ${NUMW[c]} ${n[1]}.`, ...R.sample(rest([1, 2, 3, 4, 5], c), 1).map((k) => (k === 1 ? `There is a ${n[0]}.` : `There are ${NUMW[k]} ${n[1]}.`))];
      return mc(`g21b1:${n[0]}:${c}`, tb('Quelle phrase va avec l’image?', 'Which sentence matches the picture?'), right, wrong, { stimulus: { emojis: n[2], count: c }, cols: 1 }); },
    (R) => { const n = R.pick(NOUNS), c = R.int(1, 5); const sent = c === 1 ? `There is a ${n[0]} ${R.pick(PLACES)}.` : `There are ${NUMW[c]} ${n[1]} ${R.pick(PLACES)}.`; return build(`g21c1:${sent}`, sent); },
    (R) => { const a = R.sample(NOUNS, 3), b = R.sample(NOUNS.filter((x) => !a.includes(x)), 3); return sortQ(`g21d1:${[...a, ...b].map((x) => x[0]).sort().join(',')}`, tb('There is ou There are?', 'There is or There are?'), [{ text: 'There is…' }, { text: 'There are…' }], [a.map((x) => `a ${x[0]}`), b.map((x) => `${NUMW[R.int(2, 6)]} ${x[1]}`)]); },
  ],
  2: [
    (R) => { const t = R.int(0, 3); const m = R.pick(MASS), n = R.pick(NOUNS);
      if (t === 0) return blank(`g21a2a:${m[0]}`, `There is ___ ${m[0]} in the glass.`, 'some', ['any', 'many', 'a'], { tip: tb('some dans une phrase affirmative; any dans une négation ou une question.', 'some in positive sentences; any in negatives and questions.') });
      if (t === 1) return blank(`g21a2b:${m[0]}`, `There isn’t ___ ${m[0]} left.`, 'any', ['some', 'a', 'many'], { tip: tb('isn’t / aren’t → any.', 'isn’t / aren’t → any.') });
      if (t === 2) return blank(`g21a2c:${n[0]}`, `Are there ___ ${n[1]} in the box?`, 'any', ['some', 'a', 'one'], { tip: tb('Question → any.', 'Question → any.') });
      return blank(`g21a2d:${n[0]}`, `There are ___ ${n[1]} on the table.`, 'some', ['any', 'a', 'an'], { tip: tb('some + pluriel.', 'some + plural.') }); },
    (R) => { const n = R.pick(NOUNS), c = R.int(1, 5); const sj = c === 1 ? `a ${n[0]}` : `${NUMW[c]} ${n[1]}`; return blank(`g21b2:${n[0]}:${c}`, `___ there ${sj} in the box?`, c === 1 ? 'Is' : 'Are', [c === 1 ? 'Are' : 'Is', 'Do', 'Does'], { tip: tb('Question : Is there + un / Are there + plusieurs.', 'Question: Is there + one / Are there + several.') }); },
    (R) => { const n = R.pick(NOUNS), c = R.int(1, 5), other = R.pick(NOUNS.filter((x) => x[0] !== n[0])); const same = R.chance(0.5); const q = same ? n : other; const plural = R.chance(0.5);
      const ask = plural ? `Are there ${q[1]}?` : `Is there a ${q[0]}?`; const yes = same;
      return mc(`g21c2:${n[0]}:${c}:${q[0]}:${plural}`, tb(`Regarde l’image. ${ask}`, `Look at the picture. ${ask}`), yes ? (plural ? 'Yes, there are.' : 'Yes, there is.') : (plural ? 'No, there aren’t.' : 'No, there isn’t.'), [yes ? (plural ? 'No, there aren’t.' : 'No, there isn’t.') : (plural ? 'Yes, there are.' : 'Yes, there is.'), plural ? 'Yes, they are.' : 'Yes, it is.'], { stimulus: { emojis: n[2], count: Math.max(c, plural ? 2 : 1) }, say: say(ask), cols: 1 }); },
    (R) => { const n = R.pick(NOUNS), c = R.int(2, 6); const w = c === 1 ? `There is a ${n[0]}` : `There are ${NUMW[c]} ${n[1]}`; return which(`g21d2:${n[0]}:${c}`, `There are ${NUMW[c]} ${n[1]}.`, [`There is ${NUMW[c]} ${n[1]}.`, `There are ${NUMW[c]} ${n[0]}.`, `It are ${NUMW[c]} ${n[1]}.`], { tip: tb('There are + nombre + nom au pluriel.', 'There are + number + plural noun.') }); },
    (R) => { const n = R.pick(NOUNS), c = R.int(2, 9); return { type: 'keypad', key: `g21e2:${n[0]}:${c}`, prompt: tb('Compte. Combien y en a-t-il?', 'Count. How many are there?'), stimulus: { emojis: n[2], count: c }, answer: c }; },
  ],
  3: [
    (R) => { const n = R.pick(NOUNS), c = R.int(1, 5), p = R.pick(PLACES); const sent = c === 1 ? `There is a ${n[0]} ${p}.` : `There are ${NUMW[c]} ${n[1]} ${p}.`; return build(`g21a3:${sent}`, sent); },
    (R) => { const n = R.pick(NOUNS), c = R.int(2, 6), p = R.pick(PLACES); return blank(`g21b3:${n[0]}:${c}:${p}`, `___ ${NUMW[c]} ${n[1]} ${p}.`, 'There are', ['There is', 'It is', 'There have'], { cols: 2, tip: tb('« Il y a » se dit There is / There are, jamais It has.', '“Il y a” is There is / There are, never It has.') }); },
    (R) => { const [a, b, c] = R.sample(NOUNS, 3), [x, y, z] = [R.int(1, 4), R.int(2, 5), R.int(1, 4)]; const part = (n, k) => (k === 1 ? `a ${n[0]}` : `${NUMW[k]} ${n[1]}`); const q = R.int(0, 2); const tgt = [a, b, c][q], k = [x, y, z][q];
      return mc(`g21c3:${a[0]}${b[0]}${c[0]}:${x}${y}${z}:${q}`, tb('Lis la description. Combien y en a-t-il?', 'Read the description. How many are there?'), NUMW[k], rest([1, 2, 3, 4, 5], k).slice(0, 3).map((v) => NUMW[v]), { stimulus: { text: `In the room, there is ${part(a, x)}, ${part(b, y)} and ${part(c, z)}. How many ${tgt[1]}?` }, cols: 4, say: say(`In the room, there is ${part(a, x)}, ${part(b, y)} and ${part(c, z)}. How many ${tgt[1]} are there?`) }); },
    (R) => { const [a, b] = R.sample(NOUNS, 2), x = R.int(1, 4), y = R.int(1, 4); const part = (n, k) => (k === 1 ? `one ${n[0]}` : `${NUMW[k]} ${n[1]}`); const s = `${x === 1 && y === 1 ? 'There is' : 'There are'} ${part(a, x)} and ${part(b, y)}.`;
      const alt = [`There are ${part(a, x === 4 ? 3 : x + 1)} and ${part(b, y)}.`, `There are ${part(a, x)} and ${part(b, y === 4 ? 3 : y + 1)}.`, `There are ${part(b, x)} and ${part(a, y)}.`];
      const rightS = `There are ${part(a, x)} and ${part(b, y)}.`; if (x === 1 && y === 1) return g21[3][0](R);
      return mc(`g21d3:${a[0]}${x}${b[0]}${y}`, tb('Quelle phrase est vraie?', 'Which sentence is true?'), rightS, alt.filter((t) => t !== rightS), { stimulus: { text: `${a[2].repeat(x)}  ${b[2].repeat(y)}` }, cols: 1 }); },
    (R) => { const n = R.pick(NOUNS), c = R.int(2, 6); const t = R.int(0, 1); return blank(`g21e3:${n[0]}:${c}:${t}`, t ? `Look at the sky! ___ many stars tonight.` : `___ ${NUMW[c]} ${n[1]} in the picture.`, 'There are', ['There is', 'It is', 'Is there'], { tip: tb('There are + pluriel.', 'There are + plural.') }); },
    (R) => { const m = R.pick(MASS), t = R.int(0, 2); const items = [['isn’t', 'any'], ['is', 'some'], ['isn’t', 'any']]; return blank(`g21f3:${m[0]}:${t}`, t === 0 ? `Is there ___ ${m[0]} in the fridge?` : t === 1 ? `There isn’t ___ ${m[0]} left. The bottle is empty.` : `We have ___ ${m[0]} for dinner. There is a lot.`, t === 2 ? 'some' : 'any', t === 2 ? ['any', 'many', 'a'] : ['some', 'a', 'many'], { tip: tb('some (positif) / any (négatif, question).', 'some (positive) / any (negative, question).') }); },
  ],
};

/* ================================================================== */
/*  g3e22 — Plurals                                                   */
/* ================================================================== */
const PL = split('cat|cats|🐱|s;dog|dogs|🐶|s;book|books|📖|s;apple|apples|🍎|s;star|stars|⭐|s;tree|trees|🌳|s;ball|balls|⚽|s;car|cars|🚗|s;flower|flowers|🌸|s;bird|birds|🐦|s;hat|hats|🎩|s;duck|ducks|🦆|s;cookie|cookies|🍪|s;bus|buses|🚌|es;box|boxes|📦|es;dress|dresses|👗|es;watch|watches|⌚|es;dish|dishes|🍽️|es;brush|brushes|🖌️|es;fox|foxes|🦊|es;glass|glasses|🥛|es;bench|benches|🪑|es;baby|babies|👶|ies;city|cities|🏙️|ies;puppy|puppies|🐕|ies;butterfly|butterflies|🦋|ies;story|stories|📚|ies;berry|berries|🍓|ies;fly|flies|🪰|ies;lady|ladies|👩|ies;leaf|leaves|🍃|ves;knife|knives|🔪|ves;wolf|wolves|🐺|ves;shelf|shelves|📚|ves;loaf|loaves|🍞|ves;child|children|🧒|irr;foot|feet|🦶|irr;mouse|mice|🐭|irr;man|men|👨|irr;woman|women|👩|irr;tooth|teeth|🦷|irr;goose|geese|🪿|irr;person|people|🧑|irr;fish|fish|🐟|irr;sheep|sheep|🐑|irr;deer|deer|🦌|irr'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => { const a = x.split('|'); return { s: a[0], p: a[1], e: a[2], r: a[3] }; });
const regPl = PL.filter((x) => x.r === 's'), irrPl = PL.filter((x) => x.r === 'irr');
const wrongPl = (x) => { const w = x.s, c = [w, w + 's', w + 'es']; if (/y$/.test(w)) c.push(w.slice(0, -1) + 'ies', w + 'ies'); if (/fe?$/.test(w)) c.push(w.replace(/fe?$/, 'ves'), w + 'ves'); c.push(w + 'ss'); return uniq(c).filter((y) => y !== x.p); };
const g22 = {
  1: [
    (R) => { const x = R.pick(PL.filter((y) => !['fish', 'sheep', 'deer'].includes(y.s))); const c = R.int(2, 6); return mc(`g22a1:${x.s}`, tb(`One ${x.s}, many…`, 'One, two… Choose the plural.'), x.p, R.sample(wrongPl(x), 2), { stimulus: { emojis: x.e, count: c }, say: say(`One ${x.s}. Two ${x.p}.`), tip: tb(`${x.s} → ${x.p}`, `${x.s} → ${x.p}`) }); },
    (R) => { const x = R.pick(regPl); return mc(`g22b1:${x.s}`, tb('Choisis le pluriel.', 'Choose the plural.'), x.p, [x.s, x.s + 'es'].filter((y) => y !== x.p), { stimulus: { text: `1 ${x.s} → 2 ___` }, tip: tb('Au pluriel, on ajoute -s.', 'To make a plural, add -s.') }); },
    (R) => { const a = R.sample(PL.filter((x) => x.r === 's'), 3), b = R.sample(PL.filter((x) => x.r === 's' && !a.includes(x)), 3); return sortQ(`g22c1:${[...a, ...b].map((x) => x.s).sort().join(',')}`, tb('Un ou plusieurs?', 'One or many?'), [{ text: 'one', emoji: '1️⃣' }, { text: 'many', emoji: '🔢' }], [a.map((x) => x.s), b.map((x) => x.p)], { speak: true }); },
    (R) => { const x = R.pick(regPl.filter((y) => y.s.length < 7)); const n = R.int(2, 9); const sent = `I see ${NUMW[Math.min(n, 10)]} ${x.p}.`; return build(`g22d1:${sent}`, sent, { stimulus: { emojis: x.e, count: n } }); },
  ],
  2: [
    (R) => { const x = R.pick(PL.filter((y) => y.r !== 'irr')); return blank(`g22a2:${x.s}`, `There are three ___ in the box. (${x.s})`, x.p, R.sample(wrongPl(x), 3), { cols: 2, tip: tb('-s, -es (s, x, ch, sh), y → ies, f → ves.', '-s, -es (s, x, ch, sh), y → ies, f → ves.') }); },
    (R) => { const g = ['s', 'es', 'ies']; const pick = g.map((r) => R.sample(PL.filter((x) => x.r === r), 2)); return sortQ(`g22b2:${pick.flat().map((x) => x.s).sort().join(',')}`, tb('Comment forme-t-on le pluriel?', 'How do we make the plural?'), [{ text: '+ s' }, { text: '+ es' }, { text: 'y → ies' }], pick.map((p) => p.map((x) => x.s)), { tip: tb('Regarde la fin du mot : s, x, ch, sh → -es; consonne + y → -ies.', 'Look at the ending: s, x, ch, sh → -es; consonant + y → -ies.') }); },
    (R) => { const x = R.pick(PL.filter((y) => !['fish', 'sheep', 'deer'].includes(y.s))); return which(`g22c2:${x.s}`, `I have two ${x.p}.`, R.sample(wrongPl(x), 3).map((w) => `I have two ${w}.`), { tip: tb(`${x.s} → ${x.p}`, `${x.s} → ${x.p}`) }); },
    (R) => { const x = R.pick(PL.filter((y) => y.p !== y.s)); return mc(`g22d2:${x.p}`, tb('Quel est le mot au singulier?', 'What is the singular form?'), x.s, uniq([x.p.replace(/ies$/, 'y'), x.p.replace(/s$/, ''), x.p.replace(/ves$/, 'f'), x.p + 's', x.p.replace(/es$/, ''), x.p.replace(/ves$/, 'fe')]).filter((y) => y !== x.s && y !== x.p).slice(0, 3), { stimulus: { text: x.p }, say: say(x.p), cols: 2 }); },
    (R) => { const x = R.pick(irrPl.filter((y) => y.p !== y.s && y.p.length > 3)); const extra = R.sample('abcdefghijklmnopqrstuvwxyz'.split('').filter((c) => !x.p.includes(c)), 2); return { type: 'order', key: `g22e2:${x.p}`, prompt: tb('Écris le pluriel. Remets les lettres dans l’ordre.', 'Spell the plural. Put the letters in order.'), say: say(x.p), stimulus: { emojis: x.e, count: 3 }, tiles: x.p.split(''), extra, joiner: '' }; },
  ],
  3: [
    (R) => { const x = R.pick(PL), sg = R.chance(0.5); const fish = ['fish', 'sheep', 'deer'].includes(x.s); const noun = sg ? x.s : x.p; const be = sg ? 'is' : 'are'; if (fish) return g22[3][0](R);
      return blank(`g22a3:${noun}`, `The ${noun} ___ in the garden.`, be, [sg ? 'are' : 'is', 'am', 'be'], { tip: tb('Un seul → is; plusieurs → are. children, mice, feet = pluriel!', 'One → is; more than one → are. children, mice, feet = plural!') }); },
    (R) => { const x = R.pick(PL.filter((y) => y.s !== y.p)), far = R.chance(0.5), sg = R.chance(0.5); const noun = sg ? x.s : x.p; const right = sg ? (far ? 'That' : 'This') : (far ? 'Those' : 'These'); const w = rest(['This', 'That', 'These', 'Those'], right);
      return blank(`g22b3:${noun}:${far}`, `Look at ___ ${noun} ${far ? 'over there' : 'here'}!`, right, w, { cols: 2, tip: tb('this / these = proche; that / those = loin. this / that = un; these / those = plusieurs.', 'this / these = near; that / those = far. this / that = one; these / those = many.') }); },
    (R) => { const x = R.pick(PL.filter((y) => y.s !== y.p)); const T = [`Two ${x.p} are in the garden.`, `I can see five ${x.p}.`, `The ${x.p} are very big.`, `We have many ${x.p} at school.`, `Look at those ${x.p}!`, `My friend has three ${x.p}.`]; const sent = R.pick(T); return build(`g22c3:${sent}`, sent); },
    (R) => { const x = R.pick(PL.filter((y) => y.s !== y.p)), w = R.pick(['many', 'five', 'two', 'three', 'some']); return which(`g22d3:${x.s}:${w}`, `There are ${w} ${x.p}.`, [`There are ${w} ${x.s}.`, `There is ${w} ${x.p}.`, `There are ${w} ${x.p}es.`.replace(`${x.p}es`, wrongPl(x)[0])], { tip: tb('Après many, two, three… le nom est au pluriel.', 'After many, two, three… the noun is plural.') }); },
    (R) => { const irr = R.pick(irrPl.filter((y) => y.s !== y.p)); const regs = R.sample(regPl, 3); return mc(`g22e3:${irr.p}:${regs.map((x) => x.p).sort().join(',')}`, tb('Quel pluriel est irrégulier (pas de -s)?', 'Which plural is irregular (not +s)?'), irr.p, regs.map((x) => x.p), { cols: 2, tip: tb('Mots irréguliers : child → children, foot → feet, mouse → mice…', 'Irregular words: child → children, foot → feet, mouse → mice…') }); },
    (R) => { const x = R.pick(PL.filter((y) => y.s !== y.p && y.r !== 's')); const sg = R.chance(0.5); return which(`g22f3:${x.s}:${sg}`, sg ? `My ${x.s} is big.` : `My ${x.p} are big.`, sg ? [`My ${x.s} are big.`, `My ${x.p} is big.`, `My ${wrongPl(x)[0]} are big.`] : [`My ${x.p} is big.`, `My ${x.s} are big.`, `My ${wrongPl(x)[0]} are big.`], { tip: tb('Accorde le nom ET le verbe.', 'Match the noun AND the verb.') }); },
  ],
};

/* ================================================================== */
/*  g3e23 — Possessives                                               */
/* ================================================================== */
const OBJ = ['backpack', 'dog', 'hat', 'book', 'bike', 'ball', 'lunch', 'coat', 'pencil', 'house', 'toy', 'bag', 'kite', 'drawing', 'bed'];
const OWN = [['Mia', 'her'], ['Zoe', 'her'], ['Ava', 'her'], ['Ella', 'her'], ['Lily', 'her'], ['Leo', 'his'], ['Sam', 'his'], ['Max', 'his'], ['Noah', 'his'], ['Ben', 'his'], ['Mia and Leo', 'their'], ['The children', 'their'], ['My sister', 'her'], ['My dad', 'his'], ['Grandma', 'her'], ['Grandpa', 'his']];
const g23 = {
  1: [
    (R) => { const o = R.pick(OWN), n = R.pick(OBJ); return blank(`g23a1:${o[0]}:${n}`, `${o[0]} has a ${n}. It is ___ ${n}.`, o[1], rest(['her', 'his', 'their', 'my'], o[1]).slice(0, 3), { tip: tb('his = à lui, her = à elle, their = à eux.', 'his = a boy’s, her = a girl’s, their = more than one person’s.') }); },
    (R) => { const p = R.pick([['I', 'my'], ['You', 'your'], ['We', 'our'], ['They', 'their']]), n = R.pick(OBJ); return blank(`g23b1:${p[0]}:${n}`, `${p[0]} ${p[0] === 'I' ? 'have' : 'have'} a ${n}. It is ___ ${n}.`, p[1], rest(['my', 'your', 'our', 'their'], p[1]).slice(0, 3), { tip: tb('I → my, you → your, we → our, they → their.', 'I → my, you → your, we → our, they → their.') }); },
    (R) => { const n = R.pick(OBJ); const t = R.pick([['It belongs to me.', 'my'], ['It belongs to you.', 'your'], ['It belongs to us.', 'our'], ['It belongs to Leo.', 'his'], ['It belongs to Zoe.', 'her']]); return blank(`g23c1:${n}:${t[1]}`, `This is ___ ${n}. ${t[0]}`, t[1], rest(['my', 'your', 'our', 'his', 'her'], t[1]).slice(0, 3), { cols: 2 }); },
    (R) => { const w = R.pick(['my', 'your', 'his', 'her', 'our', 'their']), n = R.pick(OBJ), d = R.pick(['This is', 'That is', 'Here is']); const sent = `${d} ${w} ${n}.`; return build(`g23d1:${sent}`, sent); },
  ],
  2: [
    (R) => { const nm = R.pick([...FN, ...MN]), n = R.pick(OBJ); return mc(`g23a2:${nm}:${n}`, tb('Comment dit-on « le ___ de … »?', 'How do we say “the ___ of …”?'), `${nm}’s ${n}`, [`${nm}s ${n}`, `${nm} ${n}’s`, `${nm} ${n}`], { stimulus: { text: `the ${n} of ${nm}` }, cols: 2, tip: tb('Nom + ’s = possession (Tom’s dog).', 'Name + ’s shows who owns it (Tom’s dog).') }); },
    (R) => { const nm = R.pick([...FN, ...MN]), n = R.pick(OBJ); return mc(`g23b2:${nm}:${n}`, tb('Choisis la bonne réponse.', 'Choose the right answer.'), `It is ${nm}’s.`, [`It is ${nm}s.`, `It is ${nm}.`, `It is ${nm}’.`], { stimulus: { text: `Whose ${n} is it?` }, say: say(`Whose ${n} is it?`), cols: 2, tip: tb('Whose = à qui? On répond avec ’s.', 'Whose = who owns it? Answer with ’s.') }); },
    (R) => { const t = R.pick([['She', 'her', 'she'], ['He', 'his', 'he'], ['We', 'our', 'we'], ['They', 'their', 'they'], ['I', 'my', 'I'], ['You', 'your', 'you']]), n = R.pick(OBJ); return blank(`g23c2:${t[0]}:${n}`, `${t[0]} ${['She', 'He'].includes(t[0]) ? 'loves' : 'love'} ___ ${n}.`, t[1], rest(['her', 'his', 'our', 'their', 'my', 'your'], t[1]).filter((x) => x !== t[2]).slice(0, 2).concat([t[2]]), { tip: tb('Après le verbe, devant un nom : my, your, his, her, our, their.', 'Before a noun: my, your, his, her, our, their.') }); },
    (R) => { const o = R.pick(OWN), n = R.pick(OBJ); const vb = o[1] === 'their' ? 'love' : 'loves'; return which(`g23d2:${o[0]}:${n}`, `${o[0]} ${vb} ${o[1]} ${n}.`, [`${o[0]} ${vb} ${rest(['her', 'his', 'their'], o[1])[0]} ${n}.`, `${o[0]} ${vb} ${o[1] === 'their' ? 'they' : o[1] === 'her' ? 'she' : 'he'} ${n}.`, `${o[0]} ${vb} its ${n}.`]); },
    (R) => { const nm = R.pick([...FN, ...MN]), n = R.pick(OBJ); const sent = `${nm}’s ${n} is ${R.pick(['red', 'big', 'new', 'old', 'small'])}.`; return build(`g23e2:${sent}`, sent); },
  ],
  3: [
    (R) => { const p = R.pick([['me', 'mine'], ['you', 'yours'], ['her', 'hers'], ['him', 'his'], ['us', 'ours'], ['them', 'theirs']]), n = R.pick(OBJ); return blank(`g23a3:${p[0]}:${n}`, `The ${n} belongs to ${p[0]}. It is ___.`, p[1], rest(['mine', 'yours', 'hers', 'ours', 'theirs'], p[1]).slice(0, 3).concat(p[1] === 'his' ? [] : []), { cols: 2, tip: tb('mine / yours / hers / ours / theirs : sans nom après.', 'mine / yours / hers / ours / theirs: no noun after them.') }); },
    (R) => { const t = R.pick([['girls', 'girls’', 'girl’s'], ['boys', 'boys’', 'boy’s'], ['teachers', 'teachers’', 'teacher’s'], ['students', 'students’', 'student’s'], ['children', 'children’s', 'childrens’'], ['mice', 'mice’s', 'mices’'], ['dogs', 'dogs’', 'dog’s']]); const n = R.pick(OBJ);
      return mc(`g23b3:${t[0]}:${n}`, tb('Où va l’apostrophe?', 'Where does the apostrophe go?'), `the ${t[1]} ${n}s`, [`the ${t[2]} ${n}s`, `the ${t[0]}’s ${n}s`.replace(`the ${t[0]}’s`, `the ${t[0]}s’`), `the ${t[0]} ${n}s`].filter((x) => x !== `the ${t[1]} ${n}s`), { stimulus: { text: `the ${n}s of the ${t[0]}` }, cols: 2, tip: tb('Pluriel en -s : s’. Pluriel irrégulier : children’s.', 'Plural ending in -s: s’. Irregular plural: children’s.') }); },
    (R) => { const a = R.pick(['dog', 'cat', 'bird', 'rabbit']), t = R.int(0, 1); return t ? blank(`g23c3b:${a}`, `___ raining outside. Take your umbrella.`, 'It’s', ['Its', 'Their', 'Is'], { tip: tb('It’s = it is. Its = à lui (animal).', 'It’s = it is. Its = belonging to it.') }) : blank(`g23c3a:${a}`, `The ${a} is wagging ___ tail.`.replace('wagging', R.pick(['shaking', 'moving', 'wagging'])), 'its', ['it’s', 'their', 'his'], { tip: tb('its = à lui / à elle (animal); it’s = it is.', 'its = belonging to it; it’s = it is.') }); },
    (R) => { const nm = R.pick([...FN, ...MN]), n1 = R.pick(OBJ), a = R.pick(['bigger', 'newer', 'older', 'nicer']); const sent = `${nm}’s ${n1} is ${a} than my ${R.pick(OBJ.filter((x) => x !== n1))}.`; return build(`g23d3:${sent}`, sent, { tip: tb('’s après le nom du propriétaire.', '’s goes right after the owner’s name.') }); },
    (R) => { const nm = R.pick([...FN, ...MN]), n = R.pick(OBJ); return which(`g23e3:${nm}:${n}`, `My brother’s ${n} is blue.`.replace('brother’s', R.pick(['brother’s', 'sister’s', 'friend’s'])), []).options ? null : null; },
    (R) => { const nm = R.pick([...FN, ...MN]), n = R.pick(OBJ), rel = R.pick(['brother', 'sister', 'friend', 'cousin']); return which(`g23f3:${rel}:${n}`, `My ${rel}’s ${n} is blue.`, [`My ${rel}s ${n} is blue.`, `My ${rel} ${n}’s is blue.`, `My ${rel}’s ${n}’s is blue.`], { tip: tb('Un seul propriétaire : ’s après le nom.', 'One owner: ’s after the noun.') }); },
  ],
};
g23[3] = g23[3].filter((_, i) => i !== 4);

/* ================================================================== */
/*  g3e24 — Prepositions (place & time) with small SVG scenes         */
/* ================================================================== */
const PREPS = ['in', 'on', 'under', 'next to', 'behind', 'in front of', 'between', 'above'];
const OBJS = [['cat', '🐱'], ['dog', '🐶'], ['ball', '⚽'], ['frog', '🐸'], ['apple', '🍎'], ['duck', '🐥'], ['bear', '🧸'], ['mouse', '🐭']];
const prepSvg = (prep, em) => {
  const box = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#d9a86c" stroke="#8a5a2b" stroke-width="3"/>`;
  const o = (cx, cy) => `<text x="${cx}" y="${cy}" font-size="34" text-anchor="middle">${em}</text>`;
  const ground = '<line x1="10" y1="110" x2="190" y2="110" stroke="#7a8a99" stroke-width="3"/>';
  let b = '';
  switch (prep) {
    case 'in': b = `<rect x="65" y="55" width="70" height="55" rx="4" fill="#fff6e8" stroke="#8a5a2b" stroke-width="4"/>${o(100, 100)}<line x1="65" y1="55" x2="135" y2="55" stroke="none"/>`; break;
    case 'on': b = box(65, 70, 70, 40) + o(100, 66); break;
    case 'under': b = box(60, 28, 80, 26) + o(100, 106); break;
    case 'next to': b = box(40, 70, 60, 40) + o(135, 106); break;
    case 'behind': b = o(108, 92) + box(60, 70, 70, 40); break;
    case 'in front of': b = box(60, 55, 80, 55) + o(100, 106); break;
    case 'between': b = box(20, 70, 45, 40) + box(135, 70, 45, 40) + o(100, 106); break;
    default: b = box(65, 80, 70, 30) + o(100, 36);
  }
  return `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">${ground}${b}</svg>`;
};
const TIMES = split('July|in;Monday|on;7:30|at;the morning|in;night|at;winter|in;Christmas Day|on;noon|at;2026|in;my birthday|on;the evening|in;Friday morning|on;half past two|at;spring|in;June 5th|on;bedtime|at;lunchtime|at;the afternoon|in;October|in;Sunday|on;the weekend|on;summer|in;Tuesday|on;six o’clock|at'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const FRAMES = ['I have swimming ', 'The party is ', 'We have a test ', 'I wake up ', 'My cousin visits us '];
const sceneSent = (o, p) => `The ${o[0]} is ${p === 'between' ? 'between the two boxes' : p + ' the box'}.`;
const g24 = {
  1: [
    (R) => { const o = R.pick(OBJS), p = R.pick(PREPS.slice(0, 7)); return mc(`g24a1:${o[0]}:${p}`, tb('Où est l’objet? Choisis le mot.', 'Where is it? Choose the word.'), p, R.sample(rest(PREPS.slice(0, 7), p), 2), { stimulus: { svg: prepSvg(p, o[1]) }, say: say(sceneSent(o, p)), cols: 3, tip: tb(`${p} = ${({ in: 'dans', on: 'sur', under: 'sous', 'next to': 'à côté de', behind: 'derrière', 'in front of': 'devant', between: 'entre', above: 'au-dessus de' })[p]}`, `${p}`) }); },
    (R) => { const o = R.pick(OBJS), p = R.pick(PREPS.slice(0, 7)); return mc(`g24b1:${o[0]}:${p}`, tb('Quelle phrase va avec l’image?', 'Which sentence matches the picture?'), sceneSent(o, p), R.sample(rest(PREPS.slice(0, 7), p), 2).map((q) => sceneSent(o, q)), { stimulus: { svg: prepSvg(p, o[1]) }, cols: 1 }); },
    (R) => { const o = R.pick(OBJS), p = R.pick(PREPS.slice(0, 7)); const ps = R.sample(rest(PREPS.slice(0, 7), p), 2); const q = mc(`g24c1:${o[0]}:${p}`, P.listenPic, '', [], {}); return { type: 'choice', key: q.key, prompt: P.listenPic, say: say(sceneSent(o, p)), options: [p, ...ps].map((x) => ({ svg: prepSvg(x, o[1]) })), answer: 0, cols: 3 }; },
    (R) => { const o = R.pick(OBJS), p = R.pick(PREPS.slice(0, 7)); const sent = sceneSent(o, p); return build(`g24d1:${o[0]}:${p}`, sent, { stimulus: { svg: prepSvg(p, o[1]) } }); },
  ],
  2: [
    (R) => { const o = R.pick(OBJS), p = R.pick(PREPS); return blank(`g24a2:${o[0]}:${p}`, `The ${o[0]} is ___ ${p === 'between' ? 'the two boxes' : 'the box'}.`, p, R.sample(rest(PREPS, p), 3), { stimulus: undefined, cols: 2 }).stimulus ? null : { ...blank(`g24a2:${o[0]}:${p}`, `The ${o[0]} is ___ ${p === 'between' ? 'the two boxes' : 'the box'}.`, p, R.sample(rest(PREPS, p), 3), { cols: 2 }), stimulus: { svg: prepSvg(p, o[1]) } }; },
    (R) => { const t = R.pick(TIMES), f = R.pick(FRAMES); return blank(`g24b2:${t[0]}:${f}`, `${f}___ ${t[0]}.`, t[1], rest(['in', 'on', 'at'], t[1]), { cols: 3, tip: tb('at = heure précise; on = jour; in = mois, saison, partie de la journée.', 'at = exact time; on = day; in = month, season, part of the day.') }); },
    (R) => { const a = R.sample(TIMES.filter((x) => x[1] === 'in'), 2), b = R.sample(TIMES.filter((x) => x[1] === 'on'), 2), c = R.sample(TIMES.filter((x) => x[1] === 'at'), 2); return sortQ(`g24c2:${[...a, ...b, ...c].map((x) => x[0]).sort().join(',')}`, tb('in, on ou at?', 'in, on or at?'), [{ text: 'in' }, { text: 'on' }, { text: 'at' }], [a, b, c].map((g) => g.map((x) => x[0])), { tip: tb('in July, on Monday, at 7:30', 'in July, on Monday, at 7:30') }); },
    (R) => { const o = R.pick(OBJS), p = R.pick(PREPS); return mc(`g24d2:${o[0]}:${p}`, tb('Où est l’objet? Choisis la phrase.', 'Where is it? Choose the sentence.'), sceneSent(o, p), R.sample(rest(PREPS, p), 3).map((q) => sceneSent(o, q)), { stimulus: { svg: prepSvg(p, o[1]) }, cols: 1 }); },
  ],
  3: [
    (R) => { const o = R.pick(['key', 'cat', 'ball', 'book', 'phone', 'hat']), c = R.pick(['box', 'basket', 'bag']), pl = R.pick(['table', 'chair', 'shelf', 'bed']), p1 = R.pick(['in', 'under']), p2 = R.pick(['on', 'next to']); const q = R.int(0, 1);
      return mc(`g24a3:${o}:${c}:${pl}:${p1}:${p2}:${q}`, tb('Lis. Où est l’objet?', 'Read. Where is it?'), q ? `${p2} the ${pl}` : `${p1} the ${c}`, q ? [`${p1} the ${pl}`, `${p1} the ${c}`, `behind the ${pl}`] : [`${p2} the ${c}`, `${p1} the ${pl}`, `behind the ${c}`], { stimulus: { text: `The ${o} is ${p1} the ${c}. The ${c} is ${p2} the ${pl}. Where is the ${q ? c : o}?` }, cols: 1, say: say(`The ${o} is ${p1} the ${c}. The ${c} is ${p2} the ${pl}. Where is the ${q ? c : o}?`) }); },
    (R) => { const t = R.pick(TIMES), f = R.pick(FRAMES); return blank(`g24b3:${t[0]}:${f}`, `${f}___ ${t[0]}.`, t[1], rest(['in', 'on', 'at', 'to'], t[1]), { cols: 2, tip: tb('in / on / at : on choisit selon le type de moment.', 'in / on / at: choose by the kind of time.') }); },
    (R) => { const o = R.pick(OBJS), o2 = R.pick(OBJS.filter((x) => x[0] !== o[0])); const p = R.pick(['between', 'next to', 'behind', 'in front of']); const sent = p === 'between' ? `The ${o[0]} is between the box and the chair.` : `The ${o[0]} is ${p} the ${R.pick(['box', 'chair', 'table'])}.`; return build(`g24c3:${sent}`, sent); },
    (R) => { const o = R.pick(OBJS), o2 = R.pick(OBJS.filter((x) => x[0] !== o[0])), p = R.pick(PREPS), p2 = R.pick(rest(PREPS, p)); const r = sceneSent(o, p); return mc(`g24d3:${o[0]}:${o2[0]}:${p}`, tb('Regarde bien l’image. Quelle phrase est vraie?', 'Look carefully. Which sentence is true?'), r, [sceneSent(o, p2), sceneSent(o2, p), sceneSent(o2, p2)], { stimulus: { svg: prepSvg(p, o[1]) }, cols: 1 }); },
    (R) => { const t = R.pick(TIMES.filter((x) => x[1] !== 'on')), u = R.pick(TIMES.filter((x) => x[1] === 'on')); const items = R.sample([`in ${t[0]}`, `at ${R.pick(TIMES.filter((x) => x[1] === 'at'))[0]}`, `on ${u[0]}`, `in ${R.pick(TIMES.filter((x) => x[1] === 'in'))[0]}`], 4); return null; },
  ],
};
g24[2][0] = (R) => { const o = R.pick(OBJS), p = R.pick(PREPS); const q = blank(`g24a2:${o[0]}:${p}`, `The ${o[0]} is ___ ${p === 'between' ? 'the two boxes' : 'the box'}.`, p, R.sample(rest(PREPS, p), 3), { cols: 2 }); q.stimulus = { svg: prepSvg(p, o[1]) }; return q; };
g24[3].pop();

/* ================================================================== */
/*  g3e25 — Question words                                            */
/* ================================================================== */
const QA = split(['Who is your teacher?|Mrs. Roy.', 'Who lives in the red house?|My grandmother.', 'Who can help me?|Sam can.', 'Who is at the door?|The mail carrier.', 'Who made this cake?|My dad.', 'Who is your best friend?|Leo.', 'Who plays the piano?|My sister.', 'Who is that girl?|She is my cousin.',
  'What is your name?|My name is Zoe.', 'What do you eat for breakfast?|Cereal and milk.', 'What is in the box?|A new toy.', 'What colour is the sky?|Blue.', 'What is your favourite sport?|Hockey.', 'What are you reading?|A book about dogs.', 'What day is it today?|Friday.', 'What time is it?|Half past two.',
  'Where do you live?|In Laval.', 'Where is my backpack?|On the chair.', 'Where are you going?|To the park.', 'Where does your dad work?|At the hospital.', 'Where is the library?|Next to the school.', 'Where did you put the keys?|On the table.', 'Where is Mia?|In the kitchen.', 'Where are the boots?|Under the bed.',
  'When is your birthday?|In July.', 'When does the movie start?|At seven o’clock.', 'When do you go to bed?|At eight thirty.', 'When is the party?|On Saturday.', 'When do we have gym?|On Tuesday morning.', 'When did you arrive?|Yesterday.', 'When is lunch?|At noon.', 'When does school finish?|At three thirty.',
  'Why are you late?|Because I missed the bus.', 'Why is he crying?|Because he is sad.', 'Why do you wear a coat?|Because it is cold.', 'Why are you happy?|Because it is my birthday.', 'Why do birds fly south?|Because winter is cold.', 'Why is she tired?|Because she did not sleep.', 'Why do we brush our teeth?|Because it keeps them healthy.', 'Why are you laughing?|Because the joke is funny.',
  'How are you?|I am fine, thank you.', 'How do you go to school?|By bus.', 'How is the soup?|It is delicious.', 'How is the weather?|It is sunny.', 'How do you spell cat?|C-A-T.', 'How do you feel today?|I feel great.'].join(';').replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const QA2 = split(['How many cats do you have?|Two cats.', 'How many days are in a week?|Seven.', 'How many students are in your class?|Twenty-two.', 'How many books are on the shelf?|Five.', 'How old are you?|I am eight.', 'How old is your brother?|He is five.', 'How old is the school?|Fifty years old.', 'How much is the apple?|One dollar.', 'How much milk do you want?|A little.', 'Which one is your coat?|The red one.', 'Which bus goes to the mall?|Number twelve.', 'Which season do you like best?|Winter.'].join(';').replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const QA3 = split(['How long is the movie?|Two hours.', 'How often do you swim?|Every Saturday.', 'How far is the school?|Two kilometres.', 'What kind of pet do you have?|A hamster.', 'What time do you wake up?|At seven.', 'Whose book is this?|It is Max’s.', 'How tall is your dad?|Very tall.', 'Where does she come from?|From Montréal.', 'How long is the ruler?|Thirty centimetres.', 'How often do you read?|Every night.', 'What kind of music do you like?|Rock music.', 'How far is the park?|It is very near.'].join(';').replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const qwOf = (q) => (q.match(/^(How (many|old|much|long|often|far|tall)|What (time|kind|colour)|Whose|Which|Who|What|Where|When|Why|How)\b/) || [''])[0];
const qBlank = (q) => `___${q.slice(qwOf(q).length)}`;
const qbuild = (k, sn, o = {}) => build(k, sn, { prompt: tb('Remets les mots dans l’ordre pour faire une question.', 'Put the words in order to make a question.'), ...o });
const QW_SIMPLE = ['Who', 'What', 'Where', 'When', 'Why', 'How'];
const QW_ALL = ['Who', 'What', 'Where', 'When', 'Why', 'How', 'How many', 'How old', 'How much', 'Which', 'How long', 'How often', 'How far', 'How tall', 'Whose', 'What time', 'What kind'];
const g25 = {
  1: [
    (R) => { const e = R.pick(QA); const w = qwOf(e[0]); return mc(`g25a1:${e[0]}`, tb('Complète la question avec le bon mot.', 'Complete the question with the right word.'), w, R.sample(rest(QW_SIMPLE, w), 2), { stimulus: { text: `${qBlank(e[0])}\n→ ${e[1]}` }, say: say(e[0]), cols: 3, tip: tb('Who = qui, What = quoi, Where = où, When = quand, Why = pourquoi, How = comment.', 'Who = person, What = thing, Where = place, When = time, Why = reason, How = way.') }); },
    (R) => { const e = R.pick(QA); const w = qwOf(e[0]); return mc(`g25b1:${e[0]}`, tb('Écoute la question. Choisis le mot de départ.', 'Listen to the question. Choose the first word.'), w, R.sample(rest(QW_SIMPLE, w), 2), { say: say(e[0]), stimulus: { emoji: '🎧' }, cols: 3 }); },
    (R) => { const e = R.pick(QA); const sent = e[0]; return qbuild(`g25c1:${sent}`, sent, { say: say(sent), tip: tb('La question commence par le mot interrogatif.', 'The question starts with the question word.') }); },
    (R) => { const e = R.pick(QA); const bad = R.sample(QA.filter((x) => qwOf(x[0]) !== qwOf(e[0])), 2).map((x) => x[1]); return mc(`g25d1:${e[0]}`, tb('Quelle est la bonne réponse?', 'What is the best answer?'), e[1], bad, { stimulus: { text: e[0] }, say: say(e[0]), cols: 1 }); },
  ],
  2: [
    (R) => { const e = R.pick([...QA, ...QA2]); const w = qwOf(e[0]); return mc(`g25a2:${e[0]}`, tb('Choisis le bon mot interrogatif.', 'Choose the right question word.'), w, R.sample(rest(['Who', 'What', 'Where', 'When', 'Why', 'How', 'How many', 'How old', 'How much', 'Which'], w), 3), { stimulus: { text: `${qBlank(e[0])}\n→ ${e[1]}` }, cols: 2, tip: tb('How many = combien (compter), How old = quel âge, How much = combien (prix).', 'How many = a number of things, How old = age, How much = price or amount.') }); },
    (R) => { const all = [...QA, ...QA2]; const e = R.pick(all); const bad = R.sample(all.filter((x) => qwOf(x[0]) !== qwOf(e[0])), 2).map((x) => x[1]); return mc(`g25b2:${e[0]}`, tb('Quelle est la bonne réponse?', 'What is the best answer?'), e[1], bad, { stimulus: { text: e[0] }, say: say(e[0]), cols: 1 }); },
    (R) => { const g = ['Who', 'Where', 'When']; const pick = g.map((w) => R.sample(QA.filter((x) => qwOf(x[0]) === w && !/^(Yesterday|At noon)/.test(x[1])), 2)); return sortQ(`g25c2:${pick.flat().map((x) => x[1]).sort().join('|')}`, tb('Qui? Où? Quand? Classe les réponses.', 'Who? Where? When? Sort the answers.'), g.map((w) => ({ text: w + '?' })), pick.map((p) => p.map((x) => x[1])), { tip: tb('Who → une personne, Where → un lieu, When → un moment.', 'Who → a person, Where → a place, When → a time.') }); },
    (R) => { const e = R.pick([...QA, ...QA2]); return qbuild(`g25d2:${e[0]}`, e[0], { say: say(e[0]) }); },
  ],
  3: [
    (R) => { const all = [...QA, ...QA2, ...QA3]; const e = R.pick(all); const w = qwOf(e[0]); const fam = w.startsWith('How') ? ['How many', 'How much', 'How long', 'How often', 'How far', 'How old', 'How tall'] : QW_ALL; return mc(`g25a3:${e[0]}`, tb('Choisis le bon mot interrogatif.', 'Choose the right question word.'), w, R.sample(rest(fam, w), 3), { stimulus: { text: `${qBlank(e[0])}\n→ ${e[1]}` }, cols: 2, tip: tb('Regarde la réponse : durée (long), fréquence (often), distance (far), taille (tall).', 'Look at the answer: time (long), frequency (often), distance (far), height (tall).') }); },
    (R) => { const all = [...QA, ...QA2, ...QA3]; const e = R.pick(all); const bad = R.sample(all.filter((x) => qwOf(x[0]) !== qwOf(e[0])), 2).map((x) => x[0]); return mc(`g25b3:${e[1]}:${e[0]}`, tb('Quelle question va avec cette réponse?', 'Which question goes with this answer?'), e[0], bad, { stimulus: { text: e[1] }, cols: 1 }); },
    (R) => { const all = [...QA, ...QA2, ...QA3]; const e = R.pick(all); return qbuild(`g25c3:${e[0]}`, e[0], { stimulus: { text: `→ ${e[1]}` }, tip: tb('Mot interrogatif + verbe auxiliaire + sujet.', 'Question word + auxiliary verb + subject.') }); },
    (R) => { const e = R.pick([...QA3, ...QA2]); const w = qwOf(e[0]); const wrongQ = R.sample(QW_ALL.filter((x) => x !== w && x.startsWith(w.split(' ')[0])), 2); const alt = R.sample(rest(QW_ALL, w), 3 - wrongQ.length); return mc(`g25d3:${e[0]}`, tb('Quelle est la bonne question?', 'Which is the correct question?'), e[0], [...wrongQ, ...alt].slice(0, 3).map((x) => x + e[0].slice(w.length)), { stimulus: { text: `→ ${e[1]}` }, cols: 1 }); },
  ],
};

/* ================================================================== */
/*  g3e26 — Adjectives & comparatives                                 */
/* ================================================================== */
const ADJ = split('big|bigger|biggest|short;small|smaller|smallest|short;tall|taller|tallest|short;short|shorter|shortest|short;fast|faster|fastest|short;slow|slower|slowest|short;old|older|oldest|short;young|younger|youngest|short;long|longer|longest|short;strong|stronger|strongest|short;cold|colder|coldest|short;hot|hotter|hottest|short;happy|happier|happiest|short;easy|easier|easiest|short;heavy|heavier|heaviest|short;funny|funnier|funniest|short;nice|nicer|nicest|short;large|larger|largest|short;wet|wetter|wettest|short;thin|thinner|thinnest|short;beautiful|more beautiful|most beautiful|long;interesting|more interesting|most interesting|long;difficult|more difficult|most difficult|long;expensive|more expensive|most expensive|long;dangerous|more dangerous|most dangerous|long;delicious|more delicious|most delicious|long;careful|more careful|most careful|long;good|better|best|irr;bad|worse|worst|irr'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => { const a = x.split('|'); return { a: a[0], c: a[1], s: a[2], k: a[3] }; });
const A = Object.fromEntries(ADJ.map((x) => [x.a, x]));
const FACTS = [['An elephant', 'a mouse', 'big'], ['A giraffe', 'a dog', 'tall'], ['A cheetah', 'a turtle', 'fast'], ['A snail', 'a rabbit', 'slow'], ['A whale', 'a fish', 'big'], ['A grandfather', 'a baby', 'old'], ['A lion', 'a cat', 'strong'], ['Winter', 'summer', 'cold'],
  ['Fire', 'ice', 'hot'], ['A feather', 'a rock', 'light'], ['A truck', 'a bike', 'heavy'], ['A baby', 'a teenager', 'young'], ['A river', 'a pond', 'long'], ['A pencil', 'a bus', 'small'], ['A diamond', 'a pebble', 'expensive'], ['A tiger', 'a kitten', 'dangerous'],
  ['A skyscraper', 'a house', 'tall'], ['A jet', 'a bicycle', 'fast'], ['A pizza', 'a plain cracker', 'delicious'], ['A math puzzle', 'a simple game', 'difficult'], ['A garden', 'a desert', 'beautiful'], ['A comedy', 'a news show', 'funny'], ['A bear', 'a rabbit', 'strong'], ['A giant', 'a child', 'large']];
A.light = { a: 'light', c: 'lighter', s: 'lightest', k: 'short' };
const barSvg = (kind, x, y, big) => { // kind: 'long' | 'tall' | 'big'
  const col = ['#4e9bd6', '#e5843b'];
  if (kind === 'big') return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><circle cx="55" cy="50" r="${x}" fill="${col[0]}"/><circle cx="145" cy="50" r="${y}" fill="${col[1]}"/><text x="55" y="95" text-anchor="middle" font-size="16">A</text><text x="145" y="95" text-anchor="middle" font-size="16">B</text></svg>`;
  if (kind === 'tall') return `<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg"><rect x="45" y="${95 - x}" width="24" height="${x}" fill="${col[0]}"/><rect x="130" y="${95 - y}" width="24" height="${y}" fill="${col[1]}"/><text x="57" y="108" text-anchor="middle" font-size="14">A</text><text x="142" y="108" text-anchor="middle" font-size="14">B</text></svg>`;
  return `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="12" width="${x}" height="16" fill="${col[0]}"/><rect x="10" y="48" width="${y}" height="16" fill="${col[1]}"/><text x="${x + 20}" y="26" font-size="14">A</text><text x="${y + 20}" y="62" font-size="14">B</text></svg>`;
};
const CMP = [['long', 'longer', 'shorter', 'short'], ['tall', 'taller', 'shorter', 'tall'], ['big', 'bigger', 'smaller', 'big']];
const OPP = [['big', 'small'], ['tall', 'short'], ['fast', 'slow'], ['hot', 'cold'], ['old', 'young'], ['heavy', 'light'], ['happy', 'sad'], ['easy', 'difficult'], ['long', 'short'], ['strong', 'weak'], ['good', 'bad'], ['wet', 'dry']];
const ORD3 = split('big|red|ball;small|green|frog;beautiful|yellow|flower;old|brown|dog;little|white|rabbit;tall|green|tree;new|blue|bike;nice|purple|hat;long|black|snake;heavy|grey|rock;soft|pink|blanket;fast|silver|car'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const ORD4 = split('lovely|small|white|cat;nice|big|red|bag;beautiful|old|brown|house;funny|little|green|frog;lovely|tall|yellow|flower;nice|new|blue|shirt;big|old|grey|elephant;pretty|small|pink|dress;scary|big|black|spider;kind|old|white|dog'.replace(/;/g, '|;|')).join('|').split('|;|').map((x) => x.split('|'));
const aA = (w) => (/^[aeiou]/.test(w) ? 'an' : 'a');
const wrongComp = (x) => uniq([x.a + 'er', x.a.slice(0, -1) + 'er', x.a + x.a.at(-1) + 'er', x.a.slice(0, -1) + 'ier', 'more ' + x.a, x.s, x.a, x.c + 'er']).filter((y) => y !== x.c);
const g26 = {
  1: [
    (R) => { const f = R.pick(FACTS.filter((x) => A[x[2]].k === 'short')); const x = A[f[2]]; return mc(`g26a1:${f[0]}:${f[1]}:${x.a}`, tb('Choisis le mot qui compare.', 'Choose the comparing word.'), x.c, [x.a, x.s], { stimulus: { text: `${f[0]} is ___ than ${f[1]}.` }, cols: 3, tip: tb('Adjectif court + -er + than : bigger than.', 'Short adjective + -er + than: bigger than.') }); },
    (R) => { const c = R.pick(CMP), a = R.int(2, 6) * 10, b = R.pick([R.int(2, 6) * 10 + 5, R.int(2, 6) * 10 + 5]); const A1 = c[0] === 'big' ? a / 2 : a, B1 = c[0] === 'big' ? b / 2 : b; if (a === b) return g26[1][1](R); const bigger = a > b; const wantBig = R.chance(0.5); const word = wantBig ? c[1] : c[2]; const ans = (bigger === wantBig) ? 'A' : 'B';
      return mc(`g26b1:${c[0]}:${a}:${b}:${wantBig}`, { fr: `Quel est ${word}? A ou B?`, en: `Which one is ${word}? A or B?` }, ans, [ans === 'A' ? 'B' : 'A'], { stimulus: { svg: barSvg(c[0], c[0] === 'big' ? Math.round(A1 / 2) + 10 : A1, c[0] === 'big' ? Math.round(B1 / 2) + 10 : B1) }, cols: 2 }); },
    (R) => { const f = R.pick(FACTS.filter((x) => A[x[2]].k === 'short')); const x = A[f[2]]; const sent = `${f[0]} is ${x.c} than ${f[1]}.`; return build(`g26c1:${sent}`, sent, { tip: tb('A is bigger than B.', 'A is bigger than B.') }); },
    (R) => { const o = R.pick(OPP); const rev = R.chance(0.5); const [p, q] = rev ? [o[1], o[0]] : o; return mc(`g26d1:${p}`, tb('Quel est le contraire?', 'What is the opposite?'), q, R.sample(OPP.flatMap((y) => y).filter((y) => y !== q && y !== p), 2), { stimulus: { text: p }, say: say(p), cols: 3 }); },
  ],
  2: [
    (R) => { const f = R.pick(FACTS.filter((x) => A[x[2]])); const x = A[f[2]]; return blank(`g26a2:${f[0]}:${f[1]}:${x.a}`, `${f[0]} is ___ than ${f[1]}.`, x.c, R.sample(wrongComp(x), 3), { cols: 2, tip: tb('Adjectif court → -er; long → more + adjectif.', 'Short adjective → -er; long adjective → more + adjective.') }); },
    (R) => { const x = R.pick(ADJ.filter((y) => y.k === 'short' && y.c !== y.a + 'er')); return mc(`g26b2:${x.a}`, tb('Quelle est la bonne orthographe?', 'Which spelling is correct?'), x.c, R.sample(wrongComp(x), 3), { stimulus: { text: `${x.a} → ?` }, cols: 2, tip: tb('hot → hotter (on double), happy → happier (y → ier), nice → nicer.', 'hot → hotter (double), happy → happier (y → ier), nice → nicer.') }); },
    (R) => { const q = R.pick(ORD3); const ph = `${aA(q[0])} ${q[0]} ${q[1]} ${q[2]}`; return which(`g26c2:${q.join(',')}`, ph, [`${aA(q[1])} ${q[1]} ${q[0]} ${q[2]}`, `${aA(q[2])} ${q[2]} ${q[0]} ${q[1]}`, `${aA(q[1])} ${q[1]} ${q[2]} ${q[0]}`], { prompt: tb('Quel groupe de mots est dans le bon ordre?', 'Which group of words is in the right order?'), tip: tb('L’adjectif de taille / d’opinion vient avant la couleur.', 'Size / opinion comes before colour.') }); },
    (R) => { const x = A[R.pick(['tall', 'short', 'fast', 'strong', 'funny', 'happy', 'nice', 'old', 'young', 'slow'])]; const n = R.pick([...FN, ...MN]); return blank(`g26d2:${n}:${x.a}`, `${n} is the ___ student in the class.`, x.s, R.sample(uniq([x.c, x.a, 'most ' + x.a, x.a + 'est', x.c + 'est']).filter((y) => y !== x.s), 3), { cols: 2, tip: tb('Le plus … = the + -est (ou the most + adjectif long).', 'The most … = the + -est (or the most + long adjective).') }); },
    (R) => { const x = R.pick(ADJ.filter((y) => y.k === 'short' && y.c !== y.a + 'er')); return which(`g26e2:${x.a}`, `My bag is ${x.c} than your bag.`, [`My bag is ${x.a}er than your bag.`, `My bag is more ${x.a} than your bag.`.replace('more ' + x.a, 'more ' + x.c), `My bag is ${x.s} than your bag.`]); },
  ],
  3: [
    (R) => { const x = R.pick([A.good, A.bad]); const t = R.int(0, 1); return t ? blank(`g26a3b:${x.a}`, `This is the ___ day of my life!`, x.s, [x.c, 'most ' + x.a, x.a + 'est'].filter((y) => y !== x.s), { tip: tb('good → better → best; bad → worse → worst.', 'good → better → best; bad → worse → worst.') }) : blank(`g26a3:${x.a}`, `This soup is ___ than that one.`.replace('soup', x.a === 'good' ? 'soup' : 'movie'), x.c, [x.a + 'er', 'more ' + x.a, x.s].filter((y) => y !== x.c), { tip: tb('good → better, bad → worse.', 'good → better, bad → worse.') }); },
    (R) => { const q = R.pick(ORD4); const ph = `${aA(q[0])} ${q.join(' ')}`; return build(`g26b3:${q.join(',')}`, ph, { prompt: tb('Mets les adjectifs dans le bon ordre.', 'Put the adjectives in the right order.'), tip: tb('opinion → taille / âge → couleur → nom', 'opinion → size / age → colour → noun') }); },
    (R) => { const names = R.sample([...FN.slice(0, 4), ...MN.slice(0, 4)], 3); const nums = R.sample([6, 7, 8, 9, 10, 11, 12], 3); const kind = R.int(0, 1); const adj = kind ? ['tallest', 'shortest', 'taller', 'shorter'] : ['oldest', 'youngest', 'older', 'younger']; const w = R.pick(adj); const txt = names.map((n, i) => kind ? `${n} is ${nums[i] * 10 + 60} centimetres tall.` : `${n} is ${nums[i]} years old.`).join(' ');
      const hiIdx = nums.indexOf(Math.max(...nums)), loIdx = nums.indexOf(Math.min(...nums)); let ans, prompt;
      if (w.endsWith('est')) { const big = (w === 'tallest' || w === 'oldest'); ans = names[big ? hiIdx : loIdx]; prompt = `Who is the ${w}?`; return mc(`g26c3:${names.join('')}:${nums.join('')}:${w}`, prompt, ans, rest(names, ans), { stimulus: { text: txt }, cols: 2, tip: tb('Compare les nombres.', 'Compare the numbers.') }); }
      const [i, j] = R.sample([0, 1, 2], 2); const big = (w === 'taller' || w === 'older'); const win = (nums[i] > nums[j]) === big ? i : j; return mc(`g26c3b:${names.join('')}:${nums.join('')}:${w}:${i}${j}`, `Who is ${w}, ${names[i]} or ${names[j]}?`, names[win], [names[win] === names[i] ? names[j] : names[i], names[3 - i - j]], { stimulus: { text: txt }, cols: 3 }); },
    (R) => { const s = R.sample(ADJ.filter((x) => x.k === 'short' && !x.a.endsWith('y') && x.a !== 'nice' && x.a !== 'large' && x.a.length < 6), 2), l = R.sample(ADJ.filter((x) => x.k === 'long'), 2), ir = R.sample(ADJ.filter((x) => x.k === 'irr'), 2);
      const sh = R.sample(ADJ.filter((x) => x.k === 'short'), 2); return sortQ(`g26d3:${[...sh, ...l, ...ir].map((x) => x.a).sort().join(',')}`, tb('Comment forme-t-on la comparaison?', 'How do we compare it?'), [{ text: '-er' }, { text: 'more …' }, { text: 'special' }], [sh.map((x) => x.a), l.map((x) => x.a), ir.map((x) => x.a)], { tip: tb('petit mot → -er; long mot → more; good / bad → forme spéciale.', 'short word → -er; long word → more; good / bad → special form.') }); },
    (R) => { const f = R.pick(FACTS.filter((x) => A[x[2]] && A[x[2]].k !== 'irr')); const x = A[f[2]]; const r = `${f[0]} is ${x.c} than ${f[1]}.`; const wr = x.k === 'short' ? [`${f[0]} is more ${x.c} than ${f[1]}.`, `${f[0]} is ${x.a}er than ${f[1]}.`.replace(`${x.a}er`, x.a === x.c ? x.s : `${x.a}er`), `${f[0]} is ${x.s} than ${f[1]}.`] : [`${f[0]} is ${x.a}er than ${f[1]}.`, `${f[0]} is most ${x.a} than ${f[1]}.`, `${f[0]} is more ${x.a} that ${f[1]}.`];
      return which(`g26e3:${f[0]}:${x.a}`, r, wr.filter((y) => y !== r), { tip: tb('Jamais more + -er ensemble. Après la comparaison : than.', 'Never use more + -er together. After the comparison: than.') }); },
  ],
};

export const grammarUnits = [
  U('g3e17', '🗣️', { fr: 'Le présent simple', en: 'Simple present' }, 'présent simple (3e personne -s, do / does, don’t / doesn’t)', g17),
  U('g3e18', '🏃', { fr: 'Le présent continu', en: 'Present continuous' }, 'présent continu (am / is / are + -ing)', g18),
  U('g3e19', '⏪', { fr: 'Le passé simple', en: 'Simple past' }, 'passé simple (-ed et verbes irréguliers)', g19),
  U('g3e20', '💪', { fr: 'Can / can’t', en: 'Can / can’t' }, 'can / can’t : habiletés et demandes polies', g20),
  U('g3e21', '🔢', { fr: 'There is / there are', en: 'There is / there are' }, 'there is / there are, some / any', g21),
  U('g3e22', '🐭', { fr: 'Les pluriels', en: 'Plurals' }, 'pluriels réguliers et irréguliers (children, feet, mice)', g22),
  U('g3e23', '🎒', { fr: 'Les possessifs', en: 'Possessives' }, 'possessifs (’s, my / your / his / her / our / their)', g23),
  U('g3e24', '📍', { fr: 'Les prépositions', en: 'Prepositions' }, 'prépositions de lieu et de temps (in, on, at)', g24),
  U('g3e25', '❓', { fr: 'Les mots interrogatifs', en: 'Question words' }, 'who, what, where, when, why, how', g25),
  U('g3e26', '📏', { fr: 'Adjectifs et comparaisons', en: 'Adjectives & comparing' }, 'ordre des adjectifs, comparatifs et superlatifs', g26),
];
