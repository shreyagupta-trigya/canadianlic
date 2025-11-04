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
import {
  ChevronDown,
  Dot,
  Eye,
  HelpCircle,
  ImageIcon,
  MoreVertical,
  Truck,
  UploadCloud,
  Wallet2,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardTitle } from "@/components/ui/card";
import { itemList, requisitions, vendors } from "@/features/utils/ListViewMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PurchaseOrderForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itemDetails");
  const [showBox, setShowBox] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedReqs, setSelectedReqs] = useState([]);
  const [date, setDate] = useState();
  const [othDetail, setOthDetail] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
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

  const removeReq = (id) => {
    setSelectedReqs((prev) => prev.filter((req) => req !== id));
  };

  const [deliveryMethod, setDeliveryMethod] = useState("warehouses");

  const handleDeliveryMethodChange = (value) => {
    setDeliveryMethod(value);
    if (value === "warehouses") {
      setActiveTab("itemDetails");
    }
  };

  // Main form data state
  const [formData, setFormData] = useState({
    customer: "test",
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
        quantity: 1,
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
        vendor: "",
        country: "",
        currency: "",
      },
    ],
  });

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
    "BN/AWB/TCN",
    "Commercial Invoice",
    "Certificate of Origin",
    "COA",
    "MSDS",
    "Shelf Life Certificate",
    "Packing List",
  ];

  // Add new row to the items table
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
          quantity: 1,
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
          vendor: "",
          country: "",
          currency: "",
          defaultCurrency: "",
        },
      ],
    }));
  };

  const data = [
    {
      warehouseName: "Ion Lighting Stock Warehouse",
      stockOnHand: 1.0,
      committedStock: 0.0,
      availableForSale: 1.0,
    },
  ];

  // Update item row data
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

  // Handle vendor selection
  const handleSelectVendor = (index, vendorId) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    if (vendor) {
      const updatedItems = [...formData.items];
      updatedItems[index].vendor = vendor.label;
      updatedItems[index].country = vendor.country;
      updatedItems[index].currency = vendor.currency;
      updatedItems[index].account = vendor.account || "";
      updatedItems[index].defaultCurrency = vendor.currency || "";

      setFormData((prevData) => ({ ...prevData, items: updatedItems }));
    }
  };

  // Handle currency change
  const handleCurrencyChange = (index, currency) => {
    const updatedItems = [...formData.items];
    updatedItems[index].currency = currency;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const removeRow = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const dropdownRef = useRef(null);

  // Document checklist state
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

  // Click outside handler for dropdown
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

  useEffect(() => {
    const newItems = selectedReqs
      .map((id) => {
        const req = requisitions.find((r) => r.id === id);
        if (!req) return null;

        return {
          name: req.itemName,
          vendor: req.vendor,
          unit: req.unit,
          quantity: req.quantity,
          rate: req.rate,
          deliverydays: req.deliverydays,
          amount: req.quantity * req.rate,
          showInput: false,
          inputValue: "",
          selectedItem: { name: req.itemName, sku: req.id, rate: req.rate },
          country: req.country || "",
          currency: req.currency || "",
          account: req.account || "",
        };
      })
      .filter(Boolean);

    if (newItems.length > 0) {
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  }, [selectedReqs]);

  const toggleReq = (id) => {
    setSelectedReqs((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form data
    if (selectedReqs.length === 0) {
      alert("Please select at least one requisition");
      return;
    }

    // Process form data
    console.log("Form Data:", formData);
    console.log("Selected Requisitions:", selectedReqs);

    // Submit logic here
    window.alert("Purchase Order created successfully!");
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => {
      return sum + item.quantity * item.rate;
    }, 0);

    return {
      subtotal: subtotal.toFixed(2),
      total: subtotal.toFixed(2),
    };
  };

  const totals = calculateTotals();

  // Responsive table component for mobile

  return (
    <>
      <CardTitle className="text-xl sm:text-2xl lg:text-3xl w-full flex justify-between dark:bg-background bg-white p-4 sm:p-5">
        <div>New Purchase Order</div>
        <button
          className="dark:text-white text-black cursor-pointer text-xl font-bold"
          onClick={onCancel}
        >
          ✕
        </button>
      </CardTitle>

      <FormCard className="bg-sidebar p-4 sm:p-6">
        <div className="w-full flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-10">
          {/* Requisition Number */}
          <FormField
            className="w-full lg:flex-1"
            label={
              <span className="text-red-500 whitespace-nowrap text-sm sm:text-base">
                Requisition Number*
              </span>
            }
          >
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className="flex flex-wrap items-center w-full min-h-10 border rounded-md px-3 py-2 cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  {selectedReqs.length === 0 && (
                    <span className="text-sm text-gray-400">
                      Select Requisition(s)
                    </span>
                  )}

                  {selectedReqs.map((id) => {
                    const req = requisitions.find((r) => r.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-1 text-sm"
                      >
                        {req?.label || id}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeReq(id);
                          }}
                        />
                      </div>
                    );
                  })}
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-full max-w-[300px] max-h-50 overflow-y-auto">
                {requisitions.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center px-3 w-50  space-x-4 mb-2"
                  >
                    <Checkbox
                      checked={selectedReqs.includes(req.id)}
                      onCheckedChange={() => toggleReq(req.id)}
                    />
                    <span className="text-sm">{req.label}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </FormField>

          {/* Quotation Date */}
          <FormField
            className="w-full lg:flex-1"
            label={
              <span className="text-red-500 whitespace-nowrap text-sm sm:text-base">
                Quotation Date
              </span>
            }
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal text-sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </FormField>

          {/* Reference Number */}
          <FormField
            className="w-full lg:flex-1"
            label={
              <span className="text-red-500 whitespace-nowrap text-sm sm:text-base">
                Reference Number
              </span>
            }
          >
            <Input
              type="text"
              placeholder="Enter Reference Number"
              className="w-full"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
            />
          </FormField>
        </div>
      </FormCard>

      {/* Item Table Section */}
      <div className="space-y-4 my-4 sm:my-8 mx-2 sm:mx-4 min-h-20 w-full">
        <div className="flex flex-col sm:flex-row justify-between light:bg-gray-100 p-3 items-start sm:items-center gap-3 mb-2">
          <h3 className="font-semibold text-lg sm:text-xl">Item Table</h3>
        </div>

        {/* Desktop Table View */}
        <div className="w-full overflow-x-auto">
          <table className="w-full ms-0 text-sm border min-w-[1300px] border-collapse">
            <thead className="border text-center">
              <tr>
                <th className="p-2 font-semibold whitespace-nowrap border text-start">
                  SR. NO
                </th>
                <th className="p-2 font-semibold border text-start whitespace-nowrap">
                  ITEM NAME & DESCRIPTION
                </th>
                <th className="p-2 font-semibold border text-center">VENDOR</th>
                <th className="p-2 font-semibold border text-center">
                  CURRENCY
                </th>
                <th className="p-2 font-semibold border">UNIT</th>
                <th className="p-2 font-semibold border">QUANTITY</th>
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
                <tr key={index} className="">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="pl-3 pr-2 py-2 border w-[20%]">
                    <div className="w-full max-w-[300px]">
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
                              className="max-h-3 w-full overflow-y-visible resize-none whitespace-pre-wrap text-sm"
                              rows={1}
                              onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height =
                                  e.target.scrollHeight + "px";
                              }}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </td>

                  <td className="p-2 border">
                    <Select
                      onValueChange={(val) => handleSelectVendor(index, val)}
                    >
                      <SelectTrigger className="bg-white mt-2 w-full max-w-[180px]">
                        <SelectValue placeholder="Select a Vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="font-semibold text-xs mt-1">
                      Currency:{" "}
                      <span className="px-1 text-gray-600">
                        {row.defaultCurrency || ""}
                      </span>
                      <br />
                      Country:{" "}
                      <span className="px-1 text-gray-600">
                        {row.country || ""}
                      </span>
                    </div>
                  </td>

                  <td className="p-2 border">
                    <Select
                      value={row.currency || ""}
                      onValueChange={(value) =>
                        handleCurrencyChange(index, value)
                      }
                    >
                      <SelectTrigger className="w-full max-w-[120px]">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="KD">KD</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
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
                      value={row.quantity}
                      onChange={(e) =>
                        updateItemRow(index, "quantity", e.target.value)
                      }
                      min="1"
                      className="w-full max-w-[80px]"
                    />
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
                    <span className="mr-1 text-sm">{row.currency || ""}</span>
                    {row.amount || (row.quantity * row.rate).toFixed(2)}
                  </td>

                  <td className="p-2 flex justify-center items-center">
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
            className="p-2 border bg-white  dark:bg-background rounded w-full lg:bottom-[-10px] md:bottom-[230px] bottom-[-10px] md:w-[80%] ml-0 md:ml-14 mt-2 light:bg-white shadow-lg z-10 absolute"
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
          <Button className="cursor-pointer" variant="outline" onClick={addRow}>
            ➕ Add New Row
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 px-4 py-4 sm:py-6 w-full border-t bg-white dark:bg-background sticky bottom-0">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
          onClick={handleSubmit}
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

export default PurchaseOrderForm;
