import { Skeleton } from '@/components/ui/skeleton';
import { getSearch } from '@/lib/search-service';
import React from 'react'
import ResultCard, { ResultCardSkeleton } from './ResultCard';

interface ResultsProps {
    term?: string;
};

const Results = async ({term}:ResultsProps) => {
    const data = await getSearch(term)
    return (
        <div>
            <h2>Results for the term &quot;{term}&quot;</h2>
            {data.length === 0 && (
                <p className='text-muted-foreground text-sm'>No results found, Try searching for something else</p>
            )}
            <div className='flex flex-col gap-y-4 pt-5'>
                {data.map((da,i)=>(
                    <ResultCard data={da} key={i}/>
                ))}
            </div>
        </div>
    )
}

export default Results

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};