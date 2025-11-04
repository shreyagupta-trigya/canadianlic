import { Plus, PlusCircle, Settings, Upload } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

import { Info, AlertTriangle } from "lucide-react";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const OrganizationProfile = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    businessType: "",
    industry: "",
    location: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zip: "",
    state: "",
    phone: "",
    fax: "",
    website: "",
  });
  const [differentAddress, setDifferentAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [reportBasis, setReportBasis] = useState("accrual");
  const [companyIdType, setCompanyIdType] = useState("");
  const [companyIdValue, setCompanyIdValue] = useState("");
  const [taxIdType, setTaxIdType] = useState("");
  const [taxIdValue, setTaxIdValue] = useState("");
  const [open, setOpen] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([
    { id: 1, label: "", value: "" },
  ]);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleDelete = () => setImage(null);

  const addNewField = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: Date.now(), label: "", value: "" },
    ]);
  };
  const save = () => {
    alert("Successfully Saved By You");
  };
  const removeField = (id) => {
    if (additionalFields.length > 1) {
      setAdditionalFields(additionalFields.filter((field) => field.id !== id));
    }
  };

  const updateField = (id, field, value) => {
    setAdditionalFields(
      additionalFields.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <>
      <div className="w-full border-b flex items-center gap-2 py-3  px-4  ">
        <h2 className="font-semibold mb-2 text-xl">Organization Profile </h2>
        <h2 className="border p-1 px-3 bg-gray-100  rounded-4xl">
          ID: 804456193
        </h2>
      </div>
      <div className="px-4">
        {/* <div className="p-3 px-4 border mt-5 flex gap-2 bg-green-50 rounded-xl text-sm">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p>
            You have the same organization in Zoho Billing, Zoho Expense, Zoho
            Inventory, Zoho Commerce, Zoho Checkout. Altering any information on
            this page will alter it there.
          </p>
        </div> */}
        <div className="mt-4">
          Organization Logo
          <div className="my-4 flex gap-10 border-b pb-10 ">
            <div>
              {image ? (
                <div className="relative w-70 object-cover h-32 border rounded-lg overflow-hidden">
                  <img
                    src={image.preview}
                    alt="logo"
                    className="object-cover w-full h-full"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    className="absolute cursor-pointer top-1 right-1"
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <Label
                  htmlFor="UploadFile"
                  className="border border-dashed rounded-md py-8 cursor-pointer px-5 w-70 whitespace-nowrap text-sm hover:border-blue-500 flex gap-3 items-center"
                >
                  <Upload size={20} /> Upload Your Organization Logo
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    id="UploadFile"
                    className="hidden"
                  />
                </Label>
              )}

              {/* <div className="flex gap-4 flex-wrap"></div> */}
            </div>
            <div className="text-sm">
              <p>
                This logo will be displayed in transaction PDFs and email
                notifications.
              </p>
              <span className="text-gray-400">
                <p>Preferred Image Dimensions: 240 x 240 pixels @ 72 DPI</p>
                <p>Supported Files: jpg, jpeg, png, gif, bmp</p>
                <p>Maximum File Size: 1MB</p>
              </span>
            </div>
          </div>
        </div>
        <form className="space-y-6  border-b pb-6">
          {/* Organization Name */}
          <div className="flex flex-row w-120 gap-11 whitespace-nowrap justify-between">
            <Label htmlFor="orgName  ">
              <span className="text-red-500">
                Organization Name <span className="text-red-500">*</span>
              </span>
            </Label>
            <Input
              id="orgName"
              value={formData.orgName}
              onChange={(e) =>
                setFormData({ ...formData, orgName: e.target.value })
              }
              placeholder="Enter organization name"
            />
          </div>

          {/* Business Type */}
          <div className="flex flex-row w-120 gap-10 whitespace-nowrap justify-between">
            <Label htmlFor="businessType">Business Type</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, businessType: value })
              }
            >
              <SelectTrigger className="w-75">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Industry */}
          <div className="flex flex-row w-120 gap-10 whitespace-nowrap justify-between">
            <Label htmlFor="industry">
              <span className="text-red-500">Industry *</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, industry: value })
              }
            >
              <SelectTrigger className={"w-75"}>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">
                  Information Technology and Services
                </SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="flex flex-row w-120 gap-6 whitespace-nowrap justify-between">
            <Label htmlFor="location">
              <span className="text-red-500"> Organization Location *</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, location: value })
              }
            >
              <SelectTrigger className="w-120">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">U.S.A</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="flex flex-row w-120 gap-10 whitespace-nowrap justify-between">
            <Label htmlFor="address">Organization Address</Label>

            <Input
              id="address"
              value={formData.addressLine1}
              onChange={(e) =>
                setFormData({ ...formData, addressLine1: e.target.value })
              }
              placeholder="Street, Building"
            />
          </div>
          <div className="w-76 ml-44 mt-[-14px] ">
            <Input
              className={""}
              placeholder="Area / Locality"
              value={formData.addressLine2}
              onChange={(e) =>
                setFormData({ ...formData, addressLine2: e.target.value })
              }
            />
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="City"
                value={formData.city}
                className={"w-45"}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <Input
                placeholder="Zip Code"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
              />
            </div>
            <div className="mt-2 flex gap-2 ">
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="in">Indiana</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <Input
              placeholder="Fax Number"
              value={formData.fax}
              className={"mt-3"}
              onChange={(e) =>
                setFormData({ ...formData, fax: e.target.value })
              }
            />
          </div>
          <div className="w-76 ml-44 mt-[-10px] text-xs">
            <p>Organization Address Format </p>
          </div>
          {/* Website */}
          <div className="flex flex-row w-120 gap-23 whitespace-nowrap justify-between">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
            />
          </div>

      
        </form>
        <div className="space-y-6 mt-3">
          {/* Info cards row */}
          <h2 className="mb-2"> Primary Contact</h2>

         

          {/* Warning / Alert */}
          {/* <Alert variant="destructive" className="bg-orange-50 border-orange-300 text-orange-800">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your primary contact’s email address belongs to an unauthenticated
        domain. So, emails will be sent from
        <span className="font-medium"> message-service@sender.zoho books.com </span>
        to prevent them from landing in the Spam folder. Authenticate the
        domain to send emails from your primary contact’s email address.
        <a href="#" className="text-blue-600 underline ml-1">
          Authenticate Now
        </a>
      </AlertDescription>
    </Alert> */}
          {/* Form fields */}
          <div className="space-y-5">
            {/* Base Currency */}
            <div className="flex items-center gap-4">
              <Label className="w-40">Base Currency</Label>
              <span className="flex gap-4 items-center">
                <Select defaultValue="USD">
                  <SelectTrigger className="w-[310px]">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
                <Settings
                  size={20}
                  onClick={() => setOpen(true)}
                  className="text-blue-400 cursor-pointer"
                />
              </span>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Currency</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-red-500">Currency Code*</Label>
                    <Input
                      defaultValue="USD"
                      readOnly
                      className={"mt-2 bg-gray-100"}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-red-500">Currency Symbol*</Label>
                    <Input defaultValue="$" className={"mt-2"} />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-red-500">Currency Name*</Label>
                    <Input
                      defaultValue="United States Dollar"
                      className={"mt-2"}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>Decimal Places</Label>
                    <Select>
                      <SelectTrigger className={"w-full mt-2"}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Format</Label>
                    <Select>
                      <SelectTrigger className={"w-full mt-2"}>
                        <SelectValue placeholder="Select Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">1,234,567.89</SelectItem>
                        <SelectItem value="eu">1.234.567,89</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Fiscal Year */}
            <div className="flex items-center gap-4">
              <Label className="w-40">Fiscal Year</Label>
              <Select defaultValue="jan-dec">
                <SelectTrigger className="w-[310px]">
                  <SelectValue placeholder="Select Fiscal Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-dec">January - December</SelectItem>
                  <SelectItem value="apr-mar">April - March</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Zone */}
            <div className="flex items-center gap-4">
              <Label className="w-40">Time Zone</Label>
              <Select defaultValue="pst">
                <SelectTrigger className="w-[310px]">
                  <SelectValue placeholder="Select Time Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">
                    (GMT -8:00) Pacific Daylight Time (PST)
                  </SelectItem>
                  <SelectItem value="est">
                    (GMT -5:00) Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value="ist">
                    (GMT +5:30) India Standard Time (IST)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Format */}
            <div className="flex items-center gap-4">
              <Label className="w-40">Date Format</Label>
              <Select defaultValue="dd-mmm-yyyy">
                <SelectTrigger className="w-[310px]">
                  <SelectValue placeholder="Select Date Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mmm-yyyy">
                    dd MMM yyyy [08 Sep 2025]
                  </SelectItem>
                  <SelectItem value="mm-dd-yyyy">
                    MM/dd/yyyy [09/08/2025]
                  </SelectItem>
                  <SelectItem value="yyyy-mm-dd">
                    yyyy-MM-dd [2025-09-08]
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Company ID */}

        <div className="flex justify-between w-122 ">
          <Label className="text-sm font-medium">Company ID</Label>
          <div className="flex gap-1 mt-3">
            <Select
              value={companyIdType}
              onValueChange={setCompanyIdType}
              className=" "
            >
              <SelectTrigger className={"w-31 text-sm"}>
                <SelectValue placeholder="Company id :" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Company id :</SelectItem>
                <SelectItem value="ACN">ACN</SelectItem>
                <SelectItem value="BN">BN</SelectItem>
                <SelectItem value="CN">CN</SelectItem>
                <SelectItem value="CPR">CPR</SelectItem>
                <SelectItem value="CVR">CVR</SelectItem>
                <SelectItem value="DIW">DIW</SelectItem>
                <SelectItem value="KT">KT</SelectItem>
                <SelectItem value="ORG">ORG</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={companyIdValue}
              onChange={(e) => setCompanyIdValue(e.target.value)}
              placeholder="Enter Company ID"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full border-t p-2 bg-gray-50 mt-2 flex gap-5">
        <div
          onClick={save}
          className="border p-2 cursor-pointer rounded-md px-4"
        >
          Save{" "}
        </div>
        <div className="border p-2 cursor-pointer rounded-md px-4">Cancel</div>
      </div>
    </>
  );
};

export default OrganizationProfile;
