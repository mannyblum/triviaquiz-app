import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import classNames from "classnames";
import { decode } from "html-entities";
import { shuffle } from "lodash-es";
import { motion, type Variants } from "motion/react";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const indexToLetter = (index: number) => String.fromCharCode(97 + index);

export type QuizEntryProps = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

const slideVariants: Variants = {
  initial: {
    x: 300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeIn" },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hidden: {
    x: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function QuizEntry({
  entry,
  step,
  onSelectAnswer,
}: {
  entry: QuizEntryProps;
  step: number;
  onSelectAnswer: (
    selectedAnswer: string,
    answerState: string | undefined,
  ) => void;
}) {
  const [selected, setSelected] = useState<string>();

  const [answerState, setAnswerState] = useState<string>("");

  const answers = useMemo(() => {
    return shuffle([...entry.incorrect_answers, entry.correct_answer]);
  }, [entry]);

  const onChange = (e: RadioChangeEvent) => {
    if (selected) return;

    setSelected(e.target.value);

    let answerCheck = "wrong";

    if (e.target.value === entry.correct_answer) {
      answerCheck = "correct";
    } else if (entry.incorrect_answers.includes(e.target.value)) {
      answerCheck = "wrong";
    }

    setAnswerState(answerCheck);

    onSelectAnswer(e.target.value, answerCheck);
  };

  const stateClasses = twMerge(
    classNames({
      "is-correct": answerState === "correct",
      "is-wrong": answerState === "wrong",
    }),
  );

  const radioClass = (answer: string) => {
    if (answer === entry.correct_answer) {
      return "correct";
    } else if (entry.incorrect_answers.includes(answer)) {
      return "wrong disabled";
    }
  };

  return (
    <motion.div
      key={step}
      variants={slideVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="mx-4 px-4"
    >
      <h1 className="text-white text-2xl mb-4">
        {step + 1}. {decode(entry.question)}
      </h1>
      <Radio.Group
        className={`quiz-options ${stateClasses} ${
          selected ? "is-selected" : ""
        }`}
        value={selected}
        onChange={onChange}
      >
        {answers.map((answer, index) => {
          return (
            <Radio
              className={`${radioClass(answer)} relative`}
              key={indexToLetter(index)}
              value={answer}
            >
              {selected === answer && answerState === "wrong" ? (
                <div className="absolute -right-3 -top-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                      opacity="1"
                      stroke=""
                      fill="var(--color-red-500)"
                    ></path>
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              ) : selected === answer && answerState === "correct" ? (
                <div className="absolute -right-3 -top-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                      opacity="1"
                      fill="var(--color-green-500)"
                    ></path>
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              ) : (
                ""
              )}

              <span className="font-black uppercase mr-1">
                {indexToLetter(index)}.
              </span>
              {decode(answer)}
            </Radio>
          );
        })}
      </Radio.Group>
    </motion.div>
  );
}
