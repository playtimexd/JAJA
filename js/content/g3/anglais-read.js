// Grade 3 ESL — Reading units g3e1…g3e5 (stories, informational texts, emails & postcards, recipes & instructions, comics dialogues).
// Every text is an original slot-set template; one session = one text with 4–6 questions (literal, inference, vocabulary, sequencing).
import { slots as S, storyUnit, PF, COMP_READ, cap } from './anglais-core.js';

const pre = (p, a) => a.map((x) => p + x);
const lc = (x) => x[0].toLowerCase() + x.slice(1);

/* ================================================================== */
/*  g3e1 — Short stories                                              */
/* ================================================================== */
const stories1 = {
  1: [
    { id: 'pet', sets: S('n p c pl a m', [
      'Mia|dog|brown|park|run and play|a snack', 'Leo|cat|grey|garden|chase the leaves|some milk', 'Zoe|rabbit|white|field|hop in the grass|a carrot',
      'Sam|turtle|green|pond|swim and rest|some lettuce', 'Ava|horse|black|farm|walk slowly|an apple', 'Max|parrot|red|yard|sing a song|some seeds']),
    text: (s) => `${s.n} has a ${s.p}. The ${s.p} is ${s.c}. Every day, ${s.n} and the ${s.p} go to the ${s.pl}. They ${s.a}. Then they go home and have ${s.m}.`,
    qs: [
      (s, O) => [`What pet does ${s.n} have?`, `a ${s.p}`, pre('a ', O('p')), 'lit'],
      (s, O) => [`What colour is the ${s.p}?`, s.c, O('c'), 'lit'],
      (s, O) => ['Where do they go every day?', `to the ${s.pl}`, pre('to the ', O('pl')), 'lit'],
      (s, O) => ['What do they have at home?', s.m, O('m'), 'lit'],
      (s) => ({ q: 'Put the events in order.', seq: [`They go to the ${s.pl}.`, `They ${s.a}.`, 'They go home.'] }),
    ] },
    { id: 'lost', sets: S('n it p1 p2', [
      'Tom|hat|kitchen|bed', 'Lily|mitten|bag|chair', 'Omar|ball|garage|couch', 'Emma|book|car|table', 'Noah|sock|closet|desk', 'Nina|pencil|backpack|bookshelf']),
    text: (s) => `${s.n} lost a ${s.it}. ${s.n} looked in the ${s.p1}. It was not there. Then ${s.n} looked under the ${s.p2}. There it was! ${s.n} was very happy.`,
    qs: [
      (s, O) => [`What did ${s.n} lose?`, `a ${s.it}`, pre('a ', O('it')), 'lit'],
      (s, O) => [`Where did ${s.n} look first?`, `in the ${s.p1}`, pre('in the ', O('p1')), 'lit'],
      (s, O) => ['Where was it?', `under the ${s.p2}`, pre('under the ', O('p2')), 'lit'],
      () => ['How did the story end?', 'happy', ['sad', 'angry', 'sleepy'], 'inf'],
      (s) => ({ q: 'Put the events in order.', seq: [`${s.n} looked in the ${s.p1}.`, `${s.n} looked under the ${s.p2}.`, `${s.n} was very happy.`] }),
    ] },
    { id: 'snow', sets: S('n c1 fr th', [
      'Ben|red|Mom|snowman', 'Ella|blue|Dad|snow fort', 'Luc|green|Max|snow angel', 'Ruby|yellow|Grandpa|snow tunnel', 'Jay|black|Nora|snow castle', 'Kim|purple|Zoe|snow slide']),
    text: (s) => `It is a snow day! ${s.n} puts on a ${s.c1} coat and warm boots. ${s.n} goes outside with ${s.fr}. They make a ${s.th} in the snow. ${s.n} says, “This is the best day!”`,
    qs: [
      () => ['What kind of day is it?', 'a snow day', ['a rainy day', 'a sunny day', 'a windy day'], 'lit'],
      (s, O) => ['What colour is the coat?', s.c1, O('c1'), 'lit'],
      (s, O) => [`Who goes outside with ${s.n}?`, s.fr, O('fr'), 'lit'],
      (s, O) => ['What do they make?', `a ${s.th}`, pre('a ', O('th')), 'lit'],
      (s) => ({ q: 'Put the events in order.', seq: [`${s.n} puts on a ${s.c1} coat.`, `${s.n} goes outside.`, `They make a ${s.th}.`] }),
    ] },
  ],
  2: [
    { id: 'newkid', sets: S('n kid fr g', ['Ana|girl|Ruby|tag', 'Jack|boy|Kofi|soccer', 'Léa|girl|Hana|skipping', 'Eli|boy|Dev|hockey', 'Nora|girl|Pia|hide and seek', 'Sami|boy|Theo|basketball']),
    text: (s) => `${s.n} felt nervous on the first day at a new school. ${s.n} did not know anyone. At recess, a ${s.kid} named ${s.fr} asked, “Do you want to play ${s.g}?” ${s.n} said yes. They laughed a lot. At the end of the day, ${s.n} could not wait for tomorrow.`,
    qs: [
      (s) => [`How did ${s.n} feel at first?`, 'nervous', ['excited', 'angry', 'sleepy'], 'lit'],
      (s, O) => [`Who asked ${s.n} to play?`, s.fr, O('fr'), 'lit'],
      (s, O) => ['What game did they play?', s.g, O('g'), 'lit'],
      (s) => [`How did ${s.n} probably feel at the end of the day?`, 'happy', ['bored', 'scared', 'upset'], 'inf', 'Think about “could not wait for tomorrow”.'],
      () => ['What does “nervous” mean?', 'a little scared or worried', ['very hungry', 'very tired', 'very angry'], 'voc'],
      (s) => ({ q: 'Put the events in order.', seq: [`${s.n} felt nervous.`, `${s.fr} asked ${s.n} to play.`, `${s.n} could not wait for tomorrow.`] }),
    ] },
    { id: 'seed', sets: S('n sd w pl', [
      'Mila|sunflower|two|by the window', 'Sam|bean|three|in the sun', 'Jade|tomato|four|on the balcony', 'Hugo|pumpkin|five|near the door', 'Lina|pea|three|on the kitchen shelf', 'Theo|carrot|six|on the porch']),
    text: (s) => `${s.n} planted a ${s.sd} seed in a small pot. Every morning, ${s.n} gave it water and put it ${s.pl}. After ${s.w} weeks, a tiny green shoot came up. ${s.n} was so proud! The little plant needed sun and water to grow.`,
    qs: [
      (s, O) => [`What did ${s.n} plant?`, `a ${s.sd} seed`, pre('a ', O('sd')).map((x) => `${x} seed`), 'lit'],
      (s, O) => [`Where did ${s.n} put the pot?`, s.pl, O('pl'), 'lit'],
      (s, O) => ['How long did it take for a shoot to come up?', `${s.w} weeks`, O('w').map((x) => `${x} weeks`), 'lit'],
      () => ['What does the little plant need to grow?', 'sun and water', ['music and toys', 'snow and wind', 'candy and milk'], 'inf'],
      () => ['What does “proud” mean?', 'very happy about something you did', ['afraid of something', 'sleepy after lunch', 'angry at a friend'], 'voc'],
      (s) => ({ q: 'Put the events in order.', seq: [`${s.n} planted a seed.`, `${s.n} gave it water every morning.`, 'A tiny green shoot came up.'] }),
    ] },
    { id: 'picnic', sets: S('n fr pl food', [
      'Zara|Theo|beach|sandwiches', 'Finn|Maya|park|fruit salad', 'Ines|Luc|lake|pizza', 'Owen|Ella|forest|cheese and crackers', 'Rose|Hugo|hill|cold pasta', 'Cam|Yuki|river|cherry tomatoes']),
    text: (s) => `${s.n} and ${s.fr} planned a picnic at the ${s.pl} on Saturday. But in the morning, dark clouds covered the sky and it started to pour. They were disappointed. Then ${s.fr} had an idea. “Let’s have a picnic indoors!” They spread a blanket on the living room floor and ate ${s.food}. It was the best picnic ever.`,
    qs: [
      (s, O) => ['Where did they plan the picnic?', `at the ${s.pl}`, pre('at the ', O('pl')), 'lit'],
      () => ['What happened on Saturday morning?', 'It started to rain.', ['It started to snow.', 'The sun came out.', 'The wind took the blanket.'], 'lit'],
      (s, O) => ['Who had the idea?', s.fr, O('fr').concat([s.n]).filter((x) => x !== s.fr).slice(0, 3), 'lit'],
      (s, O) => ['What did they eat?', s.food, O('food'), 'lit'],
      () => ['What does “disappointed” mean?', 'sad because things did not go as planned', ['very surprised and happy', 'tired after a long walk', 'afraid of the dark'], 'voc'],
      () => ['Where did they have the picnic in the end?', 'in the living room', ['at the beach', 'in the garden', 'at school'], 'inf'],
    ] },
  ],
  3: [
    { id: 'fable', sets: S('an wat tr bg dang bm', [
      'mouse|river|apple tree|frog|dangerous|a raft from sticks', 'ant|pond|strawberry patch|duck|wide|a boat from a big leaf', 'beetle|stream|flower field|fish|fast|a raft from bark',
      'cricket|lake|orchard|swan|deep|a boat from a walnut shell', 'hedgehog|creek|berry bush|beaver|cold|a raft from small logs']),
    text: (s) => `A little ${s.an} wanted to cross the ${s.wat} to reach the ${s.tr} on the other side. “It is too ${s.dang},” said the ${s.bg}. “You will never make it.” But the ${s.an} did not listen. It built ${s.bm} and paddled slowly across. When it reached the other side, it was tired but proud. “Sometimes,” it said, “you must try, even when others say you cannot.”`,
    qs: [
      (s, O) => [`What did the ${s.an} want to reach?`, `the ${s.tr}`, pre('the ', O('tr')), 'lit'],
      (s, O) => ['What did it build?', s.bm, O('bm'), 'lit'],
      () => ['Why did the little animal ignore the warning?', 'It believed it could do it.', ['It could not hear.', 'It was too afraid to move.', 'It wanted to stay home.'], 'inf'],
      () => ['What is the lesson of this story?', 'Try even when others doubt you.', ['Never go near water.', 'Always listen to every warning.', 'Rafts are faster than boats.'], 'inf'],
      () => ['What does “paddled” mean?', 'moved through water using a paddle', ['jumped very high', 'ran very fast', 'slept on the ground'], 'voc'],
      (s) => ({ q: 'Put the events in order.', seq: [`The ${s.an} wanted to cross the ${s.wat}.`, `The ${s.an} built ${s.bm}.`, `The ${s.an} reached the other side.`] }),
    ] },
    { id: 'noise', sets: S('n snd pl an dn', [
      'Lucas|scratching|basement|a raccoon|eating the cat food', 'Emi|thumping|kitchen|a puppy|chasing its tail', 'Ravi|tapping|porch|a squirrel|hiding a nut in a boot',
      'Chloe|squeaking|garage|a kitten|stuck in a box', 'Dylan|rattling|laundry room|a mouse|playing with a sock']),
    text: (s) => `${s.n} woke up in the middle of the night. A strange ${s.snd} sound was coming from the ${s.pl}. ${s.n} grabbed a flashlight and tiptoed down the stairs. The sound got louder. Slowly, ${s.n} opened the door. It was ${s.an}, ${s.dn}! ${s.n} laughed with relief. “You scared me!” ${s.n} whispered.`,
    qs: [
      (s, O) => [`What kind of sound did ${s.n} hear?`, `a ${s.snd} sound`, pre('a ', O('snd')).map((x) => `${x} sound`), 'lit'],
      (s, O) => ['Where was the sound coming from?', `the ${s.pl}`, pre('the ', O('pl')), 'lit'],
      (s, O) => [`What did ${s.n} find?`, s.an, O('an'), 'lit'],
      () => ['Why did the character take a flashlight?', 'It was dark.', ['It was a birthday gift.', 'It was too hot.', 'It was morning.'], 'inf'],
      (s) => [`How did ${s.n} feel at the end?`, 'relieved', ['angry', 'bored', 'sad'], 'inf', '“Relief” is the happy feeling when a worry goes away.'],
      () => ['What does “tiptoed” mean?', 'walked quietly on the tips of the toes', ['ran as fast as possible', 'jumped on one foot', 'fell down the stairs'], 'voc'],
    ] },
    { id: 'game', sets: S('n sp ob tm', [
      'Ines|soccer|ball|Jules', 'Marc|hockey|puck|Dana', 'Tess|basketball|ball|Omar', 'Kai|floorball|ball|Sana', 'Rin|handball|ball|Leo']),
    text: (s) => `${s.n} had waited all week for the ${s.sp} final. In the last minute, the score was tied, and ${s.n} had the ${s.ob}. The crowd began to shout, but ${s.n} stayed calm, took a deep breath, and passed to ${s.tm}, who was open. ${s.tm} scored! The team won, and ${s.n} felt happier about that pass than about any goal.`,
    qs: [
      (s, O) => ['What sport is in the story?', s.sp, O('sp'), 'lit'],
      (s, O) => ['Who scored the winning goal?', s.tm, O('tm').concat([s.n]).filter((x) => x !== s.tm).slice(0, 3), 'lit'],
      (s) => [`Why did ${s.n} pass the ${s.ob}?`, `${s.tm} was open and had a better chance.`, [`${s.n} was too tired to shoot.`, 'The referee told the player to pass.', 'The game was already over.'], 'inf'],
      () => ['What does “tied” mean?', 'both teams have the same score', ['one team is far ahead', 'the game has not started', 'the players are in a line'], 'voc'],
      (s) => [`How did ${s.n} feel at the end?`, 'proud of helping the team', ['upset about not scoring', 'angry at the crowd', 'bored of the game'], 'inf'],
      () => ['What did the player do when the crowd shouted?', 'stayed calm', ['screamed back', 'left the field', 'dropped the ball'], 'lit'],
    ] },
  ],
};

