import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Commission = ({ formData, setFormData, onNext, onPrev , isDisabled}) => {
  const [policyCommission, setPolicyCommission] = useState(formData.policyCommission || []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addRowToPolicypolicyCommissionTable = () => {
    setPolicyCommission([...policyCommission, {
      monthPremium: '',
      gcComm: '',
      glComm: '',
      naCoom: '',
      ncComm: '',
      nlComm: '',
    }]);
  };

  const deletePolicypolicyCommissionTableRow = (index) => {
    setPolicyCommission(policyCommission.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setFormData({ ...formData, policyCommission });
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Day Wise Policy Commission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="mb-2">Day wise Corporate policyCommission</Label>
              <Input
                type="number"
                value={formData.dayWiseCorporateCommision || ""}
                onChange={(e) => handleChange("dayWiseCorporateCommision", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>
            <div>
              <Label className="mb-2">Day wise Location policyCommission</Label>
              <Input
                type="number"
                value={formData.dayWiseLocationCommision || ""}
                onChange={(e) => handleChange("dayWiseLocationCommision", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>
            <div>
              <Label className="mb-2">Day wise Advisor policyCommission</Label>
              <Input
                type="number"
                value={formData.dayWiseAdvisorCommision || ""}
                onChange={(e) => handleChange("dayWiseAdvisorCommision", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>
            <div>
              <Label className="mb-2">Policy Month</Label>
              <Input
                type="number"
                value={formData.policyMonth || ""}
                onChange={(e) => handleChange("policyMonth", e.target.value)}
                disabled={isDisabled}
                className={!isDisabled ? "border-2 border-gray-300" : ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policy Policy Commission Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Month/Premium</TableHead>
                  <TableHead>Gross Corporate policyCommission</TableHead>
                  <TableHead>Gross Location policyCommission</TableHead>
                  <TableHead>Net Advisor policyCommission</TableHead>
                  <TableHead>Net Corporate policyCommission</TableHead>
                  <TableHead>Net Location policyCommission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policyCommission.map((commission, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePolicypolicyCommissionTableRow(index)}
                        disabled={isDisabled}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={commission.monthPremium}
                        onChange={(e) => {
                          const updated = [...policyCommission];
                          updated[index].monthPremium = e.target.value;
                          setPolicyCommission(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={commission.gcComm}
                        onChange={(e) => {
                          const updated = [...policyCommission];
                          updated[index].gcComm = e.target.value;
                          setPolicyCommission(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={commission.glComm}
                        onChange={(e) => {
                          const updated = [...policyCommission];
                          updated[index].glComm = e.target.value;
                          setPolicyCommission(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={commission.naCoom}
                        onChange={(e) => {
                          const updated = [...policyCommission];
                          updated[index].naCoom = e.target.value;
                          setPolicyCommission(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={commission.ncComm}
                        onChange={(e) => {
                          const updated = [...policyCommission];
                          updated[index].ncComm = e.target.value;
                          setPolicyCommission(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={commission.nlComm}
                        onChange={(e) => {
                          const updated = [...policyCommission];
                          updated[index].nlComm = e.target.value;
                          setPolicyCommission(updated);
                        }}
                        disabled={isDisabled}
                        className={!isDisabled ? "border-2 border-gray-300" : ""}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={addRowToPolicypolicyCommissionTable}
              className="mt-4"
              disabled={isDisabled}
            >
              Add Row
            </Button>
          </div>
        </CardContent>
      </Card>

     <Card>
  <CardHeader>
    <CardTitle>Policy Policy Commission Info</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label className="mb-2">Total Gross Location Commision</Label>
        <Input
          type="number"
          value={formData.totalGrossLocationCommision || ""}
          onChange={(e) => handleChange("totalGrossLocationCommision", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Total Net Location policyCommission</Label>
        <Input
          type="number"
          value={formData.totalNetLocationpolicyCommission || ""}
          onChange={(e) => handleChange("totalNetLocationpolicyCommission", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Corporate policyCommission %</Label>
        <Input
          type="number"
          value={formData.corporatepolicyCommission || ""}
          onChange={(e) => handleChange("corporatepolicyCommission", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Corporate policyCommission Amount</Label>
        <Input
          type="number"
          value={formData.corporatePolicyCommissionAmount || ""}
          onChange={(e) => handleChange("corporatePolicyCommissionAmount", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Location policyCommission %</Label>
        <Input
          type="number"
          value={formData.locationPolicyCommission || ""}
          onChange={(e) => handleChange("locationPolicyCommission", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Total Gross Corpoarate Com. (CA$)</Label>
        <Input
          type="number"
          value={formData.totalGrossCorpoarateCom || ""}
          onChange={(e) => handleChange("totalGrossCorpoarateCom", e.target.value)}
          disabled
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Total Net Advisor policyCommission</Label>
        <Input
          type="number"
          value={formData.totalGrossAdvisorpolicyCommission || ""}
          onChange={(e) => handleChange("totalGrossAdvisorpolicyCommission", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Total Net Corporate policyCommission</Label>
        <Input
          type="number"
          value={formData.totalNetCorporateCommision || ""}
          onChange={(e) => handleChange("totalNetCorporateCommision", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Advisor policyCommission %</Label>
        <Input
          type="number"
          value={formData.advisorPolicyCommission || ""}
          onChange={(e) => handleChange("advisorPolicyCommission", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Update policyCommissions</Label>
        <Input
          type="number"
          value={formData.updatePolicyCommission || ""}
          onChange={(e) => handleChange("updatePolicyCommission", e.target.value)}
          disabled={isDisabled}
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Total Net Advisor policyCommission (CA$)</Label>
        <Input
          type="number"
          value={formData.totalNetAdvisorpolicyCommission || ""}
          onChange={(e) => handleChange("totalNetAdvisorpolicyCommission", e.target.value)}
          disabled
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Total Net Corporate Com. (CA$)</Label>
        <Input
          type="number"
          value={formData.totalNetCorporateCom || ""}
          onChange={(e) => handleChange("totalNetCorporateCom", e.target.value)}
          disabled
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
      <div>
        <Label className="mb-2">Total Gross Location Com. (CA$)</Label>
        <Input
          type="number"
          value={formData.totalGrossLocationCom || ""}
          onChange={(e) => handleChange("totalGrossLocationCom", e.target.value)}
          disabled
          className={!isDisabled ? "border-2 border-gray-300" : ""}
        />
      </div>
    </div>
  </CardContent>
</Card>


      {/* <div className="flex justify-between">
        <Button onClick={onPrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div> */}
    </div>
  );
};

export default Commission;
