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
import { fetchInvoices,deleteInvoiceFromList } from "@/redux/slices/invoices/invoiceSlice";
import { deleteInvoice } from "@/services/invoices/invoiceApi";

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
import dataSample from "./Sample/data.json";
import { useNavigate } from "react-router-dom";
import { leadSource, company } from "@features/utils/ListViewMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";

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

// const columns = [
//   {
//     id: "drag",
//     header: () => null,
//     cell: ({ row }) => <DragHandle id={row.original.id} />,
//   },
//   {
//     id: "actions",
//     cell: () => (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
//             size="icon"
//           >
//             <IconDotsVertical />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-32">
//           <DropdownMenuItem>Edit</DropdownMenuItem>
//           <DropdownMenuItem>Make a copy</DropdownMenuItem>
//           <DropdownMenuItem>Favorite</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     ),
//   },
//   {
//     id: "select",
//     header: ({ table }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && "indeterminate")
//           }
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       </div>
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => {
//     const { date } = row.original;
//     return (
//       <div
//         className="cursor-pointer text-blue-600 hover:underline"
//         onClick={() => navigate('/finance/invoice/detail')}
//       >
//         {date}
//       </div>
//     );
//     },
//     enableHiding: false,
//   },
//   {
//     accessorKey: "Invoice",
//     header: "Invoice#",
//     cell: ({ row }) => {
//       const isAssigned = row.original.email === "";

//       if (isAssigned) {
//         return row.original.reviewer;
//       }

//       return (
//         <>
//           <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
//             Company Name
//           </Label>
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-45 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.email}
//           id={`${row.original.id}-email`}
//         />
//           {/* <Select>
//             <SelectTrigger
//               className="w-29 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
//               size="sm"
//               id={`${row.original.id}-reviewer`}
//             >
//               <SelectValue placeholder="Assign Company" />
//             </SelectTrigger>
//             <SelectContent align="end">
//               {company.map((option) => (
//                 <SelectItem value={option.id}>{option.label}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select> */}
//         </>
//       );
//     },
//   },
//   {
//     accessorKey: "Order Number",
//     header: "Order Number",
//     cell: ({ row }) => (
//       <div className="w-45">
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-45 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.email}
//           id={`${row.original.id}-email`}
//         />
//       </div>
//     ),
//   },
//   {
//     accessorKey: "Customer Name",
//     header: "Customer Name",
//     cell: ({ row }) => (
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-35 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.phone}
//           id={`${row.original.id}-phone`}
//         />
//     ),
//   },
//   {
//     accessorKey: "Order Status",
//     header: () => <div className="w-full text-left">Status</div>,
//     cell: ({ row }) => (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//             loading: `Saving ${row.original.header}`,
//             success: "Done",
//             error: "Error",
//           });
//         }}
//       >
//         <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          
//         </Label>
//         {/* <Select 
//           defaultValue={row.original.source}
//           onValueChange={(value) => {
//             row.original.source = value;
//             row.original.target = value;
//           }}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Source" />
//           </SelectTrigger>
//           <SelectContent>
// <div>
//   {row.original.status}
// </div>
//           </SelectContent>
//         </Select> */}
//         <div className="w-full  mx-6 ">
//             <div
//             title={row.original.status}
//     className={`w-2 h-2 rounded-full text-white flex items-center justify-center text-sm font-semibold ${
//       row.original.status === "Done" ? "bg-green-500" : row.original.status === "In Process" ? "bg-blue-500" : "bg-gray-500"
//     }`}>
//     </div>

//         </div>

//       </form>
//     ),
//   },
//   {
//     accessorKey: "Due date",
//     header: "Due Date",
//     cell: ({ row }) => {
//     const { date } = row.original;
//     return (
//       <div
//         className="cursor-pointer text-blue-600 hover:underline"
//         onClick={() => navigate('/books/sales/sales-order-detail')}
//       >
//         {date}
//       </div>
//     );
//     },
//     enableHiding: false,
//   },

//   {
//     accessorKey: "Amount",
//     header: () => <div className="w-full text-center">Amount</div>,
//     cell: ({ row }) => (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//             loading: `Saving ${row.original.header}`,
//             success: "Done",
//             error: "Error",
//           });
//         }}
//       >
//         <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
//           Skype ID
//         </Label>
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-35 border-transparent bg-transparent text-center shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.limit}
//           id={`${row.original.id}-limit`}
//         />
//       </form>
//     ),
//   },
//    {
//     accessorKey: "Balance Due",
//     header: "Balance Due",
//     cell: ({ row }) => {
   
