import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  clientFirstPolicyOptions,
} from "@/utils/picklist";

const Beneficiary = ({ formData, setFormData, onNext, onPrev }) => {
  const [beneficiaries, setBeneficiaries] = useState(formData.Beneficiary || []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    setFormData({ ...formData, Beneficiary: beneficiaries });
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const addRow = () => {
    setBeneficiaries([...beneficiaries, {
      name: '',
      relationship: '',
      phone: '',
      email: '',
    }]);
  };

  const deleteRow = (index) => {
    const newBeneficiaries = beneficiaries.filter((_, i) => i !== index);
    setBeneficiaries(newBeneficiaries);
  };

  const updateBeneficiary = (index, field, value) => {
    const newBeneficiaries = [...beneficiaries];
    newBeneficiaries[index][field] = value;
    setBeneficiaries(newBeneficiaries);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deal Beneficiaries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Is Client a Beneficiary?</Label>
              <Select value={formData.isClientABeneficiary} onValueChange={(value) => handleChange("isClientABeneficiary", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Are there Multiple Beneficiaries?</Label>
              <Select value={formData.arethereMultipleBeneficiaries} onValueChange={(value) => handleChange("arethereMultipleBeneficiaries", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Beneficiary Gender</Label>
              <Select value={formData.beneficiaryGender} onValueChange={(value) => handleChange("beneficiaryGender", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.layout === 'RRSP' && (
              <div className="lg:col-span-4 sm:col-span-6">
                <Label className="mb-2">Beneficiary Type</Label>
                <Select value={formData.beneficiaryType} onValueChange={(value) => handleChange("beneficiaryType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Beneficiary Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Revocable">Revocable</SelectItem>
                    <SelectItem value="Irrevocable">Irrevocable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Number of Beneficiaries</Label>
              <Input
                value={formData.numberofBeneficiaries || ""}
                onChange={(e) => handleChange("numberofBeneficiaries", e.target.value)}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6">
              <Label className="mb-2">Relation to Primary Annuitant</Label>
              <Input
                value={formData.relationtoPrimaryAnnuitant || ""}
                onChange={(e) => handleChange("relationtoPrimaryAnnuitant", e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Beneficiary Name</TableHead>
                  <TableHead>Relationship to Primary Beneficiary</TableHead>
                  <TableHead>Beneficiary Phone</TableHead>
                  <TableHead>Beneficiary Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beneficiaries.map((beneficiary, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteRow(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={beneficiary.name || ""}
                        onChange={(e) => updateBeneficiary(index, 'name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={beneficiary.relationship || ""}
                        onChange={(e) => updateBeneficiary(index, 'relationship', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="border rounded-lg p-1.5">
                        <PhoneInput
                          value={beneficiary.phone || ""}
                          onChange={(value) => updateBeneficiary(index, 'phone', value)}
                          defaultCountry="CA"
                          international={true}
                          withCountryCallingCode={true}
                          placeholder="+1 (XXX) XXX-XXXX"
                          maxLength={16}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={beneficiary.email || ""}
                        onChange={(e) => updateBeneficiary(index, 'email', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button onClick={addRow} className="mt-4">
            Add Row
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={handlePrev} variant="outline" className="px-6 py-2">
          Prev
        </Button>
        <Button onClick={handleNext} className="px-6 py-2">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Beneficiary;
