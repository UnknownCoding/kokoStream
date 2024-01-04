import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React from 'react'
import UserAvi from '@/components/UserAvi';
import LiveBadge from '@/components/LiveBadge';

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isLive: boolean;
    username: string;
};

const Thumbnail = ({fallback,isLive,src,username}:ThumbnailProps) => {
    let content
    if(src){
        content = (
            <Image fill alt='' src={src} className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"/>
        )
    }else{
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
                <UserAvi size="lg" showBadge username={username} imageUrl={fallback}isLive={isLive}/>
                <h1 className='truncate max-w-[90px] font-bold uppercase tracking-wide flex-wrap'>{username}</h1>
            </div>
        )
    }
    return (
        <div className='group h-full w-full aspect-video relative rounded-md cursor-pointer'>
            <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            {content}
            {isLive && src && (
                <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <LiveBadge/>
                </div>
            )}

        </div>
    )
}

export default Thumbnail

export const ThumbnailSkeleton = () => {
    return (
        <div className="group aspect-video relative rounded-xl cursor-pointer">
            <Skeleton className="h-full w-full" />
        </div>
    );
};