import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BsCurrencyExchange } from "react-icons/bs";
import {
  Check,
  Dot,
  Eye,
  HelpCircle,
  ImageIcon,
  MoreVertical,
  PencilLine,
  Radio,
  Trash2,
  Truck,
  Upload,
  UploadCloud,
  Wallet,
  Wallet2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "recharts";
import { Textarea } from "@/components/ui/textarea";
import { CardTitle } from "@/components/ui/card";
import { itemList, vendors } from "@/features/utils/ListViewMenu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiUserReceived2Fill } from "react-icons/ri";

const PurchaseForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [activeRow, setActiveRow] = useState(0);
  const [othDetail, setOthDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const onCancel = () => {
    navigate(-1);
  };
  const handleSelect = (item) => {
    setSelectedItem(item);
    setShowBox(false);
  };

  const handleSubmit = () => {
    //handle Submit
    window.alert("success");
  };

  const [deliveryMethod, setDeliveryMethod] = useState("warehouses");
  const handleDeliveryMethodChange = (value) => {
    setDeliveryMethod(value);
    if (value === "warehouses") {
      setActiveTab("");
    }
  };
  const [formData, setFormData] = useState({
    customer: "",
    salesOrderNumber: "",
    salesOrderDate: "",
    reference: "",
    expectedShipmentDate: "",
    paymentTerm: "",
    deliveryMethod: "",
    salesperson: "",
    jobNumber: "",
    jobName: "",
    createProjectTracker: "No",
    createJobTracker: "No",
    customerPO: "",
    notes: "",
    termsAndConditions: "",
    shippingCharges: 0,
    discountPercentage: 0,
    surtax: 0.5,
    items: [
      {
        itemId: "",
        selectedItem: null,
        inputValue: "",
        showInput: true,
        name: "",
        cost: 0,
        shipDate: "",
        fixtureType: "",
        freightCarrier: "",
        mrQuantity: "",
        ordQuantity: "",
        required: "",
        rate: 0,
        tax: 0,
        unitCost: 0,
        gm: 0,
        unitSell: 0,
        extCost: 0,
        extSell: 0,
        profit: 0,
        icode: "",
        description: "",
        unit: "",
        account: "",
        deliverydays: "",
        amount: "",
      },
    ],
  });

  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          itemId: "",
          selectedItem: null,
          inputValue: "",
          showInput: true,
          name: "",
          cost: 0,
          shipDate: "",
          fixtureType: "",
          freightCarrier: "",
          mrQuantity: "",
          ordQuantity: "",
          required: "",
          rate: 0,
          tax: 0,
          unitCost: 0,
          gm: 0,
          unitSell: 0,
          extCost: 0,
          extSell: 0,
          profit: 0,
          icode: "",
          description: "",
          unit: "",
          account: "",
          deliverydays: "",
          amount: "",
        },
      ],
    }));
  };

  const [selected, setSelected] = useState("Purchase Orders");

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

  const documents = [
    { name: "BL/AWB/TCN", hideInLPO: true },
    { name: "Commercial Invoice", hideInLPO: false },
    { name: "Certificate of Origin", hideInLPO: true },
    { name: "COA / MTC / TDC", hideInLPO: false },
    { name: "MSDS", hideInLPO: false },
    { name: "Shelf Life Certificate", hideInLPO: false },
    { name: "Packing List", hideInLPO: true },
    { name: "Delivery Note", hideInLPO: false, hideInUSD: true },
    { name: "Others", hideInLPO: false },
  ];

  const removeRow = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };
  const selectedVendor = vendors.find((v) => v.id === activeTab);
  const visibleDocs =
    selectedVendor?.currency === "KD"
      ? documents.filter((doc) => !doc.hideInLPO)
      : documents.filter((doc) => !doc.hideInUSD);
  const updateItemRow = (index, field, value) => {
    const updatedItems = [...formData.items];

    // Parse numeric fields
    if (
      field === "quantity" ||
      field === "rate" ||
      field === "cost" ||
      field === "profit" ||
      field === "mrQuantity" ||
      field === "required"
    ) {
      updatedItems[index][field] = parseFloat(value) || 0;

      // Recalculate amount & extCost
      if (field === "quantity" || field === "rate") {
        const quantity = updatedItems[index].quantity;
        const rate = updatedItems[index].rate;
        updatedItems[index].amount = (quantity * rate).toFixed(2);
        updatedItems[index].extCost = (quantity * rate).toFixed(2);
      }
    } else {
      updatedItems[index][field] = value;
    }

    // --- Validation & Auto-correct ---
    const {
      mrQuantity = 0,
      ordQuantity = 0,
      required = 0,
    } = updatedItems[index];
    updatedItems[index].errors = { required: "" };

    const maxRequired = Math.max(mrQuantity - ordQuantity, 0);

    if (required > maxRequired) {
      updatedItems[index].required = maxRequired;
      updatedItems[
        index
      ].errors.required = `Required cannot exceed ${maxRequired} (MR - Ordered)`;
    }

    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  const dropdownRef = useRef(null);
  const [checked, setChecked] = useState(
    documents.map(() => ({ original: false, copy: false }))
  );

  const handleCheck = (rowIndex, type) => {
    setChecked((prev) =>
      prev.map((row, i) =>
        i === rowIndex ? { ...row, [type]: !row[type] } : row
      )
    );
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
 const data = [
    {
      warehouseName: "Ion Lighting Stock Warehouse",
      stockOnHand: 1.0,
      committedStock: 0.0,
      availableForSale: 1.0,
    },
  ];
  return (
    <>
      <CardTitle className="text-xl sm:text-2xl lg:text-3xl w-full flex justify-between dark:bg-background bg-white p-4 sm:p-5">
        <div>New Purchase Order</div>
        <button
          className="text-black dark:text-white cursor-pointer text-xl font-bold"
          onClick={onCancel}
        >
          ✕
        </button>
      </CardTitle>

      {/* Vendor Name Section */}
      <FormCard className={"bg-sidebar p-4 sm:p-6"}>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex flex-col md:flex-row lg:flex-row lg:w-125 md:w-100 w-full">
              <FormField
                className={"flex whitespace-nowrap items-center justify-start lg:ml-6 md:ml-6 ml-0 mb-2 md:mb-0 lg:mb-0"}
                label={
                  <span className="text-red-500 text-sm sm:text-base">
                    Vendor Name*
                  </span>
                }
              />
              <Select
                defaultValue={activeTab}
                onValueChange={setActiveTab}
               
              >
                <SelectTrigger className="w-full lg:w-[600px]">
                  <SelectValue placeholder="Select a Vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedVendor && (
              <div className="border p-[5px] rounded-md bg-white dark:bg-gray-600 mt-2 sm:mt-0">
                <BsCurrencyExchange className="inline mr-2 text-green-500" />
                {selectedVendor.currency}
              </div>
            )}
          </div>

          {/* Address Section */}
          {activeTab && activeTab !== "" && (
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:pl-60 md:pl-52 dark:text-white  text-black mt-5">
              <div className="text-sm">
                <h6 className="text-sm flex gap-1 items-center text-gray-600 dark:text-white mb-2">
                  BILLING ADDRESS <PencilLine size={14} cursor={"pointer"} />
                </h6>
                <div className="space-y-1 text-xs">
                  <p>2140 Merritt Dr</p>
                  <p>Garland TX 75041</p>
                  <p>2140 Merritt Dr</p>
                  <p>Garland TX 75041</p>
                  {selectedVendor && <p>{selectedVendor.country}</p>}
                </div>
              </div>
              <div className="text-sm">
                <h6 className="text-sm mb-2">SHIPPING ADDRESS</h6>
                <p className="text-blue-900 font-medium">New address</p>
              </div>
            </div>
          )}
        </div>
      </FormCard>

      {/* PO Details Section */}
      <div className="w-full p-2 sm:p-4">
        <FormCard className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left Column */}
            <div className="space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label={
                    <span className="text-red-500 whitespace-nowrap text-sm sm:text-base">
                      Purchase Order No*
                    </span>
                  }
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input
                  type="text"
                  className="w-full"
                  value={selectedVendor ? selectedVendor.po : ""}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Supplier Quotation Ref No"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input type="text" placeholder="" className="w-full" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Purchase Order Date"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input
                  type="date"
                  placeholder="dd Jun 2025"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Delivery Date"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input
                  type="date"
                  placeholder="dd MMM yyyy"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Department"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input type="" placeholder="" className="w-full" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Shipment Mode"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Select>
                  <SelectTrigger className="w-full md:min-w-59 lg:min-w-60">
                    <SelectValue placeholder="Choose the shipment Mode or type to ad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pref1">Mode 1</SelectItem>
                    <SelectItem value="pref2">Mode 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Contact Person"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input className="w-full" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Contact Email"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input className="w-full" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Requisition"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Input className="w-full" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <FormField
                  label="Payment Terms"
                  className="flex whitespace-nowrap min-w-[140px]"
                />
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Due on Receipt" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due_on_receipt">
                      Due on Receipt
                    </SelectItem>
                    <SelectItem value="net_15">Net 15</SelectItem>
                    <SelectItem value="net_30">Net 30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </FormCard>
      </div>

      <div className="space-y-4 my-6 mx-2 sm:mx-4">
        <div className="flex flex-col sm:flex-row justify-between light:bg-gray-100 p-3 items-start sm:items-center gap-3 mb-2">
          <h3 className="font-semibold text-lg sm:text-xl">Item Table</h3>
          
        </div>

        <div className="  w-full overflow-x-auto">
          <table className="w-full text-sm border min-w-[1200px] border-collapse">
            <thead className="border text-center">
              <tr>
                <th className="p-2 font-semibold border text-start whitespace-nowrap">
                  SR. NO
                </th>
                <th className="p-2 font-semibold border text-start whitespace-nowrap">
                  ITEM NAME & DESCRIPTION
                </th>
                <th className="p-2 font-semibold border">UNIT</th>
                <th className="p-2 font-semibold border whitespace-nowrap">
                  MR QTY
                </th>
                <th className="p-2 font-semibold border whitespace-nowrap">
                  ORDERED
                </th>
                <th className="p-2 font-semibold border whitespace-nowrap">
                  REQUIRED
                </th>
                <th className="p-2 font-semibold border">RATE</th>
                <th className="p-2 font-semibold border whitespace-nowrap text-start">
                  DELIVERY DAYS
                </th>
                <th className="p-2 font-semibold border text-center">AMOUNT</th>
                <th className="p-2 font-semibold border">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="pl-3 pr-2 py-2 border w-[20%]">
                    <div className="w-full max-w-[400px]">
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
                            className="border px-3 py-2 rounded w-full cursor-pointer text-sm"
                          />
                        </div>
                      ) : row.selectedItem ? (
                        <div className="flex w-full">
                          <div className="space-y-2 w-full">
                            <div className="flex gap-3 justify-between items-start">
                              <div className="w-full">
                                <p className="font-medium text-sm">
                                  {row.selectedItem.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  SKU: {row.selectedItem.sku}
                                </p>
                              </div>
                              <div className="flex gap-2">
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
                              className="w-full max-h-20 overflow-y-visible resize-none whitespace-pre-wrap text-sm"
                              rows={1}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </td>
                  <td className="p-2 border">
                    <Select
                      value={row.unit || ""}
                      onValueChange={(value) =>
                        updateItemRow(index, "unit", value)
                      }
                    >
                      <SelectTrigger className="w-full max-w-[100px]">
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
                      type="number"
                      value={row.mrQuantity}
                      onChange={(e) =>
                        updateItemRow(index, "mrQuantity", e.target.value)
                      }
                      min="1"
                      className="w-full max-w-[80px]"
                    />
                  </td>
                  <td className="p-2 border">
                    <Input
                      type="number"
                      value={row.ordQuantity}
                      disabled
                      className="bg-gray-100 w-full max-w-[80px]"
                    />
                  </td>
                  <td className="p-2 border">
                    <Input
                      type="number"
                      value={row.required}
                      onChange={(e) =>
                        updateItemRow(index, "required", e.target.value)
                      }
                      min="0"
                      className={`w-full max-w-[80px] ${
                        row.errors?.required ? "border-red-500" : ""
                      }`}
                    />
                    {row.errors?.required && (
                      <p className="text-red-500 text-xs mt-1">
                        {row.errors.required}
                      </p>
                    )}
                  </td>
                  <td className="p-2 border">
                    <Input
                      type="number"
                      value={row.rate}
                      onChange={(e) =>
                        updateItemRow(index, "rate", e.target.value)
                      }
                      step="0.01"
                      className="w-full max-w-[100px]"
                    />
                  </td>
                  <td className="p-2 border">
                    <Input
                      value={row.deliverydays}
                      onChange={(e) =>
                        updateItemRow(index, "deliverydays", e.target.value)
                      }
                      placeholder="Delivery days"
                      className="w-full max-w-[120px]"
                    />
                  </td>
                  <td className="p-2 text-right font-semibold border">
                    ${row.amount || "0.00"}
                  </td>
                  <td className="p-2 flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(index)}
                      disabled={formData.items.length <= 1}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Item Selection Dropdown */}
        {showBox && (
          <div
            ref={dropdownRef}
            className="p-2 border bg-white dark:bg-background rounded top-[-20px] md:top-[-20px] lg:top-[-32px] w-full md:w-[50%] ml-0 md:ml-14 mt-2 light:bg-white shadow-lg z-10 relative"
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
                className={`p-3 light:hover:bg-gray-100 cursor-pointer border-b text-sm ${
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

        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            onClick={addRow}
            className="w-full sm:w-auto"
          >
            ➕ Add New Row
          </Button>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 w-full">
        {/* Documents Section */}
        <div className="w-full lg:w-1/2">
          <div className="text-sm rounded-md">
            <table className="w-full border-collapse border bg-white dark:bg-background text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border p-2 text-left">Document</th>
                  <th className="border p-2">Original</th>
                  <th className="border p-2">Copy</th>
                </tr>
              </thead>
              <tbody>
                {visibleDocs.map((doc, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-sm">{doc.name}</td>
                    <td className="border p-2 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="border p-2 text-center">
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2">
              <Textarea
                placeholder="Enter Other Document Type"
                className="resize-none min-h-2 w-full border-0 shadow-none focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Delivery Terms & Totals Section */}
        <div className="flex flex-col w-full lg:w-1/2 gap-6">
          {/* Delivery Terms */}
          <div className="flex flex-col gap-2">
            <FormField
              label="Delivery Terms"
              className="flex whitespace-nowrap"
            />
            <Textarea
              id="deliveryTerms"
              className="h-20"
              placeholder="Delivery Terms"
            />
          </div>

          {/* Totals Section */}
          <div className="border rounded-xl bg-sidebar p-4 sm:p-5 w-full space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Sub Total</span>
              <div className="flex items-center space-x-1">
                {selectedVendor && <div>{selectedVendor.currency}</div>}
                <span>0.00</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Discount</span>
              <div className="flex items-center space-x-1">
                <Input
                  type="text"
                  defaultValue="0"
                  className="w-16 sm:w-20 h-8 text-right bg-white text-sm"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <span>0.00</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  defaultValue="0"
                  className="w-20 sm:w-24 h-8 bg-white text-sm"
                />
                <Input
                  type="text"
                  className="w-20 sm:w-24 h-8 text-sm bg-white"
                />
                <Button variant="ghost" size="icon">
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <span>0.00</span>
            </div>

            <hr />

            <div className="flex justify-between items-center font-bold text-base">
              <span>Total</span>
              <span>0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions and Upload Section */}
      <div className="flex flex-col md:flex-row bg-sidebar py-6 px-4 border-t border-b justify-between mt-5 gap-5">
        {/* Terms & Conditions */}
        <div className="flex-1">
          <Label htmlFor="terms" className="mb-1 block font-medium">
            Terms & Conditions
          </Label>
          <Textarea
            id="terms"
            placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
            className="min-h-[100px]"
          />
        </div>

        {/* Upload File Section */}
        <div className="w-full md:w-70 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-5">
          <label
            htmlFor="fileup"
            className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg px-4 sm:px-6 py-4 cursor-pointer hover:border-blue-500 dark:hover:bg-background/20 hover:bg-blue-50 transition-colors"
          >
            <div className="flex flex-col items-center gap-2 text-gray-600">
              <UploadCloud className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium">Upload Files</span>
              <span className="text-xs text-gray-400 text-center">
                Click to browse or drag and drop
              </span>
            </div>
          </label>
          <Input type="file" id="fileup" className="hidden" multiple />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 border-t pt-4 px-4">
        <Button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
        >
          Save
        </Button>

        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default PurchaseForm;
