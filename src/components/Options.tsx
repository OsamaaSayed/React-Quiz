import { Action, IQuestion } from '../types';

type OptionsProps = {
  question: IQuestion;
  dispatch: React.Dispatch<Action>;
  answerIndex: null | number;
};

const Options = ({ question, dispatch, answerIndex }: OptionsProps) => {
  const hasAnswered = answerIndex !== null;

  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${
            index === answerIndex
              ? index !== question.correctOption
                ? 'wrong'
                : ''
              : ''
          } ${
            hasAnswered
              ? index === question.correctOption
                ? 'answer correct'
                : ''
              : ''
          }`}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
