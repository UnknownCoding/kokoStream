import React from 'react'
import Wrapper from './Wrapper'
import Toggle, { ToggleSkeleton } from './Toggle'
import Recommended, { RecommendedSkeleton } from './Recommended'
import { getRecommended } from '@/lib/recommended-service'
import { getFollowedUser } from '@/lib/follow-service'
import Following, { FollowerSkeleton } from './Following'
// listen to the timestamp at 2:46:00 on server side and client side !use of wrapper and 2:54:10
const SideBar = async () => {
    const recommended = await getRecommended()
    const followedUsers = await getFollowedUser()
    return (
        <Wrapper>
            <Toggle/>
            <div className='space-y-4 pt-4 lg:pt-0'>
                <Following data={followedUsers}/>
                <Recommended data={recommended}/>
            </div>  
        </Wrapper>
    )
}

export default SideBar

export const SideBarSkele = () => {
    return( 
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton/>
            <FollowerSkeleton/>
            <RecommendedSkeleton />
        </aside>
    )
}