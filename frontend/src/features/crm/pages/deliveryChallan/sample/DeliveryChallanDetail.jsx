import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.webp";
import DeliveryChallanActivityList from "../relatedList/deliveryChallanActivity/DeliveryChallanActivityList";

const DeliveryChallanDetail = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const navigate = useNavigate();
  const [topTab, setTopTab] = useState("details");

  const cancel = () => {
    navigate(-1);
  };

  return (
    <Tabs
      value={topTab}
      onValueChange={setTopTab}
      className="w-full flex flex-col justify-start gap-6"
    >
      <TabsList className="md:flex">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="space-y-2">
        <div className="flex flex-col justify-center items-center">
          <div className="border bg-background w-full p-4 md:p-6">
            <div className="flex items-center justify-between gap-3 w-full">
              <h2 className="text-xl whitespace-nowrap font-semibold">
                TO-25-46124
              </h2>
              <div className="hidden md:flex items-center gap-4 text-sm text-blue-600 font-medium">
                <span
                  onClick={() => setShowAttachments(true)}
                  className="cursor-pointer"
                >
                  📎 Upload files
                </span>
                <span className="cursor-pointer">💬 Comments & History</span>
                <button
                  className="text-black text-xl font-bold"
                  onClick={cancel}
                >
                  ✕
                </button>
              </div>

              <div className="flex md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-sm border rounded-md"
                    >
                      ☰
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 text-sm">
                    <DropdownMenuItem onClick={() => setShowAttachments(true)}>
                      📎 Upload files
                    </DropdownMenuItem>
                    <DropdownMenuItem>💬 Comments & History</DropdownMenuItem>
                    <DropdownMenuItem onClick={cancel}>
                      ✕ Close
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {showAttachments && (
              <div
                className="fixed top-50 right-3 sm:top-50 sm:right-10 md:top-[20%] md:right-[8%]
               bg-white shadow-lg border rounded-md w-[90%] sm:w-[400px] md:w-[350px]
               z-50 transition-all duration-300 animate-in fade-in"
              >
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
                  <div className="border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition">
                    <Label
                      htmlFor="file-upload"
                      className="flex justify-center items-center gap-2 text-gray-500 cursor-pointer"
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

          <div className="flex flex-row sm:flex-row w-full border rounded-none">
            <Button
              variant="outline"
              className="rounded-none cursor-pointer sm:w-auto"
              onClick={() => navigate("/crm/deliveryChallan/create")}
            >
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-none cursor-pointer sm:w-auto"
                >
                  PDF/Print
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Print</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full p-4 sm:p-5 mt-2">
            <div className="flex flex-row sm:flex-row sm:items-center text-lg sm:text-xl gap-2 sm:gap-4">
              <span>Invoice Status:</span>
              <span className="font-medium text-gray-700">Not Invoiced</span> 
            </div>

            <Card className="w-full border shadow mt-5">
             <CardHeader className="flex flex-col md:flex-row w-full items-left justify-between items-left md:items-start p-4 sm:p-6 gap-4 md:gap-6">
  <div className="flex flex-col items-center md:items-start gap-2">
    <img
      src={logo}
      alt="Logo"
      className="object-cover h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40"
    />
    <div className="text-center md:text-left">
      <h2 className="text-base sm:text-lg font-bold">Trigya Innovations</h2>
      <p className="text-sm text-gray-600">Sanjay Bhiwani 123402, India</p>
      <p className="text-sm text-gray-600">CSTNO: 1234567890</p>
    </div>
  </div>

  <div className="text-center md:text-right mt-4 md:mt-0">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-sans">
      DELIVERY NOTE
    </h1>
    <p className="font-semibold mt-2 sm:mt-3 text-sm sm:text-base md:text-xl">
      Note No: DC-00002
    </p>
  </div>
</CardHeader>


              <CardContent className="py-0 px-4  md:p-6">
                <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">Deliver To</h3>
                    <p className="text-sm text-gray-600">
                      Ahmed (Sanjay Bhiwani 001)
                    </p>
                    <p className="text-sm text-gray-600">
                      Place of Supply: Haryana (HSN)
                    </p>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Note Date: 23/07/2025</p>
                    <p>Note Type: Supply on Approval</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1 text-left">#</th>
                        <th className="border px-2 py-1 text-left ">
                          Item & Description
                        </th>
                        <th className="border px-2 py-1 text-left ">HSN/SAC</th>
                        <th className="border px-2 py-1 text-left">Qty</th>
                        <th className="border px-2 py-1 text-left">Rate</th>
                        <th className="border px-2 py-1 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">1</td>
                        <td className="border px-2 py-1">Car</td>
                        <td className="border px-2 py-1">234567</td>
                        <td className="border px-2 py-1">3 PCS</td>
                        <td className="border px-2 py-1">₹1,00,000.00</td>
                        <td className="border px-2 py-1">₹3,00,000.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>

              <CardFooter className="p-4 sm:p-6 border-t flex flex-col items-end">
                <div className="w-50 md:w-full sm:max-w-md">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sub Total:</span>
                    <span>₹3,00,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CGST (9%):</span>
                    <span>₹27,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>SGST (9%):</span>
                    <span>₹27,000.00</span>
                  </div>
                  <div className="flex justify-between text-base font-bold mt-2 border-t pt-2">
                    <span>Total:</span>
                    <span>₹3,54,000.00</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 italic">
                    In Words: Indian Rupees Three Lakhs Fifty-Four Thousand Only
                  </p>
                </div>

                <div className="mt-6 self-start">
                  <p className="text-sm">
                    Authorized Signature: ______________________
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="tasks">
        <DeliveryChallanActivityList />
      </TabsContent>
    </Tabs>
  );
};

export default DeliveryChallanDetail;
