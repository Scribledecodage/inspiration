/* `lamejs` est publiée sans typage. On ne déclare que le script autonome
   `lame.min.js`, qui expose un objet global `lamejs` contenant l'encodeur. */
declare module 'lamejs/lame.min.js' {
  export type Mp3EncoderInstance = {
    encodeBuffer(left: Int16Array, right?: Int16Array): Int8Array;
    flush(): Int8Array;
  };

  export const Mp3Encoder: new (
    channels: number,
    sampleRate: number,
    kbps: number
  ) => Mp3EncoderInstance;
}
