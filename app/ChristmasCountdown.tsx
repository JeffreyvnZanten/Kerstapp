'use client';

import { useState, useEffect } from 'react';

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      // Create date objects in Netherlands timezone
      const now = new Date();
      // Set to December 25th at 00:00:00
      const christmasDate = new Date(now.getFullYear(), 11, 25);
      
      // If Christmas has passed this year, set for next year
      if (now > christmasDate) {
        christmasDate.setFullYear(christmasDate.getFullYear() + 1);
      }

      // Get time difference in milliseconds
      const difference = christmasDate.getTime() - now.getTime();

      // Convert to days, hours, minutes
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-3xl font-bold mb-4">
        Kerst begint over
      </div>
      <div className="flex gap-4">
        <div className="bg-[#B4E9E2] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-sm">dagen</div>
        </div>
        <div className="bg-[#B4E9E2] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-sm">uren</div>
        </div>
        <div className="bg-[#B4E9E2] p-4 rounded-md w-20">
          <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-sm">minuten</div>
        </div>
      </div>
      <div className="mt-4 text-xl">Wees er klaar voor!</div>
    </div>
  );
};

export default ChristmasCountdown;