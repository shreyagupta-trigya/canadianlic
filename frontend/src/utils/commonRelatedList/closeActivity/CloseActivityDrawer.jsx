import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CloseActivityDrawer = ({ isOpen, onClose, speed = 300 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isReminderChecked, setIsReminderChecked] = useState(false);
    const [isRepeatChecked, setIsRepeatChecked] = useState(false);
    const drawerRef = useRef(null);

    useEffect(() => {
        setIsTransitioning(true);
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
            setTimeout(() => setIsVisible(false), speed);
        }
        setTimeout(() => setIsTransitioning(false), speed);
    }, [isOpen, speed]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const toggleReminderSwitch = (checked) => {
        setIsReminderChecked(checked);
        console.log("Reminder Switch:", checked ? "ON" : "OFF");
    };

    const toggleRepeatSwitch = (checked) => {
        setIsRepeatChecked(checked);
        console.log("Repeat Switch:", checked ? "ON" : "OFF");
    };

    const closeDrawer = () => {
        if (!isTransitioning) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50">
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isOpen ? 'opacity-50' : 'opacity-0'
                }`}
            ></div>
            <div
                ref={drawerRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } ${isVisible ? 'block' : 'hidden'}`}
            >
                <div className="p-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeDrawer}
                        className="mb-4"
                    >
                        <i className="fa fa-arrow-right"></i>
                    </Button>

                    <h4 className="text-lg font-semibold mb-4">Create Task</h4>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input type="date" id="dueDate" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label>Priority</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="High" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label>Owner</Label>
                            <span>Pushpinder Puri</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-center">
                            <Label>Reminder</Label>
                            <Switch
                                checked={isReminderChecked}
                                onCheckedChange={toggleReminderSwitch}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-center">
                            <Label>Repeat</Label>
                            <Switch
                                checked={isRepeatChecked}
                                onCheckedChange={toggleRepeatSwitch}
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>More Fields</Label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label>Contact Name</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Insurance" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="insurance">Insurance</SelectItem>
                                    <SelectItem value="action2">action2</SelectItem>
                                    <SelectItem value="action3">Action3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label>Related To</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Customer Support" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="insurance">Insurance</SelectItem>
                                    <SelectItem value="action2">action2</SelectItem>
                                    <SelectItem value="action3">Action3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label>Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Not Started" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="action2">action2</SelectItem>
                                    <SelectItem value="action3">Action3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Leave a comment here"
                                className="col-span-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloseActivityDrawer;
