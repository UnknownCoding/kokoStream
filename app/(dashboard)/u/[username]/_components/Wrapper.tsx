"use client"
import React from 'react'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { cn } from '@/lib/utils'

const Wrapper = ({children}:{children:React.ReactNode}) => {
    const {collapsed} = useCreatorSidebar((state)=>state)

    return (
        <aside className={cn('fixed left-0 flex flex-col h-full bg-background w-[70px] lg:w-60 border-r border-[#2D2E35] z-50 transition-all ease-in-out duration-200', collapsed && "lg:w-[70px]")} >
            {children}
        </aside>
    ) 
}

export default Wrapper