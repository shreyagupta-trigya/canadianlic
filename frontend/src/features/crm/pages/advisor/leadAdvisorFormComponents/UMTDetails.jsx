import React, { useState } from 'react';
import { FormCard, FormField } from '@/components/custom/CustomFormComponents';
import { Input } from '@/components/ui/input';

const UMTDetails = ({ UMTDetails, Facebook, onNext, onPrevious }) => {
  const [umtData, setUmtData] = useState(UMTDetails || {});
  const [facebookData, setFacebookData] = useState(Facebook || {});

  const handleUmtChange = (field, value) => {
    setUmtData(prev => ({ ...prev, [field]: value }));
  };

  const handleFacebookChange = (field, value) => {
    setFacebookData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onNext({ UMTDetails: umtData, Facebook: facebookData });
  };

  return (
    <div>
      <FormCard title="UMT Details">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Campaign ID">
            <Input
              value={umtData.campaignidData || ''}
              onChange={(e) => handleUmtChange('campaignidData', e.target.value)}
              placeholder="Campaign ID"
            />
          </FormField>
          <FormField label="Network">
            <Input
              value={umtData.networkData || ''}
              onChange={(e) => handleUmtChange('networkData', e.target.value)}
              placeholder="Network"
            />
          </FormField>
          <FormField label="Ad Group ID">
            <Input
              value={umtData.adgroupidData || ''}
              onChange={(e) => handleUmtChange('adgroupidData', e.target.value)}
              placeholder="Ad Group ID"
            />
          </FormField>
          <FormField label="Device">
            <Input
              value={umtData.deviceData || ''}
              onChange={(e) => handleUmtChange('deviceData', e.target.value)}
              placeholder="Device"
            />
          </FormField>
          <FormField label="Match Type">
            <Input
              value={umtData.matchtypeData || ''}
              onChange={(e) => handleUmtChange('matchtypeData', e.target.value)}
              placeholder="Match Type"
            />
          </FormField>
          <FormField label="Keyword">
            <Input
              value={umtData.keywordData || ''}
              onChange={(e) => handleUmtChange('keywordData', e.target.value)}
              placeholder="Keyword"
            />
          </FormField>
          <FormField label="GCLID">
            <Input
              value={umtData.gclidData || ''}
              onChange={(e) => handleUmtChange('gclidData', e.target.value)}
              placeholder="GCLID"
            />
          </FormField>
          <FormField label="LP URL">
            <Input
              value={umtData.lpUrlData || ''}
              onChange={(e) => handleUmtChange('lpUrlData', e.target.value)}
              placeholder="LP URL"
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Facebook Details">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Facebook ID">
            <Input
              value={facebookData.facebookId || ''}
              onChange={(e) => handleFacebookChange('facebookId', e.target.value)}
              placeholder="Facebook ID"
            />
          </FormField>
          <FormField label="Facebook Name">
            <Input
              value={facebookData.facebookName || ''}
              onChange={(e) => handleFacebookChange('facebookName', e.target.value)}
              placeholder="Facebook Name"
            />
          </FormField>
          <FormField label="Facebook Email">
            <Input
              type="email"
              value={facebookData.facebookEmail || ''}
              onChange={(e) => handleFacebookChange('facebookEmail', e.target.value)}
              placeholder="Facebook Email"
            />
          </FormField>
          <FormField label="Facebook Phone">
            <Input
              value={facebookData.facebookPhone || ''}
              onChange={(e) => handleFacebookChange('facebookPhone', e.target.value)}
              placeholder="Facebook Phone"
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default UMTDetails;
