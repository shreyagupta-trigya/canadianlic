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
  IconLoader,
  IconPlus,
  IconTrendingUp,
  IconSearch,
  IconMail,
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
import {
  leadStatus,
  leadSource,
  leadOwner,
} from "@features/utils/ListViewMenu.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeads,
  deleteLeadFromList,
  updateLeadInList,
} from "@/redux/slices/leads/leadsSlice";
import { deleteLead, updateLead, sendMassEmail } from "@/services/crm/leadApi";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";

// New imports for enhanced functionality
import LeadDrawer from "./LeadDrawer";
import MassUpdateModal from "./MassUpdateModal";
import MassUpdateEmailModal from "./MassUpdateEmailModal";
import LeadColumnManageDrawer from "./LeadColumnManageDrawer";
import LeadConvertDeal from "./LeadConvertDeal";
import { EllipsisVertical } from "lucide-react";
import { getInsuranceLeadStatusColor } from "./utils/picklist";

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
  console.log(row.original.dateValue);

  const handleRowClick = () => {
    if (!isDragging) {
      navigate(`/crm/leads/details/${row.original.ROWID}`, {
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
      onClick={handleRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell className="compact-table py-0.5 px-2 text-sm" key={cell.id}>
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



const LeadsListView = () => {
  const [data, setData] = useState([]);
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
    "CREATEDTIME",
    "layoutName",
    "insuranceLeadNameAll",
    "insuranceLeadStatus",
    "leadStatusStage",
    "mobile",
    "insuranceLeadSource",
    "advisorfullName",
    "email",
    "servicesRequested",
    "gclid",
    "firstPageVisited",
    "MODIFIEDTIME",
    "totalInteractionTime",
    "phoneNumber",
    "UserfullName",
    "adCampaign",
    "facebookAd",
    "firstName",
    "lastName",
    "keywordData",
    "submitPageURL",
    "lpUrlData",
    "gclidData",
    "adNetwork",
  ]);
  const [columnSizing, setColumnSizing] = useState(() => {
    // Load column sizing from localStorage
    const saved = localStorage.getItem("leads-table-column-sizing");
    const defaultSizes = {
      drag: 40,
      select: 50,
      actions: 80,
      CREATEDTIME: 50,
      layoutName: 50,
      insuranceLeadNameAll: 50,
      insuranceLeadStatus: 50,
      leadStatusStage: 50,
      mobile: 50,
      insuranceLeadSource: 50,
      advisorfullName: 50,
      email: 50,
      servicesRequested: 50,
      gclid: 50,
      firstPageVisited: 50,
      MODIFIEDTIME: 50,
      totalInteractionTime: 50,
      phoneNumber: 50,
      UserfullName: 50,
      adCampaign: 50,
      facebookAd: 50,
      firstName: 50,
      lastName: 50,
      keywordData: 50,
      submitPageURL: 50,
      lpUrlData: 50,
      gclidData: 120,
      adNetwork: 120,
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
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] =
    useState(false);
  const [isConvertDealModalOpen, setIsConvertDealModalOpen] = useState(false);
  const [selectedLeadForConversion, setSelectedLeadForConversion] =
    useState(null);
  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Load visible columns from localStorage
    const saved = localStorage.getItem("leads-visible-columns");
    return saved
      ? JSON.parse(saved)
      : [
        "Action",
        "Created Time *",
        "Layout",
        "Insurance Lead Name All",
        "Insurance Lead Status",
        "Lead Status Stage",
        "Mobile",
        "Insurance Lead Source",
        "Assigned Advisor",
        "Email",
        "Services Requested",
        "GCLID",
        "First Page Visited",
        "Last Activity Time",
        "Total Interaction Time (mins)",
        "Phone",
        "Created By",
        "Ad Campaign Name",
        "FaceBook Ad",
        "First Name",
        "Last Name All",
        "Keyword",
        "Submit Page URL",
        "LP URL Data",
        "GCLID Data",
        "Ad Network",
      ];
  });
  const [allColumns, setAllColumns] = useState([
    "Action",
    "Created Time *",
    "Layout",
    "Insurance Lead Name All",
    "Insurance Lead Status",
    "Lead Status Stage",
    "Mobile",
    "Insurance Lead Source",
    "Assigned Advisor",
    "Email",
    "Services Requested",
    "GCLID",
    "First Page Visited",
    "Last Activity Time",
    "Total Interaction Time (mins)",
    "Phone",
    "Created By",
    "Ad Campaign Name",
    "FaceBook Ad",
    "First Name",
    "Last Name All",
    "Keyword",
    "Submit Page URL",
    "LP URL Data",
    "GCLID Data",
    "Ad Network",
  ]);

  // Mapping from display names to column IDs for TanStack Table
  const columnMapping = {
    Action: "actions",
    "Created Time *": "CREATEDTIME",
    Layout: "layoutName",
    "Insurance Lead Name All": "insuranceLeadNameAll",
    "Insurance Lead Status": "insuranceLeadStatus",
    "Lead Status Stage": "leadStatusStage",
    Mobile: "mobile",
    "Insurance Lead Source": "insuranceLeadSource",
    "Assigned Advisor": "advisorfullName",
    Email: "email",
    "Services Requested": "servicesRequested",
    GCLID: "gclid",
    "First Page Visited": "firstPageVisited",
    "Last Activity Time": "MODIFIEDTIME",
    "Total Interaction Time (mins)": "totalInteractionTime",
    Phone: "phoneNumber",
    "Created By": "UserfullName",
    "Ad Campaign Name": "adCampaign",
    "FaceBook Ad": "facebookAd",
    "First Name": "firstName",
    "Last Name All": "lastName",
    Keyword: "keywordData",
    "Submit Page URL": "submitPageURL",
    "LP URL Data": "lpUrlData",
    "GCLID Data": "gclidData",
    "Ad Network": "adNetwork",
  };

  const dispatch = useDispatch();
  const {
    data: Leadsdata,
    loading,
    error,
    fetched,
  } = useSelector((state) => state.leads.all);
  console.log("Leadsdata:", Leadsdata);
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchLeads());
    }
  }, [fetched, dispatch]);

  useEffect(() => {
    if (Leadsdata && Leadsdata.length > 0) {
      setData(Leadsdata);
    }
  }, [Leadsdata]);

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
      "leads-table-column-sizing",
      JSON.stringify(columnSizing)
    );
  }, [columnSizing]);

  // Save visible columns to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "leads-visible-columns",
      JSON.stringify(visibleColumns)
    );
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
      deleteLead(idToDelete)
        .then((res) => {
          const count = res?.leads?.[0]?.leads?.DELETED_ROWS_COUNT;

          if (res.success && count > 0) {
            dispatch(deleteLeadFromList(idToDelete));
            toast.success("Lead deleted successfully");
          } else {
            toast.error("Lead not deleted");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err?.response?.data?.message || "Failed to delete lead");
        })
        .finally(() => {
          setDeleteLoading(false);
          setOpenAlert(false);
        });
    }
  }

  const LeadColumns = (navigate) => [
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
        <div className="d-flex justify-content-center align-items-center gap-2 ">
          <Button
            onClick={() =>
              navigate(`/crm/leads/details/${row.original.ROWID}`, {
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
                  navigate(`/crm/leads/details/${row.original.ROWID}`, {
                    state: row.original,
                  });
                }}
              >
                Detail view
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  navigate(`/crm/leads/create`);
                }}
              >
                Edit
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
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "CREATEDTIME",
      header: ({ column }) => (
        <SortableHeader column={column} title="Created Time *" />
      ),
      cell: ({ row }) => (
        <div className="truncate">
          {row.original.CREATEDTIME
            ? new Date(row.original.CREATEDTIME).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            : "N/A"}
        </div>
      ),
      size: 50,
      minSize: 50,
    },
   {
  accessorKey: "layoutName",
  header: ({ column }) => <SortableHeader column={column} title="Layout" />,
  cell: ({ row }) => {
    const layout = row.original.layoutName?.toLowerCase();
    const bgColor =
      layout === "client"
        ? "rgba(160, 32, 240, 0.7)"
        : layout === "advisor"
        ? "#e5202099"
        : ""; // default color if neither

    return (
      <div
        className="rounded-2xl text-[14px] px-2 py-1 mx-auto text-center overflow-hidden max-w-[120px]"
        style={{
          backgroundColor: bgColor,
          color: "white",
          fontWeight: 500,
        }}
        title={row.original.layoutName} // full text on hover
      >
        <span className="truncate block w-full">
          {row.original.layoutName}
        </span>
      </div>
    );
  },
  size: 120, // initial column width
  minSize: 50, // min width
}
,
{
  accessorKey: "insuranceLeadNameAll",
  header: ({ column }) => (
    <SortableHeader column={column} title="Insurance Lead Name All" />
  ),
  cell: ({ row }) => (
    <Button
      onClick={() =>
        navigate(`/crm/leads/details/${row.original.ROWID}`, {
          state: row.original,
        })
      }
      variant="link"
    className="w-full text-left truncate overflow-hidden"
    >
      {`${row.original.firstName ?? ""} ${row.original.lastName ?? ""}`.trim()}
    </Button>
  ),
  size: 50,
  minSize: 50,
}

