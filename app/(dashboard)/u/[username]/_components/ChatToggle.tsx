import Hint from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'

const ChatToggle = () => {
    const {collapsed,onCollapse,onExpand} = useChatSidebar()
    const label = collapsed ? "Expand" : "Collapse"
    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine
    const onToggle = () => {
        if(collapsed){
            onExpand()
        }else{
            onCollapse()
        }
    }
    return (
        <Hint label={label} asChild side='left' >
            <Button className='p-2 hover:bg-white/10 hover:text-primary bg-transparent h-auto' onClick={onToggle} variant="ghost">
                <Icon className='h-4 w-4'/>
            </Button>
        </Hint>
    )
}

export default ChatToggle