// src/utils/headlineUtils.js
export const fetchHeadlines = async (
  API_KEY,
  numOfNewsArticles,
  setNewsItems,
  setAvailableWords,
  setLoading,
  setError
) => {
  let wordIdCounter = 0;
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

export const processHeadlines = (fetchedNewsItems, wordIdCounter) => {
  return fetchedNewsItems.flatMap((item) =>
    item.title.split(/\s+/).map((word) => ({
      text: word,
      id: `word-${wordIdCounter++}`, // Unique ID for each word
    }))
  );
};
