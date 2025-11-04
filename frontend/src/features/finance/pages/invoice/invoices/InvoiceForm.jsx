import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { createInvoice } from "@/services/invoices/invoiceApi";
import { addInvoiceToList } from "@/redux/slices/invoices/invoiceSlice";
import { Upload, ImageIcon, MoreVertical, X, Trash2 } from "lucide-react";
import FormPageLayout from "@/layout/FormPageLayout";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { itemList, Customers, paymentTerms } from "@/features/utils/ListViewMenu";
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

const InvoiceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    customer: "",
    invoice: "",
    invoiceDate: "",
    reference: "",
    orderNumber: "",
    dueDate: "",
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
    Calculatesurtax: 0,
    items: [
      {
        itemId: "",
        name: "",
        cost: 0,
        shipDate: "",
        fixtureType: "",
        freightCarrier: "",
        quantity: 1,
        rate: 0,
        tax: 0,
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Effect to calculate subtotal and total whenever items, shipping, discount, or surtax changes
  useEffect(() => {
    const newSubtotal = formData.items.reduce(
      (acc, item) => acc + (item.quantity * item.rate),
      0
    );
    setSubtotal(newSubtotal);

    const discountAmount = (newSubtotal * formData.discountPercentage) / 100;
    const newTotal =
      newSubtotal +
      parseFloat(formData.shippingCharges) +
      parseFloat(formData.surtax) -
      discountAmount;
    setTotal(newTotal);
  }, [formData.items, formData.shippingCharges, formData.discountPercentage, formData.surtax]);

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

  const handleItemSelect = (itemIndex, itemId) => {
    const itemDetails = itemList.find((item) => item.id === itemId);
    const updatedItems = [...formData.items];
    if (itemDetails) {
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        itemId: itemDetails.id,
        name: itemDetails.name,
        rate: itemDetails.rate,
        cost: itemDetails.cost,
      };
      setFormData((prevData) => ({ ...prevData, items: updatedItems }));
    }
  };

  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          itemId: "",
          name: "",
          cost: 0,
          shipDate: "",
          fixtureType: "",
          freightCarrier: "",
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
    updatedItems[index][field] = field === "quantity" || field === "rate" || field === "cost" ? parseFloat(value) || 0 : value;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const invoicePayload = {
      ...formData,
      customer: formData.customer?.id, // Send only the customer ID
      salesperson: formData.salesperson?.id, // Send only the salesperson ID
      subtotal,
      total,
      items: JSON.stringify(formData.items),
      // You can add logic for attachments here if needed
    };
    
    try {
      const newInvoice = await createInvoice(invoicePayload);
      dispatch(addInvoiceToList(newInvoice));
      toast.success('Invoice Created Successfully');
      navigate("/finance/invoice/invoices"); 
    } catch (err) {
      console.error("Failed to create invoice:", err);
      setError("Failed to create invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <FormPageLayout
      title={"New Invoice"}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isSubmitting={loading}
    >
      <FormCard className="bg-sidebar px-4 py-6">
        <div className="w-full">
          <FormField label="Customer Name*" isRequired={true}>
            <Select onValueChange={handleCustomerSelect} value={formData.customer?.id || ""}>
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
                <h3 className="font-semibold text-gray-800 mb-2">Billing Address</h3>
                <p className="text-gray-700">{formData.customer.label}</p>
                <p className="text-gray-700">{formData.customer.email || "N/A"}</p>
                <p className="text-gray-700">{formData.customer.billingAddress || "N/A"}</p>
              </div>
              <div className="p-4 w-full md:w-[25%]">
                <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                <p className="text-gray-700">{formData.customer.label}</p>
                <p className="text-gray-700">{formData.customer.email || "N/A"}</p>
                <p className="text-gray-700">{formData.customer.shippingAddress || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      </FormCard>

      <FormCard>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Invoice#" isRequired={true}>
            <Input
              name="invoice"
              value={formData.invoice}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
          
          <FormField label="Order Number#" isRequired={true}>
            <Input
              name="order number"
              value={formData.orderNumber}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Invoice Date*" isRequired={true}>
            <Input
              name="invoiceDate"
              type="date"
              value={formData.invoiceDate}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label="Due Date*" isRequired={true}>
            <Input
              name="dueDate"
              type="date"
              value={formData.dueDate}
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
          <FormField label="Job Name*" isRequired={true}>
            <Input
              name="jobName"
              value={formData.jobName}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
          <FormField label="Job Number">
            <Input
              name="jobNumber"
              value={formData.jobNumber}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Tracking#" isRequired={true}>
             <Input
              name="Tracking"
              value={formData.Tracking}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
          <FormField label="Carrier Name" isRequired={true}>
             <Input
              name="Carrier Name"
              value={formData.carrierName}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Customer PO*" isRequired={true}>
            <Input
              name="customerPO"
              value={formData.customerPO}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
          <FormField label="Calculate Surtax" isRequired={true}>
            <Input
              name="calculate surtax"
              value={formData.surtax}
              onChange={handleInputChange}
              placeholder=""
            />
          </FormField>
        </div>
      </FormCard>

      <div className="space-y-4 my-10 ml-2">
        <div className="flex justify-between p-3 items-center mb-2">
          <h3 className="font-semibold text-lg">Item Table</h3>
          <Button variant="outline" size="sm" onClick={addRow}>
            ➕ Add New Row
          </Button>
        </div>
        <table className="w-full text-sm border border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-start">ITEM DETAILS</th>
              <th className="p-2 border text-center w-30">COST</th>
              <th className="p-2">SHIP DATE</th>
              <th className="p-2 border">FIXTURE TYPE</th>
              <th className="p-2 border text-center">FREIGHT CARRIER</th>
              <th className="p-2 border w-20">QUANTITY</th>
              <th className="p-2 border w-20">SELL</th>
              <th className="p-2 border text-center">TAX</th>
              <th className="p-2 text-right">AMOUNT</th>
              <th className="p-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((row, index) => (
              <tr key={index}>
                <td className="pl-3 pr-2 py-2 border">
                  <Select
                    onValueChange={(val) => handleItemSelect(index, val)}
                    value={row.itemId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Item" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemList.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {row.name && (
                    <div className="mt-2 text-xs text-gray-500">
                      <p>SKU: {itemList.find(item => item.id === row.itemId)?.sku}</p>
                      <p>Rate: ${row.rate}</p>
                    </div>
                  )}
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    value={row.cost}
                    onChange={(e) => updateItemRow(index, "cost", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="date"
                    value={row.shipDate}
                    onChange={(e) => updateItemRow(index, "shipDate", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.fixtureType}
                    onChange={(e) => updateItemRow(index, "fixtureType", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    value={row.freightCarrier}
                    onChange={(e) => updateItemRow(index, "freightCarrier", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    value={row.quantity}
                    onChange={(e) => updateItemRow(index, "quantity", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    value={row.rate}
                    onChange={(e) => updateItemRow(index, "rate", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <Select
                    onValueChange={(val) => updateItemRow(index, "tax", val)}
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
                <td className="p-2">
                  <Button variant="ghost" size="icon" onClick={() => removeRow(index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              <span>Sub Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="w-[40%] text-sm text-gray-700">Shipping Charges</span>
              <Input
                type="number"
                name="shippingCharges"
                className="bg-white w-[35%]"
                value={formData.shippingCharges}
                onChange={handleInputChange}
              />
              <span className="w-[25%] text-right">${parseFloat(formData.shippingCharges).toFixed(2)}</span>
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
              <span className="w-[25%] text-right">${((subtotal * formData.discountPercentage) / 100).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="w-[40%] text-sm border px-2 py-1 rounded bg-white">Surtax%: 0.50, Col</span>
              <Input
                type="number"
                name="surtax"
                className="bg-white w-[35%]"
                value={formData.surtax}
                onChange={handleInputChange}
              />
              <span className="w-[25%] text-right">${parseFloat(formData.surtax).toFixed(2)}</span>
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
          <h1 htmlFor="terms" className="mb-1 block font-medium">Terms & Conditions</h1>
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
          <h1 className="mb-1 block font-medium">Attach File(s) to Invoice</h1>
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

export default InvoiceForm;