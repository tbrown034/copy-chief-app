import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DropZone = ({ onDrop, index, currentWord }) => {
  const [{ isOverDrop }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOverDrop: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { type: "word", index, word: currentWord },
    canDrag: currentWord != null,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dropZoneRef = (el) => {
    drag(el);
    drop(el);
  };

  let classNames =
    "flex items-center justify-center w-16 h-10 text-sm font-bold bg-white border-2 border-sky-900";
  if (isOverDrop) {
    classNames += " bg-sky-200"; // Highlight drop zone when word is over it
  }
  if (isDragging) {
    classNames += " opacity-50"; // Change opacity when dragging
  }

  return (
    <div ref={dropZoneRef} className={classNames}>
      {currentWord && <div>{currentWord.id}</div>}
    </div>
  );
};

export default DropZone;
