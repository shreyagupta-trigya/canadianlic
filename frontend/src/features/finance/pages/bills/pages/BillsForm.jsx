import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import FormPageLayout from "@/layout/FormPageLayout";
import React, { useEffect, useRef, useState } from "react";
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
import {
  HelpCircle,
  ImageIcon,
  MoreVertical,
  PencilLine,
  Pointer,
  Radio,
  Search,
  Trash2,
  Upload,
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
import { itemList, vendors } from "@/features/utils/ListViewMenu";
import { CardTitle } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Assuming you have RadioGroup components

// Placeholder for company data, replace with your actual data source

const BillsForm = () => {
  const navigate = useNavigate();

  const [showBox, setShowBox] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [inputValue, setInputValue] = useState("");
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

  const [items, setItems] = useState([
    {
      itemDetails: "",
      account: "",
      fixtureType: "",
      freightCarrier: "",
      quantity: 1,
      rate: 0,
      tax: "",
    },
  ]);

  const addRow = () => {
    setItems([
      ...items,
      {
        itemDetails: "",
        account: "",
        fixtureType: "",
        freightCarrier: "",
        quantity: 1,
        rate: 0,
        tax: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateRow = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const dropdownRef = useRef(null);

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

  return (
    <>
      <CardTitle className="text-2xl w-full flex justify-between  dark:bg-black bg-white   p-5 ">
        {" "}
        <div> New Bill</div>
        <button
          className="text-black cursor-pointer text-xl font-bold"
          onClick={onCancel}
        >
          ✕
        </button>
      </CardTitle>
      {/* Vendor Name Section */}
      <FormCard className={"bg-sidebar"}>
        <div className="w-full ">
          <FormField
            className={
              "flex whitespace-nowrap w-full items-center justify-center ml-2 "
            }
            label={<span className="text-red-500">Vendor Name*</span>}
          >
            <Select defaultValue={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-[100vw] bg-white  ml-9">
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
          </FormField>

          {activeTab === "" && <div></div>}
          {activeTab === "amitSharma" && (
            <div className="flex gap-23 min-h-20 min-w-20  text-black mt-5 ml-37">
              <div className="text-xs font-medium">
                <h6 className="text-sm flex gap-1 items-center text-gray-600">
                  BILLING ADDRESS <PencilLine size={14} cursor={"pointer"} />
                </h6>
                <p className="mt-2">2140 Merritt Dr</p>
                <p>Garland TX 75041</p>
                <p>2140 Merritt Dr</p>
                <p>Garland TX 75041</p>
                <p>UNITED STATES</p>
              </div>
            </div>
          )}
          {activeTab === "priyaMehta" && (
            <div className="flex gap-23 min-h-20 min-w-20  text-black mt-5 ml-38">
              <div className="text-xs font-medium">
                <h6 className="text-sm flex gap-1 items-center text-gray-600">
                  BILLING ADDRESS <PencilLine size={14} cursor={"pointer"} />
                </h6>
                <p className="mt-2">2140 Merritt Dr</p>
                <p>Garland TX 75041</p>
                <p>2140 Merritt Dr</p>
                <p>Garland TX 75041</p>
                <p>UNITED STATES</p>
              </div>
            </div>
          )}
          {activeTab === "snehaKapoor" && (
            <div className="flex gap-23 min-h-20 min-w-20  text-black mt-5 ml-38">
              <div className="text-xs font-medium">
                <h6 className="text-sm flex gap-1 items-center text-gray-600">
                  BILLING ADDRESS <PencilLine size={14} cursor={"pointer"} />
                </h6>
                <p className="mt-2">2140 Merritt Dr</p>
                <p>Garland TX 75041</p>
                <p>2140 Merritt Dr</p>
                <p>Garland TX 75041</p>
                <p>UNITED STATES</p>
              </div>
            </div>
          )}
        </div>
      </FormCard>

      <div className=" w-full mt-8 ">
        <FormCard>
          {/* Right Column: Purchase Details */}
          <div className="flex items-center">
            <div className="space-y-5  ">
              <FormField
                label={<span className="text-red-500">Bill*#</span>}
                className="flex gap-30 "
              >
                <div className="flex items-center gap-2 ">
                  <Input type="text" placeholder="  " className="w-74" />
                  {/* <Button variant="outline" size="icon">

                    i
                  </Button> */}
                </div>
              </FormField>

              <FormField
                label="Order Number"
                className="flex whitespace-nowrap w-[50rem] gap-15"
              >
                <Input type="text" placeholder="" />
              </FormField>

              <FormField
                label={<span className="text-red-500">Bill Date*</span>}
                className="flex whitespace-nowrap gap-23"
              >
                <Input type="date" placeholder="dd Jun 2025" />
              </FormField>

              <FormField
                label="Due Date"
                className="flex whitespace-nowrap gap-23"
              >
                <Input type="date" placeholder="dd MMM yyyy" />
              </FormField>

              <FormField
                label="Accounts Payable
"
                className="flex  whitespace-nowrap gap-10"
              >
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Accounts Payable
"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Populate with your CRM Owner data */}
                    <SelectItem
                      value="AccountsPayable
"
                    >
                      Accounts Payable
                    </SelectItem>
                    {/* <SelectItem value="">Owner Two</SelectItem> */}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
            <div className="ml-10 w-100">
              <FormField
                label="Payment Terms"
                className="flex whitespace-nowrap gap-13"
              >
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
              </FormField>
            </div>
          </div>
        </FormCard>
      </div>

      {/* Bottom Toggles */}
      <div className="flex flex-wrap items-center ml-2 gap-x-8 gap-y-4 w-full my-8">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-500 ml-5 mr-5">
            Warehouse
          </span>
          <Select>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultValue="yes">
        Warehouse 1
              </SelectItem>
              <SelectItem value="no"> Warehouse 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-50">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Tax Exclusive</SelectItem>
              <SelectItem DefaultValue="no">Tax Inclusive</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        {/* <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-50">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultValue="level1">
                At Transaction Level
              </SelectItem>
              <SelectItem value="level2"> At Line Item Level</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Item Table */}
      <div className="space-y-4 my-10 ml-2 ">
        <div className="flex justify-between light:bg-gray-100  p-3  items-center mb-2">
          <h3 className="font-semibold text-lg">Item Table</h3>
          <Button variant="outline" size="sm" >
            {" "}
            {/* Added onClick to addRow */}
            Bulk Actions
          </Button>
        </div>
        <table className="w-full ms-0 text-sm border border-collapse">
          <thead className="  w-full border text-center">
            <tr>
              <th className="p-2 border text-start ">ITEM DETAILS</th>
              {/* <th className="p-2 border text-start">ACCOUNT</th>
              <th className="p-2 border">FIXTURE TYPE</th>
              <th className="p-2 border text-center">FREIGHT CARRIER</th> */}
              <th className="p-2 border ">QUANTITY</th>
              <th className="p-2 border ">RATE</th>
              {/* <th className="p-2 border  text-start">TAX</th> */}
              <th className="p-2   text-right">AMOUNT</th>
              {/* <th className="p-2  w-10"></th> Action column */}
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => (
              <tr key={index} className="">
                <td className="pl-3 pr-2 py-2 w-[20%] ">
                  <div className="w-80">
                    {showInput ? (
                      <div className="flex gap-2 w-[100%]">
                        <div className="w-10 h-10 border rounded-md flex items-center justify-center bg-muted shrink-0">
                          <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <Input
                          type="text"
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Type or click to select an item. "
                          value={selectedItem ? selectedItem.name : inputValue}
                          onClick={() => {
                            setShowBox(true);
                          }}
                          className="border px-4 py-5 rounded w-full"
                        />
                      </div>
                    ) : selectedItem ? (
                      <div className="flex  w-[100%]   ">
                        <div className=" space-y-2">
                          <div className="flex gap-5 justify-between items-start">
                            <div className="w-10 h-10  border rounded-md flex items-center justify-center bg-muted shrink-0">
                              <img src={selectedItem.img} alt="image" />
                            </div>
                            <div className="">
                              <p className="font-medium">{selectedItem.name}</p>
                              <p className="text-xs text-muted-foreground">
                                SKU: {selectedItem.sku}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Rate: ${selectedItem.rate}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
                              <X
                                className="w-4 h-4 text-muted-foreground cursor-pointer"
                                onClick={() => {
                                  setSelectedItem(null);
                                  setShowInput(true);
                                }}
                              />
                            </div>
                          </div>
                          <Textarea
                            placeholder="Add a description to your item"
                            className="  max-h-3 ml-15  w-65  overflow-y-visible resize-none whitespace-pre-wrap "
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

                {/* <td className="p-2 border">
                  <Select
                    onValueChange={(val) => updateRow(index, "account", val)}
                    value={row.account}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account1">Account 1</SelectItem>
                      <SelectItem value="account2">Account 2</SelectItem>
                    </SelectContent>
                  </Select>
                </td> */}
                {/* <td className="p-2 border">
                  <Input
                    placeholder=""
                    value={row.fixtureType}
                    onChange={(e) =>
                      updateRow(index, "fixtureType", e.target.value)
                    }
                  />
                </td> */}
                {/* <td className="p-2 border">
                  <Input
                    placeholder=""
                    value={row.freightCarrier}
                    onChange={(e) =>
                      updateRow(index, "freightCarrier", e.target.value)
                    }
                  />
                </td> */}
                <td className="p-2  border">
                  <Input
                    type=""
                    value={row.quantity}
                    onChange={(e) =>
                      updateRow(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    value={row.rate}
                    onChange={(e) => updateRow(index, "rate", e.target.value)}
                  />
                </td>
                {/* <td className="p-2 border">
                  <Select
                    onValueChange={(val) => updateRow(index, "tax", val)}
                    value={row.tax}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Tax" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                    </SelectContent>
                  </Select>
                </td> */}
                <td className="p-2 text-right font-semibold border">
                  {(row.quantity * row.rate).toFixed(2)}
                </td>
                <td className="p-2 flex flex-row-reverse">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(index)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem>Clone</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {showBox && (
                <div className="p-5 border rounded w-100 ml-30">
                  {itemList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowInput(false);
                        handleSelect(item);
                      }}
                      className={`p-3 hover:bg-gray-100 cursor-pointer border-b text-sm ${
                        selectedItem?.id === item.id ? "bg-blue-100" : ""
                      }`}
                    >
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.name} — Rate: ${item.rate}
                      </p>
                    </div>
                  ))}
                </div>
              )} */}

        {showBox && (
          <div
            ref={dropdownRef}
            className="p-2 border rounded w-[50%] ml-16 mt-[-30px] light:bg-white "
          >
            {itemList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setShowInput(false);
                  handleSelect(item);
                }}
                className={`p-3 light:hover:bg-gray-100 cursor-pointer border-b text-sm ${
                  selectedItem?.id === item.id ? "bg-blue-100" : ""
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
          <Button variant="outline" onClick={addRow}>
            ➕ Add New Row
          </Button>
          {/* <Button variant="outline">➕ Add Items in Bulk</Button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-end">
          <Label htmlFor="customerNotes">Customer Notes</Label>
          <Textarea
            id="customerNotes"
            className={"h-20"}
            placeholder="Will be displayed on purchase order"
          />
        </div>
        <div className=" border rounded-xl bg-sidebar p-5 w-full  space-y-4">
          {/* Sub Total Row */}
          <div className="flex justify-between items-center text-sm font-medium">
            <span>Sub Total</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Discount</span>
            <div className="flex items-center space-x-1">
              <Input
                type="number"
                defaultValue="0"
                className="w-20 h-8 text-right  bg-white text-sm"
              />
              <span className="text-muted-foreground">%</span>
            </div>
            <span>0.00</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                defaultValue="0"
                className="w-24 h-8 bg-white text-sm"
              />
              <Input type="" className="w-24 h-8 text-sm bg-white" />
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <span>0.00</span>
          </div>

          <hr />

          {/* Total Row */}
          <div className="flex justify-between items-center font-bold text-base">
            <span>Total</span>
            <span>0.00</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row  bg-sidebar py-6 px-3 border-t border-b justify-between mt-5 gap-5  ">
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
        <div className="w-full border-l px-5   md:w-[300px]">
          <Label className="mb-1 block font-medium">
            Attach File(s) to Purchase Order
          </Label>

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

          <p className="text-[11px] text-muted-foreground mt-2">
            You can upload a maximum of 10 files, 10MB each
          </p>
        </div>
      </div>
      <div className="flex gap-3 border-t pt-4">
        <Button variant="outline" onClick={handleSubmit}>
          Save as Draft
        </Button>

        <Button className="bg-orange-500 hover:bg-orange-600 light:text-white">
          Save and Send
        </Button>

        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default BillsForm;
