import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormPageLayout from "@/layout/FormPageLayout";
import Stepper from "@/components/ui/stepper";
import LeadInformation from "./leadFormComponents/LeadInformation";
import DescriptionInfo from "./leadFormComponents/DescriptionInfo";
import FamilyTree from "./leadFormComponents/FamilyTree";
import AddressInformation from "./leadFormComponents/AddressInformation";
import UMTDetails from "./leadFormComponents/UMTDetails";
import FestivalForm from "./leadFormComponents/FestivalForm";
import ServiceRequestDetails from "./leadFormComponents/ServiceRequestDetails";
import { createLead } from "@/services/crm/leadApi";
import { addLeadToList } from "@/redux/slices/leads/leadsSlice";
import { toast } from "react-toastify";

const LeadsMultiStepForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { title: "Lead Information" },
    { title: "Description Info" },
    { title: "Family Tree" },
    { title: "Address Information" },
    { title: "UMT Details" },
    { title: "Festival Form" },
    { title: "Service Request Details" },
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
      const res = await createLead(formData);
      dispatch(addLeadToList(res.data.leads));
      res.data.success && toast.success("Lead Created Successfully!");
      navigate("/crm/leads");
    } catch (err) {
      console.error("Create error:", err);
      toast.error("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LeadInformation formData={formData} setFormData={setFormData} />;
      case 1:
        return <DescriptionInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <FamilyTree formData={formData} setFormData={setFormData} />;
      case 3:
        return <AddressInformation formData={formData} setFormData={setFormData} />;
      case 4:
        return <UMTDetails formData={formData} setFormData={setFormData} />;
      case 5:
        return <FestivalForm formData={formData} setFormData={setFormData} />;
      case 6:
        return <ServiceRequestDetails formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <FormPageLayout
      title={<span className="text-lg font-semibold md:text-2xl">Create Lead</span>}
      onCancel={onCancel}
      onSubmit={currentStep === steps.length - 1 ? onSubmit : handleNext}
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

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {currentStep === steps.length - 1 ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </FormPageLayout>
  );
};

export default LeadsMultiStepForm;
