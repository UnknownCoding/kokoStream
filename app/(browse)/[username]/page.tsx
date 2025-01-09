import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import Actions from './_components/actions'
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
        console.log("no userrrrrrrrrrrrrrrrrrrrr")
        notFound()
    }
    const isFollowing = await isFollowingUser(user.id)
    const isBlockedByThisUser = await isBlockedByUser(user.id)
    if(isBlockedByThisUser){
        notFound()
    }
    return (
        // @ts-ignore
        // fix the error here of types
        <StreamPlayer stream={user.streams} isFollowing user={user}/>
    )
}

export default page