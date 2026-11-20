// Grade 3 ESL — Listening & speaking units g3e27 (listen to a dialogue), g3e28 (choose the reply), g3e29 (sounds / minimal pairs).
import { slots as S, storyUnit, say, mc, mkUnit, sortQ, rest, split, P, PF, COMP_INT, cap } from './anglais-core.js';

const pre = (p, a) => a.map((x) => p + x);
const tb = (fr, en) => ({ fr, en });

/* ================================================================== */
/*  g3e27 — Listen to a dialogue, then answer                         */
/* ================================================================== */
const dlg = {
  1: [
    { id: 'shop', sets: S('c it p', ['Mia|two apples|two', 'Leo|a sandwich|five', 'Zoe|a notebook|three', 'Sam|a pencil|one', 'Ava|a toy car|six', 'Max|a pack of gum|two']),
    text: (s) => `Clerk: Hello! Can I help you?\n${s.c}: Hello! I would like ${s.it}, please.\nClerk: Here you are. That is ${s.p} dollars.\n${s.c}: Thank you!`,
    qs: [
      (s, O) => ['What does the customer want?', s.it, O('it'), 'lit'],
      (s, O) => ['How much is it?', `${s.p} dollars`, O('p').map((x) => `${x} dollars`), 'lit'],
      () => ['Where are they?', 'in a store', ['in a bus', 'at the beach', 'at school'], 'inf'],
    ] },
    { id: 'wear', sets: S('w c', ['sunny|a hat', 'rainy|a raincoat', 'snowy|boots', 'windy|a jacket', 'cold|a warm scarf', 'hot|shorts']),
    text: (s) => `Mom: How is the weather today?\nKid: It is ${s.w}.\nMom: What do you want to wear?\nKid: I want to wear ${s.c}.\nMom: Good idea!`,
    qs: [
      (s, O) => ['What is the weather like?', s.w, O('w'), 'lit'],
      (s, O) => ['What does the child want to wear?', s.c, O('c'), 'lit'],
      () => ['Who is the child talking to?', 'Mom', ['the teacher', 'a friend', 'a doctor'], 'lit'],
    ] },
    { id: 'day', sets: S('d s', ['Monday|math', 'Tuesday|music', 'Wednesday|gym', 'Thursday|art', 'Friday|science', 'Monday|reading']),
    text: (s) => `Ben: What day is it today?\nAna: It is ${s.d}.\nBen: What class do we have?\nAna: We have ${s.s}!\nBen: Great!`,
    qs: [
      (s, O) => ['What day is it?', s.d, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].filter((x) => x !== s.d).slice(0, 3), 'lit'],
      (s, O) => ['What class do they have?', s.s, O('s'), 'lit'],
      () => ['How does Ben feel?', 'happy', ['sad', 'angry', 'sleepy'], 'inf'],
    ] },
    { id: 'snack', sets: S('f dr', ['an apple|milk', 'a banana|juice', 'a cookie|water', 'some cheese|milk', 'some grapes|juice', 'a sandwich|water']),
    text: (s) => `Mom: Are you hungry?
Kid: Yes, I am.
Mom: Do you want ${s.f}?
Kid: Yes, please!
Mom: And what do you want to drink?
Kid: ${cap(s.dr)}, please.`,
    qs: [
      () => ['How does the child feel?', 'hungry', ['sleepy', 'cold', 'sad'], 'lit'],
      (s, O) => ['What does the child want to eat?', s.f, O('f'), 'lit'],
      (s, O) => ['What does the child want to drink?', s.dr, ['milk', 'juice', 'water', 'soup'].filter((x) => x !== s.dr).slice(0, 3), 'lit'],
    ] },
  ],
  2: [
    { id: 'invite', sets: S('b act d t pl', ['Noah|go skating|Saturday|ten o’clock|rink', 'Ella|play soccer|Sunday|two o’clock|park', 'Omar|watch a movie|Friday|six o’clock|cinema', 'Lily|ride bikes|Saturday|nine o’clock|school', 'Theo|build a snow fort|Sunday|eleven o’clock|yard']),
    text: (s) => `Jade: Hi, ${s.b}! Do you want to ${s.act} on ${s.d}?\n${s.b}: I would love to! What time?\nJade: At ${s.t}. Meet me at the ${s.pl}.\n${s.b}: OK. See you there!`,
    qs: [
      (s, O) => ['What does Jade want to do?', s.act, O('act'), 'lit'],
      (s, O) => ['When will they meet?', s.d, O('d'), 'lit'],
      (s, O) => ['What time will they meet?', s.t, O('t'), 'lit'],
      (s, O) => ['Where will they meet?', `at the ${s.pl}`, pre('at the ', O('pl')), 'lit'],
      (s) => [`Does ${s.b} accept the invitation?`, 'Yes, happily.', ['No, never.', 'Maybe next year.', 'No, it is too late.'], 'inf'],
    ] },
    { id: 'lostkid', sets: S('n a c', ['Lucas|six|a green coat', 'Mila|seven|a red scarf', 'Hugo|five|a yellow jacket', 'Anna|eight|a blue hat', 'Ravi|six|a black coat']),
    text: (s) => `Guard: Hello. What is your name?\n${s.n}: I am ${s.n}.\nGuard: How old are you?\n${s.n}: I am ${s.a}.\nGuard: What is your mom wearing?\n${s.n}: She is wearing ${s.c}.\nGuard: Do not worry. We will find her.`,
    qs: [
      (s, O) => ['What is the child’s name?', s.n, O('n'), 'lit'],
      (s, O) => ['How old is the child?', s.a, O('a'), 'lit'],
      (s, O) => ['What is the mom wearing?', s.c, O('c'), 'lit'],
      () => ['What problem does the child have?', 'The child is lost.', ['The child is hungry.', 'The child is sleepy.', 'The child is sick.'], 'inf'],
    ] },
    { id: 'order', sets: S('dr f ds', ['juice|a sandwich|no', 'milk|pizza|yes, an ice cream', 'water|soup|no', 'hot chocolate|pancakes|yes, a cookie', 'orange juice|pasta|yes, a fruit cup']),
    text: (s) => `Waiter: What would you like to drink?\nKid: ${cap(s.dr)}, please.\nWaiter: And to eat?\nKid: ${cap(s.f)}, please.\nWaiter: Would you like a dessert?\nKid: ${cap(s.ds)}.`,
    qs: [
      (s, O) => ['What does the child drink?', s.dr, O('dr'), 'lit'],
      (s, O) => ['What does the child eat?', s.f, O('f'), 'lit'],
      (s) => ['Does the child want a dessert?', s.ds === 'no' ? 'No' : 'Yes', [s.ds === 'no' ? 'Yes' : 'No', 'Maybe', 'We do not know'], 'inf'],
      () => ['Where are they?', 'in a restaurant', ['at school', 'on a bus', 'at the pool'], 'inf'],
    ] },
  ],
  3: [
    { id: 'way', sets: S('pl t l n', ['library|left|bakery|the park', 'pharmacy|right|bank|the school', 'cinema|left|toy store|the museum', 'post office|right|fire station|the library', 'museum|left|corner store|the bridge']),
    text: (s) => `Tourist: Excuse me, where is the ${s.pl}?\nWoman: Go straight, then turn ${s.t} at the ${s.l}.\nTourist: Turn ${s.t} at the ${s.l}?\nWoman: Yes. The ${s.pl} is next to ${s.n}.\nTourist: Thank you very much!\nWoman: You are welcome!`,
    qs: [
      (s, O) => ['Where does the tourist want to go?', `the ${s.pl}`, pre('the ', O('pl')), 'lit'],
      (s) => [`Which way does the tourist turn?`, s.t, [s.t === 'left' ? 'right' : 'left', 'straight on', 'back'], 'lit'],
      (s, O) => ['Where does the tourist turn?', `at the ${s.l}`, pre('at the ', O('l')), 'lit'],
      (s, O) => [`What is the ${s.pl} next to?`, s.n, O('n'), 'lit'],
      (s) => ({ q: 'Put the directions in order.', seq: ['Go straight.', `Turn ${s.t} at the ${s.l}.`, `Find the ${s.pl}.`] }),
    ] },
    { id: 'plan', sets: S('sp w alt', ['soccer|raining|a board game', 'baseball|very cold|hot chocolate and a movie', 'hockey|too warm for the ice|a bike ride', 'tennis|windy|cards inside', 'swimming|stormy|a puzzle']),
    text: (s) => `Kai: We cannot play ${s.sp} today.\nEli: Why not?\nKai: It is ${s.w}.\nEli: That is too bad. What about ${s.alt}?\nKai: Good idea! Let’s do that.`,
    qs: [
      (s, O) => ['What did they want to do?', `play ${s.sp}`, pre('play ', O('sp')), 'lit'],
      (s, O) => ['Why can they not do it?', `It is ${s.w}.`, O('w').map((x) => `It is ${x}.`), 'lit'],
      (s, O) => ['What is the new plan?', s.alt, O('alt'), 'lit'],
      () => ['How does Kai feel about the new plan?', 'happy with it', ['angry about it', 'afraid of it', 'bored by it'], 'inf'],
      () => ['What does “That is too bad” mean?', 'I am sorry about that.', ['That is very funny.', 'That is a bad word.', 'That is my favourite.'], 'voc'],
    ] },
    { id: 'pa', sets: S('d l a r f', ['Monday|pizza|a library visit|library|your library card', 'Tuesday|soup and bread|a music show|gym|a warm sweater', 'Wednesday|pasta|a hockey practice|rink|your skates', 'Thursday|chicken and rice|a science fair|cafeteria|your project', 'Friday|tacos|a movie|gym|a pillow']),
    text: (s) => `Principal: Good morning, students! Today is ${s.d}. Lunch is ${s.l}. After school, there is ${s.a} in the ${s.r}. Please do not forget ${s.f}. Have a great day!`,
    qs: [
      (s, O) => ['What is for lunch?', s.l, O('l'), 'lit'],
      (s, O) => ['What is happening after school?', s.a, O('a'), 'lit'],
      (s, O) => ['Where is it happening?', `in the ${s.r}`, pre('in the ', O('r')), 'lit'],
      (s, O) => ['What must students remember?', s.f, O('f'), 'lit'],
      () => ['Who is speaking?', 'the principal', ['a student', 'a bus driver', 'a parent'], 'inf'],
    ] },
  ],
};
const listen = storyUnit('g3e27', '🎧', { fr: 'J’écoute un dialogue', en: 'Listen to a dialogue' }, PF + `${COMP_INT} — écouter un court dialogue et répondre à des questions`, dlg, { listen: true, strip: true });

