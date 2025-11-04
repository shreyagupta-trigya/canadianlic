import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { flexRender } from "@tanstack/react-table";

export function DraggableRow({ row }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    });

    function getStickyClass(columnId) {
        switch (columnId) {
            case "drag":
                return "lg:sticky  left-0 z-30 bg-background";
            case "actions":
                return "lg:sticky left-[67.8px] z-10 bg-background";
            case "id":
                return "lg:sticky left-[117.5px] z-10 bg-background";
            case "projectName":
                return "lg:sticky left-[183px] z-10 bg-background";
            default:
                return "";
        }
    }


    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0  data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 "
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {/* {row.getVisibleCells().map((cell) => (
                <TableCell className={'border sticky'} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))} */}
            {row.getVisibleCells().map((cell, idx) => (
                <TableCell 
                    // className={cn(
                    //     "border",
                    //     idx === 0 && "sticky left-[-0.5px] z-20 bg-background shadow-md", // 👈 drag column sticky
                    // )}
                    className={cn("border", getStickyClass(cell.column.id))}
                    key={cell.id}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}

        </TableRow>
    );
}

export function DragHandle({ id }) {
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