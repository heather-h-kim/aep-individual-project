import { useDistractionStore } from '../store/distractionStore';
import React from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

export const RandomFacts = props => {
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const globalUser = useUserStore(state => state.user);
  const preview = useColorsStore(state => state.preview);
  const randomFact = useDistractionStore(state => state.randomFact);

  console.log('round is', props.roundNumber);
  console.log('facts are', randomFact);
  console.log('fact 1', randomFact[0]);
  console.log('fact 2', randomFact[1]);

  if (props.roundNumber == 5) {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className=" px-8 pb-8 text-6xl font-medium">{randomFact[0]}</h1>
      </div>
    );
  }

  if (props.roundNumber == 6) {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className=" px-8 pb-8 text-6xl font-medium">{randomFact[1]}</h1>
      </div>
    );
  }
};

export default RandomFacts;
