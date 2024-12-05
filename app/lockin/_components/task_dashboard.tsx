"use client";
import { useState, useEffect } from "react";
import { Task } from "../_services/TaskSchema";
import { getTodaysTasks } from "../_services/FetchDailyTasks";
export default function LockIn() {
    const [dailyTasks, setDailyTasks] = useState<Task[]>();

    // On every page load, fetch ALL the tasks from today
    useEffect(() => {
        const fetchTasks = async () => {
                try {
                    const tasks = await getTodaysTasks("America/Los_Angeles")
                    setDailyTasks(tasks);
                } catch(error) {
                    console.log("Error fetching tasks", error);
                }
            }
        fetchTasks();
    }, [])
    return(
        // Dashboard container
        <div className="flex space-x-8">
            {/* All tasks container */}
            <div>
                <h1 className="font-bold text-center text-2xl">All tasks</h1>
                {dailyTasks?.map((task) => 
                // Task container
                <div className="flex" key={task.task_id}>
                    <p className="w-44">{task.name}</p>
                    <p>{task.is_complete? '✅': '❌'}</p>
                    <p>{task.minutes_spent}</p>
                </div>
                )}
            </div>
            {/* Completed tasks container */}
            <div>
                <h1 className="font-bold text-center text-2xl">Completed tasks</h1>
                {dailyTasks?.map((task) => 
                // Task container
                task.is_complete && (
                 <div className="flex" key={task.task_id}>
                    <p className="w-44">{task.name}</p>
                    <p>{task.minutes_spent}</p>
                </div>                   
                )
                )}
            </div>
            {/* Incomplete tasks container */}
            <div>
                <h1 className="font-bold text-center text-2xl">Incomplete tasks</h1>
                {dailyTasks?.map((task) => 
                // Task container
                !task.is_complete && (
                 <div className="flex" key={task.task_id}>
                    <p className="w-44">{task.name}</p>
                    <p>{task.minutes_spent}</p>
                </div>                   
                )
                )}
            </div>
        </div>
    )
}