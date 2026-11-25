import { DiagramScenario, Exercise, SectionId, SectionMeta } from '../types/aps';

const PDF_RELATIVE_PATH =
  'assets/aistudio/fichepedagogiqueidentifierdangercycle11143518pdf-80709_f2a0e52a.pdf';

export function resolvePublicAssetUrl(relativePath: string, baseUrl?: string): string {
  const cleanPath = relativePath.replace(/^\/+/, '');
  const rawBase =
    baseUrl ??
    (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.BASE_URL === 'string'
      ? import.meta.env.BASE_URL
      : './');

  if (!rawBase || rawBase === '/') {
    return `./${cleanPath}`;
  }

  const normalizedBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  return `${normalizedBase}${cleanPath}`;
}

export const PDF_SOURCE_URL = resolvePublicAssetUrl(PDF_RELATIVE_PATH);

export const SECTIONS: Record<SectionId, SectionMeta> = {
  PS: {
    id: 'PS',
    shortLabel: 'Petite Section',
    fullLabel: 'Petite Section (PS)',
    ageRange: '3 – 4 ans',
    pdfTemps: 'Temps 1 — Les dangers de la classe',
    pdfObjective: 'Reconnaître et nommer des objets dangereux ou sans danger dans un univers proche.',
    accentHex: '#0284C7',
    surfaceTint: '#F0F9FF',
  },
  MS: {
    id: 'MS',
    shortLabel: 'Moyenne Section',
    fullLabel: 'Moyenne Section (MS)',
    ageRange: '4 – 5 ans',
    pdfTemps: 'Temps 2 — Les dangers au-delà de la classe',
    pdfObjective: 'Reconnaître des situations dangereuses (maison, cour, motricité) et anticiper le risque.',
    accentHex: '#D97706',
    surfaceTint: '#FFFBEB',
  },
  GS: {
    id: 'GS',
    shortLabel: 'Grande Section',
    fullLabel: 'Grande Section (GS)',
    ageRange: '5 – 6 ans',
    pdfTemps: 'Temps 3 — Dangers écartés, risques évités',
    pdfObjective: 'Signaler un danger avec le pictogramme triangle, modifier l’espace et adopter le bon réflexe.',
    accentHex: '#059669',
    surfaceTint: '#ECFDF5',
  },
};

export const SECTION_ORDER: SectionId[] = ['PS', 'MS', 'GS'];