/* ================================================================== */
/*  g3e2 — Informational texts                                        */
/* ================================================================== */
const info2 = {
  1: [
    { id: 'animal', sets: S('an a ad hab food ab', [
      'polar bear|A polar bear|big and white|in the Arctic|fish and seals|swim for hours', 'beaver|A beaver|brown and furry|near rivers and lakes|bark and leaves|build dams',
      'owl|An owl|quiet and wise|in tall trees|mice and insects|see in the dark', 'frog|A frog|small and green|near ponds|flies and bugs|jump very far',
      'moose|A moose|very tall|in the forest|plants and twigs|swim across lakes', 'ant|An ant|tiny and strong|in the ground|seeds and crumbs|carry big things']),
    text: (s) => `${s.a} is ${s.ad}. It lives ${s.hab}. It eats ${s.food}. It can also ${s.ab}.`,
    qs: [
      (s, O) => ['Which animal is the text about?', s.an, O('an'), 'lit'],
      (s, O) => ['What is it like?', s.ad, O('ad'), 'lit'],
      (s, O) => ['Where does it live?', s.hab, O('hab'), 'lit'],
      (s, O) => ['What does it eat?', s.food, O('food'), 'lit'],
      (s, O) => ['What can it also do?', s.ab, O('ab'), 'lit'],
    ] },
    { id: 'job', sets: S('j wh wr hp', [
      'firefighter|at a fire station|a helmet and boots|putting out fires', 'doctor|in a hospital|a white coat|making sick people better', 'baker|in a bakery|an apron|making bread and cakes',
      'farmer|on a farm|rubber boots|growing food', 'mail carrier|in the neighbourhood|a uniform|bringing letters to homes', 'librarian|in a library|ordinary clothes|finding good books for them']),
    text: (s) => `A ${s.j} works ${s.wh}. A ${s.j} wears ${s.wr}. A ${s.j} helps people by ${s.hp}.`,
    qs: [
      (s, O) => ['Which job is the text about?', s.j, O('j'), 'lit'],
      (s, O) => [`Where does a ${s.j} work?`, s.wh, O('wh'), 'lit'],
      (s, O) => [`What does a ${s.j} wear?`, s.wr, O('wr'), 'lit'],
      (s, O) => [`How does a ${s.j} help people?`, s.hp, O('hp'), 'lit'],
    ] },
    { id: 'weather', sets: S('w sk th a', [
      'rainy|grey|raindrops|wear a raincoat', 'sunny|blue|the bright sun|wear a hat', 'snowy|white|snowflakes|wear boots', 'windy|cloudy|leaves flying|hold on to our hats',
      'stormy|dark|lightning|stay inside', 'foggy|grey|nothing far away|walk carefully']),
    text: (s) => `When it is ${s.w}, the sky is ${s.sk}. We can see ${s.th}. We should ${s.a}.`,
    qs: [
      (s, O) => ['What kind of weather is it?', s.w, O('w'), 'lit'],
      (s, O) => ['What can we see?', s.th, O('th'), 'lit'],
      (s, O) => ['What should we do?', s.a, O('a'), 'lit'],
      (s) => [`Is it a good idea to go outside when it is ${s.w}?`, s.a.startsWith('stay') ? 'No, we should stay inside.' : 'Yes, if we are careful.', s.a.startsWith('stay') ? ['Yes, it is perfect for a picnic.', 'Yes, we do not need anything.'] : ['No, we must never go out.', 'No, it is too sunny for everyone.'], 'inf'],
    ] },
  ],
  2: [
    { id: 'adapt', sets: S('a hab feat help also env', [
      'The polar bear|near the Arctic Ocean|thick fur and a layer of fat|stay warm in freezing air|In winter, it hunts seals on the ice|cold places',
      'The camel|in hot deserts|wide, flat feet|walk on soft sand without sinking|It can go many days without a drink|hot and dry places',
      'The owl|in forests|soft feathers|fly without making a sound|At night, it hunts mice|hunting in the dark',
      'The giraffe|on grassy plains|a very long neck|reach leaves high in the trees|It spends most of the day eating|places with tall trees',
      'The duck|near lakes and ponds|webbed feet|paddle through the water|In fall, many ducks fly south|life near water',
      'The snowshoe hare|in Canadian forests|big, hairy feet|run on top of deep snow|In winter, its brown fur turns white|snowy forests']),
    text: (s) => `${s.a} lives ${s.hab}. It has ${s.feat}, which helps it ${s.help}. ${s.also}. These features make it well suited to ${s.env}.`,
    qs: [
      (s, O) => ['Where does the animal live?', s.hab, O('hab'), 'lit'],
      (s, O) => ['What special feature does it have?', s.feat, O('feat'), 'lit'],
      (s, O) => ['What does that feature help it do?', s.help, O('help'), 'lit'],
      (s) => [`Why is ${s.a.toLowerCase()} well suited to ${s.env}?`, 'Its body has features that help it live there.', ['It does not need food.', 'It lives in a zoo.', 'It copies other animals.'], 'inf'],
      () => ['What does “suited” mean here?', 'right for', ['too big for', 'afraid of', 'far away from'], 'voc'],
      () => ['What is the main idea?', 'Animals have special features that help them live in their homes.', ['All animals sleep at night.', 'Animals like to travel.', 'Some animals are big.'], 'inf'],
    ] },
    { id: 'cycle', sets: S('an st1 st2 st3', [
      'butterfly|a tiny egg|a hungry caterpillar|a chrysalis', 'frog|an egg in the water|a tadpole with a tail|a young frog with legs', 'chicken|an egg|a fluffy chick|a young hen',
      'bean plant|a seed|a small shoot|a tall plant with leaves', 'ladybug|a tiny egg|a hungry larva|a pupa']),
    text: (s) => `A ${s.an} begins its life as ${s.st1}. Then it becomes ${s.st2}. After that, it turns into ${s.st3}. At the end, it is a grown-up ${s.an}. This is called a life cycle.`,
    qs: [
      (s, O) => [`How does a ${s.an} begin its life?`, s.st1, O('st1'), 'lit'],
      (s, O) => ['What does it become second?', s.st2, O('st2'), 'lit'],
      (s, O) => ['What does it become third?', s.st3, O('st3'), 'lit'],
      (s) => ({ q: 'Put the stages in order.', seq: [cap(s.st1), cap(s.st2), cap(s.st3)] }),
      () => ['What is a life cycle?', 'the changes a living thing goes through', ['a ride on a bike', 'a kind of weather', 'a long trip'], 'voc'],
    ] },
    { id: 'place', sets: S('p kind loc kn vis', [
      'Niagara Falls|a giant waterfall|Ontario|its huge, thundering water|tourists', 'Banff|a national park|Alberta|snowy mountains and clear lakes|hikers and skiers',
      'The CN Tower|a very tall tower|Toronto|its great height|visitors', 'The Rideau Canal|a long frozen path for skating|Ottawa|skating in winter|skaters',
      'Mont-Royal|a large hill and park|Montréal|its big cross and city views|joggers and families']),
    text: (s) => `${s.p} is ${s.kind}. You can find it in ${s.loc}. It is famous for ${s.kn}. Every year, many ${s.vis} come to see it.`,
    qs: [
      (s, O) => ['Where can you find it?', s.loc, O('loc'), 'lit'],
      (s, O) => ['What is it?', s.kind, O('kind'), 'lit'],
      (s, O) => ['What is it famous for?', s.kn, O('kn'), 'lit'],
      (s, O) => ['Who comes to see it?', s.vis, O('vis'), 'lit'],
      (s) => ['What is the main idea?', `${s.p} is a famous place in Canada.`, ['Canada is very cold.', 'Everyone lives in Toronto.', 'Tourists never come to Canada.'], 'inf'],
    ] },
  ],
  3: [
    { id: 'recycle', sets: S('it mat s1 s2 prod', [
      'glass jars|glass|sort them by colour|a hot oven melts the glass|new jars and bottles', 'newspapers|paper|collect and sort them|a machine mixes them with water to make pulp|fresh sheets of paper',
      'aluminum cans|aluminum|crush them into blocks|a furnace melts the metal|new cans', 'plastic bottles|plastic|wash them and cut them into tiny pieces|a machine melts the pieces|new bottles and warm clothing',
      'cardboard boxes|cardboard|flatten them and tie them in bundles|a machine breaks them into soft pulp|new boxes']),
    text: (s) => `Every year, people throw away millions of ${s.it}. But ${s.it} can be recycled. First, workers ${s.s1}. Next, ${s.s2}. Finally, the ${s.mat} is made into ${s.prod}. Recycling saves energy and helps keep our planet clean.`,
    qs: [
      (s, O) => ['What do workers do first?', s.s1, O('s1'), 'lit'],
      (s, O) => ['What happens next?', s.s2, O('s2'), 'lit'],
      (s, O) => [`What is the ${s.mat} made into at the end?`, s.prod, O('prod'), 'lit'],
      () => ['Why is recycling good?', 'It saves energy and keeps the planet clean.', ['It makes more garbage.', 'It costs a lot of money.', 'It makes things dirty.'], 'inf'],
      () => ['What does “recycled” mean?', 'used again to make something new', ['thrown into the lake', 'kept in a box forever', 'broken into two parts'], 'voc'],
      (s) => ({ q: 'Put the steps in order.', seq: [`Workers ${s.s1}.`, `${cap(s.s2)}.`, `It becomes ${s.prod}.`] }),
    ] },
    { id: 'compare', sets: S('a1 a2 cat d1 d2 sim', [
      'Frogs|toads|amphibians|have smooth, wet skin|have dry, bumpy skin|start life in water', 'Moths|butterflies|insects with wings|usually fly at night|usually fly during the day|have tiny scales on their wings',
      'Rabbits|hares|mammals|are born with no fur|are born with fur and open eyes|eat plants', 'Seals|sea lions|ocean mammals|have no outside ears|have small outside ear flaps|spend time on land and in water',
      'Crows|ravens|large black birds|are smaller|are bigger and have thicker beaks|are very clever']),
    text: (s) => `${s.a1} and ${s.a2} are both ${s.cat}, but they are not the same. ${s.a1} ${s.d1}. ${cap(s.a2)} ${s.d2}. They are alike because they both ${s.sim}.`,
    qs: [
      (s, O) => [`What are ${s.a1.toLowerCase()} and ${s.a2}?`, s.cat, O('cat'), 'lit'],
      (s, O) => [`Which animals ${s.d1}?`, s.a1, [s.a2, 'both of them', 'neither of them'], 'inf'],
      (s, O) => [`Which animals ${s.d2}?`, s.a2, [s.a1, 'both of them', 'neither of them'], 'inf'],
      (s, O) => ['How are they alike?', `They both ${s.sim}.`, O('sim').map((x) => `They both ${x}.`), 'lit'],
      () => ['What does “alike” mean?', 'almost the same', ['very far away', 'very old', 'completely different'], 'voc'],
      () => ['What is the main idea of the text?', 'The two animals are alike in some ways and different in others.', ['One animal is better than the other.', 'These animals live only in cold places.', 'The two animals are exactly the same.'], 'inf'],
    ] },
    { id: 'visit', sets: S('pl t1 t2 a1 a2 c rule', [
      'The science museum|nine|five|touch a real dinosaur bone|watch a space movie|six|not to run in the halls', 'The zoo|ten|four|feed the goats|meet a baby panda|eight|not to feed the wild animals',
      'The aquarium|nine|six|touch a starfish|watch the seals eat|seven|to walk slowly near the tanks', 'The farm|eleven|three|pick strawberries|ride on a hay wagon|five|to close the gates',
      'The city library|ten|eight|join a story hour|borrow up to ten books|free|to speak softly']),
    text: (s) => `${s.pl} is open every day from ${s.t1} o’clock in the morning to ${s.t2} o’clock in the afternoon. Visitors can ${s.a1} and ${s.a2}. Tickets for children cost ${s.c === 'free' ? 'nothing' : s.c + ' dollars'}. Please remember ${s.rule}.`,
    qs: [
      (s, O) => ['When does it open?', `at ${s.t1} o’clock`, O('t1').map((x) => `at ${x} o’clock`), 'lit'],
      (s, O) => ['What can visitors do?', `${s.a1} and ${s.a2}`, ['sleep in tents', 'buy a house', 'fly a plane'], 'lit'],
      (s) => ['How much is a child ticket?', s.c === 'free' ? 'nothing' : `${s.c} dollars`, ['nine dollars', 'twenty dollars', 'fifty dollars', 'two dollars'].filter((x) => x !== `${s.c} dollars`).slice(0, 3), 'lit'],
      (s, O) => ['What should visitors remember?', s.rule, O('rule'), 'lit'],
      () => ['Who is this text written for?', 'people who want to visit', ['people who work there', 'people who live far away and never travel', 'animals'], 'inf'],
    ] },
  ],
};

