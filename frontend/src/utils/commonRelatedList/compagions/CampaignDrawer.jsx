import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "../../../components/ui/drawer";

const CampaignDrawer = ({ isOpen, onClose, maxWidth = "75%", speed = 300, backgroundColor = "#fafafa" }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef(null);

  const totalItems = 300;
  const itemsPerPage = 20;
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = () => {
    if (currentOffset >= totalItems || loading) return;

    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: itemsPerPage }, (_, i) => ({
        id: currentOffset + i,
        type: `Type ${currentOffset + i + 1}`,
        campaignName: `Campaign ${currentOffset + i + 1}`,
        status: `Status ${currentOffset + i + 1}`,
        startDate: `2024-10-${(currentOffset + 1) % 31 || 1}`,
        endDate: `2024-11-${(currentOffset + 1) % 31 || 1}`,
        expectedRevenue: `$${(Math.random() * 10000).toFixed(2)}`,
        campaignSubject: `Subject ${currentOffset + i + 1}`,
        senderName: `Sender ${currentOffset + i + 1}`,
        senderAddress: `Address ${currentOffset + i + 1}`,
        replyToAddress: `replyto${currentOffset + i + 1}@example.com`,
        surveyDepartment: `Department ${currentOffset + i + 1}`,
        surveyType: `Type ${currentOffset + i + 1}`,
        survey: `Survey ${currentOffset + i + 1}`,
        selected: false,
      }));

      setItems((prev) => [...prev, ...newItems]);
      setCurrentOffset((prev) => prev + itemsPerPage);
      setLoading(false);
    }, 1000);
  };

  const toggleSelectAll = (event) => {
    const checked = event.target.checked;
    setItems((prev) =>
      prev.map((item) => ({ ...item, selected: checked }))
    );
  };

  const submit = () => {
    const selectedItems = items.filter((item) => item.selected);
    alert(`Selected Items: ${selectedItems.map((item) => item.campaignName).join(", ")}`);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            fetchData();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: "0px",
          threshold: 1.0,
        }
      );

      observer.observe(scrollContainerRef.current);
      return () => observer.disconnect();
    }
  }, [scrollContainerRef.current]);

  const filteredItems = items.filter((item) =>
    item.campaignName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent
        className="w-full max-w-4xl"
        style={{ backgroundColor }}
      >
        <DrawerHeader className="flex justify-between items-center">
          <div className="w-full flex" style={{ textAlign: "left" }}>
            <div className="relative">
              <Input
                 className="search-input max-w-2xl w-full"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <DrawerClose asChild>
            <button className="btn btn-link">
              <i className="fa fa-arrow-right cursor-pointer"></i>
            </button>
          </DrawerClose>
        </DrawerHeader>
        <div className="table-container border mt-3 flex-1 overflow-auto" ref={scrollContainerRef}>
          <div className="table-wrapper">
            <Table className="table table-striped">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 px-4 py-3">
                    <Checkbox onCheckedChange={toggleSelectAll} className="w-4 h-4" />
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Campaign Name</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Expected Revenue</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Campaign Subject</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sender Name</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sender Address</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reply-to Address</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Survey Department</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Survey Type</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Survey</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="px-4 py-3">
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={(checked) =>
                          setItems((prev) =>
                            prev.map((i) =>
                              i.id === item.id ? { ...i, selected: checked } : i
                            )
                          )
                        }
                        className="w-4 h-4"
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">{item.type}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">{item.campaignName}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">{item.status}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.startDate}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.endDate}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.expectedRevenue}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.campaignSubject}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.senderName}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.senderAddress}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.replyToAddress}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.surveyDepartment}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.surveyType}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.survey}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {loading && <div className="text-center py-2">Loading...</div>}
        <DrawerFooter className="flex justify-center">
          <div className="flex gap-2 justify-center">
            <Button className="btn btn-info" onClick={submit}>
              Submit
            </Button>
            <Button className="btn btn-danger" onClick={onClose}>
              Reset
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CampaignDrawer;
