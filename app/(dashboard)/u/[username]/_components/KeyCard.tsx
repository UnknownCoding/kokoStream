"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CopyButton from './CopyButton'
import { Button } from '@/components/ui/button'

interface KeyCardProps{
    value: string | null
}


const KeyCard = ({value}:KeyCardProps) => {
    const [show,setShow] = useState(false)
    return (
        <div className='rounded-xl bg-muted p-6'>
            <div className='flex items-center gap-x-10'>
                <p className='font-bold shrink-0'>Stream Key</p>
                <div className='flex-1 flex items-center gap-x-2'>
                    <div className='w-full'>
                        <Input type={show ? 'text' : 'password'} placeholder='Stream Key' disabled value={value||""}/>
                    </div>
                    <CopyButton value={value||""}/>
                </div>
                <Button size="sm" variant="link" onClick={()=>setShow(!show)}>
                    {show ? "Hide" : "Show"}
                </Button>
            </div>
        </div>
    )
}

export default KeyCard