import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdAttach } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Trash2, X } from "lucide-react";
import { accountOptions } from "@/features/utils/ListViewMenu";

const QuoteForm = () => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState([
    {
      id: 1,
      itemDetails: "",
      quantity: 1,
      rate: 0,
      unit: "",
      discountValue: 0,
      tax: "",
      amount: 0,
    },
  ]);

  const calculateItemAmount = (item) => {
    const quantity = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discountValue = parseFloat(item.discountValue) || 0;


    return quantity * rate - discountAmount;
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        // Recalculate amount when relevant fields change
        if (
          field === "quantity" ||
          field === "rate" ||
          field === "discountType" ||
          field === "discountValue"
        ) {
          updatedItem.amount = calculateItemAmount(updatedItem);
        }

        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        itemDetails: "",
        quantity: 1,
        rate: 0,
        unit: "",
        discountValue: 0,
        tax: "",
        amount: 0,
      },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const shippingCharges = 0;
  const adjustment = 0;
  const total = subtotal + shippingCharges + adjustment;
  const itemOptions = [
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
    { value: "item3", label: "Item 3" },
  ];

  return (
    <div className="min-h-screen ">
      <div className="flex justify-between bg-white  md:items-center gap-4 pb-4 sticky top-0 border-b mb-1 px-4 pt-2">
        <h1 className="text-2xl font-bold">Create Quote</h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </div>
      <div className="p-4" >

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200  p-2 md:p-6 rounded-lg">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="quoteNo" className="font-semibold">
                Quote No
              </Label>
              <Input
                type="text"
                id="quoteNo"
                name="quoteNo"
                className="sm:col-span-2 w-full"
                placeholder="Quote Number"
              />
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
  <Label htmlFor="company" className="font-semibold">
    Account Name
  </Label>
  <div className="sm:col-span-2 w-full">
    <Select
      className="w-full"
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent>
        {accountOptions.map((account) => (
          <SelectItem key={account.value} value={account.value}>
            {account.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>


            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="recipientPhone" className="font-semibold">
                Recipient Phone No
              </Label>
              <Input
                type="number"
                id="recipientPhone"
                name="phone"
                className="sm:col-span-2 w-full"
                placeholder="Phone Number"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select name="paymentTerms">
                <SelectTrigger className="sm:col-span-2 w-full">
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net7">Net 7</SelectItem>
                  <SelectItem value="net10">Net 10</SelectItem>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net45">Net 45</SelectItem>
                  <SelectItem value="due">Due on Receipt</SelectItem>
                  <SelectItem value="cashadvance">Cash in Advance</SelectItem>
                  <SelectItem value="cashdelivery">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
 <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="validity">Validity of Quotation</Label>
              <Select name="validityOfQuotation">
                <SelectTrigger className="sm:col-span-2 w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
              <Label htmlFor="delivery">Delivery to Site</Label>
              <Textarea
                name="deliveryToSite"
                id="delivery"
                placeholder="e.g. 2 Weeks"
                className="sm:col-span-2 w-full"
              />
            </div>

           
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="date" className="font-semibold">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                className="sm:col-span-2 w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="ref" className="font-semibold">
                Reference No
              </Label>
              <Input
                id="ref"
                type="text"
                name="refNo"
                className="sm:col-span-2 w-full"
                placeholder="Reference number"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                name="projectName"
                type="text"
                className="sm:col-span-2 w-full"
                placeholder="Enter Project Name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="sm:col-span-2 w-full"
                placeholder="Email Address"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <Label htmlFor="quoteStatus" className="font-semibold">
                Quote Status
              </Label>
              <Select name="status">
                <SelectTrigger className="sm:col-span-2 w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="close">Close</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            
          </div>
        </div>

        <div className="border border-gray-200 p-5 rounded-lg">
          <h3 className="font-semibold mb-5">Kind Attention</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                className="sm:col-span-2 w-full"
                placeholder="Enter Your Name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                name="designation"
                type="text"
                className="sm:col-span-2 w-full"
                placeholder="Designation"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200  p-2 md:p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Subject</h3>
          <Textarea
            name="subject"
            placeholder="Looking forward for your business."
            className="min-h-[100px] w-full"
          />
        </div>

        <div className="border border-gray-200 p-2 md:p-6 rounded-lg overflow-x-auto">
  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
    <h2 className="font-bold text-xl">Item Table</h2>
   
  </div>
  <div className="max-h-[300px] min-h-[50px] overflow-y-auto mb-2">
    <Table className="table-fixed min-w-[900px] border">
      <TableHeader>
        <TableRow className="sticky top-0 z-20 bg-gray-100">
          <TableHead className=" left-0 bg-gray-100 w-[20%] z-30 ">
            ITEM DETAILS
          </TableHead>
          <TableHead className="w-[15%]">Description</TableHead>
          <TableHead className="w-[15%] text-center">QUANTITY</TableHead>
          <TableHead className="w-[14%] text-center">UNIT</TableHead>
          <TableHead className="w-[14%] text-center">RATE</TableHead>
          <TableHead className="w-[13%] text-right">AMOUNT</TableHead>
          <TableHead className="w-[7%] text-center">ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            {/* Item Details */}
            <TableCell className=" left-0 bg-white w-[20%] z-20">
              <div className="relative">
                <Select
                  value={item.itemDetails}
                  onValueChange={(value) =>
                    handleItemChange(item.id, "itemDetails", value)
                  }
                >
                  <SelectTrigger className="w-full pr-8">
                    <SelectValue placeholder="Select Item" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {item.itemDetails && (
                  <button
                    type="button"
                    onClick={() =>
                      handleItemChange(item.id, "itemDetails", "")
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </TableCell>

            <TableCell className="w-[15%]">
              <Textarea
                name={`description_${item.id}`}
                placeholder="Enter description"
                value={item.description || ""}
                onChange={(e) =>
                  handleItemChange(item.id, "description", e.target.value)
                }
                className="mt-2 text-sm"
              />
            </TableCell>
            <TableCell className="w-[15%] text-center">
              <Input
                name={`quantity_${item.id}`}
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(item.id, "quantity", e.target.value)
                }
              />
            </TableCell>
            <TableCell className="w-[14%]">
              <Select
                value={item.unit}
                onValueChange={(value) =>
                  handleItemChange(item.id, "unit", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">pcs</SelectItem>
                  <SelectItem value="box">box</SelectItem>
                  <SelectItem value="litr">litr</SelectItem>
                  <SelectItem value="gal">gal</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="w-[14%]">
              <Input
                name={`rate_${item.id}`}
                type="number"
                min="0"
                step="0.01"
                value={item.rate}
                onChange={(e) =>
                  handleItemChange(item.id, "rate", e.target.value)
                }
              />
            </TableCell>
            <TableCell className="w-[13%] text-right">
              <Input
                type="text"
                value={`$${Number(item.amount).toFixed(2)}`}
                disabled
                className="text-right font-mono"
              />
            </TableCell>
            <TableCell className="text-center">
              <Trash2
                size={20}
                className="text-red-400 hover:text-red-700 cursor-pointer"
                onClick={() => removeItem(item.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
   <Button type="button" variant="outline" onClick={addNewItem}>
      Add New Row
    </Button>
</div>

<div className="flex flex-col-reverse  md:flex-col  lg:flex-row justify-between gap-6 mt-6">
  <div className="flex flex-col gap-6 w-full lg:w-2/5">
    <div className="relative">
      <IoMdAttach className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      <input
        type="file"
        multiple
        className="w-full pl-8 border rounded px-2 py-2 bg-gray-50"
      />
    </div>
    <div>
      <Label>Terms & Conditions</Label>
      <Textarea
        placeholder="Enter Your Terms And Conditions"
        className="w-full h-24 mt-2"
      />
    </div>
  </div>
  <div className="w-full lg:w-1/3">
    <div className="border border-gray-200 grid grid-cols-2 gap-4 max-w-md ml-auto  p-2 md:p-6 rounded-md">
      <div className="font-semibold">Sub Total</div>
      <div className="text-right font-mono">${subtotal.toFixed(2)}</div>

      <div className="font-semibold flex items-center gap-1">
        Shipping Charges <span className="text-xs text-gray-500">ⓒ</span>
      </div>
      <div className="text-right font-mono">${shippingCharges.toFixed(2)}</div>

      <div className="font-semibold flex items-center gap-1">
        Adjustment <span className="text-xs text-gray-500">ⓓ</span>
      </div>
      <div className="text-right font-mono">${adjustment.toFixed(2)}</div>

      <div className="font-bold text-lg border-t pt-2">Total ($)</div>
      <div className="text-right font-bold text-lg font-mono border-t pt-2">
        ${total.toFixed(2)}
      </div>
    </div>
  </div>
</div>

      </div>  
      </div>
    </div>
  );
};
export default QuoteForm;
