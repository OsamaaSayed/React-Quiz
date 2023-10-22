import { useEffect, useReducer } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import StartScreen from '../components/StartScreen';
import Question from '../components/Question';

import { Action, IQuestion } from '../types';

enum Status {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface IInitialState {
  questions: IQuestion[];
  status: Status;
  index: number;
}

const initialState: IInitialState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
};

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload as IQuestion[],
        status: Status.READY,
      };
    case 'dataFailed':
      return { ...state, status: Status.ERROR };
    case 'start':
      return { ...state, status: Status.ACTIVE };
    default:
      throw new Error('Unkown action!');
  }
}

const Home = () => {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const questionsNum = questions.length;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data: IQuestion[] = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    })();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <ErrorMessage />}
        {status === Status.READY && (
          <StartScreen
            questionsNum={questionsNum}
            dispatch={dispatch}
          />
        )}
        {status === Status.ACTIVE && <Question question={questions[index]} />}
      </Main>
    </div>
  );
};

export default Home;
