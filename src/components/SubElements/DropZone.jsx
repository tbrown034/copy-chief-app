import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ onDrop }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "word",
    drop: (item) => {
      onDrop(item); // Implement logic for handling the dropped item
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Style changes when a word is over the drop zone
  const style = {
    backgroundColor: isOver ? "lightblue" : "lightgrey",
    width: "100px",
    height: "50px",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div ref={dropRef} style={style}>
      {/* Display dropped word or placeholder */}
    </div>
  );
};

export default DropZone;
