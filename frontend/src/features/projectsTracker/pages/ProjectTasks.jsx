import { FormHeading } from '@/components/custom/CustomFormComponents'
import ProjectCard from '@/components/custom/ProjectCard'
import ProjectKanban from '@/components/custom/ProjectKanban'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { TaskLabels } from '../helper/constants'

const ProjectTasks = () => {
    const taskDatas = [
        {
            "id": "STDN-06432",
            "projectName": "Nation Electrical Contractors, LLC",
            "taskName": "Test The entire application",
            // "img": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
            "status": "fixtures",
            "owner": "James Connel",
            "startDate": "09-02-2025",
            "dueDate": "02-11-2025",
            "duration": "1 hr",
            "priority": "none",
            "createdBy": "James Connal",
            "completionPercentage": "35",
            "completionDate": "",
            "subTasks": [
                {
                    "id": "STDN-03243",
                    "projectName": "Nation Electrical Contractors, LLC",
                    "taskName": "Sub task of UAT",
                    "status": "fixtures",
                    "owner": "James Connel",
                    "startDate": "09-03-2025",
                    "dueDate": "04-12-2025",
                    "duration": "2 hr",
                    "priority": "none",
                    "createdBy": "James Connal",
                    "completionPercentage": "2",
                    "completionDate": "",
                }
            ]
        },
        {
            "id": "STDN-06440",
            "status": "fixtures",
            "owner": "Prakash Varma",
            "amount": "1200.00",
            "salesOrder": "SO-25-7777",
            "method": "Courier",
            "date": "02 Jul 2025"
        }
    ]

    // const [expandedTasks, setExpandedTasks] = useState([]);

    // const toggleSubTasks = (parentId) => {
    //     setExpandedTasks((prev) =>
    //         prev.includes(parentId)
    //             ? prev.filter((id) => id !== parentId)
    //             : [...prev, parentId]
    //     );
    // };


    return (
        <div className='mx-4' >
            <FormHeading>Nation Electrical Contractors, LLC</FormHeading>
            <div className='border bg-background rounded-xl my-3 h-14' >
                {/* <h3>Project Description</h3> */}
            </div>
            <ProjectKanban
                data={taskDatas}
                columns={TaskLabels}
                renderCard={({ item, selected, onSelect, dragListeners, dragAttributes, hasSubTasks, isExpanded, onToggleExpand, isSubTask }) => (
                    <ProjectCard
                        item={item}
                        selected={selected}
                        onSelect={onSelect}
                        dragListeners={dragListeners}
                        dragAttributes={dragAttributes}
                        hasSubTasks={hasSubTasks}
                        isExpanded={isExpanded}
                        onToggleExpand={onToggleExpand}
                        isSubTask={isSubTask}
                    />
                )}

            />
        </div>
    )
}

export default ProjectTasks