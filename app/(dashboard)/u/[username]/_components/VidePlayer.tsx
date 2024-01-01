import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import React from 'react'
import OfflineVideo from './OfflineVideo';
import LoadingVideo from './LoadingVideo';
import LiveVideo from './LiveVideo';

interface VideoPlayerProps{
    host:string
    hostIdentity:string
}

const VidePlayer = ({host,hostIdentity}:VideoPlayerProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity);
    
    let content;

    if (connectionState !== ConnectionState.Connected || !participant) {
        content = <OfflineVideo username={host}/>
    }else if(!participant || tracks.length === 0){
        content = <LoadingVideo label={connectionState}/>
    }else{
        content = <LiveVideo participant={participant}/>
    }
    
    return (
        // try out the various aspect ratios
        <div className='aspect-video border-b group relative'>
            {content}
        </div>
    )
}

export default VidePlayer