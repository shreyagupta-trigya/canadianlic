import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const RingCentralCMS = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data matching the Vue component
  const data = [
    {
      id: 1,
      sender: "Harman singh",
      recipient: "Rajendra singh",
      text: "How are you?",
      status: "seen",
    },
    {
      id: 2,
      sender: "Harman singh",
      recipient: "Rajendra singh",
      text: "Hello",
      status: "seen",
    },
    {
      id: 3,
      sender: "Harman singh",
      recipient: "Rajendra singh",
      text: "How are you?",
      status: "seen",
    },
  ];

  const filteredData = data.filter((item) =>
    item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
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
                <TableHead className="color fw-semibold">Sender</TableHead>
                <TableHead className="color fw-semibold">Recipient</TableHead>
                <TableHead className="color fw-semibold">Text</TableHead>
                <TableHead className="color fw-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.sender}</TableCell>
                  <TableCell>{item.recipient}</TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RingCentralCMS;
