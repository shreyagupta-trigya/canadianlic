import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ListCardSkeleton = () => {
    return (
        <div className='w-full ' >

            <div className='flex items-center gap-3 px-3 py-3 border-b' >
                <Skeleton className="h-10 w-10 bg-slate-300 flex justify-center items-center rounded-md" />
                <div className="space-y-2 w-full">
                    <Skeleton className="h-5 w-[250px] bg-slate-300" />
                    <Skeleton className="h-3 w-[40%] bg-slate-300" />
                </div>
                {/* <div className='h-10 w-10  flex justify-center items-center rounded-md bg-blue-300 dark:bg-blue-600' >
                   
                </div>
                <div className='' >
                    <h3 className='text-lg' ></h3>
                    <p className='text-sm text-muted-foreground' ></p>
                </div> */}
            </div>
        </div>
    )
}

export default ListCardSkeleton