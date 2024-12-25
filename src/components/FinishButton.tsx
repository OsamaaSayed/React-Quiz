import { useQuiz } from '../context/QuizContext';
import { ActionTypeEnum } from '../types';

const FinishButton = () => {
  const { dispatch } = useQuiz();

  return (
    <button
      className='btn btn-ui'
      onClick={() => {
        dispatch({ type: ActionTypeEnum.FINISH });
      }}
    >
      Finish
    </button>
  );
};

export default FinishButton;
