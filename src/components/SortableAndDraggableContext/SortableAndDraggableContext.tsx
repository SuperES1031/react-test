import { FC, ReactNode } from "react";

import styles from "./sortable-and-draggable-context.module.css";

import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";

type SortableAndDraggableContextProps = {
  id: string | number;
  children: ReactNode;
  preventListeners?: boolean;
};

const SortableAndDraggableContext: FC<SortableAndDraggableContextProps> = ({ id, children, preventListeners = false }) => {
  const {
    setNodeRef: sortableRef, 
    attributes: sortableAttributes, 
    listeners: sortableListeners,
    transform: sortableTransform,
    isDragging: sortableIsDragging,
  } = useSortable({ id, data: { type: "sortable" } });

  const {
    setNodeRef: draggableRef,
    attributes: draggableAttributes, 
    listeners: draggableListeners, 
    transform: draggableTransform,
    isDragging: draggableIsDragging,
  } = useDraggable({ id });

  const isDraggableListeners = preventListeners ? {} : draggableListeners;
  const isSortableListeners = preventListeners ? {} : sortableListeners;

  return (
    <div
      className={styles["main-wrapper"]}
      ref={draggableRef}
      {...draggableAttributes}
      {...isDraggableListeners}
      style={{ 
        transform: draggableTransform && !sortableTransform ? `translate3d(${(draggableTransform.x) / 16}rem, ${(draggableTransform.y) / 16}rem, 0)` : "none",
        cursor: draggableIsDragging && !sortableIsDragging ? "grabbing" : "default",
      }}
    >
      <div
        className={styles["secondary-wrapper"]}
        style={{ 
          transform: sortableTransform ? `translate3d(${(sortableTransform.x) / 16}rem, ${(sortableTransform.y) / 16}rem, 0)` : "none",
          cursor: sortableIsDragging ? "grabbing" : "default"
        }}
        ref={sortableRef}
        {...sortableAttributes}
        {...isSortableListeners}
      >
        {children}
      </div>
    </div>
  );
};

export default SortableAndDraggableContext;