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
import dataSample from "./Sample/data.json";
import { X, UploadCloud, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const statusOptions = ["All", "Approved", "Declined"];

const receiveData = [
  {
    Receive: "RR-00124",
    receivedOn: "24 Jan 2024",
  },
];

const creditData = [
  {
    credit: "ION-CN-25-1118",
    date: "24 Jan 2024",
    amount: "	$635.61",
  },
];

const salesData = [
  {
    sales: "SO-25-6470",
    date: "24 May 2024",
    status: "CLOSED",
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

const InvoiceDetailView = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("sales");
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

        {/* Sales Orders List */}
        <div className="h-[calc(100%-50px)] overflow-y-scroll">
          {filteredData.map((po) => (
            <div
              key={po.id}
              className="p-4 hover:bg-gray-100 border-b cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold  truncate">{po.reviewer}</div>
                  <div className="text-sm text-muted-foreground">
                    {po.rma} • {po.date}
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
                <div className="flex flex-col items-end">
                  <div className="font-semibold ">{po.amount}</div>
                  <div className="text-sm text-muted-foreground ">
                    {po.salesOrder}
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
                RMA-00151
              </h2>
              <div className="flex items-center  gap-4 text-sm  font-medium cursor-pointer">
                <span className="">History</span>
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
                    <UploadCloud size={20} />
                    <span>Upload your Files</span>
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
          <Button variant="outline" className="rounded-none">
            Receive
          </Button>

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" rounded-none" size="icon">
                <MoreVertical className="w-4 h-4" />
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

          {/* <div className="border rounded-md overflow-hidden mt-4">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent gap-2 p-0">
            <TabsTrigger value="invoices" className="data-[state=active]:border-b-2  px-2">
              Invoices <Badge className="ml-1 text-blue-600 bg-blue-100">9</Badge>
            </TabsTrigger>
            <TabsTrigger value="packages" className="data-[state=active]:border-b-2  px-2">
              Packages <Badge className="ml-1 text-blue-600 bg-blue-100">56</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {isOpen && (
        <Tabs value={activeTab} className="p-4">
          <TabsContent value="invoices">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b text-muted-foreground font-medium">
                  <tr>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left">Invoice#</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Due Date</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Balance Due</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-4">{inv.date}</td>
                      <td className="text-blue-600 hover:underline cursor-pointer">{inv.invoice}</td>
                      <td className="text-green-600 font-semibold">{inv.status}</td>
                      <td>{inv.dueDate}</td>
                      <td>{inv.amount}</td>
                      <td>{inv.balanceDue}</td>
                      <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-gray-100 hover:bg-blue-600 border border-gray-300 rounded-md w-8 h-8"
                        >
                          <Menu className="h-4 w-4 text-black" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                              side="left"
                              align="start"
                              className="w-36 mt-2 p-2">
                        <DropdownMenuItem className="text-gray-800 hover:bg-blue-600">
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-800 hover:bg-blue-600">
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-800 hover:bg-blue-600">
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-800 hover:bg-blue-600">
                          PDF
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <div className="text-muted-foreground">Packages data will go here...</div>
          </TabsContent>
        </Tabs>
      )}
    </div> */}

          <div className="border rounded-md mt-4">
            {/* Tab Header and Arrow */}
            <div className="flex items-center justify-between border-b p-2 px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent">
                  <TabsTrigger onClick={() => setOpen(!false)} value="receives">
                    Receives{" "}
                    <span className="ml-1 text-xs text-blue-500">1</span>
                  </TabsTrigger>
                  <TabsTrigger onClick={() => setOpen(!false)} value="credit">
                    Credit Notes{" "}
                    <span className="ml-1 text-xs text-blue-500">1</span>
                  </TabsTrigger>
                  <TabsTrigger onClick={() => setOpen(!false)} value="sales">
                    Sales Orders{" "}
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
                  <TabsContent value="receives">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100">
                          <tr className="text-left">
                            <th className="p-2">Recieve#</th>
                            <th className="p-2">Received on</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiveData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-2">{item.Receive}</td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                                {item.receivedOn}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="credit">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100">
                          <tr className="text-left">
                            <th className="p-2">Credit Note#</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {creditData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-2">{item.credit}</td>
                              <td className="p-2">{item.date}</td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                                {item.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="sales">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100">
                          <tr className="text-left">
                            <th className="p-2">Sales Order#</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-2">{item.sales}</td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                                {item.date}
                              </td>
                              <td className="p-2 text-green-600 font-medium">
                                {item.status}
                              </td>

                              {/* <td className="p-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon" className="bg-gray-100 shadow-sm rounded-md">
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

          <div className=" p-10 mt-10 rounded-md">
            <div className="flex gap-5 items-center justify-end">
              <p className="text-sm">
                <i>Show PDF View</i>
              </p>
              <Switch checked={showPDF} onCheckedChange={setShowPDF} />
            </div>
          </div>
          {!showPDF && (
            <div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 ml-3 gap-10 border-t px-20 py-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold mb-2">SALES ORDER</h3>
                  <div className="flex items-center mb-5">
                    <p className="text-sm">Purchase Order#</p>
                    <p className="font-semibold text-sm">PO-25-4644</p>
                  </div>
                  <span className="p-1 bg-blue-700 text-xs  text-white">
                    ISSUED
                  </span>
                  <div className="flex mt-8 gap-10">
                    <p className="text-xs mt-1 ">REFERENCE#</p>
                    <p className="text-sm font-sans">
                      {purchaseOrderDetail[0].reference}
                    </p>
                  </div>
                  <div className="flex gap-10">
                    <p className="text-xs mt-1  ">ORDER DATE</p>
                    <p className="text-sm">
                      {purchaseOrderDetail[0].orderDate}
                    </p>
                  </div>
                  <div className="flex gap-10">
                    <p className="text-xs mt-1  ">DELIVERY DATE</p>
                    <p className="text-sm">
                      {purchaseOrderDetail[0].orderDate}
                    </p>
                  </div>
                  <div className="flex gap-10">
                    <p className="text-xs mt-1  ">PAYMENT TERMS</p>
                    <p className="text-sm">
                      {purchaseOrderDetail[0].paymentTerms}
                    </p>
                  </div>
                  <div className="flex gap-10">
                    <p className="text-xs mt-1  ">PO RECIEVED</p>
                    <p className="text-sm">{purchaseOrderDetail[0].received}</p>
                  </div>
                  <div className="flex gap-10">
                    <p className="text-xs mt-1   ">CRM ID</p>
                    <p className="text-sm">{purchaseOrderDetail[0].crmId}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      VENDOR ADDRESS
                    </p>
                    <p className="text-blue-500 text-sm my-2 whitespace-nowrap">
                      ET2 Contemporary Lighting International
                    </p>
                    <p className="text-blue-600 font-semibold"></p>
                    <pre className="whitespace-pre-wrap text-sm">
                      {purchaseOrderDetail[0].vendorAddress}
                    </pre>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      DELIVERY ADDRESS
                    </p>
                    <pre className="whitespace-pre-wrap text-sm">
                      {purchaseOrderDetail[0].deliveryAddress}
                    </pre>
                  </div>
                </div>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 px-20 py-4 border-t gap-12 ">
                {/* Left Section */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">SALES Return</h3>
                  <p className="text-sm">
                    RMA# <span className="font-bold text-sm">RMA-00150</span>
                  </p>

                  {/* Status */}
                  <div>
                    <div className="space-y-1 text-sm">
                      <div className="flex gap-3 items-center">
                        <span className="w-1 h-4 bg-black"></span>
                        <span className="text-xs text-gray-700">
                          Return Status
                        </span>
                        <span className="px-2 py-0.5 text-white bg-green-800 text-xs font-medium">
                          CLOSED
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="w-1 h-4 bg-orange-600"></span>
                        <span className="text-xs text-gray-700">
                          Receive Status
                        </span>
                        <span className="text-green-600 text-xs">Received</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="w-1 h-4 bg-orange-600"></span>
                        <span className="text-xs text-gray-700">
                          Refund Status
                        </span>
                        <span className="text-blue-600 text-xs">Pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-[130px_1fr] gap-y-2 text-sm mt-6">
                    <p className="text-xs font-semibold text-gray-500">DATE</p>
                    <p className="text-sm">02 Jan 2024</p>

                    <p className="text-xs font-semibold text-gray-500">
                      REASON
                    </p>
                    <p className="text-sm">return</p>

                    <p className="text-xs font-semibold text-gray-500">
                      CUSTOMER PO
                    </p>
                    <p className="text-sm">M2422-154</p>

                    <p className="text-xs font-semibold text-gray-500">
                      JOB NAME
                    </p>
                    <p className="text-sm">Gables At Baldwin Park</p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                  {/* Billing Address */}
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      BILL TO
                    </p>
                    <p className="text-blue-600 text-sm font-semibold mt-1">
                      AIREKO ENERGY SOLUTION US LLC
                    </p>
                  </div>

                  {/* Shipping Address */}
                  {/* <div>
                  <p className="text-sm font-semibold text-gray-500">SHIPPING ADDRESS</p>
                  <pre className="text-sm whitespace-pre-wrap leading-5 mt-1">
            AIREKO ENERGY SOLUTIONS - GABLES AT BALDWIN
            ATTN: ANDREH 407-399-6800
            1801 PROSPECT AVE
            ORLANDO, FLORIDA
            U.S.A - 32801
            407-399-6800
                  </pre>
                </div> */}
                </div>
              </div>

              <Card className="w-full border-none shadow-none px-20 py-4">
                <CardContent className="px-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 font-medium text-gray-500 text-[10px] px-4 py-2 border-b">
                    <div className="col-span-2">ITEMS & DESCRIPTION</div>
                    <div className="col-span-2">QUANTITY</div>
                    <div>RATE</div>
                    <div>AMOUNT</div>
                  </div>

                  {/* Table Row */}
                  <div className="grid grid-cols-6 gap-4 items-start py-4 border-b text-sm px-4">
                    {/* Item Description */}
                    <div className="col-span-2 flex gap-3">
                      <img
                        src="https://res.cloudinary.com/dxwlavykb/image/upload/v1751520655/199db57cb1094f079c53ad3c0168e0fc_uj8d3b.jpg"
                        alt="item"
                        className="w-12 h-10 object-cover border p-1"
                      />
                      <div>
                        <div className="text-blue-600 font-medium hover:underline cursor-pointer">
                          E24716-144BK
                        </div>
                        <div className="text-[13px] text-gray-500">
                          SKU: E24716-144BK
                        </div>
                        <div className="text-[13px] text-gray-500 leading-snug">
                          ET2 Sonata 59" Wide
                          <br />
                          LED Abstract
                          <br />
                          Chandelier Black
                        </div>
                      </div>
                    </div>

                    {/* Quantity (Warehouse Info) */}
                    <div className="col-span-2 text-[13px] leading-snug">
                      Ion Lighting
                      <br />
                      Stock
                      <br />
                      Warehouse
                    </div>

                    {/* Rate */}
                    <div className="text-right text-[13px] flex items-center justify-start">
                      <span className="text-gray-600 font-medium">$419.00</span>
                    </div>

                    {/* Amount */}
                    <div className="text-right text-[13px] flex items-center justify-start">
                      <span className="text-gray-500">419.00</span>
                    </div>
                  </div>

                  {/* Summary Section */}
                </CardContent>
              </Card>
            </div>
          )}
          {showPDF && (
            <div>
              <Card className="border border-gray-300 shadow-sm ">
                <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-orange-500">
                        ION
                      </h1>
                      <p className="text-sm font-medium">
                        ELECTRICAL DISTRIBUTOR
                      </p>
                      <p>Ion Electrical Distributor</p>
                      <p>11483 Rocket Blvd. #2A</p>
                      <p>Orlando Florida 32824</p>
                      <p>U.S.A</p>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-semibold text-xl">Sales Return</p>
                      <p className="text-gray-500 text-sm">RMA# RMA-00151</p>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                      <p className="font-medium mb-1">Vendor Address</p>
                      <p>ET2 Contemporary Lighting International</p>
                      <p>253 N Vineyard Ave.</p>
                      <p>City of Industry</p>
                      <p>91746 CA</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Deliver To</p>
                      <p>Ion Lighting Stock Warehouse</p>
                      <p>11483 Rocket Blvd. #2A</p>
                      <p>Orlando Florida 32824</p>
                      <p>U.S.A</p>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <p>
                        <span className="font-medium">
                          Shipment Preference:
                        </span>{" "}
                        BEST WAY
                      </p>
                      <p>
                        <span className="font-medium">Date:</span> 14 Jul 2025
                      </p>
                      <p>
                        <span className="font-medium">Delivery Date:</span> 21
                        Jul 2025
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">Reference#:</span>{" "}
                        SO-25-6173
                      </p>
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
                      <div>419.00</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="flex justify-end mt-4">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Sub Total</span>
                        <span>$419.00</span>
                      </div>
                      <div className="flex justify-between font-semibold">
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
export default InvoiceDetailView;
