import React, { useState } from 'react';
import CloseActivityDrawer from './CloseActivityDrawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
import { Search } from "lucide-react";

const CloseActivity = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
<<<<<<< HEAD
=======
=======

const CloseActivity = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Final Submission', status: 'Close' },
        { id: 2, name: 'Status pending', status: 'Close' },
        { id: 3, name: 'Update record', status: 'Close' },
    ]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const addTask = (newTask) => {
        setTasks([...tasks, { id: Date.now(), ...newTask }]);
    };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

<<<<<<< HEAD
=======
    return (
        <>
            {isDrawerOpen && <CloseActivityDrawer isOpen={isDrawerOpen} onClose={closeDrawer} addTask={addTask} />}
            <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full lg:w-2/6 md:w-2/6 sm:w-full">
                        <Input
                            className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
=======
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
    return (
        <>
            {isDrawerOpen && <CloseActivityDrawer isOpen={isDrawerOpen} onClose={closeDrawer} addTask={addTask} />}
            <div className="flex flex-col">
<<<<<<< HEAD
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full lg:w-2/6 md:w-2/6 sm:w-full">
                        <Input
                            className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
=======
                <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                        <div className="relative inline-block">
                            <Input className="w-64" type="search" placeholder="Search" aria-label="Search" />
                            <i className="fas fa-search absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-600"></i>
                        </div>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    </div>
                    {/* <div>
                        <Button onClick={toggleDrawer} variant="outline">Add New</Button>
                    </div> */}
                </div>

                <div className="border border-gray-300 rounded-md overflow-scroll scrollbar-hide px-0 mt-3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-4">
                                    <Checkbox />
                                </TableHead>
                                <TableHead>Task Name</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
<<<<<<< HEAD
                            {filteredTasks.map(task => (
=======
<<<<<<< HEAD
                            {filteredTasks.map(task => (
=======
                            {tasks.map(task => (
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                                <TableRow key={task.id}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="cursor-pointer">{task.name}</TableCell>
                                    <TableCell className="cursor-pointer">{task.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default CloseActivity;
