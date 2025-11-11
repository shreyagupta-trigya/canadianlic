import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Import picklist data
import {
  choice,
  preferredContactMethodOptions,
  investmentOptions,
  referredByOtions,
  availabilityOptions,
  citizenshipStatusOptions,
  priorityOptions,
  genderOptions,
  serviceAvailedOptions,
  homeInsuranceOptions
} from '../utils/picklist.js';

const LeadInfoForm = ({
  formData,
  setFormData,
  isDisabled,
  location = [],
  handlePrevious, handleNext
}) => {
  const [errors, setErrors] = useState({});

  // Memoize location options to prevent unnecessary re-renders
  const locationOptions = useMemo(() => {
    return location.filter(loc => loc.ROWID && loc.name).map((loc) => ({
      value: String(loc.ROWID),
      label: loc.name
    }));
  }, [location]); // Use location directly instead of locationArr

  // Initialize data - removed the problematic useEffect
  useEffect(() => {
    // Format dates if needed
    const dateFields = [
      "dateOfBirth1",
      "existingRenewalPolicyDueBy",
      "roundRobinAssignmentTime1",
      "leadCreatedOn1",
      "facebook1"
    ];
    dateFields.forEach(field => {
      if (formData[field] && !formData[field].includes('/')) {
        // Assume it's in YYYY-MM-DD, convert to DD/MM/YYYY if needed
        // For now, keep as is
      }
    });
  }, []); // Empty dependency array to run only once

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (field, date) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    handleInputChange(field, formattedDate);
  };

  const handleDateTimeChange = (field, date) => {
    const formattedDateTime = date ? date.toISOString() : '';
    handleInputChange(field, formattedDateTime);
  };

 

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4 px-2">Lead info</h5>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            <div>
              <Label htmlFor="bestTimeToCall" className="mb-2">Best Time To Call <span className="text-red-500">*</span></Label>
              <Input
                id="bestTimeToCall"
                value={formData.bestTimeToCall || ''}
                onChange={(e) => handleInputChange('bestTimeToCall', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="locationName2" className="mb-2">Location Name2</Label>
              <Select
                value={formData.locationName2 || ''}
                onValueChange={(value) => handleInputChange('locationName2', value)}
                disabled={isDisabled}
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateOfBirth1" className="mb-2">Date of Birth1</Label>
              <Input
                id="dateOfBirth1"
                type="date"
                value={formData.dateOfBirth1 || ''}
                onChange={(e) => handleInputChange('dateOfBirth1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="ifReferredByAdvisorOrExternal" className="mb-2">If referred by Advisor or External Referral - Name</Label>
              <Input
                id="ifReferredByAdvisorOrExternal"
                value={formData.ifReferredByAdvisorOrExternal || ''}
                onChange={(e) => handleInputChange('ifReferredByAdvisorOrExternal', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="isThisReassignment" className="mb-2">Is this a Reassignment?</Label>
              <Select
                value={formData.isThisReassignment || ''}
                onValueChange={(value) => handleInputChange('isThisReassignment', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={`reassignment-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="additionalContactInformation1" className="mb-2">Additional Contact Information?1</Label>
              <Select
                value={formData.additionalContactInformation1 || ''}
                onValueChange={(value) => handleInputChange('additionalContactInformation1', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option, index) => (
                    <SelectItem key={`contact-info-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="referredBy" className="mb-2">Referred by</Label>
              <Select
                value={formData.referredBy || ''}
                onValueChange={(value) => handleInputChange('referredBy', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {referredByOtions.map((option, index) => (
                    <SelectItem key={`referred-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="investments1" className="mb-2">Investments 1</Label>
              <Select
                value={formData.investments1 || ''}
                onValueChange={(value) => handleInputChange('investments1', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {investmentOptions.map((option, index) => (
                    <SelectItem key={`investment-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="preferredContactMethod2" className="mb-2">Preferred Contact Method 2</Label>
              <Select
                value={formData.preferredContactMethod2 || ''}
                onValueChange={(value) => handleInputChange('preferredContactMethod2', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {preferredContactMethodOptions.map((option, index) => (
                    <SelectItem key={`contact-method-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="preferredContactTime2" className="mb-2">Preferred Contact Time 2</Label>
              <Select
                value={formData.preferredContactTime2 || ''}
                onValueChange={(value) => handleInputChange('preferredContactTime2', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option, index) => (
                    <SelectItem key={`contact-time-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="citizenshipStatus1" className="mb-2">Citizenship Status1</Label>
              <Select
                value={formData.citizenshipStatus1 || ''}
                onValueChange={(value) => handleInputChange('citizenshipStatus1', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {citizenshipStatusOptions.map((option, index) => (
                    <SelectItem key={`citizenship-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="understandingOfInsurance1" className="mb-2">Understanding of Insurance1</Label>
              <Select
                value={formData.understandingOfInsurance1 || ''}
                onValueChange={(value) => handleInputChange('understandingOfInsurance1', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option, index) => (
                    <SelectItem key={`understanding-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="existingInsurancePolicy2" className="mb-2">Existing Insurance Policy?2</Label>
              <Select
                value={formData.existingInsurancePolicy2 || ''}
                onValueChange={(value) => handleInputChange('existingInsurancePolicy2', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={`existing-policy-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="doYouOwnHomeInCananda" className="mb-2">Do you own a home in Canada?</Label>
              <Select
                value={formData.doYouOwnHomeInCananda || ''}
                onValueChange={(value) => handleInputChange('doYouOwnHomeInCananda', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={`home-canada-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="existingRenewalPolicyDueBy" className="mb-2">Existing Policy Renewal Due By</Label>
              <Input
                id="existingRenewalPolicyDueBy"
                type="date"
                value={formData.existingRenewalPolicyDueBy || ''}
                onChange={(e) => handleInputChange('existingRenewalPolicyDueBy', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="doYouHaveLifeInsurance" className="mb-2">Do you have life insurance?</Label>
              <Select
                value={formData.doYouHaveLifeInsurance || ''}
                onValueChange={(value) => handleInputChange('doYouHaveLifeInsurance', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={`life-insurance-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="coverageYouAreLookingFor" className="mb-2">Coverage you are Looking for?</Label>
              <Input
                id="coverageYouAreLookingFor"
                value={formData.coverageYouAreLookingFor || ''}
                onChange={(e) => handleInputChange('coverageYouAreLookingFor', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="submitPageUrl" className="mb-2">Submit Page URL</Label>
              <Input
                id="submitPageUrl"
                type="url"
                value={formData.submitPageUrl || ''}
                onChange={(e) => handleInputChange('submitPageUrl', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="assignedCampaigns" className="mb-2">Assigned Campaigns</Label>
              <Input
                id="assignedCampaigns"
                value={formData.assignedCampaigns || ''}
                onChange={(e) => handleInputChange('assignedCampaigns', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="twitter1" className="mb-2">Twitter1</Label>
              <Input
                id="twitter1"
                value={formData.twitter1 || ''}
                onChange={(e) => handleInputChange('twitter1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="roundRobinAssignmentTime1" className="mb-2">Round Robin Assignment Time1</Label>
              <Input
                id="roundRobinAssignmentTime1"
                type="datetime-local"
                value={formData.roundRobinAssignmentTime1 || ''}
                onChange={(e) => handleInputChange('roundRobinAssignmentTime1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="skypeId1" className="mb-2">Skype ID1</Label>
              <Input
                id="skypeId1"
                value={formData.skypeId1 || ''}
                onChange={(e) => handleInputChange('skypeId1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="instagram1" className="mb-2">Instagram1</Label>
              <Input
                id="instagram1"
                value={formData.instagram1 || ''}
                onChange={(e) => handleInputChange('instagram1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="leadPotentialBusinessPolicyValues" className="mb-2">Potential Business (Policy Values)1</Label>
              <Input
                id="leadPotentialBusinessPolicyValues"
                value={formData.leadPotentialBusinessPolicyValues || ''}
                onChange={(e) => handleInputChange('leadPotentialBusinessPolicyValues', e.target.value)}
                disabled={isDisabled}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="insuranceLeadScore" className="mb-2">Insurance Leads Scoring Score</Label>
              <Input
                id="insuranceLeadScore"
                value={formData.insuranceLeadScore || ''}
                onChange={(e) => handleInputChange('insuranceLeadScore', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="insuranceLeadScoringPositiveScore" className="mb-2">Insurence Leads Scoring Positive Score</Label>
              <Input
                id="insuranceLeadScoringPositiveScore"
                value={formData.insuranceLeadScoringPositiveScore || ''}
                onChange={(e) => handleInputChange('insuranceLeadScoringPositiveScore', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="insuranceLeadScoringNegativeTouchPointScore" className="mb-2">Insurence Leads Scoring Negative Touch Point Score</Label>
              <Input
                id="insuranceLeadScoringNegativeTouchPointScore"
                value={formData.insuranceLeadScoringNegativeTouchPointScore || ''}
                onChange={(e) => handleInputChange('insuranceLeadScoringNegativeTouchPointScore', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="gender1" className="mb-2">Gender1</Label>
              <Select
                value={formData.gender1 || ''}
                onValueChange={(value) => handleInputChange('gender1', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option, index) => (
                    <SelectItem key={`gender-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="leadInfoAdditionalContactInformation" className="mb-2">Additional Contact Information ?1</Label>
              <Select
                value={formData.leadInfoAdditionalContactInformation || ''}
                onValueChange={(value) => handleInputChange('leadInfoAdditionalContactInformation', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={`additional-contact-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="networth2" className="mb-2">Net Worth2</Label>
              <Select
                value={formData.networth2 || ''}
                onValueChange={(value) => handleInputChange('networth2', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option, index) => (
                    <SelectItem key={`networth-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="oldDatabaseLead1" className="mb-2">Old Database Lead ?1</Label>
              <Select
                value={formData.oldDatabaseLead1 || ''}
                onValueChange={(value) => handleInputChange('oldDatabaseLead1', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={`old-db-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="genderPrediction1" className="mb-2">Gender Predication1</Label>
              <Select
                value={formData.genderPrediction1 || ''}
                onValueChange={(value) => handleInputChange('genderPrediction1', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option, index) => (
                    <SelectItem key={`gender-pred-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="exchangeRate1" className="mb-2">Exchange Rate1</Label>
              <Input
                id="exchangeRate1"
                value={formData.exchangeRate1 || ''}
                onChange={(e) => handleInputChange('exchangeRate1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="currency1" className="mb-2">Currency1</Label>
              <Input
                id="currency1"
                value={formData.currency1 || ''}
                onChange={(e) => handleInputChange('currency1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="leadCreatedOn1" className="mb-2">Lead Created On</Label>
              <Input
                id="leadCreatedOn1"
                type="date"
                value={formData.leadCreatedOn1 || ''}
                onChange={(e) => handleInputChange('leadCreatedOn1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="linkdin1" className="mb-2">Linked In1</Label>
              <Input
                id="linkdin1"
                value={formData.linkdin1 || ''}
                onChange={(e) => handleInputChange('linkdin1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="facebook1" className="mb-2">FaceBook 1</Label>
              <Input
                id="facebook1"
                type="datetime-local"
                value={formData.facebook1 || ''}
                onChange={(e) => handleInputChange('facebook1', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="facebookAdInformation" className="mb-2">Facebook Ad Information ?</Label>
              <Select
                value={formData.facebookAdInformation || ''}
                onValueChange={(value) => handleInputChange('facebookAdInformation', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={`fb-ad-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="homeInsurance" className="mb-2">Home Insurance</Label>
              <Select
                value={formData.homeInsurance || ''}
                onValueChange={(value) => handleInputChange('homeInsurance', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {homeInsuranceOptions.map((option, index) => (
                    <SelectItem key={`home-insurance-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="servicesRequested" className="mb-2">Services Requested</Label>
              <Select
                value={formData.servicesRequested || ''}
                onValueChange={(value) => handleInputChange('servicesRequested', value)}
                disabled={isDisabled}
              >
<SelectTrigger className={"w-full"}>                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {serviceAvailedOptions.map((option, index) => (
                    <SelectItem key={`services-${index}`} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="insuranceLeadScoringTouchPointScore" className="mb-2">Insurence Leads scoring Touch Point Score</Label>
              <Input
                id="insuranceLeadScoringTouchPointScore"
                value={formData.insuranceLeadScoringTouchPointScore || ''}
                onChange={(e) => handleInputChange('insuranceLeadScoringTouchPointScore', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="insuranceLeadsScoringPositiveTouchPointScore" className="mb-2">Insurence Leads scoring Positive Touch Point Score</Label>
              <Input
                id="insuranceLeadsScoringPositiveTouchPointScore"
                value={formData.insuranceLeadsScoringPositiveTouchPointScore || ''}
                onChange={(e) => handleInputChange('insuranceLeadsScoringPositiveTouchPointScore', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="insuranceLeadsScoringNegativeScore" className="mb-2">Insurance Leads Scoring Negative Score</Label>
              <Input
                id="insuranceLeadsScoringNegativeScore"
                value={formData.insuranceLeadsScoringNegativeScore || ''}
                onChange={(e) => handleInputChange('insuranceLeadsScoringNegativeScore', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="whatsapp" className="mb-2">Whatsapp</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp || ''}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              <Label htmlFor="phoneBurnerLastOutcome" className="mb-2">PhoneBurner Last Call Outcome</Label>
              <Input
                id="phoneBurnerLastOutcome"
                value={formData.phoneBurnerLastOutcome || ''}
                onChange={(e) => handleInputChange('phoneBurnerLastOutcome', e.target.value)}
                disabled={isDisabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-4">
        <Button variant="outline"  onClick={handlePrevious} disabled={isDisabled}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default LeadInfoForm;