// import { cn } from "@/lib/utils";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormPageLayout from "@/layout/FormPageLayout";
import { required } from "@/utils/validation/rules";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WarehouseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dataToEdit = location.state;

  const [formData, setFormData] = useState({
    warehouseName: "",
    attention: "",
    street1: "",
    street2: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataToEdit) {
      setFormData(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onCancel = () => {
    navigate(-1);
  };

  const handleSubmit = () => {

    const rules = {
      warehouseName: [required("Warehouse Name is Required")],
      country: [required("Country/Region is Required")],
    };

    const validationErrors = validateComplexForm(formData, rules);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.warning(Object.values(validationErrors)[0]);
      return;
    }
    
    setLoading(true);
    
    // Submit logic would go here
    console.log("Form data:", formData);
    
    setTimeout(() => {
      toast.success("Warehouse Created Successfully!");
      setLoading(false);
    }, 1000);
  };
  
  return (
    <>
      <FormPageLayout
        title="New Warehouse"
        onCancel={onCancel}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <FormCard title="Warehouse Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <FormField label="Warehouse Name">
                <Input
                  className={`${errors?.warehouseName && "border-red-600"}`}
                  value={formData.warehouseName}
                  name="warehouseName"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </FormField>
              
              <FormField label="Attention">
                <Input
                  value={formData.attention}
                  name="attention"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </FormField>
              
              <FormField label="Street 1">
                <Input
                  value={formData.street1}
                  name="street1"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </FormField>
              
              <FormField label="Street 2">
                <Input
                  value={formData.street2}
                  name="street2"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </FormField>
              
              <FormField label="City">
                <Input
                  value={formData.city}
                  name="city"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </FormField>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-6">
              <FormField label="Country/Region" required textRed>
                <Select
                  name="country"
                  value={formData.country}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "country", value },
                      preventDefault: () => {},
                    })
                  }
                >
                  <SelectTrigger
                    className={`${errors?.country && "border-red-600"} w-full`}
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              
              <FormField label="State">
                <Input
                  value={formData.state}
                  name="state"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </FormField>
              
              <FormField label="ZIP Code">
                <Input
                  value={formData.zipCode}
                  name="zipCode"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </FormField>
              
              <FormField label="Phone">
                <Input
                  value={formData.phone}
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                  type="number"
                />
              </FormField>
              
              <FormField label="Email">
                <Input
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                  type="email"
                />
              </FormField>
            </div>
          </div>
        </FormCard>
      </FormPageLayout>
    </>
  );
};

export default WarehouseForm;