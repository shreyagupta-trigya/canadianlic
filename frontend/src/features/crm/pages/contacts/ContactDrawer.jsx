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

const relationshipStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const preferredContactMethodOptions = ["Email", "Phone", "SMS", "Mail"];

const allFields = [
  { label: 'Lead Converted On', model: 'leadConvertedOn', placeholder: 'Lead Converted On', type: 'date' },
  { label: 'Created Time', model: 'CREATEDTIME', placeholder: 'Created Time', type: 'date' },
  { label: 'Lead Created On', model: 'leadCreatedOn', placeholder: 'Lead Created On', type: 'date' },
  { label: 'Deal Stage Tracking', model: 'dealStageTracking', placeholder: 'Deal Stage', type: 'text' },
  { label: 'Contact Name', model: 'contactName', placeholder: 'Contact Name', type: 'text' },
  { label: 'Mobile', model: 'mobile', placeholder: 'Mobile', type: 'text' },
  { label: 'Email', model: 'email', placeholder: 'Email', type: 'email' },
  { label: 'Service Availed Options', model: 'serviceAvailedOptions', placeholder: 'Services', type: 'text' },
  { label: 'Insurance Leads Source', model: 'insuranceLeadsSource', placeholder: 'Source', type: 'text' },
  { label: 'Assign Advisor', model: 'advisorModuleName', placeholder: 'Advisor', type: 'text' },
  { label: 'CLV Corporate Commission', model: 'clvCorporateCommission', placeholder: 'Commission', type: 'number' },
  { label: 'CLV Advisor Commission', model: 'clvAdvisorCommission', placeholder: 'Commission', type: 'number' },
  { label: 'Last CLV Corporate', model: 'lastCLVCorporate', placeholder: 'CLV Corporate', type: 'number' },
  { label: 'Last CLV Advisor', model: 'lastCLVAdvisor', placeholder: 'CLV Advisor', type: 'number' },
  { label: 'Phone', model: 'phoneNumber', placeholder: 'Phone', type: 'text' },
  { label: 'Contact Owner', model: 'UserfullName', placeholder: 'Owner', type: 'text' },
  { label: 'Mailing Street', model: 'mailingStreet', placeholder: 'Street', type: 'text' },
  { label: 'Mailing City', model: 'mailingCity', placeholder: 'City', type: 'text' },
  { label: 'Mailing Zip', model: 'mailingZip', placeholder: 'Zip', type: 'text' },
  { label: 'Relationship Status', model: 'relationshipStatus', placeholder: 'Status', type: 'array', options: relationshipStatusOptions },
  { label: 'Emergency Contact', model: 'emergencyContact', placeholder: 'Emergency Contact', type: 'text' },
  { label: 'Emergency Contact Email', model: 'emergencyContactEmail', placeholder: 'Email', type: 'email' },
  { label: 'Emergency Contact Phone', model: 'emergencyContactPhone', placeholder: 'Phone', type: 'text' },
  { label: 'Emergency Contact Relationship', model: 'emergencyContactRelationship', placeholder: 'Relationship', type: 'text' },
  { label: 'Preferred Contact Method', model: 'preferredContactMethod', placeholder: 'Method', type: 'array', options: preferredContactMethodOptions },
  { label: 'Date of Birth', model: 'dateOfBirth', placeholder: 'Date of Birth', type: 'date' },
  { label: 'New Service Requested', model: 'newServiceRequested', placeholder: 'Service', type: 'text' },
  { label: 'GCLID', model: 'gclid', placeholder: 'GCLID', type: 'text' },
];

const ContactDrawer = ({ isOpen, onClose, onSearchResults }) => {
  const [searchFieldTitle, setSearchFieldTitle] = useState("");
  const [fieldChecks, setFieldChecks] = useState({});
  const [operationForm, setOperationForm] = useState({});
  const [form, setForm] = useState({});
  const [inputVisibility, setInputVisibility] = useState({});
  const [betweenFields, setBetweenFields] = useState({});
  const [datePickers, setDatePickers] = useState({});

  const getOperationOptions = (field) => {
    console.log(field.type);
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

  const searchContacts = () => {
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
          <DrawerDescription>Search and filter contacts</DrawerDescription>
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
                              <CalendarIcon className="mr-2 h-4 w-4" />
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
                              <CalendarIcon className="mr-2 h-4 w-4" />
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
                            <CalendarIcon className="mr-2 h-4 w-4" />
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
            <Button className="text-white" variant="primary" onClick={searchContacts}>
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

export default ContactDrawer;
