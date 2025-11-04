import React from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const UMTDetails = ({ formData, setFormData, isDisabled }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <FormCard title="Facebook Ad Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Ad Account">
            <Input
              value={formData.adAccount || ""}
              onChange={(e) => handleChange("adAccount", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Account ID">
            <Input
              value={formData.adAccountId || ""}
              onChange={(e) => handleChange("adAccountId", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Campaign">
            <Input
              value={formData.adCampaign || ""}
              onChange={(e) => handleChange("adCampaign", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Campaign ID">
            <Input
              value={formData.adCampaignId || ""}
              onChange={(e) => handleChange("adCampaignId", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Facebook Page">
            <Input
              value={formData.facebookPage || ""}
              onChange={(e) => handleChange("facebookPage", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Facebook Page ID">
            <Input
              value={formData.facebookPageId || ""}
              onChange={(e) => handleChange("facebookPageId", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Cost Per Lead (CPL)">
            <Input
              value={formData.costPerLead || ""}
              onChange={(e) => handleChange("costPerLead", e.target.value)}
              placeholder="CA$"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Set">
            <Input
              value={formData.adSet || ""}
              onChange={(e) => handleChange("adSet", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Set ID">
            <Input
              value={formData.adSetId || ""}
              onChange={(e) => handleChange("adSetId", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Facebook Ad">
            <Input
              value={formData.facebookAd || ""}
              onChange={(e) => handleChange("facebookAd", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad ID">
            <Input
              value={formData.adId || ""}
              onChange={(e) => handleChange("adId", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Lead Form">
            <Input
              value={formData.leadForm || ""}
              onChange={(e) => handleChange("leadForm", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Lead Form ID">
            <Input
              value={formData.leadFormId || ""}
              onChange={(e) => handleChange("leadFormId", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Facebook Ad Information?">
            <Select
              value={formData.facebookAdInformation || ""}
              onValueChange={(value) => handleChange("facebookAdInformation", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available" disabled={isDisabled}>Available</SelectItem>
                <SelectItem value="Unavailable" disabled={isDisabled}>Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Social Media Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Twitter">
            <Input
              value={formData.twitter || ""}
              onChange={(e) => handleChange("twitter", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="LinkedIn ID">
            <Input
              value={formData.linkedinid || ""}
              onChange={(e) => handleChange("linkedinid", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Skype ID">
            <Input
              value={formData.skypeid || ""}
              onChange={(e) => handleChange("skypeid", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Facebook">
            <Input
              value={formData.facebook || ""}
              onChange={(e) => handleChange("facebook", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Instagram">
            <Input
              value={formData.instagram || ""}
              onChange={(e) => handleChange("instagram", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Score Summary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Insurance Leads Scoring Score">
            <Input
              type="number"
              value={formData.insuranceLeadsScoringScore || ""}
              onChange={(e) => handleChange("insuranceLeadsScoringScore", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Positive Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringPositiveScore || ""}
              onChange={(e) => handleChange("insuranceLeadScoringPositiveScore", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Negative Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringNegativeScore || ""}
              onChange={(e) => handleChange("insuranceLeadScoringNegativeScore", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Touch Point Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringTouchPointScore || ""}
              onChange={(e) => handleChange("insuranceLeadScoringTouchPointScore", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Positive Touch Point Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringPositiveTouchPointScore || ""}
              onChange={(e) => handleChange("insuranceLeadScoringPositiveTouchPointScore", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Insurance Leads Scoring Negative Touch Point Score">
            <Input
              type="number"
              value={formData.insuranceLeadScoringNegativeTouchPointScore || ""}
              onChange={(e) => handleChange("insuranceLeadScoringNegativeTouchPointScore", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Google AdWords Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="GCLID">
            <Input
              value={formData.gclid || ""}
              onChange={(e) => handleChange("gclid", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Keyword">
            <Input
              value={formData.keyword || ""}
              onChange={(e) => handleChange("keyword", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Click Type">
            <Input
              value={formData.clickType || ""}
              onChange={(e) => handleChange("clickType", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Device Type">
            <Input
              value={formData.deviceType || ""}
              onChange={(e) => handleChange("deviceType", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Network">
            <Input
              value={formData.adNetwork || ""}
              onChange={(e) => handleChange("adNetwork", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Search Partner Network">
            <Input
              value={formData.searchPartnerNetwork || ""}
              onChange={(e) => handleChange("searchPartnerNetwork", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Campaign Name">
            <Input
              value={formData.adCampaignName || ""}
              onChange={(e) => handleChange("adCampaignName", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="AdGroup Name">
            <Input
              value={formData.adGroupName || ""}
              onChange={(e) => handleChange("adGroupName", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad">
            <Input
              value={formData.ad || ""}
              onChange={(e) => handleChange("ad", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ad Click Date">
            <Input
              type="date"
              value={formData.adClickDate || ""}
              onChange={(e) => handleChange("adClickDate", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Cost per Click">
            <Input
              type="number"
              step="0.01"
              value={formData.costPerClick || ""}
              onChange={(e) => handleChange("costPerClick", e.target.value)}
              placeholder="CA$ 0.00"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Cost per Conversion">
            <Input
              type="number"
              step="0.01"
              value={formData.costPerConversion || ""}
              onChange={(e) => handleChange("costPerConversion", e.target.value)}
              placeholder="CA$ 0.00"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Conversion Exported On">
            <Input
              type="date"
              value={formData.conversionExportedOn || ""}
              onChange={(e) => handleChange("conversionExportedOn", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Conversion Export Status">
            <Input
              value={formData.conversionExportStatus || ""}
              onChange={(e) => handleChange("conversionExportStatus", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Reason for Conversion Failure">
            <Input
              value={formData.conversionFailureReason || ""}
              onChange={(e) => handleChange("conversionFailureReason", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="UTM Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Campaign ID Data">
            <Input
              value={formData.assignedCampaigns || ""}
              onChange={(e) => handleChange("assignedCampaigns", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Network Data">
            <Input
              value={formData.networkData || ""}
              onChange={(e) => handleChange("networkData", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Adgroup Data">
            <Input
              value={formData.adgroupData || ""}
              onChange={(e) => handleChange("adgroupData", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Device Data">
            <Input
              value={formData.deviceData || ""}
              onChange={(e) => handleChange("deviceData", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Match Type Data">
            <Input
              value={formData.matchTypeData || ""}
              onChange={(e) => handleChange("matchTypeData", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Keyword Data">
            <Input
              value={formData.keywordData || ""}
              onChange={(e) => handleChange("keywordData", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="GCLID Data">
            <Input
              value={formData.gclidData || ""}
              onChange={(e) => handleChange("gclidData", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="LP URL Data">
            <Input
              value={formData.submitPageUrl || ""}
              onChange={(e) => handleChange("submitPageUrl", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Visit Summary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Most Recent Visit">
            <Input
              type="date"
              value={formData.mostRecentVisit || ""}
              onChange={(e) => handleChange("mostRecentVisit", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Average Time Spent (Minutes)">
            <Input
              type="number"
              value={formData.averageTimeSpent || ""}
              onChange={(e) => handleChange("averageTimeSpent", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Referrer">
            <Input
              value={formData.referrer || ""}
              onChange={(e) => handleChange("referrer", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="First Visit">
            <Input
              type="date"
              value={formData.firstVisit || ""}
              onChange={(e) => handleChange("firstVisit", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="First Page Visited">
            <Input
              value={formData.firstPageVisited || ""}
              onChange={(e) => handleChange("firstPageVisited", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Number Of Chats">
            <Input
              type="number"
              value={formData.numberOfChats || ""}
              onChange={(e) => handleChange("numberOfChats", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Visitor Score">
            <Input
              type="number"
              value={formData.visitorScore || ""}
              onChange={(e) => handleChange("visitorScore", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Days Visited">
            <Input
              type="number"
              value={formData.daysVisited || ""}
              onChange={(e) => handleChange("daysVisited", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default UMTDetails;
