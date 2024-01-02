import { Separator } from '@/components/ui/separator'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import InfoModal from './InfoModal'

interface InfoCardProp{
    hostIdentity:string
    viewerIdentity:string
    name:string
    thumbnailUrl:string | null
}

const InfoCard = ({hostIdentity,name,thumbnailUrl,viewerIdentity}:InfoCardProp) => {
    const isHost = viewerIdentity === `host-${hostIdentity}`
    if(!isHost) return null
    return (
        <div className='px-4'>
            <div className='rounded-xl bg-background'>
                <div className='flex items-center gap-x-2.5 p-4'>
                    <div className='rounded-md bg-blue-600 p-2 h-auto w-auto'>
                        <Pencil className='h-5 w-4'/>
                    </div>
                    <div>
                        <h2 className='text-sm lg:text-lg font-semibold capitalize'>Edit your stream info</h2>
                        <p className='text-muted-foreground text-xs lg:text-sm'>Maximize your visibility</p>
                    </div>
                    <InfoModal initialName={name} initialThumbnail={thumbnailUrl} />
                </div>
                <Separator/>
                <div className='p-4 lg:p-6 space-y-4'>
                    <div>
                        <h3 className='text-sm text-muted-foreground mb-2'>Name</h3>
                        <p className='text-sm font-semibold'>{name}</p>
                    </div>
                    <div>
                        <h3 className='text-sm text-muted-foreground mb-2'>Thumbnail</h3>
                        <p className='text-sm font-semibold'>{thumbnailUrl && (
                            <div className='relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10'>
                                <Image alt='' fill src={thumbnailUrl} className='object-cover' />
                            </div>
                        )}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard