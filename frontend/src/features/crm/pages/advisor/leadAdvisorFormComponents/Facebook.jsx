import React, { useState, useEffect } from 'react';
import { FormCard, FormField } from '@/components/custom/CustomFormComponents';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { additionalContactInformationOption } from '../utils/picklist';

const Facebook = ({ Facebook, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({ ...Facebook });

  useEffect(() => {
    setFormData({ ...Facebook });
  }, [Facebook]);

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
      <FormCard title="Facebook Ad Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Ad Account">
            <Input
              value={formData.adAccount || ''}
              onChange={(e) => handleInputChange('adAccount', e.target.value)}
              placeholder="Ad Account"
            />
          </FormField>
          <FormField label="Ad Set">
            <Input
              value={formData.adSet || ''}
              onChange={(e) => handleInputChange('adSet', e.target.value)}
              placeholder="Ad Set"
            />
          </FormField>
          <FormField label="Ad Account ID">
            <Input
              value={formData.adAccountId || ''}
              onChange={(e) => handleInputChange('adAccountId', e.target.value)}
              placeholder="Ad Account ID"
            />
          </FormField>
          <FormField label="Ad Set ID">
            <Input
              value={formData.adSetId || ''}
              onChange={(e) => handleInputChange('adSetId', e.target.value)}
              placeholder="Ad Set ID"
            />
          </FormField>
          <FormField label="Ad Campaign">
            <Input
              value={formData.adCampaign || ''}
              onChange={(e) => handleInputChange('adCampaign', e.target.value)}
              placeholder="Ad Campaign"
            />
          </FormField>
          <FormField label="Facebook Ad">
            <Input
              value={formData.facebookAd || ''}
              onChange={(e) => handleInputChange('facebookAd', e.target.value)}
              placeholder="Facebook Ad"
            />
          </FormField>
          <FormField label="Ad Campaign ID">
            <Input
              value={formData.adCampaignId || ''}
              onChange={(e) => handleInputChange('adCampaignId', e.target.value)}
              placeholder="Ad Campaign ID"
            />
          </FormField>
          <FormField label="Ad ID">
            <Input
              value={formData.adId || ''}
              onChange={(e) => handleInputChange('adId', e.target.value)}
              placeholder="Ad ID"
            />
          </FormField>
          <FormField label="Facebook Page">
            <Input
              value={formData.facebookPage || ''}
              onChange={(e) => handleInputChange('facebookPage', e.target.value)}
              placeholder="Facebook Page"
            />
          </FormField>
          <FormField label="Lead Form">
            <Input
              value={formData.leadForm || ''}
              onChange={(e) => handleInputChange('leadForm', e.target.value)}
              placeholder="Lead Form"
            />
          </FormField>
          <FormField label="Facebook Page ID">
            <Input
              value={formData.facebookPageId || ''}
              onChange={(e) => handleInputChange('facebookPageId', e.target.value)}
              placeholder="Facebook Page ID"
            />
          </FormField>
          <FormField label="Lead Form ID">
            <Input
              value={formData.leadFormId || ''}
              onChange={(e) => handleInputChange('leadFormId', e.target.value)}
              placeholder="Lead Form ID"
            />
          </FormField>
          <FormField label="Cost Per Lead (CPL)">
            <Input
              value={formData.costPerLead || ''}
              onChange={(e) => handleInputChange('costPerLead', e.target.value)}
              placeholder="Cost Per Lead (CPL)"
            />
          </FormField>
          <FormField label="Facebook Ad Information ?">
            <Select
              value={formData.facebookAdInformation || ''}
              onValueChange={(value) => handleInputChange('facebookAdInformation', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {additionalContactInformationOption.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Social Media Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Twitter">
            <Input
              value={formData.twitter1 || ''}
              onChange={(e) => handleInputChange('twitter1', e.target.value)}
              placeholder="Twitter"
            />
          </FormField>
          <FormField label="LinkedIn ID">
            <Input
              value={formData.linkedIn1 || ''}
              onChange={(e) => handleInputChange('linkedIn1', e.target.value)}
              placeholder="LinkedIn ID"
            />
          </FormField>
          <FormField label="Skype ID">
            <Input
              value={formData.skypeId || ''}
              onChange={(e) => handleInputChange('skypeId', e.target.value)}
              placeholder="Skype ID"
            />
          </FormField>
          <FormField label="Facebook">
            <Input
              value={formData.faceBook || ''}
              onChange={(e) => handleInputChange('faceBook', e.target.value)}
              placeholder="Facebook"
            />
          </FormField>
          <FormField label="Instagram ID">
            <Input
              value={formData.instagramId || ''}
              onChange={(e) => handleInputChange('instagramId', e.target.value)}
              placeholder="Instagram ID"
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Score Summary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Insurance Leads Scoring Score">
            <Input
              type="number"
              value={formData.insuranceLeadsScoringScore || ''}
              onChange={(e) => handleInputChange('insuranceLeadsScoringScore', e.target.value)}
              placeholder="Insurance Leads Scoring Score"
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Positive Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringPositiveScore || ''}
              onChange={(e) => handleInputChange('insuranceLeadScoringPositiveScore', e.target.value)}
              placeholder="Insurance Leads Scoring Positive Score"
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Negative Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringNegativeScore || ''}
              onChange={(e) => handleInputChange('insuranceLeadScoringNegativeScore', e.target.value)}
              placeholder="Insurance Leads Scoring Negative Score"
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Touch Point Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringTouchPointScore || ''}
              onChange={(e) => handleInputChange('insuranceLeadScoringTouchPointScore', e.target.value)}
              placeholder="Insurance Leads Scoring Touch Point Score"
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Positive Touch Point Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringPositiveTouchPointScore || ''}
              onChange={(e) => handleInputChange('insuranceLeadScoringPositiveTouchPointScore', e.target.value)}
              placeholder="Insurance Leads Scoring Positive Touch Point Score"
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Negative Touch Point Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringNegativeTouchPointScore || ''}
              onChange={(e) => handleInputChange('insuranceLeadScoringNegativeTouchPointScore', e.target.value)}
              placeholder="Insurance Leads Scoring Negative Touch Point Score"
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Google AdWords Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="GCLID">
            <Input
              value={formData.gclid || ''}
              onChange={(e) => handleInputChange('gclid', e.target.value)}
              placeholder="GCLID"
            />
          </FormField>
          <FormField label="Keyword">
            <Input
              value={formData.keyword || ''}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
              placeholder="Keyword"
            />
          </FormField>
          <FormField label="Click Type">
            <Input
              value={formData.clickType || ''}
              onChange={(e) => handleInputChange('clickType', e.target.value)}
              placeholder="Click Type"
            />
          </FormField>
          <FormField label="Device Type">
            <Input
              value={formData.deviceType || ''}
              onChange={(e) => handleInputChange('deviceType', e.target.value)}
              placeholder="Device Type"
            />
          </FormField>
          <FormField label="Ad Network">
            <Input
              value={formData.adNetwork || ''}
              onChange={(e) => handleInputChange('adNetwork', e.target.value)}
              placeholder="Ad Network"
            />
          </FormField>
          <FormField label="Search Partner Network">
            <Input
              value={formData.searchPartnerNetwork || ''}
              onChange={(e) => handleInputChange('searchPartnerNetwork', e.target.value)}
              placeholder="Search Partner Network"
            />
          </FormField>
          <FormField label="Ad Campaign Name">
            <Input
              value={formData.adCampaignName || ''}
              onChange={(e) => handleInputChange('adCampaignName', e.target.value)}
              placeholder="Ad Campaign Name"
            />
          </FormField>
          <FormField label="AdGroup Name">
            <Input
              value={formData.adGroupName || ''}
              onChange={(e) => handleInputChange('adGroupName', e.target.value)}
              placeholder="AdGroup Name"
            />
          </FormField>
          <FormField label="Ad">
            <Input
              value={formData.ad || ''}
              onChange={(e) => handleInputChange('ad', e.target.value)}
              placeholder="Ad"
            />
          </FormField>
          <FormField label="Ad Click Date">
            <Input
              type="date"
              value={formData.adClickDate || ''}
              onChange={(e) => handleInputChange('adClickDate', e.target.value)}
            />
          </FormField>
          <FormField label="Cost per Click">
            <Input
              type="number"
              step="0.01"
              value={formData.costPerClick || ''}
              onChange={(e) => handleInputChange('costPerClick', e.target.value)}
              placeholder="CA$ 0.00"
            />
          </FormField>
          <FormField label="Cost per Conversion">
            <Input
              type="number"
              step="0.01"
              value={formData.costPerConversion || ''}
              onChange={(e) => handleInputChange('costPerConversion', e.target.value)}
              placeholder="CA$ 0.00"
            />
          </FormField>
          <FormField label="Conversion Exported On">
            <Input
              type="date"
              value={formData.conversionExportedOn || ''}
              onChange={(e) => handleInputChange('conversionExportedOn', e.target.value)}
            />
          </FormField>
          <FormField label="Conversion Export Status">
            <Input
              value={formData.conversionExportStatus || ''}
              onChange={(e) => handleInputChange('conversionExportStatus', e.target.value)}
              placeholder="Conversion Export Status"
            />
          </FormField>
          <FormField label="Reason for Conversion Failure">
            <Input
              value={formData.conversionFailureReason || ''}
              onChange={(e) => handleInputChange('conversionFailureReason', e.target.value)}
              placeholder="Reason for Conversion Failure"
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Visit Summary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Most Recent Visit">
            <Input
              type="date"
              value={formData.mostRecentVisit || ''}
              onChange={(e) => handleInputChange('mostRecentVisit', e.target.value)}
            />
          </FormField>
          <FormField label="Average Time Spent (Minutes)">
            <Input
              type="number"
              value={formData.averageTimeSpent || ''}
              onChange={(e) => handleInputChange('averageTimeSpent', e.target.value)}
              placeholder="Average Time Spent (Minutes)"
            />
          </FormField>
          <FormField label="Referrer">
            <Input
              value={formData.referrer || ''}
              onChange={(e) => handleInputChange('referrer', e.target.value)}
              placeholder="Referrer"
            />
          </FormField>
          <FormField label="First Visit">
            <Input
              type="date"
              value={formData.firstVisit || ''}
              onChange={(e) => handleInputChange('firstVisit', e.target.value)}
            />
          </FormField>
          <FormField label="First Page Visited">
            <Input
              value={formData.firstPageVisited || ''}
              onChange={(e) => handleInputChange('firstPageVisited', e.target.value)}
              placeholder="First Page Visited"
            />
          </FormField>
          <FormField label="Number Of Chats">
            <Input
              type="number"
              value={formData.numberOfChats || ''}
              onChange={(e) => handleInputChange('numberOfChats', e.target.value)}
              placeholder="Number Of Chats"
            />
          </FormField>
          <FormField label="Visitor Score">
            <Input
              type="number"
              value={formData.visitorScore || ''}
              onChange={(e) => handleInputChange('visitorScore', e.target.value)}
              placeholder="Visitor Score"
            />
          </FormField>
          <FormField label="Days Visited">
            <Input
              type="number"
              value={formData.daysVisited || ''}
              onChange={(e) => handleInputChange('daysVisited', e.target.value)}
              placeholder="Days Visited"
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="UTM Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Campaign ID Data">
            <Input
              value={formData.assignedCampaigns || ''}
              onChange={(e) => handleInputChange('assignedCampaigns', e.target.value)}
              placeholder="Campaign ID Data"
            />
          </FormField>
          <FormField label="Network Data">
            <Input
              value={formData.networkData || ''}
              onChange={(e) => handleInputChange('networkData', e.target.value)}
              placeholder="Network Data"
            />
          </FormField>
          <FormField label="Adgroup Data">
            <Input
              value={formData.adgroupData || ''}
              onChange={(e) => handleInputChange('adgroupData', e.target.value)}
              placeholder="Adgroup Data"
            />
          </FormField>
          <FormField label="Device Data">
            <Input
              value={formData.deviceData || ''}
              onChange={(e) => handleInputChange('deviceData', e.target.value)}
              placeholder="Device Data"
            />
          </FormField>
          <FormField label="Match Type Data">
            <Input
              value={formData.matchTypeData || ''}
              onChange={(e) => handleInputChange('matchTypeData', e.target.value)}
              placeholder="Match Type Data"
            />
          </FormField>
          <FormField label="Keyword Data">
            <Input
              value={formData.keywordData || ''}
              onChange={(e) => handleInputChange('keywordData', e.target.value)}
              placeholder="Keyword Data"
            />
          </FormField>
          <FormField label="GCLID Data">
            <Input
              value={formData.gclidData || ''}
              onChange={(e) => handleInputChange('gclidData', e.target.value)}
              placeholder="GCLID Data"
            />
          </FormField>
          <FormField label="LP URL Data">
            <Input
              value={formData.submitPageUrl || ''}
              onChange={(e) => handleInputChange('submitPageUrl', e.target.value)}
              placeholder="LP URL Data"
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default Facebook;
