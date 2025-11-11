import React, { useState, useRef } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const MassUpdateEmailModal = ({ isOpen, fields, selectedIds, selectedEmailLeads, onClose, onSend }) => {
  const [selectedFrom, setSelectedFrom] = useState("user1@demo5.trigya.co");
  const [fromError, setFromError] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const quillRef = useRef(null);

  // New states for template functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All Templates");
  const [search, setSearch] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');

  const templates = [
    {
      name: "Welcome Email",
      content: `<div style="font-family: Arial, sans-serif; background: #fff; max-width: 600px; margin: 0 auto; border: 1px solid #eee;"><!-- Header --><div style="display: flex; justify-content: space-between; align-items: center; padding: 24px 32px 0 32px;"><div style="display: flex; align-items: center;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDh14bUjCky34K9pZdbern0m0LY4KOvg7u5g&s" alt="LIC Insurance Logo" style="height: 48px; margin-right: 12px;" /><span style="font-size: 1.5rem; font-weight: bold; color: #b71c1c; letter-spacing: 1px;">Canadian LIC</span></div><div style="text-align: right; font-size: 14px; color: #888;">888 888 8888<br />demo@zylker.com</div></div><!-- Banner --><div style="background: #ef6c5d; color: #fff; text-align: center; padding: 32px 24px 24px 24px;"><h2 style="margin: 0; font-size: 2rem; font-weight: bold;">Pre-Sales Management</h2><div style="margin: 8px 0 0 0; font-size: 1.1rem;">Venue</div><div style="margin: 4px 0 0 0; font-size: 1rem; font-weight: bold;">18th Dec 2016 at 11:00 AM UTC</div><div style="margin: 4px 0 16px 0; font-size: 1rem;">Company street, Company city, Company country.</div><a href="#" style="display: inline-block; background: #fff; color: #ef6c5d; padding: 10px 28px; border-radius: 4px; font-weight: bold; text-decoration: none; margin-top: 8px;">Register Now</a></div><!-- Team Images Row --><div style="display: flex; justify-content: space-around; align-items: flex-end; padding: 32px 16px 0 16px;"><div style="text-align: center;"><img src="https://randomuser.me/api/portraits/women/1.jpg" alt="CEO" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;" /><div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div><div style="font-size: 13px; color: #888;">CEO, zylker</div></div><div style="text-align: center;"><img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Manager" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;" /><div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div><div style="font-size: 13px; color: #888;">Manager, zylker</div></div><div style="text-align: center;"><img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Speaker" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;" /><div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div><div style="font-size: 13px; color: #888;">Speaker, zylker</div></div></div><!-- Footer --><div style="padding: 24px 32px 24px 32px; font-size: 15px; color: #444;">This is your welcome paragraph. You can use this space to explain about your company and what it does. You will see all the formatting options once</div></div>`
    },
    {
      name: "Invoice Reminder",
      content: `<div style="font-family: Arial; padding: 20px;"><h2 style="color:#dc3545;">Invoice Reminder</h2><p>Dear <strong>\${Leads.First Name}</strong>,</p><p>This is a friendly reminder that your invoice <strong>#\${Invoice.Number}</strong> is due on <strong>\${Invoice.Due Date}</strong>.</p><p>Please make the payment at your earliest convenience.</p><p>Thank you!</p></div>`
    },
    {
      name: "Follow-up Mail",
      content: `<div style="font-family: Arial; padding: 20px;"><h2 style="color:#28a745;">Just Checking In</h2><p>Hi <strong>\${Leads.First Name}</strong>,</p><p>I wanted to follow up regarding our last conversation. Let me know if you have any questions or need further assistance.</p><p>Looking forward to your response!</p></div>`
    },
    {
      name: "Promotion Offer",
      content: `<div style="font-family: Arial; padding: 20px;"><h2 style="color:#ffc107;">Special Promotion Just for You!</h2><p>Dear <strong>\${Leads.First Name}</strong>,</p><p>We're excited to offer you an exclusive promotion. Use code <strong>PROMO2025</strong> to get a special discount!</p><p>Don't miss out—this offer is valid for a limited time only.</p></div>`
    },
    {
      name: "Feedback Request",
      content: `<div style="font-family: Arial; padding: 20px;"><h2 style="color:#17a2b8;">We Value Your Feedback</h2><p>Hi <strong>\${Leads.First Name}</strong>,</p><p>Your opinion matters to us! Please take a moment to let us know how we're doing and how we can improve.</p><p><a href="#" style="color: #fff; background: #17a2b8; padding: 8px 16px; border-radius: 4px; text-decoration: none;">Give Feedback</a></p></div>`
    }
  ];

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      setEmailSubject(previewTemplate.name || '');
      closePreview();
      closeModal();
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
      leads: selectedEmailLeads,
      subject: emailSubject,
      content: emailContent
    });

    handleClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Mass Email</DialogTitle>
            <DialogDescription>
              Send emails to selected leads.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4">
            <div>
              <Label>To</Label>
              <div className="mt-1 text-sm">
                {selectedEmailLeads?.length ? (
                  selectedEmailLeads.map((lead, idx) => (
                    <span key={lead.ROWID}>
                      {`${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim()}{idx < selectedEmailLeads.length - 1 ? ', ' : ''}
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
                onClick={openModal}
                className="flex items-center justify-between w-1/3"
              >
                <span>Insert Template</span>
              </Button>
            </div>
            <div>
              <Label htmlFor="from-select">From</Label>
              <Select value={selectedFrom} onValueChange={setSelectedFrom}>
                <SelectTrigger className="w-full">
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
                className="min-h-32"
                style={{ height: '200px' }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={sendMassEmail}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Select Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
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
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('desktop')}
              >
                Desktop
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('mobile')}
              >
                Mobile
              </Button>
            </div>
            <div className={`border ${previewMode === 'mobile' ? 'w-80' : 'w-full'}`}>
              <iframe
                srcDoc={previewTemplate?.content}
                style={{ width: '100%', height: '600px', border: 'none' }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={closePreview}>
              Close
            </Button>
            <Button variant="primary" onClick={insertFromPreview}>
              Insert This Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MassUpdateEmailModal;
