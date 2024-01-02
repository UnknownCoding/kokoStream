"use client"
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useParticipants } from '@livekit/components-react'
import React, { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import CommunityItem from './CommunityItem'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'

interface ChatCommunity{
    viewerName:string
    isHidden:boolean
    hostName:string
}

const ChatCommunity = ({hostName,isHidden,viewerName}:ChatCommunity) => {
    const participants = useParticipants()
    const [value,setValue] = useState("")
    const debouncedVal = useDebounce<string>(value,500)
    const onChange = (newValue:string) => {
        setValue(newValue)
    }
    const filteredParticipants = useMemo(()=>{
        const deduped = participants.reduce((acc,participant)=>{
            const host = `host-${participant.identity}`
            if(!acc.some((part)=>part.identity === host)){
                acc.push(participant)
            }
            return acc
        },[] as (RemoteParticipant|LocalParticipant)[])
        return deduped.filter((parts)=>{
            // appears as a substring very intresting for filter
            return parts.name?.toLocaleLowerCase().includes(debouncedVal.toLocaleLowerCase()) 
        })
    },[debouncedVal,participants])  

    if(isHidden){
        return(
            <div className='flex flex-1 items-center justify-center'>
                <p className='ext-sm text-muted-foreground'>Community is disabled</p>
            </div>
        )
    }
    return (
        <div className='p-4'>
            <Input onChange={((e)=>onChange(e.target.value))} placeholder='search community' className='border-white/10'/>
            <ScrollArea className='gap-y-2 mt-4'>
                <p className='text-center text-sm text-muted-foreground hidden last:block p-2'>
                    No Results
                </p>
                {filteredParticipants.map((participant)=>(
                    <CommunityItem key={participant.identity} hostName={hostName} viewerName={viewerName} participantName={participant.name} participantIdentity={participant.identity}/>
                ))}
            </ScrollArea>
        </div>
    )
}

export default ChatCommunity