"use client";
import React, { useState, useEffect } from "react";
import { useTimer } from "react-use-precision-timer";
import { getTaskSeconds } from "../_services/TaskTimeUtils";
import { Task } from "../_services/TaskSchema";
interface StopWatchProps {
    taskId: number;
    focusedTask: Task | null;
    startedFocusedTask: boolean;
}

const StopwatchComponent: React.FC<StopWatchProps> = ({ startedFocusedTask, focusedTask }) => {
    const [initialTime, setInitialTime] = useState(0); // Store initial time fetched from the API
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Use the useStopwatch hook
    const timer = useTimer({fireOnStart: false});

    const getMostUpdatedSeconds = async (taskId: number) => {
        const seconds = await getTaskSeconds(taskId);
        setInitialTime(seconds); // Set the initial time for the stopwatch
        setElapsedSeconds(seconds);
    };

    useEffect(() => {
        // Fetch initial time when the component mounts
        if(focusedTask!=null) getMostUpdatedSeconds(focusedTask.task_id);

        let curEpoch = Date.now();
        curEpoch = curEpoch - (1000*initialTime);
        if(startedFocusedTask) {
            timer.start(curEpoch);
        }
        else {
            timer.pause();
        }

    }, [focusedTask, startedFocusedTask]);

    useEffect(() => {
        // Create an interval to update the elapsed seconds
        const interval = setInterval(() => {
            if(timer.isRunning())
            setElapsedSeconds(Math.floor(timer.getElapsedRunningTime() / 1000));
        }, 100); // Update every 100ms for smooth display

        return () => {
            clearInterval(interval); // Cleanup interval on unmount
        };
    }, [timer]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time/ 3600); // Extract hours
        const minutes = Math.floor((time% 3600) / 60); // Extract minutes
        const seconds = time% 60; // Remaining seconds
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center bg-red-100">
            <h1 className="text-3xl font-bold w-min bg-orange-50">
                {formatTime(elapsedSeconds)} {/* Display the formatted time */}
            </h1>
        </div>
    );
};

export default StopwatchComponent;
