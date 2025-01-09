"use client"
import UserAvi from "@/components/UserAvi";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import UnblockButton from "./UnblockButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = {
    id: string;
    userId: string;
    imageUrl: string;
    username: string;
    createdAt: string;
}

export const columns: ColumnDef<BlockedUser>[] = [
    {
        accessorKey: "username",
        header: ({ column }:{ column:any}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                )
            },
        cell: ({ row }:{row:any}) =>(
            <div className="flex items-center gap-x-4">
                <UserAvi  username={row.original.username}  imageUrl={row.original.imageUrl}/>
                <span>{row.original.username}</span>
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }:{ column:any}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date Blocked
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                )
            },    
    },
    {
        id: "Actions",
        cell: ({ row }:{row:any}) => <UnblockButton userId={row.original.userId}/>,
    },
]
