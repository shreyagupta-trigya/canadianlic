import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowBigRight, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  RadioGroup,
  RadioItem,
} from "@radix-ui/react-dropdown-menu";
import { HelpCircle, Radio, Upload, ImageIcon, MoreVertical, X } from "lucide-react";

import FormPageLayout from "@/layout/FormPageLayout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { accountReceivable, itemList, vendors } from "@/features/utils/ListViewMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";
import { Trash2 } from "lucide-react";
import { company } from "@features/utils/ListViewMenu.jsx";
import { Label } from "recharts";
import { Customers, paymentTerms, salesOrderItems } from "@/features/utils/ListViewMenu";
const CreditForm = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    //handle Submit
    window.alert("success");
  };

  const [editingRow, setEditingRow] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [paymentTerm, setPaymentTerm] = useState("");
  const [receivable, setReceivable] = useState("");


  const [notes, setNotes] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSelect = (item) => {
    const customer = Customers.find((c) => c.id === item);
    setSelectedCustomer(customer);
    setShowBox(false);
    setSelectedItem(item)

  };


  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0); // %
  const [surtax, setSurtax] = useState(0);
  const [descriptions, setDescriptions] = useState({});

  const subtotal = 0; // Set dynamically as needed

  const discountAmount = (subtotal * discount) / 100;
  const total =
    parseFloat(subtotal || 0) +
    parseFloat(shipping || 0) +
    parseFloat(surtax || 0) -
    discountAmount;

  const [items, setItems] = useState([
    {
      item: "",
      cost: "",
      shipDate: "",
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
        item: "",
        cost: "",
        shipDate: "",
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
    <FormPageLayout
      title={"New Credit Note"}
      onCancel={onCancel}
      onSubmit={handleSubmit}


    >

      <FormCard className="bg-sidebar px-2 py-6">
        <div className="w-full ">
          <FormField
            className="flex whitespace-nowrap w-full md:max-w-2xl items-center justify-center ml-2"
            label={<span className="text-red-500">Customer Name*</span>}
          >
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full ml-20 bg-white">
                <SelectValue placeholder="Select or Add a Customer" />
              </SelectTrigger>
              <SelectContent>
                {Customers.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>


          {selectedCustomer && (
            <div className="flex flex-col md:flex-row justify-start md:ml-50 gap-6 ">
              {/* Billing Address Card */}
              <div className="p-4 w-full md:w-[25%]">
                <h3 className="font-semibold text-gray-800 mb-2">Billing Address</h3>
                <p className="text-gray-700">{selectedCustomer.label}</p>
                <p className="text-gray-700">{selectedCustomer.email || "N/A"}</p>
                <p className="text-gray-700">{selectedCustomer.billingAddress || "N/A"}</p>
              </div>

              {/* Shipping Address Card */}
              <div className="p-4 w-full md:w-[25%]">
                <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                <p className="text-gray-700">{selectedCustomer.label}</p>
                <p className="text-gray-700">{selectedCustomer.email || "N/A"}</p>
                <p className="text-gray-700">{selectedCustomer.shippingAddress || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      </FormCard>


      <div className="mt-10 px-3 border-b">
        <div className="flex w-full my-5 justify-between">

          <FormField label={<span className="text-red-500">Credit Note #</span>}>
            <Input
              className="w-[100%]"
              type="text"
              id=""
              placeholder=""

            />
          </FormField>


        </div>

        <div className="flex w-full my-5 justify-between">


          <FormField label="Reference#">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>
        </div>

        <div className="flex w-full my-5 justify-between">
          <FormField label={<span className="text-red-500">Credit Note Date*</span>}>
            <Input className="w-[100%]" type="date" id="" placeholder="" />
          </FormField>
        </div>




        <div className="flex w-full my-5 justify-between">
          <FormField label="Accounts Receivable">
            <Select value={receivable} onValueChange={(val) => setReceivable(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Receivable" />
              </SelectTrigger>
              <SelectContent>
                {accountReceivable.map((term) => (
                  <SelectItem key={term.id} value={term.label}>
                    {term.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

        </div>


      </div>

      <div className="mt-10 px-3">

        <div className="flex w-full my-5  justify-between">
          <FormField label="Salesperson">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Salesperson" />
              </SelectTrigger>
              <SelectContent>
                {Customers.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Job Number">
            <Input
              className="w-[100%]"
              type="text"
              id=""
              placeholder=""
            />
          </FormField>
          <FormField label={<span className="text-red-500">Job Name</span>}>
            <Input
              className="w-[100%]"
              type="text"
              id=""
              placeholder=""
            />
          </FormField>
        </div>

        <div className="flex w-full my-5 justify-between">
          <FormField label={<span className="text-red-500">Customer PO</span>}>
            <Input
              className="w-[100%]"
              type="text"
              id=""
              placeholder=""
            />
          </FormField>

        </div>
      </div>

      <div className="space-y-4 my-10 ml-2  ">
        <div className="flex justify-between light:bg-gray-100  p-3  items-center mb-2">
          <h3 className="font-semibold text-lg">Item Table</h3>
          <Button variant="outline" size="sm" onClick={addRow}>
            {" "}
            {/* Added onClick to addRow */}
            Bulk Actions
          </Button>
        </div>
        <div className="overflow-x-auto ">
          <table className="w-full ms-0 text-sm border min-w-[100rem] border-collapse">
            <thead className="  border text-center">
              <tr>
                <th className="p-2 border text-start ">ITEM DETAILS</th>
                <th className="p-2 border text-start">COST</th>
                <th className="p-2">SHIP DATE</th>
                <th className="p-2 border">FIXTURE TYPE</th>
                <th className="p-2 border text-center">FREIGHT CARRIER</th>
                <th className="p-2 border w-20">QUANTITY</th>
                <th className="p-2 border w-20">RATE</th>
                <th className="p-2 border w-20 text-start">TAX</th>
                <th className="p-2 border w-24 text-right">AMOUNT</th>
                <th className="p-2 border w-10"></th> {/* Action column */}
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
                              value={descriptions[selectedItem?.sku] || ""}
                              onChange={(e) =>
                                setDescriptions((prev) => ({
                                  ...prev,
                                  [selectedItem.sku]: e.target.value,
                                }))
                              }
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
                      value={row.cost}
                      onChange={(e) =>
                        updateRow(index, "cost", e.target.value)
                      }
                    />
                  </td>

                  <td className="p-2 border">
                    <input
                      type="date"
                      value={row.shipDate}
                      onChange={(e) => updateRow(index, "shipDate", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </td>

                  <td className="p-2 border">
                    <Input
                      placeholder=""
                      value={row.fixtureType}
                      onChange={(e) =>
                        updateRow(index, "fixtureType", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-2 border">
                    <Input
                      placeholder=""
                      value={row.freightCarrier}
                      onChange={(e) =>
                        updateRow(index, "freightCarrier", e.target.value)
                      }
                    />
                  </td>
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
                      type=""
                      value={row.rate}
                      onChange={(e) => updateRow(index, "rate", e.target.value)}
                    />
                  </td>
                  <td className="p-2 border">
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
                  </td>
                  <td className="p-2 text-right font-semibold border">
                    {(row.quantity * row.rate).toFixed(2)}
                  </td>
                  <td className="p-2 border">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
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
            className="p-2 border bg-white rounded w-[50%] ml-14 mt-[-20px] light:bg-white "
          >
            {itemList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setShowInput(false);
                  handleSelect(item);
                }}
                className={`p-3 light:hover:bg-gray-100 cursor-pointer border-b text-sm ${selectedItem?.id === item.id ? "bg-blue-100" : ""
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

      <div className="flex items-end mx-3 justify-between">
        <div className="space-y-2 items-end mt-6 w-[60%]">
          <h1>Customer Notes</h1>
          <Textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-[90%]"
            placeholder="Will be displayed on the credit note "
          />
        </div>


        <Card className="bg-[#f8f9fc] rounded-lg p-4 w-full max-w-1/2">
          <CardContent className="space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Sub Total</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping Charges */}
            <div className="flex items-center justify-between gap-4">
              <span className="w-[40%] text-sm text-gray-700">Shipping Charges</span>
              <Input
                type="text"
                className="bg-white w-[35%]"
                value={shipping}
                onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
              />
              <span className="w-[25%] text-right">{parseFloat(shipping || 0).toFixed(2)}</span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between gap-4">
              <span className="w-[40%] text-sm text-gray-700">Discount</span>
              <div className="flex items-center w-[35%]">
                <Input
                  type="text"
                  className="bg-white w-full"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                />
                <span className="ml-2 text-sm font-medium">%</span>
              </div>
              <span className="w-[25%] text-right">{discountAmount.toFixed(2)}</span>
            </div>

            {/* Surtax */}
            <div className="flex items-center justify-between gap-4">
              <span className="w-[40%] text-sm border px-2 py-1 rounded bg-white">Surtax%: 0.50, Col</span>
              <Input
                type="text"
                className="bg-white w-[35%]"
                value={surtax}
                onChange={(e) => setSurtax(parseFloat(e.target.value) || 0)}
              />
              <span className="w-[25%] text-right">{parseFloat(surtax || 0).toFixed(2)}</span>
            </div>

            <hr />

            {/* Total */}
            <div className="flex justify-between text-lg font-bold text-black pt-2">
              <span>Total ( $ )</span>
              <span>{total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex  bg-[#f8f9fc] w-full flex-col md:flex-row p-7 justify-between mt-8 my-5 items-center gap-6  rounded-xl">
        {/* Terms & Conditions */}
        <div className="flex-1">
          <h1 htmlFor="terms" className="mb-1 block font-medium">
            Terms & Conditions
          </h1>
          <Textarea
            id="terms"
            placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
            className="min-h-[100px] max-w-2xl bg-white"
          />
        </div>

      </div>
      <div className="flex w-full my-8 mx-3">
        <p className="text-gray-500 text-sm flex"><b>Additional Fields:</b> Start adding custom fields for your credit notes by going to  {" "}<i>Settings</i> <ArrowBigRight />  <i>Sales </i> <ArrowBigRight /><i>  Credit Notes</i>.</p>
      </div>


      <div className="flex gap-3 border-t pt-4">
        <Button variant="outline" onClick={handleSubmit}>
          Save as Draft
        </Button>

        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Save and Send
        </Button>

        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>



    </FormPageLayout>
  );
};

export default CreditForm;
