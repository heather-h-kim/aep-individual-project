import { useEffect, useState } from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import Giphy from './Giphy';
import ShowQuestion from './ShowQuestion';
import useSetTimeout from '../hooks/useSetTimeout';
import ShowCorrect from './ShowCorrect';
import ShowInCorrect from './ShowIncorrect';

const RoundFour = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const { state, setState, timeOut } = useSetTimeout(props);

  console.log('in round 4');

  useEffect(() => {
    console.log('in round 3 useEffect');
    timeOut();
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

  if (state.step == 'showDistraction') {
    return <Giphy />;
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

export default RoundFour;
