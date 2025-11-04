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
import { Badge } from "@/components/ui/badge";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconPlus,
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import noresult from "@assets/no-data.png";
import { useState, useMemo, useId } from "react";
import dataSample from "../Sample/data.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";
import { Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Drag Handle
function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({ id });
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

// --- Draggable Row
function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
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

const MaterialRequisitionList = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // Generate unique IDs for each row
  const dataIds = useMemo(() => {
    return data.map((row, index) => {
      // Use ROWID if available, otherwise create a unique ID
      return row.ROWID
        ? `row-${row.ROWID}`
        : `row-${index}-${Math.random().toString(36).substr(2, 9)}`;
    });
  }, [data]);

  // --- Columns
  const materialRequisitionColumns = (navigate) => [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() =>
                navigate("/material-requisition/update", {
                  state: row.original,
                })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/material-requisition/detail`)}
            >
              Detail View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOpenAlert(true);
                setIdToDelete(row.original.ROWID);
              }}
              className="text-destructive focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
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
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
    },
    { accessorKey: "deptName", header: "Department Name" },
    { accessorKey: "projectNo", header: "Project Number" },
    {
      accessorKey: "projectTitle",
      header: "Project Title",
      cell: ({ row }) => (
        <Button
          variant="link"
          className="px-0 text-left text-blue-500 underline-none hover:underline-none hover:bg-transparent cursor-pointer"
          onClick={() =>
            navigate("/material-requisition/detail", {
              state: row.original,
            })
          }
        >
          {row.original.projectTitle || "NA"}
        </Button>
      ),
    },
    { accessorKey: "clientName", header: "Client Name" },
    { accessorKey: "requestedBy", header: "Requested By" },
    { accessorKey: "requisitionRefNo", header: "Requisition Ref. No" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const [status, setStatus] = React.useState(row.original.status);

        const statusStyles = {
          All: "font-semibold text-gray-700 bg-gray-50 border border-gray-300",
         Draft:
            "font-semibold text-gray-800 bg-gray-50 border border-gray-300",
          Approved:
            "font-semibold text-green-800 bg-green-50 border border-green-300",
          Rejected:
            "font-semibold text-red-800 bg-red-50 border border-red-300",
          Open: "font-semibold text-purple-800 bg-purple-50 border border-purple-300",
          Pending:
            "font-semibold text-yellow-800 bg-yellow-50 border border-orange-300",
          // MR Closed:
          //   "font-semibold text-indigo-800 bg-indigo-50 border border-indigo-300",
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                variant="outline"
                className={`text-sm text-center  p-1 truncate w-19 border   cursor-pointer rounded-md flex items-center justify-between  ${
                  status
                    ? statusStyles[status]
                    : "text-gray-500 bg-white text-center border-gray-300"
                }`}
              >
                <span className="text-center mx-auto">{status || "Select Status"}</span>
                {/* <IconChevronDown className=" h-4" /> */}
              </Badge>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-32">
              {tabs.map((s) => (
                <DropdownMenuItem
                  key={s.value}
                  onClick={() => {
                    setStatus(s.label); // store the value in state
                    row.original.status = s.value; // also update row data
                  }}
                  className="text-sm cursor-pointer hover:bg-gray-100"
                >
                  {s.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    { accessorKey: "requisitionDate", header: "Requisition Date" },
  ];

  const columns = materialRequisitionColumns(navigate);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    // Fixed getRowId function - ensure unique IDs
    getRowId: (row, index) => {
      // Use ROWID if available, otherwise create a unique ID based on index
      return row.ROWID
        ? `row-${row.ROWID}`
        : `row-${index}-${Math.random().toString(36).substr(2, 9)}`;
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // --- Drag reorder
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

  // --- Delete function
  // function handleDelete() {
  //   if (idToDelete !== "") {
  //     setDeleteLoading(true);

  //     // Simulate API call
  //     setTimeout(() => {
  //       // Filter out the specific item to delete using the correct ID
  //       setData(prevData => prevData.filter(item => {
  //         // Use strict comparison and ensure we're comparing the same data types
  //         return item.ROWID !== idToDelete;
  //       }));

  //       // Clear row selection after deletion
  //       setRowSelection({});

  //       toast.success("Material Requisition Deleted Successfully");
  //       setDeleteLoading(false);
  //       setOpenAlert(false);
  //       setIdToDelete(""); // Reset the ID to delete
  //     }, 1000);
  //   }
  // }
  const status = ["Approved", "Pending", "Rejected"];
  const tabs = [
    { value: "all", label: "All" },
    { value: "draft", label: "Draft" },
    { value: "submitted", label: "Submitted" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    // { value: "open", label: "Open" },
    { value: "pending", label: "Pending" },
    { value: "partially_po", label: "Partially PO" },
    { value: "mr_closed", label: "MR Closed" },
  ];

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start "
          >
            <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
              {tabs.map((tab) => (
                <TabsTrigger className={"cursor-pointer"} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header || column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/material-requisition/form")}
          >
            <IconPlus />
            <span className="hidden lg:inline">Create Requisition</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
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
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <img
                      src={noresult}
                      alt="No Data"
                      className="w-12 mx-auto mb-4"
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

      {/* Pagination */}
      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel()?.rows?.length} of{" "}
          {table.getFilteredRowModel().rows?.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
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

      <TableDataDeleteAlert
        loading={deleteLoading}
        // handleDelete={handleDelete}
        open={openAlert}
        setOpen={setOpenAlert}
      />
    </div>
  );
};

export default MaterialRequisitionList;
