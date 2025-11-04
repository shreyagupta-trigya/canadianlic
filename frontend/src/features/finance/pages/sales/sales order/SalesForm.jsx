import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { createSalesOrder } from "@/services/sales/SalesOrderApi";
import { addSalesOrderToList } from "@/redux/slices/sales/SalesOrderSlice";
import { Upload, ImageIcon, MoreVertical, X, Trash2 } from "lucide-react";
import FormPageLayout from "@/layout/FormPageLayout";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  itemList,
  Customers,
  paymentTerms,
} from "@/features/utils/ListViewMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SalesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        quantity: 1,
        rate: 0,
        tax: 0,
        unitCost: 0,
        gm: 0,
        unitSell: 0,
        extCost: 0,
        extSell: 0,
        profit: 0,
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [totalExtSell, setTotalExtSell] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const dropdownRef = useRef(null);


// useEffect(() => {
//   const newSubtotal = formData.items.reduce(
//     (acc, item) => acc + item.quantity * item.rate,
//     0
//   );
//   setSubtotal(newSubtotal);

//   // Calculate total Ext Sell
//   const totalExtSell = formData.items.reduce(
//     (acc, item) => acc + parseFloat(item.extSell || 0),
//     0
//   );
//   setTotalExtSell(totalExtSell);

//   // Calculate tax based on selected rate
//   const taxAmount = formData.taxRate 
//     ? (totalExtSell * parseFloat(formData.taxRate)) / 100
//     : 0;

//   const discountAmount = (totalExtSell * formData.discountPercentage) / 100;
//   const newTotal =
//     totalExtSell +
//     parseFloat(formData.shippingCharges) +
//     parseFloat(formData.surtax) +
//     taxAmount -
//     discountAmount;
//   setTotal(newTotal);
// }, [
//   formData.items,
//   formData.shippingCharges,
//   formData.discountPercentage,
//   formData.surtax,
//   formData.taxRate, // Add this dependency
// ]);


