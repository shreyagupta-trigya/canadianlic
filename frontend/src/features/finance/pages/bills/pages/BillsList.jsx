import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Plus } from "lucide-react";
import dataSample from "../sample/data.json";
import { Navigate, useNavigate } from "react-router-dom";

const BillsList = () => {
  const [data, setData] = useState(dataSample);
  useEffect(() => {
    return () => {
      console.log(data);
      setData(dataSample);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Uploaded Documents</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Upload className="w-4 h-4" />
            Upload Bill
          </Button>
          <Button
            onClick={() => navigate("/bills/bills-form")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="px- py-4 flex justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Outstanding Payables
            </p>
            <p className="text-2xl font-bold text-black">₹62,03,281.00</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Due Today</p>
            <p className="text-lg text-orange-500">₹0.00</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Due Within 30 Days</p>
            <p className="text-lg">₹0.00</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Overdue Bills</p>
            <p className="text-lg text-red-600">₹62,03,281.00</p>
          </div>
        </CardContent>
      </Card>

      {/* Bills Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Bill#</TableHead>
            <TableHead>Reference Number</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Balance Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((bill, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{bill.date}</TableCell>
              <TableCell>{bill.branch}</TableCell>
              <TableCell className="text-blue-600 underline cursor-pointer"
              onClick={() => navigate("/bills/bills-detail")}>
                {bill.billNo}
              </TableCell>
              <TableCell>{bill.reference}</TableCell>
              <TableCell>{bill.vendor}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-red-500 border-red-400"
                >
                  {bill.status}
                </Badge>
              </TableCell>
              <TableCell>{bill.dueDate}</TableCell>
              <TableCell>{bill.amount}</TableCell>
              <TableCell>{bill.dueBalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillsList;
