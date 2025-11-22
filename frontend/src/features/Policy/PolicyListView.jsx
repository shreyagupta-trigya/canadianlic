import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToHorizontalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconPlus,
  IconSearch,
  IconDownload,
  IconFilter,
  IconChevronUp,
  IconArrowUp,
  IconArrowDown,
  IconMail,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import noresult from "@assets/no-data.png";
import { useState, useEffect, useMemo, useId } from "react";
import { useNavigate } from "react-router-dom";
import dataSample from "./sample/policyData.json";

// New imports for enhanced functionality
import PolicySearchDrawer from "./PolicySearchDrawer";
import PolicyColumnManageDrawer from "./PolicyColumnManageDrawer";
import PolicyMassUpdateModal from "./PolicyMassUpdateModal";

function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({
    id,
  });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

function SortableHeader({ column, title }) {
  const sortDirection = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting()}
      className="h-auto p-0 font-medium hover:bg-transparent"
    >
      <span className="flex items-center gap-1">
        {title}
        {sortDirection === false ? (
          <IconChevronUp className="size-4 opacity-50" />
        ) : sortDirection === "asc" ? (
          <IconArrowUp className="size-4" />
        ) : (
          <IconArrowDown className="size-4" />
        )}
      </span>
    </Button>
  );
}

function DraggableRow({ row, navigate }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.ROWID,
  });
  const handleRowClick = () => {
    if (!isDragging) {
      navigate(`/crm/customerService/policy/details/${row.original.ROWID}`, {
        state: row.original,
      });
    }
  };

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 cursor-pointer hover:bg-muted/50"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className="py-0 px-2 text-sm min-w-0 overflow-hidden"
          onClick={handleRowClick}
        >
          <div className="truncate min-w-0 w-full overflow-hidden">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}

