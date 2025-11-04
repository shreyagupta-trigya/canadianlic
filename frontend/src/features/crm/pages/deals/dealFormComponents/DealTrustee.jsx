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

const DealTrustee = ({ formData, setFormData }) => {
  const [trustees, setTrustees] = useState(formData.trustees || []);

  useEffect(() => {
    setFormData({ ...formData, trustees });
  }, [trustees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTrusteeChange = (index, field, value) => {
    const updatedTrustees = [...trustees];
    updatedTrustees[index] = { ...updatedTrustees[index], [field]: value };
    setTrustees(updatedTrustees);
  };

  const addRow = () => {
    setTrustees([...trustees, {
      nameOfTrustees: "",
      nameOfBeneficiaryForTrustee: "",
      relationshipWithBeneficiaryForTrustee: "",
      trusteePhone: "",
      trusteeEmail: ""
    }]);
  };

  const deleteRow = (index) => {
    const updatedTrustees = trustees.filter((_, i) => i !== index);
    setTrustees(updatedTrustees);
  };

  return (
    <div className="deal-trustee">
      <h5 className="main-heading mb-4 ps-2">Trustee</h5>
      <div className="grid grid-cols-3 gap-4 ps-2 mb-3">
        <div className="mb-3">
          <Label className="my-0">Are there Trustees for this Policy?</Label>
          <Select
            value={formData.areThereTrusteesforThisPolicy || ""}
            onValueChange={(value) => setFormData({ ...formData, areThereTrusteesforThisPolicy: value })}
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
          <Label className="my-0">Trust Documents Received and Uploaded</Label>
          <Select
            value={formData.trustDocumentsReceivedAndUploaded || ""}
            onValueChange={(value) => setFormData({ ...formData, trustDocumentsReceivedAndUploaded: value })}
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
          <Label className="my-0">Trust Dissolution Date</Label>
          <Input
            type="date"
            name="trustDissolutionDate"
            value={formData.trustDissolutionDate || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Application On</Label>
          <Input
            type="date"
            name="applicationOn"
            value={formData.applicationOn || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Number of Trustees</Label>
          <Input
            type="number"
            name="numberOfTrustees"
            value={formData.numberOfTrustees || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
      <div style={{ width: "100%", overflow: "scroll" }}>
        <Table className="border table-responsive subform">
          <TableHeader className="subform-table-head text-white">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Name of Trustees</TableHead>
              <TableHead>Name of Beneficiary for Trustee</TableHead>
              <TableHead>Relationship with Beneficiary for Trustee</TableHead>
              <TableHead>Trustee Phone</TableHead>
              <TableHead>Trustee Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="table-group-divider">
            {trustees.map((trustee, index) => (
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
                    type="text"
                    value={trustee.nameOfTrustees || ""}
                    onChange={(e) => handleTrusteeChange(index, "nameOfTrustees", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={trustee.nameOfBeneficiaryForTrustee || ""}
                    onChange={(e) => handleTrusteeChange(index, "nameOfBeneficiaryForTrustee", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={trustee.relationshipWithBeneficiaryForTrustee || ""}
                    onChange={(e) => handleTrusteeChange(index, "relationshipWithBeneficiaryForTrustee", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="tel"
                    value={trustee.trusteePhone || ""}
                    onChange={(e) => handleTrusteeChange(index, "trusteePhone", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="email"
                    value={trustee.trusteeEmail || ""}
                    onChange={(e) => handleTrusteeChange(index, "trusteeEmail", e.target.value)}
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

export default DealTrustee;
