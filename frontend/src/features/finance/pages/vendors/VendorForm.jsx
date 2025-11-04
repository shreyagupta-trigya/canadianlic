import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Globe, Upload } from "lucide-react";
import { FaSkype } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useState } from "react";
import { FaPlusCircle, FaEllipsisV, FaTimes } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function NewVendorForm() {
  const [showMore, setShowMore] = useState(false);
  const [track, setTrack] = useState(false);
  const [currency, setCurrency] = useState("kd");
  const [billing, setBilling] = useState({
    attention: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
  });
  const [shipping, setShipping] = useState({
    attention: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
  });
  const [rows, setRows] = useState([
    {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
    },
  ]);
  const companies = [
    { id: 1, name: "Acme Corporation" },
    { id: 2, name: "Globex Industries" },
    { id: 3, name: "Initech" },
    { id: 4, name: "Umbrella Corp" },
    { id: 5, name: "Wayne Enterprises" },
  ];
  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        workPhone: "",
        mobile: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleBillingChange = (field, value) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const copyBillingToShipping = () => {
    setShipping({ ...billing });
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="p-3 space-y-6 w-full">
  {/* Header Section */}
  <div className="flex items-center justify-between gap-3 w-full border-b pb-5">
    <h2 className="text-lg sm:text-xl font-semibold whitespace-nowrap">
      New Vendor
    </h2>
    <div className="flex items-center gap-2 sm:gap-4 text-sm text-blue-600 font-medium cursor-pointer">
      <div
        className="text-black dark:text-white
         text-xl cursor-pointer font-bold"
        onClick={() => {
          navigate(-1);
        }}
      >
        ✕
      </div>
    </div>
  </div>

  {/* Form Sections */}
  <div className="space-y-4 sm:space-y-6">
    {/* Primary Contact */}
    <div className="space-y-3 sm:space-y-0">
      <Label className="text-sm sm:text-base font-medium">Primary Contact</Label>
      <div className="flex flex-col lg:flex-row gap-2 lg:w-114 md:w-114 ">
        <div className="flex flex-col lg:flex-row md:flex-row gap-2 w-full">
          <Select>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Salutation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
              <SelectItem value="ms">Ms.</SelectItem>
            </SelectContent>
          </Select>
        
          <Input placeholder="First Name" className="w-full" />
          <Input placeholder="Last Name" className="w-full" />
        </div>
      </div>
    </div>

    {/* Company Name */}
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
      <Label className="text-sm sm:text-base font-medium whitespace-nowrap min-w-[120px]">
        Company Name
      </Label>
      <Select onValueChange={(value) => console.log(value)} className="w-full">
        <SelectTrigger className={"lg:w-80 md:w-80 w-full"}>
          <SelectValue placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.name}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Brand */}
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
      <Label className="text-sm sm:text-base font-medium whitespace-nowrap min-w-[120px]">
        Brand
      </Label>
      <Select onValueChange={(value) => console.log(value)} className="w-full">
        <SelectTrigger className={"lg:w-80 md:w-80 w-full"}>
          <SelectValue placeholder="Select Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="brand1">Brand 1</SelectItem>
          <SelectItem value="brand2">Brand 2</SelectItem>
          <SelectItem value="brand3">Brand 3</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Display Name */}
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
      <Label className="text-red-500 whitespace-nowrap min-w-[120px] text-sm sm:text-base">
        Display Name*
      </Label>
      <Select className="w-full">
         <SelectTrigger className={"lg:w-80 md:w-80 w-full"}>
          <SelectValue placeholder="Select or type to add" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="company1">Company 1</SelectItem>
          <SelectItem value="company2">Company 2</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Email Address */}
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:w-114 md:w-114 items-start sm:items-center">
      <Label className="whitespace-nowrap min-w-[120px] text-sm sm:text-base">Email Address</Label>
      <Input type="email" placeholder="Email" className="w-full" />
    </div>

    {/* Vendor Number */}
    <div className="flex flex-col sm:flex-row gap-2 lg:w-114 md:w-114  sm:gap-4 items-start sm:items-center">
      <Label className="text-red-500 whitespace-nowrap min-w-[120px] text-sm sm:text-base">
        Vendor Number*
      </Label>
      <Input defaultValue="ION-V-1526" className="w-full" />
    </div>

    {/* Phone Numbers */}
    <div className="space-y-3 sm:space-y-0 lg:w-114 md:w-114 ">
      <Label className="text-sm sm:text-base font-medium">Phone Numbers</Label>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input type="number" placeholder="Work Phone" className="w-full" />
        </div>
        <div className="flex-1">
          <Input type="number" placeholder="Mobile" className="w-full" />
        </div>
      </div>
    </div>
  </div>

  {/* Tabs Section */}
  <Tabs defaultValue="other">
    <TabsList className="w-full  overflow-x-auto flex flex-nowrap justify-start sm:justify-center">
      <TabsTrigger value="other" className="whitespace-nowrap text-xs sm:text-sm px-3 py-2">
        Other Details
      </TabsTrigger>
      <TabsTrigger value="address" className="whitespace-nowrap text-xs sm:text-sm px-3 py-2">
        Address
      </TabsTrigger>
      <TabsTrigger value="contacts" className="whitespace-nowrap text-xs sm:text-sm px-3 py-2">
        Contact Persons
      </TabsTrigger>
      <TabsTrigger value="remarks" className="whitespace-nowrap text-xs sm:text-sm px-3 py-2">
        Remarks
      </TabsTrigger>
    </TabsList>
    
    <hr className="my-4" />
    
    {/* Other Details Tab */}
    <TabsContent value="other">
      <div className="space-y-4 sm:space-y-6">
        {/* Currency */}
        <div className="flex flex-col sm:flex-row gap-5  items-start sm:items-center">
          <Label className="whitespace-nowrap min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
            Currency
          </Label>
          <Select value={currency} onValueChange={(value) => setCurrency(value)} className="w-full sm:max-w-[320px]">
             <SelectTrigger className={"lg:w-80 md:w-80 w-full"}>
              <SelectValue placeholder="USD - United States Dollar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD - United States Dollar</SelectItem>
              <SelectItem value="kd">KD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Accounts Payable */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <Label className="whitespace-nowrap min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
            Accounts Payable
          </Label>
          <Select >
             <SelectTrigger className={"lg:w-80 md:w-80 w-full"}>
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="account1">Account 1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Opening Balance */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <Label className="whitespace-nowrap min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
            Opening Balance
          </Label>
          <div className="w-full sm:max-w-[320px]">
            <div className="flex items-center border rounded-md overflow-hidden w-full">
              <span className="text-sm text-gray-700 border-r  min-w-[80px]">
                <Select value={currency} onValueChange={(value) => setCurrency(value)}>
                  <SelectTrigger className="border-0 shadow-none focus:ring-0 focus:outline-none w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem defaultValue value="kd">KD</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
              </span>
              <Input type="text" className="border-none flex-1 outline-none" placeholder="0.00" />
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <Label className="whitespace-nowrap min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
            Payment Terms
          </Label>
          <Select >
             <SelectTrigger className={"lg:w-80 md:w-80 w-full"}>
              <SelectValue placeholder="Due on Receipt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="due">Due on Receipt</SelectItem>
              <SelectItem value="net30">Net 30</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Portal Language */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <Label className="whitespace-nowrap min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
            Portal Language
          </Label>
          <Select >
             <SelectTrigger className={"lg:w-80 md:w-80 w-full"}>
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Documents */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <Label className="whitespace-nowrap min-w-[100px] sm:min-w-[120px] text-sm sm:text-base">
            Documents
          </Label>
          <div className="w-full sm:max-w-[320px]">
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center sm:text-left">
              You can upload a maximum of 10 files, 10MB each
            </p>
          </div>
        </div>

        {/* Show More Details */}
        <div className="mt-6">
          <Button
            variant="link"
            onClick={() => setShowMore((prev) => !prev)}
            className="text-blue-600 p-0 text-sm sm:text-base"
          >
            {showMore ? "Hide Details" : "Show More Detail"}
          </Button>
          {showMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Globe className="mx-2 h-4 w-4 text-gray-500" />
                  <Input placeholder="ex: www.zylker.com" className="border-0 focus:ring-0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Designation</label>
                <Input />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter</label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <BsTwitterX className="mx-2 h-4 w-4 text-gray-500" />
                  <Input className="border-0 focus:ring-0" />
                </div>
                <span className="text-xs text-gray-500">http://www.twitter.com/</span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Skype Name/Number</label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <FaSkype className="mx-2 h-4 w-4 text-blue-400" />
                  <Input className="border-0 focus:ring-0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Facebook</label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Facebook className="mx-2 h-4 w-4 text-blue-600" />
                  <Input className="border-0 focus:ring-0" />
                </div>
                <span className="text-xs text-gray-500">http://www.facebook.com/</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </TabsContent>

    {/* Address Tab */}
    <TabsContent value="address">
      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">Billing Address</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Attention</label>
                <Input
                  value={billing.attention}
                  onChange={(e) => handleBillingChange("attention", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Country/Region<span className="text-red-700 ml-1">*</span>
                </label>
                <Select onValueChange={(value) => handleBillingChange("country", value)}>
                  <SelectTrigger className={"lg:w-full md:w-full w-full"}>
                    <SelectValue placeholder="Select or type to add" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Address</label>
                <Textarea
                  value={billing.street1}
                  onChange={(e) => handleBillingChange("street1", e.target.value)}
                  placeholder="Street 1"
                  rows={2}
                />
                <Textarea
                  value={billing.street2}
                  onChange={(e) => handleBillingChange("street2", e.target.value)}
                  placeholder="Street 2"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">City</label>
                  <Input
                    value={billing.city}
                    onChange={(e) => handleBillingChange("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">State</label>
                  <Select onValueChange={(value) => handleBillingChange("state", value)}>
                     <SelectTrigger className={"lg:w-full md:w-full w-full"}>
                      <SelectValue placeholder="Select or type to add" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">ZIP Code</label>
                  <Input
                    type="number"
                    value={billing.zip}
                    onChange={(e) => handleBillingChange("zip", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Phone</label>
                  <Input
                    type="number"
                    value={billing.phone}
                    onChange={(e) => handleBillingChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Fax Number</label>
                <Input
                  value={billing.fax}
                  onChange={(e) => handleBillingChange("fax", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">
              Shipping Address{" "}
              <button
                onClick={copyBillingToShipping}
                className="text-blue-600 text-sm underline ml-2"
              >
                ( ↓ Copy billing address )
              </button>
            </h3>
            <div className="space-y-4">
              {/* Shipping address fields with same structure as billing */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Attention</label>
                <Input
                  value={shipping.attention}
                  onChange={(e) => handleShippingChange("attention", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Country/Region<span className="text-red-700 ml-1">*</span>
                </label>
                <Select onValueChange={(value) => handleShippingChange("country", value)}>
                   <SelectTrigger className={"lg:w-full md:w-full w-full"}>
                    <SelectValue placeholder="Select or type to add" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Address</label>
                <Textarea
                  value={shipping.street1}
                  onChange={(e) => handleShippingChange("street1", e.target.value)}
                  placeholder="Street 1"
                  rows={2}
                />
                <Textarea
                  value={shipping.street2}
                  onChange={(e) => handleShippingChange("street2", e.target.value)}
                  placeholder="Street 2"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">City</label>
                  <Input
                    value={shipping.city}
                    onChange={(e) => handleShippingChange("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">State</label>
                  <Select onValueChange={(value) => handleShippingChange("state", value)}>
                     <SelectTrigger className={"lg:w-full md:w-full w-full"}>
                      <SelectValue placeholder="Select or type to add" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">ZIP Code</label>
                  <Input
                    value={shipping.zip}
                    onChange={(e) => handleShippingChange("zip", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Phone</label>
                  <Input
                    type="number"
                    value={shipping.phone}
                    onChange={(e) => handleShippingChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Fax Number</label>
                <Input
                  value={shipping.fax}
                  onChange={(e) => handleShippingChange("fax", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div className="mt-6 text-sm text-gray-700 border-l-4 border-yellow-400 pl-4 py-2">
          <p className="font-semibold">Note:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Add and manage additional addresses from this Customers and Vendors details section.
            </li>
            <li>
              You can customise how customers' addresses are displayed in transaction PDFs. To do this, go to{" "}
              <strong>Settings &gt; Preferences &gt; Customers and Vendors</strong>, and navigate to the Address Format sections.
            </li>
          </ul>
        </div>
      </div>
    </TabsContent>

    {/* Contacts Tab */}
    <TabsContent value="contacts">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="border px-3 py-2 text-left">SALUTATION</th>
                  <th className="border px-3 py-2 text-left">FIRST NAME</th>
                  <th className="border px-3 py-2 text-left">LAST NAME</th>
                  <th className="border px-3 py-2 text-left">EMAIL</th>
                  <th className="border px-3 py-2 text-left">WORK PHONE</th>
                  <th className="border px-3 py-2 text-left">MOBILE</th>
                  {showMore && (
                    <>
                      <th className="border px-3 py-2 text-left">SKYPE</th>
                      <th className="border px-3 py-2 text-left">DESIGNATION</th>
                      <th className="border px-3 py-2 text-left">DEPARTMENT</th>
                    </>
                  )}
                  <th className="border px-3 py-2 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <Select
                        value={row.salutation}
                        onValueChange={(value) => handleChange(index, "salutation", value)}
                      >
                        <SelectTrigger className="w-full min-w-[80px]">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border p-2">
                      <Input
                        value={row.firstName}
                        onChange={(e) => handleChange(index, "firstName", e.target.value)}
                        className="w-full min-w-[100px] border-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        value={row.lastName}
                        onChange={(e) => handleChange(index, "lastName", e.target.value)}
                        className="w-full min-w-[100px] border-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="email"
                        value={row.email}
                        onChange={(e) => handleChange(index, "email", e.target.value)}
                        className="w-full min-w-[150px] border-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        value={row.workPhone}
                        onChange={(e) => handleChange(index, "workPhone", e.target.value)}
                        className="w-full min-w-[120px] border-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        value={row.mobile}
                        onChange={(e) => handleChange(index, "mobile", e.target.value)}
                        className="w-full min-w-[120px] border-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    {showMore && (
                      <>
                        <td className="border p-2">
                          <Input
                            value={row.skype}
                            onChange={(e) => handleChange(index, "skype", e.target.value)}
                            className="w-full min-w-[120px] border-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="border p-2">
                          <Input
                            value={row.designation}
                            onChange={(e) => handleChange(index, "designation", e.target.value)}
                            className="w-full min-w-[120px] border-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="border p-2">
                          <Input
                            value={row.department}
                            onChange={(e) => handleChange(index, "department", e.target.value)}
                            className="w-full min-w-[120px] border-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                      </>
                    )}
                    <td className="border p-2">
                      <div className="flex justify-center items-center gap-2">
                        <FaEllipsisV
                          className="text-gray-500 cursor-pointer"
                          onClick={() => setShowMore(!showMore)}
                        />
                        <FaTimes
                          className="text-red-500 cursor-pointer"
                          onClick={() => removeRow(index)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 w-full sm:w-auto"
          onClick={addRow}
        >
          <FaPlusCircle />
          Add Contact Person
        </Button>
      </div>
    </TabsContent>

    {/* Remarks Tab */}
    <TabsContent value="remarks">
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Remark <span className="text-gray-500">(for external use)</span>
        </label>
        <Textarea className="w-full border" rows={4} placeholder="Enter remarks here..."></Textarea>
      </div>
    </TabsContent>
  </Tabs>

  {/* Action Buttons */}
  <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t">
    <Button
      className="w-full sm:w-auto order-2 sm:order-1"
      onClick={() => navigate(-1)}
      variant="outline"
    >
      Cancel
    </Button>
    <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 order-1 sm:order-2" variant="default">
      Save
    </Button>
  </div>
</div>
    </>
  );
}
