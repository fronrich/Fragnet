import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState("00:00:00");
  const getTime = () => {
    let currentDate = new Date();
    setTime(
      currentDate.getHours() +
        ":" +
        currentDate.getMinutes() +
        ":" +
        currentDate.getSeconds()
    );
  };
  useEffect(() => {
    setInterval(getTime, 1000);
  }, []);
  return <span>{time}</span>;
};

export default Clock;
