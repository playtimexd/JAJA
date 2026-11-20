// zh-dragon-boat — 公园里的龙舟赛 (level 3). Pictures: ./art/zh-dragon-boat.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-dragon-boat.js';

export const book = {
  id: 'zh-dragon-boat',
  title: '公园里的龙舟赛',
  titleZh: Z('公园(gōng yuán)里(li)的(de)龙舟赛(lóng zhōu sài)'),
  emoji: '🐉',
  level: 3,
  minutes: 8,
  cover: pics[0],
  pages: [
    P(pics[1], '五月(wǔ yuè)初五(chū wǔ)是(shì)端午节(duān wǔ jié)。这(zhè)一(yì)天(tiān)，城里(chéng li)的(de)公园(gōng yuán)举行(jǔ xíng)了(le)一(yì)场(chǎng)小小(xiǎo xiǎo)的(de)龙舟赛(lóng zhōu sài)。小雨(xiǎo yǔ)和(hé)弟弟(dì di)一(yí)大早(dà zǎo)就(jiù)跟(gēn)着(zhe)爸爸(bà ba)妈妈(mā ma)来(lái)到(dào)了(le)湖边(hú biān)，湖面(hú miàn)上(shang)飘(piāo)着(zhe)好(hǎo)几(jǐ)条(tiáo)彩色(cǎi sè)的(de)龙舟(lóng zhōu)。空气(kōng qì)里(li)飘(piāo)着(zhe)粽叶(zòng yè)的(de)清香(qīng xiāng)。'),
    P(pics[2], '龙舟(lóng zhōu)只(zhǐ)有(yǒu)两(liǎng)三(sān)米(mǐ)长(cháng)，船头(chuán tóu)是(shì)一(yí)个(gè)大大(dà dà)的(de)龙头(lóng tóu)，船尾(chuán wěi)翘(qiào)得(de)高高(gāo gāo)的(de)。每(měi)条(tiáo)船(chuán)上(shang)坐(zuò)着(zhe)四(sì)个(gè)小朋友(xiǎo péng you)，一(yí)个(gè)打鼓(dǎ gǔ)，三(sān)个(gè)划桨(huá jiǎng)，看(kàn)起来(qǐ lai)神气(shén qi)极了(jí le)。小雨(xiǎo yǔ)摸(mō)了(le)摸(mō)冰凉(bīng liáng)的(de)龙头(lóng tóu)，觉得(jué de)它(tā)好像(hǎo xiàng)在(zài)对(duì)自己(zì jǐ)笑(xiào)。'),
    P(pics[3], '小雨(xiǎo yǔ)的(de)红(hóng)龙舟(lóng zhōu)队(duì)里(li)，有(yǒu)她(tā)、弟弟(dì di)、好朋友(hǎo péng you)小美(xiǎo měi)和(hé)小刚(xiǎo gāng)。弟弟(dì di)抱(bào)着(zhe)小(xiǎo)鼓(gǔ)，神气(shén qi)地(de)说(shuō)：“我(wǒ)是(shì)鼓手(gǔ shǒu)，你们(nǐ men)都(dōu)要(yào)听(tīng)我(wǒ)的(de)！”小美(xiǎo měi)和(hé)小刚(xiǎo gāng)听(tīng)了(le)，忍不住(rěn bu zhù)笑(xiào)了(le)起来(qǐ lai)。小雨(xiǎo yǔ)白(bái)了(le)他(tā)一(yì)眼(yǎn)，说(shuō)：“好(hǎo)吧(ba)，鼓手(gǔ shǒu)大人(dà rén)！”弟弟(dì di)得意(dé yì)地(de)挺(tǐng)起(qǐ)了(le)胸(xiōng)。'),
    P(pics[4], '爸爸(bà ba)告诉(gào su)他们(tā men)：“很(hěn)久(jiǔ)很(hěn)久(jiǔ)以前(yǐ qián)，有(yǒu)一(yí)位(wèi)爱(ài)国(guó)的(de)诗人(shī rén)叫(jiào)屈原(qū yuán)。人们(rén men)都(dōu)很(hěn)想念(xiǎng niàn)他(tā)，就(jiù)划(huá)着(zhe)船(chuán)在(zài)江(jiāng)上(shang)找(zhǎo)他(tā)，还(hái)把(bǎ)粽子(zòng zi)扔(rēng)进(jìn)江(jiāng)里(li)，想(xiǎng)让(ràng)鱼(yú)儿(ér)别(bié)去(qù)打扰(dǎ rǎo)他(tā)。后来(hòu lái)就(jiù)有(yǒu)了(le)龙舟(lóng zhōu)和(hé)粽子(zòng zi)。”小雨(xiǎo yǔ)听(tīng)得(de)入神(rù shén)了(le)。'),
    P(pics[5], '比赛(bǐ sài)开始(kāi shǐ)了(le)！裁判(cái pàn)叔叔(shū shu)一(yì)声(shēng)哨响(shào xiǎng)，四(sì)条(tiáo)龙舟(lóng zhōu)一起(yì qǐ)冲(chōng)了(le)出去(chū qu)。可是(kě shì)红(hóng)龙舟(lóng zhōu)的(de)桨(jiǎng)划(huá)得(de)乱(luàn)七(qī)八(bā)糟(zāo)，水花(shuǐ huā)溅(jiàn)了(le)小雨(xiǎo yǔ)一(yì)脸(liǎn)，她(tā)连(lián)眼睛(yǎn jing)都(dōu)睁(zhēng)不(bù)开(kāi)了(le)。岸(àn)上(shang)传(chuán)来(lái)一(yí)阵(zhèn)阵(zhèn)欢呼声(huān hū shēng)，热闹(rè nao)极了(jí le)，小雨(xiǎo yǔ)的(de)心(xīn)怦怦(pēng pēng)直(zhí)跳(tiào)。'),
    P(pics[6], '弟弟(dì di)把(bǎ)鼓(gǔ)敲(qiāo)得(de)又(yòu)急(jí)又(yòu)乱(luàn)，小刚(xiǎo gāng)划(huá)得(de)太(tài)快(kuài)，小美(xiǎo měi)划(huá)得(de)太(tài)慢(màn)，龙舟(lóng zhōu)在(zài)水(shuǐ)里(li)转(zhuàn)起(qǐ)了(le)圈(quān)圈(quan)。别(bié)的(de)船(chuán)一(yì)条(tiáo)条(tiáo)地(de)超(chāo)过(guò)了(le)他们(tā men)，岸(àn)上(shang)的(de)人(rén)都(dōu)替(tì)他们(tā men)着急(zháo jí)。小美(xiǎo měi)急得(jí de)差点(chà diǎn)哭(kū)了(le)，小刚(xiǎo gāng)的(de)脸(liǎn)涨(zhǎng)得(de)通红(tōng hóng)。'),
    P(pics[7], '“停(tíng)一(yì)停(tíng)！”小雨(xiǎo yǔ)举(jǔ)起(qǐ)手(shǒu)说(shuō)，“我们(wǒ men)的(de)桨(jiǎng)要(yào)一起(yì qǐ)下(xià)水(shuǐ)，一起(yì qǐ)抬(tái)起(qǐ)来(lái)。弟弟(dì di)，你(nǐ)的(de)鼓(gǔ)要(yào)敲(qiāo)得(de)稳(wěn)稳(wěn)的(de)，我们(wǒ men)跟(gēn)着(zhe)鼓点(gǔ diǎn)划(huá)！”大家(dà jiā)互相(hù xiāng)看(kàn)了(le)看(kàn)，用力(yòng lì)地(de)点(diǎn)了(le)点(diǎn)头(tóu)。小美(xiǎo měi)和(hé)小刚(xiǎo gāng)松(sōng)了(le)口气(kǒu qì)，也(yě)笑(xiào)了(le)起来(qǐ lai)，船(chuán)终于(zhōng yú)不(bú)再(zài)打转(dǎ zhuàn)了(le)。'),
    P(pics[8], '弟弟(dì di)深深(shēn shēn)地(de)吸(xī)了(le)一(yì)口气(kǒu qì)，咚(dōng)，咚(dōng)，咚(dōng)，敲(qiāo)得(de)又(yòu)稳(wěn)又(yòu)响(xiǎng)。小雨(xiǎo yǔ)大声(dà shēng)喊(hǎn)着(zhe)：“一(yī)、二(èr)，一(yī)、二(èr)！”四(sì)把(bǎ)桨(jiǎng)同时(tóng shí)落(luò)下(xià)，又(yòu)同时(tóng shí)抬(tái)起(qǐ)，龙舟(lóng zhōu)嗖(sōu)地(de)一(yí)下(xià)向(xiàng)前(qián)冲(chōng)去(qù)。小美(xiǎo měi)和(hé)小刚(xiǎo gāng)也(yě)跟(gēn)着(zhe)喊(hǎn)了(le)起来(qǐ lai)，四(sì)个(gè)人(rén)的(de)声音(shēng yīn)和(hé)鼓声(gǔ shēng)合(hé)成(chéng)了(le)一(yí)个(gè)声音(shēng yīn)。'),
    P(pics[9], '他们(tā men)一(yì)条(tiáo)、两(liǎng)条(tiáo)地(de)追(zhuī)上(shàng)了(le)别(bié)的(de)船(chuán)，岸(àn)上(shang)的(de)人(rén)都(dōu)拍(pāi)着(zhe)手(shǒu)喊(hǎn)：“加油(jiā yóu)！加油(jiā yóu)！”可是(kě shì)离(lí)终点(zhōng diǎn)还(hái)有(yǒu)一(yì)小(xiǎo)段(duàn)的(de)时候(shí hou)，黄(huáng)龙舟(lóng zhōu)已经(yǐ jīng)抢先(qiǎng xiān)到(dào)了(le)。弟弟(dì di)的(de)手臂(shǒu bì)酸(suān)得(de)快(kuài)抬(tái)不(bù)起来(qǐ lai)了(le)，可是(kě shì)他(tā)一(yí)下(xià)也(yě)没(méi)有(yǒu)停(tíng)。'),
    P(pics[10], '红(hóng)龙舟(lóng zhōu)得(dé)了(le)第二名(dì èr míng)。弟弟(dì di)有点(yǒu diǎn)失望(shī wàng)，小声(xiǎo shēng)说(shuō)：“对不起(duì bu qǐ)，要是(yào shi)我(wǒ)一(yì)开始(kāi shǐ)不(bú)乱(luàn)敲(qiāo)就(jiù)好(hǎo)了(le)。”小雨(xiǎo yǔ)拍(pāi)拍(pāi)他(tā)的(de)肩膀(jiān bǎng)：“没关系(méi guān xi)，我们(wǒ men)学会(xué huì)了(le)一起(yì qǐ)用力(yòng lì)，这(zhè)比(bǐ)第一名(dì yī míng)还(hái)重要(zhòng yào)！”小美(xiǎo měi)和(hé)小刚(xiǎo gāng)也(yě)围(wéi)过来(guò lai)，大家(dà jiā)轻轻(qīng qīng)地(de)抱(bào)成(chéng)了(le)一(yì)团(tuán)。'),
    P(pics[11], '比赛(bǐ sài)后(hòu)，大家(dà jiā)坐(zuò)在(zài)草地(cǎo dì)上(shang)，剥(bāo)开(kāi)粽叶(zòng yè)，吃(chī)起(qǐ)了(le)香香(xiāng xiāng)的(de)粽子(zòng zi)。红枣(hóng zǎo)的(de)甜(tián)，肉(ròu)的(de)香(xiāng)，还(hái)有(yǒu)笑声(xiào shēng)，一起(yì qǐ)飘(piāo)在(zài)湖边(hú biān)。小雨(xiǎo yǔ)想(xiǎng)：“明年(míng nián)，我们(wǒ men)还(hái)要(yào)一起(yì qǐ)划(huá)！”夕阳(xī yáng)把(bǎ)湖水(hú shuǐ)染(rǎn)成(chéng)了(le)金色(jīn sè)，远处(yuǎn chù)的(de)龙舟(lóng zhōu)静静(jìng jìng)地(de)停(tíng)在(zài)岸边(àn biān)，像(xiàng)睡着(shuì zháo)了(le)一样(yí yàng)。'),
  ],
  words: [
    W('端午节(duān wǔ jié)', '农历(nóng lì)五月(wǔ yuè)初五(chū wǔ)，要(yào)赛(sài)龙舟(lóng zhōu)，吃(chī)粽子(zòng zi)的(de)节日(jié rì)。', '🐉'),
    W('龙舟(lóng zhōu)', '船头(chuán tóu)像(xiàng)龙(lóng)的(de)长(cháng)船(chuán)。', '🚣'),
    W('鼓手(gǔ shǒu)', '在(zài)船(chuán)上(shang)打鼓(dǎ gǔ)，让(ràng)大家(dà jiā)划(huá)得(de)一样(yí yàng)快(kuài)的(de)人(rén)。', '🥁'),
    W('裁判(cái pàn)', '比赛(bǐ sài)的(de)时候(shí hou)，说(shuō)谁(shuí)赢(yíng)了(le)的(de)人(rén)。', '🧑‍⚖️'),
    W('终点(zhōng diǎn)', '比赛(bǐ sài)要(yào)跑(pǎo)到(dào)的(de)最后(zuì hòu)那(nà)个(gè)地方(dì fang)。', '🏁'),
    W('屈原(qū yuán)', '很(hěn)久(jiǔ)以前(yǐ qián)的(de)中国(zhōng guó)诗人(shī rén)。', '📜'),
    W('粽子(zòng zi)', '用(yòng)粽叶(zòng yè)包(bāo)着(zhe)米(mǐ)做(zuò)成(chéng)的(de)食物(shí wù)。', '🍙'),
    W('加油(jiā yóu)', '大家(dà jiā)给(gěi)你(nǐ)鼓励(gǔ lì)，让(ràng)你(nǐ)更(gèng)有(yǒu)力气(lì qi)。', '💪'),
  ],
  quiz: [
    Q('端午节(duān wǔ jié)是(shì)农历(nóng lì)的(de)哪(nǎ)一(yì)天(tiān)？', ['五月(wǔ yuè)初五(chū wǔ)', '八月(bā yuè)十五(shí wǔ)', '正月(zhēng yuè)初一(chū yī)'], 0),
    Q('每(měi)条(tiáo)龙舟(lóng zhōu)上(shang)有(yǒu)几(jǐ)个(gè)小朋友(xiǎo péng you)？', ['四(sì)个(gè)', '两(liǎng)个(gè)', '十(shí)个(gè)'], 0),
    Q('弟弟(dì di)在(zài)红(hóng)龙舟(lóng zhōu)上(shang)做(zuò)什么(shén me)？', ['打鼓(dǎ gǔ)', '划桨(huá jiǎng)', '喊(hǎn)加油(jiā yóu)'], 0),
    Q('一(yì)开始(kāi shǐ)，红(hóng)龙舟(lóng zhōu)为什么(wèi shén me)慢(màn)？', ['大家(dà jiā)划(huá)得(de)不(bù)整齐(zhěng qí)', '船(chuán)太(tài)小(xiǎo)了(le)', '没有(méi yǒu)人(rén)划(huá)'], 0),
    Q('小雨(xiǎo yǔ)说(shuō)了(le)什么(shén me)，让(ràng)大家(dà jiā)划(huá)得(de)更(gèng)好(hǎo)？', ['一起(yì qǐ)下(xià)水(shuǐ)，一起(yì qǐ)抬(tái)起(qǐ)来(lái)', '划(huá)得(de)越(yuè)快(kuài)越(yuè)好(hǎo)', '不(bú)要(yào)再(zài)划(huá)了(le)'], 0),
    Q('红(hóng)龙舟(lóng zhōu)得(dé)了(le)第(dì)几(jǐ)名(míng)？', ['第二名(dì èr míng)', '第一名(dì yī míng)', '最后(zuì hòu)一(yì)名(míng)'], 0),
  ],
};
