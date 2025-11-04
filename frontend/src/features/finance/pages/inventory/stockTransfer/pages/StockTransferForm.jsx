import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import FormPageLayout from "@/layout/FormPageLayout";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dot,
  ImageIcon,
  MoreVertical,
  Trash2,
  Truck,
  Upload,
  UploadCloud,
  Wallet2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { itemList } from "@/features/utils/ListViewMenu";

const StockTransferForm = () => {
  const [showBox, setShowBox] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [othDetail, setOthDetail] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dataToEdit = location.state;

  const warehouseOptions = [
    { value: "Trigya", label: "Trigya" },
    { value: "test24", label: "test24" },
    { value: "Warehouse A", label: "Warehouse A" },
  ];

  const itemOptions = [
    { value: "Item 1", label: "Item 1" },
    { value: "Item 2", label: "Item 2" },
    { value: "Item 3", label: "Item 3" },
  ];

  const [formData, setFormData] = useState({
    transferOrderNo: "",
    date: "",
    reason: "",
    sourceWarehouse: "",
    destinationWarehouse: "",
    items: [
      {
        itemDetails: "",
        itemId: "",
        selectedItem: null,
        inputValue: "",
        showInput: true,
        sourceStock: 0,
        destinationStock: 0,
        transferQuantity: 1,
      },
    ],
    attachments: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    if (dataToEdit) setFormData(dataToEdit);
  }, [dataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addNewItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemDetails: "",
          itemId: "",
          selectedItem: null,
          inputValue: "",
          showInput: true,
          sourceStock: 0,
          destinationStock: 0,
          transferQuantity: 1,
        },
      ],
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

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
  const updateRow = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
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
 const data = [
    {
      warehouseName: "Ion Lighting Stock Warehouse",
      stockOnHand: 1.0,
      committedStock: 0.0,
      availableForSale: 1.0,
    },
  ];
  const handleSubmit = () => {
    const requiredFields = [
      "transferOrderNo",
      "date",
      "sourceWarehouse",
      "destinationWarehouse",
    ];
    const validationErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) validationErrors[field] = `${field} is required`;
    });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.warning(Object.values(validationErrors)[0]);
      return;
    }

    setLoading(true);
    console.log("Form Data:", formData);
    setTimeout(() => {
      toast.success("Stock Transfer Created Successfully!");
      setLoading(false);
    }, 1000);
  };

  const onCancel = () => navigate(-1);

  return (
    <FormPageLayout
      title="New Transfer Order"
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <FormCard title="Stock Transfer Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField label="Transfer Order#" required>
              <Input
                name="transferOrderNo"
                value={formData.transferOrderNo}
                onChange={handleChange}
                className={errors?.transferOrderNo && "border-red-600"}
              />
            </FormField>

            <FormField label="Date" required>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors?.date && "border-red-600"}
              />
            </FormField>

            <FormField label="Reason">
              <Input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </FormField>

            {/* Source & Destination side by side */}
            <div className="flex justify-between  w-70 gap-3">
              <FormField label="Source Warehouse" required>
                <Select
                  value={formData.sourceWarehouse}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, sourceWarehouse: value }))
                  }
                >
                  <SelectTrigger
                    className={errors?.sourceWarehouse && "border-red-600"}
                  >
                    <SelectValue placeholder="Select Source Warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouseOptions.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Destination Warehouse" required>
                <Select
                  value={formData.destinationWarehouse}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      destinationWarehouse: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className={errors?.destinationWarehouse && "border-red-600"}
                  >
                    <SelectValue placeholder="Select Destination Warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouseOptions.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </div>
        </div>

        {/* Item Table */}
        <div className="mt-6 border rounded p-4">
          <h2 className="font-semibold mb-2">Item Table</h2>
          <table className="min-w-full border-collapse border">
            <thead>
              <tr>
                <th className="border font-semibold text-sm p-2">
                  Item Details
                </th>
                <th className="border font-semibold text-sm p-2">
                  Source Stock
                </th>
                <th className="border font-semibold text-sm p-2">
                  Destination Stock
                </th>
                <th className="border font-semibold text-sm p-2">
                  Transfer Quantity
                </th>
                <th className="border font-semibold text-sm p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index}>
                  {/* Lookup/select for item details */}
                  <td className="pl-3 pr-2 py-2 border w-[20%]">
                    <div className="w-80">
                      {item.showInput ? (
                        <div className="flex gap-2 w-[100%]">
                          <Input
                            type="text"
                            onChange={(e) =>
                              updateItemRow(index, "inputValue", e.target.value)
                            }
                            placeholder="Type or click to select an item."
                            value={item.inputValue}
                            onClick={() => {
                              setShowBox(true);
                              setActiveRow(index);
                            }}
                            className="border px-4 py-5 rounded w-full cursor-pointer"
                          />
                        </div>
                      ) : item.selectedItem ? (
                        <div className="flex w-[100%]">
                          <div className="space-y-2 w-full">
                            <div className="flex gap-5 justify-between items-start">
                              <div className="w-full">
                                <p className="font-medium">
                                  {item.selectedItem.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  SKU: {item.selectedItem.sku}
                                </p>
                                {/* <p className="text-xs text-muted-foreground">
                                            Rate: ${row.selectedItem.rate}
                                          </p> */}
                              </div>
                              <div className="flex gap-2">
                                {/* <div>
                                  <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                </div> */}
                                <TooltipProvider>
                                  <Sheet>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <SheetTrigger asChild>
                                          <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                        </SheetTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>View Item Detail</p>
                                      </TooltipContent>
                                    </Tooltip>

                                    <SheetContent
                                      side="right"
                                      className="w-[900px]  flex flex-col h-full"
                                    >
                                      <h2 className="pt-3 px-3">
                                        {" "}
                                        Item Details
                                      </h2>

                                      <div className=" w-full ">
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center space-x-2 p-4 my-2 w-full bg-gray-100">
                                            {/* <img
                                              src="image-placeholder.jpg"
                                              alt="Item"
                                              className="w-22 h-19 p-2 object-cover border rounded-md"
                                            /> */}
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
                                          {/* <Button
                                              variant="ghost"
                                              className="text-gray-500 hover:text-gray-700"
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"
                                                />
                                              </svg>
                                            </Button> */}
                                        </div>

                                        <Tabs
                                          defaultValue="itemDetails"
                                          value={activeTab}
                                          className={"w-full"}
                                          onValueChange={setActiveTab}
                                        >
                                          <TabsList className="flex mb-4 w-full border-b">
                                            <TabsTrigger
                                              value="itemDetails"
                                              className=" text-sm font-medium"
                                            >
                                              Item Details
                                            </TabsTrigger>
                                            <TabsTrigger
                                              value="stockLocations"
                                              className=" text-sm font-medium"
                                            >
                                              Stock Locations
                                            </TabsTrigger>
                                            <TabsTrigger
                                              value="transactions"
                                              className=" text-sm font-medium"
                                            >
                                              Transactions
                                            </TabsTrigger>
                                          </TabsList>

                                          <TabsContent value="itemDetails">
                                            <div>
                                              <div className="flex flex-col gap-3 mb-6">
                                                <div className="flex justify-between w-85 px-3 py-1 gap-3 items-center">
                                                  <div className="flex gap-2 items-center">
                                                    <Truck className="text-blue-400 bg-blue-100 h-9 w-9 p-2 rounded" />
                                                    <p className="text-sm   text-gray-500">
                                                      To Be Shipped:{" "}
                                                      <p className="text-[16px] text-black font-semibold">
                                                        0.00
                                                      </p>
                                                    </p>
                                                  </div>
                                                  <div className="flex gap-2 items-center">
                                                    <Wallet2 className="text-blue-400 bg-blue-100 h-9 w-9 p-2 rounded" />
                                                    <p className="text-sm   text-gray-500">
                                                      To Be Received:{" "}
                                                      <p className="text-[16px] text-black font-semibold">
                                                        0.00
                                                      </p>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="border-b-3">
                                                  <div className="w-60 p-3 ">
                                                    <h3 className="text-lg font-medium">
                                                      Sales Information
                                                    </h3>
                                                    <p className="text-sm p-2 flex text-end justify-between text-gray-500">
                                                      Price: <p>$489.00</p>
                                                    </p>
                                                    <p className="text-sm p-2 flex justify-between text-gray-500">
                                                      Account: <p>Sales</p>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="border-b-3">
                                                  <div className="w-60 p-3 ">
                                                    <h3 className="text-lg font-medium">
                                                      Purchase Information
                                                    </h3>
                                                    <p className="text-sm p-2 flex justify-between text-gray-500">
                                                      Price: <p> $0.00</p>
                                                    </p>
                                                    <p className="text-sm p-2 flex justify-between text-gray-500">
                                                      Account:{" "}
                                                      <p>Cost of Goods Sold</p>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className=" border-gray-100 p-3 w-80">
                                                  <div className="flex items-center justify-between cursor-pointer group">
                                                    <span
                                                      onClick={() => {
                                                        setOthDetail(
                                                          !othDetail
                                                        );
                                                        othDetail
                                                          ? "false"
                                                          : "true";
                                                      }}
                                                      className="text-sm font-medium text-blue-600"
                                                    >
                                                      Other Details
                                                    </span>
                                                  </div>
                                                  {othDetail && (
                                                    <div className="mt-2 space-y-2">
                                                      <div className="flex items-center w-50 justify-between">
                                                        <span className="text-sm text-gray-500">
                                                          Unicommerce Item
                                                        </span>
                                                        <span className="inline-flex items-center   text-xs font-medium ">
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
                                            <div className="bg-white shadow-md  overflow-x-auto">
                                              <table className="min-w-full table-auto">
                                                <thead className="bg-gray-200">
                                                  <tr>
                                                    <th className="px-4 py-2 text-xs ">
                                                      Warehouse Name
                                                    </th>
                                                    <th className="px-4 py-2 text-xs  ">
                                                      Stock On Hand
                                                    </th>
                                                    <th className="px-4 py-2 text-xs  ">
                                                      Committed Stock
                                                    </th>
                                                    <th className="px-4 py-2 text-xs  ">
                                                      Available for Sale
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {data.map((item, index) => (
                                                    <tr
                                                      key={index}
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
                                            <div className="">
                                              <div className="flex items-center justify-between mb-4 border-b pb-2">
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
                                                      {option.map((option) => (
                                                        <DropdownMenuItem
                                                          key={option}
                                                          onClick={() =>
                                                            setStatus(option)
                                                          }
                                                          className={
                                                            status === option
                                                              ? "bg-blue-500 text-white"
                                                              : ""
                                                          }
                                                        >
                                                          {option}
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
                                      {/* <div className="mt-auto pt-2 border-t flex justify-center">
                                        <SheetClose asChild>
                                          <Button variant="primary">
                                            Save
                                          </Button>
                                        </SheetClose>
                                      </div> */}
                                    </SheetContent>
                                  </Sheet>
                                </TooltipProvider>
                                {/* <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" /> */}
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
                              className="max-h-3 w-75 overflow-y-visible resize-none whitespace-pre-wrap"
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
                  <td className="border p-2 text-center">{item.sourceStock}</td>
                  <td className="border p-2 text-center">
                    {item.destinationStock}
                  </td>
                  <td className="border p-2 text-center">
                    <Input
                      type="number"
                      value={item.transferQuantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "transferQuantity",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeItemRow(index)}
                      className="text-red-600 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showBox && (
            <div
              ref={dropdownRef}
              className="p-2 border bg-white rounded w-[50%] ml-14 mt-[-20px] light:bg-white shadow-lg z-10 absolute"
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

          <Button
            variant="outline"
            className={"mt-5 cursor-pointer"}
            onClick={addNewItemRow}
          >
            ➕ Add New Row
          </Button>
        </div>

        {/* File Upload */}
        <div className="mt-10 w-70 ">
          <label
            htmlFor="fileup"
            className="flex items-center justify-center mt-4 w-full border-2 border-dashed border-gray-300 rounded-lg px-6 py-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex flex-col items-center gap-2 text-gray-600">
              <UploadCloud className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium">Upload Files</span>
              <span className="text-xs text-gray-400">
                Click to browse or drag and drop
              </span>
            </div>
          </label>

          {/* Hidden Input */}
          <Input type="file" id="fileup" className="hidden" multiple />
        </div>
      </FormCard>
    </FormPageLayout>
  );
};

export default StockTransferForm;
