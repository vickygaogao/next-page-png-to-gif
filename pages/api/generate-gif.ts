import { NextApiRequest, NextApiResponse } from 'next';
import GIFEncoder from 'gifencoder';
import { createCanvas, loadImage } from 'canvas';
import fs from "fs";
import path from 'path'

interface RequestBody {
  imageUrls: string[]; // Array of base64 encoded images
}

// // 定义允许的 HTTP 方法
// export const dynamic = 'force-dynamic';

// // 处理 OPTIONS 请求（用于 CORS）
// export async function OPTIONS() {
//     return new NextResponse(null, {
//         status: 200,
//         headers: {
//             'Access-Control-Allow-Methods': 'POST',
//             'Access-Control-Allow-Headers': 'Content-Type',
//         },
//     });
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }

  try {
    const imageUrls = [
      `/camera2.png`,
      `/contact.png`,
      `/doc.png`
    ]

    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, "output.gif");
    const writeStream = fs.createWriteStream(outputPath);

    // 创建 GIF 编码器
    const encoder = new GIFEncoder(217, 217); // 设置 GIF 尺寸
    
    // 创建输出流
    encoder.createReadStream().pipe(writeStream);;
    // const chunks: any[] = [];
    
    // buffer.on('data', (chunk) => chunks.push(chunk));
    
    // 设置 GIF 参数
    encoder.setRepeat(0);   // 0 表示循环播放
    encoder.setDelay(500);  // 每帧延迟 500ms
    encoder.setQuality(10); // 图片质量
    encoder.start();

    
    // 创建 canvas
    const canvas = createCanvas(217, 217);
    const ctx  = canvas.getContext('2d');
    
    // 处理每张图片
    for (const url of imageUrls) {
      const publicPath = path.join(process.cwd(), 'public', url.split('/').pop()!)
      const image = await loadImage(publicPath)
      ctx.drawImage(image, 0, 0, 217, 217);
      encoder.addFrame(ctx as unknown as CanvasRenderingContext2D);
    }
    
    encoder.finish();

    // const buffer = encoder.out.getData();
    
    
    // 将 buffer 转换为 base64
    // const buffer64 = Buffer.concat(chunks).toString('base64');
    
    res.setHeader('Content-Type', 'image/gif');
    return res.status(200).json({ success: true });
  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'Error generating GIF', error });
  }
}