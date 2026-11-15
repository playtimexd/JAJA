// Petit Hibou — English writing by hand (type `hand`): dictation, answer in writing, sentences, little stories.
// Levels: 1 = Grade 2 ESL (sight words, CVC, 3–5 word sentences), 2 = late Grade 2 / Grade 3 (6–9 words), 3 = Grade 3 (10–14 words).
// Original text, Canadian spelling.

const EN = 'en-CA';
const hand = (o) => ({ type: 'hand', lang: 'en', ...o });

/* ------------------------------------------------------------------ */
/*  e35 — Spelling dictation                                           */
/* ------------------------------------------------------------------ */
const DICT = {
  1: [
    'cat', 'dog', 'sun', 'red hat', 'big bus', 'pig', 'hen', 'a fish', 'my bag', 'the bed',
    'I see a cat.', 'The dog can run.', 'I have a red hat.', 'We like to play.', 'The sun is hot.',
    'My mom is nice.', 'I can jump up.', 'Look at the pig.', 'The cat is on the bed.', 'He has a big dog.',
    'She can sit here.', 'We go to school.', 'I like my pet.', 'The bus is red.', 'A fish can swim.',
    'My dad has a car.', 'The hen is in the box.', 'I can see the sun.', 'Come and play with me.', 'The frog can hop.',
    'We eat a red apple.', 'It is a nice day.', 'My bag is big.', 'The boy has a ball.', 'I read a book.',
    'The girl is happy.', 'I like to run.', 'This is my friend.', 'The duck is in the pond.', 'Can you help me?',
    'It is cold today.', 'I see a bird.', 'The cat sat on a mat.', 'We play in the snow.', 'I drink some milk.',
    'The ball is blue.', 'Look at the moon.', 'My brother can swim.', 'She has a new coat.', 'The bear is big.',
    'I am six years old.', 'We have a pet rabbit.', 'The fox is fast.', 'Mom makes a cake.', 'I wash my hands.',
    'The tree is tall.', 'He likes to sing.', 'It is time for lunch.', 'The sky is blue.', 'I love my family.',
  ],
  2: [
    'The children play hockey on the frozen pond.', 'My sister has a green backpack and a yellow lunch box.',
    'We went to the park after school on Friday.', 'The little puppy likes to chew my old shoes.',
    'My grandmother makes the best apple pie.', 'There are four seasons in a year.',
    'I put on my boots and my warm hat.', 'The teacher reads a funny story to the class.',
    'Every morning I eat toast with strawberry jam.', 'The yellow bus stops in front of my house.',
    'My best friend lives down the street.', 'Our class is going to the museum tomorrow.',
    'I like to draw pictures with my crayons.', 'The birds sing in the tree every morning.',
    'We saw a big moose near the lake.', 'My father cooks pancakes on Sunday morning.',
    'The snow is soft and very white.', 'She is wearing a pretty dress today.',
    'The cat sleeps on the warm sofa.', 'He can ride his bike without help.',
    'In summer we swim in the lake.', 'I brush my teeth before I go to bed.',
    'The farmer feeds the cows and the horses.', 'My cousin has a very fluffy white cat.',
    'We built a snowman and gave him a carrot nose.', 'The library is open from nine to five.',
    'Please close the door because it is cold.', 'I am learning how to skate this winter.',
    'Our teacher said that we can go outside.', 'The turtle walks very slowly across the road.',
    'My little brother is afraid of the dark.', 'There is a rainbow in the sky today.',
    'We eat dinner together every evening.', 'The firefighter climbed up the tall ladder.',
    'I found a shiny stone on the beach.', 'My mother gave me a warm hug.',
    'The baby bird fell out of its nest.', 'You can borrow my pencil and my eraser.',
    'He plays the piano after school.', 'They are going to visit their grandparents.',
    'The ducks swim across the quiet pond.', 'I want to be a nurse when I grow up.',
    'We planted flowers in our garden last spring.', 'The movie starts at six o’clock tonight.',
    'My dog waits for me at the door.', 'The leaves turn red and orange in fall.',
    'She drinks a glass of milk every day.', 'He has lost his left mitten again.',
    'Our school has a big green playground.', 'I help my dad wash the car.',
    'The squirrel hides nuts under the old tree.', 'We always say thank you to our friends.',
    'It is raining, so I need an umbrella.', 'The ice cream melted in the hot sun.',
    'Maya and Ben are playing with blocks.', 'I like soup when it is cold outside.',
    'The tall giraffe eats leaves from the tree.', 'My friend invited me to her birthday party.',
    'We go skating every Saturday afternoon.', 'The sun sets behind the big mountain.',
  ],
  3: [
    'On Saturday morning, my family went to the farm to pick apples and pumpkins.',
    'My best friend and I like to build forts out of blankets and pillows.',
    'When it snows, we put on our snowsuits and run outside to play.',
    'The teacher told us that tomorrow we will plant seeds in small pots.',
    'My little brother cried because he dropped his ice cream on the ground.',
    'After school, I always do my homework before I go outside to play.',
    'We saw a beaver building a dam while we were canoeing on the river.',
    'My grandfather tells me exciting stories about when he was a boy.',
    'The school bus was late this morning because of the heavy snowstorm.',
    'I am saving my allowance to buy a new soccer ball for my birthday.',
    'Please remember to bring your library book back to school on Monday.',
    'The farmer gets up early every day to feed the animals on his farm.',
    'Our class raised money to help the animals at the local shelter.',
    'My cousin gave me a beautiful book about dinosaurs for my birthday.',
    'We had a picnic by the lake and we watched the ducks swim.',
    'The movie was so funny that everyone in the room started to laugh.',
    'I wore my yellow raincoat and my rubber boots to jump in the puddles.',
    'There are many different animals in the forest, such as deer, foxes, and owls.',
    'My mom says that we should eat vegetables because they make us strong.',
    'On the first day of spring, we saw the first robin of the year.',
    'The astronaut waved goodbye to her family and climbed into the rocket.',
    'It takes a long time for the maple sap to turn into sweet syrup.',
    'He practised the guitar every day, and now he plays very well.',
    'We went on a field trip to the science centre and learned about space.',
    'My friend Lucas speaks French and English, and he is learning Spanish.',
    'When the music started, all the children began to dance in a circle.',
    'The waiter brought us a big pizza with cheese, tomatoes, and mushrooms.',
    'If it rains tomorrow, we will stay inside and play board games.',
    'My teacher gave each student a star sticker for working so hard.',
    'The lost kitten was cold and hungry, so we gave it some warm milk.',
    'Every winter, my dad makes an ice rink in our backyard for us.',
    'I could not find my mittens, so I borrowed my sister’s gloves.',
    'We are learning how plants grow, and we need sun, water, and soil.',
    'The firefighters came quickly, and they put out the fire in a few minutes.',
    'In the morning, the whole house smells like fresh bread and hot chocolate.',
    'My friends and I made a big sign that says welcome to our club.',
    'The class was quiet while the librarian read us a scary story.',
    'She forgot her lunch at home, but her friend shared a sandwich with her.',
    'We watched the fireworks over the river and listened to the loud music.',
    'The little girl wanted to touch the snow, so she took off her mitten.',
    'There was a big storm last night, and a tree fell in our yard.',
    'I love to read books about animals, especially about wolves and whales.',
    'My uncle drives a big truck and he delivers fresh fruit to stores.',
    'At recess, we played tag, and I ran so fast that I tripped.',
    'My sister and I are making cards for our grandmother’s birthday.',
    'After dinner, we washed the dishes and then we watched a nature show.',
    'The town has a parade every July, and everyone comes to watch.',
    'He was nervous about the test, but he studied hard and did well.',
    'The sunflowers in our garden grew taller than my dad this summer.',
    'We need to turn off the lights when we leave the room.',
    'I helped my neighbour carry her groceries up the stairs to her apartment.',
    'On cold days, the pond near our house freezes, and we go skating there.',
    'The snowy owl sat on the fence and stared at us with big yellow eyes.',
    'My favourite part of the day is when we read stories before bed.',
    'The little boat floated across the lake while the sun went down.',
    'Our teacher asked us to write three sentences about our favourite animal.',
    'I did not want to leave the park, but it was time to go home.',
    'They walked to the store together and bought milk, eggs, and bread.',
    'The kind lady at the bakery always gives us a free cookie.',
    'When I grow up, I want to be a scientist who helps save the ocean.',
    'The children cheered loudly when their team scored the winning goal.',
  ],
};

