import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const FacebookForm = React.memo(({
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
        // Facebook Ad Information
        adAccount: '',
        adAccountId: '',
        adCampaign: '',
        adCampaignId: '',
        facebookPage: '',
        facebookPageId: '',
        costPerLead: '',
        adSet: '',
        adSetId: '',
        facebookAd: '',
        adId: '',
        leadForm: '',
        leadFormId: '',
        facebookAdInformation: '',

        // Social Media Information
        twitter: '',
        linkedinid: '',
        skypeid: '',
        facebook: '',
        instagram: '',

        // Score Summary
        insuranceLeadsScoringScore: '',
        insuranceLeadScoringPositiveScore: '',
        insuranceLeadScoringNegativeScore: '',
        insuranceLeadScoringTouchPointScore: '',
        insuranceLeadScoringPositiveTouchPointScore: '',
        insuranceLeadScoringNegativeTouchPointScore: '',

        // Google AdWords Information
        gclid: '',
        keyword: '',
        clickType: '',
        deviceType: '',
        adNetwork: '',
        searchPartnerNetwork: '',
        adCampaignName: '',
        adGroupName: '',
        ad: '',
        adClickDate: '',
        costPerClick: '',
        costPerConversion: '',
        conversionExportedOn: '',
        conversionExportStatus: '',
        conversionFailureReason: '',

        // UTM Details
        assignedCampaigns: '',
        networkData: '',
        adgroupData: '',
        deviceData: '',
        matchTypeData: '',
        keywordData: '',
        gclidData: '',
        submitPageUrl: '',

        // Visit Summary
        mostRecentVisit: '',
        averageTimeSpent: '',
        referrer: '',
        firstVisit: '',
        firstPageVisited: '',
        numberOfChats: '',
        visitorScore: '',
        daysVisited: ''
      });
    }
  }, [formData, setFormData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, [setFormData]);

 
  return (
    <div className="space-y-6">
      {/* Facebook Ad Information */}
      <div>
        <h5 className="text-lg font-semibold mb-4 px-2">FaceBook Ad Information</h5>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Ad Account */}
              <div>
                <Label htmlFor="adAccount">Ad Account</Label>
                <Input
                  id="adAccount"
                  value={formData?.adAccount || ''}
                  onChange={(e) => handleInputChange('adAccount', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Account ID */}
              <div>
                <Label htmlFor="adAccountId">Ad Account ID</Label>
                <Input
                  id="adAccountId"
                  value={formData?.adAccountId || ''}
                  onChange={(e) => handleInputChange('adAccountId', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Campaign */}
              <div>
                <Label htmlFor="adCampaign">Ad Campaign</Label>
                <Input
                  id="adCampaign"
                  value={formData?.adCampaign || ''}
                  onChange={(e) => handleInputChange('adCampaign', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Campaign ID */}
              <div>
                <Label htmlFor="adCampaignId">Ad Campaign ID</Label>
                <Input
                  id="adCampaignId"
                  value={formData?.adCampaignId || ''}
                  onChange={(e) => handleInputChange('adCampaignId', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Facebook Page */}
              <div>
                <Label htmlFor="facebookPage">Facebook Page</Label>
                <Input
                  id="facebookPage"
                  value={formData?.facebookPage || ''}
                  onChange={(e) => handleInputChange('facebookPage', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Facebook Page ID */}
              <div>
                <Label htmlFor="facebookPageId">Facebook Page ID</Label>
                <Input
                  id="facebookPageId"
                  value={formData?.facebookPageId || ''}
                  onChange={(e) => handleInputChange('facebookPageId', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Cost Per Lead (CPL) */}
              <div>
                <Label htmlFor="costPerLead">Cost Per Lead (CPL)</Label>
                <Input
                  id="costPerLead"
                  value={formData?.costPerLead || ''}
                  onChange={(e) => handleInputChange('costPerLead', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Set */}
              <div>
                <Label htmlFor="adSet">Ad Set</Label>
                <Input
                  id="adSet"
                  value={formData?.adSet || ''}
                  onChange={(e) => handleInputChange('adSet', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Set ID */}
              <div>
                <Label htmlFor="adSetId">Ad Set ID</Label>
                <Input
                  id="adSetId"
                  value={formData?.adSetId || ''}
                  onChange={(e) => handleInputChange('adSetId', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Facebook Ad */}
              <div>
                <Label htmlFor="facebookAd">Facebook Ad</Label>
                <Input
                  id="facebookAd"
                  value={formData?.facebookAd || ''}
                  onChange={(e) => handleInputChange('facebookAd', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad ID */}
              <div>
                <Label htmlFor="adId">Ad ID</Label>
                <Input
                  id="adId"
                  value={formData?.adId || ''}
                  onChange={(e) => handleInputChange('adId', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Lead Form */}
              <div>
                <Label htmlFor="leadForm">Lead Form</Label>
                <Input
                  id="leadForm"
                  value={formData?.leadForm || ''}
                  onChange={(e) => handleInputChange('leadForm', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Lead Form ID */}
              <div>
                <Label htmlFor="leadFormId">Lead Form ID</Label>
                <Input
                  id="leadFormId"
                  value={formData?.leadFormId || ''}
                  onChange={(e) => handleInputChange('leadFormId', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Facebook Ad Information */}
              <div>
                <Label htmlFor="facebookAdInformation">Facebook Ad Information ?</Label>
                <Select
                  value={formData?.facebookAdInformation || ''}
                  onValueChange={(value) => handleInputChange('facebookAdInformation', value)}
                  disabled={isDisabled}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Information */}
      <div>
        <h5 className="text-lg font-semibold mb-4 px-2">Social Media Information</h5>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Twitter */}
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={formData?.twitter || ''}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Linkedin ID */}
              <div>
                <Label htmlFor="linkedinid">Linkedin ID</Label>
                <Input
                  id="linkedinid"
                  value={formData?.linkedinid || ''}
                  onChange={(e) => handleInputChange('linkedinid', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Skype ID */}
              <div>
                <Label htmlFor="skypeid">Skype ID</Label>
                <Input
                  id="skypeid"
                  value={formData?.skypeid || ''}
                  onChange={(e) => handleInputChange('skypeid', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Facebook */}
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={formData?.facebook || ''}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Instagram */}
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData?.instagram || ''}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Summary */}
      <div>
        <h5 className="text-lg font-semibold mb-4 px-2">Score Summary</h5>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Insurance Leads Scoring Score */}
              <div>
                <Label htmlFor="insuranceLeadsScoringScore">Insurance Leads Scoring Score</Label>
                <Input
                  id="insuranceLeadsScoringScore"
                  type="number"
                  value={formData?.insuranceLeadsScoringScore || ''}
                  onChange={(e) => handleInputChange('insuranceLeadsScoringScore', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Insurance Leads Scoring Positive Score */}
              <div>
                <Label htmlFor="insuranceLeadScoringPositiveScore">Insurance Leads Scoring Positive Score</Label>
                <Input
                  id="insuranceLeadScoringPositiveScore"
                  type="number"
                  value={formData?.insuranceLeadScoringPositiveScore || ''}
                  onChange={(e) => handleInputChange('insuranceLeadScoringPositiveScore', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Insurance Leads Scoring Negative Score */}
              <div>
                <Label htmlFor="insuranceLeadScoringNegativeScore">Insurance Leads Scoring Negative Score</Label>
                <Input
                  id="insuranceLeadScoringNegativeScore"
                  type="number"
                  value={formData?.insuranceLeadScoringNegativeScore || ''}
                  onChange={(e) => handleInputChange('insuranceLeadScoringNegativeScore', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Insurance Leads Scoring Touch Point Score */}
              <div>
                <Label htmlFor="insuranceLeadScoringTouchPointScore">Insurance Leads Scoring Touch Point Score</Label>
                <Input
                  id="insuranceLeadScoringTouchPointScore"
                  type="number"
                  value={formData?.insuranceLeadScoringTouchPointScore || ''}
                  onChange={(e) => handleInputChange('insuranceLeadScoringTouchPointScore', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Insurance Leads Scoring Positive Touch Point Score */}
              <div>
                <Label htmlFor="insuranceLeadScoringPositiveTouchPointScore">Insurance Leads Scoring Positive Touch Point Score</Label>
                <Input
                  id="insuranceLeadScoringPositiveTouchPointScore"
                  type="number"
                  value={formData?.insuranceLeadScoringPositiveTouchPointScore || ''}
                  onChange={(e) => handleInputChange('insuranceLeadScoringPositiveTouchPointScore', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Insurance Leads Scoring Negative Touch Point Score */}
              <div>
                <Label htmlFor="insuranceLeadScoringNegativeTouchPointScore">Insurance Leads Scoring Negative Touch Point Score</Label>
                <Input
                  id="insuranceLeadScoringNegativeTouchPointScore"
                  type="number"
                  value={formData?.insuranceLeadScoringNegativeTouchPointScore || ''}
                  onChange={(e) => handleInputChange('insuranceLeadScoringNegativeTouchPointScore', e.target.value)}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google AdWords Information */}
      <div>
        <h5 className="text-lg font-semibold mb-4 px-2">Google AdWords Information</h5>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* GCLID */}
              <div>
                <Label htmlFor="gclid">GCLID</Label>
                <Input
                  id="gclid"
                  value={formData?.gclid || ''}
                  onChange={(e) => handleInputChange('gclid', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Keyword */}
              <div>
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  value={formData?.keyword || ''}
                  onChange={(e) => handleInputChange('keyword', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Click Type */}
              <div>
                <Label htmlFor="clickType">Click Type</Label>
                <Input
                  id="clickType"
                  value={formData?.clickType || ''}
                  onChange={(e) => handleInputChange('clickType', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Device Type */}
              <div>
                <Label htmlFor="deviceType">Device Type</Label>
                <Input
                  id="deviceType"
                  value={formData?.deviceType || ''}
                  onChange={(e) => handleInputChange('deviceType', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Network */}
              <div>
                <Label htmlFor="adNetwork">Ad Network</Label>
                <Input
                  id="adNetwork"
                  value={formData?.adNetwork || ''}
                  onChange={(e) => handleInputChange('adNetwork', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Search Partner Network */}
              <div>
                <Label htmlFor="searchPartnerNetwork">Search Partner Network</Label>
                <Input
                  id="searchPartnerNetwork"
                  value={formData?.searchPartnerNetwork || ''}
                  onChange={(e) => handleInputChange('searchPartnerNetwork', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Campaign Name */}
              <div>
                <Label htmlFor="adCampaignName">Ad Campaign Name</Label>
                <Input
                  id="adCampaignName"
                  value={formData?.adCampaignName || ''}
                  onChange={(e) => handleInputChange('adCampaignName', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* AdGroup Name */}
              <div>
                <Label htmlFor="adGroupName">AdGroup Name</Label>
                <Input
                  id="adGroupName"
                  value={formData?.adGroupName || ''}
                  onChange={(e) => handleInputChange('adGroupName', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad */}
              <div>
                <Label htmlFor="ad">Ad</Label>
                <Input
                  id="ad"
                  value={formData?.ad || ''}
                  onChange={(e) => handleInputChange('ad', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Ad Click Date */}
              <div>
                <Label htmlFor="adClickDate">Ad Click Date</Label>
                <Input
                  id="adClickDate"
                  type="date"
                  value={formData?.adClickDate || ''}
                  onChange={(e) => handleInputChange('adClickDate', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Cost per Click */}
              <div>
                <Label htmlFor="costPerClick">Cost per Click</Label>
                <Input
                  id="costPerClick"
                  type="number"
                  step="0.01"
                  placeholder="CA$ 0.00"
                  value={formData?.costPerClick || ''}
                  onChange={(e) => handleInputChange('costPerClick', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Cost per Conversion */}
              <div>
                <Label htmlFor="costPerConversion">Cost per Conversion</Label>
                <Input
                  id="costPerConversion"
                  type="number"
                  step="0.01"
                  placeholder="CA$ 0.00"
                  value={formData?.costPerConversion || ''}
                  onChange={(e) => handleInputChange('costPerConversion', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Conversion Exported On */}
              <div>
                <Label htmlFor="conversionExportedOn">Conversion Exported On</Label>
                <Input
                  id="conversionExportedOn"
                  type="date"
                  value={formData?.conversionExportedOn || ''}
                  onChange={(e) => handleInputChange('conversionExportedOn', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Conversion Export Status */}
              <div>
                <Label htmlFor="conversionExportStatus">Conversion Export Status</Label>
                <Input
                  id="conversionExportStatus"
                  value={formData?.conversionExportStatus || ''}
                  onChange={(e) => handleInputChange('conversionExportStatus', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Reason for Conversion Failure */}
              <div>
                <Label htmlFor="conversionFailureReason">Reason for Conversion Failure</Label>
                <Input
                  id="conversionFailureReason"
                  value={formData?.conversionFailureReason || ''}
                  onChange={(e) => handleInputChange('conversionFailureReason', e.target.value)}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* UTM Details */}
      <div>
        <h5 className="text-lg font-semibold mb-4 px-2">UTM Details</h5>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Campaign ID Data */}
              <div>
                <Label htmlFor="assignedCampaigns">Campaign ID Data</Label>
                <Input
                  id="assignedCampaigns"
                  value={formData?.assignedCampaigns || ''}
                  onChange={(e) => handleInputChange('assignedCampaigns', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Network Data */}
              <div>
                <Label htmlFor="networkData">Network Data</Label>
                <Input
                  id="networkData"
                  value={formData?.networkData || ''}
                  onChange={(e) => handleInputChange('networkData', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Adgroup Data */}
              <div>
                <Label htmlFor="adgroupData">Adgroup Data</Label>
                <Input
                  id="adgroupData"
                  value={formData?.adgroupData || ''}
                  onChange={(e) => handleInputChange('adgroupData', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Device Data */}
              <div>
                <Label htmlFor="deviceData">Device Data</Label>
                <Input
                  id="deviceData"
                  value={formData?.deviceData || ''}
                  onChange={(e) => handleInputChange('deviceData', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Match Type Data */}
              <div>
                <Label htmlFor="matchTypeData">Match Type Data</Label>
                <Input
                  id="matchTypeData"
                  value={formData?.matchTypeData || ''}
                  onChange={(e) => handleInputChange('matchTypeData', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Keyword Data */}
              <div>
                <Label htmlFor="keywordData">Keyword Data</Label>
                <Input
                  id="keywordData"
                  value={formData?.keywordData || ''}
                  onChange={(e) => handleInputChange('keywordData', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* GCLID Data */}
              <div>
                <Label htmlFor="gclidData">GCLID Data</Label>
                <Input
                  id="gclidData"
                  value={formData?.gclidData || ''}
                  onChange={(e) => handleInputChange('gclidData', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* LP URL Data */}
              <div>
                <Label htmlFor="submitPageUrl">LP URL Data</Label>
                <Input
                  id="submitPageUrl"
                  value={formData?.submitPageUrl || ''}
                  onChange={(e) => handleInputChange('submitPageUrl', e.target.value)}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visit Summary */}
      <div>
        <h5 className="text-lg font-semibold mb-4 px-2">Visit Summary</h5>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Most Recent Visit */}
              <div>
                <Label htmlFor="mostRecentVisit">Most Recent Visit</Label>
                <Input
                  id="mostRecentVisit"
                  type="date"
                  value={formData?.mostRecentVisit || ''}
                  onChange={(e) => handleInputChange('mostRecentVisit', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Average Time Spent (Minutes) */}
              <div>
                <Label htmlFor="averageTimeSpent">Average Time Spent (Minutes)</Label>
                <Input
                  id="averageTimeSpent"
                  type="number"
                  value={formData?.averageTimeSpent || ''}
                  onChange={(e) => handleInputChange('averageTimeSpent', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Referrer */}
              <div>
                <Label htmlFor="referrer">Referrer</Label>
                <Input
                  id="referrer"
                  value={formData?.referrer || ''}
                  onChange={(e) => handleInputChange('referrer', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* First Visit */}
              <div>
                <Label htmlFor="firstVisit">First Visit</Label>
                <Input
                  id="firstVisit"
                  type="date"
                  value={formData?.firstVisit || ''}
                  onChange={(e) => handleInputChange('firstVisit', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* First Page Visited */}
              <div>
                <Label htmlFor="firstPageVisited">First Page Visited</Label>
                <Input
                  id="firstPageVisited"
                  value={formData?.firstPageVisited || ''}
                  onChange={(e) => handleInputChange('firstPageVisited', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Number Of Chats */}
              <div>
                <Label htmlFor="numberOfChats">Number Of Chats</Label>
                <Input
                  id="numberOfChats"
                  type="number"
                  value={formData?.numberOfChats || ''}
                  onChange={(e) => handleInputChange('numberOfChats', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Visitor Score */}
              <div>
                <Label htmlFor="visitorScore">Visitor Score</Label>
                <Input
                  id="visitorScore"
                  type="number"
                  value={formData?.visitorScore || ''}
                  onChange={(e) => handleInputChange('visitorScore', e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Days Visited */}
              <div>
                <Label htmlFor="daysVisited">Days Visited</Label>
                <Input
                  id="daysVisited"
                  type="number"
                  value={formData?.daysVisited || ''}
                  onChange={(e) => handleInputChange('daysVisited', e.target.value)}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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

FacebookForm.displayName = 'FacebookForm';

export default FacebookForm;
