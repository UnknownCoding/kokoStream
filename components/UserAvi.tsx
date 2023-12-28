import React from 'react'
import {cva,type VariantProps} from 'class-variance-authority'
import {Avatar,AvatarFallback,AvatarImage,} from "@/components/ui/avatar"
import { cn } from '@/lib/utils'
import LiveBadge from './LiveBadge'
import { Skeleton } from "@/components/ui/skeleton"


const avatarSizes = cva(
    "",
    {
        variants:{
            size:{
                default:"h-8 w-8",
                lg:"h-14 w-14"
            }
        },
        defaultVariants:{
            size:"default"
        }
    }
)

interface RecommendedProps extends VariantProps<typeof avatarSizes>{
    imageUrl:string
    isLive?:boolean
    username:String
    showBadge?:boolean
}


const UserAvi = ({imageUrl,isLive,username,showBadge,size}:RecommendedProps) => {
    const canShowBadge = showBadge && isLive
    return (
        <div className='relative'>
            <Avatar className={cn(isLive && "ring-2 ring-rose-500 border border-background",avatarSizes({ size }))}>
                <AvatarImage src={imageUrl} alt="avi"  className='object-cover' />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
                    <LiveBadge/>
                </div>
            )}
        </div>
    )
}

export default UserAvi

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes>{}

export const UserAvatarSkeleton = ({size}:UserAvatarSkeletonProps) =>{
    return(
        <Skeleton className={cn("rounded-full",avatarSizes({size}))}/>
    )
}