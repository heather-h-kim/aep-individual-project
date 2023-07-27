import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import { useGameStore, useRoundStore } from '../store/gameStore';
import { useIsCorrectStore } from '../store/stateStore';

const ShowQuestion = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const updateRounds = useRoundStore(state => state.updateRounds);
  const updateGame = useGameStore(state => state.updateGame);
  const updateIsCorrect = useIsCorrectStore(state => state.updateIsCorrect);
  const [answer, setAnswer] = useState('');
  const style = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };

  const handleSubmit = e => {
    e.preventDefault();
    //add the new round to the round array
    updateRounds({
      round_number: props.roundNumber,
      number_shown: props.numberShown,
      number_entered: Number(answer),
    });

    //add the new object that has level number and the array of rounds to the levelsRounds array
    if (props.roundNumber == 6) {
      updateGame(props.levelNumber);
    }

    if (answer == props.numberShown) {
      //track the number of correct answers in the six rounds
      updateIsCorrect();
      props.handleStateStep('correct');
    } else {
      props.handleStateStep('incorrect');
    }

    setAnswer('');
  };

  return (
    <div
      style={style}
      className="my-10 flex h-screen flex-col items-center justify-center"
    >
      <span className=" pb-8 text-6xl font-medium">What was the number?</span>
      <form className="flex flex-row space-x-4" onSubmit={handleSubmit}>
        <label
          htmlFor="answer"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="number"
          id="answer"
          name="answer"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500"
          required
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          autoFocus
        />
        <button
          className="inline-block rounded bg-neutral-600 px-3 py-1 text-xl font-medium text-white hover:bg-neutral-700"
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default ShowQuestion;
