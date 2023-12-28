import React from 'react'
import NavBar from './_components/NavBar'

const BrowseLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <NavBar/>
            <div className='flex h-full w-full pt-20'>
                {children}
            </div>
        </div>
    )
}

export default BrowseLayout