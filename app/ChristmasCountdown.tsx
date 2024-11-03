'use client';

import { useState, useEffect } from 'react';

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const christmasDate = new Date(new Date().getFullYear(), 11, 25);
      if (christmasDate.getTime() < new Date().getTime()) {
        christmasDate.setFullYear(christmasDate.getFullYear() + 1);
      }

      const difference = christmasDate.getTime() - new Date().getTime();
      
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-3xl font-bold mb-4">
        Christmas celebration begins in
      </div>
      <div className="flex gap-4">
        <div className="bg-[#B4E9E2] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-sm">hrs</div>
        </div>
        <div className="bg-[#B4E9E2] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-sm">min</div>
        </div>
        <div className="bg-[#B4E9E2] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-sm">sec</div>
        </div>
      </div>
      <div className="mt-4 text-xl">Be ready!</div>
    </div>
  );
};

export default ChristmasCountdown;