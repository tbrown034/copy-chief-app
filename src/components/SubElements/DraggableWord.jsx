import React from "react";
import { useDrag } from "react-dnd";

export default function DraggableWord({ word, id, isDropped }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "word",
    item: { id, word },
    canDrag: !isDropped,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        console.log("Dropped item:", item);
      }
    },
  }));

  let classes = `p-2 rounded-lg ${
    isDropped ? "opacity-40" : "bg-gray-400 font-bold"
  } ${isDragging ? "bg-gray-300" : ""}`;

  return (
    <div ref={dragRef} className={classes}>
      {word}
    </div>
  );
}
