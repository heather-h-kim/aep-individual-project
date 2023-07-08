import React, { useEffect, useState } from 'react';
import { useShowNumberStore } from '../store/stateStore';
import { preview } from 'vite';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

const ShowNumber = () => {
  const showNumber = useShowNumberStore(state => state.showNumber);
  const updateShowNumber = useShowNumberStore(state => state.updateShowNumber);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const preview = useColorsStore(state => state.preview);
  const globalUser = useUserStore(state => state.user);
  const [test, setTest] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const deadline = Date.now();
  const getTime = () => {
    const time = Date.now() - deadline;
    const timeInSeconds = time / 1000;
    if (timeInSeconds < 6) {
      setSeconds(Math.floor(time / 1000));
    } else {
      updateShowNumber();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('in timeout');
      // setTest(!test);
      updateShowNumber();
      // testFunction();

      return () => clearTimeout(timer);
    }, 3000);
    // updateShowNumber();
    // console.log('showNumber', showNumber);
  }, []);
  // console.log('showNumber', showNumber);

  const testFunction = () => {
    console.log('');
    updateShowNumber();
  };

  // if (test) {
  //   updateShowNumber();
  // }

  // if (test) {
  //   return <h1>Test</h1>;
  // }

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
        {/*{numberArray[index]}*/}
        Hi
      </h1>
    </div>
  );
};

export default ShowNumber;
