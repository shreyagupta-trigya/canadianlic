import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSortable } from "@dnd-kit/sortable";
import { IconCircleCheckFilled, IconCircleX, IconCircleXFilled, IconDotsVertical, IconGripVertical, IconLoader } from "@tabler/icons-react";
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DragHandle } from "./TableComponents";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export const getProjectColumns = (navigate) => [
    {
        id: "drag",
        header: () => <div className=" w-[50px]"></div>,
        cell: ({ row }) => (
            <div className="">
                <DragHandle id={row.original.id} />
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="sticky left-10 z-10">
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
                        <DropdownMenuItem>Print</DropdownMenuItem>
                        {/* <DropdownMenuItem  onSelect={()=>navigate(`/crm/deals/details/${row.original.id}`)} >Detail View</DropdownMenuItem> */}
                        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const fullId = row.original.id;
            const truncated = fullId.length > 6 ? fullId.slice(0, 28) + "..." : fullId;
            return <p >{truncated}</p>
        },
        enableHiding: false,
    },
    {
        accessorKey: "projectName",
        header: "Project Name",
        cell: ({ row }) => {
            const fullName = row.original.projectName;
            const truncated = fullName.length > 28 ? fullName.slice(0, 28) + "..." : fullName;

            return (
                <Button
                    onClick={()=>navigate(`/projects-tracker/tasks/${row.original.id}`)}
                    variant="link"
                    className="text-foreground max-w-[220px] px-0 text-left cursor-pointer"
                    title={fullName} // show full name on hover
                >
                    {truncated}
                </Button>
            );
        },
        enableHiding: false,
    },
    {
        accessorKey: "progress",
        header: "Progress %",
        cell: ({ row }) => (
            <p>{row.original.progress}%</p>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="flex justify-center items-center py-2 bg-green-200 dark:bg-green-800 rounded-sm w-28" >
                {row.original.status}
            </div>
        ),
    },
    // {
    //     accessorKey: "owner",
    //     header: "Owner",
    //     cell: ({ row }) => (
    //         <Badge variant="outline" className="text-muted-foreground px-1.5">
    //             {row.original.status === "Delivered" ? (
    //                 <>
    //                     <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" /> {row.original.status}
    //                 </>
    //             ) : row.original.status == "Shipped" ? <>
    //                 <IconCircleCheckFilled className="fill-yellow-500 dark:fill-yellow-400" /> {row.original.status}
    //             </> : row.original.status == "Ordered" ? <>
    //                 <IconCircleCheckFilled className="fill-blue-500 dark:fill-blue-400" /> {row.original.status}
    //             </> : row.original.status == "Cancelled" ? <>
    //                 <IconCircleXFilled className="fill-red-500 dark:fill-red-400" /> {row.original.status}
    //             </> : (
    //                 <IconLoader />
    //             )}
    //         </Badge>
    //     ),
    // },
    {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => (
            <p className="font-semibold" >{row.original.owner}</p>
        ),
    },
    {
        accessorKey: "tasks",
        header: "Total Tasks",
        cell: ({ row }) => (
            <p >{row.original.tasks}</p>
        ),
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
            <div className="w-[200px]">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {row.original.startDate ? format(row.original.startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={row.original.startDate}
                            // onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

        )
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => (
            <div className="w-[200px]">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {row.original.endDate ? format(row.original.endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={row.original.endDate}
                            // onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        )
    },
];