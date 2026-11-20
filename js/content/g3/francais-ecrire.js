// Petit Hibou — Français 3e année : ÉCRITURE (g3f39 → g3f42). Écrire à la main (type `hand`), corrigé par l’IA.
// Facile = reconnaître une phrase enrichie / un complément (choix) ; Moyen = écrire une phrase enrichie ; Difficile = phrases plus
// riches, réponses justifiées, récit avec dialogue ou marqueurs de temps. Phrases et sujets originaux.
import { ch, srt, ans, hand, fx, sy, unit } from './francais-lib.js';
import { TEXTS } from './francais-lecture.js';

/* ---------------------------- g3f39 — Enrichir une phrase ---------------------------- */
// [phrase de base, mot-clé, + adjectif, + où, + quand, + tout]
const BASES = [
  ['Le chat dort.', 'chat', 'Le gros chat gris dort.', 'Le chat dort sur le sofa.', 'Le chat dort depuis ce matin.', 'Le gros chat gris dort sur le sofa depuis ce matin.'],
  ['Mia mange une pomme.', 'pomme', 'Mia mange une pomme rouge.', 'Mia mange une pomme dans la cour.', 'À la récréation, Mia mange une pomme.', 'À la récréation, Mia mange une pomme rouge dans la cour.'],
  ['Le chien court.', 'chien', 'Le petit chien noir court.', 'Le chien court dans le parc.', 'Chaque matin, le chien court.', 'Chaque matin, le petit chien noir court dans le parc.'],
  ['Les enfants jouent.', 'enfants', 'Les enfants joyeux jouent.', 'Les enfants jouent dans la neige.', 'Après l’école, les enfants jouent.', 'Après l’école, les enfants joyeux jouent dans la neige.'],
  ['Papa prépare le souper.', 'souper', 'Papa prépare un délicieux souper.', 'Papa prépare le souper dans la cuisine.', 'Ce soir, papa prépare le souper.', 'Ce soir, papa prépare un délicieux souper dans la cuisine.'],
  ['L’oiseau chante.', 'oiseau', 'Le petit oiseau bleu chante.', 'L’oiseau chante dans l’érable.', 'Au lever du soleil, l’oiseau chante.', 'Au lever du soleil, le petit oiseau bleu chante dans l’érable.'],
  ['Léo lit un livre.', 'livre', 'Léo lit un gros livre passionnant.', 'Léo lit un livre dans son lit.', 'Le soir, Léo lit un livre.', 'Le soir, Léo lit un gros livre passionnant dans son lit.'],
  ['La neige tombe.', 'neige', 'La neige blanche et légère tombe.', 'La neige tombe sur la ville.', 'Depuis hier, la neige tombe.', 'Depuis hier, la neige blanche et légère tombe sur la ville.'],
  ['Zoé dessine une maison.', 'maison', 'Zoé dessine une grande maison jaune.', 'Zoé dessine une maison à son bureau.', 'Pendant la pause, Zoé dessine une maison.', 'Pendant la pause, Zoé dessine une grande maison jaune à son bureau.'],
  ['Le bateau avance.', 'bateau', 'Le vieux bateau blanc avance.', 'Le bateau avance sur le fleuve.', 'À l’aube, le bateau avance.', 'À l’aube, le vieux bateau blanc avance sur le fleuve.'],
  ['Grand-maman tricote.', 'tricote', 'Ma gentille grand-maman tricote.', 'Grand-maman tricote dans sa berçante.', 'Tous les soirs, grand-maman tricote.', 'Tous les soirs, ma gentille grand-maman tricote dans sa berçante.'],
  ['Le vent souffle.', 'vent', 'Le vent froid souffle.', 'Le vent souffle sur le lac.', 'Cette nuit, le vent souffle.', 'Cette nuit, le vent froid souffle sur le lac.'],
  ['Mon frère patine.', 'patine', 'Mon petit frère patine.', 'Mon frère patine sur la patinoire du parc.', 'Le samedi, mon frère patine.', 'Le samedi, mon petit frère patine sur la patinoire du parc.'],
  ['Les fleurs poussent.', 'fleurs', 'Les jolies fleurs mauves poussent.', 'Les fleurs poussent dans le jardin.', 'Au printemps, les fleurs poussent.', 'Au printemps, les jolies fleurs mauves poussent dans le jardin.'],
  ['Le bébé pleure.', 'bébé', 'Le bébé fatigué pleure.', 'Le bébé pleure dans son berceau.', 'Au milieu de la nuit, le bébé pleure.', 'Au milieu de la nuit, le bébé fatigué pleure dans son berceau.'],
  ['Noah construit un fort.', 'fort', 'Noah construit un immense fort.', 'Noah construit un fort dans la cour.', 'Après la tempête, Noah construit un fort.', 'Après la tempête, Noah construit un immense fort dans la cour.'],
  ['La voiture démarre.', 'voiture', 'La vieille voiture rouge démarre.', 'La voiture démarre devant la maison.', 'Ce matin, la voiture démarre.', 'Ce matin, la vieille voiture rouge démarre devant la maison.'],
  ['Les poissons nagent.', 'poissons', 'Les poissons dorés nagent.', 'Les poissons nagent dans l’aquarium.', 'Toute la journée, les poissons nagent.', 'Toute la journée, les poissons dorés nagent dans l’aquarium.'],
  ['Emma chante une chanson.', 'chanson', 'Emma chante une jolie chanson.', 'Emma chante une chanson sur la scène.', 'Au spectacle, Emma chante une chanson.', 'Au spectacle, Emma chante une jolie chanson sur la scène.'],
  ['Le renard chasse.', 'renard', 'Le renard roux et rusé chasse.', 'Le renard chasse dans la forêt.', 'La nuit, le renard chasse.', 'La nuit, le renard roux et rusé chasse dans la forêt.'],
  ['Maman boit un café.', 'café', 'Maman boit un café chaud.', 'Maman boit un café sur la galerie.', 'Avant le déjeuner, maman boit un café.', 'Avant le déjeuner, maman boit un café chaud sur la galerie.'],
  ['Le train arrive.', 'train', 'Le long train bleu arrive.', 'Le train arrive à la gare.', 'À midi, le train arrive.', 'À midi, le long train bleu arrive à la gare.'],
  ['Les élèves écoutent.', 'élèves', 'Les élèves attentifs écoutent.', 'Les élèves écoutent dans la classe.', 'Pendant l’histoire, les élèves écoutent.', 'Pendant l’histoire, les élèves attentifs écoutent dans la classe.'],
  ['Félix trouve une clé.', 'clé', 'Félix trouve une vieille clé dorée.', 'Félix trouve une clé sous le tapis.', 'Ce matin, Félix trouve une clé.', 'Ce matin, Félix trouve une vieille clé dorée sous le tapis.'],
  ['La pluie tombe.', 'pluie', 'La pluie fine tombe.', 'La pluie tombe sur le toit.', 'Depuis midi, la pluie tombe.', 'Depuis midi, la pluie fine tombe sur le toit.'],
  ['Mon ami rit.', 'ami', 'Mon meilleur ami rit.', 'Mon ami rit dans l’autobus.', 'Pendant le film, mon ami rit.', 'Pendant le film, mon meilleur ami rit dans l’autobus.'],
  ['Le lapin saute.', 'lapin', 'Le lapin blanc saute.', 'Le lapin saute dans le champ.', 'Au printemps, le lapin saute.', 'Au printemps, le lapin blanc saute dans le champ.'],
  ['Alice range sa chambre.', 'chambre', 'Alice range sa chambre désordonnée.', 'Alice range sa chambre au deuxième étage.', 'Samedi matin, Alice range sa chambre.', 'Samedi matin, Alice range sa chambre désordonnée au deuxième étage.'],
  ['Le soleil brille.', 'soleil', 'Le soleil chaud brille.', 'Le soleil brille sur la plage.', 'Cet après-midi, le soleil brille.', 'Cet après-midi, le soleil chaud brille sur la plage.'],
  ['William mange une soupe.', 'soupe', 'William mange une soupe chaude.', 'William mange une soupe au restaurant.', 'Au dîner, William mange une soupe.', 'Au dîner, William mange une soupe chaude au restaurant.'],
];
const nw = (s) => s.split(/\s+/).length;
const KIND = { 2: ['un ou des adjectifs', 'adj'], 3: ['un complément qui dit OÙ', 'où'], 4: ['un complément qui dit QUAND', 'quand'] };
const f39 = unit('g3f39', '✨', 'Enrichir une phrase', 'Enriching a sentence',
  'Écriture — enrichir une phrase avec des adjectifs et des compléments de phrase (où, quand, comment)', {
    1: [(R) => {
      const k = R.int(0, BASES.length - 1), b = BASES[k];
      return ch(`g3f39-plus${k}`, 'Quelle phrase est la plus enrichie?', b[5], [b[0], R.pick([b[2], b[3], b[4]])], { stimulus: undefined, tip: `La phrase la plus riche donne le plus de détails : adjectifs, où et quand. « ${b[5]} »` });
    }, (R) => {
      const k = R.int(0, BASES.length - 1), b = BASES[k], j = R.pick([2, 3, 4]);
      return ch(`g3f39-k${j}-${k}`, `Quelle phrase a été enrichie avec ${KIND[j][0]}?`, b[j], [2, 3, 4].filter((x) => x !== j).map((x) => b[x]), { stimulus: { text: b[0] }, tip: `« ${b[j]} » : on a ajouté ${KIND[j][0]}.` });
    }],
    2: [(R) => {
      const k = R.int(0, BASES.length - 1), b = BASES[k], j = R.pick([2, 3, 4]);
      const p = `Récris la phrase en ajoutant ${KIND[j][0]}.`;
      return hand({ key: `g3f39-w${j}-${k}`, mode: 'sentence', prompt: p, say: fx(p), stimulus: { text: b[0] }, words: [b[1]], minWords: nw(b[0]) + (j === 2 ? 1 : 2), lines: 2,
        tip: `Exemple : « ${b[j]} » N’oublie pas la majuscule et le point.` });
    }],
    3: [(R) => {
      const k = R.int(0, BASES.length - 1), b = BASES[k], j = R.int(0, 2);
      const p = ['Enrichis la phrase avec un adjectif ET un complément qui dit OÙ ou QUAND.', 'Enrichis la phrase : place un complément qui dit QUAND au début, suivi d’une virgule, et ajoute un adjectif.', 'Enrichis la phrase avec deux adjectifs et un complément qui dit OÙ.'][j];
      return hand({ key: `g3f39-x${j}-${k}`, mode: 'sentence', prompt: p, say: fx(p), stimulus: { text: b[0] }, words: [b[1]], minWords: nw(b[0]) + 4, lines: 2,
        tip: `Exemple : « ${b[5]} » Un complément au début est suivi d’une virgule.` });
    }],
  });

