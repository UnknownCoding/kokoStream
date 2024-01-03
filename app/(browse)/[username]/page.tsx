import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import Actions from './component/actions'
import { isBlockedByUser } from '@/lib/block-service'
import StreamPlayer from '@/app/(dashboard)/u/[username]/_components/StreamPlayer'

interface PageProps{
    params:{
        username:string
    }
}

const page = async ({params:{username}}:PageProps) => {
    const user = await getUserByUsername(username)
    if(!user){
        notFound()
    }
    const isFollowing = await isFollowingUser(user.id)
    const isBlockedByThisUser = await isBlockedByUser(user.id)
    if(isBlockedByThisUser){
        notFound()
    }
    return (
        // @ts-ignore
        <StreamPlayer stream={user.streams} isFollowing user={user}/>
    )
}

export default page