"use client";

import { formatTime } from "@/app/(helpers)/formatTime";
import WordBlock from "@/components/ui/word-block";
import { useState, useEffect, useRef } from "react";
import { useTaskStore } from "../_hooks/useTaskStore";

export default function PomodoroTimeDisplay() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);
  const setBreakMode = useTaskStore((state) => state.setBreakMode);
  const [now, setNow] = useState<number>(Date.now());
  const [pomodoroGoalMs, setPomodoroGoalMs] = useState<number | null>(null);

  const handleStart = () => {
    const storedPausedTotal: string | null = localStorage.getItem("totalPauseTimeMs");
    const lastPause: string | null = localStorage.getItem("lastPauseTime");

    let timeSpentPaused = 0;
    // calculate offset from paused 
    if (storedPausedTotal !== null) timeSpentPaused = Number(storedPausedTotal);
    if (lastPause !== null) timeSpentPaused += Date.now() - Number(lastPause);
    pausedTimeRef.current = timeSpentPaused;
    localStorage.setItem("totalPauseTimeMs", String(timeSpentPaused));
    localStorage.removeItem("lastPauseTime");

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100)
  }

  const handlePause = () => {
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

    return () => clearInterval(intervalRef.current!);
  }, [])

  useEffect(() => {
    if (startedFocusedTask) handleStart();
    else handlePause();

  }, [startedFocusedTask])

  // seconds u got left on the timer
  let seconds = -1;
  if (startTime !== null && pomodoroGoalMs !== null && pausedTimeRef.current !== null) seconds = Math.round(((pomodoroGoalMs - (now - startTime - pausedTimeRef.current)) / 1000));
  if (seconds <= 0) {
    return (
      <div>
        <WordBlock className="w-fit !text-3xl p-2" text={`${formatTime(0)}🪿`} />
      </div>
    )
  }

  return (
    <div>
      <WordBlock className="w-fit !text-3xl p-2" text={`${formatTime(seconds)}🪿`} />
    </div>
  )
}
