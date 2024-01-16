import HeadlineAnswers from "../Elements/HeadlineAnswers";
import HeadlineGuesses from "../Elements/HeadlineGuesses";
import HeadlineOptions from "../Elements/HeadlineOptions";
import Header from "./Header";

export default function GameMenu() {
  return (
    <div className="min-h-screen ">
      <HeadlineGuesses />
      <HeadlineOptions />
      <HeadlineAnswers />
    </div>
  );
}
