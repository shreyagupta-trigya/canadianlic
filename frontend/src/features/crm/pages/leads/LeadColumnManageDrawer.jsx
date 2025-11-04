import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const LeadColumnManageDrawer = ({ isOpen, visibleColumns, allColumns, onClose, onColumnsChange }) => {
  const [searchText, setSearchText] = useState("");
  const [localColumns, setLocalColumns] = useState([]);

  useEffect(() => {
    if (isOpen) {
      initLocalColumns();
    }
  }, [isOpen, allColumns, visibleColumns]);

  const initLocalColumns = () => {
    setLocalColumns(
      allColumns?.map(label => ({
        label,
        visible: visibleColumns.includes(label)
      }))
    );
  };

  const handleToggleColumn = (label, checked) => {
    setLocalColumns(prev =>
      prev?.map(col =>
        col.label === label ? { ...col, visible: checked } : col
      )
    );
  };

  const handleUpdateVisibleList = () => {
    const visible = localColumns
      .filter(col => col.visible)
      .map(col => col.label);
    if (visible.length) {
      onColumnsChange(visible);
      onClose();
    }
  };

  const filteredColumns = localColumns.filter(col =>
    col.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Manage Table Columns</DrawerTitle>
          <DrawerDescription>
            Select which columns to display in the table.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Input
            placeholder="Search columns..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredColumns.map(col => (
              <div key={col.label} className="flex items-center space-x-2">
                <Checkbox
                  id={col.label}
                  checked={col.visible}
                  onCheckedChange={(checked) => handleToggleColumn(col.label, checked)}
                />
                <Label htmlFor={col.label}>{col.label}</Label>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleUpdateVisibleList}>Save</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LeadColumnManageDrawer;
