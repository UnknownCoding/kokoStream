"use client"
import { updateUser } from '@/actions/users'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'

const BioModal = ({initialValue}:{initialValue:string|null}) => {
    const [value,setValue] = useState<string>(initialValue||"")
    const [pending,startTransition] = useTransition()
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(value)
        startTransition(()=>{
            updateUser({bio:value}).then(()=>toast.success("successfully updated")).catch(()=>toast.error("unknown error"))
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <Textarea placeholder='User Bio' onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setValue(e.target.value)}} className='resize-none' value={value}/>
                    <div className='flex justify-between'>
                        <DialogClose>
                            <Button type='button' variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type='submit' variant="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BioModal