import React, { useState, useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PolicyTable = ({
  policies,
  visibleColumns,
  selectedPolicies,
  onSelectPolicy,
  onSelectAll,
  onDeletePolicy,
  selectedTableLayout,
  sortColumn,
  sortOrder,
  onSort,
  columnWidths,
  onResizeStart
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumnIndex, setResizingColumnIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [ghostLineX, setGhostLineX] = useState(0);
  const tableRef = useRef(null);

  const handleMouseDown = (e, columnIndex) => {
    setIsResizing(true);
    setResizingColumnIndex(columnIndex);
    setStartX(e.clientX);
    setStartWidth(columnWidths[columnIndex]);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(startWidth + deltaX, 50);
    const newWidths = [...columnWidths];
    newWidths[resizingColumnIndex] = newWidth;
    onResizeStart(e, resizingColumnIndex, newWidths);
    setGhostLineX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizingColumnIndex(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const renderSortIcon = (columnKey) => {
    if (sortColumn !== columnKey) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
  };

  return (
    <div className="table-responsive" ref={tableRef}>
      <Table className="table table-striped table-hover">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center" style={{ width: '50px' }}>
              <Checkbox
                checked={selectedPolicies.length === policies.length && policies.length > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            {visibleColumns.map((col, index) => (
              <TableHead
                key={col.key}
                className="cursor-pointer"
                onClick={() => onSort(col.key)}
                style={{ width: columnWidths[index] || 'auto', position: 'relative' }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span>{col.label}</span>
                  {renderSortIcon(col.key)}
                </div>
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '5px',
                    height: '100%',
                    cursor: 'col-resize',
                    backgroundColor: 'transparent'
                  }}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy.ROWID}>
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedPolicies.includes(policy.ROWID)}
                  onCheckedChange={() => onSelectPolicy(policy.ROWID)}
                />
              </TableCell>
              {visibleColumns.map((col, index) => (
                <TableCell key={col.key} style={{ width: columnWidths[index] || 'auto' }}>
                  {col.key === 'actions' ? (
                    <div className="d-flex gap-1">
                      <Link to={`/policy-details/${policy.ROWID}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/policy-edit/${policy.ROWID}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeletePolicy(policy.ROWID)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : col.key === 'policyStatus' ? (
                    <span className={getStatusColor(policy[col.key])}>
                      {policy[col.key]}
                    </span>
                  ) : col.key === 'policyStartDate' || col.key === 'policyRenewalDate' || col.key === 'CREATEDTIME' || col.key === 'MODIFIEDTIME' ? (
                    formatDate(policy[col.key])
                  ) : col.key === 'advisorCommisionAmount' || col.key === 'policyPremiumReadI' || col.key === 'advisorPayout' ? (
                    formatCurrency(policy[col.key])
                  ) : (
                    policy[col.key] || ''
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </div>
  );
};

export default PolicyTable;
