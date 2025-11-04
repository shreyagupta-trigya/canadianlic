import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Download,
  Printer,
  Mail,
  MoreHorizontal,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import img from "../../../../assets/logo.png";
import logo from "../../../../assets/originaltemp.png";
import logo2 from "../../../../assets/firstTemp.png";
import logo3 from "../../../../assets/comming.jpg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PurchaseOrderDetailView = () => {
  const [showPDF, setShowPDF] = useState(false);
  const navigate = useNavigate();

  const sampleOrderData = {
    id: "PO-25-4578",
    date: "2023-10-15",
    status: "Pending",
    total: "$1,250.00",
    subtotal: "$1,080.00",
    tax: "$150.00",
    shipping: "$20.00",
    vendorId: "V-123456",
    vendorDate: "01-9-2024",
    vendorLabel: "Amit Sharma Enterprises",
    billingAddress: "2140 Merritt Dr, Garland TX 75041, UNITED STATES",
    shippingAddress: "Same as billing address",
    contactPerson: "John Doe",
    contactEmail: "john@vendor.com",
    deliveryTerms: "FOB Destination",
    requisition: "REQ-2023-001",
    paymentTerms: "Due on Receipt",
    department: "Procurement",
    shipmentMode: "Standard Ground",
    customerNotes:
      "Please ensure all items are properly packaged and include documentation.",
    termsConditions:
      "Payment due within 30 days of invoice date. Late payments subject to 1.5% monthly interest.",
    items: [
      {
        id: 1,
        icode: "ITEM-001",
        description: "Premium Perfume - 100ml",
        unit: "pcs",
        quantity: 5,
        rate: 250.0,
        deliverydays: "5",
        amount: "$1,250.00",
      },
      {
        id: 2,
        icode: "ITEM-002",
        description: "Luxury Fragrance Gift Set",
        unit: "set",
        quantity: 2,
        rate: 350.0,
        deliverydays: "7",
        amount: "$700.00",
      },
    ],
    documents: [
      { name: "BN/AWB/TCN", original: true, copy: false },
      { name: "Commercial Invoice", original: true, copy: true },
      { name: "Certificate of Origin", original: false, copy: true },
      { name: "COA", original: true, copy: false },
      { name: "MSDS", original: false, copy: true },
      { name: "Shelf Life Certificate", original: true, copy: false },
      { name: "Packing List", original: true, copy: true },
      {name:"Others",original:true,copy:true},
    ],
  };

  const order = sampleOrderData;
  const [activeTab, setActiveTab] = useState(1);

  const handleSelect = (id) => {
    setActiveTab(id);
  };
  const template = [
    { id: 1, head: "Original", img: logo },
    { id: 2, head: "Standard", img: logo2 },
    { id: 3, head: "Incoming", img: logo3 },
  ];

  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="mx-auto space-y-2">
        {/* Header with navigation and actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl  font-bold tracking-tight">
              Purchase Order Details
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button
              onClick={()=>navigate("/purchase-recieve/create")}
              variant="outline" 
              size="sm" 
              className="gap-2 cursor-pointer flex-1 sm:flex-none"
            >
              Receive
            </Button>

            <a
              href="/PurchaseOrder.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer w-full"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/purchase/order-email")}
              className="gap-2 cursor-pointer flex-1 sm:flex-none"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer flex-1 sm:flex-none"
              onClick={() => navigate("/purchase/create")}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="flex-1 sm:flex-none">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Duplicate Order</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* PDF Toggle */}
        <div className="rounded-md flex justify-end">
          <div className="flex flex-row w-50 gap-3 p-3 sm:p-5 items-center justify-between">
            <p className="text-sm">
              <i>Show PDF View</i>
            </p>
            <Switch
              className="cursor-pointer"
              checked={showPDF}
              onCheckedChange={setShowPDF}
            />
          </div>
        </div>

        {/* Order Summary Card */}
        {!showPDF && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-md flex justify-between items-center">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Order ID
                    </h3>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Date
                    </h3>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Vendor
                    </h3>
                    <p className="font-medium">{order.vendorLabel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Total
                    </h3>
                    <p className="font-medium text-lg text-green-600">
                      {order.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendor and Address Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-md">
                    Vendor Information
                  </CardTitle>
                  <div className="space-y-3 mt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Vendor ID</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        {order.vendorId}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Contact Person</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        {order.contactPerson}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Contact Email</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base break-all">
                        {order.contactEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-md">
                    Address Information
                  </CardTitle>
                  <div className="space-y-3 mt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Billing Address</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base text-right">
                        {order.billingAddress}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Shipping Address</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base text-right">
                        {order.shippingAddress}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-md">
                    Order Details
                  </CardTitle>
                  <div className="space-y-3 mt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Supplier Quotation Ref No</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        QT-2023-789
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Delivery Date</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        2023-10-25
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Department</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        {order.department}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Shipment Mode</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        {order.shipmentMode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-md">
                    Payment & Delivery
                  </CardTitle>
                  <div className="space-y-3 mt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Delivery Terms</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        {order.deliveryTerms}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Requisition</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        {order.requisition}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2">
                      <h3 className="font-semibold text-sm sm:text-base">Payment Terms</h3>
                      <p className="font-semibold text-gray-500 text-sm sm:text-base">
                        {order.paymentTerms}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Item Table */}
            <Card className="mb-4">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Item Table</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-collapse">
                    <thead className="border text-center bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="p-2 border text-start text-xs sm:text-sm">SR. NO</th>
                        <th className="p-2 border text-start text-xs sm:text-sm">I. CODE</th>
                        <th className="p-2 border text-start text-xs sm:text-sm">DESCRIPTION</th>
                        <th className="p-2 border text-xs sm:text-sm">UNIT</th>
                        <th className="p-2 border text-xs sm:text-sm">QUANTITY</th>
                        <th className="p-2 border text-xs sm:text-sm">RATE</th>
                        <th className="p-2 border text-start text-xs sm:text-sm">DELIVERY DAYS</th>
                        <th className="p-2 border text-center text-xs sm:text-sm">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr
                          key={item.id}
                          className={
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-800"
                          }
                        >
                          <td className="border p-2 text-center text-xs sm:text-sm">{index + 1}</td>
                          <td className="border p-2 text-xs sm:text-sm">{item.icode}</td>
                          <td className="border p-2 text-xs sm:text-sm">{item.description}</td>
                          <td className="border p-2 text-center text-xs sm:text-sm">{item.unit}</td>
                          <td className="border p-2 text-center text-xs sm:text-sm">
                            {item.quantity}
                          </td>
                          <td className="border p-2 text-center text-xs sm:text-sm">
                            ${item.rate.toFixed(2)}
                          </td>
                          <td className="border p-2 text-xs sm:text-sm">{item.deliverydays}</td>
                          <td className="border p-2 text-right font-semibold text-xs sm:text-sm">
                            {item.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Documents and Summary */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Documents Table */}
                  <div className="w-full lg:w-1/2">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead className="border border-b-0 rounded-md">
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border px-2 sm:px-3 py-1 sm:py-2 text-left text-xs sm:text-sm">Document</th>
                            <th className="border px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm">Original</th>
                            <th className="border px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm">Copy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.documents.map((doc, index) => (
                            <tr key={index}>
                              <td className="border px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">{doc.name}</td>
                              <td className="border px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm">
                                {doc.original ? "✓" : ""}
                              </td>
                              <td className="border px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm">
                                {doc.copy ? "✓" : ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="w-full lg:w-1/2">
                    <Card className="w-full">
                      <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                        <div className="flex justify-between border-b pb-1 sm:pb-2">
                          <span className="font-medium text-sm sm:text-base">Subtotal</span>
                          <span className="font-medium text-sm sm:text-base">{order.subtotal}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 sm:pb-2">
                          <span className="font-medium text-sm sm:text-base">Shipping</span>
                          <span className="font-medium text-sm sm:text-base">{order.shipping}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 sm:pb-2">
                          <span className="font-medium text-sm sm:text-base">Tax</span>
                          <span className="font-medium text-sm sm:text-base">{order.tax}</span>
                        </div>
                        <div className="flex justify-between pt-1 sm:pt-2 text-base sm:text-lg">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold text-green-600">
                            {order.total}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes & Terms Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Customer Notes</CardTitle>
                  <p className="mt-3 text-muted-foreground text-sm sm:text-base">
                    {order.customerNotes}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Terms & Conditions</CardTitle>
                  <p className="mt-3 text-muted-foreground text-sm sm:text-base">
                    {order.termsConditions}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Attached Files Section */}
            <Card className="mt-4">
              <CardContent className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Attached Files</CardTitle>
                <div className="flex flex-wrap gap-2 mt-3 sm:mt-5">
                  <Badge variant="outline" className="p-2 text-xs sm:text-sm">
                    Invoice.pdf
                  </Badge>
                  <Badge variant="outline" className="p-2 text-xs sm:text-sm">
                    Quotation.docx
                  </Badge>
                  <Badge variant="outline" className="p-2 text-xs sm:text-sm">
                    Specifications.pdf
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PDF View */}
        {showPDF && (
          <div className="space-y-4">
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex justify-end cursor-pointer hover:underline text-blue-500 text-sm sm:text-base">
                  Change Template
                </div>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:w-[900px] p-4 sm:p-5">
                <SheetHeader>
                  <SheetTitle>Choose Your Template</SheetTitle>
                </SheetHeader>
                <div className="mt-5 grid grid-cols-2 gap-2 justify-center">
                  {template.map((data) => (
                    <div key={data.id} onClick={() => handleSelect(data.id)} className="flex flex-col items-center">
                      <h2 className="mb-2 text-center font-medium text-sm sm:text-base">
                        {data.head}
                      </h2>
                      <Card
                        className={`h-40 w-32 sm:h-50 sm:w-40 cursor-pointer ${
                          activeTab === data.id
                            ? "ring-2 ring-blue-500 rounded-md"
                            : ""
                        }`}
                      >
                        <img
                          src={data.img}
                          alt="Template"
                          className="h-full w-full object-cover"
                        />
                      </Card>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <SheetClose asChild>
                    <Button className="cursor-pointer" variant="primary">
                      Save
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            {/* PDF Template */}
            <Card className="p-4 sm:p-6 lg:p-8 font-sans max-w-5xl mx-auto mb-3">
              {/* Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
                <div className="w-full lg:w-1/4 flex justify-center mb-4 lg:mb-0">
                  <img
                    src={img}
                    alt="Seven Oceans Shipping Co. Logo"
                    className="h-24 sm:h-32 lg:h-40 object-contain"
                  />
                </div>

                <div className="w-full lg:w-2/4 text-center lg:text-left mb-4 lg:mb-0">
                  <h1 className="text-lg sm:text-xl font-bold mb-1">
                    شركة المحيطات السيعة للملاحة لـم.م
                  </h1>
                  <h1 className="text-lg sm:text-xl font-bold mb-1">
                    Seven Oceans Shipping Co. W.L.L
                  </h1>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p>P.O Box 242 Safat 13003 Kuwait</p>
                    <p>Tel : (965) 1825222 (30 Lines) Fax : (965) 24376780</p>
                    <p>Email : info@al-rashed.com</p>
                    <p>Website: www.al-rashedholdings.com</p>
                  </div>
                </div>

                <div className="w-full lg:w-1/4">
                  <table className="w-full border text-xs">
                    <thead>
                      <tr>
                        <th colSpan={2} className="border-b px-2 py-1 font-bold">
                          Purchase Order
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1 font-medium">PONo</td>
                        <td className="border px-2 py-1">[Any Number]</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1 font-medium">PODate</td>
                        <td className="border px-2 py-1"></td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1 font-medium">Department</td>
                        <td className="border px-2 py-1"></td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1 font-medium">Requisition</td>
                        <td className="border px-2 py-1"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Address Table */}
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-2 text-xs sm:text-sm">
                  <thead>
                    <tr>
                      <td className="border p-2 sm:p-3 font-bold">To:</td>
                      <td className="border p-2 sm:p-3 font-bold">Payment Terms</td>
                      <td className="border p-2 sm:p-3 font-bold">
                        Supplier Quotation Ref No.
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan="5" className="border p-2 sm:p-3 align-top">[Any address]</td>
                      <td className="border p-2 sm:p-3">[Number]</td>
                      <td className="border p-2 sm:p-3"></td>
                    </tr>
                    <tr>
                      <td className="border p-2 sm:p-3 font-bold">Delivery Terms</td>
                      <td className="border p-2 sm:p-3 font-bold">Contact Person</td>
                    </tr>
                    <tr>
                      <td className="border p-2 sm:p-3"></td>
                      <td className="border p-2 sm:p-3"></td>
                    </tr>
                    <tr>
                      <td className="border p-2 sm:p-3 font-bold">Shipment Mode</td>
                      <td className="border p-2 sm:p-3 font-bold">Contact Email</td>
                    </tr>
                    <tr>
                      <td className="border p-2 sm:p-3"></td>
                      <td className="border p-2 sm:p-3"></td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="border p-2 sm:p-3 font-bold">
                        Special Instruction
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="border p-2 sm:p-3">
                        Please refer to the attached Order Terms & Conditions which
                        forms an integral part of this order.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Main Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-2 text-xs sm:text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="border p-1 sm:p-2">SNO</th>
                      <th className="border p-1 sm:p-2">I.CODE</th>
                      <th className="border p-1 sm:p-2">Description</th>
                      <th className="border p-1 sm:p-2">Unit</th>
                      <th className="border p-1 sm:p-2">Qty</th>
                      <th className="border p-1 sm:p-2">Rate</th>
                      <th className="border p-1 sm:p-2">Delivery Days</th>
                      <th className="border p-1 sm:p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border p-1 sm:p-2 text-center">{index + 1}</td>
                        <td className="border p-1 sm:p-2">{item.icode}</td>
                        <td className="border p-1 sm:p-2">{item.description}</td>
                        <td className="border p-1 sm:p-2 text-center">{item.unit}</td>
                        <td className="border p-1 sm:p-2 text-center">{item.quantity}</td>
                        <td className="border p-1 sm:p-2 text-center">${item.rate.toFixed(2)}</td>
                        <td className="border p-1 sm:p-2">{item.deliverydays}</td>
                        <td className="border p-1 sm:p-2 text-right">{item.amount}</td>
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="border p-2 sm:p-3 text-right" colSpan="7">
                        Total
                      </td>
                      <td className="border p-2 sm:p-3 text-right">{order.total}</td>
                    </tr>
                    <tr className="font-bold">
                      <td className="border p-2 sm:p-3 text-left" colSpan="5">
                        Amt.in words :
                      </td>
                      <td className="border p-2 sm:p-3 text-left" colSpan="3">
                        Grand Total : {order.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Documents and Instructions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border px-2 sm:px-3 py-1 sm:py-2 text-left">Document</th>
                        <th className="border px-2 sm:px-3 py-1 sm:py-2 text-center">Original</th>
                        <th className="border px-2 sm:px-3 py-1 sm:py-2 text-center">Copy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.documents.map((doc, index) => (
                        <tr key={index}>
                          <td className="border px-2 sm:px-3 py-1 sm:py-2">{doc.name}</td>
                          <td className="border px-2 sm:px-3 py-1 sm:py-2 text-center">
                            {doc.original ? "✓" : ""}
                          </td>
                          <td className="border px-2 sm:px-3 py-1 sm:py-2 text-center">
                            {doc.copy ? "✓" : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border text-xs sm:text-sm">
                    <tbody>
                      <tr className="border">
                        <td className="p-2 font-bold">General Instruction</td>
                      </tr>
                      <tr className="border">
                        <td className="p-2">
                          1. All Correspondence & delivery document including Invoice should
                          bear our purchase order RefNo
                        </td>
                      </tr>
                      <tr className="border">
                        <td className="p-2">2. Invoice must be prepared as per below details:</td>
                      </tr>
                      <tr className="border">
                        <td className="p-2 font-bold">Seven Oceans Shipping Co. W.L.L</td>
                      </tr>
                      <tr className="border">
                        <td className="p-2 font-bold">P.O Box 242 Safat 13003 Kuwait</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Signatures */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs sm:text-sm">
                  <div className="border pt-4 sm:pt-8"></div>
                  <div className="border pt-4 sm:pt-8"></div>
                  <div className="border pt-4 sm:pt-8"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs sm:text-sm mt-2">
                  <strong>Purchase Manager</strong>
                  <strong>Chief Financial Officer</strong>
                  <strong>Authorised Signatory</strong>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 text-xs sm:text-sm">
                <div className="space-y-1">
                  <strong>
                    24376780-965 :سجل تجاري 40458 بص: 242 الصفاة 13003 الكويت :تلفون (965)
                    1825522 (30) خط) فاکس
                  </strong>
                  <br />
                  <strong>
                    Capital: Kuwaiti Dinars 150,000 رأس المال 150,000 دينار كويتي
                  </strong>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrderDetailView;