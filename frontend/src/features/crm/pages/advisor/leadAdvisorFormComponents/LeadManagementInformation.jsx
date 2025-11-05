import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrashIcon } from 'lucide-react';

const LeadManagementInformation = ({ formData, setFormData, isDisabled }) => {
  const [subform, setSubform] = useState([]);

  useEffect(() => {
    setSubform(formData.LeadData || []);
  }, [formData]);

  const addRowToLeadDataTable = () => {
    setSubform(prev => [...prev, {
      interactionType: "",
      timeOfInteraction: "",
      contactAttempt: "",
      timeSpent: "",
      comments: "",
      interactionOutcome: "",
      probabilityOfClosure: ""
    }]);
  };

  const deleteLeadsRow = (index) => {
    setSubform(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    setSubform(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };



  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lead Management History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <Table className="border border-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead className="border border-gray-300">#</TableHead>
                  <TableHead className="border border-gray-300">Actions</TableHead>
                  <TableHead className="border border-gray-300">Interaction Type</TableHead>
                  <TableHead className="border border-gray-300">Date/Time Of Interaction</TableHead>
                  <TableHead className="border border-gray-300">Contact Attempt</TableHead>
                  <TableHead className="border border-gray-300">Time Spent (Mins)</TableHead>
                  <TableHead className="border border-gray-300">Comments</TableHead>
                  <TableHead className="border border-gray-300">Interaction Outcome</TableHead>
                  <TableHead className="border border-gray-300">Probability Of Closure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subform.map((item, index) => (
                  <TableRow key={index} className="border border-gray-300">
                    <TableCell className="text-center border border-gray-300">{index + 1}</TableCell>
                    <TableCell className="border border-gray-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteLeadsRow(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      <Select
                        value={item.interactionType || ''}
                        onValueChange={(value) => handleInputChange(index, 'interactionType', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Call">Call</SelectItem>
                          <SelectItem value="Meeting">Meeting</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      <Input
                        type="datetime-local"
                        value={item.timeOfInteraction || ''}
                        onChange={(e) => handleInputChange(index, 'timeOfInteraction', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      <Input
                        type="number"
                        value={item.contactAttempt || ''}
                        onChange={(e) => handleInputChange(index, 'contactAttempt', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      <Input
                        type="number"
                        value={item.timeSpent || ''}
                        onChange={(e) => handleInputChange(index, 'timeSpent', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="border  border-gray-300">
                      <Textarea
                        value={item.comments || ''}
                        onChange={(e) => handleInputChange(index, 'comments', e.target.value)}
                        rows={4}
                        className="w-50"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      <Input
                        value={item.interactionOutcome || ''}
                        onChange={(e) => handleInputChange(index, 'interactionOutcome', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300">
                      <Input
                        type="number"
                        value={item.probabilityOfClosure || ''}
                        onChange={(e) => handleInputChange(index, 'probabilityOfClosure', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button
            onClick={addRowToLeadDataTable}
            className="mt-4"
          >
            Add Row
          </Button>
        </CardContent>
      </Card>

      {/* <div className="flex justify-center gap-4" style={{ marginBottom: '200px' }}>
        <Button
          variant="outline"
          onClick={handlePrevious}
        >
          Prev
        </Button>
        <Button
          onClick={handleNext}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default LeadManagementInformation;
