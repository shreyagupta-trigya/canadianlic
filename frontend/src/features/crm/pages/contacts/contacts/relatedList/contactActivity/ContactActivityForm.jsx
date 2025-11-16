import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactActivityForm = () => {
  const [taskStatus, setTaskStatus] = useState("open");
  const navigate=useNavigate();
  return (
    <>
    <div className="w-full  bg-white p-4 md:p-6 rounded-md md:shadow-md  space-y-5">
        <div className="border-b flex justify-between pb-4  ">
          <h2 className="text-2xl font-semibold">New Tasks</h2>
          <div className="flex justify-end gap-3">
            <Button onClick={()=>{navigate(-1)}} className={"cursor-pointer"} variant="outline" type="button">
              Close
            </Button>
           
            <Button type="submit" variant="primary" className="cursor-pointer ">
             Submit
             </Button>

          </div>
        </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-2 md:gap-23  w-full">
             <div className="space-y-1 mb-3 md:mb-0">
                <Label className={"text-red-500 mb-2 md:mb-1"} htmlFor="subject">Subject *</Label>
                <Input id="subject" name="subject" placeholder="Enter task subject" required />
              </div>
              <div className="space-y-1">
           <Label  className="mb-2 md:mb-1">Start Date</Label>
                <Input type="date" name="start_date"></Input>
              </div>
            </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-23 w-full">
               <div className="space-y-1 mb-3 md:mb-0">
                <Label className={"text-red-500  mb-2 md:mb-1"}  >Due Date *</Label>
                <Input type={"date"} name="due_date"></Input>
              </div>
              <div className="space-y-1">
               <Label  className="mb-2 md:mb-1">Priority</Label>
                <Select name="priority">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-23 w-full">
                   <div className="space-y-1 mb-3 md:mb-0">
                     <Label  className="mb-2 md:mb-1">Task Owner</Label> 
                <Select defaultValue="Trigya Innovation" name="task_owner">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trigya Innovation">
                      Trigya Innovation
                    </SelectItem>
                    <SelectItem value="Marketing Team">Marketing Team</SelectItem>
                    <SelectItem value="Dev Team">Dev Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Task Status */}
              <div className="space-y-1">
                 <Label  className="mb-2 md:mb-1">Task Status</Label>
                <RadioGroup name="task_status"
                  defaultValue={taskStatus}
                  onValueChange={setTaskStatus}
                  className="flex mt-4 space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="status-open" />
                    <Label htmlFor="status-open">Open</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in_progress" id="status-in-progress" />
                    <Label htmlFor="status-in-progress">In Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="status-completed" />
                    <Label htmlFor="status-completed">Completed</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

        {/* Buttons */}
      </div>
    </>
  );
};

export default ContactActivityForm;

