import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const RemoteAssistDrawer = ({
  isOpen,
  onClose,
  updateData,
  updateRemoteAssist,
  fetchAdvisorCredentials,
  selectedButton,
  maxWidth = "60%",
  speed = 300,
  backgroundColor = "#fafafa"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    setIsTransitioning(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
      fetchUsers();
      fetchLead();
      fetchContact();
    } else {
      document.body.style.overflow = null;
      setTimeout(() => setIsVisible(false), speed);
    }
    setTimeout(() => setIsTransitioning(false), speed);
  }, [isOpen, speed]);

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

  const closeDrawer = () => {
    if (!isTransitioning) {
      onClose();
    }
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
        closeDrawer();
      }
    } catch (error) {
      console.error('Error updating remote assist:', error);
    }
  };

  const submitForm = async () => {
    try {
      // Mock create
      console.log("Form submitted", formData);
      alert("Remote Access Created Successfully");
      fetchAdvisorCredentials();
      closeDrawer();
    } catch (error) {
      console.error('Error saving Remote Assist:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="drawer-main-div card">
      <div className={`drawer ${isVisible ? "is-visible" : ""} ${isOpen ? "is-open" : ""}`}>
        <div
          className="drawer__overlay"
          style={{ transitionDuration: `${speed}ms` }}
          onClick={closeDrawer}
        ></div>
        <div
          className="drawer__content"
          style={{
            maxWidth,
            transitionDuration: `${speed}ms`,
            backgroundColor,
          }}
        >
          <div className="px-3 py-1">
            <button onClick={closeDrawer} className="btn btn-link">
              <i className="fa fa-arrow-right cursor-pointer"></i>
            </button>
          </div>
          <div className="message-details p-1 flex-grow-1">
            <h4 className="mx-3">
              {selectedButton === 'Update' ? 'Update Remote Assist' : 'Add Remote Assist'}
            </h4>
            <form className="card-body pt-1">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="name">Remote Assist Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Remote Assist Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="exchangeRate">Exchange Rate</label>
                    <Input
                      value={formData.exchangeRate}
                      onChange={(e) => handleInputChange('exchangeRate', e.target.value)}
                      type="number"
                      className="form-control"
                      id="exchangeRate"
                      placeholder="Exchange Rate"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="sessionType">Session Type</label>
                    <Select value={formData.sessionType} onValueChange={(value) => handleInputChange('sessionType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Session Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Remote Support">Remote Support</SelectItem>
                        <SelectItem value="Screen Share">Screen Share</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="dateAndTime">Date and Time</label>
                    <Input
                      value={formData.dateAndTime}
                      onChange={(e) => handleInputChange('dateAndTime', e.target.value)}
                      type="datetime-local"
                      className="form-control"
                      id="dateAndTime"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="leadId">Lead</label>
                    <Select value={formData.leadId} onValueChange={(value) => handleInputChange('leadId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Lead" />
                      </SelectTrigger>
                      <SelectContent>
                        {leads.map((lead) => (
                          <SelectItem key={lead.ROWID} value={lead.ROWID.toString()}>
                            {lead.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="sessionId">Session ID</label>
                    <Input
                      value={formData.sessionId}
                      onChange={(e) => handleInputChange('sessionId', e.target.value)}
                      type="text"
                      className="form-control"
                      id="sessionId"
                      placeholder="Session ID"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="timezoneList">Timezone List</label>
                    <Input
                      value={formData.timezoneList}
                      onChange={(e) => handleInputChange('timezoneList', e.target.value)}
                      type="text"
                      className="form-control"
                      id="timezoneList"
                      placeholder="Timezone List"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="owner">Remote Assist Owner</label>
                    <Select value={formData.owner} onValueChange={(value) => handleInputChange('owner', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Owner" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.ROWID} value={user.ROWID.toString()}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="currency">Currency</label>
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CAD">CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="contactId">Contact</label>
                    <Select value={formData.contactId} onValueChange={(value) => handleInputChange('contactId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Contact" />
                      </SelectTrigger>
                      <SelectContent>
                        {contacts.map((contact) => (
                          <SelectItem key={contact.ROWID} value={contact.ROWID.toString()}>
                            {contact.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="digest">Digest</label>
                    <Input
                      value={formData.digest}
                      onChange={(e) => handleInputChange('digest', e.target.value)}
                      type="text"
                      className="form-control"
                      id="digest"
                      placeholder="Digest"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="scheduleId">Schedule ID</label>
                    <Input
                      value={formData.scheduleId}
                      onChange={(e) => handleInputChange('scheduleId', e.target.value)}
                      type="text"
                      className="form-control"
                      id="scheduleId"
                      placeholder="Schedule ID"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="reminder">Reminder</label>
                    <Select value={formData.reminder} onValueChange={(value) => handleInputChange('reminder', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="No reminders">No reminders</SelectItem>
                        <SelectItem value="5 minutes before">5 minutes before</SelectItem>
                        <SelectItem value="10 minutes before">10 minutes before</SelectItem>
                        <SelectItem value="15 minutes before">15 minutes before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-0">
                    <label htmlFor="description">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="form-control"
                      id="description"
                      placeholder="Description"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-0 d-flex justify-content-start gap-2 align-items-center">
                    <label htmlFor="onDemandSession">On Demand Session</label>
                    <Checkbox
                      id="onDemandSession"
                      checked={formData.onDemandSession}
                      onCheckedChange={(checked) => handleInputChange('onDemandSession', checked)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="row text-center d-flex justify-space-around mt-5">
            <div className="col">
              {selectedButton === 'Submit' && (
                <Button onClick={submitForm} className="add-btn btn me-2" style={{ backgroundColor: 'lightseagreen', color: 'white' }}>
                  Save
                </Button>
              )}
              <Button className="btn btn-danger me-2" onClick={closeDrawer}>
                Close
              </Button>
              {selectedButton === 'Update' && (
                <Button onClick={handleUpdate} className="add-btn btn me-2" style={{ backgroundColor: 'lightseagreen', color: 'white' }}>
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteAssistDrawer;
