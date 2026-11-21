// Game layer: plumes 🪶 (coins), daily streak 🔥, daily missions, badges, owl shop, juice (confetti, floating text).
import { el, makeRng } from './util.js';
import { store, save, today } from './store.js';
import { tr, zh } from './i18n.js';
import { sfx } from './audio.js';
import { OWL } from './owl.js';

export const COIN = '🪶';

// ---------- stats & coins ----------
export function bump(stat, n = 1) { store.stats[stat] = (store.stats[stat] || 0) + n; }
export function maxStat(stat, v) { store.stats[stat] = Math.max(store.stats[stat] || 0, v); }
export function addCoins(n) { store.coins = Math.max(0, (store.coins || 0) + Math.round(n)); bump('coinsEarned', Math.max(0, n)); }

// Played something today → keeps the 🔥 streak going.
export function touchStreak() {
  const d = today(), s = store.streak;
  if (s.last === d) return false;
  const y = new Date(Date.now() - 864e5);
  const yd = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
  s.n = s.last === yd ? s.n + 1 : 1;
  s.last = d;
  s.best = Math.max(s.best, s.n);
  return true;
}
export const streakNow = () => {
  const s = store.streak;
  if (s.last === today()) return s.n;
  const y = new Date(Date.now() - 864e5);
  const yd = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
  return s.last === yd ? s.n : 0;
};

// ---------- daily missions ----------
const MISSIONS = [
  { id: 'correct', goal: 20, reward: 15, icon: '✅', t: { fr: 'Donne 20 bonnes réponses', en: 'Give 20 right answers' } },
  { id: 'stars', goal: 4, reward: 15, icon: '⭐', t: { fr: 'Gagne 4 étoiles', en: 'Earn 4 stars' } },
  { id: 'eclair', goal: 1, reward: 15, icon: '⚡', t: { fr: 'Joue un Défi éclair', en: 'Play a Lightning quiz' } },
  { id: 'ballons', goal: 1, reward: 15, icon: '🎈', t: { fr: 'Joue aux Ballons', en: 'Play Balloons' } },
  { id: 'combo', goal: 5, reward: 20, icon: '🔥', t: { fr: 'Fais 5 bonnes réponses de suite', en: 'Get 5 right in a row' } },
  { id: 'francais', goal: 1, reward: 10, icon: '📖', t: { fr: 'Joue une partie de français', en: 'Play a French game' } },
  { id: 'math', goal: 1, reward: 10, icon: '🧮', t: { fr: 'Joue une partie de maths', en: 'Play a math game' } },
  { id: 'anglais', goal: 1, reward: 10, icon: '🍁', t: { fr: 'Joue une partie d’anglais', en: 'Play an English game' } },
  { id: 'why', goal: 1, reward: 15, icon: '🔭', t: { fr: 'Découvre un « Pourquoi? »', en: 'Discover a “Why?”' } },
  { id: 'chinois', goal: 1, reward: 10, icon: '🐼', t: { fr: 'Joue une partie de chinois', en: 'Play a Chinese game' } },
  { id: 'arts', goal: 1, reward: 20, icon: '🎨', t: { fr: 'Termine un bricolage ou un dessin', en: 'Finish a craft or a drawing' } },
  { id: 'record', goal: 1, reward: 20, icon: '🏆', t: { fr: 'Bats un de tes records', en: 'Beat one of your records' } },
];
export function missions() {
  const d = today();
  if (store.missions.date !== d) {
    const R = makeRng([...d].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0);
    const pool = R.shuffle(MISSIONS.filter((m) => m.id !== 'correct'));
    // always one "answers" mission + 2 varied ones
    const list = [MISSIONS[0], ...pool.slice(0, 2)].map((m) => ({ id: m.id, p: 0, claimed: false }));
    store.missions = { date: d, list };
    save();
  }
  return store.missions.list.map((x) => ({ ...MISSIONS.find((m) => m.id === x.id), ...x }));
}
export function progress(id, n = 1, { set = false } = {}) {
  missions();
  for (const m of store.missions.list) {
    if (m.id !== id) continue;
    const def = MISSIONS.find((d) => d.id === id);
    m.p = Math.min(def.goal, set ? Math.max(m.p, n) : m.p + n);
  }
}
export function claim(id) {
  const m = store.missions.list.find((x) => x.id === id);
  const def = MISSIONS.find((d) => d.id === id);
  if (!m || m.claimed || m.p < def.goal) return 0;
  m.claimed = true;
  addCoins(def.reward);
  bump('missions');
  save();
  return def.reward;
}

