import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'

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
    return (
        <div className='flex flex-col gap-y-4'>
            <p>username:{user.username}</p>
            <p>userId:{user.id}</p>
            <p>are you following this user: {JSON.stringify(isFollowing)}</p>
        </div>
    )
}

export default page