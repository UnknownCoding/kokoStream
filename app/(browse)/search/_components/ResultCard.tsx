import { stream, users } from '@prisma/client';
import React from 'react'
import Thumbnail, { ThumbnailSkeleton } from '../../_components/Thumbnail';
import Link from 'next/link';
import VerifiedMark from '@/app/(dashboard)/u/[username]/_components/VerifiedMark';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultCardProps {
    data: {
            id: string;
            name: string;
            thumnailUrl: string | null;
            isLive: boolean;
            updatedAt: Date;
            user: users;
        };
    };
    
const ResultCard = ({data}:ResultCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="flex gap-x-4">
                <div className="h-[9rem] w-[16rem]">
                    <Thumbnail src={data.thumnailUrl} fallback={data.user.imageUrl} isLive={data.isLive} username={data.user.username}/>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-500"> {data.user.username}</p>
                        <VerifiedMark/>
                    </div>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(data.updatedAt), {addSuffix: true,})}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ResultCard

export const ResultCardSkeleton = () => {
    return (
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
            <ThumbnailSkeleton />
            </div>
            <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-12" />
            </div>
        </div>
    );
};