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
      <div>
        <button
          onClick={toggleSortOrder}
          className="p-2 text-sm text-white bg-sky-800 hover:bg-sky-700 active:bg-sky-600 rounded-xl"
          aria-label={`Sort words ${
            sortOrder === "asc" ? "descending" : "ascending"
          }`}
        >
          Sort {sortOrder === "asc" ? "Z-A ↓" : "A-Z ↑"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sortedWords.map((wordObj) => {
          const isUsed = usedWords.has(wordObj.id);
          return (
            <DraggableWord
              key={wordObj.id}
              id={wordObj.id}
              word={wordObj.text}
              isDropped={isUsed}
            />
          );
        })}
      </div>
    </div>
  );
}
