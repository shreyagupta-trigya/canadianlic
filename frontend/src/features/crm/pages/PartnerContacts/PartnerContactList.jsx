import React, { useState, useEffect } from "react";
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
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import noresult from "@assets/no-data.png";
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
  IconDownload,
  IconMail,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PartnerContactDrawer from "./PartnerContactDrawer";
import MassUpdateModal from "./MassUpdateModal";
import MassUpdateEmailModal from "./MassUpdateEmailModal";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";

// Sample data
const sampleData = [
  {
    ROWID: 1,
    leadName: "Name 1",
    email: "email1@example.com",
    leadOwner: "Owner 1",
    parentPartner: "Parent 1",
    ADDRESS: "Address 1",
    createdTime: "2022-05-01",
    modifiedTime: "2022-05-02",
  },
  {
    ROWID: 2,
    leadName: "Name 2",
    email: "email2@example.com",
    leadOwner: "Owner 2",
    parentPartner: "Parent 2",
    ADDRESS: "Address 2",
    createdTime: "2023-05-01",
    modifiedTime: "2023-05-02",
  },
  {
    ROWID: 3,
    leadName: "Name 3",
    email: "email3@example.com",
    leadOwner: "Owner 3",
    parentPartner: "Parent 3",
    ADDRESS: "Address 3",
    createdTime: "2024-05-01",
    modifiedTime: "2024-05-02",
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

function SortableRow({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-state={isDragging ? "dragging" : undefined}
    >
      {children}
    </TableRow>
  );
}

function DraggableRow({ row, navigate }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.ROWID,
  });
  const handleRowClick = () => {
    if (!isDragging) {
      navigate(`/crm/partner-contact/details/${row.original.ROWID}`, {
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
        <TableCell
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className="py-0 px-2 text-sm min-w-0 overflow-hidden"
          onClick={handleRowClick}
        >
          <div className="truncate min-w-0 w-full overflow-hidden">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}

const PartnerContactList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(sampleData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnSizing, setColumnSizing] = useState(() => {
    const defaultSizes = {
      drag: 40,
      select: 50,
      actions: 80,
      leadName: 200,
      email: 200,
      leadOwner: 200,
      parentPartner: 200,
      ADDRESS: 250,
      createdTime: 150,
      modifiedTime: 150,
    };
    return defaultSizes;
  });
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);
  const [isMassEmailModalOpen, setIsMassEmailModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [totalItems, setTotalItems] = useState(sampleData.length);
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fields = [
    { label: "Partner Contact Name", value: "leadName" },
    { label: "Email", value: "email" },
    { label: "Partner Contact Owner", value: "leadOwner" },
    { label: "Parent Partner", value: "parentPartner" },
    { label: "Address", value: "ADDRESS" },
  ];

  // Search filters
  const [form, setForm] = useState({
    partnerContactName: "",
    email: "",
    partnerContactOwner: "",
    parentPartner: "",
    address: "",
    modifiedTime: "",
    createdTime: "",
  });

  const [operationForm, setOperationForm] = useState({
    partnerContactName: "is",
    email: "is",
    partnerContactOwner: "is",
    parentPartner: "is",
    address: "is",
    modifiedTime: "is",
    createdTime: "is",
  });

  const [fieldChecks, setFieldChecks] = useState({
    partnerContactName: false,
    email: false,
    partnerContactOwner: false,
    parentPartner: false,
    address: false,
    modifiedTime: false,
    createdTime: false,
  });

  const allFields = [
    {
      label: "Partner Contact Name",
      model: "partnerContactName",
      placeholder: "Contact Name",
      type: "text",
    },
    {
      label: "Email",
      model: "email",
      placeholder: "Email Address",
      type: "email",
    },
    {
      label: "Contact Owner",
      model: "partnerContactOwner",
      placeholder: "Contact Owner",
      type: "text",
    },
    {
      label: "Parent Partner",
      model: "parentPartner",
      placeholder: "Parent Partner",
      type: "text",
    },
    {
      label: "Address",
      model: "address",
      placeholder: "Address",
      type: "text",
    },
    {
      label: "Modified Time",
      model: "modifiedTime",
      placeholder: "Modified Date/Time",
      type: "date",
    },
    {
      label: "Created Time",
      model: "createdTime",
      placeholder: "Created Date/Time",
      type: "date",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getOperationOptions = (field) => {
    if (["text", "email"].includes(field.type)) {
      return [
        { value: "is", label: "Is" },
        { value: "is_not", label: "Is Not" },
        { value: "contains", label: "Contains" },
        { value: "does_not_contain", label: "Does Not Contain" },
        { value: "starts_with", label: "Starts With" },
        { value: "ends_with", label: "Ends With" },
      ];
    } else if (field.type === "date") {
      return [
        { value: "is", label: "Is" },
        { value: "is_not", label: "Is Not" },
        { value: "before", label: "Before" },
        { value: "after", label: "After" },
        { value: "between", label: "Between" },
      ];
    }
    return [{ value: "is", label: "Is" }];
  };

  const handleFieldCheckChange = (model, checked) => {
    setFieldChecks((prev) => ({ ...prev, [model]: checked }));
    if (checked) {
      const operations = getOperationOptions(
        allFields.find((f) => f.model === model)
      );
      setOperationForm((prev) => ({
        ...prev,
        [model]: operations[0]?.value || "is",
      }));
    } else {
      setOperationForm((prev) => ({ ...prev, [model]: "" }));
    }
  };

  const handleOperationChange = (model, operation) => {
    setOperationForm((prev) => ({ ...prev, [model]: operation }));
  };

  const searchContacts = () => {
    // Implement search logic here
    console.log("Searching with filters:", {
      form,
      operationForm,
      fieldChecks,
    });
    setIsSearchDrawerOpen(false);
    toast.success("Search applied");
  };

  const deleteContact = (id) => {
    setData((prev) => prev.filter((item) => item.ROWID !== id));
    setTotalItems((prev) => prev - 1);
    toast.success("Contact deleted");
  };

  const exportContacts = () => {
    const selectedRows = Object.keys(rowSelection).map(
      (key) => data[parseInt(key)]
    );
    if (selectedRows.length === 0) {
      toast.error("No contacts selected for export");
      return;
    }

    const headers = [
      "ROWID",
      "Partner Contact Name",
      "Email",
      "Partner Contact Owner",
      "Parent Partner",
      "Address",
      "Created Time",
      "Modified Time",
    ];
    const csvContent = [
      headers.join(","),
      ...selectedRows.map((row) =>
        [
          row.ROWID,
          `"${row.leadName}"`,
          `"${row.email}"`,
          `"${row.leadOwner}"`,
          `"${row.parentPartner}"`,
          `"${row.ADDRESS}"`,
          row.createdTime,
          row.modifiedTime,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "partner_contacts.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Contacts exported successfully");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
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
              navigate(`/crm/partner-contact/details/${row.original.ROWID}`, {
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
                  navigate(
                    `/crm/partner-contact/details/${row.original.ROWID}`,
                    { state: row.original }
                  );
                }}
              >
                Detail view
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  navigate(`/crm/partner-contact/edit/${row.original.ROWID}`, {
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
      accessorKey: "leadName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Partner Contact Name" />
      ),
      cell: ({ row }) => <div>{row.original.leadName}</div>,
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
      accessorKey: "leadOwner",
      header: ({ column }) => (
        <SortableHeader column={column} title="Partner Contact Owner" />
      ),
      cell: ({ row }) => <div>{row.original.leadOwner}</div>,
      size: 200,
      minSize: 50,
    },
    {
      accessorKey: "parentPartner",
      header: ({ column }) => (
        <SortableHeader column={column} title="Parent Partner" />
      ),
      cell: ({ row }) => <div>{row.original.parentPartner}</div>,
      size: 200,
      minSize: 50,
    },
    {
      accessorKey: "ADDRESS",
      header: ({ column }) => (
        <SortableHeader column={column} title="Address" />
      ),
      cell: ({ row }) => <div>{row.original.ADDRESS}</div>,
      size: 250,
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
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
      columnSizing,
    },
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

  if (isDesktop) {
    return (
      <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
        <Tabs
          defaultValue="all-contacts"
          className="w-full flex-col justify-start gap-2"
        >
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
                  <DropdownMenuItem
                    onClick={() => setIsMassEmailModalOpen(true)}
                  >
                    <IconMail className="mr-2 h-4 w-4" />
                    Mass Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportContacts}>
                    <IconDownload className="mr-2 h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() => navigate("/crm/partner-contact/create")}
              >
                <IconPlus />
                <span className="hidden lg:inline">New Contact</span>
              </Button>
            </div>
          </div>
          <TabsContent
            value="all-contacts"
            className="relative flex flex-col gap-4 overflow-auto mx-1 lg:mx-2"
          >
            <div
              className="relative grid w-full  overflow-hidden rounded-lg border"
              style={{
                height: "calc(100vh - 160px)",
                maxHeight: "calc(100vh - 180px)",
              }}
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
                            className={`truncate ${
                              header.column.id === "drag"
                                ? "border-r border-dotted border-gray-600"
                                : ""
                            }`}
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
                                    className="absolute right-0 top-0 h-full w-5 cursor-ew-resize select-none touch-none"
                                  >
                                    <div
                                      className={`h-full w-0.5 absolute right-0 top-0
                                        ${
                                          header.column.getIsResizing()
                                            ? "bg-primary"
                                            : "bg-border hover:bg-primary/50"
                                        }
                                      `}
                                    />
                                  </div>
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
                      items={data.map((item) => item.ROWID)}
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
            </div>

            <div className="flex items-center justify-between px-4">
              <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="hidden items-center gap-2 lg:flex">
                  <Label
                    htmlFor="rows-per-page"
                    className="text-sm font-medium"
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
          </TabsContent>
        </Tabs>

        {/* Search Drawer */}
        {isSearchDrawerOpen && (
          <PartnerContactDrawer
            isOpen={isSearchDrawerOpen}
            onClose={() => setIsSearchDrawerOpen(false)}
            onSearchResults={(searchFields) => {
              console.log("Search fields:", searchFields);
              // TODO: Implement search logic
            }}
          />
        )}

        {/* Mass Update Modal */}
        {isMassUpdateModalOpen && (
          <MassUpdateModal
            isOpen={isMassUpdateModalOpen}
            onClose={() => setIsMassUpdateModalOpen(false)}
            selectedContacts={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            fields={fields}
            onUpdate={(updateData) => {
              // Handle mass update logic here
              console.log("Mass update:", updateData);
              // TODO: Implement mass update API call and state update
              toast.success("Mass update completed successfully!");
            }}
          />
        )}

        {/* Mass Email Modal */}
        {isMassEmailModalOpen && (
          <MassUpdateEmailModal
            isOpen={isMassEmailModalOpen}
            onClose={() => setIsMassEmailModalOpen(false)}
            selectedContacts={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            onSend={(emailData) => {
              // Handle mass email logic here
              console.log("Mass email:", emailData);
              // TODO: Implement mass email API call
              toast.success("Mass email sent successfully!");
            }}
          />
        )}
      </div>
    );
  }
};

export default PartnerContactList;
