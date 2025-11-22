import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const LeadManagement = ({ formData, setFormData, onNext, onPrev }) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Mock options - replace with actual data
  const leadStatusOptions = ["New", "Contacted", "Qualified", "Lost"];
  const leadSourceOptions = ["Website", "Referral", "Social Media"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lead Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                 <Label className="mb-2">Lead Status</Label>
              <Select value={formData.leadStatus} onValueChange={(value) => handleChange("leadStatus", value)}>
                  <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {leadStatusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
                 <Label className="mb-2">Lead Source</Label>
              <Select value={formData.leadSource} onValueChange={(value) => handleChange("leadSource", value)}>
                  <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent>
                  {leadSourceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
                 <Label className="mb-2">Lead Score</Label>
              <Input
                type="number"
                value={formData.leadScore || ""}
                onChange={(e) => handleChange("leadScore", e.target.value)}
              />
            </div>
            <div>
                 <Label className="mb-2">Assigned To</Label>
              <Input
                value={formData.assignedTo || ""}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className="flex justify-between">
        <Button onClick={onPrev}>Previous</Button>
        <Button onClick={onNext}>Submit</Button>
      </div> */}
    </div>
  );
};

export default LeadManagement;