export const EXERCISES: Exercise[] = [
  // =========================================================================
  // PETITE SECTION (PS · 3-4 ans) — Temps 1 : Les dangers de la classe
  // =========================================================================
  {
    id: 'ps-1',
    section: 'PS',
    number: 1,
    title: 'Le tri du coin cuisine',
    environment: 'Espace jeux symboliques · Classe',
    apsStep: 'Temps 1 · Tri d’objets',
    domain: 'Explorer le monde des objets et de la matière',
    duration: '10 min',
    mode: 'sort',
    sceneKey: 'ps-kitchen-sort',
    childInstruction:
      'Regarde bien chaque objet de la cuisine. Peut-on jouer avec sans danger, ou est-ce un objet dangereux ?',
    objective:
      'Distinguer des objets familiers sans danger d’objets coupants ou toxiques (jeu de tri « dangereux / sans danger »).',
    competencies: [
      'Prendre en compte les risques de l’environnement familier proche (objets dangereux, produits toxiques).',
      'Nommer des objets du quotidien et justifier un classement simple à l’oral.',
    ],
    workSetup:
      'Atelier de langage en petit groupe (4 à 6 élèves) avec l’enseignante ou l’ATSEM. Commencer en montrant les vrais objets (cuillère en bois, jouet) ou les cartes Riskou, puis valider collectivement sur l’écran projeté.',
    differentiation:
      'Pour les plus jeunes, nommer d’abord chaque objet ensemble et mimer son usage dans le coin dînette avant de demander s’il présente un danger. Prolongement : enrichir la Malle aux dangers avec les familles.',
    evaluationCriteria:
      'L’élève identifie et trie correctement les objets dangereux et sans danger en formulant un motif simple (« ça coupe », « ça pique », « on ne boit pas »).',
    languagePrompts: [
      'Comment s’appelle cet objet ? À quoi sert-il ?',
      'Que peut-il arriver si on touche la lame du couteau ou si on boit le produit ?',
      'Qui a le droit d’utiliser ces objets dangereux ?',
    ],
    keyTakeaway: 'Je joue avec mes jouets et la cuillère en bois. Je ne touche jamais aux couteaux ni aux produits ménagers.',
    riskExplanation:
      'Le couteau peut couper les doigts et le produit nettoyant peut rendre très malade si on le boit.',
    safeExplanation:
      'Les objets dangereux sont rangés à l’écart et seuls les adultes les manipulent. Les jouets restent accessibles.',
    sortLabels: {
      safeTitle: 'Sans danger',
      dangerTitle: 'Danger',
    },
    sortItems: [
      {
        id: 'wooden-spoon',
        label: 'Cuillère en bois',
        iconKey: 'spoon',
        category: 'safe',
        explanation: 'La cuillère en bois est douce et arrondie : on peut remuer la dînette sans danger.',
      },
      {
        id: 'sharp-knife',
        label: 'Couteau pointu',
        iconKey: 'knife',
        category: 'danger',
        explanation: 'Attention ! La lame est très coupante : seul un adulte doit le tenir.',
      },
      {
        id: 'toy-apple',
        label: 'Pomme en plastique',
        iconKey: 'apple',
        category: 'safe',
        explanation: 'C’est un jouet de la dînette : on peut jouer avec sans se blesser.',
      },
      {
        id: 'bleach-bottle',
        label: 'Flacon nettoyant',
        iconKey: 'toxic',
        category: 'danger',
        explanation: 'Danger ! C’est un produit toxique : il ne faut ni l’ouvrir ni le goûter.',
      },
    ],
  },
  {
    id: 'ps-2',
    section: 'PS',
    number: 2,
    title: 'La chasse aux intrus dans le coin jeux',
    environment: 'Coin regroupement · Classe',
    apsStep: 'Temps 1 · Jeu d’intrus',
    domain: 'Explorer le monde des objets et de la matière',
    duration: '10 à 15 min',
    mode: 'hotspots',
    sceneKey: 'ps-playroom-intruders',
    childInstruction:
      'Oh ! Trois objets dangereux se sont cachés dans le coin jeux de la classe. Montre-les sur l’écran !',
    objective:
      'Identifier visuellement des objets intrus dangereux dans un espace familier proche (la classe).',
    competencies: [
      'Observer et décrire un lieu familier de la classe.',
      'Repérer des intrus présentant un danger (coupure, électricité, produit toxique).',
    ],
    workSetup:
      'Projection collective au coin regroupement ou en demi-groupe sur TBI. Les élèves viennent pointer au tableau un objet qui n’a pas sa place parmi les jouets ; l’enseignante reformule le danger identifié.',
    differentiation:
      'Avant la projection, la maîtresse peut disposer des objets factices/sécurisés dans le coin jeux réel de la classe (« la chasse aux risques dans la classe ») pour associer le réel à l’image.',
    evaluationCriteria:
      'L’élève observe la scène, désigne les 3 intrus sans confondre avec le doudou et verbalise qu’il faut prévenir un adulte.',
    languagePrompts: [
      'Montre-moi un objet qui n’a rien à faire sur le tapis de jeux.',
      'Pourquoi la prise électrique ou les grands ciseaux sont-ils dangereux ?',
      'Où doit-on ranger les jouets sans danger ?',
    ],
    keyTakeaway: 'Si je vois un objet dangereux dans la classe, je ne le touche pas et je préviens la maîtresse ou l’ATSEM.',
    riskExplanation:
      'On peut se piquer avec des ciseaux pointus, se faire électrocuter avec une prise ou s’intoxiquer avec un flacon.',
    safeExplanation:
      'Les 3 intrus sont retirés par l’adulte : le tapis avec le doudou et les cubes redevient sûr.',
    hotspots: [
      {
        id: 'scissors',
        label: 'Grands ciseaux pointus',
        x: 24,
        y: 72,
        isDanger: true,
        riskDescription: 'Ces grands ciseaux d’adulte ont des pointes : ils peuvent couper ou piquer.',
        safeAction: 'On les confie à la maîtresse pour les ranger en hauteur.',
      },
      {
        id: 'outlet',
        label: 'Prise électrique abîmée',
        x: 78,
        y: 52,
        isDanger: true,
        riskDescription: 'L’électricité dans la prise est invisible mais très dangereuse si on y met les doigts.',
        safeAction: 'On ne touche jamais aux prises électriques et on pose un cache-prise.',
      },
      {
        id: 'spray',
        label: 'Vaporisateur ménager',
        x: 56,
        y: 74,
        isDanger: true,
        riskDescription: 'Ce produit pique les yeux et brûle la bouche.',
        safeAction: 'L’ATSEM le range dans le placard fermé à clé.',
      },
      {
        id: 'teddy',
        label: 'Doudou ourson',
        x: 41,
        y: 66,
        isDanger: false,
        riskDescription: 'Le doudou est tout doux : ce n’est pas un danger !',
        safeAction: 'On peut lui faire un câlin tranquillement.',
      },
    ],
  },
  {
    id: 'ps-3',
    section: 'PS',
    number: 3,
    title: 'La marionnette Léo et la casserole fumante',
    environment: 'Saynète marionnette · Coin cuisine',
    apsStep: 'Temps 1 · Saynète commentée',
    domain: 'Mobiliser le langage dans toutes ses dimensions',
    duration: '15 min',
    mode: 'choice',
    sceneKey: 'ps-puppet-pot',
    childInstruction:
      'Regarde Léo devant la casserole qui fume très fort ! Que doit faire Léo pour ne pas se brûler ?',
    objective:
      'Commenter une saynète animée avec une marionnette et choisir une attitude de prudence face à la chaleur.',
    competencies: [
      'Communiquer avec les adultes et les autres enfants en racontant et décrivant une saynète.',
      'Proposer une solution adaptée pour protéger une marionnette d’une brûlure.',
    ],
    workSetup:
      'L’enseignante anime d’abord une vraie peluche ou marionnette devant la dinette tout en commentant son action, puis projette la scène animée pour que les élèves conseillent Léo et observent les conséquences avec « Voir le risque ».',
    differentiation:
      'Faire rejouer la saynète à deux élèves volontaires (un joue Léo qui s’arrête et recule, l’autre joue l’adulte qui tourne le manche). Utiliser le vocabulaire sensoriel : chaud, brûlant, vapeur, fumée.',
    evaluationCriteria:
      'L’élève décrit ce qui montre que la casserole est chaude (fumée, plaque rouge) et choisit de reculer et d’appeler un adulte.',
    languagePrompts: [
      'Que voit-on sortir de la casserole ? Est-ce froid ou très chaud ?',
      'Pourquoi Léo ne doit-il pas tirer sur le manche ?',
      'Que dirais-tu à Léo pour l’aider ?',
    ],
    keyTakeaway: 'Quand ça fume ou que c’est rouge, ça brûle ! Je recule et j’appelle un adulte.',
    riskExplanation:
      'Si Léo touche la casserole ou tire le manche, l’eau bouillante se renverse et le brûle.',
    safeExplanation:
      'Léo s’éloigne de la cuisinière et appelle l’adulte : il n’y a plus aucun risque de brûlure.',
    choices: [
      {
        id: 'touch-pot',
        label: 'Toucher la casserole',
        iconKey: 'hand-hot',
        isCorrect: false,
        feedback: 'Aïe ! La casserole est brûlante, Léo risque de se faire très mal aux mains.',
      },
      {
        id: 'step-back',
        label: 'Reculer et appeler l’adulte',
        iconKey: 'safe-adult',
        isCorrect: true,
        feedback: 'Bravo ! Léo recule loin de la chaleur et prévient un adulte.',
      },
      {
        id: 'pull-handle',
        label: 'Tirer sur le manche',
        iconKey: 'pot-spill',
        isCorrect: false,
        feedback: 'Oh non ! Toute l’eau très chaude risquerait de tomber sur Léo.',
      },
    ],
  },
  {
    id: 'ps-4',
    section: 'PS',
    number: 4,
    title: 'Le panier de la classe',
    environment: 'Table d’atelier · Classe',
    apsStep: 'Temps 1 · Classement d’objets',
    domain: 'Explorer le monde des objets et de la matière',
    duration: '10 min',
    mode: 'sort',
    sceneKey: 'ps-classroom-basket',
    childInstruction:
      'Aide la maîtresse à trier le panier : quels objets peux-tu toucher, et lesquels ne faut-il jamais toucher ?',
    objective:
      'Identifier les petits objets avalables ou piquants (pile bouton, punaise) parmi le matériel scolaire.',
    competencies: [
      'Prendre en compte les risques liés aux petits objets (ingestion, étouffement, piqûre).',
      'Associer des images projetées à des objets réels connus et manipulés en classe.',
    ],
    workSetup:
      'Petit groupe de 5 élèves autour de la table d’atelier. Montrer une boîte transparente fermée contenant une punaise ou une pile bouton (jamais en main libre) pour ancrer la règle « je regarde avec les yeux, je ne touche pas ».',
    differentiation:
      'Insister sur la taille minuscule de la pile bouton qui brille comme un bonbon ou une pièce : faire répéter collectivement la règle « on ne met aucun objet dans la bouche ».',
    evaluationCriteria:
      'L’élève sépare sans erreur le matériel scolaire autorisé (pinceau, album) des objets dangereux (punaise, pile).',
    languagePrompts: [
      'Pourquoi une petite pile brillante est-elle très dangereuse ?',
      'Est-ce qu’on a le droit de mettre des petits objets dans sa bouche ?',
      'Avec quels objets peux-tu travailler à la table d’atelier ?',
    ],
    keyTakeaway: 'Je ne mets jamais de petits objets dans ma bouche et je ne touche pas aux punaises ni aux piles.',
    riskExplanation:
      'La punaise pique les doigts et la pile bouton avalée provoque une brûlure grave dans le ventre.',
    safeExplanation:
      'Le pinceau et le livre restent à disposition des enfants ; les objets piquants ou avalables sont mis hors de portée.',
    sortLabels: {
      safeTitle: 'Je peux toucher',
      dangerTitle: 'Je ne touche pas',
    },
    sortItems: [
      {
        id: 'paintbrush',
        label: 'Pinceau souple',
        iconKey: 'brush',
        category: 'safe',
        explanation: 'Le pinceau sert à peindre à l’atelier : il n’est pas dangereux.',
      },
      {
        id: 'thumbtack',
        label: 'Punaise pointue',
        iconKey: 'tack',
        category: 'danger',
        explanation: 'Aïe ! Sa pointe métallique pique très fort. On la laisse à la maîtresse.',
      },
      {
        id: 'picture-book',
        label: 'Album illustré',
        iconKey: 'book',
        category: 'safe',
        explanation: 'Un bel album à feuilleter au coin bibliothèque, sans aucun danger.',
      },
      {
        id: 'button-battery',
        label: 'Petite pile ronde',
        iconKey: 'battery',
        category: 'danger',
        explanation: 'Très dangereux ! Une pile bouton ne doit jamais être touchée ni mise à la bouche.',
      },
    ],
  },
  {
    id: 'ps-5',
    section: 'PS',
    number: 5,
    title: 'Attention autour de la table d’atelier',
    environment: 'Espace peinture & eau · Classe',
    apsStep: 'Temps 1 · Repérage de dangers',
    domain: 'Agir, s’exprimer, comprendre à travers l’activité physique',
    duration: '15 min',
    mode: 'hotspots',
    sceneKey: 'ps-table-hazards',
    childInstruction:
      'Avant de t’asseoir à la table, observe bien autour : trouve les 2 dangers pour éviter de te faire mal.',
    objective:
      'Repérer des situations dangereuses simples dans la classe (verre brisé, flaque glissante).',
    competencies: [
      'Attirer l’attention des enfants sur leur propre sécurité et celle des autres dans la classe.',
      'Anticiper une chute ou une coupure avant de se déplacer dans la pièce.',
    ],
    workSetup:
      'Séance courte au tableau avant un atelier de peinture ou de transvasement d’eau. Faire observer l’image en silence 10 secondes, puis demander aux enfants de nommer ce qu’ils voient au sol.',
    differentiation:
      'Relier cette scène à la vie réelle de la classe : montrer où sont rangés le balai/pelle (réservés aux adultes) et les chiffons, et rappeler comment s’arrêter net (« statue ! ») si un verre tombe.',
    evaluationCriteria:
      'L’élève repère le verre brisé et la flaque d’eau, distingue le pot de crayons sûr et indique qu’il faut appeler un adulte sans toucher.',
    languagePrompts: [
      'Que voit-on par terre près de la chaise ? Que se passe-t-il si on marche dessus ?',
      'Pourquoi faut-il vite prévenir un adulte quand un verre se casse ?',
      'Est-ce qu’on ramasse les morceaux de verre avec ses mains ?',
    ],
    keyTakeaway: 'Si un verre est cassé ou qu’il y a de l’eau par terre, je m’arrête et j’appelle la maîtresse.',
    riskExplanation:
      'On risque de se couper avec les éclats de verre ou de glisser et tomber sur la flaque d’eau.',
    safeExplanation:
      'L’adulte balaie les morceaux de verre et essuie l’eau : le sol est propre et sec.',
    hotspots: [
      {
        id: 'broken-glass',
        label: 'Verre cassé au sol',
        x: 28,
        y: 78,
        isDanger: true,
        riskDescription: 'Les morceaux de verre coupent les mains et les pieds !',
        safeAction: 'On s’éloigne sans toucher et la maîtresse balaie avec la pelle.',
      },
      {
        id: 'water-puddle',
        label: 'Grande flaque d’eau',
        x: 68,
        y: 80,
        isDanger: true,
        riskDescription: 'Le sol mouillé glisse beaucoup : on risque de tomber et se cogner.',
        safeAction: 'On prévient un adulte pour essuyer la flaque avec une serpillière.',
      },
      {
        id: 'crayons',
        label: 'Pot de gros crayons',
        x: 49,
        y: 44,
        isDanger: false,
        riskDescription: 'Les gros crayons de cire sont adaptés aux petites mains : sans danger !',
        safeAction: 'On peut dessiner sereinement.',
      },
    ],
  },

  // =========================================================================
  // MOYENNE SECTION (MS · 4-5 ans) — Temps 2 : Dangers au-delà de la classe
  // =========================================================================
  {
    id: 'ms-1',
    section: 'MS',
    number: 1,
    title: 'La chasse aux dangers dans la cuisine',
    environment: 'Domicile · Cuisine familiale',
    apsStep: 'Temps 2 · Transfert classe → maison',
    domain: 'Explorer le monde des objets et de la matière',
    duration: '15 à 20 min',
    mode: 'hotspots',
    sceneKey: 'ms-home-kitchen',
    childInstruction:
      'Nous sommes dans la cuisine à la maison. Trouve les 3 situations dangereuses avant de préparer le goûter !',
    objective:
      'Transférer les connaissances de la classe à la maison et repérer plusieurs sources de danger dans une même pièce.',
    competencies: [
      'Transférer des situations vécues à l’école vers l’espace domestique (travail en lien avec les familles).',
      'Décrire précisément une situation dangereuse et formuler le risque associé (brûlure, coupure, intoxication).',
    ],
    workSetup:
      'Atelier de langage (6 à 8 élèves) devant le TBI. Les élèves décrivent d’abord librement la pièce (cuisine), puis viennent repérer les 3 dangers un par un. Utiliser « Voir le risque » pour discuter de la conséquence.',
    differentiation:
      'Proposer aux familles un échange via le cahier de vie ou la Malle aux dangers : « À la maison, où sont rangés les produits ménagers ? ». En classe, comparer avec l’album *Attention dans la maison* (C. Dolto).',
    evaluationCriteria:
      'L’élève identifie les 3 dangers domestiques et distingue le danger (objet/position) du risque encouru.',
    languagePrompts: [
      'Décris ce que tu vois sur la gazinière. Pourquoi le manche est-il mal placé ?',
      'Où est posé le couteau ? Est-ce facile de le faire tomber ?',
      'Pourquoi la porte sous l’évier doit-elle rester fermée ?',
    ],
    keyTakeaway: 'Dans la cuisine, je reste loin des plaques chaudes, des couteaux au bord de la table et des produits sous l’évier.',
    riskExplanation:
      'Un manche qui dépasse peut être accroché (brûlure), un couteau au bord peut tomber (coupure), un flacon accessible peut être avalé (intoxication).',
    safeExplanation:
      'Manche tourné vers le mur, couteau rangé en retrait et placard de produits fermé en sécurité.',
    hotspots: [
      {
        id: 'pot-handle',
        label: 'Manche de casserole qui dépasse',
        x: 27,
        y: 48,
        isDanger: true,
        riskDescription: 'Un enfant peut tirer ou heurter le manche : l’eau brûlante se renverse !',
        safeAction: 'On tourne toujours le manche de la casserole vers l’arrière.',
      },
      {
        id: 'edge-knife',
        label: 'Couteau au bord du plan de travail',
        x: 54,
        y: 52,
        isDanger: true,
        riskDescription: 'Le couteau dépasse du bord : il peut tomber ou couper une main qui s’accroche.',
        safeAction: 'On range les couteaux loin du bord, hors de portée des enfants.',
      },
      {
        id: 'under-sink',
        label: 'Produits sous l’évier ouvert',
        x: 78,
        y: 76,
        isDanger: true,
        riskDescription: 'Ces bidons colorés ressemblent à du jus, mais ce sont des produits toxiques !',
        safeAction: 'Les produits ménagers doivent être rangés en hauteur ou dans un placard verrouillé.',
      },
      {
        id: 'fruit-bowl',
        label: 'Corbeille de fruits',
        x: 42,
        y: 46,
        isDanger: false,
        riskDescription: 'Des pommes et des bananes bien posées : aucun danger !',
        safeAction: 'Un bon goûter prêt à être partagé.',
      },
    ],
  },
  {
    id: 'ms-2',
    section: 'MS',
    number: 2,
    title: 'Eau + Électricité dans la salle de bain',
    environment: 'Domicile · Salle de bain',
    apsStep: 'Temps 2 · Chaîne Danger → Risque',
    domain: 'Explorer le monde des objets et de la matière',
    duration: '15 min',
    mode: 'choice',
    sceneKey: 'ms-bathroom-shock',
    childInstruction:
      'Observe bien la salle de bain : le sèche-cheveux est branché juste à côté de l’eau du lavabo. Quel est le bon geste ?',
    objective:
      'Comprendre l’association dangereuse eau + électricité et anticiper la conséquence (risque d’électrocution).',
    competencies: [
      'Observer les règles élémentaires de sécurité liées aux techniques rencontrées dans la vie quotidienne (Domaine 4).',
      'Discuter un point de vue et argumenter le choix de la conduite prudente.',
    ],
    workSetup:
      'Projection en groupe classe ou demi-groupe. Laisser d’abord les élèves débattre des 3 propositions illustrées (sans indice de couleur) avant de valider collectivement le bon geste.',
    differentiation:
      'Faire émerger la règle simple « mains mouillées = pas d’électricité » et l’étendre aux interrupteurs, aux chargeurs ou aux radiateurs dans la salle de bain. Relier au schéma animé Danger ≠ Risque.',
    evaluationCriteria:
      'L’élève explique que l’eau et l’électricité réunies provoquent une électrocution et choisit d’alerter un adulte.',
    languagePrompts: [
      'Quels sont les deux éléments qui ne doivent jamais se rencontrer ici ?',
      'Que risque-t-il d’arriver si le sèche-cheveux tombe dans l’eau ?',
      'Que doit faire l’adulte avant que l’enfant ne se lave les mains ?',
    ],
    keyTakeaway: 'L’eau et l’électricité ne vont jamais ensemble ! Je ne touche jamais un appareil branché les mains mouillées.',
    riskExplanation:
      'Si l’appareil électrique touche l’eau ou des mains mouillées, le courant passe : c’est un grave danger d’électrocution.',
    safeExplanation:
      'Le sèche-cheveux est débranché et rangé loin du lavabo, le sol est essuyé : tout danger est écarté.',
    choices: [
      {
        id: 'grab-wet',
        label: 'Prendre le sèche-cheveux les mains mouillées',
        iconKey: 'shock',
        isCorrect: false,
        feedback: 'Danger très grave ! Eau + électricité peuvent provoquer une électrocution.',
      },
      {
        id: 'call-unplug',
        label: 'Ne pas toucher et demander à l’adulte de débrancher',
        iconKey: 'unplug-safe',
        isCorrect: true,
        feedback: 'Très bien ! L’adulte débranche l’appareil avec les mains sèches et l’éloigne de l’eau.',
      },
      {
        id: 'splash-water',
        label: 'Continuer à éclabousser le lavabo',
        iconKey: 'splash',
        isCorrect: false,
        feedback: 'Attention ! L’eau éclaboussée peut entrer dans l’appareil branché ou dans la prise.',
      },
    ],
  },
  {
    id: 'ms-3',
    section: 'MS',
    number: 3,
    title: 'Dans la cour de récréation',
    environment: 'École · Cour de récréation',
    apsStep: 'Temps 2 · Situations collectives',
    domain: 'Agir, s’exprimer, comprendre à travers l’activité physique',
    duration: '15 à 20 min',
    mode: 'hotspots',
    sceneKey: 'ms-playground',
    childInstruction:
      'C’est l’heure de la récréation ! Observe bien la cour et repère les 3 comportements ou situations dangereuses.',
    objective:
      'Attirer l’attention des enfants sur leur propre sécurité et celle des autres dans la cour d’école.',
    competencies: [
      'Prendre conscience des facteurs de dangerosité dans un espace collectif proche (la cour).',
      'Distinguer un jeu sans danger (marelle) d’un comportement à risque pour soi ou les camarades.',
    ],
    workSetup:
      'Séance menée avant ou juste après la récréation. Faire repérer les 3 zones sur l’écran, puis organiser un court tour d’observation réel dans la cour de l’école pour reformuler les règles de vie commune.',
    differentiation:
      'Amener les élèves à distinguer « danger lié à un lieu » (portail entrouvert) et « danger lié à un comportement » (courir avec un bâton, se lever sur le toboggan).',
    evaluationCriteria:
      'L’élève identifie les 3 situations dangereuses de la cour et énonce une règle de prudence claire pour chacune.',
    languagePrompts: [
      'Comment doit-on descendre du toboggan pour ne pas tomber ?',
      'Pourquoi est-il dangereux de courir avec un bâton à la main ?',
      'Que doit-on faire si le portail de l’école est resté entrouvert ?',
    ],
    keyTakeaway: 'Dans la cour, je descends le toboggan assis, je ne cours pas avec un bâton et je reste toujours à l’intérieur de l’école.',
    riskExplanation:
      'Debout sur le toboggan on chute, avec un bâton en courant on blesse un camarade, par un portail ouvert on risque d’aller vers la rue.',
    safeExplanation:
      'Descente assise sur le toboggan, bâton posé au sol et portail bien fermé : la récréation est joyeuse et sûre.',
    hotspots: [
      {
        id: 'slide-standing',
        label: 'Debout en haut du toboggan',
        x: 24,
        y: 42,
        isDanger: true,
        riskDescription: 'En se mettant debout sur le toboggan, on risque de basculer et de tomber de haut.',
        safeAction: 'On s’assoit bien pieds en avant avant de glisser.',
      },
      {
        id: 'running-stick',
        label: 'Courir avec un bâton pointu',
        x: 52,
        y: 66,
        isDanger: true,
        riskDescription: 'Si l’enfant trébuche, le bâton peut blesser son visage ou celui d’un copain.',
        safeAction: 'On pose le bâton et on joue à courir les mains libres.',
      },
      {
        id: 'open-gate',
        label: 'Portail entrouvert vers la rue',
        x: 84,
        y: 54,
        isDanger: true,
        riskDescription: 'Un enfant pourrait sortir seul près des voitures !',
        safeAction: 'On ne sort jamais seul et on prévient tout de suite la maîtresse.',
      },
      {
        id: 'hopscotch',
        label: 'Jeu de marelle',
        x: 42,
        y: 82,
        isDanger: false,
        riskDescription: 'Sauter à la marelle sur la cour dégagée : c’est un jeu sans danger !',
        safeAction: 'Bon jeu de marelle !',
      },
    ],
  },
  {
    id: 'ms-4',
    section: 'MS',
    number: 4,
    title: 'Le parcours en salle de motricité',
    environment: 'École · Salle de motricité',
    apsStep: 'Temps 2 · Risque mesuré et anticipation',
    domain: 'Agir, s’exprimer, comprendre à travers l’activité physique',
    duration: '15 min',
    mode: 'choice',
    sceneKey: 'ms-gym-course',
    childInstruction:
      'Regarde le parcours de motricité : un élève saute du banc. Quelle règle rend ce parcours vraiment sûr pour tout le monde ?',
    objective:
      'Prendre conscience des facteurs de dangerosité dans l’activité physique et construire des stratégies de prudence (tapis, distance).',
    competencies: [
      'Construire deux stratégies complémentaires : prudence/prévention et engagement mesuré dans l’action.',
      'Anticiper le risque de chute et respecter l’espace de réception d’un camarade.',
    ],
    workSetup:
      'Projeter cette situation juste avant la séance de motricité. Après le vote collectif des élèves, appliquer concrètement la règle (« un enfant à la fois sur le tapis ») lors du parcours réel contrôlé par l’adulte.',
    differentiation:
      'Valoriser l’audace maîtrisée : la fiche DGESCO rappelle qu’on construit un enfant actif et désireux de découvrir le monde, capable d’anticiper pour éviter les risques réels irréversibles.',
    evaluationCriteria:
      'L’élève choisit la règle de sécurité adaptée (tapis libre et attente de son tour) et la transpose en salle de motricité.',
    languagePrompts: [
      'À quoi servent les gros tapis bleus autour du banc et de la poutre ?',
      'Que risque-t-il d’arriver si deux enfants sautent en même temps ou se poussent ?',
      'Comment savoir quand c’est ton tour de sauter ?',
    ],
    keyTakeaway: 'En motricité, j’attends que le tapis soit libre avant de sauter et je ne pousse jamais mes camarades.',
    riskExplanation:
      'Sauter sans tapis ou sur un camarade qui n’a pas encore quitté le tapis provoque chutes et chocs.',
    safeExplanation:
      'Le tapis amortit la réception, chacun attend son tour et garde une bonne distance de sécurité.',
    choices: [
      {
        id: 'push-friend',
        label: 'Pousser le copain pour passer plus vite',
        iconKey: 'push',
        isCorrect: false,
        feedback: 'Non ! Pousser un camarade en hauteur peut provoquer une chute douloureuse.',
      },
      {
        id: 'wait-mat',
        label: 'Attendre que le tapis de réception soit libre',
        iconKey: 'gym-safe',
        isCorrect: true,
        feedback: 'Exactement ! On vérifie que le tapis est en place et libre avant de sauter.',
      },
      {
        id: 'jump-floor',
        label: 'Sauter à côté du tapis sur le sol dur',
        iconKey: 'hard-floor',
        isCorrect: false,
        feedback: 'Aïe ! Sans tapis, le sol dur n’amortit pas la chute.',
      },
    ],
  },
  {
    id: 'ms-5',
    section: 'MS',
    number: 5,
    title: 'Situations sûres ou dangereuses au salon',
    environment: 'Domicile · Salon familial',
    apsStep: 'Temps 2 · Tri de situations',
    domain: 'Mobiliser le langage dans toutes ses dimensions',
    duration: '15 min',
    mode: 'sort',
    sceneKey: 'ms-livingroom-sort',
    childInstruction:
      'Regarde ces 4 scènes dans le salon à la maison. Classe celles qui sont sûres et celles qui présentent un danger.',
    objective:
      'Classer non plus seulement des objets, mais des comportements et situations domestiques (fenêtre, multiprise, jeux calmes).',
    competencies: [
      'Pratiquer divers usages du langage oral : décrire une scène, questionner, proposer des solutions.',
      'Identifier les risques domestiques graves (défenestration, électrocution) dans le lieu de vie familial.',
    ],
    workSetup:
      'Atelier de langage en petit groupe. Avant de cliquer sur un bouton neutre (« Situation sûre » / « Situation dangereuse »), demander à deux élèves de confronter leur avis et d’expliquer pourquoi.',
    differentiation:
      'Permet de faire le lien direct avec les parents (sensibilisation aux bloque-fenêtres et cache-prises) en prolongeant la séance par un dessin ou un échange à la maison.',
    evaluationCriteria:
      'L’élève classe les 4 situations sans aide visuelle de couleur et formule le risque lié à la fenêtre ouverte et à la multiprise.',
    languagePrompts: [
      'Pourquoi ne faut-il jamais monter sur une chaise devant une fenêtre ouverte ?',
      'Que risque-t-on si on glisse un objet métallique dans une prise ?',
      'Explique à la classe pourquoi les deux autres activités sont sans danger.',
    ],
    keyTakeaway: 'Je ne grimpe jamais près d’une fenêtre ouverte et je ne touche pas aux prises électriques.',
    riskExplanation:
      'Grimper près d’une fenêtre expose à une chute grave ; toucher une multiprise expose à une décharge électrique.',
    safeExplanation:
      'Lire sur le tapis et construire des cubes sur la table sont des jeux calmes et sécurisés.',
    sortLabels: {
      safeTitle: 'Situation sûre',
      dangerTitle: 'Situation dangereuse',
    },
    sortItems: [
      {
        id: 'read-rug',
        label: 'Lire un livre sur le tapis',
        iconKey: 'reading',
        category: 'safe',
        explanation: 'Installé confortablement sur le tapis : c’est calme et sans danger.',
      },
      {
        id: 'chair-window',
        label: 'Grimper sur une chaise près de la fenêtre ouverte',
        iconKey: 'window-fall',
        category: 'danger',
        explanation: 'Très dangereux ! On risque de basculer et de tomber par la fenêtre.',
      },
      {
        id: 'blocks-table',
        label: 'Construire une tour de cubes',
        iconKey: 'blocks',
        category: 'safe',
        explanation: 'Jouer avec les gros cubes en bois sur la table est parfaitement sûr.',
      },
      {
        id: 'fork-socket',
        label: 'Mettre un objet dans une multiprise',
        iconKey: 'outlet-danger',
        category: 'danger',
        explanation: 'Danger électrique ! On ne met jamais rien dans les trous d’une prise.',
      },
    ],
  },

  // =========================================================================
  // GRANDE SECTION (GS · 5-6 ans) — Temps 3 : Écarter le danger & signaler
  // =========================================================================
  {
    id: 'gs-1',
    section: 'GS',
    number: 1,
    title: 'Poser le triangle de danger dans l’école',
    environment: 'École · Couloir et entrée de classe',
    apsStep: 'Temps 3 · Pictogramme triangle ▲',
    domain: 'Explorer le monde des objets et de la matière',
    duration: '20 min',
    mode: 'signal',
    sceneKey: 'gs-school-signal',
    childInstruction:
      'Tu es l’assistant sécurité de la semaine ! Pose un pictogramme Triangle Danger ▲ sur les 3 dangers du couloir.',
    objective:
      'Introduire le pictogramme du triangle comme symbole universel du danger, apprendre à signaler et mettre en mots le danger.',
    competencies: [
      'Apprendre à signaler un danger à l’aide d’un pictogramme (triangle) et reconnaître un danger signalé.',
      'Mettre en mots le danger repéré et proposer une conduite adéquate aux autres élèves.',
    ],
    workSetup:
      'En classe ou en demi-groupe sur TBI, puis rituel hebdomadaire recommandé par la fiche DGESCO : chaque semaine, 2 ou 3 élèves signalent un objet ou lieu de vigilance dans l’école avec un autocollant triangle.',
    differentiation:
      'Comparer les vrais panneaux officiels : le triangle jaune à bordure noire (norme ISO 7010 dans les bâtiments et écoles : sol glissant W011, danger électrique W012, toxique W016) et le triangle blanc à bordure rouge dans la rue (panneau routier A14).',
    evaluationCriteria:
      'L’élève place le pictogramme triangle officiel uniquement sur les 3 zones dangereuses et formule une conduite adaptée pour les camarades.',
    languagePrompts: [
      'À quoi reconnaît-on le panneau officiel qui annonce un danger dans l’école (triangle jaune à bordure noire) ?',
      'Que représente le dessin noir à l’intérieur de chaque triangle (personne qui glisse, éclair, tête de mort) ?',
      'Quelle conduite proposerais-tu aux camarades pour chaque triangle posé ?',
    ],
    keyTakeaway: 'Le triangle jaune à bordure noire signifie « Attention, danger ! ». Je m’arrête, j’observe le dessin et je préviens un adulte.',
    riskExplanation:
      'Sans signalisation, un camarade peut glisser sur le sol mouillé, trébucher sur le câble ou ouvrir l’armoire de produits.',
    safeExplanation:
      'Les 3 zones à risque sont clairement signalées par les triangles officiels ISO 7010 pour que toute l’école fasse attention.',
    hotspots: [
      {
        id: 'wet-corridor',
        label: 'Sol fraîchement lavé',
        x: 24,
        y: 76,
        isDanger: true,
        riskDescription: 'Le carrelage mouillé est très glissant : risque de chute.',
        safeAction: 'On pose le triangle « Sol glissant » et on marche doucement sur le côté sec.',
      },
      {
        id: 'loose-cable',
        label: 'Câble électrique en travers du passage',
        x: 54,
        y: 74,
        isDanger: true,
        riskDescription: 'Un pied peut se prendre dans le fil et faire tomber l’enfant et l’appareil.',
        safeAction: 'On signale le fil et l’adulte le déplace contre le mur.',
      },
      {
        id: 'open-cabinet',
        label: 'Armoire de produits entrouverte',
        x: 82,
        y: 52,
        isDanger: true,
        riskDescription: 'Les produits d’entretien sont accessibles à hauteur d’enfant.',
        safeAction: 'On pose le triangle danger et on appelle l’adulte pour fermer à clé.',
      },
      {
        id: 'coat-hooks',
        label: 'Portemanteaux rangés',
        x: 34,
        y: 42,
        isDanger: false,
        riskDescription: 'Les manteaux et sacs sont bien accrochés : le passage est dégagé.',
        safeAction: 'Pas besoin de triangle ici, c’est bien rangé !',
      },
    ],
  },
  {
    id: 'gs-2',
    section: 'GS',
    number: 2,
    title: 'Modifier l’espace pour supprimer les risques',
    environment: 'Domicile · Atelier cuisine sécurisé',
    apsStep: 'Temps 3 · Agir sur l’espace',
    domain: 'Domaine 4 du Socle · Règles élémentaires de sécurité',
    duration: '20 min',
    mode: 'fix',
    sceneKey: 'gs-fix-kitchen',
    childInstruction:
      'Transforme cette cuisine ! Clique sur chaque danger pour modifier la pièce jusqu’à ce qu’il n’y ait plus aucun risque.',
    objective:
      'Agir sur l’espace scénarisé et le modifier concrètement pour qu’il n’y ait plus de risques (évaluation Temps 3 du PDF).',
    competencies: [
      'Savoir agir à bon escient : modifier un espace aménagé pour supprimer l’exposition au danger.',
      'Comprendre que le danger (chaleur, lame, produit) demeure mais que le risque est évité.',
    ],
    workSetup:
      'Projection collective puis manipulation au tableau par 3 élèves successifs. Avant chaque clic, demander à l’élève d’annoncer à voix haute la transformation qu’il veut faire dans la cuisine.',
    differentiation:
      'Activité complémentaire en coin jeu réel (dinette/poupées) comme décrit page 3 du PDF : aménager une cuisine « piège », photographier avant/après la remise en sécurité et partager les photos avec les familles.',
    evaluationCriteria:
      'Critère d’évaluation officiel (p. 3) : l’élève agit sur l’espace scénarisé et le modifie afin qu’il n’y ait plus de risques.',
    languagePrompts: [
      'Qu’est-ce qui a changé dans l’image quand tu as cliqué sur la casserole ?',
      'Est-ce que le danger (la chaleur) existe encore ? Pourquoi n’y a-t-il plus de risque ?',
      'Que peux-tu vérifier chez toi avec tes parents ?',
    ],
    keyTakeaway: 'On peut éviter les accidents en modifiant l’espace : manches tournés, couteaux rangés, produits en hauteur.',
    riskExplanation:
      'Tant que les dangers restent à portée des enfants, le risque d’accident domestique reste très élevé.',
    safeExplanation:
      'Bravo ! Les 3 aménagements sont faits : le danger est écarté, donc le risque est évité.',
    fixableHazards: [
      {
        id: 'turn-handle',
        label: 'Tourner le manche de la casserole',
        x: 24,
        y: 46,
        beforeLabel: 'Manche vers l’avant',
        afterLabel: 'Manche tourné vers le mur',
        explanation: 'En tournant le manche vers l’intérieur, personne ne peut le renverser en passant.',
      },
      {
        id: 'store-knife',
        label: 'Ranger le grand couteau',
        x: 52,
        y: 52,
        beforeLabel: 'Couteau au bord du plan',
        afterLabel: 'Couteau rangé dans le bloc haut',
        explanation: 'La lame coupante est protégée et hors de portée des petites mains.',
      },
      {
        id: 'lock-cleaner',
        label: 'Mettre le produit toxique en hauteur',
        x: 78,
        y: 76,
        beforeLabel: 'Flacon toxique au sol',
        afterLabel: 'Flacon rangé dans le placard haut fermé',
        explanation: 'Le produit toxique est inaccessible : plus aucun risque d’intoxication.',
      },
    ],
  },
  {
    id: 'gs-3',
    section: 'GS',
    number: 3,
    title: 'Le ballon qui roule vers la rue (ESR)',
    environment: 'Environnement lointain · La rue',
    apsStep: 'Temps 3 · Sécurité routière (ESR)',
    domain: 'Éducation à la sécurité routière · Agir à bon escient',
    duration: '20 min',
    mode: 'choice',
    sceneKey: 'gs-street-ball',
    childInstruction:
      'Oh non ! Le ballon a roulé sur la route et une voiture arrive au loin. Que dois-tu faire tout de suite ?',
    objective:
      'Anticiper le danger dans un espace plus lointain (la rue) et maîtriser son impulsivité face au risque routier.',
    competencies: [
      'Éducation à la sécurité routière (ESR) : identifier les espaces protégés (trottoir, passage piéton) et le feu piéton.',
      'Inhiber un réflexe impulsif (courir après un ballon) pour prévenir un risque mortel.',
    ],
    workSetup:
      'Atelier collectif au tableau avec animation de la voiture et du ballon. Laisser les enfants observer la scène en mouvement, voter sans indice de couleur, puis rejouer la scène en salle de motricité avec un trottoir matérialisé.',
    differentiation:
      'Préparer les sorties scolaires à pied en rappelant les règles du piéton (main de l’adulte, arrêt au bord du trottoir, regarder à gauche puis à droite, attendre l’arrêt complet des véhicules).',
    evaluationCriteria:
      'L’élève identifie la chaussée et le feu rouge piéton comme zones d’arrêt impératif et choisit de rester sur le trottoir.',
    languagePrompts: [
      'De quelle couleur est le petit bonhomme du feu piéton ? Que signifie-t-il ?',
      'Pourquoi ne faut-il jamais courir derrière un ballon qui part sur la chaussée ?',
      'Comment traverser ensuite en toute sécurité avec un adulte ?',
    ],
    keyTakeaway: 'Un ballon peut se remplacer, pas moi ! Je reste sur le trottoir et j’attends l’adulte et le feu vert piéton.',
    riskExplanation:
      'Une voiture roule vite et ne peut pas s’arrêter net si un enfant surgit sur la chaussée.',
    safeExplanation:
      'L’enfant reste sur le trottoir en sécurité, la voiture passe, et l’adulte récupère le ballon quand la voie est libre.',
    choices: [
      {
        id: 'chase-ball',
        label: 'Courir vite attraper le ballon',
        iconKey: 'car-danger',
        isCorrect: false,
        feedback: 'Stop ! La voiture arrive et le conducteur peut ne pas te voir à temps.',
      },
      {
        id: 'stop-sidewalk',
        label: 'M’arrêter sur le trottoir et prévenir l’adulte',
        iconKey: 'sidewalk-safe',
        isCorrect: true,
        feedback: 'Bravo ! Tu t’arrêtes sur le trottoir et tu laisses l’adulte vérifier que les voitures sont arrêtées.',
      },
      {
        id: 'cross-red',
        label: 'Traverser au bonhomme rouge',
        iconKey: 'red-light',
        isCorrect: false,
        feedback: 'Non ! Le bonhomme rouge veut dire que les voitures ont le droit de passer.',
      },
    ],
  },
  {
    id: 'gs-4',
    section: 'GS',
    number: 4,
    title: 'Reconnaître les pictogrammes de produits toxiques',
    environment: 'Maison & école · Étiquettes de sécurité',
    apsStep: 'Temps 3 · Lecture de pictogrammes',
    domain: 'Domaine 4 du Socle · Techniques et produits quotidiens',
    duration: '20 min',
    mode: 'sort',
    sceneKey: 'gs-toxic-pictos',
    childInstruction:
      'Observe les étiquettes et les pictogrammes : quels produits sont comestibles et lesquels sont dangereux ?',
    objective:
      'Reconnaître les vrais pictogrammes officiels européens CLP/SGH (losange blanc à bordure rouge et symbole noir : Tête de mort SGH06, Inflammable SGH02, Corrosif SGH05, Nocif/Irritant SGH07) et ne jamais confondre un produit avec une boisson.',
    competencies: [
      'Observer les règles élémentaires de sécurité liées aux techniques et produits rencontrés dans la vie quotidienne (Domaine 4).',
      'Reconnaître les 4 pictogrammes de danger chimique officiels (CLP/SGH) présents sur les flacons ménagers en France.',
    ],
    workSetup:
      'Petit groupe d’observation fine. Montrer de vraies étiquettes découpées (flacons vides et lavés) présentant les losanges blancs à bordure rouge réglementaires (SGH02, SGH05, SGH06, SGH07) avant d’effectuer le tri sur l’écran.',
    differentiation:
      'Évoquer la règle cruciale du déconditionnement : « On ne boit jamais dans une bouteille sans étiquette ou qu’on ne reconnaît pas, même si le liquide ressemble à de l’eau ou du sirop ».',
    evaluationCriteria:
      'L’élève repère les 4 pictogrammes officiels CLP (losange blanc à bordure rouge, symbole noir) et nomme le danger représenté.',
    languagePrompts: [
      'Quelle est la forme et la couleur du cadre des vrais pictogrammes de produits dangereux (losange blanc bordé de rouge) ?',
      'Que signifient la tête de mort, la flamme, la main attaquée par des gouttes et le point d’exclamation noir ?',
      'Que fais-tu si tu vois une bouteille sans étiquette ?',
    ],
    keyTakeaway: 'Un losange blanc bordé de rouge avec un dessin noir (tête de mort, flamme, corrosif ou « ! ») signale un produit dangereux : je ne touche pas et je ne goûte jamais !',
    riskExplanation:
      'Confondre un produit ménager toxique, corrosif, inflammable ou irritant avec une boisson entraîne une intoxication ou une brûlure grave.',
    safeExplanation:
      'L’eau et le jus de pomme sont identifiés comme alimentaires ; les 4 produits portant un pictogramme officiel CLP/SGH restent hors de portée des enfants.',
    sortLabels: {
      safeTitle: 'Boisson sûre',
      dangerTitle: 'Produit dangereux',
    },
    sortItems: [
      {
        id: 'water-glass',
        label: 'Carafe d’eau claire',
        iconKey: 'water',
        category: 'safe',
        explanation: 'L’eau de la carafe à table est faite pour se désaltérer sans danger.',
      },
      {
        id: 'toxic-skull-bottle',
        label: 'Toxique · Tête de mort (SGH06)',
        iconKey: 'sgh06-toxic',
        category: 'danger',
        explanation: 'Pictogramme officiel SGH06 (tête de mort) : produit très toxique, voire mortel si on l’avale ou le respire !',
      },
      {
        id: 'flammable-can',
        label: 'Inflammable · Flamme (SGH02)',
        iconKey: 'sgh02-flammable',
        category: 'danger',
        explanation: 'Pictogramme officiel SGH02 (flamme noire) : produit qui peut prendre feu très vite !',
      },
      {
        id: 'apple-juice',
        label: 'Brique de jus de pomme',
        iconKey: 'juice',
        category: 'safe',
        explanation: 'Une boisson de goûter clairement identifiée, sans pictogramme de danger.',
      },
      {
        id: 'corrosive-bottle',
        label: 'Corrosif · Ronge la peau (SGH05)',
        iconKey: 'sgh05-corrosive',
        category: 'danger',
        explanation: 'Pictogramme officiel SGH05 (corrosif) : produit qui brûle la peau et les yeux (ex. eau de Javel, déboucheur) !',
      },
      {
        id: 'irritant-spray',
        label: 'Nocif / Irritant · Point « ! » (SGH07)',
        iconKey: 'sgh07-irritant',
        category: 'danger',
        explanation: 'Pictogramme officiel SGH07 (point d’exclamation noir) : produit qui irrite ou rend malade (ex. lessive, nettoyant) !',
      },
    ],
  },
  {
    id: 'gs-5',
    section: 'GS',
    number: 5,
    title: 'L’exercice PPMS : se mettre en sûreté en classe',
    environment: 'École · Exercice PPMS',
    apsStep: 'Temps 3 · Scénarisation PPMS',
    domain: 'Dispositifs PPMS · Savoir agir à bon escient',
    duration: '20 à 30 min',
    mode: 'fix',
    sceneKey: 'gs-ppms-class',
    childInstruction:
      'Le signal de l’exercice PPMS retentit ! Clique sur les 3 actions à faire dans la classe pour que tout le groupe soit en sûreté.',
    objective:
      'Scénariser sereinement les gestes d’un exercice PPMS (Plan Particulier de Mise en Sûreté) cité dans la fiche DGESCO.',
    competencies: [
      'Scénarisation au cours des exercices PPMS face aux risques majeurs (fiche DGESCO p. 1).',
      'Savoir agir à bon escient en groupe : écouter les consignes de l’adulte et rejoindre calmement la zone abritée.',
    ],
    workSetup:
      'À projeter en amont d’un exercice PPMS réglementaire pour rassurer les élèves et dédramatiser le protocole. Expliquer calmement le rôle de l’enseignante, de l’ATSEM et de la mallette PPMS (radio, lampe, jeux calmes, liste d’appel).',
    differentiation:
      'Adopter un ton posé et rassurant (éviter tout discours anxiogène) : présenter l’exercice PPMS comme un entraînement pour bien connaître les gestes qui protègent toute la classe.',
    evaluationCriteria:
      'L’élève identifie et explique les 3 gestes de mise en sûreté (s’éloigner des vitres, se regrouper, écouter en silence).',
    languagePrompts: [
      'Pourquoi s’éloigne-t-on des grandes fenêtres pendant l’exercice PPMS ?',
      'Où se rassemble la classe pour écouter calmement la maîtresse ?',
      'Pourquoi est-il important de rester calme et silencieux pendant la mise en sûreté ?',
    ],
    keyTakeaway: 'Pendant l’exercice PPMS, je m’éloigne des fenêtres, je rejoins le coin abrité avec la classe et j’écoute calmement la maîtresse.',
    riskExplanation:
      'Rester près des vitres ou courir dans tous les sens empêche d’entendre les consignes et expose aux blessures.',
    safeExplanation:
      'Volets/fenêtres sécurisés, enfants regroupés calmement loin des vitres et maîtresse avec la mallette PPMS : toute la classe est protégée.',
    fixableHazards: [
      {
        id: 'away-window',
        label: 'Fermer les stores et s’éloigner des fenêtres',
        x: 20,
        y: 42,
        beforeLabel: 'Enfant près de la vitre',
        afterLabel: 'Éloigné des fenêtres sécurisées',
        explanation: 'On ne reste jamais collé aux vitres pendant une mise en sûreté.',
      },
      {
        id: 'group-shelter',
        label: 'Se regrouper dans la zone abritée',
        x: 54,
        y: 66,
        beforeLabel: 'Élèves dispersés',
        afterLabel: 'Classe regroupée au coin abrité',
        explanation: 'Ensemble au coin regroupement abrité, la maîtresse peut compter chaque élève.',
      },
      {
        id: 'calm-listen',
        label: 'Écouter les consignes avec la mallette PPMS',
        x: 82,
        y: 52,
        beforeLabel: 'Bruit et agitation',
        afterLabel: 'Calme et écoute de l’enseignante',
        explanation: 'Dans le calme, chacun entend les consignes jusqu’à la fin de l’exercice.',
      },
    ],
  },
];

