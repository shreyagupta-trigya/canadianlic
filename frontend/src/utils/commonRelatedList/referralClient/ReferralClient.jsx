import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  Plus,
  Download,
  Filter,
  ChevronDown,
  Phone,
} from "lucide-react";

import {
  fetchReferralClients,
  createReferralClient,
} from "@/redux/slices/referralClient/referralClientSlice";

const ReferralClient = ({ leadId }) => {
  const dispatch = useDispatch();
  const { data: referralClients, loading, error } = useSelector((state) => state.referralClient);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    layout: 'Standard',
    firstName: '',
    lastName: '',
    locationName: '',
    email: '',
    phone: '',
  });
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (leadId && !referralClients.length) {
      dispatch(fetchReferralClients({ id: leadId }));
    }
  }, [leadId, dispatch, referralClients.length]);

  const handleSearch = (e) => {
    // Implement search logic
    console.log('Search:', e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        locationName: formData.locationName,
        email: formData.email,
        phone: formData.phone,
      };
      await dispatch(createReferralClient({ data, referralLeadId: leadId })).unwrap();
      toast.success("Referral Client Created Successfully");
      setFormData({
        layout: 'Standard',
        firstName: '',
        lastName: '',
        locationName: '',
        email: '',
        phone: '',
      });
      setIsDialogOpen(false);
      // Refetch the list after creation
      dispatch(fetchReferralClients({ id: leadId }));
    } catch (error) {
      toast.error("Failed to create referral client");
      console.error("Error creating referral client:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
      <div className="flex items-center justify-end mx-1 lg:mx-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-10 w-64"
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter />
                <span className="hidden lg:inline">Actions</span>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
              >
                <Plus />
                <span className="hidden lg:inline">Add New</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Contact</DialogTitle>
                <DialogDescription>
                  Add a new referral client to this lead.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="layout" className="text-right">
                    Layout
                  </Label>
                  <Select value={formData.layout} onValueChange={(value) => setFormData(prev => ({ ...prev, layout: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Option1">Option 1</SelectItem>
                      <SelectItem value="Option2">Option 2</SelectItem>
                      <SelectItem value="Option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="locationName" className="text-right">
                    Location Name
                  </Label>
                  <Input
                    id="locationName"
                    name="locationName"
                    value={formData.locationName}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSubmit}>
                  Save and Associate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>



      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Lead Created On</TableHead>
              <TableHead>Lead Converted On</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Insurance Lead Source</TableHead>
              <TableHead>Advisor's Licence Expiry</TableHead>
              <TableHead>Advisor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referralClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(client.id)}
                    onCheckedChange={() => handleCheckboxChange(client.id)}
                  />
                </TableCell>
                <TableCell>{client.leadCreatedOn}</TableCell>
                <TableCell>{client.leadCreatedOn}</TableCell>
                <TableCell>{client.firstName} {client.lastName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {client.mobile}
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                </TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.insuranceLeadSource}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReferralClient;
