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
import { objectType, noList } from "../utils/picklist";

const DealBene = ({ formData, setFormData }) => {
  const [beneficiaries, setBeneficiaries] = useState(formData.beneficiaries || []);

  useEffect(() => {
    setFormData({ ...formData, beneficiaries });
  }, [beneficiaries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBeneficiaryChange = (index, field, value) => {
    const updatedBeneficiaries = [...beneficiaries];
    updatedBeneficiaries[index] = { ...updatedBeneficiaries[index], [field]: value };
    setBeneficiaries(updatedBeneficiaries);
  };

  const addRow = () => {
    setBeneficiaries([...beneficiaries, {
      beneficiaryName: "",
      beneficiaryRelationshipWithInsured: "",
      beneficiaryPhone: "",
      beneficiaryEmail: ""
    }]);
  };

  const deleteRow = (index) => {
    const updatedBeneficiaries = beneficiaries.filter((_, i) => i !== index);
    setBeneficiaries(updatedBeneficiaries);
  };

  return (
    <div className="deal-bene">
      <h5 className="main-heading mb-4 ps-2">Beneficiaries</h5>
      <div className="grid grid-cols-3 gap-4 ps-2 mb-3">
        <div className="mb-3">
          <Label className="my-0">Is Client a Beneficiary?</Label>
          <Select
            value={formData.isClientABeneficiary || ""}
            onValueChange={(value) => setFormData({ ...formData, isClientABeneficiary: value })}
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
          <Label className="my-0">Are there Multiple Beneficiaries excl. Client?</Label>
          <Select
            value={formData.areThereMultipleBeneficiariesExclClient || ""}
            onValueChange={(value) => setFormData({ ...formData, areThereMultipleBeneficiariesExclClient: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {noList.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Number of Beneficiaries</Label>
          <Input
            type="number"
            name="numberOfBeneficiariesUpto"
            value={formData.numberOfBeneficiariesUpto || ""}
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
              <TableHead>Beneficiary Name</TableHead>
              <TableHead>Beneficiary Relationship with Insured</TableHead>
              <TableHead>Beneficiary Phone</TableHead>
              <TableHead>Beneficiary Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="table-group-divider">
            {beneficiaries.map((beneficiary, index) => (
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
                    value={beneficiary.beneficiaryName || ""}
                    onChange={(e) => handleBeneficiaryChange(index, "beneficiaryName", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={beneficiary.beneficiaryRelationshipWithInsured || ""}
                    onChange={(e) => handleBeneficiaryChange(index, "beneficiaryRelationshipWithInsured", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="tel"
                    value={beneficiary.beneficiaryPhone || ""}
                    onChange={(e) => handleBeneficiaryChange(index, "beneficiaryPhone", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="email"
                    value={beneficiary.beneficiaryEmail || ""}
                    onChange={(e) => handleBeneficiaryChange(index, "beneficiaryEmail", e.target.value)}
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

export default DealBene;
