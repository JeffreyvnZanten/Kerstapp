import React from "react";
import { useState, useEffect } from 'react';

// Countdown.tsx
interface CountdownProps {
    targetDate: Date | null;
    title: string;
}
  
function calculateTimeLeft(targetDate: Date) {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    };
}
  
export default function Countdown({ targetDate, title }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(targetDate ? calculateTimeLeft(targetDate) : null);
    const style = {
        font1 : "font-MoC",
        font2 : "font-kranky",
        font3: "font-cinzel"
    };

    useEffect(() => {
        if (!targetDate) return;

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className={`flex flex-col items-center justify-center text-center text-white ${style.font3}`}>
            <div className="text-3xl font-bold mb-4">
                {title}
            </div>
            {targetDate && timeLeft ? (
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
            ) : (
                <div>Geen datum geselecteerd</div>
            )}
        </div>
    );
}