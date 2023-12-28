"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { users } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import UserAvi from '@/components/UserAvi'
import LiveBadge from '@/components/LiveBadge'
import { Skeleton } from '@/components/ui/skeleton'

interface RecommendedProps{
    imageUrl:string
    isLive?:boolean
    username:String
}


const UserItem = ({imageUrl,isLive,username}:RecommendedProps) => {
    const pathname = usePathname()
    const {collapsed} = useSidebar((state=>state))
    const href = `/${username}`
    const isActive = pathname === href

    return (
        <Button variant="ghost" asChild className={cn("w-full flex items-center h-12",isActive&&"bg-accent")}>
            <Link href={href}>
                <div className={cn("flex items-center w-full gap-x-4",collapsed && "justify-center")}>
                    <UserAvi imageUrl={imageUrl} username={username} isLive={isLive} size="default"/>
                    {!collapsed && (
                        <p className='truncate'>{username}</p>
                    )}
                    {!collapsed && isLive && (
                        <LiveBadge className='ml-auto'/>
                    )}
                </div>
            </Link>
        </Button>
    )
}


export default UserItem

export const UserItemSkeleton = () =>{
    return(
        <li className="flex items-center gap-x-4 px-3 py-2 ">
            <Skeleton className='min-h-[32px] min-w-[32px] rounded-full '/>
            <div className='flex-1'>
                <Skeleton className='h-6'/>
            </div>      
        </li>
    )
}