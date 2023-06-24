import Timer from './Timer';
import React, { useEffect, useState } from 'react';
import useGetGifs from '../hooks/useGetGifs';
import useRandomFacts from '../hooks/useRandomFacts';
import Giphy from './Giphy';
import RandomFacts from './RandomFacts';

const Demo = () => {
  const [numberArray, setNumberArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [start, setStart] = useState(true);
  const [showNumber, setShowNumber] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showRandomFact, setShowRandomFact] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [lastStep, setLastStep] = useState(false);

  useGetGifs();
  useRandomFacts();

  useEffect(() => {
    const n = 3;
    const array = [];
    do {
      const randomNumber = Math.floor(10000 + Math.random() * 89999);

      if (!array.includes(randomNumber)) {
        array.push(randomNumber);
      }
    } while (array.length < n);
    setNumberArray(array);
  }, []);

  const handleClick = () => {
    setStart(!start);
    setShowNumber(!showNumber);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowQuestion(!showQuestion);

    if (answer == numberArray[index]) {
      setCorrect(!correct);
    } else {
      setIncorrect(!incorrect);
    }

    setAnswer('');
  };

  if (start) {
    return (
      <div>
        <button onClick={handleClick}>START</button>
      </div>
    );
  }

  if (showNumber) {
    setTimeout(() => {
      setShowNumber(!showNumber);

      switch (index) {
        case 0:
          setShowTimer(!showTimer);
          break;
        case 1:
          setShowGif(!showGif);
          break;
        case 2:
          setShowRandomFact(!showRandomFact);
          break;
      }
    }, 1500);

    return (
      <>
        <h1>{numberArray[index]}</h1>
      </>
    );
  }

  if (showTimer) {
    setTimeout(() => {
      setShowTimer(!showTimer);
      setShowQuestion(!showQuestion);
    }, 15000);

    return <Timer />;
  }

  if (showGif) {
    setTimeout(() => {
      setShowGif(!showGif);
      setShowQuestion(!showQuestion);
    }, 15000);

    return <Giphy />;
  }

  if (showRandomFact) {
    setTimeout(() => {
      setShowRandomFact(!showRandomFact);
      setShowQuestion(!showQuestion);
    }, 15000);

    return <RandomFacts />;
  }

  if (showQuestion) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="answer"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            What was the number?
            <input
              type="number"
              id="answer"
              name="answer"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              // required
              value={answer}
              onChange={e => {
                setAnswer(e.target.value);
              }}
            />
          </label>
          <button type="submit">Enter</button>
        </form>
      </>
    );
  }

  if (correct) {
    setTimeout(() => {
      setScore(score + 1);
      setCorrect(!correct);
      setIndex(index + 1);
      if (index < 2) {
        setShowNumber(!showNumber);
      } else {
        console.log('showScore');
        setShowScore(!showScore);
      }
    }, 1000);

    return (
      <>
        <h1>Correct!</h1>
      </>
    );
  }

  if (incorrect) {
    setTimeout(() => {
      setIncorrect(!incorrect);
      setIndex(index + 1);
      if (index < 2) {
        setShowNumber(!showNumber);
      } else {
        setShowScore(!showScore);
      }
    }, 1000);

    return <h1>Wrong...! The number was {numberArray[index]}</h1>;
  }

  if (showScore) {
    console.log('score is', score);
    setTimeout(() => {
      setShowScore(!showScore);
      setLastStep(!lastStep);
    }, 1000);
    return (
      <div>
        <h1>Your score is: {score}</h1>
      </div>
    );
  }

  if (lastStep) {
    return (
      <div>
        <h1>Log in to play more!</h1>
      </div>
    );
  }
};

export default Demo;
