// ChristmasCountdown.tsx
'use client';

import Countdown from './Countdown';

const ChristmasCountdown = () => {
    const now = new Date();
    const christmasDate = new Date(now.getFullYear(), 11, 25);
    
    if (now > christmasDate) {
      christmasDate.setFullYear(christmasDate.getFullYear() + 1);
    }

    return (
        <Countdown 
            targetDate={christmasDate} 
            title="Kerst begint over"
        />
    );
};

export default ChristmasCountdown;