import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormCard,
  FormField,
  FormSubHeading,
} from "@/components/custom/CustomFormComponents";
import {
  EditableField,
  EditableSelectField,
} from "@/components/custom/GeneralCustomComponents";
import {
  Bold,
  Italic,
  Underline,
  Trash2,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Plus,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  accountType,
  contactNameOptions,
  contactRole,
  currecy,
  industry,
  leadOwner,
  segment,
} from "@/features/utils/ListViewMenu";
import { updateAccountInList } from "@/redux/slices/accounts/accountSlice";
import { updateAccount } from "@/services/crm/accountsApis";
import { ChevronDown } from "lucide-react";

import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Mail from "./Mail";
import { Separator } from "@radix-ui/react-dropdown-menu";
import SmartAnalysis from "./Swot";
import { Input } from "@headlessui/react";
import AccountContacts from "./relatedList/accountContact/AccountContacts";
import AccountOpportunity from "./relatedList/accountOpportunity/AccountOpportunity";
import AccountActivityList from "./relatedList/accountActivity/AccountActivityList";

const AccountsDetailsView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const details = location.state;
   const [activeTab, setActiveTab] = useState("overview"); 

  const [industryName, setIndustryName] = useState(
    details?.industry ? details.industry : "N/A"
  );
  const [formData, setFormData] = useState({
    accountOwner: "",
    phone: "",
    accountName: "",
    website: "",
    accountType: "",
    exchangeRate: "",
    industry: "",
    currency: "",
    paymentTerms: "",
    billingStreet: "",
    shipToAddress: "",
    billingCity: "",
    billingState: "",
    billingCode: "",
    billingCountry: "",
    jobName: "",
    coCustomer: "",
    contact: "",
    contactPhoneNumber: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
    shippingCountry: "",
    description: "",
  });

  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInvoiceExpanded, setIsInvoiceExpanded] = useState(false);
  const [isSalesExpanded, setIsSalesExpanded] = useState(false);
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState("all");
  const [salesStatus, setSalesStatus] = useState("all");
  const [quoteStatus, setQuoteStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [stakeholders, setStakeholders] = useState([
    {
      contact: "",
      jobTitle: "",
      buyingInfluence: "",
      relationshipStrength: "",
    },
  ]);
  const [actions, setActions] = useState([
    { keyAction: "", dueDate: "", expectedOutcome: "" },
  ]);

  // Handlers for Stakeholders
  const addStakeholder = () =>
    setStakeholders([
      ...stakeholders,
      {
        contact: "",
        jobTitle: "",
        buyingInfluence: "",
        relationshipStrength: "",
      },
    ]);

  const deleteStakeholder = (index) =>
    setStakeholders(stakeholders.filter((_, i) => i !== index));

  const handleStakeholderChange = (index, field, value) => {
    const updated = [...stakeholders];
    updated[index][field] = value;
    setStakeholders(updated);
  };

  // Handlers for Actions
  const addAction = () =>
    setActions([
      ...actions,
      { keyAction: "", dueDate: "", expectedOutcome: "" },
    ]);

  const deleteAction = (index) =>
    setActions(actions.filter((_, i) => i !== index));

  const handleActionChange = (index, field, value) => {
    const updated = [...actions];
    updated[index][field] = value;
    setActions(updated);
  };
  const navigate = useNavigate();

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "trigya.demo5inn",
      time: "11 SEP 2025 08:14 AM",
      text: "dfdfdfdfdfdfdfefdfdfdfdfdfdfdfdfd",
    },
    {
      id: 2,
      user: "trigya.demo5inn",
      time: "11 SEP 2025 08:14 AM",
      text: "sdsdsd",
    },
  ]);

  // Original data
  const invoicesData = [
    {
      date: "08 Mar 2025",
      invoiceNumber: "INV-000159",
      orderNumber: "SO-00131",
      amount: "$3,593.10",
      balanceDue: "$3,593.10",
      status: "Overdue",
      statusColor: "text-red-500",
    },
    {
      date: "07 Mar 2025",
      invoiceNumber: "INV-000158",
      orderNumber: "SO-00128",
      amount: "$12.98",
      balanceDue: "$12.98",
      status: "Draft",
      statusColor: "text-gray-500",
    },
    {
      date: "23 Nov 2024",
      invoiceNumber: "INV-000123",
      orderNumber: "SO-00047",
      amount: "$10.00",
      balanceDue: "$10.00",
      status: "Approved",
      statusColor: "text-green-500",
    },
    {
      date: "06 Jul 2023",
      invoiceNumber: "HR-80/23-24",
      orderNumber: "-",
      amount: "$25,712.93",
      balanceDue: "$25,712.93",
      status: "Overdue",
      statusColor: "text-red-500",
    },
  ];

  const salesOrdersData = [
    {
      salesOrder: "SO-00131",
      reference: "-",
      date: "08 Mar 2025",
      shipmentDate: "-",
      amount: "$3,593.10",
      status: "Closed",
      statusColor: "text-green-600",
    },
    {
      salesOrder: "SO-00128",
      reference: "-",
      date: "07 Mar 2025",
      shipmentDate: "-",
      amount: "$12.98",
      status: "Closed",
      statusColor: "text-green-600",
    },
    {
      salesOrder: "SO-00124",
      reference: "-",
      date: "28 Feb 2025",
      shipmentDate: "-",
      amount: "$123.90",
      status: "Confirmed",
      statusColor: "text-blue-600",
    },
    {
      salesOrder: "SO-00123",
      reference: "-",
      date: "28 Feb 2025",
      shipmentDate: "-",
      amount: "$105.00",
      status: "Confirmed",
      statusColor: "text-blue-600",
    },
    {
      salesOrder: "SO-00047",
      reference: "-",
      date: "23 Nov 2024",
      shipmentDate: "-",
      amount: "$12.00",
      status: "Confirmed",
      statusColor: "text-blue-600",
    },
  ];

  const quotesData = [
    {
      date: "08 Mar 2025",
      quoteNumber: "SO-00131",
      reference: "-",
      amount: "$3,593.10",
      status: "Closed",
      statusColor: "text-green-600",
    },
    {
      date: "07 Mar 2025",
      quoteNumber: "SO-00128",
      reference: "-",
      amount: "$12.98",
      status: "Closed",
      statusColor: "text-green-600",
    },
    {
      date: "28 Feb 2025",
      quoteNumber: "SO-00124",
      reference: "-",
      amount: "$123.90",
      status: "Confirmed",
      statusColor: "text-blue-600",
    },
  ];

  const deliveryChallanData = [
    {
      date: "08 Mar 2025",
      location: "Mumbai Warehouse",
      deliveryChallan: "DC-00021",
      reference: "REF-00021",
      customer: "ABC Pvt Ltd",
      amount: "$1,200.00",
      status: "Delivered",
      statusColor: "text-green-600",
    },
    {
      date: "07 Mar 2025",
      location: "New Delhi Warehouse",
      deliveryChallan: "DC-00018",
      reference: "REF-00018",
      customer: "XYZ Enterprises",
      amount: "$420.50",
      status: "In Transit",
      statusColor: "text-blue-600",
    },
    {
      date: "23 Nov 2024",
      location: "Chennai Hub",
      deliveryChallan: "DC-00005",
      reference: "REF-00005",
      customer: "MNO Traders",
      amount: "$12.00",
      status: "Pending",
      statusColor: "text-yellow-600",
    },
  ];
  // State for filtered data
  const [filteredInvoices, setFilteredInvoices] = useState(invoicesData);
  const [filteredSalesOrders, setFilteredSalesOrders] =
    useState(salesOrdersData);
  const [filteredQuotes, setFilteredQuotes] = useState(quotesData);
  const [filteredDeliveryChallans, setFilteredDeliveryChallans] =
    useState(deliveryChallanData);
  const [isDeliveryExpanded, setIsDeliveryExpanded] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState("all");

  const [newComment, setNewComment] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const SwotCard = ({ title, color, items }) => {
    const [list, setList] = useState(items);

    const handleChange = (index, value) => {
      const updated = [...list];
      updated[index] = value;
      setList(updated);
    };

    const addNew = () => {
      setList([...list, ""]);
    };

    return (
      <div className="bg-white shadow-md rounded-lg p-4 border">
        <h2 className={`text-lg font-bold mb-3 ${color}`}>{title}</h2>
        <div className="flex flex-col gap-2">
          {list.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(i, e.target.value)}
                className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            onClick={addNew}
            className="mt-2 text-xs px-2 py-1 border rounded hover:bg-gray-100 w-fit"
          >
            + Add Point
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (details) {
      const { employees, ...rest } = details; // remove employees
      setFormData(rest); // prefill without employees
    }
  }, [details]);

  // Filter invoices when status changes
  useEffect(() => {
    if (invoiceStatus === "all") {
      setFilteredInvoices(invoicesData);
    } else {
      setFilteredInvoices(
        invoicesData.filter(
          (invoice) =>
            invoice.status.toLowerCase() === invoiceStatus.toLowerCase()
        )
      );
    }
  }, [invoiceStatus]);

  // Filter sales orders when status changes
  useEffect(() => {
    if (salesStatus === "all") {
      setFilteredSalesOrders(salesOrdersData);
    } else {
      setFilteredSalesOrders(
        salesOrdersData.filter(
          (order) => order.status.toLowerCase() === salesStatus.toLowerCase()
        )
      );
    }
  }, [salesStatus]);
  // Filter quotes when status changes
  useEffect(() => {
    if (quoteStatus === "all") {
      setFilteredQuotes(quotesData);
    } else {
      setFilteredQuotes(
        quotesData.filter(
          (quote) => quote.status.toLowerCase() === quoteStatus.toLowerCase()
        )
      );
    }
  }, [quoteStatus]);
  useEffect(() => {
    if (deliveryStatus === "all") {
      setFilteredDeliveryChallans(deliveryChallanData);
    } else {
      setFilteredDeliveryChallans(
        deliveryChallanData.filter(
          (dc) => dc.status.toLowerCase() === deliveryStatus.toLowerCase()
        )
      );
    }
  }, [deliveryStatus]);
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name == "industry") setIndustryName(value);
    !showUpdateBtn && setShowUpdateBtn(true);
  };
  const handleClearChanges = () => {
    setFormData(details);
    setIndustryName(details.industry ? details.industry : "");
    setShowUpdateBtn(false);
    setIsDisabled(true);
  };
  const handleUpdate = () => {
    setLoading(true);
    updateAccount(formData, details.ROWID)
      .then((res) => {
        if (res.data.success) {
          toast.success("Account Updated Successfully");
          dispatch(updateAccountInList({ ...formData, ROWID: details.ROWID }));
          setShowUpdateBtn(false);
          setIsDisabled(true);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Error Occured during the Account Updation!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
 const handleAddComment = () => {
  if (!newComment.trim()) return;

  const newItem = {
    id: Date.now(),
    user: "trigya.demo5inn",
    time: new Date().toLocaleString(),
    text: newComment,
  };
  setComments([...comments, newItem]);
  setNewComment(""); 
  const editableDiv = document.querySelector(
    '[contenteditable="true"]'
  );
  if (editableDiv) editableDiv.innerHTML = "";
};
  const handleDelete = () => {
    setComments(comments.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };
  const toggleInvoice = () => setIsInvoiceExpanded(!isInvoiceExpanded);
  const toggleSales = () => setIsSalesExpanded(!isSalesExpanded);
  const toggleQuote = () => setIsQuoteExpanded(!isQuoteExpanded);
  return (
    <Tabs
      value={activeTab}
     onValueChange={setActiveTab}
      className="w-full flex-col justify-start gap-1 pt-3"
    >
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-card/90 backdrop-blur-sm border-0 flex items-center justify-between px-1 lg:px-1">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select 
         value={activeTab} 
         onValueChange={setActiveTab} 
        >
          <SelectTrigger
            className="flex w-fit lg:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview</SelectItem>
            {/* <SelectItem value="comments">Comments</SelectItem> */}
            <SelectItem value="transactions">Transactions</SelectItem>
            <SelectItem value="contacts">Contacts</SelectItem>
            <SelectItem value="opportunity">Opportunity</SelectItem>
            <SelectItem value="smartAnalysis">Smart Ananlysis</SelectItem>
            <SelectItem value="activity">Tasks</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="comments">Comments</TabsTrigger> */}
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
          <TabsTrigger value="smartAnalysis">Smart Ananlysis</TabsTrigger>
          <TabsTrigger value="activity">Tasks</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <div className="flex items-right gap-2"></div>
      </div>
      <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
        <div className="aspect-video w-full flex-1 rounded-lg">
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Account Name</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                  {details?.accountName ? details.accountName : "Company Name"}
                </CardTitle>
              </CardHeader>
            </Card>
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription>Insustry</CardDescription>
                  <CardTitle className="text-2xl font-semibold flex tabular-nums @[250px]/card:text-2xl">
                    <Badge
                      title={industryName}
                      className="bg-blue-400 max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis inline-flex"
                    >
                      <span className="truncate">{industryName}</span>
                    </Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                          size="sm"
                        >
                          <ChevronDown />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-">
                        {industry.map((item) => {
                          return (
                            <DropdownMenuItem
                              selected={item.industry == industryName}
                              onSelect={() => {
                                setIndustryName(item.label);
                                setShowUpdateBtn(true);
                                setFormData((prev) => ({
                                  ...prev,
                                  industry: item.value,
                                }));
                              }}
                              key={item.label}
                            >
                              {item.label}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card className="@container/card">
                <CardHeader>
                  {showUpdateBtn ? (
                    <Button
                      loadingText={"Updating..."}
                      loading={loading}
                      onClick={handleUpdate}
                      variant={"primary"}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      loadingText={"Updating..."}
                      loading={loading}
                      onClick={() => setIsDisabled(false)}
                      variant={"primary"}
                    >
                      Edit
                    </Button>
                  )}
                  {showUpdateBtn && (
                    <Button onClick={handleClearChanges} variant={"outline"}>
                      Cancel Edit
                    </Button>
                  )}
                </CardHeader>
              </Card>
            </div>
          </div>
      <Card className="shadow-background gap-4 mt-5 px-5 py-4">
  <FormSubHeading className="text-primary mb-4">
    Account Information
  </FormSubHeading>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
    {/* Account Owner */}
     <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Account Owner</Label>
      <EditableSelectField
        readOnly={isDisabled}
        onChange={handleChange}
        value={formData?.companyOwner}
        options={leadOwner}
        name="accountOwner"
        className="w-full rounded px-0 py-2"
      />
    </div>

    {/* Account Name */}
      <div className="flex flex-col  md:px-3">
      <Label className=" text-sm mb-3 text-muted-foreground">Account Name</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.companyName}
        name="accountName"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* Account Type */}
      <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Account Type</Label>
      <EditableSelectField
        readOnly={isDisabled}
        onChange={handleChange}
        value={formData?.companyType}
        options={accountType}
        name="accountType"
        className="w-full rounded px-0 py-2"
      />
    </div>

    {/* Industry */}
      <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Industry</Label>
      <EditableSelectField
        readOnly={isDisabled}
        name="industry"
        type="text"
        className="w-full rounded px-0 py-2"
      />
    </div>

    {/* Currency */}
    <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Currency</Label>
      <EditableSelectField
        readOnly={isDisabled}
        onChange={handleChange}
        value={formData?.currency}
        options={currecy}
        name="currency"
        className="w-full rounded px-0 py-2"
      />
    </div>

    {/* Payment Terms */}
      <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Payment Terms</Label>
      <EditableSelectField
        readOnly={isDisabled}
        name="paymentTerms"
        className="w-full rounded px-0 py-2"
      >
        Net15
      </EditableSelectField>
    </div>

    {/* Phone */}
      <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Phone</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.phone}
        name="phone"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* Website */}
     <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Website</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.website}
        name="website"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* Exchange Rate */}
     <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Exchange Rate</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.exchangeRate}
        name="exchangeRate"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* Modified By */}
     <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Modified By</Label>
      <EditableField
        readOnly={isDisabled}
        name="modifiedBy"
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* Created By */}
     <div className="flex flex-col  md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Created By</Label>
      <EditableField
        readOnly={isDisabled}
        name="createdBy"
        className="w-full rounded px-3 py-2"
      />
    </div>
  </div>
