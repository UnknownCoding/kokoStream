"use server"

import { getSelf } from "@/lib/auth-service"
import { blockUser, unblockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)
export const onBlock = async (id:string) => {
    const self = await getSelf()
    let blockedUser
    try {
        blockedUser = await blockUser(id)
    } catch (error) {
        try {
            await roomService.removeParticipant(self.id,id,);
        } catch (error) {
            console.log("use is a guest");
        }
    }
    
    revalidatePath(`/u/${self.username}/community`);
    return blockedUser;
}

export const unBlock = async (id:string) => {
    try {       
        const unblockedUser = await unblockUser(id)
        revalidatePath('/')
        if(unblockedUser){
            revalidatePath(`/${unblockedUser.blocked.username}`)
        }
        return unblockedUser
    } catch (error) {
        throw new Error("Internal Error")
    }
}