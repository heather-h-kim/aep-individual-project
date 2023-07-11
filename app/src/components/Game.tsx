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

const Game = () => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const param = useParams();
  const [level, setLevel] = useState(Number(param.level));
  const [numberArray, setNumberArray] = useState([]);
  const [index, setIndex] = useState(10);

  //Fetch distractions from third party APIs
  useGetGifs();
  useRandomFacts();

  //create 6 random numbers when the component loads
  useEffect(() => {
    console.log('in useEffect');
    const n = 6;
    const array = [];
    let a;
    let b;

    switch (level) {
      case 1:
        a = 10000000;
        b = 89999999;
        break;
      case 2:
        a = 1000000000;
        b = 8999999999;
        break;
      case 3:
        a = 10000000000;
        b = 89999999999;
        break;
      case 4:
        a = 100000000000;
        b = 899999999999;
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

  //function to set index state from children
  const handleIndexState = () => {
    setIndex(index + 1);
  };

  //function to set index back to 10 from children
  const resetIndexState = () => {
    setIndex(10);
  };

  const handleClick = () => {
    console.log('handleClick');
    setIndex(0);
  };

  console.log('numbers are', numberArray);

  if (index == 0) {
    return (
      <RoundOne
        handleIndexState={handleIndexState}
        number={numberArray[index]}
        round={index + 1}
      />
    );
  }

  if (index == 1) {
    return (
      <RoundTwo
        handleIndexState={handleIndexState}
        number={numberArray[index]}
        round={index + 1}
      />
    );
  }

  if (index == 2) {
    return (
      <RoundThree
        handleIndexState={handleIndexState}
        number={numberArray[index]}
        round={index + 1}
      />
    );
  }

  if (index == 3) {
    return (
      <RoundFour
        handleIndexState={handleIndexState}
        number={numberArray[index]}
        round={index + 1}
      />
    );
  }

  if (index == 4) {
    return (
      <RoundFive
        handleIndexState={handleIndexState}
        number={numberArray[index]}
        round={index + 1}
      />
    );
  }

  if (index == 5) {
    return (
      <RoundSix
        resetIndexState={resetIndexState}
        number={numberArray[index]}
        round={index + 1}
        level={level}
      />
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
