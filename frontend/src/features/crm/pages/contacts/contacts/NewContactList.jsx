import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Search, Plus, Edit, Mail, Upload, Download, Settings, RotateCcw, Trash2, Eye } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { useSorting } from '@/hooks/useSorting';
import Loader from '@/components/Loader';
import { putUrl } from '@/boot/axios';
import { verifyUser } from '@/verifyUser/verifyUser';

// Import components
import MassUpdateModal from './MassUpdateModal';
import MassUpdateEmailModal from './MassUpdateEmailModal';
import ContactColumnManageDrawer from './ContactColumnManageDrawer';
import ContactTable from './components/ContactTable';
import ContactHeader from './components/ContactHeader';
import MobileHeader from './components/MobileHeader';
import MobileContactList from './components/MobileContactList';
import PaginationControls from './components/PaginationControls';
import ContactSearchDrawer from './ContactSearchDrawer';

const NewContactList = () => {
  const navigate = useNavigate();
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  // State management
  const [isDesktop, setIsDesktop] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedEmailContacts, setSelectedEmailContacts] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] = useState(false);
  const [showMassUpdate, setShowMassUpdate] = useState(false);
  const [showMassEmail, setShowMassEmail] = useState(false);

  // Column configuration
  const initialColumns = [
    { label: "Action", key: "actions", visible: true },
    { label: "Lead Converted On", key: "leadConvertedOn", visible: true },
    { label: "Created Time", key: "CREATEDTIME", visible: true },
    { label: "Lead Created On", key: "leadCreatedOn", visible: true },
    { label: "Deal Stage Tracking", key: "dealStageTracking", visible: true },
    {
      label: "Contact Name",
      key: "contactName",
      visible: true,
      compute: c => `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim()
    },
    { label: "Mobile", key: "mobile", visible: true },
    { label: "Email", key: "email", visible: true },
    { label: "Insurance Leads Source", key: "insuranceLeadsSource", visible: true },
    { label: "Assign Advisor", key: "advisorModuleName", visible: true },
    { label: "CLV Corporate Commission", key: "clvCorporateCommission", visible: true },
    { label: "CLV Advisor Commission", key: "clvAdvisorCommission", visible: true },
    { label: "Last CLV Corporate", key: "lastCLVCorporate", visible: true },
    { label: "Last CLV Advisor", key: "lastCLVAdvisor", visible: true },
    { label: "Phone", key: "phoneNumber", visible: true }
  ];

  const initialColumnWidths = {
    'Action': 120,
    'Lead Converted On': 220,
    'Created Time': 210,
    'Lead Created On': 240,
    'Deal Stage Tracking': 250,
    'Contact Name': 180,
    'Mobile': 140,
    'Email': 150
  };

  // Custom hooks
  const { currentPage, totalPages, itemsPerPage, visiblePages, goToPage, goToPrev, goToNext, goToFirst, goToLast, setItemsPerPage, setCurrentPage } = usePagination(totalItems);
  const { visibleColumns, updateVisibleColumns, isVisible } = useColumnVisibility(initialColumns);
  const { sortColumn, sortOrder, toggleSort } = useSorting();

  // Column width management
  const [columnWidths, setColumnWidths] = useState({});
  const [isResizing, setIsResizing] = useState(false);
  const [ghostLineX, setGhostLineX] = useState(0);
  const [resizingColumnIndex, setResizingColumnIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [tableLeftOffset, setTableLeftOffset] = useState(0);

  useEffect(() => {
    const widths = visibleColumns.map(col => initialColumnWidths[col.label] || 350);
    setColumnWidths(widths);
  }, [visibleColumns]);

  // Verify user on component mount
  // useEffect(() => {
  //   const verifyAccess = async () => {
  //     const verified = await verifyUser();
  //     if (!verified) {
  //       navigate("/signin");
  //     }
  //   };
  //   verifyAccess();
  // }, [navigate]);

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 500);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${putUrl}canadianlicapi/contact/client/api/v2/get-contact-client-count`
        );
        setTotalItems(response?.data?.count || 0);
      } catch (error) {
        console.error("Error fetching contact count:", error);
      }
      fetchContacts();
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  // Data fetching
  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const payload = {
        page: currentPage,
        limit: itemsPerPage,
      };
      const response = await axios.get(`${putUrl}contact/getcontact`, { params: payload });
      const flattenedContacts = response.data.contactData.map(item => ({
        ...item.contactSubDetails,
        ...item.contacts,
      }));
      setContacts(flattenedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch contacts",
        text: error.response?.data?.message || "Something went wrong"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Contact management functions
  const deleteContact = async (id) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

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

  // Selection handlers
  const toggleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedContacts(contacts.map(item => item.ROWID));
    } else {
      setSelectedContacts([]);
    }
  };

  const deleteSelectedRecords = () => {
    if (selectedContacts.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Contacts Selected',
        text: 'Please select at least one contact to delete.'
      });
      return;
    }

    confirmDelete(selectedContacts);
  };

  // Export functionality
  const exportToExcel = async () => {
    try {
      const response = await axios.post(`${putUrl}contact/api/v1/download-files`);
      const csvContent = response.data;
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

  // UI state handlers
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleColumnManageDrawer = () => setIsColumnManageDrawerOpen(!isColumnManageDrawerOpen);
  const closeColumnManageDrawer = () => setIsColumnManageDrawerOpen(false);

  // Mass update handlers
  const openMassUpdatePopup = () => setShowMassUpdate(true);
  const closeMassUpdatePopup = () => setShowMassUpdate(false);

  const handleMassUpdate = async ({ field, value }) => {
    if (!selectedContacts?.length) {
      Swal.fire({ icon: "warning", text: "Please select at least one row." });
      return;
    }

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Mass email handlers
  const openMassEmailPopup = () => setShowMassEmail(true);
  const closeMassEmailPopup = () => setShowMassEmail(false);

  const handleMassEmail = async ({ from, contactData }) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Column resize handlers
  const startResize = (event, columnIndex) => {
    setIsResizing(true);
    setResizingColumnIndex(columnIndex);
    setStartX(event.clientX);
    setStartWidth(columnWidths[columnIndex]);

    const tableWrapper = document.querySelector('.scrollable-container');
    const scrollLeft = tableWrapper ? tableWrapper.scrollLeft : 0;
    const offsetLeft = tableWrapper ? tableWrapper.getBoundingClientRect().left : 0;

    setTableLeftOffset(offsetLeft);
    setGhostLineX(event.clientX - offsetLeft + scrollLeft);

    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onDragging);
    document.addEventListener('mouseup', stopResize);
  };

  const onDragging = (event) => {
    if (isResizing) {
      const tableWrapper = document.querySelector('.scrollable-container');
      const scrollLeft = tableWrapper ? tableWrapper.scrollLeft : 0;
      const offsetLeft = tableWrapper ? tableWrapper.getBoundingClientRect().left : 0;

      const moved = event.clientX - startX;
      const newWidth = startWidth + moved;

      if (newWidth >= 60) {
        setGhostLineX(event.clientX - offsetLeft + scrollLeft);
      } else {
        setGhostLineX(startX - offsetLeft + scrollLeft + (60 - startWidth));
      }
    }
  };

  const stopResize = (event) => {
    if (isResizing && resizingColumnIndex !== null) {
      const moved = event.pageX - startX;
      const newWidth = startWidth + moved;
      const finalWidth = Math.max(60, newWidth);
      const newWidths = [...columnWidths];
      newWidths[resizingColumnIndex] = finalWidth;
      setColumnWidths(newWidths);
    }

    setIsResizing(false);
    setGhostLineX(0);
    setResizingColumnIndex(null);

    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onDragging);
    document.removeEventListener('mouseup', stopResize);
  };

  // Sorting and filtering
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

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedContacts.slice(start, end);
  }, [sortedContacts, currentPage, itemsPerPage]);

  const selectedEmailContactsComputed = useMemo(() => {
    return contacts
      .filter(c => selectedContacts.includes(c?.ROWID))
      .map(c => ({
        id: c?.ROWID,
        name: `${c?.firstName ?? ''} ${c?.lastName ?? ''}`.trim(),
        email: c?.email
      }));
  }, [contacts, selectedContacts]);

  // Reset functionality
  const resetContactList = async () => {
    setCurrentPage(1);
    setItemsPerPage(10);
    setColumnWidths(visibleColumns.map(col => initialColumnWidths[col.label] || 350));
    await fetchContacts();
  };

  // Search functionality
  const handleSearchResults = async (searchFields) => {
    try {
      setIsLoading(true);
      if (Array.isArray(searchFields)) {
        const payload = {
          page: currentPage,
          limit: '300',
          search: searchFields
        };
        const response = await axios.post(`${putUrl}contact/search`, payload);
        if (response.data?.contacts) {
          setContacts(response.data.contacts);
        } else {
          setContacts([]);
          Swal.fire("No results", "No contacts matched your search", "info");
        }
      } else {
        throw new Error("Search data format invalid");
      }
    } catch (error) {
      console.error('Error while searching contacts:', error);
      Swal.fire("Search Failed", error?.response?.data?.message || "Something went wrong. Please try again.", "error");
      setContacts([]);
    } finally {
      setIsLoading(false);
      closeDrawer();
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div ref={desktopRef} className={isDesktop ? 'block' : 'hidden'}>
        <Card className="mb-6 shadow-lg border-0 bg-white">
          <ContactHeader
            onSearchClick={toggleDrawer}
            onMassUpdateClick={openMassUpdatePopup}
            onMassEmailClick={openMassEmailPopup}
            onImportClick={() => setIsImportModalOpen(true)}
            onExportClick={exportToExcel}
            onColumnManageClick={toggleColumnManageDrawer}
            onResetClick={resetContactList}
            onDeleteSelectedClick={deleteSelectedRecords}
            selectedContacts={selectedContacts}
          />
          
          <CardContent className="px-0 pt-0 pb-2">
            <ContactTable
              contacts={paginatedContacts}
              visibleColumns={visibleColumns}
              selectedContacts={selectedContacts}
              onSelectContact={(id) => {
                if (selectedContacts.includes(id)) {
                  setSelectedContacts(prev => prev.filter(cid => cid !== id));
                } else {
                  setSelectedContacts(prev => [...prev, id]);
                }
              }}
              onSelectAll={toggleSelectAll}
              onDeleteContact={confirmDelete}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              onSort={toggleSort}
              columnWidths={columnWidths}
              onResizeStart={startResize}
            />

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              visiblePages={visiblePages}
              onPageChange={goToPage}
              onPrevPage={goToPrev}
              onNextPage={goToNext}
              onGoToFirst={goToFirst}
              onGoToLast={goToLast}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              totalItems={totalItems}
            />
          </CardContent>
        </Card>
      </div>

      {/* Mobile View */}
      <div ref={mobileRef} className={isDesktop ? 'hidden' : 'block'}>
        <MobileHeader onSearchClick={toggleDrawer} />
        <MobileContactList 
          contacts={paginatedContacts}
          onDeleteContact={confirmDelete} 
        />
      </div>

      {/* Loading Indicator */}
      {isLoading && <Loader />}

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
        onUpdateColumns={updateVisibleColumns}
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
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import CSV
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select a CSV file from your computer to import contacts.
            </p>
            <Input 
              type="file" 
              accept=".csv"
              className="cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the terms and conditions
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Upload
            </Button>
          </DialogFooter>
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

export default NewContactList;
