import { useEffect, useReducer } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import StartScreen from '../components/StartScreen';
import Question from '../components/Question';
import NextButton from '../components/NextButton';
import Progress from '../components/Progress';
import FinishScreen from '../components/FinishScreen';

import { Action, IQuestion } from '../types';
import FinishButton from '../components/FinishButton';

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
  answerIndex: null | number;
  points: number;
  highscore: number;
}

const initialState: IInitialState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answerIndex: null,
  points: 0,
  highscore: 0,
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
    case 'newAnswer':
      return {
        ...state,
        answerIndex: action.payload as number,
        points:
          action.payload === state.questions.at(state.index)!.correctOption
            ? state.points + state.questions.at(state.index)!.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answerIndex: null };
    case 'finish':
      return {
        ...state,
        status: Status.FINISHED,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error('Unkown action!');
  }
}

const Home = () => {
  const [
    { questions, status, index, answerIndex, points, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsNum = questions?.length;
  const maxPoints = questions?.reduce(
    (acc, currentValue) => acc + currentValue.points,
    0,
  );

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
        {status === Status.ACTIVE && (
          <>
            <Progress
              index={index}
              questionsNum={questionsNum}
              points={points}
              maxPoints={maxPoints}
              answerIndex={answerIndex}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answerIndex={answerIndex}
            />

            {answerIndex !== null && index < questionsNum - 1 && (
              <NextButton dispatch={dispatch} />
            )}

            {answerIndex !== null && index === questionsNum - 1 && (
              <FinishButton dispatch={dispatch} />
            )}
          </>
        )}
        {status === Status.FINISHED && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
};

export default Home;
