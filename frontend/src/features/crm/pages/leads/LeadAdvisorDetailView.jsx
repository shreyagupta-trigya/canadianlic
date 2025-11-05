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
import LeadManagementInformation from "../advisor/leadAdvisorFormComponents/LeadManagementInformation";
import FestivalForm from "../advisor/leadAdvisorFormComponents/FestivalForm";
import ServiceRequestDetails from "../advisor/leadAdvisorFormComponents/ServiceRequestDetails";
import LeadInformation from "../advisor/leadAdvisorFormComponents/LeadInformation";
import Notes from "./utils/Notes";
import Attachment from "./utils/Attachment";
import Whatsapp from "./utils/Whatsapp";
import Email from "./utils/Email";
import SMS from "./utils/SMS";
import ReferralClient from "@/utils/commonRelatedList/referralClient/ReferralClient";
import Compagion from "@/utils/commonRelatedList/compagions/Compagion";
import ReferralLead from "@/utils/commonRelatedList/referralLead/ReferralLead";
import Offering from "@/utils/commonRelatedList/offerings/Offering";
import RemoteAssist from "@/utils/commonRelatedList/remoteAssist/RemoteAssist";
import RingCentralCMS from "@/utils/commonRelatedList/ringCentralCMS/RingCentralCMS";
// import SessionRecording from "@/utils/commonRelatedList/sessionRecording/SessionRecording";
// import RingCentralWidget from "@/utils/commonRelatedList/ringCentralWidget/RingCentralWidget";
// import ZohoSalesIQ from "@/utils/commonRelatedList/zohoSalesIQ/ZohoSalesIQ";
// import ZohoSurvey from "@/utils/commonRelatedList/zohoSurvey/ZohoSurvey";
// import OpenActivity from "@/utils/commonRelatedList/openActivity/OpenActivity";
// import CloseActivity from "@/utils/commonRelatedList/closeActivity/CloseActivity";
import { EllipsisVertical } from "lucide-react";

