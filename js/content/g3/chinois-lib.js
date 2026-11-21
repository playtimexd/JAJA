// Shared helpers for the 3e année Chinese units (g3c1…): question builders, pinyin tone tools, say collection.
import { makeRng } from '../../util.js';
import { isHan, hanLen } from './chinois-vocab.js';
export { isHan, hanLen };

export const ZH = 'zh-CN';
export const say = (text) => ({ text, lang: ZH });
export const T = (fr, en) => ({ fr, en });
// Chinese text with pinyin (everything the child sees in the « Chinese zone »). HC joins {hz,py} parts and plain strings
// that hold no Han characters (pinyin, numbers, punctuation): HC(w, H('读作', 'dú zuò'), ` ${w.py}。`).
export const H = (hz, py) => ({ hz, py });
export const HC = (...parts) => ({ hz: parts.map((p) => (typeof p === 'string' ? p : p.hz)).join(''), py: parts.filter((p) => typeof p !== 'string' && p.py).map((p) => p.py).join(' ') });
export const hand = (o) => ({ type: 'hand', lang: 'zh', ...o });
export const hz = (h, p, extra = {}) => ({ hz: h, py: p, ...extra });
export const label = (x) => (x.hz || '') + (x.emoji || '') + (x.svg || '') + (x.hz ? '' : JSON.stringify(x.text ?? x.py ?? ''));
export const uniq = (arr) => { const s = new Set(); return arr.filter((x) => { const k = label(x); if (s.has(k)) return false; s.add(k); return true; }); };
export const mc = (key, prompt, right, wrong, extra = {}) => ({ type: 'choice', key, prompt, options: uniq([right, ...wrong]), answer: 0, ...extra });
export const take = (R, a, n) => R.sample(a, Math.min(n, a.length));
export const nOpt = (L) => (L === 1 ? 2 : 3); // number of wrong options: 3 / 4 / 4 options
export const chk = (h, p, where) => { if (hanLen(h) !== p.trim().split(/\s+/).length) throw new Error(`pinyin mismatch ${where}: ${h} / ${p}`); };

// "hz|py" lines → [{hz, py}], one pinyin syllable per Han character, no duplicates
export function parse(txt, where) {
  const seen = new Set();
  return txt.trim().split('\n').map((l) => {
    const [h, p] = l.split('|').map((s) => s.trim());
    if (!h || !p) throw new Error(`bad line in ${where}: ${l}`);
    chk(h, p, where);
    if (seen.has(h)) throw new Error(`duplicate in ${where}: ${h}`);
    seen.add(h);
    return { hz: h, py: p };
  });
}

/* ---------- pinyin tools ---------- */
const MARKS = { a: 'āáǎà', o: 'ōóǒò', e: 'ēéěè', i: 'īíǐì', u: 'ūúǔù', v: 'ǖǘǚǜ' };
const UNM = {};
for (const k of Object.keys(MARKS)) [...MARKS[k]].forEach((c, i) => { UNM[c] = [k, i + 1]; });
export function split(syl) { let base = '', tone = 0; for (const c of syl) { if (UNM[c]) { base += UNM[c][0]; tone = UNM[c][1]; } else base += c === 'ü' ? 'v' : c; } return { base, tone }; }
export function mark(base, tone) {
  const ch = [...base];
  if (tone) {
    let i = ch.indexOf('a'); if (i < 0) i = ch.indexOf('e'); if (i < 0) i = ch.indexOf('o');
    if (i < 0) for (let k = ch.length - 1; k >= 0; k--) if ('iuv'.includes(ch[k])) { i = k; break; }
    if (i >= 0) ch[i] = MARKS[ch[i]][tone - 1];
  }
  return ch.join('').replace(/v/g, 'ü');
}
export const tone = (syl) => split(syl).tone;
export const withTone = (syl, t) => mark(split(syl).base, t);
// strings that change exactly one marked syllable's tone
export function variants(py) {
  const s = py.split(' '), out = new Set();
  s.forEach((syl, i) => { const { base, tone: t0 } = split(syl); if (!t0) return; if (s.length > 1 && (base === 'yi' || base === 'bu')) return; for (let t = 1; t <= 4; t++) if (t !== t0) { const c = s.slice(); c[i] = mark(base, t); out.add(c.join(' ')); } });
  out.delete(py);
  return [...out];
}
// "dǎ sǎo" → shown to the child; wrong pinyin options for a whole word / syllable
export function pyWrong(R, py, n) {
  const v = variants(py);
  const s = py.split(' ');
  if (s.length > 1) { // also change two syllables at once
    const { base, tone: t0 } = split(s[0]); const { base: b1, tone: t1 } = split(s[1]);
    if (t0 && t1 && !['yi','bu'].includes(base) && !['yi','bu'].includes(b1)) { const t = R.pick([1, 2, 3, 4].filter((x) => x !== t0)); const u = R.pick([1, 2, 3, 4].filter((x) => x !== t1)); const c = s.slice(); c[0] = mark(base, t); c[1] = mark(b1, u); v.push(c.join(' ')); }
  }
  return take(R, [...new Set(v)].filter((x) => x !== py), n);
}
export const pyOpt = (py) => ({ py });

// Build question lists: a unit with `generate` only gets an automatic allSay by sampling
export function collectSay(unit, perLevel = 500) {
  const seen = new Map();
  const R = makeRng(4242);
  const add = (s) => { if (s && s.text) seen.set(s.lang + '|' + s.text, s); };
  const scan = (q) => {
    add(q.say);
    for (const o of q.options || []) add(o.say);
    for (const it of q.items || []) add(it.say);
  };
  for (const level of [1, 2, 3]) for (let i = 0; i < perLevel; i++) { try { scan(unit.generate(level, R)); } catch { /* skip */ } }
  if (unit.session) for (const level of [1, 2, 3]) for (let i = 0; i < 60; i++) { try { unit.session(level, R).forEach(scan); } catch { /* skip */ } }
  return [...seen.values()];
}
export const finish = (u) => { if (!u.allSay) u.allSay = function () { return collectSay(this); }; return u; };
export const lv = (L) => ([1, 2, 3].includes(L) ? L : 2);

/* ---------- shape-alike characters (also used for distractors in the vocabulary units) ---------- */
export const LOOK = `
日 rì|目 mù|白 bái|百 bǎi|自 zì
人 rén|入 rù|八 bā
大 dà|太 tài|犬 quǎn|天 tiān
请 qǐng|清 qīng|晴 qíng|情 qíng|睛 jīng|青 qīng
休 xiū|体 tǐ
千 qiān|干 gān|于 yú
未 wèi|末 mò|木 mù|本 běn
午 wǔ|牛 niú
间 jiān|问 wèn|闻 wén|闭 bì|闪 shǎn
河 hé|何 hé|可 kě
刀 dāo|力 lì|办 bàn
田 tián|由 yóu|甲 jiǎ|申 shēn
见 jiàn|贝 bèi
住 zhù|主 zhǔ|往 wǎng
玩 wán|完 wán
己 jǐ|已 yǐ
买 mǎi|卖 mài
在 zài|再 zài
找 zhǎo|我 wǒ
租 zū|组 zǔ
拔 bá|拨 bō
推 tuī|堆 duī|准 zhǔn
`.trim().split('\n').map((l) => l.split('|').map((s) => { const [h, p] = s.trim().split(' '); return { hz: h, py: p }; }));
export const LOOKMAP = {};
for (const g of LOOK) for (const c of g) LOOKMAP[c.hz] = g;
