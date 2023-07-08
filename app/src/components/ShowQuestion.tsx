import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import { useLevelStore } from '../store/gameStore';

const ShowQuestion = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const { levelNumber, rounds, updateLevelNumber, updateRounds } =
    useLevelStore(state => ({
      levelNumber: state.levelNumber,
      rounds: state.rounds,
      updateLevelNumber: state.updateLevelNumber,
      updateRounds: state.updateRounds,
    }));
  const [answer, setAnswer] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    updateRounds({
      round_number: props.roundNumber,
      number_shown: props.numberShown,
      number_entered: Number(answer),
    });

    if (answer == props.numberShown) {
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
