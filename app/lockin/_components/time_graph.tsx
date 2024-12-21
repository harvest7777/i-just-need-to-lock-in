"use client";
import { Task } from "../_services/TaskSchema";
import { useState, useEffect } from "react";
import { calculateHourlyIntervals } from "../_services/FetchDailyTasks";
import { TaskInterval } from "../_services/TaskInterval";
import { getTimeDisplay } from "../_services/TimeDisplay";
interface TimeGraphProps {
    dailyTasks: Task[];
    taskIntervals: TaskInterval[];
}

const TimeGraph: React.FC<TimeGraphProps> = ({dailyTasks, taskIntervals}) => {
    // This component houses the hourintervals for the graph display
    // This component houses the time display
    const [hourIntervals, setHourIntervals] = useState<number[]>(Array(24).fill(0));
    const [timeDisplay, setTimeDisplay] = useState<string>("00:00:00");

    useEffect(()=>{
        console.log("Graph received update. Rerendering graph!");
        setHourIntervals(calculateHourlyIntervals(taskIntervals));
    },[taskIntervals])

    // When daily tasks update, the total time updates too
    useEffect(()=>{
        setTimeDisplay(getTimeDisplay(dailyTasks));
        console.log(dailyTasks);
    },[dailyTasks])

    const getBarHeight = (minutes: number) => {
        return `${Math.min((minutes / 60) * 100, 100)}%`; // Bar height as a percentage of 60 minutes
      };

    return(
        <div className="p-5 bg-appSecondary rounded-2xl">
        <p className="text-2xl font-extrabold text-emerald-950">Total: {timeDisplay}</p>
        <div className="flex justify-center w-full space-x-1 pt-16 p-2 rounded-lg ">
            {/* Container for each bar */}
            {hourIntervals.map((minutes, index) => (
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