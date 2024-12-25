import { useQuiz } from '../context/QuizContext';
import { ActionTypeEnum } from '../types';

const Options = () => {
  const { questions, index, answerIndex, dispatch } = useQuiz();

  const hasAnswered = answerIndex !== null;

  return (
    <div className='options'>
      {questions[index].options.map((option, idx) => (
        <button
          key={option}
          className={`btn btn-option ${
            idx === answerIndex
              ? idx !== questions[index].correctOption
                ? 'wrong'
                : ''
              : ''
          } ${
            hasAnswered
              ? idx === questions[index].correctOption
                ? 'answer correct'
                : ''
              : ''
          }`}
          onClick={() =>
            dispatch({ type: ActionTypeEnum.NEW_ANSWER, payload: idx })
          }
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
