import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  clientFirstPolicyOptions,
} from "@/utils/picklist";

const BasicInfo = ({ formData, setFormData, onNext, onPrev, advisors = [], owners = [], locations = [], contacts = [] }) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  // Options matching Vue picklist
  const layoutOptions = ["RRSP", "RESP", "TFSA"];
  const frequencyOptions = ["Monthly", "Quarterly", "Semi-Annually", "Annually"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Layout <span className="text-red-500">*</span></Label>
              <Select value={formData.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-None-" />
                </SelectTrigger>
                <SelectContent>
                  {layoutOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Investment Owner <span className="text-red-500">*</span></Label>
              <Select value={formData.policyOwner} onValueChange={(value) => handleChange("policyOwner", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((owner) => (
                    <SelectItem key={owner.ROWID} value={owner.ROWID}>
                      {owner.firstName ? owner.firstName : ''}{owner.lastName ? ' ' + owner.lastName : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Investment Name <span className="text-red-500">*</span></Label>
              <Input
                value={formData.policyName || ""}
                onChange={(e) => handleChange("policyName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Client Mobile</Label>
              <div className="border rounded-lg p-1.5">
                <PhoneInput
                  value={formData.clientMobile || ""}
                  onChange={(value) => handleChange("clientMobile", value)}
                  defaultCountry="CA"
                  international={true}
                  withCountryCallingCode={true}
                  placeholder="+1 (XXX) XXX-XXXX"
                  maxLength={16}
                />
              </div>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Currency</Label>
              <Input
                value={formData.currency || ""}
                onChange={(e) => handleChange("currency", e.target.value)}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Location</Label>
              <Select value={formData.location} onValueChange={(value) => handleChange("location", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.ROWID} value={location.ROWID}>
                      {location.name ? location.name : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Client Name</Label>
              <Select value={formData.client} onValueChange={(value) => handleChange("client", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.ROWID} value={contact.ROWID}>
                      {contact.name ? contact.name : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Exchange Rate</Label>
              <Input
                type="number"
                value={formData.exchangeRate || ""}
                onChange={(e) => handleChange("exchangeRate", e.target.value)}
                disabled
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Policy Advisor</Label>
              <Select value={formData.policyAdvisor} onValueChange={(value) => handleChange("policyAdvisor", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {advisors.map((advisor) => (
                    <SelectItem key={advisor.ROWID} value={advisor.ROWID}>
                      {advisor.name ? advisor.name : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Client Address</Label>
              <Textarea
                value={formData.clientAddress || ""}
                onChange={(e) => handleChange("clientAddress", e.target.value)}
                rows={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment/Investment Vehicle Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Contract Name <span className="text-red-500">*</span></Label>
              <Input
                value={formData.contractName || ""}
                onChange={(e) => handleChange("contractName", e.target.value)}
              />
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Investment</Label>
              <Input
                type="number"
                value={formData.investment || ""}
                onChange={(e) => handleChange("investment", e.target.value)}
              />
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => handleChange("frequency", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {frequencyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Corporate Commission</Label>
              <div className="flex border border-gray-300 rounded-md">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.corporateCommission || ""}
                  onChange={(e) => handleChange("corporateCommission", e.target.value)}
                  placeholder="$"
                  className="border-0 focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Advisor Commission</Label>
              <div className="flex border border-gray-300 rounded-md">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.advisorCommission || ""}
                  onChange={(e) => handleChange("advisorCommission", e.target.value)}
                  placeholder="$"
                  className="border-0 focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Monthly/Annual Contribution</Label>
              <div className="flex border border-gray-300 rounded-md">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.monthlyAnnualContribution || ""}
                  onChange={(e) => handleChange("monthlyAnnualContribution", e.target.value)}
                  placeholder="$"
                  className="border-0 focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Contract Number</Label>
              <Input
                type="number"
                value={formData.contractNumber || ""}
                onChange={(e) => handleChange("contractNumber", e.target.value)}
              />
            </div>
            {formData.layout !== 'RESP' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Type <span className="text-red-500">*</span></Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-None-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RRSP">RRSP</SelectItem>
                    <SelectItem value="RESP">RESP</SelectItem>
                    <SelectItem value="TFSA">TFSA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Initial Contribution</Label>
              <div className="flex border border-gray-300 rounded-md">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.initialContribution || ""}
                  onChange={(e) => handleChange("initialContribution", e.target.value)}
                  placeholder="$"
                  className="border-0 focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Initial Deposit</Label>
              <div className="flex border border-gray-300 rounded-md">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.initialDeposit || ""}
                  onChange={(e) => handleChange("initialDeposit", e.target.value)}
                  placeholder="$"
                  className="border-0 focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Location Commission</Label>
              <div className="flex border border-gray-300 rounded-md">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.locationCommission || ""}
                  onChange={(e) => handleChange("locationCommission", e.target.value)}
                  placeholder="$"
                  className="border-0 focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Total Contribution</Label>
              <div className="flex border border-gray-300 rounded-md">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.totalContribution || ""}
                  onChange={(e) => handleChange("totalContribution", e.target.value)}
                  placeholder="$"
                  className="border-0 focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Insurance Partner</Label>
              <Select value={formData.insurancePartner} onValueChange={(value) => handleChange("insurancePartner", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {/* Insurance partners would be passed as props */}
                </SelectContent>
              </Select>
            </div>
            {formData.layout === 'RESP' && (
              <div className="lg:col-span-4 sm:col-span-6">
                <Label className="mb-2">Type</Label>
                <Select value={formData.Type} onValueChange={(value) => handleChange("Type", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-None-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RRSP">RRSP</SelectItem>
                    <SelectItem value="RESP">RESP</SelectItem>
                    <SelectItem value="TFSA">TFSA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {formData.layout === 'TFSA' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Registered?</Label>
                <Select value={formData.registered} onValueChange={(value) => handleChange("registered", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-NONE-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={handleNext} className="px-6 py-2">
          Next
        </Button>
      </div>
    </div>
  );
};

export default BasicInfo;
