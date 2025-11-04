import React from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/features/utils/ListViewMenu";

const AddressInformation = ({ formData, setFormData, isDisabled }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <FormCard title="Address Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Street">
            <Input
              value={formData.street || ""}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Street"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="State">
            <Input
              value={formData.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="State"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Country">
            <Select
              value={formData.country || ""}
              onValueChange={(value) => handleChange("country", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value} disabled={isDisabled}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="City">
            <Input
              value={formData.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Zip Code">
            <Input
              value={formData.zipCode || ""}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              placeholder="Zip Code"
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default AddressInformation;