/* ================================================================== */
/*  g3e28 — Choose the right reply                                    */
/* ================================================================== */
const parse = (rows) => rows.map((r) => { const [p, a, ...w] = split(r); return { p, a, w }; });
const REP = {
  1: parse(['Hello! How are you?|I am fine, thank you.|I am eight.|It is red.', 'What is your name?|My name is Mia.|I am fine.|It is Monday.', 'How old are you?|I am eight years old.|I am fine.|My name is Sam.', 'Good morning!|Good morning!|Good night!|I am eight.',
    'Goodbye! See you tomorrow.|See you!|Good morning!|I am hungry.', 'Thank you!|You are welcome.|I am sorry.|Good night.', 'I am sorry.|That is OK.|You are welcome.|Yes, please.', 'Do you like pizza?|Yes, I do.|Yes, it is.|I am eight.',
    'Can you swim?|Yes, I can.|Yes, I do.|It is big.', 'What colour is it?|It is blue.|It is Monday.|I am fine.', 'Where is my hat?|It is on the chair.|I like cheese.|My name is Leo.', 'What time is it?|It is three o’clock.|It is Monday.|I am three.',
    'What day is it today?|It is Friday.|It is three o’clock.|It is sunny.', 'How is the weather?|It is sunny.|It is Tuesday.|My name is Zoe.', 'Are you hungry?|Yes, I am.|Yes, I can.|It is red.', 'Is this your book?|Yes, it is.|Yes, I am.|My name is Ben.',
    'Do you have a pet?|Yes, I have a dog.|Yes, it is.|It is Monday.', 'What is your favourite colour?|My favourite colour is green.|I like Mondays.|It is eight.', 'Happy birthday!|Thank you!|You are welcome.|Good morning!', 'Would you like some juice?|Yes, please.|Yes, I am.|It is red.',
    'Let’s play a game!|Good idea!|Goodbye!|I am eight.', 'Who is your teacher?|My teacher is Ms. Roy.|It is Monday.|I am fine.', 'Where do you live?|I live in Québec.|I am eight.|It is blue.', 'Do you like soccer?|Yes, I love it!|It is on the table.|My name is Max.',
    'What is this?|It is a pencil.|I am a pencil.|It is Tuesday.', 'How many apples are there?|There are three.|It is red.|I am fine.', 'Can I have a cookie, please?|Sure. Here you are.|It is blue.|I am eight.', 'See you later!|See you!|Good morning.|Thank you.',
    'Excuse me.|Yes? How can I help?|Good night.|I like pizza.', 'It is cold today.|Put on your coat.|It is eight.|I like pizza.', 'Are you OK?|Yes, I am fine.|Yes, I do.|It is a dog.', 'I like your hat.|Thank you!|You are welcome.|I am sorry.',
    'Time to go home!|OK, let’s go.|Good morning.|It is red.', 'Do you want to play?|Yes, let’s play!|Yes, it is.|I am fine.', 'Where is the library?|It is down the hall.|It is Monday.|I am eight.', 'How do you spell cat?|C-A-T.|It is a cat.|I am a cat.',
    'What do you want for lunch?|I want a sandwich.|I am eight.|It is Monday.', 'Whose bag is this?|It is mine.|It is Monday.|I am fine.', 'Are you ready?|Yes, I am ready.|Yes, I can.|It is red.', 'Do you want to sit here?|Yes, thank you.|I am five.|It is Friday.',
    'Is it raining?|Yes, it is.|Yes, I am.|My name is Sam.', 'What is your phone number?|It is five five five, one two three four.|It is Tuesday.|I am eight.', 'Can you help me?|Sure. What do you need?|It is a pencil.|I am eight.', 'Do you like snow?|Yes, I like to play in it.|It is on the table.|I am fine.']),
  2: parse(['What did you do on the weekend?|I went skating with my cousin.|I like skating very much.|It is a big rink.', 'What are you doing?|I am drawing a picture.|I draw pictures every day.|It is a picture.', 'What is your brother like?|He is funny and kind.|He is eight.|He is in the kitchen.',
    'Why are you late?|Because I missed the bus.|Because it is blue.|I am eight.', 'How do you go to school?|I go by bus.|I go at eight.|I go to school.', 'What do you usually eat for breakfast?|I usually eat cereal.|I ate cereal yesterday.|I like breakfast.',
    'Where were you yesterday?|I was at my grandma’s house.|I will be at the park.|I am at school.', 'How was your trip?|It was great. We saw a whale.|It is in the car.|I was on a trip.', 'Do you want to come to my house?|Yes, I would love to.|Yes, it is a house.|No, it is a big house.',
    'What time does the movie start?|It starts at seven o’clock.|It starts a movie.|It was good.', 'Can you lend me a pencil?|Sure. Here you go.|Yes, it is yellow.|I have a pencil.', 'What would you like to drink?|Water, please.|I drank water yesterday.|The water is wet.',
    'Is this seat taken?|No, you can sit here.|Yes, it is a seat.|No, I am taken.', 'How much is this book?|It is six dollars.|It is a good book.|It is on the shelf.', 'Who is that boy?|He is my cousin.|It is a boy.|She is my cousin.',
    'Did you finish your homework?|Yes, I finished it.|Yes, I will finish.|No, it is homework.', 'Whose turn is it?|It is my turn.|It is turn.|It is Tuesday.', 'What are you going to do tomorrow?|I am going to visit my aunt.|I visited my aunt.|I am visiting yesterday.',
    'How long is the movie?|It is two hours long.|It is two dollars.|It is at two.', 'What is the matter?|I have a stomach ache.|I have a stomach ache yesterday.|It is a matter.', 'Would you like to play outside?|Yes, but I need my boots.|Yes, I am boots.|No, I am outside.',
    'Where is the nearest park?|It is two blocks away.|It is a nice park.|I like the park yesterday.', 'Do you know how to swim?|Yes, I learned last summer.|Yes, I swim yesterday.|No, it is a lake.', 'What is your favourite subject?|I love science.|I love the school.|My subject is Monday.',
    'How often do you read?|I read every night.|I read a book.|I read at the library.', 'Have you got a pet?|Yes, I have a hamster named Nibbles.|Yes, I am a hamster.|No, it is a pet.', 'What does your mom do?|She is a nurse.|She is nurse.|She does a nurse.',
    'When is your birthday?|It is in October.|It is on blue.|I am eight in October.', 'Did you see the game last night?|Yes, our team won!|Yes, I see it.|No, I will see.', 'Can I help you?|Yes, I am looking for a red notebook.|Yes, I am a notebook.|It is a red.',
    'What is the weather going to be like?|It is going to snow.|It snowed in the morning.|It is snow.', 'Which one do you want?|I want the blue one.|I want a blue.|The blue wants.', 'Are you coming to the party?|Yes, I will be there at two.|Yes, I coming.|No, I am a party.',
    'How do you feel today?|I feel a little tired.|I am feeling yesterday.|I feel a tired.', 'What happened to your arm?|I fell off my bike.|I fall off my bike tomorrow.|It is an arm.', 'Where did you buy that?|I bought it at the mall.|I buy it in the mall yesterday.|It is a mall.',
    'Do you have any brothers or sisters?|Yes, I have one sister.|Yes, I am a sister.|I have one brothers.', 'How was school today?|It was fun. We did an experiment.|It is school.|We will do an experiment yesterday.', 'What are you reading?|I am reading a story about a fox.|I am a fox.|It is a fox.',
    'Why is the sky red?|Because the sun is going down.|Because it is a sky.|It is red.', 'What is for dinner?|We are having soup.|We have soup yesterday.|It is dinner.']),
  3: parse(['Would you like to come to my party on Saturday?|I would love to, thank you!|Yes, it is on Saturday.|No, I am a party.', 'I am really sorry I broke your toy.|That is OK. It was an accident.|You are welcome.|It is a toy.', 'Could you please close the window?|Of course. It is a bit cold.|Yes, it is a window.|The window is closed yesterday.',
    'I can’t find my glasses anywhere.|Did you look in your bag?|You are welcome.|Glasses are for eyes.', 'Do you mind if I sit here?|Not at all. Go ahead.|Yes, I am sitting.|I mind sitting.', 'What do you think about the new playground?|I think it is great. I love the slide.|I am thinking about a playground.|It is on the street.',
    'I got a good mark on my test!|Congratulations! You studied hard.|I got a mark.|It is a test.', 'It is my turn to choose the game.|OK. Which game do you want?|Yes, it is a game.|I choose a turn.', 'Could you tell me the time, please?|Sure. It is a quarter past four.|Yes, it is time.|It is a quarter.',
    'Excuse me, is this the bus to the mall?|Yes, it is. Please get on.|No, I am a bus.|It is a mall.', 'I feel sick. May I go to the nurse?|Of course. Do you want a friend to walk with you?|Yes, you are a nurse.|It is a nurse.', 'What would you like to be when you grow up?|I would like to be a vet.|I am growing up.|A vet is a pet.',
    'Why did you not come to school yesterday?|I had a fever, so I stayed home.|I will not come tomorrow.|It was school.', 'I think we should recycle more.|I agree. We can start with our bottles.|I recycle yesterday.|Yes, it is more.', 'Can I borrow your eraser? I forgot mine.|Sure. Please give it back later.|Yes, you can erase.|An eraser is mine.',
    'Which would you rather have, pizza or pasta?|I would rather have pizza.|I rather pasta yesterday.|Pizza or pasta is a food.', 'Do you know where I put my boots?|They are by the door.|They put by the door yesterday.|Boots are on feet.', 'I have lost my phone number.|Do not worry. I will help you look for it.|You are welcome.|Phone number is a phone.',
    'How about going to the park after lunch?|Great idea! I will bring a ball.|I go to the park yesterday.|After lunch is a time.', 'Please wait here. I will be back in a minute.|OK. I will wait.|OK. I waited yesterday.|A minute is wait.', 'I am sorry, I did not hear you. Could you repeat that?|Sure. I said it is time for lunch.|Yes, I did hear.|It is a repeat.',
    'My team lost the game.|That is too bad. You played well.|Congratulations!|It is a team.', 'Are you allowed to play outside after dinner?|Yes, if I finish my homework.|Yes, I am a dinner.|No, I am allowed yesterday.', 'Would you like some more soup?|No, thank you. I am full.|No, I am a soup.|Yes, I am soup.',
    'What is the difference between a frog and a toad?|A frog has smooth skin, and a toad has bumpy skin.|A frog is a toad.|Frogs and toads are Tuesday.', 'Is anybody sitting here?|No, you can sit down.|Yes, I am anybody.|It is sitting.', 'Would you rather go skating or sledding?|I would rather go sledding.|I rather skate yesterday.|Skating is sledding.',
    'I made a card for you.|Thank you! It is beautiful.|You are welcome.|A card is for me.', 'May I have a glass of water, please?|Certainly. Here you are.|It is a glass.|You may water.', 'I think I left my lunch box on the bus.|Let’s ask the driver tomorrow.|It is a bus.|Lunch is yesterday.',
    'How long have you lived in this city?|I have lived here for five years.|I live here five years ago.|It is a long city.', 'Why do you like winter?|Because I love to go sledding.|Because winter is a season.|I like winter yesterday.', 'It is so noisy in here!|I know. Let’s go to a quiet room.|Yes, it is a noise.|Noisy is here.',
    'Did you remember to bring your homework?|Yes, it is in my bag.|Yes, I will remember.|Homework is a bag.', 'Pardon me, I think you dropped this.|Oh, thank you very much!|You are welcome.|It is a drop.', 'We should say sorry to Mia.|You are right. Let’s go now.|Mia is sorry.|We say sorry yesterday.',
    'I do not understand this word.|Let’s look it up in the dictionary.|I understand it is a word.|A word is understand.', 'What a beautiful drawing!|Thank you. I worked on it for a long time.|You are welcome.|A drawing is beautiful.', 'Do you want to share my umbrella?|Yes, please. It is pouring.|Yes, I am an umbrella.|Share is rain.']),
};
const replies = mkUnit('g3e28', '💬', { fr: 'Choisir la bonne réponse', en: 'Choose the reply' }, PF + `${COMP_INT} — réagir à une question ou à une phrase dans une conversation`, {
  1: [
    (R) => { const x = R.pick(REP[1]); return mc(`g3e28:1a:${x.p}`, P.reply, x.a, R.sample(x.w, Math.min(2, x.w.length)), { say: say(x.p), stimulus: { emoji: '🎧' }, cols: 1, tip: tb('Écoute bien la question, puis choisis la réponse qui lui va.', 'Listen carefully, then pick the reply that fits.') }); },
    (R) => { const x = R.pick(REP[1]); return mc(`g3e28:1b:${x.p}`, tb('Lis. Quelle est la bonne réponse?', 'Read. What is the best reply?'), x.a, R.sample(x.w, Math.min(2, x.w.length)), { stimulus: { text: x.p }, cols: 1 }); },
    (R) => { const x = R.pick(REP[1]); const o = R.sample(REP[1].filter((y) => y.p !== x.p), 2).map((y) => y.p); return mc(`g3e28:1c:${x.a}`, tb('Écoute la réponse. Quelle question va avec?', 'Listen to the answer. Which question goes with it?'), x.p, o, { say: say(x.a), stimulus: { emoji: '🎧' }, cols: 1 }); },
  ],
  2: [
    (R) => { const x = R.pick(REP[2]); return mc(`g3e28:2a:${x.p}`, P.reply, x.a, R.sample(x.w, Math.min(2, x.w.length)), { say: say(x.p), stimulus: { emoji: '🎧' }, cols: 1, tip: tb('Fais attention au temps du verbe (hier, maintenant, demain).', 'Pay attention to the verb tense (yesterday, now, tomorrow).') }); },
    (R) => { const x = R.pick(REP[2]); return mc(`g3e28:2b:${x.p}`, tb('Lis. Quelle est la bonne réponse?', 'Read. What is the best reply?'), x.a, x.w, { stimulus: { text: x.p }, cols: 1 }); },
    (R) => { const x = R.pick(REP[2]); const o = R.sample(REP[2].filter((y) => y.p !== x.p), 2).map((y) => y.p); return mc(`g3e28:2c:${x.a}`, tb('Écoute la réponse. Quelle question va avec?', 'Listen to the answer. Which question goes with it?'), x.p, o, { say: say(x.a), stimulus: { emoji: '🎧' }, cols: 1 }); },
  ],
  3: [
    (R) => { const x = R.pick(REP[3]); return mc(`g3e28:3a:${x.p}`, P.reply, x.a, x.w, { say: say(x.p), stimulus: { emoji: '🎧' }, cols: 1, tip: tb('Cherche la réponse polie et qui répond vraiment à la question.', 'Look for the polite reply that really answers the question.') }); },
    (R) => { const x = R.pick(REP[3]); return mc(`g3e28:3b:${x.p}`, tb('Lis. Quelle est la meilleure réponse?', 'Read. What is the best reply?'), x.a, x.w, { stimulus: { text: x.p }, cols: 1 }); },
    (R) => { const x = R.pick(REP[3]); return mc(`g3e28:3c:${x.a}`, tb('Écoute la réponse. Quelle phrase vient avant?', 'Listen to the reply. Which sentence comes before it?'), x.p, R.sample(REP[3].filter((y) => y.p !== x.p), 2).map((y) => y.p), { say: say(x.a), stimulus: { emoji: '🎧' }, cols: 1 }); },
    (R) => { const x = R.pick(REP[3]); return { type: 'order', key: `g3e28:3d:${x.p}`, prompt: tb('Remets la conversation dans l’ordre.', 'Put the conversation in order.'), say: say(x.p), tiles: [x.p, x.a], joiner: ' ' }; },
  ],
});

