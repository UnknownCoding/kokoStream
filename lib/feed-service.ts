import { getSelf } from "./auth-service"
import { db } from "./db"

export const getStreams = async () => {
    let userId
    try {
        userId = await getSelf()
    } catch (error) {
        userId = null
    }
    let streams = []
    if(userId){
        streams = await db.stream.findMany({
            where:{
                user:{
                    // @ts-expect-error
                    NOT:{
                        blocking:{
                            some:{
                                blockedId:userId
                            }
                        }
                    }
                }
            },
            select:{
                thumnailUrl:true,
                name:true,
                isLive:true,
                user:true,
            },
            
            orderBy:[
                {isLive:"desc"},
                {updatedAt:"desc"}
            ]
        })
    }else{
        streams = await db.stream.findMany({
            select:{
                thumnailUrl:true,
                name:true,
                isLive:true,
                user:true,
            },
            orderBy:[
                {isLive:"desc"},
                {updatedAt:"desc"}
            ]
        })
    }
    return streams
}   