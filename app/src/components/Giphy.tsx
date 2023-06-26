import { useDemoStore } from '../store/demoStore';
import React from 'react';

export const Giphy = () => {
  const gif = useDemoStore(state => state.gif);

  return (
    <div className="my-10 flex h-screen flex-col items-center justify-center bg-cyan-50 pb-10">
      <img className="h-180 w-260" src={gif} alt="cat gif" />
    </div>
  );
};

export default Giphy;
