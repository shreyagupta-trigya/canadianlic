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
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
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
import { toast } from "sonner";

// import { useIsMobile } from "@/hooks/use-mobile";

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
import { useState, useMemo, useId } from "react";
import dataSample from "./sample/data.json";
import { useNavigate } from "react-router-dom";
import { FaSortAmountUp } from "react-icons/fa";

// import { leadSource, company } from "@features/utils/ListViewMenu.jsx";
// import purchaseDetailView from "./purchaseDetailView";
// Create a separate component for the drag handle
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

function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 px- data-[dragging=true]:opacity-80"
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

const PurchaseOrder = () => {
  const [data, setData] = useState(dataSample);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
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
  const columns = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => navigate("/purchase/edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/purchase/purchase-detail")}
            >
              Detail View
            </DropdownMenuItem>
            <DropdownMenuItem>Clone</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const { date } = row.original;
        return (
          <div
            className=" px-1"
            
          >
            {date}
          </div>
        );
      },

      enableHiding: false,
    },
    {
      accessorKey: "MR No",
      header: "MR No",
      cell: ({ row }) => (
        <div className=" p-2">
          <span  className=" focus-visible:bg-background  h-8  border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent" />
          {row.original.reference}
        </div>
      ),
    },
    {
      accessorKey: "Purchase Order",
      header: "Purchase Order",
      cell: ({ row }) => {
        const isAssigned = row.original.pruchaseOrder === "";

        if (isAssigned) {
          return row.original.reviewer;
        }

        return (
          <>
            <Label htmlFor={`${row.original.id}-reviewer`} className=" sr-only">
              Purchase Order
            </Label>
            <span onClick={() => navigate("/purchase/purchase-detail")} className=" focus-visible:bg-background cursor-pointer text-blue-600 dark:hover:bg-input/30  h-8 w-45 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent" >
            {row.original.purchaseOrder}
            </span>
          </>
        );
      },
    },

    {
      accessorKey: "Vendor Name",
      header: "Vendor Name",
      cell: ({ row }) => (
        <span className=" focus-visible:bg-background  h-8 w-45 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent">
          {row.original.reviewer}
        </span>
      ),
    },
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
          // PartiallyPO:
          //   "font-semibold text-orange-800 bg-orange-50 border border-orange-300",
          // MR Closed:
          //   "font-semibold text-indigo-800 bg-indigo-50 border border-indigo-300",
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                variant="outline"
                className={`text-sm  p-1 truncate w-19 border mx-auto  text-center  cursor-pointer rounded-md flex items-center justify-between  ${
                  status
                    ? statusStyles[status]
                    : "text-gray-500 bg-white border-gray-300"
                }`}
              >
                <span className="text-center mx-auto">
                  {status || "Select Status"}
                </span>
                {/* <IconChevronDown className=" h-4" /> */}
              </Badge>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-35">
              {tabs.map((s) => (
                <DropdownMenuItem
                  key={s.value}
                  onClick={() => {
                    setStatus(s.label); // store the value in state
                    row.original.status = s.value; // also update row data
                  }}
                  className="text-sm cursor-pointer text-center mx-auto hover:bg-gray-100"
                >
                  {s.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "Recieved",
      header: () => <div className="w-full p-2 text-left">Recieved </div>,
      cell: ({ row }) => (
        <div
          onSubmit={(e) => {
            e.preventDefault();
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.header}`,
              success: "Done",
              error: "Error",
            });
          }}
        >
          <Label
            htmlFor={`${row.original.id}-target`}
            className="sr-only"
          ></Label>
          <div className="w-full  mx-6 ">
            <div
              title={row.original.status}
              className={`w-2 h-2 rounded-full text-white flex items-center justify-center text-sm font-semibold ${
                row.original.status === "Done"
                  ? "bg-green-500"
                  : row.original.status === "In Process"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            ></div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "Billed ",
      header: () => <div className="w-full text-left">Billed </div>,
      cell: ({ row }) => (
        <div
          onSubmit={(e) => {
            e.preventDefault();
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.header}`,
              success: "Done",
              error: "Error",
            });
          }}
        >
          <Label
            htmlFor={`${row.original.id}-target`}
            className="sr-only"
          ></Label>
          <div className="w-full  mx-6 ">
            <div
              title={row.original.status}
              className={`w-2 h-2 rounded-full text-white flex items-center justify-center text-sm font-semibold ${
                row.original.status === "Done"
                  ? "bg-green-500"
                  : row.original.status === "In Process"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            ></div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "Amount",
      header: () => <div className="w-full text-center">Amount</div>,
      cell: ({ row }) => (
        <div
          onSubmit={(e) => {
            e.preventDefault();
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.header}`,
              success: "Done",
              error: "Error",
            });
          }}
        >
          <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
            Amount
          </Label>
          <div className=" focus-visible:bg-background  h-8 w-35 border-transparent bg-transparent text-center shadow-none focus-visible:border dark:bg-transparent">
            {row.original.amount}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "Delivery date",
      header: "Delivery date",
      cell: ({ row }) => {
        const { date } = row.original;
        return <div className="cursor-pointer text-blue-600 ">{date}</div>;
      },

      enableHiding: false,
    },
  ];

  const dataIds = useMemo(() => data?.map(({ id }) => id) || [], [data]);

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
    getRowId: (row) => row.id.toString(),
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
  const tabs = [
    { value: "all", label: "All" },
    { value: "draft", label: "Draft" },
    { value: "submitted", label: "Submitted" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "open", label: "Open" },
    { value: "pending", label: "Pending" },
    {
      value: "partially_purchase-received",
      label: "Partially Purchase Received",
    },
    { value: "po_closed", label: "PO Closed" },
  ];

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-1 lg:px-1">
        {/* <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit lg:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select> */}
        <Tabs
          defaultValue="outline"
          className="w-full flex-col  justify-start gap-6"
        >
          <TabsList className="hidden w-70 lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
            <TabsTrigger value="lpo">LPO</TabsTrigger>
            <TabsTrigger value="ipo">IPO</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className=""></div>
        <Button
        className={"mr-2"}
          variant="outline"
          size="sm"
          onClick={() => navigate("/purchase/instant-po")}
        >
          {/* <IconPlus /> */}
          <span className="  cursor-pointer">Instant PO</span>
        </Button>
        <div className="flex items-right gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <span className="inline">Status</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {tabs.map((tab) => (
                <DropdownMenuItem key={tab.label}>
                  {" "}
                  {tab.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/purchase/create")}
          >
            <IconPlus />
            <span className="hidden lg:inline">New</span>
          </Button>
        </div>
      </div>
      {/* TAB Contants */}
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-1 lg:px-1"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className=" sticky top-0 z-10 ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className="text-left"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8 ">
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
      {/* <TabsContent
        value="past-performance"
        className="flex flex-col px-1 lg:px-1"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"> TAB 1</div>
      </TabsContent> */}
      {/* <TabsContent value="key-personnel" className="flex flex-col px-1 lg:px-1">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"> TAB 2</div>
      </TabsContent> */}
      {/* <TabsContent
        value="focus-documents"
        className="flex flex-col px-1 lg:px-1"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"> TAB 3</div>
      </TabsContent> */}
    </Tabs>
  );
};

export default PurchaseOrder;
