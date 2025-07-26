import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function QuizProgress({
  activeStep,
  totalSteps,
}: {
  activeStep: number;
  totalSteps: number;
}) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [progressWidth, setProgressWidth] = useState(0);

  const quizProgressWrapperClasses = twMerge(
    classNames(
      'relative w-[80%] mx-auto mt-4 mb-2 h-4 rounded-md bg-quiz-base-100 border-quiz-base-300',
    ),
  );

  useEffect(() => {
    setProgressWidth((activeStep / totalSteps) * 100);
  }, [activeStep]);

  const quizProgressClasses = twMerge(
    classNames(
      `absolute top left w-[${progressWidth}%] bg-quiz-base-content h-4 rounded-md`,
    ),
  );

  return (
    <div
      ref={progressRef}
      className={`${quizProgressWrapperClasses} quiz-progress-wrapper`}
    >
      <div
        style={{ width: `${progressWidth}%` }}
        className={`${quizProgressClasses} quiz-progress`}
      ></div>
    </div>
  );
}
