// zh-waipo-comes — 外婆来了 (level 2). Pictures: ./art/zh-waipo-comes.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-waipo-comes.js';

export const book = {
  id: 'zh-waipo-comes',
  title: '外婆来了',
  titleZh: Z('外婆(wài pó)来(lái)了(le)'),
  emoji: '👵',
  level: 2,
  minutes: 5,
  cover: pics[0],
  pages: [
    P(pics[1], '今天(jīn tiān)是(shì)个(gè)特别(tè bié)的(de)日子(rì zi)，外婆(wài pó)要(yào)从(cóng)中国(zhōng guó)坐(zuò)飞机(fēi jī)来(lái)看(kàn)小雨(xiǎo yǔ)了(le)。小雨(xiǎo yǔ)一(yì)早(zǎo)就(jiù)起床(qǐ chuáng)，帮(bāng)妈妈(mā ma)收拾(shōu shi)客房(kè fáng)。她(tā)还(hái)在(zài)枕头(zhěn tou)旁(páng)放(fàng)了(le)一(yì)只(zhī)小熊(xiǎo xióng)。'),
    P(pics[2], '他们(tā men)开车(kāi chē)去(qù)机场(jī chǎng)。机场(jī chǎng)里(li)人(rén)来(lái)人(rén)往(wǎng)，小雨(xiǎo yǔ)踮(diǎn)着(zhe)脚(jiǎo)，一直(yì zhí)盯(dīng)着(zhe)出口(chū kǒu)，生怕(shēng pà)错过(cuò guò)外婆(wài pó)。妈妈(mā ma)笑(xiào)着(zhe)说(shuō)：“别(bié)急(jí)，飞机(fēi jī)还(hái)没(méi)落地(luò dì)呢(ne)。”'),
    P(pics[3], '“外婆(wài pó)！外婆(wài pó)！”小雨(xiǎo yǔ)看见(kàn jiàn)一(yí)位(wèi)白头发(bái tóu fa)的(de)老人(lǎo rén)推(tuī)着(zhe)大(dà)箱子(xiāng zi)走(zǒu)出来(chū lai)，就(jiù)飞快(fēi kuài)地(de)跑(pǎo)了(le)过去(guò qu)。外婆(wài pó)张开(zhāng kāi)手臂(shǒu bì)，紧紧(jǐn jǐn)地(de)抱(bào)住(zhù)了(le)她(tā)。'),
    P(pics[4], '外婆(wài pó)笑(xiào)着(zhe)说(shuō)：“我(wǒ)的(de)小雨(xiǎo yǔ)长(zhǎng)高(gāo)了(le)！”她(tā)说(shuō)话(huà)的(de)声音(shēng yīn)和(hé)视频(shì pín)里(li)一样(yí yàng)，小雨(xiǎo yǔ)的(de)鼻子(bí zi)有点(yǒu diǎn)酸(suān)，眼睛(yǎn jing)也(yě)热(rè)了(le)。小雨(xiǎo yǔ)闻(wén)到(dào)了(le)外婆(wài pó)身上(shēn shang)熟悉(shú xi)的(de)香味(xiāng wèi)。'),
    P(pics[5], '回(huí)到(dào)家(jiā)，外婆(wài pó)打开(dǎ kāi)了(le)大(dà)箱子(xiāng zi)。里面(lǐ mian)有(yǒu)红枣(hóng zǎo)、花生糖(huā shēng táng)、给(gěi)小雨(xiǎo yǔ)织(zhī)的(de)毛衣(máo yī)，还(hái)有(yǒu)一(yì)双(shuāng)绣(xiù)着(zhe)小(xiǎo)老虎(lǎo hǔ)的(de)鞋子(xié zi)。小雨(xiǎo yǔ)高兴(gāo xìng)得(de)又(yòu)叫(jiào)又(yòu)跳(tiào)。'),
    P(pics[6], '弟弟(dì di)穿(chuān)上(shang)虎头鞋(hǔ tóu xié)，在(zài)屋子(wū zi)里(li)走来走去(zǒu lái zǒu qù)，大家(dà jiā)笑(xiào)得(de)直(zhí)不(bù)起(qǐ)腰(yāo)来(lái)。外婆(wài pó)说(shuō)：“这(zhè)双(shuāng)鞋(xié)是(shì)我(wǒ)一(yì)针(zhēn)一(yí)线(xiàn)做(zuò)的(de)。”小雨(xiǎo yǔ)也(yě)想(xiǎng)试试(shì shi)，可是(kě shì)鞋子(xié zi)太(tài)小(xiǎo)了(le)。'),
    P(pics[7], '晚上(wǎn shang)，外婆(wài pó)进(jìn)了(le)厨房(chú fáng)，给(gěi)大家(dà jiā)做(zuò)了(le)热腾腾(rè téng téng)的(de)面条(miàn tiáo)。小雨(xiǎo yǔ)吸溜(xī liu)吸溜(xī liu)地(de)吃(chī)了(le)两(liǎng)大(dà)碗(wǎn)，说(shuō)：“外婆(wài pó)做(zuò)的(de)面(miàn)最(zuì)好吃(hǎo chī)！”'),
    P(pics[8], '可是(kě shì)吃(chī)完(wán)饭(fàn)，外婆(wài pó)的(de)眼睛(yǎn jing)就(jiù)睁(zhēng)不(bù)开(kāi)了(le)。妈妈(mā ma)说(shuō)：“外婆(wài pó)坐(zuò)了(le)很(hěn)久(jiǔ)的(de)飞机(fēi jī)，在(zài)中国(zhōng guó)现在(xiàn zài)是(shì)早上(zǎo shang)，她(tā)还(hái)没(méi)倒(dǎo)过(guò)时差(shí chā)呢(ne)。”'),
    P(pics[9], '第二天(dì èr tiān)早上(zǎo shang)，窗外(chuāng wài)又(yòu)下(xià)雪(xuě)了(le)。外婆(wài pó)趴(pā)在(zài)窗前(chuāng qián)，看(kàn)得(de)入迷(rù mí)，轻轻(qīng qīng)地(de)说(shuō)：“我(wǒ)老家(lǎo jiā)的(de)冬天(dōng tiān)，从来(cóng lái)没有(méi yǒu)这么(zhè me)大(dà)的(de)雪(xuě)呀(ya)！”'),
    P(pics[10], '小雨(xiǎo yǔ)拉(lā)着(zhe)外婆(wài pó)的(de)手(shǒu)冲(chōng)到(dào)院子(yuàn zi)里(li)。她(tā)教(jiāo)外婆(wài pó)躺(tǎng)在(zài)雪地(xuě dì)上(shang)，手(shǒu)和(hé)脚(jiǎo)一(yì)开(kāi)一(yì)合(hé)，印(yìn)出(chū)了(le)两(liǎng)个(gè)雪(xuě)天使(tiān shǐ)。外婆(wài pó)笑(xiào)得(de)像(xiàng)个(gè)小孩(xiǎo hái)。'),
    P(pics[11], '晚上(wǎn shang)，外婆(wài pó)坐(zuò)在(zài)小雨(xiǎo yǔ)的(de)床边(chuáng biān)，给(gěi)她(tā)讲(jiǎng)了(le)一(yí)个(gè)月亮(yuè liang)的(de)故事(gù shi)。小雨(xiǎo yǔ)抱(bào)着(zhe)外婆(wài pó)说(shuō)：“外婆(wài pó)，你(nǐ)多(duō)住(zhù)一(yì)些(xiē)日子(rì zi)吧(ba)，我(wǒ)好(hǎo)想(xiǎng)你(nǐ)！”'),
  ],
  words: [
    W('外婆(wài pó)', '妈妈(mā ma)的(de)妈妈(mā ma)。', '👵'),
    W('机场(jī chǎng)', '飞机(fēi jī)起飞(qǐ fēi)和(hé)降落(jiàng luò)的(de)地方(dì fang)。', '🛫'),
    W('箱子(xiāng zi)', '用(yòng)来(lái)装(zhuāng)衣服(yī fu)和(hé)东西(dōng xi)的(de)大(dà)盒子(hé zi)。', '🧳'),
    W('毛衣(máo yī)', '用(yòng)毛线(máo xiàn)织(zhī)成(chéng)的(de)衣服(yī fu)，很(hěn)暖和(nuǎn huo)。', '🧶'),
    W('面条(miàn tiáo)', '用(yòng)面粉(miàn fěn)做(zuò)的(de)长长(cháng cháng)的(de)吃(chī)的(de)。', '🍜'),
    W('时差(shí chā)', '两(liǎng)个(gè)地方(dì fang)的(de)时间(shí jiān)不(bù)一样(yí yàng)。', '🕐'),
    W('雪天使(xuě tiān shǐ)', '躺(tǎng)在(zài)雪(xuě)上(shang)动(dòng)手(shǒu)动(dòng)脚(jiǎo)，印(yìn)出(chū)来(lái)的(de)样子(yàng zi)。', '👼'),
    W('故事(gù shi)', '一(yí)件(jiàn)一(yí)件(jiàn)事(shì)讲(jiǎng)下来(xià lai)的(de)话(huà)。', '📖'),
  ],
  quiz: [
    Q('外婆(wài pó)是(shì)从(cóng)哪里(nǎ li)来(lái)的(de)？', ['中国(zhōng guó)', '学校(xué xiào)', '商店(shāng diàn)'], 0),
    Q('外婆(wài pó)是(shì)坐(zuò)什么(shén me)来(lái)的(de)？', ['飞机(fēi jī)', '火车(huǒ chē)', '小船(xiǎo chuán)'], 0),
    Q('外婆(wài pó)给(gěi)小雨(xiǎo yǔ)织(zhī)了(le)什么(shén me)？', ['毛衣(máo yī)', '帽子(mào zi)', '书包(shū bāo)'], 0),
    Q('弟弟(dì di)穿(chuān)上(shang)了(le)什么(shén me)？', ['绣(xiù)着(zhe)小(xiǎo)老虎(lǎo hǔ)的(de)鞋子(xié zi)', '红(hóng)色(sè)的(de)手套(shǒu tào)', '小雨(xiǎo yǔ)的(de)大衣(dà yī)'], 0),
    Q('吃(chī)完(wán)饭(fàn)，外婆(wài pó)为什么(wèi shén me)很(hěn)困(kùn)？', ['她(tā)还(hái)没(méi)倒(dǎo)过(guò)时差(shí chā)', '她(tā)吃(chī)得(de)太(tài)少(shǎo)', '她(tā)昨天(zuó tiān)没(méi)睡觉(shuì jiào)'], 0),
    Q('第二天(dì èr tiān)，小雨(xiǎo yǔ)和(hé)外婆(wài pó)在(zài)院子(yuàn zi)里(li)做(zuò)什么(shén me)？', ['印(yìn)雪(xuě)天使(tiān shǐ)', '种(zhòng)花(huā)', '跳绳(tiào shéng)'], 0),
  ],
};
