import React, { useState } from 'react';
import { Drawer, DrawerContent } from '../../../components/ui/drawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const LogCallDrawer = ({ isOpen, onClose }) => {
  const [callFor, setCallFor] = useState('Contact');
  const [relatedTo, setRelatedTo] = useState('Account');
  const [callType] = useState('Outbound');
  const [outgoingCallStatus] = useState('Completed');
  const [callStartDate, setCallStartDate] = useState('');
  const [callStartTime, setCallStartTime] = useState('');
  const [callDurationMinutes, setCallDurationMinutes] = useState('00');
  const [callDurationSeconds, setCallDurationSeconds] = useState('00');
  const [subject, setSubject] = useState('Outgoing call to -');
  const [voiceRecording, setVoiceRecording] = useState('');
  const [callPurpose, setCallPurpose] = useState('-None-');
  const [callAgenda, setCallAgenda] = useState('');
  const [callResult, setCallResult] = useState('-None-');
  const [description, setDescription] = useState('');
  const [isStartTimeInvalid, setIsStartTimeInvalid] = useState(false);

  const handleSubmit = () => {
    if (!callStartDate || !callStartTime) {
      setIsStartTimeInvalid(true);
      return;
    }
    setIsStartTimeInvalid(false);
    const startDateTime = `${callStartDate} ${callStartTime}`;
    const payload = {
      start_time: startDateTime,
      duration: `${callDurationMinutes}:${callDurationSeconds}`,
      subject,
      voice_recording: voiceRecording,
      call_purpose: callPurpose,
      call_agenda: callAgenda,
      call_result: callResult,
      description,
    };
    console.log('Submitting:', payload);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="w-full max-w-2xl">
        <div className="p-6 space-y-6 max-h-[100vh] overflow-y-scroll">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Log a call</h2>
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
                <Label>Call Duration</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={callDurationMinutes}
                    onChange={(e) => setCallDurationMinutes(e.target.value)}
                    className="w-20"
                    placeholder="00"
                  />
                  <span className="text-sm">minutes</span>
                  <Input
                    value={callDurationSeconds}
                    onChange={(e) => setCallDurationSeconds(e.target.value)}
                    className="w-20"
                    placeholder="00"
                  />
                  <span className="text-sm">seconds</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                />
              </div>

              <div className="space-y-2">
                <Label>Voice Recording</Label>
                <Input
                  value={voiceRecording}
                  onChange={(e) => setVoiceRecording(e.target.value)}
                  placeholder="Enter voice recording URL"
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
                  <SelectTrigger className="w-full">
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

          <div>
            <h3 className="text-lg font-semibold mb-4">Outcome Of Outgoing Call</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Call Result</Label>
                <Select value={callResult} onValueChange={setCallResult}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-None-">-None-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LogCallDrawer;
