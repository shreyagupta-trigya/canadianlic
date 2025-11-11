import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerClose } from '../../../components/ui/drawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CallNowDrawer = ({ isOpen, onClose }) => {
  const [callFor, setCallFor] = useState('Contact');
  const [relatedTo, setRelatedTo] = useState('Account');
  const [callPurpose, setCallPurpose] = useState('-None-');
  const [callAgenda, setCallAgenda] = useState('');

  const handleSubmit = () => {
    const payload = {
      call_for: callFor,
      related_to: relatedTo,
      call_purpose: callPurpose,
      call_agenda: callAgenda,
    };
    console.log('Submitting:', payload);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="w-full max-w-2xl">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle>Call Now</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm">✕</Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="p-6 space-y-6 max-h-[calc(100vh-100px)] overflow-y-scroll">
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
        </div>

        <DrawerFooter>
          <div className="flex gap-2 justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSubmit}>
              Call
            </Button>
            <Button variant="destructive" onClick={onClose}>
              Reset
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CallNowDrawer;
