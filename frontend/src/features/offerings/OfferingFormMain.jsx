import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormPageLayout from "@/layout/FormPageLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { createOffering, updateOffering, getSingleOffering, getUsers } from "@/services/crm/offeringApi";
import { toast } from "react-toastify";

const OfferingFormMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [contactOwnerOptions, setContactOwnerOptions] = useState([]);
  const [formData, setFormData] = useState({
    offeringOwner: "",
    offeringCategory: "",
    offeringType: "",
    description: "",
    productFYCPercent: "",
    corporateBonusPercent: "",
    cancellationChargeType: "",
    offeringName: "",
    insurancePartnerName: "",
    offeringActive: true,
  });
  const [errors, setErrors] = useState({});

  const insuranceOptions = [
    "-None-",
    "Life Insurance",
    "Living Benefits",
    "Health & Dental Insurance",
    "Travel Insurance",
    "Investments",
    "Hybrid Insurance",
    "Loan Protection",
    "Group Insurance",
  ];

  const offeringTypes = [
    "Team Life",
    "Term Universal Life",
    "Permananent Universal LIfe",
    "Whole Life",
    "Participating Whole Life",
    "Non Medical",
    "Travel",
    "Super Visa",
    "Health & Dental",
    "Critical Illness",
    "Disability-Accidental",
    "Disability-illness",
    "Visitor",
    "Business Insurance",
    "Mutual Funds",
    "TFSA",
    "Combination Of Hybrid Insurance",
    "Seg Funds",
    "Annuities",
    "RRSP",
    "RESP",
    "GIC",
    "Saving Account",
    "Pension Account",
    "Pension Plan ",
    "RIF",
    "GIA",
    "Permanent/T100",
    "Hospital Expenses",
    "Accidental Benefits",
    "Rent Insurance",
    "Mortage Insurance",
    "Loan Protection",
    "Credit Protection",
    "Group Life",
    "Group Disability",
    "Group Accidental Benefits",
    "Group Health & Dental",
    "Group travel",
    "Group Eye Care",
    "Group Critical Illness",
    "Group Flexible Plan",
    "International Student",
    "Not Found",
  ];

  const cancellationChargeTypes = [
    "Day Wise",
    "Monthly",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setContactOwnerOptions(res.data.map((item) => item.userData));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (id) {
      const fetchOffering = async () => {
        try {
          const res = await getSingleOffering(id);
          if (res.data && res.data.length > 0) {
            setFormData(res.data[0].offering);
          }
        } catch (error) {
          console.error("Error fetching offering:", error);
        }
      };
      fetchOffering();
    }

    fetchUsers();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // if (!formData.offeringOwner) newErrors.offeringOwner = "Required";
    if (!formData.offeringName) newErrors.offeringName = "Required";
    if (!formData.offeringCategory) newErrors.offeringCategory = "Required";
    if (!formData.insurancePartnerName) newErrors.insurancePartnerName = "Required";
    if (!formData.offeringType) newErrors.offeringType = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await updateOffering(formData, id);
        toast.success("Offering Updated Successfully!");
      } else {
        await createOffering(formData);
        toast.success("Offering Created Successfully!");
      }
      navigate("/crm/offerings");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to save offering");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  return (
    <FormPageLayout
      title={<span className="text-lg font-semibold md:text-2xl">{id ? "Update Offering" : "Create Offering"}</span>}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
      cancelButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
      submitButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
    >
      <div className="space-y-6">
        <FormCard title="Offering Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Offering Owner" required>
              <Select
                value={formData.offeringOwner || ""}
                onValueChange={(value) => handleChange("offeringOwner", value)}
              >
                <SelectTrigger className={`w-full ${errors.offeringOwner ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select Owner" />
                </SelectTrigger>
                <SelectContent>
                  {contactOwnerOptions.map((user) => (
                    <SelectItem key={user.ROWID} value={user.ROWID}>
                      {user.firstName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.offeringOwner && <p className="text-red-500 text-sm">{errors.offeringOwner}</p>}
            </FormField>

            <FormField label="Offering Name" required>
              <Input
                value={formData.offeringName || ""}
                onChange={(e) => handleChange("offeringName", e.target.value)}
                placeholder="Enter Offering Name"
                className={errors.offeringName ? "border-red-500" : ""}
              />
              {errors.offeringName && <p className="text-red-500 text-sm">{errors.offeringName}</p>}
            </FormField>

            <FormField label="Offering Category" required>
              <Select
                value={formData.offeringCategory || ""}
                onValueChange={(value) => handleChange("offeringCategory", value)}
              >
                <SelectTrigger className={`w-full ${errors.offeringCategory ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.offeringCategory && <p className="text-red-500 text-sm">{errors.offeringCategory}</p>}
            </FormField>

            <FormField label="Cancellation Charge Type">
              <Select
                value={formData.cancellationChargeType || ""}
                onValueChange={(value) => handleChange("cancellationChargeType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {cancellationChargeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </FormCard>

        <FormCard title="Product Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Insurance Partner Name" required>
              <Input
                value={formData.insurancePartnerName || ""}
                onChange={(e) => handleChange("insurancePartnerName", e.target.value)}
                placeholder="Enter Partner Name"
                className={errors.insurancePartnerName ? "border-red-500" : ""}
              />
              {errors.insurancePartnerName && <p className="text-red-500 text-sm">{errors.insurancePartnerName}</p>}
            </FormField>

            <FormField label="Product FYC %">
              <Input
                value={formData.productFYCPercent || ""}
                onChange={(e) => handleChange("productFYCPercent", e.target.value)}
                placeholder="Enter FYC %"
                type="number"
              />
            </FormField>

            <FormField label="Corporate Bonus %">
              <Input
                value={formData.corporateBonusPercent || ""}
                onChange={(e) => handleChange("corporateBonusPercent", e.target.value)}
                placeholder="Enter Bonus %"
                type="number"
              />
            </FormField>

            <FormField label="Offering Type" required>
              <Select
                value={formData.offeringType || ""}
                onValueChange={(value) => handleChange("offeringType", value)}
              >
                <SelectTrigger className={`w-full ${errors.offeringType ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {offeringTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.offeringType && <p className="text-red-500 text-sm">{errors.offeringType}</p>}
            </FormField>

            <FormField label="Offering Active">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.offeringActive}
                  onCheckedChange={(checked) => handleChange("offeringActive", checked)}
                />
                <label className="text-sm font-medium">Active</label>
              </div>
            </FormField>
          </div>
        </FormCard>

        <FormCard title="Description Information">
          <FormField label="Description">
            <Textarea
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description..."
              rows={4}
            />
          </FormField>
        </FormCard>
      </div>
    </FormPageLayout>
  );
};

export default OfferingFormMain;
