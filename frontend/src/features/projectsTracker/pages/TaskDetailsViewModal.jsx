import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, CalendarIcon, ChevronDown, CircleDotIcon, Command, DotIcon, Link, MessageCircle, MessageCircleCode, Pin, PlusIcon } from 'lucide-react'
import { priorities, TaskLabels } from '../helper/constants'
import SideBarTask from '../components/SideBarTask'
import { Separator } from '@/components/ui/separator'
import { IconMessageCircle } from '@tabler/icons-react'
import { Card } from '@/components/ui/card'
import { BsCircleFill } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { leadOwner } from '@/features/utils/ListViewMenu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import SubTasksListView from '../components/SubTasksListView'

function TaskDetailsViewModal({ details }) {
    //taking taskDatas for UI Dev purpose only, it should take from the redux storage
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

    const [status, setStatus] = useState("")
    const [startDate, setStartDate] = useState(details.startDate || new Date())
    const [dueDate, setDueDate] = useState(details.dueDate || new Date())
    const [openStartDate, setOpenStartDate] = useState(false)
    const [openDueDate, setOpenDueDate] = useState(false)
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant={'outline'} size={'xs'} className={'text-[10px] text-blue-800 border-blue-400 bg-blue-100 hover:bg-blue-50 cursor-pointer'}>View</Button>
                </DialogTrigger>
                <DialogContent className="min-w-[95vw] min-h-[95vh] rounded-xl max-h-[95vh] p-0">
                    <div className='md:flex' >
                        <div className='hidden bg-accent rounded-xl md:block w-1/5  h-full' >
                            <div className=' h-[9vh] flex justify-center items-center' >
                                {/* <DotIcon className={TaskLabels?.find((item) => item.id === details.status)?.textColor} size={50} /> */}
                                <p className='font-semibold' > {TaskLabels?.find((item) => item.id === details.status)?.label}</p>
                            </div>
                            <div className="overflow-y-auto  h-[85vh] space-y-4 p-4">

                                {taskDatas.filter((item) => {
                                    return item.status == details.status
                                }).map((item) => {
                                    return <SideBarTask isSelected={item.id == details.id} task={item} />
                                })}
                            </div>
                        </div>
                        <div className='w-full md:w-4/5  h-full' >
                            <div className=' h-[20vh] p-6' >
                                <DialogHeader>
                                    <DialogTitle>{details.taskName}</DialogTitle>
                                    <DialogDescription className={' z-10'} >
                                        <div className=' mt-1 flex items-center gap-3 text-sm text-muted-foreground' >
                                            <h6>By {details.owner}</h6>
                                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                                            <div className='flex items-center gap-1' >
                                                <Briefcase size={'15'} />
                                                <h6 className='truncate max-w-[300px]' >{details.projectName}</h6>
                                            </div>
                                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                                            <MessageCircle size={'15'} className='cursor-pointer' />
                                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                                            <Link size={'15'} className='cursor-pointer' />
                                        </div>
                                        <Card className={'px-4 py-4 mt-3 gap-0 shadow-xl'} >
                                            <div className={`flex items-center gap-2 `} >
                                                <BsCircleFill className={TaskLabels?.find((item) => item.id === details.status)?.textColor} size={12} />
                                                <p className='font-semibold' > {TaskLabels?.find((item) => item.id === details.status)?.label}</p>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                                                            size="sm"
                                                        >
                                                            <ChevronDown />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-">
                                                        {TaskLabels.map((item) => {
                                                            return <DropdownMenuItem selected={item.label == details.status} key={item.label} >{item.label}</DropdownMenuItem>
                                                        })}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <p className='text-sm text-muted-foreground mt-1' >Current Status</p>

                                        </Card>
                                    </DialogDescription>
                                </DialogHeader>

                            </div>
                            <div className="overflow-y-auto  h-[74vh]  space-y-4 p-6">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full bg-card text-card-foreground mt-3 rounded-xl border shadow-sm"
                                    defaultValue="item-1"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className={'bg-muted px-5 text-base rounded-xl'} >Task Description</AccordionTrigger>
                                        <AccordionContent className="flex mt p-5 flex-col gap-4 text-balance">
                                            <Textarea>
                                                Our flagship product combines cutting-edge technology with sleek
                                                design. Built with premium materials, it offers unparalleled
                                                performance and reliability.
                                            </Textarea>
                                            {/* <p>
                                Key features include advanced processing capabilities, and an
                                intuitive user interface designed for both beginners and experts.
                            </p> */}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full bg-card text-card-foreground mt-4 rounded-xl border shadow-sm"
                                    defaultValue="item-1"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className={'bg-accent px-5 text-base rounded-xl'} >Task Information</AccordionTrigger>
                                        <AccordionContent className="flex mt-3 px-5 flex-col gap-4 text-balance">
                                            <div className='flex flex-col gap-4' >
                                                {/* <div className="flex w-full lg:w-1/2  justify-between flex-col lg:flex-row gap-3">
                                                    <Label className={'lg:w-3/12'} htmlFor="header">Owner</Label>
                                                    <div className={'lg:w-8/12'}  >
                                                        <Select >
                                                            <SelectTrigger id="type" className="w-full">
                                                                <SelectValue placeholder="Select Task Owner" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {leadOwner.map((item) => {
                                                                    return <SelectItem value={item.value}>{item.label}</SelectItem>
                                                                })}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div> */}
                                                <div className="flex w-full border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                    <Label className="lg:w-3/12 text-sm text-gray-600" htmlFor="owner">
                                                        Owner
                                                    </Label>

                                                    <div className="relative w-full lg:w-8/12">
                                                        <Select>
                                                            <SelectTrigger
                                                                id="owner"
                                                                className={`border-0 w-full  hover:bg-blue-50  `}
                                                            >
                                                                <SelectValue placeholder="Select Task Owner" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {leadOwner.map((item) => (
                                                                    <SelectItem key={item.value} value={item.value}>
                                                                        {item.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="flex w-full border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                    <Label className={' lg:w-3/12'} htmlFor="">Work Hours</Label>
                                                    <Input className={'lg:w-8/12 border-0 w-full  hover:bg-blue-50 focus:outline-none'} type={'text'} value={'1hr'} />
                                                </div>
                                                <div className="flex gap-1 w-full flex-col lg:flex-row justify-between ">
                                                    <div className="flex border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none w-full lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                        <Label className={'lg:w-3/12'} htmlFor="header">Status</Label>
                                                        <div className={'lg:w-8/12'}  >
                                                            <Select defaultValue={TaskLabels?.find((item) => item.id === details.status)?.id} >
                                                                <SelectTrigger id="type" className="w-full border-0 hover:bg-blue-50">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {TaskLabels.map((item) => {
                                                                        return <SelectItem value={item.id} className='flex' ><DotIcon className={`${item.textColor}`} size={100} />{item.label}</SelectItem>
                                                                    })}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="flex mt-4 lg:mt-0 border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none w-full lg:pl-5 lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                        <Label className={'lg:w-4/12'} htmlFor="header">Start Date</Label>
                                                        <div className={'lg:w-8/12 '}>
                                                            <Popover open={openStartDate} onOpenChange={setOpenStartDate} >
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        data-empty={!startDate}
                                                                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal border-0 hover:bg-blue-50"
                                                                    >
                                                                        <CalendarIcon />
                                                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0">
                                                                    <Calendar mode="single" selected={startDate} onSelect={(date) => {

                                                                        setStartDate(date);
                                                                        setOpenStartDate(false)
                                                                    }} />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 w-full flex-col lg:flex-row justify-between ">
                                                    <div className="flex border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none w-full lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                        <Label className={'lg:w-3/12'} htmlFor="header">Due Date</Label>
                                                        <div className={'lg:w-8/12 '}>
                                                            <Popover open={openDueDate} onOpenChange={setOpenDueDate} >
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        data-empty={!dueDate}
                                                                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal border-0 hover:bg-blue-50"
                                                                    >
                                                                        <CalendarIcon />
                                                                        {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0">
                                                                    <Calendar mode="single" selected={dueDate} onSelect={(date) => {

                                                                        setStartDate(date);
                                                                        setOpenStartDate(false)
                                                                    }} />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                    <div className="flex mt-4 lg:mt-0 border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none w-full lg:pl-5 lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                        <Label className={'lg:w-4/12'} htmlFor="header">Duration</Label>
                                                        <div className={'lg:w-8/12 '}>
                                                            <Input type={'text'} className={'border-0 hover:bg-blue-50'} value={'1 hr'} placeholder='Duration' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 w-full flex-col lg:flex-row justify-between ">
                                                    <div className="flex border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none w-full lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                        <Label className={'lg:w-3/12'} htmlFor="header">Priority</Label>
                                                        <div className={'lg:w-8/12'}  >
                                                            <Select defaultValue={details.priority} >
                                                                <SelectTrigger id="type" className="w-full border-0 hover:bg-blue-50">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {priorities.map((item) => {
                                                                        return <SelectItem value={item.value} className='flex' >{item.label}</SelectItem>
                                                                    })}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="flex mt-4 lg:mt-0 border-b-1 border-gray-300 rounded-none px-0 focus:outline-none focus:border-blue-400  hover:border-blue-300 transition duration-200 shadow-none w-full lg:pl-5 lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                                        <Label className={'lg:w-4/12'} htmlFor="header">Completion Percentage</Label>
                                                        <div className={'lg:w-8/12 '}>
                                                            <Input className={'border-0 hover:bg-blue-50'} type={'number'} value={`${details.completionPercentage}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <div className=' ' >
                                    <Tabs defaultValue="sub-tasks" className="max-w-[72vw] flex-col justify-start gap-6 my-4">
                                    <div className="flex items-center justify-between ">
                                        <Label htmlFor="view-selector" className="sr-only">
                                            View
                                        </Label>
                                        <Select defaultValue="outline">
                                            <SelectTrigger className="flex w-fit lg:hidden" size="sm" id="view-selector">
                                                <SelectValue placeholder="Select a view" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="comments">Comments</SelectItem>
                                                <SelectItem value="sub-tasks">Sub Tasks</SelectItem>
                                                <SelectItem value="past-performance">Past Performance</SelectItem>
                                                <SelectItem value="key-personnel">Key Personnel</SelectItem>
                                                <SelectItem value="focus-documents">Focus Documents</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <TabsList
                                            className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 lg:flex">
                                            <TabsTrigger value="comments">Comments</TabsTrigger>
                                            <TabsTrigger value="sub-tasks">Sub Tasks</TabsTrigger>
                                            <TabsTrigger value="key-personnel">
                                                Documents <Badge variant="secondary">2</Badge>
                                            </TabsTrigger>
                                        </TabsList>
                                        <Button variant={'outline'} ><PlusIcon /> Add Sub Task</Button>

                                    </div>
                                    <TabsContent value="sub-tasks"
                                        className="relative flex flex-col gap- overflow-auto" >
                                        <SubTasksListView />
                                    </TabsContent>
                                </Tabs>
                                </div>

                            </div>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default TaskDetailsViewModal
