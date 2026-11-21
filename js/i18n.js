import { store } from './store.js';

// Chinese UI text: a String (the characters) that also carries its pinyin. Template literals and textContent see the
// characters; el() (js/util.js) renders it with pinyin over each character (hanzi() in js/widgets.js).
export class ZhStr extends String { constructor(hz, py) { super(hz); this.hz = String(hz); this.py = py || ''; } }
export const zh = (hz, py) => new ZhStr(hz, py);

const STR = {
  hello: { fr: 'Bonjour', en: 'Hello' },
  pickSubject: { fr: 'Qu’est-ce qu’on apprend aujourd’hui?', en: 'What shall we learn today?' },
  francais: { fr: 'Français', en: 'French' },
  math: { fr: 'Mathématique', en: 'Math' },
  anglais: { fr: 'Anglais', en: 'English' },
  daily: { fr: 'Défi du jour', en: 'Daily challenge', zh: zh('每日挑战', 'měi rì tiǎo zhàn') },
  dailyDone: { fr: 'Défi réussi aujourd’hui!', en: 'Challenge done today!' },
  album: { fr: 'Mon album', en: 'My album' },
  parents: { fr: 'Parents', en: 'Parents' },
  level: { fr: 'Niveau', en: 'Level', zh: zh('难度', 'nán dù') },
  diff1: { fr: 'Facile', en: 'Easy', zh: zh('简单', 'jiǎn dān') },
  diff2: { fr: 'Moyen', en: 'Medium', zh: zh('中等', 'zhōng děng') },
  diff3: { fr: 'Difficile', en: 'Hard', zh: zh('难', 'nán') },
  check: { fr: 'Vérifier', en: 'Check', zh: zh('检查', 'jiǎn chá') },
  tryAgain: { fr: 'Essaie encore!', en: 'Try again!', zh: zh('再试一次！', 'zài shì yí cì') },
  answerWas: { fr: 'La bonne réponse :', en: 'The right answer:', zh: zh('正确答案是：', 'zhèng què dá àn shì') },
  next: { fr: 'Suivant', en: 'Next', zh: zh('下一题', 'xià yì tí') },
  replay: { fr: 'Rejouer', en: 'Play again', zh: zh('再玩一次', 'zài wán yí cì') },
  nextLevel: { fr: 'Plus difficile', en: 'Harder', zh: zh('难一点', 'nán yì diǎn') },
  back: { fr: 'Retour', en: 'Back', zh: zh('返回', 'fǎn huí') },
  newSticker: { fr: 'Nouvel autocollant!', en: 'New sticker!', zh: zh('新贴纸！', 'xīn tiē zhǐ') },
  stickers: { fr: 'autocollants', en: 'stickers', zh: zh('贴纸', 'tiē zhǐ') },
  locked: { fr: 'Gagne une étoile au niveau plus facile', en: 'Earn a star on the easier level', zh: zh('先在简单一级得到一颗星', 'xiān zài jiǎn dān yì jí dé dào yì kē xīng') },
  great: { zh: [zh('真棒！', 'zhēn bàng'), zh('太好了！', 'tài hǎo le'), zh('对啦！', 'duì la'), zh('厉害！', 'lì hai'), zh('好样的！', 'hǎo yàng de')], fr: ['Bravo!', 'Super!', 'Excellent!', 'Wow!', 'Génial!', 'Bien joué!'], en: ['Great!', 'Super!', 'Excellent!', 'Wow!', 'Awesome!', 'Well done!'] },
  endMsg: [
    { fr: 'On continue de pratiquer!', en: 'Let’s keep practising!', zh: zh('我们继续练习吧！', 'wǒ men jì xù liàn xí ba') },
    { fr: 'Bon travail!', en: 'Good work!', zh: zh('做得好！', 'zuò de hǎo') },
    { fr: 'Très bien!', en: 'Very good!', zh: zh('很好！', 'hěn hǎo') },
    { fr: 'Parfait! Tu es une vraie étoile!', en: 'Perfect! You are a star!', zh: zh('满分！你是一颗小星星！', 'mǎn fēn nǐ shì yì kē xiǎo xīng xing') },
  ],
  settings: { fr: 'Réglages', en: 'Settings' },
  childName: { fr: 'Prénom de l’enfant', en: 'Child’s first name' },
  uiLang: { fr: 'Langue de l’interface', en: 'Interface language' },
  sound: { fr: 'Sons', en: 'Sounds' },
  voice: { fr: 'Lecture à voix haute', en: 'Read aloud' },
  speed: { fr: 'Vitesse de la voix', en: 'Voice speed' },
  perSession: { fr: 'Questions par partie', en: 'Questions per game' },
  progress: { fr: 'Progrès', en: 'Progress' },
  reset: { fr: 'Effacer les progrès', en: 'Reset progress' },
  resetConfirm: { fr: 'Effacer tous les progrès et autocollants?', en: 'Erase all progress and stickers?' },
  gate: { fr: 'Pour les parents : combien font', en: 'For parents: what is' },
  minutes: { fr: 'min aujourd’hui', en: 'min today' },
  noData: { fr: 'pas encore joué', en: 'not played yet' },
  accuracy: { fr: 'réussite', en: 'accuracy' },
  sessions: { fr: 'séances', en: 'sessions' },
  on: { fr: 'Oui', en: 'On' },
  off: { fr: 'Non', en: 'Off' },
  installHint: {
    fr: 'Sur iPad : touche Partager ⬆️ puis « Sur l’écran d’accueil » pour installer le jeu.',
    en: 'On iPad: tap Share ⬆️ then “Add to Home Screen” to install the game.',
  },
  arts: { fr: 'Arts plastiques', en: 'Arts & crafts' },
  missions: { fr: 'Missions du jour', en: 'Today’s missions' },
  shop: { fr: 'Boutique', en: 'Shop' },
  badges: { fr: 'Mes badges', en: 'My badges' },
  games: { fr: 'jeux', en: 'games', zh: zh('个游戏', 'gè yóu xì') },
  quiz: { fr: 'Quiz', en: 'Quiz', zh: zh('快问快答', 'kuài wèn kuài dá') },
  quizSub: { fr: 'Bats ton record!', en: 'Beat your record!', zh: zh('打破你的纪录！', 'dǎ pò nǐ de jì lù') },
  gamesHub: { fr: 'Jeux', en: 'Games', zh: zh('游戏', 'yóu xì') },
  gamesSub: { fr: 'Ballons, mémoire…', en: 'Balloons, memory…', zh: zh('气球、记忆卡……', 'qì qiú jì yì kǎ') },
  practice: { fr: 'Pratique', en: 'Practice', zh: zh('练习', 'liàn xí') },
  questions: { fr: 'questions', en: 'questions', zh: zh('道题', 'dào tí') },
  eclair: { fr: 'Défi éclair', en: 'Lightning quiz', zh: zh('闪电挑战', 'shǎn diàn tiǎo zhàn') },
  eclairMix: { fr: 'Éclair : tout mélangé', en: 'Lightning: everything mixed', zh: zh('闪电挑战：全部混合', 'shǎn diàn tiǎo zhàn quán bù hùn hé') },
  marathon: { fr: 'Marathon', en: 'Marathon', zh: zh('马拉松', 'mǎ lā sōng') },
  marathonSub: { fr: '20 questions', en: '20 questions', zh: zh('20道题', 'dào tí') },
  ballons: { fr: 'Ballons', en: 'Balloons', zh: zh('气球', 'qì qiú') },
  memory: { fr: 'Mémoire', en: 'Memory', zh: zh('记忆卡', 'jì yì kǎ') },
  memorySub: { fr: 'Trouve les paires', en: 'Find the pairs', zh: zh('找一样的两张', 'zhǎo yí yàng de liǎng zhāng') },
  record: { fr: 'Record', en: 'Best', zh: zh('纪录', 'jì lù') },
  newRecord: { fr: 'Nouveau record!', en: 'New record!', zh: zh('新纪录！', 'xīn jì lù') },
  guardian: { fr: 'Gardien', en: 'Guardian', zh: zh('守护兽', 'shǒu hù shòu') },
  fight: { fr: 'Affronter le gardien', en: 'Face the guardian', zh: zh('挑战守护兽', 'tiǎo zhàn shǒu hù shòu') },
  bossSub: { fr: 'Gagne le trophée 🏆', en: 'Win the trophy 🏆', zh: zh('赢得奖杯🏆', 'yíng dé jiǎng bēi') },
  bossRule: { fr: 'Questions de toute l’île. 3 cœurs : vide sa barre de vie!', en: 'Questions from the whole island. 3 hearts: empty its health bar!', zh: zh('题目来自整个小岛。你有3颗心：把它的血条打空！', 'tí mù lái zì zhěng gè xiǎo dǎo nǐ yǒu kē xīn bǎ tā de xuè tiáo dǎ kōng') },
  bossWon: { fr: 'Victoire! Trophée gagné!', en: 'Victory! Trophy won!', zh: zh('胜利！你赢得了奖杯！', 'shèng lì nǐ yíng dé le jiǎng bēi') },
  bossLost: { fr: 'Presque! Essaie encore!', en: 'So close! Try again!', zh: zh('差一点！再试一次！', 'chà yì diǎn zài shì yí cì') },
  quizIntro: { fr: 'Une seule chance par question. Enchaîne les bonnes réponses pour multiplier tes points!', en: 'One try per question. Chain right answers to multiply your points!', zh: zh('每道题只有一次机会。连续答对，分数会翻倍！', 'měi dào tí zhǐ yǒu yí cì jī huì lián xù dá duì fēn shù huì fān bèi') },
  talkAi: { fr: 'Parle avec Hibou', en: 'Talk with Owl', zh: zh('和猫头鹰说话', 'hé māo tóu yīng shuō huà') },
  talkSoon: { fr: 'Bientôt : une vraie conversation en anglais à voix haute.', en: 'Coming soon: a real spoken English conversation.' },
  bravoAll: { fr: 'Toutes les paires!', en: 'All the pairs!', zh: zh('全部找到了！', 'quán bù zhǎo dào le') },
  tries: { fr: 'essais', en: 'tries', zh: zh('次', 'cì') },
  wear: { fr: 'Porter', en: 'Wear' },
  coinsP: { fr: 'Plumes', en: 'Feathers', zh: zh('羽毛', 'yǔ máo') },
  voiceServer: { fr: 'Serveur de voix (IA)', en: 'Voice server (AI)' },
  voiceServerHint: { fr: 'Pour « Parle avec Hibou » et la voix naturelle en ligne. Voir worker/README.md.', en: 'For “Talk with Owl” and the natural online voice. See worker/README.md.' },
  familyCode: { fr: 'Code familial', en: 'Family code' },
  talkLimit: { fr: 'Conversation max / jour', en: 'Talk time max / day' },
  readVoice: { fr: 'Voix naturelle pour la lecture', en: 'Natural voice for reading' },
  chinois: { fr: 'Chinois', en: 'Chinese', zh: zh('中文', 'zhōng wén') },
  pinyin: { fr: 'Pinyin au-dessus des caractères', en: 'Pinyin above characters' },
  why: { fr: 'Pourquoi?', en: 'Why?', zh: zh('为什么？', 'wèi shén me') },
  continue: { fr: 'Continuer', en: 'Continue', zh: zh('继续', 'jì xù') },
  review: { fr: 'Mes erreurs', en: 'My mistakes', zh: zh('我的错题', 'wǒ de cuò tí') },
  reviewSub: { fr: 'à revoir aujourd’hui', en: 'to review today', zh: zh('今天要复习', 'jīn tiān yào fù xí') },
  reviewLater: { fr: 'à revoir plus tard', en: 'to review later' },
  reviewNone: { fr: 'Rien à revoir aujourd’hui. Bravo! Les questions reviendront dans quelques jours.', en: 'Nothing to review today. Well done! The questions will come back in a few days.' },
  learnedIt: { fr: 'Appris! Cette question sort de « Mes erreurs ».', en: 'Learned! This question leaves “My mistakes”.', zh: zh('学会了！这道题离开了错题本。', 'xué huì le zhè dào tí lí kāi le cuò tí běn') },
  suggested: { fr: 'conseillé', en: 'suggested', zh: zh('推荐', 'tuī jiàn') },
  tipUp: { fr: 'Parfait! Tu es prêt pour le niveau suivant.', en: 'Perfect! You are ready for the next level.', zh: zh('太棒了！你可以去下一级了。', 'tài bàng le nǐ kě yǐ qù xià yì jí le') },
  tipDown: { fr: 'C’était difficile. Essaie un niveau plus facile, puis reviens!', en: 'That was hard. Try an easier level, then come back!', zh: zh('有点难。先玩简单一点的，再回来！', 'yǒu diǎn nán xiān wán jiǎn dān yì diǎn de zài huí lái') },
  easier: { fr: 'Plus facile', en: 'Easier', zh: zh('简单一点', 'jiǎn dān yì diǎn') },
  planAll: { fr: 'Plan du jour terminé! +20 plumes', en: 'Today’s plan done! +20 feathers', zh: zh('今天的计划完成了！加20根羽毛', 'jīn tiān de jì huà wán chéng le jiā gēn yǔ máo') },
  planBlock: { fr: 'Étape du plan réussie', en: 'Plan step done', zh: zh('计划的一步完成了', 'jì huà de yí bù wán chéng le') },
  planTitle: { fr: 'Plan des deux prochaines semaines', en: 'Plan for the next two weeks' },
  talkShort: { fr: 'Parler', en: 'Talk', zh: zh('说话', 'shuō huà') },
  grade: { fr: '2e année · Programme du Québec', en: 'Grade 2 · Québec program' },
};

