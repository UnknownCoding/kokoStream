import { Input } from '@/components/ui/input'
import React from 'react'
import CopyButton from './CopyButton'

interface URLCardProps{
    value: string | null
}

const URLCard = ({value}:URLCardProps) => {
    return (
        <div className='rounded-xl bg-muted p-6'>
            <div className='flex items-center gap-x-10'>
                <p className='font-bold shrink-0'>Server URL</p>
                <div className='flex-1 flex items-center gap-x-2'>
                    <div className='w-full'>
                        <Input disabled value={value||""}/>
                    </div>
                    <CopyButton value={value||""}/>
                </div>
            </div>
        </div>
    )
}

export default URLCard