/**
 * Catalogue des emojis proposés par le sélecteur.
 *
 * Chaque entrée porte un nom lisible (en français) : c'est lui qui sert à la
 * recherche, avec quelques mots-clés supplémentaires quand un mot ne suffit
 * pas à retrouver l'emoji (« rigoler » pour « 😂 », etc.).
 */

export type EmojiCategoryId =
  | 'smileys'
  | 'gestures'
  | 'hearts'
  | 'objects'
  | 'animals'
  | 'food'
  | 'symbols';

export type EmojiCategory = {
  id: EmojiCategoryId;
  label: string;
  /* Nom de la catégorie, pour la recherche. */
  keywords: string;
};

export type EmojiEntry = {
  emoji: string;
  name: string;
  keywords: string;
  category: EmojiCategoryId;
};

/* [emoji, nom, mots-clés supplémentaires] */
type RawEntry = [string, string, string?];

export const EMOJI_CATEGORIES: Readonly<EmojiCategory[]> = [
  {
    id: 'smileys',
    label: 'Visages',
    keywords: 'visage sourire emotion'
  },
  {
    id: 'gestures',
    label: 'Gestes',
    keywords: 'geste main bras'
  },
  {
    id: 'hearts',
    label: 'Cœurs',
    keywords: 'coeur amour couleur'
  },
  {
    id: 'objects',
    label: 'Objets',
    keywords: 'objet travail outil fete voyage'
  },
  {
    id: 'animals',
    label: 'Animaux',
    keywords: 'animal chat chien'
  },
  {
    id: 'food',
    label: 'Nourriture',
    keywords: 'nourriture manger boisson'
  },
  {
    id: 'symbols',
    label: 'Symboles',
    keywords: 'symbole signe divers'
  }
];

