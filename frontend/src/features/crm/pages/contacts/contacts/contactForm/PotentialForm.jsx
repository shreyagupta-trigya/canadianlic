import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const PotentialForm = ({ formData, setFormData, isDisabled,  handlePrevious, handleNext }) => {
  // Ensure formData is always an object
  const safeFormData = formData || {};

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

 

  return (
    <div className="space-y-6 p-1">
      {/* Pending Potential Business Section */}
      <div className="space-y-4 shadow hover:shadow-md p-3 rounded-md border">
        <h5 className="text-xl font-semibold">
          Pending Potential Business (Still not Sold)
        </h5>

        {/* Number of Products Remaining */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numberOfProductRemaining">
              Number of Products Remaining (Dependents)
            </Label>
            <Input
              id="numberOfProductRemaining"
              value={safeFormData.numberOfProductRemaining || ""}
              onChange={(e) =>
                handleInputChange("numberOfProductRemaining", e.target.value)
              }
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfProductRemainingIndividuals">
              Number of Products Remaining (Individual)
            </Label>
            <Input
              id="numberOfProductRemainingIndividuals"
              value={safeFormData.numberOfProductRemainingIndividuals || ""}
              onChange={(e) =>
                handleInputChange(
                  "numberOfProductRemainingIndividuals",
                  e.target.value
                )
              }
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Checkboxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="potentialDependentCompleted"
              checked={safeFormData.potentialDependentCompleted || false}
              onCheckedChange={(checked) =>
                handleInputChange("potentialDependentCompleted", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="potentialDependentCompleted">
              Potential Dependents Completed?
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pendingPotentialBusinesslifeInsurance"
              checked={
                safeFormData.pendingPotentialBusinesslifeInsurance || false
              }
              onCheckedChange={(checked) =>
                handleInputChange(
                  "pendingPotentialBusinesslifeInsurance",
                  checked
                )
              }
              disabled={isDisabled}
            />
            <Label htmlFor="pendingPotentialBusinesslifeInsurance">
              Life Insurance
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="dependentLifeIns"
              checked={safeFormData.dependentLifeIns || false}
              onCheckedChange={(checked) =>
                handleInputChange("dependentLifeIns", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="dependentLifeIns">Dependent Life Ins</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pendingPotentialBusinessCriticalIllness"
              checked={
                safeFormData.pendingPotentialBusinessCriticalIllness || false
              }
              onCheckedChange={(checked) =>
                handleInputChange(
                  "pendingPotentialBusinessCriticalIllness",
                  checked
                )
              }
              disabled={isDisabled}
            />
            <Label htmlFor="pendingPotentialBusinessCriticalIllness">
              Critical Illness
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="dependentCriticalIns"
              checked={safeFormData.dependentCriticalIns || false}
              onCheckedChange={(checked) =>
                handleInputChange("dependentCriticalIns", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="dependentCriticalIns">Dependent Critical Ins</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pendingPotentialBusinessHealthAndDentalInsurances"
              checked={
                safeFormData.pendingPotentialBusinessHealthAndDentalInsurances ||
                false
              }
              onCheckedChange={(checked) =>
                handleInputChange(
                  "pendingPotentialBusinessHealthAndDentalInsurances",
                  checked
                )
              }
              disabled={isDisabled}
            />
            <Label htmlFor="pendingPotentialBusinessHealthAndDentalInsurances">
              Health & Dental Insurance
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pendingPotentialBusinessTravelInsurance"
              checked={
                safeFormData.pendingPotentialBusinessTravelInsurance || false
              }
              onCheckedChange={(checked) =>
                handleInputChange(
                  "pendingPotentialBusinessTravelInsurance",
                  checked
                )
              }
              disabled={isDisabled}
            />
            <Label htmlFor="pendingPotentialBusinessTravelInsurance">
              Travel Insurance
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pendingPotentialBusinessResp"
              checked={safeFormData.pendingPotentialBusinessResp || false}
              onCheckedChange={(checked) =>
                handleInputChange("pendingPotentialBusinessResp", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="pendingPotentialBusinessResp">RESP</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rrspTfsaMutualFundsSegFunds"
              checked={safeFormData.rrspTfsaMutualFundsSegFunds || false}
              onCheckedChange={(checked) =>
                handleInputChange("rrspTfsaMutualFundsSegFunds", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="rrspTfsaMutualFundsSegFunds">
              RRSP / TFSA / Mutual Funds / Seg Funds
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="ppbOtherInvestments"
              checked={safeFormData.ppbOtherInvestments || false}
              onCheckedChange={(checked) =>
                handleInputChange("ppbOtherInvestments", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="ppbOtherInvestments">Other Investments</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="ppbLoanProtection"
              checked={safeFormData.ppbLoanProtection || false}
              onCheckedChange={(checked) =>
                handleInputChange("ppbLoanProtection", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="ppbLoanProtection">Loan Protection</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="ppbOtherLivingBenefits"
              checked={safeFormData.ppbOtherLivingBenefits || false}
              onCheckedChange={(checked) =>
                handleInputChange("ppbOtherLivingBenefits", checked)
              }
              disabled={isDisabled}
            />
            <Label htmlFor="ppbOtherLivingBenefits">
              Other Living Benefits
            </Label>
          </div>
        </div>

        {/* Business Insurance Potential Revenue Map */}
        <div className="space-y-4">
          <h5 className="text-lg font-semibold">
            Business Insurance Potential Revenue Map
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceOffering">Service Offering</Label>
              <Input
                id="serviceOffering"
                value={safeFormData.serviceOffering || ""}
                onChange={(e) =>
                  handleInputChange("serviceOffering", e.target.value)
                }
                disabled={isDisabled}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Potential Business (Max Capability) Section */}
      <div className="shadow hover:shadow-md p-3 py-4 rounded-md border">
        <div className="space-y-6">
          <h5 className="text-lg font-semibold">
            Potential Business (Max Capability)
          </h5>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxNumberOfPotentialProduct">
                Max Number of Potential Products
              </Label>
              <Input
                id="maxNumberOfPotentialProduct"
                value={safeFormData.maxNumberOfPotentialProduct || ""}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxNumberOfPotentialProductApplicable">
                Number of Potential Products Applicable
              </Label>
              <Input
                id="maxNumberOfPotentialProductApplicable"
                value={safeFormData.maxNumberOfPotentialProductApplicable || ""}
                onChange={(e) =>
                  handleInputChange(
                    "maxNumberOfPotentialProductApplicable",
                    e.target.value
                  )
                }
                disabled={isDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientRating">Client Rating</Label>
              <Input
                id="clientRating"
                value={safeFormData.clientRating || ""}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="potentialBusinessPolicyValues">
                Potential Business (Policy Values)
              </Label>
              <Input
                id="potentialBusinessPolicyValues"
                value={safeFormData.potentialBusinessPolicyValues || ""}
                onChange={(e) =>
                  handleInputChange(
                    "potentialBusinessPolicyValues",
                    e.target.value
                  )
                }
                disabled={isDisabled}
                placeholder="CA$"
              />
            </div>
          </div>

          {/* Checkboxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="potentialBusinessTravelInsurance"
                checked={safeFormData.potentialBusinessTravelInsurance || false}
                onCheckedChange={(checked) =>
                  handleInputChange("potentialBusinessTravelInsurance", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="potentialBusinessTravelInsurance">
                Travel Insurance
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="resp"
                checked={safeFormData.resp || false}
                onCheckedChange={(checked) =>
                  handleInputChange("resp", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="resp">RESP</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rrspTfsa"
                checked={safeFormData.rrspTfsa || false}
                onCheckedChange={(checked) =>
                  handleInputChange("rrspTfsa", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="rrspTfsa">
                RRSP / TFSA / Mutual Funds / Seg Funds
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="potentialBusinessHealthAndDentalInsurance"
                checked={
                  safeFormData.potentialBusinessHealthAndDentalInsurance ||
                  false
                }
                onCheckedChange={(checked) =>
                  handleInputChange(
                    "potentialBusinessHealthAndDentalInsurance",
                    checked
                  )
                }
                disabled={isDisabled}
              />
              <Label htmlFor="potentialBusinessHealthAndDentalInsurance">
                Health & Dental Insurance
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherInvestments"
                checked={safeFormData.otherInvestments || false}
                onCheckedChange={(checked) =>
                  handleInputChange("otherInvestments", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="otherInvestments">Other Investments</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="potentialBusinessLoanProtection"
                checked={safeFormData.potentialBusinessLoanProtection || false}
                onCheckedChange={(checked) =>
                  handleInputChange("potentialBusinessLoanProtection", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="potentialBusinessLoanProtection">
                Loan Protection
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherLivingBenefits"
                checked={safeFormData.otherLivingBenefits || false}
                onCheckedChange={(checked) =>
                  handleInputChange("otherLivingBenefits", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="otherLivingBenefits">Other Living Benefits</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="potentialBusinessCriticalIllness"
                checked={safeFormData.potentialBusinessCriticalIllness || false}
                onCheckedChange={(checked) =>
                  handleInputChange("potentialBusinessCriticalIllness", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="potentialBusinessCriticalIllness">
                Critical Illness
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="potentialBusinessLifeInsurance"
                checked={safeFormData.potentialBusinessLifeInsurance || false}
                onCheckedChange={(checked) =>
                  handleInputChange("potentialBusinessLifeInsurance", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="potentialBusinessLifeInsurance">
                Life Insurance
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="potentialDependent"
                checked={safeFormData.potentialDependent || false}
                onCheckedChange={(checked) =>
                  handleInputChange("potentialDependent", checked)
                }
                disabled={isDisabled}
              />
              <Label htmlFor="potentialDependent">Potential Dependents?</Label>
            </div>
          </div>
        </div>
        </div>

        {/* Navigation Buttons */}
         <div className="flex justify-center gap-4 fixed bottom-0 pb-2  bg-background  w-full left-30  mx-auto" >
          <Button onClick={handlePrevious} variant="outline">
            Prev
          </Button>
          <Button onClick={handleNext} className={"bg-blue-500 hover:bg-blue-600"}>Next</Button>
        </div>
      
    </div>
  );
};

export default PotentialForm;
