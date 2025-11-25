import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
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
import PolicyInfo from "./policyFormComponents/PolicyInfo";
import Services from "./policyFormComponents/Services";
import PolicyDetails from "./policyFormComponents/PolicyDetails";
import Claims from "./policyFormComponents/Claims";
import Commission from "./policyFormComponents/Commission";
import History from "./policyFormComponents/History";
import Notes from "@/utils/commonRelatedList/notes/Notes";
import Attachment from "@/utils/commonRelatedList/comms/Attachments";
import Whatsapp from "@/utils/commonRelatedList/comms/Whatsapp";
import Email from "@/utils/commonRelatedList/comms/Email";
import SMS from "@/utils/commonRelatedList/comms/SMS";
import OpenActivity from "@/utils/commonRelatedList/openActivity/OpenActivity";
import CloseActivity from "@/utils/commonRelatedList/closeActivity/CloseActivity";
import ZohoSurvey from "@/utils/commonRelatedList/zohoSurvey/ZohoSurvey";

const PolicyDetailsView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const details = location.state;
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");
  const [dynamicTabValue, setDynamicTabValue] = useState("zoho-survey");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    basicInfo: {},
    services: {},
    policyDetails: {},
    claims: {},
    commission: {},
    history: {},
  });
  const [originalFormData, setOriginalFormData] = useState({
    basicInfo: {},
    services: {},
    policyDetails: {},
    claims: {},
    commission: {},
    history: {},
  });
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);

  useEffect(() => {
    if (details) {
      const transformedData = {
        basicInfo: {
          ...details.policies,
          ...details.supervisaPolicySubDetails,
        },
        services: {
          ...details.policies,
          ...details.supervisaPolicySubDetails,
          OwnerShip: details.policyOwnership || [],
          Beneficiary: details.beneficiary || [],
          Trustee: details.trustees || [],
          ContingentBeneficiary: details.contingentBeneficiary || [],
        },
        policyDetails: { ...details.policySubDetails },
        claims: {
          ...details.policySubDetails,
          ...details.supervisaPolicySubDetails,
          pastClaims: details.pastClaims || [],
        },
        commission: {
          ...details.supervisaPolicySubDetails,
          policyCommission: details.policyCommission || [],
        },
        history: {
          renewalsHistoryData: details.renewalsHistory || [],
        },
      };
      setFormData(transformedData);
      setOriginalFormData(transformedData);
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
      // Assuming update policy API call
      // await dispatch(updatePolicy({ id: details.ROWID, data: formData }));
      toast.success("Policy updated successfully");
      setOriginalFormData(formData);
      setShowUpdateBtn(false);
      setIsDisabled(true);
    } catch (error) {
      toast.error("Failed to update policy");
    } finally {
      setLoading(false);
    }
  };

  const handleClearChanges = () => {
    setFormData(originalFormData);
    setShowUpdateBtn(false);
    setIsDisabled(true);
  };

  // Fixed tabs
  const fixedTabs = [
    { value: "overview", label: "Overview" },
    {
      value: "notes",
      label: (
        <span>
          Notes{" "}
          <Badge className="h-4 w-5 rounded-full bg-[#3b7b94] text-white">
            5
          </Badge>
        </span>
      ),
    },
    {
      value: "attachments",
      label: (
        <span>
          Attachments{" "}
          <Badge className="h-4 w-5 rounded-full bg-[#3b7b94] text-white">
            3
          </Badge>
        </span>
      ),
    },
    {
      value: "comms",
      label: (
        <span>
          Comms{" "}
          <Badge
            variant="secondary"
            className="h-4 w-5 bg-[#25D366] text-white"
          >
            10
          </Badge>
          <Badge
            variant="secondary"
            className="ml-1 h-4 w-5 bg-[#2196F3] text-white"
          >
            15
          </Badge>
          <Badge
            variant="secondary"
            className="ml-1 h-4 w-5 bg-[#B71C1C] text-white"
          >
            30
          </Badge>
        </span>
      ),
    },
    {
      value: "open-activity",
      label: (
        <span>
          Open Activity{" "}
          <Badge className="h-4 w-5 rounded-full bg-[#3b7b94] text-white">
            9
          </Badge>
        </span>
      ),
    },
    {
      value: "close-activity",
      label: (
        <span>
          Closed Activity{" "}
          <Badge className="h-4 w-5 rounded-full bg-[#3b7b94] text-white">
            7
          </Badge>
        </span>
      ),
    },
  ];

  // Dynamic options for dropdown
  const dynamicOptions = [
    {
      value: "zoho-survey",
      label: (
        <span>
          Zoho Survey{" "}
          <Badge className="h-4 w-5 rounded-full bg-[#3b7b94] text-white">
            11
          </Badge>
        </span>
      ),
    },
    // Add more as needed
  ];

  const handleDropdownChange = (value) => {
    setDynamicTabValue(value);
    setActiveTab(value);
  };

  const allTabs = [
    ...fixedTabs,
    {
      value: dynamicTabValue,
      label:
        dynamicOptions.find((opt) => opt.value === dynamicTabValue)?.label ||
        "Dynamic",
    },
  ];

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex-col justify-start gap-2"
      >
        <div className="flex items-center justify-between px-1 lg:px-1">
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
          <div className="flex gap-2">
            {!showUpdateBtn ? (
              <>
                <Button onClick={() => setIsDisabled(false)}>Edit</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDisabled(true), handleUpdate;
                  }}
                  disabled={loading}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleUpdate} disabled={loading}>
                  Update
                </Button>
                <Button variant="outline" onClick={handleClearChanges}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["basic-info"]}
          >
            <AccordionItem value="basic-info" className="mb-1">
              <AccordionTrigger className="text-xl">
                Basic Info
              </AccordionTrigger>
              <AccordionContent>
                <PolicyInfo
                  formData={formData.basicInfo}
                  setFormData={(data) =>
                    setFormData({ ...formData, basicInfo: data })
                  }
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="services" className="mb-1">
              <AccordionTrigger className="text-xl">
                Policy Ownership & Beneficiary Details
              </AccordionTrigger>
              <AccordionContent>
                <Services
                  formData={formData.services}
                  setFormData={(data) =>
                    setFormData({ ...formData, services: data })
                  }
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="policy-details" className="mb-1">
              <AccordionTrigger className="text-xl">
                Policy Tracking
              </AccordionTrigger>
              <AccordionContent>
                <PolicyDetails
                  formData={formData.policyDetails}
                  setFormData={(data) =>
                    setFormData({ ...formData, policyDetails: data })
                  }
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="claims" className="mb-1">
              <AccordionTrigger className="text-xl">Claims</AccordionTrigger>
              <AccordionContent>
                <Claims
                  formData={formData.claims}
                  setFormData={(data) =>
                    setFormData({ ...formData, claims: data })
                  }
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="commission" className="mb-1">
              <AccordionTrigger className="text-xl">
                Commissions
              </AccordionTrigger>
              <AccordionContent>
                <Commission
                  formData={formData.commission}
                  setFormData={(data) =>
                    setFormData({ ...formData, commission: data })
                  }
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="history" className="mb-1">
              <AccordionTrigger className="text-xl">Histories</AccordionTrigger>
              <AccordionContent>
                <History
                  formData={formData.history}
                  setFormData={(data) =>
                    setFormData({ ...formData, history: data })
                  }
                  isDisabled={isDisabled}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="notes" className="flex flex-col px-2 lg:px-2">
          <Notes id={details?.ROWID} />
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

        <TabsContent
          value="open-activity"
          className="flex flex-col px-2 lg:px-2"
        >
          <OpenActivity id={details?.ROWID} />
        </TabsContent>

        <TabsContent
          value="close-activity"
          className="flex flex-col px-2 lg:px-2"
        >
          <CloseActivity />
        </TabsContent>

        <TabsContent value={dynamicTabValue}>
          {dynamicTabValue === "zoho-survey" && <ZohoSurvey />}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PolicyDetailsView;
