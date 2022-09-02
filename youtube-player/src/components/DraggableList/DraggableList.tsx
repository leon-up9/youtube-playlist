import * as React from "react";
import DraggableListItem from "./DraggableListItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface DraggableListProps<T> {
  items: T[];
  onDragEnd: (newOrdered: T[]) => void;
  children: (item: T) => React.ReactNode;
}

const DraggableList = <T extends object & { id: string }>({
  items,
  onDragEnd,
  children,
}: DraggableListProps<T>): JSX.Element => {
  const reorder = <T,>(
    list: Iterable<T> | ArrayLike<T>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const _onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    onDragEnd(newItems);
  };

  return (
    <DragDropContext onDragEnd={_onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <DraggableListItem key={item.id} item={item} index={index}>
                {(item) => <>{children(item)}</>}
              </DraggableListItem>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default React.memo(DraggableList);
