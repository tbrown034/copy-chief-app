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

          <div>
            <button
              onClick={() => clearOneHeadline(index)}
              className="p-2 text-sm bg-white border-2 border-sky-800 hover:bg-sky-100 active:bg-sky-200 rounded-xl"
            >
              Clear
            </button>
            <button className="p-2 text-sm text-white border-2 bg-sky-800 border-sky-50 hover:bg-sky-700 active:bg-sky-600 active-sky-600 rounded-xl">
              Submit
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          onClick={clearAllHeadlines}
          className="p-2 text-sm bg-white border-2 border-sky-800 hover:bg-sky-100 active:bg-sky-200 rounded-xl"
        >
          Clear All Headlines
        </button>
      </div>
    </div>
  );
}
