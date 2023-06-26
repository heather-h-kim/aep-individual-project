import { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const deadline = Date.now();
  const getTime = () => {
    const time = Date.now() - deadline;
    const timeInSeconds = time / 1000;
    if (timeInSeconds < 16) {
      setSeconds(Math.floor(time / 1000));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 flex h-screen flex-col items-center justify-center bg-cyan-50">
      <svg
        className="h-90 w-90 flex"
        fill="none"
        viewBox="0 0 100 101"
        style={{ transform: `rotateZ(90deg)` }}
      >
        <path
          strokeWidth="4"
          strokeDasharray="157"
          strokeDashoffset="0"
          stroke="#E8E8E8"
          d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
        ></path>
        <path
          strokeWidth="4"
          strokeDasharray="157"
          strokeDashoffset="0"
          stroke="#03FC52"
          d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
          className="animate-15s-circle-timer"
        ></path>
        <text
          textAnchor="middle"
          x="50"
          y="50"
          fontSize="20px"
          fill="#03FC52"
          transform="rotate(-90 50 50)"
          alignmentBaseline="middle"
        >
          {seconds}
        </text>
      </svg>
    </div>
  );
};

export default Timer;