// ---------- badges ----------
const S = (k) => store.stats[k] || 0;
export const BADGES = [
  { id: 'first', icon: '🐣', t: { fr: 'Premier pas', en: 'First step', zh: zh('第一步', 'dì yī bù') }, d: { fr: 'Termine une partie', en: 'Finish a game', zh: zh('玩完一局游戏', 'wán wán yì jú yóu xì') }, ok: () => S('games') >= 1 },
  { id: 'c100', icon: '💯', t: { fr: 'Cent!', en: 'One hundred!', zh: zh('一百！', 'yì bǎi') }, d: { fr: '100 bonnes réponses', en: '100 right answers', zh: zh('答对100道题', 'dá duì dào tí') }, ok: () => S('correct') >= 100 },
  { id: 'c500', icon: '🧠', t: { fr: 'Super cerveau', en: 'Super brain', zh: zh('超级大脑', 'chāo jí dà nǎo') }, d: { fr: '500 bonnes réponses', en: '500 right answers', zh: zh('答对500道题', 'dá duì dào tí') }, ok: () => S('correct') >= 500 },
  { id: 'c2000', icon: '🦉', t: { fr: 'Sage hibou', en: 'Wise owl', zh: zh('聪明的猫头鹰', 'cōng míng de māo tóu yīng') }, d: { fr: '2000 bonnes réponses', en: '2000 right answers', zh: zh('答对2000道题', 'dá duì dào tí') }, ok: () => S('correct') >= 2000 },
  { id: 'combo10', icon: '🔥', t: { fr: 'En feu', en: 'On fire', zh: zh('火力全开', 'huǒ lì quán kāi') }, d: { fr: '10 bonnes réponses de suite', en: '10 right in a row', zh: zh('连续答对10道题', 'lián xù dá duì dào tí') }, ok: () => S('bestCombo') >= 10 },
  { id: 'combo25', icon: '☄️', t: { fr: 'Comète', en: 'Comet', zh: zh('彗星', 'huì xīng') }, d: { fr: '25 bonnes réponses de suite', en: '25 right in a row', zh: zh('连续答对25道题', 'lián xù dá duì dào tí') }, ok: () => S('bestCombo') >= 25 },
  { id: 'perfect', icon: '🌟', t: { fr: 'Parfait', en: 'Perfect', zh: zh('满分', 'mǎn fēn') }, d: { fr: '3 étoiles dans une partie', en: '3 stars in a game', zh: zh('一局得到3颗星', 'yì jú dé dào kē xīng') }, ok: () => S('perfect') >= 1 },
  { id: 'perfect10', icon: '✨', t: { fr: 'Étoile filante', en: 'Shooting star', zh: zh('流星', 'liú xīng') }, d: { fr: '10 parties parfaites', en: '10 perfect games', zh: zh('10局满分', 'jú mǎn fēn') }, ok: () => S('perfect') >= 10 },
  { id: 'hard', icon: '🌶️', t: { fr: 'Courageux', en: 'Brave', zh: zh('勇敢', 'yǒng gǎn') }, d: { fr: 'Réussis une partie Difficile', en: 'Pass a Hard game', zh: zh('通过一局难的游戏', 'tōng guò yì jú nán de yóu xì') }, ok: () => S('hardWins') >= 1 },
  { id: 'eclair', icon: '⚡', t: { fr: 'Éclair', en: 'Lightning', zh: zh('闪电', 'shǎn diàn') }, d: { fr: '100 points au Défi éclair', en: '100 points in a Lightning quiz', zh: zh('闪电挑战得到100分', 'shǎn diàn tiǎo zhàn dé dào fēn') }, ok: () => S('bestEclair') >= 100 },
  { id: 'eclair300', icon: '🌩️', t: { fr: 'Tonnerre', en: 'Thunder', zh: zh('打雷', 'dǎ léi') }, d: { fr: '300 points au Défi éclair', en: '300 points in a Lightning quiz', zh: zh('闪电挑战得到300分', 'shǎn diàn tiǎo zhàn dé dào fēn') }, ok: () => S('bestEclair') >= 300 },
  { id: 'ballons', icon: '🎈', t: { fr: 'Pop pop!', en: 'Pop pop!', zh: zh('啪啪啪！', 'pā pā pā') }, d: { fr: '15 ballons dans une partie', en: '15 balloons in one game', zh: zh('一局打破15个气球', 'yì jú dǎ pò gè qì qiú') }, ok: () => S('bestBallons') >= 15 },
  { id: 'records', icon: '🏆', t: { fr: 'Champion', en: 'Champion', zh: zh('冠军', 'guàn jūn') }, d: { fr: 'Bats 10 records', en: 'Beat 10 records', zh: zh('打破10个纪录', 'dǎ pò gè jì lù') }, ok: () => S('records') >= 10 },
  { id: 'boss', icon: '🐉', t: { fr: 'Dompteur', en: 'Tamer', zh: zh('驯兽师', 'xùn shòu shī') }, d: { fr: 'Gagne contre un gardien d’île', en: 'Beat an island guardian', zh: zh('打败一个小岛守护兽', 'dǎ bài yí gè xiǎo dǎo shǒu hù shòu') }, ok: () => S('bossWins') >= 1 },
  { id: 'boss5', icon: '👑', t: { fr: 'Roi des îles', en: 'Island king', zh: zh('小岛之王', 'xiǎo dǎo zhī wáng') }, d: { fr: 'Gagne contre 5 gardiens', en: 'Beat 5 guardians', zh: zh('打败5个守护兽', 'dǎ bài gè shǒu hù shòu') }, ok: () => S('bossWins') >= 5 },
  { id: 'streak3', icon: '📅', t: { fr: 'Trois jours', en: 'Three days', zh: zh('三天', 'sān tiān') }, d: { fr: 'Joue 3 jours de suite', en: 'Play 3 days in a row', zh: zh('连续玩3天', 'lián xù wán tiān') }, ok: () => store.streak.best >= 3 },
  { id: 'streak7', icon: '🗓️', t: { fr: 'Une semaine', en: 'One week', zh: zh('一个星期', 'yí gè xīng qī') }, d: { fr: 'Joue 7 jours de suite', en: 'Play 7 days in a row', zh: zh('连续玩7天', 'lián xù wán tiān') }, ok: () => store.streak.best >= 7 },
  { id: 'trilingue', icon: '🌍', t: { fr: 'Touche-à-tout', en: 'All-rounder', zh: zh('样样都会', 'yàng yàng dōu huì') }, d: { fr: 'Joue aux 3 matières le même jour', en: 'Play all 3 subjects in one day', zh: zh('同一天玩3门课', 'tóng yì tiān wán mén kè') }, ok: () => S('allSubjectsDay') >= 1 },
  { id: 'artiste', icon: '🎨', t: { fr: 'Artiste', en: 'Artist', zh: zh('小画家', 'xiǎo huà jiā') }, d: { fr: 'Termine 3 projets d’arts', en: 'Finish 3 art projects', zh: zh('完成3个美术作品', 'wán chéng gè měi shù zuò pǐn') }, ok: () => Object.keys(store.arts.done).length >= 3 },
  { id: 'artiste20', icon: '🖼️', t: { fr: 'Grand artiste', en: 'Great artist', zh: zh('大画家', 'dà huà jiā') }, d: { fr: 'Termine 20 projets d’arts', en: 'Finish 20 art projects', zh: zh('完成20个美术作品', 'wán chéng gè měi shù zuò pǐn') }, ok: () => Object.keys(store.arts.done).length >= 20 },
  { id: 'curieux', icon: '🔭', t: { fr: 'Curieux', en: 'Curious', zh: zh('好奇宝宝', 'hào qí bǎo bao') }, d: { fr: 'Découvre 10 « Pourquoi? »', en: 'Discover 10 “Why?”', zh: zh('发现10个为什么', 'fā xiàn gè wèi shén me') }, ok: () => Object.keys(store.why || {}).length >= 10 },
  { id: 'savant', icon: '🧪', t: { fr: 'Petit savant', en: 'Little scientist', zh: zh('小科学家', 'xiǎo kē xué jiā') }, d: { fr: 'Découvre 50 « Pourquoi? »', en: 'Discover 50 “Why?”', zh: zh('发现50个为什么', 'fā xiàn gè wèi shén me') }, ok: () => Object.keys(store.why || {}).length >= 50 },
  { id: 'panda', icon: '🐼', t: { fr: 'Petit panda', en: 'Little panda', zh: zh('小熊猫', 'xiǎo xióng māo') }, d: { fr: 'Gagne 20 étoiles en chinois', en: 'Earn 20 stars in Chinese', zh: zh('中文得到20颗星', 'zhōng wén dé dào kē xīng') }, ok: () => Object.entries(store.progress).filter(([k]) => /^c\d+$/.test(k)).reduce((a, [, v]) => a + Object.values(v).reduce((b, x) => b + (x.stars || 0), 0), 0) >= 20 },
  { id: 'lecteur', icon: '📚', t: { fr: 'Lecteur', en: 'Reader', zh: zh('小读者', 'xiǎo dú zhě') }, d: { fr: 'Lis 3 livres', en: 'Read 3 books', zh: zh('读完3本书', 'dú wán běn shū') }, ok: () => Object.keys(store.books || {}).length >= 3 },
  { id: 'bibliotheque', icon: '📖', t: { fr: 'Rat de bibliothèque', en: 'Bookworm', zh: zh('书虫', 'shū chóng') }, d: { fr: 'Lis les 10 livres', en: 'Read all 10 books', zh: zh('读完10本书', 'dú wán běn shū') }, ok: () => Object.keys(store.books || {}).length >= 10 },
  { id: 'shop', icon: '🛍️', t: { fr: 'Coquet', en: 'Stylish', zh: zh('爱打扮', 'ài dǎ bàn') }, d: { fr: 'Achète un accessoire', en: 'Buy an accessory', zh: zh('买一个装饰', 'mǎi yí gè zhuāng shì') }, ok: () => store.owned.length >= 1 },
  { id: 'missions', icon: '🎯', t: { fr: 'Mission accomplie', en: 'Mission done', zh: zh('完成任务', 'wán chéng rèn wù') }, d: { fr: 'Réussis 10 missions', en: 'Complete 10 missions', zh: zh('完成10个任务', 'wán chéng gè rèn wù') }, ok: () => S('missions') >= 10 },
];
// Returns newly earned badges (and records them).
export function checkBadges() {
  const fresh = BADGES.filter((b) => !store.badges.includes(b.id) && b.ok());
  for (const b of fresh) { store.badges.push(b.id); addCoins(10); }
  return fresh;
}

