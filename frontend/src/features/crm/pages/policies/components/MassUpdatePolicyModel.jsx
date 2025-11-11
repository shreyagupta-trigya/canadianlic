import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MassUpdatePolicyModel = ({ isOpen, fields, onUpdateMass, onClose }) => {
  const [selectedField, setSelectedField] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleUpdate = () => {
    if (selectedField && newValue) {
      onUpdateMass({ field: selectedField, value: newValue });
      setSelectedField('');
      setNewValue('');
    }
  };

  const handleClose = () => {
    setSelectedField('');
    setNewValue('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mass Update Policies</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="field">Select Field to Update</Label>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a field" />
              </SelectTrigger>
              <SelectContent>
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="value">New Value</Label>
            <Input
              id="value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter new value"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!selectedField || !newValue}>
            Update All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MassUpdatePolicyModel;
