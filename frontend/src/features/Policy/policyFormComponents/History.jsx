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

const History = ({ formData, setFormData, onNext, onPrev, isDisabled }) => {
  const [renewalsHistoryData, setRenewalsHistoryData] = useState(formData.renewalsHistoryData || []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addRowToRenewalHistoryTable = () => {
    setRenewalsHistoryData([...renewalsHistoryData, {
      premiumFrequency: "",
      premiumAmount: "",
      policyAmount: "",
      policyIssuedDate: "",
      policyRenewalDate: "",
      medicalRequired: "",
      renewalCommission: "",
      PolicyAdvisor: ""
    }]);
  };

  const deleteLeadsRow = (index) => {
    setRenewalsHistoryData(renewalsHistoryData.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setFormData({ ...formData, renewalsHistoryData });
    onNext();
  };

  // Mock options - replace with actual data
  const premiumFrequencyOptions = ["Monthly", "Yearly", "Quarterly"];
  const clientFirstPolicyOptions = ["Yes", "No", "-None-"];

  return (
   <div className="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle>Renewal History</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label className="mb-2">Total Renewal Commissions (CA$)</Label>
          <Input
            type="number"
            value={formData.totalRenewalCommissions || ""}
            onChange={(e) => handleChange("totalRenewalCommissions", e.target.value)}
            disabled={isDisabled}
            className={!isDisabled ? "border-2 border-gray-300" : ""}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Premium Frequency</TableHead>
              <TableHead>Premium Amount (CA$)</TableHead>
              <TableHead>Policy Amount (CA$)</TableHead>
              <TableHead>Policy Issued Date</TableHead>
              <TableHead>Policy Renewed Date</TableHead>
              <TableHead>Was Medical Required?</TableHead>
              <TableHead>Renewal Commission (CA$)</TableHead>
              <TableHead>Policy Advisor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renewalsHistoryData.map((renewal, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteLeadsRow(index)}
                    disabled={isDisabled}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Select
                    value={renewal.premiumFrequency}
                    onValueChange={(value) => {
                      const updated = [...renewalsHistoryData];
                      updated[index].premiumFrequency = value;
                      setRenewalsHistoryData(updated);
                    }}
                    disabled={isDisabled}
                  >
                    <SelectTrigger className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {premiumFrequencyOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={renewal.premiumAmount}
                    onChange={(e) => {
                      const updated = [...renewalsHistoryData];
                      updated[index].premiumAmount = e.target.value;
                      setRenewalsHistoryData(updated);
                    }}
                    disabled={isDisabled}
                    className={!isDisabled ? "border-2 border-gray-300" : ""}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={renewal.policyAmount}
                    onChange={(e) => {
                      const updated = [...renewalsHistoryData];
                      updated[index].policyAmount = e.target.value;
                      setRenewalsHistoryData(updated);
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
                        className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                        disabled={isDisabled}
                      >
                        {renewal.policyIssuedDate ? format(new Date(renewal.policyIssuedDate), "dd/MM/yyyy") : "DD/MM/YYYY"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={renewal.policyIssuedDate ? new Date(renewal.policyIssuedDate) : undefined}
                        onSelect={(date) => {
                          const updated = [...renewalsHistoryData];
                          updated[index].policyIssuedDate = date;
                          setRenewalsHistoryData(updated);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                        disabled={isDisabled}
                      >
                        {renewal.policyRenewalDate ? format(new Date(renewal.policyRenewalDate), "dd/MM/yyyy") : "DD/MM/YYYY"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={renewal.policyRenewalDate ? new Date(renewal.policyRenewalDate) : undefined}
                        onSelect={(date) => {
                          const updated = [...renewalsHistoryData];
                          updated[index].policyRenewalDate = date;
                          setRenewalsHistoryData(updated);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Select
                    value={renewal.medicalRequired}
                    onValueChange={(value) => {
                      const updated = [...renewalsHistoryData];
                      updated[index].medicalRequired = value;
                      setRenewalsHistoryData(updated);
                    }}
                    disabled={isDisabled}
                  >
                    <SelectTrigger className={`w-full ${!isDisabled ? "border-2 border-gray-300" : ""}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientFirstPolicyOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    value={renewal.renewalCommission}
                    onChange={(e) => {
                      const updated = [...renewalsHistoryData];
                      updated[index].renewalCommission = e.target.value;
                      setRenewalsHistoryData(updated);
                    }}
                    disabled={isDisabled}
                    className={!isDisabled ? "border-2 border-gray-300" : ""}
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={renewal.PolicyAdvisor}
                    onChange={(e) => {
                      const updated = [...renewalsHistoryData];
                      updated[index].PolicyAdvisor = e.target.value;
                      setRenewalsHistoryData(updated);
                    }}
                    rows={1}
                    disabled={isDisabled}
                    className={`w-[300px] ${!isDisabled ? "border-2 border-gray-300" : ""}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={addRowToRenewalHistoryTable} className="mt-4" disabled={isDisabled}>
          Add Row
        </Button>
      </div>
    </CardContent>
  </Card>
</div>

  );
};

export default History;
