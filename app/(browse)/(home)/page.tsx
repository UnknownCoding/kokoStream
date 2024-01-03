import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { Suspense } from 'react';
import Results, { ResultsSkeleton } from '../_components/Results';

export default function Home() {
  return (
    <div className="h-full max-w-screen-2xl p-8 mx-auto">
      {/* TODO - FIX THE LOADING STATE HERE DOESNT WORK */}
      <Suspense fallback={<ResultsSkeleton />}>
        <Results/>
      </Suspense>
    </div>
  )
}
