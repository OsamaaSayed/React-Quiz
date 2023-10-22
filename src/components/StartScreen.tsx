import { Action } from '../types';

type StartScreenProps = {
  questionsNum: number;
  dispatch: React.Dispatch<Action>;
};

const StartScreen = ({ questionsNum, dispatch }: StartScreenProps) => {
  return (
    <div className='start'>
      <h2>Welcome To The React Quiz!</h2>
      <h3>{questionsNum} Questions to test your React mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
