"use client"
import { useViewerToken } from '@/hooks/useViewerToken'
import { stream, users } from '@prisma/client'
import React from 'react'

interface StreamPlayerProps{
    user:users & {streams:stream|null}
    stream:stream
    isFollowing:boolean
}


const StreamPlayer = ({stream,user,isFollowing}:StreamPlayerProps) => {
    const {identity,viewerName,viewerToken} = useViewerToken(user.id)
    if(!viewerToken || !viewerName || !identity){
        return(
            <div>
                Unable to view this stream please try again!
            </div>
        )
    }
    return (
        <div>
            Allowed to watch the stream
        </div>
    )
}

export default StreamPlayer