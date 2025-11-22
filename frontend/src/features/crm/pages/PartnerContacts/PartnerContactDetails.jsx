import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Notes from "@/utils/commonRelatedList/notes/Notes";
import Attachment from "@/utils/commonRelatedList/comms/Attachments";
import Whatsapp from "@/utils/commonRelatedList/comms/Whatsapp";
import SMS from "@/utils/commonRelatedList/comms/SMS";
import Email from "@/utils/commonRelatedList/comms/Email";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mail, Phone, Smartphone, MapPin, Users } from "lucide-react";

const PartnerContactDetailsView = () => {
  const location = useLocation();
  const details = location.state;
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");
  const [contactData, setContactData] = useState({
    main: details || {},
    user: details?.user || {},
  });
  const [currentStep, setCurrentStep] = useState(0);

  // Dummy example data for initial state
  const initialFormData = {
    leadName: "Peter Antony",
    email: "peter.antony@example.com",
    status: "Active",
    currency: "USD",
    customerServiceOwner: "Sophia Carter",
    policyAdvisor: "John Dorsey",
    taskName: "Renewal",
    contactMobile: "+91 99999 88888",
    contacts: "alice.smith@example.com",
    exchangeRate: "83.5",
    policies: "Health, Motor",
    groupInsurance: "Yes",
    description: "Long-standing client, key contact for renewal business.",
    birthDate: "1990-02-05",
    createdTime: "2023-01-15",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setShowUpdateBtn(true);
  };

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setIsDisabled(true);
      setShowUpdateBtn(false);
      setLoading(false);
      // Optionally call API here
    }, 800);
  };

  const handleClearChanges = () => {
    setFormData(initialFormData);
    setIsDisabled(true);
    setShowUpdateBtn(false);
  };

  // If fetching API for detail:
  // useEffect(() => { ... });

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex-col justify-start gap-2"
        >
          {/* Responsive tab header */}
          <div className="flex items-center justify-between px-2">
            <Label htmlFor="view-selector" className="sr-only">
              View
            </Label>
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger
                id="view-selector"
                className="flex w-fit lg:hidden"
                size="sm"
              >
                <SelectValue placeholder="Select a view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="attachments">Attachments</SelectItem>
                <SelectItem value="comms">Comms</SelectItem>
              </SelectContent>
            </Select>
            <TabsList className="hidden lg:flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">
                Notes
                <Badge
                  variant="secondary"
                  className="ml-1 h-4 w-5 bg-[#3b7b94] text-white"
                >
                  2
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="attachments">
                Attachments
                <Badge
                  variant="secondary"
                  className="ml-1 h-4 w-5 bg-[#3b7b94] text-white"
                >
                  1
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="comms">
                Comms
                <Badge
                  variant="secondary"
                  className="ml-2 h-4 w-5 bg-[#25D366] text-white"
                >
                  10
                </Badge>
                <Badge
                  variant="secondary"
                  className=" h-4 w-5 bg-[#2196F3] text-white"
                >
                  15
                </Badge>
                <Badge
                  variant="secondary"
                  className=" h-4 w-5 bg-[#B71C1C] text-white"
                >
                  30
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
            {/* --- Stepper --- */}
            <div className="w-full bg-white rounded-2xl border px-6 py-5 flex flex-col">
              <div className="relative flex items-center w-full min-h-[48px]">
                {/* The connector line now runs ONLY between the circles */}
                <div
                  className="absolute left-[calc(50%/steps.length)] right-[calc(50%/steps.length)] top-1/2 h-0.5 bg-gray-300 z-0"
                  style={{
                    left: "calc(50%/2 + 16px)", // Adjust 16px if circle size is different (for w-8 it’s 16px radius)
                    right: "calc(50%/2 + 16px)",
                  }}
                />
                <div className="flex w-full justify-between z-10">
                  {["Partner Information", "Address Information"].map(
                    (step, idx) => (
                      <div
                        className="flex flex-col items-center flex-1 min-w-0"
                        key={typeof step === "string" ? step : step.title}
                      >
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all bg-white
              ${
                currentStep === idx
                  ? "border-blue-500 text-blue-600 font-bold"
                  : "border-gray-300 text-gray-400"
              }
            `}
                          style={{ background: "white" }}
                        >
                          <span className="text-base">{idx + 1}</span>
                        </div>
                        <span
                          className={`mt-2 text-xs text-center font-medium
              ${currentStep === idx ? "text-black" : "text-gray-400"}
            `}
                          style={{ width: "max-content" }}
                        >
                          {typeof step === "string" ? step : step.title}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* --- Step Content --- */}
            {currentStep === 0 && (
              <Card className="shadow-background gap-4 mt-5 px-5 py-4">
                <div className="text-primary mb-4 font-bold text-lg">
                  Partner Contact Information
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Partner Name
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="leadName"
                      value={formData.leadName}
                      onChange={handleChange}
                      placeholder="Enter Partner Name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Email
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Status
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      placeholder="Active/Inactive"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Contact Mobile
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="contactMobile"
                      value={formData.contactMobile}
                      onChange={handleChange}
                      placeholder="Enter Mobile"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Assigned Owner
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="customerServiceOwner"
                      value={formData.customerServiceOwner}
                      onChange={handleChange}
                      placeholder="Assigned Owner"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Group Insurance
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="groupInsurance"
                      value={formData.groupInsurance}
                      onChange={handleChange}
                      placeholder="Yes/No"
                    />
                  </div>
                  <div className="flex flex-col col-span-full">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Description
                    </label>
                    <textarea
                      readOnly={isDisabled}
                      rows={3}
                      className="border p-1 rounded resize-none"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                    />
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 1 && (
              <Card className="shadow-background gap-4 mt-5 px-5 py-4">
                <div className="text-primary mb-4 font-bold text-lg">
                  Address Information
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Street
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Street"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      City
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      State
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Country
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-muted-foreground">
                      Zip Code
                    </label>
                    <input
                      readOnly={isDisabled}
                      className="border p-1 rounded"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 gap-3">
              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 0) setCurrentStep(1);
                  else handleUpdate();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {currentStep === 0 ? "Next" : "Submit"}
              </button>
            </div>
          </TabsContent>

          {/* NOTES */}
          <TabsContent value="notes" className="flex flex-col px-2 lg:px-2">
            <Notes id={contactData.main.ROWID} />
          </TabsContent>

          {/* ATTACHMENTS */}
          <TabsContent
            value="attachments"
            className="flex flex-col px-2 lg:px-2"
          >
            <Attachment id={contactData.main.ROWID} />
          </TabsContent>

          {/* COMMS */}
          <TabsContent value="comms" className="flex flex-col px-2 lg:px-2">
            <Tabs
              value={selectedActionTab}
              onValueChange={setSelectedActionTab}
              className="w-full"
            >
              <TabsList className="flex gap-5">
                <TabsTrigger
                  value="whatsapp"
                  className="relative border focus:border-[#25D366] text-xs cursor-pointer"
                >
                  <span className="text-[#25D366]">WhatsApp</span>
                  <Badge
                    variant="secondary"
                    className="ml-2 h-4 w-5 bg-[#25D366] text-white"
                  >
                    10
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="sms"
                  className="relative text-xs focus:border-blue-400 cursor-pointer"
                >
                  <span className="focus:text-[#2196F3]">SMS</span>
                  <Badge
                    variant="secondary"
                    className="ml-2 h-4 w-5 bg-[#2196F3] text-white"
                  >
                    15
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="email"
                  className="relative text-xs focus:border-[#B71C1C] cursor-pointer"
                >
                  Email
                  <Badge
                    variant="secondary"
                    className="ml-2 h-4 w-5 bg-[#B71C1C] text-white"
                  >
                    30
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="whatsapp">
                <Whatsapp />
              </TabsContent>
              <TabsContent value="sms">
                <SMS />
              </TabsContent>
              <TabsContent value="email">
                <Email />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerContactDetailsView;