/* ------------------------------------------------------------------ */
/*  e37 — Write sentences                                              */
/* ------------------------------------------------------------------ */
// L1 : [word, emoji]
const S1 = [
  ['cat', '🐱'], ['dog', '🐶'], ['sun', '☀️'], ['snow', '❄️'], ['apple', '🍎'], ['house', '🏠'], ['ball', '⚽'], ['car', '🚗'], ['book', '📖'], ['flower', '🌸'],
  ['tree', '🌳'], ['fish', '🐟'], ['bird', '🐦'], ['moon', '🌙'], ['star', '⭐'], ['cake', '🎂'], ['bike', '🚲'], ['train', '🚂'], ['boat', '⛵'], ['plane', '✈️'],
  ['rabbit', '🐰'], ['horse', '🐴'], ['cow', '🐮'], ['pig', '🐷'], ['frog', '🐸'], ['butterfly', '🦋'], ['snail', '🐌'], ['turtle', '🐢'], ['bear', '🐻'], ['fox', '🦊'],
  ['owl', '🦉'], ['duck', '🦆'], ['mouse', '🐭'], ['strawberry', '🍓'], ['banana', '🍌'], ['carrot', '🥕'], ['cheese', '🧀'], ['bread', '🍞'], ['cookie', '🍪'], ['ice cream', '🍦'],
  ['umbrella', '☂️'], ['cloud', '☁️'], ['rainbow', '🌈'], ['mountain', '⛰️'], ['beach', '🏖️'], ['castle', '🏰'], ['gift', '🎁'], ['guitar', '🎸'], ['pencil', '✏️'], ['clock', '⏰'],
  ['key', '🔑'], ['glasses', '👓'], ['hat', '🎩'], ['boot', '👢'], ['tractor', '🚜'], ['fire truck', '🚒'], ['robot', '🤖'], ['dinosaur', '🦖'], ['hockey stick', '🏒'], ['skate', '⛸️'],
];
// L2 : [word1, word2, emojis]
const S2 = [
  ['cat', 'sleep', '🐱💤'], ['snow', 'slide', '❄️🛷'], ['sun', 'beach', '☀️🏖️'], ['apple', 'eat', '🍎😋'], ['ball', 'play', '⚽🧒'],
  ['rain', 'umbrella', '🌧️☂️'], ['bike', 'ride', '🚲💨'], ['book', 'read', '📖👧'], ['cake', 'party', '🎂🎉'], ['fish', 'swim', '🐟🌊'],
  ['bird', 'nest', '🐦🪺'], ['moon', 'stars', '🌙⭐'], ['train', 'station', '🚂🚉'], ['boat', 'lake', '⛵🏞️'], ['plane', 'clouds', '✈️☁️'],
  ['rabbit', 'carrot', '🐰🥕'], ['bee', 'flower', '🐝🌼'], ['turtle', 'slow', '🐢🌿'], ['owl', 'night', '🦉🌙'], ['fox', 'forest', '🦊🌲'],
  ['hockey', 'rink', '🏒⛸️'], ['ski', 'mountain', '🎿⛰️'], ['snowman', 'carrot', '⛄🥕'], ['gift', 'ribbon', '🎁🎀'], ['castle', 'king', '🏰👑'],
  ['pirate', 'treasure', '🏴‍☠️💰'], ['robot', 'help', '🤖🤝'], ['dinosaur', 'big', '🦖🌿'], ['astronaut', 'rocket', '👩‍🚀🚀'], ['firefighter', 'ladder', '🧑‍🚒🪜'],
  ['garden', 'water', '🌻💧'], ['picnic', 'basket', '🧺🥪'], ['tent', 'fire', '⛺🔥'], ['pool', 'jump', '🏊💦'], ['music', 'sing', '🎵🎤'],
  ['crayons', 'draw', '🖍️🖼️'], ['school', 'notebook', '🏫📓'], ['bakery', 'bread', '🥖🧁'], ['market', 'vegetables', '🧺🥦'], ['kitchen', 'soup', '🍲👩‍🍳'],
  ['farm', 'tractor', '🚜🐄'], ['maple', 'syrup', '🍁🍯'], ['winter', 'scarf', '🧣🧢'], ['fall', 'leaves', '🍂🍁'], ['spring', 'flowers', '🌷🐛'],
  ['summer', 'hot', '🌞🍉'], ['storm', 'thunder', '⛈️⚡'], ['rainbow', 'rain', '🌈🌦️'], ['mouse', 'cheese', '🐭🧀'], ['dog', 'bone', '🐕🦴'],
  ['duck', 'pond', '🦆💧'], ['frog', 'jump', '🐸🌿'], ['snail', 'leaf', '🐌🍃'], ['butterfly', 'wings', '🦋🌈'], ['cow', 'grass', '🐮🌾'],
  ['bear', 'honey', '🐻🍯'], ['whale', 'ocean', '🐋🌊'], ['penguin', 'ice', '🐧🧊'], ['monkey', 'banana', '🐒🍌'], ['giraffe', 'tall', '🦒🌳'],
];
// L3 : emoji scenes
const S3 = [
  '🏒⛸️❄️', '🏖️☀️🏄', '🌧️☂️🐸', '🎂🎈🎁', '🏕️🔥🌲', '🚒🔥🏠', '🛷❄️⛄', '🍎🌳🧺', '🐝🌻🍯', '🚜🌾🐄',
  '🏫📚✏️', '🎡🎠🍭', '🐶🦴🏡', '🚀🌙⭐', '🏊💦☀️', '🍕🍟🥤', '🎻🎶🎭', '🌈☔🌳', '⛵🌊🐬', '🏔️🎿🧣',
  '🦆🌊🍞', '🐢🐇🏁', '🎨🖌️🖼️', '🍁🍂🧒', '🌽🧑‍🌾🚜', '🐋🌊🚢', '🏰👑🐉', '🔦🌙🦉', '⚽🥅🏃', '🚲🌳💨',
  '🛒🥕🍎', '🎄🎁⛄', '🎃🌙🕯️', '🐧🧊❄️', '📖🛋️🧸', '🍳🥞☕', '🦕🌋🌿', '🧁🎂🍰', '🦊🍂🌲', '🌻🐝🌞',
  '🛝🧒🌳', '🚌🏫🎒', '🔬🧪👩‍🔬', '🎣🐟🏞️', '🧺🥪🌳', '🏀🏃🏟️', '🐿️🌰🍂', '🎬🍿🎥', '🐮🥛🌾', '🚁🏔️☁️',
  '🏡🌳🌷', '🐱🧶🛋️', '🐶🚿🧼', '🧑‍🍳🍲🔥', '🍓🥧🌸', '🎤🎸👏', '🌙🛏️😴', '🌬️🪁🏞️', '🌊🐚🦀', '🧣❄️🏒',
];

