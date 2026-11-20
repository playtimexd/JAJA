// zh-skating-with-dad — 和爸爸去滑冰 (level 2). Pictures: ./art/zh-skating-with-dad.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-skating-with-dad.js';

export const book = {
  id: 'zh-skating-with-dad',
  title: '和爸爸去滑冰',
  titleZh: Z('和(hé)爸爸(bà ba)去(qù)滑冰(huá bīng)'),
  emoji: '⛸️',
  level: 2,
  minutes: 5,
  cover: pics[0],
  pages: [
    P(pics[1], '星期六(xīng qī liù)的(de)早上(zǎo shang)，天气(tiān qì)冷(lěng)冷(lěng)的(de)，太阳(tài yáng)却(què)很(hěn)亮(liàng)。爸爸(bà ba)说(shuō)：“小雨(xiǎo yǔ)，今天(jīn tiān)我(wǒ)带(dài)你(nǐ)去(qù)滑冰(huá bīng)，好(hǎo)不好(bu hǎo)？”路上(lù shang)的(de)雪(xuě)被(bèi)太阳(tài yáng)照(zhào)得(de)闪闪(shǎn shǎn)发亮(fā liàng)。'),
    P(pics[2], '公园(gōng yuán)里(li)有(yǒu)一(yí)个(gè)大(dà)冰场(bīng chǎng)，很(hěn)多(duō)人(rén)在(zài)冰(bīng)上(shang)滑(huá)来(lái)滑(huá)去(qù)。小雨(xiǎo yǔ)看(kàn)了(le)半天(bàn tiān)，心(xīn)里(li)有(yǒu)点(diǎn)害怕(hài pà)。有(yǒu)的(de)小朋友(xiǎo péng you)滑(huá)得(de)飞(fēi)快(kuài)，有(yǒu)的(de)在(zài)慢慢(màn màn)走(zǒu)。'),
    P(pics[3], '爸爸(bà ba)帮(bāng)小雨(xiǎo yǔ)系(jì)好(hǎo)冰鞋(bīng xié)，又(yòu)给(gěi)她(tā)戴(dài)上(shang)头盔(tóu kuī)。“冰鞋(bīng xié)好(hǎo)紧(jǐn)呀(ya)！”小雨(xiǎo yǔ)说(shuō)。爸爸(bà ba)笑(xiào)着(zhe)说(shuō)：“紧(jǐn)一点(yì diǎn)才(cái)安全(ān quán)。”小雨(xiǎo yǔ)摸(mō)了(le)摸(mō)头盔(tóu kuī)，觉得(jué de)自己(zì jǐ)像(xiàng)个(gè)小(xiǎo)骑士(qí shì)。'),
    P(pics[4], '小雨(xiǎo yǔ)一(yì)只(zhī)脚(jiǎo)踩(cǎi)上(shàng)冰(bīng)，另(lìng)一(yì)只(zhī)脚(jiǎo)也(yě)踩(cǎi)上(shàng)去(qù)。她(tā)的(de)腿(tuǐ)抖(dǒu)呀(ya)抖(dǒu)，两(liǎng)只(zhī)手(shǒu)紧紧(jǐn jǐn)抓(zhuā)住(zhù)了(le)栏杆(lán gān)。冰(bīng)又(yòu)滑(huá)又(yòu)凉(liáng)，她(tā)的(de)心(xīn)跳(tiào)得(de)很(hěn)快(kuài)。'),
    P(pics[5], '“别(bié)怕(pà)，”爸爸(bà ba)说(shuō)，“你(nǐ)像(xiàng)小(xiǎo)企鹅(qǐ é)一样(yí yàng)，脚尖(jiǎo jiān)向(xiàng)外(wài)，一(yí)步(bù)，一(yí)步(bù)，慢慢(màn màn)走(zǒu)。”小雨(xiǎo yǔ)学(xué)着(zhe)企鹅(qǐ é)走路(zǒu lù)，自己(zì jǐ)也(yě)笑(xiào)了(le)。爸爸(bà ba)在(zài)后面(hòu mian)扶(fú)着(zhe)她(tā)，说(shuō)：“慢(màn)一点(yì diǎn)，不(bù)着急(zháo jí)。”'),
    P(pics[6], '走(zǒu)了(le)一(yì)圈(quān)，又(yòu)走(zǒu)了(le)一(yì)圈(quān)，小雨(xiǎo yǔ)不(bú)再(zài)抓(zhuā)栏杆(lán gān)了(le)。爸爸(bà ba)滑(huá)在(zài)她(tā)旁边(páng biān)，大声(dà shēng)说(shuō)：“你(nǐ)真(zhēn)棒(bàng)！”冰场(bīng chǎng)上(shang)的(de)音乐(yīn yuè)很(hěn)好听(hǎo tīng)，小雨(xiǎo yǔ)觉得(jué de)心里(xīn li)轻轻(qīng qīng)的(de)。'),
    P(pics[7], '“现在(xiàn zài)我们(wǒ men)来(lái)试试(shì shi)滑(huá)！”爸爸(bà ba)说(shuō)。小雨(xiǎo yǔ)用力(yòng lì)一(yì)蹬(dēng)，身体(shēn tǐ)慢慢(màn màn)向(xiàng)前(qián)滑(huá)了(le)出去(chū qu)，好像(hǎo xiàng)在(zài)飞(fēi)！冷(lěng)风(fēng)吹(chuī)在(zài)脸(liǎn)上(shang)，她(tā)却(què)一点(yì diǎn)也(yě)不(bù)觉得(jué de)冷(lěng)。'),
    P(pics[8], '突然(tū rán)，小雨(xiǎo yǔ)的(de)脚(jiǎo)一(yì)歪(wāi)，“扑通(pū tōng)”一(yì)声(shēng)，坐(zuò)在(zài)了(le)冰(bīng)上(shang)。她(tā)看(kàn)看(kàn)爸爸(bà ba)，不(bú)但(dàn)没(méi)哭(kū)，还(hái)哈哈(hā hā)大笑(dà xiào)。旁边(páng biān)的(de)叔叔(shū shu)也(yě)笑(xiào)着(zhe)给(gěi)她(tā)拍手(pāi shǒu)。'),
    P(pics[9], '爸爸(bà ba)把(bǎ)她(tā)拉(lā)起来(qǐ lai)，说(shuō)：“摔倒(shuāi dǎo)不(bù)可怕(kě pà)，站(zhàn)起来(qǐ lai)才(cái)最(zuì)了不起(liǎo bu qǐ)。”小雨(xiǎo yǔ)拍(pāi)拍(pāi)身上(shēn shang)的(de)冰(bīng)，又(yòu)试(shì)了(le)一(yí)次(cì)。爸爸(bà ba)的(de)手(shǒu)又(yòu)大(dà)又(yòu)暖(nuǎn)，小雨(xiǎo yǔ)觉得(jué de)一点(yì diǎn)也(yě)不(bú)怕(pà)了(le)。'),
    P(pics[10], '这(zhè)一(yí)次(cì)，她(tā)滑(huá)了(le)很(hěn)远(yuǎn)，一直(yì zhí)滑(huá)到(dào)妈妈(mā ma)身边(shēn biān)。妈妈(mā ma)拿(ná)着(zhe)两(liǎng)杯(bēi)热(rè)巧克力(qiǎo kè lì)，在(zài)冰场(bīng chǎng)边(biān)等(děng)着(zhe)她(tā)。她(tā)高兴(gāo xìng)得(de)举(jǔ)起(qǐ)两(liǎng)只(zhī)手(shǒu)，大声(dà shēng)喊(hǎn)：“妈妈(mā ma)，你(nǐ)看(kàn)我(wǒ)！”'),
    P(pics[11], '小雨(xiǎo yǔ)和(hé)爸爸(bà ba)一边(yì biān)喝(hē)热(rè)巧克力(qiǎo kè lì)，一边(yì biān)看(kàn)冰上(bīng shang)的(de)人(rén)。小雨(xiǎo yǔ)说(shuō)：“爸爸(bà ba)，下(xià)个(gè)星期(xīng qī)，我们(wǒ men)还(hái)来(lái)，好(hǎo)吗(ma)？”冰场(bīng chǎng)上(shang)的(de)灯(dēng)一(yì)盏(zhǎn)一(yì)盏(zhǎn)亮(liàng)了(le)起来(qǐ lai)，像(xiàng)天上(tiān shang)的(de)星星(xīng xing)。'),
  ],
  words: [
    W('冰场(bīng chǎng)', '可以(kě yǐ)在(zài)上面(shàng mian)滑冰(huá bīng)的(de)地方(dì fang)。', '🏟️'),
    W('头盔(tóu kuī)', '戴(dài)在(zài)头(tóu)上(shang)，保护(bǎo hù)头(tóu)的(de)帽子(mào zi)。', '⛑️'),
    W('栏杆(lán gān)', '冰场(bīng chǎng)旁边(páng biān)可以(kě yǐ)扶(fú)的(de)长(cháng)木板(mù bǎn)。', '🚧'),
    W('企鹅(qǐ é)', '住(zhù)在(zài)冷(lěng)的(de)地方(dì fang)，走路(zǒu lù)摇摇晃晃(yáo yáo huàng huàng)。', '🐧'),
    W('害怕(hài pà)', '心里(xīn li)觉得(jué de)有(yǒu)危险(wēi xiǎn)，不(bù)敢(gǎn)做(zuò)。', '😨'),
    W('摔倒(shuāi dǎo)', '站(zhàn)不(bú)住(zhù)，倒(dǎo)在(zài)地上(dì shang)。', '🤕'),
    W('了不起(liǎo bu qǐ)', '非常(fēi cháng)好(hǎo)，非常(fēi cháng)棒(bàng)。', '👍'),
    W('热巧克力(rè qiǎo kè lì)', '热热(rè rè)的(de)，甜甜(tián tián)的(de)，冬天(dōng tiān)喝(hē)。', '☕'),
  ],
  quiz: [
    Q('爸爸(bà ba)带(dài)小雨(xiǎo yǔ)去(qù)做(zuò)什么(shén me)？', ['滑冰(huá bīng)', '游泳(yóu yǒng)', '买(mǎi)菜(cài)'], 0),
    Q('小雨(xiǎo yǔ)看见(kàn jiàn)大(dà)冰场(bīng chǎng)，心里(xīn li)觉得(jué de)怎么样(zěn me yàng)？', ['有点(yǒu diǎn)害怕(hài pà)', '非常(fēi cháng)生气(shēng qì)', '想(xiǎng)睡觉(shuì jiào)'], 0),
    Q('爸爸(bà ba)说(shuō)，像(xiàng)什么(shén me)一样(yí yàng)走(zǒu)？', ['小(xiǎo)企鹅(qǐ é)', '小(xiǎo)兔子(tù zi)', '小(xiǎo)鸟(niǎo)'], 0),
    Q('小雨(xiǎo yǔ)摔倒(shuāi dǎo)了(le)，她(tā)怎么(zěn me)做(zuò)？', ['哈哈(hā hā)大笑(dà xiào)', '大声(dà shēng)哭(kū)', '回家(huí jiā)'], 0),
    Q('爸爸(bà ba)说(shuō)，什么(shén me)才(cái)最(zuì)了不起(liǎo bu qǐ)？', ['摔倒(shuāi dǎo)了(le)再(zài)站(zhàn)起来(qǐ lai)', '滑(huá)得(de)很(hěn)快(kuài)', '不(bú)穿(chuān)冰鞋(bīng xié)'], 0),
    Q('最后(zuì hòu)，妈妈(mā ma)在(zài)冰场(bīng chǎng)边(biān)等(děng)着(zhe)她(tā)，手里(shǒu li)拿(ná)着(zhe)什么(shén me)？', ['热巧克力(rè qiǎo kè lì)', '冰(bīng)激凌(jī líng)', '大(dà)蛋糕(dàn gāo)'], 0),
  ],
};
