import { FormHeading } from '@/components/custom/CustomFormComponents'
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CalendarIcon, Dot, DotIcon, PlusIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { priorities, TaskLabels } from '../helper/constants';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { leadOwner } from '@/features/utils/ListViewMenu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SubTasksListView from '../components/SubTasksListView';

const TaskDetails = () => {
    const location = useLocation();
    const { details } = location.state || {}
    const [status, setStatus] = useState("")
    const [startDate, setStartDate] = useState(details.startDate || new Date())
    const [dueDate, setDueDate] = useState(details.dueDate || new Date())
    const [openStartDate, setOpenStartDate] = useState(false)
    const [openDueDate, setOpenDueDate] = useState(false)

    // console.log(location.state,'taskdetails')
    return (
        <div className='mx-4' >
            <FormHeading>{details?.taskName}</FormHeading>
            <div className=' mt-2 flex items-center gap-3 text-sm text-muted-foreground' >
                <h6>By {details.owner}</h6>
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <div className='flex items-center gap-1' >
                    <Briefcase size={'15'} />
                    <h6>{details.projectName}</h6>
                </div>
            </div>
            <Card className={'px-4 my-3 gap-0'} >
                <div className={`flex border w-fit pr-5 rounded-md items-center `} >
                    <DotIcon className={TaskLabels?.find((item) => item.id === details.status)?.textColor} size={50} />
                    <p className='font-semibold' > {TaskLabels?.find((item) => item.id === details.status)?.label}</p>
                </div>
                <p className='text-sm text-muted-foreground mt-1' >Current Status</p>

            </Card>
            <Accordion
                type="single"
                collapsible
                className="w-full bg-card text-card-foreground  rounded-xl border shadow-sm"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className={'bg-muted px-5 text-lg rounded-xl'} >Task Description</AccordionTrigger>
                    <AccordionContent className="flex mt-3 p-5 flex-col gap-4 text-balance">
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
                    <AccordionTrigger className={'bg-muted px-5 text-lg rounded-xl'} >Task Information</AccordionTrigger>
                    <AccordionContent className="flex mt-3 px-5 flex-col gap-4 text-balance">
                        <div className='flex flex-col gap-4' >
                            <div className="flex w-full lg:w-1/2  justify-between flex-col lg:flex-row gap-3">
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
                            </div>
                            <div className="flex w-full lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                <Label className={' lg:w-3/12'} htmlFor="">Work Hours</Label>
                                <Input className={'lg:w-8/12'} type={'text'} value={'1hr'} />
                            </div>
                            <div className="flex  w-full flex-col lg:flex-row justify-between ">
                                <div className="flex  w-full lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                    <Label className={'lg:w-3/12'} htmlFor="header">Status</Label>
                                    <div className={'lg:w-8/12'}  >
                                        <Select defaultValue={TaskLabels?.find((item) => item.id === details.status)?.id} >
                                            <SelectTrigger id="type" className="w-full">
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
                                <div className="flex mt-4 lg:mt-0 w-full lg:pl-5 lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                    <Label className={'lg:w-4/12'} htmlFor="header">Start Date</Label>
                                    <div className={'lg:w-8/12 '}>
                                        <Popover open={openStartDate} onOpenChange={setOpenStartDate} >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    data-empty={!startDate}
                                                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
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
                            <div className="flex  w-full flex-col lg:flex-row justify-between ">
                                <div className="flex  w-full lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                    <Label className={'lg:w-3/12'} htmlFor="header">Due Date</Label>
                                    <div className={'lg:w-8/12 '}>
                                        <Popover open={openDueDate} onOpenChange={setOpenDueDate} >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    data-empty={!dueDate}
                                                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
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
                                <div className="flex mt-4 lg:mt-0 w-full lg:pl-5 lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                    <Label className={'lg:w-4/12'} htmlFor="header">Duration</Label>
                                    <div className={'lg:w-8/12 '}>
                                        <Input type={'text'} value={'1 hr'} placeholder='Duration' />
                                    </div>
                                </div>
                            </div>
                            <div className="flex  w-full flex-col lg:flex-row justify-between ">
                                <div className="flex  w-full lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                    <Label className={'lg:w-3/12'} htmlFor="header">Priority</Label>
                                    <div className={'lg:w-8/12'}  >
                                        <Select defaultValue={details.priority} >
                                            <SelectTrigger id="type" className="w-full">
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
                                <div className="flex mt-4 lg:mt-0 w-full lg:pl-5 lg:w-1/2 justify-between flex-col lg:flex-row gap-3">
                                    <Label className={'lg:w-4/12'} htmlFor="header">Completion Percentage</Label>
                                    <div className={'lg:w-8/12 '}>
                                        <Input type={'number'} value={`${details.completionPercentage}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Tabs defaultValue="sub-tasks" className="w-full flex-col justify-start gap-6 my-4">
                <div className="flex items-center justify-between ">
                    <Label htmlFor="view-selector" className="sr-only">
                        View
                    </Label>
                    <Select defaultValue="outline">
                        <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
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
                        className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                        <TabsTrigger value="comments">Comments</TabsTrigger>
                        <TabsTrigger value="sub-tasks">Sub Tasks</TabsTrigger>
                        <TabsTrigger value="past-performance">
                            Log Hours 
                        </TabsTrigger>
                        <TabsTrigger value="key-personnel">
                            Documents <Badge variant="secondary">2</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="focus-documents">Forums</TabsTrigger>
                        <TabsTrigger value="focus-documents">Dependancy</TabsTrigger>
                        <TabsTrigger value="focus-documents">Status Timeline</TabsTrigger>
                    </TabsList>
                    <Button variant={'outline'} ><PlusIcon/> Add Sub Task</Button>

                </div>
                <TabsContent value="sub-tasks"
                    className="relative flex flex-col gap- overflow-auto" >
                    <SubTasksListView />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TaskDetails