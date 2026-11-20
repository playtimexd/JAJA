// zh-mooncakes — 月饼和月亮 (level 3). Pictures: ./art/zh-mooncakes.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-mooncakes.js';

export const book = {
  id: 'zh-mooncakes',
  title: '月饼和月亮',
  titleZh: Z('月饼(yuè bǐng)和(hé)月亮(yuè liang)'),
  emoji: '🥮',
  level: 3,
  minutes: 8,
  cover: pics[0],
  pages: [
    P(pics[1], '农历(nóng lì)八月(bā yuè)十五(shí wǔ)那天(nà tiān)，是(shì)中秋节(zhōng qiū jié)。小雨(xiǎo yǔ)放学(fàng xué)回家(huí jiā)，一(yí)进(jìn)门(mén)就(jiù)闻到(wén dào)了(le)甜甜(tián tián)的(de)香味(xiāng wèi)。厨房(chú fáng)里(li)，妈妈(mā ma)正(zhèng)在(zài)忙(máng)着(zhe)做(zuò)月饼(yuè bǐng)呢(ne)。窗外(chuāng wài)的(de)枫叶(fēng yè)红(hóng)了(le)，天(tiān)黑(hēi)得(de)比(bǐ)夏天(xià tiān)早(zǎo)多(duō)了(le)。她(tā)迫不及待(pò bù jí dài)地(de)脱(tuō)下(xià)外套(wài tào)，想(xiǎng)去(qù)帮(bāng)忙(máng)。'),
    P(pics[2], '妈妈(mā ma)说(shuō)：“今年(jīn nián)我们(wǒ men)做(zuò)冰皮(bīng pí)月饼(yuè bǐng)，不用(bú yòng)烤(kǎo)，很(hěn)适合(shì hé)小朋友(xiǎo péng you)。”她(tā)把(bǎ)糯米粉(nuò mǐ fěn)和(hé)牛奶(niú nǎi)拌(bàn)在(zài)一起(yì qǐ)，蒸(zhēng)熟(shú)以后(yǐ hòu)，白(bái)白(bái)的(de)面团(miàn tuán)软(ruǎn)得(de)像(xiàng)一(yì)朵(duǒ)云(yún)。弟弟(dì di)踮(diǎn)着(zhe)脚(jiǎo)想(xiǎng)偷看(tōu kàn)，妈妈(mā ma)说(shuō)：“小馋猫(xiǎo chán māo)，先(xiān)去(qù)洗(xǐ)手(shǒu)！”小雨(xiǎo yǔ)在(zài)旁边(páng biān)看(kàn)呆(dāi)了(le)。'),
    P(pics[3], '小雨(xiǎo yǔ)洗(xǐ)干净(gān jìng)手(shǒu)，揪(jiū)下(xià)一(yì)小(xiǎo)块(kuài)面团(miàn tuán)，压(yā)扁(biǎn)，再(zài)包(bāo)进(jìn)甜甜(tián tián)的(de)豆沙馅(dòu shā xiàn)。弟弟(dì di)偷偷(tōu tōu)地(de)抓(zhuā)了(le)一(yì)把(bǎ)豆沙(dòu shā)塞(sāi)进(jìn)嘴(zuǐ)里(li)，被(bèi)妈妈(mā ma)看见(kàn jiàn)了(le)，大家(dà jiā)都(dōu)笑(xiào)了(le)。她(tā)一(yì)边(biān)包(bāo)一(yì)边(biān)数(shǔ)：“一(yí)个(gè)，两(liǎng)个(gè)，三(sān)个(gè)……”手指(shǒu zhǐ)上(shang)都(dōu)沾(zhān)满(mǎn)了(le)粉(fěn)。'),
    P(pics[4], '然后(rán hòu)，把(bǎ)圆圆(yuán yuán)的(de)面团(miàn tuán)放(fàng)进(jìn)木头(mù tou)模子(mú zi)里(li)，用力(yòng lì)一(yì)压(yā)，再(zài)轻轻(qīng qīng)一(yì)磕(kē)，一(yí)个(gè)印(yìn)着(zhe)花纹(huā wén)的(de)月饼(yuè bǐng)就(jiù)出来(chū lai)了(le)。小雨(xiǎo yǔ)做(zuò)了(le)六(liù)个(gè)，每(měi)一(yí)个(gè)的(de)样子(yàng zi)都(dōu)不(bù)一样(yí yàng)。月饼(yuè bǐng)上(shang)有(yǒu)小(xiǎo)花(huā)，有(yǒu)小(xiǎo)兔(tù)，还(hái)有(yǒu)一(yí)个(gè)小(xiǎo)月亮(yuè liang)。小雨(xiǎo yǔ)看(kàn)得(de)入迷(rù mí)了(le)。'),
    P(pics[5], '小雨(xiǎo yǔ)忽然(hū rán)想(xiǎng)起(qǐ)了(le)隔壁(gé bì)的(de)老奶奶(lǎo nǎi nai)。老奶奶(lǎo nǎi nai)一(yí)个(gè)人(rén)住(zhù)，孩子(hái zi)们(men)都(dōu)在(zài)很(hěn)远(yuǎn)的(de)地方(dì fang)。小雨(xiǎo yǔ)说(shuō)：“妈妈(mā ma)，我们(wǒ men)请(qǐng)奶奶(nǎi nai)一起(yì qǐ)过(guò)中秋(zhōng qiū)，好(hǎo)不好(bu hǎo)？”她(tā)想(xiǎng)，过节(guò jié)的(de)时候(shí hou)，最(zuì)怕(pà)一(yí)个(gè)人(rén)冷冷清清(lěng lěng qīng qīng)的(de)。妈妈(mā ma)听(tīng)了(le)，摸(mō)摸(mo)她(tā)的(de)头(tóu)。'),
    P(pics[6], '妈妈(mā ma)笑(xiào)着(zhe)点头(diǎn tóu)。小雨(xiǎo yǔ)用(yòng)一(yí)个(gè)红(hóng)盒子(hé zi)装(zhuāng)好(hǎo)月饼(yuè bǐng)，捧(pěng)着(zhe)它(tā)，和(hé)弟弟(dì di)一起(yì qǐ)去(qù)敲(qiāo)隔壁(gé bì)的(de)门(mén)。门(mén)开(kāi)了(le)，老奶奶(lǎo nǎi nai)又(yòu)惊讶(jīng yà)又(yòu)高兴(gāo xìng)，眼睛(yǎn jing)笑(xiào)成(chéng)了(le)一(yì)条(tiáo)线(xiàn)。老奶奶(lǎo nǎi nai)说(shuō)：“哎呀(āi yā)，我(wǒ)还(hái)以为(yǐ wéi)今年(jīn nián)的(de)中秋(zhōng qiū)只有(zhǐ yǒu)我(wǒ)和(hé)月亮(yuè liang)呢(ne)！”'),
    P(pics[7], '晚饭(wǎn fàn)后(hòu)，大家(dà jiā)坐(zuò)在(zài)后院(hòu yuàn)的(de)长椅(cháng yǐ)上(shang)。天(tiān)慢慢(màn màn)黑(hēi)了(le)，一(yì)轮(lún)又(yòu)圆(yuán)又(yòu)亮(liàng)的(de)月亮(yuè liang)从(cóng)树(shù)后面(hòu mian)爬(pá)了(le)上来(shàng lái)，把(bǎ)院子(yuàn zi)照(zhào)得(de)一片(yí piàn)银白(yín bái)。妈妈(mā ma)把(bǎ)切好(qiē hǎo)的(de)月饼(yuè bǐng)和(hé)热(rè)茶(chá)放(fàng)在(zài)小(xiǎo)桌子(zhuō zi)上(shang)，风(fēng)轻轻(qīng qīng)地(de)吹(chuī)着(zhe)，空气(kōng qì)里(li)有(yǒu)桂花(guì huā)的(de)香味(xiāng wèi)。'),
    P(pics[8], '爸爸(bà ba)给(gěi)大家(dà jiā)讲(jiǎng)了(le)嫦娥(cháng é)的(de)故事(gù shi)：很(hěn)久(jiǔ)很(hěn)久(jiǔ)以前(yǐ qián)，嫦娥(cháng é)飞(fēi)到(dào)了(le)月亮(yuè liang)上(shang)，身边(shēn biān)只(zhǐ)有(yǒu)一(yì)只(zhī)小(xiǎo)白兔(bái tù)。弟弟(dì di)仰(yǎng)着(zhe)头(tóu)问(wèn)：“那(nà)只(zhī)兔子(tù zi)现在(xiàn zài)还(hái)在(zài)吗(ma)？”小白兔(xiǎo bái tù)天天(tiān tiān)在(zài)旁边(páng biān)捣(dǎo)药(yào)，嫦娥(cháng é)常常(cháng cháng)想念(xiǎng niàn)地球(dì qiú)上(shang)的(de)家人(jiā rén)。大家(dà jiā)听(tīng)得(de)都(dōu)安静(ān jìng)了(le)。'),
    P(pics[9], '老奶奶(lǎo nǎi nai)咬(yǎo)了(le)一(yì)口(kǒu)月饼(yuè bǐng)，闭(bì)上(shang)眼睛(yǎn jing)慢慢(màn màn)地(de)嚼(jiáo)，然后(rán hòu)说(shuō)：“这(zhè)是(shì)我(wǒ)吃(chī)过(guò)的(de)最(zuì)特别(tè bié)的(de)点心(diǎn xin)，又(yòu)软(ruǎn)又(yòu)甜(tián)，像(xiàng)月亮(yuè liang)的(de)味道(wèi dào)。”弟弟(dì di)也(yě)抢(qiǎng)着(zhe)说(shuō)：“我(wǒ)觉得(jué de)比(bǐ)糖(táng)还(hái)好吃(hǎo chī)！”大家(dà jiā)笑(xiào)得(de)前仰后合(qián yǎng hòu hé)，笑声(xiào shēng)飘(piāo)得(de)好(hǎo)远(yuǎn)好(hǎo)远(yuǎn)。'),
    P(pics[10], '小雨(xiǎo yǔ)指(zhǐ)着(zhe)月亮(yuè liang)，轻轻(qīng qīng)地(de)说(shuō)：“外婆(wài pó)和(hé)爷爷(yé ye)奶奶(nǎi nai)在(zài)中国(zhōng guó)，也(yě)在(zài)看(kàn)同(tóng)一(yí)个(gè)月亮(yuè liang)吧(ba)？”爸爸(bà ba)点(diǎn)了(le)点(diǎn)头(tóu)：“对(duì)，不管(bù guǎn)隔(gé)得(de)多(duō)远(yuǎn)，我们(wǒ men)都(dōu)看(kàn)着(zhe)同(tóng)一(yí)个(gè)月亮(yuè liang)。”风(fēng)吹(chuī)过(guò)树叶(shù yè)，沙沙(shā shā)地(de)响(xiǎng)，好像(hǎo xiàng)在(zài)说(shuō)：“是(shì)呀(ya)，是(shì)呀(ya)。”夜风(yè fēng)有点(yǒu diǎn)凉(liáng)，可是(kě shì)大家(dà jiā)挨(āi)得(de)很(hěn)近(jìn)。'),
    P(pics[11], '夜(yè)深(shēn)了(le)，老奶奶(lǎo nǎi nai)抱(bào)了(le)抱(bào)小雨(xiǎo yǔ)，说(shuō)：“谢谢(xiè xie)你们(nǐ men)，今天(jīn tiān)我(wǒ)一点(yì diǎn)也(yě)不(bù)孤单(gū dān)。”小雨(xiǎo yǔ)抬(tái)头(tóu)看(kàn)着(zhe)月亮(yuè liang)，心里(xīn li)暖暖(nuǎn nuǎn)的(de)，觉得(jué de)分享(fēn xiǎng)比(bǐ)吃(chī)月饼(yuè bǐng)还(hái)要(yào)甜(tián)。月亮(yuè liang)高高(gāo gāo)地(de)挂(guà)在(zài)天上(tiān shang)，像(xiàng)一(yì)盏(zhǎn)大大(dà dà)的(de)灯(dēng)，照(zhào)着(zhe)每(měi)一(yí)个(gè)院子(yuàn zi)，也(yě)照(zhào)着(zhe)很(hěn)远(yuǎn)很(hěn)远(yuǎn)的(de)家(jiā)。'),
  ],
  words: [
    W('中秋节(zhōng qiū jié)', '农历(nóng lì)八月(bā yuè)十五(shí wǔ)，一家人(yì jiā rén)赏月(shǎng yuè)吃(chī)月饼(yuè bǐng)的(de)节日(jié rì)。', '🌕'),
    W('月饼(yuè bǐng)', '圆圆(yuán yuán)的(de)，里面(lǐ mian)有(yǒu)甜(tián)馅(xiàn)的(de)点心(diǎn xin)。', '🥮'),
    W('糯米粉(nuò mǐ fěn)', '用(yòng)糯米(nuò mǐ)磨(mó)成(chéng)的(de)粉(fěn)，做(zuò)出(chū)来(lái)又(yòu)软(ruǎn)又(yòu)黏(nián)。', '🍚'),
    W('豆沙(dòu shā)', '把(bǎ)红豆(hóng dòu)煮(zhǔ)烂(làn)做(zuò)成(chéng)的(de)甜(tián)馅(xiàn)。', '🫘'),
    W('模子(mú zi)', '让(ràng)东西(dōng xi)变(biàn)成(chéng)一样(yí yàng)形状(xíng zhuàng)的(de)工具(gōng jù)。', '🔨'),
    W('嫦娥(cháng é)', '传说(chuán shuō)中(zhōng)住(zhù)在(zài)月亮(yuè liang)上(shang)的(de)仙女(xiān nǚ)。', '👸'),
    W('孤单(gū dān)', '一(yí)个(gè)人(rén)，没有(méi yǒu)人(rén)陪(péi)。', '😔'),
    W('分享(fēn xiǎng)', '把(bǎ)自己(zì jǐ)的(de)好(hǎo)东西(dōng xi)给(gěi)别人(bié ren)一起(yì qǐ)用(yòng)。', '🤝'),
  ],
  quiz: [
    Q('中秋节(zhōng qiū jié)是(shì)农历(nóng lì)的(de)哪(nǎ)一(yì)天(tiān)？', ['八月(bā yuè)十五(shí wǔ)', '正月(zhēng yuè)初一(chū yī)', '五月(wǔ yuè)初五(chū wǔ)'], 0),
    Q('这(zhè)次(cì)他们(tā men)做(zuò)的(de)是(shì)什么(shén me)月饼(yuè bǐng)？', ['冰皮(bīng pí)月饼(yuè bǐng)', '烤(kǎo)的(de)月饼(yuè bǐng)', '巧克力(qiǎo kè lì)月饼(yuè bǐng)'], 0),
    Q('弟弟(dì di)偷偷(tōu tōu)做(zuò)了(le)什么(shén me)？', ['吃(chī)了(le)一(yì)把(bǎ)豆沙(dòu shā)', '打翻(dǎ fān)了(le)牛奶(niú nǎi)', '把(bǎ)月饼(yuè bǐng)藏(cáng)起来(qǐ lai)'], 0),
    Q('小雨(xiǎo yǔ)为什么(wèi shén me)想(xiǎng)请(qǐng)老奶奶(lǎo nǎi nai)？', ['老奶奶(lǎo nǎi nai)一(yí)个(gè)人(rén)住(zhù)', '老奶奶(lǎo nǎi nai)很(hěn)有钱(yǒu qián)', '老奶奶(lǎo nǎi nai)会(huì)做(zuò)饭(fàn)'], 0),
    Q('爸爸(bà ba)讲(jiǎng)的(de)故事(gù shi)里(li)，嫦娥(cháng é)身边(shēn biān)有(yǒu)什么(shén me)？', ['一(yì)只(zhī)小(xiǎo)白兔(bái tù)', '一(yì)只(zhī)小(xiǎo)黑猫(hēi māo)', '一(yì)条(tiáo)小(xiǎo)鱼(yú)'], 0),
    Q('小雨(xiǎo yǔ)最后(zuì hòu)觉得(jué de)什么(shén me)比(bǐ)月饼(yuè bǐng)更(gèng)甜(tián)？', ['分享(fēn xiǎng)', '睡觉(shuì jiào)', '玩(wán)游戏(yóu xì)'], 0),
  ],
};
