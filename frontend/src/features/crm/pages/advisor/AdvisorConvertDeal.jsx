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

const AdvisorConvertDeal = ({ isOpen, onClose, advisorId }) => {
  const handleConvert = () => {
    // Implement conversion logic here
    console.log("Converting advisor to deal:", advisorId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert Advisor to Deal</DialogTitle>
          <DialogDescription>
            Are you sure you want to convert this advisor to a deal?
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

export default AdvisorConvertDeal;
