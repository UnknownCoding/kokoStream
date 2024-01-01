import { Skeleton } from '@/components/ui/skeleton';
import { ReceivedChatMessage } from '@livekit/components-react';
import React from 'react'
import ChatMessage from './ChatMessage';

interface ChatListProps{
    messages:ReceivedChatMessage[]
    isHidden:boolean
}

const ChatList = ({isHidden,messages}:ChatListProps) => {
    if(!messages || isHidden || messages.length === 0){
        return (
            <div className='flex flex-1 items-center justify-center'>
                <p className='text-sm text-muted-foreground'>
                    {isHidden ? "Chat is disabled" : "Welcome to the chat"}
                </p>
            </div>
        )
    }
    return (
        <div className='flex flex-col-reverse overflow-y-scroll p-3 h-full flex-1 '>
            {messages.map((message)=>(
                <ChatMessage key={message.timestamp} data={message}/>
            ))}
        </div>
    )
}

export default ChatList

export const ChatListSkeleton = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <Skeleton className="w-1/2 h-6" />
        </div>
    );
};