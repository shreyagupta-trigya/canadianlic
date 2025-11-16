import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Notes from "@/utils/commonRelatedList/notes/Notes";
import Attachment from "@/utils/commonRelatedList/comms/Attachments";
import Whatsapp from "@/utils/commonRelatedList/comms/Whatsapp";
import SMS from "@/utils/commonRelatedList/comms/SMS";
import Email from "@/utils/commonRelatedList/comms/Email";
import Offering from "@/utils/commonRelatedList/offerings/Offering";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mail, Phone, Smartphone, MapPin, Bell, Monitor, MailIcon, Users } from "lucide-react";
import axios from "axios";
import { putUrl } from "@/boot/axios";

const OfferingDetailsView = () => {
  const location = useLocation();
  const details = location.state;
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedActionTab, setSelectedActionTab] = useState("whatsapp");
  const [offeringData, setOfferingData] = useState({
    user: {},
    offerings: {},
  });

  useEffect(() => {
    const getAllOfferings = async () => {
      if (details?.ROWID) {
        try {
          const response = await axios.get(`${putUrl}Policy/get-single-offerings/${details.ROWID}`);
          console.log({ response });
          setOfferingData({
            user: response.data.response[0].userData,
            offerings: response.data.response[0]
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (details) {
      getAllOfferings();
    }
  }, [details]);

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-col justify-start gap-2">
          <div className="flex items-center justify-between px-1 lg:px-1">
            <Label htmlFor="view-selector" className="sr-only">View</Label>
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="flex w-fit lg:hidden" size="sm" id="view-selector">
                <SelectValue placeholder="Select a view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="attachments">Attachments</SelectItem>
                <SelectItem value="comms">Comms</SelectItem>
                <SelectItem value="deals">Deals</SelectItem>
                <SelectItem value="clientOffering">Client Offering</SelectItem>
              </SelectContent>
            </Select>
            <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="comms">Comms</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="clientOffering">Client Offering</TabsTrigger>
            </TabsList>
            <div className="flex items-right gap-2"></div>
          </div>

          <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
             <div className="space-y-3">
      {/* Profile Header */}
      <Card className="shadow-sm">
        <CardContent className="flex justify-between items-start p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-bold">
              {(offeringData.user.firstName != (null || undefined)) ? offeringData.user.firstName.slice(0, 1).toUpperCase() + offeringData.user.lastName.slice(0, 1).toUpperCase() : ''}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{offeringData.user.firstName + ' ' + offeringData.user.lastName}</h2>
              <p className="text-sm text-muted-foreground">Offerings</p>
              <div className="mt-2">
                <img
                  src="https://static-00.iconduck.com/assets.00/skype-icon-1024x1024-tdw7b8oe.png"
                  alt="Skype"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          <div className="text-sm space-y-2 text-left">
            <div className="flex items-center justify-end space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{offeringData.user.email}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{offeringData.user.phone}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Smartphone className="w-4 h-4 text-gray-500" />
              <span>{offeringData.user.phone}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{offeringData.user.city}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details and Family Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4 text-sm">
            <div className="flex items-center space-x-2">
              <img
                src="https://static-00.iconduck.com/assets.00/skype-icon-1024x1024-tdw7b8oe.png"
                alt="Skype"
                className="w-4 h-4"
              />
              <span>Skype</span>
            </div>
            <div className="flex items-center space-x-2">
              <span role="img" aria-label="birthday">🎂</span>
              <span>Birthday</span>
            </div>
            <div className="flex items-center space-x-2">
              <span role="img" aria-label="work">💼</span>
              <span>Work anniversary</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
            <Users className="w-8 h-8 text-gray-400" />
            <h3 className="text-sm font-semibold">Create and join new family</h3>
            <p className="text-xs text-muted-foreground">
              Collaborate better with family and keep track of projects you're interested in
            </p>
            <Button size="sm" variant="outline">Explore family</Button>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <p className="text-muted-foreground">
            Manage your notification settings<br />
            We may still send you important notifications about your account and content
            outside of your preferred notification settings.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-gray-500" />
                <span>Desktop Notifications</span>
              </div>
              <Button size="sm">Enable</Button>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <MailIcon className="w-4 h-4 text-gray-500" />
                <span>Email Notifications</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Send me notifications via email when someone...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
          </TabsContent>

          <TabsContent value="notes" className="flex flex-col px-2 lg:px-2">
            <Notes id={details?.ROWID} />
          </TabsContent>

          <TabsContent value="attachments" className="flex flex-col px-2 lg:px-2">
            <Attachment id={details?.ROWID} />
          </TabsContent>

          <TabsContent value="comms" className="flex flex-col px-2 lg:px-2">
            <Tabs value={selectedActionTab} onValueChange={setSelectedActionTab} className="w-full">
              <TabsList className="flex gap-5">
                <TabsTrigger value="whatsapp" className="relative border focus:border-[#25D366] text-xs cursor-pointer">
                  <span className="text-[#25D366]">WhatsApp</span>
                  <Badge variant="secondary" className="ml-2 h-4 w-5 bg-[#25D366] text-white">10</Badge>
                </TabsTrigger>
                <TabsTrigger value="sms" className="relative text-xs focus:border-blue-400 cursor-pointer">
                  <span className="focus:text-[#2196F3]">SMS</span>
                  <Badge variant="secondary" className="ml-2 h-4 w-5 bg-[#2196F3] text-white">15</Badge>
                </TabsTrigger>
                <TabsTrigger value="email" className="relative text-xs focus:border-[#B71C1C] cursor-pointer">
                  Email
                  <Badge variant="secondary" className="ml-2 h-4 w-5 bg-[#B71C1C] text-white">30</Badge>
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

          <TabsContent value="deals" className="flex flex-col px-2" style={{ border: "none" }}>
            {/* Deals component would go here - assuming it exists */}
            <div>Deals Component</div>
          </TabsContent>

          <TabsContent value="clientOffering" className="flex flex-col px-2" style={{ border: "none" }}>
            <Offering />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OfferingDetailsView;
