import React from "react";

export default function HeadlineGuesses({ newsItems }) {
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
              <div
                key={wordIndex}
                className="w-24 h-12 bg-sky-500 text-red-50"
                // Placeholder for the draggable word drop zones
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
