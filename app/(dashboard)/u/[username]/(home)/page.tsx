import { getUserByUsername } from '@/lib/user-service'
import { currentUser } from '@clerk/nextjs'
import React from 'react'
import StreamPlayer from '../_components/StreamPlayer'

interface PageProps{
    params:{username:string}
}

const page = async ({params}:PageProps) => {
    const externalUser = await currentUser()
    const user = await getUserByUsername(params.username)
    if(!user || user?.externalUserId !== externalUser?.id || !user?.streams){
        throw new Error("unauthorized access")
    }
    return (
        
        <div className='h-full w-full'>
            <StreamPlayer stream={user.streams} user={user} isFollowing/>
        </div>
    )
}

export default page