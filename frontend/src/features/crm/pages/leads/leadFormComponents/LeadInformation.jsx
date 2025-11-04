import React, { useState } from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  insuranceLeadSourceOptions,
  insuranceLeadStatusOptions,
  leadStatusStageOption,
  genderOption,
  preferredContactMethodOption,
  preferredContactTimeOption,
  citizenshipStatusOption,
  understandingOfInsuranceOption,
  additionalContactInformationOption,
  whattypeofStudentOption,
  tripTypeOption,
  netWorth,
  currency,
  objectType,
  objectives
} from "../utils/picklist.js";

const LeadInformation = ({ formData, setFormData, isDisabled, users, advisors, locations }) => {
  const [errors, setErrors] = useState({});

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
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.insuranceLeadOwner) newErrors.insuranceLeadOwner = "Insurance Lead Owner is required";

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

  const handleNext = () => {
    if (validateForm()) {
      // Emit next event - this would be handled by parent component
      console.log("Form is valid, proceeding to next step");
    }
  };

  return (
    <div>
      <FormCard title="Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Insurance Lead Owner *">
            <Select
              value={formData.insuranceLeadOwner || ""}
              onValueChange={(value) => handleChange("insuranceLeadOwner", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Owner" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id} disabled={isDisabled}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.insuranceLeadOwner && <span className="text-red-500 text-sm">{errors.insuranceLeadOwner}</span>}
          </FormField>
          <FormField label="Insurance Lead Source">
            <Select
              value={formData.insuranceLeadSource || ""}
              onValueChange={(value) => handleChange("insuranceLeadSource", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                {insuranceLeadSourceOptions.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Assigned Advisor">
            <Select
              value={formData.assignedAdvisor || ""}
              onValueChange={(value) => handleChange("assignedAdvisor", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Advisor" />
              </SelectTrigger>
              <SelectContent>
                {advisors?.map((advisor) => (
                  <SelectItem key={advisor.id} value={advisor.id} disabled={isDisabled}>
                    {advisor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="First Name">
            <Input
              value={formData.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="First Name"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Last Name *">
            <Input
              value={formData.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Last Name"
              disabled={isDisabled}
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
          </FormField>
          <FormField label="Date of Birth">
            <DatePicker
              selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
              onChange={(date) => handleDateChange("dateOfBirth", date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Gender">
            <Select
              value={formData.gender || ""}
              onValueChange={(value) => handleChange("gender", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Email">
            <Input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Mobile">
            <div className="border rounded p-1">
              <PhoneInput
                international
                defaultCountry="CA"
                value={formData.mobile || ""}
                onChange={handlePhoneChange}
                className="w-full"
                disabled={isDisabled}
              />
            </div>
            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
          </FormField>
          <FormField label="WhatsApp">
            <Input
              type="number"
              value={formData.whatsapp || ""}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              placeholder="WhatsApp"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Additional Contact Information?">
            <Select
              value={formData.additionalContactInformation || ""}
              onValueChange={(value) => handleChange("additionalContactInformation", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {additionalContactInformationOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {formData.additionalContactInformation === "Available" && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField label="Phone Number">
                <Input
                  type="number"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  placeholder="Phone Number"
                  disabled={isDisabled}
                />
              </FormField>
              <FormField label="Add Email1">
                <Input
                  type="email"
                  value={formData.addEmail1 || ""}
                  onChange={(e) => handleChange("addEmail1", e.target.value)}
                  placeholder="Additional Email"
                  disabled={isDisabled}
                />
              </FormField>
              <FormField label="Fax">
                <Input
                  value={formData.fax || ""}
                  onChange={(e) => handleChange("fax", e.target.value)}
                  placeholder="Fax"
                  disabled={isDisabled}
                />
              </FormField>
              <FormField label="Other">
                <Input
                  value={formData.otherContact || ""}
                  onChange={(e) => handleChange("otherContact", e.target.value)}
                  placeholder="Other Contact"
                  disabled={isDisabled}
                />
              </FormField>
            </div>
          </div>
        )}
      </FormCard>

      <FormCard title="Status & Preferences">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Insurance Lead Status">
            <Select
              value={formData.insuranceLeadStatus || ""}
              onValueChange={(value) => handleChange("insuranceLeadStatus", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {insuranceLeadStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={isDisabled}>
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
          <FormField label="Lead Status Stage">
            <Select
              value={formData.leadStatusStage || ""}
              onValueChange={(value) => handleChange("leadStatusStage", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                {leadStatusStageOption.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={isDisabled}>
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
          <FormField label="Citizenship Status">
            <Select
              value={formData.citizenshipStatus || ""}
              onValueChange={(value) => handleChange("citizenshipStatus", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {citizenshipStatusOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Location Name">
            <Select
              value={formData.locationName || ""}
              onValueChange={(value) => handleChange("locationName", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations?.map((location) => (
                  <SelectItem key={location.id} value={location.id} disabled={isDisabled}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Contact Preferences">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Preferred Contact Time">
            <Select
              value={formData.preferredContactTime || ""}
              onValueChange={(value) => handleChange("preferredContactTime", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                {preferredContactTimeOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Preferred Contact Method">
            <Select
              value={formData.preferredContactMethod || ""}
              onValueChange={(value) => handleChange("preferredContactMethod", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                {preferredContactMethodOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Social Media Information?">
            <Select
              value={formData.socialMediaInformation || ""}
              onValueChange={(value) => handleChange("socialMediaInformation", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-None-" disabled={isDisabled}>-None-</SelectItem>
                <SelectItem value="Available" disabled={isDisabled}>Available</SelectItem>
                <SelectItem value="Unavailable" disabled={isDisabled}>Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Old Database Lead?">
            <Select
              value={formData.oldDatabaseLead || ""}
              onValueChange={(value) => handleChange("oldDatabaseLead", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Financial Information">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Currency">
            <Select
              value={formData.currency || ""}
              onValueChange={(value) => handleChange("currency", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {currency.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Exchange Rate">
            <Input
              type="number"
              value={formData.exchangeRate || ""}
              onChange={(e) => handleChange("exchangeRate", e.target.value)}
              placeholder="Exchange Rate"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Net Worth">
            <Select
              value={formData.netWorth || ""}
              onValueChange={(value) => handleChange("netWorth", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Net Worth" />
              </SelectTrigger>
              <SelectContent>
                {netWorth.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Is This a Reassignment?">
            <Select
              value={formData.isThisaReassignment || ""}
              onValueChange={(value) => handleChange("isThisaReassignment", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Insurance Details">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Understanding of Insurance">
            <Select
              value={formData.understandingOfInsurance || ""}
              onValueChange={(value) => handleChange("understandingOfInsurance", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                {understandingOfInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Existing Insurance Policy?">
            <Select
              value={formData.existingInsurancePolicy || ""}
              onValueChange={(value) => handleChange("existingInsurancePolicy", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Existing Policy Renewal Due By">
            <DatePicker
              selected={formData.existingPolicyRenewalDueBy ? new Date(formData.existingPolicyRenewalDueBy) : null}
              onChange={(date) => handleDateChange("existingPolicyRenewalDueBy", date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Do you own a home in Canada?">
            <Select
              value={formData.doYouOwnaHomeInCanada || ""}
              onValueChange={(value) => handleChange("doYouOwnaHomeInCanada", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <FormField label="Coverage you are Looking for?">
            <Input
              value={formData.coverageLookingFor || ""}
              onChange={(e) => handleChange("coverageLookingFor", e.target.value)}
              placeholder="Coverage Details"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Do you have life insurance?">
            <Select
              value={formData.doYouhaveLifeInsurance || ""}
              onValueChange={(value) => handleChange("doYouhaveLifeInsurance", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Gender Prediction">
            <Select
              value={formData.genderPrediction || ""}
              onValueChange={(value) => handleChange("genderPrediction", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Lead Created On">
            <DatePicker
              selected={formData.leadCreatedOn ? new Date(formData.leadCreatedOn) : null}
              onChange={(date) => handleDateChange("leadCreatedOn", date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isDisabled}
            />
            {errors.leadCreatedOn && <span className="text-red-500 text-sm">{errors.leadCreatedOn}</span>}
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Additional Details">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Submit Page URL">
            <Input
              value={formData.submitPageURL || ""}
              onChange={(e) => handleChange("submitPageURL", e.target.value)}
              placeholder="Submit Page URL"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Inbox URL">
            <Input
              value={formData.inboxURL || ""}
              onChange={(e) => handleChange("inboxURL", e.target.value)}
              placeholder="Inbox URL"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Round Robin Assignment Time">
            <DatePicker
              selected={formData.roundRobinAssignmentTime ? new Date(formData.roundRobinAssignmentTime) : null}
              onChange={(date) => handleDateChange("roundRobinAssignmentTime", date)}
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="DD/MM/YYYY HH:mm"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isDisabled}
            />
            {errors.roundRobinAssignmentTime && <span className="text-red-500 text-sm">{errors.roundRobinAssignmentTime}</span>}
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Travel & Additional Information">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Date of Birth 1">
            <DatePicker
              selected={formData.dateOfBirth1 ? new Date(formData.dateOfBirth1) : null}
              onChange={(date) => handleDateChange("dateOfBirth1", date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Child Age">
            <Input
              value={formData.childAge || ""}
              onChange={(e) => handleChange("childAge", e.target.value)}
              placeholder="Child Age"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How Much You Like to Start the Plan?">
            <Input
              value={formData.howMuchYouLikeToStartThePlan || ""}
              onChange={(e) => handleChange("howMuchYouLikeToStartThePlan", e.target.value)}
              placeholder="Plan Amount"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How Much Amount Want to Start With">
            <Input
              type="number"
              value={formData.howMuchAmountWantToStartWith || ""}
              onChange={(e) => handleChange("howMuchAmountWantToStartWith", e.target.value)}
              placeholder="Start Amount"
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <FormField label="Lead ID">
            <Input
              value={formData.leadID || ""}
              onChange={(e) => handleChange("leadID", e.target.value)}
              placeholder="Lead ID"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Start Date of Coverage">
            <DatePicker
              selected={formData.startDateOfCoverage ? new Date(formData.startDateOfCoverage) : null}
              onChange={(date) => handleDateChange("startDateOfCoverage", date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="What type of Student?">
            <Select
              value={formData.whattypeofStudent || ""}
              onValueChange={(value) => handleChange("whattypeofStudent", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Student Type" />
              </SelectTrigger>
              <SelectContent>
                {whattypeofStudentOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Date of Birth of Traveler">
            <DatePicker
              selected={formData.dateOfBirthOfTraveler ? new Date(formData.dateOfBirthOfTraveler) : null}
              onChange={(date) => handleDateChange("dateOfBirthOfTraveler", date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <FormField label="Where would you be travelling to">
            <Input
              value={formData.whereWouldYouBeTravellingto || ""}
              onChange={(e) => handleChange("whereWouldYouBeTravellingto", e.target.value)}
              placeholder="Travel Destination"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Trip Type?">
            <Select
              value={formData.tripType || ""}
              onValueChange={(value) => handleChange("tripType", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Trip Type" />
              </SelectTrigger>
              <SelectContent>
                {tripTypeOption.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <FormField
            label="Round Robin Processed"
            className="flex flex-row-reverse items-center justify-end gap-2"
          >
            <Checkbox
              checked={formData.roundRobinProcessed || false}
              onCheckedChange={(checked) => handleChange("roundRobinProcessed", checked)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Email Round Robin Owner" className="flex flex-row-reverse items-center justify-end gap-2">
            <Checkbox
              checked={formData.emailRoundRobinOwner || false}
              onCheckedChange={(checked) => handleChange("emailRoundRobinOwner", checked)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Eligible Round Robin Owner Found" className="flex flex-row-reverse items-center justify-end gap-2">
            <Checkbox
              checked={formData.eligibleRoundRobinOwnerFound || false}
              onCheckedChange={(checked) => handleChange("eligibleRoundRobinOwnerFound", checked)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Re-Run Round Robin" className="flex flex-row-reverse items-center justify-end gap-2">
            <Checkbox
              checked={formData.reRunRoundRobin || false}
              onCheckedChange={(checked) => handleChange("reRunRoundRobin", checked)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Remove From Campaign" className="flex flex-row-reverse items-center justify-end gap-2">
            <Checkbox
              checked={formData.removeFromCampaign || false}
              onCheckedChange={(checked) => handleChange("removeFromCampaign", checked)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="RC SMS Opt Out" className="flex flex-row-reverse items-center justify-end gap-2">
            <Checkbox
              checked={formData.rcSmsOptOut || false}
              onCheckedChange={(checked) => handleChange("rcSmsOptOut", checked)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

     
    </div>
  );
};

export default LeadInformation;