useEffect(() => {
  const newSubtotal = formData.items.reduce(
    (acc, item) => acc + item.quantity * item.rate,
    0
  );
  setSubtotal(newSubtotal);

  // Calculate total Ext Sell
  const totalExtSell = formData.items.reduce(
    (acc, item) => acc + parseFloat(item.extSell || 0),
    0
  );
  setTotalExtSell(totalExtSell);

  // Calculate tax based on selected rate
  const taxAmount = formData.taxRate 
    ? (totalExtSell * parseFloat(formData.taxRate)) / 100
    : 0;

  // Calculate surtax (0.5% of subtotal + tax)
  const calculatedSurtax = ((totalExtSell + taxAmount) * 0.5) / 100;
  
  const discountAmount = (totalExtSell * formData.discountPercentage) / 100;
  const newTotal =
    totalExtSell +
    parseFloat(formData.shippingCharges) +
    taxAmount +
    calculatedSurtax -
    discountAmount;
  
  setTotal(newTotal);
  // Update formData with calculated surtax
  setFormData(prev => ({...prev, surtax: calculatedSurtax.toFixed(2)}));
}, [
  formData.items,
  formData.shippingCharges,
  formData.discountPercentage,
  formData.taxRate,
]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCustomerSelect = (customerId) => {
    const customer = Customers.find((c) => c.id === customerId);
    setFormData((prevData) => ({ ...prevData, customer }));
  };

  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          itemId: "",
          name: "",
          selectedItem: null,
          inputValue: "",
          showInput: true,
          cost: 0,
          shipDate: "",
          fixtureType: "",
          freightCarrier: "",
          unitCost: 0,
          gm: 0,
          unitSell: 0,
          extCost: 0,
          extSell: 0,
          profit: 0,
          quantity: 1,
          rate: 0,
          tax: 0,
        },
      ],
    }));
  };

  const removeRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const updateItemRow = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] =
      field === "quantity" || 
      field === "rate" || 
      field === "cost" || 
      field === "unitCost" || 
      field === "gm" || 
      field === "unitSell" || 
      field === "extCost" || 
      field === "extSell" || 
      field === "profit"
        ? parseFloat(value) || 0
        : value;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const salesOrderPayload = {
      ...formData,
      customer: formData.customer?.id,
      salesperson: formData.salesperson?.id,
      subtotal,
      total,
      items: JSON.stringify(formData.items),
    };

    try {
      const newSalesOrder = await createSalesOrder(salesOrderPayload);
      dispatch(addSalesOrderToList(newSalesOrder));
      toast.success("Sales Order Created Successfully");
      navigate("/finance/sales/sales-order");
    } catch (err) {
      console.error("Failed to create sales order:", err);
      setError("Failed to create sales order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
  // Force-set taxRate to "6" when component mounts
  handleSelectChange("taxRate", "6");
}, []); // Empty dependency array = runs only once on mount

  return (
    <FormPageLayout
      title={"New Sales Order"}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isSubmitting={loading}
    >
      <FormCard className="bg-sidebar px-4 py-6">
        <div className="w-full">
          <FormField label="Customer Name*" isRequired={true}>
            <Select
              onValueChange={handleCustomerSelect}
              value={formData.customer?.id || ""}
            >
              <SelectTrigger className="w-full bg-white">
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
          {formData.customer && (
            <div className="flex flex-col md:flex-row justify-start gap-6 mt-4">
              <div className="p-4 w-full md:w-[25%]">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Billing Address
                </h3>
                <p className="text-gray-700">{formData.customer.label}</p>
                <p className="text-gray-700">
                  {formData.customer.email || "N/A"}
                </p>
                <p className="text-gray-700">
                  {formData.customer.billingAddress || "N/A"}
                </p>
              </div>
              <div className="p-4 w-full md:w-[25%]">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-700">{formData.customer.label}</p>
                <p className="text-gray-700">
                  {formData.customer.email || "N/A"}
                </p>
                <p className="text-gray-700">
                  {formData.customer.shippingAddress || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </FormCard>

      <FormCard>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Sales Order#" isRequired={true}>
            <Input
              name="salesOrderNumber"
              value={formData.salesOrderNumber}
              onChange={handleInputChange}
              placeholder="Sales Order"
            />
          </FormField>
          <FormField label="Reference#">
            <Input
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Sales Order Date" isRequired={true}>
            <Input
              name="salesOrderDate"
              type="date"
              value={formData.salesOrderDate}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label="Expected Shipment Date">
            <Input
              name="expectedShipmentDate"
              type="date"
              value={formData.expectedShipmentDate}
              onChange={handleInputChange}
            />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Payment Terms">
            <Select
              name="paymentTerm"
              value={formData.paymentTerm}
              onValueChange={(val) => handleSelectChange("paymentTerm", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Term" />
              </SelectTrigger>
              <SelectContent>
                {paymentTerms.map((term) => (
                  <SelectItem key={term.id} value={term.label}>
                    {term.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Delivery Method">
            <Select
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onValueChange={(val) => handleSelectChange("deliveryMethod", val)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="By Air">By Air</SelectItem>
                <SelectItem value="Courier">Courier</SelectItem>
                <SelectItem value="Bike">Bike</SelectItem>
                <SelectItem value="Truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Salesperson">
            <Select
              onValueChange={(val) => {
                const salesperson = Customers.find((c) => c.id === val);
                handleSelectChange("salesperson", salesperson);
              }}
              value={formData.salesperson?.id || ""}
            >
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
              name="jobNumber"
              value={formData.jobNumber}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
          <FormField label="Job Name" isRequired={true}>
            <Input
              name="jobName"
              value={formData.jobName}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Create Project Tracker" isRequired={true}>
            <Select
              name="createProjectTracker"
              value={formData.createProjectTracker}
              onValueChange={(val) =>
                handleSelectChange("createProjectTracker", val)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Create Job Tracker" isRequired={true}>
            <Select
              name="createJobTracker"
              value={formData.createJobTracker}
              onValueChange={(val) =>
                handleSelectChange("createJobTracker", val)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Customer PO" isRequired={true}>
            <Input
              name="customerPO"
              value={formData.customerPO}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
        </div>
      </FormCard>

      <div className="space-y-4 my-10 ml-2 overflow-x-auto">
        <div className="flex justify-between p-3 items-center mb-2">
          <h3 className="font-semibold text-lg">Item Table</h3>
        </div>
        <table className="w-full text-sm border min-w-[120rem] text border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-start">Item Details</th>
              <th className="p-2">Ship Date</th>
              <th className="p-2 border">Fixture Type</th>
              <th className="p-2 border text-center">Freight Carrier</th>
              <th className="p-2 border w-20">Qty</th>
              <th className="p-2 border whitespace-nowrap w-20">Unit Cost $</th>
              <th className="p-2 border w-20">Gm%</th>
              <th className="p-2 border whitespace-nowrap w-20">Unit Sell $</th>
              <th className="p-2 border w-20">Ext Cost</th>
              <th className="p-2 border w-20">Ext Sell</th>
              <th className="p-2 border w-20">Profit</th>
              {/* <th className="p-2 border text-center">Tax</th> */}
              <th className="p-2  border text-right">Amount</th>
              <th className="p-2 border w-10"></th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((row, index) => (
              <tr key={index}>
                <td className="pl-3 pr-2 py-2 border">
                  <div className="w-80">
                    {row.showInput ? (
                      <div className="flex gap-2 w-[100%]">
                        <div className="w-10 h-10 border rounded-md flex items-center justify-center bg-muted shrink-0">
                          <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <Input
                          type="text"
                          onChange={(e) => updateItemRow(index, "inputValue", e.target.value)}
                          placeholder="Type or click to select an item."
                          value={row.inputValue}
                          onClick={() => {
                            setShowBox(true);
                            setActiveRow(index);
                          }}
                          className="border px-4 py-5 rounded w-full"
                        />
                      </div>
                    ) : row.selectedItem ? (
                      <div className="flex w-[100%]">
                        <div className="space-y-2">
                          <div className="flex gap-5 justify-between items-start">
                            <div className="w-10 h-10 border rounded-md flex items-center justify-center bg-muted shrink-0">
                              <img src={row.selectedItem.img} alt="item" className="w-full h-full object-cover" />
                            </div>
                            <div className="">
                              <p className="font-medium">{row.selectedItem.name}</p>
                              <p className="text-xs text-muted-foreground">
                                SKU: {row.selectedItem.sku}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Rate: ${row.selectedItem.rate}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
                              <X
                                className="w-4 h-4 text-muted-foreground cursor-pointer"
                                onClick={() => {
                                  const updatedItems = [...formData.items];
                                  updatedItems[index] = {
                                    ...updatedItems[index],
                                    selectedItem: null,
                                    name: "",
                                    unitCost: 0,
                                    rate: 0,
                                    showInput: true,
                                    inputValue: ""
                                  };
                                  setFormData(prev => ({ ...prev, items: updatedItems }));
                                }}
                              />
                            </div>
                          </div>
                          <Textarea
                            placeholder="Add a description to your item"
                            className="max-h-3 ml-15 w-65 overflow-y-visible resize-none whitespace-pre-wrap"
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
                    type="date"
                    value={row.shipDate}
                    onChange={(e) =>
                      updateItemRow(index, "shipDate", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.fixtureType}
                    onChange={(e) =>
                      updateItemRow(index, "fixtureType", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.freightCarrier}
                    onChange={(e) =>
                      updateItemRow(index, "freightCarrier", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.quantity}
                    onChange={(e) => {
                      const quantity = parseFloat(e.target.value) || 0;
                      updateItemRow(index, "quantity", quantity);
                      
                      // Calculate extended values
                      const updatedItems = [...formData.items];
                      updatedItems[index].extCost = (quantity * updatedItems[index].unitCost).toFixed(2);
                      updatedItems[index].extSell = (quantity * updatedItems[index].unitSell).toFixed(2);
                      updatedItems[index].profit = (updatedItems[index].extSell - updatedItems[index].extCost).toFixed(2);
                      
                      setFormData(prev => ({ ...prev, items: updatedItems }));
                    }}
                    type="number"
                    className="appearance-none [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none 
                     border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.unitCost}
                    onChange={(e) => {
                      const unitCost = parseFloat(e.target.value) || 0;
                      updateItemRow(index, "unitCost", unitCost);
                      
                      // Calculate extended values
                      const updatedItems = [...formData.items];
                      const quantity = parseFloat(updatedItems[index].quantity) || 1;
                      updatedItems[index].extCost = (quantity * unitCost).toFixed(2);
                      updatedItems[index].profit = (updatedItems[index].extSell - updatedItems[index].extCost).toFixed(2);
                      
                      // Calculate GM% if unitSell exists
                      if (updatedItems[index].unitSell > 0) {
                        updatedItems[index].gm = (((updatedItems[index].unitSell - unitCost) / updatedItems[index].unitSell) * 100).toFixed(2);
                      }
                      
                      setFormData(prev => ({ ...prev, items: updatedItems }));
                    }}
                    type="number"
                    className="appearance-none [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none 
                     border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.gm}
                    onChange={(e) => {
                      const gm = parseFloat(e.target.value) || 0;
                      updateItemRow(index, "gm", gm);
                      
                      // Calculate unitSell based on GM%
                      const updatedItems = [...formData.items];
                      const unitCost = parseFloat(updatedItems[index].unitCost) || 0;
                      
                      if (gm > 0) {
                        const unitSell = (unitCost / (1 - (gm / 100))).toFixed(2);
                        updatedItems[index].unitSell = unitSell;
                        const quantity = parseFloat(updatedItems[index].quantity) || 1;
                        updatedItems[index].extSell = (quantity * unitSell).toFixed(2);
                        updatedItems[index].profit = (updatedItems[index].extSell - updatedItems[index].extCost).toFixed(2);
                      }
                      
                      setFormData(prev => ({ ...prev, items: updatedItems }));
                    }}
                    type="number"
                    className="appearance-none [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none 
                     border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.unitSell}
                    onChange={(e) => {
                      const unitSell = parseFloat(e.target.value) || 0;
                      updateItemRow(index, "unitSell", unitSell);
                      
                      // Calculate extended values
                      const updatedItems = [...formData.items];
                      const quantity = parseFloat(updatedItems[index].quantity) || 1;
                      updatedItems[index].extSell = (quantity * unitSell).toFixed(2);
                      updatedItems[index].profit = (updatedItems[index].extSell - updatedItems[index].extCost).toFixed(2);
                      
                      // Calculate GM%
                      if (unitSell > 0) {
                        updatedItems[index].gm = (((unitSell - updatedItems[index].unitCost) / unitSell) * 100).toFixed(2);
                      }
                      
                      setFormData(prev => ({ ...prev, items: updatedItems }));
                    }}
                    type="number"
                    className="appearance-none [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none 
                     border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.extCost}
                    readOnly
                    type="number"
                    className="appearance-none [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none 
                     border rounded px-2 py-1 bg-gray-100"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.extSell}
                    readOnly
                    type="number"
                    className="appearance-none [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none 
                     border rounded px-2 py-1 bg-gray-100"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.profit}
                    readOnly
                    type="number"
                    className="appearance-none [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none 
                     border rounded px-2 py-1 bg-gray-100"
                  />
                </td>
              
                <td className="p-2 text-right font-semibold border">
                  {/* ${(row.quantity * row.rate).toFixed(2)} */}
                {row.extSell}
                </td>
                <td className="p-2">
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

        {showBox && (
          <div
            ref={dropdownRef}
            className="p-2 border bg-white rounded w-[50%] ml-14 mt-[-20px] light:bg-white"
          >
            {itemList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  const updatedItems = [...formData.items];
                  updatedItems[activeRow] = {
                    ...updatedItems[activeRow],
                    selectedItem: item,
                    name: item.name,
                    unitCost: item.rate,
                    rate: item.rate,
                    unitSell:"",
                    extCost: (updatedItems[activeRow].quantity * item.rate).toFixed(2),
                    // extSell: (updatedItems[activeRow].quantity * item.rate).toFixed(2),
                    extSell:"",
                    profit: "0.00",
                    gm: "0.00",
                    showInput: false,
                    inputValue: ""
                  };
                  setFormData(prev => ({ ...prev, items: updatedItems }));
                  setShowBox(false);
                }}
                className={`p-3 light:hover:bg-gray-100 cursor-pointer border-b text-sm ${
                  formData.items[activeRow]?.selectedItem?.id === item.id ? "bg-blue-100" : ""
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
        </div>
      </div>

      <div className="flex items-end">
        <div className="space-y-2 items-end mt-6 w-[60%]">
          <h1>Customer Notes</h1>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleInputChange}
            className="w-[90%]"
            placeholder="Add any message for the customer..."
          />
        </div>

<Card className="bg-[#f8f9fc] rounded-lg p-4 w-full max-w-1/2">
  <CardContent className="space-y-4">
    <div className="flex justify-between font-semibold text-gray-900">
      <span> Sub Total</span>
      <span>${totalExtSell.toFixed(2)}</span>
    </div>
    <div className="flex items-center justify-between gap-4">
      <span className="w-[40%] text-sm text-gray-700">
        Shipping Charges
      </span>
      <Input
        type="number"
        name="shippingCharges"
        className="bg-white w-[35%]"
        value={formData.shippingCharges}
        onChange={handleInputChange}
      />
      <span className="w-[25%] text-right">
        ${parseFloat(formData.shippingCharges).toFixed(2)}
      </span>
    </div>
    {/* Tax Field */}
    <div className="flex items-center justify-between gap-4">
      <span className="w-[40%] text-sm text-gray-700">Tax</span>

      <div className="w-[35%]">
  <Select
    value="6" // Always show 6% selected
    onValueChange={() => {}} // No-op (prevent changes)
    disabled // Make it non-interactive
  >
    <SelectTrigger className="bg-gray-100">
      <SelectValue placeholder="Florida Tax 6%" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="6">Florida Sales Tax 6%</SelectItem>
    </SelectContent>
  </Select>
</div>
      <span className="w-[25%] text-right">
        ${(
          totalExtSell * 
          (formData.taxRate ? parseFloat(formData.taxRate)/100 : 0)
        ).toFixed(2)}
      </span>
    </div>
    <div className="flex items-center justify-between gap-4">
      <span className="w-[40%] text-sm text-gray-700">Discount</span>
      <div className="flex items-center w-[35%]">
        <Input
          type="number"
          name="discountPercentage"
          className="bg-white w-full"
          value={formData.discountPercentage}
          onChange={handleInputChange}
        />
        <span className="ml-2 text-sm font-medium">%</span>
      </div>
      <span className="w-[25%] text-right">
        ${((totalExtSell * formData.discountPercentage) / 100).toFixed(2)}
      </span>
    </div>
    {/* <div className="flex items-center justify-between gap-4">
      <span className="w-[40%] text-sm border px-2 py-1 rounded bg-white">
        Surtax%: 0.50, Col
      </span>
      <Input
        type="number"
        name="surtax"
        className="bg-white w-[35%]"
        value={formData.surtax}
        onChange={handleInputChange}
      />
      <span className="w-[25%] text-right">
        ${parseFloat(formData.surtax).toFixed(2)}
      </span>
    </div> */}
    <div className="flex items-center justify-between gap-4">
  <span className="w-[40%] text-sm border px-2 py-1 rounded bg-white">
    {/* Surtax (0.5% of Subtotal + Tax) */}
    Surtax%: 0.5, County Name:Seminole
  </span>
  <Input
    type="number"
    name="surtax"
    className="bg-white w-[35%] bg-gray-100"
    value={formData.surtax}
    readOnly
  />
  <span className="w-[25%] text-right">
    ${parseFloat(formData.surtax || 0).toFixed(2)}
  </span>
</div>
    <hr />
    <div className="flex justify-between text-lg font-bold text-black pt-2">
      <span>Total ($)</span>
      <span>${total.toFixed(2)}</span>
    </div>
  </CardContent>
</Card>

      </div>

      <div className="flex bg-[#f8f9fc] flex-col md:flex-row justify-between mt-8 items-center gap-6 rounded-xl">
        <div className="flex-1">
          <h1 htmlFor="terms" className="mb-1 block font-medium">
            Terms & Conditions
          </h1>
          <Textarea
            id="termsAndConditions"
            name="termsAndConditions"
            placeholder="Enter the terms and conditions of your business..."
            className="min-h-[100px] bg-white"
            value={formData.termsAndConditions}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full md:w-[600px]">
          <h1 className="mb-1 block font-medium">
            Attach File(s) to Purchase Order
          </h1>
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
          <p className="text-sm text-muted-foreground mt-2">
            You can upload a maximum of 10 files, 10MB each
          </p>
        </div>
      </div>

      <div className="flex gap-3 border-t pt-4">
        {error && <p className="text-red-500">{error}</p>}
        <Button variant="outline" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save as Draft"}
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save and Send"}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default SalesForm;