import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getSelf = async () => {
    const self = await currentUser()
    if(!self||!self.username){
        throw new Error("Unauthorized Access")
    }
    const user = await db.users.findUnique({
        where:{
            externalUserId:self.id
        }
    })
    if(!user){
        throw new Error("Not found")
    }
    return user
}

export const getSelfByUsername = async (username:string) => {
    const self = await currentUser()
    if(!self||!self.username){
        throw new Error("Unauthorized Access")
    }
    const user = await db.users.findUnique({
        where:{
            username:username
        }
    })
    if(!user){
        throw new Error("user doesnt exist")
    }
    if(self.username !== user.username){
        throw new Error("username mismatch")
    }
    return user
}