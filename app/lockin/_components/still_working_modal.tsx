"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTimeDisplayFromSeconds } from "../_services/TimeDisplay";
import { broadcastUpdatedTask, cancelLastStart } from "../_services/TaskTimeUtils";

interface StillWorkingModalProps {
    focusedTask: Task|null;
    setFocusedTask: Dispatch<SetStateAction<Task|null>>;
    setToDos: Dispatch<SetStateAction<Task[]>>;
    setStartedFocusedTask: Dispatch<SetStateAction<boolean>>;
    setCancelVisible: Dispatch<SetStateAction<boolean>>;
}
export default function StillWorkingModal({focusedTask, setFocusedTask, setToDos, setStartedFocusedTask, setCancelVisible}: StillWorkingModalProps) {
    const [timeSpent, setTimeSpent] = useState<string>("0 min");

    // when a task has been in progress for a very long time, make sure the user is actually still working
    useEffect(()=>{
        // calculate seconds spent on task this session
        const lastStartTimeString = focusedTask?.last_start_time;
        const nowUTC = new Date();
        let lastStartTimeUTC = new Date();
        if(lastStartTimeString) lastStartTimeUTC = new Date(lastStartTimeString);

        const secondsThisSession = Math.floor((nowUTC.getTime()-lastStartTimeUTC.getTime())/1000);
        setTimeSpent(getTimeDisplayFromSeconds(secondsThisSession));
    },[focusedTask])
    
    const handleCancelSession = () => {
        setStartedFocusedTask(false);
        cancelLastStart(focusedTask);
        let updatedTask = focusedTask;
        if(updatedTask) {
            updatedTask.last_start_time=null;
            broadcastUpdatedTask(updatedTask);
            setToDos((prev) =>
                prev.map((task) =>
                    task.task_id === updatedTask.task_id ? { ...task, ...updatedTask } : task
                )
            );
        }
        setFocusedTask(null);
        setCancelVisible(false);
    }
    return (
        (focusedTask!=null) &&
        <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
            {/* Background Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative md:w-3/5 w-11/12 bg-appFg p-3 rounded-xl h-fit md:mt-28 text-xl flex flex-col justify-center items-center">
                <h1 className="text-center text-2xl font-bold">Cancel Session?</h1>
                <div className="mt-3">
                    <span>You've been working on </span>
                    <span className=" px-2 bg-appBg rounded-xl">{focusedTask.name}</span>
                    <span> for </span>
                    <span className="px-2 bg-appBg rounded-xl">{timeSpent}</span>
                    <span> without stopping!</span>
                </div>
                
                <div className="mt-3">
                    <span>Would you like to cancel this sesssion to avoid logging </span>
                    <span className="px-2 bg-appBg rounded-xl">{timeSpent}</span>
                    <span> to your graph and total time?</span>
                </div>
                <div className="flex space-x-8">
                <p onClick={()=>handleCancelSession()} className="mt-3 p-2 text-center text-appFg bg-red-600 rounded-xl font-bold w-fit btn-hover">Cancel Session</p>
                <p onClick={()=>setCancelVisible(false)} className="mt-3 p-2 text-center text-appFg rounded-xl font-bold bg-neutral-400 w-fit btn-hover">Continue Session</p>
                </div>
            </div>
        </div>
    );
}