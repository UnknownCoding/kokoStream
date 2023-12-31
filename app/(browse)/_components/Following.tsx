"use client"
import { useSidebar } from '@/store/use-sidebar'
import { follow, stream, users } from '@prisma/client'
import React from 'react'
import UserItem, { UserItemSkeleton } from './UserItem'

interface FollowProps{
    data:(follow & {following:users & {streams: {isLive:boolean} | null}})[]
}

const Following = ({data}:FollowProps) => {
    const {collapsed} = useSidebar((state)=>state)
    if(!data.length){
        return null
    }
    return (
        <div>
            {!collapsed && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Following
                    </p>
                </div>
            )}
            <ul className='space-y-2 px-2 '>
                {data?.map(({following})=>(
                    <UserItem key={following.id} imageUrl={following.imageUrl} isLive={following.streams?.isLive} username={following.username}/> 
                ))}
            </ul>
        </div>
    )
}

export default Following

export const FollowerSkeleton = () => {
    return(
        <ul className='px-2'>
            {[...Array(3)].map((_,i)=>(
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    )
}