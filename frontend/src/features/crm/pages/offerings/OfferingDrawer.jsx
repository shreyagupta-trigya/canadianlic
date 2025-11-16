import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const stringComponent = [
  { value: "is", label: "Is" },
  { value: "is_not", label: "Is Not" },
  { value: "contains", label: "Contains" },
  { value: "does_not_contain", label: "Does Not Contain" },
  { value: "starts_with", label: "Starts With" },
  { value: "ends_with", label: "Ends With" },
];

const booleanComponent = [
  { value: "is", label: "Is" },
  { value: "is_not", label: "Is Not" },
];

const offeringActiveOptions = ["Active", "Inactive"];

const allFields = [
  { label: 'Offering Name', model: 'offeringName', placeholder: 'Offering Name', type: 'text' },
  { label: 'Offering Active', model: 'offeringActive', placeholder: 'Active', type: 'boolean', options: offeringActiveOptions },
  { label: 'Offering Category', model: 'offeringCategory', placeholder: 'Category', type: 'text' },
  { label: 'Offering Type', model: 'offeringType', placeholder: 'Type', type: 'text' },
  { label: 'Insurance Partner Name', model: 'insurancePartnerName', placeholder: 'Partner Name', type: 'text' },
];

const OfferingDrawer = ({ isOpen, onClose, onSearchResults }) => {
  const [searchFieldTitle, setSearchFieldTitle] = useState("");
  const [fieldChecks, setFieldChecks] = useState({});
  const [operationForm, setOperationForm] = useState({});
  const [form, setForm] = useState({});
  const [inputVisibility, setInputVisibility] = useState({});
  const [betweenFields, setBetweenFields] = useState({});
  const [datePickers, setDatePickers] = useState({});

  const getOperationOptions = (field) => {
    if (['text', 'email', 'picklist', 'array'].includes(field.type)) {
      return stringComponent;
    } else if (field.type === 'boolean') {
      return booleanComponent;
    } else {
      return stringComponent;
    }
  };

  const handleOperationChange = (fieldName, operation) => {
    setBetweenFields(prev => ({ ...prev, [fieldName]: operation === "between" }));
    setInputVisibility(prev => ({ ...prev, [fieldName]: operation && operation !== "between" }));
  };

  const handleCheckboxChange = (model, checked) => {
    setFieldChecks(prev => ({ ...prev, [model]: checked }));
    if (checked) {
      const operations = getOperationOptions(allFields.find(f => f.model === model));
      setOperationForm(prev => ({ ...prev, [model]: operations[0]?.value || '' }));
    } else {
      setOperationForm(prev => ({ ...prev, [model]: '' }));
    }
  };

  const searchOfferings = () => {
    const searchFields = [];
    allFields.forEach(field => {
      if (fieldChecks[field.model]) {
        let value = '';
        if (operationForm[field.model] === 'between') {
          const from = form[`${field.model}From`];
          const to = form[`${field.model}To`];
          if (from && to) {
            value = [from, to];
          }
        } else {
          value = form[field.model] || '';
        }
        searchFields.push({
          field: field.model,
          operation: operationForm[field.model] || 'is',
          value
        });
      }
    });
    onSearchResults(searchFields);
    onClose();
  };

  const resetFilters = () => {
    setForm({});
    setFieldChecks({});
    setOperationForm({});
    setInputVisibility({});
    setBetweenFields({});
  };

  const filteredFields = allFields.filter(field =>
    field.label.toLowerCase().includes(searchFieldTitle.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right" >
      <DrawerContent width="22%">
        <DrawerHeader>
          <DrawerTitle>Filter Fields By</DrawerTitle>
          <DrawerDescription>Search and filter offerings</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Input
            placeholder="Search fields..."
            value={searchFieldTitle}
            onChange={(e) => setSearchFieldTitle(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredFields.map(field => (
              <div key={field.model} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.model}
                    checked={fieldChecks[field.model] || false}
                    onCheckedChange={(checked) => handleCheckboxChange(field.model, checked)}
                  />
                  <Label htmlFor={field.model}>{field.label}</Label>
                </div>
                {fieldChecks[field.model] && (
                  <div className="ml-6 space-y-2">
                    <Select
                      value={operationForm[field.model] || ""}
                      onValueChange={(value) => {
                        setOperationForm(prev => ({ ...prev, [field.model]: value }));
                        handleOperationChange(field.model, value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select operation" />
                      </SelectTrigger>
                      <SelectContent>
                        {getOperationOptions(field).map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.type === 'boolean' ? (
                      <Select
                        value={form[field.model] || ""}
                        onValueChange={(value) => setForm(prev => ({ ...prev, [field.model]: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.model] || ""}
                        onChange={(e) => setForm(prev => ({ ...prev, [field.model]: e.target.value }))}
                        className="w-full"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <div className="flex gap-2 justify-center">
            <Button className="text-white" variant="primary" onClick={searchOfferings}>
              Search
            </Button>
            <Button variant="destructive" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  );
};

export default OfferingDrawer;