/* ---------------------------- g3f40 — Écrire une phrase avec un complément ---------------------------- */
const CP = {
  'OÙ': ['dans la cour', 'sous le lit', 'au parc', 'près du lac', 'à la bibliothèque', 'derrière la maison', 'sur le toit', 'au dépanneur', 'dans la forêt', 'au chalet', 'à l’aréna', 'devant l’école', 'dans la cuisine', 'au bord du fleuve', 'sur la galerie', 'à la cabane à sucre', 'chez ma tante', 'au fond du jardin', 'dans le sous-sol', 'sur la patinoire', 'au marché', 'à la plage', 'dans l’autobus', 'au zoo', 'dans la ruelle'],
  'QUAND': ['ce matin', 'après l’école', 'hier soir', 'à midi', 'pendant la nuit', 'au printemps', 'demain', 'le samedi', 'pendant les vacances', 'avant le souper', 'à la récréation', 'en hiver', 'tous les soirs', 'au lever du soleil', 'la semaine prochaine', 'depuis lundi', 'en juillet', 'à minuit', 'pendant l’orage', 'avant de dormir', 'le jour de ma fête', 'cet après-midi', 'chaque matin', 'à Noël', 'après le dîner'],
  'COMMENT': ['doucement', 'avec soin', 'à toute vitesse', 'en silence', 'lentement', 'avec courage', 'en riant', 'sans bruit', 'avec patience', 'en chantant', 'à pas de loup', 'avec ses amis', 'joyeusement', 'en courant', 'avec prudence', 'sur la pointe des pieds', 'tranquillement', 'avec plaisir', 'en sautant', 'rapidement', 'avec un grand sourire', 'calmement', 'en équipe', 'avec attention', 'à bicyclette'],
};
const CPK = Object.keys(CP);
const WORDS40 = ['chat', 'neige', 'ballon', 'vélo', 'sapin', 'cadeau', 'gâteau', 'rivière', 'tuque', 'ami', 'oiseau', 'livre', 'pomme', 'bateau', 'étoile', 'chien', 'tempête', 'mitaines', 'jardin', 'trésor', 'patins', 'soupe', 'renard', 'château', 'fusée', 'dragon', 'voisin', 'crayon', 'sirop', 'cabane'];
const f40 = unit('g3f40', '🧩', 'Une phrase avec un complément', 'A sentence with a complement',
  'Écriture — construire une phrase avec un complément de phrase qui dit où, quand ou comment', {
    1: [(R) => {
      const t = R.pick(CPK), k = R.int(0, CP[t].length - 1), r = CP[t][k];
      const w = CPK.filter((x) => x !== t).map((x) => R.pick(CP[x]));
      return ch(`g3f40-c${t}${k}`, `Quel groupe de mots répond à la question « ${t.toLowerCase()}? »`, r, w, { tip: `« ${r} » dit ${t}.` });
    }, (R) => {
      const picks = CPK.flatMap((t, b) => R.sample(CP[t].map((x, k) => [x, k]), 2).map(([x, k]) => ({ text: x, bin: b, k: `${b}${k}` })));
      const key = picks.map((p) => p.k).sort().join('.');
      return srt(`g3f40-s${key}`, 'Classe les compléments : où, quand ou comment?', CPK.map((t) => ({ text: t.charAt(0) + t.slice(1).toLowerCase() + '?' })),
        R.shuffle(picks.map(({ text, bin }) => ({ text, bin }))), 'Pose la question : où? (un lieu), quand? (un moment), comment? (une manière).');
    }],
    2: [(R) => {
      const w = R.pick(WORDS40), t = R.pick(CPK), ex = R.pick(CP[t]);
      const p = `Écris une phrase avec le mot « ${w} » et un complément qui dit ${t}.`;
      return hand({ key: `g3f40-w${w}-${t}`, mode: 'sentence', prompt: p, say: sy(p), stimulus: { text: `${w}  +  ${t.toLowerCase()}?` }, words: [w], minWords: 6, lines: 2,
        tip: `Par exemple, un complément qui dit ${t.toLowerCase()} : « ${ex} ». Majuscule au début, point à la fin!` });
    }],
    3: [(R) => {
      const [a, b] = R.sample(WORDS40, 2).sort(), t = R.pick(['OÙ', 'QUAND']), ex = R.pick(CP[t]);
      const p = `Écris une phrase avec « ${a} » et « ${b} ». Commence par un complément qui dit ${t}, suivi d’une virgule.`;
      return hand({ key: `g3f40-x${a}-${b}-${t}`, mode: 'sentence', prompt: p, say: sy(p), stimulus: { text: `${a}  +  ${b}  +  ${t.toLowerCase()}?` }, words: [a, b], minWords: 9, lines: 2,
        tip: `Exemple de début : « ${ex.charAt(0).toUpperCase() + ex.slice(1)}, … » La virgule sépare le complément du reste de la phrase.` });
    }],
  });

