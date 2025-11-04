import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ArrowLeft } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";

const OfferingDrawer = ({ isOpen, onClose }) => {
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
        offeringName: `Offering ${currentOffset + i + 1}`,
        insurancePartner: `Partner ${currentOffset + i + 1}`,
      }));

      setItems((prev) => [...prev, ...newItems]);
      setCurrentOffset((prev) => prev + itemsPerPage);
      setLoading(false);
    }, 1000);
  };

  const submit = () => {
    alert("Form submitted");
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
    item.offeringName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent side="right" className="w-full max-w-2xl">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </DrawerClose>
            <div className="relative flex-1 ml-4">
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            </div>
          </div>
        </DrawerHeader>
        <div className="px-4 pb-4 max-h-[90vh] overflow-y-auto">
          <div className="border rounded-lg overflow-hidden" ref={scrollContainerRef}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold">Offering Name</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Insurance Partner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{item.offeringName}</TableCell>
                    <TableCell>{item.insurancePartner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {loading && <div className="text-center py-2">Loading...</div>}
        </div>
        <DrawerFooter>
          <div className="flex gap-2 w-full">
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white" onClick={submit}>
              Submit
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onClose}>
              Reset
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OfferingDrawer;
