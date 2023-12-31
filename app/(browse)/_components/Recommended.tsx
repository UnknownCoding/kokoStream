"use client"
import { useSidebar } from '@/store/use-sidebar'
import { stream, users } from '@prisma/client'
import React from 'react'
import UserItem, { UserItemSkeleton } from './UserItem'

interface RecommendedProps{
    data:(users  & {streams: {isLive:boolean} | null})[]
}

const Recommended = ({data}:RecommendedProps) => {
    // remove the following code ---
    const {collapsed} = useSidebar((state=>state))
    const showLabel = !collapsed && data.length > 0
    return (
        <div>
            {showLabel && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Recommended
                    </p>
                </div>
            )}
            <ul className='space-y-2 px-2 '>
                {data?.map((user)=>(
                    <UserItem key={user.id} imageUrl={user.imageUrl} isLive={user.streams?.isLive} username={user.username}/> 
                ))}
            </ul>
        </div>
    )
}

export default Recommended  

export const RecommendedSkeleton = () => {
    return(
        <ul className='px-2'>
            {[...Array(3)].map((_,i)=>(
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    )
}