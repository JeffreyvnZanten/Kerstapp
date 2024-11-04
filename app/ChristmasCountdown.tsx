'use client';

import { useState, useEffect } from 'react';

const calculateTimeLeft = () => {
  const now = new Date();
  const christmasDate = new Date(now.getFullYear(), 11, 25);
  
  if (now > christmasDate) {
    christmasDate.setFullYear(christmasDate.getFullYear() + 1);
  }

  const difference = christmasDate.getTime() - now.getTime();

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  };
};

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); // Calculate immediately

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center text-white">
      <div className="text-3xl font-bold mb-4">
        Kerst begint over
      </div>
      <div className="flex gap-4">
        <div className="bg-[#006400] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-sm">dagen</div>
        </div>
        <div className="bg-[#006400] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-sm">uren</div>
        </div>
        <div className="bg-[#006400] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-sm">minuten</div>
        </div>
      </div>
    </div>
  );
};

export default ChristmasCountdown;