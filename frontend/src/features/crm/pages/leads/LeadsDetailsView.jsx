import { FormCard } from "@/components/custom/CustomFormComponents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateLead, updateLeadInList } from "@/redux/slices/leads/leadsSlice";
import LeadActivityList from "./relatedList/leadActivity/LeadActivityList";
import LeadForm from "./LeadForm";
import LeadAdvisorForm from "../advisor/LeadAdvisorForm";
import LeadInformation from "./leadFormComponents/LeadInformation";
import DescriptionInfo from "./leadFormComponents/DescriptionInfo";
import FamilyTree from "./leadFormComponents/FamilyTree";
import AddressInformation from "./leadFormComponents/AddressInformation";
import UMTDetails from "./leadFormComponents/UMTDetails";
import FestivalForm from "./leadFormComponents/FestivalForm";
import ServiceRequestDetails from "./leadFormComponents/ServiceRequestDetails";
import AdvisorLeadInformation from "../advisor/leadAdvisorFormComponents/LeadInformation";
import AdvisorDescriptonInfo from "../advisor/leadAdvisorFormComponents/DescriptonInfo";
import AdvisorFamilyTree from "../advisor/leadAdvisorFormComponents/FamilyTree";
import AdvisorAddressInformation from "../advisor/leadAdvisorFormComponents/AddressInformation";
import AdvisorUMTDetails from "../advisor/leadAdvisorFormComponents/UMTDetails";
import AdvisorFestivalForm from "../advisor/leadAdvisorFormComponents/FestivalForm";
import AdvisorServiceRequestDetails from "../advisor/leadAdvisorFormComponents/ServiceRequestDetails";
import AdvisorLeadManagementInformation from "../advisor/leadAdvisorFormComponents/LeadManagementInformation";
import Notes from "@/utils/commonRelatedList/notes/Notes";
import Attachment from "@/utils/commonRelatedList/comms/Attachments";
import Whatsapp from "@/utils/commonRelatedList/comms/Whatsapp";
import Email from "@/utils/commonRelatedList/comms/Email";
import SMS from "@/utils/commonRelatedList/comms/SMS";
import ReferralClient from "@/utils/commonRelatedList/referralClient/ReferralClient";
import Compagion from "@/utils/commonRelatedList/compagions/Compagion";
import ReferralLead from "@/utils/commonRelatedList/referralLead/ReferralLead";
import Offering from "@/utils/commonRelatedList/offerings/Offering";
import RemoteAssist from "@/utils/commonRelatedList/remoteAssist/RemoteAssist";
import RingCentralCMS from "@/utils/commonRelatedList/ringCentralCMS/RingCentralCMS";
import SessionRecording from "@/utils/commonRelatedList/sessionRecording/SessionRecording";
import RingCentralWidget from "@/utils/commonRelatedList/ringCentralWidget/RingCentralWidget";
import ZohoSalesIQ from "@/utils/commonRelatedList/zohoSalesIQ/ZohoSalesIQ";
import ZohoSurvey from "@/utils/commonRelatedList/zohoSurvey/ZohoSurvey";
import OpenActivity from "@/utils/commonRelatedList/openActivity/OpenActivity";
import CloseActivity from "@/utils/commonRelatedList/closeActivity/CloseActivity";
import { EllipsisVertical } from "lucide-react";

