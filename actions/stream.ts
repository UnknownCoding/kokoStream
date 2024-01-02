"use server"

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { getStreamByUserId } from "@/lib/stream-service"
import { stream } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateStream = async (values:Partial<stream>) => {
    try {
        const self = await getSelf()
        const isStream = await getStreamByUserId(self.id)
        if(!isStream){
            throw new Error("Stream not found")
        }
        const validData = {
            thumnailUrl:values.thumnailUrl,
            name:values.name,
            isChatEnabled:values.isChatEnabled,
            isChatDelayed:values.isChatDelayed,
            isChatFollowersOnly:values.isChatFollowersOnly
        }
        const stream = await db.stream.update({
            where:{
                id:isStream.id
            },
            data:{
                ...validData
            }
        }) 
        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)
        return stream
    } catch (error) {   
        throw new Error("Internal Error")
    }
}