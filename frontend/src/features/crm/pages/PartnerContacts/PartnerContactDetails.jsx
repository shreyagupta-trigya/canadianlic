import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Notes from "@/utils/commonRelatedList/notes/Notes";
import Attachment from "@/utils/commonRelatedList/comms/Attachments";
import Whatsapp from "@/utils/commonRelatedList/comms/Whatsapp";
import SMS from "@/utils/commonRelatedList/comms/SMS";
import Email from "@/utils/commonRelatedList/comms/Email";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PartnerContactDetailsView = () => {
  const location = useLocation();
  const details = location.state;
  const isMobile = useIsMobile();

  const partnerContactOptions = [
    { ROWID: 1, firstName: "John Doe" },
    { ROWID: 2, firstName: "Alice Smith" },
    { ROWID: 3, firstName: "Bob Johnson" },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");
  const [formData, setFormData] = useState({
    partnerContact: "John Doe",
    email: "johndoe@gmail.com",
    partnerContactOwner: "ABC",
    parentPartner: "XYZ",
    street: "Newcastle",
    shipmentStreet: "England",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Standardized handleChange taking name and value
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setShowUpdateBtn(true);
  };

  const handleUpdate = () => {
    const validationErrors = {};
    if (!formData.partnerContact || formData.partnerContact === "") {
      validationErrors.partnerContact = "Partner Contact is required";
    }
    if (!formData.email || formData.email === "") {
      validationErrors.email = "Email is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setIsDisabled(true);
      setShowUpdateBtn(false);
      setLoading(false);
      setErrors({});
      // optionally call API here
    }, 800);
  };

  const handleClearChanges = () => {
    setFormData({
      partnerContact: "John Doe",
      email: "johndoe@gmail.com",
      partnerContactOwner: "ABC",
      parentPartner: "XYZ",
      street: "Newcastle",
      shipmentStreet: "England",
    });
    setIsDisabled(true);
    setShowUpdateBtn(false);
    setErrors({});
  };

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
            {/* Edit/Save buttons */}
            <div className="flex gap-2 ml-4">
              {!showUpdateBtn ? (
                <>
                  <Button onClick={() => setIsDisabled(false)}>Edit</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDisabled(true);
                      handleClearChanges();
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleUpdate} disabled={loading}>
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleClearChanges}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={["partner-info"]}
            >
              <AccordionItem value="partner-info" className="mb-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Partner Contact Information
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="shadow-background gap-4 mt-3 px-5 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Partner Contact */}
                      <div>
                        <label className="block mb-1 font-medium">
                          Partner Contact <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={formData.partnerContact || ""}
                          onValueChange={(value) =>
                            handleChange("partnerContact", value)
                          }
                          disabled={isDisabled}
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
                              <SelectItem
                                key={user.ROWID}
                                value={user.firstName}
                              >
                                {user.firstName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.partnerContact && (
                          <p className="text-red-500 text-sm">
                            {errors.partnerContact}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-1 font-medium">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="email"
                          value={formData.email || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Email"
                          type="email"
                          className={errors.email ? "border-red-500" : ""}
                          disabled={isDisabled}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>

                      {/* Partner Contact Owner */}
                      <div>
                        <label className="block mb-1 font-medium">
                          Partner Contact Owner
                        </label>
                        <Input
                          name="partnerContactOwner"
                          value={formData.partnerContactOwner || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Owner"
                          disabled={isDisabled}
                        />
                      </div>

                      {/* Parent Partner */}
                      <div>
                        <label className="block mb-1 font-medium">
                          Parent Partner
                        </label>
                        <Input
                          name="parentPartner"
                          value={formData.parentPartner || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Parent Partner"
                          disabled={isDisabled}
                        />
                      </div>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="address-info" className="mb-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Address Information
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="shadow-background gap-4 mt-3 px-5 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 font-medium">
                          Billing Street
                        </label>
                        <input
                          name="street"
                          value={formData.street || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Billing Street"
                          readOnly={isDisabled}
                          className="border p-1 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium">
                          Shipping Street
                        </label>
                        <input
                          name="shipmentStreet"
                          value={formData.shipmentStreet || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Shipping Street"
                          readOnly={isDisabled}
                          className="border p-1 rounded w-full"
                        />
                      </div>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* NOTES */}
          <TabsContent value="notes" className="flex flex-col px-2 lg:px-2">
            <Notes id={details?.ROWID} />
          </TabsContent>

          {/* ATTACHMENTS */}
          <TabsContent value="attachments" className="flex flex-col px-2 lg:px-2">
            <Attachment id={details?.ROWID} />
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
