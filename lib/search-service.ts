import { getSelf } from "./auth-service"
import { db } from "./db"

export const getSearch  = async (term?:string) => {
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
                    NOT:{
                        blocking:{
                            some:{
                                blocked:userId
                            }
                        }
                    }
                },
                OR:[{
                    name:{
                        contains:term
                    },
                    user:{
                        username:{
                            contains:term
                        }
                    }
                }]
            },
            select:{
                user:true,
                id:true,
                name:true,
                thumnailUrl:true,
                isLive:true,
                updatedAt:true
            },
            orderBy:[
                {isLive:"desc"},
                {updatedAt:"desc"}
            ]
        })

    }else{  
        streams = await db.stream.findMany({
            where:{
                OR:[{
                    name:{
                        contains:term
                    },
                    user:{
                        username:{
                            contains:term
                        }
                    }
                }]
            },
            include:{
                user:true
            },
            orderBy:[
                {isLive:"desc"},
                {updatedAt:"desc"}
            ]
        })
    }
    return streams
}