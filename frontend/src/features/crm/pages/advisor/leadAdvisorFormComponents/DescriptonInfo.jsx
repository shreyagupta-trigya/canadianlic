import React, { useState } from 'react';
import { FormCard, FormField } from '@/components/custom/CustomFormComponents';
import { Input } from '@/components/ui/input';

const DescriptonInfo = ({ onNext, onPrevious, DescriptonInfo, isDisabled = false }) => {
  const [formData, setFormData] = useState(DescriptonInfo || {});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div>
      <FormCard title="Description Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Description">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
              name="description"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="4"
              placeholder="Enter description"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Notes">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
              name="notes"
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows="4"
              placeholder="Enter notes"
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default DescriptonInfo;
