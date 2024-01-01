import Hint from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { MessageSquare, Users } from 'lucide-react'
import React from 'react'

const VariantToggle = () => {
    const {onChangeVariant,variant} = useChatSidebar()
    const isChat = variant === ChatVariant.CHAT
    const Icon = isChat ? Users : MessageSquare 
    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
        onChangeVariant(newVariant)
    }
    const label = isChat ? "Community" : "Chat"
    return (
        <Hint label={label} asChild side='left' >
            <Button className='p-2 hover:bg-white/10 hover:text-primary bg-transparent h-auto' onClick={onToggle} variant="ghost">
                <Icon className='h-4 w-4'/>
            </Button>
        </Hint>
    )
}

export default VariantToggle