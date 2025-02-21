import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  return <div className="mt-4 text-lg font-bold text-red-600">Time Left: {timeLeft}s</div>;
};

export default Timer;