const PolicyListView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(dataSample);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnOrder, setColumnOrder] = useState([
    "drag",
    "select",
    "actions",
    "Action",
    "Created Time *",
    "Application Submitted On",
    "Policy Name",
    "Client",
    "Client Mobile",
    "Policy Type",
    "Policy Status",
    "Premium Frequency",
    "Insurance Company Account",
    "Advisor Commision Amount",
    "Policy Premium (Read I)",
    "Email",
    "Policy Start Date",
    "Policy Renewal Date",
    "Policy Owner",
    "Policy Number",
    "Policy Advisor",
    "How Many Days Left",
    "Issued By",
    "Early Return",
    "Modified Time",
    "Location",
    "Layout",
    "Confirmation Policy Start?",
    "Policy Month",
    "Advisor Payout",
    "Product FYC%",
    "Advisor Bonus% of FYC",
    "Insured 1 Date of Birth",
    "Reason for Policy Being Declined",
    "Beneficiary 1 Date of Birth",
    "Send to BOT Result",
    "Cancellation",
    "Whatsapp",
    "Coverage Amount",
    "Contract Name",
    "Investment",
    "Frequency",
    "Corporate Commision",
    "Investment Name",
    "Client Address",
  ]);
  const [columnSizing, setColumnSizing] = useState(() => {
    const defaultSizes = {
      drag: 40,
      select: 50,
      actions: 80,
      "Activity Badge": 120,
      "Created Time": 150,
      "Task Name": 150,
      Policies: 150,
      Description: 250,
      Status: 120,
      "Updated Policy Module - ZOHO": 250,
      "Request BOT/Email Company/Cancel Portal": 320,
      "Confirmation Received by us": 250,
      "Confirmation to Client": 200,
      "Comment on Contact Profile - ZOHO": 280,
      "Effective Date Matches on Confirmation": 300,
      "Task Completed CSR Name": 200,
      Contacts: 150,
      "Last Activity Time": 180,
      "Customer Service Owner": 190,
      "Policy Advisor": 150,
      "Contact Mobile": 150,
      "Created By": 120,
      Currency: 100,
      "Exchange Rate": 120,
      Tag: 100,
      "Unsubscribed Mode": 160,
      "Unsubscribed Time": 160,
      "Group Insurance": 140,
      "Policy Expiry Date": 160,
      "Renewal Follow Up Date": 190,
      "Policy Renewal Date": 170,
      "Renewal Completed": 160,
      "New Policy Renewal Date": 200,
      "New Policy Premium": 180,
      "Issued By": 120,
      "Connected To": 130,
      "Refund Amount": 130,
    };
    return defaultSizes;
  });

  // New state variables for enhanced functionality
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] =
    useState(false);

  // Table layout state
  const [selectedTableLayout, setSelectedTableLayout] = useState('all');

  // Quick Actions state
  const [searchQuery, setSearchQuery] = useState("");
  const items = [
    "update offering and client",
    "format all phone number",
    "update commission info",
    "effective date reminder",
    "renewal date reminder",
    "update contact in policy",
    "confirm update life policy sta",
    "send to LDA",
    "sv quote email by bot",
    "send policy cancellation email",
    "update refund for visitor",
    "SV mon calculation company wise",
    "send policy start update date email",
    "update CLV in contacts",
    "send email for age barcket",
    "send card details email",
  ];
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    // Implement action here
  };

  const downloadFile = (type) => {
    console.log(`Downloading ${type}`);
    // Implement download logic here
  };

  const allColumns = [
    "Action",
    "Created Time *",
    "Application Submitted On",
    "Policy Name",
    "Client",
    "Client Mobile",
    "Policy Type",
    "Policy Status",
    "Premium Frequency",
    "Insurance Company Account",
    "Advisor Commision Amount",
    "Policy Premium (Read I)",
    "Email",
    "Policy Start Date",
    "Policy Renewal Date",
    "Policy Owner",
    "Policy Number",
    "Policy Advisor",
    "How Many Days Left",
    "Issued By",
    "Early Return",
    "Modified Time",
    "Location",
    "Layout",
    "Confirmation Policy Start?",
    "Policy Month",
    "Advisor Payout",
    "Product FYC%",
    "Advisor Bonus% of FYC",
    "Insured 1 Date of Birth",
    "Reason for Policy Being Declined",
    "Beneficiary 1 Date of Birth",
    "Send to BOT Result",
    "Cancellation",
    "Whatsapp",
    "Coverage Amount",
    "Contract Name",
    "Investment",
    "Frequency",
    "Corporate Commision",
    "Investment Name",
    "Client Address",
  ];

  const commonColumns = [
    "Action",
    "Created Time *",
    "Application Submitted On",
    "Client",
    "Client Mobile",
    "Insurance Company Account",
    "Advisor Commision Amount",
    "Email",
    "Issued By",
    "Early Return",
    "Modified Time",
    "Location",
    "Layout",
    "Send to BOT Result",
    "Whatsapp",
    "Client Address",
  ];

  const policyOnlyColumns = [
    "Policy Name",
    "Policy Type",
    "Policy Status",
    "Premium Frequency",
    "Policy Premium (Read I)",
    "Policy Start Date",
    "Policy Renewal Date",
    "Policy Owner",
    "Policy Number",
    "Policy Advisor",
    "How Many Days Left",
    "Confirmation Policy Start?",
    "Policy Month",
    "Advisor Payout",
    "Product FYC%",
    "Advisor Bonus% of FYC",
    "Insured 1 Date of Birth",
    "Reason for Policy Being Declined",
    "Beneficiary 1 Date of Birth",
    "Cancellation",
  ];

  const investmentOnlyColumns = [
    "Investment Name",
    "Coverage Amount",
    "Contract Name",
    "Investment",
    "Frequency",
    "Corporate Commision",
  ];

  const getDefaultVisibleColumns = (layout) => {
    if (layout === 'policies') return [...commonColumns, ...policyOnlyColumns];
    if (layout === 'investments') return [...commonColumns, ...investmentOnlyColumns];
    return allColumns; // all
  };

  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Load visible columns from localStorage based on layout
    const saved = localStorage.getItem(`policy-visible-columns-${selectedTableLayout}`);
    return saved ? JSON.parse(saved) : getDefaultVisibleColumns(selectedTableLayout);
  });

  // Update visibleColumns when layout changes
  useEffect(() => {
    const saved = localStorage.getItem(`policy-visible-columns-${selectedTableLayout}`);
    setVisibleColumns(saved ? JSON.parse(saved) : getDefaultVisibleColumns(selectedTableLayout));
  }, [selectedTableLayout]);

  // Handler for column changes
  const handleColumnsChange = (newVisibleColumns) => {
    setVisibleColumns(newVisibleColumns);
    localStorage.setItem(
      `policy-visible-columns-${selectedTableLayout}`,
      JSON.stringify(newVisibleColumns)
    );
  };

  const PolicyColumns = useMemo(() => {
    return [
      {
        id: "drag",
        header: "",
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <DragHandle id={row.original.ROWID} />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
        minSize: 40,
      },
      {
        id: "select",
        header: ({ table }) => (
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
        minSize: 50,
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Button
              variant="link"
              className="text-foreground cursor-pointer w-fit px-0 text-left"
              onClick={(e) => {
                navigate(
                  `/crm/policy/details/${row.original.ROWID}`,
                  { state: row.original }
                );
              }}
            >
              <i className="fas fa-eye text-gray-400" aria-hidden="true"></i>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <IconDotsVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/crm/policy/details/${row.original.ROWID}`,
                      { state: row.original }
                    );
                  }}
                >
                  Detail view
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/crm/policy/create`);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  className="text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        size: 80,
        minSize: 50,
      },
      {
        accessorKey: "CREATEDTIME",
        header: ({ column }) => (
          <SortableHeader column={column} title="Created Time *" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original.CREATEDTIME
              ? new Date(row.original.CREATEDTIME).toLocaleString()
              : "N/A"}
          </div>
        ),
        size: 150,
        minSize: 50,
      },
      {
        accessorKey: "applicationSubmittedOn",
        header: ({ column }) => (
          <SortableHeader column={column} title="Application Submitted On" />
        ),
        cell: ({ row }) => <div>{row.original.applicationSubmittedOn}</div>,
        size: 200,
        minSize: 50,
      },
      {
        accessorKey: "policyName",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Name" />
        ),
        cell: ({ row }) => <div>{row.original.policyName}</div>,
        size: 150,
        minSize: 50,
      },
      {
        accessorKey: "clinetName",
        header: ({ column }) => (
          <SortableHeader column={column} title="Client" />
        ),
        cell: ({ row }) => <div>{row.original.clinetName}</div>,
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "clientMobile",
        header: ({ column }) => (
          <SortableHeader column={column} title="Client Mobile" />
        ),
        cell: ({ row }) => <div>{row.original.clientMobile}</div>,
        size: 140,
        minSize: 50,
      },
      {
        accessorKey: "policyType",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Type" />
        ),
        cell: ({ row }) => <div>{row.original.policyType}</div>,
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "policyStatus",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.policyStatus || "N/A";
          const statusColors = {
            Active: "#4caf50",
            Pending: "#ff9800",
            Expired: "#f44336",
          };
          const bgColor = statusColors[status] || "#9e9e9e";
          return (
            <Badge
              className="badge-style"
              style={{
                backgroundColor: bgColor,
                color: "white",
                width: "100px",
              }}
            >
              <span className=" w-35 text-center">{status}</span>
            </Badge>
          );
        },
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "premiumFrequency",
        header: ({ column }) => (
          <SortableHeader column={column} title="Premium Frequency" />
        ),
        cell: ({ row }) => <div>{row.original.premiumFrequency}</div>,
        size: 160,
        minSize: 50,
      },
      {
        accessorKey: "insuranceCompanyAccount",
        header: ({ column }) => (
          <SortableHeader column={column} title="Insurance Company Account" />
        ),
        cell: ({ row }) => <div>{row.original.insuranceCompanyAccount}</div>,
        size: 220,
        minSize: 50,
      },
      {
        accessorKey: "advisorCommissionAmount",
        header: ({ column }) => (
          <SortableHeader column={column} title="Advisor Commision Amount" />
        ),
        cell: ({ row }) => <div>{row.original.advisorCommissionAmount}</div>,
        size: 220,
        minSize: 50,
      },
      {
        accessorKey: "policyPremium",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Premium (Read I)" />
        ),
        cell: ({ row }) => <div>{row.original.policyPremium}</div>,
        size: 200,
        minSize: 50,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <SortableHeader column={column} title="Email" />
        ),
        cell: ({ row }) => <div>{row.original.email}</div>,
        size: 150,
        minSize: 50,
      },
      {
        accessorKey: "policyStartDate",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Start Date" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original.policyStartDate
              ? new Date(row.original.policyStartDate).toLocaleDateString()
              : "N/A"}
          </div>
        ),
        size: 150,
        minSize: 50,
      },
      {
        accessorKey: "policyRenewalDate",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Renewal Date" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original.policyRenewalDate
              ? new Date(row.original.policyRenewalDate).toLocaleDateString()
              : "N/A"}
          </div>
        ),
        size: 160,
        minSize: 50,
      },
      {
        accessorKey: "ownerName",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Owner" />
        ),
        cell: ({ row }) => <div>{row.original.ownerName}</div>,
        size: 130,
        minSize: 50,
      },
      {
        accessorKey: "policyNumber",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Number" />
        ),
        cell: ({ row }) => <div>{row.original.policyNumber}</div>,
        size: 140,
        minSize: 50,
      },
      {
        accessorKey: "policyAdvisor",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Advisor" />
        ),
        cell: ({ row }) => <div>{row.original.policyAdvisor}</div>,
        size: 140,
        minSize: 50,
      },
      {
        accessorKey: "howManyDaysLeft",
        header: ({ column }) => (
          <SortableHeader column={column} title="How Many Days Left" />
        ),
        cell: ({ row }) => <div>{row.original.howManyDaysLeft}</div>,
        size: 160,
        minSize: 50,
      },
      {
        accessorKey: "issuedBy",
        header: ({ column }) => (
          <SortableHeader column={column} title="Issued By" />
        ),
        cell: ({ row }) => <div>{row.original.issuedBy}</div>,
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "earlyReturnApplicationCancelled",
        header: ({ column }) => (
          <SortableHeader column={column} title="Early Return" />
        ),
        cell: ({ row }) => (
          <Badge
            className="badge-style"
            style={{
              backgroundColor: row.original.earlyReturnApplicationCancelled
                ? "#f44336"
                : "#4caf50",
              color: "white",
              width: "80px",
            }}
          >
            {row.original.earlyReturnApplicationCancelled ? "Yes" : "No"}
          </Badge>
        ),
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "MODIFIEDTIME",
        header: ({ column }) => (
          <SortableHeader column={column} title="Modified Time" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original.MODIFIEDTIME
              ? new Date(row.original.MODIFIEDTIME).toLocaleString()
              : "N/A"}
          </div>
        ),
        size: 150,
        minSize: 50,
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <SortableHeader column={column} title="Location" />
        ),
        cell: ({ row }) => <div>{row.original.location}</div>,
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "layout",
        header: ({ column }) => (
          <SortableHeader column={column} title="Layout" />
        ),
        cell: ({ row }) => <div>{row.original.layout}</div>,
        size: 100,
        minSize: 50,
      },
      {
        accessorKey: "confirmationPolicyStart",
        header: ({ column }) => (
          <SortableHeader column={column} title="Confirmation Policy Start?" />
        ),
        cell: ({ row }) => (
          <Badge
            className="badge-style"
            style={{
              backgroundColor: row.original.confirmationPolicyStart
                ? "#4caf50"
                : "#f44336",
              color: "white",
              width: "80px",
            }}
          >
            {row.original.confirmationPolicyStart ? "Yes" : "No"}
          </Badge>
        ),
        size: 200,
        minSize: 50,
      },
      {
        accessorKey: "policyMonth",
        header: ({ column }) => (
          <SortableHeader column={column} title="Policy Month" />
        ),
        cell: ({ row }) => <div>{row.original.policyMonth}</div>,
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "advisorPayout",
        header: ({ column }) => (
          <SortableHeader column={column} title="Advisor Payout" />
        ),
        cell: ({ row }) => <div>{row.original.advisorPayout}</div>,
        size: 130,
        minSize: 50,
      },
      {
        accessorKey: "productFycPercent",
        header: ({ column }) => (
          <SortableHeader column={column} title="Product FYC%" />
        ),
        cell: ({ row }) => <div>{row.original.productFycPercent}%</div>,
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "advisorBonusOfFyc",
        header: ({ column }) => (
          <SortableHeader column={column} title="Advisor Bonus% of FYC" />
        ),
        cell: ({ row }) => <div>{row.original.advisorBonusOfFyc}%</div>,
        size: 180,
        minSize: 50,
      },
      {
        accessorKey: "insured1DateOfBirth",
        header: ({ column }) => (
          <SortableHeader column={column} title="Insured 1 Date of Birth" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original.insured1DateOfBirth
              ? new Date(row.original.insured1DateOfBirth).toLocaleDateString()
              : "N/A"}
          </div>
        ),
        size: 180,
        minSize: 50,
      },
      {
        accessorKey: "reasonForPolicyBeingDeclined",
        header: ({ column }) => (
          <SortableHeader
            column={column}
            title="Reason for Policy Being Declined"
          />
        ),
        cell: ({ row }) => (
          <div>{row.original.reasonForPolicyBeingDeclined || "N/A"}</div>
        ),
        size: 240,
        minSize: 50,
      },
      {
        accessorKey: "beneficiary1DateOfBirth",
        header: ({ column }) => (
          <SortableHeader column={column} title="Beneficiary 1 Date of Birth" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original.beneficiary1DateOfBirth
              ? new Date(
                  row.original.beneficiary1DateOfBirth
                ).toLocaleDateString()
              : "N/A"}
          </div>
        ),
        size: 200,
        minSize: 50,
      },
      {
        accessorKey: "sendToBotResult",
        header: ({ column }) => (
          <SortableHeader column={column} title="Send to BOT Result" />
        ),
        cell: ({ row }) => <div>{row.original.sendToBotResult}</div>,
        size: 150,
        minSize: 50,
      },
      {
        accessorKey: "cancellation",
        header: ({ column }) => (
          <SortableHeader column={column} title="Cancellation" />
        ),
        cell: ({ row }) => (
          <Badge
            className="badge-style"
            style={{
              backgroundColor: row.original.cancellation
                ? "#f44336"
                : "#4caf50",
              color: "white",
              width: "80px",
            }}
          >
            {row.original.cancellation ? "Yes" : "No"}
          </Badge>
        ),
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "whatsapp",
        header: ({ column }) => (
          <SortableHeader column={column} title="Whatsapp" />
        ),
        cell: ({ row }) => <div>{row.original.whatsapp}</div>,
        size: 130,
        minSize: 50,
      },
      {
        accessorKey: "coverageAmount",
        header: ({ column }) => (
          <SortableHeader column={column} title="Coverage Amount" />
        ),
        cell: ({ row }) => <div>{row.original.coverageAmount}</div>,
        size: 150,
        minSize: 150,
      },
      {
        accessorKey: "contractName",
        header: ({ column }) => (
          <SortableHeader column={column} title="Contract Name" />
        ),
        cell: ({ row }) => <div>{row.original.contractName}</div>,
        size: 140,
        minSize: 50,
      },
      {
        accessorKey: "investment",
        header: ({ column }) => (
          <SortableHeader column={column} title="Investment" />
        ),
        cell: ({ row }) => <div>{row.original.investment}</div>,
        size: 120,
        minSize: 50,
      },
      {
        accessorKey: "frequency",
        header: ({ column }) => (
          <SortableHeader column={column} title="Frequency" />
        ),
        cell: ({ row }) => <div>{row.original.frequency}</div>,
        size: 110,
        minSize: 50,
      },
      {
        accessorKey: "bonus",
        header: ({ column }) => (
          <SortableHeader column={column} title="Corporate Commision" />
        ),
        cell: ({ row }) => <div>{row.original.bonus}</div>,
        size: 170,
        minSize: 50,
      },
      {
        accessorKey: "investmentName",
        header: ({ column }) => (
          <SortableHeader column={column} title="Investment Name" />
        ),
        cell: ({ row }) => <div>{row.original.investmentName || "N/A"}</div>,
        size: 150,
        minSize: 50,
      },
      {
        accessorKey: "clientAddress",
        header: ({ column }) => (
          <SortableHeader column={column} title="Client Address" />
        ),
        cell: ({ row }) => <div>{row.original.clientAddress}</div>,
        size: 200,
        minSize: 50,
      },
    ];
  }, []);

  const columns = PolicyColumns;

  // Sync columnVisibility with visibleColumns
  useEffect(() => {
    // Create mapping from display name to column id
    // allColumns has display names, PolicyColumns has the column definitions starting from index 2 (after drag and select)
    const columnMap = {};
    allColumns.forEach((displayName, index) => {
      const col = PolicyColumns[index + 2]; // offset by 2 for drag and select columns
      if (col) {
        columnMap[displayName] = col.id || col.accessorKey;
      }
    });

    const newVisibility = allColumns.reduce((acc, col) => {
      const columnId = columnMap[col];
      if (columnId) {
        acc[columnId] = visibleColumns.includes(col);
      }
      return acc;
    }, {});

    // Only update if there's an actual change to prevent infinite loops
    setColumnVisibility(prev => {
      const isEqual = Object.keys(newVisibility).every(key => newVisibility[key] === prev[key]) &&
                      Object.keys(prev).every(key => prev[key] === newVisibility[key]);
      return isEqual ? prev : newVisibility;
    });
  }, [visibleColumns, allColumns, PolicyColumns]);

  const sortableId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {})
  );
  const dataIds = useMemo(() => data?.map(({ ROWID }) => ROWID) || [], [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      columnOrder,
      columnSizing,
    },
    getRowId: (row) => row.ROWID,
    enableRowSelection: true,
    enableColumnResizing: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
      <Tabs
        defaultValue="all-policies"
        className="w-full flex-col justify-start gap-2"
      >
        <div className="flex items-center justify-end mx-1 lg:mx-2">
          <Label htmlFor="table-layout-selector" className="sr-only">
            Table Layout
          </Label>
          <Select value={selectedTableLayout} onValueChange={setSelectedTableLayout}>
            <SelectTrigger
              className="flex w-fit"
              size="sm"
              id="table-layout-selector"
            >
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="policies">Policies</SelectItem>
              <SelectItem value="investments">Investments</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-right gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchDrawerOpen(true)}
            >
              <IconSearch />
              <span className="hidden lg:inline">Search</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconFilter />
                  <span className="hidden lg:inline">Actions</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                  <DropdownMenuItem onClick={() => console.log("Delete All")}>
                    Delete All
                  </DropdownMenuItem>
                )}
              
                <DropdownMenuItem
                  onClick={() => setIsMassUpdateModalOpen(true)}
                >
                  Mass Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Mass Email")}>
                  Mass Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Export
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setIsColumnManageDrawerOpen(true)}
                >
                  Manage Columns
                </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Import")}>
                  Import
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadFile("lifePolicy")}>
                  Export Policy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadFile("rrsp")}>
                  Export RRSP
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadFile("tfsa")}>
                  Export TFSA
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadFile("resp")}>
                  Export RESP
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadFile("visa")}>
                  Export Visa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  New
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/crm/policy/create")}>
                  + New Policy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/crm/policy/investment/create")}>
                  + New Investment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Quick Actions
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <div className="p-2">
                  <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredItems.map((item, index) => (
                    <DropdownMenuItem key={index} onClick={() => handleItemClick(item)}>
                      {capitalize(item)}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent
          value="all-policies"
          className="relative flex flex-col gap-4 overflow-auto mx-1 lg:mx-2"
        >
          <div
            className="relative grid w-full  overflow-hidden rounded-lg border"
            style={{
              height: "calc(100vh - 160px)",
              maxHeight: "calc(100vh - 180px)",
            }}
          >
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table className="table-fixed">
                <TableHeader className="sticky top-0 z-10 bg-background">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{
                              width: header.getSize(),
                              position: "relative",
                            }}
                            className={`truncate ${
                                header.column.id === "drag"
                                  ? "border-r border-dotted border-gray-600"
                                  : ""
                              }`}
                          >
                            {header.isPlaceholder ? null : (
                              <>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {header.column.getCanResize() && (
                                <div
                                  onMouseDown={header.getResizeHandler()}
                                  onTouchStart={header.getResizeHandler()}
                                  className="absolute right-0 top-0 h-full w-5 cursor-ew-resize select-none touch-none"
                                >
                                  <div
                                    className={`h-full w-0.5 absolute right-0 top-0
                                      ${
                                        header.column.getIsResizing()
                                          ? "bg-primary"
                                          : "bg-border hover:bg-primary/50"
                                      }
                                    `}
                                  />
                                </div>
                              )}
                              </>
                            )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8 overflow-hidden">
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow
                          key={row.id}
                          row={row}
                          navigate={navigate}
                        />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow className="h-12 text-center">
                      <TableCell
                        colSpan={columns.length}
                        className="h-12 text-center"
                      >
                        <img
                          src={noresult}
                          alt="No Data"
                          style={{ width: "12%" }}
                          className="text-center"
                        />
                        <div className="text-muted-foreground text-md">
                          No Data Found
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="active-policies"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Active Policies Tab
          </div>
        </TabsContent>
        <TabsContent
          value="expired-policies"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Expired Policies Tab
          </div>
        </TabsContent>
        <TabsContent value="renewal-due" className="flex flex-col px-1 lg:px-1">
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Renewal Due Tab
          </div>
        </TabsContent>
      </Tabs>

      {/* Search Drawer */}
      <PolicySearchDrawer
        isOpen={isSearchDrawerOpen}
        onClose={() => setIsSearchDrawerOpen(false)}
        onSearchResults={(searchFields) => {
          console.log("Search results:", searchFields);
          // Implement search logic here
        }}
      />

      {/* Column Manage Drawer */}
      <PolicyColumnManageDrawer
        isOpen={isColumnManageDrawerOpen}
        visibleColumns={visibleColumns}
        allColumns={allColumns}
        onClose={() => setIsColumnManageDrawerOpen(false)}
        onColumnsChange={handleColumnsChange}
      />

      {/* Mass Update Modal */}
      <PolicyMassUpdateModal
        isOpen={isMassUpdateModalOpen}
        fields={allColumns}
        onClose={() => setIsMassUpdateModalOpen(false)}
        onUpdate={(updateData) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          if (selectedRows.length === 0) {
            toast.error("No rows selected for update");
            return;
          }
          setData((prevData) =>
            prevData.map((row) =>
              selectedRows.some(
                (selectedRow) => selectedRow.original.ROWID === row.ROWID
              )
                ? { ...row, [updateData.field]: updateData.value }
                : row
            )
          );
          toast.success(`Updated ${selectedRows.length} records`);
        }}
      />
    </div>
  );
};

export default PolicyListView;
