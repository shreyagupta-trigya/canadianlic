import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AddressForm = React.memo(({
  formData,
  setFormData,
  isDisabled,
  handlePrevious, handleNext
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize form data if not provided
    if (!formData) {
      setFormData({
        mailingStreet: '',
        mailingCity: '',
        mailingState: '',
        mailingpostalCode: '',
        mailingCountry: '',
        otherStreet: '',
        otherCity: '',
        otherState: '',
        otherZip: '',
        otherCountry: ''
      });
    }
  }, [formData, setFormData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, [setFormData]);

  const copyAddress = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      otherStreet: prev.mailingStreet || '',
      otherCity: prev.mailingCity || '',
      otherState: prev.mailingState || '',
      otherZip: prev.mailingpostalCode || '',
      otherCountry: prev.mailingCountry || ''
    }));
  }, [setFormData]);


  return (
    <div className="space-y-6">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4 px-1">
            <h5 className="text-lg font-semibold mb-0">Address Information</h5>
            <Button
              variant="outline"
              size="sm"
              onClick={copyAddress}
              disabled={isDisabled}
            >
              Copy Address
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
            {/* Mailing Address Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="mailingStreet">Mailing Street</Label>
                <Input
                  id="mailingStreet"
                  value={formData?.mailingStreet || ''}
                  onChange={(e) => handleInputChange('mailingStreet', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="mailingCity">Mailing City</Label>
                <Input
                  id="mailingCity"
                  value={formData?.mailingCity || ''}
                  onChange={(e) => handleInputChange('mailingCity', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="mailingState">Mailing State</Label>
                <Input
                  id="mailingState"
                  value={formData?.mailingState || ''}
                  onChange={(e) => handleInputChange('mailingState', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="mailingpostalCode">Mailing Zip</Label>
                <Input
                  id="mailingpostalCode"
                  value={formData?.mailingpostalCode || ''}
                  onChange={(e) => handleInputChange('mailingpostalCode', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="mailingCountry">Mailing Country</Label>
                <Input
                  id="mailingCountry"
                  value={formData?.mailingCountry || ''}
                  onChange={(e) => handleInputChange('mailingCountry', e.target.value)}
                  disabled={isDisabled}
                />
              </div>
            </div>

            {/* Other Address Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="otherStreet">Other Street</Label>
                <Input
                  id="otherStreet"
                  value={formData?.otherStreet || ''}
                  onChange={(e) => handleInputChange('otherStreet', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="otherCity">Other City</Label>
                <Input
                  id="otherCity"
                  value={formData?.otherCity || ''}
                  onChange={(e) => handleInputChange('otherCity', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="otherState">Other State</Label>
                <Input
                  id="otherState"
                  value={formData?.otherState || ''}
                  onChange={(e) => handleInputChange('otherState', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="otherZip">Other Zip</Label>
                <Input
                  id="otherZip"
                  value={formData?.otherZip || ''}
                  onChange={(e) => handleInputChange('otherZip', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <Label htmlFor="otherCountry">Other Country</Label>
                <Input
                  id="otherCountry"
                  value={formData?.otherCountry || ''}
                  onChange={(e) => handleInputChange('otherCountry', e.target.value)}
                  disabled={isDisabled}
                />
              </div>
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
});

AddressForm.displayName = 'AddressForm';

export default AddressForm;
