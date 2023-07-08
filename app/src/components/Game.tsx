import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import useGetGifs from '../hooks/useGetGifs';
import useRandomFacts from '../hooks/useRandomFacts';
import RoundOne from './RoundOne';
import RoundTwo from './RoundTwo';
import RoundThree from './RoundThree';
import RoundFour from './RoundFour';
import RoundFive from './RoundFive';
import RoundSix from './RoundSix';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import { useIndexStore } from '../store/stateStore';

const Game = () => {
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const preview = useColorsStore(state => state.preview);
  const globalUser = useUserStore(state => state.user);
  const { index, updateIndex } = useIndexStore(state => ({
    index: state.index,
    updateIndex: state.updateIndex,
  }));
  const param = useParams();
  const [level, setLevel] = useState(Number(param.level));
  const [numberArray, setNumberArray] = useState([]);

  //Fetch distractions from third party APIs
  // useGetGifs();
  // useRandomFacts();

  //create 6 random numbers when the component loads
  useEffect(() => {
    console.log('in useEffect');
    const n = 6;
    const array = [];
    let a;
    let b;

    switch (level) {
      case 1:
        a = 1000000;
        b = 8999999;
        break;
      case 2:
        a = 10000000;
        b = 89999999;
        break;
      case 3:
        a = 100000000;
        b = 899999999;
        break;
      case 4:
        a = 1000000000;
        b = 8999999999;
        break;
      default:
        console.log('default');
    }

    do {
      const randomNumber = Math.floor(a + Math.random() * b);

      if (!array.includes(randomNumber)) {
        array.push(randomNumber);
      }
    } while (array.length < n);

    setNumberArray(array);
  }, []);

  console.log('numbers are', numberArray);
  console.log('level is', level);
  console.log('index is', index);

  // //function to set index state from children
  // const handleIndexState = () => {
  //   setIndex(index + 1);
  // };

  const handleClick = () => {
    console.log('handleClick');
    updateIndex(0);
  };

  if (index == 0) {
    return <RoundOne />;
  }

  if (index == 1) {
    return <RoundTwo />;
  }

  if (index == 2) {
    return <RoundThree />;
  }

  if (index == 3) {
    return <RoundFour />;
  }

  if (index == 4) {
    return <RoundFive />;
  }

  if (index == 5) {
    return <RoundSix />;
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
      <button
        className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
        onClick={handleClick}
      >
        START
      </button>
    </div>
  );
};

export default Game;

