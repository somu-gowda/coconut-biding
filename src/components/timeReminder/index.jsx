import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { v4 } from "uuid";
import "./style.css";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timers">No Bidding...</div>;
  }

  return (
    <div className="timers">
      <div className="text">Checking</div>
      <div className="value">{remainingTime}</div>
      <div className="text">New Bid</div>
    </div>
  );
};

const TimeReminder = () => {
  const [resetValue, setResetValue] = useState(5);
  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          key={v4()}
          isPlaying
          duration={resetValue}
          colors={["#004777", 0.33]}
          onComplete={() => [true, 10000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default TimeReminder;
