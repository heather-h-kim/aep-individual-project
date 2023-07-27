import React, { useEffect, useState } from 'react';
import useGetGifs from '../hooks/useGetGifs';
import useRandomFacts from '../hooks/useRandomFacts';
import { useDistractionStore } from '../store/distractionStore';
import DemoTimer from './DemoTimer';
import { useUserStore } from '../store/userStore';
import { useColorsStore } from '../store/colorStore';

const Demo = () => {
  const globalUser = useUserStore(state => state.user);
  const { themeBgColor, themeFgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    themeFgColor: state.fgcolor,
    preview: state.preview,
  }));
  const [isHover, setIsHover] = useState(false);
  const style = {
    ...(globalUser.userId
      ? preview
        ? { backgroundColor: themeBgColor }
        : { backgroundColor: globalUser.bgcolor }
      : { backgroundColor: '#ECFEFF' }),
  };
  const buttonStyle = {
    ...(globalUser.userId
      ? isHover
        ? { backgroundColor: '#404040' }
        : { backgroundColor: '#525252' }
      : { backgroundColor: '#ECFEFF' }),
  };

  const [numberArray, setNumberArray] = useState([]);
  const [step, setStep] = useState('');
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const gif = useDistractionStore(state => state.gif);
  const randomFact = useDistractionStore(state => state.randomFact);

  useGetGifs();
  useRandomFacts();

  useEffect(() => {
    const n = 3;
    const array = [];
    do {
      const randomNumber = Math.floor(100000 + Math.random() * 899999);

      if (!array.includes(randomNumber)) {
        array.push(randomNumber);
      }
    } while (array.length < n);
    setNumberArray(array);
  }, []);

  useEffect(() => {
    console.log('in demo useEffect for setTimeout');
    //set delay time conditionally
    let delay;
    switch (step) {
      case 'showNumber':
        delay = 1500;
        break;
      case 'showDistraction':
        delay = 10000;
        break;
      case 'correct':
        delay = 1500;
        break;
      case 'incorrect':
        delay = 1500;
        break;
      case 'showScore':
        delay = 2000;
        break;
      default:
        delay = 0;
    }

    //setTimeout function with different callback functions depending on the step state
    const timer = setTimeout(() => {
      switch (step) {
        case 'showNumber':
          setStep('showDistraction');
          break;
        case 'showDistraction':
          setStep('showQuestion');
          break;
        case 'correct':
          if (index < 2) {
            setIndex(index + 1);
            setScore(score + 1);
            setStep('showNumber');
          }
          if (index == 2) {
            setStep('showScore');
          }
          break;
        case 'incorrect':
          if (index < 2) {
            setIndex(index + 1);
            setStep('showNumber');
          }
          if (index == 2) {
            setStep('showScore');
          }
          break;
        case 'showScore':
          setStep('lastStep');
          break;
        default:
          console.log('timeout hook');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [step]);

  const handleClick = () => {
    setStep('showNumber');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (answer == numberArray[index]) {
      setStep('correct');
    } else {
      setStep('incorrect');
    }

    setAnswer('');
  };

  if (step == 'showNumber') {
    return (
      <div
        style={style}
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className="text-8xl font-extrabold tracking-widest">
          {numberArray[index]}
        </h1>
      </div>
    );
  }

  if (step == 'showDistraction') {
    if (index == 0) {
      return <DemoTimer />;
    }

    if (index == 1) {
      return (
        <div
          style={style}
          className="my-10 flex h-screen flex-col items-center justify-center"
        >
          <img src={gif[0]} alt="cat gif" />
        </div>
      );
    }

    if (index == 2) {
      return (
        <div
          style={style}
          className="my-10 flex h-screen flex-col items-center justify-center"
        >
          <h1 className="justify-center px-8 text-6xl font-medium">
            {randomFact[0]}
          </h1>
        </div>
      );
    }
  }

  if (step == 'showQuestion') {
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500"
            // required
            value={answer}
            onChange={e => {
              setAnswer(e.target.value);
            }}
          />
          <button
            className="inline-block rounded bg-blue-500 px-3 py-2 text-2xl font-medium text-white hover:bg-blue-700"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  if (step == 'correct') {
    return (
      <div
        style={style}
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className=" pb-8 text-6xl font-medium">Correct!</h1>
      </div>
    );
  }

  if (step == 'incorrect') {
    return (
      <div
        style={style}
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className=" pb-8 text-6xl font-medium">
          Wrong...! The number was {numberArray[index]}
        </h1>
      </div>
    );
  }

  if (step == 'showScore') {
    console.log('score is', score);
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

  if (step == 'lastStep') {
    return (
      <div
        style={style}
        className="my-10 flex h-screen flex-col items-center justify-center"
      >
        <h1 className=" pb-8 text-6xl font-medium">Log in to play more!</h1>
      </div>
    );
  }

  return (
    <div
      style={style}
      className="my-10 flex h-screen flex-col items-center justify-center "
    >
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="inline-block rounded px-3 py-2 text-6xl font-medium text-white"
        onClick={handleClick}
      >
        START
      </button>
    </div>
  );
};

export default Demo;
