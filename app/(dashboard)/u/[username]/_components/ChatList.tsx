import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const ChatList = () => {
    return (
        <div>ChatList</div>
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