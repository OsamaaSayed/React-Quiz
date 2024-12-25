import { useQuiz } from '../context/QuizContext';
import { ActionTypeEnum } from '../types';

const FinishScreen = () => {
  const { points, maxPoints, highscore, dispatch } = useQuiz();

  const percentage = Math.ceil((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = '🏅';
  if (percentage >= 80 && percentage < 100) emoji = '🥳';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className='result'>
        {emoji} You scored <strong>{points}</strong> out of {maxPoints} (
        {percentage}%)
      </p>

      <p className='highscore'>
        Highscore: <strong>{highscore}</strong> points 🔥
      </p>

      <button
        className='btn btn-ui'
        onClick={() => {
          dispatch({ type: ActionTypeEnum.RESTART });
        }}
      >
        Restart quiz
      </button>
    </>
  );
};

export default FinishScreen;
