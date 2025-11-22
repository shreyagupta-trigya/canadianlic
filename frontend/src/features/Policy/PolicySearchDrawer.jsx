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

const policyStatusOptions = ["Active", "Expired", "Pending", "Cancelled"];
const policyTypeOptions = ["Life Insurance", "Health Insurance", "Auto Insurance", "Home Insurance"];

const allFields = [
  { label: 'Action', model: 'Action', placeholder: 'Action', type: 'text' },
  { label: 'Created Time *', model: 'Created Time *', placeholder: 'Created Time *', type: 'date' },
  { label: 'Application Submitted On', model: 'Application Submitted On', placeholder: 'Application Submitted On', type: 'date' },
  { label: 'Policy Name', model: 'Policy Name', placeholder: 'Policy Name', type: 'text' },
  { label: 'Client', model: 'Client', placeholder: 'Client', type: 'text' },
  { label: 'Client Mobile', model: 'Client Mobile', placeholder: 'Client Mobile', type: 'text' },
  { label: 'Policy Type', model: 'Policy Type', placeholder: 'Policy Type', type: 'array', options: policyTypeOptions },
  { label: 'Policy Status', model: 'Policy Status', placeholder: 'Policy Status', type: 'array', options: policyStatusOptions },
  { label: 'Premium Frequency', model: 'Premium Frequency', placeholder: 'Premium Frequency', type: 'text' },
  { label: 'Insurance Company Account', model: 'Insurance Company Account', placeholder: 'Insurance Company Account', type: 'text' },
  { label: 'Advisor Commision Amount', model: 'Advisor Commision Amount', placeholder: 'Advisor Commision Amount', type: 'number' },
  { label: 'Policy Premium (Read I)', model: 'Policy Premium (Read I)', placeholder: 'Policy Premium (Read I)', type: 'number' },
  { label: 'Email', model: 'Email', placeholder: 'Email', type: 'text' },
  { label: 'Policy Start Date', model: 'Policy Start Date', placeholder: 'Policy Start Date', type: 'date' },
  { label: 'Policy Renewal Date', model: 'Policy Renewal Date', placeholder: 'Policy Renewal Date', type: 'date' },
  { label: 'Policy Owner', model: 'Policy Owner', placeholder: 'Policy Owner', type: 'text' },
  { label: 'Policy Number', model: 'Policy Number', placeholder: 'Policy Number', type: 'text' },
  { label: 'Policy Advisor', model: 'Policy Advisor', placeholder: 'Policy Advisor', type: 'text' },
  { label: 'How Many Days Left', model: 'How Many Days Left', placeholder: 'How Many Days Left', type: 'number' },
  { label: 'Issued By', model: 'Issued By', placeholder: 'Issued By', type: 'text' },
  { label: 'Early Return', model: 'Early Return', placeholder: 'Early Return', type: 'text' },
  { label: 'Modified Time', model: 'Modified Time', placeholder: 'Modified Time', type: 'date' },
  { label: 'Location', model: 'Location', placeholder: 'Location', type: 'text' },
  { label: 'Layout', model: 'Layout', placeholder: 'Layout', type: 'text' },
  { label: 'Confirmation Policy Start?', model: 'Confirmation Policy Start?', placeholder: 'Confirmation Policy Start?', type: 'text' },
  { label: 'Policy Month', model: 'Policy Month', placeholder: 'Policy Month', type: 'text' },
  { label: 'Advisor Payout', model: 'Advisor Payout', placeholder: 'Advisor Payout', type: 'number' },
  { label: 'Product FYC%', model: 'Product FYC%', placeholder: 'Product FYC%', type: 'number' },
  { label: 'Advisor Bonus% of FYC', model: 'Advisor Bonus% of FYC', placeholder: 'Advisor Bonus% of FYC', type: 'number' },
  { label: 'Insured 1 Date of Birth', model: 'Insured 1 Date of Birth', placeholder: 'Insured 1 Date of Birth', type: 'date' },
  { label: 'Reason for Policy Being Declined', model: 'Reason for Policy Being Declined', placeholder: 'Reason for Policy Being Declined', type: 'text' },
  { label: 'Beneficiary 1 Date of Birth', model: 'Beneficiary 1 Date of Birth', placeholder: 'Beneficiary 1 Date of Birth', type: 'date' },
  { label: 'Send to BOT Result', model: 'Send to BOT Result', placeholder: 'Send to BOT Result', type: 'text' },
  { label: 'Cancellation', model: 'Cancellation', placeholder: 'Cancellation', type: 'text' },
  { label: 'Whatsapp', model: 'Whatsapp', placeholder: 'Whatsapp', type: 'text' },
  { label: 'Coverage Amount', model: 'Coverage Amount', placeholder: 'Coverage Amount', type: 'number' },
  { label: 'Contract Name', model: 'Contract Name', placeholder: 'Contract Name', type: 'text' },
  { label: 'Investment', model: 'Investment', placeholder: 'Investment', type: 'number' },
  { label: 'Frequency', model: 'Frequency', placeholder: 'Frequency', type: 'text' },
  { label: 'Corporate Commision', model: 'Corporate Commision', placeholder: 'Corporate Commision', type: 'number' },
  { label: 'Investment Name', model: 'Investment Name', placeholder: 'Investment Name', type: 'text' },
  { label: 'Client Address', model: 'Client Address', placeholder: 'Client Address', type: 'text' },
];

const PolicySearchDrawer = ({ isOpen, onClose, onSearchResults }) => {
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

  const searchPolicies = () => {
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
          <DrawerTitle>Filter Policies</DrawerTitle>
          <DrawerDescription>Search and filter policies</DrawerDescription>
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
            <Button className="text-white" variant="primary" onClick={searchPolicies}>
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

export default PolicySearchDrawer;
