import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Address = ({ address, onNext, onPrevious, id }) => {
  const [formData, setFormData] = useState({ ...address });

  useEffect(() => {
    setFormData({ ...address });
  }, [address]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  const handlePrevious = () => {
    onPrevious(formData);
  };

  return (
    <div className="px-4">
      <h5 className="text-lg font-semibold mb-2">Address Information</h5>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">Street</label>
          <Input
            type="text"
            value={formData.street || ''}
            onChange={e => handleChange('street', e.target.value)}
            className="mb-2"
          />
        </div>
        <div>
          <label className="block mb-1">City</label>
          <Input
            type="text"
            value={formData.city || ''}
            onChange={e => handleChange('city', e.target.value)}
            className="mb-2"
          />
        </div>
        <div>
          <label className="block mb-1">State</label>
          <Input
            type="text"
            value={formData.state || ''}
            onChange={e => handleChange('state', e.target.value)}
            className="mb-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block mb-1">Postal Code</label>
          <Input
            type="text"
            value={formData.postalCode || ''}
            onChange={e => handleChange('postalCode', e.target.value)}
            className="mb-2"
          />
        </div>
        <div>
          <label className="block mb-1">Country</label>
          <Input
            type="text"
            value={formData.country || ''}
            onChange={e => handleChange('country', e.target.value)}
            className="mb-2"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={handlePrevious} variant="outline">
          Prev
        </Button>
        {!id && (
          <Button onClick={handleNext} variant="primary">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Address;
