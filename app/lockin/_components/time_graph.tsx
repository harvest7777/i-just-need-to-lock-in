"use client";
import { Task } from "../_services/TaskSchema";
import { useState, useEffect } from "react";
import { getTodaysIntervals } from "../_services/FetchDailyTasks";

interface TimeGraphProps {
    dailyTasks: Task[];
}

const TimeGraph: React.FC<TimeGraphProps> = ({dailyTasks}) => {
    const [intervals, setIntervals] = useState<number[]>(
        Array(24).fill(0) // Initialize 12 intervals with 0 work time
    );
    const fetchIntervals = async () => {
        try {
            const result = await getTodaysIntervals("America/Los_Angeles");
            setIntervals(result); // Update the state with the fetched intervals
        } catch (error) {
            console.error("Error fetching intervals:", error);
        }
    };
    useEffect(()=>{
        fetchIntervals();
    },[dailyTasks]) 

    const getBarHeight = (minutes: number) => {
        return `${Math.min((minutes / 60) * 100, 100)}%`; // Bar height as a percentage of 60 minutes
      };

    const totalSeconds = dailyTasks
        .reduce((sum, task) => sum + task.seconds_spent, 0) || 0;

    const totalMinutes = Math.round(totalSeconds / 60); // Total minutes
    const hours = Math.floor(totalMinutes / 60); // Total hours
    const minutes = totalMinutes % 60; // Remaining minutes

    const timeDisplay =
        hours > 0
        ? `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`
        : `${minutes} min`;

    return(
        <div className="p-5 bg-appSecondary rounded-2xl">
        <p className="text-2xl font-extrabold text-emerald-950">Total: {timeDisplay}</p>
        <div className="flex justify-center w-full space-x-1 pt-16 p-2 rounded-lg ">
            {/* Container for each bar */}
            {intervals.map((minutes, index) => (
                <div key={index} className="relative w-[4%] h-20">
                    <div
                        className="absolute bottom-0 mb-5 w-full rounded-t-md bg-emerald-600"
                        style={{
                        height: getBarHeight(minutes),
                        }}
                    />
                    <p className="absolute bottom-0 text-sm text-neutral-500">{index%2==0? index: "."}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default TimeGraph;