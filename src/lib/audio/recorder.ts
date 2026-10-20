/**
 * Capture du microphone pour les messages vocaux.
 *
 * On enregistre les échantillons PCM avec la Web Audio API plutôt qu'avec
 * `MediaRecorder`. Le fichier produit par ce dernier (webm sur Chrome/Firefox,
 * mp4 sur Safari/iOS) n'est pas toujours décodable par `decodeAudioData`, ce
 * qui empêchait l'envoi du message sur plusieurs navigateurs — iOS/Safari en
 * particulier.
 *
 * `AudioWorklet` est utilisé quand il est disponible (pas de perte de son même
 * si l'interface travaille) ; `ScriptProcessorNode` sert de repli pour les
 * navigateurs plus anciens.
 */

import { encodePcmVoiceNote, type EncodedVoiceNote } from '@lib/audio/voice';

const WORKLET_URL = '/vendor/voice-worklet.js';
const WORKLET_NAME = 'voice-capture';

/* Le module n'est chargé qu'une fois par contexte : certains navigateurs
   refusent d'enregistrer deux fois le même processeur. */
const workletReady = new WeakMap<AudioContext, Promise<void>>();

function loadWorklet(context: AudioContext): Promise<void> {
  const existing = workletReady.get(context);

  if (existing) return existing;

  const loading = context.audioWorklet.addModule(WORKLET_URL).catch((error) => {
    workletReady.delete(context);
    throw error;
  });

  workletReady.set(context, loading);

  return loading;
}

type AudioContextConstructor = typeof AudioContext;

type AudioWindow = Window & {
  webkitAudioContext?: AudioContextConstructor;
};

function getAudioContextConstructor(): AudioContextConstructor | null {
  if (typeof window === 'undefined') return null;

  const scope = window as AudioWindow;

  return window.AudioContext ?? scope.webkitAudioContext ?? null;
}

/*
 * Un seul contexte audio est conservé pour toute la page. Sur iOS/Safari, un
 * contexte créé hors d'un geste utilisateur reste suspendu : on le débloque
 * donc dès le clic sur le bouton micro (`unlockVoiceAudio`), puis on le
 * réutilise pour l'enregistrement.
 */
let sharedContext: AudioContext | null = null;

/**
 * Crée (ou réveille) le contexte audio pendant un geste utilisateur.
 *
 * À appeler directement dans le `onClick` du bouton d'enregistrement, avant
 * toute opération asynchrone, sinon iOS bloque la capture.
 */
export function unlockVoiceAudio(): void {
  const AudioContextClass = getAudioContextConstructor();

  if (!AudioContextClass) return;

  try {
    if (!sharedContext || sharedContext.state === 'closed')
      sharedContext = new AudioContextClass();

    if (sharedContext.state === 'suspended')
      void sharedContext.resume().catch(() => undefined);
  } catch {
    sharedContext = null;
  }
}

export type VoiceCapture = {
  /** Arrête la capture et renvoie le message vocal encodé en MP3. */
  stop: () => Promise<EncodedVoiceNote | null>;
  /** Arrête la capture sans rien produire (annulation). */
  cancel: () => void;
};

type WorkletCapture = {
  node: AudioWorkletNode;
  mute: GainNode;
};

async function startWorkletCapture(
  context: AudioContext,
  source: MediaStreamAudioSourceNode,
  onChunk: (chunk: Float32Array) => void
): Promise<WorkletCapture> {
  if (!context.audioWorklet || typeof AudioWorkletNode === 'undefined')
    throw new Error('worklet-unavailable');

  await loadWorklet(context);

  const node = new AudioWorkletNode(context, WORKLET_NAME, {
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 1,
    channelCountMode: 'explicit',
    channelInterpretation: 'speakers'
  });

  const mute = context.createGain();
  mute.gain.value = 0;

  node.port.onmessage = (event: MessageEvent) => {
    const data: unknown = event.data;

    if (data instanceof Float32Array && data.length > 0) onChunk(data);
  };

  try {
    source.connect(node);
    node.connect(mute);
    mute.connect(context.destination);
  } catch (error) {
    try {
      node.port.onmessage = null;
      node.disconnect();
      mute.disconnect();
      source.disconnect();
    } catch {
      /* Les nœuds déjà déconnectés n'ont rien à faire. */
    }

    throw error;
  }

  return { node, mute };
}

