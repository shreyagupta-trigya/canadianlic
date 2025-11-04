import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IoMdAttach } from "react-icons/io";
import { BiComment } from "react-icons/bi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import {
  Bold,
  Italic,
  Menu,
  MessageSquare,
  Trash2,
  Underline,
  AppWindowIcon,
  CodeIcon,
} from "lucide-react";
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
import dataSampleData from "../quotes/sample/data.json";
import { X, UploadCloud, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { FormCard } from "@/components/custom/CustomFormComponents";
import logo from "../../../../assets/originaltemp.png";
import logo2 from "../../../../assets/firstTemp.png";
import logo3 from "../../../../assets/comming.jpg";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { original } from "@reduxjs/toolkit";
import QuoteActivityList from "./relatedList/quoteActivity/QuoteActivityList";

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
const QuoteDetail = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [commants, setCommants] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const location = useLocation();
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const [activeTab, setActiveTab] = useState(1);
  const [topTab, setTopTab] = useState("details"); // New state for top tabs

  const handleSelect = (id) => {
    setActiveTab(id);
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "trigya.demo5inn",
      time: "11 SEP 2025 08:14 AM",
      text: "dfdfdfdfdfdfdfefdfdfdfdfdfdfdfdfd",
    },
    {
      id: 2,
      user: "trigya.demo5inn",
      time: "11 SEP 2025 08:14 AM",
      text: "sdsdsd",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const details = location.state;

  const handleDelete = () => {
    setComments(comments.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };
  const template = [
    { id: 1, head: "Original", img: logo },
    { id: 2, head: "Standard", img: logo2 },
    // { id: 3, head: "Incoming", img: logo3 },
  ];
  const billTo = {
    name: "HEMCO",
    address: [
      "1303 Spring Lake Ter",
      "Carlos Alvarado (+1 (321) 917-8929)",
      "Ocoee",
      "34761 Florida",
    ],
  };

  const shipTo = {
    name: "",
    address: [
      "1303 Spring Lake Ter",
      "Carlos Alvarado (+1 (321) 917-8929)",
      "Ocoee",
      "34761 Florida",
    ],
  };
  const dataSample = dataSampleData.quotesDetail;
  const estimate = {
    number: "EST-25-5261",
    date: "14 Jul 2025",
    expiry: "21 Jul 2025",
    reference: "SO-25-6173",
  };

  const items = [
    {
      id: 1,
      name: "Premium Perfume",
      description: "Experience the luxurious aroma of our Premium Perfume.\nPerfect for special occasions and daily elegance.\nLong-lasting fragrance that turns heads.\nCrafted with the finest ingredients for sophistication.",
      barcode: "123456789012",
      category: "Perfume",
      price: 250,
      unit: "2pcs",
      discount: 25,
      soldPrice: 225,
    },
    {
      id: 2,
      name: "Luxury Fragrance",
      description: "Indulge in the rich, captivating scent of Luxury Fragrance.\nDesigned to leave a lasting impression wherever you go.\nBalanced notes for both day and night wear.\nElegantly packaged, perfect as a gift.",
      barcode: "987654321098",
      category: "Perfume",
      price: 350,
      unit: "7pcs",
      discount: 35,
      soldPrice: 315,
    },
    {
      id: 3,
      name: "Eau de Toilette",
      description: "Fresh, light, and timeless Eau de Toilette.\nIdeal for everyday use with a subtle yet lasting aroma.\nEnhances your style without overpowering.\nAffordable elegance in a compact bottle.",
      barcode: "456789123045",
      category: "Perfume",
      price: 180,
      unit: "3pcs",
      discount: 0,
      soldPrice: 180,
    },
  ];
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newItem = {
      id: Date.now(),
      user: "trigya.demo5inn",
      time: new Date().toLocaleString(),
      text: newComment,
    };

    setComments([newItem, ...comments]);
    setNewComment("");
  };
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
      setFormData({
        ...details,
        company: details.company?.ROWID,
        contactOwner: details.contactOwner?.ROWID,
      }); // prefill the form
      console.log(details, "details from location state"); // for debugging
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

    <div className="w-full">
      <Tabs value={topTab} onValueChange={setTopTab} className="w-full flex-col justify-start gap-3 md:gap-6">
        <TabsList className="lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
          <TabsTrigger value="details">
            Details
          </TabsTrigger>
          <TabsTrigger value="tasks">
            Tasks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-2">
          <div className="border h-20 w-full bg-background mb-0">
            <div className="flex justify-between p-[25px] items-center">
              <div className="flex items-center justify-between gap-3 w-full">
                <h2 className="text-xl whitespace-nowrap font-semibold">
                  EST-25-5256
                </h2>
                <div className="flex items-center gap-4 text-sm text-blue-600 font-medium cursor-pointer relative">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="border p-1 rounded bg-gray-100 text-gray-900 relative"
                          onClick={() => setShowAttachments(!showAttachments)}
                        >
                          <IoMdAttach />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="rounded-none px-2 py-1 text-xs">
                        <b>Upload file</b>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Attachments card aligned beside icon */}
                  {showAttachments && (
                    <div className="absolute top-10 right-0 bg-white shadow-lg border rounded-md w-[300px] z-50">
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

                  {/* Comment */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="border p-1 rounded bg-gray-100 text-gray-900"
                          onClick={() => setCommants(true)}
                        >
                          <BiComment />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="rounded-none px-2 py-1 text-xs">
                        <b>Add Comment</b>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <button
                    className="text-black text-xl font-bold"
                    onClick={cancel}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Drawer */}
          {commants && (
            <div className="fixed inset-0 z-50 flex">
              {/* Overlay */}
              <div
                className="flex-1 bg-black/30"
                onClick={() => setCommants(false)}
              />

              {/* Drawer content */}
              <div className="w-[400px] bg-white border-l shadow-xl p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Comments</h4>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => setCommants(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Rich Text Editor */}
                <div className="border rounded-sm py-2 mb-4 bg-muted/30">
                  <div className="flex gap-3 mb-2 ps-4">
                    <button
                      onClick={() => document.execCommand("bold")}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Bold size={16} />
                    </button>
                    <button
                      onClick={() => document.execCommand("italic")}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Italic size={16} />
                    </button>
                    <button
                      onClick={() => document.execCommand("underline")}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Underline size={16} />
                    </button>
                  </div>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="min-h-[60px] p-2 border-0 ring-0 focus:ring-0 focus:border-0 rounded bg-white"
                    onInput={(e) => setNewComment(e.currentTarget.innerHTML)}
                  ></div>
                  <Button
                    variant="outline"
                    className="mt-2 ms-3"
                    onClick={handleAddComment}
                  >
                    Add Comment
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-4 max-h-90 overflow-x-auto">
                  <h4 className="font-semibold text-sm">
                    ALL COMMENTS
                    <Badge className="h-5 min-w-5 rounded-full px-1 ms-2 font-mono bg-green-900" variant="destructive">
                      {comments.length}
                    </Badge>
                  </h4>
                  <hr />
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex flex-row w-full">
                      <Button
                        variant="outline"
                        className="mt-2 flex items-center rounded-full gap-2 w-auto hover:bg-muted/15"
                      >
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </Button>
                      <div className="ps-3 flex flex-col flex-1">
                        <div className="bg-muted/30 flex items-center justify-between p-3">
                          <span
                            className="text-sm"
                            dangerouslySetInnerHTML={{ __html: comment.text }}
                          />
                          <button
                            className="p-1 hover:text-red-600"
                            onClick={() => setDeleteId(comment.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{comment.user}</span>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Dialog
            className="absolute z-9999"
            open={!!deleteId}
            onOpenChange={setDeleteId}
          >
            <DialogContent>
              <DialogHeader>Do you want to delete this comment?</DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
                <Button variant="outline" onClick={() => setDeleteId(null)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Top Tabs */}


          {/* Action Buttons */}
          <div className="flex border w-full rounded-none">
            <Button
              onClick={() => navigate("/crm/quotes/create")}
              variant="outline"
              className="rounded-none"
            >
              Edit
            </Button>
            <Button
              onClick={() => navigate("/crm/quotes/email")}
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
                <a href="/quote.pdf" target="_blank">
                  <span>
                    <DropdownMenuItem>Print</DropdownMenuItem>
                  </span>
                </a>
                <a
                  href="/quote.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownMenuItem>Download</DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Main Content */}
          <div className="p-2 h-[calc(100%-200px)] overflow-y-scroll">
          <div className="border p-3 rounded-md bg-muted/50">
  <div className="font-bold text-sm mb-2">✨ WHAT'S NEXT?</div>

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px]">
    <p className="flex-1">
      Convert the sales order into packages, shipments, or invoices
    </p>

    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <Button
        className="bg-orange-500 text-white w-full sm:w-auto"
        onClick={() => navigate("/crm/quotes/email")}
      >
        Send Quote
      </Button>
      <Button variant="outline" className="w-full sm:w-auto">
        Mark As Sent
      </Button>
    </div>
  </div>
</div>

           <div className=" p-10 mt-0 md:mt-10 rounded-md">
              <div className="flex gap-5 items-center justify-end">
                <p className="text-sm">
                  <i>Show PDF View</i>
                </p>
                <Switch
                  className={"cursor-pointer"}
                  checked={showPDF}
                  onCheckedChange={setShowPDF}
                />
              </div>
            </div>
            {!showPDF && (
              <div className="space-y-6">
                <div className=" gap-6">
                  <div className="text-sm flex flex-col md:flex-row gap-3 justify-between w-full text-gray-600 px-4">
                    <p>
                      <span className="font-semibold">Quote Date :</span>{" "}
                      {estimate.date}
                    </p>
                    <p>
                      <span className="font-semibold">Expiry Date :</span>{" "}
                      {estimate.expiry}
                    </p>
                    <p>
                      <span className="font-semibold">Reference# :</span>{" "}
                      {estimate.reference}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row sm:gap-3 md:gap-auto px-4 mt-4 w-full justify-between">
                    <div className="flex gap-10 mb-3 md:mb-auto">
                      <h3 className="font-semibold text-gray-700">Bill To</h3>
                      <div>
                        <p className="font-medium">{billTo.name}</p>
                        {billTo.address.map((line, i) => (
                          <p key={i} className="text-sm text-gray-600">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <h3 className="font-semibold text-gray-700">Ship To</h3>
                      <div>
                        {shipTo.name && (
                          <p className="font-medium">{shipTo.name}</p>
                        )}
                        {shipTo.address.map((line, i) => (
                          <p key={i} className="text-sm text-gray-600">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <div className="border-b px-4 pb-2 pt-0 md:py-2 font-medium text-md">
                    Order Items
                  </div>
                  <div className="overflow-x-auto ">
                    <table className="w-full text-sm ">
                      <thead className="bg-gray-50 border-b text-gray-600">
                        <tr>
                          <th className="text-left px-4 py-2">Item Name</th>
                          <th className="text-left px-4 py-2"> Description</th>
                          <th className="text-left px-4 py-2">Qty</th>
                          <th className="text-left px-4 py-2">Unit</th>
                          <th className="text-left px-4 py-2">Price</th>
                          <th className="text-left px-4 py-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className="border-b">
                            <div className="col-span-2 flex gap-3">
                              <img
                                src="https://res.cloudinary.com/dxwlavykb/image/upload/v1751520655/199db57cb1094f079c53ad3c0168e0fc_uj8d3b.jpg"
                                alt="item"
                                className="w-12 h-10 object-fill border p-1"
                              />
                              <td className="px-4 py-2">{item.name}</td>
                            </div>
                            <td
                              className={`px-4 py-2 cursor-pointer ${expandedId !== item.id ? "truncate max-w-xs" : ""
                                }`}
                              onClick={() => toggleDescription(item.id)}
                              title={item.description} // optional: shows full text on hover
                            >
                              {item.description}
                            </td>
                            <td className="px-4 py-2">{item.discount}</td>
                            <td className="px-4 py-2">{item.unit}</td>
                            <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                            <td className="px-4 py-2 font-medium">
                              ${item.soldPrice.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className={"w-70 md:w-100 py-2 px-3"}>
                    <div className="flex flex-col justify-end items-end py-4 px-4  gap-2 text-sm">
                      {" "}
                      <div className="flex justify-between w-full max-w-xs">
                        {" "}
                        <span className=" font-bold">Sub Total</span>{" "}
                        <span className="font-bold">$419</span>{" "}
                      </div>{" "}
                      <div className="flex justify-between w-full max-w-xs text-xs text-gray-400">
                        {" "}
                        <span>Total Quantity :</span> <span>1</span>{" "}
                      </div>{" "}
                      <div className="flex justify-between w-full max-w-xs text-gray-500">
                        {" "}
                        <span>Discount</span> <span>0</span>{" "}
                      </div>{" "}
                      <Separator className="my-2 w-full max-w-xs" />{" "}
                      <div className="flex justify-between w-full max-w-xs font-semibold">
                        {" "}
                        <span>Total</span> <span>$419</span>{" "}
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <h2 className="font-medium">Notes</h2>
                  <p>Looking forward for your business.</p>
                </div>
                <div className="text-sm mt-8 p">
                  <h2 className="font-medium">Terms & Conditions</h2>
                  <p>
                    Prices are subject to change at any time prior to shipment
                    unless agreed to otherwise in writing by an authorized ION
                    Representative. Orders related to this quotation must be
                    received, accepted and released by Seller within 48 hours of
                    issuance of the quotation and are subject to availability.
                    Delivery dates are only estimates. The Seller shall not be
                    liable for failure to meet such dates resulting from product
                    shortages or manufacturing delays. Be advised that Seller may
                    consider changes imposed by its manufacturing partners and other
                    vendors outside Seller's reasonable control and therefore is
                    subject to Force Majeure provisions or similar common law
                    doctrines such as "frustration" or "impossibility.
                  </p>
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
            {showPDF && (
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <div className="flex justify-end mx-8 mb-3 cursor-pointer hover:underline text-blue-500">
                      Change Template
                    </div>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-auto md:w-[900px] p-5 flex flex-col h-full">
                    <SheetHeader>
                      <SheetTitle>Choose Your Template</SheetTitle>
                    </SheetHeader>
                    <div className="mt-5 flex flex-wrap gap-4 flex-1 overflow-y-auto">
                      {template.map((data) => (
                        <div key={data.id} onClick={() => handleSelect(data.id)} className="flex flex-col items-center">
                          <h2 className="mb-2 text-center font-medium">{data.head}</h2>

                          <Card
                            className={`relative h-50 w-40 cursor-pointer overflow-hidden border rounded-md transition-all ${activeTab === data.id
                                ? "border-2 border-blue-500"
                                : "border-gray-200"
                              }`}
                          >
                            <img
                              src={data.img}
                              alt="Description"
                              className="h-40 w-full object-cover"
                            />
                          </Card>
                        </div>
                      ))}
                    </div>
                    <div className="mt-0 pt-2 bottom-0 flex justify-center border-t">
                      <SheetClose asChild>
                        <Button variant="primary" >Save</Button>
                      </SheetClose>
                    </div>
                  </SheetContent>
                </Sheet>

                {activeTab === 1 && (
                  <Card className="border border-gray-300 shadow-sm ">
                    <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                      <div className="flex flex-col md:flex-row items-center justify-between mb-3">
                        <img src="https://i.postimg.cc/MHKSq3ZD/first.png" className="w-20 h-20 md:h-auto md:w-auto"/>
                        <img src="https://i.postimg.cc/NMxthvtF/second.png" />
                        <img src="https://i.postimg.cc/7644QYpj/third.png" className="w-20 h-20 md:h-auto md:w-auto"/>
                      </div>
                      <div className="flex justify-between items-start">
                        <div className="text-left space-y-1">
                          <p className=" text-[17px] md:text-xl">Quote# EST-25-5261</p>
                        </div>
                      </div>
                      <div>
                       <Table className="w-full text-sm">
  <TableBody>
  
    <TableRow className="flex flex-col md:table-row">
      <div>
      <TableCell className="font-medium md:w-32">To :</TableCell>
      <TableCell className="md:w-1/3">
        1303 Spring Lake Ter, Ocoee, 34761 Florida
      </TableCell>
      </div>
       <div>
      <TableCell className="font-medium md:w-32">Date :</TableCell>
      <TableCell className="md:w-1/3">14 Jul 2025</TableCell>
      </div>
    </TableRow>

  
    <TableRow className="flex flex-col md:table-row">
       <div>
      <TableCell className="font-medium">Company :</TableCell>
      <TableCell>xyz pvt ltd</TableCell>
       </div>
       <div>
      <TableCell className="font-medium">Ref :</TableCell>
      <TableCell>SO-25-6173</TableCell>
      </div>
    </TableRow>

  
    <TableRow className="flex flex-col md:table-row">
       <div>
      <TableCell className="font-medium">Recipient Phone No :</TableCell>
      <TableCell>+1 (321) 917-8929</TableCell>
      </div>
      <div>
      <TableCell className="font-medium">Email :</TableCell>
      <TableCell>abc24356@gmail.com</TableCell>
      </div>
    </TableRow>
    <TableRow className="flex flex-col md:table-row">
      <TableCell className="font-medium">Subject :</TableCell>
      <TableCell colSpan={3}></TableCell>
    </TableRow>
  </TableBody>
</Table>
</div>

  <div className="flex flex-col md:flex-row justify-between gap-6 px-2">
  <div className="w-full md:w-1/2">
    <p className="font-medium mb-1">Bill To</p>
    <p>HEMCO</p>
    <p>1303 Spring Lake Ter</p>
    <p>Carlos Alvarado (+1 (321) 917-8929)</p>
    <p>Ocoee</p>
    <p>34761 Florida</p>
  </div>
  <div className="w-full md:w-1/2">
    <p className="font-medium mb-1">Ship To</p>
    <p>1303 Spring Lake Ter</p>
    <p>Carlos Alvarado (+1 (321) 917-8929)</p>
    <p>Ocoee</p>
    <p>34761 Florida</p>
  </div>
</div>

                   <div className="mt-6 border border-gray-300 overflow-x-auto">
  <table className="min-w-full text-[10px] md:text-sm text-gray-700 border-collapse">
    <thead className="bg-gray-100 font-semibold">
      <tr>
        <th className="px-2 md:px-4 text-[13px] md:text-sm  py-2 border-r col-span-2 text-left">Item</th>
        <th className="px-2 md:px-4 text-[13px] md:text-sm  py-2 border-r text-left">Qty</th>
        <th className="px-2 md:px-4 text-[13px] md:text-sm  py-2 border-r text-left">Unit</th>
        <th className="px-2 md:px-4 text-[13px] md:text-sm  py-2 border-r text-left">Rate</th>
        <th className="px-2 md:px-4 text-[13px] md:text-sm  py-2 text-left">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t">
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r col-span-2">
          <p className="text-blue-600 font-medium hover:underline cursor-pointer">
            E24716-144BK
          </p>
        </td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r">1.00</td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r">2pcs</td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r">$419.00</td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3">419.00</td>
      </tr>
      <tr className="border-t">
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r col-span-2">
          <p className="text-blue-600 font-medium hover:underline cursor-pointer">
            D1c2716-1321
          </p>
        </td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r">2.00</td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r">4pcs</td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3 border-r">$300.00</td>
        <td className="px-2 md:px-4 text-[13px] md:text-sm  py-3">1200.00</td>
      </tr>
    </tbody>
  </table>
</div>


                      <div className="flex justify-end mt-7 mr-2">
                        <div className="w-40 md:w-64 space-y-2">
                          <div className="flex justify-between">
                            <span>Sub Total</span>
                            <span>$419</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>$419</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8 mt-8">

                        <strong className="text-lg border-b ">
                          Terms &amp; Conditions:
                        </strong>

                        <div className="space-y-2 text-sm text-gray-700 mt-4">
                          <p>
                            <span className="font-medium">Validity:</span> 30 days
                            from the quotation date.
                          </p>
                          <p>
                            <span className="font-medium">Prices:</span> All prices
                            are exclusive of applicable taxes.
                          </p>
                          <p>
                            <span className="font-medium">Availability:</span>{" "}
                            Subject to stock at the time of order confirmation.
                          </p>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          This quotation is also subject to K Five's General
                          Conditions of Sale, Delivery, and Service.
                        </p>

                        <div className="signature text-sm text-gray-800">
                          <p>Best regards,</p>
                          <br />

                          <p className="font-semibold">John Smith</p>
                          <p>Sales Manager - Retail</p>
                        </div>
                      </div>

                    </CardContent>
                    <div className=" px-2 ">
                      <img
                        className="w-full mb-[-15px]"
                        src="https://i.postimg.cc/fbmZK0gx/footer.png"
                      />
                    </div>
                  </Card>
                )}
                {activeTab === 2 && (
                  <Card className="border border-gray-300 shadow-sm ">
                    <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                      <div className="flex flex-col md:flex-row items-center justify-between mb-3">
                        <img src="https://i.postimg.cc/MHKSq3ZD/first.png" className="w-20 h-20 md:h-auto md:w-auto"/>
                        <img src="https://i.postimg.cc/NMxthvtF/second.png" />
                        <img src="https://i.postimg.cc/7644QYpj/third.png" className="w-20 h-20 md:h-auto md:w-auto"/>
                      </div>

                      <div className="flex justify-start items-start">
                        <div className="text-end space-y-2">
                          <p className=" text-[15px] md:text-xl">Quote# EST-25-5261</p>
                        </div>
                      </div>
                      

                 <div className="mt-6 text-[12px] md:text-sm">
  <div className="mb-4">
    <p className="font-medium mb-1">Bill To</p>
    <p>HEMCO</p>
    <p>1303 Spring Lake Ter</p>
    <p>Carlos Alvarado (+1 (321) 917-8929)</p>
    <p>Ocoee</p>
    <p>34761 Florida</p>
  </div>

  <div className="flex flex-row md:flex-row justify-between gap-4">
    <div>
      <p className="font-medium mb-1">Ship To</p>
      <p>1303 Spring Lake Ter</p>
      <p>Carlos Alvarado (+1 (321) 917-8929)</p>
      <p>Ocoee</p>
      <p>34761 Florida</p>
    </div>

    <div className="md:text-right">
      <p>
        <span className="font-medium">Quote Date :</span> 14 Jul 2025
      </p>
      <p>
        <span className="font-medium">Expiry Date :</span> 21 Jul 2025
      </p>
      <p>
        <span className="font-medium">Reference# :</span> SO-25-6173
      </p>
    </div>
  </div>
</div>

                     <div className="mt-6 overflow-x-auto">
  <table className="w-full border border-gray-300 text-[10px] md:text-sm">
    <thead className="bg-gray-100 font-semibold text-gray-700">
      <tr>
        <th className="border-r px-2 md:px-4 py-2 text-left w-2/6">Item</th>
        <th className="border-r px-2 md:px-4 py-2 text-center">Qty</th>
        <th className="border-r px-2 md:px-4 py-2 text-center">Unit</th>
        <th className="border-r px-2 md:px-4 py-2 text-center">Rate</th>
        <th className="px-2 md:px-4 py-2 text-center">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t">
        <td className="border-r px-2 md:px-4 py-3">
          <p className="text-blue-600 font-medium hover:underline cursor-pointer">
            E24716-144BK
          </p>
        </td>
        <td className="border-r px-2 md:px-4 py-3 text-center">1.00</td>
        <td className="border-r px-2 md:px-4 py-3 text-center">2pcs</td>
        <td className="border-r px-2 md:px-4 py-3 text-center">$419.00</td>
        <td className="px-2 md:px-4 py-3 text-center">419.00</td>
      </tr>

      <tr className="border-t">
        <td className="border-r px-2 md:px-4 py-3">
          <p className="text-blue-600 font-medium hover:underline cursor-pointer">
            D1C2716-1321
          </p>
        </td>
        <td className="border-r px-2 md:px-4 py-3 text-center">2.00</td>
        <td className="border-r px-2 md:px-4 py-3 text-center">4pcs</td>
        <td className="border-r px-2 md:px-4 py-3 text-center">$300.00</td>
        <td className="px-2 md:px-4 py-3 text-center">1200.00</td>
      </tr>
    </tbody>
  </table>
</div>


                      <div className="flex justify-end mt-4">
                        <div className="w-38 md:w-64 space-y-2">
                          <div className="flex justify-between">
                            <span>Sub Total</span>
                            <span>$419</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>$419</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <h2 className="font-medium">Notes</h2>
                        <p>Looking forward for your business.</p>
                      </div>
                      <div className="text-sm mt-8 p">
                        <h2 className="font-medium">Terms & Conditions</h2>
                        <p>
                          Prices are subject to change at any time prior to shipment
                          unless agreed to otherwise in writing by an authorized
                          Representative. Orders related to this quotation must be
                          received, accepted and released by Seller within 48 hours
                          of issuance of the quotation and are subject to
                          availability. Delivery dates are only estimates. The
                          Seller shall not be liable for failure to meet such dates
                          resulting from product shortages or manufacturing delays.
                          Be advised that Seller may consider changes imposed by its
                          manufacturing partners and other vendors outside Seller's
                          reasonable control and therefore is subject to Force
                          Majeure provisions or similar common law doctrines such as
                          "frustration" or "impossibility.
                        </p>
                      </div>
                    </CardContent>
                    <div className=" px-2 ">
                      <img
                        className="w-full mb-[-15px]"
                        src="https://i.postimg.cc/fbmZK0gx/footer.png"
                      />
                    </div>
                  </Card>
                )}

                <div className="mt-6 pb-5 ml-1 pt-4">
                  <p className=" mb-6 text-lg font-semibold">More Information</p>
                  <p className="mb-5 text-sm text-gray-400 ">
                    Salesperson
                    <span className="ml-10 text-black">: PAUL KULA</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Potential
                    <span className="text-blue-500 ml-16">
                      : GABLES AT BALSWIN PARK
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <QuoteActivityList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuoteDetail;