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

  const handleSubmit = e => {
    e.preventDefault();
    //add the new round to the round array
    updateRounds({
      roundNumber: props.roundNumber,
      numberShown: props.numberShown,
      numberEntered: Number(answer),
    });

    //add the new object that has level number and the array of rounds to the levelsRounds array
    if (props.roundNumber == 6) {
      updateGame(props.levelNumber);
    }

    if (answer == props.numberShown) {
      updateIsCorrect();
      props.handleStateStep('correct');
    } else {
      props.handleStateStep('incorrect');
    }

    setAnswer('');
  };

  return (
    <div
      style={
        preview
          ? { backgroundColor: themeBgColor }
          : { backgroundColor: globalUser.bgcolor }
      }
      className="my-10 flex h-screen flex-col items-center justify-center"
    >
      <span className=" pb-8 text-4xl font-medium">What was the number?</span>
      <form className="flex flex-row space-x-4" onSubmit={handleSubmit}>
        <label
          htmlFor="answer"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="number"
          id="answer"
          name="answer"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <button
          className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default ShowQuestion;
