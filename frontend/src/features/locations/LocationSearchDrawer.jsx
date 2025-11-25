import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// String and date operations
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
];

// Location fields for advanced search
const allFields = [
  {
    label: "Location Name",
    model: "locationName",
    placeholder: "Location Name",
    type: "text",
  },
  { label: "Phone", model: "phone", placeholder: "Phone", type: "text" },
  { label: "Website", model: "website", placeholder: "Website", type: "text" },
  {
    label: "Location Owner",
    model: "locationOwner",
    placeholder: "Location Owner",
    type: "text",
  },
];

const LocationSearchDrawer = ({ isOpen, onClose, onSearchResults }) => {
  const [searchFieldTitle, setSearchFieldTitle] = useState("");
  const [fieldChecks, setFieldChecks] = useState({});
  const [operationForm, setOperationForm] = useState({});
  const [form, setForm] = useState({});

  const getOperationOptions = (field) =>
    field.type === "date" ? dateComponent : stringComponent;

  const handleOperationChange = (fieldName, value) => {
    setOperationForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleCheckboxChange = (model, checked) => {
    setFieldChecks((prev) => ({ ...prev, [model]: checked }));
    if (checked) {
      setOperationForm((prev) => ({
        ...prev,
        [model]:
          getOperationOptions(allFields.find((f) => f.model === model))[0]
            ?.value || "",
      }));
    } else {
      setOperationForm((prev) => ({ ...prev, [model]: "" }));
      setForm((prev) => ({ ...prev, [model]: "" }));
    }
  };

  const searchLocations = () => {
    const searchFields = [];
    allFields.forEach((field) => {
      if (fieldChecks[field.model]) {
        searchFields.push({
          field: field.model,
          operation: operationForm[field.model] || "is",
          value: form[field.model] || "",
        });
      }
    });
    if (onSearchResults) onSearchResults(searchFields);
    if (onClose) onClose();
  };

  const resetFilters = () => {
    setForm({});
    setFieldChecks({});
    setOperationForm({});
  };

  const filteredFields = allFields.filter((field) =>
    field.label.toLowerCase().includes(searchFieldTitle.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent width="22%">
        <DrawerHeader>
          <DrawerTitle>Filter Locations</DrawerTitle>
          <DrawerDescription>Search and filter locations</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Input
            placeholder="Search fields..."
            value={searchFieldTitle}
            onChange={(e) => setSearchFieldTitle(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredFields.map((field) => (
              <div key={field.model} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.model}
                    checked={fieldChecks[field.model] || false}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(field.model, checked)
                    }
                  />
                  <Label htmlFor={field.model}>{field.label}</Label>
                </div>
                {fieldChecks[field.model] && (
                  <div className="ml-6 space-y-2">
                    <Select
                      value={operationForm[field.model] || ""}
                      onValueChange={(value) =>
                        handleOperationChange(field.model, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select operation" />
                      </SelectTrigger>
                      <SelectContent>
                        {getOperationOptions(field).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type={
                        field.type === "date" ? "datetime-local" : field.type
                      }
                      placeholder={field.placeholder}
                      value={form[field.model] || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.model]: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <div className="flex gap-2 justify-center">
            <Button
              className="text-white"
              variant="primary"
              onClick={searchLocations}
            >
              Search
            </Button>
            <Button variant="destructive" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LocationSearchDrawer;
