# Pinyin + word segmentation for « Pourquoi? » Chinese strings (pypinyin + jieba from localvoice/.venv, with polyphone and 一/不 tone-change rules).
# echo ["猎豹跑得很快。"] | localvoice/.venv/Scripts/python.exe -I -X utf8 tools/why-pinyin.py  →  {text: {py, w, syl}}
import sys, json, jieba, logging
jieba.setLogLevel(logging.ERROR)
from pypinyin import lazy_pinyin, Style
HAN = lambda c: '\u4e00' <= c <= '\u9fff' or '\u3400' <= c <= '\u4dbf'
NUMC = set('零一二三四五六七八九十百千万亿两第')
def tone(s):
    for c, t in (('āēīōūǖ', 1), ('áéíóúǘ', 2), ('ǎěǐǒǔǚ', 3), ('àèìòùǜ', 4)):
        if any(x in s for x in c): return t
    return 0
FIX = {'长得': ['zhǎng', 'de'], '长大': ['zhǎng', 'dà'], '一样': ['yí', 'yàng'], '一下': ['yí', 'xià'], '一个': ['yí', 'gè'], '为了': ['wèi', 'le'], '因为': ['yīn', 'wèi'], '成为': ['chéng', 'wéi'], '认为': ['rèn', 'wéi'], '称为': ['chēng', 'wéi'], '叫做': ['jiào', 'zuò'], '睡着': ['shuì', 'zháo'], '觉得': ['jué', 'de'], '记得': ['jì', 'de'], '地球': ['dì', 'qiú'], '地方': ['dì', 'fang'], '东西': ['dōng', 'xi'], '时候': ['shí', 'hou'], '朋友': ['péng', 'you'], '告诉': ['gào', 'su'], '知道': ['zhī', 'dào'], '还是': ['hái', 'shì'], '还有': ['hái', 'yǒu'], '还会': ['hái', 'huì'], '还能': ['hái', 'néng'], '头发': ['tóu', 'fa'], '出发': ['chū', 'fā'], '重要': ['zhòng', 'yào'], '重量': ['zhòng', 'liàng'], '一点': ['yì', 'diǎn'], '打喷嚏': ['dǎ', 'pēn', 'tì'], '喷嚏': ['pēn', 'tì'], '骨头': ['gǔ', 'tou'], '石头': ['shí', 'tou'], '舌头': ['shé', 'tou'], '尾巴': ['wěi', 'ba'], '嘴巴': ['zuǐ', 'ba'], '眼睛': ['yǎn', 'jing'], '耳朵': ['ěr', 'duo'], '月亮': ['yuè', 'liang'], '漂亮': ['piào', 'liang'], '暖和': ['nuǎn', 'huo'], '衣服': ['yī', 'fu'], '先生': ['xiān', 'sheng'], '兄弟': ['xiōng', 'dì'], '空气': ['kōng', 'qì'], '太空': ['tài', 'kōng'], '天空': ['tiān', 'kōng'], '大量': ['dà', 'liàng'], '数量': ['shù', 'liàng'], '能量': ['néng', 'liàng'], '种子': ['zhǒng', 'zi'], '种类': ['zhǒng', 'lèi'], '降落': ['jiàng', 'luò'], '下降': ['xià', 'jiàng'], '转动': ['zhuàn', 'dòng'], '旋转': ['xuán', 'zhuǎn'], '自转': ['zì', 'zhuàn'], '公转': ['gōng', 'zhuàn'], '弹簧': ['tán', 'huáng'], '子弹': ['zǐ', 'dàn'], '背部': ['bèi', 'bù'], '差不多': ['chà', 'bu', 'duō'], '只有': ['zhǐ', 'yǒu'], '一只': ['yì', 'zhī'], '两只': ['liǎng', 'zhī'], '几只': ['jǐ', 'zhī'], '藏起来': ['cáng', 'qǐ', 'lái'], '躲藏': ['duǒ', 'cáng'], '行星': ['xíng', 'xīng'], '银行': ['yín', 'háng'], '飞行': ['fēi', 'xíng'], '和平': ['hé', 'píng'], '似的': ['shì', 'de']}
def py_of(s):
    out = lazy_pinyin(s, style=Style.TONE, errors=lambda x: [None] * len(x))
    if len(out) != len(s):  # fallback per char
        out = [lazy_pinyin(c, style=Style.TONE, errors=lambda x: [None])[0] if HAN(c) else None for c in s]
    return out
