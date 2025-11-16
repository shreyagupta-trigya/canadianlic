import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from 'lucide-react';

const LeadHistoryForm = React.memo(({
  formData,
  setFormData,
  isDisabled,
  handlePrevious, handleNext
}) => {
  const [errors, setErrors] = useState({});
  const [leadConversionHistoryData, setLeadConversionHistoryData] = useState([]);

  useEffect(() => {
    // Initialize form data if not provided
    if (!formData) {
      setFormData({
        leadConversionHistoryData: []
      });
    } else {
      setLeadConversionHistoryData(formData.leadConversionHistoryData || []);
    }
  }, [formData, setFormData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, [setFormData]);

  const handleRowInputChange = useCallback((index, field, value) => {
    const updatedData = [...leadConversionHistoryData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    setLeadConversionHistoryData(updatedData);
    setFormData(prev => ({
      ...prev,
      leadConversionHistoryData: updatedData
    }));
  }, [leadConversionHistoryData, setFormData]);

  const addLeadConversionHistory = useCallback(() => {
    const newRow = {
      referralLevel: "",
      referraltilldateLife: "",
      referralstillDateLivingBenefits: "",
      referralstillDateTravel: "",
      referralstillDateHealthDental: "",
      referralPayouttillDateLife: "",
      referralPayouttillDateLivingBenefits: "",
      referralPayouttillDateLifeTravel: "",
      referralPayouttillDateHealthDental: ""
    };
    const updatedData = [...leadConversionHistoryData, newRow];
    setLeadConversionHistoryData(updatedData);
    setFormData(prev => ({
      ...prev,
      leadConversionHistoryData: updatedData
    }));
  }, [leadConversionHistoryData, setFormData]);

  const deleteLeadHistoryRow = useCallback((index) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const updatedData = leadConversionHistoryData.filter((_, i) => i !== index);
      setLeadConversionHistoryData(updatedData);
      setFormData(prev => ({
        ...prev,
        leadConversionHistoryData: updatedData
      }));
    }
  }, [leadConversionHistoryData, setFormData]);



  return (
    <div className="space-y-6">
      <Card className="mb-4">
        <CardContent className="p-4">
          <h5 className="text-lg font-semibold mb-4 px-2">Referral Level</h5>

          <div className="overflow-x-auto">
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                  <TableHead>Referral Level</TableHead>
                  <TableHead>Referrals till Date - Life</TableHead>
                  <TableHead>Referrals till Date - Living Benefits</TableHead>
                  <TableHead>Referrals till Date - Travel</TableHead>
                  <TableHead>Referrals till Date - Health & Dental</TableHead>
                  <TableHead>Referral Payout till Date - Life</TableHead>
                  <TableHead>Referral Payout till Date - Living Benefits</TableHead>
                  <TableHead>Referral Payout till Date - Travel</TableHead>
                  <TableHead>Referral Payout till Date - Health & Dental</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadConversionHistoryData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => deleteLeadHistoryRow(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                        disabled={isDisabled}
                        title="Delete row"
                      >
   < Trash2 size={16} className='cursor-pointer'/>                      </button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.referralLevel || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralLevel', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referraltilldateLife || ''}
                        onChange={(e) => handleRowInputChange(index, 'referraltilldateLife', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referralstillDateLivingBenefits || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralstillDateLivingBenefits', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referralstillDateTravel || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralstillDateTravel', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referralstillDateHealthDental || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralstillDateHealthDental', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referralPayouttillDateLife || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralPayouttillDateLife', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referralPayouttillDateLivingBenefits || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralPayouttillDateLivingBenefits', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referralPayouttillDateLifeTravel || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralPayouttillDateLifeTravel', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.referralPayouttillDateHealthDental || ''}
                        onChange={(e) => handleRowInputChange(index, 'referralPayouttillDateHealthDental', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Button
              onClick={addLeadConversionHistory}
              disabled={isDisabled}
              className="mb-4 bg-blue-500 hover:bg-blue-600"
            >
              Add Row
            </Button>
          </div>
        </CardContent>
      </Card>

         <div className="flex justify-center gap-4 fixed bottom-0 pb-2  bg-background  w-full left-30  mx-auto" >
        <Button variant="outline" onClick={handlePrevious} disabled={isDisabled}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isDisabled} className={"bg-blue-500 hover:bg-blue-600"}>
          Next
        </Button>
      </div>
    </div>
  );
});

LeadHistoryForm.displayName = 'LeadHistoryForm';

export default LeadHistoryForm;
