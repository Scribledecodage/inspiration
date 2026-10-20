/**
 * Encodage des messages vocaux.
 *
 * Ce module est partagé par la messagerie et la barre de publication : les
 * deux offrent le même micro, la même conversion en MP3 et les mêmes limites.
 */

/** Durée maximale d'un enregistrement. */
export const MAX_RECORD_SECONDS = 120;

/*
 * Le message vocal est converti en MP3 : c'est le seul format à la fois lu par
 * Safari, Chrome, Firefox et Android, et bien plus léger qu'un WAV — ce qui
 * compte pour un fichier envoyé en base64 dans une requête.
 */
export const MP3_SAMPLE_RATE = 22050;
export const MP3_BITRATE = 48;

/* L'encodeur travaille par blocs de taille fixe. */
const MP3_BLOCK_SIZE = 1152;

export type EncodedVoiceNote = {
  blob: Blob;
  /** Durée exacte, calculée sur les échantillons capturés. */
  duration: number;
  /** Type MIME réel du fichier produit (MP3, ou WAV en secours). */
  mimeType: string;
  /** Extension correspondante, sans le point. */
  extension: string;
};

/** Convertit un échantillon flottant en entier 16 bits, comme l'attend LAME. */
function toInt16(sample: number): number {
  const clamped = Math.max(-1, Math.min(1, sample));

  return clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
}

/**
 * Produit un WAV mono 16 bits.
 *
 * Secours quand l'encodeur MP3 ne peut pas être chargé (script bloqué, navigateur
 * très ancien) : un WAV est plus lourd, mais il est lu par tous les appareils.
 */
function encodeWav(pcm: Int16Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + pcm.length * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, value: string): void => {
    for (let index = 0; index < value.length; index++)
      view.setUint8(offset + index, value.charCodeAt(index));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcm.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcm.length * 2, true);

  new Int16Array(buffer, 44).set(pcm);

  return new Blob([buffer], { type: 'audio/wav' });
}

/**
 * Convertit des échantillons PCM (mono, flottants) en message vocal.
 *
 * On encode directement le son capturé par le micro au lieu de décoder le
 * fichier produit par `MediaRecorder` : selon le navigateur (Safari et iOS en
 * particulier), ce fichier mp4/webm n'est pas décodable par `decodeAudioData`
 * alors qu'il est parfaitement lisible dans une balise `<audio>`. C'est ce qui
 * provoquait « Ce navigateur ne permet pas d'enregistrer un message vocal. »
 *
 * L'encodage MP3 se fait par blocs entrecoupés d'un temps d'attente : sur un
 * long message, cela évite de figer l'interface pendant plusieurs secondes.
 * Si l'encodeur MP3 est indisponible, on renvoie un WAV : plus lourd, mais
 * lisible partout.
 *
 * Renvoie `null` si aucun échantillon exploitable n'a été capturé.
 */
export async function encodePcmVoiceNote(
  samples: Float32Array,
  sourceRate: number
): Promise<EncodedVoiceNote | null> {
  if (!samples.length || !Number.isFinite(sourceRate) || sourceRate <= 0)
    return null;

  const duration = samples.length / sourceRate;

  if (!Number.isFinite(duration) || duration <= 0) return null;

  /* Ré-échantillonne à la fréquence du MP3, avec une interpolation linéaire
     pour ne pas ajouter de bruit sur les aigus. */
  const length = Math.max(1, Math.ceil(duration * MP3_SAMPLE_RATE));
  const pcm = new Int16Array(length);

  for (let index = 0; index < length; index++) {
    const position = (index / MP3_SAMPLE_RATE) * sourceRate;
    const current = Math.min(samples.length - 1, Math.floor(position));
    const next = Math.min(samples.length - 1, current + 1);
    const fraction = position - current;
    const value = samples[current] * (1 - fraction) + samples[next] * fraction;

    pcm[index] = toInt16(value);
  }

  try {
    /* `encodeBuffer` attend un Int16Array : on découpe donc les échantillons en
       sous-chaînes de taille fixe avant d'encoder. */
    const blocks: Int16Array[] = [];

    for (let offset = 0; offset < pcm.length; offset += MP3_BLOCK_SIZE)
      blocks.push(pcm.subarray(offset, offset + MP3_BLOCK_SIZE));

    const { getMp3Encoder } = await import('@lib/audio/mp3');
    const Mp3Encoder = await getMp3Encoder();

    const encoder = new Mp3Encoder(1, MP3_SAMPLE_RATE, MP3_BITRATE);
    const chunks: Int8Array[] = [];

    for (let index = 0; index < blocks.length; index++) {
      const encoded = encoder.encodeBuffer(blocks[index]);

      /* Un bloc ignoré renvoie un tableau vide : inutile de le stocker. */
      if (encoded.length > 0) chunks.push(encoded);

      /* On rend la main au navigateur entre les blocs. */
      if (index % 16 === 0)
        await new Promise((resolve) => setTimeout(resolve, 0));
    }

    const flushed = encoder.flush();
    if (flushed.length > 0) chunks.push(flushed);

    if (chunks.length === 0) throw new Error('mp3-empty');

    return {
      blob: new Blob(chunks as BlobPart[], { type: 'audio/mpeg' }),
      duration,
      mimeType: 'audio/mpeg',
      extension: 'mp3'
    };
  } catch {
    /* L'encodeur MP3 n'a pas pu être chargé : un WAV reste préférable à un
       message vocal impossible à envoyer. */
    return {
      blob: encodeWav(pcm, MP3_SAMPLE_RATE),
      duration,
      mimeType: 'audio/wav',
      extension: 'wav'
    };
  }
}

/** Convertit un fichier en base64, sans le préfixe data URL. */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';

      resolve(result.replace(/^data:[^;]+;base64,/, ''));
    };
    reader.onerror = () => reject(new Error('read-error'));

    reader.readAsDataURL(blob);
  });
}
