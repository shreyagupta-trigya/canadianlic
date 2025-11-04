import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { renewal, objectType } from "../utils/picklist";

const PolicyReview = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="policy-review">
      <h5 className="main-heading mb-4 ps-2">Review & Renewal</h5>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">Medical Requirement</Label>
          <Select
            value={formData.medicalRequirement || ""}
            onValueChange={(value) => setFormData({ ...formData, medicalRequirement: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {objectType.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Review Comments</Label>
          <Textarea
            name="reviewComments"
            value={formData.reviewComments || ""}
            onChange={handleChange}
            rows="3"
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Comments Updated On</Label>
          <Input
            type="date"
            name="commentsUpdatedOn"
            value={formData.commentsUpdatedOn || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Policy Renewal Date</Label>
          <Input
            type="date"
            name="policyRenewalDate"
            value={formData.policyRenewalDate || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Confirmation Number</Label>
          <Input
            type="text"
            name="confirmationNumber"
            value={formData.confirmationNumber || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Renewal Medical Application Date & Time</Label>
          <Input
            type="datetime-local"
            name="renewalMedicalApplicationDateTime"
            value={formData.renewalMedicalApplicationDateTime || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Reviewed Date</Label>
          <Input
            type="date"
            name="reviewedDate"
            value={formData.reviewedDate || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Policy Expired Date</Label>
          <Input
            type="date"
            name="policyExpiredDate"
            value={formData.policyExpiredDate || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Renewal Completed</Label>
          <Select
            value={formData.renewalCompleted || ""}
            onValueChange={(value) => setFormData({ ...formData, renewalCompleted: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {renewal.map((ren) => (
                <SelectItem key={ren} value={ren}>
                  {ren}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PolicyReview;
