import { Button } from '@/components/ui/button'
import React from 'react'
import URLCard from '../_components/URLCard'
import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import KeyCard from '../_components/KeyCard'
import ConnectModal from '../_components/ConnectModal'

const page = async () => {
    const self = await getSelf()
    const stream = await getStreamByUserId(self.id)
    if(!stream){
        throw new Error("Stream not found")
    }
    return (
        <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl font-bold'>Key&apos;s and URL&apos;s</h1>
                <ConnectModal/>

            </div>
            <div className='space-y-4'>
                <URLCard value={stream.serverUrl} />
                <KeyCard value={stream.streamKet} />
            </div>
        </div>
    )
}

export default page