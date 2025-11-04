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

const insuranceLeadStatusOptions = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];
const leadStatusStageOption = ["Lead", "Prospect", "Customer"];

const allFields = [
  { label: 'Created Time', model: 'createdTime', placeholder: 'Created Time', type: 'date' },
  { label: 'Layout', model: 'layout', placeholder: 'Layout', type: 'text' },
  { label: 'Insurance Lead Name All', model: 'insurenceLeadNameAll', placeholder: 'Lead Name', type: 'text' },
  { label: 'Insurance Lead Status', model: 'insuranceLeadStatus', placeholder: 'Status', type: 'array', options: insuranceLeadStatusOptions },
  { label: 'Lead Status Stage', model: 'leadStatusStage', placeholder: 'Stage', type: 'array', options: leadStatusStageOption },
  { label: 'Mobile', model: 'mobile', placeholder: 'Mobile', type: 'text' },
  { label: 'Insurance Lead Source', model: 'insuranceLeadSource', placeholder: 'Source', type: 'text' },
  { label: 'Assigned Advisor', model: 'assignedAdvisor', placeholder: 'Advisor', type: 'text' },
  { label: 'Email', model: 'email', placeholder: 'Email', type: 'email' },
  { label: 'Services Requested', model: 'servicesRequested', placeholder: 'Services', type: 'text' },
  { label: 'GCLID', model: 'gclid', placeholder: 'GCLID', type: 'text' },
  { label: 'First Page Visited', model: 'firstPageVisited', placeholder: 'Page URL', type: 'text' },
  { label: 'Ad Network', model: 'adNetwork', placeholder: 'Ad Network', type: 'text' },
  { label: 'Last Activity Time', model: 'lastActivityTime', placeholder: 'Last Activity', type: 'text' },
  { label: 'Total Interaction Time (mins)', model: 'totalInteractionTime', placeholder: 'Minutes', type: 'number' },
  { label: 'Phone', model: 'phone', placeholder: 'Phone', type: 'text' },
  { label: 'Created By', model: 'createdBy', placeholder: 'Creator', type: 'text' },
  { label: 'Ad Campaign Name', model: 'adCampaignName', placeholder: 'Campaign', type: 'text' },
  { label: 'Facebook Ad', model: 'facebookAd', placeholder: 'Facebook Ad', type: 'text' },
  { label: 'First Name', model: 'firstName', placeholder: 'First Name', type: 'text' },
  { label: 'Last Name All', model: 'lastNameAll', placeholder: 'Last Name', type: 'text' },
  { label: 'Keyword', model: 'keyword', placeholder: 'Keyword', type: 'text' },
  { label: 'Submit Page URL', model: 'submitPageUrl', placeholder: 'Submit URL', type: 'text' },
  { label: 'LP URL Data', model: 'lpUrlData', placeholder: 'LP URL', type: 'text' },
  { label: 'GCLID Data', model: 'gclidData', placeholder: 'GCLID Data', type: 'text' },
];

const LeadDrawer = ({ isOpen, onClose, onSearchResults }) => {
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

  const searchLeads = () => {
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
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Fields By</DrawerTitle>
          <DrawerDescription>Search and filter leads</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Input
            placeholder="Search fields..."
            value={searchFieldTitle}
            onChange={(e) => setSearchFieldTitle(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-4 max-h-96 overflow-y-auto">
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
          <Button onClick={searchLeads}>Search</Button>
          <Button variant="outline" onClick={resetFilters}>Reset</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  );
};

export default LeadDrawer;
