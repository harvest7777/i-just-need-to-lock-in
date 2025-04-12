"use client";
import { useEffect, useState, useRef } from "react"
import { formatTime } from "@/app/(helpers)/formatTime";
import { useTaskStore } from "../_hooks/useTaskStore";

import EditPomodoroTimes from "./EditPomodoroTimes";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function BreakTimer() {
  const [breakTime, setBreakTime] = useState<number>(0)
  const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const [seconds, setSeconds] = useState<number>(-1);
  const [percentRem, setPercentRem] = useState(1);
  const [showEdit, setShowEdit] = useState<boolean>(false);
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
    }, 500)

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
  const handleSkipBreak = () => {
    clearInterval(intervalRef.current!);
    document.title = "LOCK IN";
    setSeconds(0);
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
    if (breakMode) document.title = formatTime(secondsRemaining) + " break";

    if (activeTime > breakTime) {
      clearInterval(intervalRef.current!);
      document.title = "LOCK IN";
      if (localStorage.getItem("notifications") === "yes") {
        const text = "Break time over!";
        new Notification("Pomodoro", {
          body: text,
          silent: true
        })
      }
    }

  }, [now])


  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5">
      <div className="p-5 w-full pb-0">
        <div className="w-full min-h-24 flex items-center align-middle justify-center space-x-5 rounded-xl outline-2 outline-app-bg">
          <h1 className="px-2 font-semibold md:text-2xl text-xl text-center">{seconds > 0 ? 'Enjoy your break (:' : 'Pomodoro session completed, great job 😊'}</h1>
        </div>
      </div>
      {seconds > 0 ? (
        <div className="md:w-1/4 w-1/3 flex flex-col items-center">
          <CircularProgressbar className="!text-red-50" value={percentRem} text={`${formatTime(seconds)}`} styles={buildStyles(
            {
              textColor: 'var(--color-app-text)',
              pathColor: 'var(--color-app-highlight)',
              trailColor: 'var(--color-app-bg)'
            }
          )} />
          <button onClick={() => handleSkipBreak()} className="text-center bg-app-bg rounded-xl px-2 md:text-xl text-md mt-5 btn-hover">skip break 💀</button>
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full flex space-x-5 justify-center align-middle items-start md:text-xl text-md">
            <button onClick={() => handleRestart()} className="w-fit outline-2  rounded-xl outline-app-highlight px-2 btn-hover">Restart</button>
            <button onClick={() => setShowEdit(!showEdit)} className="w-fit outline-2  rounded-xl outline-app-highlight px-2 btn-hover">Edit Times</button>
            <button onClick={() => handleLeave()} className="w-fit outline-2 rounded-xl outline-app-highlight px-2 btn-hover">Exit</button>
          </div>

          {showEdit &&
            <div className="w-full">
              <EditPomodoroTimes />
            </div>
          }
        </div>
      )}

    </div>
  )
}
