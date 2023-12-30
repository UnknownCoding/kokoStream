"use client"
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { useUser } from '@clerk/nextjs'
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import NavItem, { NavItemSkeleton } from './NavItem'

const Navigation = () => {
    const pathname = usePathname()
    const user = useUser()

    const routes = [
        {
            label:"Stream",
            href:`/u/${user.user?.username}`,
            icon:Fullscreen
        },
        {
            label:"Keys",
            href:`/u/${user.user?.username}/keys`,
            icon:KeyRound
        },
        {
            label:"Chat",
            href:`/u/${user.user?.username}/chat`,
            icon:MessageSquare
        },  
        {
            label:"Community",
            href:`/u/${user.user?.username}/community`,
            icon:Users
        },
    ]
    if(!user.user?.username){
        return(
            <ul className='space-y-2'>
                {[...Array(3)].map((_,i)=>(
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        )
    }
    return (
        <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
            {routes.map((rts,i)=>(
                <NavItem key={i} label={rts.label} Icon={rts.icon} href={rts.href} active={pathname === rts.href}/>
            ))}
        </ul>
    )
}

export default Navigation