import { unBlock } from '@/actions/block';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface UnblockButtonProps {
    userId: string;
};


const UnblockButton = ({userId}:UnblockButtonProps) => {
    const [pending, startTransition] = useTransition();
    const onClick = () => {
        startTransition(() => {
            unBlock(userId).then((result) => toast.success(`The User ${result.blocked.username} is unblocked`)).catch(() => toast.error("Unexpected Erro"))
        });
    };
    return (
        <Button disabled={pending} onClick={onClick} variant="link" size="sm" className="text-blue-500 w-full">
            Unblock
        </Button>
    )
}

export default UnblockButton