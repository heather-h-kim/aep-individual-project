import { useDemoStore } from '../store/demoStore';
import React from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

export const Giphy = () => {
  const gif = useDemoStore(state => state.gif);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const globalUser = useUserStore(state => state.user);
  const preview = useColorsStore(state => state.preview);

  return (
    <div
      style={
        preview
          ? { backgroundColor: themeBgColor }
          : { backgroundColor: globalUser.bgcolor }
      }
      className="my-10 flex h-screen flex-col items-center justify-center pb-10"
    >
      <img className="h-180 w-260" src={gif} alt="cat gif" />
    </div>
  );
};

export default Giphy;
