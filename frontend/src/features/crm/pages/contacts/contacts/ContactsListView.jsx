import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronUp,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
  IconArrowUp,
  IconArrowDown,
  IconRefresh,
  IconSearch,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import { toast } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
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
import dataSample from "./sample/contacts.json";
import { useNavigate } from "react-router-dom";
import { leadSource, company } from "@features/utils/ListViewMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactFromList,
  fetchContacts,
} from "@/redux/slices/contacts/contactSlice";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { DeleteAlert } from "@/components/custom/DeleteAlert";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";
import { deleteContact } from "@/services/crm/contactApi";
import { toast } from "react-toastify";
import {  Filter } from "lucide-react";
import { partyTypes } from "@/features/utils/ListViewMenu";
import { EllipsisVertical, Mail, Edit } from "lucide-react";
import { useRef } from "react";

// Import existing components
// import ContactDrawer from "./ContactDrawer";
import MassUpdateModal from "./MassUpdateModal";
import MassUpdateEmailModal from "./MassUpdateEmailModal";
import ContactColumnManageDrawer from "./ContactColumnManageDrawer";
import Loader from "@/components/Loader";
import ContactDrawer from "../ContactDrawer";
import { formatDateTime } from "@/components/custom/DateFormatter";
// Create a separate component for the drag handle
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

function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.ROWID,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative compact-table z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell    className="compact-table py-1 px-2 text-sm" key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },

  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
};