/* ================================================================== */
/*  g3e3 — Emails & postcards                                         */
/* ================================================================== */
const mail3 = {
  1: [
    { id: 'card', sets: S('n to pl w act', [
      'Mia|Grandma|the beach|sunny|swim every day', 'Leo|Dad|the mountains|cold|ski with my cousins', 'Zoe|Aunt Lin|a farm|warm|feed the animals',
      'Sam|Mom|the zoo|hot|see the lions', 'Ava|Nana|a lake|windy|ride in a canoe']),
    text: (s) => `Dear ${s.to},\nI am at ${s.pl}. The weather is ${s.w}. I ${s.act}. I miss you!\nLove, ${s.n}`,
    qs: [
      (s, O) => ['Who wrote the card?', s.n, O('n'), 'lit'],
      (s, O) => ['Who is the card for?', s.to, O('to'), 'lit'],
      (s, O) => ['Where is the writer?', s.pl, O('pl'), 'lit'],
      (s, O) => ['What is the weather like?', s.w, O('w'), 'lit'],
      (s, O) => ['What does the writer do?', s.act, O('act'), 'lit'],
    ] },
    { id: 'party', sets: S('n to d t act f', [
      'Ben|Sophie|Saturday|two o’clock|play games|cake', 'Chloe|Max|Sunday|one o’clock|swim in the pool|pizza', 'Noah|Ella|Friday|four o’clock|watch a movie|popcorn',
      'Lina|Jack|Saturday|ten o’clock|make crafts|cupcakes', 'Omar|Ruby|Sunday|three o’clock|play soccer|sandwiches']),
    text: (s) => `Hi ${s.to}! My birthday party is on ${s.d} at ${s.t}. It is at my house. We will ${s.act} and eat ${s.f}. Please come!\nFrom, ${s.n}`,
    qs: [
      (s, O) => ['What day is the party?', s.d, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].filter((x) => x !== s.d).slice(0, 3), 'lit'],
      (s, O) => ['What time is the party?', s.t, O('t'), 'lit'],
      (s) => ['Where is the party?', `at ${s.n}’s house`, ['at the park', 'at school', 'at the mall'], 'lit'],
      (s, O) => ['What will they do?', s.act, O('act'), 'lit'],
      (s, O) => ['What will they eat?', s.f, O('f'), 'lit'],
    ] },
    { id: 'thanks', sets: S('n to gift use adj', [
      'Eva|Aunt Sam|red scarf|wear it|warm', 'Tim|Grandpa|new book|read it|funny', 'Lou|Uncle Joe|soccer ball|kick it|bouncy', 'Ana|Nana|puzzle|do it|fun', 'Rafa|Mom and Dad|paint set|use it|colourful']),
    text: (s) => `Dear ${s.to},\nThank you for the ${s.gift}! I love it. I ${s.use} every day. It is so ${s.adj}.\nLove, ${s.n}`,
    qs: [
      (s, O) => ['What was the gift?', `a ${s.gift}`, pre('a ', O('gift')), 'lit'],
      (s, O) => ['What does the writer do with the gift?', s.use, O('use'), 'lit'],
      (s, O) => ['How is the gift?', s.adj, O('adj'), 'lit'],
      (s, O) => ['Who wrote the note?', s.n, O('n'), 'lit'],
      () => ['Why did the writer write the note?', 'to say thank you', ['to say sorry', 'to ask a question', 'to say goodbye'], 'inf'],
    ] },
  ],
  2: [
    { id: 'postcard', sets: S('n to pl a1 w a2 a3 f', [
      'Jonas|Eli|Gaspésie|saw a whale|rainy|stayed in the cabin and played cards|go hiking|fish soup', 'Maya|Grandpa|Banff|rode a gondola|sunny|walked by the lake|visit the hot springs|hot chocolate',
      'Theo|Noémie|Québec City|visited the old fort|cold|walked along the river|go tobogganing|crêpes', 'Lila|Uncle Marc|Vancouver|rode bikes in the park|cloudy|went to the aquarium|take a ferry|sushi',
      'Remi|Anna|Charlevoix|picked apples|windy|flew a kite|visit a farm|apple pie']),
    text: (s) => `Dear ${s.to},\nGreetings from ${s.pl}! Yesterday we ${s.a1}. Today it was ${s.w}, so we ${s.a2}. Tomorrow we will ${s.a3}. The food is delicious here, especially the ${s.f}. I wish you were here!\nYour friend, ${s.n}`,
    qs: [
      (s, O) => ['Where is the writer?', s.pl, O('pl'), 'lit'],
      (s, O) => ['What did they do yesterday?', s.a1, O('a1'), 'lit'],
      (s, O) => ['What was the weather like today?', s.w, ['rainy', 'sunny', 'cold', 'cloudy', 'windy'].filter((x) => x !== s.w).slice(0, 3), 'lit'],
      (s, O) => ['What will they do tomorrow?', s.a3, O('a3'), 'lit'],
      (s, O) => ['Which food does the writer like best?', s.f, O('f'), 'lit'],
      () => ['How does the writer feel about the trip?', 'happy, and wishes the friend was there', ['bored and tired', 'angry at the hotel', 'afraid of the weather'], 'inf'],
      () => ['What does “delicious” mean?', 'very tasty', ['very cold', 'very old', 'very loud'], 'voc'],
      (s) => ({ q: 'Put the days in order.', seq: [`Yesterday, they ${s.a1}.`, `Today, they ${s.a2}.`, `Tomorrow, they will ${s.a3}.`] }),
    ] },
    { id: 'trip', sets: S('pl d bring t t2 tn', [
      'science centre|Tuesday|a lunch box and a water bottle|8:30|2:30|Roy', 'farm|Thursday|rubber boots and a raincoat|9:00|1:00|Tremblay', 'museum|Monday|a snack and a notebook|9:30|3:00|Gagnon',
      'library|Wednesday|a library card and a backpack|10:00|11:30|Bouchard', 'park|Friday|sunscreen and a hat|9:00|2:00|Lavoie']),
    text: (s) => `Subject: Field trip\nDear parents,\nOur class will go to the ${s.pl} on ${s.d}. Please send your child with ${s.bring}. The bus leaves at ${s.t} and comes back at ${s.t2}. If you have any questions, please write to me.\nMs. ${s.tn}`,
    qs: [
      (s, O) => ['Where will the class go?', `to the ${s.pl}`, pre('to the ', O('pl')), 'lit'],
      (s, O) => ['On which day is the trip?', s.d, O('d'), 'lit'],
      (s, O) => ['What should children bring?', s.bring, O('bring'), 'lit'],
      (s, O) => ['What time does the bus leave?', s.t, O('t'), 'lit'],
      () => ['Who wrote this email?', 'the teacher', ['a student', 'the bus driver', 'a parent'], 'inf'],
      () => ['Why was the email written?', 'to tell parents about a trip', ['to sell tickets', 'to say thank you', 'to invite people to a party'], 'inf'],
    ] },
    { id: 'reply', sets: S('n ev d nope hv br me', [
      'Ella|birthday party|Saturday|the whole party|a hockey practice at four o’clock|my cousin|Max', 'Max|sleepover|Friday|the whole night|a dentist appointment in the morning|my sleeping bag|Ruby',
      'Ruby|movie night|Sunday|the whole movie|a piano lesson at six|some popcorn|Jack', 'Jack|pool party|Saturday|the whole afternoon|a family dinner|my goggles|Anna', 'Anna|skating party|Friday|the whole evening|a swimming lesson|my skates|Ella']),
    text: (s) => `Hi ${s.n},\nThanks for your email! I would love to come to your ${s.ev} on ${s.d}. Sorry, I cannot stay for ${s.nope} because I have ${s.hv}. Can I bring ${s.br}? Let me know.\n${s.me}`,
    qs: [
      (s, O) => ['What was the writer invited to?', `a ${s.ev}`, pre('a ', O('ev')), 'lit'],
      (s, O) => ['On which day is the event?', s.d, O('d'), 'lit'],
      (s, O) => ['Why can the writer not stay?', `The writer has ${s.hv}.`, O('hv').map((x) => `The writer has ${x}.`), 'lit'],
      (s, O) => ['What does the writer want to bring?', s.br, O('br'), 'lit'],
      () => ['Will the writer come?', 'Yes, but not for the whole time.', ['No, never.', 'Yes, for the whole time.', 'Maybe next year.'], 'inf'],
    ] },
  ],
  3: [
    { id: 'help', sets: S('to prob det req n', [
      'the school librarian|I lost a library book|I looked everywhere, even under my bed|check the lost-and-found box|Elise', 'my teacher|I forgot my homework at home|It is on the kitchen table|let me hand it in tomorrow|Hugo',
      'the coach|I cannot come to practice on Thursday|I have a fever and my mom says I must rest|save my spot on the team|Ines', 'the bus driver|my backpack was left on the bus yesterday|It is blue with a yellow zipper|look for it|Sam',
      'the principal|the water fountain by the gym is broken|Water is spilling on the floor|send someone to fix it|Mila']),
    text: (s) => `To: ${s.to}\nI am writing because ${s.prob}. ${s.det}. Could you please ${s.req}? I would really appreciate it. Thank you very much for your help.\nSincerely,\n${s.n}`,
    qs: [
      (s, O) => ['Who is the email for?', s.to, O('to'), 'lit'],
      (s, O) => ['Why is the writer writing?', cap(s.prob) + '.', O('prob').map((x) => cap(x) + '.'), 'lit'],
      (s, O) => ['What does the writer ask for?', s.req, O('req'), 'lit'],
      () => ['What is the purpose of this email?', 'to ask for help', ['to tell a joke', 'to invite someone to a party', 'to say goodbye forever'], 'inf'],
      () => ['What is the tone of the email?', 'polite', ['angry', 'silly', 'sleepy'], 'inf'],
      () => ['What does “appreciate” mean?', 'to be thankful for', ['to forget about', 'to be afraid of', 'to argue about'], 'voc'],
    ] },
    { id: 'diary', sets: S('adj a1 prob sol end', [
      'amazing|went kayaking|the wind was strong|our guide showed us a calm bay|we were watching seals', 'strange|took the train to Montréal|we missed our stop|a kind lady helped us find the right train|we were eating poutine in the Old Port',
      'exciting|hiked up a mountain|it started to rain|we found a small cabin to wait in|we were drinking hot chocolate by the fire', 'long|drove to my aunt’s farm|the car broke down|a farmer gave us a ride on his tractor|we were all laughing at supper',
      'busy|went to the fair|I lost my ticket|a worker let me in anyway|I was holding a small prize']),
    text: (s) => `Dear Diary,\nToday was ${s.adj}! We ${s.a1} in the morning, but ${s.prob}. Luckily, ${s.sol}. By evening, ${s.end}. I will never forget this day.`,
    qs: [
      (s, O) => ['What did they do in the morning?', s.a1, O('a1'), 'lit'],
      (s, O) => ['What was the problem?', cap(s.prob) + '.', O('prob').map((x) => cap(x) + '.'), 'lit'],
      (s, O) => ['How was the problem solved?', cap(s.sol) + '.', O('sol').map((x) => cap(x) + '.'), 'lit'],
      () => ['How does the writer feel about the day at the end?', 'It ended well and was memorable.', ['It was a total waste.', 'It was boring.', 'It was a bad dream.'], 'inf'],
      () => ['What does “luckily” mean?', 'by good luck', ['by mistake', 'very slowly', 'in the dark'], 'voc'],
      (s) => ({ q: 'Put the events in order.', seq: [`First, we ${s.a1}.`, `Then ${s.prob}.`, `Luckily, ${s.sol}.`] }),
    ] },
    { id: 'news', sets: S('ev d items cause job by', [
      'bake sale|Friday|cookies, muffins or fruit|new books for the library|set up the tables at 8:00|Wednesday', 'used-book fair|Thursday|books you have already read|a new reading corner|sort the books|Tuesday',
      'talent show|Friday|a song, a dance or a joke|the school trip fund|help with the lights|Monday', 'winter carnival|Saturday|warm clothes and a hot drink|new hockey nets|serve hot chocolate|Thursday',
      'pyjama day|Wednesday|comfy pyjamas and a stuffed animal|the animal shelter|collect the donations|Monday']),
    text: (s) => `Subject: ${cap(s.ev)}\nHello families,\nOn ${s.d}, our school will hold a ${s.ev}. Students may bring ${s.items}. All the money will go to ${s.cause}. Volunteers are needed to ${s.job}. If you can help, please reply by ${s.by}.\nThe Parent Committee`,
    qs: [
      (s, O) => ['What event is coming?', `a ${s.ev}`, pre('a ', O('ev')), 'lit'],
      (s, O) => ['Where will the money go?', s.cause, O('cause'), 'lit'],
      (s, O) => ['What do volunteers need to do?', s.job, O('job'), 'lit'],
      (s, O) => ['When should people reply?', `by ${s.by}`, O('by').map((x) => `by ${x}`), 'lit'],
      () => ['Who wrote the email?', 'the Parent Committee', ['the teacher', 'a student', 'the principal'], 'inf'],
      () => ['Why does the committee write to families?', 'to share news and ask for help', ['to give out marks', 'to cancel school', 'to sell a house'], 'inf'],
    ] },
  ],
};

