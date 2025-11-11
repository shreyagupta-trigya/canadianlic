import React, { useState, useEffect } from 'react';
import { FormCard, FormField } from '@/components/custom/CustomFormComponents';
import { Input } from '@/components/ui/input';

const AddressInformation = ({ AddressInformation, onNext, onPrevious, isDisabled = false }) => {
  const [formData, setFormData] = useState({ ...AddressInformation });

  useEffect(() => {
    setFormData({ ...AddressInformation });
  }, [AddressInformation]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div>
      <FormCard title="Address Information">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Street">
            <Input
              value={formData.street || ''}
              onChange={(e) => handleInputChange('street', e.target.value)}
              placeholder="Street"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Province">
            <Input
              value={formData.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="Province"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Country">
            <Input
              value={formData.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="Country"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="City">
            <Input
              value={formData.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Postal Code">
            <Input
              value={formData.zipCode || ''}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="Postal Code"
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default AddressInformation;
