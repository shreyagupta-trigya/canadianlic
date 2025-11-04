import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { objectType } from "../utils/picklist";

const DealOwnership = ({ formData, setFormData }) => {
  const [dealOwnership, setDealOwnership] = useState(formData.dealOwnership || []);

  useEffect(() => {
    setFormData({ ...formData, dealOwnership });
  }, [dealOwnership]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOwnershipChange = (index, field, value) => {
    const updatedOwnership = [...dealOwnership];
    updatedOwnership[index] = { ...updatedOwnership[index], [field]: value };
    setDealOwnership(updatedOwnership);
  };

  const addRow = () => {
    setDealOwnership([...dealOwnership, { numberOfInsured: "", insuredName: "", insuredPhone: "", insuredEmail: "" }]);
  };

  const deleteRow = (index) => {
    const updatedOwnership = dealOwnership.filter((_, i) => i !== index);
    setDealOwnership(updatedOwnership);
  };

  return (
    <div className="deal-ownership">
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">Is Client the Insured?</Label>
          <Select
            value={formData.isClientTheInsured || ""}
            onValueChange={(value) => setFormData({ ...formData, isClientTheInsured: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {objectType.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Are there Multiple Insured for this Policy?</Label>
          <Select
            value={formData.areThereMultipleInsuredForThisPolicy || ""}
            onValueChange={(value) => setFormData({ ...formData, areThereMultipleInsuredForThisPolicy: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {objectType.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <h5 className="main-heading mb-4 ps-2">Deal Owner</h5>
      <div style={{ width: "100%", overflow: "scroll" }}>
        <Table className="border table-responsive subform">
          <TableHeader className="subform-table-head text-white">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Number of Insured</TableHead>
              <TableHead>Insured Name</TableHead>
              <TableHead>Insured Phone</TableHead>
              <TableHead>Insured Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="table-group-divider">
            {dealOwnership.map((ownership, index) => (
              <TableRow key={index}>
                <TableCell className="m-auto">{index + 1}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={() => deleteRow(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={ownership.numberOfInsured || ""}
                    onChange={(e) => handleOwnershipChange(index, "numberOfInsured", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={ownership.insuredName || ""}
                    onChange={(e) => handleOwnershipChange(index, "insuredName", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="tel"
                    value={ownership.insuredPhone || ""}
                    onChange={(e) => handleOwnershipChange(index, "insuredPhone", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="email"
                    value={ownership.insuredEmail || ""}
                    onChange={(e) => handleOwnershipChange(index, "insuredEmail", e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button type="button" onClick={addRow} className="mb-0 btn-color btn-md">
        Add Row
      </Button>
    </div>
  );
};

export default DealOwnership;
