import React, { useState, useEffect } from "react";
import { useTimer } from "react-use-precision-timer";
import { getTaskSeconds, getSecondsSinceLastStart } from "../_services/TaskTimeUtils";
import { Task } from "../_services/TaskSchema";

interface StopWatchProps {
    taskId: number;
    focusedTask: Task | null;
    startedFocusedTask: boolean;
}

const StopwatchComponent: React.FC<StopWatchProps> = ({ startedFocusedTask, focusedTask }) => {
    const [initialTime, setInitialTime] = useState(0); // Store initial time fetched from the API
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const timer = useTimer({ fireOnStart: false });

    // Fetch initial time for the task from the API
    const getMostUpdatedSeconds = async (taskId: number) => {
        const seconds = await getTaskSeconds(taskId) + await getSecondsSinceLastStart(taskId);
        setInitialTime(seconds); // Set the initial time for the stopwatch
        setElapsedSeconds(seconds); // Keep track of elapsed time
    };

    useEffect(()=>{
        // Update times when starting a new task
        if(focusedTask!=null) getMostUpdatedSeconds(focusedTask.task_id);
    },[focusedTask])

    useEffect(() => {
        // If there's a focused task and it's started, initialize or continue the timer
        if (startedFocusedTask && focusedTask) {
            getMostUpdatedSeconds(focusedTask.task_id);
            console.log("started timer");
            const curEpoch = Date.now() - elapsedSeconds * 1000;
            timer.start(curEpoch); // Start timer with the current epoch time minus the elapsed time
        } else {
            // Pause if not started
            console.log("Pausing timer");
            timer.pause();
        }

        // Cleanup on component unmount or when focused task changes
        // I REMOVED FOCUSED TASK FROM HERE
    }, [startedFocusedTask, initialTime, timer]); // Ensure effect runs when task changes or timer state updates

    useEffect(() => {
        // Interval to update the elapsed seconds every 100ms for smooth display
        const interval = setInterval(() => {
            if (timer.isRunning()) {
                setElapsedSeconds(Math.floor(timer.getElapsedRunningTime() / 1000));
            }
        }, 100);

        return () => {
            clearInterval(interval); // Cleanup interval when component unmounts
        };
    }, [timer]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600); // Extract hours
        const minutes = Math.floor((time % 3600) / 60); // Extract minutes
        const seconds = time % 60; // Remaining seconds
        let formattedString = "";
        if(hours>0) formattedString += String(hours).padStart(2,"0");
        formattedString += String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");
        return formattedString;
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="lg:text-6xl text-5xl w-min">
                {formatTime(elapsedSeconds)} {/* Display the formatted time */}
            </h1>
        </div>
    );
};

export default StopwatchComponent;
