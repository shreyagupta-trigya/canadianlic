import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MassUpdateModal = ({ isOpen, fields, onUpdateMass, onClose }) => {
  const [selectedField, setSelectedField] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [search, setSearch] = useState('');

  const filteredFields = fields ? fields.filter(f =>
    f.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const update = () => {
    onUpdateMass({
      field: selectedField,
      value: updateValue
    });
    handleClose();
  };

  const handleClose = () => {
    setSelectedField('');
    setUpdateValue('');
    setSearch('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mass Update</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select a field</label>
            <div className="flex items-center space-x-2 mt-1">
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a field" />
                </SelectTrigger>
                <SelectContent>
                  {filteredFields.map(field => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedField && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedField('')}
                  className="px-2"
                >
                  ✕
                </Button>
              )}
            </div>
          </div>
          <div>
            <Input
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={update}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MassUpdateModal;
