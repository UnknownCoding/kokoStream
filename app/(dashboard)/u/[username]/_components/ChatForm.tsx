import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import ChatInfo from './ChatInfo'

interface ChatForm{
    onSubmit:()=>void
    isFollowing:boolean
    onChange:(value:string) => void
    value:string
    isHidden:boolean
    isDelayed:boolean
    isFollowersOnly:boolean

}

const ChatForm = ({isDelayed,isFollowersOnly,isFollowing,isHidden,onChange,onSubmit,value}:ChatForm) => {
    const [delayedBlock,setDelayedBlock] = useState(false)
    const isFollwersOnlyAndNotFollowing = isFollowersOnly && !isFollowing 
    const isDisabled = isHidden ||isFollwersOnlyAndNotFollowing || delayedBlock

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if(!value || isDisabled)return 
        // new added logic
        if(!isDelayed){
            onSubmit()
        }
        if(isDelayed && !delayedBlock){
            setDelayedBlock(true)
            setTimeout(()=>{
                setDelayedBlock(false)
                onSubmit()
            },3000)
        }
    }

    if(isHidden) return null

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-y-4 p-3'>
            <div className='w-full space-y-2'>
                <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly}/>
                <Input onChange={(e)=>onChange(e.target.value)} value={value} disabled={isDisabled} className={cn('border-white/10',isFollowersOnly || isDelayed &&"rounded-t-none border-t-0")} placeholder='send a message'/>
                <Button type='submit' variant="primary" size="sm" disabled={isDisabled} className='ml-auto'>
                    Chat
                </Button>
            </div>

        </form>
    )
}

export default ChatForm

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    );
};