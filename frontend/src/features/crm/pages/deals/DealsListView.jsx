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
  IconRefresh,
  IconUpload,
  IconTrash,

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
  leadStatus,
  leadSource,
  leadOwner,
} from "@features/utils/ListViewMenu.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeals,
  deleteDealFromList,
  updateDealInList,
} from "@/redux/slices/deals/dealsSlice";
import { deleteDeal, updateDeal } from "@/services/crm/dealApi";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";

// New imports for enhanced functionality
import DealDrawer from "./DealDrawer";
import MassUpdateModal from "./DealMassUpdateModal";
import MassUpdateEmailModal from "./DealMassUpdateEmailModal";
import DealColumnManageDrawer from "./DealColumnManageDrawer";
import { EllipsisVertical } from "lucide-react";
// import LeadConvertDeal from "./LeadConvertDeal";

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

function DraggableRow({ row, navigate }) {

  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.ROWID,
  });
  console.log(row.original.dateValue);

  const handleRowClick = () => {
    if (!isDragging) {
      navigate(`/crm/deals/details/${row.original.ROWID}`, { state: row.original });
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
      onClick={handleRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell  className={"py-1 px-4"} key={cell.id}>
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

const DealsListView = () => {
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
    "drag", "select", "actions", "CREATEDTIME", "dealName", "stage", "layoutName",
    "locationName", "contactName", "dealOwner", "insuranceDeal", "insuranceLookup"
  ]);
  const [columnSizing, setColumnSizing] = useState(() => {
    // Load column sizing from localStorage
    const saved = localStorage.getItem('deals-table-column-sizing');
    const defaultSizes = {
      drag: 40,
      select: 50,
      actions: 80,
      CREATEDTIME: 150,
      dealName: 150,
      stage: 100,
      layoutName: 100,
      locationName: 150,
      contactName: 150,
      dealOwner: 150,
      insuranceDeal: 150,
      insuranceLookup: 150,
    };
    return saved ? { ...defaultSizes, ...JSON.parse(saved) } : defaultSizes;
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // New state variables for enhanced functionality
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isMassEmailModalOpen, setIsMassEmailModalOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] = useState(false);
  const [isConvertDealModalOpen, setIsConvertDealModalOpen] = useState(false);
  const [selectedLeadForConversion, setSelectedLeadForConversion] = useState(null);

  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Load visible columns from localStorage
    const saved = localStorage.getItem('deals-visible-columns');
    return saved ? JSON.parse(saved) : [
      "Action", "Created Time", "Deal Name", "Stage", "Layout", "Location Name", "Contact Name", "Deal Owner", "Insurance Deal", "Insurance Lookup"
    ];
  });
  const [allColumns, setAllColumns] = useState([
    "Action", "Created Time", "Deal Name", "Stage", "Layout", "Location Name", "Contact Name", "Deal Owner", "Insurance Deal", "Insurance Lookup"
  ]);

  // Mapping from display names to column IDs for TanStack Table
  const columnMapping = {
    "Action": "actions",
    "Created Time": "CREATEDTIME",
    "Deal Name": "dealName",
    "Stage": "stage",
    "Layout": "layoutName",
    "Location Name": "locationName",
    "Contact Name": "contactName",
    "Deal Owner": "dealOwner",
    "Insurance Deal": "insuranceDeal",
    "Insurance Lookup": "insuranceLookup"
  };

  const dispatch = useDispatch();
  const { data: dealsData, loading, error, fetched } = useSelector((state) => state.deals.all);
  console.log("Deals data:", dealsData);
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchDeals());
    }
  }, [fetched, dispatch]);

  useEffect(() => {
    if (dealsData && dealsData.length > 0) {
      setData(dealsData);
    }
  }, [dealsData]);

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
    localStorage.setItem('deals-table-column-sizing', JSON.stringify(columnSizing));
  }, [columnSizing]);

  // Save visible columns to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('deals-visible-columns', JSON.stringify(visibleColumns));
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
    if (idToDelete !== "") {
      setDeleteLoading(true);
      deleteDeal(idToDelete)
        .then((res) => {
          const count = res?.deals?.[0]?.deals?.DELETED_ROWS_COUNT;

          if (res.success && count > 0) {
            dispatch(deleteDealFromList(idToDelete));
            toast.success("Deal deleted successfully");
          } else {
            toast.error("Deal not deleted");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err?.response?.data?.message || "Failed to delete deal");
        })
        .finally(() => {
          setDeleteLoading(false);
          setOpenAlert(false);
        });
    }
  }

  const DealColumns = (navigate) => [
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
        <div className="flex items-center justify-center"  onClick={(e) => e.stopPropagation()}>
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
        <div className="flex items-center justify-center"  onClick={(e) => e.stopPropagation()}>
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
            onClick={() => navigate(`/crm/deals/details/${row.original.ROWID}`, { state: row.original })}
            variant="link"
            className="text-foreground cursor-pointer w-fit px-0 text-left"
          >
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => navigate(`/crm/deals/details/${row.original.ROWID}`, { state: row.original })}>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      size: 80,
      minSize: 80,
    },
    {
      accessorKey: "CREATEDTIME",
      header: ({ column }) => <SortableHeader column={column} title="Created Time" />,
      cell: ({ row }) => (
        <div>{row.original.CREATEDTIME ? new Date(row.original.CREATEDTIME).toLocaleString() : "N/A"}</div>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "dealName",
      header: ({ column }) => <SortableHeader column={column} title="Deal Name" />,
      cell: ({ row }) => (
        <Button
          onClick={() => navigate(`/crm/deals/details/${row.original.ROWID}`, { state: row.original })}
          variant="link"
          className="text-foreground cursor-pointer w-fit px-0 text-left"
        >
          {row.original.dealName || "N/A"}
        </Button>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "stage",
      header: ({ column }) => <SortableHeader column={column} title="Stage" />,
      cell: ({ row }) => (
        <Badge className="rounded-2xl p-[3px] px-2" style={{
          backgroundColor: row.original.stageColor || '#fdd835',
          color: (row.original.stageColor === '#fdd835') ? 'black' : 'white'
        }}>
          {row.original.stage || "N/A"}
        </Badge>
      ),
      size: 100,
      minSize: 100,
    },
    {
      accessorKey: "layoutName",
      header: ({ column }) => <SortableHeader column={column} title="Layout" />,
      cell: ({ row }) => (
        <Badge className={`rounded-2xl p-[3px] px-2 ${row.original.layoutName?.toLowerCase() === 'client' ? 'client-layout' : 'advisor-layout'}`}>
          {row.original.layoutName}
        </Badge>
      ),
      size: 100,
      minSize: 100,
    },
    {
      accessorKey: "locationName",
      header: ({ column }) => <SortableHeader column={column} title="Location Name" />,
      cell: ({ row }) => <div>{row.original.locationName || "N/A"}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "contactName",
      header: ({ column }) => <SortableHeader column={column} title="Contact Name" />,
      cell: ({ row }) => <div>{row.original.contactName || "N/A"}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "dealOwner",
      header: ({ column }) => <SortableHeader column={column} title="Deal Owner" />,
      cell: ({ row }) => <div>{row.original.dealOwner || "N/A"}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "insuranceDeal",
      header: ({ column }) => <SortableHeader column={column} title="Insurance Deal" />,
      cell: ({ row }) => <div>{row.original.insuranceDeal || "N/A"}</div>,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "insuranceLookup",
      header: ({ column }) => <SortableHeader column={column} title="Insurance Lookup" />,
      cell: ({ row }) => <div>{row.original.insuranceLookup || "N/A"}</div>,
      size: 150,
      minSize: 150,
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
  const columns = DealColumns(navigate);
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
                <DropdownMenuItem>
                  <IconUpload className="mr-2 h-4 w-4" />
                  Import
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconDownload className="mr-2 h-4 w-4" />
                  Export Deal
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconDownload className="mr-2 h-4 w-4" />
                  Export Insurance
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconDownload className="mr-2 h-4 w-4" />
                  Export RRSP
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconDownload className="mr-2 h-4 w-4" />
                  Export Visa
                </DropdownMenuItem>
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
                <DropdownMenuItem
                  onClick={() => {
                    if (table.getFilteredSelectedRowModel().rows.length === 0) {
                      toast.error("Please select at least one record");
                      return;
                    }
                    setOpenAlert(true);
                  }}
                  className="text-red-500"
                >
                  <IconTrash className="mr-2 h-4 w-4" />
                  Delete All
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
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/crm/deals/create")}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  Deal Form
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/life-insurance")}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  Life/Critical Insurance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/Rrsp-form")}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  RRSP/RESP/TFSA
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/Supervisa-form")}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  SuperVisa / Visitor Insurance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* TAB Contants */}
        <TabsContent
          value="all-leads"
          className="relative flex flex-col gap-4 overflow-auto mx-1 lg:mx-2"
        >
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
        <DealDrawer
          isOpen={isSearchDrawerOpen}
          onClose={() => setIsSearchDrawerOpen(false)}
          onSearchResults={(filters) => {
            console.log('Search filters:', filters);
            // Implement search logic here
            // For now, just close the drawer
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
        <DealColumnManageDrawer
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

      {/* {isConvertDealModalOpen && (
        <LeadConvertDeal
          isOpen={isConvertDealModalOpen}
          onClose={() => setIsConvertDealModalOpen(false)}
          selectedLeads={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
        />
      )} */}

    </div>


  );
};

export default DealsListView;