const ContactsListView = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] =
    useState(false);
  const [showMassUpdate, setShowMassUpdate] = useState(false);
  const [showMassEmail, setShowMassEmail] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const [selectedEmailContacts, setSelectedEmailContacts] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [searchPayloadFlag, setSearchPayloadFlag] = useState(false);
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const [columnSizing, setColumnSizing] = useState(() => {
    // Load column sizing from localStorage
    const saved = localStorage.getItem("contacts-table-column-sizing");
    const defaultSizes = {
      actions: 80,
      leadConvertedOn: 150,
      CREATEDTIME: 150,
      leadCreatedOn: 150,
      dealStageTracking: 160,
      contactName: 200,
      mobile: 120,
      email: 200,
      serviceAvailedOptions: 200,
      insuranceLeadsSource: 200,
      advisorModuleName: 150,
      clvCorporateCommission: 170,
      clvAdvisorCommission: 170,
      lastCLVCorporate: 150,
      lastCLVAdvisor: 150,
      phoneNumber: 120,
      UserfullName: 150,
      mailingStreet: 150,
      mailingCity: 120,
      mailingZip: 120,
      relationshipStatus: 150,
      emergencyContact: 150,
      emergencyContactEmail: 200,
      emergencyContactPhone: 180,
      emergencyContactRelationship: 200,
      preferredContactMethod: 180,
      dateOfBirth: 120,
      newServiceRequested: 180,
      gclid: 120,
    };
    return saved ? { ...defaultSizes, ...JSON.parse(saved) } : defaultSizes;
  });
  const [columnOrder, setColumnOrder] = useState([
    "actions",
    "select",
    "leadConvertedOn",
    "CREATEDTIME",
    "leadCreatedOn",
    "dealStageTracking",
    "contactName",
    "mobile",
    "email",
    "serviceAvailedOptions",
    "insuranceLeadsSource",
    "advisorModuleName",
    "clvCorporateCommission",
    "clvAdvisorCommission",
    "lastCLVCorporate",
    "lastCLVAdvisor",
    "phoneNumber",
    "UserfullName",
    "mailingStreet",
    "mailingCity",
    "mailingZip",
    "relationshipStatus",
    "emergencyContact",
    "emergencyContactEmail",
    "emergencyContactPhone",
    "emergencyContactRelationship",
    "preferredContactMethod",
    "dateOfBirth",
    "newServiceRequested",
    "gclid",
  ]);
  const contactColumns = (navigate) => [
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
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="d-flex justify-content-center align-items-center gap-2 ">
          <Button
            onClick={() =>
              navigate(`/crm/contacts/details/${row.original.ROWID}`, {
                state: row.original,
              })
            }
            variant="link"
            className="text-foreground cursor-pointer w-fit px-0 text-left "
          >
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling to parent row
                  navigate("/crm/contacts/update", { state: row.original });
                }}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  navigate(`/crm/contacts/details/${row.original.ROWID}`, {
                    state: row.original,
                  });
                }}
              >
                Detail view
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  setOpenAlert(true);
                  setIdToDelete(row.original.ROWID);
                }}
                variant="destructive"
                className="text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      size: 60,
      minSize: 60,
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
      accessorKey: "leadConvertedOn",
      header: ({ column }) => (
        <SortableHeader column={column} title="Lead Converted On" />
      ),
      cell: ({ row }) => <div>{formatDateTime(row.original.leadConvertedOn||"NA")}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "CREATEDTIME",
      header: ({ column }) => (
        <SortableHeader column={column} title="Created Time" />
      ),
      cell: ({ row }) => <div>{formatDateTime(row.original.CREATEDTIME)}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "leadCreatedOn",
      header: ({ column }) => (
        <SortableHeader column={column} title="Lead Created On" />
      ),
      cell: ({ row }) => <div>{formatDateTime(row.original.leadCreatedOn||"NA")}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "dealStageTracking",
      header: ({ column }) => (
        <SortableHeader column={column} title="Deal Stage Tracking" />
      ),
      cell: ({ row }) => <div>{row.original.dealStageTracking}</div>,
      size: 150,
      minSize: 150,
    },
    {
      id: "contactName",
      accessorFn: (row) => `${row.firstName} ${row.lastName || ""}`.trim(),
      header: ({ column }) => (
        <SortableHeader column={column} title="Contact Name" />
      ),
      cell: ({ row }) => {
        return (
          <Button
            onClick={() =>
              navigate(`/crm/contacts/details/${row.original.ROWID}`, {
                state: row.original,
              })
            }
            variant="link"
            className="text-foreground cursor-pointer w-fit px-0 text-left"
          >
            {row.original.firstName + " " + row.original?.lastName}
          </Button>
        );
      },
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "mobile",
      header: ({ column }) => <SortableHeader column={column} title="Mobile" />,
      cell: ({ row }) => <div>{row.original.mobile}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      cell: ({ row }) => <div>{row.original.email}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "serviceAvailedOptions",
      header: ({ column }) => (
        <SortableHeader column={column} title="Service Availed Options" />
      ),
      cell: ({ row }) => <div>{row.original.serviceAvailedOptions}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "insuranceLeadsSource",
      header: ({ column }) => (
        <SortableHeader column={column} title="Insurance Leads Source" />
      ),
      cell: ({ row }) => <div>{row.original.insuranceLeadsSource}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "advisorModuleName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Assign Advisor" />
      ),
      cell: ({ row }) => <div>{row.original.advisorModuleName}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "clvCorporateCommission",
      header: ({ column }) => (
        <SortableHeader column={column} title="CLV Corporate Commission" />
      ),
      cell: ({ row }) => <div>{row.original.clvCorporateCommission}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "clvAdvisorCommission",
      header: ({ column }) => (
        <SortableHeader column={column} title="CLV Advisor Commission" />
      ),
      cell: ({ row }) => <div>{row.original.clvAdvisorCommission}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "lastCLVCorporate",
      header: ({ column }) => (
        <SortableHeader column={column} title="Last CLV Corporate" />
      ),
      cell: ({ row }) => <div>{row.original.lastCLVCorporate}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "lastCLVAdvisor",
      header: ({ column }) => (
        <SortableHeader column={column} title="Last CLV Advisor" />
      ),
      cell: ({ row }) => <div>{row.original.lastCLVAdvisor}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => <SortableHeader column={column} title="Phone" />,
      cell: ({ row }) => <div>{row.original.phoneNumber}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "UserfullName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Contact Owner" />
      ),
      cell: ({ row }) => <div>{row.original.UserfullName}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "mailingStreet",
      header: ({ column }) => (
        <SortableHeader column={column} title="Mailing Street" />
      ),
      cell: ({ row }) => <div>{row.original.mailingStreet}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "mailingCity",
      header: ({ column }) => (
        <SortableHeader column={column} title="Mailing City" />
      ),
      cell: ({ row }) => <div>{row.original.mailingCity}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "mailingZip",
      header: ({ column }) => (
        <SortableHeader column={column} title="Mailing Zip" />
      ),
      cell: ({ row }) => <div>{row.original.mailingZip}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "relationshipStatus",
      header: ({ column }) => (
        <SortableHeader column={column} title="Relationship Status" />
      ),
      cell: ({ row }) => <div>{row.original.relationshipStatus}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "emergencyContact",
      header: ({ column }) => (
        <SortableHeader column={column} title="Emergency Contact" />
      ),
      cell: ({ row }) => <div>{row.original.emergencyContact}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "emergencyContactEmail",
      header: ({ column }) => (
        <SortableHeader column={column} title="Emergency Contact Email" />
      ),
      cell: ({ row }) => <div>{row.original.emergencyContactEmail}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "emergencyContactPhone",
      header: ({ column }) => (
        <SortableHeader column={column} title="Emergency Contact Phone" />
      ),
      cell: ({ row }) => <div>{row.original.emergencyContactPhone}</div>,
      size: 180,
      minSize: 180,
    },
    {
      accessorKey: "emergencyContactRelationship",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          title="Emergency Contact Relationship"
        />
      ),
      cell: ({ row }) => <div>{row.original.emergencyContactRelationship}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "preferredContactMethod",
      header: ({ column }) => (
        <SortableHeader column={column} title="Preferred Contact Method" />
      ),
      cell: ({ row }) => <div>{row.original.preferredContactMethod}</div>,
      size: 180,
      minSize: 180,
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
        <SortableHeader column={column} title="Date of Birth" />
      ),
      cell: ({ row }) => <div>{row.original.dateOfBirth}</div>,
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: "newServiceRequested",
      header: ({ column }) => (
        <SortableHeader column={column} title="New Service Requested" />
      ),
      cell: ({ row }) => <div>{row.original.newServiceRequested}</div>,
      size: 180,
      minSize: 180,
    },
    {
      accessorKey: "gclid",
      header: ({ column }) => <SortableHeader column={column} title="GCLID" />,
      cell: ({ row }) => <div>{row.original.gclid}</div>,
      size: 120,
      minSize: 120,
    },
  ];
  const dispatch = useDispatch();
  const { data, loading, error, fetchedContacts } = useSelector(
    (state) => state.contacts.all
  );

  // Use Redux data for list view display
  const [localData, setLocalData] = useState([]);
  const displayData = localData;
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const dataIds = useMemo(
    () => localData?.map(({ ROWID }) => ROWID) || [],
    [localData]
  );
  const columns = contactColumns(navigate);
  const massUpdateFields = columns
    .filter((col) => col.accessorKey)
    .map((col) => col.accessorKey);
  useEffect(() => {
    if (!fetchedContacts) {
      dispatch(fetchContacts());
    }
  }, [fetchedContacts, dispatch]);
  useEffect(() => {
    if (data && data.length > 0) {
      setLocalData(data);
    } else if (!loading && !data?.length) {
      // Fallback to sample data if no data from API
      setLocalData(dataSample);
    }
  }, [data, loading]);
  useEffect(() => {
    console.log(fetchedContacts, "contactsData");
    console.log(dataIds, "idsss");
  }, [localData]);

  useEffect(() => {
    localStorage.setItem(
      "contacts-table-column-sizing",
      JSON.stringify(columnSizing)
    );
  }, [columnSizing]);

  // Sync selectedContacts state with table row selection

  const table = useReactTable({
    data: displayData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      columnSizing,
    },
    getRowId: (row) => row.ROWID.toString(),
    enableRowSelection: true,
    enableColumnResizing: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  useEffect(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.ROWID);
    setSelectedContacts(selectedIds);
  }, [rowSelection, table]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setLocalData((localData) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(localData, oldIndex, newIndex);
      });
    }
  }

  function handleDelete() {
    if (idToDelete !== "") {
      setDeleteLoading(true);
      deleteContact(idToDelete)
        .then((res) => {
          if (res.data.success) {
            dispatch(deleteContactFromList(idToDelete));
            toast.success("Contact Deleted Successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || err.message);
        })
        .finally(() => {
          setDeleteLoading(false);
          setOpenAlert(false);
        });
    }
  }

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-4">
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Refresh functionality
                  dispatch(fetchContacts());
                }}
              >
                <IconRefresh />
                <span className="hidden lg:inline">Refresh</span>
              </Button> */}
            </div>
            <div className="flex gap-2">
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter />
                    <span className="hidden lg:inline">Filter</span>
                    <IconChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40">
                  {partyTypes.map((item) => (
                    <DropdownMenuItem key={item.value} value={item.value}>
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}

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
                    <Filter />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setIsColumnManageDrawerOpen(true)}
                  >
                    <IconLayoutColumns /> Manage Columns
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (selectedContacts.length > 0) {
                        setShowMassUpdate(true);
                      }
                    }}
                    disabled={selectedContacts.length === 0}
                  >
                    Mass Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (selectedContacts.length > 0) {
                        setShowMassEmail(true);
                      }
                    }}
                    disabled={selectedContacts.length === 0}
                  >
                    Mass Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/crm/contacts/create")}
              >
                <IconPlus />
                <span className="hidden lg:inline">Create Contact</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 relative pb-20">
              <div
                className="relative  grid w-full border rounded"
                style={{
                  height: "calc(90vh - 140px)",
                  maxHeight: "calc(100vh - 130px)",
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
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
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
                    <TableBody className="compact-table **:data-[slot=table-cell]:first:w-8 overflow-hidden py-0 my-0">
                      {table.getRowModel().rows?.length ? (
                        <SortableContext
                          items={dataIds}
                          className="compact-table"
                          strategy={verticalListSortingStrategy}
                        >
                          {table.getRowModel().rows.map((row) => (
                            <DraggableRow key={row.ROWID} row={row} />
                          ))}
                        </SortableContext>
                      ) : (
                        <TableRow className="h-24 text-center">
                          <TableCell
                            colSpan={columns?.length}
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
        </>
      )}
      <TableDataDeleteAlert
        loading={deleteLoading}
        handleDelete={handleDelete}
        open={openAlert}
        setOpen={setOpenAlert}
      />

      {/* Integrated Drawers and Modals */}
      <ContactDrawer
        isOpen={isSearchDrawerOpen}
        onClose={() => setIsSearchDrawerOpen(false)}
        onSearchResults={(criteria) => {
          // Handle search results here
          console.log("Search criteria:", criteria);
          // You can implement filtering logic based on criteria
        }}
      />
      <ContactColumnManageDrawer
        isOpen={isColumnManageDrawerOpen}
        onClose={() => setIsColumnManageDrawerOpen(false)}
        columns={table.getAllColumns().map((col) => col.id)}
        visibleColumns={table
          .getAllColumns()
          .filter((col) => col.getIsVisible())
          .map((col) => col.id)}
        onUpdateColumns={(visible) => {
          table.getAllColumns().forEach((col) => {
            col.toggleVisibility(visible.includes(col.id));
          });
        }}
      />
      <MassUpdateModal
        isOpen={showMassUpdate}
        onClose={() => setShowMassUpdate(false)}
        fields={massUpdateFields}
        onUpdateMass={(data) => {
          // Handle mass update here
          console.log("Mass update data:", data);
          // Implement mass update logic
        }}
      />
      <MassUpdateEmailModal
        isOpen={showMassEmail}
        onClose={() => setShowMassEmail(false)}
        fields={[]}
        selectedIds={selectedContacts}
        selectedEmailContacts={selectedEmailContacts}
        onSendMassEmail={(data) => {
          // Handle mass email send here
          console.log("Mass email data:", data);
          // Implement mass email logic
        }}
      />
    </div>
  );
};

export default ContactsListView;
