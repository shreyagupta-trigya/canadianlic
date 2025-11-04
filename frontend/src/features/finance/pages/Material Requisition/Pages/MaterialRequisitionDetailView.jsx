import React, { useState } from "react";
import { MoreVertical, UploadCloud, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";

const MaterialRequisitionDetailView = () => {
  const [requisitionData] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const navigate = useNavigate();
  const cancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="w-full rounded-lg">
        {/* Header Section */}
        <div className="border h-auto sm:h-20 w-full bg-background">
          <div className="flex justify-between lg:p-4 md:p-3 p-[14px] items-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
              <h2 className="text-lg md:text-[16px] sm:text-xl font-semibold whitespace-nowrap mb-2 sm:mb-0">
                Material Requisition Details
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-blue-600 font-medium cursor-pointer">
                <span
                  className="whitespace-nowrap"
                  onClick={() => setShowAttachments(true)}
                >
                  📎 Upload files
                </span>
                <span className="whitespace-nowrap">💬 Comments & History</span>
                <button
                  className="text-black text-lg sm:text-xl font-bold ml-2 sm:ml-0"
                  onClick={cancel}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {showAttachments && (
            <div className="fixed top-20 sm:top-30 left-1/2 sm:left-[77%] transform -translate-x-1/2 sm:translate-x-0 bg-white shadow-lg border rounded-md w-[90vw] sm:w-[300px] z-50">
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
                <div className="border border-dashed border-gray-300 rounded-md p-3 sm:p-4 text-center cursor-pointer hover:bg-gray-50">
                  <Label
                    htmlFor="file-upload"
                    className="flex flex-col sm:flex-row justify-center p-1 sm:p-2 items-center gap-2 text-gray-500 text-xs sm:text-sm"
                  >
                    <UploadCloud size={18} />
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
        <div className="flex  border w-full z-9999 rounded-none">
          <Button
            onClick={() => navigate("/material-requisition/form")}
            variant="outline"
            className="rounded-none flex-1 sm:flex-none text-xs sm:text-sm"
          >
            Edit
          </Button>
          <Button
            onClick={() => navigate("/material-requisition/email")}
            variant="outline"
            className="rounded-none flex-1 sm:flex-none text-xs sm:text-sm"
          >
            Email
          </Button>

          <DropdownMenu>
            <div className="w-full relative">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-none cursor-pointer flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  PDF/Print
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute left-0 sm:left-53 bg-white mt-1 sm:mt-20 shadow-md rounded-md p-2 sm:p-3 w-32 sm:w-auto">
                <a href="/materailRequestion.pdf" target="_blank">
                  <DropdownMenuItem className="text-xs sm:text-sm">
                    <span>Print</span>
                  </DropdownMenuItem>
                </a>
                <a
                  href="/materailRequestion.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownMenuItem className="text-xs sm:text-sm">
                    Download
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          
        </div>

        {/* PDF View Toggle */}
        <div className="p-3 rounded-md">
          <div className="flex flex-row gap-2 items-center w-full justify-end">
            <p className="text-xs sm:text-sm">
              <i>Show PDF View</i>
            </p>
            <Switch
              className="cursor-pointer"
              checked={showPDF}
              onCheckedChange={setShowPDF}
            />
          </div>
        </div>

        {!showPDF && (
          <div className="lg:p-4  p-1 space-y-4  ">
            {/* Main Details Card */}
            <div className="border rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-white mb-1">
                    Division / Depart.Name
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base col-span-2">
                    Construction Division
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-white mb-1">
                    Project Number
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base col-span-2">
                    P2023-045
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-white mb-1">
                    Project Title
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base col-span-2">
                    Office Building Renovation
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-white mb-1">
                    Client Name
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base col-span-2">
                    ABC Corporation
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-white mb-1">
                    Requested By
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base col-span-2">
                    John Smith
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-white mb-1">
                    Requisition Ref. No
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base col-span-2">
                    MR-2023-00157
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-white mb-1">
                    Requisition Date
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base col-span-2">
                    November 15, 2023
                  </p>
                </div>
              </div>
            </div>

            {/* Item Table */}
            <div className="mt-6 sm:mt-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
                Item Table
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-500 text-gray-700">
                      <th className="border border-gray-300 p-2 sm:p-3 text-left font-semibold whitespace-nowrap">
                        S.No
                      </th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-left font-semibold whitespace-nowrap">
                        MATERIAL DESCRIPTION
                      </th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-center font-semibold whitespace-nowrap">
                        QUANTITY
                      </th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-center font-semibold whitespace-nowrap">
                        UNIT
                      </th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-center font-semibold whitespace-nowrap">
                        REMARKS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center whitespace-nowrap">
                        1
                      </td>
                      <td className="border border-gray-300 p-2 sm:p-3 font-medium whitespace-nowrap">
                        Reinforcement Steel Bars
                      </td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center whitespace-nowrap">
                        500
                      </td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center whitespace-nowrap">
                        kg
                      </td>
                      <td className="border border-gray-300 p-2 sm:p-3 px-2 sm:px-5 whitespace-nowrap">
                        Urgent - needed by next week
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 sm:mt-8 border rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
                Additional Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <label className="w-full sm:w-48 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                      Contract Requirement
                    </label>
                    <div className="flex-1 flex items-center">
                      <span className="text-blue-600 text-xs sm:text-sm">
                        .pdf
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <label className="w-full sm:w-48 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                      Others, Specify
                    </label>
                    <p className="flex-1 text-xs sm:text-sm">
                      Emergency purchase approved by management
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <label className="w-full sm:w-48 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                      Equipment Supplies Division
                    </label>
                    <p className="flex-1 text-xs sm:text-sm">
                      Construction Equipment Division
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <label className="w-full sm:w-48 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                      Client Specified
                    </label>
                    <div className="flex-1 flex items-center">
                      <span className="text-blue-600 text-xs sm:text-sm">
                        .pdf
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <label className="w-full sm:w-48 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                      Additional Material
                    </label>
                    <p className="flex-1 text-xs sm:text-sm">Testing</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <label className="w-full sm:w-48 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                      Sole Source Supplier
                    </label>
                    <p className="flex-1 text-xs sm:text-sm">
                      {requisitionData.soleSourceSupplier}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPDF && (
          <>
            <style>{`
          .form-wrapper {
            display: flex;
            justify-content: center;
            margin: 2px;
          }
          .form-container {
            width: 100%;
            max-width: 1200px;
            border: 1px solid #000;
            padding: 10px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            align-items: center;
            margin: 10px;
          }
          @media (min-width: 640px) {
            .form-container {
              padding: 20px;
              font-size: 14px;
              margin: 30px;
            }
          }
          .header {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
          @media (min-width: 768px) {
            .header {
              flex-direction: row;
              align-items: flex-start;
            }
          }
          .header-left img {
            max-height: 50px;
            margin-bottom: 10px;
          }
          @media (min-width: 768px) {
            .header-left img {
              max-height: 70px;
              margin-bottom: 0;
            }
          }
          .header-right table {
            border-collapse: collapse;
            font-size: 10px;
          }
          @media (min-width: 640px) {
            .header-right table {
              font-size: 12px;
            }
          }
          .header-right td {
            padding: 2px 4px;
            border: 1px solid #000;
          }
          @media (min-width: 640px) {
            .header-right td {
              padding: 2px 8px;
            }
          }
          .title {
            text-align: center;
            font-weight: bold;
            font-size: 14px;
            margin: 8px 0;
            text-transform: uppercase;
          }
          @media (min-width: 640px) {
            .title {
              font-size: 18px;
              margin: 10px 0;
            }
          }
          .blank {
            height: 8px;
          }
          @media (min-width: 640px) {
            .blank {
              height: 10px;
            }
          }
          .info {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
            font-size: 10px;
          }
          @media (min-width: 640px) {
            .info {
              font-size: 12px;
              margin-bottom: 15px;
            }
          }
          .info td {
            border: 1px solid #000;
            padding: 4px;
          }
          @media (min-width: 640px) {
            .info td {
              padding: 6px;
            }
          }
          .main-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
            font-size: 8px;
          }
          @media (min-width: 640px) {
            .main-table {
              font-size: 12px;
              margin-bottom: 15px;
            }
          }
          .main-table th,
          .main-table td {
            border: 1px solid #000;
            padding: 3px;
            text-align: center;
          }
          @media (min-width: 640px) {
            .main-table th,
            .main-table td {
              padding: 6px;
            }
          }
          .main-table th {
          
            font-weight: bold;
          }
          .special {
            margin-top: 8px;
            font-weight: bold;
            font-size: 10px;
          }
          @media (min-width: 640px) {
            .special {
              margin-top: 10px;
              font-size: 14px;
            }
          }
          .footer {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 15px;
            gap: 10px;
          }
          @media (min-width: 768px) {
            .footer {
              flex-direction: row;
              gap: 0;
            }
          }
          .footer table {
            border-collapse: collapse;
            font-size: 10px;
          }
          @media (min-width: 640px) {
            .footer table {
              font-size: 12px;
            }
          }
          .footer td {
            padding: 3px 6px;
            border: 1px solid #000;
          }
          @media (min-width: 640px) {
            .footer td {
              padding: 4px 10px;
            }
          }
          .note {
            margin-top: 15px;
            font-size: 9px;
            font-style: italic;
          }
          @media (min-width: 640px) {
            .note {
              margin-top: 20px;
              font-size: 12px;
            }
          }
        `}</style>

            <div className="form-wrapper">
              <div className="form-container">
                {/* Header Section */}
                <div className="header">
                  <div className="header-left">
                    <img
                      src="https://i.postimg.cc/gcgkwPtC/logo.png"
                      alt="Logo"
                      height="70"
                    />
                  </div>
                  <div className="header-right">
                    <table>
                      <tbody>
                        <tr>
                          <td>Document No.</td>
                          <td>IMSF-08</td>
                        </tr>
                        <tr>
                          <td>Revision No.</td>
                          <td>00</td>
                        </tr>
                        <tr>
                          <td>Effective Date</td>
                          <td>10/07/2018</td>
                        </tr>
                        <tr>
                          <td>Page No.</td>
                          <td>1 of 1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Title */}
                <div className="title">MATERIAL REQUISITION FORM</div>
                <div className="blank"></div>

                {/* Info Table */}
                <table className="info">
                  <tbody>
                    <tr>
                      <td>Division :</td>
                      <td>Project :</td>
                      <td>Req. No. :</td>
                    </tr>
                    <tr>
                      <td>Req. By :</td>
                      <td></td>
                      <td>Date :</td>
                    </tr>
                  </tbody>
                </table>

                {/* Main Table */}
                <table className="main-table">
                  <thead >
                    <tr>
                      <th>S.N.</th>
                      <th>Item Code</th>
                      <th>ITEM DESCRIPTION</th>
                      <th>QTY</th>
                      <th>UNIT</th>
                      <th colSpan="3">Quotation</th>
                      <th>Last Purc. Rate</th>
                      <th>Stock</th>
                      <th>REMARK</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Supp. 1</td>
                      <td>Supp. 2</td>
                      <td>Supp. 3</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr style={{ height: "200px" }}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                {/* Special Instruction */}
                <div className="special">Special Instruction :</div>

                {/* Footer Section */}
                <div className="footer">
                  <table>
                    <tbody>
                      <tr>
                        <td>Authorized Manager :</td>
                        <td>________________</td>
                      </tr>
                      <tr>
                        <td>Sign</td>
                        <td>________________</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>________________</td>
                      </tr>
                    </tbody>
                  </table>

                  <table>
                    <tbody>
                      <tr>
                        <td>Procurement Department :</td>
                        <td>________________</td>
                      </tr>
                      <tr>
                        <td>Sign</td>
                        <td>________________</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>________________</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Note */}
                <div className="note">
                  Note: Material Requisition for Stock or Against Work Order or
                  Job No. - Such request should be supported with relevant
                  support document / management approval.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MaterialRequisitionDetailView;
