"use client"
import { updateStream } from '@/actions/stream'
import { Switch } from '@/components/ui/switch'
import React, {useTransition } from 'react'
import { toast } from 'sonner'

type FieldValueTypes = "isChatEnabled"|"isChatDelayed"|"isChatFollowersOnly"

interface ToggleCardProps{
    field:FieldValueTypes
    label:string
    value:boolean
}

const ToggleCard = ({field,label,value}:ToggleCardProps) => {
    const [pedning,startTransition] = useTransition()
    const onChange = () => {
        startTransition(async()=>{
            // very intresting from "" to [] so that u get object {-->}
            await updateStream({[field]:!value}).then(()=>toast.success("app settings updated succesfulyl")).catch(()=>toast.error("something went wrong"))
        })
    }
    return (
        <div className='rounded-xl bg-muted p-6 '>
            <div className='flex items-center justify-between'>
                <p className='font-semibold'>{label}</p>
                <Switch disabled={pedning} checked={value} onCheckedChange={onChange}>
                    {value ? "On" : "Off"}
                </Switch>
            </div>
        </div>
    )
}

export default ToggleCard