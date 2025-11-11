import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { putUrl } from "@/boot/axios";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "../../../components/ui/drawer";
<<<<<<< HEAD
import { BiRightArrow } from "react-icons/bi";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
=======
<<<<<<< HEAD
import { BiRightArrow } from "react-icons/bi";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
=======
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846

const RemoteAssistDrawer = ({
  isOpen,
  onClose,
  updateData,
  updateRemoteAssist,
  fetchAdvisorCredentials,
  selectedButton,
  maxWidth = "60%",
  speed = 300,
  backgroundColor = "#fafafa",
}) => {
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    exchangeRate: "",
    sessionType: "",
    dateAndTime: "",
    leadId: "",
    sessionId: "",
    timezoneList: "",
    owner: "",
    currency: "",
    description: "",
    contactId: "",
    digest: "",
    scheduleId: "",
    onDemandSession: false,
    reminder: "None",
  });

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      fetchLead();
      fetchContact();
    }
  }, [isOpen]);

  useEffect(() => {
    if (updateData) {
      setFormData({
        name: updateData.name || "",
        exchangeRate: updateData.exchangeRate || "",
        sessionType: updateData.sessionType || "",
        dateAndTime: updateData.dateAndTime || "",
        leadId: updateData.leadId || "",
        sessionId: updateData.sessionId || "",
        timezoneList: updateData.timezoneList || "",
        owner: updateData.owner || "",
        currency: updateData.currency || "",
        description: updateData.description || "",
        contactId: updateData.contactId || "",
        digest: updateData.digest || "",
        scheduleId: updateData.scheduleId || "",
        onDemandSession: updateData.onDemandSession || false,
        reminder: updateData.reminder || "None",
      });
    }
  }, [updateData]);

  const fetchUsers = async () => {
    // Mock data
    setUsers([
      { ROWID: 1, name: "User 1" },
      { ROWID: 2, name: "User 2" },
    ]);
  };

  const fetchLead = async () => {
    // Mock data
    setLeads([
      { ROWID: 1, name: "Lead 1" },
      { ROWID: 2, name: "Lead 2" },
    ]);
  };

  const fetchContact = async () => {
    // Mock data
    setContacts([
      { ROWID: 1, name: "Contact 1" },
      { ROWID: 2, name: "Contact 2" },
    ]);
  };

  const handleUpdate = async () => {
    try {
      const res = await updateRemoteAssist(formData);
      if (res.data.success) {
        setFormData({
          name: "",
          exchangeRate: "",
          sessionType: "",
          dateAndTime: "",
          leadId: "",
          sessionId: "",
          timezoneList: "",
          owner: "",
          currency: "",
          description: "",
          contactId: "",
          digest: "",
          scheduleId: "",
          onDemandSession: false,
          reminder: "None",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error updating remote assist:", error);
    }
  };

  const submitForm = async () => {
    try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
      const res = await axios.post(
        `${putUrl}canadianlicapi/remote-assist/api/v2/create-remote-access`,
        formData
      );
      console.log("Create response", res);
<<<<<<< HEAD
=======
=======
      const res = await axios.post(`${putUrl}canadianlicapi/remote-assist/api/v2/create-remote-access`, formData);
      console.log('Create response', res);
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
      alert("Remote Access Created Successfully");
      fetchAdvisorCredentials();
      onClose();
    } catch (error) {
<<<<<<< HEAD
      console.error("Error creating remote assist:", error);
      alert("Error creating remote assist");
=======
<<<<<<< HEAD
      console.error("Error creating remote assist:", error);
      alert("Error creating remote assist");
=======
      console.error('Error creating remote assist:', error);
      alert('Error creating remote assist');
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
<<<<<<< HEAD
      <DrawerContent className="w-full max-w-4xl" style={{ backgroundColor }}>
        <DrawerHeader className="flex flex-row justify-between items-center">
=======
<<<<<<< HEAD
      <DrawerContent className="w-full max-w-4xl" style={{ backgroundColor }}>
        <DrawerHeader className="flex flex-row justify-between items-center">
          <h4 className="text-lg font-semibold">
            {selectedButton === "Update"
              ? "Update Remote Assist"
              : "Add Remote Assist"}
          </h4>
          <DrawerClose asChild>
            <button className="btn btn-link">
              <ArrowRight />
            </button>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4 flex-1  m-3 rounded-md shadow-md overflow-auto">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Remote Assist Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
=======
      <DrawerContent
        className="w-full max-w-4xl"
        style={{ backgroundColor }}
      >
        <DrawerHeader className="flex justify-between items-center">
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
          <h4 className="text-lg font-semibold">
            {selectedButton === "Update"
              ? "Update Remote Assist"
              : "Add Remote Assist"}
          </h4>
          <DrawerClose asChild>
            <button className="btn btn-link">
              <ArrowRight />
            </button>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4 flex-1  m-3 rounded-md shadow-md overflow-auto">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Remote Assist Name
                </label>
                <Input
                  value={formData.name}
<<<<<<< HEAD
                  onChange={(e) => handleInputChange("name", e.target.value)}
=======
                  onChange={(e) => handleInputChange('name', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Remote Assist Name"
                />
              </div>
              <div className="space-y-2">
<<<<<<< HEAD
                <label htmlFor="exchangeRate" className="text-sm font-medium">
                  Exchange Rate
                </label>
                <Input
                  value={formData.exchangeRate}
                  onChange={(e) =>
                    handleInputChange("exchangeRate", e.target.value)
                  }
=======
<<<<<<< HEAD
                <label htmlFor="exchangeRate" className="text-sm font-medium">
                  Exchange Rate
                </label>
                <Input
                  value={formData.exchangeRate}
                  onChange={(e) =>
                    handleInputChange("exchangeRate", e.target.value)
                  }
=======
                <label htmlFor="exchangeRate" className="text-sm font-medium">Exchange Rate</label>
                <Input
                  value={formData.exchangeRate}
                  onChange={(e) => handleInputChange('exchangeRate', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  type="number"
                  className="form-control"
                  id="exchangeRate"
                  placeholder="Exchange Rate"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                <label htmlFor="sessionType" className="text-sm font-medium">
                  Session Type
                </label>
                <Select
                  value={formData.sessionType}
                  onValueChange={(value) =>
                    handleInputChange("sessionType", value)
                  }
                >
                  <SelectTrigger className={"w-100"}>
<<<<<<< HEAD
=======
=======
                <label htmlFor="sessionType" className="text-sm font-medium">Session Type</label>
                <Select value={formData.sessionType} onValueChange={(value) => handleInputChange('sessionType', value)}>
                  <SelectTrigger>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectValue placeholder="Select Session Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
<<<<<<< HEAD
                    <SelectItem value="Remote Support">
                      Remote Support
                    </SelectItem>
=======
<<<<<<< HEAD
                    <SelectItem value="Remote Support">
                      Remote Support
                    </SelectItem>
=======
                    <SelectItem value="Remote Support">Remote Support</SelectItem>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectItem value="Screen Share">Screen Share</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
<<<<<<< HEAD
                <label htmlFor="dateAndTime" className="text-sm font-medium">
                  Date and Time
                </label>
                <Input
                  value={formData.dateAndTime}
                  onChange={(e) =>
                    handleInputChange("dateAndTime", e.target.value)
                  }
=======
<<<<<<< HEAD
                <label htmlFor="dateAndTime" className="text-sm font-medium">
                  Date and Time
                </label>
                <Input
                  value={formData.dateAndTime}
                  onChange={(e) =>
                    handleInputChange("dateAndTime", e.target.value)
                  }
=======
                <label htmlFor="dateAndTime" className="text-sm font-medium">Date and Time</label>
                <Input
                  value={formData.dateAndTime}
                  onChange={(e) => handleInputChange('dateAndTime', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  type="datetime-local"
                  className="form-control"
                  id="dateAndTime"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                <label htmlFor="leadId" className="text-sm font-medium">
                  Lead
                </label>
                <Select
                  value={formData.leadId}
                  onValueChange={(value) => handleInputChange("leadId", value)}
                >
                      <SelectTrigger className={"w-100"}>
<<<<<<< HEAD
=======
=======
                <label htmlFor="leadId" className="text-sm font-medium">Lead</label>
                <Select value={formData.leadId} onValueChange={(value) => handleInputChange('leadId', value)}>
                  <SelectTrigger>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectValue placeholder="Select Lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {leads.map((lead) => (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                      <SelectItem
                        key={lead.ROWID}
                        value={lead.ROWID.toString()}
                      >
<<<<<<< HEAD
=======
=======
                      <SelectItem key={lead.ROWID} value={lead.ROWID.toString()}>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                        {lead.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
<<<<<<< HEAD
                <label htmlFor="sessionId" className="text-sm font-medium">
                  Session ID
                </label>
                <Input
                  value={formData.sessionId}
                  onChange={(e) =>
                    handleInputChange("sessionId", e.target.value)
                  }
=======
<<<<<<< HEAD
                <label htmlFor="sessionId" className="text-sm font-medium">
                  Session ID
                </label>
                <Input
                  value={formData.sessionId}
                  onChange={(e) =>
                    handleInputChange("sessionId", e.target.value)
                  }
=======
                <label htmlFor="sessionId" className="text-sm font-medium">Session ID</label>
                <Input
                  value={formData.sessionId}
                  onChange={(e) => handleInputChange('sessionId', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  type="text"
                  className="form-control"
                  id="sessionId"
                  placeholder="Session ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
<<<<<<< HEAD
                <label htmlFor="timezoneList" className="text-sm font-medium">
                  Timezone List
                </label>
                <Input
                  value={formData.timezoneList}
                  onChange={(e) =>
                    handleInputChange("timezoneList", e.target.value)
                  }
=======
<<<<<<< HEAD
                <label htmlFor="timezoneList" className="text-sm font-medium">
                  Timezone List
                </label>
                <Input
                  value={formData.timezoneList}
                  onChange={(e) =>
                    handleInputChange("timezoneList", e.target.value)
                  }
=======
                <label htmlFor="timezoneList" className="text-sm font-medium">Timezone List</label>
                <Input
                  value={formData.timezoneList}
                  onChange={(e) => handleInputChange('timezoneList', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  type="text"
                  className="form-control"
                  id="timezoneList"
                  placeholder="Timezone List"
                />
              </div>
              <div className="space-y-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                <label htmlFor="owner" className="text-sm font-medium">
                  Remote Assist Owner
                </label>
                <Select
                  value={formData.owner}
                  onValueChange={(value) => handleInputChange("owner", value)}
                >
                        <SelectTrigger className={"w-100"}>
<<<<<<< HEAD
=======
=======
                <label htmlFor="owner" className="text-sm font-medium">Remote Assist Owner</label>
                <Select value={formData.owner} onValueChange={(value) => handleInputChange('owner', value)}>
                  <SelectTrigger>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectValue placeholder="Select Owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                      <SelectItem
                        key={user.ROWID}
                        value={user.ROWID.toString()}
                      >
<<<<<<< HEAD
=======
=======
                      <SelectItem key={user.ROWID} value={user.ROWID.toString()}>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                <label htmlFor="currency" className="text-sm font-medium">
                  Currency
                </label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    handleInputChange("currency", value)
                  }
                >
                        <SelectTrigger className={"w-100"}>
<<<<<<< HEAD
=======
=======
                <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                <label htmlFor="contactId" className="text-sm font-medium">
                  Contact
                </label>
                <Select
                  value={formData.contactId}
                  onValueChange={(value) =>
                    handleInputChange("contactId", value)
                  }
                >
                        <SelectTrigger className={"w-100"}>
<<<<<<< HEAD
=======
=======
                <label htmlFor="contactId" className="text-sm font-medium">Contact</label>
                <Select value={formData.contactId} onValueChange={(value) => handleInputChange('contactId', value)}>
                  <SelectTrigger>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectValue placeholder="Select Contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                      <SelectItem
                        key={contact.ROWID}
                        value={contact.ROWID.toString()}
                      >
<<<<<<< HEAD
=======
=======
                      <SelectItem key={contact.ROWID} value={contact.ROWID.toString()}>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
<<<<<<< HEAD
                <label htmlFor="digest" className="text-sm font-medium">
                  Digest
                </label>
                <Input
                  value={formData.digest}
                  onChange={(e) => handleInputChange("digest", e.target.value)}
=======
<<<<<<< HEAD
                <label htmlFor="digest" className="text-sm font-medium">
                  Digest
                </label>
                <Input
                  value={formData.digest}
                  onChange={(e) => handleInputChange("digest", e.target.value)}
=======
                <label htmlFor="digest" className="text-sm font-medium">Digest</label>
                <Input
                  value={formData.digest}
                  onChange={(e) => handleInputChange('digest', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  type="text"
                  className="form-control"
                  id="digest"
                  placeholder="Digest"
                />
              </div>
              <div className="space-y-2">
<<<<<<< HEAD
                <label htmlFor="scheduleId" className="text-sm font-medium">
                  Schedule ID
                </label>
                <Input
                  value={formData.scheduleId}
                  onChange={(e) =>
                    handleInputChange("scheduleId", e.target.value)
                  }
=======
<<<<<<< HEAD
                <label htmlFor="scheduleId" className="text-sm font-medium">
                  Schedule ID
                </label>
                <Input
                  value={formData.scheduleId}
                  onChange={(e) =>
                    handleInputChange("scheduleId", e.target.value)
                  }
=======
                <label htmlFor="scheduleId" className="text-sm font-medium">Schedule ID</label>
                <Input
                  value={formData.scheduleId}
                  onChange={(e) => handleInputChange('scheduleId', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  type="text"
                  className="form-control"
                  id="scheduleId"
                  placeholder="Schedule ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                <label htmlFor="reminder" className="text-sm font-medium">
                  Reminder
                </label>
                <Select
                  value={formData.reminder}
                  onValueChange={(value) =>
                    handleInputChange("reminder", value)
                  }
                >
                       <SelectTrigger className={"w-100"}>
<<<<<<< HEAD
=======
=======
                <label htmlFor="reminder" className="text-sm font-medium">Reminder</label>
                <Select value={formData.reminder} onValueChange={(value) => handleInputChange('reminder', value)}>
                  <SelectTrigger>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="No reminders">No reminders</SelectItem>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                    <SelectItem value="5 minutes before">
                      5 minutes before
                    </SelectItem>
                    <SelectItem value="10 minutes before">
                      10 minutes before
                    </SelectItem>
                    <SelectItem value="15 minutes before">
                      15 minutes before
                    </SelectItem>
<<<<<<< HEAD
=======
=======
                    <SelectItem value="5 minutes before">5 minutes before</SelectItem>
                    <SelectItem value="10 minutes before">10 minutes before</SelectItem>
                    <SelectItem value="15 minutes before">15 minutes before</SelectItem>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
<<<<<<< HEAD
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
=======
<<<<<<< HEAD
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
=======
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                  className="form-control"
                  id="description"
                  placeholder="Description"
                />
              </div>
            </div>

<<<<<<< HEAD
            <div className="flex items-center space-x-2 mb-5">
=======
<<<<<<< HEAD
            <div className="flex items-center space-x-2 mb-5">
              <Checkbox
                id="onDemandSession"
                checked={formData.onDemandSession}
                onCheckedChange={(checked) =>
                  handleInputChange("onDemandSession", checked)
                }
              />
              <Label htmlFor="onDemandSession" className="text-sm font-medium">
                On Demand Session
              </Label>
=======
            <div className="flex items-center space-x-2">
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
              <Checkbox
                id="onDemandSession"
                checked={formData.onDemandSession}
                onCheckedChange={(checked) =>
                  handleInputChange("onDemandSession", checked)
                }
              />
<<<<<<< HEAD
              <Label htmlFor="onDemandSession" className="text-sm font-medium">
                On Demand Session
              </Label>
=======
              <label htmlFor="onDemandSession" className="text-sm font-medium">On Demand Session</label>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
            </div>
          </form>
        </div>
        <DrawerFooter className="flex justify-center">
          <div className="flex gap-2 justify-center">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
            {selectedButton === "Submit" && (
              <Button
                onClick={submitForm}
                className="add-btn btn"
                style={{ backgroundColor: "lightseagreen", color: "white" }}
              >
<<<<<<< HEAD
=======
=======
            {selectedButton === 'Submit' && (
              <Button onClick={submitForm} className="add-btn btn" style={{ backgroundColor: 'lightseagreen', color: 'white' }}>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                Save
              </Button>
            )}
            <Button className="btn btn-danger" onClick={onClose}>
              Close
            </Button>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
            {selectedButton === "Update" && (
              <Button
                onClick={handleUpdate}
                className="add-btn btn"
                style={{ backgroundColor: "lightseagreen", color: "white" }}
              >
<<<<<<< HEAD
=======
=======
            {selectedButton === 'Update' && (
              <Button onClick={handleUpdate} className="add-btn btn" style={{ backgroundColor: 'lightseagreen', color: 'white' }}>
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
                Update
              </Button>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RemoteAssistDrawer;
