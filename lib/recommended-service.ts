import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
    // await new Promise(resolve => setTimeout(resolve,5000))
    const users = await db.users.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })
    return users
}