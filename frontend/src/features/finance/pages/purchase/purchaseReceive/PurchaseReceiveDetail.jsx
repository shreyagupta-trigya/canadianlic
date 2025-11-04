import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
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
import dataSample from "./sample/data.json";
import { X, UploadCloud, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const statusOptions = [
  "All",
  "In Transit",
  "Received",
  "Billed",
  "Partially Billed",
];

const billData = [
  {
    date: "01 Mar 2024",
    bill: "BILL-24-4831",
    status: "PAID",
    dueDate: "31 Mar 2024",
    amount: "$71,045.00",
    balanceDue: "$0.00",
  },
];

const receiveData = [
  {
    po: "PO-25-4332",
    date: "24 Jan 2024",
    status: "ISSUED",
  },
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

const PurchaseReceiveDetail = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("invoices");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const cancel = () => {
    navigate(-1);
  };

  const filteredData =
    selectedStatus === "All"
      ? dataSample
      : dataSample.filter((po) => po.status === selectedStatus);

  return (
    <div className="flex  h-screen">

      <div className="w-full lg:w-1/4 hidden lg:block border-r">
        {/* Dropdown Header */}
        <div className="p-3 sm:p-4 border h-16 sm:h-20 w-full bg-background flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="font-semibold text-sm sm:text-base">
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
            <Button
              onClick={() => navigate("/purchase-recieve/create")}
              size="sm"
              className="bg-orange-500 text-xs sm:text-sm"
            >
              +
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
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

        {/* Sales Orders List */}
        <div className="h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] overflow-y-auto">
          {filteredData.map((po) => (
            <div
              key={po.id}
              className="p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-gray-800 border-b cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-base truncate">
                    {po.reviewer}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">
                    {po.pr} • {po.po}
                  </div>
                  <span
                    className={`text-xs sm:text-sm mt-1 ${
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
                <div className="font-semibold text-sm sm:text-base ml-2 flex-shrink-0">
                  {po.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="w-full lg:w-3/4  overflow-auto">
        {/* Header */}
        <div className="border h-16 sm:h-20 w-full bg-background">
          <div className="flex justify-between p-3 sm:p-6 items-center">
            <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold truncate">
                PO-25-46124
              </h2>
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-blue-600 font-medium cursor-pointer flex-shrink-0">
                <span onClick={() => setShowAttachments(true)} className="whitespace-nowrap">
                  📎 Upload files
                </span>
                <span className="hidden sm:inline">💬 Comments & History</span>
                <button
                  className="text-black dark:text-white text-xl font-bold ml-2"
                  onClick={cancel}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Attachment Modal */}
          {showAttachments && (
            <div className="fixed top-20 right-4 sm:right-auto sm:left-1/2 sm:transform sm:-translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg border rounded-md w-[90vw] sm:w-[300px] z-50">
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
                <div className="border border-dashed border-gray-300 hover:border-blue-400 rounded-md p-4 text-center cursor-pointer  ">
                  <Label
                    htmlFor="file-upload"
                    className="flex justify-center p-2 items-center gap-2 text-gray-500 text-sm"
                  >
                    <UploadCloud size={20} />
                    <span>Upload your Files</span>
                    <input id="file-upload" className="hidden" type="file" />
                  </Label>
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">
                  You can upload a maximum of 10 files, 10MB each
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap border w-full">
          <Button variant="outline" className="rounded-none flex-1 sm:flex-none text-xs sm:text-sm">
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none flex-1 sm:flex-none text-xs sm:text-sm">
                PDF/Print
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Print</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => navigate("/bills/bills-form")}
            variant="outline"
            className="rounded-none flex-1 sm:flex-none text-xs sm:text-sm"
          >
            Convert to Bill
          </Button>

          <Button variant="outline" className="rounded-none flex-1 sm:flex-none text-xs sm:text-sm">
            Mark as In Transit
          </Button>

          <Button variant="outline" className="rounded-none flex-1 sm:flex-none text-xs sm:text-sm">
            Delete
          </Button>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-4 lg:p-6 h-[calc(100vh-200px)] overflow-y-auto">
          {/* Tabs Section */}
          <div className="border rounded-md mt-4">
            {/* Tab Header and Arrow */}
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between border-b p-2 sm:p-3 px-3 sm:px-4 cursor-pointer"
            >
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="bg-transparent w-full sm:w-auto">
                  <TabsTrigger value="invoices" className="text-xs sm:text-sm">
                    Bills <span className="ml-1 text-xs text-blue-500">1</span>
                  </TabsTrigger>
                  <TabsTrigger value="packages" className="text-xs sm:text-sm">
                    Purchase Orders{" "}
                    <span className="ml-1 text-xs text-blue-500">1</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 flex-shrink-0"
              >
                <ChevronDown
                  className={`transition-transform ${open ? "rotate-180" : ""} w-4 h-4`}
                />
              </Button>
            </div>

            {/* Table Section */}
            {open && (
              <div className="p-2 sm:p-3">
                <Tabs value={activeTab}>
                  <TabsContent value="invoices" className="mt-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs sm:text-sm border">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr className="text-left">
                            <th className="p-2 whitespace-nowrap">Bill#</th>
                            <th className="p-2 whitespace-nowrap">Date</th>
                            <th className="p-2 whitespace-nowrap">Status</th>
                            <th className="p-2 whitespace-nowrap">Due Date</th>
                            <th className="p-2 whitespace-nowrap">Amount</th>
                            <th className="p-2 whitespace-nowrap">Balance Due</th>
                            <th className="p-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {billData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-600 ">
                              <td className="p-2 cursor-pointer text-blue-600 whitespace-nowrap">
                                <button
                                  onClick={() => navigate("/bills/bills-detail")}
                                  className="text-left"
                                >
                                  {item.bill}
                                </button>
                              </td>
                              <td className="p-2 whitespace-nowrap">{item.date}</td>
                              <td className="p-2 text-green-600 font-medium whitespace-nowrap">
                                {item.status}
                              </td>
                              <td className="p-2 whitespace-nowrap">{item.dueDate}</td>
                              <td className="p-2 whitespace-nowrap">{item.amount}</td>
                              <td className="p-2 whitespace-nowrap">{item.balanceDue}</td>
                              <td className="p-2">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="bg-gray-100 dark:bg-gray-800 shadow-sm rounded-md w-8 h-8"
                                    >
                                      <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-32 p-0 sm:ml-[-90px]">
                                    <ul className="text-sm">
                                      <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">
                                        Delete
                                      </li>
                                      <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">
                                        Email
                                      </li>
                                      <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">
                                        Print
                                      </li>
                                      <li className="px-3 py-2 font-semibold text-white bg-blue-500 text-center cursor-pointer text-xs sm:text-sm">
                                        PDF
                                      </li>
                                    </ul>
                                  </PopoverContent>
                                </Popover>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="packages" className="mt-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs sm:text-sm border">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr className="text-left">
                            <th className="p-2 whitespace-nowrap">DATE</th>
                            <th className="p-2 whitespace-nowrap">Purchase Order#</th>
                            <th className="p-2 whitespace-nowrap">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiveData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="p-2 whitespace-nowrap">{item.date}</td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                                <span
                                  onClick={() => navigate("/purchase/purchase-detail")}
                                >
                                  {item.po}
                                </span>
                              </td>
                              <td className="p-2 text-green-600 font-medium whitespace-nowrap">
                                {item.status}
                              </td>
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

          {/* PDF Toggle */}
          <div className="p-4 sm:p-6 lg:p-10 flex justify-end mt-6 sm:mt-8 lg:mt-10 rounded-md dark:bg-gray-800 bg-gray-50">
            <div className="flex flex-row  gap-3 sm:gap-5 w-40 items-center justify-end">
              <p className="text-sm">
                <i>Show PDF View</i>
              </p>
              <Switch checked={showPDF} onCheckedChange={setShowPDF} />
            </div>
          </div>

          {/* Content View */}
          {!showPDF ? (
            <div className="mt-6">
              {/* Purchase Receive Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 lg:px-20 py-4 border-t gap-6 lg:gap-12">
                {/* Left Section */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold">PURCHASE RECEIVE</h3>
                  <p className="text-sm">
                    Receive#{" "}
                    <span className="font-bold text-sm">PR-22-04091</span>
                  </p>

                  {/* Status */}
                  <div className="space-y-2 text-sm">
                    <p className="text-xs font-semibold text-gray-500">STATUS</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                      <span className="text-xs text-gray-700">Receive</span>
                      <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium w-fit">
                        RECEIVED
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-14">
                      <span className="text-xs text-gray-700">Bill</span>
                      <span className="text-blue-600 text-xs">
                        Partially Billed
                      </span>
                    </div>
                  </div>

                  {/* PO Details */}
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm mt-4 lg:mt-6">
                    <p className="text-xs font-semibold text-gray-500">
                      PURCHASE ORDER#
                    </p>
                    <p className="text-blue-600 font-medium">PO-25-4332</p>

                    <p className="text-xs font-semibold text-gray-500">DATE</p>
                    <p className="text-sm">30 May 2025</p>

                    <p className="text-xs font-semibold text-gray-500">
                      ZCRM ID
                    </p>
                    <p className="text-sm">4641420000038409001</p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="space-y-4 lg:space-y-6 mt-6 lg:mt-0">
                  {/* Vendor Info */}
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      VENDOR NAME
                    </p>
                    <p className="text-blue-600 text-sm font-semibold mt-1">
                      Siemens Corporation
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <Card className="w-full border-none shadow-none px-4 sm:px-8 lg:px-20 py-4">
                <CardContent className="px-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 sm:gap-6 lg:gap-12 font-medium text-gray-500 text-[10px] sm:text-xs px-2 sm:px-4 py-2 border-b">
                    <div>#</div>
                    <div className="col-span-2">ITEMS & DESCRIPTION</div>
                    <div>QUANTITY</div>
                    <div className="sm:ml-[-15px]">STATUS</div>
                  </div>

                  {/* Table Rows */}
                  {[1, 2].map((item) => (
                    <div key={item} className="grid grid-cols-6 gap-4 sm:gap-6 items-start py-3 sm:py-4 border-b text-sm">
                      <div className="text-[13px] text-gray-600 pl-2 sm:pl-4">{item}</div>
                      <div className="col-span-2 flex gap-2 sm:gap-3">
                        <img
                          src="https://res.cloudinary.com/dxwlavykb/image/upload/v1751520655/199db57cb1094f079c53ad3c0168e0fc_uj8d3b.jpg"
                          alt="item"
                          className="w-10 h-8 sm:w-12 sm:h-10 object-fill border p-1 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-blue-600 font-medium hover:underline cursor-pointer text-xs sm:text-sm truncate">
                            {item === 1 ? "LOT PRICE" : "HNF363R HDSS NF 3P3W 600V 100A N3R"}
                          </div>
                          <div className="text-[12px] sm:text-[13px] text-gray-500">
                            {item === 1 ? "*** CRESSWIND POWER" : "SKU: SIEHNF363R"}
                          </div>
                          {item === 2 && (
                            <div className="text-[12px] sm:text-[13px] text-gray-500">HNF363R</div>
                          )}
                        </div>
                      </div>
                      <div className="text-[13px] pl-2 sm:pl-4">
                        1 <span className="text-[13px] text-gray-500">pc</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ) : (
            /* PDF View */
            <div className="mt-6">
              <Card className="border border-gray-300 shadow-sm">
                <CardContent className="p-4 sm:p-6 space-y-4 text-sm text-gray-700">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-orange-500">
                        ION
                      </h1>
                      <p className="text-sm font-medium">
                        ELECTRICAL DISTRIBUTOR
                      </p>
                      <p className="text-xs sm:text-sm">Ion Electrical Distributor</p>
                      <p className="text-xs sm:text-sm">11483 Rocket Blvd. #2A</p>
                      <p className="text-xs sm:text-sm">Orlando Florida 32824</p>
                      <p className="text-xs sm:text-sm">U.S.A</p>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-semibold text-xl sm:text-2xl lg:text-3xl">Purchase Receive</p>
                      <p className="text-gray-500 text-sm"># PR-22-04091</p>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div>
                      <p className="font-medium mb-1 text-sm">Vendor Address</p>
                      <p className="text-xs sm:text-sm">ET2 Contemporary Lighting International</p>
                      <p className="text-xs sm:text-sm">253 N Vineyard Ave.</p>
                      <p className="text-xs sm:text-sm">City of Industry</p>
                      <p className="text-xs sm:text-sm">91746 CA</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1 text-sm">Deliver To</p>
                      <p className="text-xs sm:text-sm">Ion Lighting Stock Warehouse</p>
                      <p className="text-xs sm:text-sm">11483 Rocket Blvd. #2A</p>
                      <p className="text-xs sm:text-sm">Orlando Florida 32824</p>
                      <p className="text-xs sm:text-sm">U.S.A</p>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                    <div>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium">Shipment Preference:</span> BEST WAY
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium">Date:</span> 14 Jul 2025
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium">Delivery Date:</span> 21 Jul 2025
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium">Reference#:</span> SO-25-6173
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="mt-4 sm:mt-6 border border-gray-300">
                    <div className="grid grid-cols-5 font-semibold bg-gray-100 dark:bg-gray-400 px-3 sm:px-4 py-2 text-xs sm:text-sm">
                      <div className="col-span-2">Item & Description</div>
                      <div>Qty</div>
                      <div>Rate</div>
                      <div>Amount</div>
                    </div>
                    <div className="grid grid-cols-5 border-t border-b px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
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
                      <div>419.00</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="flex justify-end mt-4">
                    <div className="w-full sm:w-64 space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Sub Total</span>
                        <span>$419.00</span>
                      </div>
                      <div className="flex justify-between font-semibold text-sm">
                        <span>Total</span>
                        <span>$419.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseReceiveDetail;