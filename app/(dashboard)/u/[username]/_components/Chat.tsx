"use client"
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import React, { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import ChatHeader, { ChatHeaderSkeleton } from './ChatHeader'
import ChatForm, { ChatFormSkeleton } from './ChatForm'
import { Skeleton } from '@/components/ui/skeleton'
import ChatList, { ChatListSkeleton } from './ChatList'
import ChatCommunity from './ChatCommunity'

interface ChatProps{
    viewerName:string
    hostName:string
    hostIdentity:string
    isFollowing:boolean
    isChatEnabled:boolean
    isChatDelayed:boolean
    isChatFollowersOnly:boolean
}

const Chat = ({viewerName,hostIdentity,hostName,isChatDelayed,isChatEnabled,isChatFollowersOnly,isFollowing}:ChatProps) => {
    const matches = useMediaQuery('(max-width: 1024px)')
    const {collapsed,variant,onExpand,onCollapse} = useChatSidebar()
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity)
    const isOnline = participant && connectionState === ConnectionState.Connected   
    const isHidden = !isOnline
    const [value,setValue] = useState("")
    const {chatMessages,send} = useChat()
    useEffect(()=>{
        if(matches){
            onCollapse()
        }
    },[matches,onExpand])
    const reverseMessages = useMemo(() => chatMessages.sort((a, b) => b.timestamp - a.timestamp),[chatMessages]);
    const onSubmit = () => {
        if(!send)return
        send(value)
        setValue("")
    }
    const onChange = (value:string) => {
        setValue(value)
    }
    return (
        
        <div className='flex flex-col bg-background border-l border-b pt-0 min-h-[calc(100vh-80px)]'>
            <ChatHeader/>
            {variant === ChatVariant.COMMUNITY && (
                <>
                    <ChatCommunity viewerName={viewerName} isHidden={isHidden} hostName={hostName}/>
                </>
            )}
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList messages={reverseMessages} isHidden={isHidden} />
                    <ChatForm onSubmit={onSubmit} isFollowing={isFollowing} onChange={onChange} value={value} isHidden={isHidden} isDelayed={isChatDelayed} isFollowersOnly={isChatFollowersOnly} />
                </>
            )}
        </div>
    )
}

export default Chat

export const ChatSkeleton = () => {
    return(
        <div className='flex flex-col bg-background border-l border-b pt-0 min-h-[calc(100vh-80px)]'>
            <ChatHeaderSkeleton/>
            <ChatListSkeleton/>
            <ChatFormSkeleton/>
        </div>
    )
}