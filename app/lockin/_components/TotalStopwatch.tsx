import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

import WordBlock from "@/components/ui/word-block";

import { getTaskSeconds } from "@/app/(api)/taskTimeServices";

interface StopWatchProps {
  focusedTask: Task | null;
  startedFocusedTask: boolean;
  setCancelVisible: Dispatch<SetStateAction<boolean>>;
}

const StopwatchComponent: React.FC<StopWatchProps> = ({ startedFocusedTask, focusedTask, setCancelVisible }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialSecondsRef = useRef<number>(0);

  const handleUpdate = async () => {
    // If there is a focused task, get its initial seconds
    if (focusedTask) {
      initialSecondsRef.current = await getTaskSeconds(focusedTask.task_id);
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
    }, 100);
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
    return () => {
      handleStop();
    }
  }, [focusedTask])

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

export default StopwatchComponent;
