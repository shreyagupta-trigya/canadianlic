import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import {
  clientFirstPolicyOptions,
  typeOptions,
  genderOptions,
} from "@/utils/picklist";

const AnnuitantInfo = ({ formData, setFormData, onNext, onPrev }) => {
  const [investmentBasketData, setInvestmentBasketData] = useState(formData.InvestmentBasketData || []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    setFormData({ ...formData, InvestmentBasketData: investmentBasketData });
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const datePickerConfig = {
    dateFormat: "d/m/Y",
    allowInput: true,
  };

  const addRow = () => {
    setInvestmentBasketData([...investmentBasketData, {
      basketDate: '',
      type: '',
      fundCode: '',
      invPercentage: '',
      contribution: '',
    }]);
  };

  const deleteRow = (index) => {
    const newData = investmentBasketData.filter((_, i) => i !== index);
    setInvestmentBasketData(newData);
  };

  const updateBasket = (index, field, value) => {
    const newData = [...investmentBasketData];
    newData[index][field] = value;
    setInvestmentBasketData(newData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Investment Basket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fund Code</TableHead>
                  <TableHead>%</TableHead>
                  <TableHead>Contribution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investmentBasketData.map((item, index) => (
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
                      <div className="relative">
                        <Flatpickr
                          value={item.basketDate}
                          onChange={(date) => updateBasket(index, 'basketDate', date[0])}
                          options={datePickerConfig}
                          placeholder="DD/MM/YYYY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select value={item.type} onValueChange={(value) => updateBasket(index, 'type', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-None-" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.fundCode || ""}
                        onChange={(e) => updateBasket(index, 'fundCode', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.invPercentage || ""}
                        onChange={(e) => updateBasket(index, 'invPercentage', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.contribution || ""}
                        onChange={(e) => updateBasket(index, 'contribution', e.target.value)}
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

      <Card>
        <CardHeader>
          <CardTitle>Annuitant Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Is the client the Annuitant?</Label>
              <Select value={formData.isTheClientAnnuitent} onValueChange={(value) => handleChange("isTheClientAnnuitent", value)}>
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
            {formData.layout === 'RRSP' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Successor Annuitant / Co Applicant</Label>
                <Select value={formData.successorAnnuitantCoApplicant} onValueChange={(value) => handleChange("successorAnnuitantCoApplicant", value)}>
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
            {formData.layout === 'RESP' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Joint Subscriber</Label>
                <Select value={formData.jointSubscriber} onValueChange={(value) => handleChange("jointSubscriber", value)}>
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
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Number of Annuitants</Label>
              <Input
                type="number"
                value={formData.numberOfAnnuitants || ""}
                onChange={(e) => handleChange("numberOfAnnuitants", e.target.value)}
              />
            </div>
            {formData.layout === 'RRSP' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Name of Co Applicant</Label>
                <Input
                  value={formData.nameofCoApplicant || ""}
                  onChange={(e) => handleChange("nameofCoApplicant", e.target.value)}
                />
              </div>
            )}
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Phone</Label>
              <div className="border rounded-lg p-1.5">
                <PhoneInput
                  value={formData.phone || ""}
                  onChange={(value) => handleChange("phone", value)}
                  defaultCountry="CA"
                  international={true}
                  withCountryCallingCode={true}
                  placeholder="+1 (XXX) XXX-XXXX"
                  maxLength={16}
                />
              </div>
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Relationship to Primary Annuitant</Label>
              <Input
                value={formData.relationshipToPrimaryAnnuitment || ""}
                onChange={(e) => handleChange("relationshipToPrimaryAnnuitment", e.target.value)}
              />
            </div>
            {formData.layout === 'RRSP' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Primary Subscriber /Annuitant Name</Label>
                <Input
                  value={formData.primarySubscriber || ""}
                  onChange={(e) => handleChange("primarySubscriber", e.target.value)}
                />
              </div>
            )}
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Applicant Gender</Label>
              <Select value={formData.applicantGender} onValueChange={(value) => handleChange("applicantGender", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.layout === 'RRSP' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Is there a Co Applicant?</Label>
                <Select value={formData.isThereCoapplicant} onValueChange={(value) => handleChange("isThereCoapplicant", value)}>
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
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Email</Label>
              <Input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Date of Birth</Label>
              <div className="relative">
                <Flatpickr
                  value={formData.dateOfBirth}
                  onChange={(date) => handleChange("dateOfBirth", date[0])}
                  options={datePickerConfig}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Applicant DOB</Label>
              <div className="relative">
                <Flatpickr
                  value={formData.applicantDOB}
                  onChange={(date) => handleChange("applicantDOB", date[0])}
                  options={datePickerConfig}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 sm:col-span-6">
              <Label className="mb-2">Name of Primary Annuitant</Label>
              <Input
                value={formData.nameOfPrimaryAnnuitment || ""}
                onChange={(e) => handleChange("nameOfPrimaryAnnuitment", e.target.value)}
              />
            </div>
            {formData.layout === 'TFSA' && (
              <div className="lg:col-span-12 sm:col-span-12">
                <Label className="mb-2">Address</Label>
                <Textarea
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            )}
            {formData.layout === 'RESP' && (
              <div className="lg:col-span-4 sm:col-span-6">
                <Label className="mb-2">Spousal Contributor Replacing Subscriber</Label>
                <Select value={formData.spousalContributorReplacingSubscriber} onValueChange={(value) => handleChange("spousalContributorReplacingSubscriber", value)}>
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
            {formData.layout === 'RESP' && (
              <div className="lg:col-span-6 sm:col-span-6">
                <Label className="mb-2">Is there a Joint/Replacing Subscriber?</Label>
                <Select value={formData.isThereAJointReplacingSubscriber} onValueChange={(value) => handleChange("isThereAJointReplacingSubscriber", value)}>
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
            {formData.layout === 'RRSP' && (
              <div className="lg:col-span-4 sm:col-span-6">
                <Label className="mb-2">Principal Occupation</Label>
                <Input
                  value={formData.principalOccupation || ""}
                  onChange={(e) => handleChange("principalOccupation", e.target.value)}
                />
              </div>
            )}
            {formData.layout === 'RRSP' && (
              <div className="lg:col-span-12 sm:col-span-12">
                <Label className="mb-2">Address</Label>
                <Textarea
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={handlePrev} variant="outline" className="px-6 py-2">
          Prev
        </Button>
        <Button onClick={handleNext} className="px-6 py-2">
          Next
        </Button>
      </div>
    </div>
  );
};

export default AnnuitantInfo;
