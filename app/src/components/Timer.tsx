import { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const deadline = Date.now();
  const getTime = () => {
    const time = Date.now() - deadline;
    const timeInSeconds = time / 1000;
    if (timeInSeconds < 31) {
      setSeconds(Math.floor(time / 1000));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <svg
        className="flex h-80 w-80 text-yellow-400"
        fill="none"
        viewBox="0 0 100 101"
        stroke="currentColor"
        style={{ transform: `rotateX(180deg) rotateZ(-90deg)` }}
      >
        <path
          strokeWidth="4"
          strokeDasharray="157"
          strokeDashoffset="0"
          d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
          className="animate-circle-timer"
        ></path>
        {/*<text*/}
        {/*  textAnchor="middle"*/}
        {/*  x="50"*/}
        {/*  y="50"*/}
        {/*  fontSize="20px"*/}
        {/*  transform="rotate(90 50 50)"*/}
        {/*  textAnchor="start"*/}
        {/*  alignmentBaseline="middle"*/}

        {/*  // transform="translate(50, 40) rotate(270)"*/}
        {/*>*/}
        {/*  {seconds}*/}
        {/*</text>*/}
      </svg>
      <h1>{seconds}</h1>
    </div>
  );
};

export default Timer;
