import { useEffect, useState } from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import Timer from './Timer';
import ShowQuestion from './ShowQuestion';

const RoundTwo = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const [state, setState] = useState({
    roundNumber: 1,
    numberShown: props.number,
    step: 'showNumber',
  });

  console.log('in round 2');
  // useEffect(() => {
  //   console.log('in round 1 useEffect');
  //   //set delay time conditionally
  //   let delay;
  //
  //   switch (state.step) {
  //     case 'showNumber':
  //       delay = 2000;
  //       break;
  //     case 'showTimer':
  //       delay = 3000;
  //       break;
  //     case 'correct' || 'incorrect':
  //       delay = 1500;
  //       break;
  //     default:
  //       delay = 0;
  //   }
  //
  //   //setTimeout function with different callback functions depending on the step state
  //   const timer = setTimeout(() => {
  //     switch (state.step) {
  //       case 'showNumber':
  //         setState({ ...state, step: 'showTimer' });
  //         break;
  //       case 'showTimer':
  //         setState({ ...state, step: 'showQuestion' });
  //         break;
  //       case 'correct' || 'incorrect':
  //         props.handleIndexState();
  //         break;
  //       default:
  //         console.log('setTimeout Round 1');
  //     }
  //   }, delay);
  //
  //   return () => clearTimeout(timer);
  // }, [state.step]);

  return <h1>Round 2</h1>;
};

export default RoundTwo;
