import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { putUrl } from '@/boot/axios';
import { verifyUser } from '@/verifyUser/verifyUser';
import { validateContactListData } from './utils/validation';
import dummyData from './data.json';

// Shadcn components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Icons
import { Eye, Edit, Trash2, Upload, Download, Plus, Search, RefreshCw, SlidersHorizontal, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';

// Components
import Loader from '../utils/Loader';
import Drawer from './contractDrawer/Drawer.jsx';
import MassUpdateModal from './MassUpdateModal.jsx';
import MassUpdateEmailModal from './MassUpdateEmailModal.jsx';
import ContactColumnManageDrawer from './ContactColumnManageDrawer.jsx';

const ContactListView = () => {
  // State management
  const [contacts, setContacts] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchDetail, setShowSearchDetail] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [showAndHideState, setShowAndHideState] = useState({
    deleteButton: false,
    editButton: false,
    previewButton: false,
    import: false,
    export: false,
    addButton: false,
  });
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([
    { label: "Action", key: "actions", visible: true },
    { label: "Lead Converted On", key: "leadConvertedOn", visible: true },
    { label: "Created Time", key: "CREATEDTIME", visible: true },
    { label: "Lead Created On", key: "leadCreatedOn", visible: true },
    { label: "Deal Stage Tracking", key: "dealStageTracking", visible: true },
    {
      label: "Contact Name", key: "contactName", visible: true,
      compute: c => `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim()
    },
    { label: "Mobile", key: "mobile", visible: true },
    { label: "Email", key: "email", visible: true },
    { label: "Service Availed Options", key: "serviceAvailedOptions", visible: true },
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
  ]);
  const [columnWidths, setColumnWidths] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [searchPayloadFlag, setSearchPayloadFlag] = useState(false);

  // Mass Update & Mass Email
  const [showMassUpdate, setShowMassUpdate] = useState(false);
  const [showMassEmail, setShowMassEmail] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedEmailContacts, setSelectedEmailContacts] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);

  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumnIndex, setResizingColumnIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [ghostLineX, setGhostLineX] = useState(0);
  const [tableLeftOffset, setTableLeftOffset] = useState(0);

  const desktopRef = useRef(null);

  // Initial column widths
  const initialColumnWidths = {
    'Action': 120,
    'Lead Converted On': 220,
    'Created Time': 210,
    'Lead Created On': 240,
    'Deal Stage Tracking': 250,
    'Contact Name': 180,
    'Mobile': 140,
    'Email': 150,
    'Service Availed Options': 300,
    'Insurance Leads Source': 300,
    'Assign Advisor': 280,
    'CLV Corporate Commission': 280,
    'CLV Advisor Commission': 280,
    'Last CLV Corporate': 280,
    'Last CLV Advisor': 280,
    'Phone': 140,
  };

  // Computed properties
  const sortedContacts = React.useMemo(() => {
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

  const paginatedContacts = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedContacts.slice(start, end);
  }, [sortedContacts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visiblePages = React.useMemo(() => {
    const pages = [];
    const total = totalPages;
    const current = currentPage;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  const computedSelectedEmailContacts = React.useMemo(() => {
    return contacts
      .filter(c => selectedContacts.includes(c?.ROWID))
      .map(c => ({
        id: c?.ROWID,
        name: `${c?.firstName ?? ''} ${c?.lastName ?? ''}`.trim(),
        email: c?.email
      }));
  }, [contacts, selectedContacts]);

  // Effects
  useEffect(() => {
    const initializeComponent = async () => {
      setIsLoading(true);
      try {
        // Use dummy data instead of API
        setContacts(dummyData);
        setOriginalContacts(dummyData);
        setTotalItems(dummyData.length);

        const verified = await verifyUser();
        // if (!verified) {
        //   window.location.href = '/signin';
        // }
      } catch (error) {
        console.error('Error initializing component:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, []);

  useEffect(() => {
    setColumnWidths(visibleColumns.map(col => initialColumnWidths[col.label] || 350));
  }, [visibleColumns]);

  useEffect(() => {
    checkScreenSize();
    getContactClientCount();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Methods
  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 500);
  };

  const getContactClientCount = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${putUrl}canadianlicapi/contact/client/api/v2/get-contact-client-count`
      );
      setTotalItems(response?.data?.count);
    } catch (error) {
      console.error("Error fetching contact count", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const payload = {
        page: currentPage,
        limit: itemsPerPage,
      };
      const result = await validateContactListData(payload);
      if (result && result.flattenedContacts) {
        setContacts(result.flattenedContacts);
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchResults = async (searchFields) => {
    console.log('Filtered Leads from Drawer:', searchFields);
    setIsLoading(true);

    try {
      if (Array.isArray(searchFields)) {
        const payload = {
          page: currentPage,
          limit: '300',
          search: searchFields
        };
        setIsLoading(true);
        const result = await validateContactListData(payload);
        if (result && result.flattenedContacts) {
          setContacts(result.flattenedContacts);
        } else {
          console.warn('Unexpected response format:', result);
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
      setIsLoading(false);
      setIsDrawerOpen(false);
    }
  };

  const toggleSort = (header) => {
    if (sortColumn === header) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(header);
      setSortOrder('asc');
    }
  };

  const formatCreatedDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    return moment(dateTime).format("DD-MM-YYYY   hh:mm A");
  };

  const resetLeadList = async () => {
    setIsLoading(true);
    setCurrentPage(1);
    setItemsPerPage(10);
    setColumnWidths(visibleColumns.map(col => initialColumnWidths[col.label] || 350));
    setSearchPayloadFlag(false);

    await getContactClientCount();
    await fetchContacts();

    setIsLoading(false);
  };

  const prevPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      await fetchContacts();
    }
  };

  const nextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      await fetchContacts();
    }
  };

  const gotoPage = async (pageNumber) => {
    setCurrentPage(pageNumber);
    await fetchContacts();
  };

  const goTOFirstPage = async () => {
    setCurrentPage(1);
    await fetchContacts();
  };

  const goTOLastPage = async () => {
    setCurrentPage(totalPages);
    await fetchContacts();
  };

  const toggleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedContacts(contacts.map(item => item.ROWID));
    } else {
      setSelectedContacts([]);
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
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContact(id);
      }
    });
  };

  const deleteSelectedRecords = () => {
    if (window.confirm("Are you sure you want to delete the selected records?")) {
      let idArray = [];
      for (let value of selectedContacts) {
        idArray.push(value);
      }
      deleteContact(idArray);
      setContacts([]);
      showSearchDetails();
    }
  };

  const deleteContact = async (id) => {
    setIsLoading(true);
    console.log(id);
    try {
      const response = await axios.delete(
        `${putUrl}contact/api/v1/deletecontact/${id}`
      );
      setIsLoading(false);
      setContacts(contacts.filter((contact) => contact.ROWID !== id));
      console.log(response.data.message);
      Swal.fire({
        title: "<strong>Contact Deleted Successfully</strong>",
        icon: "success",
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Swal.fire({
        title: "<strong>Error Deleting Contact</strong>",
        text: error.response && error.response.data ? error.response.data.message : "An error occurred while deleting the contact.",
        icon: "error",
      });
    }
  };

  const downloadFile = async () => {
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
    }
  };

  const exportToExcel = () => {
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleColumnManageDrawer = () => {
    setIsColumnManageDrawerOpen(!isColumnManageDrawerOpen);
  };

  const closeColumnManageDrawer = () => {
    setIsColumnManageDrawerOpen(false);
  };

  const handleUpdateVisibleColumns = (updatedLabels) => {
    setVisibleColumns(visibleColumns.map(col => ({
      ...col,
      visible: updatedLabels.includes(col.label)
    })));
  };

  const isVisible = (colLabel) => {
    return visibleColumns.some(col => col.label === colLabel && col.visible);
  };

  // Mass Update & Mass Email Methods
  const openMassUpdatePopup = () => {
    setShowMassUpdate(true);
  };

  const closeMassUpdatePopup = () => {
    setShowMassUpdate(false);
  };

  const handleMassUpdate = async ({ field, value }) => {
    setIsLoading(true);
    try {
      if (!selectedContacts?.length) {
        Swal.fire({ icon: "warning", text: "Please select at least one row." });
        return;
      }
      const payload = {
        field,
        value,
        ids: selectedLeads.length ? selectedLeads : []
      };
      const response = await axios.post(
        `${putUrl}canadianlicapi/lead/api/v2/mass-update`,
        payload
      );
      Swal.fire({
        icon: "success",
        title: "Mass Update Successful",
        text: response.data?.message || "Leads updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      await fetchContacts();
      setShowMassUpdate(false);
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

  const openMassEmailPopup = () => {
    setShowMassEmail(true);
  };

  const closeMassEmailPopup = () => {
    setShowMassEmail(false);
  };

  const handleMassEmail = ({ from, contactData }) => {
    axios.post('/send-mass-email', {
      contactData
    }).then(() => {
      Swal.fire({ icon: "success", title: "Emails sent!" });
    }).catch(() => {
      Swal.fire({ icon: "error", title: "Failed to send emails" });
    });
  };

  // Resizing methods
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

  const showSearchDetails = () => {
    const item = document.querySelector(".message-details");
    if (item) {
      item.style.transform = showSearchDetail ? 'translateX(0)' : 'translateX(100%)';
      setShowSearchDetail(!showSearchDetail);
    }
  };

  const updateItemsPerPage = (size) => {
    setItemsPerPage(size);
  };

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        speed={500}
        onClose={closeDrawer}
        onSearchResults={handleSearchResults}
        isLoading={isLoading}
      />

      <ContactColumnManageDrawer
        isOpen={isColumnManageDrawerOpen}
        columns={visibleColumns.map(col => col.label)}
        visibleColumns={visibleColumns.filter(col => col.visible).map(col => col.label)}
        onUpdateColumns={handleUpdateVisibleColumns}
        onClose={closeColumnManageDrawer}
      />

      {isDesktop && (
        <Card className="no-scroll me-2" style={{ minHeight: '90vh' }} ref={desktopRef}>
          {/* Header Section */}
          <CardHeader className="pb-0 mt-3 pe-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="mb-0">All Contacts</CardTitle>
              </div>
              <div className="flex items-center">
                {/* Add New Contact Button */}
                <Link to="/crm/contacts/create" className="mx-1">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 " />
                    New Contact
                  </Button>
                </Link>

                {/* Import Button and Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mx-1">
                      Import
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Import CSV</DialogTitle>
                      <DialogDescription>
                        You can browse your computer for a file.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <input
                        type="text"
                        placeholder="Browse file..."
                        className="mb-3 form-control"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox id="importCheck" />
                        <label
                          htmlFor="importCheck"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I accept the terms and conditions
                        </label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Close</Button>
                      <Button type="submit">Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Export Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-1"
                  onClick={exportToExcel}
                >
                  Export
                </Button>

                {/* Actions Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="mx-1">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={openMassUpdatePopup}>
                      Mass Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={openMassEmailPopup}>
                      Mass Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Search Button */}
                <Button onClick={toggleDrawer} variant="outline" size="sm" className="mx-1">
                  <Search className="w-4 h-4" />
                </Button>

                {/* Refresh Button */}
                <Button onClick={resetLeadList} variant="outline" size="sm" className="mx-1">
                  <RefreshCw className="w-4 h-4" />
                </Button>

                {/* Column Manage Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="mx-1 px-2 py-1">
                      <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[180px]">
                    <DropdownMenuItem onClick={toggleColumnManageDrawer}>
                      Manage Columns
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          {/* Body Section */}
          <CardContent className="px-2 pt-0 pb-2">
            <div className="scrollable-container table-responsive pb-0">
              {isResizing && (
                <div
                  className="ghost-line"
                  style={{ left: `${ghostLineX}px` }}
                />
              )}

              <MassUpdateModal
                isOpen={showMassUpdate}
                onClose={closeMassUpdatePopup}
                fields={visibleColumns.filter(col => col.label !== 'Action').map(col => col.label)}
                onUpdateMass={handleMassUpdate}
              />

              <MassUpdateEmailModal
                isOpen={showMassEmail}
                fields={visibleColumns.map(col => col.label)}
                selectedEmailContacts={computedSelectedEmailContacts}
                selectedIds={selectedLeads}
                templates={emailTemplates}
                onClose={closeMassEmailPopup}
                onSendMassEmail={handleMassEmail}
              />

              {/* Contact List Table */}
              <Table className="resizable-table table align-items-center mb-0">
                <TableHeader className="thead-light bottom-border-light">
                  <TableRow>
                    {/* Checkbox Column */}
                    <TableHead className="ps-1 pe-0" style={{ width: '80px', position: 'relative' }}>
                      <div className="flex justify-center">
                        <Checkbox
                          checked={selectedContacts.length && selectedContacts.length === contacts.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </div>
                    </TableHead>

                    {/* Dynamic Columns */}
                    {visibleColumns.filter(col => col.visible).map((col, index) => (
                      <TableHead
                        key={col.key}
                        className="px-auto text-uppercase text-xs text-start"
                        style={{ position: 'relative', width: `${columnWidths[index]}px` }}
                      >
                        <div className="flex items-center justify-between pe-2">
                          <span>{col.label}</span>
                          {/* Sort Icons */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-1 h-auto">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[180px]">
                              <DropdownMenuItem onClick={() => toggleSort(col.key)} className="flex items-center gap-2">
                                {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                <span>
                                  {sortColumn === col.key ? (sortOrder === 'asc' ? 'Asc' : 'Des') : 'Asc'}
                                </span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        {index !== visibleColumns.filter(col => col.visible).length - 1 && (
                          <div
                            className="resizer"
                            onMouseDown={(e) => startResize(e, index)}
                          />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedContacts.map((contact) => (
                    <TableRow key={contact.contactROWID || contact.ROWID} className="bottom-border-light px-2 hover:bg-gray-50">
                      {/* Checkbox */}
                      <TableCell>
                        <div className="flex">
                          <Checkbox
                            checked={selectedContacts.includes(contact.ROWID)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedContacts([...selectedContacts, contact.ROWID]);
                              } else {
                                setSelectedContacts(selectedContacts.filter(id => id !== contact.ROWID));
                              }
                            }}
                          />
                        </div>
                      </TableCell>

                      {/* Actions */}
                      {isVisible('Action') && (
                        <TableCell className="ps-0 text-sm">
                          <div className="flex items-start ml-4">
                            {showAndHideState.previewButton && (
                              <Link to={`/contactview/${contact.contactROWID || contact.ROWID}`}>
                                <Button variant="ghost" size="sm" className="p-1">
                                  <Eye className="w-4 h-4 text-blue-500" />
                                </Button>
                              </Link>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="p-1">
                                  <MoreHorizontal className="w-4 h-4 text-blue-500" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                {showAndHideState.editButton && (
                                  <DropdownMenuItem asChild>
                                    <Link to={`/contact/${contact.contactROWID || contact.ROWID}`}>
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                                {showAndHideState.deleteButton && (
                                  <DropdownMenuItem onClick={() => confirmDelete(contact.contactROWID || contact.ROWID)}>
                                    Delete
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      )}

                      {isVisible('Lead Converted On') && (
                        <TableCell className="ps-0">{contact.leadConvertedOn}</TableCell>
                      )}

                      {isVisible('Created Time') && (
                        <TableCell className="ps-0">{formatCreatedDateTime(contact.CREATEDTIME)}</TableCell>
                      )}

                      {isVisible('Lead Created On') && (
                        <TableCell className="ps-0">{contact.leadCreatedOn}</TableCell>
                      )}

                      {isVisible('Deal Stage Tracking') && (
                        <TableCell className="ps-0">{contact.dealStageTracking}</TableCell>
                      )}

                      {isVisible('Contact Name') && (
                        <TableCell className="ps-0">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-white mr-2">
                              {(contact.firstName ?? '').slice(0, 2).toUpperCase()}
                            </div>
                            <span>{(contact.firstName ?? '') + ' ' + (contact.lastName ?? '')}</span>
                          </div>
                        </TableCell>
                      )}

                      {isVisible('Mobile') && (
                        <TableCell className="ps-0">{contact.mobile}</TableCell>
                      )}

                      {isVisible('Email') && (
                        <TableCell className="ps-0">{contact.email}</TableCell>
                      )}

                      {isVisible('Service Availed Options') && (
                        <TableCell className="ps-0">{contact.serviceAvailedOptions}</TableCell>
                      )}

                      {isVisible('Insurance Leads Source') && (
                        <TableCell className="ps-0">{contact.insuranceLeadsSource}</TableCell>
                      )}

                      {isVisible('Assign Advisor') && (
                        <TableCell className="ps-0">{contact.advisorModuleName}</TableCell>
                      )}

                      {isVisible('CLV Corporate Commission') && (
                        <TableCell className="ps-0">{contact.clvCorporateCommission}</TableCell>
                      )}

                      {isVisible('CLV Advisor Commission') && (
                        <TableCell className="ps-0">{contact.clvAdvisorCommission}</TableCell>
                      )}

                      {isVisible('Last CLV Corporate') && (
                        <TableCell className="ps-0">{contact.lastCLVCorporate}</TableCell>
                      )}

                      {isVisible('Last CLV Advisor') && (
                        <TableCell className="ps-0">{contact.lastCLVAdvisor}</TableCell>
                      )}

                      {isVisible('Phone') && (
                        <TableCell className="ps-0">{contact.phoneNumber}</TableCell>
                      )}

                      {isVisible('Contact Owner') && (
                        <TableCell className="ps-0">{contact.UserfullName}</TableCell>
                      )}

                      {isVisible('Mailing Street') && (
                        <TableCell className="ps-0">{contact.mailingStreet}</TableCell>
                      )}

                      {isVisible('Mailing City') && (
                        <TableCell className="ps-0">{contact.mailingCity}</TableCell>
                      )}

                      {isVisible('Mailing Zip') && (
                        <TableCell className="ps-0">{contact.mailingZip}</TableCell>
                      )}

                      {isVisible('Relationship Status') && (
                        <TableCell className="ps-0">{contact.relationshipStatus}</TableCell>
                      )}

                      {isVisible('Emergency Contact') && (
                        <TableCell className="ps-0">{contact.emergencyContact}</TableCell>
                      )}

                      {isVisible('Emergency Contact Email') && (
                        <TableCell className="ps-0">{contact.emergencyContactEmail}</TableCell>
                      )}

                      {isVisible('Emergency Contact Phone') && (
                        <TableCell className="ps-0">{contact.emergencyContactPhone}</TableCell>
                      )}

                      {isVisible('Emergency Contact Relationship') && (
                        <TableCell className="ps-0">{contact.emergencyContactRelationship}</TableCell>
                      )}

                      {isVisible('Preferred Contact Method') && (
                        <TableCell className="ps-0">{contact.preferredContactMethod}</TableCell>
                      )}

                      {isVisible('Date of Birth') && (
                        <TableCell className="ps-0">{contact.dateOfBirth}</TableCell>
                      )}

                      {isVisible('New Service Requested') && (
                        <TableCell className="ps-0">{contact.newServiceRequested}</TableCell>
                      )}

                      {isVisible('GCLID') && (
                        <TableCell className="ps-0">{contact.gclid}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Loader loading={isLoading} />

            {/* Pagination */}
            <div className="pagination-container">
              <div className="total-count">
                <p><strong>Total Leads: {totalItems}</strong></p>
              </div>

              <div className="pagination-wrapper">
                <nav className="fixed-bottom responsive-pagination" aria-label="Pagination">
                  <ul className="pagination justify-content-center">
                     <li className="page-item d-flex justify-content-end">
                      <div className="bottom-right-text">
                        <div className="d-flex justify-content-end ms-2">
                          <Select onValueChange={updateItemsPerPage} defaultValue={itemsPerPage.toString()}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={`${itemsPerPage} Records Per Page`} />
                            </SelectTrigger>
                            <SelectContent>
                              {[10, 20, 30, 40, 50, 100].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                  {size} Records Per Page
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isDesktop && (
        <div ref={null}>
          <div
            style={{
              width: '100%',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              backgroundColor: 'white',
              paddingRight: '10px',
              borderBottom: '1px solid'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="mx-1">
                <Button onClick={toggleDrawer} variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              {showAndHideState.addButton && (
                <Link to="/contact" className="mx-1">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </Link>
              )}
            </div>
          </div>
          {/* <Loader loading={isLoading} /> */}
          {/* {paginatedContacts.map((contact, index) => (
            <div key={index} className="contactCard" style={{ zIndex: 1, borderBottom: '1px solid' }}>
              <div className="parent col-12">
                <div className="start col-9" style={{ paddingLeft: '15px', paddingTop: '15px' }}>
                  <table>
                    <tbody>
                      <tr>
                        <td><strong>{(contact.firstName ?? '') + ' ' + (contact.lastName ?? '')}</strong></td>
                      </tr>
                      <tr>
                        <td><i className="fas fa-circle" style={{ color: 'red', fontSize: '10px' }}></i>{contact.mobile}</td>
                      </tr>
                      <tr>
                        <td>{contact.email}</td>
                      </tr>
                      <tr>
                        <td>{contact.insuranceLeadsSource}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="end col-3 mt-4" style={{ verticalAlign: 'center' }}>
                  <Link to={`/contactview/${contact.contactROWID || contact.ROWID}`}>
                    <img
                      src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                      alt="Circular Image"
                      className="circle-img"
                      style={{ height: '56px', width: '59px' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      )}
    </>
  );
};

export default ContactListView;