/* ---------------------------- g3f41 — Répondre par écrit à une question de lecture ---------------------------- */
const ALL = Object.entries(TEXTS).flatMap(([u, list]) => list.map((tx, ti) => ({ u, ti, tx })));
const items = (kinds) => ALL.flatMap(({ u, ti, tx }) => kinds.flatMap((kd) => (tx[kd] || []).map((q, k) => ({ u, ti, tx, kd, k, q }))));
const POOL41 = { 1: items(['e']), 2: items(['i', 'v']), 3: items(['f', 'o']) };
const TIP41 = {
  1: 'Cherche la réponse dans le texte et réponds par une phrase complète qui reprend les mots de la question.',
  2: 'La réponse n’est pas écrite telle quelle : explique avec tes mots, en t’appuyant sur le texte.',
  3: 'Donne ta réponse, puis justifie avec « parce que… » et un indice du texte.',
};
const f41 = unit('g3f41', '📝', 'Je réponds par écrit', 'Writing answers about a text',
  'Écriture et lecture — répondre par écrit à une question sur un texte lu (réponse complète, justifiée)', Object.fromEntries([1, 2, 3].map((L) => [L, [(R) => {
    const it = R.pick(POOL41[L]), isO = it.kd === 'o';
    const answerKey = isO ? it.q[1] : `${it.q[1]} (Le sens compte, pas les mots exacts. ${L === 1 ? 'Une phrase complète est attendue.' : L === 2 ? 'Explication avec ses mots.' : 'Une justification avec « parce que » est attendue.'})`;
    return ans(`g3f41-${it.u}${it.ti}-${it.kd}${it.k}`, `${it.q[0]} Réponds par une phrase complète.`, `${it.tx.title}\n\n${it.tx.text}`, answerKey, TIP41[L], L === 3 ? 3 : 2);
  }]])));

