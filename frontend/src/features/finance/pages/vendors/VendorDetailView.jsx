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

const ownerOptions = [
  { ROWID: 1, name: "John Doe" },
  { ROWID: 2, name: "Jane Doe" },
];

const contactOptions = [
  { ROWID: 1, name: "Client A" },
  { ROWID: 2, name: "Client B" },
];

const VendorDetailView = () => {
  const location = useLocation();
  const details = location.state;
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");
  const [formData, setFormData] = useState({
    vendorName: details?.vendorName ?? "Vendor 1",
    vendorType: details?.vendorType ?? "Type 1",
    email: details?.email ?? "vendor1@example.com",
    phone: details?.phone ?? "1234567890",
    fax: details?.fax ?? "",
    website: details?.website ?? "",
    vendorOwner: details?.vendorOwner ?? "John Doe",
    referredBy: details?.referredBy ?? "Client A",
    exchangeRate: details?.exchangeRate ?? "",
    currency: details?.currency ?? "",
    street: details?.street ?? "Billing Street",
    shipmentStreet: details?.shipmentStreet ?? "Shipping Street",
    city: details?.city ?? "",
    state: details?.state ?? "",
    postalCode: details?.postalCode ?? "",
    country: details?.country ?? "",
    contact: details?.contact ?? "",
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
    if (!formData.vendorName || formData.vendorName === "") {
      validationErrors.vendorName = "Vendor Name is required";
    }
    if (!formData.exchangeRate || formData.exchangeRate === "") {
      validationErrors.exchangeRate = "Exchange Rate is required";
    }
    if (!formData.currency || formData.currency === "") {
      validationErrors.currency = "Currency is required";
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
      // Optionally call update API here
    }, 800);
  };

  const handleClearChanges = () => {
    setFormData({
      vendorName: details?.vendorName ?? "Vendor 1",
      vendorType: details?.vendorType ?? "Type 1",
      email: details?.email ?? "vendor1@example.com",
      phone: details?.phone ?? "1234567890",
      fax: details?.fax ?? "",
      website: details?.website ?? "",
      vendorOwner: details?.vendorOwner ?? "John Doe",
      referredBy: details?.referredBy ?? "Client A",
      exchangeRate: details?.exchangeRate ?? "",
      currency: details?.currency ?? "",
      street: details?.street ?? "Billing Street",
      shipmentStreet: details?.shipmentStreet ?? "Shipping Street",
      city: details?.city ?? "",
      state: details?.state ?? "",
      postalCode: details?.postalCode ?? "",
      country: details?.country ?? "",
      contact: details?.contact ?? "",
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
              <SelectTrigger id="view-selector" className="flex w-fit lg:hidden" size="sm">
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
                <Badge variant="secondary" className="ml-1 h-4 w-5 bg-[#3b7b94] text-white">2</Badge>
              </TabsTrigger>
              <TabsTrigger value="attachments">
                Attachments
                <Badge variant="secondary" className="ml-1 h-4 w-5 bg-[#3b7b94] text-white">1</Badge>
              </TabsTrigger>
              <TabsTrigger value="comms">
                Comms
                <Badge variant="secondary" className="ml-2 h-4 w-5 bg-[#25D366] text-white">10</Badge>
                <Badge variant="secondary" className=" h-4 w-5 bg-[#2196F3] text-white">15</Badge>
                <Badge variant="secondary" className=" h-4 w-5 bg-[#B71C1C] text-white">30</Badge>
              </TabsTrigger>
            </TabsList>
            {/* Edit/Save buttons */}
            <div className="flex gap-2 ml-4">
              {!showUpdateBtn ? (
                <>
                  <Button onClick={() => setIsDisabled(false)}>Edit</Button>
                  <Button
                    variant="outline"
                    onClick={handleClearChanges}
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
            <Accordion type="multiple" className="w-full" defaultValue={["vendor-info"]}>
              <AccordionItem value="vendor-info" className="mb-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Vendor Information
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="shadow-background gap-4 mt-3 px-5 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Vendor Name */}
                      <div>
                        <label className="block mb-1 font-medium">
                          Vendor Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="vendorName"
                          value={formData.vendorName || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Vendor Name"
                          className={errors.vendorName ? "border-red-500" : ""}
                          disabled={isDisabled}
                        />
                        {errors.vendorName && (
                          <p className="text-red-500 text-sm">{errors.vendorName}</p>
                        )}
                      </div>

                      {/* Vendor Type */}
                      <div>
                        <label className="block mb-1 font-medium">Vendor Type</label>
                        <Input
                          name="vendorType"
                          value={formData.vendorType || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Vendor Type"
                          disabled={isDisabled}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-1 font-medium">Email</label>
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

                      {/* Phone */}
                      <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <Input
                          name="phone"
                          value={formData.phone || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Phone"
                          disabled={isDisabled}
                        />
                      </div>

                      {/* Fax */}
                      <div>
                        <label className="block mb-1 font-medium">Fax</label>
                        <Input
                          name="fax"
                          value={formData.fax || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Fax"
                          disabled={isDisabled}
                        />
                      </div>

                      {/* Website */}
                      <div>
                        <label className="block mb-1 font-medium">Website</label>
                        <Input
                          name="website"
                          value={formData.website || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Website"
                          disabled={isDisabled}
                        />
                      </div>

                      {/* Vendor Owner */}
                      <div>
                        <label className="block mb-1 font-medium">Vendor Owner</label>
                        <Select
                          value={formData.vendorOwner || ""}
                          onValueChange={(value) =>
                            handleChange("vendorOwner", value)
                          }
                          disabled={isDisabled}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Vendor Owner" />
                          </SelectTrigger>
                          <SelectContent>
                            {ownerOptions.map((owner) => (
                              <SelectItem
                                key={owner.ROWID}
                                value={owner.name}
                              >
                                {owner.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Referred By - Client */}
                      <div>
                        <label className="block mb-1 font-medium">Referred By - Client</label>
                        <Select
                          value={formData.referredBy || ""}
                          onValueChange={(value) =>
                            handleChange("referredBy", value)
                          }
                          disabled={isDisabled}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Referrer" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactOptions.map((contact) => (
                              <SelectItem key={contact.ROWID} value={contact.name}>
                                {contact.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Exchange Rate */}
                      <div>
                        <label className="block mb-1 font-medium">
                          Exchange Rate <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="exchangeRate"
                          value={formData.exchangeRate || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Exchange Rate"
                          type="number"
                          className={errors.exchangeRate ? "border-red-500" : ""}
                          disabled={isDisabled}
                        />
                        {errors.exchangeRate && (
                          <p className="text-red-500 text-sm">{errors.exchangeRate}</p>
                        )}
                      </div>

                      {/* Currency */}
                      <div>
                        <label className="block mb-1 font-medium">
                          Currency <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="currency"
                          value={formData.currency || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Enter Currency"
                          className={errors.currency ? "border-red-500" : ""}
                          disabled={isDisabled}
                        />
                        {errors.currency && (
                          <p className="text-red-500 text-sm">{errors.currency}</p>
                        )}
                      </div>

                      {/* Contact */}
                      <div>
                        <label className="block mb-1 font-medium">Contact</label>
                        <Input
                          name="contact"
                          value={formData.contact || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Contact"
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Street */}
                      <div>
                        <label className="block mb-1 font-medium">Street</label>
                        <Input
                          name="street"
                          value={formData.street || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Billing Street"
                          disabled={isDisabled}
                        />
                      </div>
                      {/* City */}
                      <div>
                        <label className="block mb-1 font-medium">City</label>
                        <Input
                          name="city"
                          value={formData.city || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="City"
                          disabled={isDisabled}
                        />
                      </div>
                      {/* State */}
                      <div>
                        <label className="block mb-1 font-medium">State</label>
                        <Input
                          name="state"
                          value={formData.state || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="State"
                          disabled={isDisabled}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {/* Postal Code */}
                      <div>
                        <label className="block mb-1 font-medium">Postal Code</label>
                        <Input
                          name="postalCode"
                          value={formData.postalCode || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Postal Code"
                          disabled={isDisabled}
                        />
                      </div>
                      {/* Country */}
                      <div>
                        <label className="block mb-1 font-medium">Country</label>
                        <Input
                          name="country"
                          value={formData.country || ""}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          placeholder="Country"
                          disabled={isDisabled}
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
                  <Badge variant="secondary" className="ml-2 h-4 w-5 bg-[#25D366] text-white">
                    10
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="sms"
                  className="relative text-xs focus:border-blue-400 cursor-pointer"
                >
                  <span className="focus:text-[#2196F3]">SMS</span>
                  <Badge variant="secondary" className="ml-2 h-4 w-5 bg-[#2196F3] text-white">
                    15
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="email"
                  className="relative text-xs focus:border-[#B71C1C] cursor-pointer"
                >
                  Email
                  <Badge variant="secondary" className="ml-2 h-4 w-5 bg-[#B71C1C] text-white">
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

export default VendorDetailView;
