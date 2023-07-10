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
  const rounds = useRoundStore(state => state.rounds);
  const levelsRounds = useGameStore(state => state.levelsRounds);
  const isCorrect = useIsCorrectStore(state => state.isCorrect);

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
    },
    onSettled: (data, error, variables, context) => {
      console.log('Complete', data);
    },
  });

  useEffect(() => {
    //set delay time conditionally
    let delay;
    switch (state.step) {
      case 'showNumber':
        delay = 2000;
        break;
      case 'showDistraction':
        delay = 1000;
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
          if (isCorrect < 6 * (levelsRounds.length + 1)) {
            setState({ ...state, step: 'showScoreButton' });
          }
          if (isCorrect == 6 * (levelsRounds.length + 1)) {
            setState({ ...state, step: 'showKeepPlaying' });
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

  //function to update game before moving on to the next level
  const updateGame = () => {
    console.log('update the Game');
    // updateLevelsRounds({ level_number: levelNumber, rounds: rounds });
    // removeRounds();
  };

  //function to send the game to the backend and reset the game
  const getScore = () => {
    console.log('end the game');
    // updateLevelsRounds({ level_number: levelNumber, rounds: rounds });
    // const payload = {
    //   played_at: Date.now(),
    //   user_id: globalUser.userId,
    //   level_number: state.levelNumber,
    //   rounds: rounds,
    // };

    // mutate(payload);

    // setPayload({ ...payload, levels_rounds: [levelsRounds] });
    // console.log('levelsRounds is', levelsRounds);
    console.log('levelsRounds', levelsRounds);

    //mutation
    //reset the game
    // removeRounds();
    // removeLevelsRounds();
    setState({ ...state, step: 'showScore' });
  };

  if (state.step == 'showNumber') {
    return <ShowNumber numberShown={state.numberShown} />;
  }

  if (state.step == 'showDistraction') {
    return <RandomFacts />;
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
    return <ShowCorrect />;
  }

  if (state.step == 'incorrect') {
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
    // console.log('levelsRounds is', levelsRounds);
    // console.log('payload at showScore is', payload);

    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-row items-center justify-center"
      >
        <h1 className="text-8xl font-extrabold tracking-widest">
          {' '}
          Your score is:{' '}
        </h1>
      </div>
    );
  }
};

export default RoundSix;
