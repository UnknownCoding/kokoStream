"use client"
import { useViewerToken } from '@/hooks/useViewerToken'
import { stream, users } from '@prisma/client'
import React from 'react'
import { LiveKitRoom } from "@livekit/components-react";
import VidePlayer from './VidePlayer';

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
        <LiveKitRoom token={viewerToken} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL} className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full ">
            <div className='space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar'>
                <VidePlayer host={user.username} hostIdentity={user.id}/>
            </div>
        </LiveKitRoom>
    )
}

export default StreamPlayer