/* ------------------------------------------------------------------ */
/*  e38 — Little stories : [{fr, en}] prompt + helper                  */
/* ------------------------------------------------------------------ */
const c = (en, fr, helpEn, helpFr) => ({ en: `${en} ${helpEn}`, fr: `${fr} ${helpFr}` });
const C1 = [
  c('Tell about your weekend.', 'Raconte ta fin de semaine.', 'Use: first, then, last.', 'Utilise : first, then, last.'),
  c('Describe your favourite animal.', 'Décris ton animal préféré.', 'Say what it looks like and what it eats.', 'Dis comment il est et ce qu’il mange.'),
  c('Write a note to invite a friend to your party.', 'Écris un petit mot pour inviter un ami à ta fête.', 'Say when and where.', 'Dis quand et où.'),
  c('Write about your day at school.', 'Écris sur ta journée à l’école.', 'Use: in the morning, at lunch, after school.', 'Utilise : in the morning, at lunch, after school.'),
  c('Describe your bedroom.', 'Décris ta chambre.', 'Say what you can see in it.', 'Dis ce qu’on y voit.'),
  c('Write about a snowy day.', 'Écris sur une journée de neige.', 'Say what you did.', 'Dis ce que tu as fait.'),
  c('Write about what you want to do this summer.', 'Écris ce que tu veux faire cet été.', 'Use: I want to, because.', 'Utilise : I want to, because.'),
  c('Write about your best friend.', 'Parle de ton meilleur ami ou de ta meilleure amie.', 'Say what he or she likes.', 'Dis ce qu’il ou elle aime.'),
  c('Write about your favourite food.', 'Parle de ton repas préféré.', 'Say why you like it.', 'Dis pourquoi tu l’aimes.'),
  c('Write about a trip to the park.', 'Écris sur une sortie au parc.', 'Use: first, then, last.', 'Utilise : first, then, last.'),
  c('Write a thank-you note to your grandmother.', 'Écris un mot de remerciement à ta grand-mère.', 'Start with: Dear Grandma,', 'Commence par : Dear Grandma,'),
  c('Write about a time you lost a tooth.', 'Raconte le jour où tu as perdu une dent.', 'Say how you felt.', 'Dis ce que tu as ressenti.'),
  c('Describe your house.', 'Décris ta maison.', 'Say what your favourite room is.', 'Dis quelle est ta pièce préférée.'),
  c('Write about your favourite game.', 'Parle de ton jeu préféré.', 'Say how to play it.', 'Dis comment on y joue.'),
  c('Write about a day at the beach.', 'Écris sur une journée à la plage.', 'Use: in the morning, then, at night.', 'Utilise : in the morning, then, at night.'),
  c('Write about a day when you were scared.', 'Raconte un jour où tu as eu peur.', 'Say what happened.', 'Dis ce qui s’est passé.'),
  c('Describe your teacher.', 'Décris ta maîtresse ou ton maître.', 'Say what you like about him or her.', 'Dis ce que tu aimes chez cette personne.'),
  c('Write a letter to Santa.', 'Écris une lettre au père Noël.', 'Say what you want and why.', 'Dis ce que tu veux et pourquoi.'),
  c('Write about a walk with a pet.', 'Écris sur une promenade avec un animal.', 'If you do not have one, imagine it!', 'Si tu n’en as pas, imagine-en un !'),
  c('Write about your favourite sport.', 'Parle de ton sport préféré.', 'Say where you play it.', 'Dis où tu y joues.'),
  c('Finish the story: One morning, I found a small box at my door.', 'Écris la suite : « Un matin, j’ai trouvé une petite boîte à ma porte. »', 'Say what was inside.', 'Dis ce qu’il y avait dedans.'),
  c('Finish the story: The cat jumped out the window and …', 'Écris la suite : « Le chat a sauté par la fenêtre et… »', 'Use: first, then, last.', 'Utilise : first, then, last.'),
  c('Finish the story: It snowed so hard that the bus was stuck.', 'Écris la suite : « Il neigeait si fort que l’autobus est resté bloqué. »', 'Say what the children did.', 'Dis ce que les enfants ont fait.'),
  c('Describe your favourite toy.', 'Décris ton jouet préféré.', 'Say its colour and what it does.', 'Dis sa couleur et ce qu’il fait.'),
  c('Write about what you do before bed.', 'Écris ce que tu fais avant de dormir.', 'Use: first, then, last.', 'Utilise : first, then, last.'),
  c('Write a note to a friend who is moving away.', 'Écris un mot à un ami qui déménage.', 'Say that you will miss him or her.', 'Dis que tu vas t’ennuyer de lui ou d’elle.'),
  c('Pretend you are a bird. Write about your day.', 'Imagine que tu es un oiseau. Écris ta journée.', 'Say where you fly.', 'Dis où tu voles.'),
  c('Write about your favourite season.', 'Parle de ta saison préférée.', 'Say what you do and wear.', 'Dis ce qu’on fait et ce qu’on porte.'),
  c('Write about a visit to the doctor or dentist.', 'Écris sur une visite chez le médecin ou le dentiste.', 'Use: first, then, last.', 'Utilise : first, then, last.'),
  c('Finish the story: In the forest, I heard a little sound.', 'Écris la suite : « Dans la forêt, j’ai entendu un petit bruit. »', 'Say what you found.', 'Dis ce que tu as trouvé.'),
];
const C2 = [
  c('Write about the best trip you took with your family.', 'Raconte la plus belle sortie en famille.', 'Use: first, next, then, finally.', 'Utilise : first, next, then, finally.'),
  c('Write a letter inviting a friend to spend a weekend at your home.', 'Écris une lettre pour inviter un ami à passer une fin de semaine chez toi.', 'Say what you will do together.', 'Dis ce que vous ferez.'),
  c('Describe an animal you think is amazing.', 'Décris un animal que tu trouves extraordinaire.', 'Say where it lives, what it eats, and why it is special.', 'Dis où il vit, ce qu’il mange et pourquoi il est spécial.'),
  c('Finish the story: The door of the old house opened by itself.', 'Écris la suite : « La porte de la vieille maison s’est ouverte toute seule. »', 'Write a beginning, a middle and an end.', 'Écris un début, un milieu et une fin.'),
  c('Write about your first day of school this year.', 'Raconte ta première journée d’école cette année.', 'Say how you felt.', 'Dis comment tu te sentais.'),
  c('Describe your favourite place in the world.', 'Décris ton endroit préféré au monde.', 'Say what you see, hear and feel there.', 'Dis ce qu’on y voit, entend et ressent.'),
  c('Write a letter to your teacher about your holidays.', 'Écris une lettre à ta maîtresse sur tes vacances.', 'Start with: Dear Ms. ... and end with: Your student,', 'Commence par : Dear Ms. ... et finis par : Your student,'),
  c('Write about a sports game or activity you did.', 'Raconte un match ou une activité sportive.', 'Use: at the start, then, at the end.', 'Utilise : at the start, then, at the end.'),
  c('If you could have a magic power, what would it be?', 'Si tu pouvais avoir un pouvoir magique, lequel choisirais-tu ?', 'Say why and what you would do with it.', 'Dis pourquoi et ce que tu ferais avec.'),
  c('Finish the story: When I opened the treasure chest, I saw …', 'Écris la suite : « Quand j’ai ouvert le coffre au trésor, j’ai vu… »', 'Say what happened next.', 'Dis ce qui s’est passé ensuite.'),
  c('Describe your perfect day.', 'Décris ta journée idéale.', 'Use: in the morning, in the afternoon, at night.', 'Utilise : in the morning, in the afternoon, at night.'),
  c('Write about a time you helped someone.', 'Raconte un moment où tu as aidé quelqu’un.', 'Say how the person felt.', 'Dis comment la personne s’est sentie.'),
  c('Explain how to make your favourite snack.', 'Explique comment préparer ta collation préférée.', 'Use: first, next, then, finally.', 'Utilise : first, next, then, finally.'),
  c('Describe a character from a book or movie you like.', 'Décris un personnage de livre ou de film que tu aimes.', 'Say what he or she is like.', 'Dis comment il ou elle est.'),
  c('Write a letter to yourself ten years from now.', 'Écris une lettre à toi-même dans dix ans.', 'Say what you hope and what you like now.', 'Dis ce que tu espères et ce que tu aimes maintenant.'),
  c('Write about a day with a big snowstorm.', 'Raconte une journée de tempête de neige.', 'Say what you did and felt.', 'Dis ce que tu as fait et ressenti.'),
  c('Imagine you find a new planet.', 'Imagine que tu découvres une nouvelle planète.', 'Describe the colours, the creatures and the food.', 'Décris les couleurs, les créatures et la nourriture.'),
  c('Finish the story: My dog disappeared in the night.', 'Écris la suite : « Mon chien a disparu pendant la nuit. »', 'Say how he was found.', 'Dis comment on l’a retrouvé.'),
  c('Write about a party you enjoyed.', 'Parle d’une fête que tu as aimée.', 'Say who was there and what you did.', 'Dis qui était là et ce que vous avez fait.'),
  c('Write a thank-you letter for a gift.', 'Écris une lettre de remerciement pour un cadeau.', 'Say what you liked about it.', 'Dis ce que tu as aimé.'),
  c('Show a new student around your school.', 'Fais visiter ton école à un nouvel élève.', 'Say where the important places are.', 'Dis où sont les endroits importants.'),
  c('Write about a dream you had, real or made up.', 'Raconte un rêve que tu as fait, vrai ou inventé.', 'Use: first, then, suddenly, finally.', 'Utilise : first, then, suddenly, finally.'),
  c('If you were principal for one day, what would you do?', 'Si tu étais directeur de l’école pour une journée, que ferais-tu ?', 'Write at least three things and say why.', 'Écris au moins trois choses et dis pourquoi.'),
  c('Write about how you help the environment.', 'Écris sur ce que tu fais pour l’environnement.', 'Give examples and say why it is important.', 'Donne des exemples et dis pourquoi c’est important.'),
  c('Write about an adventure in the snow or in the forest.', 'Raconte une aventure dans la neige ou en forêt.', 'Use: at the start, next, at the end.', 'Utilise : at the start, next, at the end.'),
  c('Write a letter to a friend about your new hobby.', 'Écris à un ami pour lui parler de ton nouveau passe-temps.', 'Say what you do and why you like it.', 'Dis ce que tu fais et pourquoi tu aimes ça.'),
  c('Invent a magic object.', 'Invente un objet magique.', 'Give its name, what it looks like and what it can do.', 'Donne son nom, son aspect et ce qu’il peut faire.'),
  c('Finish the story: The robot woke up and said to me …', 'Écris la suite : « Le robot s’est réveillé et m’a dit… »', 'Write what you said to each other.', 'Écris ce que vous vous êtes dit.'),
  c('Write about a trip you took or want to take.', 'Écris sur un voyage que tu as fait ou que tu veux faire.', 'Say where, with whom and what you want to see.', 'Dis où, avec qui et ce que tu veux voir.'),
  c('Write about a challenge you completed.', 'Écris sur un défi que tu as réussi.', 'Say what was hard and how you did it.', 'Dis ce qui était difficile et comment tu as réussi.'),
];
const C3 = [
  c('Write about a holiday memory you will never forget.', 'Écris un souvenir de vacances que tu n’oublieras jamais.', 'Use: first, next, then, finally. Say how you felt.', 'Utilise : first, next, then, finally. Dis ce que tu ressentais.'),
  c('Write a letter to a friend in another country about life in Canada.', 'Écris une lettre à un ami d’un autre pays pour décrire la vie au Canada.', 'Talk about the seasons and the food.', 'Parle des saisons et de la nourriture.'),
  c('Finish the story: At the back of the attic, behind an old mirror, there was a tiny door.', 'Écris la suite : « Au fond du grenier, derrière un vieux miroir, il y avait une minuscule porte. »', 'Include a beginning, a problem and an ending.', 'Inclus un début, un problème et une fin.'),
  c('Invent an imaginary animal and describe it.', 'Invente un animal imaginaire et décris-le.', 'Say what it looks like, where it lives, and its secret.', 'Dis comment il est, où il vit et son secret.'),
  c('Write about a day that started badly but ended well.', 'Raconte une journée mal commencée, mais bien terminée.', 'Use: at first, but, luckily, in the end.', 'Utilise : at first, but, luckily, in the end.'),
  c('Should kids have less homework? Give your opinion.', 'Les enfants devraient-ils avoir moins de devoirs ? Donne ton opinion.', 'Give two reasons: because, also.', 'Donne deux raisons : because, also.'),
  c('Write a letter to the mayor with an idea to improve the park.', 'Écris une lettre au maire avec une idée pour améliorer le parc.', 'Start with: Dear Mayor,', 'Commence par : Dear Mayor,'),
  c('Imagine you are lost on a desert island for a week.', 'Imagine que tu es perdu sur une île déserte pendant une semaine.', 'Tell how you eat, sleep and get rescued.', 'Raconte comment tu manges, dors et es sauvé.'),
  c('Describe a person you admire.', 'Décris une personne que tu admires.', 'Say what she or he does and what you learn.', 'Dis ce qu’elle fait et ce que tu apprends.'),
  c('Finish the story: When the bell rang, the students found the school was empty.', 'Écris la suite : « Quand la cloche a sonné, les élèves ont trouvé l’école vide. »', 'Tell how you solved the mystery.', 'Raconte comment le mystère est résolu.'),
  c('Write about learning something hard.', 'Raconte comment tu as appris quelque chose de difficile.', 'Use: first, then, next, finally.', 'Utilise : first, then, next, finally.'),
  c('Write a conversation between two friends planning a surprise.', 'Écris une conversation entre deux amis qui préparent une surprise.', 'Use words like said, asked, whispered.', 'Utilise des mots comme said, asked, whispered.'),
  c('Who would you invite to dinner if you could invite anyone?', 'Qui inviterais-tu à souper si tu pouvais inviter n’importe qui ?', 'Say why and what you would talk about.', 'Dis pourquoi et de quoi vous parleriez.'),
  c('Write to convince your family to adopt a pet.', 'Écris pour convaincre ta famille d’adopter un animal.', 'Give three reasons: first, second, finally.', 'Donne trois raisons : first, second, finally.'),
  c('Write about a special place you visited.', 'Raconte la visite d’un endroit spécial.', 'Say what you saw, heard and tasted.', 'Dis ce que tu as vu, entendu et goûté.'),
  c('Describe a storm from your window.', 'Décris une tempête vue de ta fenêtre.', 'Use your senses and words like: like, as.', 'Utilise tes sens et des mots comme : like, as.'),
  c('Finish the story: My friend and I followed the strange tracks in the snow.', 'Écris la suite : « Mon ami et moi avons suivi les traces mystérieuses dans la neige. »', 'Say what you found at the end.', 'Dis ce que vous avez trouvé au bout.'),
  c('Write an apology to someone you upset.', 'Écris des excuses à quelqu’un que tu as fâché.', 'Say what happened and how you will fix it.', 'Dis ce qui s’est passé et comment tu vas réparer.'),
  c('Imagine your town one hundred years from now.', 'Imagine ta ville dans cent ans.', 'Describe the homes, the travel, and kids’ lives.', 'Décris les maisons, les transports et la vie des enfants.'),
  c('Write about what happens when a toy in your house comes alive at night.', 'Raconte ce qui arrive quand un jouet de ta maison prend vie la nuit.', 'Choose the toy and invent an adventure.', 'Choisis le jouet et invente une aventure.'),
  c('Describe the most beautiful place you have seen.', 'Décris le plus bel endroit que tu as vu.', 'Say where you were and what you liked most.', 'Dis où tu étais et ce que tu as préféré.'),
  c('Write a newspaper story about an event at your school.', 'Écris un article de journal sur un événement à ton école.', 'Answer: who, what, where, when, why.', 'Réponds à : who, what, where, when, why.'),
  c('Write how an animal saved the day.', 'Raconte comment un animal a sauvé la journée.', 'Invent the animal, the problem and the solution.', 'Invente l’animal, le problème et la solution.'),
  c('Write about what you want to be when you grow up.', 'Écris ce que tu veux être quand tu seras grand.', 'Say why you chose this job.', 'Dis pourquoi tu as choisi ce métier.'),
  c('Finish the story: On the morning of the big contest, Maya found that she had lost …', 'Écris la suite : « Le matin du grand concours, Maya a vu qu’elle avait perdu… »', 'Tell how she solved her problem.', 'Raconte comment elle règle son problème.'),
  c('Describe your most treasured object.', 'Décris ton objet le plus précieux.', 'Say where it came from and why it matters to you.', 'Dis d’où il vient et pourquoi il compte pour toi.'),
  c('Write about a game that went on until the very last minute.', 'Raconte un match qui s’est joué jusqu’à la dernière minute.', 'Make it exciting: suddenly, all at once.', 'Fais sentir le suspense : suddenly, all at once.'),
  c('Write a letter to an author whose books you love.', 'Écris une lettre à un auteur dont tu aimes les livres.', 'Give a few special examples.', 'Donne quelques exemples précis.'),
  c('Explain how to build the perfect snowman.', 'Explique comment bâtir le bonhomme de neige parfait.', 'Use: first, second, next, finally.', 'Utilise : first, second, next, finally.'),
  c('Imagine you meet a friendly alien.', 'Imagine que tu rencontres un extraterrestre gentil.', 'Tell where you meet, what you do, and how you say goodbye.', 'Raconte où vous vous rencontrez, ce que vous faites et comment vous vous quittez.'),
];

