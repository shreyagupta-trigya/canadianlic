import React, { useState, useEffect } from 'react';
import { religionOptions, festivalsOptions } from '../utils/picklist';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrashIcon } from 'lucide-react';

const celebratedFestivalsOptionsMap = {
  "-None-": [],
  Buddhism: ["Lhosar"],
  Unknown: [],
  Hinduism: [
    'Diwali', 'Holi', 'Navratri', 'Janmashtami', 'Rama Navami', 'Makar Sankranti',
    'Pongal', 'Ganesh Chaturthi', 'Durga Puja', 'Raksha Bandhan', 'Karva Chauth', 'Mahashivratri'
  ],
  Sikhism: [
    'Gurpurab', 'Baisakhi', 'Maghi', 'Hola Mohalla', 'Diwali (Bandi Chhor Divas)',
    'Martyrdom of Guru Arjan Dev Ji', 'Martyrdom of Guru Tegh Bahadur Ji',
    "Guru Nanak Jayanti", "Guru Gobind Singh Jayanti", "Guru Granth Sahib Prakash Divas",
    "Vaisakhi", "Lohri", "Thanksgiving", "New Year"
  ],
  Christianity: [
    'Christmas', 'Easter', 'Good Friday', 'Palm Sunday', 'Ash Wednesday',
    'Maundy Thursday', 'Pentecost', "All Saints' Day", 'Ascension Day', 'Epiphany'
  ],
  Islam: [
    'Eid al-Fitr', 'Eid al-Adha', 'Ramadan', 'Laylat al-Qadr',
    'Islamic New Year', 'Milad-un-Nabi', 'Ashura'
  ],
  Judaism: ["Passover"],
  General: [
    "Canada Day",
    "New Year",
    "Family Day",
    "Victoria Day",
    "Father's Day",
    "Mother's Day",
    "Thank's giving",
  ],
};

const FestivalForm = ({ FestivalForm, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({ ...FestivalForm });
  const [subform, setSubform] = useState([]);

  useEffect(() => {
    setFormData({ ...FestivalForm });
    setSubform(FestivalForm.festivalsData || []);
  }, [FestivalForm]);

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

  const celebratedFestivalsOptions = () => {
    const selectedReligion = formData.religion;
    if (!selectedReligion || selectedReligion === "-None-" || selectedReligion === "Unknown") {
      return celebratedFestivalsOptionsMap["General"];
    }
    return celebratedFestivalsOptionsMap[selectedReligion] || celebratedFestivalsOptionsMap["General"];
  };

  const handleNext = () => {
    onNext({ ...formData, festivalsData: subform });
  };

  const handlePrevious = () => {
    onPrevious({ ...formData, festivalsData: subform });
  };

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
              <Select value={formData.religion || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Religion" />
                </SelectTrigger>
                <SelectContent>
                  {religionOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Celebrated Festivals</label>
              <Select value={formData.celebratedFestivals || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, celebratedFestivals: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Celebrated Festivals" />
                </SelectTrigger>
                <SelectContent>
                  {celebratedFestivalsOptions().map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Select value={parent.festivalName || ''} onValueChange={(value) => handleSubformChange(index, 'festivalName', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Festival" />
                        </SelectTrigger>
                        <SelectContent>
                          {festivalsOptions.map((option, idx) => (
                            <SelectItem key={idx} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.dateOfFestival || ''}
                        onChange={(e) => handleSubformChange(index, 'dateOfFestival', e.target.value)}
                        type="date"
                        autoComplete="off"
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
          >
            Add Row
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4" style={{ marginBottom: '200px' }}>
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
      </div>
    </div>
  );
};

export default FestivalForm;
