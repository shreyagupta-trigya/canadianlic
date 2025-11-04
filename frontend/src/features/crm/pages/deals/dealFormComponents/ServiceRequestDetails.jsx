import React from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ServiceRequestDetails = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const servicesRequested = [
    "Life Insurance",
    "Critical Illness Insurance",
    "Disability Insurance",
    "Long Term Care Insurance",
    "Travel Insurance",
    "Home Insurance",
    "Auto Insurance",
    "Business Insurance",
    "Investment Planning",
    "Retirement Planning",
    "Estate Planning",
    "Tax Planning",
    "Mortgage Life Insurance",
    "Group Benefits",
    "Super Visa Insurance",
    "RRSP",
    "TFSA",
    "RESP",
    "Mortgage",
    "Loan Protection",
    "Credit Protection",
    "Other"
  ];

  const lifeInsuranceOption = [
    "Term Life Insurance",
    "Whole Life Insurance",
    "Universal Life Insurance",
    "Variable Life Insurance",
    "Final Expense Insurance",
    "Mortgage Life Insurance",
    "Group Life Insurance",
    "Key Person Insurance",
    "Buy-Sell Insurance",
    "Other"
  ];

  const livingBenefitsOption = [
    "Critical Illness",
    "Disability",
    "Long Term Care",
    "Accidental Death & Dismemberment",
    "Hospital Indemnity",
    "Dental",
    "Vision",
    "Prescription Drug",
    "Other"
  ];

  const businessLiabilityInsuranceOption = [
    "General Liability",
    "Professional Liability",
    "Directors & Officers Liability",
    "Employment Practices Liability",
    "Cyber Liability",
    "Commercial Property",
    "Commercial Auto",
    "Workers' Compensation",
    "Business Interruption",
    "Other"
  ];

  const investmentsOption = [
    "Stocks",
    "Bonds",
    "Mutual Funds",
    "ETFs",
    "Segregated Funds",
    "Annuities",
    "GICs",
    "RRSP",
    "TFSA",
    "RESP",
    "Other"
  ];

  const immigrationServicesOption = [
    "Express Entry",
    "Provincial Nominee Program",
    "Family Sponsorship",
    "Work Permits",
    "Study Permits",
    "Visitor Visas",
    "Super Visa",
    "Citizenship",
    "Other"
  ];

  const groupInsuranceOption = [
    "Group Life",
    "Group Disability",
    "Group Dental",
    "Group Vision",
    "Group Critical Illness",
    "Group Travel",
    "Other"
  ];

  const loanProtectionOption = [
    "Mortgage Life Insurance",
    "Credit Life Insurance",
    "Loan Protection",
    "Other"
  ];

  const homeInsuranceOption = [
    "Homeowners Insurance",
    "Condo Insurance",
    "Renters Insurance",
    "Flood Insurance",
    "Earthquake Insurance",
    "Other"
  ];

  const autoInsuranceOption = [
    "Auto Insurance",
    "Commercial Auto",
    "Fleet Insurance",
    "Other"
  ];

  const travelInsuranceOption = [
    "Single Trip",
    "Annual Multi-Trip",
    "Student Travel",
    "Snowbird Travel",
    "Cruise Travel",
    "Business Travel",
    "Other"
  ];

  return (
    <div>
      <FormCard title="Insurance Inquiry">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Services Requested">
            <Select
              value={formData.servicesRequested || ""}
              onValueChange={(value) => handleChange("servicesRequested", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                {servicesRequested.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Potential Business (Policy Values)">
            <Input
              type="number"
              value={formData.potentialBusiness || ""}
              onChange={(e) => handleChange("potentialBusiness", e.target.value)}
              placeholder="CA$"
            />
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Insurance Types">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Life Insurance">
            <Select
              value={formData.lifeInsurance || ""}
              onValueChange={(value) => handleChange("lifeInsurance", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {lifeInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Living Benefits">
            <Select
              value={formData.livingBenefits || ""}
              onValueChange={(value) => handleChange("livingBenefits", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {livingBenefitsOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Investments">
            <Select
              value={formData.investments || ""}
              onValueChange={(value) => handleChange("investments", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {investmentsOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Business Liability Insurance">
            <Select
              value={formData.businessLiabilityInsurance || ""}
              onValueChange={(value) => handleChange("businessLiabilityInsurance", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {businessLiabilityInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Immigration Services">
            <Select
              value={formData.immigrationServices || ""}
              onValueChange={(value) => handleChange("immigrationServices", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {immigrationServicesOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Group Insurance">
            <Select
              value={formData.groupInsurance || ""}
              onValueChange={(value) => handleChange("groupInsurance", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {groupInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Loan Protection">
            <Select
              value={formData.loanProtection || ""}
              onValueChange={(value) => handleChange("loanProtection", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {loanProtectionOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Home Insurance">
            <Select
              value={formData.homeInsurance || ""}
              onValueChange={(value) => handleChange("homeInsurance", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {homeInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Auto Insurance">
            <Select
              value={formData.autoInsurance || ""}
              onValueChange={(value) => handleChange("autoInsurance", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {autoInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Travel Insurance">
            <Select
              value={formData.travelInsurance || ""}
              onValueChange={(value) => handleChange("travelInsurance", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {travelInsuranceOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>
    </div>
  );
};

export default ServiceRequestDetails;
