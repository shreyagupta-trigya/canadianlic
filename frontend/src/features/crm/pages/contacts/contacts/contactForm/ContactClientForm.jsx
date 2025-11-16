import React, { useState } from 'react';
import Stepper from "@/components/ui/stepper";
import ContactInfoForm from "./ContactInfoForm";
import ServiceForm from "./ServiceForm";
import PotentialForm from "./PotentialForm";
import FamilyTreeForm from "./FamilyTreeForm";
import FestivalForm from "./FestivalForm";
import LeadInfoForm from "./LeadInfoForm";
import FacebookForm from "./FacebookForm";
import AddressForm from "./AddressForm";
import LeadHistoryForm from "./LeadHistoryForm";
import LeadMgtForm from "./LeadMgtForm";

const ContactClientForm = ({ formData: initialFormData = {}, setFormData: externalSetFormData, isDisabled }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [internalFormData, setInternalFormData] = useState(initialFormData);

  const formData = externalSetFormData ? initialFormData : internalFormData;
  const setFormData = externalSetFormData || setInternalFormData;

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
  };

  const steps = [
    { title: "Contact Info"  },
    { title: "Service" },
    { title: "Potential" },
    { title: "Family Tree"},
    { title: "Festival"},
    { title: "Lead Info" },
    { title: "Facebook" },
    { title: "Address Info"},
    { title: "Conversion History" },
    { title: "Lead Mgt"},
  ];

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <ContactInfoForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext}  />;
      case 1:
        return <ServiceForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext}  />;
      case 2:
        return <PotentialForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext}  />;
      case 3:
        return <FamilyTreeForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext}  />;
      case 4:
        return <FestivalForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext} />;
      case 5:
        return <LeadInfoForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext} />;
      case 6:
        return <FacebookForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext}  />;
      case 7:
        return <AddressForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext} />;
      case 8:
        return <LeadHistoryForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext} />;
      case 9:
        return <LeadMgtForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext} />;
      default:
        return <ContactInfoForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} handlePrevious={handlePrevious} handleNext={handleNext} />;
    }
  };

  return (
    <div className="w-full">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      <div className="mt-6">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ContactClientForm;
