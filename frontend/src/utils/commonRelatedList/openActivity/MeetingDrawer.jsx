import React, { useState } from 'react';
import { Drawer, DrawerContent } from '../../../components/ui/drawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const MeetingDrawer = ({ isOpen, onClose }) => {
  const [bookingSummary, setBookingSummary] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [reRunRoundRobin, setReRunRoundRobin] = useState(false);
  const [roundRobinProcessed, setRoundRobinProcessed] = useState(false);
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState('15 Minutes before');
  const [customReminder, setCustomReminder] = useState('None');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Meeting submitted');
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="w-full max-w-2xl">
        <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Meeting</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bookingSummary">Booking Summary</Label>
            <Input
              id="bookingSummary"
              value={bookingSummary}
              onChange={(e) => setBookingSummary(e.target.value)}
              placeholder="Enter booking summary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingDate">Meeting Date</Label>
            <Input
              id="meetingDate"
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="reRunRoundRobin"
              checked={reRunRoundRobin}
              onCheckedChange={setReRunRoundRobin}
            />
            <Label htmlFor="reRunRoundRobin">Re-run round robin</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="roundRobinProcessed"
              checked={roundRobinProcessed}
              onCheckedChange={setRoundRobinProcessed}
            />
            <Label htmlFor="roundRobinProcessed">Round Robin Processed</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Leave a comment here"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Reminder</Label>
            <Select value={reminder} onValueChange={setReminder}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15 Minutes before">15 Minutes before</SelectItem>
                <SelectItem value="5 Minutes before">5 Minutes before</SelectItem>
                <SelectItem value="10 Minutes before">10 Minutes before</SelectItem>
                <SelectItem value="30 Minutes before">30 Minutes before</SelectItem>
                <SelectItem value="1 day before">1 day before</SelectItem>
                <SelectItem value="2 hours before">2 hours before</SelectItem>
                <SelectItem value="2 day before">2 day before</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Custom Reminder</Label>
            <Select value={customReminder} onValueChange={setCustomReminder}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="15 Minutes before">15 Minutes before</SelectItem>
                <SelectItem value="5 Minutes before">5 Minutes before</SelectItem>
                <SelectItem value="10 Minutes before">10 Minutes before</SelectItem>
                <SelectItem value="30 Minutes before">30 Minutes before</SelectItem>
                <SelectItem value="1 day before">1 day before</SelectItem>
                <SelectItem value="1 hour before">1 hour before</SelectItem>
                <SelectItem value="2 day before">2 day before</SelectItem>
                <SelectItem value="2 hours before">2 hours before</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MeetingDrawer;
