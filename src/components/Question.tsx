import Options from './Options';

import { Action, IQuestion } from '../types';

type QuestionProps = {
  question: IQuestion;
  dispatch: React.Dispatch<Action>;
  answerIndex: null | number;
};

const Question = ({ question, dispatch, answerIndex }: QuestionProps) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answerIndex={answerIndex}
      />
    </div>
  );
};

export default Question;
