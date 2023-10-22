type StartScreenProps = {
  questionsNum: number;
};

const StartScreen = ({ questionsNum }: StartScreenProps) => {
  return (
    <div className='start'>
      <h2>Welcome To The React Quiz!</h2>
      <h3>{questionsNum} Questions to test your React mastery</h3>
      <button className='btn btn-ui'>Let's start</button>
    </div>
  );
};

export default StartScreen;