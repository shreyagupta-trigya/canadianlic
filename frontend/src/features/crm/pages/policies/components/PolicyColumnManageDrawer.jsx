import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const PolicyColumnManageDrawer = ({ isOpen, onClose, columns, visibleColumns, onUpdateColumns }) => {
  const [tempVisibleColumns, setTempVisibleColumns] = React.useState(visibleColumns);

  React.useEffect(() => {
    setTempVisibleColumns(visibleColumns);
  }, [visibleColumns]);

  const handleColumnToggle = (column) => {
    if (tempVisibleColumns.includes(column)) {
      setTempVisibleColumns(tempVisibleColumns.filter(col => col !== column));
    } else {
      setTempVisibleColumns([...tempVisibleColumns, column]);
    }
  };

  const handleSave = () => {
    onUpdateColumns(tempVisibleColumns);
    onClose();
  };

  const handleSelectAll = () => {
    setTempVisibleColumns(columns);
  };

  const handleDeselectAll = () => {
    setTempVisibleColumns([]);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Manage Columns</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeselectAll}>
              Deselect All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
            {columns.map((column) => (
              <div key={column} className="flex items-center space-x-2">
                <Checkbox
                  id={column}
                  checked={tempVisibleColumns.includes(column)}
                  onCheckedChange={() => handleColumnToggle(column)}
                />
                <Label htmlFor={column} className="text-sm font-normal">
                  {column}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PolicyColumnManageDrawer;
