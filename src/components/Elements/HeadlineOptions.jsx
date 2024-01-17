import React, { useState, useMemo } from "react";

export default function HeadlineOptions({ availableWords }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedWords = useMemo(() => {
    return [...availableWords].sort((a, b) => {
      const wordA = a.text.toLowerCase();
      const wordB = b.text.toLowerCase();
      if (sortOrder === "asc") {
        return wordA.localeCompare(wordB);
      } else {
        return wordB.localeCompare(wordA);
      }
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
        {sortedWords.map((word, index) => (
          <div key={index} className="p-2 text-lg rounded-lg bg-sky-300">
            {word.text}
          </div>
        ))}
      </div>
    </div>
  );
}
