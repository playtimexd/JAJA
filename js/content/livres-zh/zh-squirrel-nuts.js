// zh-squirrel-nuts — 松鼠存果子 (level 1). Pictures: ./art/zh-squirrel-nuts.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-squirrel-nuts.js';

export const book = {
  id: 'zh-squirrel-nuts',
  title: '小松鼠存果子',
  titleZh: Z('小(xiǎo)松鼠(sōng shǔ)存(cún)果子(guǒ zi)'),
  emoji: '🐿️',
  level: 1,
  minutes: 3,
  cover: pics[0],
  pages: [
    P(pics[1], '秋天(qiū tiān)到(dào)了(le)，树叶(shù yè)红(hóng)了(le)，黄(huáng)了(le)。小松鼠(xiǎo sōng shǔ)在(zài)树(shù)上(shang)看(kàn)来(lái)看(kàn)去(qù)。'),
    P(pics[2], '树(shù)下(xià)有(yǒu)很(hěn)多(duō)果子(guǒ zi)。小松鼠(xiǎo sōng shǔ)说(shuō)：“真(zhēn)好(hǎo)！我(wǒ)要(yào)把(bǎ)它们(tā men)带(dài)回(huí)家(jiā)。”'),
    P(pics[3], '小松鼠(xiǎo sōng shǔ)捡(jiǎn)呀(ya)捡(jiǎn)，一(yí)个(gè)，两(liǎng)个(gè)，三(sān)个(gè)。篮子(lán zi)里(li)有(yǒu)十(shí)个(gè)果子(guǒ zi)了(le)。'),
    P(pics[4], '小鸟(xiǎo niǎo)飞(fēi)过来(guò lai)，说(shuō)：“你(nǐ)为什么(wèi shén me)捡(jiǎn)这么(zhè me)多(duō)果子(guǒ zi)？天(tiān)还(hái)很(hěn)热(rè)呢(ne)！”'),
    P(pics[5], '小松鼠(xiǎo sōng shǔ)说(shuō)：“冬天(dōng tiān)会(huì)下雪(xià xuě)，到(dào)时候(shí hou)，树上(shù shang)没有(méi yǒu)果子(guǒ zi)，我(wǒ)就(jiù)会(huì)饿(è)。”'),
    P(pics[6], '他(tā)把(bǎ)果子(guǒ zi)放(fàng)在(zài)树洞(shù dòng)里(li)。树洞(shù dòng)是(shì)他(tā)的(de)家(jiā)，又(yòu)黑(hēi)又(yòu)暖和(nuǎn huo)。'),
    P(pics[7], '小鸟(xiǎo niǎo)玩(wán)了(le)一(yí)个(gè)秋天(qiū tiān)，没有(méi yǒu)存(cún)果子(guǒ zi)。他(tā)唱歌(chàng gē)，跳舞(tiào wǔ)，玩得(wán de)很(hěn)开心(kāi xīn)。'),
    P(pics[8], '冬天(dōng tiān)真(zhēn)的(de)来(lái)了(le)。下(xià)大雪(dà xuě)了(le)，树上(shù shang)白(bái)白(bái)的(de)。小鸟(xiǎo niǎo)找(zhǎo)不(bú)到(dào)吃(chī)的(de)，肚子(dù zi)咕咕(gū gū)叫(jiào)。'),
    P(pics[9], '小松鼠(xiǎo sōng shǔ)听见(tīng jiàn)了(le)，说(shuō)：“小鸟(xiǎo niǎo)，来(lái)我(wǒ)家(jiā)吧(ba)！”他(tā)拿出(ná chū)好(hǎo)多(duō)果子(guǒ zi)，和(hé)小鸟(xiǎo niǎo)一起(yì qǐ)吃(chī)。'),
    P(pics[10], '小鸟(xiǎo niǎo)红(hóng)着(zhe)脸(liǎn)说(shuō)：“对不起(duì bu qǐ)，你(nǐ)是(shì)对(duì)的(de)。明年(míng nián)秋天(qiū tiān)，我(wǒ)也(yě)要(yào)存(cún)果子(guǒ zi)！”他们(tā men)都(dōu)笑(xiào)了(le)。'),
  ],
  words: [
    W('秋天(qiū tiān)', '树叶(shù yè)变(biàn)红(hóng)变(biàn)黄(huáng)的(de)时候(shí hou)。', '🍂'),
    W('果子(guǒ zi)', '树(shù)上(shang)长(zhǎng)出(chū)来(lái)的(de)，可以(kě yǐ)吃(chī)。', '🌰'),
    W('篮子(lán zi)', '用(yòng)来(lái)装(zhuāng)东西(dōng xi)的(de)东西(dōng xi)。', '🧺'),
    W('树洞(shù dòng)', '大树(dà shù)里(li)面(mian)的(de)小(xiǎo)房子(fáng zi)。', '🌳'),
    W('肚子(dù zi)', '吃(chī)东西(dōng xi)以后(yǐ hòu)，吃(chī)的(de)东西(dōng xi)在(zài)这里(zhè li)。', '😋'),
    W('存(cún)', '先(xiān)放(fàng)好(hǎo)，以后(yǐ hòu)再(zài)用(yòng)。', '📦'),
  ],
  quiz: [
    Q('小松鼠(xiǎo sōng shǔ)在(zài)秋天(qiū tiān)做(zuò)什么(shén me)？', ['捡(jiǎn)果子(guǒ zi)', '睡觉(shuì jiào)', '游泳(yóu yǒng)'], 0),
    Q('篮子(lán zi)里(li)有(yǒu)几(jǐ)个(gè)果子(guǒ zi)？', ['十(shí)个(gè)', '三(sān)个(gè)', '一(yì)个(gè)'], 0),
    Q('小松鼠(xiǎo sōng shǔ)的(de)家(jiā)在(zài)哪里(nǎ li)？', ['树洞(shù dòng)里(li)', '河(hé)里(li)', '山(shān)下(xià)'], 0),
    Q('小松鼠(xiǎo sōng shǔ)为什么(wèi shén me)存(cún)果子(guǒ zi)？', ['冬天(dōng tiān)没有(méi yǒu)吃(chī)的(de)', '他(tā)喜欢(xǐ huan)玩(wán)', '小鸟(xiǎo niǎo)叫(jiào)他(tā)存(cún)'], 0),
    Q('冬天(dōng tiān)来(lái)了(le)，小鸟(xiǎo niǎo)怎么(zěn me)了(le)？', ['肚子(dù zi)饿(è)了(le)', '很(hěn)热(rè)', '睡着(shuì zháo)了(le)'], 0),
    Q('小松鼠(xiǎo sōng shǔ)最后(zuì hòu)做(zuò)了(le)什么(shén me)？', ['和(hé)小鸟(xiǎo niǎo)一起(yì qǐ)吃(chī)果子(guǒ zi)', '自己(zì jǐ)吃(chī)完(wán)了(le)', '把(bǎ)小鸟(xiǎo niǎo)赶走(gǎn zǒu)了(le)'], 0),
  ],
};
