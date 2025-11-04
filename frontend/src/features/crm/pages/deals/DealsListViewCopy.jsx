import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { invoices } from "./sample/data.js";
import { moreOptions } from "@features/utils/ListViewMenu.jsx";

const LeadsListView = () => {
  return (
    <>
      <div className="flex flex-col p-0">
        <div className="flex items-center justify-between">
          <h5 className="text-2xl font-bold">Leads</h5>
          <div className="flex gap-4">
            <div className="flex flex-wrap items-center gap-1 md:flex-row">
              <Button>
                {" "}
                <Plus /> New Lead{" "}
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                {moreOptions.map((option) => (
                  <DropdownMenuItem key={option.label}>
                    <span className="flex items-center gap-2">
                      {typeof option.icon === "function"
                        ? React.createElement(option.icon, { size: 16 })
                        : option.icon}
                      <span>{option.label}</span>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="my-1" />
      </div>
      <Table className="w-full mt-1">
        <TableHeader>
          <TableRow>
            <TableHead>
              {" "}
              <Checkbox />
            </TableHead>
            <TableHead>Lead Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Lead Source</TableHead>
            <TableHead>Lead Owner </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{invoice.leadName || ""}</TableCell>
              <TableCell>{invoice.company}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell>{invoice.leadSource}</TableCell>
              <TableCell>{invoice.leadOwner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter className="bg-white ">
        <TableRow colSpan={6} className="justify-between">
        <Pagination className="w-full bg-white">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        </TableRow>
      </TableFooter> */}
      </Table>
    </>
  );
};

export default LeadsListView;
