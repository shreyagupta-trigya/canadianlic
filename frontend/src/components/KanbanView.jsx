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
import { useState } from "react";
import { Trash2 } from "lucide-react";

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="p-3 space-y-3 min-h-[200px]">
      {children}
    </div>
  );
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

const KanbanView = ({ data, columns, renderCard }) => {
  const [items, setItems] = useState(data);
  const [activeId, setActiveId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor));
  const activeItem = items.find((item) => item.id === activeId);

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
      prev.filter(
        (id) =>
          !items.some((item) => item.id === id && item.status === columnId)
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const columnItems = items.filter((item) => item.status === col.id);
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
              <div className="rounded-lg border bg-muted shadow-sm min-h-[300px]">
                <div
                  className={`${col.color} p-3 rounded-t-lg font-bold text-gray-800 flex gap-2 items-center`}
                >
                  {/* Left side of header */}
                  <div className="flex items-center gap-2">
                    {selectedInColumn.length > 0 ? (
                      // When cards are selected: show checkbox, hide label
                      <input
                        type="checkbox"
                        checked={
                          columnItems.length > 0 &&
                          columnItems.every((item) =>
                            selectedIds.includes(item.id)
                          )
                        }
                        onChange={() => {
                          const columnIds = columnItems.map((i) => i.id);
                          const allSelected = columnIds.every((id) =>
                            selectedIds.includes(id)
                          );

                          if (allSelected) {
                            setSelectedIds((prev) =>
                              prev.filter((id) => !columnIds.includes(id))
                            );
                          } else {
                            setSelectedIds((prev) => [
                              ...new Set([...prev, ...columnIds]),
                            ]);
                          }
                        }}
                      />
                    ) : (
                      // No selection: show column label
                      <span>{col.label}</span>
                    )}
                  </div>

                  {/* Right side: trash button only if selection exists */}
                  {selectedInColumn.length > 0 && (
                    <button
                      onClick={() => handleDeleteSelected(col.id)}
                      className="hover:text-red-600 flex items-center gap-1"
                      title="Delete selected"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <DroppableColumn id={col.id}>
                  {columnItems.map((item) => (
                    <DraggableCard
                      key={item.id}
                      item={item}
                      renderCard={(itemObj, listeners, attributes) =>
                        renderCard({
                          item,
                          selected: selectedIds.includes(item.id),
                          onSelect: handleSelect,
                          dragListeners: listeners,
                          dragAttributes: attributes,
                        })
                      }
                    />
                  ))}
                </DroppableColumn>
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
              onSelect: () => {},
              dragListeners: {},
              dragAttributes: {},
            })
          : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanView;
