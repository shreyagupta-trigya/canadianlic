import { FormSubHeading } from '@/components/custom/CustomFormComponents';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { leadOwner, projectTemplates } from '@/features/utils/ListViewMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { priorities } from '../helper/constants';

function AddTask({
    item
}) {
    const isMobile = useIsMobile()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [openStartDate, setOpenStartDate] = useState(false)
    const [openEndDate, setOpenEndDate] = useState(false)

    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button size={'sm'} variant="outline"><PlusIcon /></Button>
            </DrawerTrigger>
            <DrawerContent className="lg:!w-[700px] lg:!max-w-none">
                <DrawerHeader className="gap-1">
                    <DrawerTitle>Add Task</DrawerTitle>
                    {/* <DrawerDescription>
                        Showing total visitors for the last 6 months
                    </DrawerDescription> */}
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    {/* {!isMobile && (
                        <>

                        </>
                    )} */}
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="header">Task Name<span className='text-red-300' >*</span></Label>
                        <Input placeholder="Enter Task Name" id="header" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="header">Add Description</Label>
                        <Textarea className={'h-40'} placeholder="Enter Description" id="header" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="status">Task List</Label>
                        <Select >
                            <SelectTrigger id="status" className="w-full">
                                <SelectValue placeholder="Select Task List" />
                            </SelectTrigger>
                            <SelectContent>
                                {projectTemplates.map((item) => {
                                    return <SelectItem value={item.value}>{item.label}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    <FormSubHeading className={''} >Task Information</FormSubHeading>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="type">Owner</Label>
                        <Select>
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
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="header">Work Hours</Label>
                        <Input placeholder="Enter Task Name" type={'time'} id="header" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">

                            <Label htmlFor="date" className="px-1">
                                Start Date
                            </Label>
                            <Popover open={openStartDate} onOpenChange={setOpenStartDate} >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!startDate}
                                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
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
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="status">End Date</Label>
                            <Popover open={openEndDate} onOpenChange={setOpenEndDate} >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!endDate}
                                        className="data-[empty=true]:text-muted-foreground  justify-start text-left font-normal"
                                    >
                                        <CalendarIcon />
                                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={endDate} onSelect={(date) => {
                                        setEndDate(date);
                                        setOpenEndDate(false)
                                    }} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="type">Task Priority</Label>
                            <Select>
                                <SelectTrigger id="type" className="w-full">
                                    <SelectValue placeholder="Select Task Owner" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priorities.map((item) => {
                                        return <SelectItem value={item.value}>{item.label}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="type">Task ID</Label>
                            <Input placeholder="Task ID" id="header" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="header">Tags<span className='text-red-300' >*</span></Label>
                        <Input placeholder="Enter tags" id="header" />
                    </div>

                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Done</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default AddTask