def run(s):
    toks = jieba.lcut(s, HMM=False)
    syl = py_of(s)
    # phrase fixes on token level
    pos = 0
    for t in toks:
        for k, v in FIX.items():
            i = t.find(k)
            while i >= 0:
                for j, p in enumerate(v): syl[pos + i + j] = p
                i = t.find(k, i + 1)
        pos += len(t)
    for i, c in enumerate(s):
        if not HAN(c): syl[i] = None; continue
        nxt = s[i + 1] if i + 1 < len(s) else ''
        prv = s[i - 1] if i > 0 else ''
        if c == '一' and HAN(nxt) and nxt not in NUMC and prv not in NUMC and nxt not in '月号日':
            t = tone(syl[i + 1] or '')
            syl[i] = 'yí' if t == 4 or (t == 0 and nxt in '个') else 'yì'
        if c == '一' and (not HAN(nxt) or prv in NUMC or nxt in NUMC): syl[i] = 'yī'
        if c == '不' and HAN(nxt):
            syl[i] = 'bú' if tone(syl[i + 1] or '') == 4 else 'bù'
        if c == '得' and syl[i] == 'dé' and HAN(prv) and nxt not in '到分奖意出' and (prv + c) not in ('获得', '取得', '赢得', '值得', '难得', '懂得', '记得', '觉得'):
            syl[i] = 'de'
    for i, c in enumerate(s):
        if not HAN(c): continue
        nxt = s[i + 1] if i + 1 < len(s) else '#'
        prv = s[i - 1] if i > 0 else '#'
        n2 = s[i + 1:i + 3]
        if c == '长':
            r = 'cháng'
            if nxt in '大出成满着高好得开回到在上角': r = 'zhǎng'
            if prv in '生成增船校家队部市': r = 'zhǎng'
            if prv in '在会能再始新慢不要' and (not HAN(nxt) or nxt == '了'): r = 'zhǎng'
            if nxt.isdigit() and prv in '晚约才多能每': r = 'zhǎng'
            if nxt == '长' and prv in '发甲头': r = 'zhǎng'
            if nxt == '越' or s[i + 1:i + 4] == '什么样' or (prv == '上' and not HAN(nxt)) or s[max(0, i - 2):i] in ('身体', '个子'): r = 'zhǎng'
            if n2 == '多少' or (prv == '经' and nxt == '了') or n2 == '身体' or (prv == '上' and nxt == '的'): r = 'zhǎng'
            if prv in '变又延' or s[i:i + 3] in ('长颈鹿',) or nxt in '度途期达': r = 'cháng'
            syl[i] = r
        elif c == '和': syl[i] = 'huo' if prv == '暖' else 'hé'
        elif c == '都': syl[i] = 'dū' if prv in '首成京' or nxt == '市' else 'dōu'
        elif c == '倒' and (prv in '咬推摔撞绊吹压砍跌打' or nxt == '下'): syl[i] = 'dǎo'
        elif c == '处': syl[i] = 'chǔ' if nxt == '理' else 'chù'
        elif c == '干': syl[i] = 'gàn' if (prv in '树主骨躯' or nxt in '什活吗嘛') else 'gān'
        elif c == '弹': syl[i] = 'dàn' if (prv in '子炸导炮' ) else 'tán'
        elif c == '扇': syl[i] = 'shàn' if (prv in '风一' or nxt in '门子') else 'shān'
        elif c == '片': syl[i] = 'piàn'
        elif c == '着':
            syl[i] = 'zháo' if prv in '睡' or s[max(0,i-2):i] in ('睡不', '够得') or nxt in '急凉火迷' else 'zhuó' if (prv in '附穿' or nxt in '陆地') else 'zhe'
        elif c == '种': syl[i] = 'zhòng' if nxt in '树花菜地下子' and prv not in '这那哪一各几多每两三某同不' and not (nxt == '子') else ('zhǒng' if nxt != '子' or prv in '这那哪' else syl[i])
        elif c == '调': syl[i] = 'diào' if (prv in '变声音语曲' or nxt in '查') else 'tiáo'
        elif c == '还': syl[i] = 'huán' if (nxt in '原' or prv in '归偿') else 'hái'
        elif c == '教': syl[i] = 'jiào' if nxt in '室练授育学师' or prv in '请' else 'jiāo'
        elif c == '相' and nxt in '近同似反互信比遇撞连': syl[i] = 'xiāng'
        elif c == '行' and nxt in '驶走星动为李程人进': syl[i] = 'xíng'
        elif c == '量' and nxt in '出一体': syl[i] = 'liáng'
        elif c == '空' and prv == '育': syl[i] = 'kōng'
        elif c == '当' and s[i:i + 3] == '当月亮': syl[i] = 'dāng'
        elif c == '得' and nxt in '走去等用' and prv in '还又就': syl[i] = 'děi'
        elif c == '更' and s[i:i + 3] == '更新鲜': syl[i] = 'gèng'
    pos = 0
    for t in toks:
        if t == '地':
            nxt = s[pos + 1] if pos + 1 < len(s) else ''
            syl[pos] = 'dì' if (nxt in '上下里面底球区方震图' or pos == 0 or not HAN(s[pos - 1])) else 'de'
        pos += len(t)
    w = []
    for t in toks:
        # split mixed tokens: digits/latin chunk vs han
        w.append(len(t))
    return {'py': ' '.join(p for p in syl if p), 'w': w, 'syl': syl}
data = json.load(sys.stdin)
json.dump({s: run(s) for s in data}, sys.stdout, ensure_ascii=False)
