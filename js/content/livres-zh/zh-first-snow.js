// zh-first-snow — 第一场雪 (level 1). Pictures: ./art/zh-first-snow.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-first-snow.js';

export const book = {
  id: 'zh-first-snow',
  title: '第一场雪',
  titleZh: Z('第一场(dì yī chǎng)雪(xuě)'),
  emoji: '❄️',
  level: 1,
  minutes: 3,
  cover: pics[0],
  pages: [
    P(pics[1], '今天(jīn tiān)早上(zǎo shang)，小雨(xiǎo yǔ)起床(qǐ chuáng)了(le)。她(tā)看(kàn)窗外(chuāng wài)。外面(wài mian)白(bái)白(bái)的(de)，是(shì)什么(shén me)？'),
    P(pics[2], '下雪(xià xuě)了(le)！下雪(xià xuě)了(le)！小雨(xiǎo yǔ)大声(dà shēng)说(shuō)：“妈妈(mā ma)，下雪(xià xuě)了(le)！”这(zhè)是(shì)今年(jīn nián)的(de)第一(dì yī)场(chǎng)雪(xuě)。'),
    P(pics[3], '弟弟(dì di)也(yě)来(lái)了(le)。他(tā)看(kàn)着(zhe)雪(xuě)，说(shuō)：“我(wǒ)要(yào)出去(chū qù)玩(wán)！”妈妈(mā ma)笑(xiào)着(zhe)说(shuō)：“先(xiān)穿(chuān)上(shang)大衣(dà yī)。”'),
    P(pics[4], '小雨(xiǎo yǔ)穿(chuān)上(shang)红(hóng)大衣(dà yī)，戴(dài)上(shang)帽子(mào zi)。弟弟(dì di)穿(chuān)上(shang)蓝(lán)大衣(dà yī)。他们(tā men)一起(yì qǐ)出门(chū mén)了(le)。'),
    P(pics[5], '外面(wài mian)真(zhēn)冷(lěng)，雪(xuě)真(zhēn)白(bái)！小雨(xiǎo yǔ)伸出(shēn chū)小手(xiǎo shǒu)，一(yí)片(piàn)雪花(xuě huā)落(luò)在(zài)手上(shǒu shang)。'),
    P(pics[6], '雪花(xuě huā)小小(xiǎo xiǎo)的(de)，凉凉(liáng liang)的(de)，真(zhēn)好玩(hǎo wán)。小雨(xiǎo yǔ)笑(xiào)了(le)：“雪花(xuě huā)好(hǎo)像(xiàng)小(xiǎo)星星(xīng xing)！”'),
    P(pics[7], '弟弟(dì di)在(zài)地上(dì shang)走(zǒu)，雪(xuě)很(hěn)厚(hòu)，他(tā)很(hěn)高兴(gāo xìng)。“沙(shā)沙(shā)，沙(shā)沙(shā)！”雪(xuě)在(zài)脚(jiǎo)下(xià)响(xiǎng)。'),
    P(pics[8], '他们(tā men)堆(duī)了(le)一个(yí gè)大(dà)雪人(xuě rén)。小雨(xiǎo yǔ)给(gěi)它(tā)两(liǎng)颗(kē)黑(hēi)眼睛(yǎn jing)，弟弟(dì di)给(gěi)它(tā)一个(yí gè)红(hóng)鼻子(bí zi)。'),
    P(pics[9], '弟弟(dì di)把(bǎ)自己(zì jǐ)的(de)帽子(mào zi)给(gěi)雪人(xuě rén)戴(dài)上(shang)。雪人(xuě rén)真(zhēn)可爱(kě ài)！他们(tā men)都(dōu)笑(xiào)了(le)。'),
    P(pics[10], '妈妈(mā ma)叫(jiào)他们(tā men)回家(huí jiā)喝(hē)热(rè)牛奶(niú nǎi)。小雨(xiǎo yǔ)问(wèn)：“明天(míng tiān)，雪人(xuě rén)还(hái)在(zài)吗(ma)？”'),
    P(pics[11], '晚上(wǎn shang)，雪(xuě)又(yòu)下(xià)了(le)。小雨(xiǎo yǔ)在(zài)窗前(chuāng qián)看(kàn)雪人(xuě rén)，轻轻(qīng qīng)地(de)说(shuō)：“雪人(xuě rén)，晚安(wǎn ān)。”'),
  ],
  words: [
    W('雪(xuě)', '冬天(dōng tiān)从(cóng)天上(tiān shàng)落(luò)下(xià)来(lái)的(de)白(bái)东西(dōng xi)。', '❄️'),
    W('雪花(xuě huā)', '很(hěn)小(xiǎo)很(hěn)小(xiǎo)的(de)雪(xuě)。', '🌨️'),
    W('雪人(xuě rén)', '用(yòng)雪(xuě)做(zuò)的(de)人(rén)。', '⛄'),
    W('大衣(dà yī)', '冬天(dōng tiān)穿(chuān)的(de)厚(hòu)衣服(yī fu)。', '🧥'),
    W('帽子(mào zi)', '戴(dài)在(zài)头(tóu)上(shang)的(de)东西(dōng xi)。', '🧢'),
    W('牛奶(niú nǎi)', '白(bái)白(bái)的(de)，可以(kě yǐ)喝(hē)。', '🥛'),
  ],
  quiz: [
    Q('小雨(xiǎo yǔ)早上(zǎo shang)看(kàn)见(jiàn)了(le)什么(shén me)？', ['下雪(xià xuě)', '下雨(xià yǔ)', '太阳(tài yáng)'], 0),
    Q('谁(shuí)和(hé)小雨(xiǎo yǔ)一起(yì qǐ)出去(chū qù)玩(wán)？', ['妈妈(mā ma)', '弟弟(dì di)', '爸爸(bà ba)'], 1),
    Q('小雨(xiǎo yǔ)的(de)大衣(dà yī)是(shì)什么(shén me)颜色(yán sè)？', ['红色(hóng sè)', '蓝色(lán sè)', '白色(bái sè)'], 0),
    Q('雪花(xuě huā)好像(hǎo xiàng)什么(shén me)？', ['星星(xīng xing)', '月亮(yuè liang)', '花(huā)'], 0),
    Q('雪人(xuě rén)的(de)鼻子(bí zi)是(shì)什么(shén me)颜色(yán sè)？', ['黑色(hēi sè)', '红色(hóng sè)', '蓝色(lán sè)'], 1),
    Q('回家(huí jiā)以后(yǐ hòu)，他们(tā men)喝(hē)什么(shén me)？', ['热(rè)牛奶(niú nǎi)', '水(shuǐ)', '果汁(guǒ zhī)'], 0),
  ],
};
