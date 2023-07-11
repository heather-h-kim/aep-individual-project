import { useDistractionStore } from '../store/distractionStore';
import React, { useEffect, useState } from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

export const Giphy = props => {
  const gif = useDistractionStore(state => state.gif);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const globalUser = useUserStore(state => state.user);
  const preview = useColorsStore(state => state.preview);

  console.log('gifs are', gif);

  if (props.roundNumber == 3) {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col items-center justify-center pb-10"
      >
        <img className="h-180 w-260" src={gif[0]} alt="cat gif" />
      </div>
    );
  }

  if (props.roundNumber == 4) {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col items-center justify-center pb-10"
      >
        <img className="h-180 w-260" src={gif[1]} alt="cat gif" />
      </div>
    );
  }
};

export default Giphy;
