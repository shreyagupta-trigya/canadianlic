import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  clientFirstPolicyOptions,
  applicationMedicalRequirementOptions,
  approvalRatingOptions,
} from "@/utils/picklist";

const PolicyDetails = ({ formData, setFormData, onNext, onPrev, isDisabled }) => {
  console.log("Policy Details formData:", formData.layout);
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (field, date) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, policyAttachmentLink: file });
    }
  };

  return (
    <div className="space-y-6">
      {/* Travel Layout */}
    {formData.layout !== "Life Policies" && (
    <Card>
      <CardHeader>
        <CardTitle>Travel Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <h5 className="main-heading ps-2 mb-4">Policy Tracking - Application</h5>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/** Application Initiated On */}
            <div>
              <Label className="mb-2">Application Initiated On</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.applicationInitiatedOn ? format(formData.applicationInitiatedOn, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.applicationInitiatedOn}
                    onSelect={(date) => handleDateChange("applicationInitiatedOn", date)}
                    initialFocus
                    disabled={isDisabled}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/** Application Submitted On */}
            <div>
              <Label className="mb-2">Application Submitted On</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.applicationSubmittedOn ? format(formData.applicationSubmittedOn, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.applicationSubmittedOn}
                    onSelect={(date) => handleDateChange("applicationSubmittedOn", date)}
                    initialFocus
                    disabled={isDisabled}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/** Policy Issued Date */}
            <div>
              <Label className="mb-2">Policy Issued Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.policyIssuedDate ? format(formData.policyIssuedDate, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.policyIssuedDate}
                    onSelect={(date) => handleDateChange("policyIssuedDate", date)}
                    initialFocus
                    disabled={isDisabled}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/** Policy Start Date */}
            <div>
              <Label className="mb-2">Policy Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.policyStartDate ? format(formData.policyStartDate, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.policyStartDate}
                    onSelect={(date) => handleDateChange("policyStartDate", date)}
                    initialFocus
                    disabled={isDisabled}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/** New Policy Start Date */}
            <div>
              <Label className="mb-2">New Policy Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.newPolicyStartDate ? format(formData.newPolicyStartDate, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.newPolicyStartDate}
                    onSelect={(date) => handleDateChange("newPolicyStartDate", date)}
                    initialFocus
                    disabled={isDisabled}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/** Confirmation Policy Start */}
            <div>
              <Label className="mb-2">Confirmation Policy Start?</Label>
              <Select
                value={formData.confirmationPolicyStart}
                onValueChange={(value) => handleChange("confirmationPolicyStart", value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/** Is Insured Eligible */}
            <div>
              <Label className="mb-2">Is Insured Eligible as of New Date?</Label>
              <Select
                value={formData.insuredEligible}
                onValueChange={(value) => handleChange("insuredEligible", value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/** Meets Medical Criteria */}
            <div>
              <Label className="mb-2">Meets Medical Criteria as of New Date?</Label>
              <Select
                value={formData.medicalCriteria}
                onValueChange={(value) => handleChange("medicalCriteria", value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/** Name of Confirmation */}
            <div>
              <Label className="mb-2">Name of Confirmation</Label>
              <Input
                value={formData.nameOfConfirmation || ""}
                onChange={(e) => handleChange("nameOfConfirmation", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>

            {/** Cancellation Requested For */}
            <div>
              <Label className="mb-2">Cancellation Requested for?</Label>
              <Input
                value={formData.cancellation || ""}
                onChange={(e) => handleChange("cancellation", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>

            {/** Cancellation Completed Date */}
            <div>
              <Label className="mb-2">Cancellation Completed Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.cancellationDate ? format(formData.cancellationDate, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.cancellationDate}
                    onSelect={(date) => handleDateChange("cancellationDate", date)}
                    initialFocus
                    disabled={isDisabled}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/** Attachment */}
            <div>
              <Label className="mb-2">Attachment</Label>
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
)}


      {/* Life Layout */}
     {formData.layout === "Life Policies" && ( 
  <>
    <Card>
      <CardHeader>
        <CardTitle>Life Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <h5 className="main-heading ps-2 mb-4">Policy Tracking - Application</h5>
        <div className="space-y-4">
          {/* Row 1: Dates */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {["applicationInitiatedOn", "applicationSubmittedOn"].map((field) => (
              <div key={field}>
                <Label className="mb-2">{field === "applicationInitiatedOn" ? "Application Initiated On" : "Application Submitted On"}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                      disabled={isDisabled}
                    >
                      {formData[field] ? format(formData[field], "dd/MM/yyyy") : "DD/MM/YYYY"}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData[field]}
                      onSelect={(date) => handleDateChange(field, date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>

          {/* Row 2: Selects & Dates */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div>
              <Label className="mb-2">Application Medical requirement?</Label>
              <Select
                value={formData.applicationMedicalRequirement}
                onValueChange={(value) => handleChange("applicationMedicalRequirement", value)}
                disabled={isDisabled}
              >
                <SelectTrigger className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {applicationMedicalRequirementOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {["nextFollowUpDate", "policyStartDate", "policyIssuedDate"].map((field) => (
              <div key={field}>
                <Label className="mb-2">{field === "nextFollowUpDate" ? "Next Follow Up Date" : field === "policyStartDate" ? "Policy Start Date" : "Policy Issued Date"}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                      disabled={isDisabled}
                    >
                      {formData[field] ? format(formData[field], "dd/MM/yyyy") : "DD/MM/YYYY"}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData[field]}
                      onSelect={(date) => handleDateChange(field, date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>

          {/* Row 3: More Selects & Textareas */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div>
              <Label className="mb-2">Policy Picked Up On</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.policyPickedUpOn ? format(formData.policyPickedUpOn, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.policyPickedUpOn}
                    onSelect={(date) => handleDateChange("policyPickedUpOn", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="mb-2">Premiums Paid during Pick Up Period?</Label>
              <Select
                value={formData.premiumPaidDuringPickUpPeriod}
                onValueChange={(value) => handleChange("premiumPaidDuringPickUpPeriod", value)}
                disabled={isDisabled}
              >
                <SelectTrigger className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2">Amendment Requested Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                    disabled={isDisabled}
                  >
                    {formData.amendmentRequested ? format(formData.amendmentRequested, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.amendmentRequested}
                    onSelect={(date) => handleDateChange("amendmentRequested", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="mb-2">Amendment Requested for?</Label>
              <Textarea
                value={formData.amendmentRequestedFor || ""}
                onChange={(e) => handleChange("amendmentRequestedFor", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>
          </div>

          {/* The same pattern continues for all remaining date fields, selects, and textareas */}
          {/* Make sure each Input/Select/Textarea/Popover button has disabled={isDisabled} and conditional border */}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Policy Review & Renewal</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Repeat same pattern for all review & renewal fields */}
      </CardContent>
    </Card>

    <div className="multisteps-form__content">
      <div className="button-row d-flex justify-content-center mt-4 gap-4 space">
        <button
          className="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
          type="button"
          onClick={onPrev}
          disabled={isDisabled}
        >
          Prev
        </button>
        <button
          className="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
          type="button"
          onClick={onNext}
          disabled={isDisabled}
        >
          Next
        </button>
      </div>
    </div>
  </>
)}

      </div>
  )
}
export default PolicyDetails;

