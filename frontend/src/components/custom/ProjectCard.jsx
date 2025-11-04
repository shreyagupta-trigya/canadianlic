import { Calendar, CircleUser, GripVertical, User, UserRound } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@assets/logo.webp"
import TaskDetailsViewModal from "@/features/projectsTracker/pages/TaskDetailsViewModal";


const ProjectCard = ({
    item,
    selected,
    onSelect = () => { },
    dragListeners = {},
    dragAttributes = {},
    hasSubTasks = true,
    isExpanded = false,
    onToggleExpand = () => { },
    isSubTask = false,
}) => {

    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <Card
            // onClick={() => onSelect(item.id)}
            className="py-2 rounded-md shadow-sm  relative">
            <CardContent className=" text-sm px-2">
                <div className="flex justify-between w-full " >
                    <div
                        {...dragAttributes}
                        {...dragListeners}
                        className="cursor-grab  hover:text-gray-500  w-4/5"
                    >
                        <div className=" flex items-center" >
                            <GripVertical size={16} />
                            <p className="text-muted-foreground text-sm" >{item.id}</p>
                        </div>
                    </div>
                    <div  >
                        {/* <Button onClick={() => navigate(`/projects-tracker/tasks/${id}/${item.id}`, { state: { details: item } })} variant={'outline'} size={'xs'} className={'text-[10px] text-blue-800 border-blue-400 bg-blue-100 hover:bg-blue-50 cursor-pointer'} >View</Button> */}
                        <TaskDetailsViewModal details={item} />
                    </div>
                </div>

                <div className=" my-3">
                    <Textarea className={'min-h-4'} defaultValue={item.taskName} type={'text'} />
                    <div className="h-32 border my-2 rounded-2xl flex justify-center items-center" >
                        <img src={logo} className="h-28  rounded-2xl" />
                    </div>
                    <div title="Owner" className="flex items-center gap-1 mt-3 text-muted-foreground/80" >
                        <CircleUser size={'14'} className="" />
                        <p className="text-xs" >{item.owner}</p>
                    </div>
                    <div className="my-2 flex items-center gap-2">
                        <Progress value={item.completionPercentage} className="w-[60%]" /> <p className="text-[11px] text-muted-foreground/80" >{item.completionPercentage || 0}%</p>
                    </div>
                    <div title="Due Date" className="flex items-center gap-1 mt-3 text-muted-foreground/80" >
                        <Calendar size={'14'} className="" />
                        <p className="text-xs" >{item.dueDate}</p>
                    </div>
                    

                </div>
                {hasSubTasks && (
                        <div
                            onClick={onToggleExpand}
                            className=" cursor-pointer text-xs text-muted-foreground"
                            title={isExpanded ? "Collapse" : "Expand"}
                        >
                            {isExpanded ? "expanded" : "expand"}
                        </div>
                    )}
            </CardContent>
        </Card>
    );
};

export default ProjectCard;