export default function HeadlineAnswers({ newsItem }) {
  return (
    <div>
      <h1 className="font-bold">Headline Answers</h1>

      <ul>
        {newsItem.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
