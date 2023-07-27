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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { game, postGame } from '../services/gameApi';
import { useSeasonStore } from '../store/seasonStore';
import { getRankings } from '../services/rankingApi';

const RoundSix = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const currentSeasonId = useSeasonStore(state => state.currentSeasonId);
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
  const style = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };
  const [score, setScore] = useState(0);
  const [scoreIsReady, setScoreIsReady] = useState(false);
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (body: game) => postGame(body),
    onMutate: body => {
      console.log('mutate', body);
    },
    onSuccess: data => {
      console.log('Success', data);
      setScore(data);
      setScoreIsReady(!scoreIsReady);
      //prefetch rankings so that the rankings taking account of the new game can show up quickly in the rankings page
      client.prefetchQuery({
        queryKey: ['Rankings', currentSeasonId],
        queryFn: () => getRankings(currentSeasonId),
      });
    },
    onError: (error, variables, context) => {
      console.log('Something went wrong...', error, variables, context);
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
    const payload = {
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
        style={style}
        className="my-10 flex h-screen flex-row items-center justify-center"
      >
        <button
          className="inline-block rounded bg-neutral-600 p-3 text-4xl font-medium text-white hover:bg-neutral-700"
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
        style={style}
        className="my-10 flex h-screen flex-row items-center justify-center"
      >
        <Link
          className="mr-0.5 inline-block rounded bg-neutral-600 p-3 text-4xl font-medium text-white hover:hover:bg-neutral-700"
          to={`/game-level${props.level + 1}/${props.level + 1}`}
          onClick={updateGame}
        >
          Play next level
        </Link>
        <button
          className="ml-0.5 inline-block rounded bg-neutral-600 p-3 text-4xl font-medium text-white hover:hover:bg-neutral-700"
          onClick={getScore}
        >
          Stop and see my score
        </button>
      </div>
    );
  }

  if (state.step == 'showScore') {
    console.log('score is', score);

    if (!scoreIsReady) {
      return (
        <div
          style={style}
          className="my-10 flex h-screen flex-row items-center justify-center"
        >
          <h1 className="animate-pulse text-8xl font-extrabold tracking-widest">
            Wait...
          </h1>
        </div>
      );
    }

    if (scoreIsReady) {
      return (
        <div
          style={style}
          className="my-10 flex h-screen flex-col items-center justify-center"
        >
          <h1 className="text-7xl font-extrabold tracking-widest">
            Your score is: {score}
          </h1>
        </div>
      );
    }
  }
};

export default RoundSix;
