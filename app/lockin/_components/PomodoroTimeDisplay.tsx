"use client";

import { formatTime } from "@/app/(helpers)/formatTime";
import { useState, useEffect, useRef } from "react";

export default function PomodoroTimeDisplay() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  // const [pausedTime, setPausedTime] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const [pomodoroGoalMs, setPomodoroGoalMs] = useState<number | null>(null);

  const handleStart = () => {
    const storedPausedTotal: string | null = localStorage.getItem("totalPauseTimeMs");
    const lastPause: string | null = localStorage.getItem("lastPauseTime");

    let timeSpentPaused = 0;
    if (storedPausedTotal !== null) timeSpentPaused = Number(storedPausedTotal);
    if (lastPause !== null) timeSpentPaused += Date.now() - Number(lastPause);
    // setPausedTime(timeSpentPaused);
    pausedTimeRef.current = timeSpentPaused;
    localStorage.setItem("totalPauseTimeMs", String(timeSpentPaused));
    localStorage.removeItem("lastPauseTime");

    console.log("from handlestart", timeSpentPaused);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100)
  }

  const handlePause = () => {
    console.log("paused")
    clearInterval(intervalRef.current!);
    localStorage.setItem("lastPauseTime", String(Date.now()));
  }

  useEffect(() => {
    const storedStart: string | null = localStorage.getItem("pomodoroStart");
    const storedGoal: string | null = localStorage.getItem("pomodoroGoalMs");
    const storedPausedTotal: string | null = localStorage.getItem("totalPauseTimeMs");
    const lastPause: string | null = localStorage.getItem("lastPauseTime");

    // get the time spent paused
    let timeSpentPaused = 0;
    if (storedPausedTotal !== null) timeSpentPaused = Number(storedPausedTotal);

    if (lastPause !== null) timeSpentPaused += Date.now() - Number(lastPause);
    if (storedStart !== null && storedGoal !== null) {
      setStartTime(Number(storedStart));
      setPomodoroGoalMs(Number(storedGoal));
      pausedTimeRef.current = timeSpentPaused;
      // setPausedTime(timeSpentPaused);
      setNow(Date.now());
    }
    if (lastPause === null) handleStart();

    return () => clearInterval(intervalRef.current!);
  }, [])

  // seconds u got left on the timer
  let seconds = -1;
  if (startTime !== null && pomodoroGoalMs !== null && pausedTimeRef.current !== null) seconds = ((pomodoroGoalMs - (now - startTime - pausedTimeRef.current)) / 1000);
  if (seconds === -1) return <p>didnt start pomodoro yet</p>
  return (
    <div>
      <p onClick={() => handleStart()}>start</p>
      <p onClick={() => handlePause()}>pause</p>
      <p>{seconds}</p>
      <p>paused: {pausedTimeRef.current}</p>
    </div>
  )
}
