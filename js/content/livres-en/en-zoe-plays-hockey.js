// en-zoe-plays-hockey — English storybook, level 2 (see docs/LIVRES.md). Catch Unit 5: Game Time.
import { O, SKIN, svg, sky, ell, circ, rect, path, line, G, rnd, shadow, cloud, sun, pine, kid, adult, heart, sparkle, stars, moon, mug, sweat, motion } from './art/kit.js';

// ---- skates, stick, puck ----
const FEET = { stand: [[-11, -3], [11, -3]], walk: [[-17, -3], [15, -3]], run: [[-26, -9], [22, -1]], jump: [[-20, -10], [20, -10]], sit: [[-16, 2], [16, 2]] };
const blades = (x, y, s, legs = 'stand', flip = false) => G(x, y, s, (FEET[legs] || FEET.stand).map(([cx, cy]) => line(cx - 6, cy + 2, cx - 6, cy + 6, O, 2) + line(cx + 6, cy + 2, cx + 6, cy + 6, O, 2) + line(cx - 12, cy + 6, cx + 12, cy + 6, O, 5) + line(cx - 12, cy + 6, cx + 12, cy + 6, '#dfe7ef', 2.4)).join(''), flip);
// stick held low with both hands (kid arms 'hold'), blade on the ice to the right
const STICK = line(-10, -62, 36, -6, O, 8) + line(-10, -62, 36, -6, '#d9a05b', 4) + path('M34 -10 L60 -8 Q64 -4 60 0 L34 0Z', '#3a3f55', 2) + rect(-14, -66, 10, 12, '#1a1a1a', 0, 2, 'transform="rotate(-50 -9 -60)"');
const puck = (x, y, s = 1) => ell(x, y, 8 * s, 3.5 * s, '#1a1a1a', 2) + ell(x, y - 2 * s, 8 * s, 3 * s, '#2e2e2e', 0);

// ---- characters ----
// Zoe: purple toque with a yellow pompom, purple jersey with white stripes, long brown hair.
const ZO = { skin: SKIN.tan, hair: '#4a2c18', hs: 'long', hat: '#8e44ad', pom: '#f2c94c', hatBand: '#d6b4f0', shirt: '#8e44ad', stripe: '#ffffff', pants: '#2f3b52', shoes: '#1a1a1a', mitts: '#2f3b52' };
const zoe = (x, y, s, face = 'happy', arms = 'down', o = {}) => kid(x, y, s, { ...ZO, face, arms, ...o }) + blades(x, y, s, o.legs, o.flip);
// Zoe in goalie gear: big white pads, purple glove + blocker, white mask with a cage
const GOALIE = (glove = [-50, -78], blocker = [50, -78]) => rect(-24, -44, 20, 46, '#fff', 3, 7) + rect(4, -44, 20, 46, '#fff', 3, 7) + [-30, -16].map((yy) => rect(-24, yy, 20, 5, '#8e44ad', 0) + rect(4, yy, 20, 5, '#8e44ad', 0)).join('')
  + circ(glove[0], glove[1], 15, '#8e44ad') + ell(glove[0] + 2, glove[1] - 2, 8, 9, '#f6dcae', 2) + rect(blocker[0] - 10, blocker[1] - 16, 22, 30, '#fff', 3, 4) + rect(blocker[0] - 10, blocker[1] - 4, 22, 5, '#8e44ad', 0)
  + rect(-17, -110, 34, 32, 'none', 2.4, 8, 'stroke="#9aa8b8"') + line(-17, -96, 17, -96, '#9aa8b8', 2) + line(-17, -86, 17, -86, '#9aa8b8', 2) + line(-6, -110, -6, -78, '#9aa8b8', 2) + line(6, -110, 6, -78, '#9aa8b8', 2);
