import React, { useState } from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { statusOptions, ServiceStatusOptions, TaskTypeOptions } from "./utils/picklist";
import FormPageLayout from "@/layout/FormPageLayout";
export default function CustomerServiceForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handlePhoneChange = (value) => {
    handleChange("mobile", value);
  };

  const handleDateChange = (field, date) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : "";
    handleChange(field, formattedDate);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerServiceOwner) newErrors.customerServiceOwner = "Customer Service Owner is required";
    if (!formData.mobile) newErrors.mobile = "Mobile Number is required";

    const mobile = formData.mobile || "";
    if (mobile) {
      if (!mobile.startsWith('+')) {
        newErrors.mobile = 'Country code is required (e.g. +1...)';
      } else if (mobile.startsWith('+1') && !/^\+1\d{10}$/.test(mobile)) {
        newErrors.mobile = 'Canadian number must be +1 followed by 10 digits';
      } else if (!/^\+\d{8,15}$/.test(mobile)) {
        newErrors.mobile = 'Phone must be in international format (e.g. +1234567890)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form is valid, submitting");
    }
  };
  const onCancel = () => navigate(-1);

  return (
    <div className="flex flex-col min-h-screen ">
      <FormPageLayout
        title={<span className="text-lg font-semibold md:text-2xl">Create Customer Service</span>}
        onCancel={onCancel}
        onSubmit={handleSubmit}
        loading={loading}
        cancelButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2 "
        submitButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
      >
        <div className="flex-1 max-h-[80vh] overflow-y-auto">
          <FormCard title="Customer Service Information">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField label="Currency">
                <Select
                  value={formData.currency || ""}
                  onValueChange={(value) => handleChange("currency", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="CAD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAD">CAD</SelectItem>

                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Customer Service Owner" required>
                <Select
                  value={formData.customerServiceOwner || ""}
                  onValueChange={(value) => handleChange("customerServiceOwner", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Owner" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="Owner1">Owner 1</SelectItem>
                    <SelectItem value="Owner2">Owner 2</SelectItem>
                    <SelectItem value="Owner3">Owner 3</SelectItem>
                  </SelectContent>
                </Select>
                {/* {errors.customerServiceOwner && <span className="text-red-500 text-sm">{errors.customerServiceOwner}</span>} */}
              </FormField>

              <FormField label="Policy Advisor">
                <Select
                  value={formData.policyAdvisor || ""}
                  onValueChange={(value) => handleChange("policyAdvisor", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Advisor" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="Advisor1">Advisor 1</SelectItem>
                    <SelectItem value="Advisor2">Advisor 2</SelectItem>
                    <SelectItem value="Advisor3">Advisor 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Task Name">
                <Select
                  value={formData.taskName || ""}
                  onValueChange={(value) => handleChange("taskName", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-None-" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {TaskTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: option.color }}
                          ></div>
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </FormCard>

          <FormCard title="Contact Information">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* <FormField label="Email">
            <Input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email"
            />
          </FormField> */}


              <FormField label="Conatct Mobile*">
                <div className="rounded p-1 border">
                  <PhoneInput
                    international
                    defaultCountry="CA"
                    value={formData.contactMobile || ""}
                    onChange={handlePhoneChange}
                    className="w-full focus:outline-none focus:ring-0"
                  />
                </div>
                {/* {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>} */}
              </FormField>

              <FormField label="Contacts">
                <Select
                  value={formData.contacts || ""}
                  onValueChange={(value) => handleChange("contacts", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Contact" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="Contact1">Contact 1</SelectItem>
                    <SelectItem value="Contact2">Contact 2</SelectItem>
                    <SelectItem value="Contact3">Contact 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Exchange Rate">
                <Input
                  type="number"
                  value={formData.exchangeRate || ""}
                  onChange={(e) => handleChange("exchangeRate", e.target.value)}
                  placeholder="1"
                />
              </FormField>
              <FormField label="Policies">
                <Select
                  value={formData.policies || ""}
                  onValueChange={(value) => handleChange("policies", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Policy" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="Policy1">Policy 1</SelectItem>
                    <SelectItem value="Policy2">Policy 2</SelectItem>
                    <SelectItem value="Policy3">Policy 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">

              <FormField label="Description">
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                />
              </FormField>


              <FormField label="Group Insurance">
                <Select
                  value={formData.groupInsurance || ""}
                  onValueChange={(value) => handleChange("groupInsurance", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Group Insurance" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="Group1">Group 1</SelectItem>
                    <SelectItem value="Group2">Group 2</SelectItem>
                    <SelectItem value="Group3">Group 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </FormCard>

          {/* <FormCard title="Service Details"> */}

          {/* </FormCard> */}

          <FormCard title="Status & Progress">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                "Status",
                "Updated Policy Module - ZOHO",
                "Comment on Contact Profile - ZOHO",
                "Request BOT/Email Company/Cancel Portal",
                "Confirmation Received by us",
                "Confirmation to Client",
                "Effective Date Matches on Confirmation"
              ].map((label) => {
                const fieldKey = label.toLowerCase().replace(/\s+/g, '');
                const options = label === "Status" ? statusOptions : ServiceStatusOptions;
                return (
                  <FormField key={label} label={label}>
                    <Select
                      value={formData[fieldKey] || ""}
                      onValueChange={(value) => handleChange(fieldKey, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-None-" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: option.color }}
                              ></div>
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                );
              })}
              <FormField label="Image Upload">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange("image", e.target.files[0])}
                />
              </FormField>
            </div>
          </FormCard>

          <FormCard title="Policy Details">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField label="Policy Renewal Date">
                <DatePicker
                  selected={formData.policyRenewalDate ? new Date(formData.policyRenewalDate) : null}
                  onChange={(date) => handleDateChange("policyRenewalDate", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </FormField>

              <FormField label="Policy Expiry Date">
                <DatePicker
                  selected={formData.policyExpiryDate ? new Date(formData.policyExpiryDate) : null}
                  onChange={(date) => handleDateChange("policyExpiryDate", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </FormField>

              <FormField label="New Policy Renewal Date">
                <DatePicker
                  selected={formData.newPolicyRenewalDate ? new Date(formData.newPolicyRenewalDate) : null}
                  onChange={(date) => handleDateChange("newPolicyRenewalDate", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </FormField>

              <FormField label="Issued By">
                <Select
                  value={formData.renewalCompleted || ""}
                  onValueChange={(value) => handleChange("issuedBy", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-None-" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="Issuer 1">Issuer 1</SelectItem>
                    <SelectItem value="Issuer 2">Issuer 2</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <FormField label="Renewal Completed">
                <Select
                  value={formData.renewalCompleted || ""}
                  onValueChange={(value) => handleChange("renewalCompleted", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-None-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Renewal Follow Up Date">
                <DatePicker
                  selected={formData.renewalFollowUpDate ? new Date(formData.renewalFollowUpDate) : null}
                  onChange={(date) => handleDateChange("renewalFollowUpDate", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </FormField>

              <FormField label="New Policy Premium">
                <Input
                  value={formData.newPolicyPremium || ""}
                  onChange={(e) => handleChange("newPolicyPremium", e.target.value)}
                  placeholder="CA$"
                />
              </FormField>


            </div>
          </FormCard>

        </div>
      </FormPageLayout>
    </div>
  );
}
