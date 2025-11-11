import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const MassUpdateEmailModal = ({
  isOpen,
  fields,
  selectedIds,
  selectedEmailContacts,
  onSendMassEmail,
  onClose
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All Templates');
  const [search, setSearch] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [selectedField, setSelectedField] = useState('');
  const [selectedFrom, setSelectedFrom] = useState('');
  const [fromError, setFromError] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [quill, setQuill] = useState(null);
  const [emailContent, setEmailContent] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rootRef = useRef(null);

  const templates = [
    {
      name: 'Welcome Email',
      content: `
        <div style="font-family: Arial, sans-serif; background: #fff; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 24px 32px 0 32px;">
            <div style="display: flex; align-items: center;">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDh14bUjCky34K9pZdbern0m0LY4KOvg7u5g&s" alt="LIC Insurance Logo" style="height: 48px; margin-right: 12px;">
              <span style="font-size: 1.5rem; font-weight: bold; color: #b71c1c; letter-spacing: 1px;">Canadian LIC</span>
            </div>
            <div style="text-align: right; font-size: 14px; color: #888;">
              888 888 8888<br>demo@zylker.com
            </div>
          </div>
          <div style="background: #ef6c5d; color: #fff; text-align: center; padding: 32px 24px 24px 24px;">
            <h2 style="margin: 0; font-size: 2rem; font-weight: bold;">Pre-Sales Management</h2>
            <div style="margin: 8px 0 0 0; font-size: 1.1rem;">Venue</div>
            <div style="margin: 4px 0 0 0; font-size: 1rem; font-weight: bold;">18th Dec 2016 at 11:00 AM UTC</div>
            <div style="margin: 4px 0 16px 0; font-size: 1rem;">Company street, Company city, Company country.</div>
            <a href="#" style="display: inline-block; background: #fff; color: #ef6c5d; padding: 10px 28px; border-radius: 4px; font-weight: bold; text-decoration: none; margin-top: 8px;">Register Now</a>
          </div>
          <div style="display: flex; justify-content: space-around; align-items: flex-end; padding: 32px 16px 0 16px;">
            <div style="text-align: center;">
              <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="CEO" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">
              <div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div>
              <div style="font-size: 13px; color: #888;">CEO, zylker</div>
            </div>
            <div style="text-align: center;">
              <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Manager" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">
              <div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div>
              <div style="font-size: 13px; color: #888;">Manager, zylker</div>
            </div>
            <div style="text-align: center;">
              <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Speaker" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">
              <div style="color: #ef6c5d; font-weight: bold; margin-top: 8px;">\${Leads.Last Name}</div>
              <div style="font-size: 13px; color: #888;">Speaker, zylker</div>
            </div>
          </div>
          <div style="padding: 24px 32px 24px 32px; font-size: 15px; color: #444;">
            This is your welcome paragraph. You can use this space to explain about your company and what it does.
          </div>
        </div>
      `
    },
    {
      name: 'Invoice Reminder',
      content: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#dc3545;">Invoice Reminder</h2>
          <p>Dear <strong>\${Leads.First Name}</strong>,</p>
          <p>This is a friendly reminder that your invoice <strong>#\${Invoice.Number}</strong> is due on <strong>\${Invoice.Due Date}</strong>.</p>
          <p>Please make the payment at your earliest convenience.</p>
          <p>Thank you!</p>
        </div>
      `
    },
    {
      name: 'Follow-up Mail',
      content: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#28a745;">Just Checking In</h2>
          <p>Hi <strong>\${Leads.First Name}</strong>,</p>
          <p>I wanted to follow up regarding our last conversation. Let me know if you have any questions or need further assistance.</p>
          <p>Looking forward to your response!</p>
        </div>
      `
    },
    {
      name: 'Promotion Offer',
      content: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#ffc107;">Special Promotion Just for You!</h2>
          <p>Dear <strong>\${Leads.First Name}</strong>,</p>
          <p>We're excited to offer you an exclusive promotion. Use code <strong>PROMO2025</strong> to get a special discount!</p>
          <p>Don't miss out—this offer is valid for a limited time only.</p>
        </div>
      `
    },
    {
      name: 'Feedback Request',
      content: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#17a2b8;">We Value Your Feedback</h2>
          <p>Hi <strong>\${Leads.First Name}</strong>,</p>
          <p>Your opinion matters to us! Please take a moment to let us know how we're doing and how we can improve.</p>
          <p><a href="#" style="color: #fff; background: #17a2b8; padding: 8px 16px; border-radius: 4px; text-decoration: none;">Give Feedback</a></p>
        </div>
      `
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        initQuillEditor();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  const sanitizeHtmlForQuill = (html) => {
    return html
      .replace(/style="[^"]*"/g, '')
      .replace(/<img[^>]*>/g, '')
      .replace(/<div[^>]*>/g, '<p>')
      .replace(/<\/div>/g, '</p>');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPreview = (template) => {
    setPreviewTemplate(template);
    setIsPreviewModalOpen(true);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
    setIsPreviewModalOpen(false);
  };

  const insertFromPreview = () => {
    if (quill && previewTemplate) {
      let html = previewTemplate.content || previewTemplate;
      html = sanitizeHtmlForQuill(html);
      quill.setContents([]);
      quill.enable(true);
      quill.clipboard.dangerouslyPasteHTML(0, html);
      setEmailContent(html);
      setEmailSubject(previewTemplate.name || '');
      closePreview();
      closeModal();
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const select = (item) => {
    if (quill) {
      const range = quill.getSelection(true);
      quill.insertText(range.index, item + '\n', 'user');
    }
    closeDropdown();
  };

  const onClickOutside = (e) => {
    if (rootRef.current && !rootRef.current.contains(e.target)) {
      closeDropdown();
    }
  };

  const initQuillEditor = () => {
    const editorElement = document.querySelector('#quill-editor');
    if (!editorElement) return;

    const quillInstance = new Quill(editorElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['clean'],
        ],
      },
      placeholder: 'Compose your email...',
    });

    quillInstance.on('text-change', () => {
      setEmailContent(quillInstance.root.innerHTML);
    });

    setQuill(quillInstance);
  };

  const sendMassEmail = () => {
    onSendMassEmail({
      from: selectedFrom,
      contactData: selectedEmailContacts,
      subject: emailSubject,
      content: emailContent,
    });
    handleClose();
  };

  const handleClose = () => {
    setSelectedField('');
    setSelectedFrom('');
    setFromError('');
    setEmailSubject('');
    if (quill) {
      quill.setText('');
    }
    setEmailContent('');
    onClose();
  };

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mass Email</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">To</label>
              <div className="mt-1 text-sm">
                {selectedEmailContacts?.length ? (
                  selectedEmailContacts.map((lead, idx) => (
                    <span key={lead.id}>
                      {lead.name}{idx < selectedEmailContacts.length - 1 ? ', ' : ''}
                    </span>
                  ))
                ) : (
                  <div className="text-muted-foreground">No recipients selected</div>
                )}
              </div>
            </div>

            <div className="dropdown" ref={rootRef}>
              <Button
                variant="outline"
                className="flex items-center justify-between w-1/3"
                onClick={toggleDropdown}
              >
                <span className="mr-2 border-r pr-2" onClick={openModal}>Insert Template</span>
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium">From</label>
              <Select value={selectedFrom} onValueChange={setSelectedFrom}>
                <SelectTrigger>
                  <SelectValue placeholder="Select from" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1@demo5.trigya.co">user1@demo5.trigya.co</SelectItem>
                  <SelectItem value="user2@demo5.trigya.co">user2@demo5.trigya.co</SelectItem>
                  <SelectItem value="user3@demo5.trigya.co">user3@demo5.trigya.co</SelectItem>
                </SelectContent>
              </Select>
              {fromError && <div className="text-destructive text-sm mt-1">{fromError}</div>}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Subject</label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Message</label>
              <div className="editor-container mt-1">
                <div id="quill-editor" className="min-h-[200px] border rounded-md"></div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={sendMassEmail}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-2xl">
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Template"
                  className="flex-1"
                />
              </div>
              {filteredTemplates.length ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredTemplates.map((template, i) => (
                    <li key={i} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <strong>{template.name || template}</strong>
                      </div>
                      <Button variant="link" onClick={() => openPreview(template)}>Preview</Button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {isPreviewModalOpen && (
        <Dialog open={isPreviewModalOpen} onOpenChange={closePreview}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{previewTemplate?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('desktop')}
                  className="mr-2"
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
                  className="w-full h-96"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closePreview}>Close</Button>
              <Button onClick={insertFromPreview}>Insert This Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MassUpdateEmailModal;
