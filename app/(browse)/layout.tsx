import React from 'react'
import NavBar from './_components/NavBar'
import SideBar from './_components/SideBar'
import Container from './_components/Container'

const BrowseLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <NavBar/>
            <div className='flex h-full w-full pt-20'>
                <SideBar/>
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    )
}

export default BrowseLayout