import React, { useState, useMemo } from "react";
import DraggableWord from "../SubElements/DraggableWord";

export default function HeadlineOptions({ availableWords, usedWords }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedWords = useMemo(() => {
    return [...availableWords].sort((a, b) => {
      const wordA = a.text.toLowerCase();
      const wordB = b.text.toLowerCase();
      return sortOrder === "asc"
        ? wordA.localeCompare(wordB)
        : wordB.localeCompare(wordA);
    });
  }, [availableWords, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">Headline Options</h1>
      <button
        onClick={toggleSortOrder}
        className="p-2 text-sm bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
      </button>
      <div className="flex flex-wrap gap-2">
        {sortedWords.map((wordObj, index) => {
          const isUsed = usedWords.has(wordObj.text); // Determine if the word is used
          return (
            <DraggableWord
              key={index}
              id={index}
              word={wordObj.text}
              isDropped={isUsed} // Pass isUsed as the isDropped prop
            />
          );
        })}
      </div>
    </div>
  );
}