const LeadsDetailsView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [newComment, setNewComment] = useState("");
  const details = location.state;
  console.log("details",details);
  const layout = details.layoutName || "advisor"; 
  const [activeTab, setActiveTab] = useState("overview");
  const [dynamicTabValue, setDynamicTabValue] = useState("open-activity");
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "trigya.demo5inn",
      time: "11 SEP 2025 08:14 AM",
      text: "dfdfdfdfdfdfdfefdfdfdfdfdfdfdfdfd",
    },
    {
      id: 2,
      user: "trigya.demo5inn",
      time: "11 SEP 2025 08:14 AM",
      text: "sdsdsd",
    },
  ]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newItem = {
      id: Date.now(),
      user: "trigya.demo5inn",
      time: new Date().toLocaleString(),
      text: newComment,
    };
    setComments([...comments, newItem]);
    setNewComment("");
    const editableDiv = document.querySelector('[contenteditable="true"]');
    if (editableDiv) editableDiv.innerHTML = "";
  };
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    setComments(comments.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  const [formData, setFormData] = useState({
    leadName: "",
    title: "",
    // leadSource: "",
    // leadStatus: "",
    createdBy: "",
    // leadOwner: "",
    phone: "",
    mobile: "",
    email: "",
    companyName: "",
    website: "",
    industry: "",
    currency: "",
    exchangeRate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    closingDate: "",
    pipeline: "",
    amount: "",
    description: "",
    firstName: "",
    lastName: "",
    buildingNumber: "",
    officeNumber: "",
  });

  useEffect(() => {
    if (details) {
      const initialData = {
        ...details,
        firstName: details.firstName ?? "",
        lastName: details.lastName ?? "",
        buildingNumber: details.buildingNumber ?? "",
        officeNumber: details.officeNumber ?? "",
        company: details.company?.ROWID ?? "",
        contactOwner: details.contactOwner?.ROWID ?? "",
        leadName: details.leadName ?? "",
        title: details.title ?? "",
        // leadSource: details.leadSource ?? "",
        // leadStatus: details.leadStatus ?? "",
        createdBy: details.createdBy ?? "",
        // leadOwner: details.leadOwner ?? "",
        phone: details.phone ?? "",
        mobile: details.mobile ?? "",
        email: details.email ?? "",
        companyName: details.companyName ?? "",
        website: details.website ?? "",
        industry: details.industry ?? "",
        currency: details.currency ?? "",
        exchangeRate: details.exchangeRate ?? "",
        street: details.street ?? "",
        city: details.city ?? "",
        state: details.state ?? "",
        zipCode: details.zipCode ?? "",
        country: details.country ?? "",
        closingDate: details.closingDate ?? "",
        pipeline: details.pipeline ?? "",
        amount: details.amount ?? "",
        description: details.description ?? "",
      };
      setFormData(initialData);
      setOriginalFormData(initialData);
      console.log(details, "details from location state");
    }
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setShowUpdateBtn(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await dispatch(updateLead({ id: details.ROWID, data: formData }));
      dispatch(updateLeadInList({ id: details.ROWID, data: formData }));
      setOriginalFormData(formData);
      setShowUpdateBtn(false);
      setIsDisabled(true);
      toast.success("Lead updated successfully");
    } catch (error) {
      toast.error("Failed to update lead");
    } finally {
      setLoading(false);
    }
  };

  const handleClearChanges = () => {
    setFormData(originalFormData);
    setShowUpdateBtn(false);
    setIsDisabled(true);
  };

  // Labels for fixed tabs
  const fixedTabs = [
    { value: "overview", label: "Overview" },
    { value: "conversations", label: `Conversations (${comments.length})` },
    { value: "attachments", label: "Attachments" },
    // { value: "activity", label: "Tasks" },
    { value: "comms", label: "Comms" },
    { value: "referralLead", label: "Referral Lead" },
    { value: "referralClient", label: "Referral Client" },
    { value: "offering", label: "Offering" },
  ];

  // Options for dropdown that controls the 5th tab dynamically
  const dynamicOptions = [
    // { value: "referral-lead", label: "Referral Lead" },
    // { value: "referral-client", label: "Referral Client" },
    // { value: "offering", label: "Offering" },
    { value: "open-activity", label: "Open Activity" },
    { value: "campaign", label: "Campaign" },
    { value: "remote-assist", label: "Remote Assist" },
    { value: "ringcentral-sms", label: "RingCentral SMS" },
    { value: "ringcentral-widget", label: "Ring Central Widget" },
    { value: "session-recording", label: "Session Recording" },
    { value: "zoho-sales-iq", label: "ZohoSales IQ" },
    { value: "zoho-survey", label: "Zoho Survey" },
  { value: "close-activity", label: "Close Activity" },

    // add more as needed
  ];

  // Compose tabs: fixed plus dynamic tab at last position
  const allTabs = [
    ...fixedTabs,
    {
      value: dynamicTabValue,
      label:
        dynamicOptions.find((opt) => opt.value === dynamicTabValue)?.label ||
        "Dynamic",
    },
  ];

  // Event when dropdown changes, also activate the dynamic tab
  const handleDropdownChange = (value) => {
    setDynamicTabValue(value);
    setActiveTab(value);
  };
  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex-col justify-start gap-2"
      >
        <div className="flex items-center px-1 lg:px-1">
          <TabsList className="hidden lg:flex">
            {fixedTabs.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
            <TabsTrigger value={dynamicTabValue} className="px-2">
              <Select
                value={dynamicTabValue}
                onValueChange={handleDropdownChange}
              >
                <SelectTrigger className="border-none bg-transparent shadow-none focus:ring-0 w-auto min-w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dynamicOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content for fixed tabs */}
        <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
          <div className="flex justify-between mb-4 gap-2">
         
            <h1 className="text-2xl font-semibold">{layout === "Client" ? "Lead Client Details":"Lead Advisor Details"}</h1>
            {showUpdateBtn ? (
              <div className="flex gap-2">
                <Button
                  loadingText={"Updating..."}
                  loading={loading}
                  onClick={handleUpdate}
                  variant={"primary"}
                  className="mr-2"
                >
                  Update
                </Button>
                <Button onClick={handleClearChanges} variant={"outline"}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsDisabled(false)}
                  variant={"primary"}
                >
                  Edit
                </Button>
                <Button onClick={handleUpdate} variant={"primary"}>
                  Save
                </Button>
              </div>
            )}
          </div>
<<<<<<< HEAD
            {layout === "Client" ? (
       <Accordion
=======
<<<<<<< HEAD
            {layout === "Client" ? (
       <Accordion
=======
          <Accordion
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
            type="multiple"
            className="w-full"
            defaultValue={["lead-information"]}
          >
            <AccordionItem value="lead-information" className="mb-1 ">
              <AccordionTrigger className="text-xl">
                Lead Information
              </AccordionTrigger>
              <AccordionContent>
                <LeadInformation
                  formData={formData}
                  setFormData={setFormData}
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="description-info" className=" mb-1 ">
              <AccordionTrigger className="text-xl">
                Description Info
              </AccordionTrigger>
              <AccordionContent>
                <DescriptionInfo
                  formData={formData}
                  setFormData={setFormData}
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="family-tree" className=" mb-1 ">
              <AccordionTrigger className="text-xl">
                Family Tree
              </AccordionTrigger>
              <AccordionContent>
                <FamilyTree
                  formData={formData}
                  setFormData={setFormData}
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="address-information" className=" mb-1 ">
              <AccordionTrigger className="text-xl">
                Address Information
              </AccordionTrigger>
              <AccordionContent>
                <AddressInformation
                  formData={formData}
                  setFormData={setFormData}
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="umt-details" className=" mb-1 ">
              <AccordionTrigger className="text-xl">
                UMT Details
              </AccordionTrigger>
              <AccordionContent>
                <UMTDetails
                  formData={formData}
                  setFormData={setFormData}
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="festival-form" className="mb-1 ">
              <AccordionTrigger className="text-xl">
                Festival Form
              </AccordionTrigger>
              <AccordionContent>
                <FestivalForm
                  formData={formData}
                  setFormData={setFormData}
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="service-request-details" className="mb-1 ">
              <AccordionTrigger className="text-xl">
                Service Request Details
              </AccordionTrigger>
              <AccordionContent>
                <ServiceRequestDetails
                  formData={formData}
                  setFormData={setFormData}
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
      ) : (
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["lead-information"]}
        >
          <AccordionItem value="lead-information" className="mb-1 ">
            <AccordionTrigger className="text-xl">
              Lead Information
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorLeadInformation
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="description-info" className=" mb-1 ">
            <AccordionTrigger className="text-xl">
              Description Info
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorDescriptonInfo
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="family-tree" className=" mb-1 ">
            <AccordionTrigger className="text-xl">
              Family Tree
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorFamilyTree
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="address-information" className=" mb-1 ">
            <AccordionTrigger className="text-xl">
              Address Information
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorAddressInformation
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="umt-details" className=" mb-1 ">
            <AccordionTrigger className="text-xl">
              UMT Details
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorUMTDetails
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="festival-form" className="mb-1 ">
            <AccordionTrigger className="text-xl">
              Festival Form
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorFestivalForm
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="service-request-details" className="mb-1 ">
            <AccordionTrigger className="text-xl">
              Service Request Details
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorServiceRequestDetails
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="lead-management-information" className="mb-1 ">
            <AccordionTrigger className="text-xl">
              Lead Management Information
            </AccordionTrigger>
            <AccordionContent>
              <AdvisorLeadManagementInformation
                formData={formData}
                setFormData={setFormData}
                isDisabled={isDisabled}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
         
<<<<<<< HEAD
=======
=======
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
        </TabsContent>

        <TabsContent
          value="conversations"
          className="flex flex-col px-2 lg:px-2"
        >
          <div className="flex flex-col gap-4">
            <Notes />
          </div>
        </TabsContent>

        <TabsContent value="edit" className="flex flex-col px-2 lg:px-2">
          <LeadForm />
        </TabsContent>

        <TabsContent value="attachments" className="flex flex-col px-2 lg:px-2">
          <Attachment id={details?.ROWID} />
        </TabsContent>
        <TabsContent value="comms" className="flex flex-col px-2 lg:px-2">
          <Tabs
            value={selectedActionTab}
            onValueChange={setSelectedActionTab}
            className="w-full"
          >
            <TabsList className="flex gap-5">
              <TabsTrigger
                value="whatsapp"
<<<<<<< HEAD
                className="relative border focus:border-[#25D366]  text-xs cursor-pointer"
=======
<<<<<<< HEAD
                className="relative border focus:border-[#25D366]  text-xs cursor-pointer"
              >
                <span className="text-[#25D366]">

                WhatsApp
                </span>
                <Badge
                  variant="secondary"
                  className="ml-2 h-4 w-5 bg-[#25D366] text-white"
=======
                className="relative text-xs cursor-pointer"
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
              >
                <span className="text-[#25D366]">

                WhatsApp
                </span>
                <Badge
                  variant="secondary"
<<<<<<< HEAD
                  className="ml-2 h-4 w-5 bg-[#25D366] text-white"
=======
                  className="ml-2 h-4 w-5 bg-blue-500 text-white"
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                >
                  10
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="sms"
<<<<<<< HEAD
                className="relative text-xs focus:border-blue-400 cursor-pointer"
=======
<<<<<<< HEAD
                className="relative text-xs focus:border-blue-400 cursor-pointer"
              >
                       <span className="focus:text-[#2196F3]">
                SMS</span>
                <Badge
                  variant="secondary"
                  className="ml-2 h-4 w-5 bg-[#2196F3] text-white"
=======
                className="relative text-xs  cursor-pointer"
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
              >
                       <span className="focus:text-[#2196F3]">
                SMS</span>
                <Badge
                  variant="secondary"
<<<<<<< HEAD
                  className="ml-2 h-4 w-5 bg-[#2196F3] text-white"
=======
                  className="ml-2 h-4 w-5 bg-blue-500 text-white"
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                >
                  15
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="email"
<<<<<<< HEAD
                className="relative text-xs focus:border-[#B71C1C] cursor-pointer"
=======
<<<<<<< HEAD
                className="relative text-xs focus:border-[#B71C1C] cursor-pointer"
=======
                className="relative text-xs  cursor-pointer"
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
              >
                Email
                <Badge
                  variant="secondary"
<<<<<<< HEAD
                  className="ml-2 h-4 w-5 bg-[#B71C1C] text-white"
=======
<<<<<<< HEAD
                  className="ml-2 h-4 w-5 bg-[#B71C1C] text-white"
=======
                  className="ml-2 h-4 w-5 bg-blue-500 text-white"
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
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

        <TabsContent
          value="activity"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <LeadActivityList />
        </TabsContent>

        <TabsContent
          value="referralLead"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <ReferralLead />
        </TabsContent>
        <TabsContent
          value="referralClient"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <ReferralClient />
        </TabsContent>
        <TabsContent
          value="offering"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <Offering />
        </TabsContent>

        {/* Content for dynamic tab */}
        <TabsContent value={dynamicTabValue}>
          {/* Render content based on dynamicTabValue */}
          {/* {dynamicTabValue === "referral-lead" && <ReferralLead />}
          {dynamicTabValue === "referral-client" && <ReferralClient />}
          {dynamicTabValue === "offering" && <Offering />} */}
          {dynamicTabValue === "open-activity" && <OpenActivity />}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
          {dynamicTabValue === "close-activity" && <CloseActivity />}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
          {dynamicTabValue === "campaign" && <Compagion />}
          {dynamicTabValue === "remote-assist" && <RemoteAssist />}
          {dynamicTabValue === "ringcentral-sms" && <RingCentralCMS />}
          {dynamicTabValue === "ringcentral-widget" && <RingCentralWidget />}
          {dynamicTabValue === "session-recording" && <SessionRecording />}
          {dynamicTabValue === "zoho-sales-iq" && <ZohoSalesIQ />}
          {dynamicTabValue === "zoho-survey" && <ZohoSurvey />}
<<<<<<< HEAD
          {dynamicTabValue === "close-activity" && <CloseActivity />}
=======
<<<<<<< HEAD
          {dynamicTabValue === "close-activity" && <CloseActivity />}
=======
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
          {/* Add more conditionals as needed */}
        </TabsContent>
      </Tabs>
    </>
  );
};
export default LeadsDetailsView;
