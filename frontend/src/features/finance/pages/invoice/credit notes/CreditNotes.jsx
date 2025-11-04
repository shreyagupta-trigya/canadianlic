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
import { ChevronDown, Ellipsis, Link2, Link2Icon, Link2Off, Mail, Search } from "lucide-react";
import data from "./sample/data.json";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function CreditNotes() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        {/* <h2 className="text-2xl ml-2 font-semibold">Active Vendors</h2> */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="text-xl border-0 px-2 ml-5 text-black    font-semibold"
            onClick={() => setOpen(!open)}
          >
            {" "}
            All Credits Notes{" "}
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
            <DropdownMenuItem>All </DropdownMenuItem>
            <DropdownMenuItem>Aproved</DropdownMenuItem>
            <DropdownMenuItem> Pending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/finance/credit/credit-note-form")}
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
                DATE
              </TableHead>
              <TableHead className="text-xs p-2 font-medium uppercase">
              CREDIT NOTE#
              </TableHead>
              <TableHead className="text-xs p-2 font-medium uppercase">
                REFERENCE NUMBER
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
                CUSTOMER NAME
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
                INVOICE#
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
             STATUS
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
               AMOUNT
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
               BALANCE
              </TableHead>
              <TableHead className="text-xs p-5 font-medium uppercase">
               <Search className="text-blue-600" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((note, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="text-sm ">
                  {note.date}
                </TableCell>
                <TableCell 
                onClick={()=>navigate("/finance/credit/credit-note-detail")}
                 className="text-sm p-5 text-blue-600 hover:underline cursor-pointer">
                  {note.creditNote} <span className="text-gray-500"><Mail size={15} /></span>
                </TableCell>
                <TableCell className="text-sm p-5">
                  {note.referenceNumber}
                </TableCell>
                <TableCell className="text-sm p-5">{note.customerName}</TableCell>
                <TableCell className="text-sm p-5">{note.invoice}</TableCell>
                <TableCell className="text-sm p-5">{note.status}</TableCell>
                <TableCell className="text-sm p-5">{note.amount}</TableCell>
                <TableCell className="text-sm p-5">{note.balance}</TableCell>
                <TableCell className="text-sm p-5"><Link2Icon/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
