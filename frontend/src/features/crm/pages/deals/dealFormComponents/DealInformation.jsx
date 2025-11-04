import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  insuranceLead,
  stage,
  forecastCategory,
  type,
  currency,
  objectType,
} from "../utils/picklist";

const DealInformation = ({ formData, setFormData, owners, contacts, locations, leads, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="deal-information container-fluid">
      <h5 className="main-heading mb-4 ps-2">Deal Info</h5>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">Deal Name <span className="text-red-500">*</span></Label>
          <Input
            type="text"
            name="dealName"
            value={formData.dealName || ""}
            onChange={handleChange}
            className={`w-full ${errors.dealName ? "border-red-500" : ""}`}
          />
          {errors.dealName && <div className="text-red-500 text-sm">{errors.dealName}</div>}
        </div>
        <div className="mb-3">
          <Label className="my-0">Deal Owner <span className="text-red-500">*</span></Label>
          <Select
            value={formData.dealOwner || ""}
            onValueChange={(value) => setFormData({ ...formData, dealOwner: value })}
          >
            <SelectTrigger className={`w-full ${errors.dealOwner ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select Owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.map((owner) => (
                <SelectItem key={owner.ROWID} value={owner.ROWID}>
                  {owner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.dealOwner && <div className="text-red-500 text-sm">{errors.dealOwner}</div>}
        </div>
        <div className="mb-3">
          <Label className="my-0">Insurance Lead Source</Label>
          <Select
            value={formData.insuranceLeadSource || ""}
            onValueChange={(value) => setFormData({ ...formData, insuranceLeadSource: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Source" />
            </SelectTrigger>
            <SelectContent>
              {insuranceLead.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">Currency</Label>
          <Select
            value={formData.currency || ""}
            onValueChange={(value) => setFormData({ ...formData, currency: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {currency.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Insurance Lead Lookup</Label>
          <Select
            value={formData.insuranceLeadLookup || ""}
            onValueChange={(value) => setFormData({ ...formData, insuranceLeadLookup: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Lead Lookup" />
            </SelectTrigger>
            <SelectContent>
              {leads.map((lead) => (
                <SelectItem key={lead.ROWID} value={lead.ROWID}>
                  {lead.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Type</Label>
          <Select
            value={formData.type || ""}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {type.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">Stage</Label>
          <Select
            value={formData.stage || ""}
            onValueChange={(value) => setFormData({ ...formData, stage: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Stage" />
            </SelectTrigger>
            <SelectContent>
              {stage.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <Label className="my-0">Contact Name <span className="text-red-500">*</span></Label>
          <Select
            value={formData.contactName || ""}
            onValueChange={(value) => setFormData({ ...formData, contactName: value })}
          >
            <SelectTrigger className={`w-full ${errors.contactName ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select Contact" />
            </SelectTrigger>
            <SelectContent>
              {contacts.map((contact) => (
                <SelectItem key={contact.ROWID} value={contact.ROWID}>
                  {contact.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contactName && <div className="text-red-500 text-sm">{errors.contactName}</div>}
        </div>
        <div className="mb-3">
          <Label className="my-0">Forecast Category</Label>
          <Select
            value={formData.forecastCategory || ""}
            onValueChange={(value) => setFormData({ ...formData, forecastCategory: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {forecastCategory.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">Location Name <span className="text-red-500">*</span></Label>
          <Select
            value={formData.locationName || ""}
            onValueChange={(value) => setFormData({ ...formData, locationName: value })}
          >
            <SelectTrigger className={`w-full ${errors.locationName ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.ROWID} value={location.ROWID}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.locationName && <div className="text-red-500 text-sm">{errors.locationName}</div>}
        </div>
        <div className="mb-3">
          <Label className="my-0">Insurance Lead <span className="text-red-500">*</span></Label>
          <Select
            value={formData.insuranceLead || ""}
            onValueChange={(value) => setFormData({ ...formData, insuranceLead: value })}
          >
            <SelectTrigger className={`w-full ${errors.insuranceLead ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select Lead" />
            </SelectTrigger>
            <SelectContent>
              {leads.map((lead) => (
                <SelectItem key={lead.ROWID} value={lead.ROWID}>
                  {lead.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.insuranceLead && <div className="text-red-500 text-sm">{errors.insuranceLead}</div>}
        </div>
        <div className="mb-3">
          <Label className="my-0">Exchange Rate</Label>
          <Input
            type="number"
            name="exchangeRate"
            value={formData.exchangeRate || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">PhoneBurner Follow Up Date</Label>
          <Input
            type="date"
            name="phoneBurnerFollowUpDate"
            value={formData.phoneBurnerFollowUpDate || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">Round Robin Assignment Time</Label>
          <Input
            type="datetime-local"
            name="roundRobinAssignmentTime"
            value={formData.roundRobinAssignmentTime || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label className="my-0">PhoneBurner Last Call Time</Label>
          <Input
            type="datetime-local"
            name="phoneBurnerLastCallTime"
            value={formData.phoneBurnerLastCallTime || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <Label className="my-0">PhoneBurner Last Call Outcome</Label>
          <Input
            type="text"
            name="phoneBurnerLastCallOutcome"
            value={formData.phoneBurnerLastCallOutcome || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reRunRoundRobin"
              checked={formData.reRunRoundRobin || false}
              onCheckedChange={(checked) => setFormData({ ...formData, reRunRoundRobin: checked })}
            />
            <Label htmlFor="reRunRoundRobin">Re-run round robin</Label>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex items-center space-x-2 h-full">
            <Checkbox
              id="emailRoundRobinOwner"
              checked={formData.emailRoundRobinOwner || false}
              onCheckedChange={(checked) => setFormData({ ...formData, emailRoundRobinOwner: checked })}
            />
            <Label htmlFor="emailRoundRobinOwner">Email Round Robin Owner</Label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ps-2">
        <div className="mb-3">
          <div className="flex items-center space-x-2 h-full">
            <Checkbox
              id="roundRobinProcessed"
              checked={formData.roundRobinProcessed || false}
              onCheckedChange={(checked) => setFormData({ ...formData, roundRobinProcessed: checked })}
            />
            <Label htmlFor="roundRobinProcessed">Round Robin Processed</Label>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="eligibleRoundRobinOwnerFound"
              checked={formData.eligibleRoundRobinOwnerFound || false}
              onCheckedChange={(checked) => setFormData({ ...formData, eligibleRoundRobinOwnerFound: checked })}
            />
            <Label htmlFor="eligibleRoundRobinOwnerFound">Eligible Round Robin Owner Found</Label>
          </div>
        </div>
        <div className="mb-3">
          {/* Empty */}
        </div>
      </div>
    </div>
  );
};

export default DealInformation;
