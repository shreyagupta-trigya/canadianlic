import * as React from "react";
import quotesData from "./sample/data.json";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconDotsVertical,
  IconLayoutColumns,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DragHandle } from "@/features/projectsTracker/components/TableComponents";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";

const QuoteList = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
 function handleDelete() {
        if (idToDelete !== "") {
            setDeleteLoading(true);
            deleteAccount(idToDelete).then((res) => {
                if (res.data.success) {
                    dispatch(deleteAccountFromList(idToDelete))
                    toast.success("Account Deleted Successfully")
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message || err.message)
            }).finally(() => {
                setDeleteLoading(false);
                setOpenAlert(false)
            })
        }
    }
  return (
    <>
    <div className="mx-1 lg:mx-2 flex flex-col gap-6">
    
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <Tabs defaultValue="All" className="flex-1">
  <TabsList>
    <TabsTrigger value="All">All</TabsTrigger>
    <TabsTrigger value="Draft">Draft</TabsTrigger>
    <TabsTrigger value="Close">Close</TabsTrigger>
    <TabsTrigger value="Approved">Approved</TabsTrigger>
    <TabsTrigger value="Rejected">Rejected</TabsTrigger>
    <TabsTrigger value="Pending">Pending</TabsTrigger>
    <TabsTrigger value="Invoice">Invoice</TabsTrigger>
  </TabsList>

<TabsContent value="All"></TabsContent>
  <TabsContent value="Draft"></TabsContent>
  <TabsContent value="Close"></TabsContent>
  <TabsContent value="Approved"></TabsContent>
  <TabsContent value="Rejected"></TabsContent>
  <TabsContent value="Pending"></TabsContent>
  <TabsContent value="Invoice"></TabsContent>
</Tabs>


        <div className="flex gap-2">
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm">
      <IconLayoutColumns />
      <span className="hidden lg:inline">Customize Columns</span>
      <span className="lg:hidden">Columns</span>
      <IconChevronDown />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-50 max-h-60 overflow-y-auto"
  >
    <DropdownMenuCheckboxItem checked>
      Quote No
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Date
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Company
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Reference No
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Recipient Phone No.
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Email
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Status
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>
      Total Amount
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>


          <Button variant="outline" size="sm" onClick={() => navigate("/crm/quotes/create")}>
            <IconPlus />
            <span className="hidden lg:inline">Create Quote</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-12">
                <div className="flex items-center justify-center">
                  <Checkbox aria-label="Select all" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">Quote No</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Reference No</TableHead>
              <TableHead className="font-semibold">Recipient Phone No</TableHead>
              <TableHead className="font-semibold">Quote Status</TableHead>
              <TableHead className="font-semibold text-right">Email</TableHead>
              <TableHead className="font-semibold text-right">Created Date Time</TableHead>
              <TableHead className="font-semibold text-right">Modified Date Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {quotesData.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="w-12">
                  <DragHandle />
                </TableCell>

                <TableCell className="w-12">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem onClick={() => navigate("/crm/quotes/create")}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/crm/quotes/detail")}>
                        Detail View
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                       <DropdownMenuItem onClick={() =>{ setOpenAlert(true);}} variant="destructive">Delete</DropdownMenuItem>
                               </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell className="w-12">
                  <div className="flex items-center justify-center">
                    <Checkbox aria-label="Select row" />
                  </div>
                </TableCell>

                <TableCell onClick={() => navigate("/crm/quotes/detail")}>{quote.quoteNo}</TableCell>
                <TableCell>{quote.date}</TableCell>
                <TableCell>{quote.company}</TableCell>
                <TableCell>{quote.refNo}</TableCell>
                <TableCell>{quote.phone}</TableCell>
                {/* <TableCell>{quote.quoteStatus || "-"}</TableCell> */}
                <TableCell>
  {(() => {
    const quoteStatus = quote.quoteStatus; // use correct variable

    // Define colors for each status
   const statusColors = {
  Draft: "border-yellow-700 bg-yellow-50 text-yellow-700",
  Close: "border-gray-700 bg-gray-50 text-gray-700",
  Approved: "border-green-700 bg-green-50 text-green-700",
  Reject: "border-red-700 bg-red-50 text-red-700",
  Invoice: "border-purple-700 bg-purple-50 text-purple-700",
  Pending: "border-blue-700 bg-blue-50 text-blue-700",
};


    const badgeClass = statusColors[quoteStatus] || "border-gray-700 bg-gray-50 text-gray-700";

    return (
      <div
        className={`inline-block px-2 py-1 text-xs font-medium rounded-sm border ${badgeClass}`}
      >
        {quoteStatus}
      </div>
    );
  })()}
</TableCell>

                <TableCell className="text-right">{quote.email}</TableCell>
                <TableCell className="text-right">{quote.createdDateTime || "-"}</TableCell>
                <TableCell className="text-right">{quote.modifiedDateTime || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          0 of 0 row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select defaultValue="10">
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent side="auto">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page 1 of 0
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" disabled>
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button variant="outline" className="hidden lg:flex" size="icon" disabled>
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
     <TableDataDeleteAlert loading={deleteLoading} handleDelete={handleDelete} open={openAlert} setOpen={setOpenAlert} />
     </>
  );
};

export default QuoteList;
