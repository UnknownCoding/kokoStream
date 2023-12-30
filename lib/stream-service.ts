import { getSelf } from "./auth-service"
import { db } from "./db"

export const getStreamByUserId = async (id:string) => {
    const stream = await db.stream.findUnique({
        where:{
            userId:id
        }
    })
    return stream
}   