"use client"
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import React, { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import ChatHeader from './ChatHeader'
import ChatForm from './ChatForm'

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
    const isHidden = !isChatDelayed  || !isOnline
    const [value,setValue] = useState("")
    const {chatMessages,isSending,send} = useChat()
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
                    <ChatForm/>
                </>
            )}
            {variant === ChatVariant.CHAT && (
                <>
                    <p>Chat mode activated</p>
                </>
            )}
        </div>
    )
}

export default Chat