const LeadAdvisorDetailView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [newComment, setNewComment] = useState("");
  const details = location.state;

  const [activeTab, setActiveTab] = useState("overview");
  const [dynamicTabValue, setDynamicTabValue] = useState("referral-lead");
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});

  // New state variables for Vue migration
  const [mobileView, setMobileView] = useState(window.innerWidth <= 900);
  const [navVisible, setNavVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [selectedActionTab, setSelectedActionTab] = useState("");
  const [isUserVisible, setIsUserVisible] = useState(true);
  const [showInfo1, setShowInfo1] = useState(true);
  const [showInfo2, setShowInfo2] = useState(true);
  const [showInfo3, setShowInfo3] = useState(true);
  const [showInfo4, setShowInfo4] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [items] = useState([
    "send sms",
    "whatsapp chat",
    "reschedule call after 1 day",
    "reschedule call after 2 days",
    "reschedule call after 3 days",
    "reschedule call after 4 days",
    "new appointment",
    "remote assist",
    "send with zoho sign",
    "email booking url",
    "ringcentral sms",
    "closed all activities",
    "settings widget",
    "dialmycallfblife-critical ins",
    "phoneburner",
    "convert to deal",
    "discountedratesandimmigration",
    "supervisa send to bot",
    "send to lda",
    "update phone number",
    "update whatsapp number",
    "convert in advisor leads",
    "get chatgpt response",
    "update call status in leads",
    "create remote assist",
    "stop communication",
    "virtual guru ai call",
  ]);
  const [filteredItems, setFilteredItems] = useState(items);



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
    const editableDiv = document.querySelector(
      '[contenteditable="true"]'
    );
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

  // New useEffect for Vue migration
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

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
  ];

  // Options for dropdown that controls the 5th tab dynamically
  const dynamicOptions = [
    { value: "referral-lead", label: "Referral Lead" },
    { value: "referral-client", label: "Referral Client" },
    { value: "offering", label: "Offering" },
    { value: "open-activity", label: "Open Activity" },
    { value: "close-activity", label: "Close Activity" },
    { value: "campaign", label: "Campaign" },
    { value: "remote-assist", label: "Remote Assist" },
    { value: "ringcentral-sms", label: "RingCentral SMS" },
    { value: "ringcentral-widget", label: "Ring Central Widget" },
    { value: "session-recording", label: "Session Recording" },
    { value: "zoho-sales-iq", label: "ZohoSales IQ" },
    { value: "zoho-survey", label: "Zoho Survey" },
    // add more as needed
  ];

  // Compose tabs: fixed plus dynamic tab at last position
  const allTabs = [...fixedTabs, { value: dynamicTabValue, label: dynamicOptions.find(opt => opt.value === dynamicTabValue)?.label || "Dynamic" }];

  // Event when dropdown changes, also activate the dynamic tab
  const handleDropdownChange = (value) => {
    setDynamicTabValue(value);
    setActiveTab(value);
  };

  // New methods for Vue migration
  const showNav = () => {
    setNavVisible(!navVisible);
  };

  const showUser = () => {
    setIsUserVisible(!isUserVisible);
  };

  const toggleInfo = (info) => {
    if (info === 1) setShowInfo1(!showInfo1);
    if (info === 2) setShowInfo2(!showInfo2);
    if (info === 3) setShowInfo3(!showInfo3);
    if (info === 4) setShowInfo4(!showInfo4);
  };

  const selectTab = (tab) => {
    setSelectedTab(tab);
    setSelectedActionTab("");
  };

  const selectActionTab = (actionTab) => {
    setSelectedActionTab(actionTab);
  };

  const handleItemClick = (item) => {
    console.log("Selected item:", item);
    // Handle quick action item click
  };

  return (
    <>
      <div className="leads-details-view">
      {/* Navbar */}
      <div className={`navbar ${mobileView ? 'mobile' : 'desktop'}`}>
        {mobileView && (
          <div className="mobile-nav-toggle" onClick={showNav}>
            <span>{navVisible ? '✕' : '☰'}</span>
          </div>
        )}
        <div className={`nav-tabs ${navVisible || !mobileView ? 'visible' : 'hidden'}`}>
          <div className={`tab ${selectedTab === 'Overview' ? 'active' : ''}`} onClick={() => selectTab('Overview')}>
            Overview
          </div>
          <div className={`tab ${selectedTab === 'Conversations' ? 'active' : ''}`} onClick={() => selectTab('Conversations')}>
            Conversations <Badge>{comments.length}</Badge>
          </div>
          <div className={`tab ${selectedTab === 'Attachments' ? 'active' : ''}`} onClick={() => selectTab('Attachments')}>
            Attachments
          </div>
          <div className={`tab ${selectedTab === 'Communication' ? 'active' : ''}`} onClick={() => selectTab('Communication')}>
            Comms <Badge>3</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="tab more-tabs">
                More <span>▼</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => selectTab('ReferralLead')}>Referral Lead</DropdownMenuItem>
              <DropdownMenuItem onClick={() => selectTab('ReferralClient')}>Referral Client</DropdownMenuItem>
              <DropdownMenuItem onClick={() => selectTab('Offering')}>Offering</DropdownMenuItem>
              {/* Add more dropdown items */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {selectedTab === 'Communication' && !mobileView && (
          <div className="sub-nav">
            <div className={`sub-tab ${selectedActionTab === 'Whatsapp' ? 'active' : ''}`} onClick={() => selectActionTab('Whatsapp')}>
              WhatsApp <Badge>1</Badge>
            </div>
            <div className={`sub-tab ${selectedActionTab === 'SMS' ? 'active' : ''}`} onClick={() => selectActionTab('SMS')}>
              SMS <Badge>1</Badge>
            </div>
            <div className={`sub-tab ${selectedActionTab === 'Email' ? 'active' : ''}`} onClick={() => selectActionTab('Email')}>
              Email <Badge>1</Badge>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-area">
          {selectedTab === 'Overview' && (
            <div className="overview-content">
              <div className="flex justify-end mb-4 gap-2">
                {showUpdateBtn ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsDisabled(false)}
                      variant={"primary"}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={handleUpdate}
                      variant={"primary"}
                    >
                      Save
                    </Button>
                  </>
                )}
              </div>
              <Accordion type="multiple" className="w-full" defaultValue={["lead-information"]} >
                <AccordionItem value="lead-information" className="mb-1 ">
                  <AccordionTrigger className="text-xl">Lead Information</AccordionTrigger>
                  <AccordionContent >
                    <LeadInformation formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="lead-management-information" className="mb-1 ">
                  <AccordionTrigger className="text-xl">Lead Management Information</AccordionTrigger>
                  <AccordionContent >
                    <LeadManagementInformation formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="festival-form" className=" mb-1 ">
                  <AccordionTrigger className="text-xl">Festival Form</AccordionTrigger>
                  <AccordionContent>
                    <FestivalForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="service-request-details" className=" mb-1 ">
                  <AccordionTrigger className="text-xl">Service Request Details</AccordionTrigger>
                  <AccordionContent>
                    <ServiceRequestDetails formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          {selectedTab === 'Conversations' && <Notes />}
          {selectedTab === 'Attachments' && <Attachment id={details?.ROWID} />}
          {selectedTab === 'Communication' && (
            <div className="communication-content">
              {selectedActionTab === 'Whatsapp' && <Whatsapp />}
              {selectedActionTab === 'SMS' && <SMS />}
              {selectedActionTab === 'Email' && <Email />}
            </div>
          )}
          {selectedTab === 'ReferralLead' && <ReferralLead />}
          {selectedTab === 'ReferralClient' && <ReferralClient />}
          {selectedTab === 'Offering' && <Offering />}
          {/* Add more tab content conditions */}
        </div>

        {/* Right Sidebar */}
        <div className={`right-sidebar ${isUserVisible ? 'visible' : 'hidden'}`}>
          <div className="sidebar-toggle" onClick={showUser}>
            <span>{isUserVisible ? '◀' : '▶'}</span>
          </div>
          <div className="sidebar-content">
            <div className="user-section">
              <h3>User</h3>
              {/* User content */}
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="referrals">
                <AccordionTrigger onClick={() => toggleInfo(3)}>
                  Referrals
                </AccordionTrigger>
                <AccordionContent>
                  {/* Referrals content */}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="policies">
                <AccordionTrigger onClick={() => toggleInfo(4)}>
                  Policies
                </AccordionTrigger>
                <AccordionContent>
                  {/* Policies content */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="quick-actions-btn">
            Quick Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="quick-actions-menu">
          <input
            type="text"
            placeholder="Search actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {filteredItems.map((item, index) => (
            <DropdownMenuItem key={index} onClick={() => handleItemClick(item)}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      {/* Old Tabs Implementation - Keep for now */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-col justify-start gap-2" style={{ display: 'none' }}>
        <div className="flex items-center px-1 lg:px-1">
          <TabsList className="hidden lg:flex">
            {fixedTabs.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
            <TabsTrigger value={dynamicTabValue} className="px-2">
              <Select value={dynamicTabValue} onValueChange={handleDropdownChange}>
                <SelectTrigger className="border-none bg-transparent shadow-none focus:ring-0 w-auto min-w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dynamicOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content for fixed tabs */}
       <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
          <div className="flex justify-end mb-4 gap-2">
            {showUpdateBtn ? (
              <>
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
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsDisabled(false)}
                  variant={"primary"}
                >
                  Edit
                </Button>
                <Button
                  onClick={handleUpdate}
                  variant={"primary"}
                >
                  Save
                </Button>
              </>
            )}
          </div>
          <Accordion type="multiple" className="w-full" defaultValue={["lead-information"]} >
            <AccordionItem value="lead-information" className="mb-1 ">
              <AccordionTrigger className="text-xl">Lead Information</AccordionTrigger>
              <AccordionContent >
                <LeadInformation formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="lead-management-information" className="mb-1 ">
              <AccordionTrigger className="text-xl">Lead Management Information</AccordionTrigger>
              <AccordionContent >
                <LeadManagementInformation formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="festival-form" className=" mb-1 ">
              <AccordionTrigger className="text-xl">Festival Form</AccordionTrigger>
              <AccordionContent>
                <FestivalForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="service-request-details" className=" mb-1 ">
              <AccordionTrigger className="text-xl">Service Request Details</AccordionTrigger>
              <AccordionContent>
                <ServiceRequestDetails formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="conversations" className="flex flex-col px-2 lg:px-2">
          <div className="flex flex-col gap-4">
            <Notes />
            {/* <Whatsapp />
            <Email />
            <SMS /> */}
          </div>
        </TabsContent>

        <TabsContent value="edit" className="flex flex-col px-2 lg:px-2">
          <LeadForm />
        </TabsContent>


        <TabsContent
          value="attachments"
          className="flex flex-col px-2 lg:px-2"
        >
          <Attachment id={details?.ROWID} />
        </TabsContent>

        <TabsContent
          value="activity"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <LeadActivityList />
        </TabsContent>

        {/* Content for dynamic tab */}
        <TabsContent value={dynamicTabValue}>
          {/* Render content based on dynamicTabValue */}
          {dynamicTabValue === "referral-lead" && <ReferralLead />}
          {dynamicTabValue === "referral-client" && <ReferralClient />}
          {dynamicTabValue === "offering" && <Offering />}
          {/* {dynamicTabValue === "open-activity" && <OpenActivity />}
          {dynamicTabValue === "close-activity" && <CloseActivity />} */}
          {dynamicTabValue === "campaign" && <Compagion />}
          {dynamicTabValue === "remote-assist" && <RemoteAssist />}
          {dynamicTabValue === "ringcentral-sms" && <RingCentralCMS />}
          {/* {dynamicTabValue === "ringcentral-widget" && <RingCentralWidget />}
          {dynamicTabValue === "session-recording" && <SessionRecording />}
          {dynamicTabValue === "zoho-sales-iq" && <ZohoSalesIQ />}
          {dynamicTabValue === "zoho-survey" && <ZohoSurvey />} */}
          {/* Add more conditionals as needed */}
        </TabsContent>
      </Tabs>

    </>
  );
};
export default LeadAdvisorDetailView;