/* ================================================================== */
/*  g3e29 — Sounds: minimal pairs, th, sh/ch, rhymes, silent letters   */
/* ================================================================== */
const PAIRS = split(['ship|sheep|🚢|🐑|vowel', 'sit|seat|||vowel', 'bit|beat|||vowel', 'fill|feel|||vowel', 'full|fool|||vowel', 'live|leave|||vowel', 'hit|heat|||vowel', 'bad|bed|||vowel', 'man|men|👨|👨‍👩‍👧|vowel', 'pan|pen|🍳|🖊️|vowel', 'cat|cut|🐱||vowel', 'hat|hut|🎩|🛖|vowel', 'bag|bug|👜|🐛|vowel', 'cap|cup|🧢|☕|vowel',
  'think|sink|||th', 'thin|tin|||th', 'three|tree|3️⃣|🌳|th', 'thank|tank|||th', 'they|day|||th', 'then|den|||th', 'bath|bat|||th', 'math|mass|||th',
  'ship|chip|🚢||shch', 'chair|share|🪑||shch', 'watch|wash|⌚||shch', 'cheap|sheep||🐑|shch', 'cheese|she’s|🧀||shch', 'chin|shin|||shch',
  'hat|at|🎩||h', 'heat|eat|||h', 'hair|air|💇||h', 'hand|and|✋||h', 'hear|ear||👂|h', 'hall|all|||h', 'his|is|||h',
  'very|berry||🫐|vb', 'vest|best|||vb', 'west|vest|||vb', 'jeep|cheap|||jch', 'joke|choke|||jch', 'jar|char|||jch'].join(';').replace(/;/g, '|;|')).join('|').split('|;|').map((x) => { const a = x.split('|'); return { a: a[0], b: a[1], ea: a[2], eb: a[3], t: a[4] }; });
