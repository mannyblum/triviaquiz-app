import { decode } from "html-entities";
import type { QuizEntryProps } from "../types/Quiz";

export default function QuizHeader({
  quiz,
  activeStep,
  score,
}: {
  quiz: QuizEntryProps[];
  activeStep: number;
  score: number;
}) {
  const category = () => {
    if (activeStep < quiz.length) {
      return decode(quiz[activeStep].category);
    } else {
      return decode(quiz[activeStep - 1].category);
    }
  };
  const difficulty = () => {
    if (activeStep < quiz.length) {
      return quiz[activeStep].difficulty;
    } else {
      return quiz[activeStep - 1].difficulty;
    }
  };

  return (
    <div className="pt-8 mb-4">
      <div className=" mb-4 text-xs quiz-meta w-[80%] mx-auto flex justify-between">
        <div>{category()}</div>
      </div>
      <div className="text-xs  quiz-meta w-[80%] mx-auto flex justify-between items-center">
        <div>
          Difficulty:{" "}
          <span className="font-black capitalize">{difficulty()}</span>
        </div>
        <div className="flex-1"></div>
        <div>
          {activeStep + 1} of {quiz.length}
        </div>
        <div className="ml-2 rounded-sm p-1 px-2 bg-slate-200/50 text-black">
          Score: {score}
        </div>
      </div>
    </div>
  );
}
