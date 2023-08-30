import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "../src/css/timeComponent.css";

function TimeComponent() {
  const { authToken } = useAuth();
  const baseURL = process.env.API_URL ?? "http://localhost:8080";
  const [serverTime, setServerTime] = useState(0);
  const [clientTime, setClientTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const fetchTime = useCallback(() => {
    setLoading(true);
    fetch(`${baseURL}/time`, {
      headers: {
        authorization: authToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setServerTime(data.epoch);
      })
      .catch((error) => console.error("Error fetching time:", error))
      .finally(() => setLoading(false));
  },[authToken, baseURL]);

  useEffect(
    () => {
      fetchTime();
      const interval = setInterval(() => setClientTime(new Date()), 1000);
      return () => clearInterval(interval);
    },
    [fetchTime]
  );

  const formatTime = (timeinEpcoh) => {
    const hours = Math.floor(timeinEpcoh / 3600);
    const mins = Math.floor((timeinEpcoh % 3600) / 60);
    const secs = timeinEpcoh % 60;

    return `${hours}:${mins}:${secs}`;

  }

  const calculateTimeDiff = () => {
    const diff = Math.floor(clientTime.getTime() / 1000) - serverTime; //
    return formatTime(diff);
  };

  return (
    <div className="time-component">
      {loading ? (
        <div className="loading-overlay">Loading...</div>
      ) : (
        <>
          <div className="time">
            <div className="header">Server Time:</div>
            <div className="value">{serverTime}</div>
          </div>
          <div className="time-difference">
            <div className="header">Time Difference:</div>
            <div className="value">{calculateTimeDiff()}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default TimeComponent;
