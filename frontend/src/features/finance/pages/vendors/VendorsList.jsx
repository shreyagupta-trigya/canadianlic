import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, Ellipsis } from "lucide-react";
import data from "./sample/data.json";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function VendorList() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        {/* <h2 className="text-2xl ml-2 font-semibold">Active Vendors</h2> */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="text-xl border-0 px-2 ml-5    font-semibold"
            onClick={() => setOpen(!open)}
          >
            {" "}
            Active Vendors{" "}
            <Button
              className="bg-0 hover:bg-0 border-0 outline-0 hover:border-0 hover:outline-0"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
            >
              <ChevronDown
                className={`transition-transform ${
                  open ? "rotate-180" : ""
                } text-blue-700  `}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-35 text-center ">
            <DropdownMenuItem>All Vendors</DropdownMenuItem>
            <DropdownMenuItem>Active Vendors</DropdownMenuItem>
            <DropdownMenuItem>Inactive Vendors</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/vendors/create")}
          >
            + New
          </Button>
          <div className="flex items-right gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-[9px]" size="md">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-45">
                <DropdownMenuItem>Short by</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem>Manage Custom Field</DropdownMenuItem>
                <DropdownMenuItem>Refresh List</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Button variant="outline" size="sm" onClick={()=>navigate('/finance/sales/create-sale')}>
      
                  <IconPlus />
                  <span className="hidden lg:inline">New</span>
                </Button> */}
          </div>
        </div>
      </div>
      <div className="border ">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead className="text-xs p-3 font-medium uppercase">
                Name
              </TableHead>
              <TableHead className="text-xs p-2 font-medium uppercase">
                Vendor Number
              </TableHead>
              <TableHead className="text-xs p-2 font-medium uppercase">
                Company Name
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
                Email
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
                Work Phone
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
                Payables
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
                Unused Credits
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((vendor, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="text-sm text-blue-600 hover:underline cursor-pointer">
                  {vendor.name}
                </TableCell>
                <TableCell className="text-sm p-5">
                  {vendor.vendorNumber}
                </TableCell>
                <TableCell className="text-sm p-5">
                  {vendor.companyName}
                </TableCell>
                <TableCell className="text-sm p-5">{vendor.email}</TableCell>
                <TableCell className="text-sm p-5">{vendor.phone}</TableCell>
                <TableCell className="text-sm p-5">{vendor.payables}</TableCell>
                <TableCell className="text-sm p-5">{vendor.credits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
