import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const CampaignDrawer = ({ isOpen, onClose, maxWidth = "75%", speed = 300, backgroundColor = "#fafafa" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef(null);

  const totalItems = 300;
  const itemsPerPage = 20;
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    setIsTransitioning(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
      fetchData();
    } else {
      document.body.style.overflow = null;
      setTimeout(() => setIsVisible(false), speed);
    }
    setTimeout(() => setIsTransitioning(false), speed);
  }, [isOpen, speed]);

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

  const closeDrawer = () => {
    if (!isTransitioning) {
      onClose();
    }
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
    <div className={`fixed inset-0 z-[1050] ${isVisible ? "block" : "hidden"} ${isOpen ? "block" : "hidden"}`}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-opacity-50 transition-opacity duration-300"
        style={{ transitionDuration: `${speed}ms` }}
        onClick={closeDrawer}
      ></div>

      {/* Drawer Content */}
      <div
        className="fixed top-0 right-0 h-full w-3/4 bg-gray-50 shadow-lg transform transition-transform duration-300"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionDuration: `${speed}ms`,
          backgroundColor,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <div className="px-3 py-1">
            <i onClick={closeDrawer} className="fas fa-arrow-right cursor-pointer text-xl hover:text-gray-600"></i>
          </div>
          <div className="relative">
            <Input
              className="pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg w-64 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="search"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto p-2 h-full " ref={scrollContainerRef}>
          <div className="bg-white rounded-lg shadow-sm  border border-gray-200 overflow-hidden min-w-max">
            <Table className="w-full min-w-max ">
              <TableHeader className="bg-gray-50">
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

        {/* Loading */}
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="absolute bottom-0 left-0 right-0   bg-white border-t border-gray-200 p-4">
          <div className="flex justify-center gap-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
              onClick={submit}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg font-medium transition-all duration-300"
              onClick={closeDrawer}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDrawer;