/* ------------------------------------------------------------------ */
/*  e36 — Read and write the answer                                    */
/* ------------------------------------------------------------------ */
const A = [];
const a = (l, text, qs) => A.push({ l, text, qs });

/* ---------- Level 1 ---------- */
a(1, `Sam has a red kite. On Saturday, he goes to the park with his dad. The wind is strong. The kite goes up, up, up into the sky. Sam holds the string tight. He is very happy. After one hour, they go home for lunch.`, [
  ['What colour is Sam’s kite?', 'It is red.'],
  ['Who goes to the park with Sam?', 'His dad.'],
  ['Why does the kite go up?', 'Because the wind is strong.'],
  ['How does Sam feel? How do you know?', 'He is happy; the text says he is very happy.'],
]);
a(1, `Mia has a little cat. The cat is white and soft. Its name is Snow. Snow likes to sleep on the sofa. She also likes to play with a ball of yarn. At night, Snow sleeps on Mia’s bed. Mia loves her cat very much.`, [
  ['What is the cat’s name?', 'Snow.'],
  ['What does Snow like to play with?', 'A ball of yarn.'],
  ['Where does Snow sleep at night?', 'On Mia’s bed.'],
  ['What colour is Snow?', 'White.'],
]);
a(1, `It is a cold winter day. Ben puts on his boots, his coat, and his hat. He goes outside with his sister. They make a big snowman. The snowman has a carrot nose and two black eyes. Then they go inside and drink hot chocolate.`, [
  ['What does Ben put on?', 'His boots, his coat and his hat.'],
  ['What do Ben and his sister make?', 'A snowman.'],
  ['What is the snowman’s nose?', 'A carrot.'],
  ['What do they do after they go inside?', 'They drink hot chocolate.'],
]);
a(1, `The farm has many animals. There is one cow, two pigs, and three hens. The farmer gets up early every day. He feeds the animals and gives them water. The hens lay eggs. The farmer takes the eggs to the kitchen for breakfast.`, [
  ['How many pigs are on the farm?', 'There are two pigs.'],
  ['What does the farmer give the animals?', 'Food and water.'],
  ['What do the hens lay?', 'Eggs.'],
  ['When does the farmer get up?', 'Early every day.'],
]);
a(1, `Lily is at the beach. The sun is hot and the sand is warm. She builds a sandcastle with a bucket and a shovel. A big wave comes and the sandcastle falls down. Lily laughs. Then she starts to build a new one.`, [
  ['Where is Lily?', 'At the beach.'],
  ['What does Lily use to build the sandcastle?', 'A bucket and a shovel.'],
  ['What happens to the sandcastle?', 'A big wave knocks it down.'],
  ['What does Lily do after that?', 'She laughs and builds a new one.'],
]);
a(1, `Today is Tom’s birthday. He is seven years old. His mom makes a chocolate cake. His friends come to the party. They play games and sing a song. Tom blows out the candles. He gets a new soccer ball from his dad.`, [
  ['How old is Tom today?', 'He is seven years old.'],
  ['What kind of cake does his mom make?', 'A chocolate cake.'],
  ['What does Tom do with the candles?', 'He blows them out.'],
  ['What gift does Tom get from his dad?', 'A new soccer ball.'],
]);
a(1, `The class has a pet fish. His name is Bubbles. Every morning, a student feeds him. Today it is Emma’s turn. She puts a little food in the water. Bubbles swims up to eat it. Emma smiles and says, “Good morning, Bubbles!”`, [
  ['What is the fish’s name?', 'Bubbles.'],
  ['Whose turn is it today?', 'Emma’s turn.'],
  ['What does Emma put in the water?', 'A little food.'],
  ['What does Emma say to the fish?', 'Good morning, Bubbles!'],
]);
a(1, `Jack takes the bus to school. The bus is yellow. It comes at eight o’clock. Jack sits next to the window with his friend Leo. They look at the trees and houses. When the bus stops at school, they say, “Thank you!” to the driver.`, [
  ['How does Jack go to school?', 'By bus.'],
  ['What time does the bus come?', 'At eight o’clock.'],
  ['Who sits with Jack?', 'His friend Leo.'],
  ['What do the boys say to the driver?', 'Thank you.'],
]);
a(1, `Owls sleep in the day. At night, they wake up and fly. Owls have big, round eyes. They can see well in the dark. They eat mice and small animals. An owl can turn its head far around. Hoo, hoo! That is the owl’s sound.`, [
  ['When do owls sleep?', 'In the day.'],
  ['Why can owls see in the dark?', 'They have big, round eyes that see well at night.'],
  ['What do owls eat?', 'Mice and small animals.'],
  ['What sound does an owl make?', 'Hoo, hoo.'],
]);
a(1, `On Sunday, Nora and her mom make soup. First, Nora washes the carrots. Then her mom cuts the carrots and the potatoes. They put everything in a big pot with water. The soup cooks for one hour. It smells so good! Nora eats two bowls.`, [
  ['What does Nora wash first?', 'The carrots.'],
  ['What goes in the pot with the water?', 'Carrots and potatoes.'],
  ['How long does the soup cook?', 'One hour.'],
  ['Did Nora like the soup? How do you know?', 'Yes, because it smells good and she eats two bowls.'],
]);

