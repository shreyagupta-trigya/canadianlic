import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Drawer, DrawerContent } from '../../../components/ui/drawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OpenActivityDrawer = ({ isOpen, onClose, addTask, updateData, updateTask, selectedButton }) => {
  const [task, setTask] = useState({
    subject: '',
    status: '',
    dueDate: '',
    taskPriority: '',
    owner: '',
    reminder: '',
    taskRepeat: '',
    refrenceModule: '',
    description: '',
  });
  const [users, setUsers] = useState([]);
  const [isReminderChecked, setIsReminderChecked] = useState(false);
  const [isReminderChecked2, setIsReminderChecked2] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isPopupOpen3, setIsPopupOpen3] = useState(false);

  useEffect(() => {
    fetchUsers();
    if (updateData) {
      setTask({
        subject: updateData.subject || '',
        status: updateData.status || '',
        dueDate: updateData.dueDate || '',
        taskPriority: updateData.taskPriority || '',
        owner: updateData.owner || '',
        refrenceModule: updateData.refrenceModule || '',
        description: updateData.description || '',
      });
    }
  }, [updateData]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}lead/api/v1/get-users`);
      setUsers(response.data?.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await addTask(task);
      if (res?.data?.success) {
        setTask({
          subject: '',
          status: '',
          dueDate: '',
          taskPriority: '',
          owner: '',
          reminder: '',
          taskRepeat: '',
          refrenceModule: '',
          description: '',
        });
        onClose();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const res = await updateTask({ ...task, id: updateData.id });
      if (res?.data?.success) {
        setTask({
          subject: '',
          status: '',
          dueDate: '',
          taskPriority: '',
          owner: '',
          reminder: '',
          taskRepeat: '',
          refrenceModule: '',
          description: '',
        });
        onClose();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isReminderChecked) setIsReminderChecked(true);
    else setIsReminderChecked(false);
  };

  const openPopup2 = () => {
    setIsPopupOpen2(true);
  };

  const closePopup2 = () => {
    setIsPopupOpen2(false);
  };

  const openPopup3 = () => {
    setIsPopupOpen3(!isPopupOpen3);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent   className="w-full max-w-2xl">
        <div className="p-6 space-y-6 max-h-[100vh] overflow-y-scroll">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {selectedButton === 'Update' ? 'Update Task' : 'Add Task'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={task.subject}
              onChange={handleInputChange}
              placeholder="Enter task subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={task.dueDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={task.taskPriority || "none"}
              onValueChange={(value) => setTask({ ...task, taskPriority: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Owner</Label>
            <Select
              value={task.owner}
              onValueChange={(value) => setTask({ ...task, owner: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {users.map((owner) => (
                  <SelectItem key={owner.ROWID} value={owner.ROWID}>
                    {owner.firstName} {owner.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="reminder"
              checked={isReminderChecked}
              onCheckedChange={setIsReminderChecked}
            />
            <Label htmlFor="reminder">Reminder</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="repeat"
              checked={isReminderChecked2}
              onCheckedChange={setIsReminderChecked2}
            />
            <Label htmlFor="repeat">Repeat</Label>
          </div>

          <Button
            variant="outline"
            onClick={openPopup3}
            className="w-full"
          >
            Show More
          </Button>

          {isPopupOpen3 && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Related To</Label>
                  <Select
                    value={task.refrenceModule || "contact"}
                    onValueChange={(value) => setTask({ ...task, refrenceModule: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select related to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contact">Contact Name</SelectItem>
                      <SelectItem value="1">One</SelectItem>
                      <SelectItem value="2">Two</SelectItem>
                      <SelectItem value="3">Three</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={task.status || "not-started"}
                    onValueChange={(value) => setTask({ ...task, status: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Working">Working</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={selectedButton === 'Update' ? handleUpdateTask : handleSubmit}>
              {selectedButton === 'Update' ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OpenActivityDrawer;
