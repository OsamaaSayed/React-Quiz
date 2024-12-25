import { useEffect, useState } from 'react';

import { useQuiz } from '../context/QuizContext';
import { ActionTypeEnum } from '../types';

const Timer = () => {
  const { quizTime, dispatch } = useQuiz();
  const [timer, setTimer] = useState(quizTime);

  const mins = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    const id = setInterval(() => {
      if (timer === 0) dispatch({ type: ActionTypeEnum.FINISH });
      else setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch, timer]);

  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins} : {seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default Timer;