/* ---------- Level 2 ---------- */
a(2, `Every winter, the pond near Ella’s house freezes. On Saturday morning, her dad checks the ice with a long stick. “It is thick enough,” he says. Ella puts on her skates and her warm mittens. At first, she falls two times. But she gets up and tries again. After an hour, she can skate all the way across the pond without stopping. She feels proud of herself.`, [
  ['What does Ella’s dad do before they skate?', 'He checks the ice with a long stick to see if it is thick enough.'],
  ['What happens to Ella at first?', 'She falls two times.'],
  ['What does Ella do after she falls?', 'She gets up and tries again.'],
  ['How does Ella feel at the end and why?', 'She feels proud because she can skate all the way across the pond.'],
]);
a(2, `Our school has a small garden. In May, the students plant seeds for tomatoes, beans, and sunflowers. Each class gets a little square of soil. Every day, a different student waters the plants. In July, the school is closed, so some families take care of the garden. In September, the children come back and pick the vegetables. They make a big salad for the whole school to share.`, [
  ['What do the students plant in May?', 'Seeds for tomatoes, beans and sunflowers.'],
  ['Who takes care of the garden in July and why?', 'Some families, because the school is closed.'],
  ['What do the children do in September?', 'They pick the vegetables and make a big salad.'],
  ['Why is it good to work together in the garden?', 'Because everyone helps and they can share the food.'],
]);
a(2, `Leo lost his favourite mitten at the park. He looked under the slide, near the swings, and on the bench. It was not there. He felt sad and cold. On his way home, he saw a mitten on a fence. A kind person had put it there so the owner could find it. It was Leo’s mitten! He said, “Thank you, whoever you are,” and put it on his cold hand.`, [
  ['Where did Leo look for his mitten?', 'Under the slide, near the swings and on the bench.'],
  ['Where did Leo find his mitten?', 'On a fence on his way home.'],
  ['Why was the mitten on the fence?', 'A kind person put it there so the owner could find it.'],
  ['Why do you think Leo said thank you?', 'He was thankful because the person helped him get his mitten back.'],
]);
a(2, `The polar bear lives in the cold Arctic. Its fur looks white, but the skin under it is black. This helps the bear stay warm in the sun. A thick layer of fat keeps it warm in the icy water. Polar bears are very good swimmers. They hunt seals by waiting near holes in the ice. Sadly, the ice is melting in many places, and it is getting harder for the bears to find food.`, [
  ['Where does the polar bear live?', 'In the cold Arctic.'],
  ['How does the polar bear stay warm?', 'It has black skin under its fur and a thick layer of fat.'],
  ['How do polar bears catch seals?', 'They wait near holes in the ice.'],
  ['Why is it harder for polar bears to find food now?', 'Because the ice is melting.'],
]);
a(2, `Max and Zoe wanted to sell lemonade on a hot Saturday. First, they asked their mom for lemons, sugar, and cups. Then they made a sign that said, “Cold Lemonade – 50 cents.” They set up a table in front of their house. Many neighbours stopped to buy a glass. By the afternoon, they had earned eight dollars. They decided to give half of the money to the animal shelter.`, [
  ['What did Max and Zoe sell?', 'Lemonade.'],
  ['What did they write on their sign?', 'Cold Lemonade – 50 cents.'],
  ['How much money did they earn?', 'Eight dollars.'],
  ['What did they decide to do with half of the money, and why is that kind?', 'They gave it to the animal shelter to help animals.'],
]);
a(2, `On Monday, a new girl named Amira came to our class. She was shy and held her backpack tightly. Our teacher asked, “Who wants to be Amira’s buddy today?” I put up my hand. At recess, I showed Amira the library, the playground, and the best place to play tag. By the end of the day, she was laughing with us. “I think I will like this school,” she said.`, [
  ['Why did Amira hold her backpack tightly?', 'Because she was shy and new.'],
  ['What did the narrator do to help Amira?', 'The narrator became her buddy and showed her around the school.'],
  ['How did Amira feel at the end of the day?', 'She felt happy and thought she would like the school.'],
  ['How can you help a new student at school?', 'You can be friendly, show them around, and invite them to play.'],
]);
a(2, `Last night there was a big thunderstorm. The lightning lit up my whole room, and the thunder was so loud that my dog hid under the bed. I pulled my blanket over my head and counted the seconds between the flash and the boom. My mom came in, sat next to me, and told me that the storm was far away. Soon the rain got softer, and I fell asleep listening to it.`, [
  ['What did the dog do during the storm?', 'It hid under the bed.'],
  ['What did the narrator count?', 'The seconds between the lightning and the thunder.'],
  ['How did the narrator’s mom help?', 'She sat next to the child and said the storm was far away.'],
  ['How did the narrator feel at first and at the end?', 'First scared, then calm enough to fall asleep.'],
]);
a(2, `Maple syrup is one of Canada’s favourite treats. In early spring, farmers make small holes in maple trees and hang buckets to catch the sap. The sap looks like water, but it is a little sweet. The farmers boil it for many hours until it becomes thick and golden. It takes about forty buckets of sap to make just one bucket of syrup! Many families eat it on pancakes.`, [
  ['When do farmers collect maple sap?', 'In early spring.'],
  ['How do farmers turn sap into syrup?', 'They boil it for many hours until it becomes thick and golden.'],
  ['What does the text say about forty buckets?', 'It takes forty buckets of sap to make one bucket of syrup.'],
  ['How do many families eat maple syrup?', 'On pancakes.'],
]);
a(2, `Chen wanted to learn to ride a bike without training wheels. His uncle took off the extra wheels and held the back of the seat. “Look ahead, not down,” his uncle said. Chen wobbled and fell on the grass, but it did not hurt. He tried again and again. On the tenth try, he rode all the way to the corner. When he looked back, he saw that his uncle was far behind. He was riding on his own!`, [
  ['What did Chen want to learn?', 'To ride a bike without training wheels.'],
  ['What advice did his uncle give?', 'Look ahead, not down.'],
  ['What happened on the tenth try?', 'Chen rode all the way to the corner by himself.'],
  ['What does this story teach us?', 'If you keep trying, you can learn something hard.'],
]);
a(2, `Our class went on a trip to the aquarium. First, we saw jellyfish floating in blue light. Then we watched the sharks swimming above our heads in a glass tunnel. The best part was the dolphin show. A trainer asked the dolphins to jump through hoops, and they splashed the first row of people. Everyone laughed and clapped. On the bus ride home, we wrote down our favourite animals.`, [
  ['Where did the class go?', 'To the aquarium.'],
  ['What did they see in the glass tunnel?', 'Sharks swimming above their heads.'],
  ['What happened in the dolphin show?', 'The dolphins jumped through hoops and splashed people.'],
  ['What did the students do on the bus ride home?', 'They wrote down their favourite animals.'],
]);

