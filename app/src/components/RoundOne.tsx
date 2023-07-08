import { useEffect, useState } from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import Timer from './Timer';
import ShowQuestion from './ShowQuestion';

const RoundOne = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const [state, setState] = useState({
    roundNumber: 1,
    numberShown: props.number,
    step: 'showNumber',
  });

  console.log('in round 1');

  useEffect(() => {
    console.log('in round 1 useEffect');

    if (state.step == 'showNumber') {
      const timer = setTimeout(() => {
        setState({ ...state, step: 'showTimer' });
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (state.step == 'showTimer') {
      const timer = setTimeout(() => {
        setState({ ...state, step: 'showQuestion' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.step]);

  //function to set next step from the ShowQuestion component
  const handleStateStep = (nextStep: string) => {
    setState({ ...state, step: nextStep });
  };

  if (state.step == 'showNumber') {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className="text-8xl font-extrabold tracking-widest">
          {props.number}
        </h1>
      </div>
    );
  }

  if (state.step == 'showTimer') {
    return <Timer />;
  }

  if (state.step == 'showQuestion') {
    return (
      <ShowQuestion
        roundNumber={1}
        numberShown={state.numberShown}
        handleStateStep={handleStateStep}
      />
    );
  }

  if (state.step == 'correct') {
    return <h1>Correct</h1>;
  }
};

export default RoundOne;
