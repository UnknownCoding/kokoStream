"use client"
import { createIngress } from '@/actions/ingress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select,SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IngressInput } from 'livekit-server-sdk'
import { AlertTriangle } from 'lucide-react'
import React, { ElementRef, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

const ConnectModal = () => {
    const RTMP = String(IngressInput.RTMP_INPUT)
    const WHIP = String(IngressInput.WHIP_INPUT)
    type IngressType = typeof RTMP | typeof WHIP
    const ref = useRef<ElementRef<"button">>(null)
    const [ingressType,setIngressType] = useState<IngressType>(RTMP)
    const [pending,startTransition] = useTransition()
    const onSubmit = () => {
        startTransition(async ()=>{
            await createIngress(parseInt(ingressType)).then(()=>{toast.success("generated ingress and updated the keys"); ref.current?.click()}).catch(()=>toast.error("failed to generate ingress keys"))
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">Generate</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Select disabled={pending} value={ingressType} onValueChange={(value)=>setIngressType(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className='h-4 w-4'/>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>
                <div className='flex items-center justify-between'>
                    <DialogClose ref={ref}>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                        <Button onClick={onSubmit} variant="primary">
                            Generate
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectModal