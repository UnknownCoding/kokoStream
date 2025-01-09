"use client"
import { onBlock, unBlock } from '@/actions/block'
import { onFollow, onUnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

const Actions = ({isFollowing,userId}:{isFollowing:boolean,userId:string}) => {
    const [isPending,startTransiton] = useTransition()
    const onClick = () => {
        startTransiton(()=>{
            onFollow(userId).then((data)=>toast.success(`You are now following ${data.following.username}`)).catch(()=>toast.error("Something Went Wrong"))
        })
    }
    const onClickk = () => {
        startTransiton(()=>{
            onUnFollow(userId).then((data)=>toast.success(`You have unfollowed the user ${data.following.username}`)).catch(()=>toast.error("Something Went Wrong"))
        })
    }

    const onClickkk = () => {
        if(isFollowing){
            onClickk()
        }else{
            onClick()
        }
    }

    const handleBlock = () => {
        startTransiton(()=>{
            onBlock(userId).then((data)=> toast.success(`Blocked the person ${data?.blocked.username}`))
            .catch(()=>toast.error('Something went wrong'))
        })
    }

    return (
        <>
        <Button variant="primary" disabled={isPending} onClick={onClickkk}>
            {isFollowing ? "Unfollow" :"Follow"}
        </Button>
        <Button disabled={isPending} onClick={handleBlock}>
            Block
        </Button>
        </>
    )
}

export default Actions