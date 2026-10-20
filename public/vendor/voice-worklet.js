/**
 * Capture PCM du micro pour les messages vocaux.
 *
 * Le processeur accumule les échantillons reçus par blocs de 128 frames et les
 * renvoie au fil principal par paquets de 4096, ce qui limite le nombre de
 * messages échangés sans perdre de son.
 */
class VoiceCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.chunk = new Float32Array(4096);
    this.offset = 0;

    this.port.onmessage = (event) => {
      if (event.data !== 'flush') return;

      if (this.offset > 0) {
        this.port.postMessage(this.chunk.slice(0, this.offset));
        this.offset = 0;
      }

      this.port.postMessage('flushed');
    };
  }

  process(inputs) {
    const input = inputs[0];
    const channel = input && input[0];

    if (!channel) return true;

    let read = 0;

    while (read < channel.length) {
      const count = Math.min(
        channel.length - read,
        this.chunk.length - this.offset
      );

      this.chunk.set(channel.subarray(read, read + count), this.offset);
      this.offset += count;
      read += count;

      if (this.offset === this.chunk.length) {
        this.port.postMessage(this.chunk, [this.chunk.buffer]);
        this.chunk = new Float32Array(4096);
        this.offset = 0;
      }
    }

    return true;
  }
}

registerProcessor('voice-capture', VoiceCaptureProcessor);
