import { getSelf } from "./auth-service"
import { db } from "./db"

export const isBlockedByUser = async (id:string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.users.findUnique({
            where:{id}
        })
        if(!otherUser){
            throw new Error("user not found")
        }
        if(otherUser.id === self.id){
            return false
        }
        const existingBlock = db.block.findUnique({
            where:{
                blockedId_blockerId:{
                    blockerId:otherUser.id,
                    blockedId:self.id
                }
            }
        })
        return !!existingBlock
    } catch (error) {
        return false
    }
}

export const blockUser = async (id:string) => {
    const self = await getSelf()
    if(self.id === id){
        throw new Error("cant block your self")
    }
    const otherUser = await db.users.findUnique({
        where:{id}
    })
    if(!otherUser){
        throw new Error("user not found")
    }
    const existingBlock = await db.block.findUnique({
        where:{
            blockedId_blockerId:{
                blockerId:self.id,
                blockedId:otherUser.id
            }
        }
    })
    if(existingBlock){
        throw new Error("already blocked this user")
    }
    const block = await db.block.create({
        data:{
            blockedId:self.id,
            blockerId:otherUser.id
        },
        include:{
            blocked:true
        }
    })
    return block
}

export const unblockUser = async (id:string) => {
    const self = await getSelf()
    if(self.id === id){
        throw new Error("cant unblock your self")
    }
    const otherUser = await db.users.findUnique({
        where:{id}
    })
    if(!otherUser){
        throw new Error("user not found")
    }
    const existingBlock = await db.block.findUnique({
        where:{
            blockedId_blockerId:{
                blockerId:self.id,
                blockedId:otherUser.id
            }
        }
    })
    if(!existingBlock){
        throw new Error("user is already unblocked")
    }
    const unBlock = await db.block.delete({
        where:{
            id:existingBlock.id
        },
        include:{
            blocked:true
        }
    })
    return unBlock
}