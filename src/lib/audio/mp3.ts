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
 */

type Mp3EncoderInstance = {
  encodeBuffer(left: Int16Array, right?: Int16Array): Int8Array;
  flush(): Int8Array;
};

type Mp3EncoderConstructor = new (
  channels: number,
  sampleRate: number,
  kbps: number
) => Mp3EncoderInstance;

type GlobalScope = typeof globalThis & {
  lamejs?: { Mp3Encoder: Mp3EncoderConstructor };
};

/** Le script est copié dans `public/vendor` par le script `vendor`. */
const BUNDLE_URL = '/vendor/lame.min.js';

let loading: Promise<Mp3EncoderConstructor> | null = null;

const loadScript = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = BUNDLE_URL;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error('mp3-encoder-unavailable'));

    document.head.appendChild(script);
  });

/** Renvoie le constructeur d'encodeur MP3, en le chargeant au plus une fois. */
export async function getMp3Encoder(): Promise<Mp3EncoderConstructor> {
  const scope = globalThis as GlobalScope;

  if (scope.lamejs?.Mp3Encoder) return scope.lamejs.Mp3Encoder;

  if (!loading)
    loading = loadScript()
      .then(() => {
        const encoder = scope.lamejs?.Mp3Encoder;

        if (!encoder) throw new Error('mp3-encoder-unavailable');

        return encoder;
      })
      .catch((error: unknown) => {
        /* On permet un nouvel essai si le premier chargement a échoué. */
        loading = null;

        throw error;
      });

  return loading;
}