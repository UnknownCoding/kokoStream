"use client"
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import React, { useEffect, useState } from 'react'
import { ToggleSkeleton } from './Toggle'
import { RecommendedSkeleton } from './Recommended'

const Wrapper = ({children}:{children:React.ReactNode}) => {
    // 3:56:00 listen carefully to the whole module
    const {collapsed} = useSidebar((state)=>state)
    const [isClient,setIsClient] = useState(false)
    useEffect(()=>{
        setIsClient(true)
    },[])
    if(!isClient){
        return(
            <aside className='fixed left-0 flex flex-col h-full bg-background w-[70px] lg:w-60 border-r border-[#2D2E35] z-50 transition-all ease-in-out duration-200'>
                <ToggleSkeleton/>
                <RecommendedSkeleton/>
            </aside>
        )
    }
    return (
        <aside className={cn('fixed left-0 flex flex-col h-full bg-background w-[70px] lg:w-60 border-r border-[#2D2E35] z-50 transition-all ease-in-out duration-200',collapsed && "lg:w-[70px]")} >
            {children}
        </aside>
    )
}

export default Wrapper