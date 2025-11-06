import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import CampaignDrawer from "./CampaignDrawer";

const Compagion = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Sample data matching the Vue component exactly
  const data = [
    {
      id: 1,
      type: "Google",
      status: "(ON)#3 Performance Max-Super Visa-2024-2:30PM-11 cjdssbkjmkmjgkjregjre ggkjghjgh",
      startDate: "@mdo",
      endDate: "end date",
      expectedRevenue: "revenue",
      campaignSubject: "subject",
      senderName: "name",
      senderAddress: "address",
    },
    {
      id: 2,
      type: "Google",
      status: "Thornton",
      startDate: "@fat",
      endDate: "",
      expectedRevenue: "",
      campaignSubject: "",
      senderName: "",
      senderAddress: "",
    },
    {
      id: 3,
      type: "Google",
      status: "Google",
      startDate: "start date",
      endDate: "",
      expectedRevenue: "",
      campaignSubject: "",
      senderName: "",
      senderAddress: "",
    },
    {
      id: 4,
      type: "Google",
      status: "(ON)#3 Performance Max-Super Visa-2024-2:30PM-11",
      startDate: "@mdo",
      endDate: "",
      expectedRevenue: "",
      campaignSubject: "",
      senderName: "",
      senderAddress: "",
    },
    {
      id: 5,
      type: "Google",
      status: "(ON)#3 Performance Max-Super Visa-2024-2:30PM-11",
      startDate: "@mdo",
      endDate: "",
      expectedRevenue: "",
      campaignSubject: "",
      senderName: "",
      senderAddress: "",
    },
  ];

  const filteredData = data.filter((item) =>
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredData.map(item => item.id)));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <CampaignDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Input
                className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-base w-full transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
                type="search"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={toggleDrawer}
            >
              <i className="fas fa-plus mr-2"></i>
              Add New Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12 px-6 py-4">
                  <Checkbox
                    checked={selectedItems.size === filteredData.length && filteredData.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="w-5 h-5"
                  />
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Expected Revenue</TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Campaign Subject</TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sender Name</TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sender Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                >
                  <TableCell className="px-6 py-4">
                    <Checkbox
                      checked={selectedItems.has(item.id)}
                      onCheckedChange={() => handleCheckboxChange(item.id)}
                      className="w-5 h-5"
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-900 font-medium cursor-pointer hover:text-blue-600 transition-colors">
                    <div className="flex items-center">
                      <i className="fab fa-google text-red-500 mr-2"></i>
                      {item.type}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                    <div className="max-w-xs truncate" title={item.status}>
                      {item.status}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                    {item.startDate}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                    {item.endDate || '-'}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                    {item.expectedRevenue || '-'}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                    {item.campaignSubject || '-'}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                    {item.senderName || '-'}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
                    <div className="max-w-xs truncate" title={item.senderAddress}>
                      {item.senderAddress || '-'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer with selected count */}
        {selectedItems.size > 0 && (
          <div className="bg-blue-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700 font-medium">
                {selectedItems.size} campaign{selectedItems.size > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  onClick={() => setSelectedItems(new Set())}
                >
                  Clear Selection
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Export Selected
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compagion;
