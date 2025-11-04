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
import { updateSalesOrder } from "@/services/sales/SalesOrderApi";
import { updateSalesOrderInList } from "@/redux/slices/sales/SalesOrderSlice";
import dataSample from "../../purchase/sample/data.json";
import { X, UploadCloud, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
];

const invoiceData = [
  {
    date: "01 Mar 2024",
    invoice: "INV-24-5249",
    status: "PAID",
    dueDate: "31 Mar 2024",
    amount: "$71,045.00",
    balanceDue: "$0.00",
  },
  {
    date: "28 Aug 2024",
    invoice: "INV-24-6343",
    status: "PAID",
    dueDate: "27 Sep 2024",
    amount: "$74,384.00",
    balanceDue: "$0.00",
  },
  {
    date: "23 Sep 2024",
    invoice: "INV-24-6471",
    status: "PAID",
    dueDate: "23 Oct 2024",
    amount: "$79,789.47",
    balanceDue: "$0.00",
  },
  {
    date: "22 Oct 2024",
    invoice: "INV-24-6654",
    status: "PAID",
    dueDate: "21 Nov 2024",
    amount: "$91,186.50",
    balanceDue: "$0.00",
  },
  {
    date: "20 Nov 2024",
    invoice: "INV-24-6857",
    status: "PAID",
    dueDate: "20 Dec 2024",
    amount: "$211,883.40",
    balanceDue: "$0.00",
  },
  {
    date: "26 Dec 2024",
    invoice: "INV-24-6986",
    status: "PAID",
    dueDate: "25 Jan 2025",
    amount: "$53,000.00",
    balanceDue: "$0.00",
  },
  {
    date: "21 Mar 2025",
    invoice: "INV-25-7597",
    status: "PAID",
    dueDate: "20 Apr 2025",
    amount: "$238,028.86",
    balanceDue: "$0.00",
  },
  {
    date: "29 May 2025",
    invoice: "INV-25-8061",
    status: "PAID",
    dueDate: "28 Jun 2025",
    amount: "$0.00",
    balanceDue: "$0.00",
  },
  {
    date: "04 Jun 2025",
    invoice: "INV-25-8112",
    status: "PAID",
    dueDate: "04 Jul 2025",
    amount: "$0.00",
    balanceDue: "$0.00",
  },
];

