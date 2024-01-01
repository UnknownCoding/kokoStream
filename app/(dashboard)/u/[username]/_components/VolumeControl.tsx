import Hint from '@/components/Hint'
import { Slider } from '@/components/ui/slider'
import { Volume1, Volume2, VolumeX } from 'lucide-react'
import React from 'react'

interface FullScreenControlsPorps{
    onToggle:() => void
    onChange:(value:number) => void
    value:number
}


const VolumeControl = ({onChange,onToggle,value}:FullScreenControlsPorps) => {
    const isMuted = value === 0
    const isAboveHalf = value > 50
    let Icon = Volume1
    if(isMuted){
        Icon = VolumeX
    }else if(isAboveHalf){
        Icon = Volume2
    }
    const label = isMuted ? "Unmute" : "Mute"

    const handleChange = (value:number[]) => {
        onChange(value[0])
    }

    return (
        <div className="flex items-center gap-2">
            <Hint label={label}>
                <button onClick={onToggle} className='text-white hover:bg-white/10 p-1.5 rounded-lg'>
                    <Icon/>
                </button>
            </Hint>
            <Slider className="w-[8rem] cursor-pointer" value={[value]} max={100} step={1} onValueChange={handleChange} />
        </div>
    )
}

export default VolumeControl