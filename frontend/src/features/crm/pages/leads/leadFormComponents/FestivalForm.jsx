import React, { useState, useEffect } from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

const FestivalForm = ({ formData, setFormData, isDisabled }) => {
  const [festivalsData, setFestivalsData] = useState(formData.festivalsData || []);

  useEffect(() => {
    setFormData(prev => ({ ...prev, festivalsData }));
  }, [festivalsData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFestivalRow = () => {
    if (isDisabled) return;
    setFestivalsData([...festivalsData, { festivalName: "", dateOfFestival: "" }]);
  };

  const removeFestivalRow = (index) => {
    if (isDisabled) return;
    setFestivalsData(festivalsData.filter((_, i) => i !== index));
  };

  const updateFestivalRow = (index, field, value) => {
    if (isDisabled) return;
    const updated = [...festivalsData];
    updated[index][field] = value;
    setFestivalsData(updated);
  };

  const religionOptions = [
    "-None-",
    "Unknown",
    "Hinduism",
    "Christianity",
    "Islam",
    "Judaism",
    "Sikhism",
    "Buddhism",
    "Jainism",
    "Bahai",
    "Zoroastrianism",
    "Other"
  ];

  const celebratedFestivalsOptionsMap = {
    Hinduism: [
      "Diwali", "Holi", "Dussehra", "Raksha Bandhan", "Janmashtami",
      "Mahashivaratri", "Ganesh Chaturthi", "Navratri", "Pongal", "Makar Sankranti"
    ],
    Sikhism: [
      "Guru Gobind Singh Jayanti", "Guru Granth Sahib Prakash Divas",
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

  const celebratedFestivalsOptions = formData.religion && formData.religion !== "-None-" && formData.religion !== "Unknown"
    ? celebratedFestivalsOptionsMap[formData.religion] || celebratedFestivalsOptionsMap["General"]
    : celebratedFestivalsOptionsMap["General"];

  return (
    <div>
      <FormCard title="Ethnicity">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Religion">
            <Select
              value={formData.religion || ""}
              onValueChange={(value) => handleChange("religion", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Religion" />
              </SelectTrigger>
              <SelectContent>
                {religionOptions.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Celebrated Festivals">
            <Select
              value={formData.celebratedFestivals || ""}
              onValueChange={(value) => handleChange("celebratedFestivals", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Festival" />
              </SelectTrigger>
              <SelectContent>
                {celebratedFestivalsOptions.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormCard>

      <FormCard title="Important Festivals Dates">
        <div className="overflow-x-auto">
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
              {festivalsData.map((festival, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFestivalRow(index)}
                      disabled={isDisabled}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={festival.festivalName || ""}
                      onChange={(e) => updateFestivalRow(index, "festivalName", e.target.value)}
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={festival.dateOfFestival || ""}
                      onChange={(e) => updateFestivalRow(index, "dateOfFestival", e.target.value)}
                      disabled={isDisabled}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            className="mt-2"
            onClick={addFestivalRow}
            disabled={isDisabled}
          >
            Add Festival
          </Button>
        </div>
      </FormCard>
    </div>
  );
};

export default FestivalForm;
