import { useEffect, useState } from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import { useLevelStore, useGameStore } from '../store/gameStore';
import RandomFacts from './RandomFacts';
import ShowQuestion from './ShowQuestion';

const RoundSix = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const [state, setState] = useState({
    roundNumber: props.round,
    numberShown: props.number,
    step: 'showNumber',
  });
  const updateLevelsRounds = useGameStore(state => state.updateLevelsRounds);
  const { levelNumber, rounds, removeRounds } = useLevelStore(state => ({
    levelNumber: state.levelNumber,
    rounds: state.rounds,
    removeRounds: state.removeRounds,
  }));

  console.log('in round 6, state is', state);

  useEffect(() => {
    //set delay time conditionally
    let delay;
    switch (state.step) {
      case 'showNumber':
        delay = 2000;
        break;
      case 'showDistraction':
        delay = 3000;
        break;
      case 'correct':
        delay = 1500;
        break;
      case 'incorrect':
        delay = 1500;
        break;
      default:
        delay = 0;
    }

    //setTimeout function with different callback functions depending on the step state
    const timer = setTimeout(() => {
      switch (state.step) {
        case 'showNumber':
          setState({ ...state, step: 'showDistraction' });
          break;
        case 'showDistraction':
          setState({ ...state, step: 'showQuestion' });
          break;
        case 'correct':
          setState({ ...state, step: 'showKeepPlaying' });
          break;
        case 'incorrect':
          setState({ ...state, step: 'showScoreButton' });
          break;
        default:
          console.log('timeout hook');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [state.step]);

  //function to set next step from the ShowQuestion component
  const handleStateStep = (nextStep: string) => {
    setState({ ...state, step: nextStep });
  };

  //function to update game when the score button is clicked
  const updateGame = () => {
    console.log('updateLevelsRounds');
    console.log('updateLevelsRounds');
    updateLevelsRounds({ level_number: levelNumber, rounds: rounds });
    removeRounds();
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

  if (state.step == 'showDistraction') {
    return <RandomFacts />;
  }

  if (state.step == 'showQuestion') {
    return (
      <ShowQuestion
        roundNumber={state.roundNumber}
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

  if (state.step == 'showScoreButton') {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-row items-center justify-center"
      >
        <button
          className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
          onClick={updateGame}
        >
          See my score
        </button>
      </div>
    );
  }
};

export default RoundSix;
