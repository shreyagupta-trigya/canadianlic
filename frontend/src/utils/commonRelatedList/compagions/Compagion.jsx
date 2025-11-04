import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import CampaignDrawer from "./CampaignDrawer";

const Compagion = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Sample data matching the Vue component
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

  return (
    <div>
      <CampaignDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
      <div className="row">
        <div className="flex justify-between items-center">
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
            <Button className="companagion-button px-2 py-1 mt-3" onClick={toggleDrawer}>
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
                <TableHead className="color fw-semibold">Type</TableHead>
                <TableHead className="color fw-semibold">Status</TableHead>
                <TableHead className="color fw-semibold">Start Date</TableHead>
                <TableHead className="color fw-semibold">End Date</TableHead>
                <TableHead className="color fw-semibold">Expected Revenue</TableHead>
                <TableHead className="color fw-semibold">Campaign Subject</TableHead>
                <TableHead className="color fw-semibold">Sender Name</TableHead>
                <TableHead className="color fw-semibold">Sender Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="truncate max-w-xs">{item.status}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{item.endDate}</TableCell>
                  <TableCell>{item.expectedRevenue}</TableCell>
                  <TableCell>{item.campaignSubject}</TableCell>
                  <TableCell>{item.senderName}</TableCell>
                  <TableCell>{item.senderAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Compagion;
