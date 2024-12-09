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

    const totalMinutes = Math.floor(totalSeconds / 60); // Total minutes
    const hours = Math.floor(totalMinutes / 60); // Total hours
    const minutes = totalMinutes % 60; // Remaining minutes

    const timeDisplay =
        hours > 0
        ? `${hours} hr${hours > 1 ? "s" : ""}: ${minutes} min`
        : `${minutes} min`;

    return(
        <div className="p-2">
        <p className="mt-4 text-lg font-medium">Total: {timeDisplay}</p>
        <p className="text-lg font-medium">Good job! ^.^</p>
       <div className="flex justify-center w-full space-x-1 bg-neutral-100 pt-10 p-2 rounded-lg outline-black outline ">
        {/* Container for each bar */}
        {intervals.map((minutes, index) => (
            <div key={index} className="relative w-[4%] h-20">
                <div
                    className="absolute bottom-0 mb-5 w-full rounded-t-sm bg-emerald-400"
                    style={{
                    height: getBarHeight(minutes),
                    }}
                />
                <p className="absolute bottom-0 text-sm text-neutral-400">{index%2==0? index: "."}</p>
            </div>
        ))}
        </div>
        </div>
    )
}

export default TimeGraph;