import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Info, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReferralLead = ({ leadId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const openPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Sample data matching the Vue component
  const data = [
    {
      id: 1,
      createdTime: "3:00",
      insuranceLeadName: "sanjeev kumar",
      contractAttempts: "",
      callDetails: "Out:0,in:0",
      insuranceLeadStatus: "Not Contracted",
      leadStatusStage: "Not Contracted",
      email: "sanjeev@gmail.com",
    },
    {
      id: 2,
      createdTime: "3:00",
      insuranceLeadName: "sanjeev kumar",
      contractAttempts: "",
      callDetails: "Out:0,in:0",
      insuranceLeadStatus: "Not Contracted",
      leadStatusStage: "Not Contracted",
      email: "sanjeev@gmail.com",
    },
    {
      id: 3,
      createdTime: "3:00",
      insuranceLeadName: "sanjeev kumar",
      contractAttempts: "",
      callDetails: "Out:0,in:0",
      insuranceLeadStatus: "Not Contracted",
      leadStatusStage: "Not Contracted",
      email: "sanjeev@gmail.com",
    },
  ];

  const filteredData = data.filter((item) =>
    item.insuranceLeadName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search and Add New Button */}
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
        <div>
          <Button
            className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => navigate(`/leads-form?leadId=${leadId}`)}
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Create Insurance</h4>
              <button
                onClick={openPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-3">Layout</span>
              <div className="w-32">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3">FirstName</label>
                <Input type="text" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3">LastName</label>
                <Input type="text" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3">Email</label>
                <Input type="email" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3 flex items-center">
                  Potential Business (Policy Values)
                  <Info className="h-4 w-4 ml-1 text-gray-500" />
                </label>
                <div className="flex">
                  <Input type="text" className="flex-1 rounded-r-none" />
                  <div className="flex items-center px-3 bg-blue-50 border border-l-0 border-gray-300 rounded-r-md">
                    <Info className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3">Gender</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Male" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3 flex items-center">
                  Assigned Advisor
                  <Info className="h-4 w-4 ml-1 text-gray-500" />
                </label>
                <div className="flex">
                  <Input type="text" className="flex-1 rounded-r-none" />
                  <div className="flex items-center px-3 bg-blue-50 border border-l-0 border-gray-300 rounded-r-md">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3">Insurance Lead Status</label>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                  <Select>
                    <SelectTrigger className="border-none shadow-none w-full">
                      <SelectValue placeholder="Not Contacted" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-contacted">Not Contacted</SelectItem>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3">Product Category Referred</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">-None</SelectItem>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-right pr-3">Cost Per Lead(CPL)</label>
                <div className="flex">
                  <Input type="text" className="flex-1 rounded-r-none" />
                  <div className="flex items-center px-3 bg-blue-50 border border-l-0 border-gray-300 rounded-r-md">
                    <Info className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div></div>
                <div className="flex justify-center space-x-3">
                  <Button
                    className="px-4 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded hover:bg-gray-200"
                    onClick={openPopup}
                  >
                    Cancel
                  </Button>
                  <div className="relative inline-flex">
                    <Button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Save and Associate
                    </Button>
                    <Button className="px-3 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 border-l border-blue-400">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <div className="absolute right-0 mt-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">
                        Save and Associate
                      </a>
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">
                        Another action
                      </a>
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">
                        Something else here
                      </a>
                      <div className="border-t border-gray-200"></div>
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">
                        Separated link
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">Created Time</TableHead>
              <TableHead className="text-gray-700 font-semibold">Insurance Lead Name</TableHead>
              <TableHead className="text-gray-700 font-semibold">Number of Contract Attempts.</TableHead>
              <TableHead className="text-gray-700 font-semibold">Call Details</TableHead>
              <TableHead className="text-gray-700 font-semibold">Insurance Lead Status</TableHead>
              <TableHead className="text-gray-700 font-semibold">Lead Status Stage</TableHead>
              <TableHead className="text-gray-700 font-semibold">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.createdTime}</TableCell>
                <TableCell>{item.insuranceLeadName}</TableCell>
                <TableCell>{item.contractAttempts}</TableCell>
                <TableCell>{item.callDetails}</TableCell>
                <TableCell>
                  <Button className="bg-red-500 text-white rounded-full px-3 py-1 text-sm hover:bg-red-600">
                    {item.insuranceLeadStatus}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-red-500 text-white rounded-full px-3 py-1 text-sm hover:bg-red-600">
                    {item.leadStatusStage}
                  </Button>
                </TableCell>
                <TableCell>{item.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReferralLead;
