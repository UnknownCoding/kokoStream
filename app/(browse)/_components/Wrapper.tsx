"use client"
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import React from 'react'

const Wrapper = ({children}:{children:React.ReactNode}) => {
    const {collapsed} = useSidebar((state)=>state)
    return (
        <aside className={cn('fixed left-0 flex flex-col h-full bg-background w-60 border-r border-[#2D2E35] z-50 transition-all ease-in-out duration-200',collapsed && "w-[70px]")} >
            {children}
        </aside>
    )
}

export default Wrapper