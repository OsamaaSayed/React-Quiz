import { useQuiz } from '../context/QuizContext';

const Progress = () => {
  const { index, answerIndex, points, maxPoints, questionsNum } = useQuiz();

  return (
    <header className='progress'>
      <progress
        max={questionsNum}
        value={index + Number(answerIndex !== null)}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong>/{questionsNum}
      </p>

      <p>
        {points}/{maxPoints}
      </p>
    </header>
  );
};

export default Progress;
