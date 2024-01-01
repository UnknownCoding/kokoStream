import { Loader, WifiOff } from 'lucide-react'
import React from 'react'

interface OfflineProps{
    label:string
}

const LoadingVideo = ({label}:OfflineProps) => {
    return (
        <div className='h-full flex flex-col items-center justify-center space-y-4 '>
            <Loader className='h-10 w-10 text-muted-foreground'/>
            <p className='text-muted-foreground capitalize'>
                {label}
            </p>
        </div>
    )
}

export default LoadingVideo