import React from 'react'
import { StreamPlayerSkeleton } from '../_components/StreamPlayer'

const loading = () => {
    return (
        <div className='h-full'>
            <StreamPlayerSkeleton/>
        </div>
    )
}

export default loading