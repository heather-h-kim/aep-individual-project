import { useDemoStore } from '../store/demoStore';
import React from 'react';

export const Giphy = () => {
  const gif = useDemoStore(state => state.gif);

  return (
    <div>
      <img src={gif} alt="cat gif" />
    </div>
  );
};

export default Giphy;
