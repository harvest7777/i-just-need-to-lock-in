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
        <div className="flex justify-center items-baseline w-full space-x-1 bg-blue-50">
        {intervals.map((minutes, index) => (
            <div key={index} className="w-[2%] flex flex-col mt-8 h-20">
            <div
                className="w-full rounded-t-md"
                style={{
                height: getBarHeight(minutes),
                backgroundColor: 'rgba(75, 192, 192, 0.7)', // You can adjust the color here
                }}
            />
            <div className="text-left text-gray-400">{index %6 == 0? index: "."}</div>
            </div>
        ))}
        </div>
    )
}

export default TimeGraph;