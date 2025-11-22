import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

const Claims = ({ formData, setFormData, onNext, onPrev, isDisabled }) => {
  const [pastClaims, setPastClaims] = useState(formData.pastClaims || []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addRowToClaimTable = () => {
    setPastClaims([
      ...pastClaims,
      {
        dateOfClaim: "",
        reasonforClaim: "",
        amountofClaim: "",
        claimClosedOn: "",
        claimAmountSettled: "",
        claimAmountRejected: "",
        settlement: "",
      },
    ]);
  };

  const deleteClaimRow = (index) => {
    setPastClaims(pastClaims.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setFormData({ ...formData, pastClaims });
    onNext();
  };

  const clientFirstPolicyOptions = ["-None-", "Yes", "No"];
  const claimOutcomeOption = ["-None-", "Rejected", "Pending"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Claim</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* ------- Select 1 ------- */}
            <div>
              <Label className="mb-2">Any Current Claims on this Policy?</Label>
              <Select
                value={formData.areCurrentClaimonThisPolicy}
                onValueChange={(value) => handleChange("areCurrentClaimonThisPolicy", value)}
                disabled={isDisabled}
              >
                <SelectTrigger
                  className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                  disabled={isDisabled}
                >
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

            {/* ------- Select 2 ------- */}
            <div>
              <Label className="mb-2">Any Past Claims on this Policy?</Label>
              <Select
                value={formData.arePastClaimonThisPolicy}
                onValueChange={(value) => handleChange("arePastClaimonThisPolicy", value)}
                disabled={isDisabled}
              >
                <SelectTrigger
                  className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                  disabled={isDisabled}
                >
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

            {/* ------- Select 3 ------- */}
            <div>
              <Label className="mb-2">Claim Outcome</Label>
              <Select
                value={formData.claimOutcome}
                onValueChange={(value) => handleChange("claimOutcome", value)}
                disabled={isDisabled}
              >
                <SelectTrigger
                  className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                  disabled={isDisabled}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {claimOutcomeOption.map((option) => (
                    <SelectItem key={option} value={option} disabled={isDisabled}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Date of claim</TableHead>
                  <TableHead>Reason for claim</TableHead>
                  <TableHead>Amount of Claim (CA$)</TableHead>
                  <TableHead>Claim Closed On</TableHead>
                  <TableHead>Claim Amount Settled (CA$)</TableHead>
                  <TableHead>Claim Amount Rejected (CA$)</TableHead>
                  <TableHead>Settlement Observations if any</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {pastClaims.map((claim, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>

                    {/* Delete button */}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteClaimRow(index)}
                        disabled={isDisabled}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>

                    {/* Date of Claim Picker */}
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={isDisabled}
                            className={`w-full justify-start text-left font-normal ${
                              !isDisabled ? "border-2 border-gray-300" : ""
                            }`}
                          >
                            {claim.dateOfClaim
                              ? format(new Date(claim.dateOfClaim), "dd/MM/yyyy")
                              : "DD/MM/YYYY"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              claim.dateOfClaim ? new Date(claim.dateOfClaim) : undefined
                            }
                            onSelect={(date) => {
                              const updated = [...pastClaims];
                              updated[index].dateOfClaim = date;
                              setPastClaims(updated);
                            }}
                            initialFocus
                            disabled={isDisabled}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>

                    {/* Reason for claim */}
                    <TableCell>
                      <Textarea
                        className={`w-[300px] ${
                          !isDisabled ? "border-2 border-gray-300" : ""
                        }`}
                        value={claim.reasonforClaim}
                        onChange={(e) => {
                          const updated = [...pastClaims];
                          updated[index].reasonforClaim = e.target.value;
                          setPastClaims(updated);
                        }}
                        rows={1}
                        disabled={isDisabled}
                      />
                    </TableCell>

                    {/* Amount of claim */}
                    <TableCell>
                      <Input
                        type="number"
                        value={claim.amountofClaim}
                        onChange={(e) => {
                          const updated = [...pastClaims];
                          updated[index].amountofClaim = e.target.value;
                          setPastClaims(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>

                    {/* Claim closed on date */}
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={isDisabled}
                            className={`w-full justify-start text-left font-normal ${
                              !isDisabled ? "border-2 border-gray-300" : ""
                            }`}
                          >
                            {claim.claimClosedOn
                              ? format(new Date(claim.claimClosedOn), "dd/MM/yyyy")
                              : "DD/MM/YYYY"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              claim.claimClosedOn
                                ? new Date(claim.claimClosedOn)
                                : undefined
                            }
                            onSelect={(date) => {
                              const updated = [...pastClaims];
                              updated[index].claimClosedOn = date;
                              setPastClaims(updated);
                            }}
                            initialFocus
                            disabled={isDisabled}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>

                    {/* Claim Amount Settled */}
                    <TableCell>
                      <Input
                        type="number"
                        value={claim.claimAmountSettled}
                        onChange={(e) => {
                          const updated = [...pastClaims];
                          updated[index].claimAmountSettled = e.target.value;
                          setPastClaims(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>

                    {/* Claim Amount Rejected */}
                    <TableCell>
                      <Input
                        type="number"
                        value={claim.claimAmountRejected}
                        onChange={(e) => {
                          const updated = [...pastClaims];
                          updated[index].claimAmountRejected = e.target.value;
                          setPastClaims(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>

                    {/* Settlement Observations */}
                    <TableCell>
                      <Textarea
                        value={claim.settlement}
                        onChange={(e) => {
                          const updated = [...pastClaims];
                          updated[index].settlement = e.target.value;
                          setPastClaims(updated);
                        }}
                        rows={1}
                        className={`w-[300px] ${
                          !isDisabled ? "border-2 border-gray-300" : ""
                        }`}
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button onClick={addRowToClaimTable} className="mt-4" disabled={isDisabled}>
              Add Row
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* -------- Past Claims Section -------- */}
      <Card>
        <CardHeader>
          <CardTitle>Past Claims</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div>
              <Label className="mb-2">Total Amount Claimed</Label>
              <Input
                type="number"
                value={formData.totalAmountClaimed || ""}
                onChange={(e) => handleChange("totalAmountClaimed", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>

            <div>
              <Label className="mb-2">Total Amount Settled</Label>
              <Input
                type="number"
                value={formData.totalAmountSettled || ""}
                onChange={(e) => handleChange("totalAmountSettled", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>

            <div>
              <Label className="mb-2">Total Amount Rejected</Label>
              <Input
                type="number"
                value={formData.totalAmountRejected || ""}
                onChange={(e) => handleChange("totalAmountRejected", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* -------- SMS Response Section -------- */}
      <Card>
        <CardHeader>
          <CardTitle>SMS Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="mb-2">Ringcentral sms response</Label>
            <Textarea
              value={formData.ringcentralSmsResponse || ""}
              onChange={(e) => handleChange("ringcentralSmsResponse", e.target.value)}
              disabled={isDisabled}
              className={!isDisabled ? "border-2 border-gray-300" : ""}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Claims;
