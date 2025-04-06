"use client";
import { useEffect, useState, useRef } from "react"
import { formatTime } from "@/app/(helpers)/formatTime";
import { useTaskStore } from "../_hooks/useTaskStore";

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function BreakTimer() {
  const [breakTime, setBreakTime] = useState<number>(0)
  const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const [seconds, setSeconds] = useState<number>(-1);
  const [percentRem, setPercentRem] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const breakMode = useTaskStore((state) => state.breakMode);
  const forceUpdate = useTaskStore((state) => state.forceUpdate);
  const setForceUpdate = useTaskStore((state) => state.setForceUpdate);
  const setBreakMode = useTaskStore((state) => state.setBreakMode);
  const setEnabled = useTaskStore((state) => state.setPomodoroEnabled)

  const handleStart = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100)

  }

  const handleRestart = () => {
    localStorage.removeItem("lastPauseTime");
    localStorage.removeItem("totalPauseTimeMs");
    localStorage.removeItem("breakStartTime");
    localStorage.removeItem("pomodoroStart");
    setBreakStartTime(null);
    clearInterval(intervalRef.current!);
    setForceUpdate(true);
    setBreakMode(false);
  }
  const handleLeave = () => {
    localStorage.removeItem("pomodoroStart");
    localStorage.removeItem("pomodoroGoalMs");
    localStorage.removeItem("totalPauseTimeMs");
    localStorage.removeItem("lastPauseTime");
    localStorage.removeItem("breakStartTime");
    localStorage.removeItem("breakTimeMs");
    setBreakMode(false);
    setEnabled(false);
  }

  useEffect(() => {
    const storedBreakTime: string | null = localStorage.getItem("breakTimeMs");
    if (storedBreakTime !== null) {
      setBreakTime(Number(storedBreakTime));
      handleStart();
    }
    setNow(Date.now());
  }, [forceUpdate])

  useEffect(() => {
    if (!breakMode) return;

    //only initialize if ur in break mode
    let breakStartTime: string | null = localStorage.getItem("breakStartTime");
    if (breakStartTime === null) {
      localStorage.setItem("breakStartTime", String(Date.now()));
    }
    const startTime: string = localStorage.getItem("breakStartTime")!;
    setBreakStartTime(Number(startTime));
    handleStart();
  }, [breakMode])

  useEffect(() => {
    let activeTime = 0;
    if (breakStartTime !== null) activeTime = Date.now() - breakStartTime;
    const secondsRemaining = Math.round((breakTime - activeTime) / 1000);
    const rem = Math.round(((breakTime - activeTime) / breakTime) * 100);
    setPercentRem(rem);
    setSeconds(Math.max(secondsRemaining, 0));
    if (breakMode) document.title = formatTime(secondsRemaining) + " remaining";

    if (activeTime > breakTime) {
      clearInterval(intervalRef.current!);
      console.log(activeTime, breakTime)
      document.title = "LOCK IN";
      if (Notification.permission === "granted") {
        const text = "Break time over!";
        new Notification("Pomodoro", {
          body: text,
          silent: true
        })
      }
      // const chime = new Audio('/chime.mp3');
      // chime.play().catch(() => {
      //   console.log("break-couldnt-play-sound")
      // })
    }

  }, [now])


  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5">
      <div className="p-5 w-full pb-0">
        <div className="w-full min-h-24 flex items-center align-middle justify-center space-x-5 rounded-xl outline-2 outline-app-bg">
          <h1 className="font-semibold md:text-2xl text-xl text-center">{seconds > 0 ? 'Enjoy your break (:' : 'Pomodoro session completed! Would you like to restart?'}</h1>
        </div>
      </div>
      {seconds > 0 ? (
        <div className="md:w-1/4 w-1/3">
          <CircularProgressbar className="!text-red-50" value={percentRem} text={`${formatTime(seconds)}`} styles={buildStyles(
            {
              textColor: 'var(--color-app-text)',
              pathColor: 'var(--color-app-highlight)',
              trailColor: 'var(--color-app-bg)'
            }
          )} />
        </div>
      ) : (
        <div className="w-full flex space-x-5 justify-center align-middle items-center">
          <p onClick={() => handleRestart()} className="w-fit outline-2 text-xl rounded-xl outline-app-highlight px-2 btn-hover">Yes</p>
          <p onClick={() => handleLeave()} className="w-fit outline-2 text-xl rounded-xl outline-app-highlight px-2 btn-hover">No</p>
        </div>

      )}

    </div>
  )
}
