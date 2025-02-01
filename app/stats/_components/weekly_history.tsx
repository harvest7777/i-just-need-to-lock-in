"use client";

import { useEffect, useState } from "react";
import { getOffsetIntervals } from "../_services/StatsHelpers";
import TimeGraph from "@/app/lockin/_components/time_graph";

const WeeklyHistory = () => {
    // get intervals based on some offset
    const [intervals, setIntervals] = useState<Map<number,TaskInterval[]>>();
    const [today, setToday] = useState<Date>();
    const dayValues = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    };
    const initialize = async () => {
        const day = new Date(); //1 = monday
        setToday(day);
        const dayNumber=day.getDay();
        for(let offset=dayNumber-1;offset>=0;offset--) {
            const fetchedIntervals = await getOffsetIntervals(offset);
            setIntervals((prev)=>new Map(prev).set(dayNumber-offset, fetchedIntervals));
        }
    }
    useEffect(()=>{
        initialize();
    },[])
    return (
        <div className="flex flex-col justify-center items-center align-middle ">
        <h1 className="text-center text-emerald-600 font-bold text-3xl mt-5 bg-appFg p-2 px-4 rounded-2xl">Weekly History</h1>
        {Object.entries(dayValues).map(([key, value]) => {
            const currentDate = new Date();
            currentDate.setDate(Number(key));
            const month = currentDate.toLocaleString('default', { month: 'long' });
            const dayOfMonth = currentDate.getDate(); 
            return(
                <div key={key} className="p-2 bg-appFg rounded-2xl mt-5 md:w-3/5 w-full">
                    <div className="flex justify-between">
                        <p className="text-2xl pl-5">{value} </p>
                        <p className="text-2xl pr-5 italic">{month} {dayOfMonth}</p>
                    </div>
                    <TimeGraph taskIntervals={intervals?.get(Number(key)) || []}/>
                </div>
            )})}
        </div>
    )
}

export default WeeklyHistory;