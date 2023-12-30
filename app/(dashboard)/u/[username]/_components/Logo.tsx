import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const font = Poppins({
    subsets:["latin"],
    weight:["200","300","400","500","600","700","800"]
})
export const Logo = () => {
    return (
        <Link href="/">
            <div className='flex gap-x-4 items-center transition-all duration-300 hover:opacity-75 '>
                <div className='bg-white rounded-full p-1 mr-8 lg:mr-0 flex-shrink-0'>
                    <Image src='./squarylines.svg' height="32" width="32" alt=''/>
                </div>
                <div className={cn("hidden lg:inline-block",font.className)}>
                    <p className='text-lg font-semibold'>kokoStream</p>
                    <p className='text-xs text-muted-foreground'>Creator Dashboard</p>
                </div>
            </div>
        </Link>
    )
}