const RHYME = { cat: 'hat,bat,mat,rat', sheep: 'keep,sleep,deep,jeep', ship: 'trip,lip,chip,zip', boat: 'goat,coat,float,note', snow: 'grow,show,toe,know', light: 'night,right,kite,bite', tree: 'bee,key,free,three', dog: 'log,frog,fog,jog', star: 'car,far,jar,bar', cake: 'lake,snake,make,bake', rain: 'train,plane,brain,chain', mouse: 'house,blouse,louse,spouse' };
const SILENT = ['knee', 'write', 'comb', 'lamb', 'night', 'walk', 'climb', 'hour', 'listen', 'castle', 'knife', 'wrong', 'island', 'talk', 'thumb', 'knock'];
const NOSIL = ['cat', 'dog', 'sun', 'red', 'hand', 'book', 'jump', 'fish', 'pen', 'milk', 'tree', 'frog', 'cup', 'bed'];
const SYL = { cat: 1, dog: 1, tree: 1, book: 1, apple: 2, window: 2, table: 2, pencil: 2, rabbit: 2, winter: 2, banana: 3, elephant: 3, computer: 3, umbrella: 3, butterfly: 3, tomato: 3, hamburger: 3, dinosaur: 3, caterpillar: 4, watermelon: 4, vegetable: 3, family: 3, chocolate: 2, birthday: 2, yesterday: 3, beautiful: 3, interesting: 4, understand: 3, hockey: 2, snowman: 2 };
const SH = 'ship,shop,shirt,shoe,shell,shower,sheep,fish'.split(','), CH = 'chair,cheese,chip,church,chicken,child,cheap,lunch'.split(',');
const TH1 = 'think,three,thank,thumb,thin,bath,mouth,teeth'.split(','), TT = 'tin,tree,tank,sun,sink,bat,mass,seat'.split(',');
const TH2 = 'this,that,they,mother,brother,father,then,the'.split(','), DD = 'dog,day,den,dad,dish,door,doll,desk'.split(',');
const sounds = mkUnit('g3e29', '👂', { fr: 'Les sons de l’anglais', en: 'English sounds' }, PF + `${COMP_INT} — discriminer et prononcer des sons (paires minimales, th, sh / ch, rimes)`, {
  1: [
    (R) => { const p = R.pick(PAIRS), x = R.chance(0.5) ? [p.a, p.b] : [p.b, p.a]; return mc(`g3e29:1a:${x[0]}:${x[1]}`, P.listenWord, x[0], [x[1]], { say: say(x[0]), cols: 2, tip: tb(`${x[0]} ≠ ${x[1]}`, `${x[0]} ≠ ${x[1]}`) }); },
    (R) => { const p = R.pick(PAIRS), same = R.chance(0.5), swap = R.chance(0.5); const [w1, w2] = swap ? [p.b, p.a] : [p.a, p.b]; return mc(`g3e29:1b:${w1}:${w2}:${same}`, tb('Écoute les deux mots. Sont-ils pareils ou différents?', 'Listen to the two words. Same or different?'), same ? 'same' : 'different', [same ? 'different' : 'same'], { say: say(same ? `${w1}. ${w1}.` : `${w1}. ${w2}.`), stimulus: { emoji: '🎧' }, cols: 2 }); },
    (R) => { const p = R.pick(PAIRS.filter((x) => x.ea && x.eb)); const [w, e, o] = R.chance(0.5) ? [p.a, p.ea, p.eb] : [p.b, p.eb, p.ea]; return mc(`g3e29:1c:${p.a}:${p.b}:${w}`, P.listenPic, e, [o], { say: say(w), emoji: true, cols: 2 }); },
  ],
  2: [
    (R) => { const p = R.pick(PAIRS); const t = R.chance(0.5) ? p.a : p.b; const o = R.chance(0.5) ? p.b : p.a; const d = R.pick(PAIRS.filter((x) => x.a !== p.a)).a; return mc(`g3e29:2a:${p.a}:${p.b}:${t}`, P.listenWord, t, [t === p.a ? p.b : p.a, d].filter((x) => x !== t), { say: say(t), cols: 3 }); },
    (R) => { const a = R.sample(SH, 3), b = R.sample(CH, 3); return sortQ(`g3e29:2b:${[...a, ...b].sort().join(',')}`, tb('Quel son entends-tu? sh ou ch?', 'Which sound do you hear? sh or ch?'), [{ text: 'sh', emoji: '🤫' }, { text: 'ch', emoji: '🚂' }], [a, b], { speak: true, tip: tb('sh = chut! ch = le train.', 'sh = “shh!”, ch = like a train.') }); },
    (R) => { const a = R.sample(TH1, 3), b = R.sample(TT, 3); return sortQ(`g3e29:2c:${[...a, ...b].sort().join(',')}`, tb('Quel mot a le son « th » de think?', 'Which words have the “th” sound of think?'), [{ text: 'th (think)' }, { text: 'not th' }], [a, b], { speak: true, tip: tb('Place la langue entre les dents et souffle.', 'Put your tongue between your teeth and blow.') }); },
    (R) => { const a = R.sample(TH2, 3), b = R.sample(DD, 3); return sortQ(`g3e29:2d:${[...a, ...b].sort().join(',')}`, tb('Quel mot a le son « th » de this?', 'Which words have the “th” sound of this?'), [{ text: 'th (this)' }, { text: 'd' }], [a, b], { speak: true }); },
    (R) => { const t = R.pick(['vowel', 'th', 'shch', 'h', 'vb', 'jch']); const ps = PAIRS.filter((x) => x.t === t); const p = R.pick(ps); const w = R.chance(0.5) ? p.a : p.b; return mc(`g3e29:2e:${p.a}:${p.b}:${w}`, tb('Quel mot as-tu entendu?', 'Which word did you hear?'), w, [w === p.a ? p.b : p.a], { say: say(w), cols: 2 }); },
  ],
  3: [
    (R) => { const k = R.pick(Object.keys(RHYME)); const r = RHYME[k].split(','); const w = R.pick(r); const oth = R.sample(Object.keys(RHYME).filter((x) => x !== k).flatMap((x) => RHYME[x].split(',')).filter((x) => !r.includes(x)), 3); return mc(`g3e29:3a:${k}:${w}`, tb(`Quel mot rime avec « ${k} »?`, `Which word rhymes with “${k}”?`), w, oth, { say: say(k), cols: 2, tip: tb('Les mots qui riment finissent par le même son.', 'Rhyming words end with the same sound.') }); },
    (R) => { const k = R.pick(Object.keys(RHYME)); const r = R.sample(RHYME[k].split(','), 3); const odd = R.pick(Object.keys(RHYME).filter((x) => x !== k).flatMap((x) => RHYME[x].split(','))); return mc(`g3e29:3b:${k}:${r.join('')}:${odd}`, tb('Quel mot ne rime PAS avec les autres?', 'Which word does NOT rhyme?'), odd, r, { cols: 2 }); },
    (R) => { const w = R.pick(SILENT); const o = R.sample(NOSIL, 3); return mc(`g3e29:3c:${w}:${o.join('')}`, tb('Quel mot a une lettre muette (qu’on n’entend pas)?', 'Which word has a silent letter (you do not hear it)?'), w, o, { cols: 2, tip: tb('knee (k muet), write (w muet), comb (b muet), hour (h muet)…', 'knee (silent k), write (silent w), comb (silent b), hour (silent h)…') }); },
    (R) => { const w = R.pick(Object.keys(SYL)); return mc(`g3e29:3d:${w}`, tb('Combien de syllabes entends-tu?', 'How many syllables do you hear?'), String(SYL[w]), rest(['1', '2', '3', '4'], String(SYL[w])).slice(0, 3), { say: say(w), stimulus: { text: w }, cols: 4, tip: tb('Tape dans tes mains à chaque partie du mot.', 'Clap once for each part of the word.') }); },
    (R) => { const p = R.pick(PAIRS), pr = R.pick(PAIRS.filter((x) => x.t === p.t && x.a !== p.a)); const [w, o] = R.chance(0.5) ? [p.a, p.b] : [p.b, p.a]; return mc(`g3e29:3e:${p.a}:${p.b}:${w}:${pr.a}`, tb('Écoute. Quel mot as-tu entendu?', 'Listen. Which word did you hear?'), w, [o, pr.a === w ? pr.b : pr.a, pr.b === w ? pr.a : pr.b].filter((x, i, a) => x !== w && a.indexOf(x) === i), { say: say(w), cols: 2 }); },
  ],
});

export const talkUnits = [listen, replies, sounds];
