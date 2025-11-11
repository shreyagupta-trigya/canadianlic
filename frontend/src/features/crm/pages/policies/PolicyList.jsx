import React, { useState, useEffect, useMemo, useId } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  IconChevronDown,
  IconSearch,
  IconFilter,
  IconMail,
  IconDownload,
  IconLayoutColumns,
  IconPlus,
  IconDotsVertical as EllipsisVertical,
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
  IconChevronUp,
  IconArrowUp,
  IconArrowDown,
  IconGripVertical,
  IconDotsVertical,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  flexRender,
} from "@tanstack/react-table";

// Components
import PolicySearchDrawer from "./components/PolicySearchDrawer";
import MassUpdatePolicyModel from "./components/MassUpdatePolicyModel";
import MassUpdatePolicyEmail from "./components/MassUpdatePolicyEmail";
import PolicyColumnManageDrawer from "./components/PolicyColumnManageDrawer";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";
import { columnMapping } from "./utils/utils";

function PolicyColumns(navigate) {
  return [
    {
      id: "drag",
      header: "",
      cell: ({ row }) => <DragHandle id={row.original.ROWID} />,
      size: 40,
      enableSorting: false,
      enableResizing: false,
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 50,
      enableSorting: false,
      enableResizing: false,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigate(`/crm/policies/details/${row.original.ROWID}`, {
                  state: row.original,
                })
              }
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/crm/policies/edit/${row.original.ROWID}`, {
                  state: row.original,
                })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIdToDelete(row.original.ROWID);
                setOpenAlert(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 80,
      enableSorting: false,
      enableResizing: false,
    },
    {
      accessorKey: "CREATEDTIME",
      header: ({ column }) => <SortableHeader column={column} title="Created Time *" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? new Date(value).toLocaleString() : "";
      },
      size: 150,
    },
    {
      accessorKey: "policyNumber",
      header: ({ column }) => <SortableHeader column={column} title="Policy Number" />,
      size: 150,
    },
    {
      accessorKey: "policyName",
      header: ({ column }) => <SortableHeader column={column} title="Policy Name" />,
      size: 200,
    },
    {
      accessorKey: "clientName",
      header: ({ column }) => <SortableHeader column={column} title="Client Name" />,
      size: 150,
    },
    {
      accessorKey: "policyType",
      header: ({ column }) => <SortableHeader column={column} title="Policy Type" />,
      size: 150,
    },
    {
      accessorKey: "policyStatus",
      header: ({ column }) => <SortableHeader column={column} title="Policy Status" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <Badge variant={value === "Active" ? "default" : "secondary"}>
            {value}
          </Badge>
        );
      },
      size: 150,
    },
    {
      accessorKey: "policyPremium",
      header: ({ column }) => <SortableHeader column={column} title="Policy Premium" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? `$${parseFloat(value).toFixed(2)}` : "";
      },
      size: 120,
    },
    {
      accessorKey: "policyRenewalDate",
      header: ({ column }) => <SortableHeader column={column} title="Policy Renewal Date" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? new Date(value).toLocaleDateString() : "";
      },
      size: 150,
    },
    {
      accessorKey: "daysLeft",
      header: ({ column }) => <SortableHeader column={column} title="Days Left" />,
      size: 120,
    },
    {
      accessorKey: "insuranceCompanyAccount",
      header: ({ column }) => <SortableHeader column={column} title="Insurance Company Account" />,
      size: 200,
    },
    {
      accessorKey: "advisorCommissionAmount",
      header: ({ column }) => <SortableHeader column={column} title="Advisor Commission Amount" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? `$${parseFloat(value).toFixed(2)}` : "";
      },
      size: 200,
    },
    {
      accessorKey: "policyAdvisor",
      header: ({ column }) => <SortableHeader column={column} title="Policy Advisor" />,
      size: 150,
    },
    {
      accessorKey: "issuedBy",
      header: ({ column }) => <SortableHeader column={column} title="Issued By" />,
      size: 150,
    },
    {
      accessorKey: "location",
      header: ({ column }) => <SortableHeader column={column} title="Location" />,
      size: 150,
    },
    {
      accessorKey: "layout",
      header: ({ column }) => <SortableHeader column={column} title="Layout" />,
      size: 150,
    },
    {
      accessorKey: "premiumFrequency",
      header: ({ column }) => <SortableHeader column={column} title="Premium Frequency" />,
      size: 150,
    },
    {
      accessorKey: "policyStartDate",
      header: ({ column }) => <SortableHeader column={column} title="Policy Start Date" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? new Date(value).toLocaleDateString() : "";
      },
      size: 150,
    },
    {
      accessorKey: "policyOwner",
      header: ({ column }) => <SortableHeader column={column} title="Policy Owner" />,
      size: 150,
    },
    {
      accessorKey: "clientMobile",
      header: ({ column }) => <SortableHeader column={column} title="Client Mobile" />,
      size: 150,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      size: 200,
    },
  ];
}

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
      navigate(`/crm/policies/details/${row.original.ROWID}`, {
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
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition: transition,
      }}
      onClick={handleRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// Dummy data for policies
const dummyPolicies = [
  {
    id: 1,
    ROWID: 1,
    policyNumber: 'POL-2024-001',
    policyName: 'Life Insurance Premium',
    clientName: 'John Doe',
    clinetName: 'John Doe',
    clientMobile: '+1-234-567-8900',
    policyType: 'Life Insurance',
    policyStatus: 'Active',
    premiumFrequency: 'Monthly',
    insuranceCompanyAccount: 'Canadian Life Insurance',
    advisorCommissionAmount: '$250.00',
    policyPremium: '$500.00',
    email: 'john.doe@example.com',
    policyStartDate: '2024-01-15',
    policyRenewalDate: '2025-01-15',
    policyOwner: 'John Doe',
    ownerName: 'John Doe',
    policyAdvisor: 'Sarah Johnson',
    daysLeft: 45,
    issuedBy: 'Branch Office',
    location: 'Toronto, ON',
    layout: 'Life Insurance',
    createdTime: '2024-01-10 10:30:00',
    CREATEDTIME: '2024-01-10 10:30:00',
    firstName: 'John'
  },
  {
    id: 2,
    ROWID: 2,
    policyNumber: 'POL-2024-002',
    policyName: 'Health Insurance Basic',
    clientName: 'Jane Smith',
    clinetName: 'Jane Smith',
    clientMobile: '+1-234-567-8901',
    policyType: 'Health Insurance',
    policyStatus: 'Active',
    premiumFrequency: 'Quarterly',
    insuranceCompanyAccount: 'HealthCare Plus',
    advisorCommissionAmount: '$180.00',
    policyPremium: '$300.00',
    email: 'jane.smith@example.com',
    policyStartDate: '2024-02-01',
    policyRenewalDate: '2025-02-01',
    policyOwner: 'Jane Smith',
    ownerName: 'Jane Smith',
    policyAdvisor: 'Mike Wilson',
    daysLeft: 78,
    issuedBy: 'Online Portal',
    location: 'Vancouver, BC',
    layout: 'Health Insurance',
    createdTime: '2024-01-15 14:20:00',
    CREATEDTIME: '2024-01-15 14:20:00',
    firstName: 'Jane'
  },
  {
    id: 3,
    ROWID: 3,
    policyNumber: 'POL-2024-003',
    policyName: 'Auto Insurance Comprehensive',
    clientName: 'Bob Johnson',
    clinetName: 'Bob Johnson',
    clientMobile: '+1-234-567-8902',
    policyType: 'Auto Insurance',
    policyStatus: 'Pending',
    premiumFrequency: 'Annual',
    insuranceCompanyAccount: 'AutoSafe Insurance',
    advisorCommissionAmount: '$320.00',
    policyPremium: '$800.00',
    email: 'bob.johnson@example.com',
    policyStartDate: '2024-03-01',
    policyRenewalDate: '2025-03-01',
    policyOwner: 'Bob Johnson',
    ownerName: 'Bob Johnson',
    policyAdvisor: 'Lisa Brown',
    daysLeft: 120,
    issuedBy: 'Branch Office',
    location: 'Montreal, QC',
    layout: 'Auto Insurance',
    createdTime: '2024-01-20 09:15:00',
    CREATEDTIME: '2024-01-20 09:15:00',
    firstName: 'Bob'
  },
  {
    id: 4,
    ROWID: 4,
    policyNumber: 'POL-2024-004',
    policyName: 'Home Insurance Standard',
    clientName: 'Alice Wilson',
    clinetName: 'Alice Wilson',
    clientMobile: '+1-234-567-8903',
    policyType: 'Home Insurance',
    policyStatus: 'Active',
    premiumFrequency: 'Monthly',
    insuranceCompanyAccount: 'HomeGuard Insurance',
    advisorCommissionAmount: '$150.00',
    policyPremium: '$250.00',
    email: 'alice.wilson@example.com',
    policyStartDate: '2024-01-20',
    policyRenewalDate: '2025-01-20',
    policyOwner: 'Alice Wilson',
    ownerName: 'Alice Wilson',
    policyAdvisor: 'David Lee',
    daysLeft: 35,
    issuedBy: 'Online Portal',
    location: 'Calgary, AB',
    layout: 'Home Insurance',
    createdTime: '2024-01-18 16:45:00',
    CREATEDTIME: '2024-01-18 16:45:00',
    firstName: 'Alice'
  },
  {
    id: 5,
    ROWID: 5,
    policyNumber: 'POL-2024-005',
    policyName: 'Business Insurance Package',
    clientName: 'Charlie Brown',
    clinetName: 'Charlie Brown',
    clientMobile: '+1-234-567-8904',
    policyType: 'Business Insurance',
    policyStatus: 'Under Review',
    premiumFrequency: 'Annual',
    insuranceCompanyAccount: 'BusinessSecure',
    advisorCommissionAmount: '$500.00',
    policyPremium: '$1200.00',
    email: 'charlie.brown@example.com',
    policyStartDate: '2024-04-01',
    policyRenewalDate: '2025-04-01',
    policyOwner: 'Charlie Brown',
    ownerName: 'Charlie Brown',
    policyAdvisor: 'Emma Davis',
    daysLeft: 150,
    issuedBy: 'Branch Office',
    location: 'Ottawa, ON',
    layout: 'Business Insurance',
    createdTime: '2024-01-25 11:30:00',
    CREATEDTIME: '2024-01-25 11:30:00',
    firstName: 'Charlie'
  }
];

const PolicyList = () => {
  const [data, setData] = useState(dummyPolicies);
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Table state variables
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnSizing, setColumnSizing] = useState({});

  // New state variables for enhanced functionality
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isMassEmailModalOpen, setIsMassEmailModalOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] =
    useState(false);
  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Load visible columns from localStorage
    const saved = localStorage.getItem("policies-visible-columns");
    return saved
      ? JSON.parse(saved)
      : [
          { key: "actions", label: "Actions" },
          { key: "CREATEDTIME", label: "Created Time *" },
          { key: "policyNumber", label: "Policy Number" },
          { key: "policyName", label: "Policy Name" },
          { key: "clientName", label: "Client Name" },
          { key: "policyType", label: "Policy Type" },
          { key: "policyStatus", label: "Policy Status" },
          { key: "policyPremium", label: "Policy Premium" },
          { key: "policyRenewalDate", label: "Policy Renewal Date" },
          { key: "daysLeft", label: "Days Left" },
          { key: "insuranceCompanyAccount", label: "Insurance Company Account" },
          { key: "advisorCommissionAmount", label: "Advisor Commission Amount" },
          { key: "policyAdvisor", label: "Policy Advisor" },
          { key: "issuedBy", label: "Issued By" },
          { key: "location", label: "Location" },
          { key: "layout", label: "Layout" },
          { key: "premiumFrequency", label: "Premium Frequency" },
          { key: "policyStartDate", label: "Policy Start Date" },
          { key: "policyOwner", label: "Policy Owner" },
          { key: "clientMobile", label: "Client Mobile" },
          { key: "email", label: "Email" },
        ];
  });
  const [allColumns, setAllColumns] = useState([
    { key: "actions", label: "Actions" },
    { key: "CREATEDTIME", label: "Created Time *" },
    { key: "policyNumber", label: "Policy Number" },
    { key: "policyName", label: "Policy Name" },
    { key: "clientName", label: "Client Name" },
    { key: "policyType", label: "Policy Type" },
    { key: "policyStatus", label: "Policy Status" },
    { key: "policyPremium", label: "Policy Premium" },
    { key: "policyRenewalDate", label: "Policy Renewal Date" },
    { key: "daysLeft", label: "Days Left" },
    { key: "insuranceCompanyAccount", label: "Insurance Company Account" },
    { key: "advisorCommissionAmount", label: "Advisor Commission Amount" },
    { key: "policyAdvisor", label: "Policy Advisor" },
    { key: "issued By", label: "Issued By" },
    { key: "location", label: "Location" },
    { key: "layout", label: "Layout" },
    { key: "premiumFrequency", label: "Premium Frequency" },
    { key: "policyStartDate", label: "Policy Start Date" },
    { key: "policyOwner", label: "Policy Owner" },
    { key: "clientMobile", label: "Client Mobile" },
    { key: "email", label: "Email" },
  ]);

  const navigate = useNavigate();
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
  const columns = PolicyColumns(navigate);
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
    console.log("Drag End:", { active, over });
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  // Initialize columnVisibility based on visibleColumns
  useEffect(() => {
    const visibilityMap = {};
    allColumns.forEach((col) => {
      const columnId = columnMapping[col];
      if (columnId) {
        visibilityMap[columnId] = visibleColumns.includes(col);
      }
    });
    setColumnVisibility(visibilityMap);
  }, [visibleColumns, allColumns]);

  // Save column sizing to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "policies-table-column-sizing",
      JSON.stringify(columnSizing)
    );
  }, [columnSizing]);

  // Save visible columns to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "policies-visible-columns",
      JSON.stringify(visibleColumns)
    );
  }, [visibleColumns]);

  function handleDelete() {
    if (idToDelete !== "") {
      setDeleteLoading(true);
      // Simulate delete API call
      setTimeout(() => {
        setData((prevData) => prevData.filter((item) => item.ROWID !== idToDelete));
        toast.success("Policy deleted successfully");
        setDeleteLoading(false);
        setOpenAlert(false);
      }, 1000);
    }
  }

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
      <Tabs
        defaultValue="all-policies"
        className="w-full flex-col justify-start gap-2"
      >
        {/* HEADER */}
        <div className="flex items-center justify-end mx-1 lg:mx-2">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select defaultValue="all-policies">
            <SelectTrigger
              className="flex w-fit lg:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-policies">All Policies</SelectItem>
              <SelectItem value="active-policies">Active Policies</SelectItem>
              <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
              <SelectItem value="pending-policies">Pending Policies</SelectItem>
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
                <DropdownMenuItem
                  onClick={() => setIsMassUpdateModalOpen(true)}
                >
                  <IconDotsVertical className="mr-2 h-4 w-4" />
                  Mass Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsMassEmailModalOpen(true)}>
                  <IconMail className="mr-2 h-4 w-4" />
                  Mass Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsColumnManageDrawerOpen(true)}
                >
                  <IconLayoutColumns className="mr-2 h-4 w-4" />
                  Manage Columns
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconDownload className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => navigate("/crm/policies/create")}
              className="cursor-pointer"
              variant="outline"
              size="sm"
            >
              <IconPlus />
              <span className="hidden lg:inline ">Create Policy</span>
            </Button>
          </div>
        </div>
        {/* TAB Contents */}
        <TabsContent
          value="all-policies"
          className="relative flex flex-col gap-4 overflow-auto mx-1 lg:mx-2"
        >
          <div className="flex flex-col">
            <div className="flex-1 relative pb-20">
              <div
                className="relative grid w-full border rounded"
                style={{
                  height: "calc(100vh - 140px)",
                  maxHeight: "calc(100vh - 160px)",
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
                                className={
                                  header.column.id === "drag"
                                    ? "border-r border-dotted border-gray-600"
                                    : ""
                                }
                              >
                                {header.isPlaceholder ? null : (
                                  <div>
                                    {header.column.getCanSort() ? (
                                      <SortableHeader
                                        column={header.column}
                                        title={header.column.columnDef.header}
                                      />
                                    ) : (
                                      header.column.columnDef.header
                                    )}
                                  </div>
                                )}
                                {header.column.getCanResize() && (
                                  <div
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={`absolute right-0 top-0 h-full w-0.5 cursor-col-resize select-none touch-none ${
                                      header.column.getIsResizing()
                                        ? "bg-primary"
                                        : "bg-border hover:bg-primary/50"
                                    }`}
                                  />
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
                        <TableRow className="h-24 text-center">
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
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
            </div>
            <div className="fixed bottom-0 left-65 right-0 flex items-center justify-between px-4 py-2 border-t bg-background z-20">
              <div className="text-muted-foreground hidden flex-1 text-base lg:flex">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="hidden items-center gap-2 lg:flex">
                  <Label
                    htmlFor="rows-per-page"
                    className="text-base font-medium"
                  >
                    Rows per page
                  </Label>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger
                      size="sm"
                      className="w-20"
                      id="rows-per-page"
                    >
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
          </div>
        </TabsContent>
        <TabsContent
          value="past-performance"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Tab 1
          </div>
        </TabsContent>
        <TabsContent
          value="key-personnel"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Tab 2
          </div>
        </TabsContent>
        <TabsContent
          value="focus-documents"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Tab 3
          </div>
        </TabsContent>
      </Tabs>

      <TableDataDeleteAlert
        loading={deleteLoading}
        handleDelete={handleDelete}
        open={openAlert}
        setOpen={setOpenAlert}
      />

      {/* Modals and Drawers */}
      {isSearchDrawerOpen && (
        <PolicySearchDrawer
          isOpen={isSearchDrawerOpen}
          onClose={() => setIsSearchDrawerOpen(false)}
          title="Search Policies"
        >
          {/* Search form content */}
          <div className="p-4">
            <p>Search functionality to be implemented</p>
          </div>
        </PolicySearchDrawer>
      )}

      {isMassUpdateModalOpen && (
        <MassUpdatePolicyModel
          isOpen={isMassUpdateModalOpen}
          onClose={() => setIsMassUpdateModalOpen(false)}
          selectedPolicies={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          fields={allColumns}
        />
      )}

      {isMassEmailModalOpen && (
        <MassUpdatePolicyEmail
          isOpen={isMassEmailModalOpen}
          onClose={() => setIsMassEmailModalOpen(false)}
          selectedEmailPolicies={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSend={(emailData) => {
            // Simple handler: show success toast
            toast.success("Mass email sent successfully!");
          }}
        />
      )}

      {isColumnManageDrawerOpen && (
        <PolicyColumnManageDrawer
          isOpen={isColumnManageDrawerOpen}
          onClose={() => setIsColumnManageDrawerOpen(false)}
          visibleColumns={visibleColumns}
          allColumns={allColumns}
          onColumnsChange={(newVisibleColumns) => {
            setVisibleColumns(newVisibleColumns);
            // Update columnVisibility state for TanStack Table using column IDs
            const visibilityMap = {};
            allColumns.forEach((col) => {
              const columnId = columnMapping[col];
              if (columnId) {
                visibilityMap[columnId] = newVisibleColumns.includes(col);
              }
            });
            setColumnVisibility(visibilityMap);
          }}
        />
      )}
    </div>
  );
};

export default PolicyList;
