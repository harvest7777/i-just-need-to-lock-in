"use client";

import { formatTime } from "@/app/(helpers)/formatTime";
import { useState, useEffect, useRef } from "react";
import { useTaskStore } from "../_hooks/useTaskStore";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function PomodoroTimeDisplay() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [pomodoroGoalMs, setPomodoroGoalMs] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number>(-1);
  const [percentRem, setPercentRem] = useState<number>(1);

  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);
  const focusedTask = useTaskStore((state) => state.focusedTask);
  const forceUpdate = useTaskStore((state) => state.forceUpdate);
  const setForceUpdate = useTaskStore((state) => state.setForceUpdate);
  const handlePauseTask = useTaskStore((state) => state.handlePauseTask);
  const setBreakMode = useTaskStore((state) => state.setBreakMode);


  const breakRef = useRef<boolean>(false);
  const [now, setNow] = useState<number>(Date.now());

  const handleStart = () => {
    const storedPausedTotal: string | null = localStorage.getItem("totalPauseTimeMs");
    const lastPause: string | null = localStorage.getItem("lastPauseTime");
    const storedStart: string | null = localStorage.getItem("pomodoroStart");

    //you may be starting for the first time
    if (storedStart === null) {
      localStorage.setItem("pomodoroStart", String(Date.now()));
      startTimeRef.current = Date.now();
    } else {
      startTimeRef.current = Number(storedStart);
    }

    clearInterval(intervalRef.current!);
    //you may be starting from a paused state
    let timeSpentPaused = 0;
    if (storedPausedTotal !== null) timeSpentPaused = Number(storedPausedTotal);
    if (lastPause !== null) timeSpentPaused += Date.now() - Number(lastPause);
    pausedTimeRef.current = timeSpentPaused;
    localStorage.setItem("totalPauseTimeMs", String(timeSpentPaused));
    localStorage.removeItem("lastPauseTime");
    setNow(Date.now());

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 500)
  }

  const handlePause = () => {
    //pauses by making the interval stop updating
    clearInterval(intervalRef.current!);
  }

  const enterBreakMode = () => {
    breakRef.current = true;
    setBreakMode(true);
    clearInterval(intervalRef.current!);
  }

  useEffect(() => {
    const storedStart: string | null = localStorage.getItem("pomodoroStart");
    const storedGoal: string | null = localStorage.getItem("pomodoroGoalMs");
    const lastPause: string | null = localStorage.getItem("lastPauseTime");
    const storedPausedTotal: string | null = localStorage.getItem("totalPauseTimeMs");

    // get the time spent paused
    let timeSpentPaused = 0;
    if (storedPausedTotal !== null) timeSpentPaused = Number(storedPausedTotal);
    if (lastPause !== null) timeSpentPaused += Date.now() - Number(lastPause);
    pausedTimeRef.current = timeSpentPaused;

    //initialize start time and goal
    if (storedGoal !== null) setPomodoroGoalMs(Number(storedGoal));
    if (storedStart !== null) startTimeRef.current = Number(storedStart);
    if (startedFocusedTask) handleStart();

    setNow(Date.now());

    return () => clearInterval(intervalRef.current!);
  }, [])

  // this useeffect's only responsibility is updating activetime when now updates
  useEffect(() => {
    let curActiveTime = 0;
    let supposedStart = Date.now();
    if (startTimeRef.current !== null) supposedStart = startTimeRef.current;
    if (pomodoroGoalMs !== null && pausedTimeRef.current !== null) {
      curActiveTime = now - supposedStart - pausedTimeRef.current;
      const secRemaining = Math.round((pomodoroGoalMs - curActiveTime) / 1000);
      const rem = Math.round(((pomodoroGoalMs - curActiveTime) / pomodoroGoalMs) * 100);
      document.title = formatTime(secRemaining) + " remaining";
      setPercentRem(rem);
      setSeconds(Math.max(0, secRemaining));

      //break mode may be entered without having a focused task. ex when refreshing
      if (curActiveTime >= pomodoroGoalMs && !breakRef.current) {
        document.title = "LOCK IN";
        const text = "You've just finished your work session!";
        if (localStorage.getItem("notifications") === "yes") {
          new Notification("Pomodoro", {
            body: text,
            silent: true
          })
        }
        enterBreakMode();
      }
      //finished working period
      if (focusedTask && startedFocusedTask && curActiveTime >= pomodoroGoalMs) {
        handlePauseTask(focusedTask);
        // const chime = new Audio('/chime.mp3');
        // chime.play().catch(() => {
        //   console.log('work-couldnt-play-sound');
        // })
      }
    }

  }, [now])

  useEffect(() => {
    if (startedFocusedTask) handleStart();
    else handlePause();

  }, [startedFocusedTask, forceUpdate])

  useEffect(() => {
    if (!forceUpdate) return;
    pausedTimeRef.current = 0;
    startTimeRef.current = null;
    breakRef.current = false;
    setForceUpdate(false);
    // clearInterval(intervalRef.current!);
    setNow(Date.now());
    return () => clearInterval(intervalRef.current!);

  }, [forceUpdate])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="md:w-1/4 w-1/3">
        <CircularProgressbar className="!text-red-50" value={percentRem} text={`${formatTime(seconds)}`} styles={buildStyles(
          {
            textColor: 'var(--color-app-text)',
            pathColor: 'var(--color-app-highlight)',
            trailColor: 'var(--color-app-bg)'
          }
        )} />
      </div>
    </div>
  )
}
