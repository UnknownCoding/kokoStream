import { Skeleton } from '@/components/ui/skeleton';
import { getStreams } from '@/lib/feed-service';
import React from 'react'
import ResultCard, { ResultCardSkeleton } from './ResultCard';

const Results = async () => {
    const data = await getStreams()
    return (
        <div>
            <h2 className='text-lg font-semibold mb-4'>Stream&apos;s we think you would like</h2>
            {data.length === 0 && (
                <div className='text-muted-foreground text-sm'>
                    No streams found
                </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {data.map((data,i)=>(
                    // @ts-expect-error
                    // fix this issue quick!
                    <ResultCard data={data} key={i}/>
                ))}
            </div>
        </div>
    )
}

export default Results

export const ResultsSkeleton = () => {
    return (
        <div>
            sadadas
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};