const RAW_EMOJIS: Record<EmojiCategoryId, ReadonlyArray<RawEntry>> = {
  smileys: [
    ['😀', 'sourire', 'rire content'],
    ['😂', 'rire aux larmes', 'rire drlol'],
    ['🤣', 'rire à en rolls', 'rire fou'],
    ['😊', 'sourire aux yeux fermés', 'sourire doux'],
    ['😍', 'couple amoureux', 'amour yeux'],
    ['🥰', 'amour', 'adorer'],
    ['😘', 'bisou', 'kiss'],
    ['😗', 'bisou sounds', 'kiss'],
    ['😋', 'savourer', 'miam langue'],
    ['😛', 'langue', 'moquerie'],
    ['🤪', 'farce', 'drôle'],
    ['😎', 'cool', 'lunettes'],
    ['🤓', 'intello', 'nerveux'],
    ['🧐', 'loupe', 'inspecter'],
    ['🤔', 'réfléchir', 'penser'],
    ['🤨', 'sceptique', 'méfiant'],
    ['😐', 'neutre', 'impassible'],
    ['😑', 'sans expression', 'impossible'],
    ['😶', 'muet', 'silence'],
    ['😏', 'sourire malin', 'malin'],
    ['😒', 'dégoûté', 'lassé'],
    ['🙄', 'yeux au ciel', 'ras le bol'],
    ['😬', 'grimace', 'gêne'],
    ['🤥', 'mentir', 'mensonge'],
    ['😌', 'soupir', 'repos'],
    ['😔', 'triste', 'sad'],
    ['😪', 'endormi', 'fatigue'],
    ['🤤', 'baver', 'envie'],
    ['😴', 'dormir', 'zzz'],
    ['🤒', 'malade', 'fievre'],
    ['🤕', 'malade bandage', 'blesse'],
    ['🥵', 'chaud', 'canicule'],
    ['🥶', 'froid', 'gele'],
    ['😵', 'evite', 'tourned'],
    ['🤯', 'explose', 'choque'],
    ['🥱', 'baille', 'endormi'],
    ['😤', 'fache', 'colere'],
    ['😡', 'furieux', 'colere rage'],
    ['🤬', 'jurons', 'colere'],
    ['😢', 'pleure', 'larme triste'],
    ['😭', 'pleure fort', 'larmes'],
    ['😤', 'bouleversé', 'emo'],
    ['😰', 'angoisse', 'peur'],
    ['😨', 'surpris', 'peur'],
    ['😱', 'cri', 'peur'],
    ['🥺', 'supplie', 'pitié'],
    ['😳', 'choqué', 'surpris'],
    ['🥹', 'ému', 'larmes joie'],
    ['🤗', 'câlin', 'calin'],
    ['🤭', 'rire innocent', 'rire'],
    ['🤫', 'chuchoter', 'secret'],
    ['😬', 'gêne', 'malaise'],
    ['🙄', 'exaspéré', 'ras le bol'],
    ['🤡', 'clown', 'bouffon'],
    ['👻', 'fantôme', 'fantome'],
    ['💀', 'mort', 'skeleton'],
    ['👽', 'alien', ' extraterrestre'],
    ['🤖', 'robot', 'machine'],
    ['😺', 'chat', 'animal']
  ],
  gestures: [
    ['👍', 'pouce', 'like ok accord'],
    ['👎', 'pouce vers le bas', 'unlike'],
    ['👌', 'ok', 'parfait'],
    ['🤌', ' pinched fingers', 'ok'],
    ['✌️', 'victoire', 'paix'],
    ['🤞', 'croise les doigts', 'chance'],
    ['🤟', 'je t’aime', 'love'],
    ['🤘', 'rock', 'guitar'],
    ['🤙', 'shaka', 'cool'],
    ['👈', 'gauche', 'pointer'],
    ['👉', 'droite', 'pointer'],
    ['👆', 'haut', 'pointer'],
    ['👇', 'bas', 'pointer'],
    ['☝️', 'index', 'un'],
    ['✋', 'main', 'stop salut'],
    ['🤚', 'main ouverte', 'stop'],
    ['🖐️', 'main', 'cinq'],
    ['🖖', 'vulcain', 'ironie'],
    ['👋', ' salut', 'au revoir'],
    ['🤚', 'main', 'stop'],
    ['👊', 'poing', 'coup'],
    ['✊', 'poing', 'courage'],
    ['👏', 'applaudissement', 'bravo'],
    ['🙌', 'mains en l’air', 'fete'],
    ['👐', 'mains ouvertes', 'celebration'],
    ['🤲', 'mains jointes', 'priere'],
    ['🙏', 'priere', 'merci'],
    ['🤝', 'poignee de main', 'accord'],
    ['💪', 'muscle', 'fort'],
    ['🦾', 'bras mecanique', 'force'],
    ['✍️', 'ecriture', 'ecrire'],
    ['🫶', 'coeur des mains', 'amour'],
    ['👀', 'yeux', 'regarder'],
    ['🧠', 'cerveau', 'intelligent'],
    ['🫡', 'salut militaire', 'respect'],
    ['🤷', 'je m’en fous', 'indifference'],
    ['🤷‍♀️', 'je m’en fous', 'indifference'],
    ['🙋', 'main levee', 'volontaire'],
    ['🙋‍♂️', 'main levee', 'volontaire'],
    ['💃', 'danse', 'danser'],
    ['🕺', 'danse', 'danser'],
    ['👯', 'deux personnes', 'ami'],
    ['🧘', 'meditation', 'calme'],
    ['🤸', 'acrobate', 'sport'],
    ['🏃', 'course', 'sport'],
    ['🚶', 'marche', 'promenade']
  ],
  hearts: [
    ['❤️', 'coeur rouge', 'amour'],
    ['🧡', 'coeur orange', 'amour'],
    ['💛', 'coeur jaune', 'amour'],
    ['💚', 'coeur vert', 'amour'],
    ['💙', 'coeur bleu', 'amour'],
    ['💜', 'coeur violet', 'amour'],
    ['🖤', 'coeur noir', 'amour'],
    ['🤍', 'coeur blanc', 'amour'],
    ['🤎', 'coeur marron', 'amour'],
    ['💔', 'coeur brise', 'rupture'],
    ['💕', 'coeurs', 'amour'],
    ['💞', 'coeurs tournants', 'amour'],
    ['💓', 'coeur battant', 'amour'],
    ['💗', 'coeur qui grossit', 'amour'],
    ['💖', 'coeur scintillant', 'amour'],
    ['💘', 'coeur de cupidon', 'amour'],
    ['💝', 'coeur cadeau', 'cadeau'],
    ['💟', 'coeur d love', 'amour'],
    ['💌', 'lettre', 'couur'],
    ['💘', 'cupidon', 'amour'],
    ['💯', '100', 'parfait score'],
    ['💥', 'explosion', 'boum'],
    ['💫', 'comete', 'etoile'],
    ['✨', 'brillance', 'magie etoile'],
    ['⭐', 'etoile', 'favori'],
    ['🌟', 'etoile brillante', 'favori'],
    ['⚡', 'eclair', 'rapidite'],
    ['🔥', 'feu', 'chaud populaire'],
    ['🌈', 'arc-en-ciel', 'lgbt'],
    ['☀️', 'soleil', 'ensoleille'],
    ['🌙', 'lune', 'nuit'],
    ['☁️', 'nuage', 'nuageux'],
    ['❄️', 'flocon', 'froid hiver'],
    ['💧', 'goutte', 'eau pluie'],
    ['🎉', 'fete', 'confettis bravo'],
    ['🎊', 'confettis', 'fete'],
    ['🥳', 'fete', 'anniversaire'],
    ['🎈', 'ballon', 'fete'],
    ['🎁', 'cadeau', 'anniversaire'],
    ['🏆', 'trophee', 'victoire'],
    ['🥇', 'medaille or', 'victoire'],
    ['🎉', 'bravo', 'felicitation'],
    ['💐', 'bouquet', 'fleurs'],
    ['🧨', 'feu d’artifice', 'fete'],
    ['🎯', 'cible', 'objectif'],
    ['🧩', 'puzzle', 'enigme'],
    ['💎', 'diamant', 'precieux']
  ],
  objects: [
    ['📱', 'telephone', 'mobile smartphone'],
    ['💻', 'ordinateur', 'laptop mac'],
    ['⌨️', 'clavier', 'clavier'],
    ['🖥️', 'ecran', 'ordinateur'],
    ['🖨️', 'imprimante', 'papier'],
    ['🕐', 'horloge', 'heure temps'],
    ['📷', 'appareil photo', 'photo camera'],
    ['🎥', 'camera', 'video'],
    ['📺', 'television', 'tv ecran'],
    ['📻', 'radio', 'musique'],
    ['🔋', 'batterie', 'energie'],
    ['🔌', 'prise', 'electricite'],
    ['💡', 'ampoule', 'idee lumiere'],
    ['🔦', 'lampe', 'lumiere'],
    ['📕', 'livre', 'lecture'],
    ['📖', 'livre ouvert', 'lecture'],
    ['📚', 'livres', 'lecture etude'],
    ['✏️', 'crayon', 'ecrire'],
    ['🖊️', 'stylo', 'ecrire'],
    ['📝', 'note', 'ecrire memo'],
    ['📌', 'punaise', 'note'],
    ['📎', 'trombone', 'piece jointe'],
    ['✂️', 'ciseaux', 'couper'],
    ['🔑', 'cle', 'cle'],
    ['🔒', 'cadenas', 'verrouille securite'],
    ['🔓', 'cadenas ouvert', 'deverrouille'],
    ['🛠️', 'outils', 'reparation'],
    ['🔧', 'cle de molette', 'reparation outil'],
    ['🔨', 'marteau', 'outil'],
    ['⚙️', 'roue', 'parametre'],
    ['🧲', 'aimant', 'attraction'],
    ['💊', 'medicament', 'pilule'],
    ['🩺', 'stethoscope', 'medecin'],
    ['💰', 'porte-monnaie', 'argent'],
    ['💳', 'carte bancaire', 'paiement'],
    ['📦', 'colis', 'colis livraison'],
    ['📫', 'boite aux lettres', 'courrier'],
    ['🗑️', 'corbeille', 'jeter'],
    ['🧹', 'balai', 'nettoyer'],
    ['🧺', 'panier', 'linge'],
    ['🎒', 'sac a dos', 'voyage'],
    ['👓', 'lunettes', 'regard'],
    ['🕶️', 'lunettes de soleil', 'soleil'],
    ['🎉', 'fete', 'confettis bravo'],
    ['🎊', 'confettis', 'fete'],
    ['🥳', 'parti', 'anniversaire'],
    ['🥂', 'verre qui trinque', 'champagne toast'],
    ['🍾', 'bouteille qui saute', 'champagne'],
    ['🥇', 'medaille', 'victoire'],
    ['🏅', 'medaille', 'recompense'],
    ['🏆', 'trophee', 'victoire'],
    ['🎖️', 'medaille militaire', 'honneur'],
    ['👑', 'couronne', 'roi'],
    ['🎩', 'chapeau', 'magicien'],
    ['🎭', 'theatre', 'masque'],
    ['🎨', 'palette', 'art peinture'],
    ['🎬', 'clap', 'cinema'],
    ['🎤', 'micro', 'chanter'],
    ['🎧', 'casque', 'musique'],
    ['🎼', 'partition', 'musique'],
    ['🎹', 'piano', 'musique'],
    ['🥁', 'tambour', 'musique'],
    ['🎺', 'trompette', 'musique'],
    ['🪕', 'banjo', 'musique'],
    ['🎸', 'guitare', 'musique'],
    ['🎻', 'violon', 'musique'],
    ['🪗', 'flute', 'musique'],
    ['🎪', 'cirque', 'spectacle'],
    ['🎉', 'confettis', 'fete'],
    ['🎁', 'cadeau', 'surprise'],
    ['🎈', 'ballon', 'anniversaire'],
    ['💃', 'danse', 'fete'],
    ['🕺', 'danse', 'fete'],
    ['🥁', 'tambour', 'fete'],
    ['💐', 'bouquet', 'romance'],
    ['💍', 'bague', 'mariage'],
    ['💒', 'mariage', 'noce'],
    ['👰', 'mariée', 'noce'],
    ['🤵', 'marié', 'noce'],
    ['🌸', 'fleur', 'printemps'],
    ['🌺', 'fleur', 'ete'],
    ['🚗', 'voiture', 'transport'],
    ['🚕', 'taxi', 'transport'],
    ['🚌', 'bus', 'transport'],
    ['🚲', 'velo', 'transport'],
    ['🛴', 'trottinette', 'transport'],
    ['🏍️', 'moto', 'transport'],
    ['🚂', 'train', 'transport'],
    ['✈️', 'avion', 'transport voyage'],
    ['🚀', 'fusee', 'espace'],
    ['🛸', 'ovni', 'espace'],
    ['🚁', 'helicoptere', 'transport'],
    ['⛵', 'bateau', 'transport'],
    ['🚢', 'navire', 'transport'],
    ['⚓', 'ancre', 'mer'],
    ['🗺️', 'carte', 'voyage'],
    ['🗿', 'moai', 'voyage'],
    ['🗽', 'statue', 'voyage'],
    ['🗼', 'tour', 'voyage'],
    ['🏰', 'chateau', 'voyage'],
    ['⛺', 'tente', 'camping'],
    ['🏝️', 'ile', 'voyage'],
    ['🏔️', 'montagne', 'montagne'],
    ['⛰️', 'montagne', 'montagne'],
    ['🌋', 'volcan', 'montagne'],
    ['🏕️', 'camping', 'camping'],
    ['🏖️', 'plage', 'mer vacances'],
    ['🏝️', 'plage', 'mer vacances'],
    ['🌅', 'coucher de soleil', 'soir'],
    ['🌄', 'lever du soleil', 'matin'],
    ['🌃', 'ville la nuit', 'ville'],
    ['🏙️', 'ville', 'ville'],
    ['🌉', 'pont', 'ville'],
    ['🗿', 'monument', 'ville'],
    ['🎡', 'grande roue', 'fete parc'],
    ['🎢', 'montagne russe', 'parc'],
    ['🎠', 'manège', 'parc'],
    ['🚦', 'feu tricolore', 'ville'],
    ['🧳', 'valise', 'voyage'],
    ['🎫', 'ticket', 'voyage'],
    ['🛂', 'controle', 'aeroport'],
    ['🛫', 'decollage', 'aeroport']
  ],
  animals: [
    ['🐶', 'chien', 'animal'],
    ['🐱', 'chat', 'animal'],
    ['🐭', 'souris', 'animal'],
    ['🐹', 'hamster', 'animal'],
    ['🐰', 'lapin', 'animal'],
    ['🦊', 'renard', 'animal'],
    ['🐻', 'ours', 'animal'],
    ['🐼', 'panda', 'animal'],
    ['🐨', 'koala', 'animal'],
    ['🐯', 'tigre', 'animal'],
    ['🦁', 'lion', 'animal'],
    ['🐮', 'vache', 'animal'],
    ['🐷', 'cochon', 'animal'],
    ['🐸', 'grenouille', 'animal'],
    ['🐵', 'singe', 'animal'],
    ['🐔', 'poule', 'animal'],
    ['🐧', 'pingouin', 'animal'],
    ['🐦', 'oiseau', 'animal'],
    ['🦆', 'canard', 'animal'],
    ['🦉', 'hibou', 'animal'],
    ['🦇', 'chauve-souris', 'animal'],
    ['🐺', 'loup', 'animal'],
    ['🐗', 'sanglier', 'animal'],
    ['🐴', 'cheval', 'animal'],
    ['🦄', 'licorne', 'animal'],
    ['🐝', 'abeille', 'animal insecte'],
    ['🐛', 'chenille', 'animal insecte'],
    ['🦋', 'papillon', 'animal insecte'],
    ['🐌', 'escargot', 'animal'],
    ['🐞', 'coccinelle', 'animal insecte'],
    ['🐜', 'fourmi', 'animal insecte'],
    ['🕷️', 'araignee', 'animal'],
    ['🐢', 'tortue', 'animal'],
    ['🐍', 'serpent', 'animal'],
    ['🐙', 'poulpe', 'animal'],
    ['🦑', 'calamar', 'animal'],
    ['🦀', 'crabe', 'animal'],
    ['🐠', 'poisson', 'animal mer'],
    ['🐟', 'poisson', 'animal mer'],
    ['🐬', 'dauphin', 'animal mer'],
    ['🐳', 'baleine', 'animal mer'],
    ['🦈', 'requin', 'animal mer'],
    ['🌸', 'fleur', 'animal'],
    ['🐄', 'vache', 'animal'],
    ['🦓', 'zebre', 'animal'],
    ['🦒', 'girafe', 'animal']
  ],
  food: [
    ['🍎', 'pomme', 'fruit'],
    ['🍐', 'poire', 'fruit'],
    ['🍊', 'orange', 'fruit'],
    ['🍋', 'citron', 'fruit'],
    ['🍌', 'banane', 'fruit'],
    ['🍉', 'pastèque', 'fruit'],
    ['🍇', 'raisin', 'fruit'],
    ['🍓', 'fraise', 'fruit'],
    ['🫐', 'myrtille', 'fruit'],
    ['🍒', 'cerise', 'fruit'],
    ['🍑', 'peche', 'fruit'],
    ['🥭', 'mangue', 'fruit'],
    ['🍍', 'ananas', 'fruit'],
    ['🥥', 'noix de coco', 'fruit'],
    ['🥑', 'avocat', 'fruit'],
    ['🍅', 'tomate', 'legume'],
    ['🥕', 'carotte', 'legume'],
    ['🌽', 'mais', 'legume'],
    ['🌶️', 'piment', 'legume'],
    ['🥦', 'brocoli', 'legume'],
    ['🧄', 'ail', 'legume'],
    ['🍞', 'pain', 'boulangerie'],
    ['🥐', 'croissant', 'boulangerie'],
    ['🥨', 'pretzel', 'boulangerie'],
    ['🧀', 'fromage', 'laitier'],
    ['🥚', 'oeuf', 'laitier'],
    ['🥛', 'lait', 'boisson'],
    ['☕', 'cafe', 'boisson'],
    ['🍵', 'the', 'boisson'],
    ['🧃', 'jus', 'boisson'],
    ['🥤', 'soda', 'boisson'],
    ['🍺', 'biere', 'boisson'],
    ['🍷', 'vin', 'boisson'],
    ['🍸', 'cocktail', 'boisson'],
    ['🍰', 'gâteau', 'dessert'],
    ['🎂', 'gâteau anniversaire', 'dessert'],
    ['🍪', 'biscuit', 'dessert'],
    ['🍫', 'chocolat', 'dessert'],
    ['🍬', 'bonbon', 'dessert'],
    ['🍦', 'glace', 'dessert'],
    ['🍩', 'donut', 'dessert'],
    ['🍿', 'popcorn', 'cinema'],
    ['🥗', 'salade', 'plat'],
    ['🍝', 'pates', 'plat'],
    ['🍣', 'sushi', 'plat'],
    ['🍕', 'pizza', 'plat'],
    ['🍔', 'hamburger', 'fast food'],
    ['🌮', 'taco', 'fast food'],
    ['🥙', 'kebab', 'fast food'],
    ['🍟', 'frites', 'fast food'],
    ['🌯', 'wrap', 'fast food'],
    ['🥗', 'salade', 'plat']
  ],
  symbols: [
    ['✅', 'coche verte', 'oui validé'],
    ['❌', 'croix rouge', 'non erreur'],
    ['❗', 'point d’exclamation', 'attention'],
    ['❓', 'point d’interrogation', 'question'],
    ['⚠️', 'avertissement', 'attention'],
    ['🔴', 'rond rouge', 'en direct'],
    ['🟠', 'rond orange', 'boule'],
    ['🟡', 'rond jaune', 'boule'],
    ['🟢', 'rond vert', 'boule valide'],
    ['🔵', 'rond bleu', 'boule'],
    ['🟣', 'rond violet', 'boule'],
    ['⚫', 'rond noir', 'boule'],
    ['⚪', 'rond blanc', 'boule'],
    ['🔺', 'triangle rouge', 'forme'],
    ['🔻', 'triangle bas', 'forme'],
    ['🔸', 'losange', 'forme'],
    ['💠', 'losange', 'forme'],
    ['🔘', 'bouton radio', 'forme'],
    ['🔴', 'boule rouge', 'forme'],
    ['♻️', 'recyclage', 'ecologie'],
    ['🔱', 'trident', 'divers'],
    ['⚜️', 'fleur de lys', 'divers'],
    ['🔰', 'divers', 'divers'],
    ['⚛️', 'atome', 'science'],
    ['🕉️', 'roue dharmique', 'divers'],
    ['✡️', 'etoile de david', 'divers'],
    ['☯️', 'yin yang', 'paix'],
    ['☮️', 'paix', 'paix'],
    ['✝️', 'croix', 'religion'],
    ['☪️', 'croix et croissant', 'religion'],
    ['🕐', 'horloge', 'heure'],
    ['⌛', 'sablier', 'temps'],
    ['⏳', 'sablier', 'attente'],
    ['⏰', 'reveil', 'alarme'],
    ['🔔', 'cloche', 'notification'],
    ['🔕', 'cloche barrée', 'silence'],
    ['🔇', 'son coupe', 'muet'],
    ['🔊', 'haut-parleur', 'son'],
    ['🎵', 'note de musique', 'musique'],
    ['🎶', 'notes', 'musique'],
    ['💬', 'bulle de dialogue', 'discussion'],
    ['💭', 'bulle de pensée', 'pensee'],
    ['🗯️', 'bulle de reproche', 'discussion'],
    ['♻', 'recyclage', 'ecologie'],
    ['🔗', 'lien', 'url'],
    ['➕', 'plus', 'ajouter'],
    ['➖', 'moins', 'retirer'],
    ['🔄', 'rafraichir', 'recharger'],
    ['🔃', 'cartes', 'melanger']
  ]
};

/* Le catalogue complet, à plat.
 *
 * Les données brutes listent parfois deux fois le même emoji dans une même
 * catégorie (copies accidentelles). On n'en garde qu'une : les mots-clés de
 * la ligne en double sont fusionnés dans la première, pour que la recherche
 * retrouve l'emoji avec les deux noms. Cela évite aussi les clés React en
 * double dans le sélecteur. */
export const EMOJIS: ReadonlyArray<EmojiEntry> = (() => {
  const all: EmojiEntry[] = [];

  for (const [category, entries] of Object.entries(RAW_EMOJIS)) {
    const byEmoji = new Map<string, EmojiEntry>();

    for (const [emoji, name, keywords = ''] of entries) {
      const existing = byEmoji.get(emoji);

      if (existing) {
        existing.keywords = [existing.keywords, name, keywords]
          .filter(Boolean)
          .join(' ');
        continue;
      }

      const entry: EmojiEntry = {
        emoji,
        name,
        keywords,
        category: category as EmojiCategoryId
      };

      byEmoji.set(emoji, entry);
      all.push(entry);
    }
  }

  return all;
})();

/* Enlève les accents et met en minuscules : la recherche « coeur » trouve
   alors « cœur ». */
export function normalizeEmojiSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
