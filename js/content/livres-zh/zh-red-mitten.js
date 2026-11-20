// zh-red-mitten — 红手套 (level 1). Pictures: ./art/zh-red-mitten.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-red-mitten.js';

export const book = {
  id: 'zh-red-mitten',
  title: '红手套',
  titleZh: Z('红(hóng)手套(shǒu tào)'),
  emoji: '🧤',
  level: 1,
  minutes: 3,
  cover: pics[0],
  pages: [
    P(pics[1], '冬天(dōng tiān)，小雨(xiǎo yǔ)有(yǒu)一(yì)双(shuāng)红(hóng)手套(shǒu tào)。她(tā)很(hěn)喜欢(xǐ huan)它们(tā men)，每天(měi tiān)都(dōu)戴(dài)着(zhe)。'),
    P(pics[2], '今天(jīn tiān)，她(tā)和(hé)弟弟(dì di)去(qù)公园(gōng yuán)玩(wán)。公园(gōng yuán)里(li)有(yǒu)很(hěn)多(duō)雪(xuě)，他们(tā men)玩得(wán de)很(hěn)开心(kāi xīn)。'),
    P(pics[3], '回家(huí jiā)的(de)时候(shí hou)，小雨(xiǎo yǔ)看看(kàn kan)手(shǒu)。哎呀(āi yā)！只有(zhǐ yǒu)一(yì)只(zhī)手套(shǒu tào)！另(lìng)一(yì)只(zhī)不(bú)见(jiàn)了(le)！'),
    P(pics[4], '小雨(xiǎo yǔ)很(hěn)难过(nán guò)。弟弟(dì di)说(shuō)：“别(bié)哭(kū)，我们(wǒ men)回去(huí qù)找(zhǎo)！”他们(tā men)走(zǒu)回(huí)公园(gōng yuán)。'),
    P(pics[5], '他们(tā men)在(zài)雪地(xuě dì)上(shang)找(zhǎo)。找(zhǎo)呀(ya)找(zhǎo)，没有(méi yǒu)！小雨(xiǎo yǔ)问(wèn)小鸟(xiǎo niǎo)：“你(nǐ)看见(kàn jiàn)我(wǒ)的(de)手套(shǒu tào)了(le)吗(ma)？”'),
    P(pics[6], '小鸟(xiǎo niǎo)说(shuō)：“对不起(duì bu qǐ)，没有(méi yǒu)。你(nǐ)去(qù)问问(wèn wen)小松鼠(xiǎo sōng shǔ)吧(ba)，它(tā)在(zài)大树(dà shù)上(shang)。”'),
    P(pics[7], '小松鼠(xiǎo sōng shǔ)说(shuō)：“我(wǒ)看见(kàn jiàn)了(le)！它(tā)在(zài)雪人(xuě rén)那里(nà li)。”小雨(xiǎo yǔ)和(hé)弟弟(dì di)跑(pǎo)过去(guò qu)。'),
    P(pics[8], '雪人(xuě rén)的(de)手(shǒu)上(shang)，有(yǒu)一(yì)只(zhī)红(hóng)手套(shǒu tào)！原来(yuán lái)有人(yǒu rén)捡到(jiǎn dào)它(tā)，放(fàng)在(zài)这里(zhè li)。'),
    P(pics[9], '小雨(xiǎo yǔ)说(shuō)：“谢谢(xiè xie)你(nǐ)，雪人(xuě rén)！”她(tā)拿(ná)回(huí)了(le)手套(shǒu tào)，两(liǎng)只(zhī)手(shǒu)都(dōu)暖和(nuǎn huo)了(le)。'),
    P(pics[10], '回家(huí jiā)的(de)路(lù)上(shang)，弟弟(dì di)说(shuō)：“姐姐(jiě jie)，别(bié)再(zài)丢(diū)了(le)！”小雨(xiǎo yǔ)笑(xiào)着(zhe)说(shuō)：“好(hǎo)，我(wǒ)会(huì)小心(xiǎo xīn)！”'),
  ],
  words: [
    W('手套(shǒu tào)', '冬天(dōng tiān)戴(dài)在(zài)手(shǒu)上(shang)，手(shǒu)就(jiù)不(bù)冷(lěng)了(le)。', '🧤'),
    W('公园(gōng yuán)', '大家(dà jiā)去(qù)玩(wán)的(de)地方(dì fang)。', '🏞️'),
    W('难过(nán guò)', '心里(xīn li)不(bù)高兴(gāo xìng)。', '😢'),
    W('小鸟(xiǎo niǎo)', '会(huì)飞(fēi)，会(huì)唱歌(chàng gē)的(de)小(xiǎo)动物(dòng wù)。', '🐦'),
    W('松鼠(sōng shǔ)', '住(zhù)在(zài)树(shù)上(shang)，尾巴(wěi ba)大大(dà dà)的(de)。', '🐿️'),
    W('暖和(nuǎn huo)', '不(bù)冷(lěng)，很(hěn)舒服(shū fu)。', '☀️'),
  ],
  quiz: [
    Q('小雨(xiǎo yǔ)的(de)手套(shǒu tào)是(shì)什么(shén me)颜色(yán sè)？', ['红色(hóng sè)', '蓝色(lán sè)', '黄色(huáng sè)'], 0),
    Q('他们(tā men)去(qù)哪里(nǎ li)玩(wán)？', ['公园(gōng yuán)', '学校(xué xiào)', '商店(shāng diàn)'], 0),
    Q('小雨(xiǎo yǔ)发现(fā xiàn)了(le)什么(shén me)？', ['手套(shǒu tào)不见(bú jiàn)了(le)', '帽子(mào zi)不见(bú jiàn)了(le)', '弟弟(dì di)不见(bú jiàn)了(le)'], 0),
    Q('小鸟(xiǎo niǎo)叫(jiào)小雨(xiǎo yǔ)去(qù)问(wèn)谁(shuí)？', ['小松鼠(xiǎo sōng shǔ)', '小猫(xiǎo māo)', '小狗(xiǎo gǒu)'], 0),
    Q('红(hóng)手套(shǒu tào)在(zài)哪里(nǎ li)？', ['雪人(xuě rén)的(de)手(shǒu)上(shang)', '大树(dà shù)上(shang)', '小鸟(xiǎo niǎo)的(de)家(jiā)里(li)'], 0),
    Q('最后(zuì hòu)，小雨(xiǎo yǔ)说(shuō)什么(shén me)？', ['我(wǒ)会(huì)小心(xiǎo xīn)', '我(wǒ)不要(bú yào)手套(shǒu tào)', '我(wǒ)不(bù)喜欢(xǐ huan)雪(xuě)'], 0),
  ],
};
