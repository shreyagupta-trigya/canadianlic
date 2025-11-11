import React, { useState, useEffect } from 'react';
import { religionOptions, festivalsOptions, religionFestivals, religions } from '../utils/picklist';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrashIcon } from 'lucide-react';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



const FestivalForm = ({ onNext, onPrevious, FestivalForm, isDisabled = false }) => {
  const [formData, setFormData] = useState(FestivalForm || {});
  const [subform, setSubform] = useState([]);

  useEffect(() => {
    setSubform(formData?.festivalsData || []);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubformChange = (index, field, value) => {
    const updated = [...subform];
    updated[index][field] = value;
    setSubform(updated);
  };

  const addRowToFestivalsTable = () => {
    setSubform(prev => [...prev, { festivalName: '', dateOfFestival: '' }]);
  };

  const deleteFestivalTableRow = (index) => {
    const updated = [...subform];
    updated.splice(index, 1);
    setSubform(updated);
  };

  const availableFestivals = () => {
    if (!formData?.religion || formData.religion.length === 0) return [];
    return formData.religion.reduce((all, rel) => {
      const list = religionFestivals[rel] || [];
      return all.concat(list);
    }, []);
  };

  useEffect(() => {
    if (!formData?.religion || formData?.religion.length === 0) {
      setFormData(prev => ({ ...prev, festival: [] }));
      return;
    }
    const allFestivals = formData.religion.reduce((acc, rel) => {
      const festivals = religionFestivals[rel] || [];
      return acc.concat(festivals);
    }, []);
    setFormData(prev => ({ ...prev, festival: allFestivals }));
  }, [formData?.religion]);



  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ethnicity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Religion</label>
              <Select
                isMulti
                options={religions.map(rel => ({ value: rel, label: rel }))}
                value={formData.religion ? formData.religion.map(rel => ({ value: rel, label: rel })) : []}
                onChange={(selected) => setFormData(prev => ({ ...prev, religion: selected ? selected.map(s => s.value) : [] }))}
                placeholder="Select Religion"
                className="custom-vselect"
                isDisabled={isDisabled}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Celebrated Festivals</label>
              <Select
                isMulti
                options={availableFestivals().map(fest => ({ value: fest, label: fest }))}
                value={formData.festival ? formData.festival.map(fest => ({ value: fest, label: fest })) : []}
                onChange={(selected) => setFormData(prev => ({ ...prev, festival: selected ? selected.map(s => s.value) : [] }))}
                placeholder="Select Celebrated Festivals"
                className="custom-vselect"
                isDisabled={isDisabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Festivals Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Festival Name</TableHead>
                  <TableHead>Date On Celebrated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subform.map((parent, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteFestivalTableRow(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isDisabled}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="choices" data-type="select-one" tabIndex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                        <div className="select-box">
                          <select
                            value={parent.festivalName || ''}
                            onChange={(e) => handleSubformChange(index, 'festivalName', e.target.value)}
                            className="multisteps-form__select form-control choices__input border p-2 rounded-md"
                            name="choices-state"
                            disabled={isDisabled}
                          >
                            <option value="">Select Festival</option>
                            {festivalsOptions.map((option, idx) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.dateOfFestival || ''}
                        onChange={(e) => handleSubformChange(index, 'dateOfFestival', e.target.value)}
                        type="date"
                        autoComplete="off"
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button
            onClick={addRowToFestivalsTable}
            className="mt-4"
            disabled={isDisabled}
          >
            Add Row
          </Button>
        </CardContent>
      </Card>

      {/* <div className="flex justify-center gap-4" style={{ marginBottom: '200px' }}>
        <Button
          variant="outline"
          onClick={onPrevious}
        >
          Prev
        </Button>
        <Button
          onClick={() => onNext(formData)}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default FestivalForm;
