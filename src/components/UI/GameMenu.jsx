import { useState, useEffect } from "react";
import HeadlineAnswers from "../Elements/HeadlineAnswers";
import HeadlineGuesses from "../Elements/HeadlineGuesses";
import HeadlineOptions from "../Elements/HeadlineOptions";
import Header from "./Header";

export default function GameMenu({ backToMenu }) {
  const [newsItem, setNewsItem] = useState([]);
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
        setNewsItem(data.results.slice(0, numOfNewsArticles));
      } catch (error) {
        console.error("There was a problem with the fetch operation", error);
        setError("Failed to load headlines");
      }
    };
    fetchHeadlines();
  }, []);

  return error ? (
    <div>Error: {error}</div>
  ) : !newsItem.length ? (
    <div>Loading headlines...</div>
  ) : (
    <div className="min-h-screen ">
      <Header />
      <div className="flex flex-col gap-2">
        <HeadlineGuesses />
        <HeadlineOptions newsItem={newsItem} />
        <HeadlineAnswers newsItem={newsItem} />
        <div className="flex justify-center">
          <button
            onClick={backToMenu}
            className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
