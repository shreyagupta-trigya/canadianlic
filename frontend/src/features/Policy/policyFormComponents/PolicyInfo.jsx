import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  premiumFrequencyOptions,
  policyStatusOptions,
  policyTypeOption,
  advisorCodeOfConductComplainceOption,
  clientFirstPolicyOptions,
  advisorProbhitedOption,
  sendToPolicyStartDateEmailTrackOptions,
  advisorBonusLevelOptions,
  layoutOption,
} from "@/utils/picklist";
const PolicyInfo = ({ formData, setFormData, onNext, onPrev, advisors = [], owners = [], locations = [], contacts = [], insPartners = [], insOfferingName = [], isDisabled }) => {
  const [formattedCoverageAmount, setFormattedCoverageAmount] = useState("");
  const [formattedPolicyPremium, setFormattedPolicyPremium] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Helper function to format currency with commas and 2 decimal places
  const formatCurrency = (value) => {
    const cleanValue = value.toString().replace(/[^\d.]/g, "");
    const number = parseFloat(cleanValue);
    if (isNaN(number)) return "";
    return number.toLocaleString("en-CA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Handle real-time input for Coverage Amount
  const handleCoverageAmountInput = (event) => {
    let value = event.target.value;
    value = value.replace(/[^\d.]/g, "");
    const decimalCount = (value.match(/\./g) || []).length;
    if (decimalCount > 1) {
      value = value.substring(0, value.lastIndexOf("."));
    }
    setFormattedCoverageAmount(value);
    handleChange("coverageAmount", value);
  };

  // Format Coverage Amount
  const formatCoverageAmount = () => {
    if (!formData.coverageAmount && formData.coverageAmount !== 0) return;
    const rawValue = formData.coverageAmount.toString();
    if (rawValue) {
      const formatted = formatCurrency(rawValue);
      setFormattedCoverageAmount(formatted);
    }
  };

  // Clear formatting when user focuses on Coverage Amount field for editing
  const clearCoverageAmountFormatting = () => {
    if (formData.coverageAmount || formData.coverageAmount === 0) {
      setFormattedCoverageAmount(formData.coverageAmount.toString().replace(/[^\d.]/g, ""));
    }
  };

  // Handle real-time input for Policy Premium
  const handlePolicyPremiumInput = (event) => {
    let value = event.target.value;
    value = value.replace(/[^\d.]/g, "");
    const decimalCount = (value.match(/\./g) || []).length;
    if (decimalCount > 1) {
      value = value.substring(0, value.lastIndexOf("."));
    }
    setFormattedPolicyPremium(value);
    handleChange("policyPremiumI", value);
  };

  // Format Policy Premium
  const formatPolicyPremium = () => {
    if (!formData.policyPremiumI && formData.policyPremiumI !== 0) return;
    const rawValue = formData.policyPremiumI.toString();
    if (rawValue) {
      const formatted = formatCurrency(rawValue);
      setFormattedPolicyPremium(formatted);
    }
  };

  // Clear formatting when user focuses on Policy Premium field for editing
  const clearPolicyPremiumFormatting = () => {
    if (formData.policyPremiumI || formData.policyPremiumI === 0) {
      setFormattedPolicyPremium(formData.policyPremiumI.toString().replace(/[^\d.]/g, ""));
    }
  };

  useEffect(() => {
    formatCoverageAmount();
    formatPolicyPremium();
  }, [formData.coverageAmount, formData.policyPremiumI]);

  // Options matching Vue picklist
  const layoutOptions = layoutOption;
  const statusOptions = policyStatusOptions;
  const policyTypeOptions = policyTypeOption;
  const advisorCodeOfConductOptions = advisorCodeOfConductComplainceOption;
  const advisorProhibitedOptions = advisorProbhitedOption;
  const sendToBotResultOptions = ["-None-", "Yes", "No"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
       <CardContent className="space-y-4">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div className="lg:col-span-4 sm:col-span-6">
      <Label className="mb-2">Policy Name <span className="text-red-500">*</span></Label>
      <Input
        value={formData.policyName || ""}
        onChange={(e) => handleChange("policyName", e.target.value)}
        disabled={isDisabled}
        className={!isDisabled ? "border-2 border-gray-300" : ""}
      />
    </div>

    <div className="lg:col-span-4 sm:col-span-6">
      <Label className="mb-2">Layout</Label>
      <Select
        value={formData.layout}
        onValueChange={(value) => handleChange("layout", value)}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        >
          <SelectValue placeholder="Select Layout" />
        </SelectTrigger>
        <SelectContent>
          {layoutOptions.map((option) => (
            <SelectItem key={option} value={option} disabled={isDisabled}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="lg:col-span-4 sm:col-span-4">
      <Label className="mb-2">Policy Status</Label>
      <Select
        value={formData.policyStatus}
        onValueChange={(value) => handleChange("policyStatus", value)}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        >
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option} value={option} disabled={isDisabled}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div className="lg:col-span-3 sm:col-span-12">
      <Label className="mb-2">Policy Advisor</Label>
      <Select
        value={formData.policyAdvisor}
        onValueChange={(value) => handleChange("policyAdvisor", value)}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        >
          <SelectValue placeholder="Select Advisor" />
        </SelectTrigger>
        <SelectContent>
          {advisors.map((advisor) => (
            <SelectItem key={advisor.ROWID} value={advisor.ROWID} disabled={isDisabled}>
              {advisor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="lg:col-span-3 md:col-span-3 sm:col-span-12">
      <Label className="mb-2">Insurance Company Account</Label>
      <Input
        type="number"
        value={formData.insuranceCompanyAccount || ""}
        onChange={(e) => handleChange("insuranceCompanyAccount", e.target.value)}
        disabled={isDisabled}
        className={!isDisabled ? "border-2 border-gray-300" : ""}
      />
    </div>

    <div className="lg:col-span-3 sm:col-span-12">
      <Label className="mb-2">Policy Owner <span className="text-red-500">*</span></Label>
      <Select
        value={formData.policyOwner}
        onValueChange={(value) => handleChange("policyOwner", value)}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        >
          <SelectValue placeholder="Select Owner" />
        </SelectTrigger>
        <SelectContent>
          {owners.map((owner) => (
            <SelectItem key={owner.ROWID} value={owner.ROWID} disabled={isDisabled}>
              {owner.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="lg:col-span-3 sm:col-span-12">
      <Label className="mb-2">Location <span className="text-red-500">*</span></Label>
      <Select
        value={formData.location}
        onValueChange={(value) => handleChange("location", value)}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        >
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.ROWID} value={location.ROWID} disabled={isDisabled}>
              {location.name ? location.name : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div className="lg:col-span-3 sm:col-span-6">
      <Label className="mb-2">Policy Number</Label>
      <Input
        value={formData.policyNumber || ""}
        onChange={(e) => handleChange("policyNumber", e.target.value)}
        disabled={isDisabled}
        className={!isDisabled ? "border-2 border-gray-300" : ""}
      />
    </div>

    <div className="lg:col-span-3 md:col-span-6 sm:col-span-4">
      <Label className="mb-2">Coverage Amount</Label>
      <div className={`flex border rounded-md ${!isDisabled ? "border-2 border-gray-300" : "border-gray-300"}`}>
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
          CA$
        </span>
        <Input
          value={formattedCoverageAmount}
          onInput={handleCoverageAmountInput}
          onBlur={formatCoverageAmount}
          onFocus={clearCoverageAmountFormatting}
          placeholder="0.00"
          className="border-0 focus:border-transparent focus:ring-0"
          disabled={isDisabled}
        />
      </div>
    </div>

    <div className="lg:col-span-3 sm:col-span-4">
      <Label className="mb-2">Policy Premium (Read i)</Label>
      <div className={`flex border rounded-md ${!isDisabled ? "border-2 border-gray-300" : "border-gray-300"}`}>
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
          CA$
        </span>
        <Input
          value={formattedPolicyPremium}
          onInput={handlePolicyPremiumInput}
          onBlur={formatPolicyPremium}
          onFocus={clearPolicyPremiumFormatting}
          placeholder="0.00"
          className="border-0 focus:border-transparent focus:ring-0"
          disabled={isDisabled}
        />
      </div>
    </div>

    <div className="lg:col-span-3 sm:col-span-6">
      <Label className="mb-2">Premium Frequency</Label>
      <Select
        value={formData.premiumFrequency}
        onValueChange={(value) => handleChange("premiumFrequency", value)}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        >
          <SelectValue placeholder="Select Frequency" />
        </SelectTrigger>
        <SelectContent>
          {premiumFrequencyOptions.map((option) => (
            <SelectItem key={option} value={option} disabled={isDisabled}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div className="lg:col-span-3 sm:col-span-6">
      <Label className="mb-2">Client <span className="text-red-500">*</span></Label>
      <Select
        value={formData.client}
        onValueChange={(value) => handleChange("client", value)}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        >
          <SelectValue placeholder="Select Client" />
        </SelectTrigger>
        <SelectContent>
          {contacts.map((contact) => (
            <SelectItem key={contact.ROWID} value={contact.ROWID} disabled={isDisabled}>
              {contact.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="lg:col-span-3 sm:col-span-4">
      <Label className="mb-2">Email</Label>
      <Input
        type="email"
        value={formData.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        disabled={isDisabled}
        className={!isDisabled ? "border-2 border-gray-300" : ""}
      />
    </div>

    <div className="lg:col-span-3 sm:col-span-4">
      <Label className="mb-2">Client Mobile</Label>
      <div className={`border rounded-lg p-1.5 ${!isDisabled ? "border-2 border-gray-300" : ""}`}>
        <PhoneInput
          value={formData.clientMobile || ""}
          onChange={(value) => handleChange("clientMobile", value)}
          defaultCountry="CA"
          international
          withCountryCallingCode
          placeholder="+1 (XXX) XXX-XXXX"
          maxLength={16}
          disabled={isDisabled}
        />
      </div>
    </div>

    <div className="lg:col-span-3 sm:col-span-4">
      <Label className="mb-2">Whatsapp</Label>
      <div className={`border rounded-lg p-1.5 ${!isDisabled ? "border-2 border-gray-300" : ""}`}>
        <PhoneInput
          value={formData.whatsapp || ""}
          onChange={(value) => handleChange("whatsapp", value)}
          defaultCountry="CA"
          international
          withCountryCallingCode
          placeholder="+1 (XXX) XXX-XXXX"
          maxLength={16}
          disabled={isDisabled}
        />
      </div>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div className="lg:col-span-12">
      <Label className="mb-2">Client Address</Label>
      <Textarea
        value={formData.clientAddress || ""}
        onChange={(e) => handleChange("clientAddress", e.target.value)}
        className={`w-[300px] ${!isDisabled ? "border-2 border-gray-300" : ""}`}
        disabled={isDisabled}
      />
    </div>
  </div>
</CardContent>

      </Card>

     <Card>
  <CardHeader>
    <CardTitle>Offering Information</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <Label className="mb-2">Offering Id</Label>
        <Input
          value={formData.offeringId || ""}
          onChange={(e) => handleChange("offeringId", e.target.value)}
          className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

      <div>
        <Label className="mb-2">Offering Name</Label>
        <Select
          value={formData.offeringName}
          onValueChange={(value) => handleChange("offeringName", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select Offering Name" />
          </SelectTrigger>
          <SelectContent>
            {insOfferingName.map((option) => (
              <SelectItem key={option.ROWID} value={option.ROWID}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <Label className="mb-2">Policy Type</Label>
        <Select
          value={formData.policyType}
          onValueChange={(value) => handleChange("policyType", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select Policy Type" />
          </SelectTrigger>
          <SelectContent>
            {policyTypeOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Issued By</Label>
        <Select
          value={formData.issuedBy}
          onValueChange={(value) => handleChange("issuedBy", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select Issued By" />
          </SelectTrigger>
          <SelectContent>
            {insPartners.map((partner) => (
              <SelectItem key={partner.ROWID} value={partner.ROWID}>
                {partner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>

  </CardContent>
</Card>


      <Card>
  <CardHeader>
    <CardTitle>Additional Details</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <div>
        <Label className="mb-2">Client Campaign Source</Label>
        <Input
          value={formData.clientCampaignSource || ""}
          onChange={(e) => handleChange("clientCampaignSource", e.target.value)}
          className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

      <div>
        <Label className="mb-2">Product FYC %</Label>
        <Input
          type="number"
          value={formData.productFycPercent || ""}
          onChange={(e) => handleChange("productFycPercent", e.target.value)}
          className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

      <div>
        <Label className="mb-2">Corporate Bonus %</Label>
        <Input
          type="number"
          value={formData.corporateBonusPercent || ""}
          onChange={(e) => handleChange("corporateBonusPercent", e.target.value)}
          className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

      <div>
        <Label className="mb-2">Client's First Policy ?</Label>
        <Select
          value={formData.clientFirstPolicy}
          onValueChange={(value) => handleChange("clientFirstPolicy", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {clientFirstPolicyOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Advisor Bonus % of FYC</Label>
        <Input
          type="number"
          value={formData.advisorBonusOfFyc || ""}
          onChange={(e) => handleChange("advisorBonusOfFyc", e.target.value)}
          className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

      <div>
        <Label className="mb-2">Advisor Commission Received</Label>
        <Select
          value={formData.advisorCommisionRecieved}
          onValueChange={(value) => handleChange("advisorCommisionRecieved", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {sendToBotResultOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Advisor Code of Conduct Compliance</Label>
        <Select
          value={formData.advisorCodeOfConductComplaince}
          onValueChange={(value) => handleChange("advisorCodeOfConductComplaince", value)}
          disabled={isDisabled}
          
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {advisorCodeOfConductOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Advisor Prohibited Behaviour Compliance</Label>
        <Select
          value={formData.advisorProbhitedBehaviourCompliance}
          onValueChange={(value) => handleChange("advisorProbhitedBehaviourCompliance", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {advisorProhibitedOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Location Discount Factor</Label>
        <Input
          type="number"
          value={formData.locationDiscountFactor || ""}
          onChange={(e) => handleChange("locationDiscountFactor", e.target.value)}
          className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

      {formData.layout === "Life Policies" && (
        <div>
          <Label className="mb-2">Advisor Bonus level</Label>
          <Select
            value={formData.advisorBonusLevel}
            onValueChange={(value) => handleChange("advisorBonusLevel", value)}
            disabled={isDisabled}
          >
            <SelectTrigger
              className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
              disabled={isDisabled}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {advisorBonusLevelOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label className="mb-2">Exchange Rate</Label>
        <Input
          type="number"
          value={formData.exchangeRate || ""}
          onChange={(e) => handleChange("exchangeRate", e.target.value)}
          className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

      <div>
        <Label className="mb-2">Currency</Label>
        <Select
          value={formData.currency || "CAD"}
          onValueChange={(value) => handleChange("currency", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CAD">CAD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2">
        <Label className="mb-2">Comments on Rating</Label>
        <Textarea
          value={formData.commentsOnRating || ""}
          onChange={(e) => handleChange("commentsOnRating", e.target.value)}
          className={`w-[300px] ${!isDisabled ? "border-2 border-gray-300" : ""}`}
          disabled={isDisabled}
        />
      </div>

    </div>

  </CardContent>
</Card>


   <Card>
  <CardHeader>
    <CardTitle>Bot Details</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div>
        <Label className="mb-2">Send To Bot Result</Label>
        <Select
          value={formData.sendToBotResult}
          onValueChange={(value) => handleChange("sendToBotResult", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {sendToBotResultOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Send To Policy Start Date Email Track</Label>
        <Select
          value={formData.sendToPolicyStartDateEmailTrack}
          onValueChange={(value) => handleChange("sendToPolicyStartDateEmailTrack", value)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>

    <div className="space-y-2">

      {formData.layout === "Life Policies" && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="phoneUpdated"
            checked={formData.phoneUpdated || false}
            onCheckedChange={(checked) => handleChange("phoneUpdated", checked)}
            disabled={isDisabled}
                      className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}

          />
          <Label htmlFor="phoneUpdated">Phone Updated</Label>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="updateOfferingId"
          checked={formData.updateOfferingId || false}
          onCheckedChange={(checked) => handleChange("updateOfferingId", checked)}
          disabled={isDisabled}
                    className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}


        />
        <Label htmlFor="updateOfferingId">Update Offering id</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="updatePolicyStatus"
          checked={formData.updatePolicyStatus || false}
          onCheckedChange={(checked) => handleChange("updatePolicyStatus", checked)}
          disabled={isDisabled}
                    className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}

        />
        <Label htmlFor="updatePolicyStatus">Update Policy Status</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="triggerSupervisa"
          checked={formData.triggerSupervisa || false}
          onCheckedChange={(checked) => handleChange("triggerSupervisa", checked)}
          disabled={isDisabled}
                    className={`${!isDisabled ? "border-2 border-gray-300" : ""}`}

        />
        <Label htmlFor="triggerSupervisa">Trigger Supervisa Full Refund Calculation</Label>
      </div>

    </div>

  </CardContent>
</Card>



    </div>
  );
};

export default PolicyInfo;
