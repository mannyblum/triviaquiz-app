import type { CategoriesResponse, QuizResponse } from "../types/Quiz";

import { QUESTION_COUNT } from "./Quiz";

interface FetchError extends Error {
  name: string;
  status: number;
}

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch("https://opentdb.com/api_category.php");

  if (!response.ok) {
    const error = new Error("Error Fetching Categories");
    (error as FetchError).status = response.status;

    throw error;
  }

  return await response.json();
};

// const fetchQuiz = async (difficulty: string): Promise<QuizResponse> => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   const response = await fetch(
//     `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`,
//   );

//   return await response.json();
// };

export const fetchEasyQuiz = async (
  categoryId: number,
): Promise<QuizResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&difficulty=easy&category=${categoryId}`,
  );

  if (!response.ok) {
    const error = new Error("Error Fetching Categories");
    (error as FetchError).status = response.status;

    throw error;
  }

  return await response.json();
};

export const fetchMediumQuiz = async (
  categoryId: number,
): Promise<QuizResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&difficulty=medium&category=${categoryId}`,
  );

  if (!response.ok) {
    const error = new Error("Error Fetching Categories");
    (error as FetchError).status = response.status;

    throw error;
  }

  return await response.json();
};

export const fetchHardQuiz = async (
  categoryId: number,
): Promise<QuizResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&difficulty=hard&category=${categoryId}`,
  );

  if (!response.ok) {
    const error = new Error("Error Fetching Categories");
    (error as FetchError).status = response.status;

    throw error;
  }

  return await response.json();
};
