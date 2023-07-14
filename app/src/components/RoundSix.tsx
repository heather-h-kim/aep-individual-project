import { useEffect, useState } from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import { useRoundStore, useGameStore } from '../store/gameStore';
import RandomFacts from './RandomFacts';
import ShowQuestion from './ShowQuestion';
import ShowCorrect from './ShowCorrect';
import ShowInCorrect from './ShowIncorrect';
import { useIsCorrectStore } from '../store/stateStore';
import { Link } from '@tanstack/react-router';
import ShowNumber from './ShowNumber';
import { useMutation } from '@tanstack/react-query';
import { game, postGame } from '../services/gameApi';

const RoundSix = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const [state, setState] = useState({
    levelNumber: props.level,
    roundNumber: props.round,
    numberShown: props.number,
    step: 'showNumber',
  });
  const { rounds, resetRounds } = useRoundStore(state => ({
    rounds: state.rounds,
    resetRounds: state.resetRounds,
  }));
  const { levelsRounds, resetGame } = useGameStore(state => ({
    levelsRounds: state.levelsRounds,
    resetGame: state.resetGame,
  }));
  const { isCorrect, resetIsCorrect } = useIsCorrectStore(state => ({
    isCorrect: state.isCorrect,
    resetIsCorrect: state.resetIsCorrect,
  }));
  const [score, setScore] = useState(0);

  const { data, mutate } = useMutation({
    mutationFn: (body: game) => postGame(body),
    onMutate: body => {
      console.log('mutate', body);
    },
    onError: (error, variables, context) => {
      console.log('Something went wrong...', error, variables, context);
    },

    onSuccess: data => {
      console.log('Success', data);
      setScore(data);
    },
    onSettled: (data, error, variables, context) => {
      console.log('Complete', data);
    },
  });

  useEffect(() => {
    console.log(
      'in round 6 useEffect, isCorrect, levelsRounds, levelsRounds.length',
      isCorrect,
      levelsRounds,
      levelsRounds.length,
    );
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
          //move to showKeepPlaying screen if the user got all questions correct in all levels played, otherwise, move on to the showScoreButton screen
          if (state.levelNumber != 4) {
            if (isCorrect < 6 * levelsRounds.length) {
              setState({ ...state, step: 'showScoreButton' });
            }
            if (isCorrect == 6 * levelsRounds.length) {
              setState({ ...state, step: 'showKeepPlaying' });
            }
          }
          //Don't need to show the button to play next level at the last level
          if (state.levelNumber == 4) {
            setState({ ...state, step: 'showScoreButton' });
          }
          break;
        case 'incorrect':
          setState({ ...state, step: 'showScoreButton' });
          break;
        default:
          console.log('timeout hook');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [state.step]);

  //function to set next step from the ShowQuestion component
  const handleStateStep = (nextStep: string) => {
    setState({ ...state, step: nextStep });
  };

  //reset the rounds array before moving up to the next level
  const updateGame = () => {
    console.log('update');
    resetRounds();
  };

  //function to send the payload to the backend and reset the game
  const getScore = () => {
    console.log('end the game');
    // const timestamp = Date.now();
    const payload = {
      // played_at: timestamp,
      user_id: globalUser.userId,
      levels_rounds: levelsRounds,
    };
    console.log('payload is', payload);

    mutate(payload);

    //reset the game
    resetRounds();
    resetGame();
    resetIsCorrect();

    //update the state to move on to the next screen
    setState({ ...state, step: 'showScore' });
  };

  // // button to click to play the same level once again
  // const playAgain = () => {
  //   // props.resetIndexState();
  // };

  if (state.step == 'showNumber') {
    return <ShowNumber numberShown={state.numberShown} />;
  }

  if (state.step == 'showDistraction') {
    return <RandomFacts roundNumber={state.roundNumber} />;
  }

  if (state.step == 'showQuestion') {
    return (
      <ShowQuestion
        levelNumber={state.levelNumber}
        roundNumber={state.roundNumber}
        numberShown={state.numberShown}
        handleStateStep={handleStateStep}
      />
    );
  }

  if (state.step == 'correct') {
    console.log('rounds', rounds);
    console.log('levelsRounds', levelsRounds);
    return <ShowCorrect />;
  }

  if (state.step == 'incorrect') {
    console.log('rounds', rounds);
    console.log('levelsRounds', levelsRounds);
    return <ShowInCorrect numberShown={state.numberShown} />;
  }

  if (state.step == 'showScoreButton') {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-row items-center justify-center"
      >
        <button
          className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
          onClick={getScore}
        >
          See my score
        </button>
      </div>
    );
  }

  if (state.step == 'showKeepPlaying') {
    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-row items-center justify-center"
      >
        <Link
          className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
          to={`/game-level${props.level + 1}/${props.level + 1}`}
          onClick={updateGame}
        >
          {' '}
          Play next level
        </Link>
        <button
          className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
          onClick={getScore}
        >
          Stop and see my score
        </button>
      </div>
    );
  }

  if (state.step == 'showScore') {
    if (score == 0) {
      return (
        <div
          style={
            preview
              ? { backgroundColor: themeBgColor }
              : { backgroundColor: globalUser.bgcolor }
          }
          className="my-10 flex h-screen flex-row items-center justify-center"
        >
          <h1 className="text-8xl font-extrabold tracking-widest"> Wait...</h1>
        </div>
      );
    }

    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className="text-7xl font-extrabold tracking-widest">
          {' '}
          Your score is:{score}
        </h1>
      </div>
    );
  }
};

export default RoundSix;
