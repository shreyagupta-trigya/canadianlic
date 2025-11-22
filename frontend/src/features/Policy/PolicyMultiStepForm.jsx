import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormPageLayout from "@/layout/FormPageLayout";
import Stepper from "@/components/ui/stepper";
import PolicyInfo from "./policyFormComponents/PolicyInfo";
import PolicyDetails from "./policyFormComponents/PolicyDetails";
import Claims from "./policyFormComponents/Claims";
import Services from "./policyFormComponents/Services";
import History from "./policyFormComponents/History";
import Commission from "./policyFormComponents/Commission";
import { createPolicy } from "@/services/crm/policyApi";
import { addPolicyToList } from "@/redux/slices/policies/policiesSlice";
import { toast } from "react-toastify";

const PolicyMultiStepForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {},
    services: {},
    policyDetails: {},
    claims: {},
    commission: {},
    history: {},
  });

  const steps = [
    { title: "Basic Info" },
    { title: "Policy OwnerShip & Beneficiary Details" },
    { title: "Policy Tracking" },
    { title: "Claims" },
    { title: "Commissions" },
    { title: "Histories" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await createPolicy(formData);
      dispatch(addPolicyToList(res.data.policies));
      res.data.success && toast.success("Policy Created Successfully!");
      navigate("/policies");
    } catch (err) {
      console.error("Create error:", err);
      toast.error("Failed to create policy");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PolicyInfo
            formData={formData.basicInfo}
            setFormData={(data) => setFormData({ ...formData, basicInfo: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
            
          />
        );
      case 1:
        return (
          <Services
            formData={formData.services}
            setFormData={(data) => setFormData({ ...formData, services: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      case 2:
        return (
          <PolicyDetails
            formData={formData.policyDetails}
            setFormData={(data) => setFormData({ ...formData, policyDetails: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      case 3:
        return (
          <Claims
            formData={formData.claims}
            setFormData={(data) => setFormData({ ...formData, claims: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      case 4:
        return (
          <Commission
            formData={formData.commission}
            setFormData={(data) => setFormData({ ...formData, commission: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      case 5:
        return (
          <History
            formData={formData.history}
            setFormData={(data) => setFormData({ ...formData, history: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormPageLayout
      title={<span className="text-lg font-semibold md:text-2xl">Create Policy</span>}
      onCancel={onCancel}
      onSubmit={currentStep === steps.length - 1 ? onSubmit : handleNext}
      submitButtonText={currentStep === steps.length - 1 ? "Submit" : "Next"}
      loading={loading}
      cancelButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
      submitButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
    >
      <div className="mb-6">
        <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
      </div>

      <div className="mb-6">
        {renderStep()}
      </div>
    </FormPageLayout>
  );
};

export default PolicyMultiStepForm;
