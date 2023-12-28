"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import qs from 'query-string'
import { useState } from 'react'
import { SearchIcon,X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button} from '@/components/ui/button'
const Search = () => {
    const router = useRouter()
    const [value,setValue] = useState<string>()
    const onSub = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!value || !value.trim()) return 
        const url = qs.stringifyUrl({
            url:'/search',
            query:{
                term:value
            }
        },{skipEmptyString:true})
        router.push(url)
    }

    const onClear = () => {
        setValue("")
    }

    return (
        <form onSubmit={onSub} className='relative flex items-center w-full lg:w-[400px]'>
            <Input value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Search' className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'/>
            {value && (
                <X className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:scale-125 transition-all duration-500' onClick={onClear}/>
            )}
            <Button type='submit' size="sm" variant="secondary" className='rounded-l-none'>
                <SearchIcon className='h-5 w-5 text-muted-foreground'/>
            </Button>
        </form>
    )
}

export default Search