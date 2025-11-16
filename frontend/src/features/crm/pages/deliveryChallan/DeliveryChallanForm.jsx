import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormPageLayout from "@/layout/FormPageLayout";
import { FormCard } from "@/components/custom/CustomFormComponents";
import { FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconPlus, IconPaperclip } from "@tabler/icons-react";
import { Trash2 } from "lucide-react";
import { BsCurrencyExchange } from "react-icons/bs";

// Sample master items to choose from
const masterItems = [
  { id: "item-1", name: "Car", sku: "SKU-2", description: "" },
  { id: "item-2", name: "Engine", sku: "SKU-5", description: "" },
  { id: "item-3", name: "Wheel", sku: "SKU-7", description: "" },
  { id: "item-4", name: "Seat", sku: "SKU-9", description: "" },
  { id: "item-5", name: "Mirror", sku: "SKU-12", description: "" },
];

const lanes = ["LN-A", "LN-B", "LN-C", "LN-D"];
const shelves = ["SH-A-01", "SH-A-02", "SH-B-03", "SH-B-04"];
const bins = ["BN-01", "BN-02", "BN-03", "BN-04"];
const discountTypes = ["%", "₹"];

export default function DeliveryChallanForm() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("Acme Corp");
  const [location, setLocation] = useState("Location 1");
  const [dcNumber, setDcNumber] = useState("");
  const [reference, setReference] = useState("");
  const [dcDate, setDcDate] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [adjustment, setAdjustment] = useState(0);
  const [customerNotes, setCustomerNotes] = useState("");
  const [terms, setTerms] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [rows, setRows] = useState([
    {
      id: 1,
      itemId: "",
      sku: "",
      description: "",
      lane: "L1",
      shelf: "S1",
      bin: "B1",
      qty: 1,
      rate: 0,
      discountValue: 0,
      discountType: "%",
      amount: 0,
    },
  ]);

  const addRow = () => {
    setRows((r) => [
      ...r,
      {
        id: Date.now(),
        itemId: "",
        sku: "",
        description: "",
        lane: "L1",
        shelf: "S1",
        bin: "B1",
        qty: 1,
        rate: 0,
        discountValue: 0,
        discountType: "%",
        amount: 0,
      },
    ]);
  };
  const companies = [
    { id: 1, name: "Acme Corp", currency: "USD" },
    { id: 2, name: "Beta LLC", currency: "KD" },
    { id: 3, name: "Gamma Co", currency: "USD" },
    { id: 4, name: "Delta Traders", currency: "KD" },
    { id: 5, name: "Epsilon Ltd", currency: "KD" },
  ];
  const updateRow = (id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const onItemChange = (rowId, itemId) => {
    const item = masterItems.find((m) => m.id === itemId);
    if (!item) return;
    updateRow(rowId, {
      itemId: item.id,
      sku: item.sku,
      description: item.description,
    });
  };
  const [activeTab, setActiveTab] = useState("");

  // calculate amounts
  const computedRows = useMemo(() => {
    return rows.map((r) => {
      const base = (Number(r.qty) || 0) * (Number(r.rate) || 0);
      let discount = 0;
      if (r.discountType === "%")
        discount = (base * (Number(r.discountValue) || 0)) / 100;
      else discount = Number(r.discountValue) || 0;
      const amount = Math.max(0, base - discount);
      return { ...r, amount };
    });
  }, [rows]);

  const subtotal = computedRows.reduce((s, r) => s + r.amount, 0);
  // tax calculation
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const total = subtotal + cgst + sgst + (Number(adjustment) || 0);

  const formatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [selectedVendor, setSelectedVendor] = useState(null);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    // limit to 5 files and 10MB each
    const valid = files.filter((f) => f.size <= 10 * 1024 * 1024).slice(0, 5);
    setUploadedFiles(valid);
    if (valid.length < files.length) {
      // optional: inform user about trimmed/invalid files
       
      console.warn("Some files were ignored: limit 5 files, max 10MB each");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just log
    console.log({
      customer,
      location,
      dcNumber,
      reference,
      dcDate,
      rows: computedRows,
    });
    navigate(-1);
  };

  return (
    <FormPageLayout
      title="Delivery Tasks"
      onCancel={() => navigate(-1)}
      onSubmit={handleSubmit}
    >
   <FormCard>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div className="flex flex-col md:flex-row gap-2 md:items-center w-full">
      <FormField label="Customer Name" className="flex-1">
        <Select
          value={selectedVendor?.name || ""}
          onValueChange={(val) => {
            const vendor = companies.find((c) => c.name === val);
            setSelectedVendor(vendor);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      {selectedVendor && (
        <div className="border flex p-1 px-2 mt-2 md:mt-0 rounded-md bg-white items-center">
          <BsCurrencyExchange className="inline mr-2 text-green-500" />
          {selectedVendor.currency}
        </div>
      )}
    </div>

    <FormField label="Location">
      <Select value={location} onValueChange={(v) => setLocation(v)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {["Location 1", "Location 2", "Location 3"].map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>

    <FormField label="Delivery Tasks">
      <Input
        value={dcNumber}
        onChange={(e) => setDcNumber(e.target.value)}
      />
    </FormField>

    <FormField label="Reference">
      <Input
        value={reference}
        onChange={(e) => setReference(e.target.value)}
      />
    </FormField>

    <FormField label="Delivery Tasks Date">
      <Input
        type="date"
        value={dcDate}
        onChange={(e) => setDcDate(e.target.value)}
      />
    </FormField>
  </div>
</FormCard>

      <FormCard title="Item Table">
       <div className="overflow-auto border rounded min-h-[80px] max-h-[200px]">
          <Table className="table-auto border-collapse w-full min-w-auto md:min-w-[1400px] ">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="border w-auto  md:w-[300px]">Item Details</TableHead>
                <TableHead className="border w-auto md:w-[100px]">Lane</TableHead>
                <TableHead className="border w-auto md:w-[100px]">Shelf</TableHead>
                <TableHead className="border w-auto md:w-[100px]">Bin</TableHead>
                <TableHead className="border w-auto md:w-[120px]">Quantity</TableHead>
                <TableHead className="border w-auto md:w-[140px]">Rate</TableHead>
                <TableHead className="border w-auto md:w-[160px]">Discount</TableHead>
                <TableHead className="border w-auto md:w-[160px] text-right">
                  Amount
                </TableHead>
                <TableHead className="border w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {computedRows.map((r) => (
                <TableRow key={r.id} className="border">
                  {/* Item Details */}
                  <TableCell className="border align-top">
                    <div className="w-[280px]">
                      <Select
                        value={r.itemId}
                        onValueChange={(v) => onItemChange(r.id, v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Item" />
                        </SelectTrigger>
                        <SelectContent>
                          {masterItems.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* when item selected show SKU and a description textarea bound to the row */}
                      {r.itemId ? (
                        <div className="mt-2">
                          <div className="text-sm text-muted-foreground">
                            SKU: <span className="font-medium">{r.sku}</span>
                          </div>
                          <Textarea
                            value={r.description || ""}
                            onChange={(e) =>
                              updateRow(r.id, { description: e.target.value })
                            }
                            placeholder="Add item description"
                            className="mt-1 w-full"
                          />
                        </div>
                      ) : null}
                    </div>
                  </TableCell>

                  {/* Lane */}
                  <TableCell className="border">
                    <Select
                      value={r.lane}
                      onValueChange={(v) => updateRow(r.id, { lane: v })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lanes.map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Shelf */}
                  <TableCell className="border">
                    <Select
                      value={r.shelf}
                      onValueChange={(v) => updateRow(r.id, { shelf: v })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {shelves.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Bin */}
                  <TableCell className="border">
                    <Select
                      value={r.bin}
                      onValueChange={(v) => updateRow(r.id, { bin: v })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bins.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Qty */}
                  <TableCell className="border">
                    <Input
                      type="number"
                      value={r.qty}
                      onChange={(e) =>
                        updateRow(r.id, { qty: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </TableCell>

                  {/* Rate */}
                  <TableCell className="border">
                    <Input
                      type="number"
                      value={r.rate}
                      onChange={(e) =>
                        updateRow(r.id, { rate: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </TableCell>

                  {/* Discount */}
                  <TableCell className="border">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={r.discountValue}
                        onChange={(e) =>
                          updateRow(r.id, {
                            discountValue: Number(e.target.value),
                          })
                        }
                        className="w-20"
                      />
                      <Select
                        value={r.discountType}
                        onValueChange={(v) =>
                          updateRow(r.id, { discountType: v })
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {discountTypes.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="border text-right font-medium">
                    <div className="flex gap-4 justify-end">
                      {selectedVendor && <div>{selectedVendor.currency}</div>}

                      {r.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="border">
                    <Button variant="ghost" onClick={() => removeRow(r.id)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Button variant="outline" onClick={addRow}>
            <IconPlus /> Add New Row
          </Button>
        </div>
      </FormCard>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  <div className="border rounded-lg p-4 bg-white order-1 md:order-2">
    <div className="flex justify-between mb-2">
      <div>Sub Total</div>
      <div className="flex gap-3">
        {selectedVendor && <div>{selectedVendor.currency}</div>}
        <div>{formatter.format(subtotal)}</div>
      </div>
    </div>

    <div className="mt-4 border-t pt-3 flex justify-between items-center">
      <div className="font-semibold flex justify-center items-center whitespace-nowrap">
        Total (
        {selectedVendor && (
          <div className="text-sm">{selectedVendor.currency}</div>
        )}
        )
      </div>
      <div className="font-bold text-lg">{formatter.format(total)}</div>
    </div>
  </div>
  <div className="lg:col-span-2 order-2 md:order-1">
    <FormField className="font-semibold">Customer Notes</FormField>
    <Textarea
      value={customerNotes}
      onChange={(e) => setCustomerNotes(e.target.value)}
      placeholder="Enter any notes to be displayed in your transaction"
      className="w-full mt-2"
    />
  </div>
</div>


   <div className="mt-6 border-t pt-6">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div className="lg:col-span-2 order-2 md:order-1">
      <FormField className="font-semibold">Terms & Conditions</FormField>
      <Textarea
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
        className="w-full mt-2 h-28"
      />
    </div>

    <div className="order-1 md:order-2">
      <FormField className="font-semibold">
        Attach File(s) to Delivery Tasks
      </FormField>
      <div className="mt-2">
        <label className="inline-flex items-center gap-2 px-3 py-2 border rounded cursor-pointer">
          <IconPaperclip />
          <span>Upload File</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <div className="text-xs text-gray-500 mt-2">
          You can upload a maximum of 5 files, 10MB each
        </div>
        {uploadedFiles.length > 0 && (
          <ul className="mt-2 text-sm">
            {uploadedFiles.map((f, i) => (
              <li key={i}>
                {f.name} ({(f.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
</div>

    </FormPageLayout>
  );
}