export const DIAGRAM_SCENARIOS: DiagramScenario[] = [
  // --- PETITE SECTION (PS · 3–4 ans) : Objets familiers très proches ---
  {
    id: 'ps-scissors',
    section: 'PS',
    title: 'Les grands ciseaux pointus',
    environment: 'Classe · Coin bricolage',
    sceneKey: 'scissors',
    dangerLabel: 'Le danger : les lames pointues',
    dangerDetail: 'Les grands ciseaux d’adulte ont des lames qui coupent et piquent. Même posés sur la table, ils sont un danger.',
    exposureLabel: 'Exposition : prendre les ciseaux ou courir avec',
    riskLabel: 'Le risque : se couper ou se piquer',
    riskDetail: 'Si un petit enfant prend ces ciseaux ou court avec, il risque de se couper les doigts ou de se piquer.',
    preventionLabel: 'Prévention : ne pas toucher, appeler la maîtresse',
    preventionDetail: 'On laisse les grands ciseaux à l’adulte qui les range en hauteur et on utilise des ciseaux à bouts ronds.',
    teacherPhrase:
      '« Regardez les grands ciseaux : leurs pointes qui piquent, c’est le DANGER. Si on les prend, le RISQUE c’est de se faire un gros bobo. On appelle la maîtresse pour les ranger ! »',
  },
  {
    id: 'ps-pot',
    section: 'PS',
    title: 'La casserole brûlante',
    environment: 'Maison · Cuisine',
    sceneKey: 'pot',
    dangerLabel: 'Le danger : la chaleur qui brûle',
    dangerDetail: 'La casserole pleine d’eau bouillante fume très fort : la chaleur est une source possible d’accident.',
    exposureLabel: 'Exposition : approcher la main ou tirer le manche',
    riskLabel: 'Le risque : se brûler très fort',
    riskDetail: 'Le risque apparaît si l’enfant touche la casserole ou tire sur le manche qui dépasse.',
    preventionLabel: 'Prévention : reculer et tourner le manche',
    preventionDetail: 'L’adulte tourne le manche vers le mur et l’enfant recule loin de la plaque chaude.',
    teacherPhrase:
      '« La casserole qui fume, c’est le DANGER. Si on approche la main, le RISQUE c’est de se brûler. Quand on recule et qu’on tourne le manche, il n’y a plus de risque ! »',
  },
  {
    id: 'ps-battery',
    section: 'PS',
    title: 'La petite pile brillante',
    environment: 'Classe & maison · Petits objets',
    sceneKey: 'battery',
    dangerLabel: 'Le danger : la petite pile ronde',
    dangerDetail: 'Cette toute petite pile brille comme un bonbon ou une pièce, mais elle contient des produits dangereux.',
    exposureLabel: 'Exposition : la mettre dans sa bouche',
    riskLabel: 'Le risque : s’étouffer ou se brûler le ventre',
    riskDetail: 'Si on porte la pile à la bouche, on risque de l’avaler et de se faire très mal à l’intérieur.',
    preventionLabel: 'Prévention : jamais dans la bouche, donner à l’adulte',
    preventionDetail: 'On ne touche pas aux piles rondes et on prévient tout de suite un adulte pour qu’il la range.',
    teacherPhrase:
      '« Cette petite pile ronde, ce n’est pas un bonbon, c’est un DANGER. Si on la met à la bouche, c’est le RISQUE de l’avaler. Je ne touche pas et j’appelle un adulte ! »',
  },

  // --- MOYENNE SECTION (MS · 4–5 ans) : Situations domestiques et scolaires ---
  {
    id: 'ms-water',
    section: 'MS',
    title: 'La flaque d’eau dans le couloir',
    environment: 'École · Couloir',
    sceneKey: 'water',
    dangerLabel: 'Le danger : le sol glissant',
    dangerDetail: 'L’eau renversée rend le carrelage très glissant. C’est la propriété dangereuse de la situation.',
    exposureLabel: 'Exposition : courir dans la flaque',
    riskLabel: 'Le risque : glisser et tomber',
    riskDetail: 'En marchant vite ou en courant sur l’eau sans faire attention, l’enfant glisse et risque de se cogner.',
    preventionLabel: 'Prévention : contourner, signaler et essuyer',
    preventionDetail: 'On contourne la flaque, on prévient l’adulte pour essuyer le sol et on marche calmement.',
    teacherPhrase:
      '« L’eau par terre, c’est le DANGER. Glisser et tomber, c’est le RISQUE. Quand on prévient la maîtresse et qu’on essuie, le risque disparaît ! »',
  },
  {
    id: 'ms-electricity',
    section: 'MS',
    title: 'Le sèche-cheveux près du lavabo',
    environment: 'Maison · Salle de bain',
    sceneKey: 'electricity',
    dangerLabel: 'Le danger : eau + électricité',
    dangerDetail: 'Un appareil électrique branché près de l’eau crée un danger invisible mais très puissant.',
    exposureLabel: 'Exposition : toucher les mains mouillées',
    riskLabel: 'Le risque : l’électrocution',
    riskDetail: 'L’eau conduit l’électricité : toucher l’appareil branché avec les mains humides expose à une décharge grave.',
    preventionLabel: 'Prévention : débrancher loin de l’eau',
    preventionDetail: 'L’adulte débranche l’appareil avec les mains bien sèches et le range loin du lavabo et de la baignoire.',
    teacherPhrase:
      '« L’eau et l’électricité ensemble, c’est un grand DANGER. Si on touche les mains mouillées, c’est le RISQUE d’électrocution. On demande à l’adulte de débrancher ! »',
  },
  {
    id: 'ms-window',
    section: 'MS',
    title: 'La chaise près de la fenêtre ouverte',
    environment: 'Maison · Salon / Chambre',
    sceneKey: 'window',
    dangerLabel: 'Le danger : la hauteur et la fenêtre ouverte',
    dangerDetail: 'Une fenêtre ouverte en étage, avec une chaise juste dessous, est une source d’accident domestique grave.',
    exposureLabel: 'Exposition : grimper sur la chaise pour regarder',
    riskLabel: 'Le risque : basculer et tomber dehors',
    riskDetail: 'En se penchant vers l’extérieur, la tête entraîne le corps et l’enfant risque une chute grave.',
    preventionLabel: 'Prévention : éloigner les chaises et fermer la fenêtre',
    preventionDetail: 'On ne grimpe jamais près d’une fenêtre, on éloigne les meubles et on regarde dehors seulement avec un adulte.',
    teacherPhrase:
      '« La fenêtre ouverte en hauteur est un DANGER. Si on monte sur la chaise, c’est le RISQUE de tomber. On éloigne la chaise et on reste loin du bord ! »',
  },

  // --- GRANDE SECTION (GS · 5–6 ans) : Signalisation ▲, produits toxiques & rue (ESR) ---
  {
    id: 'gs-street',
    section: 'GS',
    title: 'La voiture sur la chaussée (ESR)',
    environment: 'Rue · Sécurité routière',
    sceneKey: 'street',
    dangerLabel: 'Le danger : la voiture en mouvement',
    dangerDetail: 'Une voiture est lourde, rapide et ne peut pas s’arrêter instantanément : elle représente un danger permanent sur la chaussée.',
    exposureLabel: 'Exposition : descendre sur la route sans regarder',
    riskLabel: 'Le risque : se faire renverser',
    riskDetail: 'Courir après un ballon ou traverser au feu rouge expose directement l’enfant au choc avec un véhicule.',
    preventionLabel: 'Prévention : rester sur le trottoir avec l’adulte',
    preventionDetail: 'On s’arrête derrière la bordure du trottoir, on tient la main d’un adulte et on traverse au feu vert piéton quand les voitures sont arrêtées.',
    teacherPhrase:
      '« La voiture qui roule sur la chaussée est le DANGER. Tant que je reste sur le trottoir derrière la bordure, je ne suis pas exposé : j’évite le RISQUE ! »',
  },
  {
    id: 'gs-toxic',
    section: 'GS',
    title: 'Le bidon avec pictogramme rouge',
    environment: 'Maison & école · Produits ménagers',
    sceneKey: 'toxic',
    dangerLabel: 'Le danger : le produit chimique signalé',
    dangerDetail: 'Le losange rouge avec une flamme ou un point d’exclamation signale un produit toxique, corrosif ou inflammable.',
    exposureLabel: 'Exposition : ouvrir le flacon ou le goûter',
    riskLabel: 'Le risque : intoxication ou brûlure chimique',
    riskDetail: 'Confondre ce bidon coloré avec une boisson ou toucher le liquide expose à une intoxication grave.',
    preventionLabel: 'Prévention : reconnaître le picto et ranger en hauteur',
    preventionDetail: 'On reconnaît le pictogramme de danger, on ne touche jamais au flacon et l’adulte le range dans un placard haut fermé à clé.',
    teacherPhrase:
      '« Ce losange rouge nous avertit du DANGER : c’est un produit toxique. Si on l’ouvre ou on le goûte, c’est le RISQUE d’intoxication. On le laisse fermé hors de portée ! »',
  },
  {
    id: 'gs-outlet',
    section: 'GS',
    title: 'Le fil dénudé et la multiprise',
    environment: 'École & maison · Électricité',
    sceneKey: 'outlet',
    dangerLabel: 'Le danger : le courant électrique accessible',
    dangerDetail: 'Un câble électrique abîmé ou une multiprise surchargée laissent passer un courant dangereux invisible.',
    exposureLabel: 'Exposition : tirer sur le fil ou glisser un objet',
    riskLabel: 'Le risque : décharge électrique ou incendie',
    riskDetail: 'Toucher un fil abîmé ou enfoncer un objet métallique dans une prise provoque une brûlure électrique ou des étincelles.',
    preventionLabel: 'Prévention : poser le triangle ▲ et alerter l’adulte',
    preventionDetail: 'On s’éloigne, on signale la zone avec le triangle de danger ▲ et on prévient tout de suite la maîtresse ou ses parents.',
    teacherPhrase:
      '« Le fil électrique abîmé est le DANGER. Si quelqu’un y touche, c’est le RISQUE d’électrocution. En Grande Section, je sais signaler avec le triangle ▲ et prévenir l’adulte ! »',
  },
];

export function getDiagramScenariosBySection(section: SectionId): DiagramScenario[] {
  return DIAGRAM_SCENARIOS.filter((scenario) => scenario.section === section);
}

export function getExercisesBySection(section: SectionId): Exercise[] {
  return EXERCISES.filter((ex) => ex.section === section).sort((a, b) => a.number - b.number);
}
