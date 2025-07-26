import { Card } from 'antd';

export default function DifficultySelector({
  difficulty,
  onSetDifficulty,
}: {
  difficulty?: string;
  onSetDifficulty: (diff: string) => void;
}) {
  return (
    <div className="flex flex-col w-[80%] mx-auto bg-quiz-base-100 border-quiz-base-300 mb-4 rounded-2xl p-5">
      <h4 className="mx-1 mb-2">Difficulty</h4>
      <div className="quizes">
        <Card
          hoverable
          onClick={() => onSetDifficulty('easy')}
          className={`difficulty-card ${difficulty === 'easy' ? 'difficulty-card-selected' : ''}`}
        >
          Easy
        </Card>
        <Card
          hoverable
          onClick={() => onSetDifficulty('medium')}
          className={`difficulty-card ${difficulty === 'medium' ? 'difficulty-card-selected' : ''}`}
        >
          Medium
        </Card>
        <Card
          hoverable
          onClick={() => onSetDifficulty('hard')}
          className={`difficulty-card ${difficulty === 'hard' ? 'difficulty-card-selected' : ''}`}
        >
          Hard
        </Card>
      </div>
    </div>
  );
}
