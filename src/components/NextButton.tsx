import { Action } from '../types';

type NextButtonProps = {
  dispatch: React.Dispatch<Action>;
};

const NextButton = ({ dispatch }: NextButtonProps) => {
  return (
    <button
      className='btn btn-ui'
      onClick={() => {
        dispatch({ type: 'nextQuestion' });
      }}
    >
      Next
    </button>
  );
};

export default NextButton;
