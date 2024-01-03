"use server"

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { users } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateUser = async (values:Partial<users>) => {
    try {
        const self = await getSelf()
        const validData = {
            bio:values.bio
        }
        const user = await db.users.update({
            where:{
                id:self.id
            },
            data:{
                ...validData
            }
        })
        revalidatePath(`/u/${user.username}`)
        revalidatePath(`/${user.username}`)
        return user
    } catch (error) {
        throw new Error("Unexpected Error")
    }
}