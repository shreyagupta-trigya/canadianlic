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
import { restrictToVerticalAxis, restrictToHorizontalAxis } from "@dnd-kit/modifiers";
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
  IconLoader,
  IconPlus,
  IconTrendingUp,
  IconSearch,
  IconMail,
  IconDownload,
  IconLayoutGrid,
  IconLayoutList,
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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";

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
import dataSample from "./sample/data.json";
import {
  advisorStatus,
  advisorSource,
  advisorOwner,
} from "@features/utils/AdvisorListViewMenu.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdvisors,
  deleteAdvisorFromList,
  updateAdvisorInList,
} from "@/redux/slices/advisor/advisorSlice";
// import { deleteAdvisor, updateAdvisor } from "@/services/crm/advisorApi";

import TableSkeleton from "@/components/custom/TableSkeleton";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";
// import AdvisorDrawer from "./drawer/AdvisorDrawer";
// import AdvisorCardView from "./drawer/AdvisorCardView";
// import AdvisorConvertDeal from "./drawer/AdvisorConvertDeal";
import MassUpdateModal from "./MassUpdateModal";
import MassUpdateEmailModal from "./MassUpdateEmailModal";
// import AdvisorColumnManageDrawer from "./drawer/AdvisorColumnManageDrawer";
import LeadDrawer from "@/features/crm/pages/leads/LeadDrawer";
import { EllipsisVertical } from "lucide-react";

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
        ) : sortDirection === 'asc' ? (
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
  console.log(row.original.dateValue);

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
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

function TableCellViewer({ item }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} size="lg">
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const AdvisorsListNew = () => {
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
    "drag", "select", "actions", "CREATEDTIME", "advisorName", "email", "phone",
    "ciprNumber", "status", "location", "advDob", "advDoh", "advCessD",
    "advEOPolNum", "advLicNum", "isLlqpLicensed", "insuranceLeadOwner",
    "insuranceLeadSource", "leadStatusStage", "assignedAdvisor", "gender",
    "isThisaReassignment", "companyName"
  ]);
  const [columnSizing, setColumnSizing] = useState(() => {
    // Load column sizing from localStorage
    const saved = localStorage.getItem('advisors-table-column-sizing');
    const defaultSizes = {
      drag: 40,
      select: 50,
      actions: 80,
      CREATEDTIME: 150,
      advisorName: 200,
      email: 200,
      phone: 120,
      ciprNumber: 120,
      status: 100,
      location: 120,
      advDob: 120,
      advDoh: 120,
      advCessD: 120,
      advEOPolNum: 120,
      advLicNum: 120,
      isLlqpLicensed: 120,
      insuranceLeadOwner: 150,
      insuranceLeadSource: 150,
      leadStatusStage: 150,
      assignedAdvisor: 150,
      gender: 100,
      isThisaReassignment: 120,
      companyName: 150,
    };
    return saved ? { ...defaultSizes, ...JSON.parse(saved) } : defaultSizes;
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // New state variables for enhanced functionality
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isMassEmailModalOpen, setIsMassEmailModalOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] = useState(false);
  const [isConvertDealModalOpen, setIsConvertDealModalOpen] = useState(false);
  const [selectedLeadForConversion, setSelectedLeadForConversion] = useState(null);
  const [searchFields, setSearchFields] = useState([]);

  const filteredData = useMemo(() => {
    if (searchFields.length === 0) return data;
    return data.filter(item => {
      return searchFields.every(search => {
        const { field, operation, value } = search;
        const itemValue = item[field];
        switch (operation) {
          case 'is':
            return itemValue == value;
          case 'is_not':
            return itemValue != value;
          case 'contains':
            return itemValue?.toString().toLowerCase().includes(value.toLowerCase());
          case 'does_not_contain':
            return !itemValue?.toString().toLowerCase().includes(value.toLowerCase());
          case 'starts_with':
            return itemValue?.toString().toLowerCase().startsWith(value.toLowerCase());
          case 'ends_with':
            return itemValue?.toString().toLowerCase().endsWith(value.toLowerCase());
          case 'greater_than':
            return parseFloat(itemValue) > parseFloat(value);
          case 'less_than':
            return parseFloat(itemValue) < parseFloat(value);
          case 'between':
            return parseFloat(itemValue) >= parseFloat(value[0]) && parseFloat(itemValue) <= parseFloat(value[1]);
          default:
            return true;
        }
      });
    });
  }, [data, searchFields]);
  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Load visible columns from localStorage
    const saved = localStorage.getItem('leads-visible-columns');
    return saved ? JSON.parse(saved) : [
      "Action", "Created Time *", "Layout", "Insurance Lead Name All", "Insurance Lead Status", "Lead Status Stage", "Mobile", "Insurance Lead Source", "Assigned Advisor", "Email", "Services Requested", "GCLID", "First Page Visited", "Last Activity Time", "Total Interaction Time (mins)", "Phone", "Created By", "Ad Campaign Name", "FaceBook Ad", "First Name", "Last Name All", "Keyword", "Submit Page URL", "LP URL Data", "GCLID Data", "Ad Network"
    ];
  });
  const [allColumns, setAllColumns] = useState([
    "Action", "Created Time *", "Layout", "Insurance Lead Name All", "Insurance Lead Status", "Lead Status Stage", "Mobile", "Insurance Lead Source", "Assigned Advisor", "Email", "Services Requested", "GCLID", "First Page Visited", "Last Activity Time", "Total Interaction Time (mins)", "Phone", "Created By", "Ad Campaign Name", "FaceBook Ad", "First Name", "Last Name All", "Keyword", "Submit Page URL", "LP URL Data", "GCLID Data", "Ad Network"
  ]);

  // Mapping from display names to column IDs for TanStack Table
  const columnMapping = {
    "Action": "actions",
    "Created Time *": "CREATEDTIME",
    "Layout": "layoutName",
    "Insurance Lead Name All": "insuranceLeadNameAll",
    "Insurance Lead Status": "insuranceLeadStatus",
    "Lead Status Stage": "leadStatusStage",
    "Mobile": "mobile",
    "Insurance Lead Source": "insuranceLeadSource",
    "Assigned Advisor": "advisorfullName",
    "Email": "email",
    "Services Requested": "servicesRequested",
    "GCLID": "gclid",
    "First Page Visited": "firstPageVisited",
    "Last Activity Time": "MODIFIEDTIME",
    "Total Interaction Time (mins)": "totalInteractionTime",
    "Phone": "phoneNumber",
    "Created By": "UserfullName",
    "Ad Campaign Name": "adCampaign",
    "FaceBook Ad": "facebookAd",
    "First Name": "firstName",
    "Last Name All": "lastName",
    "Keyword": "keywordData",
    "Submit Page URL": "submitPageURL",
    "LP URL Data": "lpUrlData",
    "GCLID Data": "gclidData",
    "Ad Network": "adNetwork"
  };

  const dispatch = useDispatch();
  const { data: Advisorsdata, loading, error, fetchedAdvisors } = useSelector((state) => state.advisors.all);
  console.log("Advisorsdata:", Advisorsdata);
  useEffect(() => {
    if (!fetchedAdvisors) {
      dispatch(fetchAdvisors());
    }
  }, [fetchedAdvisors, dispatch]);

  useEffect(() => {
    if (Advisorsdata && Advisorsdata.length > 0) {
      setData(Advisorsdata);
    }
  }, [Advisorsdata]);

  // Initialize columnVisibility based on visibleColumns
  useEffect(() => {
    const visibilityMap = {};
    allColumns.forEach(col => {
      const columnId = columnMapping[col];
      if (columnId) {
        visibilityMap[columnId] = visibleColumns.includes(col);
      }
    });
    setColumnVisibility(visibilityMap);
  }, [visibleColumns, allColumns]);

  // Save column sizing to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('leads-table-column-sizing', JSON.stringify(columnSizing));
  }, [columnSizing]);

  // Save visible columns to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('leads-visible-columns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  //   const handleDelete = () => {
  //     if (!idToDelete) return;

  //     setDeleteLoading(true);
  //     deleteLead(idToDelete)
  //         .then((res) => {
  //             if (res.data.success) {
  //                 dispatch(deleteLeadFromList(idToDelete));
  //                 toast.success("Lead deleted successfully");
  //             }
  //         })
  //         .catch((err) => {
  //             toast.error(err?.response?.data?.message || err.message);
  //         })
  //         .finally(() => {
  //             setDeleteLoading(false);
  //             setOpenAlert(false);
  //         });
  // };

  function handleDelete() {
    // if (idToDelete !== "") {
    //   setDeleteLoading(true);
    //   deleteAdvisor(idToDelete)
    //     .then((res) => {
    //       const count = res?.advisors?.[0]?.advisors?.DELETED_ROWS_COUNT;

    //       if (res.success && count > 0) {
    //         dispatch(deleteAdvisorFromList(idToDelete));
    //         toast.success("Advisor deleted successfully");
    //       } else {
    //         toast.error("Advisor not deleted");
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       toast.error(err?.response?.data?.message || "Failed to delete advisor");
    //     })
    //     .finally(() => {
    //       setDeleteLoading(false);
    //       setOpenAlert(false);
    //     });
    // }
  }

  const AdvisorColumns = (navigate) => [
    {
      id: "drag",
      header: "",
      cell: ({ row }) => <DragHandle id={row.original.ROWID} />,
      enableSorting: false,
      enableHiding: false,
      size: 40,
      minSize: 40,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
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
            onClick={() => navigate(`/crm/leads/details/${row.original.ROWID}`, { state: row.original })}
            variant="link"
            className="text-foreground cursor-pointer w-fit px-0 text-left"
          >
            <i className="fas fa-eye text-gray-400" aria-hidden="true"></i>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => navigate(`/crm/leads/details/${row.original.ROWID}`, { state: row.original })}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenAlert(true);
                  setIdToDelete(row.original.ROWID);
                }}
                variant="destructive"
                className="text-red-500"
              >
                Delete
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setIsConvertDealModalOpen(true)}>
                Convert To Deal
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      size: 80,
      minSize: 80,
    },
    {
      accessorKey: "CREATEDTIME",
      header: ({ column }) => <SortableHeader column={column} title="Created Time *" />,
      cell: ({ row }) => (
        <div>{row.original.CREATEDTIME ? new Date(row.original.CREATEDTIME).toLocaleString() : "N/A"}</div>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "layoutName",
      header: ({ column }) => <SortableHeader column={column} title="Layout" />,
      cell: ({ row }) => (
        <Badge className={`badge-style ${row.original.layoutName?.toLowerCase() === 'client' ? 'client-layout' : 'advisor-layout'}`}>
          {row.original.layoutName}
        </Badge>
      ),
      size: 100,
      minSize: 100,
    },
    {
      accessorKey: "insuranceLeadNameAll",
      header: ({ column }) => <SortableHeader column={column} title="Insurance Lead Name All" />,
      cell: ({ row }) => (
        <Button
          onClick={() => navigate(`/crm/leads/details/${row.original.ROWID}`, { state: row.original })}
          variant="link"
          className="text-foreground cursor-pointer w-fit px-0 text-left"
        >
          {`${row.original.firstName ?? ""} ${row.original.lastName ?? ""}`.trim()}
        </Button>
      ),
    },
    {
      accessorKey: "insuranceLeadStatus",
      header: ({ column }) => <SortableHeader column={column} title="Insurance Lead Status" />,
      cell: ({ row }) => (
        <Badge className="badge-style" style={{
          backgroundColor: row.original.insuranceLeadStatusColor || '#fdd835',
          color: (row.original.insuranceLeadStatusColor === '#fdd835') ? 'black' : 'white'
        }}>
          {row.original.insuranceLeadStatus || "N/A"}
        </Badge>
      ),
    },
    {
      accessorKey: "leadStatusStage",
      header: ({ column }) => <SortableHeader column={column} title="Lead Status Stage" />,
      cell: ({ row }) => (
        <Badge className="badge-style" style={{
          backgroundColor: row.original.leadStatusStageColor || '#fdd835',
          color: (row.original.leadStatusStageColor === '#fdd835') ? 'black' : 'white'
        }}>
          {row.original.leadStatusStage || "N/A"}
        </Badge>
      ),
    },
    {
      accessorKey: "mobile",
      header: ({ column }) => <SortableHeader column={column} title="Mobile" />,
      cell: ({ row }) => <div>{row.original.mobile}</div>,
    },
    {
      accessorKey: "insuranceLeadSource",
      header: ({ column }) => <SortableHeader column={column} title="Insurance Lead Source" />,
      cell: ({ row }) => <div>{row.original.insuranceLeadSource}</div>,
    },
    {
      accessorKey: "advisorfullName",
      header: ({ column }) => <SortableHeader column={column} title="Assigned Advisor" />,
      cell: ({ row }) => <div>{row.original.advisorfullName}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      cell: ({ row }) => (
        <Button
          onClick={() => navigate(`/crm/leads/details/${row.original.ROWID}`, { state: row.original })}
          variant="link"
          className="text-foreground cursor-pointer w-fit px-0 text-left"
        >
          {row.original.email}
        </Button>
      ),
    },
    {
      accessorKey: "servicesRequested",
      header: ({ column }) => <SortableHeader column={column} title="Services Requested" />,
      cell: ({ row }) => <div>{row.original.servicesRequested}</div>,
    },
    {
      accessorKey: "gclid",
      header: ({ column }) => <SortableHeader column={column} title="GCLID" />,
      cell: ({ row }) => <div>{row.original.gclid}</div>,
    },
    {
      accessorKey: "firstPageVisited",
      header: ({ column }) => <SortableHeader column={column} title="First Page Visited" />,
      cell: ({ row }) => <div>{row.original.firstPageVisited}</div>,
    },
    {
      accessorKey: "MODIFIEDTIME",
      header: ({ column }) => <SortableHeader column={column} title="Last Activity Time" />,
      cell: ({ row }) => <div>{row.original.MODIFIEDTIME}</div>,
    },
    {
      accessorKey: "totalInteractionTime",
      header: ({ column }) => <SortableHeader column={column} title="Total Interaction Time (mins)" />,
      cell: ({ row }) => <div>{row.original.totalInteractionTime}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => <SortableHeader column={column} title="Phone" />,
      cell: ({ row }) => <div>{row.original.phoneNumber}</div>,
    },
    {
      accessorKey: "UserfullName",
      header: ({ column }) => <SortableHeader column={column} title="Created By" />,
      cell: ({ row }) => <div>{row.original.UserfullName}</div>,
    },
    {
      accessorKey: "adCampaign",
      header: ({ column }) => <SortableHeader column={column} title="Ad Campaign Name" />,
      cell: ({ row }) => <div>{row.original.adCampaign}</div>,
    },
    {
      accessorKey: "facebookAd",
      header: ({ column }) => <SortableHeader column={column} title="FaceBook Ad" />,
      cell: ({ row }) => <div>{row.original.facebookAd}</div>,
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => <SortableHeader column={column} title="First Name" />,
      cell: ({ row }) => <div>{row.original.firstName}</div>,
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => <SortableHeader column={column} title="Last Name All" />,
      cell: ({ row }) => <div>{row.original.lastName}</div>,
    },
    {
      accessorKey: "keywordData",
      header: ({ column }) => <SortableHeader column={column} title="Keyword" />,
      cell: ({ row }) => <div>{row.original.keywordData}</div>,
    },
    {
      accessorKey: "submitPageURL",
      header: ({ column }) => <SortableHeader column={column} title="Submit Page URL" />,
      cell: ({ row }) => <div>{row.original.submitPageURL}</div>,
    },
    {
      accessorKey: "lpUrlData",
      header: ({ column }) => <SortableHeader column={column} title="LP URL Data" />,
      cell: ({ row }) => <div>{row.original.lpUrlData}</div>,
    },
    {
      accessorKey: "gclidData",
      header: ({ column }) => <SortableHeader column={column} title="GCLID Data" />,
      cell: ({ row }) => <div>{row.original.gclidData}</div>,
    },
    {
      accessorKey: "adNetwork",
      header: ({ column }) => <SortableHeader column={column} title="Ad Network" />,
      cell: ({ row }) => <div>{row.original.adNetwork}</div>,
    },
  ];


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
  const columns = AdvisorColumns(navigate);
  const table = useReactTable({
    data: filteredData,
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
  useEffect(() => {
    console.log("Data", dataSample);
  }, []);


  if (loading) return <TableSkeleton />;

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6" >
      <Tabs
        defaultValue="all-leads"
        className="w-full flex-col justify-start gap-6"
      >
        {/* HEADER */}
        <div className="flex items-center justify-end mx-1 lg:mx-2">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select defaultValue="all-leads">
            <SelectTrigger
              className="flex w-fit lg:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-leads">All Leads</SelectItem>
              <SelectItem value="new_locked">New</SelectItem>
              <SelectItem value="converted-leads">Converted Leads</SelectItem>
              <SelectItem value="not-qualified-leads">
                Not Qualified Leads
              </SelectItem>
            </SelectContent>
          </Select>
          {/* <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
            <TabsTrigger value="all-leads">All Leads</TabsTrigger>
            <TabsTrigger value="new_locked">New</TabsTrigger>
            <TabsTrigger value="converted-leads">Converted Leads</TabsTrigger>
            <TabsTrigger value="not-qualified-leads">
              Not Qualified Leads
            </TabsTrigger>
          </TabsList> */}
          <div className="flex items-right gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchDrawerOpen(true)}
            >
              <IconSearch />
              <span className="hidden lg:inline">Search</span>
            </Button>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
            >
              {viewMode === "table" ? <IconLayoutGrid /> : <IconLayoutList />}
              <span className="hidden lg:inline">{viewMode === "table" ? "Card View" : "Table View"}</span>
            </Button> */}
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
                <DropdownMenuItem onClick={() => setIsMassEmailModalOpen(true)}>
                  <IconMail className="mr-2 h-4 w-4" />
                  Mass Email
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setIsConvertDealModalOpen(true)}>
                  <IconTrendingUp className="mr-2 h-4 w-4" />
                  Convert to Deal
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={() => setIsColumnManageDrawerOpen(true)}>
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
              onClick={() => navigate("/crm/advisor/advisor-leads-form")}
              className="cursor-pointer"
              variant="outline"
              size="sm"
            >
              <IconPlus />
              <span className="hidden lg:inline ">Create Advisor Lead</span>
            </Button>
          </div>
        </div>
        {/* TAB Contants */}
        <TabsContent
          value="all-leads"
          className="relative flex flex-col gap-4 overflow-auto mx-1 lg:mx-2"
        >
          {viewMode === "table" ? (
            <div className="flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
              <div className="flex-1 overflow-y-auto relative ">
                <div className="relative border">
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
                                    position: 'relative',
                                  }}
                                  className={header.column.id === "drag" ? "border-r border-dotted border-gray-600" : ""}
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
                                      className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none ${header.column.getIsResizing() ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                                        }`}
                                    />
                                  )}
                                </TableHead>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody className="**:data-[slot=table-cell]:first:w-8">
                        {table.getRowModel().rows?.length ? (
                          <SortableContext
                            items={dataIds}
                            strategy={verticalListSortingStrategy}
                          >
                            {table.getRowModel().rows.map((row) => (
                              <DraggableRow key={row.id} row={row} />
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
              <div className="fixed bottom-0 left-65 right-0 flex items-center justify-between px-4 border-t bg-background z-20">
                <div className="text-muted-foreground hidden flex-1 text-base lg:flex">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                  <div className="hidden items-center gap-2 lg:flex">
                    <Label htmlFor="rows-per-page" className="text-base font-medium">
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
            </div>
          ) : (
            <LeadCardView
              data={data}
              visibleColumns={visibleColumns}
              onLeadClick={(lead) => navigate(`/crm/leads/details/${lead.ROWID}`, { state: lead })}
              onDelete={(id) => {
                setOpenAlert(true);
                setIdToDelete(id);
              }}
            />
          )}
        </TabsContent>
        <TabsContent
          value="past-performance"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            Tab 1
          </div>
        </TabsContent>
        <TabsContent value="key-personnel" className="flex flex-col px-1 lg:px-1">
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            {" "}
            Tab 2
          </div>
        </TabsContent>
        <TabsContent
          value="focus-documents"
          className="flex flex-col px-1 lg:px-1"
        >
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed">
            {" "}
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
        <LeadDrawer
          isOpen={isSearchDrawerOpen}
          onClose={() => setIsSearchDrawerOpen(false)}
          onSearchResults={(searchFields) => {
            setSearchFields(searchFields);
            setIsSearchDrawerOpen(false);
          }}
        />
      )}

      {isMassUpdateModalOpen && (
        <MassUpdateModal
          isOpen={isMassUpdateModalOpen}
          onClose={() => setIsMassUpdateModalOpen(false)}
          selectedLeads={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
          fields={allColumns}
        />
      )}

      {isMassEmailModalOpen && (
        <MassUpdateEmailModal
          isOpen={isMassEmailModalOpen}
          onClose={() => setIsMassEmailModalOpen(false)}
          selectedEmailLeads={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
          onSend={(emailData) => {
            // Simple handler: show success toast
            toast.success("Mass email sent successfully!");
          }}
        />
      )}

      {isColumnManageDrawerOpen && (
        <LeadColumnManageDrawer
          isOpen={isColumnManageDrawerOpen}
          onClose={() => setIsColumnManageDrawerOpen(false)}
          visibleColumns={visibleColumns}
          allColumns={allColumns}
          onColumnsChange={(newVisibleColumns) => {
            setVisibleColumns(newVisibleColumns);
            // Update columnVisibility state for TanStack Table using column IDs
            const visibilityMap = {};
            allColumns.forEach(col => {
              const columnId = columnMapping[col];
              if (columnId) {
                visibilityMap[columnId] = newVisibleColumns.includes(col);
              }
            });
            setColumnVisibility(visibilityMap);
          }}
        />
      )}

      {isConvertDealModalOpen && (
        <LeadConvertDeal
          isOpen={isConvertDealModalOpen}
          onClose={() => setIsConvertDealModalOpen(false)}
          selectedLeads={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
        />
      )}

    </div>


  );
};

export default AdvisorsListNew;

