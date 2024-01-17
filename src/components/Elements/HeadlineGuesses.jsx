import React from "react";
import DropZone from "../SubElements/DropZone";

export default function HeadlineGuesses({ newsItems, handleWordDrop }) {
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
            // Inside HeadlineGuesses component render method
            {item.title.split(" ").map((_, wordIndex) => (
              <DropZone
                key={wordIndex}
                onDrop={(droppedWord) =>
                  handleWordDrop(droppedWord, index, wordIndex)
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
