import { IQuestion } from '../types';

type OptionsProps = {
  question: IQuestion;
};

const Options = ({ question }: OptionsProps) => {
  return (
    <div className='options'>
      {question.options.map((option) => (
        <button
          key={option}
          className='btn btn-option'
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
