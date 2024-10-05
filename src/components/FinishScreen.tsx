import { Action } from '../types';

type FinishScreenProps = {
  points: number;
  maxPoints: number;
  highscore: number;
  dispatch: React.Dispatch<Action>;
};

const FinishScreen = ({
  points,
  maxPoints,
  highscore,
  dispatch,
}: FinishScreenProps) => {
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
          dispatch({ type: 'restart' });
        }}
      >
        Restart quiz
      </button>
    </>
  );
};

export default FinishScreen;