/* ---------- Level 3 ---------- */
a(3, `The Rideau Canal in Ottawa becomes the biggest natural skating rink in the world every winter. When the ice is thick enough, workers clear the snow and open the rink to everyone. People skate to work, to school, or just for fun. Along the canal, you can buy hot chocolate and warm pastries called beaver tails. Families take pictures, and children race each other on the ice. When spring comes, the ice melts, and boats take the place of skaters on the same water.`, [
  ['Why is the Rideau Canal special in winter?', 'It becomes the biggest natural skating rink in the world.'],
  ['What must happen before the rink opens?', 'The ice must be thick enough and workers clear the snow.'],
  ['What can people buy along the canal?', 'Hot chocolate and beaver tails.'],
  ['What happens to the canal in spring?', 'The ice melts and boats replace the skaters.'],
]);
a(3, `Ava was afraid of the water. Every time her class went to swimming lessons, she sat on the edge of the pool with her feet in the water. Her teacher, Mr. Rossi, never forced her. Instead, he asked her to blow bubbles, then to put her face in, then to float with a noodle. One day, Ava let go of the noodle without noticing. She floated all by herself! “Look at me!” she shouted. Her classmates cheered, and Ava learned that small steps can lead to big changes.`, [
  ['Why did Ava sit on the edge of the pool?', 'Because she was afraid of the water.'],
  ['How did Mr. Rossi help Ava?', 'He gave her small steps: blowing bubbles, putting her face in, then floating with a noodle.'],
  ['What happened when Ava let go of the noodle?', 'She floated by herself.'],
  ['What is the lesson of the story?', 'Small steps can lead to big changes, and you can overcome fear little by little.'],
]);
a(3, `Recycling helps our planet in many ways. When we put paper, glass, plastic and metal in the right bin, factories can turn them into new things instead of using new materials. This saves trees, water and energy. One recycled glass bottle can save enough energy to light a bulb for hours. But recycling only works when people sort carefully. A greasy pizza box, for example, cannot be recycled with clean paper. Reusing things, like bringing your own water bottle, is even better because it creates less garbage.`, [
  ['How does recycling help the planet?', 'It saves trees, water and energy because old materials become new things.'],
  ['Why can’t a greasy pizza box go in with clean paper?', 'Because the grease spoils the paper so it cannot be recycled.'],
  ['What is better than recycling according to the text?', 'Reusing things, like a water bottle, because it makes less garbage.'],
  ['Name one thing you can do to help.', 'Sort garbage carefully, recycle, or reuse things like a water bottle.'],
]);
a(3, `On the last day of school, Ms. Patel gave each student an envelope. Inside was a note that she had written about something special in that child. Noah’s note said, “You are a great problem solver, and you help others without being asked.” Noah read it three times. At home, he put the note on his bedroom wall, right next to his favourite hockey poster. When he feels discouraged, he looks at it and remembers that someone believed in him.`, [
  ['What did Ms. Patel give each student?', 'An envelope with a note about something special in the child.'],
  ['What did Noah’s note say about him?', 'That he is a great problem solver and helps others without being asked.'],
  ['Where did Noah put the note and why?', 'On his bedroom wall, so he can look at it when he feels discouraged.'],
  ['Why was the note important to Noah?', 'It reminded him that someone believed in him.'],
]);
a(3, `Wolves live and hunt in groups called packs. A pack is like a family, with a mother, a father, and their young. Wolves cannot talk, but they communicate in many ways. They howl to call others from far away, growl to warn, and wag their tails when they feel friendly. Contrary to scary stories, wolves seldom attack people. They prefer to stay away from humans. In many places, wolves have been brought back to forests, and scientists say they help keep nature in balance.`, [
  ['What is a group of wolves called?', 'A pack.'],
  ['Name two ways wolves communicate.', 'They howl, growl, and wag their tails.'],
  ['What does the text say about scary stories?', 'Wolves seldom attack people and prefer to stay away from humans.'],
  ['How do wolves help nature?', 'They help keep nature in balance.'],
]);
a(3, `Emma and her grandfather like to go fishing on Sunday mornings. They get up before the sun and paddle a small canoe to the middle of the lake. It is so quiet that you can hear the fish jumping. Emma’s grandfather teaches her to be patient: “Fishing is not just about catching fish. It is about enjoying the day.” Today they catch nothing, but they see a loon with her baby on her back. Emma says it is the best fishing trip ever.`, [
  ['When do Emma and her grandfather go fishing?', 'On Sunday mornings.'],
  ['What does Emma’s grandfather say about fishing?', 'It is not only about catching fish; it is about enjoying the day.'],
  ['What do they see today?', 'A loon with her baby on her back.'],
  ['Why does Emma say it is the best trip ever, even without fish?', 'Because she enjoyed the quiet lake and saw the loon.'],
]);
a(3, `Long ago, Indigenous peoples in Canada made canoes from birch bark. The bark was light, waterproof and easy to find in the forest. Builders sewed the pieces with spruce roots and sealed the seams with sticky tree gum so that water could not get in. These canoes were so light that two people could carry them around rapids. Today, a few artists still make canoes this way. They pass their knowledge to young people so that the tradition does not disappear.`, [
  ['What were the canoes made of?', 'Birch bark sewn with spruce roots.'],
  ['Why did builders use tree gum?', 'To seal the seams so water could not get in.'],
  ['Why was it good that the canoes were light?', 'Two people could carry them around rapids.'],
  ['Why do artists teach young people today?', 'So the tradition does not disappear.'],
]);
a(3, `Dylan hated going to bed. Every night, he asked for another story, another glass of water, or another hug. One evening, his mother told him a secret: “Do you know what happens when you sleep? Your brain cleans itself, your body grows, and you dream of wonderful things.” Dylan was curious. That night, he went to bed early and, in the morning, he told his mother about a dream where he was flying over the lake. From then on, going to bed became his favourite part of the day.`, [
  ['What did Dylan ask for every night?', 'Another story, another glass of water or another hug.'],
  ['What secret did his mother tell him?', 'That when you sleep, your brain cleans itself, your body grows, and you dream.'],
  ['What did Dylan dream about?', 'He was flying over the lake.'],
  ['How did Dylan change?', 'He became curious and started to enjoy going to bed.'],
]);
a(3, `A group of students noticed that the playground was always full of litter at lunchtime. Instead of complaining, they made a plan. They designed bright posters, asked the principal for more garbage cans, and organized “Clean Team” volunteers for each day of the week. After one month, the playground was cleaner than it had ever been. Other schools heard about the idea and asked for advice. The students proudly explained that big changes start when a few people decide to act.`, [
  ['What problem did the students notice?', 'The playground was full of litter at lunchtime.'],
  ['What did they do to solve it?', 'They made posters, asked for more garbage cans and organized Clean Team volunteers.'],
  ['What happened after one month?', 'The playground was cleaner than ever and other schools asked for advice.'],
  ['What does the final sentence teach us?', 'That big changes start when a few people decide to act.'],
]);
a(3, `Every autumn, thousands of Canada geese fly south in a big V shape. The geese at the front work the hardest because they break the wind, so they take turns leading. When one goose gets tired, it moves to the back and another goose takes its place. The geese honk loudly to encourage each other. If a goose gets sick, two friends stay with it until it can fly again. Scientists say that this teamwork helps the whole flock travel much farther than one bird alone.`, [
  ['Why do the geese fly in a V shape and take turns leading?', 'The front goose works hardest by breaking the wind, so they share the work.'],
  ['Why do the geese honk?', 'To encourage each other.'],
  ['What do two geese do if another goose gets sick?', 'They stay with it until it can fly again.'],
  ['What does this story teach us about teamwork?', 'Working together helps everyone go farther than alone.'],
]);

