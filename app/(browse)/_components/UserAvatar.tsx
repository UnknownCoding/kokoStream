import React from 'react'

interface RecommendedProps{
    imageUrl:string
    isLive?:boolean
    username:String
}


const UserAvatar = ({imageUrl,isLive,username}:RecommendedProps) => {
    return (
        <div>UserAvatar</div>
    )
}

export default UserAvatar