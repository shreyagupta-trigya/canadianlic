import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LocationMassUpdateModal = ({ isOpen, fields, onClose, onUpdate, selectedLocations }) => {
  const [selectedField, setSelectedField] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const handleUpdate = () => {
    onUpdate({ field: selectedField, value: updateValue });
    handleClose();
  };

  const handleClose = () => {
    setSelectedField("");
    setUpdateValue("");
    onClose();
  };

  const filteredFields = Array.isArray(fields) ? fields : [];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mass Update Locations</DialogTitle>
          <DialogDescription>
            Select a field and enter the value to update multiple locations.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="field-select">Select a field</Label>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="w-full mt-1" id="field-select">
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>
              <SelectContent>
                {filteredFields.map(field => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="update-value">Enter value</Label>
            <Input
              id="update-value"
              placeholder="Enter value"
              value={updateValue}
              className="w-full mt-1"
              onChange={(e) => setUpdateValue(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationMassUpdateModal;
