type ProgressProps = {
  index: number;
  questionsNum: number;
  points: number;
  answerIndex: null | number;
  maxPoints: number;
};

const Progress = ({
  index,
  questionsNum,
  points,
  maxPoints,
  answerIndex,
}: ProgressProps) => {
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