// ---------- shop: owl accessories ----------
export const SLOTS = {
  hat: { fr: 'Chapeaux', en: 'Hats' },
  eyes: { fr: 'Lunettes', en: 'Glasses' },
  neck: { fr: 'Au cou', en: 'Neck' },
  hand: { fr: 'Dans l’aile', en: 'In the wing' },
  aura: { fr: 'Magie', en: 'Magic' },
};
export const SHOP = [
  { id: 'cap', slot: 'hat', e: '🧢', price: 20 },
  { id: 'bow', slot: 'hat', e: '🎀', price: 20 },
  { id: 'flower', slot: 'hat', e: '🌸', price: 25 },
  { id: 'tuque', slot: 'hat', e: '⛑️', price: 40 },
  { id: 'cowboy', slot: 'hat', e: '🤠', price: 60, face: true },
  { id: 'grad', slot: 'hat', e: '🎓', price: 80 },
  { id: 'tophat', slot: 'hat', e: '🎩', price: 100 },
  { id: 'crown', slot: 'hat', e: '👑', price: 150 },
  { id: 'glasses', slot: 'eyes', e: '👓', price: 30 },
  { id: 'sun', slot: 'eyes', e: '🕶️', price: 50 },
  { id: 'goggles', slot: 'eyes', e: '🥽', price: 70 },
  { id: 'scarf', slot: 'neck', e: '🧣', price: 30 },
  { id: 'medal', slot: 'neck', e: '🏅', price: 80 },
  { id: 'daisy', slot: 'neck', e: '🌼', price: 25 },
  { id: 'balloon', slot: 'hand', e: '🎈', price: 20 },
  { id: 'lolly', slot: 'hand', e: '🍭', price: 25 },
  { id: 'puck', slot: 'hand', e: '🏒', price: 40 },
  { id: 'ball', slot: 'hand', e: '⚽', price: 40 },
  { id: 'guitar', slot: 'hand', e: '🎸', price: 70 },
  { id: 'wand', slot: 'hand', e: '🪄', price: 90 },
  { id: 'scope', slot: 'hand', e: '🔭', price: 110 },
  { id: 'sparkle', slot: 'aura', e: '✨', price: 60 },
  { id: 'hearts', slot: 'aura', e: '💖', price: 60 },
  { id: 'snow', slot: 'aura', e: '❄️', price: 60 },
  { id: 'leaves', slot: 'aura', e: '🍁', price: 60 },
  { id: 'rainbow', slot: 'aura', e: '🌈', price: 120 },
].filter((x) => !x.face); // cowboy covers the face: dropped
export function buy(id) {
  const it = SHOP.find((x) => x.id === id);
  if (!it || store.owned.includes(id) || store.coins < it.price) return false;
  store.coins -= it.price;
  store.owned.push(id);
  store.wear[it.slot] = id;
  save();
  return true;
}
export function toggleWear(id) {
  const it = SHOP.find((x) => x.id === id);
  if (!it || !store.owned.includes(id)) return;
  store.wear[it.slot] = store.wear[it.slot] === id ? null : id;
  save();
}