,
  {
  accessorKey: "insuranceLeadStatus",
  header: ({ column }) => (
    <SortableHeader column={column} title="Insurance Lead Status" />
  ),
  cell: ({ row }) => {
    const status = row.original.insuranceLeadStatus || "N/A";
    const statusColor = getInsuranceLeadStatusColor(status);

    return (
      <div
        className="rounded-2xl text-[14px] px-2 py-1 mx-auto text-center overflow-hidden max-w-[150px]"
        style={{
          fontWeight: 500,
          backgroundColor: statusColor,
          color:
            statusColor === "#98d681" ||
            statusColor === "#f6c1ff" ||
            statusColor === "#8bc34a" ||
            statusColor === "#81c784"
              ? "black"
              : "white",
        }}
        title={status} // show full status on hover
      >
        <span className="truncate block w-full">{status}</span>
      </div>
    );
  },
  size: 120, // adjust initial column width
  minSize: 50,
},
    {
      accessorKey: "leadStatusStage",
      header: ({ column }) => (
        <SortableHeader column={column} title="Lead Status Stage" />
      ),
      cell: ({ row }) => {
        return (
          <div
            className="rounded-2xl text-[14px] px-2 py-1 mx-auto text-center overflow-hidden  max-w-[150px]"
            style={{
              fontWeight: "500",
              backgroundColor: row.original.leadStatusStageColor || "#fdd835",
              color:
                row.original.leadStatusStageColor === "#f6c1ff"
                  ? "black"
                  : "white",
            }}
          >
            <span className="truncate block w-full">
              {row.original.leadStatusStage || "N/A"}
            </span>
          </div>
        );
      },
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "mobile",
      header: ({ column }) => <SortableHeader column={column} title="Mobile" />,
      cell: ({ row }) => <div className="truncate">{row.original.mobile}</div>,
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "insuranceLeadSource",
      header: ({ column }) => (
        <SortableHeader column={column} title="Insurance Lead Source" />
      ),
      cell: ({ row }) => (
        <div className="truncate">
          {row.original.insuranceLeadSource}
        </div>
      ),
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "advisorfullName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Assigned Advisor" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.advisorfullName}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      cell: ({ row }) => (
        <Button
          onClick={() =>
            navigate(`/crm/leads/details/${row.original.ROWID}`, {
              state: row.original,
            })
          }
          variant="link"
          className="w-full" // <-- w-full instead of w-fit
        >
          <div
            className="truncate w-full"
            title={row.original.email} // full text on hover
          >
            {row.original.email}
          </div>
        </Button>
      ),
      size: 200, // adjust column size as needed
      minSize: 50,
    }
    ,

    {
      accessorKey: "firstPageVisited",
      header: ({ column }) => (
        <SortableHeader column={column} title="First Page Visited" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.firstPageVisited}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "MODIFIEDTIME",
      header: ({ column }) => (
        <SortableHeader column={column} title="Last Activity Time" />
      ),
      cell: ({ row }) => <div className="truncate">
        {row.original.MODIFIEDTIME
          ? new Date(row.original.MODIFIEDTIME).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          : "N/A"}
      </div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "totalInteractionTime",
      header: ({ column }) => (
        <SortableHeader column={column} title="Total Interaction Time (mins)" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.totalInteractionTime}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "phoneNumber",
      header: ({ column }) => <SortableHeader column={column} title="Phone" />,
      cell: ({ row }) => <div className="truncate">{row.original.phoneNumber}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "UserfullName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Created By" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.UserfullName}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "adCampaign",
      header: ({ column }) => (
        <SortableHeader column={column} title="Ad Campaign Name" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.adCampaign}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "facebookAd",
      header: ({ column }) => (
        <SortableHeader column={column} title="FaceBook Ad" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.facebookAd}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <SortableHeader column={column} title="First Name" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.firstName}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Last Name All" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.lastName}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "keywordData",
      header: ({ column }) => (
        <SortableHeader column={column} title="Keyword" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.keywordData}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "submitPageURL",
      header: ({ column }) => (
        <SortableHeader column={column} title="Submit Page URL" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.submitPageURL}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "lpUrlData",
      header: ({ column }) => (
        <SortableHeader column={column} title="LP URL Data" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.lpUrlData}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "gclidData",
      header: ({ column }) => (
        <SortableHeader column={column} title="GCLID Data" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.gclidData}</div>,
      size: 50,
      minSize: 50,
    },

    {
      accessorKey: "adNetwork",
      header: ({ column }) => (
        <SortableHeader column={column} title="Ad Network" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.adNetwork}</div>,
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "servicesRequested",
      header: ({ column }) => (
        <SortableHeader column={column} title="Services Requested" />
      ),
      cell: ({ row }) => <div className="truncate">{row.original.servicesRequested}</div>,
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "gclid",
      header: ({ column }) => <SortableHeader column={column} title="GCLID" />,
      cell: ({ row }) => <div className="truncate">{row.original.gclid}</div>,
      size: 50,
      minSize: 50,
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
  const columns = LeadColumns(navigate);
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
    onColumnSizingChange: (updater) => {
      setColumnSizing((prev) => {
        const newSizing = typeof updater === 'function' ? updater(prev) : updater;
        const clamped = { ...newSizing };
        columns.forEach((col) => {
          const colId = col.id || col.accessorKey;
          if (colId && col.minSize) {
            clamped[colId] = Math.max(clamped[colId] || prev[colId] || col.size, col.minSize);
          }
        });
        return clamped;
      });
    },
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

  if (loading) return <TableSkeleton />;

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
      <Tabs
        defaultValue="all-leads"
        className="w-full flex-col justify-start gap-2"
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
                {/* <DropdownMenuItem onClick={() => setIsConvertDealModalOpen(true)}>
                  <IconTrendingUp className="mr-2 h-4 w-4" />
                  Convert to Deal
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
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
              onClick={() => navigate("/crm/leads/create")}
              className="cursor-pointer"
              variant="outline"
              size="sm"
            >
              <IconPlus />
              <span className="hidden lg:inline ">Create Lead</span>
            </Button>
          </div>
        </div>
        {/* TAB Contants */}
        <TabsContent
          value="all-leads"
          className="relative flex flex-col gap-4 overflow-auto mx-1 lg:mx-2"
        >
          <div className="flex flex-col">
            <div className="flex-1 relative pb-20">
              <div
                className="relative  grid w-full border rounded"
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
                                  transition: "width 0.1s ease-in-out",
                                }}
                                className={`truncate ${header.column.id === "drag"
                                  ? "border-r border-dotted border-gray-600"
                                  : ""
                                  }`}
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
                                    className={`absolute right-0 top-0 h-full w-0.5 cursor-col-resize select-none touch-none transition-colors duration-150 ${header.column.getIsResizing()
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
          title="Search Leads"
        >
          {/* Search form content */}
          <div className="p-4">
            <p>Search functionality to be implemented</p>
          </div>
        </LeadDrawer>
      )}

      {isMassUpdateModalOpen && (
        <MassUpdateModal
          isOpen={isMassUpdateModalOpen}
          onClose={() => setIsMassUpdateModalOpen(false)}
          selectedLeads={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          fields={allColumns}
        />
      )}

      {isMassEmailModalOpen && (
        <MassUpdateEmailModal
          isOpen={isMassEmailModalOpen}
          onClose={() => setIsMassEmailModalOpen(false)}
          selectedEmailLeads={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
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

      {isConvertDealModalOpen && (
        <LeadConvertDeal
          isOpen={isConvertDealModalOpen}
          onClose={() => setIsConvertDealModalOpen(false)}
          selectedLeads={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
        />
      )}
    </div>
  );
};

export default LeadsListView;
