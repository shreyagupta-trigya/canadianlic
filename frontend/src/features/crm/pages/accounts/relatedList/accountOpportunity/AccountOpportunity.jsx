import * as React from "react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  IconDotsVertical,
  IconGripVertical,
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
  IconPlus,
  IconLayoutColumns,
  IconChevronDown,
} from "@tabler/icons-react";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";

const sampleData = [
  {
    id: "1",
    dealName: "Opportunity A",
    stage: "Qualified",
    status: "Done",
    amount: 50000,
    contact: { mobile: "1234567890", firstName: "John", lastName: "Doe" },
  },
  {
    id: "2",
    dealName: "Opportunity B",
    stage: "Secured",
    status: "In Progress",
    amount: 75000,
    contact: { mobile: "9876543210", firstName: "Jane", lastName: "Smith" },
  },
  {
    id: "3",
    dealName: "Opportunity C",
    stage: "Lost",
    status: "Not Started",
    amount: 60000,
    contact: null,
  },
];

function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon">
      <IconGripVertical />
    </Button>
  );
}

function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });
  return (
    <TableRow
      ref={setNodeRef}
      data-dragging={isDragging}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

const AccountOpportunity = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(sampleData);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
 const [deleteLoading, setDeleteLoading] = useState(false);
   const [openAlert, setOpenAlert] = useState(false);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  // --- utils for badge colors ---
  const getStageColor = (stage) => {
    switch (stage) {
      case "Qualified":
        return "bg-green-50 text-green-700 border-green-700";
      case "Secured":
        return "bg-blue-50 text-blue-700 border-blue-700";
      case "Lost":
        return "bg-red-50 text-red-700 border-red-700";
      default:
        return "bg-gray-50 text-gray-700 border-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-50 text-green-700 border-green-700";
      case "In Progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-700";
      case "Not Started":
        return "bg-gray-50 text-gray-700 border-gray-700";
      default:
        return "bg-gray-50 text-gray-700 border-gray-700";
    }
  };
function handleDelete() {
  if (idToDelete !== "") {
    setDeleteLoading(true);
    deleteLead(idToDelete)
      .then((res) => {
        const count = res?.leads?.[0]?.leads?.DELETED_ROWS_COUNT;

        if (res.success && count > 0) {
          dispatch(deleteLeadFromList(idToDelete));
          toast.success("Account deleted successfully");
        } else {
          toast.error("account not deleted");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to delete account");
      })
      .finally(() => {
        setDeleteLoading(false);
        setOpenAlert(false);
      });
  }
}

  
  const columns = useMemo(
    () => [
      {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        enableHiding: false,
      
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/crm/deals/details/${row.original.id}`)
                }
              >
                Detail View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
        ),
        enableHiding: false,
      
      },
        {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableHiding: false,
        enableSorting: false,
    },
      {
        accessorKey: "dealName",
        header: "Opportunity Name",
        cell: ({ row }) => (
          <Button
            variant="link"
            className="text-left w-fit px-0"
            onClick={() => navigate(`/crm/deals/details/${row.original.id}`)}
          >
            {row.original.dealName}
          </Button>
        ),
      },
      {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row }) => (
          <Badge
            className={`${getStageColor(row.original.stage)} px-2 py-1 rounded-sm`}
          >
            {row.original.stage}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className={`${getStatusColor(row.original.status)} px-2 py-1 rounded-sm`}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => row.original.amount,
      },
      {
        accessorKey: "contactMobile",
        header: "Contact No",
        cell: ({ row }) => row.original.contact?.mobile || "N/A",
      },
      {
        accessorKey: "contactName",
        header: "Contact Name",
        cell: ({ row }) =>
          row.original.contact
            ? `${row.original.contact.firstName} ${row.original.contact.lastName}`
            : "No Name Assigned",
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, pagination },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = data.findIndex((d) => d.id === active.id);
      const newIndex = data.findIndex((d) => d.id === over.id);
      setData(arrayMove(data, oldIndex, newIndex));
    }
  };

  return (
    <>
    <div className="flex flex-col gap-4">
      {/* 🔽 Top bar with create + customize column dropdown */}
      <div className="flex justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden lg:inline ml-2">Customize Columns</span>
              <IconChevronDown className="ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={() => navigate("/crm/deals/create")}
          variant="outline"
          size="sm"
        >
          <IconPlus /> Create Opportunity
        </Button>
      </div>

      {/* 🔽 Table */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-background">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center h-24">
                      No Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </SortableContext>
      </DndContext>

      {/* 🔽 Pagination */}
      <div className="flex items-center justify-between px-4">
        <div className="hidden lg:flex text-sm text-muted-foreground">
          {table.getRowModel().rows.length} of {data.length} row(s) shown
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rows per page:</span>
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border rounded px-1 py-0.5"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft />
            </Button>
            <span className="text-sm font-medium px-2">
              Page {pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
    <TableDataDeleteAlert
        loading={deleteLoading}
        handleDelete={handleDelete}
        open={openAlert}
        setOpen={setOpenAlert}
    />
    </>
  );
};

export default AccountOpportunity;
