import { useDistractionStore } from '../store/distractionStore';
import React from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

export const RandomFacts = props => {
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const globalUser = useUserStore(state => state.user);
  const preview = useColorsStore(state => state.preview);
  const randomFact = useDistractionStore(state => state.randomFact);
  const style = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };

  if (props.roundNumber == 5) {
    return (
      <div
        style={style}
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className="justify-center px-8  text-6xl font-medium">
          {randomFact[0]}
        </h1>
      </div>
    );
  }

  if (props.roundNumber == 6) {
    return (
      <div
        style={style}
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className="justify-center px-8 text-6xl font-medium">
          {randomFact[1]}
        </h1>
      </div>
    );
  }
};

export default RandomFacts;
