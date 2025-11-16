import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const ContactColumnManageDrawer = ({
  isOpen,
  speed = 300,
  maxWidth = '400px',
  backgroundColor = '#fafafa',
  columns = [],
  visibleColumns = [],
  onUpdateColumns,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [localColumns, setLocalColumns] = useState([]);

  useEffect(() => {
    setIsTransitioning(true);
    if (isOpen) {
      setIsVisible(true);
      initLocalColumns();
      toggleBackgroundScrolling(true);
    } else {
      toggleBackgroundScrolling(false);
      setTimeout(() => setIsVisible(false), speed);
    }
    setTimeout(() => setIsTransitioning(false), speed);
  }, [isOpen, speed]);

  useEffect(() => {
    initLocalColumns();
  }, [columns, visibleColumns]);

  const toggleBackgroundScrolling = (enable) => {
    const body = document.querySelector('body');
    body.style.overflow = enable ? 'hidden' : null;
  };

  const closeDrawer = () => {
    if (!isTransitioning) {
      initLocalColumns();
      onClose();
    }
  };

  const initLocalColumns = () => {
    setLocalColumns(
      columns.map(label => ({
        label,
        visible: visibleColumns.includes(label)
      }))
    );
  };

  const updateVisibleList = (index, label, checked) => {
    setLocalColumns(prev => prev.map((col, idx) =>
      idx === index ? { ...col, visible: checked } : col
    ));
  };

  const handleUpdateVisibleList = () => {
    const visible = localColumns
      .filter(col => col.visible)
      .map(col => col.label);
    if (!visible.length) return;
    onUpdateColumns(visible);
    closeDrawer();
  };

  const filteredColumns = localColumns.filter(col =>
    col.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer} direction="right">
      <DrawerContent className="max-w-md" style={{ maxWidth }}>
        <DrawerHeader>
          <DrawerTitle>Manage Table Columns</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 ">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search columns..."
            className="mb-4"
          />
          <div className="space-y-2 max-h-115 overflow-y-auto">
            {filteredColumns.map((col, idx) => (
              <div key={col.label} className="flex items-center space-x-2">
                <Checkbox
                  id={col.label}
                  checked={col.visible}
                  onCheckedChange={(checked) => updateVisibleList(idx, col.label, checked)}
                />
                <label htmlFor={col.label} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {col.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleUpdateVisibleList} className="w-full">Save</Button>
          <Button variant="outline" onClick={closeDrawer} className="w-full">Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ContactColumnManageDrawer;