/**
 * Démarre la capture d'un flux micro.
 *
 * Le flux doit provenir de `getUserMedia({ audio: true })`. L'appelant reste
 * responsable de l'arrêt des pistes du flux.
 */
export async function startVoiceCapture(
  stream: MediaStream
): Promise<VoiceCapture> {
  const AudioContextClass = getAudioContextConstructor();

  if (!AudioContextClass) throw new Error('audio-context-unavailable');

  if (!sharedContext || sharedContext.state === 'closed')
    sharedContext = new AudioContextClass();

  const context = sharedContext;

  if (context.state === 'suspended') await context.resume();

  const source = context.createMediaStreamSource(stream);
  const chunks: Float32Array[] = [];
  let stopped = false;
  let stopping = false;

  const collect = (chunk: Float32Array): void => {
    if (!stopped) chunks.push(chunk);
  };

  let worklet: WorkletCapture | null = null;

  try {
    worklet = await startWorkletCapture(context, source, collect);
  } catch {
    worklet = null;
  }

  let processor: ScriptProcessorNode | null = null;
  let mute: GainNode | null = null;

  if (!worklet) {
    /* Repli pour les navigateurs sans AudioWorklet. Le nœud doit être relié à
       la sortie pour être appelé ; le gain nul évite tout retour du micro. */
    processor = context.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = (event) => {
      collect(new Float32Array(event.inputBuffer.getChannelData(0)));
    };

    mute = context.createGain();
    mute.gain.value = 0;

    source.connect(processor);
    processor.connect(mute);
    mute.connect(context.destination);
  }

  const cleanup = (): void => {
    if (worklet) {
      try {
        worklet.node.port.onmessage = null;
        worklet.node.port.postMessage('close');
        worklet.node.disconnect();
        worklet.mute.disconnect();
      } catch {
        /* Déjà déconnecté. */
      }
    }

    if (processor) {
      processor.onaudioprocess = null;
      processor.disconnect();
    }

    mute?.disconnect();
    source.disconnect();
  };

  const flushWorklet = (): Promise<void> =>
    new Promise((resolve) => {
      if (!worklet) return resolve();

      const node = worklet.node;
      const timeout = setTimeout(done, 400);

      function done(): void {
        clearTimeout(timeout);
        node.port.onmessage = null;
        resolve();
      }

      node.port.onmessage = (event: MessageEvent) => {
        const data: unknown = event.data;

        if (data === 'flushed') done();
        else if (data instanceof Float32Array && data.length > 0) collect(data);
      };

      node.port.postMessage('flush');
    });

  const stop = async (): Promise<EncodedVoiceNote | null> => {
    if (stopped || stopping) return null;

    stopping = true;

    /* On récupère d'abord le dernier paquet en attente dans le worklet : il ne
       doit pas être ignoré comme le reste pendant l'arrêt. */
    await flushWorklet();

    stopped = true;
    cleanup();

    let total = 0;

    for (const chunk of chunks) total += chunk.length;

    if (!total) return null;

    const samples = new Float32Array(total);
    let offset = 0;

    for (const chunk of chunks) {
      samples.set(chunk, offset);
      offset += chunk.length;
    }

    chunks.length = 0;

    return encodePcmVoiceNote(samples, context.sampleRate);
  };

  const cancel = (): void => {
    if (stopped) return;

    stopping = true;
    stopped = true;
    cleanup();
    chunks.length = 0;
  };

  return { stop, cancel };
}
