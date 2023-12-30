import { getSelfByUsername } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import React from 'react'
import NavBar from './_components/NavBar'
import SideBar from './_components/SideBar'
import Container from './_components/Container'

interface LayoutProps{
    params:{username:string}
    children:React.ReactNode
}

const layout = async ({children,params}:LayoutProps) => {
    const self = await getSelfByUsername(params.username)
    if(!self){
        redirect("/")
    }
    return (
        <>  
            <NavBar/>
            <div className='flex pt-20 h-full w-full'>
                <SideBar/>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default layout