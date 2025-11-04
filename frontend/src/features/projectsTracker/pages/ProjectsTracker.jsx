import { FormHeading, FormSubHeading } from '@/components/custom/CustomFormComponents'
import KanbanView from '@/components/KanbanView';
import React, { useId, useMemo, useState } from 'react'
import PackageCard from '../../Packages/PackageCard/PackageCard';
import ProjectKanban from '@/components/custom/ProjectKanban';
import ProjectCard from '@/components/custom/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { closestCenter, DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { getProjectColumns } from '../components/Columns';
import { flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconLayoutColumns, IconPlus } from '@tabler/icons-react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableRow } from '../components/TableComponents';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { cn } from '@/lib/utils';
import ProjectsTrackerForm from './ProjectsTrackerForm';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ProjectsTracker = () => {
    const packageData = [
        {
            "id": "PKG-06432",
            // "img": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
            "status": "fixtures",
            "company": "BOYS ELECTRICAL CO.",
            "amount": "115000.00",
            "salesOrder": "SO-25-6465",
            "method": "—",
            "date": "30 Jun 2025"
        },
        {
            "id": "PKG-06440",
            "status": "fixtures",
            "company": "Logistics Co.",
            "amount": "1200.00",
            "salesOrder": "SO-25-7777",
            "method": "Courier",
            "date": "02 Jul 2025"
        }
    ]

    const TaskLabels = [
        {
            id: "fixtures",
            label: "Fixtures/Material",
            color: "bg-gray-500",
        },
        {
            id: "reject",
            label: "Reject",
            color: "bg-red-500",
        },
        {
            id: "approve",
            label: "Approve",
            color: "bg-green-500",
        },
        {
            id: "ordered",
            label: "Ordered",
            color: "bg-blue-500",
        },
    ];
    const dataSample = [
        {
            id: 'ID6352',
            projectName: 'Nation Electrical Contractors, LLC',
            progress: 0,
            status: 'Active',
            owner: 'James Conner',
            tasks: 20,
            startDate: "09-09-2025",
            endDate: "03-12-2025",
        },
        {
            id: 'ID4543',
            projectName: 'ION Lighntining Suppliers, PVT LTD',
            progress: 12,
            status: 'Active',
            owner: 'James Conner',
            tasks: 30,
            startDate: "02-04-2025",
            endDate: "03-07-2025",
        }
    ];

    const [data, setData] = useState(dataSample);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const navigate = useNavigate();
    const sortableId = useId();
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    );
    const dataIds = useMemo(() => data?.map(({ id }) => id) || [], [data]);
    const columns = getProjectColumns(navigate);
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

    function getStickyClass(columnId) {
        switch (columnId) {
            case "drag":
                return "lg:sticky left-0 z-30 lg:bg-background";
            case "actions":
                return "lg:sticky left-[67.8px] z-10 lg:bg-background";
            case "id":
                return "lg:sticky left-[117.5px] z-10 lg:bg-background";
            case "projectName":
                return "lg:sticky left-[183px] z-10 lg:bg-background";
            default:
                return "";
        }
    }

    return (
        <>
            <div className=' mx-4' >
                <FormHeading>Projects Tracker</FormHeading>
                {/* <div className='border rounded-xl my-3 h-14' >

                </div> */}
                <div className='flex flex-col gap-4' >
                    {/* <ProjectKanban
                        data={packageData}
                        columns={columns}
                        renderCard={({ item, selected, onSelect, dragListeners, dragAttributes }) => (
                            <ProjectCard
                                item={item}
                                selected={selected}
                                onSelect={onSelect}
                                dragListeners={dragListeners}
                                dragAttributes={dragAttributes}
                            />
                        )}
                    /> */}
                    <div className='flex justify-between mt-4' >
                        <div>
                            <FormSubHeading>All Projects</FormSubHeading>
                        </div>
                        <div className="flex justify-end items-right gap-2 ">
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
                            {/* <Button
                                variant="outline"
                                size="sm"
                            onClick={() => navigate("/crm/accounts/create")}
                            >
                                <IconPlus />
                                <span className="hidden lg:inline">Create Project</span>
                            </Button> */}
                            <ProjectsTrackerForm />
                        </div>
                    </div>
                    <ScrollArea className="overflow-x-auto  rounded-lg border">
                        <DndContext
                            collisionDetection={closestCenter}
                            modifiers={[restrictToVerticalAxis]}
                            onDragEnd={handleDragEnd}
                            sensors={sensors}
                            id={sortableId}
                        >
                            
                            <Table className={'border-separate border-spacing-0'} >
                                <TableHeader className="sticky top-0 z-10">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                const columnId = header.column.id;
                                                const stickyClass = getStickyClass(columnId); // 🔥
                                                return (
                                                    <TableHead
                                                        className={cn("border", stickyClass)} // 💡 add sticky class here
                                                        key={header.id} colSpan={header.colSpan}>
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
                         <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="flex items-center justify-between px-4">
                        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                            {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
                            {/* {table.getFilteredRowModel().rows.length} row(s) selected. */}
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
                </div>
            </div>
        </>
    )
}

export default ProjectsTracker