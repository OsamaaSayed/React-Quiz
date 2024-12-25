import { useQuiz } from '../context/QuizContext';
import { ActionTypeEnum } from '../types';

const StartScreen = () => {
  const { questionsNum, dispatch } = useQuiz();

  return (
    <div className='start'>
      <h2>Welcome To The React Quiz!</h2>
      <h3>{questionsNum} Questions to test your React mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ActionTypeEnum.START })}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
