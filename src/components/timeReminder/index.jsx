import React, { useEffect, useMemo, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./style.css";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timers">Too lale...</div>;
  }

  return (
    <div className="timers">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const TimeReminder = ({ countTime }) => {
  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={(countTime / 1000) % 60}
          colors={["#004777", 0.33]}
          onComplete={() => [true, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default TimeReminder;
