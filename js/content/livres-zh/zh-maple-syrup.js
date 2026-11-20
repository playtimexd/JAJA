// zh-maple-syrup — 糖屋里的枫糖 (level 2). Pictures: ./art/zh-maple-syrup.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-maple-syrup.js';

export const book = {
  id: 'zh-maple-syrup',
  title: '糖屋里的枫糖',
  titleZh: Z('糖屋(táng wū)里(li)的(de)枫糖(fēng táng)'),
  emoji: '🍁',
  level: 2,
  minutes: 5,
  cover: pics[0],
  pages: [
    P(pics[1], '三月(sān yuè)的(de)一(yí)个(gè)周末(zhōu mò)，爸爸(bà ba)说(shuō)：“今天(jīn tiān)我们(wǒ men)去(qù)糖屋(táng wū)，看(kàn)大人(dà ren)怎么(zěn me)做(zuò)枫糖(fēng táng)。”小雨(xiǎo yǔ)和(hé)弟弟(dì di)高兴(gāo xìng)得(de)跳(tiào)了(le)起来(qǐ lai)。他们(tā men)还(hái)带(dài)了(le)热(rè)水(shuǐ)和(hé)小(xiǎo)毯子(tǎn zi)。'),
    P(pics[2], '车子(chē zi)开(kāi)了(le)很(hěn)久(jiǔ)，他们(tā men)来(lái)到(dào)一(yí)片(piàn)大(dà)树林(shù lín)。每(měi)棵(kē)树(shù)上(shang)都(dōu)挂(guà)着(zhe)一(yí)个(gè)小(xiǎo)铁桶(tiě tǒng)，地上(dì shang)的(de)雪(xuě)还(hái)没有(méi yǒu)化(huà)完(wán)。空气(kōng qì)里(li)有(yǒu)一(yì)股(gǔ)木头(mù tou)和(hé)泥土(ní tǔ)的(de)味道(wèi dào)。'),
    P(pics[3], '“这(zhè)些(xiē)是(shì)枫树(fēng shù)，”爸爸(bà ba)说(shuō)，“春天(chūn tiān)快(kuài)到(dào)了(le)，树(shù)里(li)的(de)水(shuǐ)会(huì)流(liú)出来(chū lai)，一(yì)滴(dī)，一(yì)滴(dī)，滴(dī)进(jìn)桶(tǒng)里(li)。”小雨(xiǎo yǔ)认真(rèn zhēn)地(de)点(diǎn)了(le)点(diǎn)头(tóu)，好像(hǎo xiàng)听懂(tīng dǒng)了(le)。'),
    P(pics[4], '小雨(xiǎo yǔ)走近(zǒu jìn)一(yì)棵(kē)树(shù)，听见(tīng jiàn)“滴答(dī dā)，滴答(dī dā)”的(de)声音(shēng yīn)，真(zhēn)像(xiàng)小小(xiǎo xiǎo)的(de)音乐(yīn yuè)。弟弟(dì di)用(yòng)手指(shǒu zhǐ)沾(zhān)了(le)一点(yì diǎn)树(shù)水(shuǐ)，说(shuō)：“咦(yí)，真(zhēn)的(de)是(shì)甜(tián)的(de)！”'),
    P(pics[5], '工人(gōng ren)叔叔(shū shu)把(bǎ)树(shù)水(shuǐ)倒(dào)进(jìn)一(yì)口(kǒu)大(dà)锅(guō)里(li)。锅(guō)下(xià)面(mian)烧(shāo)着(zhe)火(huǒ)，白(bái)白(bái)的(de)热气(rè qì)飘(piāo)满(mǎn)了(le)整(zhěng)个(gè)糖屋(táng wū)。叔叔(shū shu)还(hái)让(ràng)弟弟(dì di)用(yòng)大(dà)勺子(sháo zi)搅(jiǎo)一(yì)搅(jiǎo)。'),
    P(pics[6], '叔叔(shū shu)说(shuō)：“要(yào)煮(zhǔ)很(hěn)久(jiǔ)很(hěn)久(jiǔ)，四十(sì shí)桶(tǒng)树(shù)水(shuǐ)，才(cái)能(néng)变(biàn)成(chéng)一(yì)桶(tǒng)糖浆(táng jiāng)。”小雨(xiǎo yǔ)吃惊(chī jīng)地(de)问(wèn)：“这么(zhè me)多(duō)呀(ya)？”弟弟(dì di)用(yòng)手指(shǒu zhǐ)数(shǔ)了(le)半天(bàn tiān)，也(yě)数(shǔ)不(bù)清(qīng)。'),
    P(pics[7], '终于(zhōng yú)，糖浆(táng jiāng)变(biàn)成(chéng)了(le)金黄色(jīn huáng sè)。妈妈(mā ma)叫(jiào)大家(dà jiā)坐(zuò)下来(xià lai)吃饭(chī fàn)。桌子(zhuō zi)上(shang)有(yǒu)煎饼(jiān bǐng)和(hé)热(rè)汤(tāng)，都(dōu)淋(lín)上(shang)了(le)甜(tián)甜(tián)的(de)糖浆(táng jiāng)。小雨(xiǎo yǔ)一(yì)口气(kǒu qì)吃(chī)了(le)三(sān)块(kuài)，肚子(dù zi)圆(yuán)圆(yuán)的(de)。'),
    P(pics[8], '最(zuì)好玩(hǎo wán)的(de)是(shì)雪(xuě)上(shang)的(de)糖(táng)。叔叔(shū shu)把(bǎ)热(rè)糖浆(táng jiāng)倒(dào)在(zài)干净(gān jìng)的(de)白(bái)雪(xuě)上(shang)，很(hěn)快(kuài)，糖浆(táng jiāng)就(jiù)变(biàn)硬(yìng)了(le)，成(chéng)了(le)一(yí)片(piàn)片(piàn)脆脆(cuì cuì)的(de)糖(táng)。别(bié)的(de)孩子(hái zi)也(yě)围(wéi)了(le)过来(guò lai)，睁大(zhēng dà)了(le)眼睛(yǎn jing)看(kàn)。'),
    P(pics[9], '小雨(xiǎo yǔ)拿(ná)起(qǐ)一(yì)根(gēn)小(xiǎo)木棍(mù gùn)，把(bǎ)糖(táng)卷(juǎn)起来(qǐ lai)，像(xiàng)一(yí)个(gè)棒棒糖(bàng bang táng)。她(tā)咬(yǎo)了(le)一(yì)口(kǒu)，又(yòu)甜(tián)又(yòu)凉(liáng)，真(zhēn)好吃(hǎo chī)！糖(táng)里(li)有(yǒu)淡淡(dàn dàn)的(de)枫树(fēng shù)香(xiāng)，吃(chī)了(le)还(hái)想(xiǎng)再(zài)吃(chī)。'),
    P(pics[10], '弟弟(dì di)吃(chī)得(de)满(mǎn)脸(liǎn)都(dōu)是(shì)糖(táng)，爸爸(bà ba)笑(xiào)着(zhe)给(gěi)他(tā)擦(cā)脸(liǎn)。妈妈(mā ma)买(mǎi)了(le)一(yì)瓶(píng)枫糖浆(fēng táng jiāng)，要(yào)带(dài)回(huí)家(jiā)。小雨(xiǎo yǔ)看(kàn)着(zhe)弟弟(dì di)的(de)大(dà)花脸(huā liǎn)，也(yě)忍不住(rěn bu zhù)笑(xiào)了(le)。'),
    P(pics[11], '回家(huí jiā)的(de)路(lù)上(shang)，小雨(xiǎo yǔ)抱(bào)着(zhe)那(nà)瓶(píng)枫糖浆(fēng táng jiāng)，轻轻(qīng qīng)地(de)说(shuō)：“明天(míng tiān)早上(zǎo shang)，我(wǒ)要(yào)在(zài)煎饼(jiān bǐng)上(shang)，淋(lín)很(hěn)多(duō)很(hěn)多(duō)枫糖(fēng táng)。”车子(chē zi)里(li)暖暖(nuǎn nuǎn)的(de)，她(tā)闻(wén)着(zhe)枫糖(fēng táng)的(de)香味(xiāng wèi)，慢慢(màn màn)地(de)睡着(shuì zháo)了(le)。'),
  ],
  words: [
    W('糖屋(táng wū)', '春天(chūn tiān)用(yòng)枫树(fēng shù)水(shuǐ)做(zuò)糖浆(táng jiāng)的(de)小屋(xiǎo wū)。', '🏚️'),
    W('枫树(fēng shù)', '秋天(qiū tiān)叶子(yè zi)会(huì)变(biàn)红(hóng)的(de)树(shù)。', '🍁'),
    W('铁桶(tiě tǒng)', '用(yòng)铁(tiě)做(zuò)的(de)桶(tǒng)，可以(kě yǐ)装(zhuāng)水(shuǐ)。', '🪣'),
    W('糖浆(táng jiāng)', '又(yòu)甜(tián)又(yòu)稠(chóu)的(de)水(shuǐ)。', '🍯'),
    W('热气(rè qì)', '热(rè)水(shuǐ)上面(shàng mian)飘(piāo)起(qǐ)来(lái)的(de)白(bái)气(qì)。', '♨️'),
    W('煎饼(jiān bǐng)', '用(yòng)面粉(miàn fěn)做(zuò)的(de)圆(yuán)饼(bǐng)，又(yòu)软(ruǎn)又(yòu)香(xiāng)。', '🥞'),
    W('变硬(biàn yìng)', '从(cóng)软(ruǎn)软(ruǎn)的(de)变(biàn)成(chéng)硬(yìng)硬(yìng)的(de)。', '🧊'),
    W('春天(chūn tiān)', '冬天(dōng tiān)以后(yǐ hòu)，天气(tiān qì)变(biàn)暖(nuǎn)的(de)时候(shí hou)。', '🌱'),
  ],
  quiz: [
    Q('他们(tā men)一家(yì jiā)去(qù)哪里(nǎ li)玩(wán)？', ['糖屋(táng wū)', '动物园(dòng wù yuán)', '外婆(wài pó)家(jiā)'], 0),
    Q('树(shù)上(shang)挂(guà)着(zhe)什么(shén me)？', ['小(xiǎo)铁桶(tiě tǒng)', '红(hóng)气球(qì qiú)', '小鸟(xiǎo niǎo)'], 0),
    Q('桶(tǒng)里(li)的(de)树(shù)水(shuǐ)是(shì)什么(shén me)味道(wèi dào)？', ['有点(yǒu diǎn)甜(tián)', '很(hěn)酸(suān)', '很(hěn)咸(xián)'], 0),
    Q('要(yào)几(jǐ)桶(tǒng)树(shù)水(shuǐ)才(cái)能(néng)煮(zhǔ)成(chéng)一(yì)桶(tǒng)糖浆(táng jiāng)？', ['四十(sì shí)桶(tǒng)', '两(liǎng)桶(tǒng)', '五(wǔ)桶(tǒng)'], 0),
    Q('热(rè)糖浆(táng jiāng)倒(dào)在(zài)雪(xuě)上(shang)，会(huì)怎么样(zěn me yàng)？', ['变硬(biàn yìng)', '不见(bú jiàn)了(le)', '变(biàn)成(chéng)水(shuǐ)'], 0),
    Q('妈妈(mā ma)最后(zuì hòu)买(mǎi)了(le)什么(shén me)？', ['一(yì)瓶(píng)枫糖浆(fēng táng jiāng)', '一(yí)个(gè)大(dà)蛋糕(dàn gāo)', '一(yì)双(shuāng)手套(shǒu tào)'], 0),
  ],
};
