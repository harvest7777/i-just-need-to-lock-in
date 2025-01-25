"use client";

import { useEffect, useState } from "react";
import { getTimeDisplayFromSeconds } from "../_services/TimeDisplay";

interface StillWorkingModalProps {
    focusedTask: Task|null;
}
export default function StillWorkingModal({focusedTask}: StillWorkingModalProps) {
    const [secondsSpent, setSecondsSpent] = useState<number>(0);
    const [timeSpent, setTimeSpent] = useState<string>("0 min");
    const [visible, setVisible] = useState<boolean>(true);

    // when a task has been in progress for a very long time, make sure the user is actually still working
    useEffect(()=>{
        
        // calculate seconds spent on task this session
        const lastStartTimeString = focusedTask?.last_start_time;
        const nowUTC = new Date();
        let lastStartTimeUTC = new Date();
        if(lastStartTimeString) lastStartTimeUTC = new Date(lastStartTimeString);

        const secondsThisSession = Math.floor((nowUTC.getTime()-lastStartTimeUTC.getTime())/1000);
        setSecondsSpent(secondsThisSession);
        setTimeSpent(getTimeDisplayFromSeconds(secondsThisSession));

    },[focusedTask])
    
    return (
        (visible && focusedTask!=null && secondsSpent >= 3600) &&
        <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
            {/* Background Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative md:w-3/5 w-11/12 bg-appFg p-3 rounded-xl h-fit md:mt-28 text-xl flex flex-col justify-center items-center">
                <h1 className="text-center text-2xl font-bold">Still there?</h1>
                <div className="mt-3">
                    <span>You've been working on </span>
                    <span className=" px-2 bg-appBg rounded-xl">{focusedTask.name}</span>
                    <span> for </span>
                    <span className="px-2 bg-appBg rounded-xl">{timeSpent}</span>
                    <span> without stopping!</span>
                </div>
                
                <div className="mt-3">
                    <span>If this was a mistake, you can delete the task to avoid logging </span>
                    <span className="px-2 bg-appBg rounded-xl">{timeSpent}</span>
                    <span> to your graph and total time.</span>
                </div>
                <p onClick={()=>setVisible(false)} className="mt-3 p-2 text-center text-appFg rounded-xl font-bold bg-emerald-600 w-fit btn-hover">OK</p>
            </div>
        </div>
    );
}