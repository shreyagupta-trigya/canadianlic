import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MassUpdatePolicyEmail = ({ isOpen, onClose, onSubmit, selectedContacts }) => {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [templateId, setTemplateId] = useState('');

  const handleSubmit = () => {
    const contactData = selectedContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject,
      message
    }));

    onSubmit({ from, contactData, templateId });
    // Reset form
    setFrom('');
    setSubject('');
    setMessage('');
    setTemplateId('');
  };

  const handleClose = () => {
    setFrom('');
    setSubject('');
    setMessage('');
    setTemplateId('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mass Email Policies</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="from">From Email</Label>
            <Input
              id="from"
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="template">Email Template (Optional)</Label>
            <Select value={templateId} onValueChange={setTemplateId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome Template</SelectItem>
                <SelectItem value="renewal">Renewal Reminder</SelectItem>
                <SelectItem value="update">Policy Update</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Email message"
              rows={6}
              required
            />
          </div>
          <div>
            <Label>Selected Recipients ({selectedContacts.length})</Label>
            <div className="max-h-32 overflow-y-auto border rounded p-2">
              {selectedContacts.map((contact, index) => (
                <div key={index} className="text-sm">
                  {contact.name} - {contact.email}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!from || !subject || !message || selectedContacts.length === 0}>
            Send Emails
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MassUpdatePolicyEmail;
