import { Button } from "antd";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

import QuizEntry from "./QuizEntry";
import QuizHeader from "./QuizHeader";
import QuizProgress from "./QuizProgress";
import type { QuizEntryProps } from "../types/Quiz";

export const QUESTION_COUNT: number = 10;

export default function Quiz({
  quiz,
  onQuit,
}: {
  quiz: QuizEntryProps[];
  onQuit: (difficulty: string) => void;
}) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [answers, setAnswers] = useState<boolean[]>([]);

  const [score, setScore] = useState<number>(0);

  const onNextQuestion = () => {
    setSelectedAnswer(undefined);

    setActiveStep((prev) => prev + 1);
  };

  const handleQuit = () => {
    onQuit(quiz[0].difficulty);
  };

  const checkAnswer = (answer: string, answerState: string | undefined) => {
    setSelectedAnswer(answer);

    if (answerState === "correct") {
      setScore((score) => score + 1);
    }

    setAnswers((answers) => {
      return [...answers, answerState === "correct" ? true : false];
    });
  };

  const renderEndScreen = () => {
    let correctAnswers = 0;

    answers.map((answer: boolean) => {
      if (answer) {
        correctAnswers += 1;
      }
    });

    const scorePercentage = score / QUESTION_COUNT;

    return (
      <>
        <QuizHeader score={score} activeStep={activeStep} quiz={quiz} />
        <div className="w-full h-full rounded-lg flex flex-col justify-start items-center">
          <div className="bg-slate-600 border-2 border-slate-500 w-[80%] mb-4 p-4 rounded-md">
            <h4 className="text-2xl text-center mb-2">
              You scored {correctAnswers} / {quiz.length}
            </h4>

            <p className="text-md! text-center mb-0!">
              {scorePercentage > 5 ? (
                <>
                  Congratulations! You have{" "}
                  <span className="text-green-600">passed</span>
                </>
              ) : (
                <>
                  Oh no! You have <span className="text-red-600">failed</span>
                </>
              )}{" "}
              the test with {scorePercentage}%.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-[80%] mb-4 text-sm">
            <div className=" p-2 bg-green-600 border-2 rounded-md border-green-500 w-full">
              <span className="font-black block text-2xl">{score}</span>
              <span className="text-">Correct Answers</span>
            </div>
            <div className="px-4 py-2 bg-red-600 border-2 border-red-500 rounded-md">
              <span className="font-black block text-2xl">
                {QUESTION_COUNT - score}
              </span>
              <span className="text-xs">Wrong Answers</span>
            </div>
          </div>
          <Button
            className="px-4 py-5! text-xl! w-[80%] uppercase font-black! border-2! border-sky-500! bg-sky-600! hover:bg-sky-800! text-quiz-base-content!"
            variant="solid"
            color="primary"
            onClick={handleQuit}
          >
            Restart
          </Button>
        </div>
      </>
    );
  };

  if (activeStep === quiz.length) {
    return renderEndScreen();
  }

  // return renderEndScreen();

  return (
    <div className="flex flex-col w-full h-full rounded-2xl">
      <QuizHeader score={score} activeStep={activeStep} quiz={quiz} />
      <QuizProgress activeStep={activeStep} totalSteps={quiz.length} />

      <div className="flex mt-2 flex-col flex-wrap h-full">
        <div className=" overflow-hidden mx-auto">
          <AnimatePresence mode="wait">
            <QuizEntry
              key={quiz[activeStep].question}
              entry={quiz[activeStep]}
              step={activeStep}
              onSelectAnswer={checkAnswer}
            />
          </AnimatePresence>
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-col">
          <hr className="border-b-2 border-black my-4 w-[80%] shrink mx-auto" />
          <div className="mb-8 footer w-[80%] mx-auto box-content shrink flex justify-between gap-4">
            <Button
              variant="solid"
              className="w-[30%] px-4! py-5! flex-none text-quiz-error-content! bg-quiz-error! border-0!"
              onClick={handleQuit}
            >
              <span className="block text-xl! uppercase font-black!">Quit</span>
            </Button>
            <Button
              variant="solid"
              className="flex-1 w-[70%] px-4 py-5! text-xl! uppercase font-black! border-0! bg-quiz-accent! text-quiz-accent-content! disabled:bg-quiz-neutral! disabled:text-quiz-base-300! disabled:opacity-50"
              disabled={!selectedAnswer}
              onClick={onNextQuestion}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
