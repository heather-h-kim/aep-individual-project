import { useDemoStore } from '../store/demoStore';
import React from 'react';

export const RandomFacts = () => {
  const randomFact = useDemoStore(state => state.randomFact);
  return (
    <div className="my-10 flex h-screen flex-col items-center justify-center bg-cyan-50">
      <h1 className=" px-8 pb-8 text-6xl font-medium">{randomFact}</h1>
    </div>
  );
};

export default RandomFacts;
