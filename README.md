# Petit Hibou 🦉 — 2e année (Québec)

iPad 学习游戏（PWA 网页应用），对应魁北克 PFEQ 小学二年级：
**Français**（法语，母语课）· **Mathématique**（数学）· **Anglais**（ESL 第二语言，第一学段）。
界面默认法语，可切换英语。无需账号，进度保存在 iPad 本地。

## 在 Windows 上运行

```bash
node tools/serve.mjs
```

终端会打印两个地址：`http://localhost:5180`（电脑上试玩）和 `http://192.168.x.x:5180`（iPad 连同一个 Wi-Fi 时在 Safari 打开）。
如果 iPad 打不开，在 Windows 防火墙里允许 Node.js 访问“专用网络”。

## 安装到 iPad 主屏幕

Safari 打开地址 → 分享 ⬆️ → 「添加到主屏幕」。之后像 App 一样全屏运行。
**离线使用**需要 HTTPS 地址（例如发布到 GitHub Pages）；局域网 http 地址可以玩，但断网后不能打开。

## 真人感朗读（可选）

电脑上的服务器可以用微软 Azure 神经语音朗读（魁北克法语 Sylvie、加拿大英语 Clara），比 iPad 自带语音自然得多。没有密钥时自动用 iPad 自带语音。

1. 在 https://portal.azure.com 创建「语音服务 Speech service」，定价层选 **免费 F0**（每月 50 万字符），区域选 Canada Central。
2. 复制「密钥 1」，在本文件夹建 `.secrets/azure-speech.json`：`{"key": "你的密钥", "region": "canadacentral"}`
3. 测试：`node tools/tts.mjs "Bonjour!" fr-CA test.mp3`，然后重启 `node tools/serve.mjs`。

朗读过的句子缓存在 `.tts-cache/`，同一句不会重复计费。`.secrets` 和 `.tts-cache` 不会通过网络提供给 iPad。

## 内容结构

| 科目 | 单元 | 题型 |
|---|---|---|
| 数学（按 Numérik Cahier A/B/C 分组） | m1–m19：1000 以内数、位值、比较排序、奇偶、加法、减法、应用题、数列规律、分数、图形与立体、测量与时间、统计与概率、乘除的意义、心算、钱币（加币）、对称与方位、三册各一个「Je résous」情境应用题 | 程序生成，几乎无限题目 |
| 法语 | f1–f13：音与字母组合、音节、拼写词表、名词与限定词、阴阳性单复数、动词、句子、阅读理解（58 篇短文）、词汇、字母顺序、大写与标点、同音词、反义/近义/词族 | 344 词词库 + 生成 |
| 英语 | e1–e20：问候与情绪、颜色、数字、动物、身体、家庭、食物、衣服、教室、天气季节星期月份、动作、常用句与对话、玩具、房子、交通、方位、一天作息、节日、听故事答题、读故事答题 | 听音为主（语音朗读） |

每个单元 3 个难度（简单 / 中等 / 难），每局 8 / 12 / 16 题（家长页可选）；三档都可以自由选择。答错第一次可以再试，第二次显示正确答案。
「Défi du jour」每日挑战从三科各抽 3 题；每局有星星即得一张贴纸（相册共 52 张）。
家长页（⚙️ Parents，用乘法题挡住孩子）：孩子名字、界面语言、朗读开关与语速、音效、每个单元的星级与正确率、近 7 天学习分钟数。

## 开发

- 纯 HTML/CSS/ES 模块，无构建步骤、无依赖。
- 题目格式见 [docs/CONTENT.md](docs/CONTENT.md)。
- `node tools/check.mjs` — 校验三科所有单元 × 难度（每个生成 400 次）。
- `node tools/shot.mjs <输出目录> <url> <steps.json>` — 用无界面、静音的 Edge 按 iPad 尺寸截图。
- 改了文件后在 `sw.js` 里把 `VERSION` 加一，iPad 才会拿到新版本缓存。

## 游戏层（2026-11-15）
- 每科两级导航：科目 → 分区（数学 Cahier A/B/C；法语 4 区；英语 阅读跟读/单词/句子语法/口语）→ 冒险路线图，路线终点是「岛屿守护者」boss。
- 每个单元可选：📝 Pratique、⚡ Défi éclair（60 秒、连击倍数、个人纪录）、🎈 Ballons（3 条命、限时气球）。每科另有 ⚡ Quiz（混合闪电、马拉松）和 🎮 Jeux（气球、Memory 翻牌）。
- 🪶 羽毛货币、🔥 连续天数、每日 3 个任务、22 个徽章、猫头鹰装扮商店（js/game.js）。
- 🎨 Arts plastiques：js/content/arts/*.js（docs/ARTS.md），`node tools/check-arts.mjs` 校验，`tools/arts-preview.html?cat=dessin` 预览。
- 🎙️ Parle avec Hibou：OpenAI Realtime 英语口语对话 + 「Répète après moi」跟读；需要部署 worker/（见 worker/README.md），家长页填 URL 和家庭码。
- 题目数量统计：`node tools/count.mjs [subject]`。
