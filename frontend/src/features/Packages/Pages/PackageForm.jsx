import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createPackage } from "@/services/sales/PackageApi";
import { addPackageToList } from "@/redux/slices/sales/PackageSlice";

import {
  FormCard,
  FormField,
} from "@/components/custom/CustomFormComponents";
import FormPageLayout from "@/layout/FormPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

import { Customers, salesOrderItems } from "@/features/utils/ListViewMenu";

const PackageForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCancel = () => navigate(-1);

  const [selectedPO, setSelectedPO] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    salesOrder: "",
    packageSlip: "",
    packageDate: "",
    jobNumber: "",
    customerPo: "",
    jobName: "",
    internalNotes: "",
    items: [
    {
      itemAndDescription: "",
      ordered: 0,
      packed: 0,
      quantityToPack: 0,
    },
    ],
    notes: "",
  });

  const [items, setItems] = useState([
    {
      itemAndDescription: "",
      ordered: 0,
      packed: 0,
      quantityToPack: 0,
    },
  ]);

  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    if (selectedPO && salesOrderItems[selectedPO]) {
      setItems(salesOrderItems[selectedPO]);
    }
  }, [selectedPO]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        itemAndDescription: "",
        ordered: 0,
        packed: 0,
        quantityToPack: 0,
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

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const payload = {
      ...formData,
      customerName: formData.customerName, 
      salesOrder: formData.salesOrder,     
      items: items,   
    };

    const response = await dispatch(createPackage(payload)); 

    if (response?.payload?.success) {
      toast.success("Package created successfully");
      dispatch(addPackageToList()); 
      navigate("/packages");     
    } else {
      setError(response?.payload?.message || "Failed to create package");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <FormPageLayout
      title={"New Package"}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <FormCard className="bg-sidebar px-4 py-6">
        <div className="w-full">
          <FormField
            className="flex whitespace-nowrap w-full md:max-w-2xl items-center justify-center ml-2"
            label="Customer Name*"
          >
    <Select onValueChange={(value) => setFormData({ ...formData, customerName: value })}>
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

        <FormField
          className="flex whitespace-nowrap w-full md:max-w-2xl items-center justify-center ml-2 mt-4"
          label="Sales Order*"
        >
          <Select
            value={formData.salesOrder || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, salesOrder: value }))
            }
          >
            <SelectTrigger className="w-full ml-27 bg-white">
              <SelectValue placeholder="Select a Sales Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SO001">SO001</SelectItem>
              <SelectItem value="SO002">SO002</SelectItem>
              <SelectItem value="SO003">SO003</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        </div>
      </FormCard>

      <FormCard>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Package Slip*">
            <Input
              value={formData.packageSlip}
              onChange={(e) =>
                handleChange("packageSlip", e.target.value)
              }
            />
          </FormField>

          <FormField label="Date*">
            <Input
              type="date"
              value={formData.packageDate}
              onChange={(e) =>
                handleChange("packageDate", e.target.value)
              }
            />
          </FormField>
        </div>

        <div className="flex w-full my-5 justify-between">
          <FormField label="Job Number">
            <Input
              value={formData.jobNumber}
              onChange={(e) =>
                handleChange("jobNumber", e.target.value)
              }
            />
          </FormField>

          <FormField label="Customer PO">
            <Input
              value={formData.customerPo}
              onChange={(e) =>
                handleChange("customerPo", e.target.value)
              }
            />
          </FormField>
        </div>

        <div className="flex w-full my-5 justify-between">
          <FormField label="Job Name">
            <Input
              value={formData.jobName}
              onChange={(e) =>
                handleChange("jobName", e.target.value)
              }
            />
          </FormField>
        </div>

        <div className="space-y-4 my-10">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Item & Description</th>
                <th className="p-2">Ordered</th>
                <th className="p-2">Packed</th>
                <th className="p-2">Quantity to Pack</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 w-[260px] align-top">
                    <Input
                      value={row.itemAndDescription}
                      onChange={(e) =>
                        updateRow(index, "itemAndDescription", e.target.value)
                      }
                    />
                  </td>

                  <td className="p-2">
                    <Input
                      type="number"
                      value={row.ordered}
                      onChange={(e) =>
                        updateRow(index, "ordered", Number(e.target.value))
                      }
                    />
                  </td>

                  <td className="p-2">
                    <Input
                      type="number"
                      value={row.packed}
                      onChange={(e) =>
                        updateRow(index, "packed", Number(e.target.value))
                      }
                    />
                  </td>

                  <td className="p-2 w-20">
                    <Input
                      type="number"
                      value={row.quantityToPack}
                      onChange={(e) =>
                        updateRow(index, "quantityToPack", Number(e.target.value))
                      }
                    />
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

          <Button variant="outline" onClick={addRow}>
            + Add Item
          </Button>
        </div>

        <div className="flex flex-col max-w-xl">
          <h1 htmlFor="notes" className="mb-1 block font-medium">
            Internal Notes
          </h1>
          <Textarea
            id="notes"
            value={formData.internalNotes}
            onChange={(e) =>
              handleChange("internalNotes", e.target.value)
            }
            className=" bg-white"
          />
        </div>

        <div className="flex gap-3 border-t pt-4">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            type="submit"
          >
            Save
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </FormCard>
    </FormPageLayout>
  );
};

export default PackageForm;
