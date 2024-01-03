import { db } from "./db"

export const getUserByUsername = async (username:string) => {
    const user = await db.users.findUnique({
        where:{
            username:username
        },
        include:{
            streams:true,
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