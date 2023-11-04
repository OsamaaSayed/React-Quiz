import { Action } from '../types';

type FinishButtonProps = {
  dispatch: React.Dispatch<Action>;
};

const FinishButton = ({ dispatch }: FinishButtonProps) => {
  return (
    <button
      className='btn btn-ui'
      onClick={() => {
        dispatch({ type: 'finish' });
      }}
    >
      Finish
    </button>
  );
};

export default FinishButton;
