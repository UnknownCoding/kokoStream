import { db } from "./db"

export const getUserByUsername = async (username:string) => {
    const user = await db.users.findUnique({
        where:{
            username:username
        },
        select:{
            id:true,
            username:true,
            externalUserId:true,
            bio:true,
            imageUrl:true,
            streams:{
                select:{
                    id:true,
                    isLive:true,
                    isChatDelayed:true,
                    isChatEnabled:true,
                    isChatFollowersOnly:true,
                    thumnailUrl:true,
                    name:true
                }
            },
            _count:{
                select:{
                    followedBy:true
                }
            }
        }
    })
    return user
}


export const getUserByID = async (id:string) => {
    const user = await db.users.findUnique({
        where:{
            id:id
        },
        include:{
            streams:true
        }
    })
    return user
}