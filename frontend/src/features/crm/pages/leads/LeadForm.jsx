import React, { useState, useEffect } from "react";
import Stepper from "@/components/ui/stepper";
import LeadInformation from "./leadFormComponents/LeadInformation";
import DescriptionInfo from "./leadFormComponents/DescriptionInfo";
import FamilyTree from "./leadFormComponents/FamilyTree";
import AddressInformation from "./leadFormComponents/AddressInformation";
import UMTDetails from "./leadFormComponents/UMTDetails";
import FestivalForm from "./leadFormComponents/FestivalForm";
import ServiceRequestDetails from "./leadFormComponents/ServiceRequestDetails";
import { Button } from "@/components/ui/button";
import { updateLead } from "@/services/crm/leadApi";
import { useDispatch } from "react-redux";
import { updateLeadInList } from "@/redux/slices/leads/leadsSlice";
import { toast } from "react-toastify";

const LeadForm = ({ details, isEditMode = false, onSave }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: "Information" },
    { title: "Description Info" },
    { title: "Family Tree" },
    { title: "Address Information" },
    { title: "UMTFacebook" },
    { title: "Festivals" },
    { title: "Service Request Details" },
  ];

  useEffect(() => {
    if (details) {
      // Populate formData with details, similar to LeadsDetailsView
      setFormData({
        ...details,
        firstName: details.firstName ?? "",
        lastName: details.lastName ?? "",
        buildingNumber: details.buildingNumber ?? "",
        officeNumber: details.officeNumber ?? "",
        company: details.company?.ROWID ?? "",
        contactOwner: details.contactOwner?.ROWID ?? "",
        leadName: details.leadName ?? "",
        title: details.title ?? "",
        leadSource: details.leadSource ?? "",
        leadStatus: details.leadStatus ?? "",
        createdBy: details.createdBy ?? "",
        leadOwner: details.leadOwner ?? "",
        phone: details.phone ?? "",
        mobile: details.mobile ?? "",
        email: details.email ?? "",
        companyName: details.companyName ?? "",
        website: details.website ?? "",
        industry: details.industry ?? "",
        currency: details.currency ?? "",
        exchangeRate: details.exchangeRate ?? "",
        street: details.street ?? "",
        city: details.city ?? "",
        state: details.state ?? "",
        zipCode: details.zipCode ?? "",
        country: details.country ?? "",
        closingDate: details.closingDate ?? "",
        pipeline: details.pipeline ?? "",
        amount: details.amount ?? "",
        description: details.description ?? "",
        // Add other fields as needed
      });
    }
  }, [details]);

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

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await updateLead(formData, details.ROWID);
      if (res.data.success) {
        toast.success("Lead Updated Successfully");
        dispatch(updateLeadInList({ ...formData, ROWID: details.ROWID }));
        if (onSave) onSave();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err.message || "Error Occurred during the Lead Update!");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <LeadInformation formData={formData} setFormData={setFormData} users={[]} advisors={[]} locations={[]} />;
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
    <div className="w-full">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />
      <div className="mt-6">
        {renderStepContent()}
      </div>
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSave} loading={loading} loadingText="Updating...">
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
