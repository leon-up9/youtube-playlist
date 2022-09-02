import * as React from "react";
import { ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";

// export type DraggableListItemProps = {
//   item: any;
//   index: number;
//   children: (item: any) => ReactNode;
// };

interface DraggableListItemProps<T> {
  item: T;
  index: number;
  children: (item: T) => ReactNode;
}

const DraggableListItem = <T extends { id: string }>({
  item,
  index,
  children,
}: DraggableListItemProps<T>) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children(item)}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
