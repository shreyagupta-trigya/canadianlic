import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const PolicySearchDrawer = ({ isOpen, onClose, onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    policyName: '',
    clientName: '',
    policyStatus: '',
    policyType: '',
    advisorName: '',
    insuranceCompany: '',
    startDateFrom: null,
    startDateTo: null,
    renewalDateFrom: null,
    renewalDateTo: null,
    premiumMin: '',
    premiumMax: '',
    commissionMin: '',
    commissionMax: '',
    layout: '',
    showAdvanced: false
  });

  const handleInputChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    const payload = {
      ...searchCriteria,
      startDateFrom: searchCriteria.startDateFrom ? format(searchCriteria.startDateFrom, 'yyyy-MM-dd') : null,
      startDateTo: searchCriteria.startDateTo ? format(searchCriteria.startDateTo, 'yyyy-MM-dd') : null,
      renewalDateFrom: searchCriteria.renewalDateFrom ? format(searchCriteria.renewalDateFrom, 'yyyy-MM-dd') : null,
      renewalDateTo: searchCriteria.renewalDateTo ? format(searchCriteria.renewalDateTo, 'yyyy-MM-dd') : null,
    };
    onSearch(payload);
  };

  const handleReset = () => {
    setSearchCriteria({
      policyName: '',
      clientName: '',
      policyStatus: '',
      policyType: '',
      advisorName: '',
      insuranceCompany: '',
      startDateFrom: null,
      startDateTo: null,
      renewalDateFrom: null,
      renewalDateTo: null,
      premiumMin: '',
      premiumMax: '',
      commissionMin: '',
      commissionMax: '',
      layout: '',
      showAdvanced: false
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Search Policies</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {/* Basic Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="policyName">Policy Name</Label>
              <Input
                id="policyName"
                value={searchCriteria.policyName}
                onChange={(e) => handleInputChange('policyName', e.target.value)}
                placeholder="Enter policy name"
              />
            </div>
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={searchCriteria.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <Label htmlFor="policyStatus">Policy Status</Label>
              <Select value={searchCriteria.policyStatus} onValueChange={(value) => handleInputChange('policyStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="policyType">Policy Type</Label>
              <Select value={searchCriteria.policyType} onValueChange={(value) => handleInputChange('policyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="life">Life Insurance</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="auto">Auto Insurance</SelectItem>
                  <SelectItem value="home">Home Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="advisorName">Advisor Name</Label>
              <Input
                id="advisorName"
                value={searchCriteria.advisorName}
                onChange={(e) => handleInputChange('advisorName', e.target.value)}
                placeholder="Enter advisor name"
              />
            </div>
            <div>
              <Label htmlFor="insuranceCompany">Insurance Company</Label>
              <Input
                id="insuranceCompany"
                value={searchCriteria.insuranceCompany}
                onChange={(e) => handleInputChange('insuranceCompany', e.target.value)}
                placeholder="Enter insurance company"
              />
            </div>
          </div>

          {/* Advanced Search Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showAdvanced"
              checked={searchCriteria.showAdvanced}
              onCheckedChange={(checked) => handleInputChange('showAdvanced', checked)}
            />
            <Label htmlFor="showAdvanced">Show Advanced Search</Label>
          </div>

          {/* Advanced Search Fields */}
          {searchCriteria.showAdvanced && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium">Date Ranges</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Policy Start Date From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchCriteria.startDateFrom ? format(searchCriteria.startDateFrom, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchCriteria.startDateFrom}
                        onSelect={(date) => handleInputChange('startDateFrom', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Policy Start Date To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchCriteria.startDateTo ? format(searchCriteria.startDateTo, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchCriteria.startDateTo}
                        onSelect={(date) => handleInputChange('startDateTo', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Renewal Date From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchCriteria.renewalDateFrom ? format(searchCriteria.renewalDateFrom, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchCriteria.renewalDateFrom}
                        onSelect={(date) => handleInputChange('renewalDateFrom', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Renewal Date To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchCriteria.renewalDateTo ? format(searchCriteria.renewalDateTo, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchCriteria.renewalDateTo}
                        onSelect={(date) => handleInputChange('renewalDateTo', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <h4 className="font-medium">Premium & Commission Ranges</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="premiumMin">Minimum Premium</Label>
                  <Input
                    id="premiumMin"
                    type="number"
                    value={searchCriteria.premiumMin}
                    onChange={(e) => handleInputChange('premiumMin', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="premiumMax">Maximum Premium</Label>
                  <Input
                    id="premiumMax"
                    type="number"
                    value={searchCriteria.premiumMax}
                    onChange={(e) => handleInputChange('premiumMax', e.target.value)}
                    placeholder="10000"
                  />
                </div>
                <div>
                  <Label htmlFor="commissionMin">Minimum Commission</Label>
                  <Input
                    id="commissionMin"
                    type="number"
                    value={searchCriteria.commissionMin}
                    onChange={(e) => handleInputChange('commissionMin', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="commissionMax">Maximum Commission</Label>
                  <Input
                    id="commissionMax"
                    type="number"
                    value={searchCriteria.commissionMax}
                    onChange={(e) => handleInputChange('commissionMax', e.target.value)}
                    placeholder="5000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="layout">Layout</Label>
                <Select value={searchCriteria.layout} onValueChange={(value) => handleInputChange('layout', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="life">Life Insurance</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="rrsp">RRSP</SelectItem>
                    <SelectItem value="tfsa">TFSA</SelectItem>
                    <SelectItem value="resp">RESP</SelectItem>
                    <SelectItem value="visa">Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        <DrawerFooter>
          <Button onClick={handleSearch} className="mr-2">
            Search
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PolicySearchDrawer;
