import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconPlus } from '@tabler/icons-react';
import { leadOwner, projectTemplates } from '@/features/utils/ListViewMenu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';


const ProjectsTrackerForm = () => {

    const isMobile = useIsMobile();
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [openStartDate, setOpenStartDate] = useState(false)
    const [openEndDate, setOpenEndDate] = useState(false)

    return (
        <Drawer direction={isMobile ? "bottom" : "right"} size="lg">
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                // onClick={() => navigate("/crm/accounts/create")}
                >
                    <IconPlus />
                    <span className="hidden lg:inline">Create Project</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="lg:!w-[700px] lg:!max-w-none">
                <DrawerHeader className="gap-1">
                    <DrawerTitle>New Project</DrawerTitle>
                    {/* <DrawerDescription>
                        Showing total visitors for the last 6 months
                    </DrawerDescription> */}
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    {/* {!isMobile && (
                        <>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 0,
                                        right: 10,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        hide
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area
                                        dataKey="mobile"
                                        type="natural"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.6}
                                        stroke="var(--color-mobile)"
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-desktop)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="flex gap-2 leading-none font-medium">
                                    Trending up by 5.2% this month{" "}
                                    <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                    Showing total visitors for the last 6 months. This is just
                                    some random text to test the layout. It spans multiple lines
                                    and should wrap around.
                                </div>
                            </div>
                            <Separator />
                        </>
                    )} */}
                    <form className="flex flex-col gap-4 ">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">Project Title<span className='text-red-300' >*</span></Label>
                            <Input placeholder="Enter Project Title" id="header" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="type">Owner</Label>
                                <Select>
                                    <SelectTrigger id="type" className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {leadOwner.map((item) => {
                                            return <SelectItem value={item.value}>{item.label}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="status">Project Template</Label>
                                <Select >
                                    <SelectTrigger id="status" className="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projectTemplates.map((item) => {
                                            return <SelectItem value={item.value}>{item.label}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
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
                                        <Calendar mode="single" selected={startDate} onSelect={(date)=>{
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
                                        <Calendar mode="single" selected={endDate} onSelect={(date)=>{
                                            setEndDate(date);
                                            setOpenEndDate(false)
                                        }} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">Description</Label>
                            <Textarea className={'h-40'} placeholder="Enter Description" id="header" />
                        </div>
                        {/* <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="target">Target</Label>
                                <Input id="target" defaultValue={item.target} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="limit">Limit</Label>
                                <Input id="limit" defaultValue={item.limit} />
                            </div>
                        </div> */}
                        {/* <div className="flex flex-col gap-3">
                            <Label htmlFor="reviewer">Reviewer</Label>
                            <Select defaultValue={item.reviewer}>
                                <SelectTrigger id="reviewer" className="w-full">
                                    <SelectValue placeholder="Select a reviewer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                                    <SelectItem value="Jamik Tashpulatov">
                                        Jamik Tashpulatov
                                    </SelectItem>
                                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}
                    </form>
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Done</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ProjectsTrackerForm