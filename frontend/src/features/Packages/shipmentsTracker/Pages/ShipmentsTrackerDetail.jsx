import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaComment, FaCommentAlt } from "react-icons/fa";
const ShipmentsTrackerDetail = () => {
    const navigate = useNavigate();
  return (
    <div className="px-25 py-10">
         <div className="flex items-center rounded-t-md justify-between w-full px-4 py-3 border-b bg-muted">
     
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

    
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="outline" size="sm">
          Duplicate
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              More <span className="ml-1">▾</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Print</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={()=>navigate(-1)} variant="ghost"  className="h-9 cursor-pointer  w-8">
        ✕
        </Button>
      </div>
    </div>
      <div className="rounded-b-md border overflow-hidden   text-sm">
        <table className="min-w-[600px] w-full border-collapse  text-left">
          <tbody>
            <tr className="border-b">
              <td className="bg-muted px-4 py-3 font-medium">ION SO</td>
              <td className="px-4 py-2">SO-25-6724</td>
            </tr>
            <tr className="border-b">
              <td className="bg-muted px-4 py-3 font-medium">Job Name</td>
              <td className="px-4 py-2">AIREKO ENERGY SOLUTION US LLC</td>
            </tr>
            <tr className="border-b">
              <td className="bg-muted px-4 py-3 font-medium">Deal Name</td>
              <td className="px-4 py-2"></td>
            </tr>
            <tr className="border-b">
              <td className="bg-muted px-4 py-3 font-medium">Customer PO</td>
              <td className="px-4 py-2">NEED PO</td>
            </tr>
            <tr className="border-b">
              <td className="bg-muted px-4 py-3 font-medium">PO Amount</td>
              <td className="px-4 py-2">$2,992.23</td>
            </tr>
            <tr className="border-b">
              <td className="bg-muted px-4 py-3 font-medium">
                Invoiced Amount
              </td>
              <td className="px-4 py-3">$0.00</td>
            </tr>
            <tr className="border-b">
              <td className="bg-muted px-4 py-3 font-medium">Balance Open</td>
              <td className="px-4 py-3">$2,992.23</td>
            </tr>
            <tr>
              <td className="bg-muted px-4 py-3 font-medium">Actions</td>
              <td className="px-4 py-3 space-x-2">
                <Button variant="outline" size="sm">
                  Print PDF
                </Button>
                <Button variant="outline" size="sm">
                  Send Mail
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-10 text-blue-500 cursor-pointer   w-44 text-center p-2 px-3 rounded-md hover:bg-gray-100">
        <p className="flex gap-2 items-center"><FaComment/> Add a Comments</p>
      </div>
    </div>
  );
};

export default ShipmentsTrackerDetail;
