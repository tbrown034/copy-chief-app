export default function HeadlineGuesses({ newsItem }) {
  // Check if newsItem is defined and is an array
  if (!Array.isArray(newsItem)) {
    return <div>Loading headlines or no headlines available...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Headline Guesses</h2>
      {newsItem.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="headline-info">
            Headline #{index + 1}: ({item.title.split(" ").length} words)
          </div>
          <div className="flex flex-wrap gap-2">
            {item.title.split(" ").map((_, wordIndex) => (
              <div
                key={wordIndex}
                className="w-24 h-12 bg-sky-500 text-red-50"
              ></div>
            ))}
          </div>
          <div>
            <button className="p-2 text-sm bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl">
              Sumbit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
