import React, { useState } from 'react';
import { Drawer, DrawerContent } from '../../../components/ui/drawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ScheduleCallDrawer = ({ isOpen, onClose }) => {
  const [callFor, setCallFor] = useState('Contact');
  const [relatedTo, setRelatedTo] = useState('Account');
  const [callType] = useState('Outbound');
  const [outgoingCallStatus] = useState('Scheduled');
  const [callStartDate, setCallStartDate] = useState('2025-06-09');
  const [callStartTime, setCallStartTime] = useState('13:00');
  const [callOwner, setCallOwner] = useState('Peter Antony Joseph');
  const [subject, setSubject] = useState('Call scheduled with -');
  const [callPurpose, setCallPurpose] = useState('-None-');
  const [callAgenda, setCallAgenda] = useState('');
  const [isStartTimeInvalid, setIsStartTimeInvalid] = useState(false);

  const handleSubmit = () => {
    if (!callStartDate || !callStartTime) {
      setIsStartTimeInvalid(true);
      return;
    }
    setIsStartTimeInvalid(false);
    const startDateTime = `${callStartDate} ${callStartTime}`;
    const payload = { start_time: startDateTime };
    console.log('Submitting:', payload);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="w-full max-w-2xl">
        <div className="p-6 space-y-6 max-h-[100vh] overflow-y-scroll">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Schedule a call</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Call Information</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Call For</Label>
                <Select value={callFor} onValueChange={setCallFor}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contact">Contact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Related To</Label>
                <Select value={relatedTo} onValueChange={setRelatedTo}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Account">Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Call Type</Label>
                <div className="relative">
                  <Input value={callType} readOnly className="pr-10 border-red-500" />
                  <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Outgoing Call Status</Label>
                <div className="relative">
                  <Input value={outgoingCallStatus} readOnly className="pr-10" />
                  <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Call Start Time</Label>
                <div className="flex">
                  <Input
                    type="date"
                    value={callStartDate}
                    onChange={(e) => setCallStartDate(e.target.value)}
                    className={isStartTimeInvalid ? "border-red-500" : ""}
                  />
                  <Input
                    type="time"
                    value={callStartTime}
                    onChange={(e) => setCallStartTime(e.target.value)}
                    className="ml-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Call Owner</Label>
                <Select value={callOwner} onValueChange={setCallOwner}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Peter Antony Joseph">Peter Antony Joseph</SelectItem>
                    <SelectItem value="Antony Joseph">Antony Joseph</SelectItem>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Purpose Of Outgoing Call</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Call Purpose</Label>
                <Select value={callPurpose} onValueChange={setCallPurpose}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-None-">-None-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Call Agenda</Label>
                <Input
                  value={callAgenda}
                  onChange={(e) => setCallAgenda(e.target.value)}
                  placeholder="Enter call agenda"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Schedule
            </Button>
          </div>
        </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ScheduleCallDrawer;
