import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";

import WordBlock from "@/components/ui/word-block";

import { getSecondsSinceLastStart } from "@/app/(api)/taskTimeServices";
import { useTaskStore } from "../_hooks/useTaskStore";

interface StopWatchProps {
  // focusedTask: Task | null;
  // startedFocusedTask: boolean;
  setCancelVisible: Dispatch<SetStateAction<boolean>>;
}

const SessionStopWatch: React.FC<StopWatchProps> = ({ setCancelVisible }) => {
  const focusedTask = useTaskStore((state) => state.focusedTask);
  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const focusRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialSecondsRef = useRef<number>(0);

  const handleUpdate = async () => {
    // if you switch tasks, reset the timer
    if (focusedTask && focusedTask.task_id != focusRef.current) {
      // reset session from 0
      initialSecondsRef.current = await getSecondsSinceLastStart(focusedTask.task_id);
      // Setting start time and now time will cause secondsSpent to update, causing re render
      setStartTime(Date.now() - initialSecondsRef.current * 1000);
      setNow(Date.now());

    }
    if (focusedTask && startedFocusedTask) {
      // reset session from 0
      initialSecondsRef.current = await getSecondsSinceLastStart(focusedTask.task_id);
      // Setting start time and now time will cause secondsSpent to update, causing re render
      setStartTime(Date.now() - initialSecondsRef.current * 1000);
      setNow(Date.now());
    }

  }

  const handleStart = () => {
    // Continuously set a new time which will cuase secondsPassed to update  
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      // Update the current time every 10ms.
      if (startedFocusedTask) {
        setNow(Date.now());
      }
    }, 500);
  }

  const handleStop = () => {
    clearInterval(intervalRef.current!);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = Math.floor((now - startTime) / 1000);
  }

  useEffect(() => {
    handleUpdate();
    if (startedFocusedTask === true) {
      handleStart();
    }
    else {
      handleStop();
    }
    if (focusedTask !== null) focusRef.current = focusedTask.task_id;
    else focusRef.current = null;

    return () => {
      handleStop();
    }
  }, [focusedTask, startedFocusedTask])

  const formatTime = (time: number) => {
    if (time === -1) return "Loading...";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    let formattedString = "";
    if (hours > 0) formattedString += String(hours).padStart(2, "0") + ":";
    formattedString += String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    return formattedString;
  };

  return (
    <div className="md:text-2xl text-xl flex items-center align-middle justify-center space-x-2">
      <WordBlock text={formatTime(secondsPassed)} />
      {focusedTask?.last_start_time && <h1 onClick={() => setCancelVisible(true)} className="w-fit px-2 rounded-xl btn-hover bg-red-800 hover:text-app-fg">cancel</h1>}
    </div>
  );
};

export default SessionStopWatch;