const goalie = (x, y, s, face = 'happy', o = {}) => kid(x, y, s, { ...ZO, hat: null, helmet: '#ffffff', hs: 'long', face, arms: 'reach', extra: GOALIE(o.glove, o.blocker), ...o }) + blades(x, y, s, o.legs, o.flip);
// Max: big brother, red toque, red jersey
const MX = { skin: SKIN.tan, hair: '#4a2c18', hs: 'short', hat: '#d9342b', pom: '#fff', hatBand: '#ffffff', shirt: '#d9342b', stripe: '#ffffff', pants: '#2f3b52', shoes: '#1a1a1a', mitts: '#2f3b52' };
const max = (x, y, s, face = 'happy', arms = 'down', o = {}) => kid(x, y, s, { ...MX, face, arms, ...o }) + blades(x, y, s, o.legs, o.flip);
// teammates (green toques? no: Snowy Owls wear purple jerseys like Zoe), Blue team in blue
const owl = (x, y, s, skin, hair, hs, face = 'happy', arms = 'cheer', o = {}) => kid(x, y, s, { skin, hair, hs, hat: '#5a6a8a', pom: '#fff', shirt: '#8e44ad', stripe: '#fff', pants: '#2f3b52', shoes: '#1a1a1a', mitts: '#2f3b52', face, arms, ...o }) + blades(x, y, s, o.legs, o.flip);
const blue = (x, y, s, face = 'mad', arms = 'hold', o = {}) => kid(x, y, s, { skin: SKIN.light, hair: '#e8a33c', hs: 'short', helmet: '#2b5bb8', shirt: '#2b7fd9', stripe: '#ffffff', pants: '#22325a', shoes: '#1a1a1a', mitts: '#22325a', face, arms, extra: arms === 'hold' ? STICK : '', ...o }) + blades(x, y, s, o.legs, o.flip);
const coach = (x, y, s, face = 'happy', arms = 'down', o = {}) => adult(x, y, s, { skin: SKIN.brown, hair: '#1e140d', hs: 'curly', coat: '#2f8f6a', scarf: '#f2c94c', pants: '#2f3b52', shoes: '#5a3e2b', mitts: '#f2c94c', face, arms, extra: line(-8, -80, 0, -60, '#e6493f', 2) + circ(0, -58, 4, '#c9ccd3', 2), ...o });
const mom = (x, y, s, face = 'happy', arms = 'hold', o = {}) => adult(x, y, s, { skin: SKIN.tan, hair: '#4a2c18', hs: 'ponytail', coat: '#f2a03d', hat: '#3f8f63', pom: '#fff', pants: '#34495e', shoes: '#5a3e2b', mitts: '#3f8f63', face, arms, ...o });

// ---- the outdoor rink ----
const net = (x, y, s = 1, flip = false) => G(x, y, s, shadow(0, 2, 34, 4) + rect(-28, -40, 56, 40, '#fff', 0, 0, 'opacity=".55"') + Array.from({ length: 6 }, (_, i) => line(-28 + i * 11, -40, -28 + i * 11, 0, '#b8c4d0', 1.5)).join('') + Array.from({ length: 4 }, (_, i) => line(-28, -32 + i * 9, 28, -32 + i * 9, '#b8c4d0', 1.5)).join('') + path('M-28 0 L-28 -40 L28 -40 L28 0', 'none', 9) + path('M-28 0 L-28 -40 L28 -40 L28 0', 'none', 5, 'stroke="#e6493f"') + path('M-28 0 L-40 6 L40 6 L28 0', 'none', 3, 'stroke="#9aa8b8"'), flip);
const lamp = (x, top, glow) => (glow ? circ(x, top, 46, 'url(#gLamp)', 0) : '') + line(x, top, x, 168, O, 6) + line(x, top, x, 168, '#8a93a3', 3) + rect(x - 12, top - 6, 24, 10, '#5a6270', 2.5, 3) + ell(x, top + 5, 9, 3, glow ? '#fff3a0' : '#e8eef5', 2);
const SKY = { day: () => sky('#8fcdf2', '#eef8ff') + sun(330, 46, 20) + cloud(90, 50) + cloud(220, 30, .7), eve: () => sky('#4b5aa6', '#f6b98a') + stars(8, 4, 60) + cloud(300, 60, .8, '#f9d9c8'), night: () => sky('#16204d', '#3f4a8f') + stars(30, 7, 120) + moon(330, 50, 18) };
const rink = (tod = 'eve', boards = true, lampX = 200) => SKY[tod]() + path('M-5 160 L-5 104 Q80 78 160 98 Q250 74 330 96 Q370 88 405 100 L405 160Z', tod === 'night' ? '#b9c6e0' : '#e3eef8', 0)
  + [10, 52, 96, 140, 260, 304, 348, 392].map((px, i) => pine(px, 150 + (i % 2) * 4, .5 + rnd(i) * .12, i % 2 ? '#2f7a55' : '#3f8f63', true)).join('')
  + lamp(lampX, 46, tod !== 'day') + path('M-5 152 Q30 136 60 148 Q100 134 140 150 Q180 136 220 148 Q270 132 310 148 Q350 136 405 150 L405 160 L-5 160Z', '#fff', 2.5)
  + (boards ? rect(-5, 150, 410, 28, '#fbfdff') + rect(-5, 150, 410, 6, '#4a90d9', 2.5) + rect(-5, 170, 410, 8, '#f2c94c', 2.5) + [60, 140, 260, 340].map((bx) => line(bx, 156, bx, 170, '#c8d3e0', 2)).join('') : '')
  + rect(-5, 178, 410, 127, 'url(#gIce)', 0) + line(-5, 178, 405, 178) + path('M196 178 L184 305', 'none', 6, 'stroke="#e6493f" opacity=".55"') + path('M104 178 L80 305 M300 178 L310 305', 'none', 5, 'stroke="#4a90d9" opacity=".35"')
  + Array.from({ length: 8 }, (_, i) => path(`M${Math.round(rnd(i + 3) * 380)} ${Math.round(200 + rnd(i + 9) * 90)} q30 -8 60 0`, 'none', 2, 'stroke="#fff" opacity=".8"')).join('');
