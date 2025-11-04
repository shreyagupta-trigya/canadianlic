import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    closestCenter,
    DragOverlay,
} from "@dnd-kit/core";
import {
    useSortable,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AddTask from "@/features/projectsTracker/components/AddTask";

const DroppableColumn = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return <div ref={setNodeRef} className="p-3 space-y-3 min-h-[200px]">{children}</div>;
};

const DraggableCard = ({ item, renderCard }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {renderCard(item, listeners, attributes)}
        </div>
    );
};

const ProjectKanban = ({ data, columns, renderCard }) => {
    const [items, setItems] = useState(data);
    const [activeId, setActiveId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [expandedTasks, setExpandedTasks] = useState([]);
    const [collapsedColumns, setCollapsedColumns] = useState([]);

    const sensors = useSensors(useSensor(PointerSensor));
    const activeItem = items.find((item) => item.id === activeId);

    const toggleSubTasks = (parentId) => {
        setExpandedTasks((prev) =>
            prev.includes(parentId)
                ? prev.filter((id) => id !== parentId)
                : [...prev, parentId]
        );
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) {
            setActiveId(null);
            return;
        }

        const activeItem = items.find((i) => i.id === active.id);
        const overColumnId = over.id;

        if (activeItem && activeItem.status !== overColumnId) {
            const updated = items.map((item) =>
                item.id === active.id ? { ...item, status: overColumnId } : item
            );
            setItems(updated);
        }

        setActiveId(null);
    };

    const handleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = (columnId) => {
        const updated = items.filter(
            (item) => !(item.status === columnId && selectedIds.includes(item.id))
        );
        setItems(updated);
        setSelectedIds((prev) =>
            prev.filter((id) =>
                !items.some((item) => item.id === id && item.status === columnId)
            )
        );
    };

    const toggleCollapse = (columnId) => {
        setCollapsedColumns((prev) =>
            prev.includes(columnId)
                ? prev.filter((id) => id !== columnId)
                : [...prev, columnId]
        );
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-1 overflow-auto">
                {columns.map((col) => {
                    const columnItems = items.filter((item) => item.status === col.id);
                    const isCollapsed = collapsedColumns.includes(col.id);
                    const selectedInColumn = columnItems.filter((item) =>
                        selectedIds.includes(item.id)
                    );

                    return (
                        <SortableContext
                            key={col.id}
                            id={col.id}
                            items={columnItems.map((i) => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div
                                className={`
                                    transition-all bg-muted rounded-lg duration-300 overflow-hidden
                                    ${isCollapsed ? "w-[15px] min-w-[55px]" : "flex-1 min-w-[250px]"}
                                `}
                            >
                                <div className="p-3 rounded-t-lg font-semibold text-gray-800 flex gap-2 items-center">
                                    <div className="items-center w-full gap-2">
                                        {isCollapsed ? (
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <div
                                                    className="rotate-180 cursor-pointer"
                                                    onClick={() => toggleCollapse(col.id)}
                                                >
                                                    <ArrowBigLeft size={16} />
                                                </div>
                                                <div className="transform -rotate-90 mt-24 text-xs text-muted-foreground whitespace-nowrap">
                                                    {col.label}
                                                </div>
                                            </div>
                                        ) : selectedInColumn.length > 0 ? (
                                            <input
                                                type="checkbox"
                                                checked={
                                                    columnItems.length > 0 &&
                                                    columnItems.every((item) => selectedIds.includes(item.id))
                                                }
                                                onChange={() => {
                                                    const columnIds = columnItems.map((i) => i.id);
                                                    const allSelected = columnIds.every((id) => selectedIds.includes(id));
                                                    setSelectedIds((prev) =>
                                                        allSelected
                                                            ? prev.filter((id) => !columnIds.includes(id))
                                                            : [...new Set([...prev, ...columnIds])]
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <div className="flex w-full text-muted-foreground justify-between">
                                                <Badge className={`px-5 py-1 ${col.color} text-white`}>
                                                    {col.label}
                                                </Badge>
                                                <Tooltip>
                                                    <TooltipTrigger asChild >
                                                        <AddTask />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Add Task</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => toggleCollapse(col.id)}
                                                >
                                                    <ArrowBigLeft size={16} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {!isCollapsed && selectedInColumn.length > 0 && (
                                        <button
                                            onClick={() => handleDeleteSelected(col.id)}
                                            className="hover:text-red-600 flex items-center gap-1"
                                            title="Delete selected"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                {!isCollapsed && (
                                    <DroppableColumn id={col.id}>
                                        {columnItems.map((item) => (
                                            <React.Fragment key={item.id}>
                                                <DraggableCard
                                                    item={item}
                                                    renderCard={(itemObj, listeners, attributes) =>
                                                        renderCard({
                                                            item,
                                                            selected: selectedIds.includes(item.id),
                                                            onSelect: handleSelect,
                                                            dragListeners: listeners,
                                                            dragAttributes: attributes,
                                                            hasSubTasks: item.subTasks?.length > 0,
                                                            isExpanded: expandedTasks.includes(item.id),
                                                            onToggleExpand: () => toggleSubTasks(item.id),
                                                            isSubTask: false,
                                                        })
                                                    }
                                                />

                                                {expandedTasks.includes(item.id) &&
                                                    item.subTasks?.map((subTask) => (
                                                        <div key={subTask.id} className="ml-5 mt-2">
                                                            <DraggableCard
                                                                item={subTask}
                                                                renderCard={(itemObj, listeners, attributes) =>
                                                                    renderCard({
                                                                        item: subTask,
                                                                        selected: selectedIds.includes(subTask.id),
                                                                        onSelect: handleSelect,
                                                                        dragListeners: listeners,
                                                                        dragAttributes: attributes,
                                                                        hasSubTasks: false,
                                                                        isExpanded: false,
                                                                        onToggleExpand: () => {},
                                                                        isSubTask: true,
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                    </DroppableColumn>
                                )}
                            </div>
                        </SortableContext>
                    );
                })}
            </div>

            <DragOverlay>
                {activeItem
                    ? renderCard({
                        item: activeItem,
                        selected: false,
                        onSelect: () => { },
                        dragListeners: {},
                        dragAttributes: {},
                        hasSubTasks: false,
                        isExpanded: false,
                        onToggleExpand: () => { },
                        isSubTask: false,
                    })
                    : null}
            </DragOverlay>
        </DndContext>
    );
};

export default ProjectKanban;