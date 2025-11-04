import {
  FormCard,
  FormField,
  FormSubHeading,
} from "@/components/custom/CustomFormComponents";
import {
  EditableField,
  EditableSelectField,
} from "@/components/custom/GeneralCustomComponents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  company,
  leadOwner,
} from "@/features/utils/ListViewMenu";
import { updateContactInList } from "@/redux/slices/contacts/contactSlice";
import { updateContact } from "@/services/crm/contactApi";
import { Bold, Italic, Mail, MessageSquare, Paperclip, Phone, Trash2, Underline } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ContactOpportunity from "./relatedList/contactOpportunity/ContactOpportunity";
import ContactActivityList from "./relatedList/contactActivity/ContactActivityList";
const ContactDetailView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
   const [activeTab, setActiveTab] = useState("overview"); 
  const details = location.state;
  const [formData, setFormData] = useState({
    alias: "",
    firstName: "",
    lastName: "",
    company: "",
    vendor: "",
    email: "",
    mobile: "",
    phone: "",
    title: "",
    contactType: "",
    department: "",
    contactOwner: "",
    billingstreet: "",
    shippingStreet: "",
    billingcity: "",
    shippingCity: "",
    billingstate: "",
    shippingrState: "",
    billingzipCode: "",
    shippingZipcode: "",
    billingcountry: "",
    shippingCountry: "",
    description: "",
    buildingNumber: "",
    officeNumber: "",
  });
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (details) {
      setFormData({
        ...details,
        company: details.company?.ROWID,
        contactOwner: details.contactOwner?.ROWID,
      });
    }
  }, [details]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    !showUpdateBtn && setShowUpdateBtn(true);
  };

  const handleClearChanges = () => {
    setFormData(details);
    setShowUpdateBtn(false);
    setIsDisabled(true);
  };

  
  const [comments, setComments] = useState([
      {
        id: 1,
        user: "Admin",
        text: "<b>Welcome!</b> This is the first comment.",
        time: new Date().toLocaleString(),
      },
      {
        id: 2,
        user: "Manager",
        text: "Here is another <i>example comment</i>.",
        time: new Date().toLocaleString(),
      },
    ]);
 
const [newAttachments, setNewAttachments] = React.useState([]);
const [attachments, setAttachments] = React.useState([]);

