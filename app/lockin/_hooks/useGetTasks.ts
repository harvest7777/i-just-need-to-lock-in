import { useState, useEffect } from "react";
import { getTodaysTasks, getTaskIntervals } from "../_services/FetchDailyTasks";
import { getInProgressTask } from "../_services/TaskTimeUtils";

export const useGetTasks = () => {
    const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
    const [focusedTask, setFocusedTask] = useState<Task | null>(null);
    const [startedFocusedTask, setStartedFocusedTask] = useState<boolean>(false);
    const [taskIntervals, setTaskIntervals] = useState<TaskInterval[]>([]);
    
    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getTodaysTasks();
            const fetchedTaskIntervals = await getTaskIntervals();
            setDailyTasks(fetchedTasks);
            setTaskIntervals(fetchedTaskIntervals);

            const inProgressTask: Task | null = await getInProgressTask();
            if(inProgressTask)
            {
                setStartedFocusedTask(true);
                setFocusedTask(inProgressTask);
            }
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    // Initialize all states
    useEffect(()=>{
        fetchTasks();
    }, [])
    
    return {dailyTasks, setDailyTasks, taskIntervals, setTaskIntervals, focusedTask, setFocusedTask, startedFocusedTask, setStartedFocusedTask}
}