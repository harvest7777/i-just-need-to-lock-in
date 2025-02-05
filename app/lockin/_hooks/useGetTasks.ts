import { useState, useEffect } from "react";

import { getTodaysTasks, getCompletedTasks } from "@/app/(api)/taskServices";
import { getTaskIntervals } from "@/app/(api)/taskIntervalServices";
import { getInProgressTask } from "@/app/(api)/taskServices";

export const useGetTasks = () => {
    const [toDos, setToDos] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [focusedTask, setFocusedTask] = useState<Task | null>(null);
    const [startedFocusedTask, setStartedFocusedTask] = useState<boolean>(false);
    const [taskIntervals, setTaskIntervals] = useState<TaskInterval[]>([]);
    
    const fetchTasks = async () => {
        const fetchedTasks = await getTodaysTasks();
        const fetchedTaskIntervals = await getTaskIntervals();
        const fetchedCompletedTasks = await getCompletedTasks();
        setToDos(fetchedTasks);
        setTaskIntervals(fetchedTaskIntervals);
        setCompletedTasks(fetchedCompletedTasks);

        // check if the user was working on a task
        const inProgressTask: Task | null = await getInProgressTask();

        // set state accordingly
        if(inProgressTask)
        {
            setStartedFocusedTask(true);
            setFocusedTask(inProgressTask);
        }

        // interval to check if the clock reads 12 am
        const interval = setInterval(() => {
        const now = new Date();
        const hours = now.getHours(); // Get the hour (0-23)
        const minutes = now.getMinutes(); // Get the minutes (0-59)
        
        // if 12 am (next day), reset the states of everything unless the user was
        // working on something
        if (hours === 0  && minutes === 0) {
            console.log("CLEARING");
            setTaskIntervals([]);
            setCompletedTasks([]);

            clearInterval(interval);
        }
        }, 1000); // Check every second

    };

    // Initialize all states
    useEffect(()=>{
        fetchTasks();
    }, [])
    
    return {toDos, setToDos, taskIntervals, setTaskIntervals, focusedTask, setFocusedTask, startedFocusedTask, setStartedFocusedTask, completedTasks, setCompletedTasks}
}