// Owl with the accessories it wears. extra = { [slot]: id } to preview.
export function dressedOwl(cls = '', extra = {}) {
  const wear = { ...store.wear, ...extra };
  const n = el('div', { class: `owl dressed ${cls}`, html: OWL });
  for (const [slot, id] of Object.entries(wear)) {
    const it = SHOP.find((x) => x.id === id);
    if (!it) continue;
    if (slot === 'aura') for (let i = 0; i < 5; i++) n.append(el('span', { class: `acc aura a${i}` }, it.e));
    else n.append(el('span', { class: `acc ${slot}` }, it.e));
  }
  return n;
}

// ---------- juice ----------
export function confetti(n = 26, origin = null) {
  const layer = el('div', { class: 'confetti' });
  const cols = ['#ff5d8f', '#4f8ef7', '#2fb36f', '#ffd23f', '#ff9f43', '#a66cff'];
  const ox = origin ? origin.x : innerWidth / 2, oy = origin ? origin.y : innerHeight / 3;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 260;
    const p = el('i', { style: { left: `${ox}px`, top: `${oy}px`, background: cols[i % cols.length], '--dx': `${Math.cos(a) * d}px`, '--dy': `${Math.sin(a) * d - 120}px`, '--r': `${Math.random() * 720 - 360}deg`, animationDelay: `${Math.random() * 80}ms` } });
    layer.append(p);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 1500);
}
export function floatText(txt, x, y, cls = '') {
  const n = el('div', { class: `float-txt ${cls}`, style: { left: `${x}px`, top: `${y}px` } }, txt);
  document.body.append(n);
  setTimeout(() => n.remove(), 1300);
}
export function toast(icon, title, sub = '') {
  const n = el('div', { class: 'toast' }, el('span', { class: 'toast-i' }, icon), el('div', {}, el('b', {}, tr(title)), sub ? el('div', {}, tr(sub)) : null));
  document.body.append(n);
  sfx('star');
  setTimeout(() => n.classList.add('out'), 2600);
  setTimeout(() => n.remove(), 3100);
}
export function showBadges(list) {
  list.forEach((b, i) => setTimeout(() => toast(b.icon, { fr: `Badge : ${b.t.fr}`, en: `Badge: ${b.t.en}`, zh: zh(`徽章：${b.t.zh.hz}`, `huī zhāng ${b.t.zh.py}`) }, b.d), 400 + i * 1200));
}
