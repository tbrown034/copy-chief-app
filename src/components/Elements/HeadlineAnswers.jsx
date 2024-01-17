export default function HeadlineAnswers({ newsItems }) {
  return (
    <div>
      <h1 className="font-bold">Headline Answers</h1>

      <ul>
        {newsItems.map((item, index) => (
          <li key={index}>
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
