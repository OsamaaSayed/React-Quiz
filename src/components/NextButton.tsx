import { useQuiz } from '../context/QuizContext';
import { ActionTypeEnum } from '../types';

const NextButton = () => {
  const { dispatch } = useQuiz();

  return (
    <button
      className='btn btn-ui'
      onClick={() => {
        dispatch({ type: ActionTypeEnum.NEXT_QUESTION });
      }}
    >
      Next
    </button>
  );
};

export default NextButton;
