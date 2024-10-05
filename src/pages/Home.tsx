import { useEffect, useReducer } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import StartScreen from '../components/StartScreen';
import Question from '../components/Question';
import Progress from '../components/Progress';
import FinishScreen from '../components/FinishScreen';
import Footer from '../components/Footer';
import NextButton from '../components/NextButton';
import FinishButton from '../components/FinishButton';
import Timer from '../components/Timer';

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

    case 'restart':
      return {
        ...initialState,
        status: Status.READY,
        questions: state.questions,
        highscore: state.highscore,
      };

    default:
      throw new Error('Unkown action!');
  }
}

const SECS_PER_QUESTION = 60;

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
  const quizTime = questions?.length * SECS_PER_QUESTION;

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

            <Footer>
              {answerIndex !== null && index < questionsNum - 1 && (
                <NextButton dispatch={dispatch} />
              )}

              {answerIndex !== null && index === questionsNum - 1 && (
                <FinishButton dispatch={dispatch} />
              )}

              <Timer
                dispatch={dispatch}
                quizTime={quizTime}
              />
            </Footer>
          </>
        )}
        {status === Status.FINISHED && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default Home;
