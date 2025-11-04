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
import dataSample from "../Sample/data.json";
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

const rows = [
  { account: "Goods In Transit", debit: "0.00", credit: "0.00" },
  { account: "Inventory Asset ( STK-1650 )", debit: "0.00", credit: "0.00" },
  { account: "Inventory Asset ( STK-1650 )", debit: "0.00", credit: "0.00" },
  { account: "Goods In Transit", debit: "0.00", credit: "0.00" },
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

const StockTransferDetail = () => {
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

  const toggleTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? "" : tab));
  };

  return (
    <div className="flex h-screen">
      

      {/* Right Detail Panel */}
      <div className="w-full  ">
        <div className=" border h-20 w-full  bg-background ">
          <div className="flex justify-between p-[25px] items-center">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 w-full">
              <h2 className="text-xl whitespace-nowrap font-semibold">
                TO-25-46124
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
            <div className="fixed top-14 left-[77%] transform -translate-x-1/2 bg-white shadow-lg border rounded-md w-[300px] z-50">
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
                  <Label
                    htmlFor="file-upload"
                    className="flex justify-center p-2 items-center gap-2 text-gray-500"
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
        <div className="flex border  w-full rounded-none">
          <Button variant="outline" className="rounded-none cursor-pointer">
            <span onClick={() => navigate("/inventory/stocks/create")}>
              Edit
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none cursor-pointer">
                PDF/Print
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Print</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-6 h-[calc(100%-200px)] overflow-y-scroll">
          <div className=" p-6  rounded-md">
            <div className="flex gap-5 items-center justify-end">
              <p className="text-sm">
                <i>Show PDF View</i>
              </p>
              <Switch checked={showPDF} onCheckedChange={setShowPDF} />
            </div>
          </div>
          {!showPDF && (
            <div>
              {/* Left Section */}
              <div className="w-full">
                {/* Header */}
                <div className="border-b pb-4 mb-6 ">
                  <h1 className="text-2xl font-bold">TRANSFER ORDER</h1>
                  <p className="text-sm">
                    Transfer Order#{" "}
                    <span className="font-semibold">TO-00001</span>
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
                    <div className="flex justify-between">
                      <span className="font-medium">Date</span>
                      <span>30 Aug 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Transferred date</span>
                      <span>30 Aug 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created By</span>
                      <span>trigya.demo5inn</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Status</span>
                      <Badge className="bg-green-600 hover:bg-green-700">
                        TRANSFERRED
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created Time</span>
                      <span>30 Aug 2024 10:24 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Last Modified Time</span>
                      <span>30 Aug 2024 10:24 PM</span>
                    </div>
                  </div>

                  {/* Warehouses Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t">
                    {/* Source Warehouse */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        SOURCE WAREHOUSE
                      </h3>
                      <p className="mt-2 font-medium">Trigya</p>
                      <p className="text-sm leading-6">
                        713, Rawali Mahdood, Brahampuri
                        <br />
                        Haridwar
                        <br />
                        Indiana - 249402 U.S.A
                      </p>
                    </div>

                    {/* Destination Warehouse */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">
                        DESTINATION WAREHOUSE
                      </h3>
                      <p className="mt-2 font-medium">test24</p>
                      <p className="text-sm leading-6">
                        street line
                        <br />
                        testCity
                        <br />
                        test State - 1310132 India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="w-full border-none shadow-none  py-4">
                <CardContent className="px-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-12 font-medium text-gray-500 text-[10px] bg-gray-100 w-full px-4 py-2 border-b">
                    <div>#</div>
                    <div className="col-span-2">ITEMS & DESCRIPTION</div>
                    <div>QUANTITY</div>
                  </div>

                  {/* Table Row */}
                  <div className="grid grid-cols-4 gap-6 items-start py-4 border-b text-sm">
                    <div className="text-[13px] text-gray-600 pl-4">1</div>
                    <div className="col-span-2 flex gap-3">
                      <img
                        src="https://res.cloudinary.com/dxwlavykb/image/upload/v1751520655/199db57cb1094f079c53ad3c0168e0fc_uj8d3b.jpg"
                        alt="item"
                        className="w-12 h-10 object-fill border p-1"
                      />
                      <div>
                        <div className="text-blue-600 font-medium hover:underline cursor-pointer">
                          LOT PRICE
                        </div>
                        <div className="text-[13px] text-gray-500">
                          *** CRESSWIND POWER
                        </div>
                      </div>
                    </div>
                    <div className="text-[13px] pl-4">
                      1 <span className="text-[13px] text-gray-500">pc</span>
                    </div>
                  </div>

                  <div className="w-full max-w-4xl mx-auto mt-6 ">
                    {/* Reason */}
                    <div>
                      <h2 className="text-sm font-semibold">REASON</h2>
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
                  <div className="w-full max-w-5xl mx-auto p-6">
                    <div>
                      <div className="flex justify-between ">
                       
                        <div className="space-y-1">
                          <h2 className="font-semibold text-lg">
                            Trigya 
                          </h2>
                          <p className="text-sm">Haridwar Indiana 249402</p>
                          <p className="text-sm">U.S.A</p>
                        </div>

                       
                        <div className=" ">
                        <div className="flex flex-col items-center justify-center ">
                          <h1 className="text-3xl font-bold tracking-wide">
                            TRANSFER ORDER
                          </h1>
                        </div>
                          <p>
                            TransferOrder#{" "}
                            <span className="font-semibold">TO-00001</span>
                          </p>
                          <div className="flex gap-3">
                            <span>Date</span>
                            <span className="font-semibold">30 Aug 2024</span>
                          </div>
                          <div className="flex gap-3">
                            <span>Date of Transfer</span>
                            <span className="font-semibold">30 Aug 2024</span>
                          </div>
                          <div className="flex gap-3">
                            <span>Created By</span>
                            <span className="font-semibold">
                              trigya.demo5inn
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Warehouses Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t pt-6">
                        {/* Source Warehouse */}
                        <div>
                          <h3 className="font-semibold text-gray-700 text-sm">
                            Source Warehouse
                          </h3>
                          <p className="text-sm font-medium mt-1">Trigya</p>
                          <p className="text-sm">Haridwar Indiana 249402</p>
                          <p className="text-sm">U.S.A</p>
                        </div>

                        {/* Destination Warehouse */}
                        <div className="md:border-l md:pl-6">
                          <h3 className="font-semibold text-gray-700 text-sm">
                            Destination Warehouse
                          </h3>
                          <p className="text-sm font-medium mt-1">test24</p>
                          <p className="text-sm">testCity test State 1310132</p>
                          <p className="text-sm">India</p>
                        </div>
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
          <div className="space-y-6 mt-10 ">
            {/* Journal Header */}
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold">Journal</h2>
              <p className="text-xs mt-1 text-gray-500 flex items-center gap-2">
                Amount is displayed in your base currency{" "}
                <Badge className="bg-green-600 hover:bg-green-700">USD</Badge>
              </p>
            </div>

            {/* Transfer Order Title */}
            <h3 className="text-base font-medium mt-4">Transfer Order</h3>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-t border-b">
                <thead className="bg-gray-50">
                  <tr className="text-gray-500 uppercase text-xs">
                    <th className="text-left py-2 px-3">Account</th>
                    <th className="text-right py-2 px-3">Debit</th>
                    <th className="text-right py-2 px-3">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2 px-3">{row.account}</td>
                      <td className="py-2 px-3 text-right">{row.debit}</td>
                      <td className="py-2 px-3 text-right">{row.credit}</td>
                    </tr>
                  ))}
                  {/* Totals */}
                  <tr className="font-bold border-t">
                    <td className="py-2 px-3 text-right" colSpan={1}>
                      Total
                    </td>
                    <td className="py-2 px-3 text-right">0.00</td>
                    <td className="py-2 px-3 text-right">0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransferDetail;
