// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import VendorInfo from "./VendorInfo";
// import Address from "./Address";
// import {Button} from "@/components/ui/button";
// import {Card} from "@/components/ui/card";

// const VendorForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [currentStep, setCurrentStep] = useState(0);
//   const steps = ["Vendor Info", "Address"];
//   const [vendorInfo, setVendorInfo] = useState({});
//   const [address, setAddress] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Removed backend fetching, just UI now

//   const goToStep = (stepIndex) => setCurrentStep(stepIndex);

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   // UI only submit handler - replace call with success alert and navigation
//   const handleSubmit = () => {
//     setIsLoading(true);

//     // Simulate async submit with timeout
//     setTimeout(() => {
//       alert(`Vendor ${id ? "Updated" : "Created"} Successfully`);
//       setIsLoading(false);
//       navigate("/vendors/list");
//     }, 1000);
//   };

//   return (
//     <Card className="p-4">
//       <div className="mb-4">
//         {steps.map((step, idx) => (
//           <Button
//             key={step}
//             variant={idx === currentStep ? "solid" : "outline"}
//             onClick={() => goToStep(idx)}
//             className="mr-2"
//           >
//             {step}
//           </Button>
//         ))}
//       </div>
//       <div>
//         {currentStep === 0 && <VendorInfo data={vendorInfo} onChange={setVendorInfo} />}
//         {currentStep === 1 && <Address data={address} onChange={setAddress} />}
//       </div>
//       <div className="mt-4 flex justify-between">
//         <Button onClick={handlePrevious} disabled={currentStep === 0}>
//           Previous
//         </Button>
//         <Button onClick={handleNext} disabled={isLoading}>
//           {currentStep === steps.length - 1 ? "Submit" : "Next"}
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default VendorForm;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "@/features/utils/ListViewMenu";

const ownerOptions = [
  { ROWID: 1, name: "John Doe" },
  { ROWID: 2, name: "Jane Doe" },
];

const contactOptions = [
  { ROWID: 1, name: "Client A" },
  { ROWID: 2, name: "Client B" },
];

const steps = [{ title: "Vendor Info" }, { title: "Address Info" }];

const VendorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    vendorName: "",
    vendorType: "",
    email: "",
    phone: "",
    fax: "",
    website: "",
    vendorOwner: "",
    referredBy: "",
    exchangeRate: "",
    contact: "",
    currency: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!formData.vendorName)
        newErrors.vendorName = "Vendor Name is required";
      if (!formData.exchangeRate)
        newErrors.exchangeRate = "Exchange Rate is required";
      if (!formData.currency) newErrors.currency = "Currency is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = () => {
    const newErrors = {};
    if (!formData.vendorName) newErrors.vendorName = "Vendor Name is required";
    if (!formData.exchangeRate)
      newErrors.exchangeRate = "Exchange Rate is required";
    if (!formData.currency) newErrors.currency = "Currency is required";
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
      await new Promise((r) => setTimeout(r, 1000));
      toast.success(
        id ? "Vendor updated successfully" : "Vendor created successfully"
      );
      navigate("/vendors/list");
    } catch {
      toast.error("Failed to submit Vendor");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  return (
    <FormPageLayout
      title={
        <span className="text-lg font-semibold md:text-2xl">
          {id ? "Update Vendor" : "Create Vendor"}
        </span>
      }
      onCancel={onCancel}
      onSubmit={currentStep === 0 ? handleNext : handleSubmit}
      loading={loading}
      submitButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
      cancelButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
    >
      {/* Stepper */}
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => {
                  if (i <= currentStep) setCurrentStep(i);
                  else if (i === 1 && validateStep()) setCurrentStep(i);
                  else if (i === 1)
                    toast.error(
                      "Please fill required fields on the current step"
                    );
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full text-white font-semibold transition-all duration-300 ${
                    i === currentStep
                      ? "bg-blue-500 shadow-lg"
                      : i < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
                <span
                  className={`text-sm transition-colors m-0 p-0 duration-300 ${
                    i === currentStep
                      ? "text-blue-500 font-medium"
                      : i < currentStep
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-[2px] flex-1 mb-5 transition-colors duration-300 ${
                    i < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 0 - Vendor Info Fields in original arrangement */}
      {currentStep === 0 && (
        <div className="w-full rounded-2xl border mt-4 px-6 py-5 flex flex-col space-y-6">
          <div className="text-lg font-semibold mb-4">Vendor Information</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">
                Vendor Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.vendorName}
                onChange={(e) => handleChange("vendorName", e.target.value)}
                placeholder="Enter Vendor Name"
                className={errors.vendorName ? "border-red-500" : ""}
              />
              {errors.vendorName && (
                <p className="text-red-500 text-sm">{errors.vendorName}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Vendor Type</label>
              <Input
                value={formData.vendorType}
                onChange={(e) => handleChange("vendorType", e.target.value)}
                placeholder="Enter Vendor Type"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter Email"
                type="email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <div className="border rounded-lg p-1.5">
                <PhoneInput
                  value={formData.phone || ""}
                  onChange={(value) => handleChange("phone", value)}
                  defaultCountry="CA"
                  international
                  withCountryCallingCode
                  placeholder="+1 (XXX) XXX-XXXX"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Fax</label>
              <Input
                value={formData.fax}
                onChange={(e) => handleChange("fax", e.target.value)}
                placeholder="Enter Fax"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Website</label>
              <Input
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="Enter Website"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Vendor Owner</label>
              <Select
                value={formData.vendorOwner}
                onValueChange={(v) => handleChange("vendorOwner", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Vendor Owner" />
                </SelectTrigger>
                <SelectContent>
                  {ownerOptions.map((owner) => (
                    <SelectItem
                      key={owner.ROWID}
                      value={owner.ROWID.toString()}
                    >
                      {owner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Referred By - Client
              </label>
              <Select
                value={formData.referredBy}
                onValueChange={(v) => handleChange("referredBy", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Referrer" />
                </SelectTrigger>
                <SelectContent>
                  {contactOptions.map((contact) => (
                    <SelectItem
                      key={contact.ROWID}
                      value={contact.ROWID.toString()}
                    >
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Exchange Rate <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.exchangeRate}
                onChange={(e) => handleChange("exchangeRate", e.target.value)}
                placeholder="Enter Exchange Rate"
                type="number"
                className={errors.exchangeRate ? "border-red-500" : ""}
              />
              {errors.exchangeRate && (
                <p className="text-red-500 text-sm">{errors.exchangeRate}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact</label>
              <Input
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                placeholder="Enter Contact"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Currency <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                placeholder="Enter Currency"
                className={errors.currency ? "border-red-500" : ""}
              />
              {errors.currency && (
                <p className="text-red-500 text-sm">{errors.currency}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 1 - Address Info */}
      {currentStep === 1 && (
        <div className="w-full rounded-2xl border mt-4 px-6 py-5 flex flex-col">
          <div className="text-lg font-semibold mb-4">Address Information</div>
          {/* First row: Street, City, State */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Street</label>
              <Input
                name="street"
                value={formData.street || ""}
                onChange={(e) => handleChange("street", e.target.value)}
                placeholder="Street"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">City</label>
              <Input
                name="city"
                value={formData.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">State</label>
              <Input
                name="state"
                value={formData.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="State"
              />
            </div>
          </div>
          {/* Second row: Postal Code, Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1 font-medium">Postal Code</label>
              <Input
                name="postalCode"
                value={formData.postalCode || ""}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="Postal Code"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Country</label>
              <Input
                name="country"
                value={formData.country || ""}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      )}
    </FormPageLayout>
  );
};

export default VendorForm;
