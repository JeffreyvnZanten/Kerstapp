import React from "react";
import Countdown from "./Countdown";

export default function NameDrawingEvent() {
    const now = new Date();
    const nameDrawingDate = new Date(now.getFullYear(), 10, 28);
    
    return(
        <div className="space-y-4 mt-4 flex flex-col items-center">
            <Countdown
                targetDate={nameDrawingDate}
                title="Trekking begint over"
            />
            <button 
                type="submit"
                onClick={() => console.log('doe mee clicked')}
                className="bg-red-800 text-white px-8 py-3 space-y-4 rounded-lg w-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >Doe mee
            </button>
        </div>
    );
}