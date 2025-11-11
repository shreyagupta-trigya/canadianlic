import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from 'lucide-react';

const LeadMgtForm = React.memo(({
  formData,
  setFormData,
  isDisabled,
  handlePrevious, handleNext
}) => {
  const [errors, setErrors] = useState({});
  const [leadMgtData, setLeadMgtData] = useState([]);

  useEffect(() => {
    // Initialize form data if not provided
    if (!formData) {
      setFormData({
        leadMgtData: [],
        totalInteractionTime: ''
      });
    } else {
      setLeadMgtData(formData.leadMgtData || []);
    }
  }, [formData, setFormData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, [setFormData]);

  const handleRowInputChange = useCallback((index, field, value) => {
    const updatedData = [...leadMgtData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    setLeadMgtData(updatedData);
    setFormData(prev => ({
      ...prev,
      leadMgtData: updatedData
    }));
  }, [leadMgtData, setFormData]);

  const addRowToLeadMgt = useCallback(() => {
    const newRow = {
      interactionType: "",
      timeOfInteraction: "",
      contactAttempt: "",
      timeSpent: "",
      comments: "",
      interactionOutcome: "",
      probabilityOfClosure: ""
    };
    const updatedData = [...leadMgtData, newRow];
    setLeadMgtData(updatedData);
    setFormData(prev => ({
      ...prev,
      leadMgtData: updatedData
    }));
  }, [leadMgtData, setFormData]);

  const deleteRowToLeadMgt = useCallback((index) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const updatedData = leadMgtData.filter((_, i) => i !== index);
      setLeadMgtData(updatedData);
      setFormData(prev => ({
        ...prev,
        leadMgtData: updatedData
      }));
    }
  }, [leadMgtData, setFormData]);

 
  return (
    <div className="space-y-6">
      <Card className="mb-4">
        <CardContent className="p-4">
          <h5 className="text-lg font-semibold mb-4 px-2">Lead Management History</h5>

          <div className="overflow-x-auto">
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                  <TableHead>Interaction Type</TableHead>
                  <TableHead>Date/Time Of Interaction</TableHead>
                  <TableHead>Contact Attempt</TableHead>
                  <TableHead>Time Spent (Mins)</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Interaction Outcome</TableHead>
                  <TableHead>Probability of Closure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadMgtData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => deleteRowToLeadMgt(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                        disabled={isDisabled}
                        title="Delete row"
                      >
                        < Trash2 size={16} className='cursor-pointer'/>
                      </button>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={row.interactionType || ""}
                        onValueChange={(value) => handleRowInputChange(index, 'interactionType', value)}
                        disabled={isDisabled}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Call">Call</SelectItem>
                          <SelectItem value="Text">Text</SelectItem>
                          <SelectItem value="Visit">Visit</SelectItem>
                          <SelectItem value="Video Call">Video Call</SelectItem>
                          <SelectItem value="Zoho Chat">Zoho Chat</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="datetime-local"
                        value={row.timeOfInteraction || ''}
                        onChange={(e) => handleRowInputChange(index, 'timeOfInteraction', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.contactAttempt || ''}
                        onChange={(e) => handleRowInputChange(index, 'contactAttempt', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.timeSpent || ''}
                        onChange={(e) => handleRowInputChange(index, 'timeSpent', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={row.comments || ''}
                        onChange={(e) => handleRowInputChange(index, 'comments', e.target.value)}
                        disabled={isDisabled}
                        className="w-full"
                        rows={1}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={row.interactionOutcome || ""}
                        onValueChange={(value) => handleRowInputChange(index, 'interactionOutcome', value)}
                        disabled={isDisabled}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select outcome" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="-None-">-None-</SelectItem>
                          <SelectItem value="Deferred">Deferred</SelectItem>
                          <SelectItem value="Purpose Achieved">Purpose Achieved</SelectItem>
                          <SelectItem value="Purpose Not Achieved">Purpose Not Achieved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={row.probabilityOfClosure || ""}
                        onValueChange={(value) => handleRowInputChange(index, 'probabilityOfClosure', value)}
                        disabled={isDisabled}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select probability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="-None-">-None-</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Button
              onClick={addRowToLeadMgt}
              disabled={isDisabled}
              className="mb-4"
            >
              Add Row
            </Button>
          </div>

          <div className="w-full flex justify-end mb-4">
            <div className="w-1/2 border rounded py-3 px-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalInteractionTime">Total Interaction Time (mins)</Label>
                </div>
                <div>
                  <Input
                    id="totalInteractionTime"
                    type="text"
                    value={formData?.totalInteractionTime || ''}
                    onChange={(e) => handleInputChange('totalInteractionTime', e.target.value)}
                    disabled={isDisabled}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-4">
        <Button variant="outline"  onClick={handlePrevious} disabled={isDisabled}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isDisabled}>
          Submit
        </Button>
      </div>
    </div>
  );
});

LeadMgtForm.displayName = 'LeadMgtForm';

export default LeadMgtForm;