// const Game = () => {
//   const param = useParams();
//   const [level, setLevel] = useState(Number(param.level));
//   const [numberArray, setNumberArray] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [answer, setAnswer] = useState('');
//   const [start, setStart] = useState(true);
//   const [showNumber, setShowNumber] = useState(false);
//   const [showTimer, setShowTimer] = useState(false);
//   const [showGif, setShowGif] = useState(false);
//   const [showRandomFact, setShowRandomFact] = useState(false);
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(0);
//   const [correct, setCorrect] = useState(false);
//   const [incorrect, setIncorrect] = useState(false);
//   const [score, setScore] = useState(0);
//   const [keepPlaying, setKeepPlaying] = useState(false);
//   const [showScore, setShowScore] = useState(false);
//   const [lastStep, setLastStep] = useState(false);
//   const themeBgColor = useColorsStore(state => state.bgcolor);
//   const preview = useColorsStore(state => state.preview);
//   const globalUser = useUserStore(state => state.user);
//   const updateLevelNumber = useLevelStore(state => state.updateLevelNumber);
//   const levelNumber = useLevelStore(state => state.level_number);
//   const updateRounds = useLevelStore(state => state.updateRounds);
//   const removeRounds = useLevelStore(state => state.removeRounds);
//   const updateLevelsRounds = useGameStore(state => state.updateLevelsRounds);
//   const removeLevelsRounds = useGameStore(state => state.removeLevelsRounds);
//   const levels_rounds = useGameStore(state => state.levels_rounds);
//   const rounds = useLevelStore(state => state.rounds);
//   const [roundNumberArray, setRoundNumberArray] = useState([1, 2, 3, 4, 5, 6]);
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [scoreButton, setScoreButton] = useState(false);
//
//   //
//   // const showNumber = useShowNumberStore(state => state.showNumber);
//   // const updateShowNumber = useShowNumberStore(state => state.updateShowNumber);
//
//   // useGetGifs();
//   // useRandomFacts();
//
//   useEffect(() => {
//     console.log('in useEffect');
//     console.log('level in useEffect', level);
//     const n = 6;
//     const array = [];
//     let a;
//     let b;
//
//     switch (level) {
//       case 1:
//         a = 100000;
//         b = 899999;
//         break;
//       case 2:
//         a = 1000000;
//         b = 8999999;
//         break;
//       case 3:
//         a = 10000000;
//         b = 89999999;
//         break;
//       case 4:
//         a = 100000000;
//         b = 899999999;
//         break;
//       default:
//         console.log('default');
//     }
//
//     do {
//       const randomNumber = Math.floor(a + Math.random() * b);
//
//       if (!array.includes(randomNumber)) {
//         array.push(randomNumber);
//       }
//     } while (array.length < n);
//
//     setNumberArray(array);
//
//     console.log(level);
//   }, []);
//
//   console.log(numberArray);
//
//   const handleClick = () => {
//     console.log('handleClick');
//     updateLevelNumber(level);
//     setStart(!start);
//     setShowNumber(!showNumber);
//   };
//
//   const handleInput = e => {
//     console.log('handleInput');
//     setAnswer(e.target.value);
//   };
//
//   const handleSubmit = e => {
//     e.preventDefault();
//     console.log('handleSubmit', index);
//     updateRounds({
//       round_number: roundNumberArray[index],
//       number_shown: numberArray[index],
//       number_entered: Number(answer),
//     });
//
//     setShowQuestion(!showQuestion);
//
//     if (answer == numberArray[index]) {
//       setCorrect(!correct);
//     } else {
//       setIncorrect(!incorrect);
//     }
//
//     setAnswer('');
//   };
//
//   console.log('rounds', rounds);
//
//   const updateGame = () => {
//     console.log('updateLevelsRounds');
//     console.log('updateLevelsRounds');
//     updateLevelsRounds({ level_number: levelNumber, rounds: rounds });
//     removeRounds();
//   };
//
//   console.log('levelsRounds is', levels_rounds);
//
//   const seeScoreFromKeepPlaying = () => {
//     console.log('updateLevelsRounds');
//     updateLevelsRounds({ level_number: levelNumber, rounds: rounds });
//     removeRounds();
//     removeLevelsRounds();
//
//     setKeepPlaying(!keepPlaying);
//     setShowScore(!showScore);
//   };
//
//   if (start) {
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-col items-center justify-center"
//         >
//           <button
//               className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
//               onClick={handleClick}
//           >
//             START
//           </button>
//         </div>
//     );
//   }
//
//   if (showNumber) {
//     // return <ShowNumber />;
//
//     console.log('in shownumber');
//     setTimeout(() => {
//       console.log('setShowNumber');
//       setShowNumber(!showNumber);
//       // updateShowNumber();
//
//       switch (index) {
//         case 0:
//           setShowTimer(!showTimer);
//           break;
//         case 1:
//           setShowTimer(!showTimer);
//           break;
//         case 2:
//           setShowGif(!showGif);
//           break;
//         case 3:
//           setShowGif(!showGif);
//           break;
//         case 4:
//           setShowRandomFact(!showRandomFact);
//           break;
//         case 5:
//           setShowRandomFact(!showRandomFact);
//           break;
//       }
//     }, 1500);
//
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-col items-center justify-center"
//         >
//           <h1 className="text-8xl font-extrabold tracking-widest">
//             {numberArray[index]}
//           </h1>
//         </div>
//     );
//   }
//
//   if (showTimer) {
//     setTimeout(() => {
//       setShowTimer(!showTimer);
//       setShowQuestion(!showQuestion);
//     }, 1500);
//
//     return <Timer />;
//   }
//
//   if (showGif) {
//     setTimeout(() => {
//       setShowGif(!showGif);
//       setShowQuestion(!showQuestion);
//     }, 1500);
//
//     return <Giphy />;
//   }
//
//   if (showRandomFact) {
//     setTimeout(() => {
//       setShowRandomFact(!showRandomFact);
//       setShowQuestion(!showQuestion);
//     }, 1500);
//
//     return <RandomFacts />;
//   }
//
//   if (showQuestion) {
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-col items-center justify-center"
//         >
//           <span className=" pb-8 text-4xl font-medium">What was the number?</span>
//           <form className="flex flex-row space-x-4" onSubmit={handleSubmit}>
//             <label
//                 htmlFor="answer"
//                 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//             ></label>
//             <input
//                 type="number"
//                 id="answer"
//                 name="answer"
//                 className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                 required
//                 value={answer}
//                 onChange={handleInput}
//             />
//             <button
//                 className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
//                 type="submit"
//             >
//               Enter
//             </button>
//           </form>
//         </div>
//     );
//   }
//
//   if (correct) {
//     setTimeout(() => {
//       console.log('setIsCorrect');
//       setIsCorrect(isCorrect + 1);
//       console.log('setCorrect');
//       setCorrect(!correct);
//       console.log('setIndex');
//       setIndex(index + 1);
//       console.log('index', index);
//       if (index < 5) {
//         console.log('setShowNumber');
//         setShowNumber(!showNumber);
//       } else {
//         if (isCorrect < 5) {
//           console.log('setScoreButton');
//           setScoreButton(!scoreButton);
//         }
//
//         if (isCorrect == 5) {
//           console.log('setKeepPlaying');
//           setKeepPlaying(!keepPlaying);
//
//           if (level === 4) {
//             console.log('setScoreButton');
//             setScoreButton(!scoreButton);
//           }
//         }
//       }
//     }, 1000);
//
//     console.log('rounds is', rounds);
//
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-col items-center justify-center"
//         >
//           <h1 className=" pb-8 text-6xl font-medium">Correct!</h1>
//         </div>
//     );
//   }
//
//   if (incorrect) {
//     setTimeout(() => {
//       setIncorrect(!incorrect);
//       setIndex(index + 1);
//       setRoundIndex(roundIndex + 1);
//       if (index < 5) {
//         setShowNumber(!showNumber);
//       } else {
//         setScoreButton(!scoreButton);
//       }
//     }, 1000);
//
//     console.log('round is', rounds);
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-col items-center justify-center"
//         >
//           <h1 className=" pb-8 text-6xl font-medium">
//             Wrong...! The number was {numberArray[index]}
//           </h1>
//         </div>
//     );
//   }
//
//   if (scoreButton) {
//     console.log('in scoreButton');
//
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-row items-center justify-center"
//         >
//           <button
//               className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
//               onClick={updateGame}
//           >
//             See my score
//           </button>
//         </div>
//     );
//   }
//
//   if (keepPlaying) {
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-row items-center justify-center"
//         >
//           <Link
//               className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
//               to={`/game-level${level + 1}/${level + 1}`}
//               onClick={updateGame}
//           >
//             {' '}
//             Play next level
//           </Link>
//           <button
//               className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xl font-medium text-white hover:bg-blue-700"
//               onClick={seeScoreFromKeepPlaying}
//           >
//             Stop and see my score
//           </button>
//         </div>
//     );
//   }
//
//   if (showScore) {
//     console.log('score is', score);
//     setTimeout(() => {
//       setShowScore(!showScore);
//       setLastStep(!lastStep);
//     }, 2000);
//
//     return (
//         <div
//             style={
//               preview
//                   ? { backgroundColor: themeBgColor }
//                   : { backgroundColor: globalUser.bgcolor }
//             }
//             className="my-10 flex h-screen flex-col items-center justify-center"
//         >
//           <h1 className=" pb-8 text-6xl font-medium">
//             Your score is:
//             <span className="font-bold text-pink-900">{score}</span>
//           </h1>
//         </div>
//     );
//   }
//
//   if (lastStep) {
//     return (
//         <div className="my-10 flex h-screen flex-col items-center justify-center bg-cyan-50">
//           <h1 className=" pb-8 text-6xl font-medium">Log in to play more!</h1>
//         </div>
//     );
//   }
// };
//
// export default Game;
