import React, { useState, useEffect } from 'react';
import { FormCard, FormField } from '@/components/custom/CustomFormComponents';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const LeadManagementInformation = ({ LeadManagementInformation, onNext, onPrevious }) => {
  const [subform, setSubform] = useState([]);

  useEffect(() => {
    setSubform(LeadManagementInformation.LeadData || []);
  }, [LeadManagementInformation]);

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

  const handleNext = () => {
    onNext({ LeadData: subform });
  };

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div>
      <FormCard title="Lead Management History">
        <div className="overflow-x-auto">
          <table className="table table-bordered table-responsive">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Actions</th>
                <th>Interaction Type</th>
                <th>Date/Time Of Interaction</th>
                <th>Contact Attempt</th>
                <th>Time Spent (Mins)</th>
                <th className="text-center">Comments</th>
                <th>Interaction Outcome</th>
                <th>Probability Of Closure</th>
              </tr>
            </thead>
            <tbody>
              {subform.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <button
                      onClick={() => deleteLeadsRow(index)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                  <td>
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
                  </td>
                  <td>
                    <Input
                      type="datetime-local"
                      value={item.timeOfInteraction || ''}
                      onChange={(e) => handleInputChange(index, 'timeOfInteraction', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={item.contactAttempt || ''}
                      onChange={(e) => handleInputChange(index, 'contactAttempt', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={item.timeSpent || ''}
                      onChange={(e) => handleInputChange(index, 'timeSpent', e.target.value)}
                    />
                  </td>
                  <td>
                    <Textarea
                      value={item.comments || ''}
                      onChange={(e) => handleInputChange(index, 'comments', e.target.value)}
                      rows={2}
                      cols={12}
                    />
                  </td>
                  <td>
                    <Input
                      value={item.interactionOutcome || ''}
                      onChange={(e) => handleInputChange(index, 'interactionOutcome', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={item.probabilityOfClosure || ''}
                      onChange={(e) => handleInputChange(index, 'probabilityOfClosure', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary mt-3"
          type="button"
          onClick={addRowToLeadDataTable}
        >
          Add Row
        </button>
      </FormCard>
    </div>
  );
};

export default LeadManagementInformation;
