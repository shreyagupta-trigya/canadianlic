import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import RemoteAssistDrawer from "./RemoteAssistDrawer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { putUrl } from "@/boot/axios";

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
    try {
      const response = await axios.post(`${putUrl}canadianlicapi/remote-assist/api/v2/getall-remote-access`, {
        params: {
          // Add any params if needed
        }
      });
      setPaginatedAdvior(response.data.data || []);
    } catch (error) {
      console.error('Error fetching remote assists:', error);
      setPaginatedAdvior([]);
    }
  };

  const confirmDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      try {
        await axios.post(`${putUrl}canadianlicapi/remote-assist/api/v2/delete-remote-access/${id}`);
        fetchAdvisorCredentials(); // Refresh the list
        alert('Remote Access Deleted Successfully');
      } catch (error) {
        console.error('Error deleting remote assist:', error);
        alert('Error deleting remote assist');
      }
    }
  };

  const updateRemoteAssist = async (data) => {
    try {
      const response = await axios.put(`${putUrl}canadianlicapi/remote-assist/api/v2/update-remote-access/${data.id}`, data);
      console.log('Update response', response);
      alert('Remote Access Updated Successfully');
      fetchAdvisorCredentials();
      return { data: { success: true } };
    } catch (error) {
      console.error('Error updating remote assist:', error);
      alert('Error updating remote assist');
      return { data: { success: false } };
    }
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
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full lg:w-2/6 md:w-2/6 sm:w-full">
          <Input
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        </div>
        <div className="button">
          <Button
          variant="primary"
            className="companagion-button  cursor-pointer px-2 py-1 "
            onClick={() => {
              toggleDrawer();
              switchButton('Submit');
            }}
          >
            Add New
          </Button>
        </div>
  
      </div>
          {/* <iframe width="100%" height="150px" src="https://assist.canadianlic.com/login/embed-remote-support.jsp" frameborder="0"></iframe> */}
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
  );
};

export default RemoteAssist;
