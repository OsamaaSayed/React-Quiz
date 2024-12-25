import { createContext, useContext, useEffect, useReducer } from 'react';

import { Action, IQuestion, Status, ActionTypeEnum } from '../types';

type InitialState = {
  questions: IQuestion[];
  status: Status;
  index: number;
  answerIndex: null | number;
  points: number;
  highscore: number;
};

type ContextType = {
  questions: IQuestion[];
  status: Status;
  index: number;
  answerIndex: null | number;
  points: number;
  highscore: number;
  questionsNum: number;
  maxPoints: number;
  quizTime: number;
  dispatch: React.Dispatch<Action>;
};

const initialState: InitialState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answerIndex: null,
  points: 0,
  highscore: 0,
};

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case ActionTypeEnum.DATA_RECEIVED:
      return {
        ...state,
        questions: action.payload,
        status: Status.READY,
      };

    case ActionTypeEnum.DATA_FAILED:
      return { ...state, status: Status.ERROR };

    case ActionTypeEnum.START:
      return { ...state, status: Status.ACTIVE };

    case ActionTypeEnum.NEW_ANSWER:
      return {
        ...state,
        answerIndex: action.payload,
        points:
          action.payload === state.questions.at(state.index)!.correctOption
            ? state.points + state.questions.at(state.index)!.points
            : state.points,
      };

    case ActionTypeEnum.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answerIndex: null };

    case ActionTypeEnum.FINISH:
      return {
        ...state,
        status: Status.FINISHED,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case ActionTypeEnum.RESTART:
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

const QuizContext = createContext<ContextType | undefined>(undefined);

export default function QuizProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

        dispatch({ type: ActionTypeEnum.DATA_RECEIVED, payload: data });
      } catch (err) {
        dispatch({ type: ActionTypeEnum.DATA_FAILED });
      }
    })();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answerIndex,
        points,
        highscore,
        questionsNum,
        maxPoints,
        quizTime,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  return context;
};
