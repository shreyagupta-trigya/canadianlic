import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormPageLayout from "@/layout/FormPageLayout";
import Stepper from "@/components/ui/stepper";
import DealInformation from "./dealFormComponents/DealInformation";
import DealOwnership from "./dealFormComponents/DealOwnership";
import PolicyTracking from "./dealFormComponents/PolicyTracking";
import PolicyReview from "./dealFormComponents/PolicyReview";
import Claims from "./dealFormComponents/Claims";
import ApplicationCal from "./dealFormComponents/ApplicationCal";
import DealTrustee from "./dealFormComponents/DealTrustee";
import DealBene from "./dealFormComponents/DealBene";
import { addDealToList, updateDealInList } from "@/redux/slices/deals/dealsSlice";
import { toast } from "react-toastify";
import mandatory from "./utils/mandatory";

const DealsMultiStepForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [owners, setOwners] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [leads, setLeads] = useState([]);
  const [errors, setErrors] = useState({});

  const steps = [
    { title: "Deal Information" },
    { title: "Deal Ownership" },
    { title: "Policy Tracking" },
    { title: "Review & Renewal" },
    { title: "Claims" },
    { title: "App Calculation" },
    { title: "Trustee" },
    { title: "Beneficiaries" },
  ];

  useEffect(() => {
    // Mock data for demonstration
    setOwners([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ]);
    setContacts([
      { id: 1, name: "Contact 1" },
      { id: 2, name: "Contact 2" },
    ]);
    setLocations([
      { id: 1, name: "Location 1" },
      { id: 2, name: "Location 2" },
    ]);
    setLeads([
      { id: 1, name: "Lead 1" },
      { id: 2, name: "Lead 2" },
    ]);

    if (id) {
      // Mock edit data
      setFormData({
        dealName: "Sample Deal",
        stage: "Prospecting",
        // Add other fields as needed
      });
    }
  }, [id]);

  const validateMandatoryFields = (data) => {
    const errs = {};
    mandatory.forEach(field => {
      if (!data[field.id] || data[field.id].toString().trim() === '' || data[field.id] === null || data[field.id] === undefined) {
        errs[field.id] = `${field.fieldName} is required.`;
      }
    });
    return errs;
  };

  const handleNext = () => {
    if (currentStep === 0) {
      const errs = validateMandatoryFields(formData);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        toast.error("Please fill all mandatory fields");
        return;
      }
      setErrors({});
    }
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
      // Mock submit logic
      console.log("Submitting form data:", formData);
      setTimeout(() => {
        if (id) {
          dispatch(updateDealInList({ ...formData, ROWID: id }));
          toast.success("Deal Updated Successfully!");
        } else {
          dispatch(addDealToList({ ...formData, ROWID: Date.now() }));
          toast.success("Deal Created Successfully!");
        }
        navigate("/crm/deals");
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to save deal");
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DealInformation
            formData={formData}
            setFormData={setFormData}
            owners={owners}
            contacts={contacts}
            locations={locations}
            leads={leads}
            errors={errors}
          />
        );
      case 1:
        return <DealOwnership formData={formData} setFormData={setFormData} />;
      case 2:
        return <PolicyTracking formData={formData} setFormData={setFormData} />;
      case 3:
        return <PolicyReview formData={formData} setFormData={setFormData} />;
      case 4:
        return <Claims formData={formData} setFormData={setFormData} />;
      case 5:
        return <ApplicationCal formData={formData} setFormData={setFormData} />;
      case 6:
        return <DealTrustee formData={formData} setFormData={setFormData} />;
      case 7:
        return <DealBene formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <FormPageLayout
      title={<span className="text-lg font-semibold md:text-2xl">{id ? "Edit Deal" : "Create Deal"}</span>}
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

export default DealsMultiStepForm;
