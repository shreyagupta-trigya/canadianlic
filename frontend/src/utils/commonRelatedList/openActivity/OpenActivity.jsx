import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Edit, Trash2, CheckSquare, Calendar, Phone, PhoneCall } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OpenActivityDrawer from './OpenActivityDrawer';
import MeetingDrawer from './MeetingDrawer';
import ScheduleCallDrawer from './ScheduleCallDrawer';
import LogCallDrawer from './LogCallDrawer';
import CallNowDrawer from './CallNowDrawer';

const OpenActivity = ({ id }) => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isMeetingDrawerOpen, setIsMeetingDrawerOpen] = useState(false);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);
  const [isCallNowDrawerOpen, setIsCallNowDrawerOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const [updateData, setUpdateData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getTaskList();
  }, []);

  const openTaskDrawer = () => setIsTaskDrawerOpen(true);
  const closeTaskDrawer = () => setIsTaskDrawerOpen(false);

  const openMeetingsDrawer = () => setIsMeetingDrawerOpen(true);
  const closeMeetingsDrawer = () => setIsMeetingDrawerOpen(false);

  const openScheduleDrawer = () => setIsScheduleDrawerOpen(true);
  const closeScheduleDrawer = () => setIsScheduleDrawerOpen(false);

  const openLogDrawer = () => setIsLogDrawerOpen(true);
  const closeLogDrawer = () => setIsLogDrawerOpen(false);

  const openCallNowDrawer = () => setIsCallNowDrawerOpen(true);
  const closeCallNowDrawer = () => setIsCallNowDrawerOpen(false);

  const switchButton = (button, id, subject, description, status, taskPriority, dueDate, refrenceModule, owner) => {
    setSelectedButton(button);
    setUpdateData({
      id,
      subject,
      description,
      status,
      taskPriority,
      dueDate,
      refrenceModule,
      owner,
    });
  };

  const addTask = async (task) => {
    try {
      const data = {
        subject: task.subject,
        status: task.status,
        owner: task.owner,
        dueDate: task.dueDate,
        taskPriority: task.taskPriority,
        refrenceModule: task.refrenceModule,
        description: task.description,
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/create-task`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.success) {
        toast.success('Task Added Successfully!');
        getTaskList();
      }
      return response;
    } catch (error) {
      toast.error('An error occurred while creating the task.');
      console.log('Error', error);
    }
  };

  const getTaskList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/get-task`);
      if (response.data.success) {
        setIsLoading(false);
        const taskData = response.data.taskResp.map((item) => ({
          subject: item.subject,
          status: item.status,
          taskId: item.rowId,
          dueDate: item.dueDate,
          taskPriority: item.taskPriority,
          owner: item.owner,
          refrenceModule: item.refrenceModule,
          description: item.description,
        }));
        setTaskList(taskData);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error in getting task data', error);
    }
  };

  const updateTask = async (data) => {
    const task = {
      subject: data.subject,
      status: data.status,
      id: data.id,
      dueDate: data.dueDate,
      taskPriority: data.taskPriority,
      owner: data.owner,
      refrenceModule: data.refrenceModule,
      description: data.description,
    };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/update-task/${data.id}`, task);
      if (response.data.success) {
        toast.success('Task Updated Successfully!');
        getTaskList();
      }
      return response;
    } catch (error) {
      console.log('error in updating task', error);
      toast.error('An error occurred while updating the task.');
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/delete-task/${id}`);
        setIsLoading(false);
        if (response.data.success) {
          toast.success('Task Deleted Successfully!');
        }
        setTaskList(taskList.filter((item) => item.taskId !== id));
        return response;
      } catch (error) {
        setIsLoading(false);
        toast.error('An error occurred while deleting the task.');
        console.log('Error in deleting task', error);
      }
    }
  };

  return (
    <>
      <OpenActivityDrawer
        updateData={updateData}
        updateTask={updateTask}
        isOpen={isTaskDrawerOpen}
        onClose={closeTaskDrawer}
        addTask={addTask}
        selectedButton={selectedButton}
      />
        <MeetingDrawer
          isOpen={isMeetingDrawerOpen}
          onClose={closeMeetingsDrawer}
        />

        <ScheduleCallDrawer
          isOpen={isScheduleDrawerOpen}
          onClose={closeScheduleDrawer}
        />
        <LogCallDrawer
          isOpen={isLogDrawerOpen}
          onClose={closeLogDrawer}
        />
        <CallNowDrawer
          isOpen={isCallNowDrawerOpen}
          onClose={closeCallNowDrawer}
        />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-full lg:w-2/6 md:w-2/6 sm:w-full">
            <Input
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="search"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary">
                <Plus className="h-4 w-4 " />
                Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => { openTaskDrawer(); setSelectedButton('add'); }}>
                <CheckSquare className="h-4 w-4 mr-2" />
                Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openMeetingsDrawer}>
                <Calendar className="h-4 w-4 mr-2" />
                Meeting
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={openScheduleDrawer}>
                <Phone className="h-4 w-4 mr-2" />
                Schedule a call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openLogDrawer}>
                <PhoneCall className="h-4 w-4 mr-2" />
                Log a call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openCallNowDrawer}>
                <PhoneCall className="h-4 w-4 mr-2" />
                Call now
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-24">Actions</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taskList.map((item) => (
                <TableRow key={item.taskId}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          switchButton(
                            'Update',
                            item.taskId,
                            item.subject,
                            item.description,
                            item.status,
                            item.taskPriority,
                            item.dueDate,
                            item.refrenceModule,
                            item.owner
                          ) && openTaskDrawer()
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(item.taskId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.subject}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.taskPriority}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>{item.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default OpenActivity;
