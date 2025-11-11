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
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";

const stringComponent = [
  { value: "is", label: "Is" },
  { value: "is_not", label: "Is Not" },
  { value: "contains", label: "Contains" },
  { value: "does_not_contain", label: "Does Not Contain" },
  { value: "starts_with", label: "Starts With" },
  { value: "ends_with", label: "Ends With" },
];

const dateComponent = [
  { value: "is", label: "Is" },
  { value: "is_not", label: "Is Not" },
  { value: "before", label: "Before" },
  { value: "after", label: "After" },
  { value: "between", label: "Between" },
];

const numberComponent = [
  { value: "is", label: "Is" },
  { value: "is_not", label: "Is Not" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "between", label: "Between" },
];

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
const priorityOptions = ["High", "Medium", "Low"];
const serviceTypeOptions = ["Technical Support", "Billing Inquiry", "Product Issue", "Account Setup"];

const allFields = [
  { label: 'Activity Badge', model: 'Activity Badge', placeholder: 'Activity Badge', type: 'text' },
  { label: 'Created Time', model: 'Created Time', placeholder: 'Created Time', type: 'date' },
  { label: 'Task Name', model: 'Task Name', placeholder: 'Task Name', type: 'text' },
  { label: 'Policies', model: 'Policies', placeholder: 'Policies', type: 'text' },
  { label: 'Description', model: 'Description', placeholder: 'Description', type: 'text' },
  { label: 'Status', model: 'Status', placeholder: 'Status', type: 'array', options: ['Completed', 'Pending', 'In Progress'] },
  { label: 'Updated Policy Module - ZOHO', model: 'Updated Policy Module - ZOHO', placeholder: 'Updated Policy Module - ZOHO', type: 'text' },
  { label: 'Request BOT/Email Company/Cancel Portal', model: 'Request BOT/Email Company/Cancel Portal', placeholder: 'Request BOT/Email Company/Cancel Portal', type: 'text' },
  { label: 'Confirmation Received by us', model: 'Confirmation Received by us', placeholder: 'Confirmation Received by us', type: 'text' },
  { label: 'Confirmation to Client', model: 'Confirmation to Client', placeholder: 'Confirmation to Client', type: 'text' },
  { label: 'Comment on Contact Profile - ZOHO', model: 'Comment on Contact Profile - ZOHO', placeholder: 'Comment on Contact Profile - ZOHO', type: 'text' },
  { label: 'Effective Date Matches on Confirmation', model: 'Effective Date Matches on Confirmation', placeholder: 'Effective Date Matches on Confirmation', type: 'text' },
  { label: 'Task Completed CSR Name', model: 'Task Completed CSR Name', placeholder: 'Task Completed CSR Name', type: 'text' },
  { label: 'Contacts', model: 'Contacts', placeholder: 'Contacts', type: 'text' },
  { label: 'Last Activity Time', model: 'Last Activity Time', placeholder: 'Last Activity Time', type: 'date' },
  { label: 'Customer Service Owner', model: 'Customer Service Owner', placeholder: 'Customer Service Owner', type: 'text' },
  { label: 'Policy Advisor', model: 'Policy Advisor', placeholder: 'Policy Advisor', type: 'text' },
  { label: 'Contact Mobile', model: 'Contact Mobile', placeholder: 'Contact Mobile', type: 'text' },
  { label: 'Created By', model: 'Created By', placeholder: 'Created By', type: 'text' },
  { label: 'Currency', model: 'Currency', placeholder: 'Currency', type: 'text' },
  { label: 'Exchange Rate', model: 'Exchange Rate', placeholder: 'Exchange Rate', type: 'number' },
  { label: 'Tag', model: 'Tag', placeholder: 'Tag', type: 'text' },
  { label: 'Unsubscribed Mode', model: 'Unsubscribed Mode', placeholder: 'Unsubscribed Mode', type: 'text' },
  { label: 'Unsubscribed Time', model: 'Unsubscribed Time', placeholder: 'Unsubscribed Time', type: 'date' },
  { label: 'Group Insurance', model: 'Group Insurance', placeholder: 'Group Insurance', type: 'text' },
  { label: 'Policy Expiry Date', model: 'Policy Expiry Date', placeholder: 'Policy Expiry Date', type: 'date' },
  { label: 'Renewal Follow Up Date', model: 'Renewal Follow Up Date', placeholder: 'Renewal Follow Up Date', type: 'date' },
  { label: 'Policy Renewal Date', model: 'Policy Renewal Date', placeholder: 'Policy Renewal Date', type: 'date' },
  { label: 'Renewal Completed', model: 'Renewal Completed', placeholder: 'Renewal Completed', type: 'text' },
  { label: 'New Policy Renewal Date', model: 'New Policy Renewal Date', placeholder: 'New Policy Renewal Date', type: 'date' },
  { label: 'New Policy Premium', model: 'New Policy Premium', placeholder: 'New Policy Premium', type: 'number' },
  { label: 'Issued By', model: 'Issued By', placeholder: 'Issued By', type: 'text' },
  { label: 'Connected To', model: 'Connected To', placeholder: 'Connected To', type: 'text' },
  { label: 'Refund Amount', model: 'Refund Amount', placeholder: 'Refund Amount', type: 'number' },
];

const CustomerServiceSearchDrawer = ({ isOpen, onClose, onSearchResults }) => {
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
    } else if (field.type === 'date') {
      return dateComponent;
    } else if (field.type === 'number') {
      return numberComponent;
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

  const searchTickets = () => {
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
          <DrawerTitle>Filter Customer Service </DrawerTitle>
          <DrawerDescription>Search and filter customer service </DrawerDescription>
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
                    {betweenFields[field.model] ? (
                      <div className="space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${!form[`${field.model}From`] && "text-muted-foreground"}`}
                            >
                              <IconCalendar className="mr-2 h-4 w-4" />
                              {form[`${field.model}From`] ? format(form[`${field.model}From`], "PPP") : "Pick from date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={form[`${field.model}From`]}
                              onSelect={(date) => setForm(prev => ({ ...prev, [`${field.model}From`]: date }))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${!form[`${field.model}To`] && "text-muted-foreground"}`}
                            >
                              <IconCalendar className="mr-2 h-4 w-4" />
                              {form[`${field.model}To`] ? format(form[`${field.model}To`], "PPP") : "Pick to date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={form[`${field.model}To`]}
                              onSelect={(date) => setForm(prev => ({ ...prev, [`${field.model}To`]: date }))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    ) : (field.type === 'array' || field.type === 'picklist') ? (
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
                    ) : field.type === 'date' ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${!form[field.model] && "text-muted-foreground"}`}
                          >
                            <IconCalendar className="mr-2 h-4 w-4" />
                            {form[field.model] ? format(form[field.model], "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={form[field.model]}
                            onSelect={(date) => setForm(prev => ({ ...prev, [field.model]: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
            <Button className="text-white" variant="primary" onClick={searchTickets}>
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

export default CustomerServiceSearchDrawer;
