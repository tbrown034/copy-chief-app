import React, { useState, useEffect } from "react";
import HeadlineAnswers from "../Elements/HeadlineAnswers";
import HeadlineGuesses from "../Elements/HeadlineGuesses";
import HeadlineOptions from "../Elements/HeadlineOptions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./Header";

export default function GameMenu({ backToMenu }) {
  const [newsItems, setNewsItems] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [wordPlacements, setWordPlacements] = useState({});
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 2;

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const fetchedNewsItems = data.results.slice(0, numOfNewsArticles);
        setNewsItems(fetchedNewsItems);
        const words = processHeadlines(fetchedNewsItems);
        setAvailableWords(words);
      } catch (error) {
        console.error("There was a problem with the fetch operation", error);
        setError("Failed to load headlines");
      }
    };
    fetchHeadlines();
  }, []);

  const processHeadlines = (fetchedNewsItems) => {
    return fetchedNewsItems.flatMap((item) =>
      item.title.split(/\s+/).map((word) => ({ text: word }))
    );
  };

  const handleWordDrop = (droppedWord, headlineIndex, wordIndex) => {
    console.log(
      "Dropped word:",
      droppedWord.text,
      "at headline:",
      headlineIndex,
      "word index:",
      wordIndex
    );

    setWordPlacements((prev) => {
      const newPlacements = { ...prev };
      if (!newPlacements[headlineIndex]) {
        newPlacements[headlineIndex] = Array(
          newsItems[headlineIndex].title.split(" ").length
        ).fill(null);
      }

      // Update this line to use droppedWord.word
      newPlacements[headlineIndex][wordIndex] = droppedWord.word;

      console.log("New word placements:", newPlacements);

      return newPlacements;
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      {error ? (
        <div>Error: {error}</div>
      ) : !newsItems.length ? (
        <div>Loading headlines...</div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col gap-2">
            <HeadlineOptions
              availableWords={availableWords}
              setAvailableWords={setAvailableWords}
            />
            <HeadlineGuesses
              newsItems={newsItems}
              handleWordDrop={handleWordDrop}
              wordPlacements={wordPlacements}
            />
            <HeadlineAnswers
              newsItems={newsItems}
              handleWordDrop={handleWordDrop}
            />
            <div className="flex justify-center">
              <button
                onClick={backToMenu}
                className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
              >
                Back
              </button>
            </div>
          </div>
        </DndProvider>
      )}
    </div>
  );
}
