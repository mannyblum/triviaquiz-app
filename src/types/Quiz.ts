import { QuizEntryProps } from '@/components/TriviaQuiz/QuizEntry';

export type QuizResponse = {
  response_code: number;
  results: QuizEntryProps[];
};

export type CategoriesResponse = {
  trivia_categories: Category[];
};

export type Category = {
  id: number;
  name: string;
};
