import React, { useState, useEffect } from "react";
import { getTaskSeconds } from "../_services/TaskTimeUtils";

interface StopWatchProps {
    taskId: number;
    startedFocusedTask: boolean;

}
const Stopwatch: React.FC<StopWatchProps> = ({taskId, startedFocusedTask}) => {
    const [time, setTime] = useState(0); // Time in seconds

    const getMostUpdatedSeconds = async(taskId: number) => {
        const seconds = await getTaskSeconds(taskId);
        setTime(seconds);
    }

    useEffect(() => {
        // Fetch initial time when the component mounts
        getMostUpdatedSeconds(taskId);
    }, [taskId]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (startedFocusedTask) {
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000); // Update every second
        } else if (!startedFocusedTask && interval) {
        clearInterval(interval);
        }

        return () => {
        if (interval) clearInterval(interval);
        };
    }, [startedFocusedTask]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
        seconds
        ).padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">{formatTime(time)}</h1>
        </div>
    );
};

export default Stopwatch;
