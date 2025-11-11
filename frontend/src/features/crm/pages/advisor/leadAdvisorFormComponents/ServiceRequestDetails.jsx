import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const ServiceRequestDetails = ({ onNext, onPrevious, ServiceRequestDetails, id, isDisabled = false }) => {
  const [formData, setFormData] = useState(ServiceRequestDetails || {});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    <div className="space-y-6">
      {/* <h5 className="text-lg font-semibold mb-4">Service Request Details</h5> */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Services Requested</label>
                <Select
                  value={formData.servicesRequested || ''}
                  onValueChange={(value) => handleInputChange('servicesRequested', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Potential Business (Policy Values)</label>
                <Input
                  type="number"
                  value={formData.potentialBusiness || ''}
                  onChange={(e) => handleInputChange('potentialBusiness', e.target.value)}
                  className="w-full"
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Life Insurance</label>
                <Select
                  value={formData.lifeInsurance || ''}
                  onValueChange={(value) => handleInputChange('lifeInsurance', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Living Benefits</label>
                <Select
                  value={formData.livingBenefits || ''}
                  onValueChange={(value) => handleInputChange('livingBenefits', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Investments</label>
                <Select
                  value={formData.investments || ''}
                  onValueChange={(value) => handleInputChange('investments', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Group Insurance</label>
                <Select
                  value={formData.groupInsurance || ''}
                  onValueChange={(value) => handleInputChange('groupInsurance', value)}
                  disabled={isDisabled}
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Insurance</label>
                <Select
                  value={formData.travelInsurance || ''}
                  onValueChange={(value) => handleInputChange('travelInsurance', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Immigration Services</label>
                <Select
                  value={formData.immigrationServices || ''}
                  onValueChange={(value) => handleInputChange('immigrationServices', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="healthAndDental"
                  checked={formData.healthAndDentalInsurance || false}
                  onCheckedChange={(checked) => handleInputChange('healthAndDentalInsurance', checked)}
                  disabled={isDisabled}
                />
                <label htmlFor="healthAndDental" className="text-sm font-medium">Health & Dental Insurance</label>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Liability Insurance</label>
                <Select
                  value={formData.businessLiabilityInsurance || ''}
                  onValueChange={(value) => handleInputChange('businessLiabilityInsurance', value)}
                  disabled={isDisabled}
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Home Insurance</label>
                <Select
                  value={formData.homeInsurance || ''}
                  onValueChange={(value) => handleInputChange('homeInsurance', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Auto Insurance</label>
                <Select
                  value={formData.autoInsurance || ''}
                  onValueChange={(value) => handleInputChange('autoInsurance', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Loan Protection</label>
                <Select
                  value={formData.loanProtection || ''}
                  onValueChange={(value) => handleInputChange('loanProtection', value)}
                  disabled={isDisabled}
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="combinationOrHybrid"
                  checked={formData.combinationOrHybridInsurance || false}
                  onCheckedChange={(checked) => handleInputChange('combinationOrHybridInsurance', checked)}
                  disabled={isDisabled}
                />
                <label htmlFor="combinationOrHybrid" className="text-sm font-medium">Combination or Hybrid Insurance</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <div className="flex justify-center gap-4 mt-6" style={{ marginBottom: '200px' }}>
        <Button
          variant="outline"
          onClick={onPrevious}
        >
          Prev
        </Button>
        {!id && (
          <Button
            onClick={() => onNext(formData)}
          >
            Submit
          </Button>
        )}
      </div> */}
    </div>
  );
};

export default ServiceRequestDetails;
