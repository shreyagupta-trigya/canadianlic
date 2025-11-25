import React, { useState, useRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const VendorMassEmailModal = ({
  isOpen,
  fields,
  selectedVendorIds,
  selectedVendorEmails,
  onClose,
  onSend,
}) => {
  const [selectedFrom, setSelectedFrom] = useState("user1@demo5.trigya.co");
  const [fromError, setFromError] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const quillRef = useRef(null);

  // Template modal states
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [filter, setFilter] = useState("All Templates");
  const [search, setSearch] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");

  const templates = [
    {
      name: "Welcome Email",
      content: `<div style="font-family: Arial, sans-serif; background: #fff; max-width: 600px; margin: 0 auto; border: 1px solid #eee;"><!-- content omitted for brevity --></div>`,
    },
    {
      name: "Invoice Reminder",
      content: `<div style="font-family: Arial; padding: 20px;"><h2 style="color:#dc3545;">Invoice Reminder</h2><p>Dear <strong>\${Leads.First Name}</strong>,</p><p>This is a friendly reminder that your invoice <strong>#\${Invoice.Number}</strong> is due on <strong>\${Invoice.Due Date}</strong>.</p><p>Please make the payment at your earliest convenience.</p><p>Thank you!</p></div>`,
    },
    // Add other templates as needed
  ];

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image", "video",
  ];

  const openTemplateModal = () => setIsTemplateModalOpen(true);
  const closeTemplateModal = () => setIsTemplateModalOpen(false);

  const openPreview = (template) => {
    setPreviewTemplate(template);
    setIsPreviewModalOpen(true);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
    setIsPreviewModalOpen(false);
  };

  const insertFromPreview = () => {
    if (previewTemplate) {
      const html = previewTemplate.content || previewTemplate;
      setEmailContent(html);
      setEmailSubject(previewTemplate.name || "");
      closePreview();
      closeTemplateModal();
    }
  };

  const handleClose = () => {
    setSelectedFrom("user1@demo5.trigya.co");
    setFromError("");
    setEmailSubject("");
    setEmailContent("");
    onClose();
  };

  const sendMassEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!selectedFrom) {
      setFromError("Sender email is required.");
      return;
    }
    if (!emailPattern.test(selectedFrom)) {
      setFromError("Please enter a valid email address.");
      return;
    }

    onSend({
      from: selectedFrom,
      vendors: selectedVendorEmails,
      subject: emailSubject,
      content: emailContent,
    });

    handleClose();
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={handleClose} direction="right">
        <DrawerContent className="max-w-4xl max-h-[100vh] flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Mass Email Vendors</DrawerTitle>
            <DrawerDescription>Send emails to selected vendors.</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            <div>
              <Label>To</Label>
              <div className="mt-1 text-sm">
                {selectedVendorEmails?.length ? (
                  selectedVendorEmails.map((vendor, idx) => (
                    <span key={vendor.ROWID}>
                      {vendor.userFirstName}
                      {idx < selectedVendorEmails.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">No recipients selected</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={openTemplateModal}
                className="flex items-center justify-between w-1/3"
              >
                Insert Template
              </Button>
            </div>
            <div>
              <Label htmlFor="from-select">From</Label>
              <Select value={selectedFrom} onValueChange={setSelectedFrom}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1@demo5.trigya.co">user1@demo5.trigya.co</SelectItem>
                  <SelectItem value="user2@demo5.trigya.co">user2@demo5.trigya.co</SelectItem>
                  <SelectItem value="user3@demo5.trigya.co">user3@demo5.trigya.co</SelectItem>
                </SelectContent>
              </Select>
              {fromError && <p className="text-red-500 text-sm mt-1">{fromError}</p>}
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                className="mt-1"
                id="subject"
                placeholder="Enter email subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <Label>Message</Label>
              <ReactQuill
                value={emailContent}
                onChange={setEmailContent}
                modules={modules}
                formats={formats}
                placeholder="Compose your email..."
                className="min-h-32 mt-1"
                style={{ height: "200px" }}
                ref={quillRef}
              />
            </div>
          </div>
          <DrawerFooter>
            <div className="flex gap-2 justify-center">
              <Button variant="destructive" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={sendMassEmail}>
                Send
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Template Select Modal */}
      <Dialog open={isTemplateModalOpen} onOpenChange={closeTemplateModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Templates">All Templates</SelectItem>
                  <SelectItem value="Favorites">Favorites</SelectItem>
                  <SelectItem value="Associated Templates">Associated Templates</SelectItem>
                  <SelectItem value="Created by me">Created by me</SelectItem>
                  <SelectItem value="Shared with me">Shared with me</SelectItem>
                  <SelectItem value="Public Email Templates">Public Email Templates</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search Template"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-1/2"
              />
            </div>
            <div className="space-y-2">
              {filteredTemplates.length ? (
                filteredTemplates.map((template, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 border rounded">
                    <strong>{template.name}</strong>
                    <Button variant="link" onClick={() => openPreview(template)}>
                      Preview
                    </Button>
                  </div>
                ))
              ) : (
                <p>No templates found.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={closePreview}>
        <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={previewMode === "desktop" ? "default" : "outline"}
                onClick={() => setPreviewMode("desktop")}
              >
                Desktop
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "outline"}
                onClick={() => setPreviewMode("mobile")}
              >
                Mobile
              </Button>
            </div>
            <div className={`border ${previewMode === "mobile" ? "w-80" : "w-full"}`}>
              <iframe
                srcDoc={previewTemplate?.content}
                style={{ width: "100%", height: "600px", border: "none" }}
                title="Template preview"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2 justify-center">
              <Button variant="destructive" onClick={closePreview}>
                Close
              </Button>
              <Button variant="primary" onClick={insertFromPreview}>
                Insert This Template
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VendorMassEmailModal;
