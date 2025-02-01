import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { getTaskSecondsFromIntervals} from "../_services/TaskTimeUtils";

interface StopWatchProps {
    focusedTask: Task | null;
    startedFocusedTask: boolean;
    taskIntervals: TaskInterval[];
    setCancelVisible: Dispatch<SetStateAction<boolean>>;
}

const DailyStopwatch: React.FC<StopWatchProps> = ({ startedFocusedTask, focusedTask, taskIntervals, setCancelVisible }) => {
    useEffect(()=>{
        if(taskIntervals.length==0) {
            setStartTime(Date.now());
        }
    },[taskIntervals])
    const [startTime, setStartTime] = useState<number|null>(null);
    const [now, setNow] = useState<number|null>(null);
    const intervalRef = useRef<NodeJS.Timeout|null>(null);
    const initialSecondsRef = useRef<number>(0);

    const handleUpdate = async () => {
        // If there is a focused task, get its initial seconds
        if(focusedTask) {
            initialSecondsRef.current= await getTaskSecondsFromIntervals(focusedTask, taskIntervals);
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
        <div className="flex items-center align-middle justify-center space-x-2">
            <h1 className="text-2xl w-fit px-2 bg-appBg rounded-xl">
                {formatTime(secondsPassed)} {/* Display the formatted time */}
            </h1>
            {focusedTask?.last_start_time && <h1 onClick={()=>setCancelVisible(true)} className="text-2xl w-fit px-2 bg-appBg rounded-xl btn-hover hover:bg-red-600 hover:text-appFg">cancel</h1>}
        </div>
    );
};

export default DailyStopwatch;
