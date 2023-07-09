import { useEffect, useState } from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import Timer from './Timer';
import ShowQuestion from './ShowQuestion';
import useSetTimeout from '../hooks/useSetTimeout';
import { useIsCorrectStore } from '../store/stateStore';
import ShowCorrect from './ShowCorrect';
import ShowInCorrect from './ShowIncorrect';
import ShowNumber from './ShowNumber';

const RoundOne = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const { state, setState, timeOut } = useSetTimeout(props);

  console.log('in round 1');
  console.log('state', state);

  useEffect(() => {
    console.log('in round 1 useEffect');
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
    return <Timer />;
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
    return <ShowCorrect />;
  }

  if (state.step == 'incorrect') {
    return <ShowInCorrect numberShown={state.numberShown} />;
  }
};

export default RoundOne;
