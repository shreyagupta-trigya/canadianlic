import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormPageLayout from "@/layout/FormPageLayout";
import Stepper from "@/components/ui/stepper";
import BasicInfo from "./components/BasicInfo";
import AnnuitantInfo from "./components/AnnuitantInfo";
import Trackers from "./components/Trackers";
import Beneficiary from "./components/Beneficiary";
import { createInvestment } from "@/services/crm/policyApi";
import { addPolicyToList } from "@/redux/slices/policies/policiesSlice";
import { toast } from "react-toastify";

const InvestmentMultiStepForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {},
    annuitantInfo: {},
    trackers: {},
    services: {},
    layout: "Investment",
  });

  const steps = [
    { title: "Basic Info" },
    { title: "Annuitant Info" },
    { title: "Trackers" },
    { title: "Beneficiary" },
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
      const res = await createInvestment(formData);
      dispatch(addPolicyToList(res.data.policies));
      res.data.success && toast.success("Investment Created Successfully!");
      navigate("/policies");
    } catch (err) {
      console.error("Create error:", err);
      toast.error("Failed to create investment");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfo
            formData={formData.basicInfo}
            setFormData={(data) => setFormData({ ...formData, basicInfo: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      case 1:
        return (
          <AnnuitantInfo
            formData={formData.annuitantInfo}
            setFormData={(data) => setFormData({ ...formData, annuitantInfo: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      case 2:
        return (
          <Trackers
            formData={formData.trackers}
            setFormData={(data) => setFormData({ ...formData, trackers: data })}
            onNext={handleNext}
            onPrev={handlePrevious}
          />
        );
      case 3:
        return (
          <Beneficiary
            formData={formData.services}
            setFormData={(data) => setFormData({ ...formData, services: data })}
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
      title={<span className="text-lg font-semibold md:text-2xl">Create Investment</span>}
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

export default InvestmentMultiStepForm;
