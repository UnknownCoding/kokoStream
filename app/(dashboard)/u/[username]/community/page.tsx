import { getBlockedUsers } from '@/lib/block-service'
import React from 'react'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import {format } from "date-fns";

// async function getData(): Promise<Payment[]> {
//     // Fetch data from your API here.
//     return [
//         {
//             id: "728ed52f",
//             amount: 100,
//             status: "pending",
//             email: "m@example.com",
//         },
//       // ...
//     ]
// }
    
const page = async () => {
    const blockedUsers = await getBlockedUsers()
    const formatedData = blockedUsers.map((data)=>({
        ...data,
        userId: data.blocked.id,
        imageUrl: data.blocked.imageUrl,
        username: data.blocked.username,
        createdAt: format(new Date(data.blocked.createdAt), "dd/MM/yyyy"),
    }))
    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Community Settings</h1>
            </div>
            <DataTable columns={columns} data={formatedData} />
        </div>
    )
}

export default page