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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { claims, objectType, approval } from "../utils/picklist";

const Claims = ({ formData, setFormData }) => {
  const [claimsData, setClaimsData] = useState(formData.claims || []);

  useEffect(() => {
    setFormData({ ...formData, claims: claimsData });
  }, [claimsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClaimChange = (index, field, value) => {
    const updatedClaims = [...claimsData];
    updatedClaims[index] = { ...updatedClaims[index], [field]: value };
    setClaimsData(updatedClaims);
  };

  const addRow = () => {
    setClaimsData([...claimsData, {
      reasonOfClaim: "",
      claimOutcome: "",
      claimSubmitted: "",
      claimAmount: "",
      dateOfClaim: "",
      claimClosedOn: "",
      amountSettled: "",
      settlementOrRejectionObservations: ""
    }]);
  };

  const deleteRow = (index) => {
    const updatedClaims = claimsData.filter((_, i) => i !== index);
    setClaimsData(updatedClaims);
  };

  return (
    <div className="claims">
      <h5 className="main-heading mb-4 ps-2">Claims</h5>
      <div className="grid grid-cols-3 gap-4 ps-2 mb-3">
        <div className="mb-3">
          <Label className="my-0">Current Claims</Label>
          <Select
            value={formData.currentClaims || ""}
            onValueChange={(value) => setFormData({ ...formData, currentClaims: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {claims.map((claim) => (
                <SelectItem key={claim} value={claim}>
                  {claim}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Past Claims</Label>
          <Select
            value={formData.pastClaims || ""}
            onValueChange={(value) => setFormData({ ...formData, pastClaims: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {claims.map((claim) => (
                <SelectItem key={claim} value={claim}>
                  {claim}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div style={{ width: "100%", overflow: "scroll" }}>
        <Table className="border table-responsive subform">
          <TableHeader className="subform-table-head text-white">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Reason of Claim</TableHead>
              <TableHead>Claim Outcome</TableHead>
              <TableHead>Claim Submitted</TableHead>
              <TableHead>Claim Amount</TableHead>
              <TableHead>Date of Claim</TableHead>
              <TableHead>Claim Closed On</TableHead>
              <TableHead>Amount Settled</TableHead>
              <TableHead>Settlement or Rejection Observations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="table-group-divider">
            {claimsData.map((claim, index) => (
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
                    value={claim.reasonOfClaim || ""}
                    onChange={(e) => handleClaimChange(index, "reasonOfClaim", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={claim.claimOutcome || ""}
                    onValueChange={(value) => handleClaimChange(index, "claimOutcome", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {approval.map((app) => (
                        <SelectItem key={app} value={app}>
                          {app}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={claim.claimSubmitted || ""}
                    onValueChange={(value) => handleClaimChange(index, "claimSubmitted", value)}
                  >
                    <SelectTrigger>
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
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={claim.claimAmount || ""}
                    onChange={(e) => handleClaimChange(index, "claimAmount", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={claim.dateOfClaim || ""}
                    onChange={(e) => handleClaimChange(index, "dateOfClaim", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={claim.claimClosedOn || ""}
                    onChange={(e) => handleClaimChange(index, "claimClosedOn", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={claim.amountSettled || ""}
                    onChange={(e) => handleClaimChange(index, "amountSettled", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={claim.settlementOrRejectionObservations || ""}
                    onChange={(e) => handleClaimChange(index, "settlementOrRejectionObservations", e.target.value)}
                    rows="2"
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

export default Claims;
