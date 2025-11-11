import React, { useState, useEffect, useCallback, memo } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import validateMandatoryFields from '../utils/validate.js';
import mandatory from '../utils/mandatory.js';
import {
  insuranceleadSourceOptions,
  statusOptions,
  digitalStageTrackingOptions,
  socialMediaInformationOptions,
  preferredContactMethodOptions,
  availabilityOptions,
  genderOptions,
  choice,
  priorityOptions,
  optionsArray,
  referredByOtions,
  citizenshipStatusOptions,
  homeInsuranceOptions,
  serviceAvailedOptions
} from '../utils/picklist.js';

const ContactInfoForm = memo(({ formData = {}, setFormData, isDisabled }) => {
  // Ensure formData is always an object
  const safeFormData = formData || {};

  const [errors, setErrors] = useState({});
  const [owners, setOwners] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [location, setLocation] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/utils/api/v2/get-users`);
      const data = await response.json();
      setOwners(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/utils/api/v2/get-contacts`);
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/utils/api/v2/get-lead-data`);
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }, []);

  const fetchLocations = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/utils/api/v2/get-locations`);
      const data = await response.json();
      setLocation(data.locations || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }, []);

  useEffect(() => {
    // Fetch data from API or props
    fetchUsers();
    fetchContacts();
    fetchLeads();
    fetchLocations();
  }, []);

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

  const handleDateChange = (field, date) => {
    const formattedDate = date ? format(date, "dd/MM/yyyy") : "";
    handleInputChange(field, formattedDate);
  };

  const handleDateTimeChange = (field, date) => {
    const formattedDateTime = date ? format(date, "dd/MM/yyyy HH:mm") : "";
    handleInputChange(field, formattedDateTime);
  };

  const handleNext = () => {
    const validationErrors = validateMandatoryFields(safeFormData, mandatory);
    setErrors(validationErrors);

    // Additional phone validation
    const mobile = (safeFormData.mobile || '').replace(/\s|-/g, '');
    if (mobile) {
      if (!mobile.startsWith('+')) {
        setErrors(prev => ({ ...prev, mobile: 'Country code is required (e.g. +1...)' }));
      } else if (mobile.startsWith('+1') && !/^\+1\d{10}$/.test(mobile)) {
        setErrors(prev => ({ ...prev, mobile: 'Canadian number must be +1 followed by 10 digits' }));
      } else if (!/^\+\d{8,15}$/.test(mobile)) {
        setErrors(prev => ({ ...prev, mobile: 'Phone must be in international format (e.g. +1234567890)' }));
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      // Convert dates to API format
      const dateFields = [
        "dateOfBirth",
        "leadCreatedOn",
        "leadConvertedOn",
        "clientPolicyIssueOn",
        "phoneBurnerFollowUpDate"
      ];

      const updatedFormData = { ...safeFormData };
      dateFields.forEach(field => {
        if (updatedFormData[field] && /^\d{2}\/\d{2}\/\d{4}$/.test(updatedFormData[field])) {
          const [day, month, year] = updatedFormData[field].split('/');
          updatedFormData[field] = `${year}-${month}-${day}`;
        }
      });

      // Emit next event with updated data
      console.log("Contact Info Form Data:", updatedFormData);
      // Here you would typically call a parent function to handle next step
    }
  };

  return (
    <div className="space-y-6 p-1">
      <h5 className="text-2xl font-semibold mb-4 ml-1">Contact Info</h5>

      {/* Basic Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shadow hover:shadow-md p-3 rounded-md border">
        {/* Contact Owner */}
        <div className="space-y-2">
          <Label htmlFor="contactOwner">Contact Owner <span className="text-red-500">*</span></Label>
          <Select
            value={safeFormData.contactOwner || ''}
            onValueChange={(value) => handleInputChange('contactOwner', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.map((owner) => (
                <SelectItem key={owner.ROWID} value={owner.ROWID}>
                  {owner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contactOwner && <p className="text-red-500 text-sm">{errors.contactOwner}</p>}
        </div>

        {/* Insurance Lead Source */}
        <div className="space-y-2">
          <Label htmlFor="insuranceLeadSource">Insurance Lead Source <span className="text-red-500">*</span></Label>
          <Select
            value={safeFormData.insuranceLeadSource || ''}
            onValueChange={(value) => handleInputChange('insuranceLeadSource', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Source" />
            </SelectTrigger>
            <SelectContent>
              {insuranceleadSourceOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.insuranceLeadSource && <p className="text-red-500 text-sm">{errors.insuranceLeadSource}</p>}
        </div>

        {/* Assigned Advisor */}
        <div className="space-y-2">
          <Label htmlFor="assignedAdvisor">Assigned Advisor</Label>
          <Select
            value={safeFormData.assignedAdvisor || ''}
            onValueChange={(value) => handleInputChange('assignedAdvisor', value)}
            disabled={isDisabled}
          >
                        <SelectTrigger className={"w-full"}>

              <SelectValue placeholder="Select Advisor" />
            </SelectTrigger>
            <SelectContent>
              {contacts.map((contact) => (
                <SelectItem key={contact.ROWID} value={contact.ROWID}>
                  {contact.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Deal Stage Tracking */}
        <div className="space-y-2">
          <Label htmlFor="dealStageTracking">Deal Stage Tracking</Label>
          <Select
            value={safeFormData.dealStageTracking || ''}
            onValueChange={(value) => handleInputChange('dealStageTracking', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Stage" />
            </SelectTrigger>
            <SelectContent>
              {digitalStageTrackingOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select
            value={safeFormData.location || ''}
            onValueChange={(value) => handleInputChange('location', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {location.map((loc) => (
                <SelectItem key={loc.ROWID} value={loc.ROWID}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Old Database Lead */}
        <div className="space-y-2">
          <Label htmlFor="oldDatabaseLead">Old Database Lead?</Label>
          <Select
            value={safeFormData.oldDatabaseLead || ''}
            onValueChange={(value) => handleInputChange('oldDatabaseLead', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {socialMediaInformationOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lead */}
        <div className="space-y-2">
          <Label htmlFor="leadId">Lead</Label>
          <Select
            value={safeFormData.leadId || ''}
            onValueChange={(value) => handleInputChange('leadId', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Lead" />
            </SelectTrigger>
            <SelectContent>
              {leads.map((lead) => (
                <SelectItem key={lead.ROWID} value={lead.ROWID}>
                  {lead.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={safeFormData.status || ''}
            onValueChange={(value) => handleInputChange('status', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={safeFormData.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={isDisabled}
            className={cn(errors.firstName && "border-red-500")}
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
          <Input
            id="lastName"
            value={safeFormData.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={isDisabled}
            className={cn(errors.lastName && "border-red-500")}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !safeFormData.dateOfBirth && "text-muted-foreground"
                )}
                disabled={isDisabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {safeFormData.dateOfBirth ? safeFormData.dateOfBirth : "DD/MM/YYYY"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={safeFormData.dateOfBirth ? new Date(safeFormData.dateOfBirth.split('/').reverse().join('-')) : undefined}
                onSelect={(date) => handleDateChange('dateOfBirth', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={safeFormData.gender || ''}
            onValueChange={(value) => handleInputChange('gender', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            type="email"
            value={safeFormData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isDisabled}
            className={cn(errors.email && "border-red-500")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <PhoneInput
            international
            defaultCountry="CA"
            value={safeFormData.mobile || ''}
            onChange={(value) => handleInputChange('mobile', value)}
            disabled={isDisabled}
            className="phone-input w-full border p-[5px] rounded-md"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <Label htmlFor="whatsApp">WhatsApp</Label>
          <Input
            id="whatsApp"
            value={safeFormData.whatsApp || ''}
            onChange={(e) => handleInputChange('whatsApp', e.target.value)}
            disabled={isDisabled}
          />
        </div>

        {/* Client Address */}
        <div className="space-y-2">
          <Label htmlFor="clientAddress">Client Address</Label>
          <Textarea
            id="clientAddress"
            value={safeFormData.clientAddress || ''}
            onChange={(e) => handleInputChange('clientAddress', e.target.value)}
            disabled={isDisabled}
            rows={2}
          />
        </div>

        {/* Additional Contact Information */}
        <div className="space-y-2">
          <Label htmlFor="additionalContactInformation">Additional Contact Information?</Label>
          <Select
            value={safeFormData.additionalContactInformation || ''}
            onValueChange={(value) => handleInputChange('additionalContactInformation', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {optionsArray.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Social Media Information */}
        <div className="space-y-2">
          <Label htmlFor="socialMediaInformation">Social Media Information?</Label>
          <Select
            value={safeFormData.socialMediaInformation || ''}
            onValueChange={(value) => handleInputChange('socialMediaInformation', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {socialMediaInformationOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Understanding of Insurance */}
        <div className="space-y-2">
          <Label htmlFor="understandingOfInsurance">Understanding of Insurance</Label>
          <Select
            value={safeFormData.understandingOfInsurance || ''}
            onValueChange={(value) => handleInputChange('understandingOfInsurance', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Do you have a Corporation? */}
        <div className="space-y-2">
          <Label htmlFor="doYouHaveCorporations">Do you have a Corporation?</Label>
          <Select
            value={safeFormData.doYouHaveCorporations || ''}
            onValueChange={(value) => handleInputChange('doYouHaveCorporations', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {choice.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Referred By */}
        <div className="space-y-2">
          <Label htmlFor="referredBy">Referred By</Label>
          <Select
            value={safeFormData.referredBy || ''}
            onValueChange={(value) => handleInputChange('referredBy', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {referredByOtions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Citizenship Status */}
        <div className="space-y-2">
          <Label htmlFor="citizenshipStatus">Citizenship Status</Label>
          <Select
            value={safeFormData.citizenshipStatus || ''}
            onValueChange={(value) => handleInputChange('citizenshipStatus', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {citizenshipStatusOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Home Insurance */}
        <div className="space-y-2">
          <Label htmlFor="homeInsurance">Home Insurance</Label>
          <Select
            value={safeFormData.homeInsurance || ''}
            onValueChange={(value) => handleInputChange('homeInsurance', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {homeInsuranceOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service Availed */}
        <div className="space-y-2">
          <Label htmlFor="serviceAvailed">Service Availed</Label>
          <Select
            value={safeFormData.serviceAvailed || ''}
            onValueChange={(value) => handleInputChange('serviceAvailed', value)}
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
      </div>

      {/* Additional Contact Information Section */}
      {safeFormData.additionalContactInformation === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={safeFormData.phoneNumber || ''}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addEmail1">Add Email1</Label>
            <Input
              id="addEmail1"
              type="email"
              value={safeFormData.addEmail1 || ''}
              onChange={(e) => handleInputChange('addEmail1', e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fax">Fax</Label>
            <Input
              id="fax"
              value={safeFormData.fax || ''}
              onChange={(e) => handleInputChange('fax', e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherContact">Other</Label>
            <Input
              id="otherContact"
              value={safeFormData.otherContact || ''}
              onChange={(e) => handleInputChange('otherContact', e.target.value)}
              disabled={isDisabled}
            />
          </div>
        </div>
      )}

      {/* Lead Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shadow hover:shadow-md p-3 rounded-md border">
        {/* Lead Created On */}
        <div className="space-y-2">
          <Label>Lead Created On</Label>
          <Input
            value={safeFormData.leadCreatedOn || ''}
            disabled
            className="bg-gray-100"
          />
        </div>

        {/* Lead Converted On */}
        <div className="space-y-2">
          <Label>Lead Converted On</Label>
          <Input
            value={safeFormData.leadConvertedOn || ''}
            disabled
            className="bg-gray-100"
          />
        </div>

        {/* Lead Status on Conversion */}
        <div className="space-y-2">
          <Label>Lead Status on Conversion</Label>
          <Select value={safeFormData.leadStatusOnConversion || ''} disabled>
            <SelectTrigger className={"w-full"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Application Go Ahead - Life">Application Go Ahead - Life</SelectItem>
              <SelectItem value="Application Go Ahead - Travel / Supervisa">Application Go Ahead - Travel / Supervisa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lead Created Time */}
        <div className="space-y-2">
          <Label>Lead Created Time</Label>
          <Input
            value={safeFormData.leadCreatedTime || ''}
            disabled
            className="bg-gray-100"
          />
        </div>

        {/* Preferred Contact Time */}
        <div className="space-y-2">
          <Label>Preferred Contact Time</Label>
          <Select
            value={safeFormData.preferredContactTime || ''}
            onValueChange={(value) => handleInputChange('preferredContactTime', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-2">
          <Label>Preferred Contact Method</Label>
          <Select
            value={safeFormData.preferredContactMethod || ''}
            onValueChange={(value) => handleInputChange('preferredContactMethod', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              {preferredContactMethodOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Social Media Information */}
        <div className="space-y-2">
          <Label>Social Media Information?</Label>
          <Select
            value={safeFormData.socialMediaInformation || ''}
            onValueChange={(value) => handleInputChange('socialMediaInformation', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {socialMediaInformationOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Old Database Lead */}
        <div className="space-y-2">
          <Label>Old Database Lead?</Label>
          <Select
            value={safeFormData.oldDatabaseLead || ''}
            onValueChange={(value) => handleInputChange('oldDatabaseLead', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {socialMediaInformationOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shadow hover:shadow-md p-3 rounded-md border">
        {/* Last CLV Corporate */}
        <div className="space-y-2">
          <Label>Last CLV Corporate</Label>
          <Input
            value={safeFormData.lastClvCorporate || ''}
            onChange={(e) => handleInputChange('lastClvCorporate', e.target.value)}
            disabled={isDisabled}
          />
        </div>

        {/* CLV Corporate Commission */}
        <div className="space-y-2">
          <Label>CLV Corporate Commission</Label>
          <Input
            value={safeFormData.clvCorporateCommision || ''}
            onChange={(e) => handleInputChange('clvCorporateCommision', e.target.value)}
            disabled={isDisabled}
            placeholder="CA$"
          />
        </div>

        {/* CLV Advisor Commission */}
        <div className="space-y-2">
          <Label>CLV Advisor Commission</Label>
          <Input
            value={safeFormData.clvAdvisorCommision || ''}
            onChange={(e) => handleInputChange('clvAdvisorCommision', e.target.value)}
            disabled={isDisabled}
            placeholder="CA$"
          />
        </div>

        {/* Last CLV Advisor */}
        <div className="space-y-2">
          <Label>Last CLV Advisor</Label>
          <Input
            value={safeFormData.lastClvAdvisor || ''}
            onChange={(e) => handleInputChange('lastClvAdvisor', e.target.value)}
            disabled={isDisabled}
          />
        </div>

        {/* PhoneBurner Follow Up Date */}
        <div className="space-y-2">
          <Label>PhoneBurner Follow Up Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !safeFormData.phoneBurnerFollowUpDate && "text-muted-foreground"
                )}
                disabled={isDisabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {safeFormData.phoneBurnerFollowUpDate ? safeFormData.phoneBurnerFollowUpDate : "DD/MM/YYYY"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={safeFormData.phoneBurnerFollowUpDate ? new Date(safeFormData.phoneBurnerFollowUpDate.split('/').reverse().join('-')) : undefined}
                onSelect={(date) => handleDateChange('phoneBurnerFollowUpDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* PhoneBurner Last Call Time */}
        <div className="space-y-2">
          <Label>PhoneBurner Last Call Time</Label>
          <Input
            value={safeFormData.phoneBurnerLastCallTime || ''}
            onChange={(e) => handleInputChange('phoneBurnerLastCallTime', e.target.value)}
            disabled={isDisabled}
            placeholder="DD/MM/YYYY HH:mm"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Input
            value={safeFormData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={isDisabled}
          />
        </div>

        {/* Number of Products Remaining */}
        <div className="space-y-2">
          <Label>Number of Products Remaining (Individual)</Label>
          <Input
            value={safeFormData.numberofProductsRemaining || ''}
            onChange={(e) => handleInputChange('numberofProductsRemaining', e.target.value)}
            disabled={isDisabled}
          />
        </div>
      </div>
<div className='shadow hover:shadow-md p-3 rounded-md border'>


      {/* Additional Settings Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        {/* Currency */}
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select value="CAD" disabled>
            <SelectTrigger className={"w-full"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Net Worth */}
        <div className="space-y-2">
          <Label>Net Worth</Label>
          <Select
            value={safeFormData.netWorth || ''}
            onValueChange={(value) => handleInputChange('netWorth', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Email is valid */}
        <div className="space-y-2">
          <Label>Email is valid</Label>
          <Select
            value={safeFormData.emailIsValid || ''}
            onValueChange={(value) => handleInputChange('emailIsValid', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {choice.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Immigration Services */}
        <div className="space-y-2">
          <Label>Immigration Services</Label>
          <Select
            value={safeFormData.immigrationServices || ''}
            onValueChange={(value) => handleInputChange('immigrationServices', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {socialMediaInformationOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Client's 1st Policy Issued On */}
        <div className="space-y-2">
          <Label>Client's 1st Policy Issued On</Label>
          <Input
            value={safeFormData.clientPolicyIssueOn || ''}
            onChange={(e) => handleInputChange('clientPolicyIssueOn', e.target.value)}
            disabled={isDisabled}
            placeholder="DD/MM/YYYY HH:mm"
          />
        </div>
      </div>

      {/* Checkboxes Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="emailRoundRobinOwner2"
            checked={safeFormData.emailRoundRobinOwner2 || false}
            onCheckedChange={(checked) => handleInputChange('emailRoundRobinOwner2', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="emailRoundRobinOwner2">Email Round Robin Owner</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="eligibleRoundRobinOwnerFound"
            checked={safeFormData.eligibleRoundRobinOwnerFound || false}
            onCheckedChange={(checked) => handleInputChange('eligibleRoundRobinOwnerFound', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="eligibleRoundRobinOwnerFound">Eligible Round Robin Owner Found</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="emailOptOut"
            checked={safeFormData.emailOptOut || false}
            onCheckedChange={(checked) => handleInputChange('emailOptOut', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="emailOptOut">Email Opt Out</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="roundRobinProcessed"
            checked={safeFormData.roundRobinProcessed || false}
            onCheckedChange={(checked) => handleInputChange('roundRobinProcessed', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="roundRobinProcessed">Round Robin Processed</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="reRoundRobinProcessed"
            checked={safeFormData.reRoundRobinProcessed || false}
            onCheckedChange={(checked) => handleInputChange('reRoundRobinProcessed', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="reRoundRobinProcessed">Re-run round robin</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="rcSMSOptOut"
            checked={safeFormData.rcSMSOptOut || false}
            onCheckedChange={(checked) => handleInputChange('rcSMSOptOut', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="rcSMSOptOut">RC SMS Opt Out</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="removeFromCampaign"
            checked={safeFormData.removeFromCampaign || false}
            onCheckedChange={(checked) => handleInputChange('removeFromCampaign', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="removeFromCampaign">Remove From Campaign</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="eligibleRoundRobinOwnerFound1"
            checked={safeFormData.eligibleRoundRobinOwnerFound1 || false}
            onCheckedChange={(checked) => handleInputChange('eligibleRoundRobinOwnerFound1', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="eligibleRoundRobinOwnerFound1">Eligible Round Robin Owner Found1</Label>
        </div>
      </div>
</div>
      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <Button onClick={handleNext} className="px-8">
          Next
        </Button>
      </div>
    </div>
  );
})

export default ContactInfoForm;
