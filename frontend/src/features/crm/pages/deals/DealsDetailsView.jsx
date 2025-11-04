import {
  FormCard,
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
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
  leadOwner,
  leadSource,
  leadStatus,
} from "@/features/utils/ListViewMenu";
import { updateLeadInList } from "@/redux/slices/leads/leadsSlice";
import { updateLead } from "@/services/crm/leadApi";
import {
  Bold,
  Italic,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
  Trash2,
  Underline,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { LeadsConvertForm } from "./LeadsConvertForm";
import LeadActivityList from "./relatedList/leadActivity/LeadActivityList";
const GridEditableField = ({ label, children, className }) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const LeadsDetailsView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const details = location.state;
  const [newAttachments, setNewAttachments] = React.useState([]);
  const [attachments, setAttachments] = React.useState([]);
  const fileInputRef = React.useRef(null);
  const [activeTab, setActiveTab] = useState("overview"); 

  const handleAddAttachment = () => {
    if (newAttachments.length === 0) return;

    const newItems = newAttachments.map((file) => ({
      id: Date.now() + Math.random(),
      file,
    }));

    setAttachments((prev) => [...prev, ...newItems]);
    setNewAttachments([]); 
  };

  const [formData, setFormData] = useState({
    leadName: "",
    title: "",
    leadSource: "",
    leadStatus: "",
    createdBy: "",
    leadOwner: "",
    phone: "",
    mobile: "",
    email: "",
    companyName: "",
    website: "",
    industry: "",
    currency: "",
    exchangeRate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    closingDate: "",
    pipeline: "",
    amount: "",
    description: "",
    firstName: "", 
    lastName: "",
    buildingNumber: "",
    officeNumber: "",
  });

  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    setComments(comments.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
  if (details) {
  setFormData({
        ...details,
        firstName: details.firstName ?? "",
        lastName: details.lastName ?? "",
        buildingNumber: details.buildingNumber ?? "",
        officeNumber: details.officeNumber ?? "",
        company: details.company?.ROWID ?? "",
        contactOwner: details.contactOwner?.ROWID ?? "",
        leadName: details.leadName ?? "",
        title: details.title ?? "",
        leadSource: details.leadSource ?? "",
        leadStatus: details.leadStatus ?? "",
        createdBy: details.createdBy ?? "",
        leadOwner: details.leadOwner ?? "",
        phone: details.phone ?? "",
        mobile: details.mobile ?? "",
        email: details.email ?? "",
        companyName: details.companyName ?? "",
        website: details.website ?? "",
        industry: details.industry ?? "",
        currency: details.currency ?? "",
        exchangeRate: details.exchangeRate ?? "",
        street: details.street ?? "",
        city: details.city ?? "",
        state: details.state ?? "",
        zipCode: details.zipCode ?? "",
        country: details.country ?? "",
        closingDate: details.closingDate ?? "",
        pipeline: details.pipeline ?? "",
        amount: details.amount ?? "",
        description: details.description ?? "",
      }); 
      console.log(details, "details from location state"); 
    }
  }, [details]);

  const handleChange = (e) => {
    let finalValue, finalName;

    if (e.target) {
      finalValue = e.target.value;
      finalName = e.target.name;
    } else if (typeof e === 'string') {
      
      const name = e.name; 
      const value = e.value; 
      finalValue = value;
      finalName = name;
    } else {
      finalValue = e.value;
      finalName = e.name;
    }
    
    const finalVal = e.target ? e.target.value : e.value || e; 
    const finalNam = e.target ? e.target.name : e.name;
    if(finalNam) {
        setFormData((prev) => ({ ...prev, [finalNam]: finalVal }));
        !showUpdateBtn && setShowUpdateBtn(true);
    }
  };

  const handleClearChanges = () => {
    setFormData((prev) => ({
      ...prev,
      ...details,
      company: details.company?.ROWID ?? "",
      contactOwner: details.contactOwner?.ROWID ?? "",
    }));
    setShowUpdateBtn(false);
    setIsDisabled(true);
  };

  const handleUpdate = () => {
    setLoading(true);
    updateLead(formData, details.ROWID)
      .then((res) => {
        if (res.data.success) {
          toast.success("Lead Updated Successfully");
          dispatch(updateLeadInList({ ...formData, ROWID: details.ROWID }));
          setShowUpdateBtn(false);
          setIsDisabled(true);
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Error Occured during the Lead Updation!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab} 
        className="w-full flex-col justify-start gap-2"
      >
        <div className="flex items-center justify-between px-1 lg:px-1">
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
              <SelectItem value="attachments">Attachments</SelectItem>
              <SelectItem value="activity">Tasks</SelectItem>
            </SelectContent>
          </Select>
          <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="comments">Comments </TabsTrigger> */}
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
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
                                {`${formData.firstName ?? ""} ${
                                    formData.lastName ?? ""
                                }`.trim()}
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
                        {
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
                                        <Button
                                            onClick={handleClearChanges}
                                            variant={"outline"}
                                        >
                                            Cancel Edit
                                        </Button>
                                    )}
                                    <LeadsConvertForm details={details} />
                                </CardHeader>
                            </Card>
                        }
                    </div>
                </div>

                {/* --- REFACTORED LEAD INFORMATION SECTION --- */}
                <Card className={`shadow-background gap-4 mt-5 px-5 py-4`}>
                    <FormSubHeading className="text-primary mb-4">
                        Lead Information
                    </FormSubHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        <GridEditableField label="Lead Name">
                            <EditableField
                                readOnly={isDisabled}
                                value={`${formData.firstName ?? ""} ${
                                    formData.lastName ?? ""
                                }`.trim()}
                                name="leadName"
                            />
                        </GridEditableField>

                        <GridEditableField label="Title">
                            <EditableField
                                readOnly={isDisabled}
                                value={formData.title}
                                name="title"
                                onChange={handleChange}
                                placeholder="Enter Title"
                            />
                        </GridEditableField>

                        <GridEditableField label="Lead Source">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="leadSource"
                                value={formData.leadSource}
                                onChange={handleChange}
                                options={leadSource}
                            />
                        </GridEditableField>

                        <GridEditableField label="Lead Status">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="leadStatus"
                                value={formData.leadStatus}
                                onChange={handleChange}
                                options={leadStatus}
                            />
                        </GridEditableField>

                        <GridEditableField label="Lead Owner">
                            <EditableSelectField
                                readOnly={isDisabled}
                                name="leadOwner"
                                value={formData.leadOwner}
                                onChange={handleChange}
                                options={leadOwner}
                            />
                        </GridEditableField>

                        <GridEditableField label="Phone">
                            <EditableField
                                readOnly={isDisabled}
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                            />
                        </GridEditableField>

                        <GridEditableField label="Mobile">
                            <EditableField
                                readOnly={isDisabled}
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                type="tel"
                            />
                        </GridEditableField>

                        <GridEditableField label="Email">
                            <EditableField
                                readOnly={isDisabled}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                            />
                        </GridEditableField>

                        <GridEditableField label="Created By">
                            <EditableField
                                readOnly={true} 
                                value={formData.createdBy}
                                name="createdBy"
                            />
                        </GridEditableField>
                    </div>
                </Card>
                <Card className="shadow-background gap-4 mt-5 px-5 py-4">
                    <FormSubHeading className="text-primary mb-4">
                        Account Details
                    </FormSubHeading>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        <GridEditableField label="Account">
                            <EditableField
                                readOnly={isDisabled}
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </GridEditableField>

                        <GridEditableField label="Industry">
                            <EditableField
                                readOnly={isDisabled}
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                            />
                        </GridEditableField>

                        <GridEditableField label="Exchange Rate">
                            <EditableField
                                readOnly={isDisabled}
                                name="exchangeRate"
                                value={formData.exchangeRate}
                                onChange={handleChange}
                                type="number"
                            />
                        </GridEditableField>

                        <GridEditableField label="Website">
                            <EditableField
                                readOnly={isDisabled}
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                type="url"
                            />
                        </GridEditableField>

                        <GridEditableField label="Currency">
                            <EditableField
                                readOnly={isDisabled}
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                            />
                        </GridEditableField>
                        <div className="hidden lg:block"></div>
                    </div>
                </Card>
                <Card className="shadow-background gap-4 mt-5 px-5 py-4">
                    <FormSubHeading className="text-primary mb-4">
                        Address Information
                    </FormSubHeading>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                        <GridEditableField label="Building Number">
                            <EditableField
                                readOnly={isDisabled}
                                name="buildingNumber"
                                value={formData.buildingNumber}
                                onChange={handleChange}
                                type="text"
                            />
                        </GridEditableField>

                        <GridEditableField label="Street / Building">
                            <EditableField
                                readOnly={isDisabled}
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                type="text"
                            />
                        </GridEditableField>

                        <GridEditableField label="State">
                            <EditableField
                                readOnly={isDisabled}
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                type="text"
                            />
                        </GridEditableField>

                        <GridEditableField label="Country">
                            <EditableField
                                readOnly={isDisabled}
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                type="text"
                            />
                        </GridEditableField>

                        <GridEditableField label="Office Number">
                            <EditableField
                                readOnly={isDisabled}
                                name="officeNumber"
                                value={formData.officeNumber}
                                onChange={handleChange}
                                type="text"
                            />
                        </GridEditableField>

                        <GridEditableField label="City">
                            <EditableField
                                readOnly={isDisabled}
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                type="text"
                            />
                        </GridEditableField>

                        <GridEditableField label="Zip Code">
                            <EditableField
                                readOnly={isDisabled}
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                type="text"
                            />
                        </GridEditableField>
                    </div>
                </Card>
                <Card className={`shadow-background gap-4 mt-5 px-5 py-4`}>
                    <FormSubHeading className="text-primary mb-4">
                        Description
                    </FormSubHeading>
                    <GridEditableField label="Description">
                        <EditableField
                            readOnly={isDisabled}
                            className="w-full"
                            onChange={handleChange}
                            name="description"
                            component={Textarea}
                            value={formData.description}
                        />
                    </GridEditableField>
                </Card>

            </div>
        </TabsContent>

    {/* <TabsContent
  value="comments"
  className="flex flex-col  sm:px-4 md:px-2 sm:w-full md:w-200"
  style={{ border: "none" }}
>
  <FormCard className="border-0 mt-0 pt-0">
    <div className="border rounded-md py-3 mb-4 bg-muted/30">
      <div className="flex flex-wrap gap-2 mb-2 ps-3 sm:ps-4">
        <button
          onClick={() => document.execCommand("bold")}
          className="p-1.5 hover:bg-muted rounded"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => document.execCommand("italic")}
          className="p-1.5 hover:bg-muted rounded"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => document.execCommand("underline")}
          className="p-1.5 hover:bg-muted rounded"
        >
          <Underline size={16} />
        </button>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="min-h-[80px] p-2 sm:p-3 rounded bg-white text-sm sm:text-base overflow-y-auto"
        onInput={(e) => setNewComment(e.currentTarget.innerHTML)}
      ></div>

      <div className="flex justify-end sm:justify-start mt-3 ms-3 sm:ms-4">
        <Button
          variant="outline"
          size="sm"
          className="text-sm sm:text-base"
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </div>
    </div>
    <div className="space-y-4">
      <h4 className="font-semibold text-sm sm:text-base flex items-center gap-2">
        All Comments
        <Badge
          className="h-5 min-w-5 rounded-full px-2 font-mono bg-green-900"
          variant="destructive"
        >
          {comments.length}
        </Badge>
      </h4>

      <hr />

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3"
        >
          <Button
            variant="outline"
            size="icon"
            className="self-start rounded-full hover:bg-muted/15"
          >
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </Button>
          <div className="flex-1 ps-1 sm:ps-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-sm font-medium">{comment.user}</span>
                <span className="text-xs text-muted-foreground">
                  {comment.time}
                </span>
              </div>
            </div>
            <div className="bg-muted/30 flex justify-between items-start sm:items-center gap-3 p-2 sm:p-3 rounded-md">
              <span
                className="text-sm break-words"
                dangerouslySetInnerHTML={{ __html: comment.text }}
              ></span>
              <button
                className="p-1 text-gray-500 hover:text-red-600 transition"
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
    <DialogContent className="max-w-[90%] sm:max-w-md">
      <DialogHeader>Do you want to delete this comment?</DialogHeader>
      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
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


        <TabsContent
          value="attachments"
          className="flex flex-col  sm:px-4 sm:w-full md:w-200"
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
              <div className="flex gap-2 mb-2">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Paperclip size={16} /> Attach
                </Button>

                {newAttachments.length > 0 && (
                  <Button
                    variant="ghost"
                    className="text-green-800 border-2 hover:text-green-800 bg-white hover:bg-white "
                    onClick={handleAddAttachment}
                  >
                    Add Selected Files
                  </Button>
                )}
              </div>

              <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) =>
                  setNewAttachments(Array.from(e.target.files))
                }
              />
            </div>

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
                        setAttachments((prev) =>
                          prev.filter((att) => att.id !== file.id)
                        )
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
          value="activity"
          className="flex flex-col px-2"
          style={{ border: "none" }}
        >
          <LeadActivityList />
        </TabsContent>
      </Tabs>
    </>
  );
};
export default LeadsDetailsView;