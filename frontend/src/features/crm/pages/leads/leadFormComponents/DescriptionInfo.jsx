import React from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { objectives } from "../utils/picklist.js";

const DescriptionInfo = ({ formData, setFormData, isDisabled }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const frame = ["Immediately", "Within 1 month", "Within 3 months", "Within 6 months", "Within 1 year", "More than 1 year"];
  const adviosersType = ["Yes", "No"];

  return (
    <div>
      <FormCard title="Description Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Type of Insurance Looking">
            <Input
              value={formData.typeOfInsuranceLooking || ""}
              onChange={(e) => handleChange("typeOfInsuranceLooking", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Age of 1st Traveler">
            <Input
              type="number"
              value={formData.ageOf1stTraveler || ""}
              onChange={(e) => handleChange("ageOf1stTraveler", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Traveler Start Date">
            <Input
              value={formData.travelerStartDate || ""}
              onChange={(e) => handleChange("travelerStartDate", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Coverage you are Looking for?">
            <Input
              value={formData.coverageYouAreLookingFor || ""}
              onChange={(e) => handleChange("coverageYouAreLookingFor", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How Much Coverage is Required?">
            <Input
              value={formData.howMuchCoverageIsRequired || ""}
              onChange={(e) => handleChange("howMuchCoverageIsRequired", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Tobacco used">
            <Input
              value={formData.tobaccoused || ""}
              onChange={(e) => handleChange("tobaccoused", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Select The Duration of the Coverage">
            <Input
              value={formData.selectTheDurationOfTheCoverage || ""}
              onChange={(e) => handleChange("selectTheDurationOfTheCoverage", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Enter the amount of Mortgage Coverage Required">
            <Input
              value={formData.enterTheAmountOfMortgageCoverageRequired || ""}
              onChange={(e) => handleChange("enterTheAmountOfMortgageCoverageRequired", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Do you have any Medical Issue?">
            <Input
              value={formData.doYouHaveAnyMedicalIssue || ""}
              onChange={(e) => handleChange("doYouHaveAnyMedicalIssue", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Additional Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="What type of Term Plan are you Looking for">
            <Input
              value={formData.whatTypeOfTermPlanAreYouLookingFor || ""}
              onChange={(e) => handleChange("whatTypeOfTermPlanAreYouLookingFor", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How do you Consider your Health">
            <Input
              value={formData.howDoYouConsiderYourHealth || ""}
              onChange={(e) => handleChange("howDoYouConsiderYourHealth", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How many Critical Illness Coverage you need?">
            <Input
              value={formData.howManyCriticalIllnessCoverageYouNeed || ""}
              onChange={(e) => handleChange("howManyCriticalIllnessCoverageYouNeed", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Secure your Child's Future with Higher Education?">
            <Input
              value={formData.secureYourChildsFutureWithHigherEducation || ""}
              onChange={(e) => handleChange("secureYourChildsFutureWithHigherEducation", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Eligible to get extra $2000 in Government Grants">
            <Input
              type="number"
              value={formData.eligibleToGetExtra2000InGovernmentGrants || ""}
              onChange={(e) => handleChange("eligibleToGetExtra2000InGovernmentGrants", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Deposit every Month towards your Child Education?">
            <Input
              value={formData.depositEveryMonthTowardsYourChildEducation || ""}
              onChange={(e) => handleChange("depositEveryMonthTowardsYourChildEducation", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Would you like to know How RESP Works">
            <Input
              value={formData.wouldYouLikeToKnowHowRespWorks || ""}
              onChange={(e) => handleChange("wouldYouLikeToKnowHowRespWorks", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="$1+ Million in an RRSP Account at Retirement">
            <Input
              value={formData.oneMillionInanRespAccountAtRetirement || ""}
              onChange={(e) => handleChange("oneMillionInanRespAccountAtRetirement", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Do you want to Deposit Monthly or Yearly Premium?">
            <Input
              value={formData.doYouWanToDepositMonthlyOrYearlyPremium || ""}
              onChange={(e) => handleChange("doYouWanToDepositMonthlyOrYearlyPremium", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="More Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="What age do you want to start the withdrawal from">
            <Input
              value={formData.whatageDoYouWanttostartTheWithdrawalFrom || ""}
              onChange={(e) => handleChange("whatageDoYouWanttostartTheWithdrawalFrom", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Are you an Owner or Employee of the Business">
            <Input
              value={formData.areYouAnOwnerOrEmployeeOfTheBusiness || ""}
              onChange={(e) => handleChange("areYouAnOwnerOrEmployeeOfTheBusiness", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Are you looking for Drug & Dental or Just Drug Pla">
            <Input
              value={formData.areYouLookingForDrugAndDentalOrJustDrugPla || ""}
              onChange={(e) => handleChange("areYouLookingForDrugAndDentalOrJustDrugPla", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Total Dependents">
            <Input
              value={formData.totalDependents || ""}
              onChange={(e) => handleChange("totalDependents", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Dependent Age 1">
            <Input
              type="number"
              value={formData.dependentAge1 || ""}
              onChange={(e) => handleChange("dependentAge1", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Dependent Age 2">
            <Input
              value={formData.dependentAge2 || ""}
              onChange={(e) => handleChange("dependentAge2", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Further Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Dependent Age 3">
            <Input
              value={formData.dependentAge3 || ""}
              onChange={(e) => handleChange("dependentAge3", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="What Policy Do You Want?">
            <Input
              value={formData.whatPolicyDoYouWant || ""}
              onChange={(e) => handleChange("whatPolicyDoYouWant", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Enterage of 2nd Traveler">
            <Input
              value={formData.enterageOf2ndTraveler || ""}
              onChange={(e) => handleChange("enterageOf2ndTraveler", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Traveler End Date">
            <Input
              value={formData.travelerEndDate || ""}
              onChange={(e) => handleChange("travelerEndDate", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Pre existing medical conditions">
            <Input
              value={formData.preExistingmedicaLconditions || ""}
              onChange={(e) => handleChange("preExistingmedicaLconditions", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Can you please let me know Premium Payment mode">
            <Input
              value={formData.canYouPleaseLetMeKnowPremiumPaymentMode || ""}
              onChange={(e) => handleChange("canYouPleaseLetMeKnowPremiumPaymentMode", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Do you want Critical Illness Insurance With Money">
            <Input
              value={formData.doYouWantCriticalIllnessInsuranceWithMoney || ""}
              onChange={(e) => handleChange("doYouWantCriticalIllnessInsuranceWithMoney", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="What's your Profession?">
            <Input
              value={formData.whatsYourProfession || ""}
              onChange={(e) => handleChange("whatsYourProfession", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How Much monthly Benefit do you Need?">
            <Input
              value={formData.howMuchMonthlyBenefitDoYouNeed || ""}
              onChange={(e) => handleChange("howMuchMonthlyBenefitDoYouNeed", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Seeking Coverage">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="you are Seeking coverage for?">
            <Input
              value={formData.youAreSeekingCoverageFor || ""}
              onChange={(e) => handleChange("youAreSeekingCoverageFor", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="whats your Age">
            <Input
              type="number"
              value={formData.whatsYourAge || ""}
              onChange={(e) => handleChange("whatsYourAge", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How much do you want to Save monthly">
            <Input
              value={formData.howMuchDoYouWantToSaveMonthly || ""}
              onChange={(e) => handleChange("howMuchDoYouWantToSaveMonthly", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Would like to increase Monthly Deposits">
            <Input
              value={formData.wouldLikeToIncreaseMonthlyDeposits || ""}
              onChange={(e) => handleChange("wouldLikeToIncreaseMonthlyDeposits", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How many child/Children's do you have">
            <Input
              type="number"
              value={formData.howManyChildrensDoYouHave || ""}
              onChange={(e) => handleChange("howManyChildrensDoYouHave", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="What time frame you like to move to be a advisor?">
            <Select
              value={formData.whatTimeFrameYouLikeToMoveToBeaAdvisor || ""}
              onValueChange={(value) => handleChange("whatTimeFrameYouLikeToMoveToBeaAdvisor", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {frame.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="What is your residency status in Canada?">
            <Input
              value={formData.whatIsYourResidencyStatusInCanada || ""}
              onChange={(e) => handleChange("whatIsYourResidencyStatusInCanada", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How long do you need Coverage for?">
            <Input
              value={formData.howLongDoYouNeedCoverageFor || ""}
              onChange={(e) => handleChange("howLongDoYouNeedCoverageFor", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Money require to Complete your Child's Education">
            <Input
              value={formData.moneyRequireToCompleteYourChildEducation || ""}
              onChange={(e) => handleChange("moneyRequireToCompleteYourChildEducation", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Final Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Select your Age Bracket.">
            <Input
              value={formData.selectYourAgeBracket || ""}
              onChange={(e) => handleChange("selectYourAgeBracket", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="How much do you want to Save Yearly">
            <Input
              value={formData.howMuchdoYouWantToSaveYearly || ""}
              onChange={(e) => handleChange("howMuchdoYouWantToSaveYearly", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="what Kind of business is it">
            <Input
              value={formData.whatKindOfBusinesssIsIt || ""}
              onChange={(e) => handleChange("whatKindOfBusinesssIsIt", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Looking For Advisor.">
            <Select
              value={formData.LookingForAdvisor || ""}
              onValueChange={(value) => handleChange("LookingForAdvisor", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {adviosersType.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Are You Licensed as an Insurance Advisor?">
            <Select
              value={formData.areYouLicensedAsAnInsuranceAdvisor || ""}
              onValueChange={(value) => handleChange("areYouLicensedAsAnInsuranceAdvisor", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Dependent Age 4">
            <Input
              type="number"
              value={formData.dependentAge4 || ""}
              onChange={(e) => handleChange("dependentAge4", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormField label="Dependent Age 5">
            <Input
              value={formData.dependentAge5 || ""}
              onChange={(e) => handleChange("dependentAge5", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
          <FormField label="Dependent Age 6">
            <Input
              value={formData.dependentAge6 || ""}
              onChange={(e) => handleChange("dependentAge6", e.target.value)}
              disabled={isDisabled}
            />
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default DescriptionInfo;
