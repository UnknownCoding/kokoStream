import { db } from "./db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id:string) =>{
    try {
        const self = await getSelf()
        const otherUser = await db.users.findUnique({
            where:{
                id:id
            }
        })
        if(!otherUser){
            throw new Error("User is not found")
        }
        if(otherUser.id === self.id){
            return true
        }
        const existingFollow = await db.follow.findFirst({
            where:{
                followerId:self.id,
                followingId:otherUser.id
            }
        })
        return !!existingFollow
    } catch (error) {
        return false
    }
}

export const followUser = async (id:string) => {
    const self = await getSelf()
    const otherUser = await db.users.findUnique({
        where:{
            id
        }
    })
    if(!otherUser){
        throw new Error("user not found")
    }
    if(otherUser.id === self.id){
        throw new Error("cant follow your own self")
    }
    const existingFollow = await db.follow.findFirst({
        where:{
            followerId:self.id,
            followingId:otherUser.id
        }
    })
    if(existingFollow){
        throw new Error("already following")
    }

    const follow = await db.follow.create({
        data:{
            followerId:self.id,
            followingId:otherUser.id
        },
        include:{
            follower:true,
            following:true
        }
    })
    return follow
}

export const unfollowUser = async (id:string) => {
    const self = await getSelf()
    const otherUser = await db.users.findUnique({
        where:{
            id
        }
    })
    if(!otherUser){
        throw new Error("user not found")
    }
    if(otherUser.id === self.id){
        throw new Error("cant unfollow your self")
    }
    const existingFollow = await db.follow.findFirst({
        where:{
            followerId:self.id,
            followingId:otherUser.id
        }
    })
    if(!existingFollow){
        throw new Error("Not following each other")
    }
    const follow = await db.follow.delete({
        where:{
            id:existingFollow.id
        },
        include:{
            following:true
        }
    })
    return follow
}

export const getFollowedUser = async () => {
    try {
        const self = await getSelf()
        const followedUsers = db.follow.findMany({
            where:{
                followerId:self.id
            },
            include:{
                following:true
            }
        })
        return followedUsers
    } catch (error) {
        return []
    }
} 