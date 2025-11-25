import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  IconSearch,
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconDotsVertical,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconGripVertical,
  IconChevronUp,
  IconArrowUp,
  IconArrowDown,
  IconFilter,
  IconMail,
  IconDownload,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import VendorSearchDrawer from "./VendorSearchDrawer"; // Create a drawer for search filters
import VendorMassUpdateModal from "./VendorMassUpdateModal"; // Modal for mass update
import VendorMassEmailModal from "./VendorMassEmailModal"; // Modal for mass email

const sampleVendors = [
  {
    ROWID: 1,
    userFirstName: "Vendor 1",
    contactFirstName: "Type 1",
    email: "vendor1@example.com",
    contactLastName: "Owner 1",
    vendorStatus: "Active",
    createdTime: "2024-01-01",
    modifiedTime: "2024-01-10",
  },
  {
    ROWID: 2,
    userFirstName: "Vendor 2",
    contactFirstName: "Type 2",
    email: "vendor2@example.com",
    contactLastName: "Owner 2",
    vendorStatus: "Inactive",
    createdTime: "2023-11-15",
    modifiedTime: "2023-12-01",
  },
];

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
    >
      <IconGripVertical className="text-muted-foreground size-3" />
    </Button>
  );
}

function DraggableRow({ row, navigate }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.ROWID,
  });

  const handleRowClick = () => {
    if (!isDragging) {
      navigate(`/vendors/details/${row.original.ROWID}`, {
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
      style={{ transform: CSS.Transform.toString(transform), transition }}
      onClick={handleRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className="py-0 px-2 text-sm min-w-0 overflow-hidden"
        >
          <div className="truncate min-w-0 w-full overflow-hidden">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}

const VendorList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(sampleVendors);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnSizing, setColumnSizing] = useState({
    drag: 40,
    select: 50,
    actions: 80,
    userFirstName: 200,
    contactFirstName: 200,
    email: 200,
    contactLastName: 200,
    vendorStatus: 150,
    createdTime: 150,
    modifiedTime: 150,
  });
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isMassEmailModalOpen, setIsMassEmailModalOpen] = useState(false);

  const fields = [
    { label: "Vendor Name", value: "userFirstName" },
    { label: "Vendor Type", value: "contactFirstName" },
    { label: "Email", value: "email" },
    { label: "Vendor Owner", value: "contactLastName" },
  ];

  const deleteVendor = (id) => {
    setData((prev) => prev.filter((item) => item.ROWID !== id));
    toast.success("Vendor deleted");
  };

  const exportVendors = () => {
    const selectedRows = Object.keys(rowSelection).map(
      (key) => data[parseInt(key)]
    );
    if (selectedRows.length === 0) {
      toast.error("No vendors selected for export");
      return;
    }

    const headers = [
      "ROWID",
      "Vendor Name",
      "Vendor Type",
      "Email",
      "Vendor Owner",
      "Vendor Status",
      "Created Time",
      "Modified Time",
    ];
    const csvContent = [
      headers.join(","),
      ...selectedRows.map((row) =>
        [
          row.ROWID,
          `"${row.userFirstName}"`,
          `"${row.contactFirstName}"`,
          `"${row.email}"`,
          `"${row.contactLastName}"`,
          `"${row.vendorStatus}"`,
          row.createdTime,
          row.modifiedTime,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "vendors.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Vendors exported successfully");
  };

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
              navigate(`/vendors/details/${row.original.ROWID}`, {
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
                  navigate(`/vendors/details/${row.original.ROWID}`, {
                    state: row.original,
                  });
                }}
              >
                Detail view
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  navigate(`/crm//vendors/edit/${row.original.ROWID}`, {
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
      accessorKey: "userFirstName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Vendor Name" />
      ),
      cell: ({ row }) => <div>{row.original.userFirstName}</div>,
      size: 200,
      minSize: 50,
    },
    {
      accessorKey: "contactFirstName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Vendor Type" />
      ),
      cell: ({ row }) => <div>{row.original.contactFirstName}</div>,
      size: 200,
      minSize: 50,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      cell: ({ row }) => <div>{row.original.email}</div>,
      size: 200,
      minSize: 50,
    },
    {
      accessorKey: "contactLastName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Vendor Owner" />
      ),
      cell: ({ row }) => <div>{row.original.contactLastName}</div>,
      size: 200,
      minSize: 50,
    },
    {
      accessorKey: "vendorStatus",
      header: ({ column }) => (
        <SortableHeader column={column} title="Vendor Status" />
      ),
      cell: ({ row }) => <div>{row.original.vendorStatus}</div>,
      size: 150,
      minSize: 50,
    },
    {
      accessorKey: "createdTime",
      header: ({ column }) => (
        <SortableHeader column={column} title="Created Time" />
      ),
      cell: ({ row }) => <div>{row.original.createdTime}</div>,
      size: 150,
      minSize: 50,
    },
    {
      accessorKey: "modifiedTime",
      header: ({ column }) => (
        <SortableHeader column={column} title="Modified Time" />
      ),
      cell: ({ row }) => <div>{row.original.modifiedTime}</div>,
      size: 150,
      minSize: 50,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, columnFilters, pagination, columnSizing },
    enableRowSelection: true,
    enableColumnResizing: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
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
            <DropdownMenuItem onClick={exportVendors}>
              <IconDownload className="mr-2 h-4 w-4" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/vendors/create")}
        >
          <IconPlus />
          <span className="hidden lg:inline">New Vendor</span>
        </Button>
      </div>

      {/* Table Container with DnD */}
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

      {/* Pagination */}
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
        <VendorSearchDrawer
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
        <VendorMassUpdateModal
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
        <VendorMassEmailModal
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
};

export default VendorList;
