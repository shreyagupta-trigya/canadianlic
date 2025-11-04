import { Badge } from '@/components/ui/badge'
import React from 'react'
import { TaskLabels } from '../helper/constants'
import { Textarea } from '@/components/ui/textarea'

const SideBarTask = ({ task, isSelected }) => {
    return (
        <div className={`${isSelected && 'bg-blue-100 dark:bg-blue-700'} px-3 py-3 w-full border rounded-lg shadow-lg`} >
            <div className='flex justify-between items-center pb-2' >
                <p className={`text-sm ${isSelected ? '' : 'text-muted-foreground'}`} >{task.id}</p>
                <Badge className={TaskLabels?.find((item) => item.id === task.status)?.color} >{TaskLabels?.find((item) => item.id === task.status)?.label}</Badge>
            </div>
            <p className="pb-2 truncate max-w-[400px]">
                {task.taskName}
            </p>
            <p className={`text-sm ${isSelected ? '' : 'text-muted-foreground'}`} >{task.owner}</p>
        </div>
    )
}

export default SideBarTask