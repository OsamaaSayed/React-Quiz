import { useEffect, useReducer } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';

enum Status {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface IInitialState {
  questions: IQuestion[];
  status: Status;
}

type Action = {
  type: string;
  payload?: IQuestion[];
};

const initialState: IInitialState = {
  questions: [],
  status: Status.LOADING,
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
    default:
      throw new Error('Unkown action!');
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
};

export default Home;
