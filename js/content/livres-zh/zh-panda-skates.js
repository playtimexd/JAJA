// zh-panda-skates — 熊猫学滑冰 (level 1). Pictures: ./art/zh-panda-skates.js
import { P, Z, W, Q } from './art/kit.js';
import { pics } from './art/zh-panda-skates.js';

export const book = {
  id: 'zh-panda-skates',
  title: '熊猫学滑冰',
  titleZh: Z('熊猫(xióng māo)学(xué)滑冰(huá bīng)'),
  emoji: '🐼',
  level: 1,
  minutes: 3,
  cover: pics[0],
  pages: [
    P(pics[1], '熊猫(xióng māo)胖胖(pàng pang)住(zhù)在(zài)山(shān)上(shang)。冬天(dōng tiān)到(dào)了(le)，天(tiān)很(hěn)冷(lěng)，山下(shān xià)的(de)湖(hú)结(jié)冰(bīng)了(le)。'),
    P(pics[2], '胖胖(pàng pang)看见(kàn jiàn)小朋友(xiǎo péng you)在(zài)冰(bīng)上(shang)玩(wán)。他们(tā men)滑(huá)得(de)又(yòu)快(kuài)又(yòu)好(hǎo)。胖胖(pàng pang)说(shuō)：“我(wǒ)也(yě)想(xiǎng)滑(huá)！”'),
    P(pics[3], '小雨(xiǎo yǔ)给(gěi)胖胖(pàng pang)一(yì)双(shuāng)冰鞋(bīng xié)。胖胖(pàng pang)穿(chuān)上(shang)冰鞋(bīng xié)，慢慢(màn màn)走(zǒu)到(dào)冰(bīng)上(shang)。'),
    P(pics[4], '哎呀(āi yā)！胖胖(pàng pang)的(de)脚(jiǎo)一(yì)滑(huá)，“砰(pēng)”的(de)一声(yì shēng)，摔倒(shuāi dǎo)了(le)。他(tā)的(de)屁股(pì gu)好(hǎo)疼(téng)！'),
    P(pics[5], '胖胖(pàng pang)又(yòu)站(zhàn)起来(qǐ lai)，又(yòu)摔倒(shuāi dǎo)了(le)。他(tā)摔(shuāi)了(le)五(wǔ)次(cì)，有点(yǒu diǎn)想(xiǎng)哭(kū)了(le)。'),
    P(pics[6], '小雨(xiǎo yǔ)跑(pǎo)过来(guò lai)，笑(xiào)着(zhe)说(shuō)：“胖胖(pàng pang)，别(bié)怕(pà)，慢慢(màn màn)来(lái)！我(wǒ)拉(lā)着(zhe)你(nǐ)的(de)手(shǒu)。”'),
    P(pics[7], '小雨(xiǎo yǔ)拉(lā)着(zhe)胖胖(pàng pang)，一(yí)步(bù)，两(liǎng)步(bù)，三(sān)步(bù)。胖胖(pàng pang)的(de)脚(jiǎo)不(bù)抖(dǒu)了(le)，他(tā)笑(xiào)了(le)。'),
    P(pics[8], '小兔(xiǎo tù)也(yě)来(lái)了(le)。小兔(xiǎo tù)说(shuō)：“用力(yòng lì)，向(xiàng)前(qián)滑(huá)！”胖胖(pàng pang)一(yí)用力(yòng lì)，滑(huá)出去(chū qu)了(le)！'),
    P(pics[9], '胖胖(pàng pang)滑(huá)呀(ya)滑(huá)，滑(huá)过(guò)小雨(xiǎo yǔ)，滑(huá)过(guò)小兔(xiǎo tù)。他(tā)大声(dà shēng)说(shuō)：“我(wǒ)会(huì)滑冰(huá bīng)了(le)！”'),
    P(pics[10], '大家(dà jiā)都(dōu)为(wèi)胖胖(pàng pang)拍手(pāi shǒu)。胖胖(pàng pang)笑(xiào)得(de)很(hěn)开心(kāi xīn)：“谢谢(xiè xie)你们(nǐ men)，明天(míng tiān)我(wǒ)还(hái)要(yào)来(lái)！”'),
  ],
  words: [
    W('熊猫(xióng māo)', '身上(shēn shang)黑(hēi)白(bái)两(liǎng)色(sè)，爱(ài)吃(chī)竹子(zhú zi)。', '🐼'),
    W('冰(bīng)', '水(shuǐ)很(hěn)冷(lěng)的(de)时候(shí hou)，会(huì)变(biàn)成(chéng)冰(bīng)。', '🧊'),
    W('冰鞋(bīng xié)', '在(zài)冰(bīng)上(shang)滑(huá)的(de)时候(shí hou)穿(chuān)的(de)鞋(xié)。', '⛸️'),
    W('摔倒(shuāi dǎo)', '站(zhàn)不(bú)住(zhù)，倒(dǎo)在(zài)地上(dì shang)。', '🤕'),
    W('拍手(pāi shǒu)', '两(liǎng)只(zhī)手(shǒu)一起(yì qǐ)拍(pāi)，表示(biǎo shì)高兴(gāo xìng)。', '👏'),
    W('湖(hú)', '很(hěn)大(dà)的(de)水(shuǐ)，在(zài)山(shān)下(xià)。', '🏞️'),
  ],
  quiz: [
    Q('胖胖(pàng pang)是(shì)什么(shén me)动物(dòng wù)？', ['熊猫(xióng māo)', '小兔(xiǎo tù)', '小猫(xiǎo māo)'], 0),
    Q('湖(hú)上(shang)为什么(wèi shén me)能(néng)滑冰(huá bīng)？', ['湖(hú)结(jié)冰(bīng)了(le)', '湖(hú)里(li)有(yǒu)鱼(yú)', '天(tiān)很(hěn)黑(hēi)'], 0),
    Q('谁(shuí)给(gěi)胖胖(pàng pang)冰鞋(bīng xié)？', ['小雨(xiǎo yǔ)', '小兔(xiǎo tù)', '妈妈(mā ma)'], 0),
    Q('胖胖(pàng pang)摔倒(shuāi dǎo)了(le)几(jǐ)次(cì)？', ['五(wǔ)次(cì)', '一(yì)次(cì)', '十(shí)次(cì)'], 0),
    Q('小雨(xiǎo yǔ)怎么(zěn me)帮(bāng)胖胖(pàng pang)？', ['拉(lā)着(zhe)他(tā)的(de)手(shǒu)', '背(bēi)着(zhe)他(tā)', '给(gěi)他(tā)吃(chī)的(de)'], 0),
    Q('最后(zuì hòu)，胖胖(pàng pang)怎么样(zěn me yàng)了(le)？', ['会(huì)滑冰(huá bīng)了(le)', '不(bù)想(xiǎng)滑(huá)了(le)', '回家(huí jiā)睡觉(shuì jiào)了(le)'], 0),
  ],
};
