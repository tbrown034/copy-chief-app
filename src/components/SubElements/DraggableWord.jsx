// DraggableWord.jsx
import React from "react";
import { useDrag } from "react-dnd";
export default function DraggableWord({
  word,
  id,
  isDropped,
  originalHeadlineIndex,
  originalWordIndex,
}) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "word",
    item: { id, word, originalHeadlineIndex, originalWordIndex },
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

  let classes = isDropped ? "opacity-40" : "bg-gray-400 font-bold";
  if (isDragging) {
    classes += " bg-gray-300";
  }

  return (
    <div ref={dragRef} className={`p-2  rounded-lg ${classes}`}>
      {word}
    </div>
  );
}
