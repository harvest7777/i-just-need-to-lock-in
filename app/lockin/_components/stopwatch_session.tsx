import React, { useState, useEffect, useRef } from "react";
import { getSecondsSinceLastStart } from "../_services/TaskTimeUtils";

interface StopWatchProps {
    focusedTask: Task | null;
    startedFocusedTask: boolean;
}

const SessionStopWatch: React.FC<StopWatchProps> = ({ startedFocusedTask, focusedTask }) => {
    const [startTime, setStartTime] = useState<number|null>(null);
    const [now, setNow] = useState<number|null>(null);
    const focusRef = useRef<number>();
    const intervalRef = useRef<NodeJS.Timeout|null>(null);
    const initialSecondsRef = useRef<number>(0);

    const handleUpdate = async () => {
        // if you switch tasks, reset the timer
        if(focusedTask && focusedTask.task_id!=focusRef.current) {
            // reset session from 0
            initialSecondsRef.current= await getSecondsSinceLastStart(focusedTask.task_id);
            // Setting start time and now time will cause secondsSpent to update, causing re render
            setStartTime(Date.now()-initialSecondsRef.current*1000);
            setNow(Date.now());

        }
        if(focusedTask && startedFocusedTask) {
            // reset session from 0
            initialSecondsRef.current= await getSecondsSinceLastStart(focusedTask.task_id);
            // Setting start time and now time will cause secondsSpent to update, causing re render
            setStartTime(Date.now()-initialSecondsRef.current*1000);
            setNow(Date.now());
        } 
            
    }

    const handleStart = () => {
        // Continuously set a new time which will cuase secondsPassed to update  
        clearInterval(intervalRef.current!);
        intervalRef.current = setInterval(() => {
            // Update the current time every 10ms.
            if(startedFocusedTask) {
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

    useEffect(()=>{
        handleUpdate();
        if(startedFocusedTask===true)
        {
            handleStart();
        }
        else {
            handleStop();
        }
        focusRef.current=focusedTask?.task_id;
        return () => {
            handleStop();
        }
    },[focusedTask])

    const formatTime = (time: number) => {
        if(time===-1) return "Loading...";
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60); 
        const seconds = time % 60;
        let formattedString = "";
        if(hours>0) formattedString += String(hours).padStart(2,"0") + ":";
        formattedString += String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");
        return formattedString;
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl w-fit px-2 bg-appBg rounded-xl">
                {formatTime(secondsPassed)} {/* Display the formatted time */}
            </h1>
        </div>
    );
};

export default SessionStopWatch;
