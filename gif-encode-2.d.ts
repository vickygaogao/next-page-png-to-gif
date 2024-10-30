declare module 'gif-encoder-2' {
  export default class GIFEncoder {
    constructor(width: number, height: number);
    
    start(): void;
    setRepeat(repeat: number): void; // 0 for repeat, -1 for no-repeat
    setDelay(delay: number): void; // Delay in milliseconds
    setQuality(quality: number): void; // Lower is better quality
    addFrame(buffer: CanvasRenderingContext2D): void; // Add a frame
    finish(): void; // Finish the GIF
    createReadStream(): NodeJS.ReadableStream; // Create a readable stream for the GIF
    // out 属性的类型声明
    out: {
      getData(): Buffer; // 返回生成的 GIF 数据
      createReadStream(): Readable; // 创建一个可读流以读取 GIF 数据
    };
  }
}