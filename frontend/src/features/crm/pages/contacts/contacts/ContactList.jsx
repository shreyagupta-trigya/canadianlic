import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert2';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Search, Plus, Edit, Mail, Upload, Download, Settings, RotateCcw, Trash2 } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';
import { putUrl } from '@/boot/axios';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { verifyUser } from '@/verifyUser/verifyUser';
import { useSorting } from '@/hooks/useSorting';
import ContactSearchDrawer from './ContactSearchDrawer';
import MassUpdateModal from './MassUpdateModal';
import MassUpdateEmailModal from './MassUpdateEmailModal';
import ContactColumnManageDrawer from './ContactColumnManageDrawer';
import ContactTable from './components/ContactTable';
import ContactHeader from './components/ContactHeader';
import MobileHeader from './components/MobileHeader';
import MobileContactList from './components/MobileContactList';
import PaginationControls from './components/PaginationControls';
import Loader from '@/components/Loader';
import { putUrl as anotherPutUrl } from '@/boot/axios';
import { validateContactListData } from './utils/validation';
import { verifyUser as anotherVerifyUser } from '@/verifyUser/verifyUser';
import dummyData from './data.json';

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(70);
  const [isLoading, setIsLoading] = useState(true);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] = useState(false);
  const [showMassUpdate, setShowMassUpdate] = useState(false);
  const [showMassEmail, setShowMassEmail] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedEmailContacts, setSelectedEmailContacts] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const initialColumns = [
    { label: "Action", key: "actions", visible: true },
    { label: "Lead Converted On", key: "leadConvertedOn", visible: true },
    { label: "Created Time", key: "CREATEDTIME", visible: true },
    { label: "Lead Created On", key: "leadCreatedOn", visible: true },
    { label: "Deal Stage Tracking", key: "dealStageTracking", visible: true },
    { label: "Contact Name", key: "contactName", visible: true, compute: c => `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim() },
    { label: "Mobile", key: "mobile", visible: true },
    { label: "Email", key: "email", visible: true },
    { label: "Insurance Leads Source", key: "insuranceLeadsSource", visible: true },
    { label: "Assign Advisor", key: "advisorModuleName", visible: true },
    { label: "CLV Corporate Commission", key: "clvCorporateCommission", visible: true },
    { label: "CLV Advisor Commission", key: "clvAdvisorCommission", visible: true },
    { label: "Last CLV Corporate", key: "lastCLVCorporate", visible: true },
    { label: "Last CLV Advisor", key: "lastCLVAdvisor", visible: true },
    { label: "Phone", key: "phoneNumber", visible: true },
    { label: "Contact Owner", key: "UserfullName", visible: true },
    { label: "Mailing Street", key: "mailingStreet", visible: true },
    { label: "Mailing City", key: "mailingCity", visible: true },
    { label: "Mailing Zip", key: "mailingZip", visible: true },
    { label: "Relationship Status", key: "relationshipStatus", visible: true },
    { label: "Emergency Contact", key: "emergencyContact", visible: true },
    { label: "Emergency Contact Email", key: "emergencyContactEmail", visible: true },
    { label: "Emergency Contact Phone", key: "emergencyContactPhone", visible: true },
    { label: "Emergency Contact Relationship", key: "emergencyContactRelationship", visible: true },
    { label: "Preferred Contact Method", key: "preferredContactMethod", visible: true },
    { label: "Date of Birth", key: "dateOfBirth", visible: true },
    { label: "New Service Requested", key: "newServiceRequested", visible: true },
    { label: "GCLID", key: "gclid", visible: true }
  ];
  const [isLoading2, setIsLoading2] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const showAndHideState = true;
  const fetchContacts = async () => {
    try {
      setIsLoading2(true);
      const payload = {
        page: currentPage,
        limit: itemsPerPage,
      };
      const result = await validateContactListData(payload);
      if (result?.flattenedContacts) {
        setContacts(result.flattenedContacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch contacts",
        text: error.response?.data?.message || "Something went wrong"
      });
    } finally {
      setIsLoading2(false);
    }
  };
  const deleteContact = async (id) => {
    try {
      setIsLoading2(true);
      const response = await axios.delete(
        `${putUrl}contact/api/v1/deletecontact/${id}`
      );
      setContacts(contacts.filter(contact => contact.ROWID !== id));
      Swal.fire({
        title: "Contact Deleted Successfully",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      Swal.fire({
        title: "Error Deleting Contact",
        text: error.response?.data?.message || "An error occurred while deleting the contact.",
        icon: "error",
      });
    } finally {
      setIsLoading2(false);
    }
  };
  const exportToExcel = async () => {
    try {
      const sampleFile = await axios.post(`${putUrl}contact/api/v1/download-files`);
      const csvContent = sampleFile.data;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `contacts.csv`;
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Failed to export contacts"
      });
    }
  };
  const handleSearchResults = async (searchFields) => {
    try {
      setIsLoading2(true);
      if (Array.isArray(searchFields)) {
        const payload = {
          page: currentPage,
          limit: '300',
          search: searchFields
        };
        const result = await validateContactListData(payload);
        if (result?.flattenedContacts) {
          setContacts(result.flattenedContacts);
        } else {
          setContacts([]);
          Swal.fire("No results", "No contacts matched your search", "info");
        }
      } else {
        throw new Error("Search data format invalid");
      }
    } catch (error) {
      console.error('Error while fetching contacts:', error);
      Swal.fire("Search Failed", error?.response?.data?.message || "Something went wrong. Please try again.", "error");
      setContacts([]);
    } finally {
      setIsLoading2(false);
    }
  };
  const resetContacts = async () => {
    setIsLoading2(true);
    setCurrentPage(1);
    setItemsPerPage(10);
    setColumnWidths(visibleColumns.map(col => initialColumnWidths[col.label] || 350));
    await fetchContacts();
    setIsLoading2(false);
  };

  // Verify user on mount
  // useEffect(() => {
  //   const verifyAccess = async () => {
  //     const verified = await verifyUser();
  //     if (!verified) {
  //       navigate("/signin");
  //     }
  //   };
  //   verifyAccess();
  // }, [navigate]);

  // Fetch contacts on mount
  useEffect(() => {
    getAllContacts();
  }, []);

  // Get all contacts
  const getAllContacts = async () => {
    setIsLoading(true);
    try {
      // Use dummy data instead of API call
      setContacts(dummyData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch contacts'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete contact
  const deleteContactOld = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${putUrl}contact/deletecontact/${id}`);
      setContacts(prev => prev.filter(contact => contact.ROWID !== id));
      Swal.fire({
        title: "Contact Deleted Successfully",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete contact'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm delete
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonColor: "#E9C874",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (Array.isArray(id)) {
          Promise.all(id.map(contactId => deleteContact(contactId)))
            .then(() => {
              setSelectedContacts([]);
              Swal.fire({
                icon: "success",
                title: "Contacts Deleted Successfully",
                timer: 1500,
                showConfirmButton: false
              });
            });
        } else {
          deleteContact(id);
        }
      }
    });
  };

  const exportToExcelOld = () => {
    if (contacts.length === 0) return;
    const header = Object.keys(contacts[0]).join(",");
    const csvContent = contacts
      .map((contact) => Object.values(contact).join(","))
      .join("\n");
    const csvData = header + "\n" + csvContent;
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "contacts.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = contacts.slice(startIndex, endIndex);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const startPage = Math.max(1, currentPage - 1);
  const visiblePages = totalPages <= 3 ? pages : pages.slice(startPage - 1, startPage + 2);

  const { 
    currentPage: currentPage2, 
    totalPages: totalPages2, 
    itemsPerPage: itemsPerPage2, 
    visiblePages: visiblePages2, 
    goToPage, 
    goToFirst, 
    goToLast, 
    goToPrev, 
    goToNext, 
    setItemsPerPage,
    setCurrentPage: setCurrentPage2 
  } = usePagination(totalItems);

  const { 
    visibleColumns, 
    updateVisibleColumns, 
    isVisible 
  } = useColumnVisibility(initialColumns);

  const { 
    sortColumn, 
    sortOrder, 
    toggleSort 
  } = useSorting();

  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/contact/client/api/v2/get-contact-client-count`
        );
        setTotalItems(response?.data?.count || 0);
      } catch (error) {
        console.error("Error fetching contact count:", error);
      }
    };
    fetchTotalItems();
    fetchContacts();
  }, [currentPage, itemsPerPage]);

  const [columnWidths, setColumnWidths] = useState({});
  const [isResizing, setIsResizing] = useState(false);
  const [ghostLineX, setGhostLineX] = useState(0);
  const [resizingColumnIndex, setResizingColumnIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [tableLeftOffset, setTableLeftOffset] = useState(0);

  const initialColumnWidths = {
    'Action': 120,
    'Lead Converted On': 220,
    'Created Time': 210,
    'Lead Created On': 240,
    'Deal Stage Tracking': 250,
    'Contact Name': 180,
    'Mobile': 140,
    'Email': 150,
    'Insurance Leads Source': 300,
    'Assign Advisor': 280,
    'CLV Corporate Commission': 280,
    'CLV Advisor Commission': 280,
    'Last CLV Corporate': 280,
    'Last CLV Advisor': 280,
    'Phone': 140,
    'Contact Owner': 280,
    'Mailing Street': 280,
    'Mailing City': 280,
    'Mailing Zip': 280,
    'Relationship Status': 280,
    'Emergency Contact': 280,
    'Emergency Contact Email': 280,
    'Emergency Contact Phone': 280,
    'Emergency Contact Relationship': 280,
    'Preferred Contact Method': 280,
    'Date of Birth': 280,
    'New Service Requested': 280,
    'GCLID': 280
  };

  useEffect(() => {
    const widths = visibleColumns.map(col => initialColumnWidths[col.label] || 350);
    setColumnWidths(widths);
  }, [visibleColumns]);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 500);
  };

  const sortedContacts = useMemo(() => {
    let sorted = [...contacts];
    if (!sortColumn) return sorted;
    const col = visibleColumns.find(c => c.key === sortColumn);
    if (!col) return sorted;
    sorted.sort((a, b) => {
      let valA = col.compute ? col.compute(a) : a[col.key] ?? '';
      let valB = col.compute ? col.compute(b) : b[col.key] ?? '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      return sortOrder === 'asc'
        ? valA > valB ? 1 : valA < valB ? -1 : 0
        : valA < valB ? 1 : valA > valB ? -1 : 0;
    });
    return sorted;
  }, [contacts, sortColumn, sortOrder, visibleColumns]);

  const paginatedContacts2 = useMemo(() => {
    const start = (currentPage2 - 1) * itemsPerPage2;
    const end = start + itemsPerPage2;
    return sortedContacts.slice(start, end);
  }, [sortedContacts, currentPage2, itemsPerPage2]);

  const selectedEmailContactsComputed = useMemo(() => {
    return contacts
      .filter(c => selectedContacts.includes(c?.ROWID))
      .map(c => ({
        id: c?.ROWID,
        name: `${c?.firstName ?? ''} ${c?.lastName ?? ''}`.trim(),
        email: c?.email
      }));
  }, [contacts, selectedContacts]);

  const toggleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedContacts(contacts.map(item => item.ROWID));
    } else {
      setSelectedContacts([]);
    }
  };

  const confirmDeleteOld = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonColor: "#E9C874",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContactOld(id);
      }
    });
  };

  const deleteSelectedRecords = () => {
    if (window.confirm("Are you sure you want to delete the selected records?")) {
      deleteContact(selectedContacts);
      setSelectedContacts([]);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const startResize = (event, columnIndex, newWidths) => {
    setColumnWidths(newWidths);
  };

  const toggleColumnManageDrawer = () => {
    setIsColumnManageDrawerOpen(!isColumnManageDrawerOpen);
  };

  const closeColumnManageDrawer = () => {
    setIsColumnManageDrawerOpen(false);
  };

  const handleUpdateVisibleColumns = (updatedLabels) => {
    updateVisibleColumns(updatedLabels);
  };

  const openMassUpdatePopup = () => {
    setShowMassUpdate(true);
  };

  const closeMassUpdatePopup = () => {
    setShowMassUpdate(false);
  };

  const handleMassUpdate = async ({ field, value }) => {
    setIsLoading2(true);
    try {
      if (!selectedContacts?.length) {
        Swal.fire({ icon: "warning", text: "Please select at least one row." });
        return;
      }
      const payload = {
        field,
        value,
        ids: selectedLeads.length ? selectedLeads : selectedContacts
      };
      const response = await axios.post(
        `${putUrl}canadianlicapi/lead/api/v2/mass-update`,
        payload
      );
      Swal.fire({
        icon: "success",
        title: "Mass Update Successful",
        text: response.data?.message || "Contacts updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      await fetchContacts();
      closeMassUpdatePopup();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Mass Update Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsLoading2(false);
    }
  };

  const openMassEmailPopup = () => {
    setShowMassEmail(true);
  };

  const closeMassEmailPopup = () => {
    setShowMassEmail(false);
  };

  const handleMassEmail = async ({ from, contactData }) => {
    try {
      setIsLoading2(true);
      await axios.post(`${putUrl}contact/api/v1/send-mass-email`, {
        from,
        contactData,
        templateId: null
      });
      Swal.fire({ 
        icon: "success", 
        title: "Success!", 
        text: "Emails have been sent successfully" 
      });
      closeMassEmailPopup();
    } catch (error) {
      console.error("Error sending mass email:", error);
      Swal.fire({ 
        icon: "error", 
        title: "Failed to send emails", 
        text: error.response?.data?.message || "An error occurred while sending emails" 
      });
    } finally {
      setIsLoading2(false);
    }
  };

  const resetLeadList = async () => {
    setCurrentPage(1);
    setItemsPerPage(10);
    setColumnWidths(visibleColumns.map(col => initialColumnWidths[col.label] || 350));
    await resetContacts();
  };

  return (
    <>
      {/* Desktop View */}
      <div ref={desktopRef} className={isDesktop ? 'block' : 'hidden'}>
        <Card className="mb-6 shadow-lg border-0 bg-white">
          <ContactHeader
            showAndHideState={showAndHideState}
            onSearchClick={toggleDrawer}
            onMassUpdateClick={openMassUpdatePopup}
            onMassEmailClick={openMassEmailPopup}
            onImportClick={() => setIsImportModalOpen(true)}
            onExportClick={exportToExcel}
            onColumnManageClick={toggleColumnManageDrawer}
            onResetClick={resetLeadList}
            onDeleteSelectedClick={deleteSelectedRecords}
            selectedContacts={selectedContacts}
          />
          <CardContent className="px-0 pt-0 pb-2 mt-4">
            <ContactTable
              contacts={paginatedContacts2}
              visibleColumns={visibleColumns}
              selectedContacts={selectedContacts}
              onSelectContact={(id) => {
                if (selectedContacts.includes(id)) {
                  setSelectedContacts(selectedContacts.filter(cid => cid !== id));
                } else {
                  setSelectedContacts([...selectedContacts, id]);
                }
              }}
              onSelectAll={toggleSelectAll}
              onDeleteContact={confirmDelete}
              showAndHideState={showAndHideState}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              onSort={toggleSort}
              columnWidths={columnWidths}
              onResizeStart={startResize}
            />
            <PaginationControls
              currentPage={currentPage2}
              totalPages={totalPages2}
              visiblePages={visiblePages2}
              onPageChange={goToPage}
              onPrevPage={goToPrev}
              onNextPage={goToNext}
              onGoToFirst={goToFirst}
              onGoToLast={goToLast}
              itemsPerPage={itemsPerPage2}
              onItemsPerPageChange={setItemsPerPage}
              totalItems={totalItems}
            />
          </CardContent>
        </Card>
      </div>
      {/* Mobile View */}
      <div ref={mobileRef} style={{ display: isDesktop ? 'none' : 'block' }}>
        <MobileHeader showAndHideState={showAndHideState} onSearchClick={toggleDrawer} />
        <Loader loading={isLoading} />
        <MobileContactList contacts={paginatedContacts2} showAndHideState={showAndHideState} />
      </div>

      {/* Drawers and Modals */}
      <ContactSearchDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSearch={handleSearchResults}
      />
      <ContactColumnManageDrawer
        isOpen={isColumnManageDrawerOpen}
        onClose={closeColumnManageDrawer}
        columns={visibleColumns.map(col => col.label)}
        visibleColumns={visibleColumns.filter(col => col.visible).map(col => col.label)}
        onUpdateColumns={handleUpdateVisibleColumns}
      />
      <MassUpdateModal
        isOpen={showMassUpdate}
        fields={visibleColumns.map(col => col.key)}
        onUpdateMass={handleMassUpdate}
        onClose={closeMassUpdatePopup}
      />
      <MassUpdateEmailModal
        show={showMassEmail}
        onClose={closeMassEmailPopup}
        onSubmit={handleMassEmail}
        selectedContacts={selectedEmailContactsComputed}
      />

      {/* Import Modal */}
      <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import CSV</DialogTitle>
            <i className="fas fa-upload ms-3" aria-hidden="true"></i>
          </DialogHeader>
          <div className="modal-body">
            <p>You can browse your computer for a file.</p>
            <Input type="text" placeholder="Browse file..." className="mb-3" />
            <div className="form-check">
              <Checkbox id="importCheck" />
              <label className="custom-control-label" htmlFor="importCheck">
                I accept the terms and conditions
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <Button variant="secondary" onClick={() => setIsImportModalOpen(false)}>
              Close
            </Button>
            <Button>Upload</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ghost Line for Resizing */}
      {isResizing && (
        <div
          style={{
            position: 'absolute',
            left: ghostLineX,
            top: 0,
            width: '2px',
            height: '100%',
            backgroundColor: 'blue',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
};

export default ContactList;
