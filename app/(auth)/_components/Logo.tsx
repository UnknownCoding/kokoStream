import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const font = Poppins({
    subsets:["latin"],
    weight:["200","300","400","500","600","700","800"]
})
export const Logo = () => {
    return (
        <div className='flex flex-col gap-y-4 items-center'>
            <div className='bg-white rounded-full p-1 '>
                <Image src='./squarylines.svg' height="80" width="80" alt=''/>
            </div>
            <div className='flex items-center flex-col'>
                <p className={cn("text-xl font-semibold",font.className)}>kokoStream</p>
                <p className={cn("text-sm text-muted-foreground",font.className)}>Let&apos;s play</p>
            </div>
        </div>
    )
}