/* ---------------------------- g3f42 — Petit récit ---------------------------- */
const PERSO = [['🦊', 'un renard curieux'], ['🐻', 'une ourse gourmande'], ['🧒', 'une fillette courageuse'], ['👦', 'un garçon timide'], ['🐢', 'une tortue pressée'], ['🦉', 'un hibou savant'], ['🤖', 'un petit robot'], ['🐧', 'un pingouin frileux'], ['🧙', 'une sorcière distraite'], ['🐿️', 'un écureuil farceur']];
const LIEU = [['🏔️', 'à la montagne'], ['🌲', 'dans la forêt'], ['🏫', 'à l’école'], ['🏖️', 'à la plage'], ['🏙️', 'en ville'], ['🍁', 'à la cabane à sucre'], ['⛸️', 'à la patinoire'], ['🚀', 'dans l’espace'], ['🏰', 'dans un vieux château'], ['🛶', 'sur un lac']];
const PROB = [['🔑', 'perd une clé importante'], ['🌧️', 'est surpris par un orage'], ['🗺️', 'trouve une carte au trésor'], ['🐶', 'rencontre un chiot perdu'], ['🎁', 'doit trouver un cadeau en secret'], ['🥶', 'a très froid'], ['🧭', 'se perd'], ['🎈', 'voit son ballon s’envoler'], ['🍪', 'découvre qu’on a volé ses biscuits'], ['🦷', 'perd une dent au mauvais moment']];
const P42 = {
  1: 'Écris un petit récit d’au moins 3 phrases : un début, un milieu (le problème) et une fin.',
  2: 'Écris un récit : présente le personnage et le lieu, raconte le problème, puis explique comment il se règle.',
  3: 'Écris un récit avec un début, un milieu et une fin. Utilise « d’abord », « ensuite » et « enfin », et ajoute une phrase de dialogue avec un tiret.',
};
const f42 = unit('g3f42', '📜', 'J’écris un petit récit', 'Writing a short story',
  'Écriture — rédiger un court récit (début, milieu, fin), marqueurs de temps, dialogue', Object.fromEntries([1, 2, 3].map((L) => [L, [(R) => {
    const a = R.int(0, PERSO.length - 1), b = R.int(0, LIEU.length - 1), c = R.int(0, PROB.length - 1);
    const text = `${PERSO[a][0]} ${PERSO[a][1]}\n${LIEU[b][0]} ${LIEU[b][1]}\n${PROB[c][0]} ${PROB[c][1]}`;
    return hand({ key: `g3f42-${L}-${a}-${b}-${c}`, mode: 'composition', prompt: P42[L], say: fx(P42[L]), stimulus: { text }, minWords: [0, 15, 30, 50][L], lines: [0, 5, 7, 8][L],
      tip: L === 3 ? 'Plan : d’abord (qui, où), ensuite (le problème), enfin (la solution). Un dialogue commence par un tiret : — Bonjour!' : 'Début : qui et où. Milieu : le problème. Fin : la solution. Majuscule et point à chaque phrase!' });
  }]])));

export const units = [f39, f40, f41, f42];
