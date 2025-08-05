import CategorySelector from "./CategorySelector";
import DifficultySelector from "./DifficultySelector";
import Quiz, { QUESTION_COUNT } from "./Quiz";

import { fetchEasyQuiz, fetchHardQuiz, fetchMediumQuiz } from "./queries";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { useState } from "react";

import "../css/quiz.css";

function easyQuizQueryOptions(categoryId: number) {
  return queryOptions({
    queryKey: ["easy"],
    queryFn: () => fetchEasyQuiz(categoryId),
    enabled: false,
    throwOnError: true,
  });
}

function mediumQuizQueryOptions(categoryId: number) {
  return queryOptions({
    queryKey: ["medium"],
    queryFn: () => {
      return fetchMediumQuiz(categoryId);
    },
    enabled: false,
    throwOnError: true,
  });
}
function hardQuizQueryOptions(categoryId: number) {
  return queryOptions({
    queryKey: ["hard"],
    queryFn: () => {
      return fetchHardQuiz(categoryId);
    },
    enabled: false,
    throwOnError: true,
  });
}

export default function TriviaQuizApp() {
  const queryClient = useQueryClient();

  const [selectedId, setSelectedId] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>();

  const [isQuizActive, setQuizActive] = useState<boolean>(false);

  // TODO: REFACTOR THIS LATER

  const easyQuiz = useQuery(easyQuizQueryOptions(selectedId));
  const mediumQuiz = useQuery(mediumQuizQueryOptions(selectedId));
  const hardQuiz = useQuery(hardQuizQueryOptions(selectedId));

  const fetchQuestions = () => {
    setQuizActive(true);

    if (difficulty === "easy") {
      easyQuiz.refetch();
    } else if (difficulty === "medium") {
      mediumQuiz.refetch();
    } else if (difficulty === "hard") {
      hardQuiz.refetch();
    }
  };

  const handleSelectDifficulty = (diff: string) => {
    if (diff === difficulty) {
      setDifficulty(undefined);
    } else {
      setDifficulty(diff);
    }
  };

  if (easyQuiz.isFetching || mediumQuiz.isFetching || hardQuiz.isFetching) {
    return (
      <div className="text-quiz-base-content h-full w-full bg-black p-5">
        <div className="trivia-wrapper w-[393px] h-full my-0 py-4 mx-auto bg-quiz-base-200 border-quiz-base-300 rounded-2xl flex justify-center items-center">
          <div>Loading Quiz...</div>
        </div>
      </div>
    );
  }

  const handleQuit = () => {
    queryClient.resetQueries({ queryKey: ["easy"], exact: true });
    queryClient.resetQueries({ queryKey: ["medium"], exact: true });
    queryClient.resetQueries({ queryKey: ["hard"], exact: true });
    setDifficulty(undefined);
    setQuizActive(false);
  };

  const renderQuiz = () => {
    if (
      easyQuiz.data?.results?.length === QUESTION_COUNT ||
      mediumQuiz.data?.results?.length === QUESTION_COUNT ||
      hardQuiz.data?.results?.length === QUESTION_COUNT
    ) {
      const data =
        easyQuiz.data?.results ||
        mediumQuiz.data?.results ||
        hardQuiz.data?.results;

      return <Quiz quiz={data!} onQuit={handleQuit} />;
    }

    return;
  };

  const startQuiz = () => {
    fetchQuestions();
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedId(categoryId);
  };

  return (
    <div className="flex flex-col text-quiz-base-content w-full h-screen bg-black p-5">
      <div className="trivia-wrapper w-[500px] min-h-[550px] my-0 py-8 mx-auto bg-quiz-base-200 border-quiz-base-300 rounded-2xl">
        <>
          {isQuizActive ? (
            renderQuiz()
          ) : (
            <div className="py-4">
              <CategorySelector
                onSelectCategory={handleSelectCategory}
                selectedId={selectedId}
              />
              <DifficultySelector
                difficulty={difficulty}
                onSetDifficulty={handleSelectDifficulty}
              />
              <div className="quiz-footer mx-auto w-[80%]">
                <Button
                  variant="solid"
                  disabled={!difficulty}
                  className="start-quiz-btn"
                  block
                  onClick={startQuiz}
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
