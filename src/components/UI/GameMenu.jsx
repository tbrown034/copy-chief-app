import React, { useState, useEffect, useMemo } from "react";

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
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 2;

  useEffect(() => {
    let wordIdCounter = 0; // Persistent counter across component re-renders
    const fetchHeadlines = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        const fetchedNewsItems = data.results.slice(0, numOfNewsArticles);
        setNewsItems(fetchedNewsItems);
        const words = processHeadlines(fetchedNewsItems, wordIdCounter);
        setAvailableWords(words);
        setLoading(false);
      } catch (error) {
        console.error("Fetch operation error: ", error);
        setError(`Failed to load headlines: ${error.message}`);
        setLoading(false);
      }
    };
    fetchHeadlines();
  }, [API_KEY]);

  const processHeadlines = (fetchedNewsItems, wordIdCounter) => {
    return fetchedNewsItems.flatMap((item) =>
      item.title.split(/\s+/).map((word) => ({
        text: word,
        id: `word-${wordIdCounter++}`, // Unique ID for each word
      }))
    );
  };

  const usedWords = useMemo(() => {
    const used = new Set();
    Object.values(wordPlacements).forEach((headline) => {
      headline.forEach((word) => {
        if (word !== null) {
          used.add(word.id); // Use word.id instead of word
        }
      });
    });
    return used;
  }, [wordPlacements]);

  const handleWordDrop = (droppedWord, newHeadlineIndex, newWordIndex) => {
    setWordPlacements((prev) => {
      const newPlacements = { ...prev };

      // Clear the original position of the word
      Object.keys(newPlacements).forEach((headlineIdx) => {
        const idx = newPlacements[headlineIdx].findIndex(
          (word) => word?.id === droppedWord.id
        );
        if (idx !== -1) {
          newPlacements[headlineIdx][idx] = null;
        }
      });

      // Place the word in the new spot
      if (!newPlacements[newHeadlineIndex]) {
        newPlacements[newHeadlineIndex] = Array(
          newsItems[newHeadlineIndex].title.split(" ").length
        ).fill(null);
      }
      newPlacements[newHeadlineIndex][newWordIndex] = droppedWord;

      return newPlacements;
    });
  };

  // Clear words from one headline
  const clearOneHeadline = (headlineIndex) => {
    setWordPlacements((prev) => {
      const newPlacements = { ...prev };
      newPlacements[headlineIndex] = Array(
        newsItems[headlineIndex].title.split(" ").length
      ).fill(null);
      return newPlacements;
    });
  };

  // Clear words from all headlines
  const clearAllHeadlines = () => {
    setWordPlacements((prev) => {
      const newPlacements = {};
      Object.keys(prev).forEach((headlineIndex) => {
        newPlacements[headlineIndex] = Array(
          newsItems[headlineIndex].title.split(" ").length
        ).fill(null);
      });
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
            <HeadlineGuesses
              newsItems={newsItems}
              handleWordDrop={handleWordDrop}
              wordPlacements={wordPlacements}
              clearOneHeadline={clearOneHeadline}
              clearAllHeadlines={clearAllHeadlines}
            />
            <HeadlineOptions
              availableWords={availableWords}
              setAvailableWords={setAvailableWords}
              usedWords={usedWords}
            />
            {/* <HeadlineAnswers
              newsItems={newsItems}
              handleWordDrop={handleWordDrop}
            /> */}
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
