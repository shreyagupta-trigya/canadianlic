import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link, Link2, Menu, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import dataSample from "./Sample/data.json";
import { X, UploadCloud, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { purchaseOrderDetail } from "@/features/utils/ListViewMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const statusOptions = [
  "All",
  "Draft",
  "Pending Approval",
  "Approved",
  "Confirmed",
  "Overdue",
  "Partially Invoiced",
  "Invoiced",
  "For Packaging",
];

const associatedSalesData = [
  {
    date: "26 Jul 2024",
    invoiceNumber: "SO-24-4878",
    status: "CONFIRMED",
    amountCredited: "26 Jul 2024",
  },
  // Add more if needed
];

function ActionDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md w-8 h-8"
        >
          <Menu className="h-4 w-4 text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" align="end" className="w-36 p-2 mt-1">
        <DropdownMenuItem>Delete</DropdownMenuItem>
        <DropdownMenuItem>Email</DropdownMenuItem>
        <DropdownMenuItem>Print</DropdownMenuItem>
        <div className="mt-2 w-full">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-1">
            PDF
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const CreditDetail = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeTab, setActiveTab] = useState(false);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const cancel = () => {
    navigate(-1);
  };

  const filteredData =
    selectedStatus === "All"
      ? dataSample
      : dataSample.filter((po) => po.status === selectedStatus);

  const toggleTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? "" : tab));
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      {/* <div className="w-1/4 border-r  ">
        <div className="p-4 border h-20 w-full  bg-background  flex items-center justify-between">
          <h2 className=" font-semibold">All Sales Orders</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-orange-500">
              +
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Import</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="h-[calc(100%-50px)] overflow-y-scroll">
          {dataSample.map((po, index) => (
            <div
              key={po.id}
              className={`p-4 hover:bg-gray-100 border-b cursor-pointer ${
                index === 0 ? "" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-xl truncate">
                    {po.reviewer}
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground">
                    {po.po} • {po.date}
                  </div>
                  <span
                    className={`text-sm mt-1 ${
                      po.status === "Done"
                        ? "text-green-500"
                        : po.status === "In Process"
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {po.status}
                  </span>
                </div>
                <div className="font-semibold">{po.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="w-1/3 border-r">
        {/* Dropdown Header */}
        <div className="p-4 border h-20 w-full bg-background flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="font-semibold">
                {selectedStatus} <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onSelect={() => setSelectedStatus(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-orange-500">
              +
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Import</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="h-[calc(100%-50px)] overflow-y-scroll">
          {filteredData.map((po) => (
            <div
              key={po.id}
              className="p-4 hover:bg-gray-100 border-b cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold  truncate">
                    {po.customerName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {po.creditNote} • {po.date}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      po.status === "Done"
                        ? "text-green-500"
                        : po.status === "In Process"
                        ? "text-blue-500"
                        : "text-blue-500"
                    }`}
                  >
                    {po.status}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold ">{po.amount}</div>
                  <div className="text-sm text-muted-foreground ">
                    {po.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Detail Panel */}
      <div className="w-3/4  ">
        <div className=" border h-20 w-full  bg-background ">
          <div className="flex justify-between p-[25px] items-center">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 w-full">
              <h2 className="text-xl whitespace-nowrap font-semibold">
                ION-CN-25-1104
              </h2>
              <div className="flex items-center  gap-4 text-sm text-blue-600 font-medium cursor-pointer">
                <span
                  className="flex items-center gap-2"
                  onClick={() => setShowAttachments(true)}
                >
                  <Link size={15} /> Upload files
                </span>
                <span className="">💬 Comments & History</span>
                <button
                  className="text-black text-xl font-bold"
                  onClick={cancel}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
          {/* Attachment Modal */}
          {showAttachments && (
            <div className="fixed top-30 left-[77%] transform -translate-x-1/2 bg-white shadow-lg border rounded-md w-[300px] z-50">
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <h4 className="font-semibold text-sm">Attachments</h4>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => setShowAttachments(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-4 py-3 text-center text-sm text-gray-500">
                No Files Attached
              </div>

              <div className="px-4 pb-4">
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50">
                  <div className="flex justify-center items-center gap-2 text-gray-500">
                    <Label htmlFor="file">
                      <UploadCloud size={20} />
                      <span>Upload your Files</span>
                      <input type="file" className="hidden" id="file" />
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">
                  You can upload a maximum of 10 files, 10MB each
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex border  w-full rounded-none">
          <Button variant="outline" className="rounded-none">
            Edit
          </Button>
          <Button
            onClick={() => navigate("/finance/credit/mail")}
            variant="outline"
            className="rounded-none"
          >
            Send Email
          </Button>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-none">
            Reminders
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem  onClick={()=>navigate("/finance/credit/mail")}>Send Email</DropdownMenuItem>
            <DropdownMenuItem>Stop Reminders</DropdownMenuItem>
            <DropdownMenuItem>Expected Payment Date</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none">
                PDF/Print
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Print</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className=" rounded-none">
            Apply to invoices
          </Button>

          <Button variant="outline" className="rounded-none">
            Refund
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" rounded-none" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-6 h-[calc(100%-200px)] overflow-y-scroll">
          {/* <div className="border p-3 rounded-md bg-muted/50">
            <div className="font-bold  text-sm  ">✨ WHAT'S NEXT?</div>
            <div className="flex items-center text-[13px] justify-between">
              <p>
             Send this Invoice to your customer or mark it as Sent.
              </p>
              <div className="flex gap-2">
                <Button className="bg-orange-500 text-white">
                  Send Invoice
                </Button>
                <Button variant="outline">Mark As Sent</Button>
              </div>
            </div>
          </div> */}

          <div className="border rounded-md mt-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-2 px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent">
                  <TabsTrigger onClick={() => setOpen(!open)} value="">
                    Credit Applied Invoices{" "}
                    <span className="ml-1 text-xs text-blue-500">1</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(!open)}
              >
                <ChevronDown
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </Button>
            </div>

            {/* Table Section */}
            {open && (
              <div className="p-2">
                <Tabs value={activeTab}>
                  <TabsContent value="">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100">
                          <tr className="text-left">
                            <th className="p-2">Date</th>
                            <th className="p-2">Invoice Number</th>
                            <th className="p-2">Amount Credited </th>

                            <th className="p-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {associatedSalesData.map((item, i) => (
                            <tr
                              key={i}
                              className="border-b hover:bg-gray-50 whitespace-nowrap"
                            >
                              <td className="p-2">{item.date}</td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                                {item.invoiceNumber}
                              </td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                                {item.amountCredited}
                              </td>
                              <td className="p-2 text-red-500  cursor-pointer">
                                <Trash size={17} />
                              </td>

                              {/* <td className="p-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="bg-gray-100 shadow-sm rounded-md"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-32 p-0 ml-[-90px]">
                              <ul className="text-sm">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Email</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Print</li>
                                <li className="px-4 py-2 font-semibold text-white bg-blue-500 text-center cursor-pointer">
                                  PDF
                                </li>
                              </ul>
                            </PopoverContent>
                          </Popover>
                        </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>

          <Card className="border border-gray-300 shadow-sm w-full mt-10">
            <CardContent className="p-6 space-y-4 text-sm text-gray-700">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-9xl font-bold text-orange-500">ION</h1>
                  <p className="text-sm font-medium">ELECTRICAL DISTRIBUTOR</p>
                  <p>Ion Electrical Distributor</p>
                  <p>11483 Rocket Blvd. #2A</p>
                  <p>Orlando Florida 32824</p>
                  <p>U.S.A</p>
                </div>

                <div className="text-right space-y-1">
                  <p className="font- text-4xl">Credit Note</p>
                  <p className="text-gray-500 text-sm"># ION-25-4654</p>
                </div>
              </div>

              <div className="flex justify-between text-sm w-full">
                <div>
                  <p className="text-muted-foreground  mt-8">Bill To</p>
                  <p className="text-blue-600 font-medium cursor-pointer">
                    AIREKO ENERGY SOLUTION US LLC
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Credit Date :</span>
                    <span>05 Jun 2025</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Reff# :</span>
                    <span>SO-25-5893</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">CUSTOMER PO :</span>
                    <span>56/60002212</span>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="mt-6 border border-gray-300">
                <div className="grid grid-cols-5 font-semibold bg-gray-100 px-4 py-2">
                  <div className="col-span-2">Item & Description</div>
                  <div>Qty</div>
                  <div>Rate</div>
                  <div>Amount</div>
                </div>
                <div className="grid grid-cols-5 border-t border-b px-4 py-3 text-sm">
                  <div className="col-span-2">
                    <p className="text-blue-600 font-medium hover:underline cursor-pointer">
                      E24716-144BK
                    </p>
                    <p className="text-xs">SKU: E24716-144BK</p>
                    <p className="text-xs">
                      ET2 Sonata 59" Wide LED Abstract Chandelier Black
                    </p>
                  </div>
                  <div>1.00</div>
                  <div>$419.00</div>
                  <div>$419.00</div>
                </div>
              </div>

              {/* Summary */}
              <div className="flex justify-end mt-4">
                <div className="w-64 space-y-2">
                  <div className="space-y-2 w-fit text-sm text-right">
                    <div className="flex justify-between gap-4">
                      <span>Sub Total</span>
                      <span>49.00</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>Florida Sales Tax (6%)</span>
                      <span>2.94</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>
                        Surtax%: 0.50, <br />
                        County Name: <span className="font-medium">Orange</span>
                      </span>
                      <span>0.25</span>
                    </div>

                    <div className="flex justify-between gap-4 font-semibold">
                      <span>Total</span>
                      <span>$52.19</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>Credits Used</span>
                      <span className="text-red-600">(-) 52.18</span>
                    </div>

                    <div className="bg-muted w-62 px-4 py-2">
                      <div className="p-0 flex justify-between font-medium text-base">
                        <span>Credits Remaining</span>
                        <span>$0.01</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom info */}
          <div className="flex justify-end mt-5">
            <div className="text-sm">
              <p>
                PDF Template : 'Standard Template'{" "}
                <span className="text-blue-400 cursor-pointer">Change</span>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 space-y-8">
            {/* More Information Section */}
            <div>
              <p className="mb-4 text-lg font-semibold">More Information</p>

              <div className="grid grid-cols-[150px_10px_1fr] gap-y-2 text-sm">
                <p className="text-gray-400">Salesperson</p>
                <p className="text-black">:</p>
                <p className="text-black">Brian Garcia</p>

                <p className="text-gray-400">Potential</p>
                <p className="text-black">:</p>
                <p className="text-blue-500 hover:underline cursor-pointer">
                  OHPA Lake Nona
                </p>

                <p className="text-gray-400 flex items-center gap-1">
                  Email Recipients
                  <span title="Information" className="text-xs text-gray-400">
                    ⓘ
                  </span>
                </p>
                <p className="text-black">:</p>
                <p className="text-black">earlh@entrustelectrical.com</p>
              </div>
            </div>

            {/* Custom Fields Section */}
            <div>
              <p className="mb-4 text-lg font-semibold">CUSTOM FIELDS</p>

              <div className="grid grid-cols-[150px_10px_1fr] gap-y-2 text-sm">
                <p className="text-black font-medium">Job Name</p>
                <p className="text-black">:</p>
                <p className="text-black">Orlando health nona</p>

                <p className="text-black font-medium">CUSTOMER PO</p>
                <p className="text-black">:</p>
                <p className="text-black">OHN 1055</p>

                <p className="text-black font-medium">Calculate Surtax</p>
                <p className="text-black">:</p>
                <p className="text-black">Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditDetail;