/* ================================================================== */
/*  g3e4 — Recipes & instructions                                     */
/* ================================================================== */
const how4 = {
  1: [
    { id: 'snack', sets: S('dish i1 i2 s1 s2', [
      'a fruit snack|a banana|some yogurt|Cut the banana.|Put the banana in the yogurt.', 'toast with jam|bread|jam|Toast the bread.|Spread the jam on top.',
      'a cheese sandwich|bread|cheese|Put cheese on one slice of bread.|Cover it with the other slice.', 'hot chocolate|milk|chocolate|Warm the milk.|Stir in the chocolate.',
      'a fruit salad|apples|grapes|Cut the apples.|Mix them with the grapes.']),
    text: (s) => `How to make ${s.dish}. You need ${s.i1} and ${s.i2}. Step 1: ${s.s1} Step 2: ${s.s2} Step 3: Enjoy!`,
    qs: [
      (s, O) => ['What do you make?', s.dish, O('dish'), 'lit'],
      (s, O) => ['Which food do you need first?', s.i1, O('i1'), 'lit'],
      (s, O) => ['What is step 1?', s.s1, O('s1'), 'lit'],
      (s, O) => ['What is step 2?', s.s2, O('s2'), 'lit'],
      () => ['What is step 3?', 'Enjoy!', ['Wash the dishes.', 'Go to bed.', 'Cut the banana.'], 'lit'],
    ] },
    { id: 'craft', sets: S('it m1 m2 s1 s2 s3', [
      'paper plane|one sheet of paper|a paper clip|Fold the paper in half.|Fold the corners to the middle.|Put the paper clip at the front.',
      'puppet|a paper bag|markers|Draw a face on the bag.|Glue on two paper ears.|Put your hand inside.', 'card|stiff paper|crayons|Fold the paper in half.|Draw a picture on the front.|Write a message inside.',
      'bird feeder|a pine cone|bird seeds|Cover the pine cone with peanut butter.|Roll it in the seeds.|Hang it on a tree.', 'bracelet|a string|ten beads|Cut the string.|Slide the beads on.|Tie the ends together.']),
    text: (s) => `Make a ${s.it}! You need ${s.m1} and ${s.m2}. First, ${lc(s.s1)} Then, ${lc(s.s2)} Last, ${lc(s.s3)}`,
    qs: [
      (s, O) => ['What do you make?', `a ${s.it}`, pre('a ', O('it')), 'lit'],
      (s, O) => ['What do you need?', `${s.m1} and ${s.m2}`, O('m1').map((x, i) => `${x} and ${O('m2')[i] || 'glue'}`), 'lit'],
      (s, O) => ['What do you do first?', s.s1, O('s1'), 'lit'],
      (s, O) => ['What do you do last?', s.s3, O('s3'), 'lit'],
      (s) => ({ q: 'Put the steps in order.', seq: [s.s1, s.s2, s.s3] }),
    ] },
    { id: 'routine', sets: S('t s1 s2 s3 s4', [
      'wash your hands|Turn on the water.|Put soap on your hands.|Rub your hands for twenty seconds.|Rinse and dry your hands.',
      'brush your teeth|Put toothpaste on your brush.|Brush the front and the back of your teeth.|Spit out the toothpaste.|Rinse your mouth with water.',
      'get ready for winter play|Put on your snow pants.|Put on your boots.|Put on your coat and hat.|Pull on your mittens.',
      'pack your school bag|Take out yesterday’s papers.|Put in your homework.|Add your lunch box.|Close the zipper.', 'plant a seed|Fill a pot with soil.|Make a small hole with your finger.|Drop in the seed.|Cover it and add water.']),
    text: (s) => `How to ${s.t}. First, ${lc(s.s1)} Next, ${lc(s.s2)} Then, ${lc(s.s3)} Finally, ${lc(s.s4)}`,
    qs: [
      (s, O) => ['What is the text about?', `how to ${s.t}`, pre('how to ', O('t')), 'lit'],
      (s, O) => ['What do you do first?', s.s1, O('s1'), 'lit'],
      (s, O) => ['What do you do third?', s.s3, O('s3'), 'lit'],
      (s, O) => ['What do you do last?', s.s4, O('s4'), 'lit'],
      (s) => ({ q: 'Put the steps in order.', seq: [s.s1, s.s2, s.s3, s.s4] }),
    ] },
  ],
  2: [
    { id: 'recipe', sets: S('dish n i s1 s2 s3 s4 tip', [
      'Pancakes|four|one cup of flour, one egg and one cup of milk|Mix the flour and the egg in a bowl.|Slowly add the milk.|Pour a little batter into a hot pan.|Flip each pancake when you see bubbles.|Ask an adult to help with the stove.',
      'Fruit smoothie|two glasses|one banana, a handful of strawberries and one cup of milk|Peel the banana.|Put all the fruit in a blender.|Add the milk.|Blend until smooth.|Ask an adult to use the blender.',
      'Mac and cheese|three bowls|two cups of pasta, one cup of grated cheese and half a cup of milk|Boil the pasta for ten minutes.|Drain the water.|Stir in the cheese and the milk.|Heat for two more minutes.|Add peas for extra colour.',
      'Maple oatmeal|two bowls|one cup of oats, two cups of water and two spoons of maple syrup|Pour the water into a pot.|Add the oats.|Cook for five minutes and stir often.|Pour the maple syrup on top.|Add blueberries for extra flavour.',
      'Veggie wraps|four wraps|four tortillas, tomato sauce and grated cheese|Spread sauce on each tortilla.|Sprinkle the cheese on top.|Add chopped peppers.|Bake for ten minutes.|Let the wraps cool before you eat.']),
    text: (s) => `${s.dish} (makes ${s.n})\nIngredients: ${s.i}.\nSteps: 1. ${s.s1} 2. ${s.s2} 3. ${s.s3} 4. ${s.s4}\nTip: ${s.tip}`,
    qs: [
      (s, O) => ['What is the recipe for?', s.dish, O('dish'), 'lit'],
      (s, O) => ['How much does the recipe make?', s.n, O('n'), 'lit'],
      (s, O) => ['Which ingredients do you need?', s.i, O('i'), 'lit'],
      (s, O) => ['What is step 3?', s.s3, O('s3'), 'lit'],
      (s, O) => ['What is the last step?', s.s4, O('s4'), 'lit'],
      (s) => ({ q: 'Put the first three steps in order.', seq: [s.s1, s.s2, s.s3] }),
    ] },
    { id: 'science', sets: S('t m s1 s2 s3 res', [
      'Does it sink or float?|a bowl of water and some small objects|Fill the bowl with water.|Drop one object in the water.|Watch what happens.|Heavy things often sink and light things often float.',
      'Growing a bean|a bean, a paper towel and a clear jar|Wet the paper towel.|Put the bean between the towel and the jar.|Keep the towel wet for a week.|Roots and a green shoot appear.',
      'Static balloon|a balloon and tiny pieces of paper|Blow up the balloon.|Rub it on your hair.|Hold it over the paper.|The paper jumps up and sticks to the balloon.',
      'Melting ice|two ice cubes and two plates|Put one plate in the sun.|Put the other plate in the shade.|Check every five minutes.|The ice in the sun melts faster.',
      'Magnet search|a magnet and objects from the classroom|Collect different objects.|Touch each object with the magnet.|Sort the objects into two groups.|Only some metal objects stick to the magnet.']),
    text: (s) => `Experiment: ${s.t}\nYou need: ${s.m}.\n1. ${s.s1}\n2. ${s.s2}\n3. ${s.s3}\nWhat happens? ${s.res}`,
    qs: [
      (s, O) => ['What is the name of the experiment?', s.t, O('t'), 'lit'],
      (s, O) => ['What do you need?', s.m, O('m'), 'lit'],
      (s, O) => ['What do you do first?', s.s1, O('s1'), 'lit'],
      (s, O) => ['What happens at the end?', s.res, O('res'), 'lit'],
      (s) => ({ q: 'Put the steps in order.', seq: [s.s1, s.s2, s.s3] }),
    ] },
    { id: 'way', sets: S('d f s1 t1 l1 l2 t2 l3', [
      'library|school door|straight down the hall|left|gym|art room|right|water fountain', 'cafeteria|front office|up the stairs|right|music room|library|left|gym',
      'nurse’s office|gym|straight down the hall|right|science room|art room|left|principal’s office', 'principal’s office|main door|straight past the lockers|left|library|cafeteria|right|nurse’s office',
      'music room|library|along the long hall|right|gym|science room|left|art room']),
    text: (s) => `To get to the ${s.d} from the ${s.f}, go ${s.s1}. Turn ${s.t1} at the ${s.l1}. Walk past the ${s.l2}. The ${s.d} is on your ${s.t2}, next to the ${s.l3}.`,
    qs: [
      (s, O) => ['Where do you want to go?', `to the ${s.d}`, pre('to the ', O('d')), 'lit'],
      (s) => [`Which way do you turn at the ${s.l1}?`, s.t1, [s.t1 === 'left' ? 'right' : 'left', 'straight ahead', 'back'], 'lit'],
      (s, O) => ['What do you walk past?', `the ${s.l2}`, pre('the ', O('l2')), 'lit'],
      (s, O) => [`What is next to the ${s.d}?`, `the ${s.l3}`, pre('the ', O('l3')), 'lit'],
      (s) => [`The ${s.d} is on your ___.`, s.t2, [s.t2 === 'left' ? 'right' : 'left', 'back', 'head'], 'lit'],
    ] },
  ],
  3: [
    { id: 'bake', sets: S('dish prep s1 s2 prob fix time done', [
      'Banana muffins|heat the oven to 180 degrees|mash three ripe bananas with a fork|stir in the flour, the sugar and an egg|dry|a spoon of milk|twenty|golden brown',
      'Apple crisp|heat the oven to 190 degrees|slice four apples and put them in a dish|mix oats, butter and brown sugar and sprinkle it on top|dry|a little melted butter|thirty|soft and bubbly',
      'Cheese biscuits|heat the oven to 200 degrees|mix the flour, the baking powder and the cheese|add the milk and stir gently|sticky|a spoon of flour|fifteen|light brown',
      'Oatmeal cookies|heat the oven to 175 degrees|mix the butter and the sugar until creamy|add the oats and the raisins|crumbly|a spoon of milk|twelve|golden at the edges',
      'Pumpkin muffins|heat the oven to 180 degrees|mix the pumpkin, the oil and two eggs|stir in the flour and the cinnamon|thick|a spoon of milk|twenty-two|firm when you touch them']),
    text: (s) => `${s.dish}\nBefore you start, ${s.prep}. In a large bowl, ${s.s1}. Next, ${s.s2}. If the mixture is too ${s.prob}, add ${s.fix}. Bake for ${s.time} minutes, or until it is ${s.done}. Let it cool before you eat it.`,
    qs: [
      (s, O) => ['What should you do before you start?', cap(s.prep) + '.', O('prep').map((x) => cap(x) + '.'), 'lit'],
      (s, O) => [`What should you add if the mixture is too ${s.prob}?`, s.fix, O('fix').concat(['two cups of sugar', 'a cup of water']).slice(0, 3), 'lit'],
      (s, O) => ['How long should you bake it?', `${s.time} minutes`, O('time').map((x) => `${x} minutes`), 'lit'],
      (s, O) => ['How do you know when it is ready?', `It is ${s.done}.`, O('done').map((x) => `It is ${x}.`), 'lit'],
      () => ['Why does the recipe tell you to let it cool?', 'so you do not burn your mouth', ['so it grows bigger', 'so it changes colour', 'so it becomes a drink'], 'inf'],
      (s) => ({ q: 'Put the steps in order.', seq: [`${cap(s.prep)}.`, `${cap(s.s1)}.`, `${cap(s.s2)}.`] }),
    ] },
    { id: 'rules', sets: S('g p r1 c1 o1 win', [
      'Number Race|two to four players|roll the die and move that many spaces|land on a star|get another turn|reach space thirty', 'Memory Match|two players|turn over two cards at a time|find a pair|keep the pair and play again|collect the most pairs',
      'Word Chain|three or more players|say a word that starts with the last letter of the word before|cannot think of a word in ten seconds|are out of the game|be the last player left',
      'Treasure Hunt|two teams|follow each clue to find the next one|find the treasure box|win a prize|find the treasure box first', 'Bean Bag Toss|four players|toss three bean bags at the target|hit the middle circle|score five points|score twenty points']),
    text: (s) => `Game: ${s.g}\nPlayers: ${s.p}.\nHow to play: ${s.r1}. If you ${s.c1}, you ${s.o1}. You win when you ${s.win}.`,
    qs: [
      (s, O) => ['How many players do you need?', s.p, O('p'), 'lit'],
      (s, O) => ['What do you do when you play?', s.r1, O('r1'), 'lit'],
      (s, O) => [`What happens if you ${s.c1}?`, `You ${s.o1}.`, O('o1').map((x) => `You ${x}.`), 'lit'],
      (s, O) => ['How do you win?', s.win, O('win'), 'lit'],
      () => ['Why is this text helpful?', 'It explains how to play a game.', ['It tells a story about a game.', 'It sells the game.', 'It describes a team.'], 'inf'],
    ] },
    { id: 'safety', sets: S('dev b w a nv', [
      'the microwave|ask an adult for help|stay near it and watch the food|let the food cool for one minute|use metal bowls or forks', 'the skating rink|put on your helmet|skate in the same direction as everyone|take off your skates before walking on the floor|push other skaters',
      'the library computer|log in with your own number|use only the websites your teacher chose|log out and push in your chair|share your password', 'the playground slide|check that nobody is at the bottom|go down feet first|move away quickly|climb up the slide',
      'the art room|put on your apron|keep the paint on your paper|wash your brushes in the sink|walk around with wet paint']),
    text: (s) => `Instructions for using ${s.dev}\nBefore you start, ${s.b}. While you use it, ${s.w}. When you finish, ${s.a}. Never ${s.nv}.`,
    qs: [
      (s, O) => ['What should you do before you start?', cap(s.b) + '.', O('b').map((x) => cap(x) + '.'), 'lit'],
      (s, O) => ['What should you do while you use it?', cap(s.w) + '.', O('w').map((x) => cap(x) + '.'), 'lit'],
      (s, O) => ['What should you never do?', cap(s.nv) + '.', O('nv').map((x) => cap(x) + '.'), 'lit'],
      () => ['Why was this text written?', 'to keep people safe', ['to make people laugh', 'to sell something', 'to tell a story'], 'inf'],
      (s) => ({ q: 'Put the instructions in order.', seq: [`Before: ${s.b}.`, `While: ${s.w}.`, `After: ${s.a}.`] }),
    ] },
  ],
};

