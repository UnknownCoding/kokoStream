"use client"
import Hint from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'

const Toggle = () => {
    const {collapsed,onCollapse,onExpand,} = useCreatorSidebar((state)=>state)
    const label = collapsed ? "Expand" : "Collapse"
    return (
        <div>
            {collapsed && (
                <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
                    <Hint label={label} side='right' asChild>
                        <Button className='p-2 h-fit' onClick={onExpand} variant="ghost" >
                            <ArrowRightFromLine className='h-4 w-4'/>
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className='p-3 pl-6 mb-2 flex items-center w-full'>
                    <p className='font-semibold text-primary'>For You</p>
                    <Hint label={label} side='right' asChild>
                        <Button className='h-fit p-2 ml-auto' variant="ghost" onClick={onCollapse}>
                            <ArrowLeftFromLine className='h-4 w-4'/>
                        </Button>
                    </Hint>
                </div>
            )}

        </div>
    )
}

export default Toggle