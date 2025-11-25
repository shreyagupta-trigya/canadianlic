import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// removed DropdownMenu + Input in favor of Select-based dropdown like PolicyDetailsView
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';


import {
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

import Notes from "@/utils/commonRelatedList/notes/Notes";
import Attachment from "@/utils/commonRelatedList/comms/Attachments";
import Whatsapp from "@/utils/commonRelatedList/comms/Whatsapp";
import SMS from "@/utils/commonRelatedList/comms/SMS";
import Email from "@/utils/commonRelatedList/comms/Email";
import OpenActivity from "@/utils/commonRelatedList/openActivity/OpenActivity";
import CloseActivity from "@/utils/commonRelatedList/closeActivity/CloseActivity";

import Overview from "./LocationForm";
// import other dynamic components for your modules here as needed

// Main fixed list of visible tabs
const visibleTabs = [
  "Overview",
  "Offerings",
  "Notes",
  "Attachments",
  "Policy",
  "Contacts",
  "Member Locations",
  "Comms"
];

// Additional dropdown options
const extraTabs = [
  { name: "Member Locations", badge: 4 },
  { name: "Leads Listed", badge: 6 },
  { name: "Advisor Leads", badge: 3 },
  { name: "Investment Location", badge: 2 },
];

function LocationDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Overview");
  const [dynamicTabValue, setDynamicTabValue] = useState(extraTabs[0]?.name || "");
  const [formData, setFormData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [counts, setCounts] = useState({
    notes: 0,
    attachments: 0,
  });
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");

  // fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/locations/api/v1/getsinglelocationdata/${id}`);
      if (res.data) setFormData(res.data);
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch" });
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const renderTabLabel = (tab) => {
    if (tab === "Notes") {
      return (
        <span className="flex items-center gap-2">
          Notes
          <Badge className="h-4 w-5 rounded-full bg-[#3b7b94] text-white">
            {counts.notes}
          </Badge>
        </span>
      );
    }

    if (tab === "Attachments") {
      return (
        <span className="flex items-center gap-2">
          Attachments
          <Badge className="h-4 w-5 rounded-full bg-[#3b7b94] text-white">
            {counts.attachments}
          </Badge>
        </span>
      );
    }

    if (tab === "Comms") {
      return (
        <span className="flex items-center gap-2">
          Comms
          <Badge variant="secondary" className="ml-1 h-4 w-5 bg-[#25D366] text-white">10</Badge>
          <Badge variant="secondary" className="ml-1 h-4 w-5 bg-[#2196F3] text-white">15</Badge>
          <Badge variant="secondary" className="ml-1 h-4 w-5 bg-[#B71C1C] text-white">30</Badge>
        </span>
      );
    }

    return tab;
  };

  // Update form logic
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setShowUpdateBtn(true);
  };
  const handleUpdate = () => {
    // validate essential fields
    if (!formData.locationName) {
      setErrors({ locationName: "Location Name required" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setIsDisabled(true);
      setShowUpdateBtn(false);
      setLoading(false);
    }, 800);
  };
  const handleClear = () => {
    fetchData();
    setIsDisabled(true);
    setShowUpdateBtn(false);
    setErrors({});
  };

  // Render content based on tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <Overview
            id={id}
            isDisabled={isDisabled}
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case "Notes":
        return <Notes id={id} />;
      case "Attachments":
        return <Attachment id={id} />;
      case "Policy":
        return <div>Policy details list here</div>;
      case "Contacts":
        return <div>Contacts list here</div>;
      case "Member Locations":
        return <div>Member locations</div>;
      case "Leads Listed":
        return <div>Leads listed</div>;
      case "Advisor Leads":
        return <div>Advisor leads</div>;
      case "Investment Location":
        return <div>Investment location data</div>;
      case "Comms":
        return (
          <Tabs
            value={selectedActionTab}
            onValueChange={setSelectedActionTab}
            className="flex flex-col"
          >
            <TabsList className="flex gap-3">
              <TabsTrigger value="whatsapp" className="text-[#25D366] text-xs cursor-pointer">
                WhatsApp
                <Badge variant="secondary" className="ml-1 h-5 w-6 bg-[#25D366] text-white">10</Badge>
              </TabsTrigger>
              <TabsTrigger value="sms" className="text-[#2196F3] text-xs cursor-pointer">
                SMS
                <Badge variant="secondary" className="ml-1 h-5 w-6 bg-[#2196F3] text-white">15</Badge>
              </TabsTrigger>
              <TabsTrigger value="email" className="text-[#B71C1C] text-xs cursor-pointer">
                Email
                <Badge variant="secondary" className="ml-1 h-5 w-6 bg-[#B71C1C] text-white">30</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="whatsapp" className="h-full overflow-auto mt-2"><Whatsapp /></TabsContent>
            <TabsContent value="sms" className="h-full overflow-auto mt-2"><SMS /></TabsContent>
            <TabsContent value="email" className="h-full overflow-auto mt-2"><Email /></TabsContent>
          </Tabs>
        );
      default:
        // dynamic/fallback tabs
        if (activeTab === "Open Activity") return <OpenActivity id={id} />;
        if (activeTab === "Close Activity") return <CloseActivity id={id} />;
        return null;
    }
  };

  return (
    <div className="card p-4 max-h-[89vh] overflow-auto rounded-md flex flex-col">
      {/* Header row: buttons and dropdown */}
      <nav className="flex justify-between items-center mb-4 border-b pb-2">
        {/* Main tabs */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-col justify-start gap-2">
            <div className="flex items-center justify-between px-1 lg:px-1">
              <Select value={activeTab} onValueChange={setActiveTab} className="lg:hidden">
                <SelectTrigger className="flex w-fit lg:hidden" size="sm">
                  <SelectValue placeholder="Select a view" />
                </SelectTrigger>
                <SelectContent>
                  {visibleTabs.map((tab) => (
                    <SelectItem key={tab} value={tab}>{tab}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <TabsList className="hidden lg:flex">
                {visibleTabs.map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {renderTabLabel(tab)}
                  </TabsTrigger>
                ))}

                <TabsTrigger value={dynamicTabValue} className="px-2">
                  <Select value={dynamicTabValue} onValueChange={(v) => { setDynamicTabValue(v); setActiveTab(v); }}>
                    <SelectTrigger className="border-none bg-transparent shadow-none focus:ring-0 w-auto min-w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {extraTabs.map((t) => (
                        <SelectItem key={t.name} value={t.name} className="flex justify-between items-center">
                          <span>{t.name}</span>
                          {t.badge && (
                            <Badge className="ml-2 bg-[#3b7b94] text-white">{t.badge}</Badge>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        {/* Action buttons */}
        <div className="flex gap-2">
          {!showUpdateBtn ? (
            <Button onClick={() => setIsDisabled(false)} size="sm" variant="default">Edit</Button>
          ) : (
            <>
              <Button onClick={handleUpdate} disabled={loading} size="sm" variant="default">Save</Button>
              <Button onClick={handleClear} size="sm" variant="outline">Cancel</Button>
            </>
          )}
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
            <ArrowLeft size={16} /> Back
          </Button>
        </div>
      </nav>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
    </div>
  );
}

export default LocationDetailView;
