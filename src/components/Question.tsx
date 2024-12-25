import { useQuiz } from '../context/QuizContext';
import Options from './Options';

const Question = () => {
  const { questions, index } = useQuiz();

  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
};

export default Question;
