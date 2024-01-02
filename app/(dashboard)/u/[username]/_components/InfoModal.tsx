"use client"
import { updateStream } from '@/actions/stream'
import Hint from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadDropzone } from '@/lib/uploadthing'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ElementRef, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface InfoModalProps{
    initialName:string
    initialThumbnail:string | null
}

const InfoModal = ({initialName,initialThumbnail}:InfoModalProps) => {
    const closeRef = useRef<ElementRef<"button">>(null)
    const [name,setName] = useState<string>(initialName)
    const [thumbnail,setThumbnail] = useState<string| null>(initialThumbnail)
    const [pending,startTransition] = useTransition()
    const router = useRouter()
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(()=>{
            updateStream({name:name}).then(()=>{toast.success("Stream updated"); closeRef.current?.click() }).catch(()=>toast.error("Unexpected Error"))
        })
    }   
    const onRemove = () =>{
        startTransition(()=>{
            updateStream({ thumnailUrl: null }).then(() => {toast.success("Thumbnail removed");closeRef?.current?.click();setThumbnail(null);}).catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <form className='space-y-14' onSubmit={onSubmit}>
                            <div className='space-y-2'>
                                <Label>Name</Label>
                                <Input placeholder='Stream name' onChange={onChange} value={name} disabled={pending} />
                            </div>
                            <div className='space-y-2'>
                                <Label>Thumbnail</Label>
                                {thumbnail !== null ? (
                                    <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10 '>
                                        <div className='absolute top-2 right-2 z-10'>
                                            <Hint label="Remove thumbnail" asChild side="left">
                                                <Button type="button" disabled={pending} onClick={onRemove} className="h-auto w-auto p-1.5">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </Hint>
                                        </div>
                                        <Image alt="Thumbnail" src={thumbnail} fill className="object-cover"/>
                                    </div>
                                ) : (
                                    <div className='rounded-2xl border outline-dashed outline-muted'>
                                        <UploadDropzone endpoint="thumbnailUploader" appearance={{
                                            label:{
                                                color:"#FFFFFF"
                                            },
                                            allowedContent:{
                                                color:"#FFFFFF"
                                            }
                                        }} onClientUploadComplete={(res)=> {
                                            setThumbnail(res?.[0]?.url)
                                            router.refresh()
                                            closeRef.current?.click()
                                        }}/>
                                    </div>
                                )}
                            </div>
                            <div className='flex items-center justify-between'>
                                <DialogClose asChild ref={closeRef}>
                                    <Button type='button' variant="ghost">Cancel</Button>
                                </DialogClose>
                                <Button disabled={pending} variant="primary" type='submit'>Submit</Button>
                            </div>
                        </form>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default InfoModal