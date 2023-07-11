import { useState } from 'react';

const useSetTimeout = props => {
  const [state, setState] = useState({
    levelNumber: props.level,
    roundNumber: props.round,
    numberShown: props.number,
    step: 'showNumber',
  });

  const timeOut = () => {
    //set delay time conditionally
    let delay;
    switch (state.step) {
      case 'showNumber':
        delay = 3000;
        break;
      case 'showDistraction':
        delay = 15000;
        break;
      case 'correct':
        delay = 1500;
        break;
      case 'incorrect':
        delay = 1500;
        break;
      default:
        delay = 0;
    }

    //setTimeout function with different callback functions depending on the step state
    const timer = setTimeout(() => {
      switch (state.step) {
        case 'showNumber':
          setState({ ...state, step: 'showDistraction' });
          break;
        case 'showDistraction':
          setState({ ...state, step: 'showQuestion' });
          break;
        case 'correct':
          props.handleIndexState();
          break;
        case 'incorrect':
          props.handleIndexState();
          break;
        default:
          console.log('timeout hook');
      }
    }, delay);

    return () => clearTimeout(timer);
  };

  return {
    state,
    setState,
    timeOut,
  };
};

export default useSetTimeout;
