import Timer from './Timer';
import Giphy from './Giphy';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from '@tanstack/react-router';
import RandomFacts from './RandomFacts';

const Demo = () => {
  const [number, setNumber] = useState(0);
  const [numbers, setNumbers] = useState([]);

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
  };

  const randomNumbers = numbers.map((item, index) => (
    <h1 key={index}>{item}</h1>
  ));

  // const number = Math.floor(Math.random() * 1000);
  // const [redirect, setRedirect] = useState(false);
  //
  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     setRedirect(true);
  //   }, 3000);
  //
  //   return () => clearTimeout(timeOut);
  // }, []);
  //
  // if (redirect) {
  //   return <Navigate to="/timer" />;
  // }

  return (
    <div>
      <button onClick={handleClick}>START</button>
      <div>{randomNumbers}</div>
    </div>
  );
};

export default Demo;
