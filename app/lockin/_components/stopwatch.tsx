import React, { useState, useEffect, useRef } from "react";
import { useTimer } from "react-use-precision-timer";
import { getTaskSeconds, getSecondsSinceLastStart } from "../_services/TaskTimeUtils";
import { Task } from "../_services/TaskSchema";
import { NodejsRequestData } from "next/dist/server/web/types";

interface StopWatchProps {
    taskId: number;
    focusedTask: Task | null;
    startedFocusedTask: boolean;
}

const StopwatchComponent: React.FC<StopWatchProps> = ({ startedFocusedTask, focusedTask }) => {
    const [startTime, setStartTime] = useState<number|null>(null);
    const [now, setNow] = useState<number|null>(null);
    const intervalRef = useRef<NodeJS.Timeout|null>(null);

    const handleUpdate = async () => {
      let initialSeconds= 0;
      if(focusedTask)
      {
        initialSeconds= await getTaskSeconds(focusedTask?.task_id) + await getSecondsSinceLastStart(focusedTask?.task_id);
        console.log("inital sec",initialSeconds)
      }
      setStartTime(Date.now()-initialSeconds*1000);
      setNow(Date.now());

    }

    async function handleStart() {
      // Start counting.
      clearInterval(intervalRef.current!);
      intervalRef.current = setInterval(() => {
        // Update the current time every 10ms.
        setNow(Date.now());
      }, 1000);
    }
    function handleStop() {
        clearInterval(intervalRef.current!);
    } 

    let secondsPassed = 0;
    if (startTime != null && now != null) {
      secondsPassed = Math.floor((now - startTime) / 1000);
    }

    useEffect(()=>{handleUpdate()},[focusedTask])
    useEffect(()=>{
        if(startedFocusedTask===true)
        {
            console.log("started task!")
            handleUpdate();
            handleStart();
        }
        else {
            console.log("STOPING")
            handleStop();
        }
        return () => clearInterval(intervalRef.current!)
    },[startedFocusedTask])

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600); // Extract hours
        const minutes = Math.floor((time % 3600) / 60); // Extract minutes
        const seconds = time % 60; // Remaining seconds
        let formattedString = "";
        if(hours>0) formattedString += String(hours).padStart(2,"0") + ":";
        formattedString += String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");
        return formattedString;
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="lg:text-6xl text-5xl w-min">
                {formatTime(secondsPassed)} {/* Display the formatted time */}
            </h1>
        </div>
    );
};

export default StopwatchComponent;
