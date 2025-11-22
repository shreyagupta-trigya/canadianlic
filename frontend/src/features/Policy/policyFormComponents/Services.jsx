import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { relationOptionsSubform } from "@/utils/picklist";
import { Trash2 } from "lucide-react";

const Services = ({ formData, setFormData, onNext, onPrev, isDisabled }) => {
  const [ownerShip, setOwnerShip] = useState(formData.OwnerShip || []);
  const [beneficiary, setBeneficiary] = useState(formData.Beneficiary || []);
  const [contingentBeneficiary, setContingentBeneficiary] = useState(formData.ContingentBeneficiary || []);
  const [trustee, setTrustee] = useState(formData.Trustee || []);
  const [multipleBeneficiary, setMultipleBeneficiary] = useState(formData.areThereMultipleBeneficiary || "");
  const [multipleInsured, setMultipleInsured] = useState(formData.areThereMultipleInsured || "");
  const [showNumberOfInsured, setShowNumberOfInsured] = useState(multipleInsured === 'Yes');

  useEffect(() => {
    setMultipleInsured(formData.areThereMultipleInsured || "");
  }, [formData.areThereMultipleInsured]);

  useEffect(() => {
    setShowNumberOfInsured(multipleInsured === 'Yes');
  }, [multipleInsured]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMultipleInsuredChange = (value) => {
    console.log("Selected value for multiple insured:", value);
    setMultipleInsured(value);
    handleChange("areThereMultipleInsured", value);
    setShowNumberOfInsured(value === 'Yes');
    if (value !== 'Yes') {
      handleChange("numberOfInsured", 0);
      setOwnerShip([]);
    }
  };

  const handleMultipleBeneficiaryChange = (value) => {
    setMultipleBeneficiary(value);
    handleChange("areThereMultipleBeneficiary", value);
    if (value !== 'Yes') {
      handleChange("numberofBeneficiaries", 0);
      setBeneficiary([]);
    }
  };

  const handleTrusteeChange = (value) => {
    handleChange("areThereTrusteeForThisPolicy", value);
    if (value !== 'Yes') {
      handleChange("numberOfTrustee", 0);
      setTrustee([]);
    }
  };

  const updateInsuredRows = (targetCount) => {
    const currentCount = ownerShip.length;
    if (targetCount > currentCount) {
      const newRows = Array(targetCount - currentCount).fill().map(() => ({
        name: "",
        email: "",
        dob: "",
        phone: "",
        relationship: "",
      }));
      setOwnerShip([...ownerShip, ...newRows]);
    } else if (targetCount < currentCount) {
      setOwnerShip(ownerShip.slice(0, targetCount));
    }
  };

  const updateBeneficiaryRows = (targetCount) => {
    const currentCount = beneficiary.length;
    if (targetCount > currentCount) {
      const newRows = Array(targetCount - currentCount).fill().map(() => ({
        name: "",
        email: "",
        dob: "",
        phone: "",
        lifeBeneficiaryName: "",
        relationship: "",
        beneficiaryPercent: ""
      }));
      setBeneficiary([...beneficiary, ...newRows]);
    } else if (targetCount < currentCount) {
      setBeneficiary(beneficiary.slice(0, targetCount));
    }
  };

  const updateTrusteeRows = () => {
    const targetCount = parseInt(formData.numberOfTrustee) || 0;
    const currentCount = trustee.length;
    if (targetCount > currentCount) {
      const newRows = Array(targetCount - currentCount).fill().map(() => ({
        name: "",
        email: "",
        phone: "",
        relationship: "",
      }));
      setTrustee([...trustee, ...newRows]);
    } else if (targetCount < currentCount) {
      setTrustee(trustee.slice(0, targetCount));
    }
  };

  const addRowToInsuredClientTable = () => {
    setOwnerShip([...ownerShip, {
      name: "",
      email: "",
      dob: "",
      phone: "",
      relationship: "",
    }]);
    handleChange("numberOfInsured", ownerShip.length + 1);
  };

  const deleteInsuredClientTableRow = (index) => {
    const updated = ownerShip.filter((_, i) => i !== index);
    setOwnerShip(updated);
    handleChange("numberOfInsured", updated.length);
  };

  const addRowToPolicyBeneficiaryTable = () => {
    setBeneficiary([...beneficiary, {
      name: "",
      email: "",
      dob: "",
      phone: "",
      lifeBeneficiaryName: "",
      relationship: "",
      beneficiaryPercent: ""
    }]);
    handleChange("numberofBeneficiaries", beneficiary.length + 1);
  };

  const deletePolicyBeneficiaryTableRow = (index) => {
    const updated = beneficiary.filter((_, i) => i !== index);
    setBeneficiary(updated);
    handleChange("numberofBeneficiaries", updated.length);
  };

  const addRowToContingentBeneficiaryTable = () => {
    setContingentBeneficiary([...contingentBeneficiary, {
      name: "",
      email: "",
      dob: "",
      phone: "",
      beneficiaryPercent: "",
      relationship: ""
    }]);
  };

  const deleteContingentBeneficiaryTableRow = (index) => {
    const updated = contingentBeneficiary.filter((_, i) => i !== index);
    setContingentBeneficiary(updated);
  };

  const addRowToPolicyTrusteeTable = () => {
    setTrustee([...trustee, {
      name: "",
      email: "",
      phone: "",
      relationship: "",
    }]);
    handleChange("numberOfTrustee", trustee.length + 1);
  };

  const deletePolicyTrusteeTableRow = (index) => {
    const updated = trustee.filter((_, i) => i !== index);
    setTrustee(updated);
    handleChange("numberOfTrustee", updated.length);
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      OwnerShip: ownerShip,
      Beneficiary: beneficiary,
      ContingentBeneficiary: contingentBeneficiary,
      Trustee: trustee
    });
    onNext();
  };

  // Mock options
  const clientFirstPolicyOptions = ["Yes", "No", "-None-"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Policy Ownership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Is Client the Insured?</Label>
              <Select value={formData.isClientTheInsured} onValueChange={(value) => handleChange("isClientTheInsured", value)} disabled={isDisabled}>
                <SelectTrigger className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option} disabled={isDisabled}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">Are there multiple Insured for this Policy?</Label>

              <Select value={multipleInsured} onValueChange={handleMultipleInsuredChange} disabled={isDisabled}>
                <SelectTrigger className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`} disabled={isDisabled}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clientFirstPolicyOptions.map((option) => (
                    <SelectItem key={option} value={option} disabled={isDisabled}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
               {showNumberOfInsured ? (
            <div>
              <Label className="mb-2">Number of Insured</Label>
              <Input
                type="number"
                value={formData.numberOfInsured || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  handleChange("numberOfInsured", value);
                  updateInsuredRows(value);
                }}
                min="0"
              />
            </div>
          ) : null}
          </div>
       

          {ownerShip.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Insured Name</TableHead>
                    <TableHead>Insured Date Of Birth</TableHead>
                    <TableHead>Insured Email</TableHead>
                    <TableHead>Insured Phone</TableHead>
                    <TableHead>Relationship of Insured with client</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ownerShip.map((insured, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteInsuredClientTableRow(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={insured.name}
                          onChange={(e) => {
                            const updated = [...ownerShip];
                            updated[index].name = e.target.value;
                            setOwnerShip(updated);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              {insured.dob ? format(new Date(insured.dob), "dd/MM/yyyy") : "DD/MM/YYYY"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={insured.dob ? new Date(insured.dob) : undefined}
                              onSelect={(date) => {
                                const updated = [...ownerShip];
                                updated[index].dob = date;
                                setOwnerShip(updated);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="email"
                          value={insured.email}
                          onChange={(e) => {
                            const updated = [...ownerShip];
                            updated[index].email = e.target.value;
                            setOwnerShip(updated);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={insured.phone}
                          onChange={(e) => {
                            const updated = [...ownerShip];
                            updated[index].phone = e.target.value;
                            setOwnerShip(updated);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={insured.relationship}
                          onValueChange={(value) => {
                            const updated = [...ownerShip];
                            updated[index].relationship = value;
                            setOwnerShip(updated);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {relationOptionsSubform.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={addRowToInsuredClientTable} className="mt-4">
                Add Row
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Policy Beneficiaries Card */}
     <Card> 
  <CardHeader>
    <CardTitle>Policy Beneficiaries</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="mb-2">Is Client A Beneficiary</Label>
        <Select
          value={formData.isClientABeneficiary}
          onValueChange={(value) => handleChange("isClientABeneficiary", value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        >
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

      {formData.isClientABeneficiary !== 'No' && (
        <div>
          <Label className="mb-2">Are there Multiple Beneficiaries excl. Client?</Label>
          <Select
            value={multipleBeneficiary}
            onValueChange={handleMultipleBeneficiaryChange}
            disabled={isDisabled}
            className={!isDisabled ? "border-2 border-gray-300" : ""}
          >
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
      )}

      {(formData.isClientABeneficiary === 'No' || multipleBeneficiary === 'Yes') && (
        <div>
          <Label className="mb-2">Number of Beneficiaries</Label>
          <Input
            type="number"
            value={formData.numberofBeneficiaries || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              handleChange("numberofBeneficiaries", value);
              updateBeneficiaryRows(value);
            }}
            min="0"
            disabled={isDisabled}
            className={!isDisabled ? "border-2 border-gray-300" : ""}
          />
        </div>
      )}

      {formData.layout === 'Life Policies' && (
        <div>
          <Label className="mb-2">Policy Attachment Link</Label>
          <Input
            type="url"
            value={formData.policyAttachmentLink || ""}
            onChange={(e) => handleChange("policyAttachmentLink", e.target.value)}
            disabled={isDisabled}
            className={!isDisabled ? "border-2 border-gray-300" : ""}
          />
        </div>
      )}
    </div>

    {beneficiary.length > 0 && (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Life Beneficiary Name</TableHead>
              <TableHead>Date Of Birth</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Relationship</TableHead>
              {formData.layout === 'Life Policies' && <TableHead>Beneficiary %</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {beneficiary.map((ben, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletePolicyBeneficiaryTableRow(index)}
                    disabled={isDisabled}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Input
                    value={ben.name}
                    onChange={(e) => {
                      const updated = [...beneficiary];
                      updated[index].name = e.target.value;
                      setBeneficiary(updated);
                    }}
                    disabled={isDisabled}
                    className={!isDisabled ? "border-2 border-gray-300" : ""}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={ben.lifeBeneficiaryName}
                    onChange={(e) => {
                      const updated = [...beneficiary];
                      updated[index].lifeBeneficiaryName = e.target.value;
                      setBeneficiary(updated);
                    }}
                    disabled={isDisabled}
                    className={!isDisabled ? "border-2 border-gray-300" : ""}
                  />
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        disabled={isDisabled}
                      >
                        {ben.dob ? format(new Date(ben.dob), "dd/MM/yyyy") : "DD/MM/YYYY"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={ben.dob ? new Date(ben.dob) : undefined}
                        onSelect={(date) => {
                          const updated = [...beneficiary];
                          updated[index].dob = date;
                          setBeneficiary(updated);
                        }}
                        initialFocus
                        disabled={isDisabled}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Input
                    type="email"
                    value={ben.email}
                    onChange={(e) => {
                      const updated = [...beneficiary];
                      updated[index].email = e.target.value;
                      setBeneficiary(updated);
                    }}
                    disabled={isDisabled}
                    className={!isDisabled ? "border-2 border-gray-300" : ""}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={ben.phone}
                    onChange={(e) => {
                      const updated = [...beneficiary];
                      updated[index].phone = e.target.value;
                      setBeneficiary(updated);
                    }}
                    disabled={isDisabled}
                    className={!isDisabled ? "border-2 border-gray-300" : ""}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={ben.relationship}
                    onValueChange={(value) => {
                      const updated = [...beneficiary];
                      updated[index].relationship = value;
                      setBeneficiary(updated);
                    }}
                    disabled={isDisabled}
                    className={!isDisabled ? "border-2 border-gray-300" : ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-NONE-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-NONE-">-NONE-</SelectItem>
                      {relationOptionsSubform.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                {formData.layout === 'Life Policies' && (
                  <TableCell>
                    <Input
                      value={ben.beneficiaryPercent}
                      onChange={(e) => {
                        const updated = [...beneficiary];
                        updated[index].beneficiaryPercent = e.target.value;
                        setBeneficiary(updated);
                      }}
                      disabled={isDisabled}
                      className={!isDisabled ? "border-2 border-gray-300" : ""}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={addRowToPolicyBeneficiaryTable} className="mt-4" disabled={isDisabled}>
          Add Row
        </Button>
      </div>
    )}
  </CardContent>
</Card>


      {/* Contingent Beneficiary Card */}
      <Card>
  <CardHeader>
    <CardTitle>Contingent Beneficiary</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date Of Birth</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Cont-Beneficiary %</TableHead>
            <TableHead>Relationship</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contingentBeneficiary.map((contBen, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteContingentBeneficiaryTableRow(index)}
                  disabled={isDisabled}
                  className={!isDisabled ? "" : "opacity-50 cursor-not-allowed"}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>
                <Input
                  value={contBen.name}
                  onChange={(e) => {
                    const updated = [...contingentBeneficiary];
                    updated[index].name = e.target.value;
                    setContingentBeneficiary(updated);
                  }}
                  disabled={isDisabled}
                  className={!isDisabled ? "border-2 border-gray-600" : ""}
                />
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-600" : ""}`}
                      disabled={isDisabled}
                    >
                      {contBen.dob ? format(new Date(contBen.dob), "dd/MM/yyyy") : "DD/MM/YYYY"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={contBen.dob ? new Date(contBen.dob) : undefined}
                      onSelect={(date) => {
                        const updated = [...contingentBeneficiary];
                        updated[index].dob = date;
                        setContingentBeneficiary(updated);
                      }}
                      initialFocus
                      disabled={isDisabled}
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Input
                  type="email"
                  value={contBen.email}
                  onChange={(e) => {
                    const updated = [...contingentBeneficiary];
                    updated[index].email = e.target.value;
                    setContingentBeneficiary(updated);
                  }}
                  disabled={isDisabled}
                  className={!isDisabled ? "border-2 border-gray-600" : ""}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={contBen.phone}
                  onChange={(e) => {
                    const updated = [...contingentBeneficiary];
                    updated[index].phone = e.target.value;
                    setContingentBeneficiary(updated);
                  }}
                  disabled={isDisabled}
                  className={!isDisabled ? "border-2 border-gray-600" : ""}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={contBen.beneficiaryPercent}
                  onChange={(e) => {
                    const updated = [...contingentBeneficiary];
                    updated[index].beneficiaryPercent = e.target.value;
                    setContingentBeneficiary(updated);
                  }}
                  disabled={isDisabled}
                  className={!isDisabled ? "border-2 border-gray-600" : ""}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={contBen.relationship}
                  onValueChange={(value) => {
                    const updated = [...contingentBeneficiary];
                    updated[index].relationship = value;
                    setContingentBeneficiary(updated);
                  }}
                  disabled={isDisabled}
                  className={!isDisabled ? "border-2 border-gray-600" : ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-NONE-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-NONE-">-NONE-</SelectItem>
                    {relationOptionsSubform.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={addRowToContingentBeneficiaryTable}
        className="mt-4"
        disabled={isDisabled}
      >
        Add Row
      </Button>
    </div>
  </CardContent>
</Card>


      {/* Policy Trustees Card */}
     <Card>
  <CardHeader>
    <CardTitle>Policy Trustees</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="mb-2">Are there Trustees for this Policy?</Label>
        <Select
          value={formData.areThereTrusteeForThisPolicy}
          onValueChange={handleTrusteeChange}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-600" : ""}
        >
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
      <div>
        <Label className="mb-2">Application On</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-600" : ""}`}
              disabled={isDisabled}
            >
              {formData.dateOfBirth
                ? format(new Date(formData.dateOfBirth), "dd/MM/yyyy")
                : "DD/MM/YYYY"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
              onSelect={(date) => handleChange("dateOfBirth", date)}
              initialFocus
              disabled={isDisabled}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>

    {formData.areThereTrusteeForThisPolicy === "Yes" && (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="mb-2">Trust Dissolution Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-600" : ""}`}
                  disabled={isDisabled}
                >
                  {formData.trustDissolutionDate
                    ? format(new Date(formData.trustDissolutionDate), "dd/MM/yyyy")
                    : "DD/MM/YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.trustDissolutionDate ? new Date(formData.trustDissolutionDate) : undefined}
                  onSelect={(date) => handleChange("trustDissolutionDate", date)}
                  initialFocus
                  disabled={isDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="mb-2">Trust Documents Received and Uploaded?</Label>
            <Select
              value={formData.trustDocumentRecievedAndUploaded}
              onValueChange={(value) => handleChange("trustDocumentRecievedAndUploaded", value)}
              disabled={isDisabled}
              className={!isDisabled ? "border-2 border-gray-600" : ""}
            >
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

          <div>
            <Label className="mb-2">Number Of Trustee</Label>
            <Input
              type="number"
              value={formData.numberOfTrustee || ""}
              onChange={(e) => {
                handleChange("numberOfTrustee", e.target.value);
                updateTrusteeRows();
              }}
              min="0"
              disabled={isDisabled}
              className={!isDisabled ? "border-2 border-gray-600" : ""}
            />
          </div>
        </div>

        {trustee.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Relationship</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trustee.map((trust, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePolicyTrusteeTableRow(index)}
                        disabled={isDisabled}
                        className={!isDisabled ? "" : "opacity-50 cursor-not-allowed"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={trust.name}
                        onChange={(e) => {
                          const updated = [...trustee];
                          updated[index].name = e.target.value;
                          setTrustee(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-600" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={trust.phone}
                        onChange={(e) => {
                          const updated = [...trustee];
                          updated[index].phone = e.target.value;
                          setTrustee(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-600" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={trust.email}
                        onChange={(e) => {
                          const updated = [...trustee];
                          updated[index].email = e.target.value;
                          setTrustee(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-600" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={trust.relationship}
                        onValueChange={(value) => {
                          const updated = [...trustee];
                          updated[index].relationship = value;
                          setTrustee(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-600" : ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-NONE-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="-NONE-">-NONE-</SelectItem>
                          {relationOptionsSubform.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              onClick={addRowToPolicyTrusteeTable}
              className="mt-4"
              disabled={isDisabled}
            >
              Add Row
            </Button>
          </div>
        )}
      </>
    )}
  </CardContent>
</Card>


      {/* <div className="flex justify-between">
        <Button onClick={onPrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div> */}
    </div>
  );
};

export default Services;
