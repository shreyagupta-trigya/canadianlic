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
import dataSample from "./sample/customerServiceData.json";

// New imports for enhanced functionality
import CustomerServiceSearchDrawer from "./CustomerServiceSearchDrawer";
import CustomerServiceColumnManageDrawer from "./CustomerServiceColumnManageDrawer";
import CustomerServiceMassUpdateModal from "./CustomerServiceMassUpdateModal";

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
      navigate(`/crm/customerService/details/${row.original.ROWID}`, {
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
        <TableCell key={cell.id} onClick={handleRowClick}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

const CustomerServiceListView = () => {
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
    "ROWID",
    "Activity Badge",
    "Created Time",
    "Task Name",
    "Policies",
    "Description",
    "Status",
    "Updated Policy Module - ZOHO",
    "Request BOT/Email Company/Cancel Portal",
    "Confirmation Received by us",
    "Confirmation to Client",
    "Comment on Contact Profile - ZOHO",
    "Effective Date Matches on Confirmation",
    "Task Completed CSR Name",
    "Contacts",
    "Last Activity Time",
    "Customer Service Owner",
    "Policy Advisor",
    "Contact Mobile",
    "Created By",
    "Currency",
    "Exchange Rate",
    "Tag",
    "Unsubscribed Mode",
    "Unsubscribed Time",
    "Group Insurance",
    "Policy Expiry Date",
    "Renewal Follow Up Date",
    "Policy Renewal Date",
    "Renewal Completed",
    "New Policy Renewal Date",
    "New Policy Premium",
    "Issued By",
    "Connected To",
    "Refund Amount",
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
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] = useState(false);

  const [allColumns, setAllColumns] = useState([
    "Activity Badge",
    "Created Time",
    "Task Name",
    "Policies",
    "Description",
    "Status",
    "Updated Policy Module - ZOHO",
    "Request BOT/Email Company/Cancel Portal",
    "Confirmation Received by us",
    "Confirmation to Client",
    "Comment on Contact Profile - ZOHO",
    "Effective Date Matches on Confirmation",
    "Task Completed CSR Name",
    "Contacts",
    "Last Activity Time",
    "Customer Service Owner",
    "Policy Advisor",
    "Contact Mobile",
    "Created By",
    "Currency",
    "Exchange Rate",
    "Tag",
    "Unsubscribed Mode",
    "Unsubscribed Time",
    "Group Insurance",
    "Policy Expiry Date",
    "Renewal Follow Up Date",
    "Policy Renewal Date",
    "Renewal Completed",
    "New Policy Renewal Date",
    "New Policy Premium",
    "Issued By",
    "Connected To",
    "Refund Amount",
  ]);

  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Load visible columns from localStorage
    const saved = localStorage.getItem("customer-service-visible-columns");
    return saved
      ? JSON.parse(saved)
      : [
        "Activity Badge",
        "Created Time",
        "Task Name",
        "Policies",
        "Description",
        "Status",
        "Updated Policy Module - ZOHO",
        "Request BOT/Email Company/Cancel Portal",
        "Confirmation Received by us",
        "Confirmation to Client",
        "Comment on Contact Profile - ZOHO",
        "Effective Date Matches on Confirmation",
        "Task Completed CSR Name",
        "Contacts",
        "Last Activity Time",
        "Customer Service Owner",
        "Policy Advisor",
        "Contact Mobile",
        "Created By",
        "Currency",
        "Exchange Rate",
        "Tag",
        "Unsubscribed Mode",
        "Unsubscribed Time",
        "Group Insurance",
        "Policy Expiry Date",
        "Renewal Follow Up Date",
        "Policy Renewal Date",
        "Renewal Completed",
        "New Policy Renewal Date",
        "New Policy Premium",
        "Issued By",
        "Connected To",
        "Refund Amount",
      ];
  });

  // Handler for column changes
  const handleColumnsChange = (newVisibleColumns) => {
    setVisibleColumns(newVisibleColumns);
    localStorage.setItem("customer-service-visible-columns", JSON.stringify(newVisibleColumns));
  };

  // Sync columnVisibility with visibleColumns
  useEffect(() => {
    const newVisibility = allColumns.reduce((acc, col) => {
      acc[col] = visibleColumns.includes(col);
      return acc;
    }, {});
    setColumnVisibility(newVisibility);
  }, [visibleColumns, allColumns]);

  // Mapping from display names to column IDs for TanStack Table
  const columnMapping = {
    "Activity Badge": "Activity Badge",
    "Created Time": "Created Time",
    "Task Name": "Task Name",
    "Policies": "Policies",
    "Description": "Description",
    "Status": "Status",
    "Updated Policy Module - ZOHO": "Updated Policy Module - ZOHO",
    "Request BOT/Email Company/Cancel Portal": "Request BOT/Email Company/Cancel Portal",
    "Confirmation Received by us": "Confirmation Received by us",
    "Confirmation to Client": "Confirmation to Client",
    "Comment on Contact Profile - ZOHO": "Comment on Contact Profile - ZOHO",
    "Effective Date Matches on Confirmation": "Effective Date Matches on Confirmation",
    "Task Completed CSR Name": "Task Completed CSR Name",
    "Contacts": "Contacts",
    "Last Activity Time": "Last Activity Time",
    "Customer Service Owner": "Customer Service Owner",
    "Policy Advisor": "Policy Advisor",
    "Contact Mobile": "Contact Mobile",
    "Created By": "Created By",
    "Currency": "Currency",
    "Exchange Rate": "Exchange Rate",
    "Tag": "Tag",
    "Unsubscribed Mode": "Unsubscribed Mode",
    "Unsubscribed Time": "Unsubscribed Time",
    "Group Insurance": "Group Insurance",
    "Policy Expiry Date": "Policy Expiry Date",
    "Renewal Follow Up Date": "Renewal Follow Up Date",
    "Policy Renewal Date": "Policy Renewal Date",
    "Renewal Completed": "Renewal Completed",
    "New Policy Renewal Date": "New Policy Renewal Date",
    "New Policy Premium": "New Policy Premium",
    "Issued By": "Issued By",
    "Connected To": "Connected To",
    "Refund Amount": "Refund Amount",
  };

  const CustomerServiceColumns = (navigate) => [
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
              navigate(`/crm/customerService/details/${row.original.ROWID}`, { state: row.original });
            }}>
            <i className="fas fa-eye text-gray-400" aria-hidden="true"></i>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">

              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                navigate(`/crm/customerService/details/${row.original.ROWID}`, { state: row.original });
              }}>
                Detail view
              </DropdownMenuItem>
              <DropdownMenuItem   onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  navigate(`/crm/customerService/create`);
                }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      size: 80,
      minSize: 80,
    },
    {
      accessorKey: "Activity Badge",
      header: ({ column }) => <SortableHeader column={column} title="Activity Badge" />,
      cell: ({ row }) => <div>{row.original["Activity Badge"]}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "Created Time",
      header: ({ column }) => <SortableHeader column={column} title="Created Time" />,
      cell: ({ row }) => (
        <div>
          {row.original["Created Time"]
            ? new Date(row.original["Created Time"]).toLocaleString()
            : "N/A"}
        </div>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Task Name",
      header: ({ column }) => <SortableHeader column={column} title="Task Name" />,
      cell: ({ row }) => <div>{row.original["Task Name"]}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Policies",
      header: ({ column }) => <SortableHeader column={column} title="Policies" />,
      cell: ({ row }) => <div>{row.original.Policies}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Description",
      header: ({ column }) => <SortableHeader column={column} title="Description" />,
      cell: ({ row }) => <div>{row.original.Description}</div>,
      size: 250,
      minSize: 250,
    },
    {
      accessorKey: "Status",
      header: ({ column }) => <SortableHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.original.Status || "N/A";
        const statusColors = {
          Completed: "#4caf50",
          Pending: "#ff9800",
          "In Progress": "#2196f3",
        };
        const bgColor = statusColors[status] || "#9e9e9e";
        return (
          <Badge
            className="badge-style"
            style={{ backgroundColor: bgColor, color: "white", width: "100px" }}
          >
            <span className="p-[3px] w-35 text-center">{status}</span>
          </Badge>
        );
      },
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "Updated Policy Module - ZOHO",
      header: ({ column }) => <SortableHeader column={column} title="Updated Policy Module - ZOHO" />,
      cell: ({ row }) => <div>{row.original["Updated Policy Module - ZOHO"]}</div>,
      size: 250,
      minSize: 250,
    },
    {
      accessorKey: "Request BOT/Email Company/Cancel Portal",
      header: ({ column }) => <SortableHeader column={column} title="Request BOT/Email Company/Cancel Portal" />,
      cell: ({ row }) => <div>{row.original["Request BOT/Email Company/Cancel Portal"]}</div>,
      size: 320,
      minSize: 320,
    },
    {
      accessorKey: "Confirmation Received by us",
      header: ({ column }) => <SortableHeader column={column} title="Confirmation Received by us" />,
      cell: ({ row }) => (
        <Badge
          className="badge-style"
          style={{
            backgroundColor: row.original["Confirmation Received by us"] ? "#4caf50" : "#f44336",
            color: "white",
            width: "80px"
          }}
        >
          {row.original["Confirmation Received by us"] ? "Yes" : "No"}
        </Badge>
      ),
      size: 250,
      minSize: 250,
    },
    {
      accessorKey: "Confirmation to Client",
      header: ({ column }) => <SortableHeader column={column} title="Confirmation to Client" />,
      cell: ({ row }) => <div>{row.original["Confirmation to Client"]}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "Comment on Contact Profile - ZOHO",
      header: ({ column }) => <SortableHeader column={column} title="Comment on Contact Profile - ZOHO" />,
      cell: ({ row }) => <div>{row.original["Comment on Contact Profile - ZOHO"]}</div>,
      size: 280,
      minSize: 280,
    },
    {
      accessorKey: "Effective Date Matches on Confirmation",
      header: ({ column }) => <SortableHeader column={column} title="Effective Date Matches on Confirmation" />,
      cell: ({ row }) => (
        <Badge
          className="badge-style"
          style={{
            backgroundColor: row.original["Effective Date Matches on Confirmation"] ? "#4caf50" : "#f44336",
            color: "white",
            width: "80px"
          }}
        >
          {row.original["Effective Date Matches on Confirmation"] ? "Yes" : "No"}
        </Badge>
      ),
      size: 300,
      minSize: 300,
    },
    {
      accessorKey: "Task Completed CSR Name",
      header: ({ column }) => <SortableHeader column={column} title="Task Completed CSR Name" />,
      cell: ({ row }) => <div>{row.original["Task Completed CSR Name"]}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "Contacts",
      header: ({ column }) => <SortableHeader column={column} title="Contacts" />,
      cell: ({ row }) => <div>{row.original.Contacts}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Last Activity Time",
      header: ({ column }) => <SortableHeader column={column} title="Last Activity Time" />,
      cell: ({ row }) => (
        <div>
          {row.original["Last Activity Time"]
            ? new Date(row.original["Last Activity Time"]).toLocaleString()
            : "N/A"}
        </div>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Customer Service Owner",
      header: ({ column }) => <SortableHeader column={column} title="Customer Service Owner" />,
      cell: ({ row }) => <div>{row.original["Customer Service Owner"]}</div>,
      size: 180,
      minSize: 180,
    },
    {
      accessorKey: "Policy Advisor",
      header: ({ column }) => <SortableHeader column={column} title="Policy Advisor" />,
      cell: ({ row }) => <div>{row.original["Policy Advisor"]}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Contact Mobile",
      header: ({ column }) => <SortableHeader column={column} title="Contact Mobile" />,
      cell: ({ row }) => <div>{row.original["Contact Mobile"]}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Created By",
      header: ({ column }) => <SortableHeader column={column} title="Created By" />,
      cell: ({ row }) => <div>{row.original["Created By"]}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "Currency",
      header: ({ column }) => <SortableHeader column={column} title="Currency" />,
      cell: ({ row }) => <div>{row.original.Currency}</div>,
      size: 100,
      minSize: 100,
    },
    {
      accessorKey: "Exchange Rate",
      header: ({ column }) => <SortableHeader column={column} title="Exchange Rate" />,
      cell: ({ row }) => <div>{row.original["Exchange Rate"]}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "Tag",
      header: ({ column }) => <SortableHeader column={column} title="Tag" />,
      cell: ({ row }) => <div>{row.original.Tag}</div>,
      size: 100,
      minSize: 100,
    },
    {
      accessorKey: "Unsubscribed Mode",
      header: ({ column }) => <SortableHeader column={column} title="Unsubscribed Mode" />,
      cell: ({ row }) => <div>{row.original["Unsubscribed Mode"] || "N/A"}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Unsubscribed Time",
      header: ({ column }) => <SortableHeader column={column} title="Unsubscribed Time" />,
      cell: ({ row }) => (
        <div>
          {row.original["Unsubscribed Time"]
            ? new Date(row.original["Unsubscribed Time"]).toLocaleString()
            : "N/A"}
        </div>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Group Insurance",
      header: ({ column }) => <SortableHeader column={column} title="Group Insurance" />,
      cell: ({ row }) => <div>{row.original["Group Insurance"]}</div>,
      size: 130,
      minSize: 130,
    },
    {
      accessorKey: "Policy Expiry Date",
      header: ({ column }) => <SortableHeader column={column} title="Policy Expiry Date" />,
      cell: ({ row }) => (
        <div>
          {row.original["Policy Expiry Date"]
            ? new Date(row.original["Policy Expiry Date"]).toLocaleDateString()
            : "N/A"}
        </div>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Renewal Follow Up Date",
      header: ({ column }) => <SortableHeader column={column} title="Renewal Follow Up Date" />,
      cell: ({ row }) => (
        <div>
          {row.original["Renewal Follow Up Date"]
            ? new Date(row.original["Renewal Follow Up Date"]).toLocaleDateString()
            : "N/A"}
        </div>
      ),
      size: 170,
      minSize: 170,
    },
    {
      accessorKey: "Policy Renewal Date",
      header: ({ column }) => <SortableHeader column={column} title="Policy Renewal Date" />,
      cell: ({ row }) => (
        <div>
          {row.original["Policy Renewal Date"]
            ? new Date(row.original["Policy Renewal Date"]).toLocaleDateString()
            : "N/A"}
        </div>
      ),
      size: 160,
      minSize: 160,
    },
    {
      accessorKey: "Renewal Completed",
      header: ({ column }) => <SortableHeader column={column} title="Renewal Completed" />,
      cell: ({ row }) => (
        <Badge
          className="badge-style"
          style={{
            backgroundColor: row.original["Renewal Completed"] ? "#4caf50" : "#f44336",
            color: "white",
            width: "80px"
          }}
        >
          {row.original["Renewal Completed"] ? "Yes" : "No"}
        </Badge>
      ),
      size: 140,
      minSize: 140,
    },
    {
      accessorKey: "New Policy Renewal Date",
      header: ({ column }) => <SortableHeader column={column} title="New Policy Renewal Date" />,
      cell: ({ row }) => (
        <div>
          {row.original["New Policy Renewal Date"]
            ? new Date(row.original["New Policy Renewal Date"]).toLocaleDateString()
            : "N/A"}
        </div>
      ),
      size: 180,
      minSize: 180,
    },
    {
      accessorKey: "New Policy Premium",
      header: ({ column }) => <SortableHeader column={column} title="New Policy Premium" />,
      cell: ({ row }) => <div>{row.original["New Policy Premium"]}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "Issued By",
      header: ({ column }) => <SortableHeader column={column} title="Issued By" />,
      cell: ({ row }) => <div>{row.original["Issued By"]}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "Connected To",
      header: ({ column }) => <SortableHeader column={column} title="Connected To" />,
      cell: ({ row }) => <div>{row.original["Connected To"]}</div>,
      size: 130,
      minSize: 130,
    },
    {
      accessorKey: "Refund Amount",
      header: ({ column }) => <SortableHeader column={column} title="Refund Amount" />,
      cell: ({ row }) => <div>{row.original["Refund Amount"]}</div>,
      size: 120,
      minSize: 120,
    },
  ];

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
  const columns = CustomerServiceColumns(navigate);

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
        defaultValue="all-tickets"
        className="w-full flex-col justify-start gap-2"
      >
        <div className="flex items-center justify-end mx-1 lg:mx-2">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select defaultValue="all-tickets">
            <SelectTrigger
              className="flex w-fit lg:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-tickets">All Tickets</SelectItem>
              <SelectItem value="open-tickets">Open Tickets</SelectItem>
              <SelectItem value="resolved-tickets">Resolved Tickets</SelectItem>
              <SelectItem value="closed-tickets">Closed Tickets</SelectItem>
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
                <DropdownMenuItem onClick={() => setIsMassUpdateModalOpen(true)}>
                  <IconDotsVertical className="mr-2 h-4 w-4" />
                  Mass Update
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconDownload className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsColumnManageDrawerOpen(true)}>
                  <IconLayoutColumns className="mr-2 h-4 w-4" />
                  Manage Columns
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => navigate("/crm/customerService/create")}>
              <IconPlus />
              <span className="hidden lg:inline">Create Customer Service</span>
            </Button>
          </div>
        </div>
        <TabsContent
          value="all-tickets"
          className="relative flex flex-col gap-4 overflow-auto mx-1 lg:mx-2"
        >
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
                                <>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {header.column.getCanResize() && (
                                    <div
                                      onMouseDown={header.getResizeHandler()}
                                      onTouchStart={header.getResizeHandler()}
                                      className={`absolute right-0 top-0 h-full w-0.5 cursor-col-resize select-none touch-none ${header.column.getIsResizing()
                                        ? "bg-primary"
                                        : "bg-border hover:bg-primary/50"
                                        }`}
                                    />
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
                          <DraggableRow key={row.id} row={row} navigate={navigate} />
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
                      placeholder={
                        table.getState().pagination.pageSize
                      }
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
          value="open-tickets"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Open Tickets Tab
          </div>
        </TabsContent>
        <TabsContent
          value="resolved-tickets"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Resolved Tickets Tab
          </div>
        </TabsContent>
        <TabsContent
          value="closed-tickets"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Closed Tickets Tab
          </div>
        </TabsContent>
      </Tabs>

      {/* Search Drawer */}
      <CustomerServiceSearchDrawer
        isOpen={isSearchDrawerOpen}
        onClose={() => setIsSearchDrawerOpen(false)}
        onSearchResults={(searchFields) => {
          console.log('Search results:', searchFields);
          // Implement search logic here
        }}
      />

      {/* Column Manage Drawer */}
      <CustomerServiceColumnManageDrawer
        isOpen={isColumnManageDrawerOpen}
        visibleColumns={visibleColumns}
        allColumns={allColumns}
        onClose={() => setIsColumnManageDrawerOpen(false)}
        onColumnsChange={handleColumnsChange}
      />

      {/* Mass Update Modal */}
      <CustomerServiceMassUpdateModal
        isOpen={isMassUpdateModalOpen}
        fields={allColumns}
        onClose={() => setIsMassUpdateModalOpen(false)}
        onUpdate={(updateData) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          if (selectedRows.length === 0) {
            toast.error("No rows selected for update");
            return;
          }
          setData(prevData =>
            prevData.map(row =>
              selectedRows.some(selectedRow => selectedRow.original.ROWID === row.ROWID)
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

export default CustomerServiceListView;