/* ------------------------------------------------------------------ */
/*  Question factories                                                */
/* ------------------------------------------------------------------ */
const DICT_Q = { 1: [], 2: [], 3: [] };
for (const l of [1, 2, 3]) DICT[l].forEach((text, i) => DICT_Q[l].push({ key: `e35-l${l}-${i}`, text }));
const DICT_LINES = { 1: 1, 2: 2, 3: 3 };
const dictToQ = (e, level) => hand({
  mode: 'dictation', key: e.key,
  prompt: { fr: 'Écoute et écris la phrase en anglais.', en: 'Listen and write the sentence.' },
  say: { text: e.text, lang: EN }, expected: e.text, lines: DICT_LINES[level],
});

const ANS_Q = { 1: [], 2: [], 3: [] };
A.forEach((tx, ti) => tx.qs.forEach((q, qi) => ANS_Q[tx.l].push({ key: `e36-l${tx.l}-t${ti}-q${qi}`, text: tx.text, q: q[0], k: q[1] })));
const ANS_LINES = { 1: 2, 2: 2, 3: 3 };
const ansToQ = (e, level) => hand({
  mode: 'answer', key: e.key, prompt: e.q, say: { text: e.q, lang: EN },
  stimulus: { text: e.text }, answerKey: e.k, lines: ANS_LINES[level],
});

