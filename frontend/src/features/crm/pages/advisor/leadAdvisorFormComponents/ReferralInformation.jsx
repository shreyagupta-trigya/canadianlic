import React, { useState, useEffect } from 'react';
import { FormCard, FormField } from '@/components/custom/CustomFormComponents';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { referralSourceOption, yearOption, productCategoryOption } from '../utils/picklist';

const ReferralInformation = ({ ReferralInformation, contacts, referral, leadSource, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({ ...ReferralInformation });
  const [contactsArr, setContactsArr] = useState([...contacts]);
  const [referralArr, setReferralArr] = useState([...referral]);

  useEffect(() => {
    setFormData({ ...ReferralInformation });
  }, [ReferralInformation]);

  useEffect(() => {
    setContactsArr([...contacts]);
  }, [contacts]);

  useEffect(() => {
    setReferralArr([...referral]);
  }, [referral]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  const handlePrevious = () => {
    onPrevious();
  };

  if (leadSource?.toLowerCase() !== 'referral') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <span className="text-muted">Please select lead in lead Info as Referral to enter referral information.</span>
      </div>
    );
  }

  return (
    <div>
      <FormCard title="Referral Information">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Referred By">
            <Select
              value={formData.referredBy || ''}
              onValueChange={(value) => handleInputChange('referredBy', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Referred By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-None-">-None-</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Radio">Radio</SelectItem>
                <SelectItem value="Google">Google</SelectItem>
                <SelectItem value="Advisor">Advisor</SelectItem>
                <SelectItem value="External Referral">External Referral</SelectItem>
                <SelectItem value="Lead/Client">Lead/Client</SelectItem>
                <SelectItem value="Mortgage/RealEstate/Accountant">Mortgage/RealEstate/Accountant</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Year">
            <Select
              value={formData.year || ''}
              onValueChange={(value) => handleInputChange('year', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {yearOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Referral Source">
            <Select
              value={formData.referralSource || ''}
              onValueChange={(value) => handleInputChange('referralSource', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Referral Source" />
              </SelectTrigger>
              <SelectContent>
                {referralSourceOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Referral Client">
            <Select
              value={formData.referralClient || ''}
              onValueChange={(value) => handleInputChange('referralClient', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Referral Client" />
              </SelectTrigger>
              <SelectContent>
                {contactsArr.map(contact => (
                  <SelectItem key={contact.ROWID} value={contact.ROWID}>
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Referral Other than Client">
            <Select
              value={formData.referralOtherThanClient || ''}
              onValueChange={(value) => handleInputChange('referralOtherThanClient', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Referral" />
              </SelectTrigger>
              <SelectContent>
                {referralArr.map(ref => (
                  <SelectItem key={ref.ROWID} value={ref.ROWID}>
                    {ref.referralName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Product Category Referred">
            <Select
              value={formData.productCategoryReferred || ''}
              onValueChange={(value) => handleInputChange('productCategoryReferred', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product Category" />
              </SelectTrigger>
              <SelectContent>
                {productCategoryOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default ReferralInformation;
