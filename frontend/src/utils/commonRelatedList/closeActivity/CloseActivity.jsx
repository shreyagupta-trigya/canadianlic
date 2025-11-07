import React, { useState } from 'react';
import CloseActivityDrawer from './CloseActivityDrawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const CloseActivity = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

    return (
        <>
            <CloseActivityDrawer isOpen={isDrawerOpen} speed={500} onClose={closeDrawer} addTask={addTask} />
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                        <div className="relative inline-block">
                            <Input className="w-64" type="search" placeholder="Search" aria-label="Search" />
                            <i className="fas fa-search absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-600"></i>
                        </div>
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
                            {tasks.map(task => (
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
