import { useDemoStore } from '../store/demoStore';
import React from 'react';

export const RandomFacts = () => {
  const randomFact = useDemoStore(state => state.randomFact);
  return (
    <div>
      <h1>{randomFact}</h1>
    </div>
  );
};

export default RandomFacts;
