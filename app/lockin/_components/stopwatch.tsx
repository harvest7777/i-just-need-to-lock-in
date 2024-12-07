"use client";
import React, { useState, useEffect } from "react";
import { useTimer } from "react-use-precision-timer";
import { getTaskSeconds } from "../_services/TaskTimeUtils";

interface StopWatchProps {
    taskId: number;
    startedFocusedTask: boolean;
}

const StopwatchComponent: React.FC<StopWatchProps> = ({ taskId, startedFocusedTask }) => {
    // May or may not use in the future to start the timer at 0 vs time spent
    const [initialTime, setInitialTime] = useState(0); // Store initial time fetched from the API
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    // Use the useStopwatch hook
    const timer = useTimer({fireOnStart: false});

    const getMostUpdatedSeconds = async (taskId: number) => {
        const seconds = await getTaskSeconds(taskId);
        setInitialTime(seconds); // Set the initial time for the stopwatch
    };

    useEffect(() => {
        // Fetch initial time when the component mounts
        getMostUpdatedSeconds(taskId);
        let curEpoch = Date.now();
        curEpoch = curEpoch - (1000*initialTime);
        if(startedFocusedTask) timer.start(curEpoch);
        else timer.stop();
    }, [startedFocusedTask]);

    useEffect(() => {
        // Create an interval to update the elapsed seconds
        const interval = setInterval(() => {
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
