"use client";

import { useEffect, useState } from "react";

import BarGraph from "@/app/lockin/_components/BarGraph";
import HeaderCard from "@/components/ui/header-card";

import { getOffsetIntervals } from "@/app/(helpers)/getTimeOffsets";

const WeeklyHistory = () => {
    // get intervals based on some offset
    const [intervals, setIntervals] = useState<Map<number,TaskInterval[]>>();
    const dayValues = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };
    const initialize = async () => {
        const day = new Date(); 
        let dayNumber=day.getDay();

        //traverse offset in circular fashion to cover the whole week regardless of start day
        for(let i=0;i<7;i++) {
            const offset=(dayNumber-i)%7;
            const fetchedIntervals = await getOffsetIntervals(offset);
            setIntervals((prev)=>new Map(prev).set(dayNumber-offset, fetchedIntervals));
        }
    }
    useEffect(()=>{
        initialize();
    },[])
    return (
        <div className="flex flex-col justify-center items-center align-middle ">
        <HeaderCard title="Weekly History"/>
        {Object.entries(dayValues).map(([key, value]) => {
            const currentDate = new Date();
            const offset = currentDate.getDay()-Number(key);
            currentDate.setDate(currentDate.getDate()-offset);
            const month = currentDate.toLocaleString('default', { month: 'long' });
            const day = currentDate.getDate();
            return(
                <div key={key} className="p-2 bg-appFg card-outline mt-5 md:w-3/5 w-full">
                    <div className="mb-3 mt-1 text-gray-600">
                        <p className="md:text-2xl text-xl pl-5">{value}, {month} {day} </p>
                    </div>
                    <BarGraph taskIntervals={intervals?.get(Number(key)) || []}/>
                </div>
            )})}
        </div>
    )
}

export default WeeklyHistory;