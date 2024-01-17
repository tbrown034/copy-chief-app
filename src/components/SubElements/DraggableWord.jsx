// DraggableWord.jsx
export default function DraggableWord({ word, id, isDropped }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "word",
    item: { id, word },
    canDrag: !isDropped, // Can drag only if not dropped
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  let classes = isDropped ? "bg-gray-400" : "bg-blue-200";
  if (isDragging) {
    classes += " bg-red-400";
  }

  return (
    <div ref={dragRef} className={`p-2 text-lg rounded-xl ${classes}`}>
      {word}
    </div>
  );
}
