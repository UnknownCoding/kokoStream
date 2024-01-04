import UserAvi, { UserAvatarSkeleton } from '@/components/UserAvi'
import { Skeleton } from '@/components/ui/skeleton'
import { stream, users } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import Thumbnail, { ThumbnailSkeleton } from './Thumbnail'

interface ResultCardProps{
    data:{
        isLive: boolean;
        thumnailUrl: string | null;
        name: string;
        user: users,
    }
}

const ResultCard = ({data}:ResultCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className='h-full w-full space-y-4'>
                <Thumbnail src={data.thumnailUrl} isLive={data.isLive} fallback={data.user.imageUrl} username={data.user.username}/> 
            </div>
            <div className="flex gap-x-3 mt-3">
                <UserAvi username={data.user.username} imageUrl={data.user.imageUrl} isLive={data.isLive}/>
                <div className="flex flex-col text-sm overflow-hidden">
                    <p className="truncate font-semibold hover:text-blue-500">{data.name}</p>
                    <p className="text-muted-foreground">{data.user.username}</p>
                </div>
            </div>

        </Link>
    )
}

export default ResultCard

export const ResultCardSkeleton = () => {
    return (
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton/>
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24"/>
                </div>
            </div>
        </div>
    );
};