import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Actions = () => {
    return (
        <div className='flex items-center justify-end gap-x-2 ml-4 lg:ml-0'>
            {/* werid syntax use tiernery instead */}
            <Button size="sm" variant="ghost" className='text-muted-foreground' asChild>
                <Link href="/">
                    <LogOut className='h-5 w-5 mr-2'/>
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl='/'/>
        </div>
    )
}

export default Actions