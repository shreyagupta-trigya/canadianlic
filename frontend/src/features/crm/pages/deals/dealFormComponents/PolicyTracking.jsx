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
import { medicalNeeds, rating, objectType } from "../utils/picklist";

const PolicyTracking = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="policy-tracking">
      <h5 className="main-heading mb-4 ps-2">Policy Tracking</h5>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">Initiated Date</Label>
          <Input
            type="date"
            name="initiatedDate"
            value={formData.initiatedDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Next Follow Up Date</Label>
          <Input
            type="date"
            name="nextFollowUpDate"
            value={formData.nextFollowUpDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Amendment Requested Date</Label>
          <Input
            type="date"
            name="amendmentRequestedDate"
            value={formData.amendmentRequestedDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Amendment Requested For</Label>
          <Textarea
            name="amendmentRequestedFor"
            value={formData.amendmentRequestedFor || ""}
            onChange={handleChange}
            rows="1"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Application Medical Requirement</Label>
          <Select
            value={formData.applicationMedicalRequirement || ""}
            onValueChange={(value) => setFormData({ ...formData, applicationMedicalRequirement: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {medicalNeeds.map((need) => (
                <SelectItem key={need} value={need}>
                  {need}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Application Confirmation Number</Label>
          <Input
            type="text"
            name="applicationConfirmationNumber"
            value={formData.applicationConfirmationNumber || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Amendment Completed Date</Label>
          <Input
            type="date"
            name="amendmentCompletedDate"
            value={formData.amendmentCompletedDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Application Medical Appointment Date & Time</Label>
          <Input
            type="datetime-local"
            name="applicationMedicalAppointmentDateTime"
            value={formData.applicationMedicalAppointmentDateTime || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Application Cancelled</Label>
          <Select
            value={formData.applicationCancelled || ""}
            onValueChange={(value) => setFormData({ ...formData, applicationCancelled: value })}
          >
            <SelectTrigger>
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
          <Label className="my-0">Application Postponed</Label>
          <Select
            value={formData.applicationPostponed || ""}
            onValueChange={(value) => setFormData({ ...formData, applicationPostponed: value })}
          >
            <SelectTrigger>
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
          <Label className="my-0">Policy Declined Date</Label>
          <Input
            type="date"
            name="policyDeclinedDate"
            value={formData.policyDeclinedDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Policy Approved Date</Label>
          <Input
            type="date"
            name="policyApprovedDate"
            value={formData.policyApprovedDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Policy Declined Reason</Label>
          <Textarea
            name="policyDeclinedReason"
            value={formData.policyDeclinedReason || ""}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Approval Rating</Label>
          <Select
            value={formData.approvalRating || ""}
            onValueChange={(value) => setFormData({ ...formData, approvalRating: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {rating.map((rate) => (
                <SelectItem key={rate} value={rate}>
                  {rate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Pickup Period</Label>
          <Select
            value={formData.pickupPeriod || ""}
            onValueChange={(value) => setFormData({ ...formData, pickupPeriod: value })}
          >
            <SelectTrigger>
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
          <Label className="my-0">Start Date</Label>
          <Input
            type="date"
            name="startDate"
            value={formData.startDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Policy Picked Up</Label>
          <Select
            value={formData.policyPickedUp || ""}
            onValueChange={(value) => setFormData({ ...formData, policyPickedUp: value })}
          >
            <SelectTrigger>
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
          <Label className="my-0">Issued Date</Label>
          <Input
            type="date"
            name="issuedDate"
            value={formData.issuedDate || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyTracking;
