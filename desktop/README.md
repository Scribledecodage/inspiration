# Inspiration — application de bureau Windows

Application de bureau du réseau social Inspiration. Elle reprend **l'interface
du site, telle quelle** : les mêmes composants React, les mêmes pages, les
mêmes styles — compilés dans un binaire Rust, sans Chromium embarqué.

---

## L'architecture en une phrase

> Le dossier `desktop/` compile **le code du site** (`../src`) et n'ajoute
> que ce qu'une application de bureau apporte : une fenêtre native, la zone
> de notification, les notifications Windows, le démarrage avec Windows, et
> les mises à jour automatiques signées.

Aucune duplication : le fil, la messagerie, les réglages, la création de
compte, l'édition de profil, les statuts… **tout le code du site est
utilisé tel quel**. Quand tu modifies un composant du site, l'application de
bureau en hérite immédiatement.

### Ce qui remplace Next.js

Le site n'utilise que quatre choses de Next.js. Chacune a son équivalent
local, écrit pour l'application de bureau :

| Dans le site  | Dans l'application     | Rôle                                                                                     |
| ------------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| `next/router` | `src/shims/router.tsx` | Historique du navigateur, `asPath`, `query`, `push`, `replace`, `back`                   |
| `next/link`   | `src/shims/link.tsx`   | Liens internes (navigation sans rechargement) et liens externes (navigateur du système)  |
| `next/image`  | `src/shims/image.tsx`  | Simple `<img>` : le WebView met l'image en cache, il n'y a pas de serveur d'optimisation |
| `next/head`   | `src/shims/head.tsx`   | Titre de la fenêtre (les balises Open Graph n'ont pas d'intérêt hors du web)             |

Le reste (Firebase, Auth, Thème, les hooks, les composants) est **le code
du site**, importé tel quel.

---

## Pourquoi ce moteur

Le choix n'est pas Electron. Voici le comparatif (ordres de grandeur
connus, mesurés sur des applications comparables) :

|                          | **Tauri 2 (ici)**                 | Electron         |
| ------------------------ | --------------------------------- | ---------------- |
| Taille de l'installateur | **quelques Mo**                   | 80 à 200 Mo      |
| Mémoire au repos         | **30 à 60 Mo**                    | 150 à 400 Mo     |
| Démarrage                | **< 0,5 s**                       | 1 à 3 s          |
| Moteur embarqué          | **aucun** (WebView2 du système)   | Chromium complet |
| Langage du moteur        | **Rust** (sans garbage collector) | Node.js          |

Conséquences concrètes :

- **Batterie** : pas de navigateur caché qui tourne en arrière-plan, pas de
  moteur JavaScript à alimenter. Le CPU dort tant que l'application n'affiche
  rien.
- **Wifi** : le fil passe par l'écoute Firestore, qui ne télécharge que les
  différences. Le cache local est persistant : l'application s'ouvre
  instantanément et fonctionne hors connexion.
- **Stockage** : l'installateur fait quelques mégaoctets, contre plus de cent
  pour un Electron. Les images du site sont redimensionnées à la volée
  (`scripts/copy-assets.mjs`) : 9,8 Mo deviennent 1,5 Mo, sans différence
  visible à l'écran.

Le moteur est en **Rust**, l'interface est le **React du site**, le CSS est
le **Tailwind du site**. Aucune bibliothèque supplémentaire.

---

## Structure

```
desktop/
├─ src/                     Point d'entrée de l'application de bureau
│  ├─ main.tsx              Montage + feuille de style du site
│  ├─ app.tsx               Coquille : mêmes fournisseurs que pages/_app.tsx
│  ├─ routes.tsx            Les pages du site, indexées par URL
│  ├─ native.ts             Pont natif (mises à jour, notifications)
│  ├─ updater.ts            Téléchargement et installation des mises à jour
│  └─ shims/                Les quatre équivalents de Next.js
├─ src-tauri/               Moteur (Rust)
│  ├─ src/lib.rs            Fenêtre, barre de notification, plugins
│  ├─ tauri.conf.json       Fenêtre, installateur, mise à jour
│  └─ capabilities/         Permissions accordées à l'interface
├─ scripts/
│  ├─ release.mjs           Publication d'une version signée
│  └─ copy-assets.mjs       Copies et redimensionne les images du site
└─ public/                  Images du site, allégées
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
node scripts/copy-assets.mjs   # images du site, allégées

npm run tauri:dev      # lance l'application en mode développement
npm run tauri:build    # génère l'installateur (EXE)
npm run release        # compile, signe et prépare la mise à jour
```

