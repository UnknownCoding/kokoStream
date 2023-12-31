import { db } from "./db";
import { getSelf } from "./auth-service";
import { users } from "@prisma/client";

export const getRecommended = async () => {
    // await new Promise(resolve => setTimeout(resolve,5000))
    let userId;
    try {
        const self = await getSelf()
        userId = self.id
    } catch (error) {
        userId = null
    }

    let users = []

    if(userId){
        users = await db.users.findMany({
            where:{
                AND:[{
                    NOT:{
                        id:userId,
                    }
                },
                {
                    NOT:{
                        followedBy:{
                            some:{
                                followerId:userId
                            }
                        }
                    }
                },
                {
                    NOT:{
                        blocking:{
                            some:{
                                blockedId:userId
                            }
                        }
                    }
                }
            ]
            },
            include:{
                streams:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }else{
        users = await db.users.findMany({
            include:{
                streams:{
                    select:{
                        isLive:true
                    }
                }            
            },
            orderBy:{
                createdAt:'desc'
            }
        })
    }
    return users
}