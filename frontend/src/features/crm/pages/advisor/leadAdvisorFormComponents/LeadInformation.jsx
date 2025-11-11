import React, { useState, useEffect } from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import validateMandatoryFields from "../utils/validate";
import {
  insuranceLeadSourceOptions,
  leadStatusOption,
  genderOption,
  objectType,
  additionalContactInformationOption,
  understandingOfInsuranceOption,
  citizenshipStatusOption,
  preferredContactTimeOption,
  preferredContactMethodOption,
  referredByOptions,
  currency,
} from "../utils/picklist";
import { getStatusColor } from "../utils/statusColorMap";
import SelectColorCode from "@/components/SelectColorCode";

const LeadInformation = ({
  onNext,
  LeadInformation: leadInfo,
  owners,
  adviosers,
  location,
  isDisabled = false,
}) => {
  const [formData, setFormData] = useState({ ...leadInfo });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({ ...leadInfo });
  }, [leadInfo]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const validationErrors = validateMandatoryFields(formData, [
      { id: "insuranceLeadOwner", fieldName: "Insurance Lead Owner" },
      { id: "lastName", fieldName: "Last Name" },
    ]);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onNext(formData);
    }
  };

  return (
    <div>
      <FormCard title="Personal Details">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Insurance Lead Owner *">
            <Select
              value={formData.insuranceLeadOwner || ""}
              onValueChange={(value) =>
                handleInputChange("insuranceLeadOwner", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Owner" />
              </SelectTrigger>
              <SelectContent>
                {owners?.map((user) => (
                  <SelectItem key={user.ROWID} value={user.ROWID}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.insuranceLeadOwner && (
              <span className="text-red-500 text-sm">
                {errors.insuranceLeadOwner}
              </span>
            )}
          </FormField>
          <FormField label="Insurance Lead Source">
            <Select
              value={formData.insuranceLeadSource || ""}
              onValueChange={(value) =>
                handleInputChange("insuranceLeadSource", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                {insuranceLeadSourceOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="First Name">
            <Input
              value={formData.firstName || ""}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="First Name"
              disabled={isDisabled}
            />
          </FormField>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 ">
          <FormField label="Last Name *">
            <Input
              value={formData.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Last Name"
              disabled={isDisabled}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </FormField>
          <FormField label="Mobile">
            <Input
              type="text"
              value={formData.mobile || ""}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              placeholder="Mobile"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Are You LLQP Licensed">
            <Input
              value={formData.areYouLLQPLicensed || ""}
              onChange={(e) =>
                handleInputChange("areYouLLQPLicensed", e.target.value)
              }
              placeholder="LLQP License"
              disabled={isDisabled}
            />
          </FormField>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 ">
          <FormField label="Email">
            <Input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Lead Status Stage">
            <SelectColorCode
              value={formData.leadStatusStage || ""}
              onValueChange={(value) =>
                handleInputChange("leadStatusStage", value)
              }
              options={leadStatusOption.map((name) => ({
                ROWID: name,
                name,
                color: getStatusColor(name) || "#bdbdbd",
              }))}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Date of Birth">
            <Input
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Assigned Advisor">
            <Select
              value={formData.assignedAdvisor || ""}
              onValueChange={(value) =>
                handleInputChange("assignedAdvisor", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Advisor" />
              </SelectTrigger>
              <SelectContent>
                {adviosers?.map((advisor) => (
                  <SelectItem key={advisor.ROWID} value={advisor.ROWID}>
                    {advisor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Gender">
            <Select
              value={formData.gender || ""}
              onValueChange={(value) => handleInputChange("gender", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Is This a Reassignment">
            <Select
              value={formData.isThisaReassignment || ""}
              onValueChange={(value) =>
                handleInputChange("isThisaReassignment", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Owner" />
              </SelectTrigger>
              <SelectContent>
                {adviosers?.map((advisor) => (
                  <SelectItem key={advisor.ROWID} value={advisor.ROWID}>
                    {advisor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Location Name">
            <Select
              value={formData.locationName || ""}
              onValueChange={(value) =>
                handleInputChange("locationName", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Owner" />
              </SelectTrigger>
              <SelectContent>
                {location?.map((loc) => (
                  <SelectItem key={loc.ROWID} value={loc.ROWID}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="If referred by Advisor or External Referral - Name">
            <Select
              value={formData.ifReferredByAdvisorOrExternalReferral || ""}
              onValueChange={(value) =>
                handleInputChange(
                  "ifReferredByAdvisorOrExternalReferral",
                  value
                )
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectType.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Net Worth">
            <Select
              value={formData.netWorth || ""}
              onValueChange={(value) => handleInputChange("netWorth", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Net Worth" />
              </SelectTrigger>
              <SelectContent>
                {understandingOfInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Row 6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Exchange Rate">
            <Input
              value={formData.exchangeRate || ""}
              onChange={(e) =>
                handleInputChange("exchangeRate", e.target.value)
              }
              placeholder="Exchange Rate"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Preferred Contact Method">
            <Select
              value={formData.preferredContactMethod || ""}
              onValueChange={(value) =>
                handleInputChange("preferredContactMethod", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                {preferredContactMethodOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Currency">
            <Select
              value={formData.currency || ""}
              onValueChange={(value) => handleInputChange("currency", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {currency.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Row 7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Preferred Contact Time">
            <Select
              value={formData.preferredContactTime || ""}
              onValueChange={(value) =>
                handleInputChange("preferredContactTime", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                {preferredContactTimeOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Social Media Information?">
            <Select
              value={formData.socialMediaInformation || ""}
              onValueChange={(value) =>
                handleInputChange("socialMediaInformation", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {additionalContactInformationOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Round Robin Assignment Time">
            <Input
              type="datetime-local"
              value={formData.roundRobinAssignmentTime || ""}
              onChange={(e) =>
                handleInputChange("roundRobinAssignmentTime", e.target.value)
              }
              disabled={isDisabled}
            />
          </FormField>
        </div>

        {/* Row 8 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Citizenship Status">
            <Select
              value={formData.citizenshipStatus || ""}
              onValueChange={(value) =>
                handleInputChange("citizenshipStatus", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {citizenshipStatusOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Understanding of Insurance">
            <Select
              value={formData.understandingOfInsurance || ""}
              onValueChange={(value) =>
                handleInputChange("understandingOfInsurance", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Understanding" />
              </SelectTrigger>
              <SelectContent>
                {understandingOfInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Existing Insurance Policy?">
            <Select
              value={formData.existingInsurancePolicy || ""}
              onValueChange={(value) =>
                handleInputChange("existingInsurancePolicy", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectType.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Row 9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Lead Created On">
            <Input
              type="date"
              value={formData.leadCreatedOn || ""}
              onChange={(e) =>
                handleInputChange("leadCreatedOn", e.target.value)
              }
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Existing Policy Renewal Due By">
            <Input
              type="date"
              value={formData.existingPolicyRenewalDueBy || ""}
              onChange={(e) =>
                handleInputChange("existingPolicyRenewalDueBy", e.target.value)
              }
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Old Database Lead?">
            <Select
              value={formData.oldDatabaseLead || ""}
              onValueChange={(value) =>
                handleInputChange("oldDatabaseLead", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectType.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Row 10 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Do you own a home in Canada?">
            <Select
              value={formData.doYouOwnaHomeInCanada || ""}
              onValueChange={(value) =>
                handleInputChange("doYouOwnaHomeInCanada", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectType.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Gender Prediction Score">
            <Input
              value={formData.genderPredictionScore || ""}
              onChange={(e) =>
                handleInputChange("genderPredictionScore", e.target.value)
              }
              placeholder="Score"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Do you have life insurance?">
            <Select
              value={formData.doYouhaveLifeInsurance || ""}
              onValueChange={(value) =>
                handleInputChange("doYouhaveLifeInsurance", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectType.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Row 11 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Coverage you are Looking for?">
            <Input
              value={formData.coverageYouAreLookingFor || ""}
              onChange={(e) =>
                handleInputChange("coverageYouAreLookingFor", e.target.value)
              }
              placeholder="Coverage"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Next Follow Up Date & Time">
            <Input
              type="datetime-local"
              value={formData.nextFollowUpDateTime || ""}
              onChange={(e) =>
                handleInputChange("nextFollowUpDateTime", e.target.value)
              }
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Ready to purchase this life insurance policy?">
            <Checkbox
              checked={formData.readyForPurchase || false}
              onCheckedChange={(checked) =>
                handleInputChange("readyForPurchase", checked)
              }
              disabled={isDisabled}
            />
          </FormField>
        </div>

        {/* Row 12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Additional Contact Information?">
            <Select
              value={formData.additionalContactInformation || ""}
              onValueChange={(value) =>
                handleInputChange("additionalContactInformation", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {additionalContactInformationOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Submit Page URL">
            <Input
              value={formData.submitPageURL || ""}
              onChange={(e) =>
                handleInputChange("submitPageURL", e.target.value)
              }
              placeholder="URL"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Assigned Campaigns">
            <Input
              value={formData.assignedCampaigns || ""}
              onChange={(e) =>
                handleInputChange("assignedCampaigns", e.target.value)
              }
              placeholder="Campaigns"
              disabled={isDisabled}
            />
          </FormField>
        </div>

        {/* Row 13 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Gender Prediction">
            <Select
              value={formData.genderPrediction || ""}
              onValueChange={(value) =>
                handleInputChange("genderPrediction", value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Inbox URL">
            <Input
              value={formData.inboxURL || ""}
              onChange={(e) => handleInputChange("inboxURL", e.target.value)}
              placeholder="URL"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Phone">
            <Input
              type="number"
              value={formData.phoneNumber || ""}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="Phone"
              disabled={isDisabled}
            />
          </FormField>
        </div>

        {/* Row 14 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <FormField label="Secondary Email">
            <Input
              type="email"
              value={formData.secondaryEmail || ""}
              onChange={(e) =>
                handleInputChange("secondaryEmail", e.target.value)
              }
              placeholder="Email"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Fax">
            <Input
              type="number"
              value={formData.fax || ""}
              onChange={(e) => handleInputChange("fax", e.target.value)}
              placeholder="Fax"
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Referred by">
            <Select
              value={formData.referredBy || ""}
              onValueChange={(value) => handleInputChange("referredBy", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {referredByOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Row 15 - Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
          <div className="flex gap-5 items-center">
            <Checkbox
              checked={formData.roundRobinProcessed || false}
              onCheckedChange={(checked) =>
                handleInputChange("roundRobinProcessed", checked)
              }
              disabled={isDisabled}
            />
            <FormField label="Round Robin Processed"></FormField>
          </div>
          <div className="flex gap-5 items-center">
              <Checkbox
                checked={formData.emailRoundRobinOwner || false}
                onCheckedChange={(checked) =>
                  handleInputChange("emailRoundRobinOwner", checked)
                }
                disabled={isDisabled}
              />
            <FormField label="Email Round Robin Owner">
            </FormField>
          </div>
          <div className="flex gap-5 items-center">
              <Checkbox
                checked={formData.eligibleRoundRobinOwnerFound || false}
                onCheckedChange={(checked) =>
                  handleInputChange("eligibleRoundRobinOwnerFound", checked)
                }
                disabled={isDisabled}
              />
            <FormField label="Eligible Round Robin Owner Found">
            </FormField>
          </div>
        </div>

        {/* Row 16 - Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
          <div className="flex gap-5 items-center">
            <Checkbox
              checked={formData.reRunRoundRobin || false}
              onCheckedChange={(checked) =>
                handleInputChange("reRunRoundRobin", checked)
              }
              disabled={isDisabled}
            />
            <FormField label="Re-Run Round Robin"></FormField>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox
              checked={formData.rcSmsOptOut || false}
              onCheckedChange={(checked) =>
                handleInputChange("rcSmsOptOut", checked)
              }
              disabled={isDisabled}
            />
            <FormField label="RC SMS Opt Out"></FormField>
          </div>
        </div>

        {/* Full width row for Description */}
        <div className="grid grid-cols-1 gap-4 my-3">
          <FormField label="Description">
            <Textarea
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Description"
              rows={4}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      {/* <div
        className="button-row d-flex justify-content-center mt-4 gap-4"
        style={{ marginBottom: "200px" }}
      >
        <button
          className="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
          onClick={handleNext}
          type="button"
          disabled={isDisabled}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default LeadInformation;
