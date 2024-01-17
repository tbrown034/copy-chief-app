import React, { useState, useEffect } from "react";

export default function HeadlineOptions({ newsItem }) {
  const [sortedWords, setSortedWords] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Function to parse words from headlines
    const parseWords = (headline) => {
      // This regex will match words and also acronyms or sequences of characters separated by periods
      return headline.match(/\b[\w']+(?:\.\w+)*\b/g) || [];
    };

    // Combine words from all headlines
    const allWords = newsItem.flatMap((item) => parseWords(item.title));

    // Sort words
    const wordsToSort = [...allWords]; // Clone the array to avoid mutating the original state
    wordsToSort.sort();
    if (sortOrder === "desc") {
      wordsToSort.reverse();
    }
    setSortedWords(wordsToSort);
  }, [newsItem, sortOrder]);

  // Function to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">Headline Options</h1>
      <div>
        <button
          className="p-2 text-sm bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
          onClick={toggleSortOrder}
        >
          Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sortedWords.map((word, index) => (
          <div key={index} className="p-2 text-lg rounded-lg bg-sky-300">
            {word}
            {index < sortedWords.length - 1 && " "}
          </div>
        ))}
      </div>
    </div>
  );
}
