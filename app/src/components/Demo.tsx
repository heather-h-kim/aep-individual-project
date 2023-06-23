import Timer from './Timer';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from '@tanstack/react-router';
import useGetGifs from '../hooks/useGetGifs';
import useRandomFacts from '../hooks/useRandomFacts';

const Demo = () => {
  const [numbers, setNumbers] = useState([]);
  const [numberIndex, setNumberIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [timer, setTimer] = useState(false);
  const { giphy } = useGetGifs();
  const { randomFacts } = useRandomFacts();

  giphy();
  randomFacts();

  const handleClick = () => {
    const n = 3;
    const array = [];
    do {
      const randomNumber = Math.floor(10000 + Math.random() * 89999);

      if (!array.includes(randomNumber)) {
        array.push(randomNumber);
      }
    } while (array.length < n);
    setNumbers(array);
    setShowNumber(true);
  };

  // console.log(gif);
  // console.log(randomFact);
  if (!showNumber) {
    return (
      <div>
        <button onClick={handleClick}>START</button>
      </div>
    );
  }

  if (showNumber) {
    setTimeout(() => {
      setShowNumber(false);
      setNumberIndex(numberIndex + 1);
      setTimer(true);
    }, 3000);

    return (
      <>
        <h1>{numbers[{ numberIndex }]}</h1>
      </>
    );
  }

  if (setTimer) {
    return <Timer />;
  }
};

export default Demo;
