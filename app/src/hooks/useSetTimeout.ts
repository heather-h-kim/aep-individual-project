import { useState } from 'react';

const useSetTimeout = props => {
  const [state, setState] = useState({
    roundNumber: props.round,
    numberShown: props.number,
    step: 'showNumber',
  });

  const timeOut = () => {
    //set delay time conditionally
    let delay;
    switch (state.step) {
      case 'showNumber':
        delay = 2000;
        break;
      case 'showTimer':
        delay = 3000;
        break;
      case 'correct' || 'incorrect':
        delay = 1500;
        break;
      default:
        delay = 0;
    }

    //setTimeout function with different callback functions depending on the step state
    const timer = setTimeout(() => {
      switch (state.step) {
        case 'showNumber':
          setState({ ...state, step: 'showTimer' });
          break;
        case 'showTimer':
          setState({ ...state, step: 'showQuestion' });
          break;
        case 'correct' || 'incorrect':
          props.handleIndexState();
          break;
        default:
          console.log('setTimeout Round 1');
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
