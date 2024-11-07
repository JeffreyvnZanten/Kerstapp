import React from "react";
import Countdown from "./Countdown";

export default function NameDrawingEvent() {
    const now = new Date();
    const nameDrawingDate = new Date(now.getFullYear(), 10, 28);
    
    return(
        <Countdown
            targetDate={nameDrawingDate}
            title="Trekking begint op"
        />
    );
}