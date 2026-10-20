"use strict";
exports.id = 3743;
exports.ids = [3743];
exports.modules = {

/***/ 3743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMp3Encoder": () => (/* binding */ getMp3Encoder)
/* harmony export */ });
/**
 * Encodage MP3 pour les messages vocaux.
 *
 * `lamejs` pose deux problèmes avec les bundlers modernes :
 *
 *  1. Son point d'entrée (`lamejs`) charge des modules CommonJS qui s'appuient
 *     sur des variables globales : le paquet échoue avec « MPEGMode is not
 *     defined » dès qu'il est réécrit.
 *  2. Le fichier `lame.min.js` est un script autonome, mais il ne déclare
 *     aucun export : l'importer ne donne rien d'utile.
 *
 * On charge donc ce script depuis `public/vendor` avec une balise `<script>`.
 * Il s'auto-exécute (`lamejs();`) et publie l'encodeur sur `window.lamejs`.
 */ /** Le script est copié dans `public/vendor` par le script `vendor`. */ const BUNDLE_URL = "/vendor/lame.min.js";
let loading = null;
const loadScript = ()=>new Promise((resolve, reject)=>{
        const script = document.createElement("script");
        script.src = BUNDLE_URL;
        script.async = true;
        script.onload = ()=>resolve();
        script.onerror = ()=>reject(new Error("mp3-encoder-unavailable"));
        document.head.appendChild(script);
    });
/** Renvoie le constructeur d'encodeur MP3, en le chargeant au plus une fois. */ async function getMp3Encoder() {
    const scope = globalThis;
    if (scope.lamejs?.Mp3Encoder) return scope.lamejs.Mp3Encoder;
    if (!loading) loading = loadScript().then(()=>{
        const encoder = scope.lamejs?.Mp3Encoder;
        if (!encoder) throw new Error("mp3-encoder-unavailable");
        return encoder;
    }).catch((error)=>{
        /* On permet un nouvel essai si le premier chargement a échoué. */ loading = null;
        throw error;
    });
    return loading;
}


/***/ })

};
;