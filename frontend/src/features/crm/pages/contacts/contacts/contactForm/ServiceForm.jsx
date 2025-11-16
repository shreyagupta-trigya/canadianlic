import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  serviceAvailedOptions,
  lifeInsuranceOptions,
  loanProtectionOptions,
  lifeBenefitsOptions,
  groupInsuranceOption,
  travelInsuranceOptions,
  investmentOptions,
  processStageOptions,
} from '../utils/picklist.js';

const ServiceForm = ({ formData, setFormData, isDisabled,

   handlePrevious, handleNext
 }) => {
  // Ensure formData is always an object
  const safeFormData = formData || {};

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

 

  return (
    <div className="space-y-6 p-1">
      <h5 className="text-2xl font-semibold mb-4 ml-1">Service Availed</h5>
<div className='shadow hover:shadow-md p-3 rounded-md border'>


      {/* Service Availed Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
        <div className="space-y-2">
          <Label htmlFor="serviceAvailedOptions">Service Availed Options</Label>
          <Select
            value={safeFormData.serviceAvailedOptions || ''}
            onValueChange={(value) => handleInputChange('serviceAvailedOptions', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-100"}>
              <SelectValue placeholder="Select Option" />
            </SelectTrigger>
            <SelectContent>
              {serviceAvailedOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Service Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Life Insurance */}
        <div className="space-y-2">
          <Label htmlFor="lifeInsurance">Life Insurance</Label>
          <Select
            value={safeFormData.lifeInsurance || ''}
            onValueChange={(value) => handleInputChange('lifeInsurance', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {lifeInsuranceOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Living Benefits */}
        <div className="space-y-2">
          <Label htmlFor="lifeBenefits">Living Benefits</Label>
          <Select
            value={safeFormData.lifeBenefits || ''}
            onValueChange={(value) => handleInputChange('lifeBenefits', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {lifeBenefitsOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Investments */}
        <div className="space-y-2">
          <Label htmlFor="investment">Investments</Label>
          <Select
            value={safeFormData.investment || ''}
            onValueChange={(value) => handleInputChange('investment', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {investmentOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Group Insurance */}
        <div className="space-y-2">
          <Label htmlFor="groupInsurance">Group Insurance</Label>
          <Select
            value={safeFormData.groupInsurance || ''}
            onValueChange={(value) => handleInputChange('groupInsurance', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {groupInsuranceOption.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Travel Insurance */}
        <div className="space-y-2">
          <Label htmlFor="serviceAvailedTravelInsurance">Travel Insurance</Label>
          <Select
            value={safeFormData.serviceAvailedTravelInsurance || ''}
            onValueChange={(value) => handleInputChange('serviceAvailedTravelInsurance', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {travelInsuranceOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Immigration Services */}
        <div className="space-y-2">
          <Label htmlFor="immigrationServices">Immigration Services</Label>
          <Input
            id="immigrationServices"
            value={safeFormData.immigrationServices || ''}
            onChange={(e) => handleInputChange('immigrationServices', e.target.value)}
            disabled={isDisabled}
          />
        </div>

        {/* Health & Dental Insurance Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="serviceAvailedhealthAndDentalInsurance"
            checked={safeFormData.serviceAvailedhealthAndDentalInsurance || false}
            onCheckedChange={(checked) => handleInputChange('serviceAvailedhealthAndDentalInsurance', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="serviceAvailedhealthAndDentalInsurance">Health & Dental Insurance</Label>
        </div>

        {/* Business Liability Insurance */}
        <div className="space-y-2">
          <Label htmlFor="businessLiabilityInsurance">Business Liability Insurance</Label>
          <Input
            id="businessLiabilityInsurance"
            value={safeFormData.businessLiabilityInsurance || ''}
            disabled
          />
        </div>

        {/* Home Insurance */}
        <div className="space-y-2">
          <Label htmlFor="homeInsurance">Home Insurance</Label>
          <Input
            id="homeInsurance"
            value={safeFormData.homeInsurance || ''}
            disabled
          />
        </div>

        {/* Auto Insurance */}
        <div className="space-y-2">
          <Label htmlFor="autoInsurance">Auto Insurance</Label>
          <Input
            id="autoInsurance"
            value={safeFormData.autoInsurance || ''}
            disabled
          />
        </div>

        {/* Loan Protection */}
        <div className="space-y-2">
          <Label htmlFor="serviceAvailedLoanProtection">Loan Protection</Label>
          <Select
            value={safeFormData.serviceAvailedLoanProtection || ''}
            onValueChange={(value) => handleInputChange('serviceAvailedLoanProtection', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {loanProtectionOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Combination or Hybrid Insurance Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="combinationOrHybridInsurance"
            checked={safeFormData.combinationOrHybridInsurance || false}
            onCheckedChange={(checked) => handleInputChange('combinationOrHybridInsurance', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="combinationOrHybridInsurance">Combination or Hybrid Insurance</Label>
        </div>
      </div>
      </div>

      {/* Repeat Business Information Section */}
      <div className="space-y-6 shadow hover:shadow-md p-3 rounded-md border">
        <h5 className="text-lg font-semibold">Repeat Business Information</h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {/* Services Availed Updated */}
          <div className="space-y-2">
            <Label htmlFor="serviceAvailedUpdated">Services Availed Updated?</Label>
            <Select
              value={safeFormData.serviceAvailedUpdated || ''}
              onValueChange={(value) => handleInputChange('serviceAvailedUpdated', value)}
              disabled={isDisabled}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {serviceAvailedOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* New Service Requested */}
          <div className="space-y-2">
            <Label htmlFor="newServiceRequested">New Service Requested</Label>
            <Select
              value={safeFormData.newServiceRequested || ''}
              onValueChange={(value) => handleInputChange('newServiceRequested', value)}
              disabled={isDisabled}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {serviceAvailedOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Other Service Requested */}
          <div className="space-y-2">
            <Label htmlFor="otherServiceRequested">Other Service Requested</Label>
            <Select
              value={safeFormData.otherServiceRequested || ''}
              onValueChange={(value) => handleInputChange('otherServiceRequested', value)}
              disabled={isDisabled}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {loanProtectionOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date New Service Requested */}
          <div className="space-y-2">
            <Label htmlFor="dateNewServiceRequested">Date New Service Requested</Label>
            <Input
              id="dateNewServiceRequested"
              type="date"
              value={safeFormData.dateNewServiceRequested || ''}
              onChange={(e) => handleInputChange('dateNewServiceRequested', e.target.value)}
              disabled={isDisabled}
            />
          </div>

          {/* Process Stage */}
          <div className="space-y-2">
            <Label htmlFor="processStage">Process Stage</Label>
            <Select
              value={safeFormData.processStage || ''}
              onValueChange={(value) => handleInputChange('processStage', value)}
              disabled={isDisabled}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {processStageOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Next Follow Up Date & Time */}
          <div className="space-y-2">
            <Label htmlFor="nextFollowUpDateAndTime">Next Follow Up Date & Time</Label>
            <Input
              id="nextFollowUpDateAndTime"
              type="datetime-local"
              value={safeFormData.nextFollowUpDateAndTime || ''}
              onChange={(e) => handleInputChange('nextFollowUpDateAndTime', e.target.value)}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
         <div className="flex justify-center gap-4 fixed bottom-0 pb-2  bg-background  w-full left-30  mx-auto" >
        <Button onClick={handlePrevious} variant="outline">
          Prev
        </Button>
        <Button onClick={handleNext} className={"bg-blue-500 hover:bg-blue-600"}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