const bench = (x, y, w = 150) => rect(x - w / 2, y - 30, w, 10, '#c98f5c', 3, 3) + rect(x - w / 2 + 8, y - 20, 8, 20, '#9c6a40') + rect(x + w / 2 - 16, y - 20, 8, 20, '#9c6a40');
const chair = (x, y, s = 1) => G(x, y, s, rect(-18, -64, 6, 64, '#9c6a40') + rect(12, -64, 6, 64, '#9c6a40') + rect(-18, -64, 36, 8, '#c98f5c') + rect(-18, -50, 36, 6, '#c98f5c') + rect(-22, -32, 44, 8, '#c98f5c') + line(-14, -24, -14, 0, O, 5) + line(16, -24, 16, 0, O, 5) + line(-14, -24, -14, 0, '#9c6a40', 2.5) + line(16, -24, 16, 0, '#9c6a40', 2.5));
const crowd = (n = 6) => [[30, SKIN.light, '#e6493f', '#c0392b'], [75, SKIN.dark, '#2f8f6a', '#f2c94c'], [120, SKIN.peach, '#4a90d9', '#fff'], [280, SKIN.brown, '#f2a03d', '#8e44ad'], [325, SKIN.tan, '#8e44ad', '#f2c94c'], [370, SKIN.light, '#3f5a8a', '#e6493f']].slice(0, n).map(([cx, sk, c, h], i) => `<g>${adult(cx, 178, .55, { skin: sk, coat: c, hat: h, face: i % 2 ? 'laugh' : 'happy', arms: 'cheer', hs: 'short', hair: '#4a2c18' })}</g>`).join('');
const fallStars = (x, y) => [0, 1, 2].map((i) => G(x + i * 16 - 16, y - (i % 2) * 8, .55, path('M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3Z', '#ffd84d', 2))).join('');
const spray = (x, y, dir = 1) => [0, 1, 2, 3, 4, 5].map((i) => circ(x + dir * (i * 6 + rnd(i) * 6), y - rnd(i + 4) * 18, 2 + rnd(i + 8) * 2.5, '#fff', 1.4)).join('');

