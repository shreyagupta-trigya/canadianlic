import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a Checkbox component
import { Button } from "@/components/ui/button";
import { HelpCircle, Radio, Trash2, Upload } from "lucide-react";

import { Label } from "recharts";
import { Textarea } from "@/components/ui/textarea";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  purchase,
  purchaseOrders,
  Vendors,
} from "@/features/utils/ListViewMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Assuming you have RadioGroup components

// Placeholder for company data, replace with your actual data source

const PurchaseRecieveForm = () => {
  const navigate = useNavigate();
  const [selectedPO, setSelectedPO] = useState("");
  const [formData, setFormData] = useState({
    receiveNumber: "",
    receiveDate: "",
    binLocation: "",
    notes: "",
  });

  const isFormDisabled = !selectedPO;

  useEffect(() => {
    if (selectedPO && purchaseOrders[selectedPO]) {
      setFormData(purchaseOrders[selectedPO]);
    }
  }, [selectedPO]);

  const onCancel = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    //handle Submit
    window.alert("success");
  };

  return (
    <>
      <CardTitle className="text-2xl w-full flex justify-between  dark:bg-background bg-white   p-5 ">
        {" "}
        <div> New Purchase Recieve</div>
        <button
          className="text-black dark:text-white cursor-pointer text-xl font-bold"
          onClick={onCancel}
        >
          ✕
        </button>
      </CardTitle>

      {/* Vendor Name Section */}

      <div className="w-full mt-5  bg-[#f9f9fb] dark:bg-gray-800 p-5">
        <FormField
          className={
            "flex whitespace-nowrap w-full items-center justify-center ml-2 "
          }
          label={<span  className="text-red-500">Vendor Name</span>}
        >
          <Select className="text-black  ">
            <SelectTrigger className=" w-full md:w-100 bg-white ml-20">
              <SelectValue placeholder="Select a Vendor" />
            </SelectTrigger>
            <SelectContent>
              {Vendors.map((option) => (
                <SelectItem key={option.id} defaultValue="Amit Sharma Enterprises" value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label={<span className="text-red-500">Purchase Order*</span>}
          className="flex w-full whitespace-nowrap gap-20 mt-5  ml-1 "
        >
          <Input className={"w-full md:w-100"}
           defaultValue="PO-25-4578">
          </Input>
        </FormField>
      </div>

      <div
        className="ml-5"
          
      
      >
        <div className="flex items-center">
          <div className="space-y-5 mt-10 ">
            <FormField
              label={<span className="text-red-500">Purchase Receive#</span>}
              className="flex whitespace-nowrap gap-16"
            >
              <Input
                type="text"
                placeholder=""
                className={"w-full md:w-100"}
                defaultValue="PR-28-3248"
                value={formData.receiveNumber}
                onChange={(e) =>
                  setFormData({ ...formData, receiveNumber: e.target.value })
                }
              />
            </FormField>

            <FormField
              label={<span className="text-red-500">Received Date*</span>}
              className="flex whitespace-nowrap gap-21"
            >
              <Input
                type="date"
                placeholder="dd Jun 2025"
                value={formData.receiveDate}
                onChange={(e) =>
                  setFormData({ ...formData, receiveDate: e.target.value })
                }
              />
            </FormField>
            {/* <div className="flex">
              <FormField
                label="BIN Location "
                className="flex whitespace-nowrap gap-24"
              >
                <Input
                  type="text"
                  placeholder=""
                  className={"w-100"}
                  value={formData.binLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, binLocation: e.target.value })
                  }
                />
              </FormField>
            </div> */}
          </div>
        </div>
        <div className=" mt-10">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                    Items & Description
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                   WAREHOUSE LOCATION
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                   RACK NUMBER
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                   BIN LOCATION
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                   FINAL LOCATION
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                    Ordered Qty
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                    Received Qty
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                    Total Received Qty
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-gray-600">
                   To Be Received
                  </TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="text-sm">
                    <div className="font-medium">Test item -2</div>
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span>SKU: 1001</span>
                      <span>Unit: pc</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">Haryana </TableCell>
                  <TableCell className="text-sm">C</TableCell>
                  <TableCell className="text-sm">22</TableCell>
                  <TableCell className="text-sm">H-C/22</TableCell>
                  <TableCell className="text-sm">10</TableCell>
                  <TableCell className="text-sm">0</TableCell>
                  <TableCell className="text-sm">0</TableCell>
                  <TableCell className="text-sm">10</TableCell>
                  <TableCell>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <FormField
          label="Notes (For Internal Use)"
          className={"mt-10 text-sm mb-10"}
        >
          <Textarea
            id="internal-notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="text-sm w-full min-h-[60px]"
          />
        </FormField>
        <FormField
          className="w-full md:w-[300px] mb-20
        "
          label={
            <span className="text-[12px] text-gray-500">
              Attach File(s) to Purchase Receive
            </span>
          }
        >
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>From Computer</DropdownMenuItem>
                <DropdownMenuItem>From Cloud</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-[12px] text-muted-foreground ">
            You can upload a maximum of 5 files, 10MB each
          </p>
        </FormField>

        <div className="flex gap-3 border-t pt-4">
          <Button
            className={"bg-[#fd9134] text-white"}
            variant="outline"
            onClick={handleSubmit}
          >
            Save 
          </Button>

          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};
export default PurchaseRecieveForm;