// « English zone »: inside the anglais subject (2e/3e), the English book shelf and Talk in English, every piece of
// UI text and voice is English whatever the app language is. setZone('en') on entering, setZone(null) on leaving.
let zone = null;
export const setZone = (l) => { zone = l || null; };
export const getZone = () => zone;
export const lang = () => zone || store.settings.lang;
// « Chinese zone » (setZone('zh')): inside the chinois subject (2e/3e), the Chinese book shelf and Talk in Chinese,
// everything reads and speaks Chinese (characters with pinyin, see ZhStr) — the child reads few characters.
// Resolve a text field: string | {fr,en,zh?} | {hz,py}. A Chinese value ({hz,py} or zh()) comes back as a ZhStr.
const zhOf = (v) => (v && typeof v === 'object' && !(v instanceof String) && !Array.isArray(v) && typeof v.hz === 'string' ? new ZhStr(v.hz, v.py) : v);
export const tr = (x) => {
  if (x == null) return '';
  if (typeof x !== 'object' || Array.isArray(x) || x instanceof String) return x;
  if ('fr' in x || 'en' in x || 'zh' in x) return zhOf(x[lang()] ?? x.fr ?? x.en);
  return zhOf(x);
};
// plain characters of a text field (for speech, keys, comparisons)
export const plain = (x) => { const v = tr(x); return v instanceof String ? String(v) : v; };
export const t = (k) => tr(STR[k]);
export const tPick = (k) => { const a = tr(STR[k]); return a[Math.floor(Math.random() * a.length)]; };
export const STRINGS = STR;
