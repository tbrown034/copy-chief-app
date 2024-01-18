import React from "react";
import DropZone from "../SubElements/DropZone";

export default function HeadlineGuesses({
  newsItems,
  handleWordDrop,
  wordPlacements,
  clearOneHeadline,
  clearAllHeadlines,
}) {
  if (!Array.isArray(newsItems) || newsItems.length === 0) {
    return <div>Loading headlines or no headlines available...</div>;
  }

  // Clear a single headline
  const handleClearOne = (index) => {
    clearOneHeadline(index);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Headline Guesses</h2>
      {newsItems.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="headline-info">
            Headline #{index + 1}: ({item.title.split(" ").length} words)
          </div>
          <div className="flex flex-wrap gap-2">
            {item.title.split(" ").map((_, wordIndex) => (
              <DropZone
                key={wordIndex}
                onDrop={(droppedWord) =>
                  handleWordDrop(droppedWord, index, wordIndex)
                }
                currentWord={wordPlacements[index]?.[wordIndex] || null}
              />
            ))}
          </div>
          <button
            onClick={() => clearOneHeadline(index)}
            className="p-2 text-sm text-white bg-red-500 hover:bg-red-400 rounded-xl"
          >
            Clear Headline
          </button>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          onClick={clearAllHeadlines}
          className="p-2 px-12 text-lg text-white bg-red-900 hover:bg-red-700 rounded-xl"
        >
          Clear All Headlines
        </button>
      </div>
    </div>
  );
}
