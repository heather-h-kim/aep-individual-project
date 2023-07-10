import { useDistractionStore } from '../store/distractionStore';
import React from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

export const RandomFacts = () => {
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const globalUser = useUserStore(state => state.user);
  const preview = useColorsStore(state => state.preview);
  const randomFact = useDistractionStore(state => state.randomFact);
  return (
    <div
      style={
        preview
          ? { backgroundColor: themeBgColor }
          : { backgroundColor: globalUser.bgcolor }
      }
      className="my-10 flex h-screen flex-col items-center justify-center"
    >
      <h1 className=" px-8 pb-8 text-6xl font-medium">{randomFact}</h1>
    </div>
  );
};

export default RandomFacts;
