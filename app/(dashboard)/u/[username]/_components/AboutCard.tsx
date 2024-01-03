"use client"
import React from 'react'
import VerifiedMark from './VerifiedMark'
import BioModal from './BioModal'

interface AboutCardProp{
    hostName:string
    hostIdentity:string
    viewerIdentity:string
    bio:string | null
    followedByCount:number
}

const AboutCard = ({hostName,bio,followedByCount,hostIdentity,viewerIdentity}:AboutCardProp) => {
    const isHost = viewerIdentity === `host-${hostIdentity}`
    const followLabel = followedByCount === 1 ? "follower" : "followers"
    return (
        <div className='px-4'>
            <div className='group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center font-semibold gap-x-2 text-lg lg:text-2xl'>
                        About {hostName} <VerifiedMark/> 
                    </div>
                    {isHost && (
                        <BioModal initialValue={bio}/>
                    )}
                </div>
                <div className='text-sm text-muted-foreground'>
                    <span className='font-semibold text-primary'>{followedByCount}</span> {followLabel}
                </div>
                <div className='text-sm'>
                    {bio|| "this user loves to keep an air of mystery watch to find out more about it." }
                </div>
            </div>
        </div>
    )
}

export default AboutCard