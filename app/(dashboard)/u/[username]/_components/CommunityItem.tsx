import { onBlock } from '@/actions/block'
import Hint from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { cn, stringToColor } from '@/lib/utils'
import { MinusCircle } from 'lucide-react'
import React, { useMemo, useTransition } from 'react'
import { toast } from 'sonner'

interface CommunityItemProps{
    hostName:string
    viewerName:string
    participantName?:string
    participantIdentity:string
}

const CommunityItem = ({hostName,participantIdentity,participantName,viewerName}:CommunityItemProps) => {
    const color = stringToColor(participantName||"")
    const [pending,startTransition] = useTransition()
    const isHost = viewerName === hostName;
    const isSelf = viewerName === participantName
    const handleBlock = () => {
        if(!participantName||!isHost||isSelf) return 
        startTransition(()=>{
            onBlock(participantIdentity).then(()=>toast.success(`Blocked ${participantName}`)).catch(()=>toast.error(`Unexpected Error`))
        })
    }


    return (
        <div className={cn("group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",pending && "opacity-50 pointer-events-none")}>
            <p style={{color:color}}>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label='block'>
                    <Button variant="ghost" onClick={handleBlock} className="h-auto w-auto transition-all ease-in-out opacity-0 hover:opacity-100">
                        <MinusCircle className='h-4 w-4 text-muted-foreground'/>
                    </Button>
                </Hint>
            )}
        </div>
    )
}

export default CommunityItem