</Card>

         <Card className="shadow-background gap-4 mt-5 px-5 py-4">
  <FormSubHeading className="text-primary mb-4">
    Address Information
  </FormSubHeading>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Street / Building */}
    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground">
        Street / Building
      </Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.billingStreet}
        name="billingStreet"
        onChange={handleChange}
        type="text"
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* State */}
    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground">State</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.billingState}
        name="billingState"
        onChange={handleChange}
        type="text"
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* Country */}
    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground">Country</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.billingCountry}
        name="billingCountry"
        onChange={handleChange}
      
        className="w-full rounded px-3 py-2"
      />
    </div>

    {/* City */}
    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground">City</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.billingCity}
        name="billingCity"
        onChange={handleChange}
        type="text"
        className="w-full rounded px-3 py-2"
      />
    </div>
    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground">Zip Code</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.billingCode}
        name="billingCode"
        onChange={handleChange}
        type="number"
        className="w-full rounded px-3 py-2"
      />
    </div>
  </div>
</Card>

          <Card className={`shadow-background gap-4 mt-5 px-5 py-4`}>
            <FormSubHeading className="text-primary">
              {"Description"}
            </FormSubHeading>

            <div className="lg:flex gap-3.5">
              <div className="w-full lg:w-1/2 flex">
                <div className="w-4/4 lg:pl-4 flex flex-col">
                  <EditableField
                    readOnly={isDisabled}
                    className="w-full"
                    component={Textarea}
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </TabsContent>
      {/* <TabsContent
        value="comments"
        className="flex flex-col   sm:px-4 md:px-2 sm:w-full md:w-200"
        style={{ border: "none" }}
      >
        <FormCard className="border-0 mt-0 pt-0">
          <div className="border rounded-sm  py-2  mb-4 bg-muted/30">
            <div className="flex gap-3 mb-2 ps-4">
              <button
                onClick={() => document.execCommand("bold")}
                className="p-1 hover:bg-muted rounded"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => document.execCommand("italic")}
                className="p-1 hover:bg-muted rounded"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => document.execCommand("underline")}
                className="p-1 hover:bg-muted rounded"
              >
                <Underline size={16} />
              </button>
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              className="min-h-[60px] p-2 rounded bg-white"
              onInput={(e) => setNewComment(e.currentTarget.innerHTML)}
            ></div>
            <Button
              variant="outline"
              className="mt-2 ms-3"
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">
              ALL COMMENTS
              <Badge
                className="h-5 min-w-5 rounded-full px-1 ms-2 font-mono bg-green-900"
                variant="destructive"
              >
                {comments.length}
              </Badge>
            </h4>
            <hr />
            {comments.map((comment) => (
              <div className="flex flex-row w-100" style={{ width: "100%" }}>
                <Button
                  variant="outline"
                  className="mt-2 flex items-center rounded-full gap-2 w-auto hover:bg-muted/15"
                >
                  <MessageSquare
                    className="h-4 w-4"
                    style={{ color: "blue" }}
                  />
                </Button>
                <div
                  key={comment.id}
                  className="ps-3 rounded-md relative"
                  style={{ width: "100%" }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium">
                        {comment.user}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {comment.time}
                      </span>{" "}
                    </div>
                  </div>
                  <div className="bg-muted/30 flex items-center justify-between p-3">
                    <span
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: comment.text }}
                    ></span>
                    <button
                      className="p-1 hover:text-red-600"
                      onClick={() => setDeleteId(comment.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FormCard>
        <Dialog open={!!deleteId} onOpenChange={setDeleteId}>
          <DialogContent>
            <DialogHeader>Do you want to delete this comment?</DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent> */}
      <TabsContent value="transactions" className="flex flex-col px-2 lg:px-2">
      <Card className="shadow-background gap-5 mt-2 mb-3 px-0 py-4">
  <FormSubHeading className="text-primary ps-3">
    Receivables
  </FormSubHeading>

  {/* Responsive scrollable table container */}
  <div className="w-full overflow-x-auto overflow-y-auto min-h-[80px] max-h-[300px] border rounded-md">
    <Table className="w-full text-sm md:text-base">
      <TableHeader>
        <TableRow className="bg-[#E9E9E9]">
          <TableHead className="min-w-[180px] md:min-w-[250px] border-l-0 sticky top-0 z-10">
            CURRENCY
          </TableHead>
          <TableHead className="text-right min-w-[180px] md:min-w-[250px] sticky top-0 z-10">
            OUTSTANDING RECEIVABLES
          </TableHead>
          <TableHead className="text-right min-w-[150px] md:min-w-[200px] border-r-0 sticky top-0 z-10">
            UNUSED CREDITS
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow className="hover:bg-muted/30 transition">
          <TableCell className="border-l-0 text-xs md:text-sm">
            USD - United States Dollar
          </TableCell>
          <TableCell className="text-right text-blue-600 font-medium cursor-pointer text-xs md:text-sm">
            $29,396.03
          </TableCell>
          <TableCell className="text-right border-r-0 text-xs md:text-sm">
            $0.00
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</Card>

        <Card className="w-full p-0 gap-0 mb-3">
          <CardHeader
            className={`flex flex-row items-center justify-between py-1 bg-gray-50 cursor-pointer transition-all duration-300 ${
              isQuoteExpanded ? "border-b" : ""
            }`}
            onClick={toggleQuote}
            style={{
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <div className="flex items-center gap-2">
              {isQuoteExpanded ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
              <CardTitle className="text-md md:text-md font-medium">Quote</CardTitle>
            </div>
            <div className="flex items-center gap-2 p-1">
              {isQuoteExpanded && (
                <div className="flex items-center gap-1.5 p-1 border-0">
                  <Select onValueChange={setQuoteStatus} value={quoteStatus}>
                    <SelectTrigger className="w-auto text-xs h-7 flex items-center justify-start gap-1">
                      <Filter className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        Status:{" "}
                      </span>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
              >
                <span>
                  <Plus
                    size={15}
                    className="text-white bg-blue-500 rounded-full p-0.5"
                  />
                </span>{" "}
                New
              </Button>
            </div>
          </CardHeader>
          {isQuoteExpanded && (
            <CardContent className="p-0">
              <div className="w-full overflow-auto min-h-[40px] max-h-[300px] border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Date
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Quote #
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Reference Number
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Amount
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuotes.map((quote, index) => (
                      <TableRow key={index}>
                        <TableCell>{quote.date}</TableCell>
                        <TableCell className="text-blue-600 cursor-pointer">
                          {quote.quoteNumber}
                        </TableCell>
                        <TableCell>{quote.reference}</TableCell>
                        <TableCell>{quote.amount}</TableCell>
                        <TableCell className={quote.statusColor}>
                          {quote.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Separator />
              <div className="flex justify-between items-center p-4 text-xs text-gray-500 shadow-top">
                <span className="flex items-center">
                  Total Count: {filteredQuotes.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">1 - {filteredQuotes.length}</span>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
        <Card className="w-full p-0 gap-0 mb-3">
          <CardHeader
            className={`flex flex-row items-center justify-between py-1 bg-gray-50 cursor-pointer transition-all duration-300 ${
              isSalesExpanded ? "border-b" : ""
            }`}
            onClick={toggleSales}
            style={{
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <div className="flex items-center gap-2">
              {isSalesExpanded ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
              <CardTitle className="text-md md:text-md font-medium">
                Sales Orders
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 p-1">
              {isSalesExpanded && (
                <div className="flex items-center gap-1.5 p-1 border-0">
                  <Select onValueChange={setSalesStatus} value={salesStatus}>
                    <SelectTrigger className="w-auto text-xs h-7 flex items-center justify-start gap-1">
                      <Filter className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        Status:{" "}
                      </span>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
              >
                <span>
                  <Plus
                    size={15}
                    className="text-white bg-blue-500 rounded-full"
                  />
                </span>{" "}
                New
              </Button>
            </div>
          </CardHeader>
          {isSalesExpanded && (
            <CardContent className="p-0">
              <div className="w-full overflow-auto min-h-[40px] max-h-[250px] border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        SALES ORDER#
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        REFERENCE NUMBER
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        DATE
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        SHIPMENT DATE
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10 text-right">
                        AMOUNT
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        STATUS
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSalesOrders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-blue-600 cursor-pointer">
                          {order.salesOrder}
                        </TableCell>
                        <TableCell>{order.reference}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.shipmentDate}</TableCell>
                        <TableCell className="text-right">
                          {order.amount}
                        </TableCell>
                        <TableCell className={order.statusColor}>
                          {order.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Separator />
              <div className="flex justify-between items-center p-4 text-xs text-gray-500 shadow-top">
                <span className="flex items-center">
                  Total Count: {filteredSalesOrders.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    1 - {filteredSalesOrders.length}
                  </span>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
        {/* <Card className="w-full p-0 gap-0 mb-3">
          
        </Card> */}
        <Card className="w-full p-0 gap-0 mb-3">
          <CardHeader
            className={`flex flex-row items-center justify-between py-1 bg-gray-50 cursor-pointer transition-all duration-300 ${
              isDeliveryExpanded ? "border-b" : ""
            }`}
            onClick={() => setIsDeliveryExpanded(!isDeliveryExpanded)}
            style={{
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <div className="flex items-center gap-2">
              {isDeliveryExpanded ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
              <CardTitle className="text-md md:text-md font-medium">
                Delivery Notes
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 p-1">
              {isDeliveryExpanded && (
                <div className="flex items-center gap-1.5 p-1 border-0">
                  <Select
                    onValueChange={setDeliveryStatus}
                    value={deliveryStatus}
                  >
                    <SelectTrigger className="w-auto text-xs h-7 flex items-center justify-start gap-1">
                      <Filter className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        Status:{" "}
                      </span>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="in transit">In Transit</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
              >
                <span>
                  <Plus
                    size={15}
                    className="text-white bg-blue-500 rounded-full"
                  />
                </span>{" "}
                New
              </Button>
            </div>
          </CardHeader>
          {isDeliveryExpanded && (
            <CardContent className="p-0">
              <div className="w-full overflow-auto min-h-[40px] max-h-[250px] border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Date
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Location
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Delivery Note #
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Reference
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10">
                        Customer Name
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10 text-center">
                        Status
                      </TableHead>
                      <TableHead className="bg-[#E9E9E9] sticky top-0 z-10 text-right">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeliveryChallans.map((dc, index) => (
                      <TableRow key={index}>
                        <TableCell className="py-2 text-sm">
                          {dc.date}
                        </TableCell>
                        <TableCell className="py-2 text-sm">
                          {dc.location}
                        </TableCell>
                        <TableCell className="py-2 text-sm text-blue-600 cursor-pointer">
                          {dc.deliveryChallan}
                        </TableCell>
                        <TableCell className="py-2 text-sm">
                          {dc.reference}
                        </TableCell>
                        <TableCell className="py-2 text-sm">
                          {dc.customer}
                        </TableCell>
                        <TableCell className="py-2 text-sm text-center">
                          <span className={`font-normal ${dc.statusColor}`}>
                            {dc.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-sm text-right">
                          {dc.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Separator />
              <div className="flex justify-between items-center p-4 text-xs text-gray-500 shadow-top">
                <span className="flex items-center">
                  Total Count: {filteredDeliveryChallans.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    1 - {filteredDeliveryChallans.length}
                  </span>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
        <Card className="w-full p-0 gap-0 my-0">
          <CardHeader
            className={`flex flex-row items-center justify-between py-1 bg-gray-50 cursor-pointer transition-all duration-300 ${
              isInvoiceExpanded ? "border-b" : ""
            }`}
            onClick={toggleInvoice}
            style={{
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <div className="flex items-center gap-2">
              {isInvoiceExpanded ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
              <CardTitle className="text-md md:text-md font-medium">Invoices</CardTitle>
            </div>
            <div className="flex items-center gap-2 p-1">
              {isInvoiceExpanded && (
                <div className="flex items-center gap-1.5 p-1 border-0">
                  <Select
                    onValueChange={setInvoiceStatus}
                    value={invoiceStatus}
                  >
                    <SelectTrigger className="w-auto text-xs h-7 flex items-center justify-start gap-1">
                      <Filter className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        Status:{" "}
                      </span>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
              >
                <span>
                  <Plus
                    size={15}
                    className="text-white bg-blue-500 rounded-full"
                  />
                </span>{" "}
                New
              </Button>
            </div>
          </CardHeader>
          {isInvoiceExpanded && (
            <CardContent className="p-0">
              <div className="w-full overflow-auto min-h-[40px] max-h-[250px]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs text-gray-500">
                        Date
                      </TableHead>
                      <TableHead className="text-xs text-gray-500">
                        Invoice Number
                      </TableHead>
                      <TableHead className="text-xs text-gray-500">
                        Order Number
                      </TableHead>
                      <TableHead className="text-xs text-gray-500 text-right">
                        Amount
                      </TableHead>
                      <TableHead className="text-xs text-gray-500 text-right">
                        Balance Due
                      </TableHead>
                      <TableHead className="text-xs text-gray-500 text-center">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice, index) => (
                      <TableRow key={index}>
                        <TableCell className="py-2 text-sm">
                          {invoice.date}
                        </TableCell>
                        <TableCell className="py-2 text-sm text-blue-600">
                          <a href="#">{invoice.invoiceNumber}</a>
                        </TableCell>
                        <TableCell className="py-2 text-sm text-blue-600">
                          <a href="#">{invoice.orderNumber}</a>
                        </TableCell>
                        <TableCell className="py-2 text-sm text-right">
                          {invoice.amount}
                        </TableCell>
                        <TableCell className="py-2 text-sm text-right">
                          {invoice.balanceDue}
                        </TableCell>
                        <TableCell className="py-2 text-sm text-center">
                          <Badge
                            variant="secondary"
                            className={`font-normal ${invoice.statusColor}`}
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Separator />
              <div className="flex justify-between items-center p-4 text-xs text-gray-500 shadow-top">
                <span className="flex items-center">
                  Total Count: {filteredInvoices.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">1 - {filteredInvoices.length}</span>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0 text-gray-400"
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </TabsContent>
      <TabsContent value="contacts" className="flex flex-col px-2 lg:px-2">
        <AccountContacts />
      </TabsContent>
      <TabsContent value="opportunity" className="flex flex-col px-2 lg:px-2">
        <AccountOpportunity />
      </TabsContent>
      <TabsContent value="smartAnalysis" className="flex flex-col px-2 lg:px-2">
        <div className="aspect-video w-full flex-1 rounded-lg">
          <div className="flex justify-end mt-0 me-2">
            <Button className="text-sm font-medium px-4 py-1 bg-blue-500 text-white rounded">
              Save
            </Button>

            <Button className="text-sm font-medium px-4 py-1 bg-gray-300 text-black rounded ms-2">
              Edit
            </Button>
          </div>
      <Card className="shadow-background gap-4 mt-2 px-5 py-4">
  <FormSubHeading className="text-primary">Account Information</FormSubHeading>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-1  md:gap-4 mt-3 mb-0">
    <div className="flex flex-col space-y-1">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          Account Name
        </span>
        <EditableField
          value={formData.companyName}
          name="companyName"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          Customer Type
        </span>
        <EditableSelectField options={accountType} name="accountType" />
      </div>
        <div className="flex flex-col">
      <span className="text-sm font-medium text-muted-foreground mb-1">
        Primary Contact
      </span>
      <EditableField type="text" name="primaryContact" />
    </div>
    </div>
    <div className="flex flex-col space-y-1">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          Segment
        </span>
        <EditableSelectField options={segment} name="segment" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          Email
        </span>
        <EditableField
          value={formData?.primaryContact}
          type="email"
          name="email"
        />
      </div>
      <div className="flex flex-col">
      <span className="text-sm font-medium text-muted-foreground mb-1">
        Phone
      </span>
      <EditableField name="phone" type="number" />
    </div>
    </div>

    <div className="flex flex-col space-y-1">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          Account Number
        </span>
        <EditableField name="accountNumber" type="number" />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          Potential Revenue
        </span>
        <EditableField name="potentialRevenue" type="number" />
      </div>
    </div>
  </div>

  <div className="w-full mt-0">
    <FormSubHeading className="text-primary mb-2">Description</FormSubHeading>
    <EditableField
      name="description"
      component={Textarea}
      className="w-full border-none"
      placeholder="Enter Description..."
    />
  </div>
</Card>



       <Card className="shadow-background gap-6 mt-5 px-4 py-4 rounded-lg">
  <FormSubHeading className="text-primary mb-0">
    Account Performance Evaluation
  </FormSubHeading>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Smart Objective
      </Label>
      <Textarea
        name="smartObjective"
        placeholder="Enter Smart Objective..."
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        rows={4}
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Current Year Objective
      </Label>
      <Textarea
        name="currentYearObjective"
        placeholder="Enter Current Year Objective..."
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        rows={4}
      />
    </div>
  </div>

  {/* Performance Numbers - 3 columns on md, stacked on mobile */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Potential Revenue
      </Label>
      <Input
        type="number"
        name="potentialRevenue"
        placeholder="Enter Potential Revenue"
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Previous Year Sales
      </Label>
      <Input
        type="number"
        name="previousYearSales"
        placeholder="Enter Previous Year Sales"
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Gross Profit
      </Label>
      <Input
        type="number"
        name="grossProfit"
        placeholder="Enter Gross Profit"
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  </div>
</Card>


          <Card className={`shadow-lg bg-red-200 gap-4 mt-5 p-0 text-center`}>
            <SmartAnalysis />
          </Card>
        
          <Card className="shadow-background gap-4 mt-5 px-5 py-4">
            <div
              className="overflow-auto"
              style={{ minHeight: "40px", maxHeight: "400px" }}
            >
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Sr. No</TableHead>
                    <TableHead className="w-48">Contact</TableHead>
                    <TableHead className="w-48">Job Title</TableHead>
                    <TableHead className="w-40">Buying Influence</TableHead>
                    <TableHead className="w-48">
                      Relationship Strength
                    </TableHead>
                    <TableHead className="w-20">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {stakeholders.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell className="w-48">
                        <Select
                          value={row.contact}
                          onValueChange={(val) =>
                            handleStakeholderChange(index, "contact", val)
                          }
                        >
                          <SelectTrigger className="w-full border rounded px-2 py-1 text-sm">
                            <SelectValue placeholder="Select Contact" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {contactNameOptions.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className="w-48">
                        <input
                          type="text"
                          name="jobTitle"
                          placeholder="Enter Job Title"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </TableCell>

                      <TableCell className="w-40">
                        <Select>
                          <SelectTrigger className="w-full border rounded px-2 py-1 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className="w-48">
                        <input
                          type="text"
                          name="relationshipStrength"
                          placeholder="Enter Strength"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </TableCell>

                      <TableCell className="w-20">
                        <Trash2
                          className="text-red-500 cursor-pointer"
                          size={18}
                          onClick={() => deleteStakeholder(index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Footer with Add New */}
            <div className="flex justify-start mt-3">
              <Button
                type="button"
                onClick={addStakeholder}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                <Plus size={16} /> Add New
              </Button>
            </div>
          </Card>

       
          <Card className="shadow-background gap-4 mt-5 px-5 py-4">
            <div
              className="overflow-auto"
              style={{ minHeight: "40px", maxHeight: "200px" }}
            >
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Sr. No</TableHead>
                    <TableHead className="w-48">Opportunity</TableHead>
                    <TableHead className="w-48">Key Action</TableHead>
                    <TableHead className="w-40">Due Date</TableHead>
                    <TableHead className="w-48">Expected Outcome</TableHead>
                    <TableHead className="w-20">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {actions.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className={"w-40"}>
                         <Select>
                          <SelectTrigger className="w-full border rounded px-2 py-1 text-sm">
                            <SelectValue placeholder="Select Opportunity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="opo1">Opportunity 1</SelectItem>
                            <SelectItem value="opo2">Opportunity 2</SelectItem>
                            <SelectItem value="opo3">Opportunity 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="w-48">
                        <input
                          type="text"
                          name="keyAction"
                          placeholder="Enter Key Action"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </TableCell>
                      <TableCell className="w-40">
                        <input
                          type="date"
                          name="dueDate"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </TableCell>
                      <TableCell className="w-48">
                        <input
                          type="number"
                          name="expectedOutcome"
                          placeholder="Enter Expected Outcome"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </TableCell>
                      <TableCell className="w-20">
                        <Trash2
                          className="text-red-500 cursor-pointer"
                          size={18}
                          onClick={() => deleteAction(index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-start mt-3">
              <Button
                type="button"
                onClick={addAction}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              >
                <Plus size={16} /> Add New
              </Button>
            </div>
          </Card>
        </div>
      </TabsContent>
      <TabsContent
        value="activity"
        className="flex flex-col px-2 lg:px-2"
      >
        <AccountActivityList />
      </TabsContent>
      <TabsContent
        value="history"
        className="flex flex-col px-2 lg:px-2"
      ></TabsContent>
    </Tabs>
  );
};
export default AccountsDetailsView;
