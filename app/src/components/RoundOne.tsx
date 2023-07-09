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
    let delay;

    switch (state.step) {
      case 'showNumber':
        delay = 2000;
        break;
      case 'showTimer':
        delay = 3000;
        break;
      case 'correct' || 'incorrect':
        delay = 1500;
        break;
      default:
        delay = 0;
    }

    const timer = setTimeout(() => {
      switch (state.step) {
        case 'showNumber':
          setState({ ...state, step: 'showTimer' });
          break;
        case 'showTimer':
          setState({ ...state, step: 'showQuestion' });
          break;
        case 'correct' || 'incorrect':
          props.handleIndexState();
          break;
        default:
          console.log('setTimeout Round 1');
      }
    }, delay);

    return () => clearTimeout(timer);
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
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className="text-8xl font-extrabold tracking-widest">Correct!</h1>
      </div>
    );
  }

  if (state.step == 'incorrect') {
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
          Wrong... The number was {state.numberShown}.
        </h1>
      </div>
    );
  }
};

export default RoundOne;
