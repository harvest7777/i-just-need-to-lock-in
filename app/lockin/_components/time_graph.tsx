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
    return(
        <div className="flex justify-center w-full space-x-1 bg-slate-50 pt-10">
        {/* Container for each bar */}
        {intervals.map((minutes, index) => (
            <div key={index} className="relative w-[4%] h-20">
                <div
                    className="absolute bottom-0 mb-5 w-full rounded-t-sm"
                    style={{
                    height: getBarHeight(minutes),
                    backgroundColor: 'rgba(75, 92, 192, 0.7)', // You can adjust the color here
                    }}
                />
                <p className="absolute bottom-0 text-sm text-purple-900">{index%2==0? index: ""}</p>
            </div>
        ))}
        </div>
    )
}

export default TimeGraph;