const SENT_Q = { 1: [], 2: [], 3: [] };
S1.forEach(([w, em], i) => SENT_Q[1].push({
  key: `e37-l1-${i}`, emoji: em, words: [w], minWords: 3, lines: 2,
  fr: `Écris une phrase avec le mot « ${w} ».`, en: `Write a sentence with the word “${w}”.`, say: `Write a sentence with the word ${w}.`,
}));
S2.forEach(([w1, w2, em], i) => SENT_Q[2].push({
  key: `e37-l2-${i}`, emoji: em, words: [w1, w2], minWords: 6, lines: 3,
  fr: `Écris une phrase avec les mots « ${w1} » et « ${w2} ».`, en: `Write a sentence with the words “${w1}” and “${w2}”.`, say: `Write a sentence with the words ${w1} and ${w2}.`,
}));
S3.forEach((em, i) => SENT_Q[3].push({
  key: `e37-l3-${i}`, emoji: em, minWords: 12, lines: 4,
  fr: 'Regarde l’image. Décris la scène en deux ou trois phrases.', en: 'Look at the picture. Describe the scene in two or three sentences.', say: 'Look at the picture. Describe the scene in two or three sentences.',
}));
const sentToQ = (e) => hand({
  mode: 'sentence', key: e.key, prompt: { fr: e.fr, en: e.en }, say: { text: e.say, lang: EN },
  stimulus: { emoji: e.emoji }, ...(e.words ? { words: e.words } : {}), minWords: e.minWords, lines: e.lines,
});

const COMP = { 1: C1, 2: C2, 3: C3 };
const COMP_SPEC = { 1: { minWords: 15, lines: 4 }, 2: { minWords: 30, lines: 6 }, 3: { minWords: 45, lines: 8 } };
const compToQ = (level, i) => hand({
  mode: 'composition', key: `e38-l${level}-${i}`, prompt: { fr: COMP[level][i].fr, en: COMP[level][i].en },
  say: { text: COMP[level][i].en, lang: EN }, ...COMP_SPEC[level],
});

const pickLevel = (level) => ([1, 2, 3].includes(level) ? level : 2);

export const units = [
  {
    id: 'e35',
    icon: '✍️',
    title: { fr: 'Dictée en anglais', en: 'Spelling dictation' },
    pfeq: 'Anglais langue seconde — écrire à la main des mots et des phrases entendus (orthographe de base)',
    generate(level, R) { const l = pickLevel(level); return dictToQ(R.pick(DICT_Q[l]), l); },
    allSay() { return [1, 2, 3].flatMap((l) => DICT[l].map((text) => ({ text, lang: EN }))); },
  },
  {
    id: 'e36',
    icon: '📝',
    title: { fr: 'Lire et répondre par écrit', en: 'Read and write the answer' },
    pfeq: 'Anglais langue seconde — lire un court texte et répondre par écrit à une question en phrase complète',
    generate(level, R) { const l = pickLevel(level); return ansToQ(R.pick(ANS_Q[l]), l); },
    // One practice round = one text with all its questions.
    session(level, R) {
      const l = pickLevel(level);
      const pool = ANS_Q[l], texts = [...new Set(pool.map((e) => e.text))];
      const t = R.pick(texts);
      return pool.filter((e) => e.text === t).map((e) => ansToQ(e, l));
    },
    allSay() { return [1, 2, 3].flatMap((l) => ANS_Q[l].map((e) => ({ text: e.q, lang: EN }))); },
  },
  {
    id: 'e37',
    icon: '🖼️',
    title: { fr: 'J’écris des phrases en anglais', en: 'Write sentences' },
    pfeq: 'Anglais langue seconde — écrire une phrase complète à partir d’un ou de deux mots, ou d’une image',
    generate(level, R) { const l = pickLevel(level); return sentToQ(R.pick(SENT_Q[l])); },
    allSay() { return [1, 2, 3].flatMap((l) => SENT_Q[l].map((e) => ({ text: e.say, lang: EN }))); },
  },
  {
    id: 'e38',
    icon: '📮',
    title: { fr: 'Petites histoires en anglais', en: 'Little stories' },
    pfeq: 'Anglais langue seconde — écrire un petit texte : décrire, raconter, écrire un mot ou une suite d’histoire',
    generate(level, R) { const l = pickLevel(level); return compToQ(l, R.int(0, COMP[l].length - 1)); },
    allSay() { return [1, 2, 3].flatMap((l) => COMP[l].map((x) => ({ text: x.en, lang: EN }))); },
  },
];
