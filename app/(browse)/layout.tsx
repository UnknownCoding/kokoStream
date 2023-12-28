import React, { Suspense } from 'react'
import NavBar from './_components/NavBar'
import SideBar, { SideBarSkele } from './_components/SideBar'
import Container from './_components/Container'

const BrowseLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <NavBar/>
            <div className='flex h-full w-full pt-20'>
                <Suspense fallback={<SideBarSkele/>}>
                    <SideBar/>
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    )
}

export default BrowseLayout