//       <div className="cursor-pointer text-blue-600 hover:underline" >
//        {row.original.id}
//       </div>
//     },
//   },
// ];

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

const  InvoiceListView = () => {
  const [data, setData] = useState(dataSample);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
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

const dispatch = useDispatch();


    const { data: Data, loading, error, fetched } = useSelector((state) => state.invoices.all);
    console.log("invoices", Data)
  
      useEffect(() => {
          if (!fetched) {
              dispatch(fetchInvoices());
          }
      }, [fetched, dispatch]);

      function handleDelete() {
        if (idToDelete !== "") {
          setDeleteLoading(true);
          deleteInvoice(idToDelete)
            .then((res) => {
              const count = res?.invoice?.[0]?.invoices?.DELETED_ROWS_COUNT;
              console.log("count",count)
      
              if (res.success && count > 0) {
                dispatch(deleteInvoiceFromList(idToDelete));
                toast.success("invoice deleted successfully");
              } else {
                toast.error("invoice not deleted");
              }
            })
            .catch((err) => {
              console.error(err);
              toast.error(err?.response?.data?.message || "Failed to delete invoice");
            })
            .finally(() => {
              setDeleteLoading(false);
              setOpenAlert(false);
            });
        }
      }

  const dataIds = useMemo(() => data?.map(({ id }) => id) || [], [data]);

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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
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
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        className="cursor-pointer text-blue-600 hover:underline"
        onClick={() => navigate(`/finance/invoice/detail/${row.original.ROWID}`, { state: row.original })}
      >
        {row.original.invoiceDate}
      </div>
    );
    },
    enableHiding: false,
  },
  {
    accessorKey: "Invoice",
    header: "Invoice#",
    cell: ({ row }) => {
      const isAssigned = row.original.email === "";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <>
        <div>
          {row.original.invoice}
        </div>


        </>
      );
    },
  },
  {
    accessorKey: "Order Number",
    header: "Order Number",
    cell: ({ row }) => (
      <div className="w-45">
         {row.original.orderNumber}
      </div>
    ),
  },
  {
    accessorKey: "Customer Name",
    header: "Customer Name",
    cell: ({ row }) => (
<div>
  {row.original.customerName}
</div>
    ),
  },
  {
    accessorKey: "Order Status",
    header: () => <div className="w-full text-left">Status</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          
        </Label>
        {/* <Select 
          defaultValue={row.original.source}
          onValueChange={(value) => {
            row.original.source = value;
            row.original.target = value;
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
<div>
  {row.original.status}
</div>
          </SelectContent>
        </Select> */}
        <div className="w-full  mx-6 ">
            <div
            title={row.original.status}
    className={`w-2 h-2 rounded-full text-white flex items-center justify-center text-sm font-semibold ${
      row.original.status === "Done" ? "bg-green-500" : row.original.status === "In Process" ? "bg-blue-500" : "bg-gray-500"
    }`}>
    </div>

        </div>

      </form>
    ),
  },
  {
    accessorKey: "Due date",
    header: "Due Date",
    cell: ({ row }) => {
    const { date } = row.original;
    return (
      <div
      >
        {row.original.dueDate}
      </div>
    );
    },
    enableHiding: false,
  },

  {
    accessorKey: "Amount",
    header: () => <div className="w-full text-center">Amount</div>,
    cell: ({ row }) => (
      <form
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
          Skype ID
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-35 border-transparent bg-transparent text-center shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.total}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  },
  {
    accessorKey: "Balance Due",
    header: () => <div className="w-full text-center">Balance Due</div>,
    cell: ({ row }) => (
      <form
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
          balance due
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-35 border-transparent bg-transparent text-center shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.subTotal}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  },
];
  const table = useReactTable({
    data: Data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.ROWID.toString(),
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


      if(loading) return <TableSkeleton/>;
  return (

  <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6" >
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-1 lg:px-1">
        <Label htmlFor="view-selector" className="sr-only">
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
          {/* <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent> */}
        </Select>
        <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          {/* <TabsTrigger value="past-performance">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger> */}
        </TabsList>
        <div className="flex items-right gap-2">
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
          <Button variant="outline" size="sm" onClick={()=>navigate('/finance/invoice/create')}>
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
                        <TableHead key={header.id} colSpan={header.colSpan} className= "text-left">
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
    </Tabs>

    <TableDataDeleteAlert
        loading={deleteLoading}
        handleDelete={handleDelete}
        open={openAlert}
        setOpen={setOpenAlert}
    />
    </div>
  );
};

export default InvoiceListView;
