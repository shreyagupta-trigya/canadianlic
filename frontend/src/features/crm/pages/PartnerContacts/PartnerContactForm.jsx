import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormPageLayout from "@/layout/FormPageLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const partnerContactOptions = [
  { ROWID: 1, firstName: "John Doe" },
  { ROWID: 2, firstName: "Jane Doe" },
];

const steps = [
  { title: "Contact Information" },
  { title: "Address Information" },
];

const PartnerContactForm = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    partnerContact: "",
    email: "",
    partnerContactOwner: "",
    parentPartner: "",
    street: "",
    state: "",
    country: "",
    city: "",
    zipCode: "",
    description: "",
    shipmentStreet: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!formData.partnerContact) newErrors.partnerContact = "Required";
      if (!formData.email) newErrors.email = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = () => {
    const newErrors = {};
    if (!formData.partnerContact) newErrors.partnerContact = "Required";
    if (!formData.email) newErrors.email = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) {
      toast.error("Please fill all required fields");
      return;
    }
    setCurrentStep(1);
  };

  const handlePrevious = () => setCurrentStep(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        id
          ? "Partner Contact updated successfully"
          : "Partner Contact created successfully"
      );
      navigate("/crm/partner-contacts");
    } catch {
      toast.error("Failed to submit Partner Contact");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  return (
    <FormPageLayout
      title={
        <span className="text-lg font-semibold md:text-2xl">
          {id ? "Update Partner Contact" : "Create Partner Contact"}
        </span>
      }
      onCancel={onCancel}
      onSubmit={currentStep === 0 ? handleNext : handleSubmit}
      loading={loading}
      submitButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
      cancelButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
    >
      {/* Custom Stepper */}
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => {
                  if (index <= currentStep) {
                    // Allow going back or same step
                    setCurrentStep(index);
                  } else {
                    // Going forward, validate current step before allowing
                    if (index === 1) {
                      if (validateStep()) {
                        setCurrentStep(index);
                      } else {
                        toast.error(
                          "Please fill all required fields on the current step"
                        );
                      }
                    }
                  }
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full text-white font-semibold transition-all duration-300 ${
                    index === currentStep
                      ? "bg-blue-500 shadow-lg"
                      : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={`text-sm transition-colors m-0 p-0 duration-300 ${
                    index === currentStep
                      ? "text-blue-500 font-medium"
                      : index < currentStep
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-[2px] flex-1 mb-5 transition-colors duration-300 ${
                    index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 0 - Contact Info */}
      {currentStep === 0 && (
        <div className="w-full rounded-2xl border mt-4 px-6 py-5 flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Partner Contact */}
            <div>
              <label className="block mb-1 font-medium">
                Partner Contact <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.partnerContact || ""}
                onValueChange={(value) => handleChange("partnerContact", value)}
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.partnerContact ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Partner Contact" />
                </SelectTrigger>
                <SelectContent>
                  {partnerContactOptions.map((user) => (
                    <SelectItem key={user.ROWID} value={user.ROWID.toString()}>
                      {user.firstName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.partnerContact && (
                <p className="text-red-500 text-sm">{errors.partnerContact}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter Email"
                type="email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Partner Contact Owner */}
            <div>
              <label className="block mb-1 font-medium">Partner Contact Owner</label>
              <Input
                value={formData.partnerContactOwner || ""}
                onChange={(e) =>
                  handleChange("partnerContactOwner", e.target.value)
                }
                placeholder="Enter Owner"
              />
            </div>

            {/* Parent Partner */}
            <div>
              <label className="block mb-1 font-medium">Parent Partner</label>
              <Input
                value={formData.parentPartner || ""}
                onChange={(e) => handleChange("parentPartner", e.target.value)}
                placeholder="Enter Parent Partner"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 1 - Address Info */}
      {currentStep === 1 && (
        <div className="w-full rounded-2xl border mt-4 px-6 py-5 flex flex-col">
          <div className="rounded-2xl px-6 py-6">
            <div className="text-lg font-semibold mb-4">Address Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Billing Street</label>
                <Input
                  name="street"
                  value={formData.street || ""}
                  onChange={(e) => handleChange("street", e.target.value)}
                  placeholder="Billing Street"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Shipping Street</label>
                <Input
                  name="shipmentStreet"
                  value={formData.shipmentStreet || ""}
                  onChange={(e) => handleChange("shipmentStreet", e.target.value)}
                  placeholder="Shipping Street"
                  className={errors.shipmentStreet ? "border-red-500" : ""}
                />
                {errors.shipmentStreet && (
                  <span className="error input-error-font-size text-red-500">
                    {errors.shipmentStreet}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </FormPageLayout>
  );
};

export default PartnerContactForm;
