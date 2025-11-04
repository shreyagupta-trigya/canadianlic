import React, { useState, useEffect } from 'react';
import { FormCard, FormField } from '@/components/custom/CustomFormComponents';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  lifeInsuranceOption,
  livingBenefitsOption,
  servicesRequested,
  businessLiabilityInsuranceOption,
  investmentsOption,
  immigrationServicesOption,
  groupInsuranceOption,
  loanProtectionOption,
  homeInsuranceOption,
  autoInsuranceOption,
  travelInsuranceOption,
  groupInsurance
} from '../utils/picklist';

const ServiceRequestDetails = ({ ServiceRequestDetails, id, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({ ...ServiceRequestDetails });

  useEffect(() => {
    setFormData({ ...ServiceRequestDetails });
  }, [ServiceRequestDetails]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const immigrationServicesGroups = {
    'Visas & Entry': [
      'Super Visa',
      'Visitor Visa',
      'Study Visa',
      'LMIA',
      'Caregivers',
      'Permanent Residence: Express Entry',
      'Startup Visa Program'
    ],
    'Business & Other Programs': [
      'Business Visa',
      'Business Immigration - Investment',
      'Canadian Experience Class (ECE)',
      'Citizenship',
      'Deportation',
      'Federal Skill Worker',
      'Temporary Resident Visa (Business & Tourism)'
    ],
    'PNP & Special Cases': [
      'Provincial Nominee Program - Entrepreneur',
      'Provincial Nominee Program',
      'Decided',
      'PR(H&C)'
    ]
  };

  return (
    <div>
      <FormCard title="Service Request Details">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Services Requested">
            <Select
              value={formData.servicesRequested || ''}
              onValueChange={(value) => handleInputChange('servicesRequested', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Services Requested" />
              </SelectTrigger>
              <SelectContent>
                {servicesRequested.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Potential Business (Policy Values)">
            <Input
              type="number"
              value={formData.potentialBusiness || ''}
              onChange={(e) => handleInputChange('potentialBusiness', e.target.value)}
            />
          </FormField>
          <FormField label="Life Insurance">
            <Select
              value={formData.lifeInsurance || ''}
              onValueChange={(value) => handleInputChange('lifeInsurance', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Life Insurance" />
              </SelectTrigger>
              <SelectContent>
                {lifeInsuranceOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Living Benefits">
            <Select
              value={formData.livingBenefits || ''}
              onValueChange={(value) => handleInputChange('livingBenefits', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Living Benefits" />
              </SelectTrigger>
              <SelectContent>
                {livingBenefitsOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Investments">
            <Select
              value={formData.investments || ''}
              onValueChange={(value) => handleInputChange('investments', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Investments" />
              </SelectTrigger>
              <SelectContent>
                {investmentsOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Group Insurance">
            <Select
              value={formData.groupInsurance || ''}
              onValueChange={(value) => handleInputChange('groupInsurance', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Group Insurance" />
              </SelectTrigger>
              <SelectContent>
                {groupInsuranceOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Travel Insurance">
            <Select
              value={formData.travelInsurance || ''}
              onValueChange={(value) => handleInputChange('travelInsurance', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Travel Insurance" />
              </SelectTrigger>
              <SelectContent>
                {travelInsuranceOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Immigration Services">
            <Select
              value={formData.immigrationServices || ''}
              onValueChange={(value) => handleInputChange('immigrationServices', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Immigration Services" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(immigrationServicesGroups).map(([label, items]) => (
                  <optgroup key={label} label={label}>
                    {items.map((option, idx) => (
                      <SelectItem key={`${label}-${idx}`} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </optgroup>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Health & Dental Insurance">
            <Checkbox
              checked={formData.healthAndDentalInsurance || false}
              onCheckedChange={(checked) => handleInputChange('healthAndDentalInsurance', checked)}
            />
          </FormField>
          <FormField label="Business Liability Insurance">
            <Select
              value={formData.businessLiabilityInsurance || ''}
              onValueChange={(value) => handleInputChange('businessLiabilityInsurance', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Business Liability Insurance" />
              </SelectTrigger>
              <SelectContent>
                {businessLiabilityInsuranceOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Home Insurance">
            <Select
              value={formData.homeInsurance || ''}
              onValueChange={(value) => handleInputChange('homeInsurance', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Home Insurance" />
              </SelectTrigger>
              <SelectContent>
                {homeInsuranceOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Auto Insurance">
            <Select
              value={formData.autoInsurance || ''}
              onValueChange={(value) => handleInputChange('autoInsurance', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Auto Insurance" />
              </SelectTrigger>
              <SelectContent>
                {autoInsuranceOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Loan Protection">
            <Select
              value={formData.loanProtection || ''}
              onValueChange={(value) => handleInputChange('loanProtection', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Loan Protection" />
              </SelectTrigger>
              <SelectContent>
                {loanProtectionOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Combination or Hybrid Insurance">
            <Checkbox
              checked={formData.combinationOrHybridInsurance || false}
              onCheckedChange={(checked) => handleInputChange('combinationOrHybridInsurance', checked)}
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default ServiceRequestDetails;
