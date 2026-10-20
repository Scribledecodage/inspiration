# Inspiration — application de bureau Windows

Application de bureau du réseau social Inspiration. Elle embarque toutes les
fonctionnalités du site (fil en direct, publication, réponse, j'aime,
repartage, signets, notifications, profil) dans une fenêtre native, sans
Chromium embarqué.

---

## Pourquoi ce moteur

Le choix n'est pas Electron. Voici le comparatif mesuré (ordres de grandeur
connus, mesurés sur des applications comparables) :

| | **Tauri 2 (ici)** | Electron |
|---|---|---|
| Taille de l'installateur | **3 à 12 Mo** | 80 à 200 Mo |
| Mémoire au repos | **30 à 60 Mo** | 150 à 400 Mo |
| Démarrage | **< 0,5 s** | 1 à 3 s |
| Moteur embarqué | **aucun** (WebView2 du système) | Chromium complet |
| Langage du moteur | **Rust** (sans garbage collector) | Node.js |

Conséquences concrètes :

- **Batterie** : pas de navigateur caché qui tourne en arrière-plan, pas de
  moteur JavaScript à alimenter. Le CPU dort tant que l'application n'affiche
  rien.
- **Wifi** : le fil passe par l'écoute Firestore, qui ne télécharge que les
  différences. Le cache local est persistant : l'application s'ouvre
  instantanément et fonctionne hors connexion.
- **Stockage** : l'installateur fait quelques mégaoctets, contre plus de cent
  pour un Electron.

Le moteur est en **Rust**, l'interface en **TypeScript + Preact** (3 ko),
sans aucune bibliothèque d'interface lourde. Le CSS est écrit à la main :
aucun Tailwind, aucun PostCSS.

---

## Structure

```
desktop/
├─ src/                     Interface (TypeScript + Preact)
│  ├─ app.tsx               Fenêtre, navigation, connexion
│  ├─ styles.css            Thème clair / sombre (variables CSS)
│  ├─ components/           Avatar, Composer, Icon, TweetItem
│  └─ lib/
│     ├─ firebase.ts        Firebase (cache local persistant)
│     ├─ auth.tsx           Connexion, inscription, profil
│     ├─ tweets.ts          Fil, profils, publications, j'aime…
│     ├─ updater.ts         Vérification et installation des mises à jour
│     └─ platform.ts        Liens vers le navigateur du système
├─ src-tauri/               Moteur (Rust)
│  ├─ src/lib.rs            Fenêtre, barre de notification, plugins
│  ├─ tauri.conf.json       Fenêtre, installateur, mise à jour
│  └─ capabilities/         Permissions accordées à l'interface
└─ scripts/release.mjs      Publication d'une version signée
```

---

## Compiler

### Prérequis

- **Rust** : https://rustup.rs (`rustup-init.exe`)
- **Visual Studio Build Tools 2022** avec la charge « Développement
  applications de bureau C++ » (le compilateur et le SDK Windows)
- **WebView2** (présent par défaut sur Windows 11 et sur Windows 10
  récentes)
- Node.js 22+

### Commandes

```bash
npm install

npm run tauri:dev      # lance l'application en mode développement
npm run tauri:build    # génère l'installateur (EXE + MSI)
npm run release        # compile, signe et prépare la mise à jour
```

L'installateur produit se trouve dans :

```
src-tauri/target/release/bundle/nsis/Inspiration_1.0.0_x64-setup.exe
src-tauri/target/release/bundle/msi/Inspiration_1.0.0_x64_en-US.msi
```

L'installation est **par utilisateur** (`currentUser`) : pas d-rights
administrateur, pas de clé de registre système, désinstallation propre.

---

## Mise à jour automatique

Le système est complet et sûr :

1. **Signature obligatoire.** Chaque paquet est signé avec une clé
   minisign. La clé privée (`.keys/inspiration.key`) ne quitte jamais la
   machine qui publie. La clé publique est embarquée dans l'application :
   elle refuse d'installer un paquet dont la signature ne correspond pas.
2. **Vérification sans interruption.** Au démarrage (différé de 15 s pour ne
   pas ralentir l'ouverture), puis toutes les 6 h. Un bouton « Rechercher
   des mises à jour » est disponible dans le panneau de droite, et l'icône
   de la zone de notification le propose aussi.
3. **Téléchargement en arrière-plan** : l'application reste utilisable
   pendant le téléchargement (barre de progression dans l'en-tête).
4. **Installation silencieuse** (`installMode: passive`) : une petite
   fenêtre de progression, aucune action de l'utilisateur, puis redémarrage
   automatique de l'application.
5. **Bandeau dans l'application** : la nouvelle version est annoncée, et
   l'utilisateur peut l'installer en un clic.

### Publier une version

```bash
npm run release -- --notes "Correction du défilement, nouveaux emojis"
```

Le script :

1. compile l'application ;
2. signe les artefacts (`.exe.sig`, `.msi.sig`) ;
3. écrit `release/latest.json`, le manifeste lu par l'application.

Il reste à téléverser sur la release GitHub `v1.0.0` :

- `Inspiration_1.0.0_x64-setup.exe` et son `.sig`
- `Inspiration_1.0.0_x64_en-US.msi` et son `.sig`
- `latest.json` (à la racine de la release)

L'adresse du manifeste est celle déclarée dans `tauri.conf.json`
(`plugins.updater.endpoints`) : un simple fichier statique, aucun serveur
à maintenir. **Si vous perdez la clé privée, plus aucune mise à jour ne
pourra être signée** : la clé est dans `.keys/`, qui n'est jamais versionné —
sauvegardez-la en lieu sûr.

---

## Fonctionnalités

- **Connexion** par e-mail / mot de passe ou Google, inscription comprise.
- **Fil en direct** : les publications arrivent sans rechargement, avec
  notification native quand la fenêtre est en arrière-plan.
- **Publication** (texte, images, emoji), **réponse**, **j'aime**,
  **repartage**, **signets**, **suppression** de ses propres publications —
  les mêmes écritures que le site, sur les mêmes collections.
- **Notifications** de l'application, **profil**, **recherche** dans le fil.
- **Icône dans la zone de notification** : un clic réveille la fenêtre, le
  menu donne accès à l'ouverture, à la mise à jour et à la sortie.
- **Une seule instance** : relancer l'application réveille la fenêtre
  existante.
- **Mémorisation de la fenêtre** : taille et position retrouvées au
  redémarrage.
- **Démarrage avec Windows** (option, désactivée par défaut).
- **Thème clair ou sombre** selon le système, sans rechargement.

---

## À savoir

- L'application est **hors ligne** pour la lecture : le fil servi vient du
  cache local, les écritures sont mises en file d'attente et synchronisées
  au retour du réseau.
- Elle lit et écrit dans le **même projet Firebase** que le site : une
  publication faite dans l'application apparaît immédiatement sur le site,
  et réciproquement.
- La fenêtre se **ferme sans quitter** l'application (l'icône reste dans la
  zone de notification). Pour vraiment quitter : menu de l'icône →
  « Quitter ».
- Le dossier `desktop/` est **exclu du déploiement Vercel** et de la
  compilation du site (`.vercelignore`, `tsconfig.json`) : les deux projets
  sont totalement indépendants.
