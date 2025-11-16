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
  IconDotsVertical,
  IconGripVertical,
  IconLoader,
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
import { Card, CardContent } from "@/components/ui/card";
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

import noresult from "@assets/no-data.png";
import { useState, useEffect, useMemo, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOfferings,
  deleteOfferingFromList,
} from "@/redux/slices/offerings/offeringsSlice";
import { deleteOffering } from "@/services/crm/offeringApi";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";
import { EllipsisVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import dummyOfferings from "./data.json";

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
      navigate(`/crm/offerings/details/${row.original.ROWID}`, {
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
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

const OfferingListView = () => {
  const isMobile = useIsMobile();
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
    "offeringName",
    "offeringActive",
    "offeringCategory",
    "offeringType",
    "insurancePartnerName",
  ]);
  const [columnSizing, setColumnSizing] = useState(() => {
    const defaultSizes = {
      drag: 40,
      select: 50,
      actions: 80,
      offeringName: 200,
      offeringActive: 150,
      offeringCategory: 200,
      offeringType: 200,
      insurancePartnerName: 250,
    };
    return defaultSizes;
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isMassEmailModalOpen, setIsMassEmailModalOpen] = useState(false);
  const [isColumnManageDrawerOpen, setIsColumnManageDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [visibleColumns, setVisibleColumns] = useState(() => {
    return [
      "Action",
      "Offering Name",
      "Offering Active",
      "Offering Category",
      "Offering Type",
      "Insurance Partner Name",
    ];
  });
  const [allColumns, setAllColumns] = useState([
    "Action",
    "Offering Name",
    "Offering Active",
    "Offering Category",
    "Offering Type",
    "Insurance Partner Name",
  ]);

  const columnMapping = {
    Action: "actions",
    "Offering Name": "offeringName",
    "Offering Active": "offeringActive",
    "Offering Category": "offeringCategory",
    "Offering Type": "offeringType",
    "Insurance Partner Name": "insurancePartnerName",
  };



  const dispatch = useDispatch();
  const {
    data: offeringsData,
    loading,
    error,
    fetched,
  } = useSelector((state) => state.offerings.all);

  useEffect(() => {
    // Use dummy data instead of fetching from API
    setData(dummyOfferings);
  }, []);

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

  function handleDelete() {
    if (idToDelete !== "") {
      setDeleteLoading(true);
      deleteOffering(idToDelete)
        .then((res) => {
          const count = res?.offerings?.[0]?.offerings?.DELETED_ROWS_COUNT;

          if (res.success && count > 0) {
            dispatch(deleteOfferingFromList(idToDelete));
            toast.success("Offering deleted successfully");
          } else {
            toast.error("Offering not deleted");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err?.response?.data?.message || "Failed to delete offering");
        })
        .finally(() => {
          setDeleteLoading(false);
          setOpenAlert(false);
        });
    }
  }

  const OfferingColumns = (navigate) => [
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
              navigate(`/crm/offerings/details/${row.original.ROWID}`, {
                state: row.original,
              })
            }
            variant="link"
            className="text-foreground cursor-pointer w-fit px-0 text-left "
          >
            <i className="fas fa-eye text-gray-400 " aria-hidden="true"></i>
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
                  e.stopPropagation();
                  navigate(`/crm/offerings/details/${row.original.ROWID}`, {
                    state: row.original,
                  });
                }}
              >
                Detail view
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/crm/offerings/create`);
                }}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
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
      accessorKey: "offeringName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Offering Name" />
      ),
      cell: ({ row }) => (
        <Button
          onClick={() =>
            navigate(`/crm/offerings/details/${row.original.ROWID}`, {
              state: row.original,
            })
          }
          variant="link"
          className="text-foreground cursor-pointer w-fit px-0 text-left"
        >
          {row.original.offeringName}
        </Button>
      ),
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "offeringActive",
      header: ({ column }) => (
        <SortableHeader column={column} title="Offering Active" />
      ),
      cell: ({ row }) => (
        <Badge
          className="badge-style"
          style={{
            backgroundColor: row.original.offeringActive ? "#4caf50" : "#f44336",
            color: "white",
          }}
        >
          <span className="p-[2px] text-center">{row.original.offeringActive ? "Active" : "Inactive"}</span>
        </Badge>
      ),
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: "offeringCategory",
      header: ({ column }) => (
        <SortableHeader column={column} title="Offering Category" />
      ),
      cell: ({ row }) => <div>{row.original.offeringCategory}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "offeringType",
      header: ({ column }) => (
        <SortableHeader column={column} title="Offering Type" />
      ),
      cell: ({ row }) => <div>{row.original.offeringType}</div>,
      size: 200,
      minSize: 200,
    },
    {
      accessorKey: "insurancePartnerName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Insurance Partner Name" />
      ),
      cell: ({ row }) => <div>{row.original.insurancePartnerName}</div>,
      size: 250,
      minSize: 250,
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
  const columns = OfferingColumns(navigate);
  const table = useReactTable({
    data: data,
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

  if (loading) return <TableSkeleton />;

  return (
    <div className="flex flex-col justify-start gap-2">
      {/* HEADER */}
      <div className="flex items-center justify-end mx-1 lg:mx-2">
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
              <DropdownMenuItem>
                <IconDownload className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => navigate("/crm/offerings/create")}
            className="cursor-pointer"
            variant="outline"
            size="sm"
          >
            <IconPlus />
            <span className="hidden lg:inline ">Create Offering</span>
          </Button>
        </div>
      </div>
      {/* TABLE Contents */}
      <div className="relative flex flex-col gap-4 overflow-auto ">
        {isMobile ? (
          <div className="text-center p-4">
            <p>Mobile view for offerings not implemented yet</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex-1 relative ">
              <div
                className="relative grid w-full border rounded"
                style={{
                  height: "calc(100vh - 140px)",
                  maxHeight: "calc(100vh - 160px)"
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
                                    className={`absolute right-0 top-0 h-full w-0.5 cursor-col-resize select-none touch-none ${header.column.getIsResizing()
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
        )}
      </div>

      <TableDataDeleteAlert
        loading={deleteLoading}
        handleDelete={handleDelete}
        open={openAlert}
        setOpen={setOpenAlert}
      />
    </div>
  );
};

export default OfferingListView;
