declare module 'gif-encoder-2' {
  export default class GIFEncoder {
    constructor(width: number, height: number);
    
    start(): void;
    setRepeat(repeat: number): void; // 0 for repeat, -1 for no-repeat
    setDelay(delay: number): void; // Delay in milliseconds
    setQuality(quality: number): void; // Lower is better quality
    addFrame(buffer: Buffer): void; // Add a frame
    finish(): void; // Finish the GIF
    createReadStream(): NodeJS.ReadableStream; // Create a readable stream for the GIF
  }
}