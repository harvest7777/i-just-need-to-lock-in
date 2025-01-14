"use client";
import { Task } from "../_services/TaskSchema";
import { useState, useEffect } from "react";
import { calculateHourlyIntervals } from "../_services/FetchDailyTasks";
import { TaskInterval } from "../_services/TaskIntervalSchema";
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
    const militaryTimeToString: { [key: number]: string } = {
        0: "12 AM",
        1: "1 AM",
        2: "2 AM",
        3: "3 AM",
        4: "4 AM",
        5: "5 AM",
        6: "6 AM",
        7: "7 AM",
        8: "8 AM",
        9: "9 AM",
        10: "10 AM",
        11: "11 AM",
        12: "12 PM",
        13: "1 PM",
        14: "2 PM",
        15: "3 PM",
        16: "4 PM",
        17: "5 PM",
        18: "6 PM",
        19: "7 PM",
        20: "8 PM",
        21: "9 PM",
        22: "10 PM",
        23: "11 PM"
      };
      
    // When the task intervals get updated, we must recalculate the hours and re render the graph
    useEffect(()=>{
        setHourIntervals(calculateHourlyIntervals(taskIntervals));
    },[taskIntervals])

    // When daily tasks update, the total time updates too
    useEffect(()=>{
        setTimeDisplay(getTimeDisplay(dailyTasks));
    },[dailyTasks])

    const getBarHeight = (minutes: number) => {
        return `${Math.min((minutes / 60) * 100, 100)}%`; // Bar height as a percentage of 60 minutes
      };

    return(
        <div className="p-5 bg-appSecondary rounded-2xl">
        <p className="text-2xl font-extrabold text-emerald-950">Completed Sessions: {timeDisplay}</p>

        <div className="mt-10 rounded-lg">
            <p className="relative left-0 text-xs text-neutral-500 bottom-1">60m</p>
            <p className="relative text-xs text-neutral-500 top-9">30m</p>
            <div className="h-0 relative border-t border-dashed border-neutral-500 bottom-5 w-full"></div>
            <div className="h-0 relative border-t border-dashed border-neutral-500 top-9 w-full"></div>

            {/* Container for each bar */}
            <div className="flex justify-center w-full space-x-1">
            {hourIntervals.map((minutes, index) => (
                <div key={index} className="relative w-[4%] h-28">
                    <div
                        className="absolute bottom-0 mb-5 w-full rounded-t-md bg-emerald-600"
                        style={{
                        height: getBarHeight(minutes),
                        }}
                    />
                    <p className="absolute bottom-0 text-xs text-neutral-500 text-nowrap">{index%4==0 && militaryTimeToString[index]}</p>
                </div>
            ))}
            </div>
            <div className="h-0 relative border-t border-dashed border-neutral-500 bottom-5 w-full"></div>
        </div>
        </div>
    )
}

export default TimeGraph;