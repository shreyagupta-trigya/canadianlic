import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dot,
  Eye,
  ImageIcon,
  MoreVertical,
  SidebarClose,
  Trash,
  Trash2,
  Truck,
  Wallet2,
  X,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { itemList, departments } from "@/features/utils/ListViewMenu";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function MaterialRequisitionForm() {
  const [showBox, setShowBox] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [othDetail, setOthDetail] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    items: [
      {
        sno: "1",
        itemDetails: "",
        itemId: "",
        selectedItem: null,
        inputValue: "",
        showInput: true,
        account: "",
        date: "",
        unit: "",
        supplier1: "",
        supplier2: "",
        supplier3: "",
        price1: "",
        price2: "",
        price3: "",
        purchasePrice: "",
        quantity: 1.0,
        disc: "",
        cost: "",
        remark: "",
        discount: "",
      },
    ],
  });

  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          sno: "1",
          itemDetails: "",
          itemId: "",
          selectedItem: null,
          inputValue: "",
          showInput: true,
          name: "",
          account: "",
          date: "",
          unit: "",
          supplier1: "",
          supplier2: "",
          supplier3: "",
          price1: "",
          price2: "",
          price3: "",
          purchasePrice: "",
          quantity: 1.0,
          disc: "",
          cost: "",
          remark: "",
          discount: "",
        },
      ],
    }));
  };

  const [fields, setFields] = useState({
    contract: false,
    client: false,
    others: false,
    additional: false,
    division: false,
  });

  const updateItemRow = (index, field, value) => {
    const updatedItems = [...formData.items];

    // Handle numeric fields
    if (
      field === "quantity" ||
      field === "rate" ||
      field === "cost" ||
      field === "profit"
    ) {
      updatedItems[index][field] = parseFloat(value) || 0;

      // Recalculate calculated fields when quantity or rate changes
      if (field === "quantity" || field === "rate") {
        const quantity = updatedItems[index].quantity;
        const rate = updatedItems[index].rate;
        updatedItems[index].amount = (quantity * rate).toFixed(2);
        updatedItems[index].extCost = (quantity * rate).toFixed(2);
      }
    } else {
      updatedItems[index][field] = value;
    }

    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };
  const [selected, setSelected] = useState("Purchase Orders");

  const data = [
    {
      warehouseName: "Ion Lighting Stock Warehouse",
      stockOnHand: 1.0,
      committedStock: 0.0,
      availableForSale: 1.0,
    },
  ];
  const options = [
    "Quotes",
    "Sales Orders",
    "Invoices",
    "Credit Notes",
    "Recurring Invoices",
    "Purchase Orders",
    "Bills",
    "Vendor Credits",
  ];
  const [status, setStatus] = useState("All");

  const option = [
    "All",
    "Draft",
    "Billed",
    "Partially Billed",
    "Canceled",
    "Issued",
    "Received",
    "Partially Received",
    "Dropshipped",
  ];

  const handleMaterialChange = (rowIndex, material) => {
    const selected = materialsData[material];

    const updatedItems = [...items];
    updatedItems[rowIndex].material = material;
    updatedItems[rowIndex].unit = selected.unit;

    // Reset suppliers dynamically
    updatedItems[rowIndex].suppliers = selected.suppliers.slice(0, 4);

    setItems(updatedItems);
  };

  const handleSupplierSelect = (index, supplierKey) => {
    const row = items[index];
    let price = 0;

    if (supplierKey === "supplier1") price = row.price1;
    if (supplierKey === "supplier2") price = row.price2;
    if (supplierKey === "supplier3") price = row.price3;

    // reset all supplier selections
    updateRow(index, "selectedSupplier", supplierKey);
    updateRow(index, "purchasePrice", price);
  };
  const useClickOutside = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };
  useClickOutside(dropdownRef, () => {
    setShowBox(false);
  });
  const toggleField = (field) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const removeRow = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };
  const updateRow = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };
  return (
    <>
  <CardTitle className="text-xl sm:text-2xl lg:text-3xl w-full flex justify-between dark:bg-background bg-white p-3 sm:p-4 lg:p-5">
    <div>New Requisition</div>
    <button
      className="text-black dark:text-white cursor-pointer text-lg sm:text-xl font-bold"
      onClick={onCancel}
    >
      ✕
    </button>
  </CardTitle>

  <Card className="w-full">
    <CardContent className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-15">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Division / Depart. Name</Label>
            <Select name="deptName">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department..." />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Project Number</Label>
            <Input
              type="number"
              name="projectno"
              placeholder="Enter Project Number"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Project Title</Label>
            <Input name="projectTitle" placeholder="Enter Project Title" className="w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Client Name</Label>
            <Select name="clientName">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Client Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jhon deo">Jhon deo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Requested By</Label>
            <Select name="requestedby">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jhon-deo">Jhon doe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Delivery Warehouse Location</Label>
            <Select name="deliveryWarehouseLocation">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Warehouse 1">Warehouse 1</SelectItem>
                <SelectItem value="Warehouse 2">Warehouse 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Requisition Ref. No</Label>
            <Input
              type="number"
              placeholder="Enter Requisition Ref. No"
              name="requisition"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
            <Label className="text-sm sm:text-base">Requisition Date</Label>
            <Input type="date" className="w-full" />
          </div>

          {/* Checkbox Groups */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Checkbox id="competitiveBid" />
                <Label htmlFor="competitiveBid" className="text-sm">Competitive Bid</Label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Checkbox id="forStock" />
                <Label htmlFor="forStock" className="text-sm">For Stock</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox id="soleSource" />
                <Label htmlFor="soleSource" className="text-sm">Sole Source</Label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Checkbox id="workOrder" />
                <Label htmlFor="workOrder" className="text-sm">Work Order</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox id="clientApprovalObtained" />
                <Label htmlFor="clientApprovalObtained" className="text-sm">
                  Client Approval Obtained
                </Label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Checkbox id="jobNo" />
                <Label htmlFor="jobNo" className="text-sm">Job No.</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox id="clientApprovalNotRequired" />
                <Label htmlFor="clientApprovalNotRequired" className="text-sm">
                  Client Approval not required
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Item Table Section */}
  <div className="space-y-4 my-6 sm:my-8 lg:my-10 overflow-x-auto">
    <div className="flex justify-between light:bg-gray-100 p-3 items-center">
      <h3 className="font-semibold text-base sm:text-lg lg:text-xl">Item Table</h3>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] lg:min-w-full text-sm border border-collapse">
        <thead className="border text-center bg-gray-50 dark:bg-gray-900">
          <tr>
            <th rowSpan="2" className="p-2 border text-start font-semibold text-xs sm:text-sm">
              S.No
            </th>
            <th rowSpan="2" className="p-2 border text-start font-semibold text-xs sm:text-sm">
              ITEMS & MATERIAL DESCRIPTION
            </th>
            <th rowSpan="2" className="p-2 border font-semibold text-xs sm:text-sm min-w-[80px] lg:w-40">
              QUANTITY
            </th>
            <th rowSpan="2" className="p-2 border font-semibold text-xs sm:text-sm min-w-[60px] lg:w-30">
              UNIT
            </th>
            <th rowSpan="2" className="p-2 border font-semibold text-xs sm:text-sm min-w-[100px] lg:w-40">
              <span className="text-red-700">*</span>NEED BY DATE
            </th>
            <th rowSpan="2" className="p-2 border font-semibold text-xs sm:text-sm min-w-[120px] lg:w-80">
              REMARKS
            </th>
            <th rowSpan="2" className="p-2 border font-semibold text-xs sm:text-sm min-w-[60px]">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody>
          {formData.items.map((row, index) => (
            <tr key={index}>
              <td className="pl-3 pr-2 py-2 border text-xs sm:text-sm">
                <span>{row.sno}</span>
              </td>
              <td className="pl-3 pr-2 py-2 border min-w-[200px] lg:w-[20%]">
                <div className="w-full max-w-full">
                  {row.showInput ? (
                    <div className="flex gap-2 w-full">
                      <Input
                        type="text"
                        onChange={(e) =>
                          updateItemRow(index, "inputValue", e.target.value)
                        }
                        placeholder="Type or click to select an item."
                        value={row.inputValue}
                        onClick={() => {
                          setShowBox(true);
                          setActiveRow(index);
                        }}
                        className="border px-3 sm:px-4 py-3 sm:py-5 rounded w-full cursor-pointer text-xs sm:text-sm"
                      />
                    </div>
                  ) : row.selectedItem ? (
                    <div className="flex w-full">
                      <div className="space-y-2 w-full">
                        <div className="flex flex-col sm:flex-row sm:gap-5 sm:justify-between items-start">
                          <div className="w-full">
                            <p className="font-medium text-xs sm:text-sm">
                              {row.selectedItem.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              SKU: {row.selectedItem.sku}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-1 sm:mt-0">
                             <TooltipProvider>
                                  <Sheet>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <SheetTrigger asChild>
                                          <Eye className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                        </SheetTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>View Item Detail</p>
                                      </TooltipContent>
                                    </Tooltip>

                                    <SheetContent
                                      side="right"
                                      className="w-full max-w-none flex flex-col h-full"
                                    >
                                      <SheetHeader>
                                        <SheetTitle>Item Details</SheetTitle>
                                      </SheetHeader>

                                      <div className="w-full flex-1 overflow-y-auto">
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center space-x-2 p-4 my-2 w-full bg-gray-100 dark:bg-gray-800">
                                            <ImageIcon className="w-22 h-19 p-2 object-cover font-normal border rounded-md" />
                                            <div>
                                              <p className="text-xs">
                                                Sales and Purchase Items
                                              </p>
                                              <div className="text-md font-semibold">
                                                CHAMBOR POW MATTE LPSTK # 152
                                                4.5G
                                              </div>
                                              <div className="text-xs flex items-center text-gray-500">
                                                30025268
                                                <Dot />
                                                box
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <Tabs
                                          defaultValue="itemDetails"
                                          value={activeTab}
                                          className="w-full"
                                          onValueChange={setActiveTab}
                                        >
                                          <TabsList className="flex mb-4 w-full border-b">
                                            <TabsTrigger
                                              value="itemDetails"
                                              className="text-sm font-medium"
                                            >
                                              Item Details
                                            </TabsTrigger>
                                            <TabsTrigger
                                              value="stockLocations"
                                              className="text-sm font-medium"
                                            >
                                              Stock Locations
                                            </TabsTrigger>
                                            <TabsTrigger
                                              value="transactions"
                                              className="text-sm font-medium"
                                            >
                                              Transactions
                                            </TabsTrigger>
                                          </TabsList>

                                          <TabsContent value="itemDetails">
                                            <div>
                                              <div className="flex flex-col gap-3 mb-6">
                                                <div className="flex flex-col sm:flex-row justify-between w-full px-3 py-1 gap-3 items-start sm:items-center">
                                                  <div className="flex gap-2 items-center">
                                                    <Truck className="text-blue-400 bg-blue-100 dark:bg-background h-9 w-9 p-2 rounded" />
                                                    <p className="text-sm text-gray-500">
                                                      To Be Shipped:{" "}
                                                      <span className="text-[16px] text-black dark:text-white  font-semibold">
                                                        0.00
                                                      </span>
                                                    </p>
                                                  </div>
                                                  <div className="flex gap-2 items-center">
                                                    <Wallet2 className="text-blue-400 bg-blue-100 dark:bg-background h-9 w-9 p-2 rounded" />
                                                    <p className="text-sm text-gray-500">
                                                      To Be Received:{" "}
                                                      <span className="text-[16px] text-black  dark:text-white font-semibold">
                                                        0.00
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="border-b-3">
                                                  <div className="w-full p-3">
                                                    <h3 className="text-lg font-medium">
                                                      Sales Information
                                                    </h3>
                                                    <p className="text-sm p-2 flex text-end justify-between text-gray-500">
                                                      Price:{" "}
                                                      <span>$489.00</span>
                                                    </p>
                                                    <p className="text-sm p-2 flex justify-between text-gray-500">
                                                      Account:{" "}
                                                      <span>Sales</span>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="border-b-3">
                                                  <div className="w-full p-3">
                                                    <h3 className="text-lg font-medium">
                                                      Purchase Information
                                                    </h3>
                                                    <p className="text-sm p-2 flex justify-between text-gray-500">
                                                      Price: <span>$0.00</span>
                                                    </p>
                                                    <p className="text-sm p-2 flex justify-between text-gray-500">
                                                      Account:{" "}
                                                      <span>
                                                        Cost of Goods Sold
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="border-gray-100 p-3 w-full">
                                                  <div className="flex items-center justify-between cursor-pointer group">
                                                    <span
                                                      onClick={() =>
                                                        setOthDetail(!othDetail)
                                                      }
                                                      className="text-sm font-medium text-blue-600"
                                                    >
                                                      Other Details
                                                    </span>
                                                  </div>
                                                  {othDetail && (
                                                    <div className="mt-2 space-y-2">
                                                      <div className="flex items-center w-full justify-between">
                                                        <span className="text-sm text-gray-500">
                                                          Unicommerce Item
                                                        </span>
                                                        <span className="inline-flex items-center text-xs font-medium">
                                                          true
                                                        </span>
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </TabsContent>

                                          <TabsContent value="stockLocations">
                                            <div className="shadow-md overflow-x-auto">
                                              <table className="min-w-full table-auto">
                                                <thead className="bg-gray-200 dark:bg-gray-700">
                                                  <tr>
                                                    <th className="px-4 py-2 text-xs">
                                                      Warehouse Name
                                                    </th>
                                                    <th className="px-4 py-2 text-xs">
                                                      Stock On Hand
                                                    </th>
                                                    <th className="px-4 py-2 text-xs">
                                                      Committed Stock
                                                    </th>
                                                    <th className="px-4 py-2 text-xs">
                                                      Available for Sale
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {data.map((item, idx) => (
                                                    <tr
                                                      key={idx}
                                                      className="border-t pl-5"
                                                    >
                                                      <td className="px-4 text-sm text-center py-2">
                                                        {item.warehouseName}
                                                      </td>
                                                      <td className="px-4 text-sm text-center py-2">
                                                        {item.stockOnHand}
                                                      </td>
                                                      <td className="px-4 text-sm text-center py-2">
                                                        {item.committedStock}
                                                      </td>
                                                      <td className="px-4 text-sm text-center py-2">
                                                        {item.availableForSale}
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          </TabsContent>

                                          <TabsContent value="transactions">
                                            <div>
                                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 border-b pb-2">
                                                <div className="text-lg font-medium p-3">
                                                  <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                      asChild
                                                      className="cursor-pointer"
                                                    >
                                                      <p>{selected}</p>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                      align="center"
                                                      className="w-40"
                                                    >
                                                      {options.map((option) => (
                                                        <DropdownMenuItem
                                                          key={option}
                                                          onClick={() =>
                                                            setSelected(option)
                                                          }
                                                        >
                                                          {option}
                                                        </DropdownMenuItem>
                                                      ))}
                                                    </DropdownMenuContent>
                                                  </DropdownMenu>
                                                </div>
                                                <div className="text-sm p-3">
                                                  <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                      asChild
                                                      className="cursor-pointer"
                                                    >
                                                      <span>
                                                        Status: {status}
                                                      </span>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                      align="start"
                                                      className="w-44"
                                                    >
                                                      {option.map((opt) => (
                                                        <DropdownMenuItem
                                                          key={opt}
                                                          onClick={() =>
                                                            setStatus(opt)
                                                          }
                                                          className={
                                                            status === opt
                                                              ? "bg-blue-500 text-white"
                                                              : ""
                                                          }
                                                        >
                                                          {opt}
                                                        </DropdownMenuItem>
                                                      ))}
                                                    </DropdownMenuContent>
                                                  </DropdownMenu>
                                                </div>
                                              </div>

                                              <div className="p-3 text-center">
                                                <p className="text-sm text-gray-500">
                                                  No Purchase Orders recorded
                                                  yet.
                                                </p>
                                              </div>
                                            </div>
                                          </TabsContent>
                                        </Tabs>
                                      </div>
                                    </SheetContent>
                                  </Sheet>
                                </TooltipProvider>

                            <X
                              className="w-4 h-4 text-muted-foreground cursor-pointer"
                              onClick={() => {
                                updateItemRow(index, "selectedItem", null);
                                updateItemRow(index, "name", "");
                                updateItemRow(index, "unitCost", 0);
                                updateItemRow(index, "rate", 0);
                                updateItemRow(index, "showInput", true);
                                updateItemRow(index, "inputValue", "");
                              }}
                            />
                          </div>
                        </div>
                        <Textarea
                          placeholder="Add a description to your item"
                          className="max-h-3 w-full overflow-y-visible resize-none whitespace-pre-wrap text-xs sm:text-sm"
                          rows={1}
                          onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </td>
              <td className="p-2 border">
                <Input
                  placeholder=""
                  type="number"
                  value={row.qty}
                  onChange={(e) => updateRow(index, "qty", e.target.value)}
                  className="w-full text-xs sm:text-sm"
                />
              </td>
              <td className="p-2 border">
                <Select onChange={(e) => updateRow(index, "unit", e.target.value)}>
                  <SelectTrigger className="w-full text-xs sm:text-sm">
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">pcs</SelectItem>
                    <SelectItem value="litr">litr</SelectItem>
                    <SelectItem value="box">box</SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td className="p-2 border">
                <Input
                  placeholder=""
                  type="date"
                  required
                  value={row.date}
                  onChange={(e) => updateRow(index, "date", e.target.value)}
                  className="w-full text-xs sm:text-sm"
                />
              </td>
              <td className="p-2 border">
                <Textarea
                  value={row.remark}
                  onChange={(e) => updateRow(index, "remark", e.target.value)}
                  className="w-full text-xs sm:text-sm"
                />
              </td>
              <td className="p-2 border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRow(index)}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {showBox && (
      <div
        ref={dropdownRef}
        className="p-2 border bg-white dark:bg-background rounded top-[-24px] w-full sm:w-[80%] lg:w-[50%] mt-2 light:bg-white shadow-lg z-10 relative left-0 sm:left-14"
      >
        {itemList.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              updateItemRow(activeRow, "selectedItem", item);
              updateItemRow(activeRow, "name", item.name);
              updateItemRow(activeRow, "unitCost", item.rate);
              updateItemRow(activeRow, "rate", item.rate);
              updateItemRow(activeRow, "showInput", false);
              updateItemRow(activeRow, "inputValue", "");
              setShowBox(false);
            }}
            className={`p-2 sm:p-3 light:hover:bg-gray-100 cursor-pointer border-b text-xs sm:text-sm ${
              formData.items[activeRow]?.selectedItem?.id === item.id
                ? "bg-blue-100"
                : ""
            }`}
          >
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">
              {item.name} — Rate: ${item.rate}
            </p>
          </div>
        ))}
      </div>
    )}

    <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
      <Button variant="outline" onClick={addRow} className="text-xs sm:text-sm">
        ➕ Add New Row
      </Button>
    </div>
  </div>

  {/* Additional Information Section */}
  <div className="space-y-4 border rounded-md p-4 sm:p-6 lg:p-7">
    <h2 className="font-semibold text-lg sm:text-xl pb-2">Additional Information</h2>
    
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
        {/* Contract Requirement */}
        <div className="space-y-2 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
          <Label htmlFor="contract" className="whitespace-nowrap text-sm sm:text-base min-w-[140px]">
            Contract Requirement
          </Label>
          <Input id="contract" type="file" className="w-full lg:w-64 md:w-90" />
        </div>

        {/* Client Specified */}
        <div className="space-y-2 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
          <Label htmlFor="client" className="whitespace-nowrap text-sm sm:text-base min-w-[140px]">
            Client Specified
          </Label>
          <Input id="client" type="file" className="w-full lg:w-64" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
        {/* Others Specify */}
        <div className="space-y-2 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
          <Label htmlFor="others" className="whitespace-nowrap text-sm sm:text-base min-w-[140px]">
            Others, Specify
          </Label>
          <Input id="others" placeholder="Enter Details" className="w-full lg:w-64" />
        </div>

        {/* Additional Material */}
        <div className="space-y-2 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
          <Label htmlFor="additional" className="whitespace-nowrap text-sm sm:text-base min-w-[140px]">
            Additional Material
          </Label>
          <Input id="additional" placeholder="Enter Ref." className="w-full lg:w-64" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
        {/* Equipment Supplies Division */}
        <div className="space-y-2 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
          <Label htmlFor="equipment" className="whitespace-nowrap text-sm sm:text-base min-w-[140px]">
            Equipment Supplies Division
          </Label>
          <Input
            id="equipment"
            placeholder="Enter Supplies Division"
            className="w-full lg:w-64 md:w-80"
          />
        </div>

        {/* Sole Source Supplier */}
        <div className="space-y-2 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
          <Label htmlFor="supplier" className="whitespace-nowrap text-sm sm:text-base min-w-[140px]">
            Sole Source Supplier
          </Label>
          <Input
            id="supplier"
            placeholder="Enter Supplier Name"
            className="w-full lg:w-64 md:w-100"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col-reverse sm:flex-row gap-3 border-t mt-4 pt-4">
    <Button 
      className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto order-2 sm:order-1"
    >
      Save
    </Button>
    <Button 
      variant="outline" 
      onClick={onCancel}
      className="w-full sm:w-auto order-1 sm:order-2"
    >
      Cancel
    </Button>
  </div>
</>
  );
}
