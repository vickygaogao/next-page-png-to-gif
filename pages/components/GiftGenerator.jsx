"use client";


import Image from "next/image";
import { useState } from 'react';

export default function GifGenerator() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ gifUrl, setGifUrl ] = useState('')



  const generateGift = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-gif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create GIF");
      }

      // 添加时间戳来避免缓存
      setGifUrl(`/output.gif?t=${new Date().getTime()}`);


    } catch (error) {
      console.error('Error generating GIF:', error)
    } finally {
      setIsLoading(false)
    }
    
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={generateGift} className="bg-white text-black w-[100px] h-[50px]">
        {
          isLoading ? '生成中...' : '生成'
        }
        </button>

        {
          gifUrl && (<Image
            className="dark:invert"
            src={gifUrl}
            alt="gift"
            width={180}
            height={38}
            priority
          />)
        }
       
      </main>
      
    </div>
  );
}