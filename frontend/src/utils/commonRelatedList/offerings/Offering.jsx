import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import OfferingDrawer from "./OfferingDrawer";

const Offering = () => {
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
      referredBy: "Jaskaranpreet Kaur",
      year: "2024",
      referralLeads: "",
      referralClient: "Jaskaranpreet Kaur",
      referralMadeClient: "Manjinder Kaur Bains",
      referralOwner: "Harpreet puri",
      referralLevel: "D",
      referralPayout: "",
      createdTime: "30 Aug,2024 05:31 PM",
    },
    {
      id: 2,
      referredBy: "Rajendra Singh",
      year: "2023",
      referralLeads: "",
      referralClient: "Rajendra Singh",
      referralMadeClient: "Rajendra Singh",
      referralOwner: "Harpreet puri",
      referralLevel: "D",
      referralPayout: "",
      createdTime: "30 Aug,2024 05:41 PM",
    },
    {
      id: 3,
      referredBy: "Jaskaranpreet Bhatt",
      year: "2024",
      referralLeads: "",
      referralClient: "Jaskaranpreet Kaur",
      referralMadeClient: "Harman Brar",
      referralOwner: "Harpreet puri",
      referralLevel: "D",
      referralPayout: "",
      createdTime: "30 jul,2024 05:376PM",
    },
  ];

  const filteredData = data.filter((item) =>
    item.referredBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
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
          variant="primary"
            className="px-4 py-2"
            onClick={toggleDrawer}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">Referred By</TableHead>
              <TableHead className="text-gray-700 font-semibold">Year</TableHead>
              <TableHead className="text-gray-700 font-semibold">Referral-Leads</TableHead>
              <TableHead className="text-gray-700 font-semibold">Referral Client</TableHead>
              <TableHead className="text-gray-700 font-semibold">Referral Made-Client</TableHead>
              <TableHead className="text-gray-700 font-semibold">Referral Owner</TableHead>
              <TableHead className="text-gray-700 font-semibold">Referral Level</TableHead>
              <TableHead className="text-gray-700 font-semibold">Referral Payout</TableHead>
              <TableHead className="text-gray-700 font-semibold">Created Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.referredBy}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.referralLeads}</TableCell>
                <TableCell>{item.referralClient}</TableCell>
                <TableCell>{item.referralMadeClient}</TableCell>
                <TableCell>{item.referralOwner}</TableCell>
                <TableCell>{item.referralLevel}</TableCell>
                <TableCell>{item.referralPayout}</TableCell>
                <TableCell>{item.createdTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <OfferingDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default Offering;
