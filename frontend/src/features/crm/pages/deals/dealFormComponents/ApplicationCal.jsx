import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ApplicationCal = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="application-cal">
      <h5 className="main-heading mb-4 ps-2">Application Calculation</h5>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">How Many Months Left</Label>
          <Input
            type="number"
            name="howManyMonthsLeft"
            value={formData.howManyMonthsLeft || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Total Policy Commission</Label>
          <Input
            type="number"
            step="0.01"
            name="totalPolicyCommission"
            value={formData.totalPolicyCommission || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Advisor Commission</Label>
          <Input
            type="number"
            step="0.01"
            name="advisorCommision"
            value={formData.advisorCommision || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Net Commission</Label>
          <Input
            type="number"
            step="0.01"
            name="netCommision"
            value={formData.netCommision || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Actual Policy Commission</Label>
          <Input
            type="number"
            step="0.01"
            name="actualPolicyCommision"
            value={formData.actualPolicyCommision || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Return Amount</Label>
          <Input
            type="number"
            step="0.01"
            name="returnAmount"
            value={formData.returnAmount || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Net Advisor Commission</Label>
          <Input
            type="number"
            step="0.01"
            name="netAdvisorCommision"
            value={formData.netAdvisorCommision || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Net Corporate Commission</Label>
          <Input
            type="number"
            step="0.01"
            name="netCorporateCommision"
            value={formData.netCorporateCommision || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Description</Label>
          <Textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows="3"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationCal;
