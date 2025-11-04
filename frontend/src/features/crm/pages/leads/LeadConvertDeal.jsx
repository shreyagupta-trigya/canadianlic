import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const LeadConvertDeal = ({ isOpen, onClose, leadId }) => {
  const handleConvert = () => {
    // Implement conversion logic here
    console.log("Converting lead to deal:", leadId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert Lead to Deal</DialogTitle>
          <DialogDescription>
            Are you sure you want to convert this lead to a deal?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConvert}>Convert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadConvertDeal;
