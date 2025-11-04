import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const RingCentralWidget = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data matching the Vue component
  const data = [
    {
      id: 1,
      startTime: "2024-09-30T14:00:00Z",
      endTime: "2024-09-30T15:00:00Z",
      duration: "1050000000",
      phone: "9089786765",
    },
    {
      id: 2,
      startTime: "2024-09-30T14:00:00Z",
      endTime: "2024-09-30T15:00:00Z",
      duration: "1050000000",
      phone: "9089786765",
    },
    {
      id: 3,
      startTime: "2024-09-30T14:00:00Z",
      endTime: "2024-09-30T15:00:00Z",
      duration: "1050000000",
      phone: "9089786765",
    },
  ];

  const filteredData = data.filter((item) =>
    item.startTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.endTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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
        </div>
        <div className="border overflow-scroll custom-scroll px-0 mt-3">
          <Table className="table table-striped custom-scroll">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead className="color fw-semibold">Start Time</TableHead>
                <TableHead className="color fw-semibold">End Time</TableHead>
                <TableHead className="color fw-semibold">Duration</TableHead>
                <TableHead className="color fw-semibold">Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.startTime}</TableCell>
                  <TableCell>{item.endTime}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RingCentralWidget;
