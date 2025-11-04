import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import RemoteAssistDrawer from "./RemoteAssistDrawer";
import { useNavigate } from "react-router-dom";

const RemoteAssist = ({ id }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paginatedAdvior, setPaginatedAdvior] = useState([]);
  const [selectedButton, setSelectedButton] = useState("");
  const [updateData, setUpdateData] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const switchButton = (button, ...args) => {
    setSelectedButton(button);
    if (button === "Update") {
      const [name, owner, exchangeRate, currency, sessionType, description, reminder, leadId, contactId, sessionId, digest, onDemandSession, scheduleId, timezoneList, id] = args;
      setUpdateData({
        name, owner, exchangeRate, currency, sessionType, description, reminder,
        leadId, contactId, sessionId, digest, onDemandSession, scheduleId, timezoneList, id
      });
    }
  };

  const fetchAdvisorCredentials = async () => {
    // Mock data for demonstration
    const mockData = [
      {
        rowId: 1,
        name: "Remote Assist 1",
        currency: "CAD",
        contactsName: "John Doe",
        sessionId: "12345",
        scheduleId: "67890",
        reminder: "5 minutes before",
        owner: "Owner 1",
        exchangeRate: 1.2,
        sessionType: "Remote Support",
        description: "Description 1",
        leadId: "Lead 1",
        contactId: "Contact 1",
        digest: "Digest 1",
        onDemandSession: true,
        timezoneList: "EST",
        id: 1
      },
      {
        rowId: 2,
        name: "Remote Assist 2",
        currency: "CAD",
        contactsName: "Jane Smith",
        sessionId: "54321",
        scheduleId: "09876",
        reminder: "10 minutes before",
        owner: "Owner 2",
        exchangeRate: 1.3,
        sessionType: "Screen Share",
        description: "Description 2",
        leadId: "Lead 2",
        contactId: "Contact 2",
        digest: "Digest 2",
        onDemandSession: false,
        timezoneList: "PST",
        id: 2
      }
    ];
    setPaginatedAdvior(mockData);
  };

  const confirmDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      // Mock delete
      setPaginatedAdvior(prev => prev.filter(item => item.rowId !== id));
      alert('Remote Access Deleted Successfully');
    }
  };

  const updateRemoteAssist = async (data) => {
    // Mock update
    console.log('Updating remote assist:', data);
    // Update the local state
    setPaginatedAdvior(prev => prev.map(item =>
      item.id === data.id ? { ...item, ...data } : item
    ));
    alert('Remote Access Updated Successfully');
    return { data: { success: true } };
  };

  useEffect(() => {
    fetchAdvisorCredentials();
  }, []);

  const filteredData = paginatedAdvior.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <RemoteAssistDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        updateData={updateData}
        updateRemoteAssist={updateRemoteAssist}
        fetchAdvisorCredentials={fetchAdvisorCredentials}
        selectedButton={selectedButton}
      />
      <div className="row">
        <div className="d-flex justify-content-between align-items-center">
          <div className="search-container-div col-lg-10 col-md-10 col-sm-12">
            <div className="relative">
              <Input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="button">
            <Button
              className="companagion-button px-2 py-1 mt-2"
              onClick={() => {
                toggleDrawer();
                switchButton('Submit');
              }}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="border overflow-scroll custom-scroll px-0">
          <Table className="table table-striped custom-scroll">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead className="color fw-semibold">Action</TableHead>
                <TableHead className="color fw-semibold">Remote Assist Name</TableHead>
                <TableHead className="color fw-semibold">Currency</TableHead>
                <TableHead className="color fw-semibold">Contact</TableHead>
                <TableHead className="color fw-semibold">Session ID</TableHead>
                <TableHead className="color fw-semibold">Schedule ID</TableHead>
                <TableHead className="color fw-semibold">Reminder</TableHead>
                <TableHead className="color fw-semibold">Date and Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((assist) => (
                <TableRow key={assist.rowId}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            toggleDrawer();
                            switchButton('Update', assist.name, assist.owner, assist.exchangeRate, assist.currency, assist.sessionType, assist.description, assist.reminder, assist.leadId, assist.contactId, assist.sessionId, assist.digest, assist.onDemandSession, assist.scheduleId, assist.timezoneList, assist.id);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => confirmDelete(assist.rowId)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{assist.name}</TableCell>
                  <TableCell>{assist.currency}</TableCell>
                  <TableCell>{assist.contactsName}</TableCell>
                  <TableCell>{assist.sessionId}</TableCell>
                  <TableCell>{assist.scheduleId}</TableCell>
                  <TableCell>{assist.reminder}</TableCell>
                  <TableCell>2024-11-12</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RemoteAssist;
