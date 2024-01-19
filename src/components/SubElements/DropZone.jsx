import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DropZone = ({ onDrop, onPickUp, index, currentWord }) => {
  // Drop logic
  const [{ isOverDrop }, drop] = useDrop({
    accept: "word",
    drop: (item) => {
      console.log("Item dropped in DropZone:", item);
      onDrop(item, index); // Pass the index to identify the DropZone
    },
    collect: (monitor) => ({
      isOverDrop: !!monitor.isOver(),
    }),
  });

  // Drag logic after dropping
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { type: "word", index, word: currentWord },
    canDrag: currentWord != null, // Can drag only if a word is placed
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        onPickUp(index); // Handle logic when dragged away and not dropped
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // // Styling
  // const baseStyle = {
  //   backgroundColor: isOverDrop ? "lightblue" : "lightgrey",
  //   opacity: isDragging ? 0.5 : 1, // Change opacity when dragging
  //   width: "100px",
  //   height: "50px",
  //   margin: "5px",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // };

  // Combine both drag and drop refs
  const dropZoneRef = (el) => {
    drag(el);
    drop(el);
  };

  return (
    <div
      ref={dropZoneRef}
      className="flex items-center justify-center w-24 h-10 text-sm font-bold bg-white border-2 border-sky-900 "
    >
      {currentWord} {/* Display the current word */}
    </div>
  );
};

export default DropZone;
