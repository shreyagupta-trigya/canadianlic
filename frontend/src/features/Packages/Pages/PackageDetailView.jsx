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
import dataSample from "../sample/data.json";
import { X, UploadCloud, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { purchaseOrderDetail } from "@/features/utils/ListViewMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";

const statusOptions = ["All", "Not Shipped", "Shipped", "Delivered"];

const billData = [
  {
    date: "01 Mar 2024",
    salesOrder: "SO-25-6173",
    status: "CONFIRMED",
    shipmentDate: "22 jul 2024",
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

const PackageDetailView = () => {
  const [showAttachments, setShowAttachments] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("invoices");
  const [open, setOpen] = useState(false);
    const location = useLocation()
    const dispatch = useDispatch()
    const details = location.state;
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
      customerName: "",
      salesOrder: "",
      packageSlip: "",
      packageDate: "",
      jobNumber: "",
      customerPo: "",
      jobName: "",
      internalNotes: "",
      items: [],
      notes: "",
    });
  const cancel = () => {
    navigate(-1);
  };


            useEffect(() => {
                if (details) {
                    setFormData({ ...details, company: details.company?.ROWID, contactOwner: details.contactOwner?.ROWID }); // prefill the form
                    console.log(details, 'details from location state') 
                }
            }, [details]);

  const filteredData =
    selectedStatus === "All"
      ? dataSample
      : dataSample.filter((po) => po.status === selectedStatus);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        {/* Dropdown Header */}
        <div className="p-4 border h-20 w-full bg-background flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="font-semibold">
                {selectedStatus} <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-58 p-2 absolute left-[-55px]"}>
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
              onClick={() => navigate("/bills/bills-form")}
              size="sm"
              className="bg-orange-500"
            >
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
                  <div className="font-semibold  truncate">{po.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {po.id} • {po.date}
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
                PKG-92373
              </h2>
              <div className="flex items-center  gap-4 text-sm  font-medium cursor-pointer">
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
                  <Label
                    htmlFor="file-choose"
                    className="flex justify-center items-center gap-2 text-gray-500"
                  >
                    <UploadCloud size={20} />
                    <span>Upload your Files</span>
                    <input id="file-choose" type="file" className="hidden" />
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
          <Button variant="outline" className="rounded-none">
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none">
                Ship
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-18 w-35 text-center ">
              <DropdownMenuItem>Ship Manually</DropdownMenuItem>
              <DropdownMenuItem>Ship via Carrier </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none">
                PDF/Print
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" rounded-none" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-25 ">
              <DropdownMenuItem>Delete Package Slip</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-6 h-[calc(100%-150px)] overflow-y-scroll">
          <div className="border rounded-md mt-4">
            {/* Tab Header and Arrow */}
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between border-b p-2 px-4"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent">
                  <TabsTrigger onClick={() => setOpen(!open)} value="invoices">
                    Associated sales order{" "}
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
                  <TabsContent value="invoices">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100">
                          <tr className="text-left">
                            <th className="p-2">Date</th>
                            <th className="p-2">Sales Order#</th>
                            <th className="p-2">Status </th>
                            <th className="p-2">Shipment Date</th>
                            <th className="p-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {billData.map((item, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-2">{item.date}</td>

                              <td
                                onClick={() =>
                                  navigate("/finance/sales/sales-order-detail")
                                }
                                className="p-2 text-blue-500 font-medium cursor-pointer "
                              >
                                {item.salesOrder}
                              </td>
                              <td className="p-2 text-blue-500">
                                {item.status}
                              </td>
                              <td className="p-2">{item.shipmentDate}</td>

                              <td className="p-2">
                                {/* <Popover>
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
                                </Popover> */}
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

          <div className="py-14 px-5">
            <Card className="border shadow-md ">
              <CardContent className="p-4 space-y-4 text-sm text-gray-700">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-8xl font-bold text-orange-500">ION</h1>
                    <p className="text-xl font-medium">
                      ELECTRICAL DISTRIBUTOR
                    </p>
                    <p className="text-[15px] font-semibold">
                      Ion Electrical Distributor
                    </p>
                    <p>11483 Rocket Blvd. #2A</p>
                    <p>Orlando Florida 32824</p>
                    <p>U.S.A</p>
                  </div>

                  <div className="text-right space-y-1">
                    <p className=" text-[2.4rem]">PACKAGE</p>
                    <p className="text-gray-500 text-sm">Package# PKG-06639</p>
                  </div>
                </div>
                <div className="border rounded-sm divide-x divide-muted flex overflow-hidden text-sm">
                  {/* Package# */}
                  <div className="flex flex-col px-4 py-3 min-w-[120px] ">
                    <span className="font-semibold text-muted-foreground">
                      Package#
                    </span>
                    <span className="">PKG-06639</span>
                  </div>

                  {/* Order Date */}
                  <div className="flex flex-col px-4 py-3 min-w-[120px]">
                    <span className="font-semibold text-muted-foreground">
                      Order Date
                    </span>
                    <span>22 Jul 2025</span>
                  </div>

                  {/* Package Date */}
                  <div className="flex flex-col px-4 py-3 min-w-[120px]">
                    <span className="font-semibold text-muted-foreground">
                      Package Date
                    </span>
                    <span>22 Jul 2025</span>
                  </div>

                  <div className="flex flex-col px-4 py-3 min-w-[120px]">
                    <span className="font-semibold text-muted-foreground">
                      Sales Order#
                    </span>
                    <span>SO-25-6768</span>
                  </div>

                  {/* Total Qty */}
                  <div className="  bg-muted w-[133px]">
                    <div className="flex flex-col items-center  justify-center h-full px-4 py-3">
                      <span className="font-semibold text-muted-foreground ">
                        Total Qty
                      </span>
                      <span className="font-bold  text-lg">1.00</span>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="font-medium mb-1">Bill To</p>
                    <p className="text-blue-500 text-[15px]">
                      ET2 Contemporary Lighting International
                    </p>
                    <p>253 N Vineyard Ave.</p>
                    <p>City of Industry</p>
                    <p>91746 CA</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Ship To</p>
                    <p>Ion Lighting Stock Warehouse</p>
                    <p>11483 Rocket Blvd. #2A</p>
                    <p>Orlando Florida 32824</p>
                    <p>U.S.A</p>
                  </div>
                </div>

                <div className="flex gap-20 py-6">
                  <p>CUSTOMER PO</p>
                  <p> 13006160</p>
                </div>
                {/* Table */}
                <div className="mt-6  w-full border-gray-300">
                  <div className="flex justify-between font-semibold bg-gray-100 px-4 py-2">
                    <div className="col-span-2">Item & Description</div>
                    <div>Qty</div>
                  </div>
                  <div className="flex justify-between border-t border-b px-4 py-3 text-sm">
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
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end mt-5">
              <div>
                <p>
                  PDF Template : 'Standard Template'{" "}
                  <span className="text-blue-400">Change</span>
                </p>
              </div>
            </div>
            <div className=" mt-10">
              <p>Package Notes</p>
              <p
                onClick={() => {
                  // alert("It will be implemented soon");
                  prompt("Add your note here:");
                }}
                className="text-blue-500 mt-5 cursor-pointer"
              >
                Add Note
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailView;