const packageData = [
  {
    date: "24 Jan 2024",
    package: "PKG-02084",
    status: "DELIVERED",
    carrier: "OUR TRUCK",
    shippedOn: "24 Jan 2024",
    deliveredOn: "",
  },
  {
    date: "22 Feb 2024",
    package: "PKG-02306",
    status: "DELIVERED",
    carrier: "OUR TRUCK",
    shippedOn: "22 Feb 2024",
    deliveredOn: "",
  },
  {
    date: "14 Mar 2024",
    package: "PKG-02466",
    status: "DELIVERED",
    carrier: "OUR TRUCK",
    shippedOn: "14 Mar 2024",
    deliveredOn: "14 Mar 2024",
  },
  {
    date: "27 Mar 2024",
    package: "PKG-02578",
    status: "DELIVERED",
    carrier: "WILL CALL",
    shippedOn: "27 Mar 2024",
    deliveredOn: "",
  },
  {
    date: "15 Apr 2024",
    package: "PKG-02726",
    status: "DELIVERED",
    carrier: "WILL CALL",
    shippedOn: "15 Apr 2024",
    deliveredOn: "",
  },
  {
    date: "30 Apr 2024",
    package: "PKG-02834",
    status: "DELIVERED",
    carrier: "OUR TRUCK",
    shippedOn: "30 Apr 2024",
    deliveredOn: "",
  },
  {
    date: "01 May 2024",
    package: "PKG-02842",
    status: "DELIVERED",
    carrier: "OUR TRUCK",
    shippedOn: "01 May 2024",
    deliveredOn: "",
  },
  {
    date: "17 Jun 2024",
    package: "PKG-03198",
    status: "DELIVERED",
    carrier: "OUR TRUCK",
    shippedOn: "17 Jun 2024",
    deliveredOn: "",
  },
  {
    date: "26 Jul 2024",
    package: "PKG-03546",
    status: "DELIVERED",
    carrier: "OUR TRUCK",
    shippedOn: "26 Jul 2024",
    deliveredOn: "",
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

const SalesOrderDetail = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("invoices");
  const [open, setOpen] = useState(false);

    const location = useLocation()
    const dispatch = useDispatch()
    const details = location.state
      const [formData, setFormData] = useState({
        customer: null,
        salesOrderNumber: "",
        referenceNumber: "",
        salesOrderDate: "",
        expectedShipmentDate: "",
        paymentTerm: "",
        deliveryMethod: "",
        salesperson: null,
        jobNumber: "",
        jobName: "",
        createProjectTracker: "No",
        createJobTracker: "No",
        customerPO: "",
        notes: "",
        termsAndConditions: "",
        shippingCharges: 0,
        discountPercentage: 0,
        surtax: 0,
        items: [
          {
            itemId: "",
            name: "",
            cost: 0,
            shipDate: "",
            fixtureType: "",
            freightCarrier: "",
            quantity: 1,
            rate: 0,
            tax: 0,
          },
        ],
      });


          useEffect(() => {
              if (details) {
                  setFormData({ ...details, company: details.company?.ROWID, contactOwner: details.contactOwner?.ROWID }); // prefill the form
                  console.log(details, 'details from location state') // for debugging
              }
          }, [details]);


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
      <div className="w-1/4 border-r">
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
                <div className="font-semibold ">{po.amount}</div>
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
                {formData.salesOrder}
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
          <Button
            onClick={() => navigate("/finance/sales/sales-order-email")}
            variant="outline"
            className="rounded-none"
          >
            Email
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

          <Button
            onClick={() => navigate("/finance/invoice/create")}
            variant="outline"
            className=" rounded-none"
          >
            Convert to Invoice
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" rounded-none">
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <DropdownMenuItem>Sales Return</DropdownMenuItem>{" "}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button variant="outline" className="rounded-none">
            Create
          </Button> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" rounded-none" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-55 mr-44">
              <DropdownMenuItem
                onClick={() => navigate("/finance/purchase/create")}
              >
                Convert to Purchase Order
              </DropdownMenuItem>
              <DropdownMenuItem>Cancel Items</DropdownMenuItem>
              <DropdownMenuItem>Void</DropdownMenuItem>
              <DropdownMenuItem>Clone</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-6 h-[calc(100%-200px)] overflow-y-scroll">
          <div className="border p-3 rounded-md bg-muted/50">
            <div className="font-bold  text-sm  ">✨ WHAT'S NEXT?</div>
            <div className="flex items-center text-[13px] justify-between">
              <p>
                Convert the sales order into packages, shipments, or invoices
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate("/finance/invoice/create")}
                  className="bg-orange-500 text-white"
                >
                  Convert to Invoice
                </Button>
                <Button variant="outline">Create Package</Button>
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
            {/* Tab Header and Arrow */}
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between border-b p-2 px-4"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent">
                  <TabsTrigger onClick={() => setOpen(!open)} value="invoices">
                    Invoices{" "}
                    <span className="ml-1 text-xs text-blue-500">9</span>
                  </TabsTrigger>
                  <TabsTrigger onClick={() => setOpen(!open)} value="packages">
                    Packages{" "}
                    <span className="ml-1 text-xs text-blue-500">56</span>
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
                  <TabsContent value="invoices">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100">
                          <tr className="text-left">
                            <th className="p-2">Date</th>
                            <th className="p-2">Invoice#</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Due Date</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Balance Due</th>
                            <th className="p-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-2">{item.date}</td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                                {item.invoice}
                              </td>
                              <td className="p-2 text-green-600 font-medium">
                                {item.status}
                              </td>
                              <td className="p-2">{item.dueDate}</td>
                              <td className="p-2">{item.amount}</td>
                              <td className="p-2">{item.balanceDue}</td>
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
                                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Delete
                                      </li>
                                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Email
                                      </li>
                                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Print
                                      </li>
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

                  <TabsContent value="packages">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100">
                          <tr className="text-left">
                            <th className="p-2">Date</th>
                            <th className="p-2">Package</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Carrier</th>
                            <th className="p-2">Shipped on</th>
                            <th className="p-2">Delivered On</th>
                            <th className="p-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-2">{item.date}</td>
                              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                                {item.package}
                              </td>
                              <td className="p-2 text-green-600 font-medium">
                                {item.status}
                              </td>
                              <td className="p-2">{item.carrier}</td>
                              <td className="p-2">{item.shippedOn}</td>
                              <td className="p-2">{item.deliveredOn || "-"}</td>
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
                                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Delete
                                      </li>
                                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Email
                                      </li>
                                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Print
                                      </li>
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
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">SALES ORDER</h3>
                  <p className="text-sm">
                    Sales Order#{" "}
                    <span className="font-bold text-sm">{formData.salesOrder}</span>
                  </p>

                  {/* Status */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 mb-1">
                      STATUS
                    </h4>

                    <div className="space-y-1 text-sm">
                      <div className="flex gap-3 items-center">
                        <span className="w-1 h-4 bg-black"></span>
                        <span className="text-xs text-gray-700">Order</span>
                        <span className="px-2 py-0.5 text-white bg-blue-600 text-xs rounded-sm font-medium">
                          {formData.orderStatus}
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="w-1 h-4 bg-orange-600"></span>
                        <span className="text-xs text-gray-700">Invoice</span>
                        <span className="text-green-600 text-xs">
                          {formData.invoiceStatus}
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="w-1 h-4 bg-orange-600"></span>
                        <span className="text-xs text-gray-700">Payment</span>
                        <span className="text-green-600 text-xs">
                          {formData.paymentStatus}
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="w-1 h-4 bg-orange-600"></span>
                        <span className="text-xs text-gray-700">Shipment</span>
                        <span className="text-orange-400 text-xs">
                         {formData.shipmentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-[130px_1fr] gap-y-2 text-sm mt-6">
                    <p className="text-xs font-semibold text-gray-500">
                      REFERENCE#
                    </p>
                    <p className="text-sm">{formData.reference}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      ORDER DATE
                    </p>
                    <p className="text-sm">{formData.salesOrderDate}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      PAYMENT TERMS
                    </p>
                    <p className="text-sm">{formData.paymentTerms}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      DELIVERY METHOD
                    </p>
                    <p className="text-sm">{formData.deliveryMethod}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      SALESPERSON
                    </p>
                    <p className="text-sm">{formData.salesPerson}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      CUSTOMER PO
                    </p>
                    <p className="text-sm">{formData.customerPo}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      JOB NUMBER
                    </p>
                    <p className="text-sm">{formData.jobNumber}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      JOB NAME
                    </p>
                    <p className="text-sm">{formData.jobName}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      CREATE PROJECT TRACKER
                    </p>
                    <p className="text-sm">{formData.projectTracker? "Yes": "No"}</p>

                    <p className="text-xs font-semibold text-gray-500">
                      CREATE JOB TRACKER
                    </p>
                    <p className="text-sm">{formData.jobTracker? "Yes": "No"}</p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                  {/* Billing Address */}
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      BILLING ADDRESS
                    </p>
                    <p className="text-blue-600 text-sm font-semibold mt-1">
                      {formData.billingAddress}
                    </p>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      SHIPPING ADDRESS
                    </p>
                    <pre className="text-sm whitespace-pre-wrap leading-5 mt-1">
                    {formData.shippingAddress}
                    </pre>
                  </div>
                </div>
              </div>

              <Card className="w-full border-none shadow-none px-20 py-4">
                <CardContent className="px-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-8 gap-10 font-medium text-gray-500 text-[10px] px-4 py-2 border-b">
                    <div className="col-span-2">ITEMS & DESCRIPTION</div>
                    <div>ORDERED</div>
                    <div className="col-span-2 ">WAREHOUSE NAME</div>
                    <div className="ml-[-15px]">STATUS</div>
                    <div>RATE</div>
                    <div>AMOUNT</div>
                  </div>

                  {/* Table Row */}
                  <div className="grid grid-cols-7 gap-2  items-start  py-4 border-b text-sm">
                    {/* Item */}
                    <div className="col-span-2 flex justify-evenly ">
                      <img
                        src="https://res.cloudinary.com/dxwlavykb/image/upload/v1751520655/199db57cb1094f079c53ad3c0168e0fc_uj8d3b.jpg"
                        alt="item"
                        className="w-12 h-10 object-fill border p-1"
                      />
                      <div>
                        <div className="text-blue-600 font-medium hover:underline cursor-pointer">
                          E24716-144BK
                        </div>
                        <div className="text-[13px] text-gray-500">
                          SKU: E24716-144BK
                        </div>
                        <div className="text-[13px] text-gray-500">
                          ET2 Sonata 59" Wide
                          <br />
                          LED Abstract
                          <br />
                          Chandelier Black
                        </div>
                      </div>
                    </div>

                    {/* Ordered */}
                    <div className="text-[13px]">
                      1 <span className="text-[13px] text-gray-500">pc</span>
                    </div>

                    {/* Warehouse */}
                    <span className="text-[13px]">
                      Ion Lighting
                      <br />
                      Stock
                      <br />
                      Warehouse
                    </span>

                    {/* Status */}
                    <div className="text-[13px] ml-10">
                      0 Received <br />0 Billed
                    </div>

                    {/* Rate + Amount */}
                    <div className="text-right text-[13px]">
                      <div className="text-gray-600 font-medium">$419.00</div>
                    </div>
                    <div className="text-right text-[13px]">
                      <div className="text-gray-500">419.00</div>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="flex flex-col items-end py-4 px-4 gap-2 text-sm">
                    <div className="flex justify-between w-full max-w-xs">
                      <span className=" font-bold">Sub Total</span>
                      <span className="font-bold">{formData.subTotal}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs text-xs text-gray-400">
                      <span>Total Quantity :</span>
                      <span>{formData.totalQuantity}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs text-gray-500">
                      <span>Discount</span>
                      <span>{formData.discount}</span>
                    </div>
                    <Separator className="my-2 w-full max-w-xs" />
                    <div className="flex justify-between w-full max-w-xs font-semibold">
                      <span>Total</span>
                      <span>{formData.total}</span>
                    </div>
                  </div>
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
                      <p className="font-semibold text-xl">Sales Order</p>
                      <p className="text-gray-500 text-sm"># PO-25-4654</p>
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
                        <span>{formData.subTotal}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formData.total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-evenly mt-5">
                <p> Ion Lighting Stock Warehouse</p>
                <div>
                  <p>
                    PDF Template : 'Standard Template'{" "}
                    <span className="text-blue-400">Change</span>
                  </p>
                </div>
              </div>

              <div className="mt-6  pt-4">
                <p className=" mb-6 text-lg font-semibold">More Information</p>
                <p className="mb-5 text-sm text-gray-400 ">
                  Salesperson
                  <span className="ml-10 text-black">: PAUL KULA</span>
                </p>
                <p className="text-sm text-gray-400">
                  Potential
                  <span className="text-blue-500 ml-16">
                    : GABLES AT BALSWIN PARK - LIGHTING
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SalesOrderDetail;
