import { useEffect, useState } from 'react';

import { Action } from '../types';

type TimerProps = {
  dispatch: React.Dispatch<Action>;
  quizTime: number;
};

const Timer = ({ dispatch, quizTime }: TimerProps) => {
  const [timer, setTimer] = useState(quizTime);

  const mins = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    const id = setInterval(() => {
      if (timer === 0) dispatch({ type: 'finish' });
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
