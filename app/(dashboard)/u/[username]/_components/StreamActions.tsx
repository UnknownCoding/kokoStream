"use client"
import { onFollow, onUnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

interface StreamActionProps{
    hostIdentity:string
    isFollowing:boolean
    isHost:boolean
}

const StreamActions = ({hostIdentity,isFollowing,isHost}:StreamActionProps) => {
    const {userId} = useAuth()
    const [pending,startTransition] = useTransition()
    const router = useRouter()
    const followAction = () => {
        startTransition(()=>{
            onFollow(hostIdentity).then(()=>toast.success("person has been followed")).catch(()=>toast.error("unexpected error has occured"))
        })
    }
    const unfollowAction = () => {
        startTransition(()=>{
            onUnFollow(hostIdentity).then(()=>toast.success("person has been followed")).catch(()=>toast.error("unexpected error has occured"))
        })
    }
    const handleFollow = () => {
        if(!userId){
            return router.push("/sign-in")
        }
        if(isHost) return 
        if(isFollowing){
            unfollowAction()
        }else{
            followAction()
        }
    }
    return (

        <Button disabled={pending || isHost} onClick={handleFollow} variant="primary" size='sm' className='w-full lg:w-auto'>
            <Heart className={cn("h-4 w-4 mr-2",isFollowing ? "fill-white" : "fill-none")}/>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}

export default StreamActions

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    );
};