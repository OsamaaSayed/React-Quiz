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

import { useQuiz } from '../context/QuizContext';
import { Status } from '../types';

const Home = () => {
  const { status, index, answerIndex, questionsNum } = useQuiz();

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <ErrorMessage />}
        {status === Status.READY && <StartScreen />}
        {status === Status.ACTIVE && (
          <>
            <Progress />

            <Question />

            <Footer>
              {answerIndex !== null && index < questionsNum - 1 && (
                <NextButton />
              )}

              {answerIndex !== null && index === questionsNum - 1 && (
                <FinishButton />
              )}

              <Timer />
            </Footer>
          </>
        )}
        {status === Status.FINISHED && <FinishScreen />}
      </Main>
    </div>
  );
};

export default Home;
