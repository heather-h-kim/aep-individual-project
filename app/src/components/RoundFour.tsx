import { useEffect } from 'react';
import Giphy from './Giphy';
import ShowQuestion from './ShowQuestion';
import useSetTimeout from '../hooks/useSetTimeout';
import ShowCorrect from './ShowCorrect';
import ShowInCorrect from './ShowIncorrect';
import ShowNumber from './ShowNumber';
import { useGameStore, useRoundStore } from '../store/gameStore';

const RoundFour = props => {
  const { state, setState, timeOut } = useSetTimeout(props);
  const rounds = useRoundStore(state => state.rounds);
  const levelsRounds = useGameStore(state => state.levelsRounds);

  useEffect(() => {
    timeOut();
  }, [state.step]);

  //function to set next step from the ShowQuestion component
  const handleStateStep = (nextStep: string) => {
    setState({ ...state, step: nextStep });
  };

  if (state.step == 'showNumber') {
    return <ShowNumber numberShown={state.numberShown} />;
  }

  if (state.step == 'showDistraction') {
    return <Giphy roundNumber={state.roundNumber} />;
  }

  if (state.step == 'showQuestion') {
    return (
      <ShowQuestion
        levelNumber={state.levelNumber}
        roundNumber={state.roundNumber}
        numberShown={state.numberShown}
        handleStateStep={handleStateStep}
      />
    );
  }

  if (state.step == 'correct') {
    console.log('rounds', rounds);
    console.log('levelsRounds', levelsRounds);
    return <ShowCorrect />;
  }

  if (state.step == 'incorrect') {
    console.log('rounds', rounds);
    console.log('levelsRounds', levelsRounds);
    return <ShowInCorrect numberShown={state.numberShown} />;
  }
};

export default RoundFour;
