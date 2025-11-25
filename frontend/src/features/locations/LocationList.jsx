import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconSearch,
  IconPlus,
  IconDotsVertical,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconGripVertical,
  IconArrowUp,
  IconArrowDown,
  IconFilter,
  IconMail,
  IconDownload,
} from "@tabler/icons-react";
import LocationMassEmailModal from "./LocationMassEmailModal";
import LocationMassUpdateModal from "./LocationMassUpdateModal";
import LocationSearchDrawer from "./LocationSearchDrawer";

// Sample data
const sampleLocations = [
  {
    ROWID: 1,
    locationName: "Downtown Office",
    phone: "+1 234-567-8901",
    website: "https://downtown.example.com",
    locationOwner: "Jane Doe",
  },
  {
    ROWID: 2,
    locationName: "Uptown Branch",
    phone: "+1 987-654-3210",
    website: "https://uptown.example.com",
    locationOwner: "John Smith",
  },
];

// Sortable drag handle
function DragHandle({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="p-0"
      tabIndex={-1}
      type="button"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
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
      type="button"
    >
      <span className="flex items-center gap-1">
        {title}
        {sortDirection === false ? null : sortDirection === "asc" ? (
          <IconArrowUp className="size-4" />
        ) : (
          <IconArrowDown className="size-4" />
        )}
      </span>
    </Button>
  );
}

function DraggableRow({ row, navigate }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.original.ROWID,
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 cursor-pointer hover:bg-muted/50"
      onClick={() =>
        !isDragging &&
        navigate(`/location/details/${row.original.ROWID}`, {
          state: row.original,
        })
      }
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className="py-0 px-2 text-sm min-w-0 overflow-hidden"
          style={{ width: cell.column.getSize() }}
        >
          <div className="truncate min-w-0 w-full overflow-hidden">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}

// Main LocationList
export default function LocationList() {
  const navigate = useNavigate();
  const [data, setData] = useState(sampleLocations);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnSizing, setColumnSizing] = useState({
    drag: 40,
    select: 50,
    actions: 100,
    locationName: 200,
    phone: 150,
    city: 150,
    state: 150,
    country: 150,
  });

  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isMassEmailModalOpen, setIsMassEmailModalOpen] = useState(false);

  const fields = [
    { label: "Location Name", value: "locationName" },
    { label: "Phone", value: "phone" },
    { label: "Website", value: "website" },
    { label: "Location Owner", value: "locationOwner" },
  ];

  const exportLocations = () => {
    const selectedRows = Object.keys(rowSelection).map(
      (key) => data[parseInt(key)]
    );
    if (selectedRows.length === 0) {
      toast.error("No locations selected for export");
      return;
    }

    const headers = [
      "ROWID",
      "Location Name",
      "Phone",
      "City",
      "State",
      "Country",
      "Website",
      "Contact Owner",
    ];
    const csvContent = [
      headers.join(","),
      ...selectedRows.map((row) =>
        [
          row.ROWID,
          `"${row.locationName}"`,
          `"${row.phone}"`,
          `"${row.city}"`,
          `"${row.state}"`,
          `"${row.country}"`,
          `"${row.website}"`,
          `"${row.contactOwner}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "locations.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Locations exported successfully");
  };

  // DnD handle
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.ROWID === active.id);
        const newIndex = items.findIndex((item) => item.ROWID === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Table columns
  const columns = [
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
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            onClick={(e) => e.stopPropagation()}
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
              navigate(`/location/details/${row.original.ROWID}`, {
                state: row.original,
              });
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
                  navigate(`/location/details/${row.original.ROWID}`, {
                    state: row.original,
                  });
                }}
              >
                Detail view
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  navigate(`/location/edit/${row.original.ROWID}`, {
                    state: row.original,
                  });
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteContact(row.original.ROWID);
                }}
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
      accessorKey: "locationName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Location Name" />
      ),
      cell: ({ row }) => <div>{row.original.locationName}</div>,
      size: 200,
      minSize: 50,
      enableResizing: true,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => <SortableHeader column={column} title="Phone" />,
      cell: ({ row }) => <div>{row.original.phone}</div>,
      size: 150,
      minSize: 50,
      enableResizing: true,
    },
    {
      accessorKey: "website",
      header: ({ column }) => (
        <SortableHeader column={column} title="Website" />
      ),
      cell: ({ row }) => (
        <a
          href={row.original.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
          onClick={(e) => e.stopPropagation()}
        >
          {row.original.website}
        </a>
      ),
      size: 200,
      minSize: 50,
      enableResizing: true,
    },
    {
      accessorKey: "locationOwner",
      header: ({ column }) => (
        <SortableHeader column={column} title="Location Owner" />
      ),
      cell: ({ row }) => <div>{row.original.locationOwner}</div>,
      size: 170,
      minSize: 80,
      enableResizing: true,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
      columnSizing,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mx-2 flex flex-col gap-6">
      {/* Header & Actions */}
      <div className="flex items-center justify-end mx-1 lg:mx-2 gap-2">
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
            <DropdownMenuItem onClick={exportLocations}>
              <IconDownload className="mr-2 h-4 w-4" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/location/create")}
        >
          <IconPlus />
          <span className="hidden lg:inline">New Location</span>
        </Button>
      </div>

      {/* Table with DnD */}
      <div
        className="relative grid w-full overflow-hidden rounded-lg border"
        style={{
          height: "calc(100vh - 174px)",
          maxHeight: "calc(100vh - 194px)",
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((item) => item.ROWID)}
            strategy={verticalListSortingStrategy}
          >
            <Table className="table-fixed">
              <TableHeader className="sticky top-0 z-10 bg-background">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
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
                        {!header.isPlaceholder && (
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
                                  className={`h-full w-0.5 absolute right-0 top-0 ${
                                    header.column.getIsResizing()
                                      ? "bg-primary"
                                      : "bg-border hover:bg-primary/50"
                                  }`}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table
                    .getRowModel()
                    .rows.map((row) => (
                      <DraggableRow
                        key={row.id}
                        row={row}
                        navigate={navigate}
                      />
                    ))
                ) : (
                  <TableRow className="h-24 text-center">
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No Vendors Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>

      {/* Pagination controls */}
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
            size="icon"
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

      {/* Drawers and Modals */}
      {isSearchDrawerOpen && (
        <LocationSearchDrawer
          isOpen={isSearchDrawerOpen}
          onClose={() => setIsSearchDrawerOpen(false)}
          onSearchResults={(filters) => {
            // Implement your search filter logic here,
            // e.g., update data or apply columnFilters based on filters
            console.log("Search filters:", filters);
            setIsSearchDrawerOpen(false);
            toast.success("Search applied");
          }}
        />
      )}

      {isMassUpdateModalOpen && (
        <LocationMassUpdateModal
          isOpen={isMassUpdateModalOpen}
          onClose={() => setIsMassUpdateModalOpen(false)}
          selectedVendors={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          fields={fields}
          onUpdate={(updateData) => {
            // Handle mass update logic here
            console.log("Mass update:", updateData);
            toast.success("Mass update completed successfully!");
          }}
        />
      )}

      {isMassEmailModalOpen && (
        <LocationMassEmailModal
          isOpen={isMassEmailModalOpen}
          onClose={() => setIsMassEmailModalOpen(false)}
          selectedVendors={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSend={(emailData) => {
            // Handle mass email logic here
            console.log("Mass email:", emailData);
            toast.success("Mass email sent successfully!");
          }}
        />
      )}
    </div>
  );
}