L'installateur produit se trouve dans :

```
src-tauri/target/release/bundle/nsis/Inspiration_1.0.0_x64-setup.exe
```

C'est un **EXE unique** de quelques mégaoctets : un double-clic, une
installation, un raccourci dans le menu Démarrer. L'installation est **par
utilisateur** (`currentUser`) : pas de droits administrateur, pas de clé de
registre système, désinstallation propre.

---

## Mise à jour automatique

Le système est complet et sûr :

1. **Signature obligatoire.** Chaque paquet est signé avec une clé
   minisign. La clé privée (`.keys/inspiration.key`) ne quitte jamais la
   machine qui publie. La clé publique est embarquée dans l'application :
   elle refuse d'installer une mise à jour dont la signature ne correspond
   pas.
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

**C'est automatique** : il suffit de pousser un tag.

```bash
# La version de l'application est calée sur celle du tag.
npm version 1.0.1 --no-git-tag-version   # optionnel : le workflow le fait
git tag -a v1.0.1 -m "Version 1.0.1"
git push origin main
git push origin v1.0.1
```

Le workflow GitHub (`.github/workflows/release.yml`) exécute alors, sur Windows :

1. l'installation des dépendances du site et de l'application ;
2. la copie des images et le téléchargement des polices ;
3. l'alignement de la version sur le tag ;
4. la compilation, la **signature** de l'installateur et la génération du
   manifeste `latest.json` ;
5. la publication de la release, avec l'installateur, sa signature et le
   manifeste.

L'application installée détecte la nouvelle version (au démarrage, puis
toutes les six heures), la télécharge en tâche de fond et l'installe
silencieusement.

La clé de signature est un **secret du dépôt**
(`TAURI_SIGNING_PRIVATE_KEY` et `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`) :
elle n'est jamais versionnée. **Si vous la perdez, plus aucune mise à jour
ne pourra être signée.**

Pour changer de dépôt ou d'adresse de déploiement, tout est regroupé dans
`src/site-url.ts` (adresse du site, dépôt GitHub, adresse du manifeste).

---

## Fonctionnalités

Tout ce que le site sait faire, plus ce que le bureau apporte en plus :

- **Connexion** par e-mail / mot de passe ou Google, inscription comprise.
- **Fil en direct**, **messagerie**, **notifications**, **recherche**,
  **statuts**, **signets**, **réglages**, **édition de profil** : les pages
  du site, à l'identique.
- **Notifications Windows** lorsqu'une publication arrive et que la fenêtre
  est en arrière-plan.
- **Icône dans la zone de notification** : un clic réveille la fenêtre, le
  menu donne accès à l'ouverture, à la mise à jour et à la sortie.
- **Une seule instance** : relancer l'application réveille la fenêtre
  existante.
- **Mémorisation de la fenêtre** : taille et position retrouvées au
  redémarrage.
- **Démarrage avec Windows** (option, désactivée par défaut).
- **Thème clair, sombre ou « dim »** : celui du site, avec le choix
  enregistré dans les réglages du site.

---

## À savoir

- L'application lit et écrit dans le **même projet Firebase** que le site :
  une publication faite dans l'application apparaît immédiatement sur le
  site, et réciproquement. Les comptes sont les mêmes.
- Les quelques requêtes que le site adresse à son propre serveur
  (téléversement d'images, d'avatars et de bannières, GIF, tendances,
  assistant) sont faites **par la couche native** : elles ne sont donc pas
  bloquées par les règles CORS du navigateur, et l'application n'a besoin
  d'aucun serveur. Elles visent le même déploiement que le site (voir
  `src/site-url.ts`).
- Elle est **hors ligne pour la lecture** : le fil servi vient du cache
  local, les écritures sont mises en file d'attente et synchronisées au
  retour du réseau.
- La fenêtre se **ferme sans quitter** l'application (l'icône reste dans la
  zone de notification). Pour vraiment quitter : menu de l'icône →
  « Quitter ».
- Le dossier `desktop/` est **exclu du déploiement Vercel** et de la
  compilation du site (`.vercelignore`, `tsconfig.json`) : les deux projets
  sont totalement indépendants.
- Les dépendances sont **verrouillées sur les versions du site**
  (`overrides` dans `package.json`) : l'application se comporte exactement
  comme le site.
