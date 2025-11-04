// import * as React from "react";
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
import dataSample from "../Sample/data.json";
import { useNavigate } from "react-router-dom";
import {
  deleteInventoryItem,
  fetchInventory,
} from "@/redux/slices/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";
import { deleteInventory } from "@/services/inventory/inventoryApi";
// import { leadSource, company } from "@features/utils/ListViewMenu.jsx";
// Create a separate component for the drag handle
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

function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

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

const ItemList = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const columns = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.ROWID} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
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
            <DropdownMenuItem
              onClick={() =>
                navigate("/finance/inventory/update", { state: row.original })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/finance/inventory/detail/${row.original.ROWID}`, {
                  state: row.original,
                })
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
            >
              Delete
            </DropdownMenuItem>
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() =>
              navigate(`/inventory/detail/${row.original.ROWID}`, {
                state: row.original,
              })
            }
            variant="link"
            className="text-foreground w-fit px-0 text-left"
          >
            {row.original.name}
          </Button>
        );
      },
      enableHiding: false,
    },
    {accesorKey:"type",header:"Type"},
    {
      accessorKey: "sku",
      header: "SKU ",
      cell: ({ row }) => {
        const fullId = row.original.sku;
        const truncated =
          fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
        return <p>{truncated}</p>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "purchaseDescription",
      header: "Purchase Description",
      cell: ({ row }) => {
        const fullId = row.original?.purchaseDescription;
        const truncated =
          fullId && fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
        return <p title={fullId}>{truncated || "NA"}</p>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "purchaseRate",
      header: "Purchase Rate",
      cell: ({ row }) => {
        const fullId = row.original?.purchaseCostPrice;
        const truncated =
          fullId && fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
        return <p title={fullId}>{truncated || "NA"}</p>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "sellingDescription",
      header: "Selling Description",
      cell: ({ row }) => {
        const fullId = row.original?.sellingDescription;
        const truncated =
          fullId && fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
        return <p title={fullId}>{truncated || "NA"}</p>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "sellingPrice",
      header: "Selling Price",
      cell: ({ row }) => {
        const fullId = row.original?.sellingPrice;
        const truncated =
          fullId && fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
        return <p title={fullId}>{truncated || "NA"}</p>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const fullId = row.original?.category;
        const truncated =
          fullId && fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
        return <p title={fullId}>{truncated || "NA"}</p>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => {
        const fullId = row.original?.unit;
        const truncated =
          fullId && fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
        return <p title={fullId}>{truncated || "NA"}</p>;
      },
      enableHiding: false,
    },
  ];
  const { data, loading, error, fetched } = useSelector(
    (state) => state.inventory.all
  );
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [fetchedPages, setFetchedPages] = useState([1]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const currentPageIndex = pagination.pageIndex;
  const currentPageSize = pagination.pageSize;
  const navigate = useNavigate();
  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const dataIds = useMemo(() => data?.map(({ ROWID }) => ROWID) || [], [data]);
  const BACKEND_PAGE_SIZE = 300;

  const getDisplayPageCount = (totalItems, frontendPageSize) => {
    const fullPages = Math.ceil(totalItems / frontendPageSize);
    const needsMore = totalItems % BACKEND_PAGE_SIZE === 0;
    return needsMore ? fullPages + 1 : fullPages;
  };
  const FRONTEND_PAGE_SIZE = pagination.pageSize;
  const totalPages = getDisplayPageCount(data.length, FRONTEND_PAGE_SIZE);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchInventory());
    }
  }, [fetched, dispatch]);

  // Memoize paginated data
  const paginatedData = useMemo(() => {
    const start = currentPageIndex * currentPageSize;
    const end = start + currentPageSize;
    return data.slice(start, end);
  }, [data, currentPageIndex, currentPageSize]);

  const table = useReactTable({
    data: paginatedData, // you can pass empty array initially
    columns,
    pageCount: totalPages,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: currentPageIndex,
        pageSize: currentPageSize,
      },
    },
    getRowId: (row) => row.ROWID?.toString(),
    enableRowSelection: true,
    manualPagination: true,
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

  // Fetch backend data if needed
  useEffect(() => {
    const currentIndex = table.getState().pagination.pageIndex;
    const itemsNeeded = (currentIndex + 1) * FRONTEND_PAGE_SIZE;

    if (itemsNeeded > data.length) {
      const nextBackendPage = Math.floor(data.length / BACKEND_PAGE_SIZE) + 1;

      if (!fetchedPages.includes(nextBackendPage)) {
        dispatch(fetchInventory({ page: nextBackendPage }));
        console.log("Fetch backend page:", nextBackendPage);
        setFetchedPages((prev) => [...prev, nextBackendPage]);
      }
    }
  }, [table.getState().pagination.pageIndex]);

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

  function handleDelete() {
    if (idToDelete !== "") {
      setDeleteLoading(true);
      deleteInventory(idToDelete)
        .then((res) => {
          if (res.data.success) {
            dispatch(deleteInventoryItem(idToDelete));
            toast.success("Inventory Deleted Successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || err.message);
        })
        .finally(() => {
          setDeleteLoading(false);
          setOpenAlert(false);
        });
    }
  }
  return (
    <div className=" mx-1 lg:mx-2  flex flex-col justify-start gap-6">
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="flex  justify-between   ">
            <DropdownMenu>
              <div className="flex gap-2">
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={"cursor-pointer"} size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Finished Goods</span>
                  {/* <IconChevronDown /> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={"cursor-pointer"}  size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline"> Raw Material</span>
                  {/* <IconChevronDown /> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={"cursor-pointer"}  size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Semi-Finished Goods</span>
                  {/* <IconChevronDown /> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={"cursor-pointer"}  size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Services</span>
                  {/* <IconChevronDown /> */}
                </Button>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="between" className="ml-9 w-40 ">
                <DropdownMenuCheckboxItem className={"cursor-pointer"}>
                  Finished Goods
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className={"cursor-pointer"}>
                  Raw Material
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className={"cursor-pointer"}>
                  Semi-Finished Goods
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className={"cursor-pointer"}>
                  Services
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent> */}
              </div>
            </DropdownMenu>
            <div className="flex  gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <IconLayoutColumns />
                    <span className="hidden lg:inline">Customize Columns</span>
                    <span className="lg:hidden">Columns</span>
                    <IconChevronDown />
                  </Button>
                </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-60 overflow-auto">
  {table
    .getAllColumns()
    .filter((column) => column.getCanHide()) // show only hideable columns
    .map((column) => {
      const headerText =
        typeof column.columnDef.header === "string"
          ? column.columnDef.header
          : column.id;
      return (
        <DropdownMenuCheckboxItem
          key={column.id}
          className="capitalize"
          checked={column.getIsVisible()}
          onCheckedChange={(value) =>
            column.toggleVisibility(!!value)
          }
        >
          {headerText}
        </DropdownMenuCheckboxItem>
      );
    })}
            </DropdownMenuContent>


              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/inventory/create")}
              >
                <IconPlus />
                <span className="hidden lg:inline">Create Item</span>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table>
                <TableHeader className=" sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} colSpan={header.colSpan}>
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
        </>
      )}
      <TableDataDeleteAlert
        loading={deleteLoading}
        handleDelete={handleDelete}
        open={openAlert}
        setOpen={setOpenAlert}
      />
    </div>
  );
};
export default ItemList;
