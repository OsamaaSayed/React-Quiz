import Options from './Options';

import { IQuestion } from '../types';

type QuestionProps = {
  question: IQuestion;
};

const Question = ({ question }: QuestionProps) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
};

export default Question;