/* ================================================================== */
/*  g3e5 — Comics-style dialogues                                     */
/* ================================================================== */
const talk5 = {
  1: [
    { id: 'new', sets: S('a b it adj act', ['Mia|Leo|kite|beautiful|fly', 'Ben|Zoe|ball|big|kick', 'Ana|Sam|bike|fast|ride', 'Eli|Ruby|robot|funny|try', 'Nina|Max|guitar|cool|play']),
    text: (s) => `${s.a}: Hi, ${s.b}! What is that?\n${s.b}: It is my new ${s.it}.\n${s.a}: Wow! It is ${s.adj}!\n${s.b}: Do you want to ${s.act} it?\n${s.a}: Yes, please!`,
    qs: [
      (s, O) => ['What is the new thing?', `a ${s.it}`, pre('a ', O('it')), 'lit'],
      (s, O) => [`What does ${s.a} say about it?`, `It is ${s.adj}.`, O('adj').map((x) => `It is ${x}.`), 'lit'],
      (s) => [`What does ${s.b} ask?`, `Do you want to ${s.act} it?`, ['Where is my hat?', 'What time is it?', 'Are you hungry?'], 'lit'],
      (s) => [`Does ${s.a} say yes or no?`, 'yes', ['no', 'maybe', 'I do not know'], 'lit'],
    ] },
    { id: 'hungry', sets: S('a b f nf f2', ['Tom|Jade|pizza|fish|soup', 'Mia|Leo|pasta|onions|a sandwich', 'Sam|Zoe|tacos|mushrooms|rice', 'Ana|Max|pancakes|eggs|fruit', 'Kim|Ravi|burgers|beans|a salad']),
    text: (s) => `${s.a}: I am hungry!\n${s.b}: Me too. Let’s have ${s.f}.\n${s.a}: I do not like ${s.nf}.\n${s.b}: OK. How about ${s.f2}?\n${s.a}: Great idea!`,
    qs: [
      (s, O) => [`What does ${s.b} suggest first?`, s.f, O('f'), 'lit'],
      (s, O) => [`What does ${s.a} not like?`, s.nf, O('nf'), 'lit'],
      (s, O) => [`What does ${s.b} suggest next?`, s.f2, O('f2'), 'lit'],
      (s) => ['How does the second idea sound to the speaker?', 'good', ['bad', 'scary', 'too cold'], 'inf'],
    ] },
    { id: 'where', sets: S('a b it p1 p2', ['Mia|Leo|hat|on the chair|on your head', 'Ben|Zoe|backpack|in the car|by the door', 'Ana|Sam|boots|under the bed|in the hall', 'Eli|Ruby|book|in the kitchen|on the sofa', 'Nina|Max|pencil|in your bag|behind your ear']),
    text: (s) => `${s.a}: Where is my ${s.it}?\n${s.b}: Is it ${s.p1}?\n${s.a}: No, it is not there.\n${s.b}: Look! It is ${s.p2}.\n${s.a}: Thank you, ${s.b}!`,
    qs: [
      (s, O) => ['What is lost?', `the ${s.it}`, pre('the ', O('it')), 'lit'],
      (s, O) => [`Where does ${s.b} look first?`, s.p1, O('p1'), 'lit'],
      (s, O) => ['Where is it really?', s.p2, O('p2'), 'lit'],
      (s) => [`Who finds the ${s.it}?`, s.b, [s.a, 'the teacher', 'nobody'], 'lit'],
      (s) => ({ q: 'Put the events in order.', seq: [`${s.a} asks for the ${s.it}.`, `${s.b} checks ${s.p1}.`, `${s.b} finds it ${s.p2}.`] }),
    ] },
  ],
  2: [
    { id: 'plan', sets: S('a b pl nd act t mt', [
      'Ella|Noah|mall|a pair of boots|a piano lesson|ten o’clock|the bus stop', 'Jack|Lina|sports store|a soccer ball|a swimming class|nine o’clock|my house',
      'Ruby|Max|bookstore|a new notebook|a hockey practice|eleven o’clock|the library', 'Anna|Ravi|pet shop|a fish bowl|a dentist appointment|ten thirty|the corner', 'Omar|Chloe|toy store|a birthday gift|a music lesson|ten o’clock|the front door']),
    text: (s) => `${s.a}: What do you want to do on Saturday?\n${s.b}: I want to go to the ${s.pl}. I need ${s.nd}.\n${s.a}: I cannot go in the morning. I have ${s.act} at ${s.t}.\n${s.b}: No problem. Let’s go in the afternoon.\n${s.a}: OK! Meet me at ${s.mt}.`,
    qs: [
      (s, O) => [`Where does ${s.b} want to go?`, `to the ${s.pl}`, pre('to the ', O('pl')), 'lit'],
      (s, O) => [`What does ${s.b} need?`, s.nd, O('nd'), 'lit'],
      (s) => [`Why can ${s.a} not go in the morning?`, `${s.a} has ${s.act}.`, [`${s.a} is sick.`, `${s.a} does not like shopping.`, `${s.a} is on holiday.`], 'inf'],
      (s, O) => ['Where will they meet?', s.mt, O('mt'), 'lit'],
      () => ['What does “No problem” mean here?', 'It is OK.', ['I am angry.', 'I do not know.', 'I am lost.'], 'voc'],
      () => ['When will they go?', 'in the afternoon', ['in the morning', 'at night', 'on Sunday'], 'lit'],
    ] },
    { id: 'lend', sets: S('a b it pl c n', [
      'Ella|Noah|a red marker|at home|Nora|a whole box', 'Jack|Lina|your ruler|in my locker|Kai|two rulers', 'Ruby|Max|an eraser|in the gym|Lea|a pink one', 'Anna|Ravi|some glue|in my other bag|Omar|a big bottle', 'Omar|Chloe|a calculator|on the bus|Jade|a spare one']),
    text: (s) => `${s.a}: Can you lend me ${s.it}?\n${s.b}: Sure! Oh no, I left it ${s.pl}.\n${s.a}: That is OK. I can ask ${s.c}.\n${s.b}: Good idea. ${s.c} has ${s.n}.\n${s.a}: Thanks anyway!`,
    qs: [
      (s, O) => [`What does ${s.a} want to borrow?`, s.it, O('it'), 'lit'],
      (s, O) => [`Where did ${s.b} leave it?`, s.pl, O('pl'), 'lit'],
      (s, O) => [`Who will ${s.a} ask?`, s.c, O('c'), 'lit'],
      (s, O) => [`What does ${s.c} have?`, s.n, O('n'), 'lit'],
      () => ['What does “lend” mean?', 'to give something for a short time', ['to throw something away', 'to keep something forever', 'to buy something'], 'voc'],
      (s) => [`How does ${s.a} feel?`, 'calm and polite', ['very angry', 'afraid', 'sleepy'], 'inf'],
    ] },
    { id: 'phone', sets: S('a b m wh msg', [
      'Ella|Noah|his mom|at hockey practice|the party is moved to Sunday', 'Jack|Lina|her dad|in the shower|I have her library book', 'Ruby|Ben|his grandma|outside with the dog|I cannot go to the park today',
      'Max|Zoe|her brother|at the dentist|the movie starts at five', 'Anna|Ravi|his mom|at swimming class|our project is due on Monday']),
    text: (s) => `${s.a}: Hello? Is ${s.b} there?\n${s.m[0].toUpperCase() + s.m.slice(1)}: No, ${s.b} is ${s.wh}. Can I take a message?\n${s.a}: Yes, please. Can you tell ${s.b} that ${s.msg}?\n${s.m[0].toUpperCase() + s.m.slice(1)}: Sure. I will write it down.\n${s.a}: Thank you. Goodbye!`,
    qs: [
      (s, O) => ['Who is calling?', s.a, [s.b, 'the teacher', 'the doctor'], 'lit'],
      (s, O) => [`Where is ${s.b}?`, s.wh, O('wh'), 'lit'],
      (s, O) => ['What is the message?', cap(s.msg) + '.', O('msg').map((x) => cap(x) + '.'), 'lit'],
      () => ['What will the person who answers do?', 'write the message down', ['hang up the phone', 'call the police', 'go to bed'], 'lit'],
      () => ['Why does the caller say “Can you tell … that …?”', 'to leave a message', ['to say goodbye', 'to ask for food', 'to tell a joke'], 'inf'],
    ] },
  ],
  3: [
    { id: 'sorry', sets: S('a b it how fix', [
      'Mia|Leo|toy car|slipped out of my hand|help you fix it', 'Ben|Zoe|drawing|got wet when I spilled my juice|draw you a new one', 'Ana|Sam|kite|got stuck in a tree|buy you a new kite',
      'Eli|Ruby|model plane|fell off the shelf|glue it back together', 'Nina|Max|bracelet|broke when I pulled it|make you another one']),
    text: (s) => `${s.a}: You broke my ${s.it}!\n${s.b}: I did not mean to. It ${s.how}.\n${s.a}: But it was my favourite ${s.it}!\n${s.b}: I am really sorry. Can I ${s.fix}?\n${s.a}: OK. Thanks for saying sorry. I feel better now.`,
    qs: [
      (s, O) => ['What was broken?', `the ${s.it}`, pre('the ', O('it')), 'lit'],
      (s, O) => ['How did it happen?', `It ${s.how}.`, O('how').map((x) => `It ${x}.`), 'lit'],
      (s, O) => [`What does ${s.b} offer to do?`, cap(s.fix) + '.', O('fix').map((x) => cap(x) + '.'), 'lit'],
      (s) => [`Did ${s.b} break it on purpose?`, 'No, it was an accident.', ['Yes, on purpose.', 'Yes, to be funny.', 'We do not know.'], 'inf'],
      () => ['What does “I did not mean to” mean?', 'It was an accident.', ['I am very happy.', 'I want to leave.', 'I do not want to talk.'], 'voc'],
      (s) => [`How does ${s.a} feel at the end?`, 'better', ['more upset', 'bored', 'afraid'], 'inf'],
    ] },
    { id: 'job', sets: S('a b role f d1 d2 bc', [
      'Ms. Roy|Ines|president|excited|listen to every student’s ideas|organize a games day|I want everyone to have a voice', 'Ms. Roy|Hugo|librarian|proud|help kids find books|sort the shelves|I love to read',
      'Ms. Roy|Mila|recycling captain|nervous|check the blue bins|make posters|I care about the planet', 'Ms. Roy|Sam|sports leader|happy|set up the equipment|choose fair teams|I like making sure everyone plays',
      'Ms. Roy|Elise|garden helper|thrilled|water the plants|pull the weeds|I enjoy growing things']),
    text: (s) => `${s.a}: Welcome, ${s.b}! You are our new class ${s.role}.\n${s.b}: Thank you! I am very ${s.f}.\n${s.a}: What will you do?\n${s.b}: I will ${s.d1}, and I will ${s.d2}.\n${s.a}: Why did you want this job?\n${s.b}: Because ${s.bc}.`,
    qs: [
      (s, O) => [`What is ${s.b}’s new job?`, `class ${s.role}`, pre('class ', O('role')), 'lit'],
      (s) => [`How does ${s.b} feel?`, s.f, ['sad', 'angry', 'bored'], 'lit'],
      (s, O) => [`What will ${s.b} do?`, `${s.d1} and ${s.d2}`, O('d1').map((x, i) => `${x} and ${O('d2')[i] || 'clean the roof'}`), 'lit'],
      (s, O) => [`Why did ${s.b} want this job?`, `Because ${s.bc}.`, O('bc').map((x) => `Because ${x}.`), 'lit'],
      () => ['What does “organize” mean?', 'to plan and arrange something', ['to break something', 'to forget something', 'to hide something'], 'voc'],
    ] },
    { id: 'buy', sets: S('m i1 p1 i2 p2 i3', [
      '10|a board game|12|a puzzle|7|a pack of stickers', '20|a soccer ball set|25|a skipping rope|15|some chalk', '15|a globe|18|a map poster|9|a bookmark', '30|a plant|35|a bird feeder|22|some gardening gloves',
      '12|a drum|14|a recorder|8|a music book']),
    text: (s) => `Ali: We have ${s.m} dollars. What should we buy for the class?\nBea: How about ${s.i1}? It costs ${s.p1} dollars.\nAli: That is too expensive. What about ${s.i2}? It is only ${s.p2} dollars.\nBea: Good idea. We can also buy ${s.i3} with the extra money.`,
    qs: [
      (s, O) => ['How much money do they have?', `${s.m} dollars`, O('m').map((x) => `${x} dollars`), 'lit'],
      (s) => [`Why do they not buy ${s.i1}?`, 'It costs too much.', ['It is broken.', 'It is too small.', 'Nobody likes it.'], 'inf'],
      (s, O) => ['What do they decide to buy first?', s.i2, O('i2'), 'lit'],
      (s) => ['How much money is left after they buy it?', `${s.m - s.p2} dollars`, [`${+s.m - +s.p2 + 2} dollars`, `${+s.m - +s.p2 - 2} dollars`, `${+s.p2} dollars`], 'inf', 'Subtract the price from the money they have.'],
      (s, O) => ['What will they buy with the extra money?', s.i3, O('i3'), 'lit'],
    ] },
  ],
};

const mk = (id, icon, title, fr, defs, o) => storyUnit(id, icon, title, PF + `${COMP_READ} — ${fr}`, defs, o);

export const readUnits = [
  mk('g3e1', '📖', { fr: 'Petites histoires', en: 'Short stories' }, 'lire de courts récits (compréhension littérale, inférence, vocabulaire, ordre des événements)', stories1, { sayLevels: [1] }),
  mk('g3e2', '🔬', { fr: 'Textes d’information', en: 'Fact texts' }, 'lire des textes informatifs (animaux, métiers, météo, lieux, procédés)', info2, { sayLevels: [1] }),
  mk('g3e3', '💌', { fr: 'Courriels et cartes postales', en: 'Emails & postcards' }, 'lire des courriels, des cartes postales et des invitations', mail3, { sayLevels: [1] }),
  mk('g3e4', '🍳', { fr: 'Recettes et consignes', en: 'Recipes & instructions' }, 'lire des recettes, des consignes et des règles de jeu', how4, { sayLevels: [1] }),
  mk('g3e5', '💬', { fr: 'Bandes dessinées : dialogues', en: 'Comic dialogues' }, 'lire des dialogues de bandes dessinées', talk5, { sayLevels: [1], strip: true }),
];
