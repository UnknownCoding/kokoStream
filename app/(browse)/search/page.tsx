import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import Results, { ResultsSkeleton } from './_components/Results'

interface SearchPageProps{
    searchParams:{
        term?:string
    }
}

const page = ({searchParams}:SearchPageProps) => {
    if(!searchParams.term){
        redirect("/")
    }
    return (
        <div className='h-full w-full p-8 mx-auto max-w-2xl'>
            {/* TODO - fix this suspense */}
            <Suspense fallback={<ResultsSkeleton/>}>
                <Results term={searchParams.term}/>
            </Suspense>
        </div>
    )
}

export default page