import {
  FormCard,
  FormSubHeading,
} from "@/components/custom/CustomFormComponents";
import {
  EditableField,
  EditableSelectField,
} from "@/components/custom/GeneralCustomComponents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  statusOptions,
  ServiceStatusOptions,
  TaskTypeOptions,
} from "./utils/picklist";
import { updateLeadInList } from "@/redux/slices/leads/leadsSlice";
import { updateLead } from "@/services/crm/leadApi";
import {
  Bold,
  Italic,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
  Trash2,
  Underline,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import { LeadsConvertForm } from "./LeadsConvertForm";
// import LeadActivityList from "./relatedList/dealActivity/DealActivityList";
import Notes from "@/utils/commonRelatedList/notes/Notes";
import Attachment from "@/utils/commonRelatedList/comms/Attachments";
import Whatsapp from "@/utils/commonRelatedList/comms/Whatsapp";
import Email from "@/utils/commonRelatedList/comms/Email";
import SMS from "@/utils/commonRelatedList/comms/SMS";
import ZohoSurvey from "@/utils/commonRelatedList/zohoSurvey/ZohoSurvey";
import OpenActivity from "@/utils/commonRelatedList/openActivity/OpenActivity";
import CloseActivity from "@/utils/commonRelatedList/closeActivity/CloseActivity";

const GridEditableField = ({ label, children, className }) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const CustomerServiceDetailView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const details = location.state;
  const [newAttachments, setNewAttachments] = React.useState([]);
  const [attachments, setAttachments] = React.useState([]);
  const fileInputRef = React.useRef(null);
  const [activeTab, setActiveTab] = useState("conversations");
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");

  const handleAddAttachment = () => {
    if (newAttachments.length === 0) return;

    const newItems = newAttachments.map((file) => ({
      id: Date.now() + Math.random(),
      file,
    }));

    setAttachments((prev) => [...prev, ...newItems]);
    setNewAttachments([]);
  };

  const [formData, setFormData] = useState({
    currency: "",
    customerServiceOwner: "",
    policyAdvisor: "",
    taskName: "",
    contactMobile: "",
    contacts: "",
    exchangeRate: "",
    policies: "",
    description: "",
    groupInsurance: "",
    status: "",
    updatedpolicymodulezoho: "",
    commentoncontactprofilezoho: "",
    requestbotemailcompanycancelportal: "",
    confirmationreceivedbyus: "",
    confirmationtoclient: "",
    effectivedatematchesonconfirmation: "",
    policyRenewalDate: "",
    policyExpiryDate: "",
    newPolicyRenewalDate: "",
    issuedBy: "",
    renewalCompleted: "",
    renewalFollowUpDate: "",
    newPolicyPremium: "",
  });

  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
  if (details) {
  setFormData({
        ...details,
        currency: details.currency ?? "",
        customerServiceOwner: details.customerServiceOwner ?? "",
        policyAdvisor: details.policyAdvisor ?? "",
        taskName: details.taskName ?? "",
        contactMobile: details.contactMobile ?? "",
        contacts: details.contacts ?? "",
        exchangeRate: details.exchangeRate ?? "",
        policies: details.policies ?? "",
        description: details.description ?? "",
        groupInsurance: details.groupInsurance ?? "",
        status: details.status ?? "",
        updatedpolicymodulezoho: details.updatedpolicymodulezoho ?? "",
        commentoncontactprofilezoho: details.commentoncontactprofilezoho ?? "",
        requestbotemailcompanycancelportal: details.requestbotemailcompanycancelportal ?? "",
        confirmationreceivedbyus: details.confirmationreceivedbyus ?? "",
        confirmationtoclient: details.confirmationtoclient ?? "",
        effectivedatematchesonconfirmation: details.effectivedatematchesonconfirmation ?? "",
        policyRenewalDate: details.policyRenewalDate ?? "",
        policyExpiryDate: details.policyExpiryDate ?? "",
        newPolicyRenewalDate: details.newPolicyRenewalDate ?? "",
        issuedBy: details.issuedBy ?? "",
        renewalCompleted: details.renewalCompleted ?? "",
        renewalFollowUpDate: details.renewalFollowUpDate ?? "",
        newPolicyPremium: details.newPolicyPremium ?? "",
      });
      console.log(details, "details from location state");
    }
  }, [details]);

  const handleChange = (e) => {
    let finalValue, finalName;

    if (e.target) {
      finalValue = e.target.value;
      finalName = e.target.name;
    } else if (typeof e === 'string') {

      const name = e.name;
      const value = e.value;
      finalValue = value;
      finalName = name;
    } else {
      finalValue = e.value;
      finalName = e.name;
    }

    const finalVal = e.target ? e.target.value : e.value || e;
    const finalNam = e.target ? e.target.name : e.name;
    if(finalNam) {
        setFormData((prev) => ({ ...prev, [finalNam]: finalVal }));
        !showUpdateBtn && setShowUpdateBtn(true);
    }
  };

  const handleClearChanges = () => {
    setFormData((prev) => ({
      ...prev,
      ...details,
    }));
    setShowUpdateBtn(false);
    setIsDisabled(true);
  };

  const handleUpdate = () => {
    setLoading(true);
    // Assuming updateCustomerService API exists, similar to updateLead
    // updateCustomerService(formData, details.ROWID)
    //   .then((res) => {
    //     if (res.data.success) {
    //       toast.success("Customer Service Updated Successfully");
    //       // dispatch(updateCustomerServiceInList({ ...formData, ROWID: details.ROWID }));
    //       setShowUpdateBtn(false);
    //       setIsDisabled(true);
    //     } else {
    //       toast.warning(res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(
    //       err?.response?.data?.message ||
    //         err.message ||
    //         "Error Occured during the Customer Service Updation!"
    //     );
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    // For now, simulate update
    setTimeout(() => {
      toast.success("Customer Service Updated Successfully");
      setShowUpdateBtn(false);
      setIsDisabled(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex-col justify-start gap-2"
      >
        <div className="flex items-center justify-between px-1 lg:px-1">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <SelectTrigger
              className="flex w-fit lg:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="conversations">Conversations</SelectItem>
              <SelectItem value="attachments">Attachments</SelectItem>
              <SelectItem value="comms">Comms</SelectItem>
<<<<<<< HEAD
              <SelectItem value="open-activity">Open Activity</SelectItem>
              <SelectItem value="close-activity">Close Activity</SelectItem>
              <SelectItem value="zoho-survey">Zoho Survey</SelectItem>
=======
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
            </SelectContent>
          </Select>
          <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conversations">Conversations ({comments.length})</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="comms">Comms</TabsTrigger>
<<<<<<< HEAD
            <TabsTrigger value="open-activity">Open Activity</TabsTrigger>
            <TabsTrigger value="close-activity">Close Activity</TabsTrigger>
            <TabsTrigger value="zoho-survey">Zoho Survey</TabsTrigger>
=======
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846

          </TabsList>
          <div className="flex items-right gap-2"></div>
        </div>

        <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
            <div className="aspect-video w-full flex-1 rounded-lg">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                    <Card className="@container/card">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                                Customer Service Details
                            </CardTitle>
                            <CardDescription>Task: {formData.taskName}</CardDescription>
                        </CardHeader>
                    </Card>
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                        <Card className="@container/card">
                            <div className="flex-col p-1 mx-4 text-muted-foreground justify-center items-center">
                                <div className="flex">
                                    <Badge variant={"secondary"}>
                                        <Phone />
                                    </Badge>
                                    <p className="ml-2">{formData.contactMobile}</p>
                                </div>
                            </div>
                        </Card>
                        {
                            <Card className="@container/card">
                                <CardHeader>
                                    {showUpdateBtn ? (
                                        <Button
                                            loadingText={"Updating..."}
                                            loading={loading}
                                            onClick={handleUpdate}
                                            variant={"primary"}
                                        >
                                            Update
                                        </Button>
                                    ) : (
                                        <Button
                                            loadingText={"Updating..."}
                                            loading={loading}
                                            onClick={() => setIsDisabled(false)}
                                            variant={"primary"}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    {showUpdateBtn && (
                                        <Button
                                            onClick={handleClearChanges}
                                            variant={"outline"}
                                        >
                                            Cancel Edit
                                        </Button>
                                    )}
                                </CardHeader>
                            </Card>
                        }
                    </div>
                </div>

                {/* Customer Service Information */}
                <Card className={`shadow-background gap-4 mt-5 px-5 py-4`}>
                    <FormSubHeading className="text-primary mb-4">
                        Customer Service Information
                    </FormSubHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        <GridEditableField label="Currency">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.currency}
                                name="currency"
                                onChange={handleChange}
                                placeholder="CAD"
                            />
                        </GridEditableField>

                        <GridEditableField label="Customer Service Owner">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.customerServiceOwner}
                                name="customerServiceOwner"
                                onChange={handleChange}
                                placeholder="Select Owner"
                            />
                        </GridEditableField>

                        <GridEditableField label="Policy Advisor">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.policyAdvisor}
                                name="policyAdvisor"
                                onChange={handleChange}
                                placeholder="Select Advisor"
                            />
                        </GridEditableField>

                        <GridEditableField label="Task Name">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="taskName"
                                value={formData.taskName}
                                onChange={handleChange}
                                options={TaskTypeOptions}
                            />
                        </GridEditableField>
                    </div>
                </Card>

                {/* Contact Information */}
                <Card className="shadow-background gap-4 mt-5 px-5 py-4">
                    <FormSubHeading className="text-primary mb-4">
                        Contact Information
                    </FormSubHeading>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        <GridEditableField label="Contact Mobile">
                            <EditableField
                                readOnly={isDisabled}
                                name="contactMobile"
                                value={formData.contactMobile}
                                onChange={handleChange}
                                type="tel"
                            />
                        </GridEditableField>

                        <GridEditableField label="Contacts">
                            <EditableField
                                readOnly={isDisabled}
                                name="contacts"
                                value={formData.contacts}
                                onChange={handleChange}
                            />
                        </GridEditableField>

                        <GridEditableField label="Exchange Rate">
                            <EditableField
                                readOnly={isDisabled}
                                name="exchangeRate"
                                value={formData.exchangeRate}
                                onChange={handleChange}
                                type="number"
                            />
                        </GridEditableField>

                        <GridEditableField label="Policies">
                            <EditableField
                                readOnly={isDisabled}
                                name="policies"
                                value={formData.policies}
                                onChange={handleChange}
                            />
                        </GridEditableField>

                        <GridEditableField label="Group Insurance">
                            <EditableField
                                readOnly={isDisabled}
                                name="groupInsurance"
                                value={formData.groupInsurance}
                                onChange={handleChange}
                            />
                        </GridEditableField>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-3">
                        <GridEditableField label="Description">
                            <EditableField
                                readOnly={isDisabled}
                                className="w-full"
                                onChange={handleChange}
                                name="description"
                                component={Textarea}
                                value={formData.description}
                            />
                        </GridEditableField>
                    </div>
                </Card>

                {/* Status & Progress */}
                <Card className="shadow-background gap-4 mt-5 px-5 py-4">
                    <FormSubHeading className="text-primary mb-4">
                        Status & Progress
                    </FormSubHeading>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        <GridEditableField label="Status">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                options={statusOptions}
                            />
                        </GridEditableField>

                        <GridEditableField label="Updated Policy Module - ZOHO">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="updatedpolicymodulezoho"
                                value={formData.updatedpolicymodulezoho}
                                onChange={handleChange}
                                options={ServiceStatusOptions}
                            />
                        </GridEditableField>

                        <GridEditableField label="Comment on Contact Profile - ZOHO">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="commentoncontactprofilezoho"
                                value={formData.commentoncontactprofilezoho}
                                onChange={handleChange}
                                options={ServiceStatusOptions}
                            />
                        </GridEditableField>

                        <GridEditableField label="Request BOT/Email Company/Cancel Portal">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="requestbotemailcompanycancelportal"
                                value={formData.requestbotemailcompanycancelportal}
                                onChange={handleChange}
                                options={ServiceStatusOptions}
                            />
                        </GridEditableField>

                        <GridEditableField label="Confirmation Received by us">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="confirmationreceivedbyus"
                                value={formData.confirmationreceivedbyus}
                                onChange={handleChange}
                                options={ServiceStatusOptions}
                            />
                        </GridEditableField>

                        <GridEditableField label="Confirmation to Client">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="confirmationtoclient"
                                value={formData.confirmationtoclient}
                                onChange={handleChange}
                                options={ServiceStatusOptions}
                            />
                        </GridEditableField>

                        <GridEditableField label="Effective Date Matches on Confirmation">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="effectivedatematchesonconfirmation"
                                value={formData.effectivedatematchesonconfirmation}
                                onChange={handleChange}
                                options={ServiceStatusOptions}
                            />
                        </GridEditableField>
                    </div>
                </Card>

                {/* Policy Details */}
                <Card className={`shadow-background gap-4 mt-5 px-5 py-4`}>
                    <FormSubHeading className="text-primary mb-4">
                        Policy Details
                    </FormSubHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        <GridEditableField label="Policy Renewal Date">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.policyRenewalDate}
                                name="policyRenewalDate"
                                onChange={handleChange}
                                type="date"
                            />
                        </GridEditableField>

                        <GridEditableField label="Policy Expiry Date">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.policyExpiryDate}
                                name="policyExpiryDate"
                                onChange={handleChange}
                                type="date"
                            />
                        </GridEditableField>

                        <GridEditableField label="New Policy Renewal Date">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.newPolicyRenewalDate}
                                name="newPolicyRenewalDate"
                                onChange={handleChange}
                                type="date"
                            />
                        </GridEditableField>

                        <GridEditableField label="Issued By">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.issuedBy}
                                name="issuedBy"
                                onChange={handleChange}
                            />
                        </GridEditableField>

                        <GridEditableField label="Renewal Completed">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="renewalCompleted"
                                value={formData.renewalCompleted}
                                onChange={handleChange}
                                options={[
                                    { label: "Yes", value: "Yes" },
                                    { label: "No", value: "No" },
                                ]}
                            />
                        </GridEditableField>

                        <GridEditableField label="Renewal Follow Up Date">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.renewalFollowUpDate}
                                name="renewalFollowUpDate"
                                onChange={handleChange}
                                type="date"
                            />
                        </GridEditableField>

                        <GridEditableField label="New Policy Premium">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.newPolicyPremium}
                                name="newPolicyPremium"
                                onChange={handleChange}
                                type="number"
                            />
                        </GridEditableField>
                    </div>
                </Card>

            </div>
        </TabsContent>

       <TabsContent value="attachments" className="flex flex-col px-2 lg:px-2">
          <Attachment id={details?.ROWID} />
        </TabsContent>

        <TabsContent
          value="conversations"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <Notes />
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
                className="relative border focus:border-[#25D366]  text-xs cursor-pointer"
              >
                <span className="text-[#25D366]">

                WhatsApp
                </span>
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
                       <span className="focus:text-[#2196F3]">
                SMS</span>
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
<<<<<<< HEAD

        <TabsContent
          value="open-activity"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <OpenActivity />
        </TabsContent>

        <TabsContent
          value="close-activity"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <CloseActivity />
        </TabsContent>

        <TabsContent
          value="zoho-survey"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <ZohoSurvey />
        </TabsContent>
=======
{/* 
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
        </TabsContent> */}
{/* 
        <TabsContent
          value="dynamic"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <div className="mb-4">
            <Select value={dynamicTabValue} onValueChange={handleDropdownChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {dynamicOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {dynamicTabValue === "open-activity" && <OpenActivity />}
          {dynamicTabValue === "campaign" && <div>Campaign component here</div>}
          {dynamicTabValue === "remote-assist" && <RemoteAssist />}
          {dynamicTabValue === "ringcentral-sms" && <div>RingCentral SMS component here</div>}
          {dynamicTabValue === "ringcentral-widget" && <RingCentralWidget />}
          {dynamicTabValue === "session-recording" && <SessionRecording />}
          {dynamicTabValue === "zoho-sales-iq" && <ZohoSalesIQ />}
          {dynamicTabValue === "zoho-survey" && <ZohoSurvey />}
          {dynamicTabValue === "close-activity" && <CloseActivity />}
        </TabsContent> */}
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
      </Tabs>
    </>
  );
};
export default CustomerServiceDetailView;
