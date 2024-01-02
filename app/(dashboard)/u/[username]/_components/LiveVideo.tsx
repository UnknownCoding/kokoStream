"use client"
import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import React, { useEffect, useRef, useState } from 'react'
import FullscreenControls from './FullscreenControls'
import { useEventListener } from 'usehooks-ts'
import VolumeControl from './VolumeControl'


interface LiveVideoProps{
    participant:Participant
}

const LiveVideo = ({ participant }:LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null); 
    const [volume,setVolume] = useState<number>(0)
    const [muted,setMuted] = useState<boolean>(false)

    const onVolumeChange = (value:number) => {
        setVolume(+value)
        if (videoRef?.current) {
            videoRef.current.muted = value === 0
            videoRef.current.volume = +value * 0.01;
        }    
    }
    const onToggleMute = () => {
        const muteState = !muted
        setMuted(muteState);
        setVolume(muteState ? 50 : 0);
        if (videoRef?.current) {
            videoRef.current.muted = muteState;
            videoRef.current.volume = muteState ? 0.5 : 0;
        }
    
    }

    useEffect(()=>{
        setVolume(0)
    },[])

    const [isFullScreen, setIsFullScreen] = useState(false); 

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null
        setIsFullScreen(isCurrentlyFullscreen)
    }

    useEventListener("fullscreenchange",handleFullscreenChange,playerRef)

    const toggleFullscreen = () => {
        if (isFullScreen) {
            document.exitFullscreen().catch((err) => console.error(err));
            // setIsFullScreen(false);
        } else if (playerRef?.current) {
            playerRef.current.requestFullscreen().catch((err) => console.error(err));
            // setIsFullScreen(true);
        }
    }

    useTracks(Object.values(Track.Source)).filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
        if (videoRef.current) {
            track.publication.track?.attach(videoRef.current);
        }
    });

    return (
        <div ref={playerRef} className='h-full relative flex'>
            <video width="100%" ref={videoRef}/>
            <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-t from-neutral-900 px-4">
                    <VolumeControl onChange={onVolumeChange} onToggle={onToggleMute} value={volume}/>
                    <FullscreenControls isFullscreen={isFullScreen} onToggle={toggleFullscreen}/>
                </div>

            </div>
        </div>
    )
}

export default LiveVideo