export const book = {
  id: 'en-zoe-plays-hockey',
  title: 'Zoe Plays Hockey',
  emoji: '🏒',
  level: 2,
  minutes: 7,
  cover: svg(rink('eve') + net(340, 236, 1.1) + max(90, 258, .95, 'happy', 'cheer', { legs: 'walk' }) + zoe(210, 282, 1.15, 'grin', 'hold', { legs: 'run', extra: STICK }) + puck(292, 282, 1.1) + motion(150, 220, 3, 26) + sparkle(260, 200, .7)),
  pages: [
    {
      text: 'In winter, there is an outdoor rink in the park. The lights shine, the snow sparkles, and the ice is smooth and shiny. Every day after school, kids play hockey there. Zoe loves hockey. She has a purple toque and a purple jersey. But Zoe is the smallest player on her team, the Snowy Owls.',
      svg: svg(rink('eve') + net(50, 222, .8, true) + owl(110, 250, .82, SKIN.dark, '#1e140d', 'short', 'happy', 'hold', { extra: STICK, legs: 'run' }) + owl(300, 248, .88, SKIN.light, '#e8a33c', 'short', 'laugh', 'hold', { extra: STICK, legs: 'walk' }) + puck(170, 254) + zoe(215, 280, .62, 'happy', 'wave') + owl(370, 272, .9, SKIN.peach, '#6b4329', 'ponytail', 'happy', 'down')),
    },
    {
      text: 'Zoe skates fast, faster, and… boom! She falls on the ice again. Her stick slides away. “Are you okay?” asks her friend Noah. “I’m okay,” says Zoe. She stands up, but her legs wobble like jelly. Then her skates slip, and she falls down again. Boom! Hockey is hard when you are small.',
      svg: svg(rink('eve') + `<g transform="translate(196 270) rotate(-78)">${zoe(0, 0, .85, 'wow', 'up', { legs: 'jump' })}</g>` + fallStars(118, 158) + G(268, 266, .85, STICK, false, -18) + path('M200 282 q30 -6 60 0', 'none', 3, 'stroke="#fff"') + owl(330, 270, .9, SKIN.dark, '#1e140d', 'short', 'worried', 'reach', { flip: true }) + motion(250, 240, 3, 30)),
    },
    {
      text: 'When Zoe shoots the puck, it never goes in the net. It goes left. It goes right. Once, it flies over the boards and into a big snowbank! The other kids laugh. They are not mean, but Zoe feels sad. She sits alone on the bench and looks down at her skates.',
      svg: svg(rink('eve') + path('M250 140 Q275 70 318 120', 'none', 2.5, 'stroke="#5a6a8a" stroke-dasharray="5 6"') + path('M276 156 Q290 116 330 120 Q370 112 384 156Z', '#fff', 3) + path('M296 136 q20 -8 40 -2', 'none', 2, 'stroke="#c4d8ec"') + puck(326, 126, 1.3) + sparkle(352, 104, .5) + bench(150, 268, 170) + zoe(150, 260, .9, 'sad', 'down', { legs: 'sit' }) + owl(320, 290, .8, SKIN.light, '#e8a33c', 'short', 'laugh', 'down') + owl(380, 294, .7, SKIN.peach, '#6b4329', 'ponytail', 'laugh', 'hips')),
    },
    {
      text: 'Her big brother Max sits down next to her. Max is ten, and he is a very good skater. “Hey, don’t be sad,” he says. “Everybody falls when they learn. I can help you. Let’s practise together every day after school.” Zoe wipes her nose with her mitten and smiles. “Really? Every day?”',
      svg: svg(rink('eve') + net(330, 230, .8) + bench(190, 270, 230) + zoe(150, 262, .9, 'smile', 'down', { legs: 'sit' }) + max(240, 262, 1.02, 'happy', 'down', { legs: 'sit', L: [[-34, -82], [-58, -86]] }) + heart(196, 112, .9)),
    },
    {
      text: 'On Monday, Max teaches Zoe how to skate. “Bend your knees. Push with one foot, then glide. Push, glide! Push, glide!” Zoe holds a chair to help her. She moves very slowly, like a turtle on the ice. But she does not fall! “Good job!” says Max. “Tomorrow, you can try without the chair.”',
      svg: svg(rink('day') + zoe(128, 280, .9, 'worried', 'reach', { legs: 'walk', R: [[34, -76], [50, -82]] }) + chair(176, 276, 1) + max(300, 274, 1.02, 'grin', 'cheer', { legs: 'walk' }) + motion(104, 230, 3, 22)),
    },
    {
      text: 'On Tuesday, Max teaches her how to stop. On Wednesday, he shows her how to hold her stick with two hands. Day after day, Zoe practises in the cold, even when her nose is red and her toes are frozen. Little by little, she skates faster. She can stop, and she can turn. She falls less and less.',
      svg: svg(rink('night') + [110, 170, 230].map((cx) => path(`M${cx - 9} 262 L${cx} 240 L${cx + 9} 262Z`, '#ff8c2a', 2.5) + rect(cx - 6, 250, 12, 3, '#fff', 0)).join('') + zoe(190, 284, .95, 'grin', 'hold', { legs: 'run', extra: STICK }) + puck(258, 282) + spray(140, 278, -1) + max(330, 278, 1.0, 'happy', 'cheer') + sparkle(80, 210, .6) + sparkle(60, 240, .4)),
    },
    {
      text: 'On Thursday, Coach Ana blows her whistle. “I have bad news,” she says. “Our goalie, Sam, is sick with the flu. We need a goalie for the big game on Saturday. Who wants to try?” Nobody says a word. Then a small purple mitten goes up. “Me!” says Zoe. “I want to try!”',
      svg: svg(rink('eve') + net(360, 226, .8) + coach(80, 286, .9, 'worried', 'down') + path('M110 148 q8 -6 16 0 M106 140 q12 -10 24 0', 'none', 2.4, 'stroke="#fff"') + owl(170, 274, .78, SKIN.dark, '#1e140d', 'short', 'worried', 'down') + owl(290, 274, .8, SKIN.light, '#e8a33c', 'short', 'worried', 'down') + owl(350, 278, .78, SKIN.peach, '#6b4329', 'ponytail', 'worried', 'hips') + zoe(230, 294, .74, 'grin', 'wave', { R: [[34, -96], [42, -126]] }) + sparkle(268, 180, .6)),
    },
    {
      text: 'The goalie pads are very big. The mask is very big too. “I look like a giant marshmallow!” laughs Zoe. Max shoots the puck, and she stops it with her pad. He shoots again, and she catches it with her glove. Being a goalie is hard work. Zoe does not need to skate fast. She needs to be brave.',
      svg: svg(rink('day') + net(110, 262, 1.6) + goalie(110, 284, .92, 'laugh') + puck(60, 205) + path('M200 214 Q120 196 72 205', 'none', 2.5, 'stroke="#5a6a8a" stroke-dasharray="5 6"') + max(300, 282, 1.02, 'grin', 'hold', { flip: true, legs: 'walk', extra: STICK })),
    },
    {
      text: 'On Saturday, all the families come to the rink. The Snowy Owls play against the Blue Foxes. It is a great game! The score is three to two for the Owls, and there is only one minute left. Suddenly, the biggest Blue Fox skates very fast toward Zoe’s net. He shoots the puck very, very hard!',
      svg: svg(rink('day', false) + rect(-5, 150, 410, 28, '#fbfdff') + crowd() + rect(-5, 150, 410, 6, '#4a90d9', 2.5) + rect(-5, 170, 410, 8, '#f2c94c', 2.5) + net(76, 258, 1.4) + goalie(76, 280, .82, 'wow') + blue(270, 286, 1.12, 'mad', 'hold', { flip: true, legs: 'run' }) + puck(170, 262) + motion(200, 250, 3, 30, -1) + spray(330, 280, 1)),
    },
    {
      text: 'Zoe does not close her eyes. She jumps, stretches out her glove and… snap! The puck is in her glove! What a great save! The game is over, and the Snowy Owls win! The team jumps around Zoe on the ice. Max lifts her up high. “You did it!” he shouts. Zoe is so proud, she wants to sing.',
      svg: svg(rink('day', false, 355) + rect(-5, 150, 410, 28, '#fbfdff') + crowd(4) + rect(-5, 150, 410, 6, '#4a90d9', 2.5) + rect(-5, 170, 410, 8, '#f2c94c', 2.5) + net(200, 236, .9) + max(200, 288, 1.05, 'laugh', 'up', { R: [[40, -96], [18, -134]], L: [[-40, -96], [-18, -134]] }) + G(200, 178, .62, kid(0, 0, 1, { ...ZO, hat: null, helmet: '#fff', face: 'laugh', arms: 'cheer', legs: 'jump', extra: rect(-24, -44, 20, 46, '#fff', 3, 7) + rect(4, -44, 20, 46, '#fff', 3, 7) + rect(-24, -30, 20, 5, '#8e44ad', 0) + rect(4, -30, 20, 5, '#8e44ad', 0) + circ(-46, -100, 15, '#8e44ad') + puck(-46, -100, 1.2) })) + circ(181, 147, 7, '#2f3b52', 2.6) + circ(219, 147, 7, '#2f3b52', 2.6) + owl(80, 288, .82, SKIN.dark, '#1e140d', 'short', 'laugh', 'cheer', { legs: 'jump' }) + owl(320, 288, .82, SKIN.light, '#e8a33c', 'short', 'laugh', 'cheer', { legs: 'jump' }) + sparkle(120, 120, .8) + sparkle(290, 110, .9) + heart(340, 196, .7)),
    },
    {
      text: 'After the game, Mom brings hot chocolate in a big thermos. Everybody sits on the snowbank by the rink with warm cups in their hands. The stars come out, and the rink lights shine. Zoe takes a big sip and smiles at Max. “Thank you for helping me,” she says. “Next year, I want to score too!”',
      svg: svg(rink('night') + path('M-5 300 L-5 250 Q60 228 130 240 Q200 226 270 240 Q340 228 405 244 L405 300Z', 'url(#gSnow)') + mom(330, 272, .82, 'happy', 'hold', { extra: rect(-9, -72, 18, 30, '#c0392b', 2.5, 4) + rect(-7, -78, 14, 7, '#9aa8b8', 2, 2) }) + zoe(150, 286, .9, 'grin', 'hold', { legs: 'sit', extra: mug(0, -46, 1.1, '#f2c94c') }) + max(240, 286, 1.0, 'smile', 'hold', { legs: 'sit', extra: mug(0, -46, 1.1, '#4a90d9') }) + heart(196, 120, .9) + G(40, 270, .8, net(0, 0, 1))),
    },
  ],
  words: [
    { word: 'rink', emoji: '⛸️', def: 'A place with ice where people skate and play hockey.' },
    { word: 'puck', emoji: '🏒', def: 'A small, flat, black disk that hockey players hit with a stick.' },
    { word: 'goalie', emoji: '🥅', def: 'The player who stays in front of the net and stops the puck.' },
    { word: 'practise', emoji: '🔁', def: 'To do something again and again to get better at it.' },
    { word: 'wobble', emoji: '〰️', def: 'To move a little from side to side, not steady.' },
    { word: 'glide', emoji: '🛷', def: 'To move smoothly and easily on ice or snow.' },
    { word: 'brave', emoji: '🦁', def: 'Not afraid to do something hard or scary.' },
    { word: 'thermos', emoji: '🫖', def: 'A bottle that keeps a drink hot or cold for a long time.' },
  ],
  quiz: [
    { q: 'Why is hockey hard for Zoe at the start?', options: ['She has no skates', 'She is the smallest and she falls a lot', 'She does not like the cold'], answer: 1 },
    { q: 'Who helps Zoe practise every day?', options: ['Her brother Max', 'Coach Ana', 'Her friend Noah', 'Mom'], answer: 0 },
    { q: 'Why does the team need a new goalie?', options: ['The goalie is too tall', 'The goalie moved away', 'Sam is sick with the flu'], answer: 2 },
    { q: 'Why does Zoe say she looks like a giant marshmallow?', options: ['She is eating marshmallows', 'The white goalie pads and mask are very big', 'She fell in the snow'], answer: 1 },
    { q: 'Which thing happens LAST in the story?', options: ['Zoe makes a great save', 'Zoe tries the big pads', 'Zoe drinks hot chocolate', 'Zoe falls on the ice'], answer: 2 },
    { q: 'How does Zoe feel at the end of the game?', options: ['Sad and alone', 'Proud and happy', 'Angry at Max'], answer: 1 },
  ],
};