const handleAddAttachment = () => {
  if (newAttachments.length === 0) return;

  const newItems = newAttachments.map((file) => ({
    id: Date.now() + Math.random(),
    file,
  }));

  setAttachments((prev) => [...prev, ...newItems]);
  setNewAttachments([]); // Clear preview
};


    const [newComment, setNewComment] = useState("");
    const [deleteId, setDeleteId] = useState(null);
  
    // Add new comment
    const handleAddComment = () => {
      if (!newComment.trim()) return;
  
      const comment = {
        id: Date.now(),
        user: "You",
        text: newComment,
        time: new Date().toLocaleString(),
      };
  
      setComments((prev) => [...prev, comment]);
      setNewComment("");
      document.getElementById("editor").innerHTML = ""; 
    };
    const handleDelete = () => {
      setComments((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    };
  const handleUpdate = () => {
    setLoading(true);
    updateContact(formData, details.ROWID)
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact Updated Successfully");
          dispatch(updateContactInList({ ...formData, ROWID: details.ROWID }));
          setShowUpdateBtn(false);
          setIsDisabled(true);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Error Occured during the Contact Updation!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Tabs
        defaultValue="overview"
          value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex-col justify-start gap-0 md:gap-6"
      >
        <div className="flex items-center justify-between px-1 lg:px-1">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select defaultValue="overview"  value={activeTab}   onValueChange={setActiveTab} >
            <SelectTrigger
              className="flex w-fit lg:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="attachments">Attachments</SelectItem>
              <SelectItem value="opportunity">Opportunity</SelectItem>
              <SelectItem value="activity">Tasks</SelectItem>
            </SelectContent>
          </Select>
          <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="opportunity">Opportunity </TabsTrigger>
            <TabsTrigger value="activity">Tasks</TabsTrigger>
          </TabsList>
          <div className="flex items-right gap-2"></div>
        </div>
      
        <TabsContent value="overview" className="flex flex-col px-2 lg:px-2">
          <div className="aspect-video w-full flex-1 rounded-lg">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
              <Card className="@container/card">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    {formData.alias || "NA"}  {formData.firstName + " " + formData.lastName}
                  </CardTitle>
                  <CardDescription>{formData.title}</CardDescription>
                </CardHeader>
              </Card>
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                <Card className="@container/card">
                  <div className="flex-col p-1 mx-4 text-muted-foreground justify-center items-center">
                    <div className="flex">
                      <Badge variant={"secondary"}>
                        <Phone />
                      </Badge>
                      <p className="ml-2">{formData.mobile}</p>
                    </div>
                    <div className="flex mt-2">
                      <Badge variant={"secondary"}>
                        <Mail />
                      </Badge>
                      <p className="ml-2">{formData.email}</p>
                    </div>
                  </div>
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
    Contact Details
  </FormSubHeading>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
  
    <div className="flex flex-col md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Account Name</Label>
      <EditableSelectField
        readOnly={isDisabled}
        onChange={handleChange}
        value={formData?.company}
        options={company}
        name="company"
        className="w-full rounded px-0 py-2"
      />
    </div>

    <div className="flex flex-col  md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Email</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.email}
        name="email"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    <div className="flex flex-col md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Phone</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.phone}
        name="phone"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    <div className="flex flex-col md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Department</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.department}
        name="department"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    <div className="flex flex-col md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Created By</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.CREATORID}
        name="createdBy"
        className="w-full rounded px-3 py-2"
      />
    </div>


    <div className="flex flex-col md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Mobile</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.mobile}
        name="mobile"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    <div className="flex flex-col  md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Title</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.title}
        name="title"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    <div className="flex flex-col md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Contact Type</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.contactType}
        name="contactType"
        onChange={handleChange}
        className="w-full rounded px-3 py-2"
      />
    </div>

    <div className="flex flex-col md:px-3">
      <Label className="mb-1 text-sm text-muted-foreground">Contact Owner</Label>
      <EditableSelectField
        readOnly={isDisabled}
        onChange={handleChange}
        value={formData?.contactOwner}
        options={leadOwner}
        name="contactOwner"
        className="w-full rounded px-0 py-2"
      />
    </div>

    <div className="flex flex-col md:px-3">
      <Label className="mb-3 text-sm text-muted-foreground">Modified By</Label>
      <EditableField
        readOnly={isDisabled}
        value={formData.CREATORID}
        name="modifiedBy"
        className="w-full rounded px-3 py-2"
      />
    </div>
  </div>
</Card>


      <Card className="shadow-background gap-4 mt-5 px-5 py-0">
  <FormSubHeading className="text-primary mb-3">
    Contact Details
  </FormSubHeading>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="flex flex-col ">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Building Number
      </Label>
      <EditableField
        readOnly={isDisabled}
        name="buildingNumber"
        value={formData.buildingNumber}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Street / Building
      </Label>
      <EditableField
        readOnly={isDisabled}
        name="street"
        value={formData.street}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        State
      </Label>
      <EditableField
        readOnly={isDisabled}
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Country
      </Label>
      <EditableField
        readOnly={isDisabled}
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Office Number
      </Label>
      <EditableField
        readOnly={isDisabled}
        name="officeNumber"
        value={formData.officeNumber}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        City
      </Label>
      <EditableField
        readOnly={isDisabled}
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col">
      <Label className="mb-1 text-sm text-muted-foreground font-medium">
        Zip Code
      </Label>
      <EditableField
        readOnly={isDisabled}
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
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
                      onChange={handleChange}
                      name="description"
                      component={Textarea}
                      value={formData.description}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
       
     <TabsContent
  value="attachments"
  className="flex flex-col  sm:px-4 md:px-2 sm:w-full md:w-200"
  style={{ border: "none" }}
>
  <FormCard className="border-0 mt-0 pt-0">
    <div className="border rounded-sm py-2 mb-4 bg-muted/30 px-3">
      {newAttachments.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {newAttachments.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded border"
            >
              <span>{file.name}</span>
              <button
                type="button"
                className="text-red-600 hover:text-red-800 font-bold"
                onClick={() =>
                  setNewAttachments((prev) =>
                    prev.filter((_, index) => index !== i)
                  )
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Attach & Add buttons */}
      <div className="flex gap-2 mb-2">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current.click()}
        >
          <Paperclip size={16} /> Attach
        </Button>

        {newAttachments.length > 0 && (
          <Button variant="ghost" className="text-green-800 border-2 hover:text-green-800 bg-white hover:bg-white " onClick={handleAddAttachment}>
            Add Selected Files
          </Button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setNewAttachments(Array.from(e.target.files))}
      />
    </div>

    {/* List of attachments */}
    <div className="space-y-4 px-3">
      <h4 className="font-semibold text-sm flex items-center">
        ALL ATTACHMENTS
        <div className="h-5 w-5 flex items-center justify-center border-2 border-black rounded-full ms-2 bg-white text-sm font-serif">
          {attachments.length}
        </div>
      </h4>
      <hr />

      {attachments.map((file) => (
        <div key={file.id} className="flex flex-row w-full items-center gap-2">
          <Button
            variant="outline"
            className="mt-2 flex items-center rounded-full gap-2 w-auto hover:bg-muted/15"
          >
            <Paperclip className="h-4 w-4" style={{ color: "green" }} />
          </Button>

          <div className="flex justify-between items-center bg-muted/30 p-3 rounded-md w-full">
            <a
              href={URL.createObjectURL(file.file)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-blue-600"
            >
              {file.file.name}
            </a>

            <button
              className="p-1 hover:text-red-600"
              onClick={() =>
                setAttachments((prev) => prev.filter((att) => att.id !== file.id))
              }
            >
              <Trash2 size={16} className="text-red-700" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </FormCard>
</TabsContent>


          <TabsContent
          value="opportunity"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
            <ContactOpportunity />
          
        </TabsContent>
        <TabsContent
           value="activity"
          className="flex flex-col px-2"
          style={{ border: "none" }}>
           <ContactActivityList />
        </TabsContent>
        
         
      </Tabs>
    </> 
  );
};

export default ContactDetailView;