import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreHorizontal } from 'lucide-react';
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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { purchaseOrderDetail } from "@/features/utils/ListViewMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";


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
]

  const associatedSalesData = [
    {
      date: "26 Jul 2024",
      salesOrder: "SO-24-4878",
      status: "CONFIRMED",
      shipmentDate: "26 Jul 2024",
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
  )
}


const InvoiceDetailView = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("sales");
   const [open, setOpen] = useState(true);

    const location = useLocation()
    const dispatch = useDispatch()
    const invoice = location.state;
    const [formData, setFormData] = useState({
    customerId: "",
    invoiceNumber: "",
    orderNumber: "",
    invoiceDate: "",
    dueDate: "",
    paymentTerm: "",
    salespersonId: "",
    jobName: "",
    jobNumber: "",
    trackingNumber: "",
    carrierName: "",
    customerPO: "",
    surtaxOption: "",

    items: [
      {
        itemDetails: null, 
        description: "",
        cost: 0,
        shipDate: "",
        fixtureType: "",
        freightCarrier: "",
        quantity: 1,
        rate: 0,
        tax: "", 
      },
    ],
    customerNotes: "",
    shippingCharges: 0,
    discountPercent: 0,
    surtax: 0,
    termsAndConditions: "",
    attachedFiles: [], 
  });


    useEffect(() => {
        if (invoice) {
            setFormData({ ...invoice, }); // prefill the form
            console.log(invoice, 'invoice from location state')
        }
    }, [invoice]);

  const navigate = useNavigate();
  const cancel = () => {
    navigate(-1);
  };

    const filteredData =
    selectedStatus === "All"
      ? dataSample
      : dataSample.filter((po) => po.status === selectedStatus)

  const toggleTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? "" : tab))
  }

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
                <div className="font-semibold  truncate">
                  {po.reviewer}
                </div>
                <div className="text-sm text-muted-foreground">
                  {po.inv} • {po.date}
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
               <div className="text-sm text-muted-foreground ">{po.date}</div>
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
              {formData.invoice}
              </h2>
              <div className="flex items-center  gap-4 text-sm text-blue-600 font-medium cursor-pointer">
                <span className="" onClick={() => setShowAttachments(true)}>
                  📎 Upload files
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
             Send Email
          </Button>
          <Button variant="outline" className=" rounded-none">
            Share
          </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none">
                Reminders
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Send Email</DropdownMenuItem>
              <DropdownMenuItem>Stop Reminders</DropdownMenuItem>
              <DropdownMenuItem>Expected Payment Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
              <Button variant="outline" className="rounded-none">
                Record Payment
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem> Record Payment</DropdownMenuItem>
              <DropdownMenuItem>Charge Customer</DropdownMenuItem>
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
          <div className="border p-3 rounded-md bg-muted/50">
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
          </div>


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
      {/* Header */}
      <div className="flex items-center justify-between border-b p-2 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent">
            <TabsTrigger value="sales">
              Associated sales orders{" "}
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
            <TabsContent value="sales">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr className="text-left">
                      <th className="p-2">Date</th>
                      <th className="p-2">Sales Order#</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Shipment Date</th>
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
                          {item.salesOrder}
                        </td>
                        <td className="p-2 text-blue-600 font-medium">
                          {item.status}
                        </td>
                        <td className="p-2">{item.shipmentDate}</td>
                        <td className="p-2">
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


<Card className="border border-gray-300 shadow-sm w-full mt-10">
  <CardContent className="p-6 space-y-4 text-sm text-gray-700">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-orange-500">ION</h1>
        <p className="text-sm font-medium">ELECTRICAL DISTRIBUTOR</p>
        <p>Ion Electrical Distributor</p>
        <p>11483 Rocket Blvd. #2A</p>
        <p>Orlando Florida 32824</p>
        <p>U.S.A</p>
      </div>

      <div className="text-right space-y-1">
        <p className="font- text-4xl">Invoice</p>
        <p className="text-gray-500 text-sm"># INV-25-4654</p>
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
          <span className="font-medium">Shipment Preference:</span> BEST WAY
        </p>
        <p>
          <span className="font-medium">Date:</span> 14 Jul 2025
        </p>
        <p>
          <span className="font-medium">Delivery Date:</span> 21 Jul 2025
        </p>
      </div>
      <div>
        <p>
          <span className="font-medium">Reference#:</span> SO-25-6173
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
        <div>$419.00</div>
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
      <p className="text-black">{formData.salesPerson}</p>

      <p className="text-gray-400">Potential</p>
      <p className="text-black">:</p>
      <p className="text-blue-500 hover:underline cursor-pointer">{formData.potential}</p>

      <p className="text-gray-400 flex items-center gap-1">
        Email Recipients
        <span title="Information" className="text-xs text-gray-400">ⓘ</span>
      </p>
      <p className="text-black">:</p>
      <p className="text-black">{formData.recipient}</p>
    </div>
  </div>

  {/* Custom Fields Section */}
  <div>
    <p className="mb-4 text-lg font-semibold">CUSTOM FIELDS</p>

    <div className="grid grid-cols-[150px_10px_1fr] gap-y-2 text-sm">
      <p className="text-black font-medium">Job Name</p>
      <p className="text-black">:</p>
      <p className="text-black">{formData.jobName}</p>

      <p className="text-black font-medium">CUSTOMER PO</p>
      <p className="text-black">:</p>
      <p className="text-black">{formData.customerPo}</p>

      <p className="text-black font-medium">Calculate Surtax</p>
      <p className="text-black">:</p>
      <p className="text-black">{formData.calculateSurtax}</p>
    </div>
  </div>
</div>


  

        </div>
      </div>
    </div>
  );
};
export default InvoiceDetailView;
