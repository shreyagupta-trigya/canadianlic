import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

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
    <div className={`drawer ${isVisible ? "is-visible" : ""} ${isOpen ? "is-open" : ""}`}>
      <div
        className="drawer__overlay"
        style={{ transitionDuration: `${speed}ms` }}
        onClick={closeDrawer}
      ></div>
      <div
        className="drawer__content"
        style={{
          maxWidth,
          transitionDuration: `${speed}ms`,
          backgroundColor,
        }}
      >
        <div className="header d-flex justify-content-between">
          <div className="px-3 py-1">
            <button onClick={closeDrawer} className="btn btn-link">
              <i className="fa fa-arrow-right cursor-pointer"></i>
            </button>
          </div>
          <div className="search-container mt-3 mb-2" style={{ textAlign: "end" }}>
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
        <div className="table-container border mt-3" ref={scrollContainerRef}>
          <div className="table-wrapper">
            <Table className="table table-striped">
              <TableHeader>
                <TableRow>
                  <TableHead className="ps-2 pe-1 pb-0">
                    <Checkbox onCheckedChange={toggleSelectAll} />
                  </TableHead>
                  <TableHead className="px-1">Type</TableHead>
                  <TableHead className="px-1">Campaign Name</TableHead>
                  <TableHead className="px-1">Status</TableHead>
                  <TableHead className="px-1">Start Date</TableHead>
                  <TableHead className="px-1">End Date</TableHead>
                  <TableHead className="px-1">Expected Revenue</TableHead>
                  <TableHead className="px-1">Campaign Subject</TableHead>
                  <TableHead className="px-1">Sender Name</TableHead>
                  <TableHead className="px-1">Sender Address</TableHead>
                  <TableHead className="px-1">Reply-to Address</TableHead>
                  <TableHead className="px-1">Survey Department</TableHead>
                  <TableHead className="px-1">Survey Type</TableHead>
                  <TableHead className="px-1">Survey</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={(checked) =>
                          setItems((prev) =>
                            prev.map((i) =>
                              i.id === item.id ? { ...i, selected: checked } : i
                            )
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.campaignName}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.endDate}</TableCell>
                    <TableCell>{item.expectedRevenue}</TableCell>
                    <TableCell>{item.campaignSubject}</TableCell>
                    <TableCell>{item.senderName}</TableCell>
                    <TableCell>{item.senderAddress}</TableCell>
                    <TableCell>{item.replyToAddress}</TableCell>
                    <TableCell>{item.surveyDepartment}</TableCell>
                    <TableCell>{item.surveyType}</TableCell>
                    <TableCell>{item.survey}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {loading && <div className="text-center py-2">Loading...</div>}
        <div className="d-flex justify-content-center gap-2 w-100 mt-4 position-fixed bg-white" style={{ bottom: 0 }}>
          <Button className="btn btn-info" onClick={submit}>
            Submit
          </Button>
          <Button className="btn btn-danger" onClick={closeDrawer}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDrawer;
