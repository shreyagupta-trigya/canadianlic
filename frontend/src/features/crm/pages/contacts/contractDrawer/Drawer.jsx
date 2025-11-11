import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const ContractDrawer = ({ isOpen, onSearchResults, onClose }) => {
  const [form, setForm] = useState({
    search: '',
    operation: 'AND',
    fieldChecks: {},
    operationForm: {
      field: '',
      operator: '',
      value: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setForm({
      search: '',
      operation: 'AND',
      fieldChecks: {},
      operationForm: {
        field: '',
        operator: '',
        value: ''
      }
    });
  };

  const handleSearch = () => {
    const searchCriteria = {
      search: form.search,
      operation: form.operation,
      fieldChecks: form.fieldChecks,
      operationForm: form.operationForm
    };
    onSearchResults(searchCriteria);
    onClose();
  };

  const handleReset = () => {
    resetForm();
  };

  const handleFieldCheckChange = (field, checked) => {
    setForm(prev => ({
      ...prev,
      fieldChecks: {
        ...prev.fieldChecks,
        [field]: checked
      }
    }));
  };

  const handleOperationFormChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      operationForm: {          
        ...prev.operationForm,
        [field]: value
      }
    }));
  };

  const fields = [
    'Contract Name',
    'Contract Type',
    'Status',
    'Start Date',
    'End Date',
    'Value',
    'Owner'
  ];

  const operators = [
    'equals',
    'not equals',
    'contains',
    'does not contain',
    'starts with',
    'ends with',
    'greater than',
    'less than',
    'greater than or equal',
    'less than or equal'
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-md">
        <DrawerHeader>
          <DrawerTitle>Advanced Search</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Search</label>
            <Input
              value={form.search}
              onChange={(e) => setForm(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Enter search term"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Operation</label>
            <Select
              value={form.operation}
              onValueChange={(value) => setForm(prev => ({ ...prev, operation: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND</SelectItem>
                <SelectItem value="OR">OR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Fields to Include</label>
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
              {fields.map(field => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={field}
                    checked={form.fieldChecks[field] || false}
                    onCheckedChange={(checked) => handleFieldCheckChange(field, checked)}
                  />
                  <label htmlFor={field} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {field}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Additional Filter</label>
            <div className="mt-2 space-y-2">
              <Select
                value={form.operationForm.field}
                onValueChange={(value) => handleOperationFormChange('field', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  {fields.map(field => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={form.operationForm.operator}
                onValueChange={(value) => handleOperationFormChange('operator', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  {operators.map(operator => (
                    <SelectItem key={operator} value={operator}>
                      {operator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                value={form.operationForm.value}
                onChange={(e) => handleOperationFormChange('value', e.target.value)}
                placeholder="Enter value"
              />
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSearch} className="w-full">Search</Button>
          <Button variant="outline" onClick={handleReset} className="w-full">Reset</Button>
          <Button variant="outline" onClick={onClose} className="w-full">Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ContractDrawer;
