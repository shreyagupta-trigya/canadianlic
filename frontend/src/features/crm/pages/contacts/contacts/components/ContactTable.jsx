import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal, Eye, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import moment from 'moment';

const ContactTable = ({
  contacts,
  visibleColumns,
  selectedContacts,
  onSelectContact,
  onSelectAll,
  onDeleteContact,
  showAndHideState,
  sortColumn,
  sortOrder,
  onSort,
  columnWidths,
  onResizeStart
}) => {
  const tableRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumnIndex, setResizingColumnIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const formatCreatedDateTime = useCallback((dateTime) => {
    if (!dateTime) return "N/A";
    // return moment(dateTime).format("DD-MM-YYYY   hh:mm A");
  }, []);

  const isVisible = useCallback((colLabel) => {
    return visibleColumns.some(col => col.label === colLabel && col.visible);
  }, [visibleColumns]);

  const handleResizeStart = (e, index) => {
    setIsResizing(true);
    setResizingColumnIndex(index);
    setStartX(e.clientX);
    setStartWidth(columnWidths[index] || 150);
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e) => {
    if (!isResizing || resizingColumnIndex === null) return;
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(60, startWidth + deltaX);
    const newWidths = [...columnWidths];
    newWidths[resizingColumnIndex] = newWidth;
    onResizeStart(e, resizingColumnIndex, newWidths);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizingColumnIndex(null);
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  return (
    <div className="scrollable-container overflow-x-auto relative border rounded-lg shadow-sm">
      <Table ref={tableRef} className="min-w-[3000px]">
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-12 border-r">
              <Checkbox
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            {visibleColumns.map((col, index) => (
              col.visible && (
                <TableHead
                  key={col.key}
                  className="border-r relative cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  style={{ width: columnWidths[index] || 'auto', minWidth: '120px' }}
                  onClick={() => onSort(col.key)}
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      {col.label}
                    </span>
                    <div className="flex items-center ml-2">
                      {sortColumn === col.key && (
                        sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <div
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-200 transition-colors"
                    onMouseDown={(e) => handleResizeStart(e, index)}
                  />
                </TableHead>
              )
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={contact.ROWID || index} className="hover:bg-gray-50 transition-colors even:bg-gray-25">
              <TableCell className="border-r">
                <Checkbox
                  checked={selectedContacts.includes(contact.ROWID)}
                  onCheckedChange={() => onSelectContact(contact.ROWID)}
                />
              </TableCell>
              {isVisible('Action') && (
                <TableCell className="border-r px-3 py-2">
                  <div className="flex items-center gap-2">
                    {showAndHideState.previewButton && (
                      <Link
                        to={`/contactview/${contact.contactROWID}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-600 hover:text-gray-800 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {showAndHideState.editButton && (
                          <DropdownMenuItem asChild>
                            <Link to={`/contact/${contact.contactROWID}`} className="flex items-center">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {showAndHideState.deleteButton && (
                          <DropdownMenuItem
                            onClick={() => onDeleteContact(contact.contactROWID)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              )}
              {isVisible('Lead Converted On') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.leadConvertedOn}</TableCell>
              )}
              {isVisible('Created Time') && (
                <TableCell className="border-r px-3 py-2 text-sm">{formatCreatedDateTime(contact.CREATEDTIME)}</TableCell>
              )}
              {isVisible('Lead Created On') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.leadCreatedOn}</TableCell>
              )}
              {isVisible('Deal Stage Tracking') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.dealStageTracking}</TableCell>
              )}
              {isVisible('Contact Name') && (
                <TableCell className="border-r px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-700">
                      {(contact.firstName ?? '').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{(contact.firstName ?? '') + ' ' + (contact.lastName ?? '')}</span>
                  </div>
                </TableCell>
              )}
              {isVisible('Mobile') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.mobile}</TableCell>
              )}
              {isVisible('Email') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.email}</TableCell>
              )}
              {isVisible('Insurance Leads Source') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.insuranceLeadsSource}</TableCell>
              )}
              {isVisible('Assign Advisor') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.advisorModuleName}</TableCell>
              )}
              {isVisible('CLV Corporate Commission') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.clvCorporateCommission}</TableCell>
              )}
              {isVisible('CLV Advisor Commission') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.clvAdvisorCommission}</TableCell>
              )}
              {isVisible('Last CLV Corporate') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.lastCLVCorporate}</TableCell>
              )}
              {isVisible('Last CLV Advisor') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.lastCLVAdvisor}</TableCell>
              )}
              {isVisible('Phone') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.phoneNumber}</TableCell>
              )}
              {isVisible('Contact Owner') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.UserfullName}</TableCell>
              )}
              {isVisible('Mailing Street') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.mailingStreet}</TableCell>
              )}
              {isVisible('Mailing City') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.mailingCity}</TableCell>
              )}
              {isVisible('Mailing Zip') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.mailingZip}</TableCell>
              )}
              {isVisible('Relationship Status') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.relationshipStatus}</TableCell>
              )}
              {isVisible('Emergency Contact') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.emergencyContact}</TableCell>
              )}
              {isVisible('Emergency Contact Email') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.emergencyContactEmail}</TableCell>
              )}
              {isVisible('Emergency Contact Phone') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.emergencyContactPhone}</TableCell>
              )}
              {isVisible('Emergency Contact Relationship') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.emergencyContactRelationship}</TableCell>
              )}
              {isVisible('Preferred Contact Method') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.preferredContactMethod}</TableCell>
              )}
              {isVisible('Date of Birth') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.dateOfBirth}</TableCell>
              )}
              {isVisible('New Service Requested') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.newServiceRequested}</TableCell>
              )}
              {isVisible('GCLID') && (
                <TableCell className="border-r px-3 py-2 text-sm">{contact.gclid}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactTable;
