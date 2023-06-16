import { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const deadline = Date.now();
  const getTime = () => {
    const time = Date.now() - deadline;
    const timeInSeconds = time / 1000;
    if (timeInSeconds < 30) {
      setSeconds(Math.floor(time / 1000));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Countdown: {seconds}</h1>
    </div>
  );
};

export default Timer;
