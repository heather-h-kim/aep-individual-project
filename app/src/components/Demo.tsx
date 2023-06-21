import Timer from './Timer';
import Giphy from './Giphy';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from '@tanstack/react-router';

const Demo = () => {
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
  //
  // return <>{number}</>;

  return <Giphy />;
};

export default Demo;
