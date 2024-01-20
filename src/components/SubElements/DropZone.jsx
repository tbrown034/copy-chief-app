import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DropZone = ({ onDrop, currentWord }) => {
  const [{ isOverDrop }, drop] = useDrop({
    accept: "word",
    drop: (item, monitor) => {
      // Check if the item has 'currentWord' property and use it if available
      const wordToDrop = item.currentWord ? item.currentWord : item;
      onDrop(wordToDrop);
    },
    collect: (monitor) => ({
      isOverDrop: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: () => {
      // Ensure the structure of the item is consistent
      return { type: "word", id: currentWord.id, word: currentWord.word };
    },
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
      {currentWord &&
      typeof currentWord === "object" &&
      "word" in currentWord ? (
        <span>{currentWord.word}</span>
      ) : null}
    </div>
  );
};

export default DropZone;
