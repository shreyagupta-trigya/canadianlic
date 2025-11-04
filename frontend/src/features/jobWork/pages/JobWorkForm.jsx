import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JobWorkForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobWorkNo: "",
    jobWorkDate: new Date(),
    dueDate: "",
    jobType: "",
    gst: "",
    remarks: "",
    attachments: [],
    items: [
      {
        batchNo: "",
        quantity: "",
        unit: "",
        status: "",
        rate: "",
        totalAmount: "",
      },
    ],
  });

  const jobTypes = ["Mixing", "Blending", "Filling", "Packing", "Labeling", "Other"];
  const units = ["kg", "L", "pcs", "g", "ml"];
  const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled"];
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, attachments: files }));
  };
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === "quantity" || field === "rate") {
      const qty = parseFloat(newItems[index].quantity) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      newItems[index].totalAmount = (qty * rate).toFixed(2);
    }

    setFormData((prev) => ({ ...prev, items: newItems }));
  };
  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          batchNo: "",
          quantity: "",
          unit: "",
          status: "",
          rate: "",
          totalAmount: "",
        },
      ],
    }));
  };

  const handleRemoveRow = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Work Data Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-lg border shadow-sm bg-white"
    >
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
          <h2 className="text-lg font-semibold">Job Work Form</h2>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Label className="mb-2">Job Work No.</Label>
          <Input
            placeholder="Job Work No."
            value={formData.jobWorkNo}
            onChange={(e) => handleChange("jobWorkNo", e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-2">Job Work Date</Label>
          <Input
            type="date"
            value={
              formData.jobWorkDate
                ? new Date(formData.jobWorkDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handleChange("jobWorkDate", e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-2">Due Date</Label>
          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-2">Job Type / Process Type</Label>
          <Select
            value={formData.jobType}
            onValueChange={(val) => handleChange("jobType", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
     <div className="border rounded-lg p-4">
        <h3 className="text-md font-semibold mb-3">Item Details</h3>
        <div className="border rounded-lg overflow-auto min-h-[70px] max-h-[400px]">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Batch No.</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Unit</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Rate (Per Unit)</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <Input
                      value={item.batchNo}
                      onChange={(e) =>
                        handleItemChange(index, "batchNo", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      value={item.unit}
                      onValueChange={(val) =>
                        handleItemChange(index, "unit", val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((u) => (
                          <SelectItem key={u} value={u}>
                            {u}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      value={item.status}
                      onValueChange={(val) =>
                        handleItemChange(index, "status", val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(index, "rate", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      value={item.totalAmount}
                      readOnly
                      className="bg-gray-100"
                    />
                  </td>
                 <td className="px-4 py-2 text-center">
  <Button
    type="button"
    size="sm"
    className=" bg-white  text-red-500 p-2 rounded"
    onClick={() => handleRemoveRow(index)}
  >
    <Trash2 className="h-4 w-4" />
  </Button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <Button type="button" variant="outline" onClick={handleAddRow}>
            + Add Item
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <Label className="mb-2">Attachments</Label>
          <Input type="file" multiple onChange={handleFileUpload} />
        </div>
        <div>
          <Label className="mb-2">Remarks / Notes</Label>
          <Textarea
            placeholder="Enter remarks (optional)"
            value={formData.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
