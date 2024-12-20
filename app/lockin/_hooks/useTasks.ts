// useTasks.ts
import { useState, useEffect } from "react";
import { Task } from "../_services/TaskSchema";
import { getTodaysTasks } from "../_services/FetchDailyTasks";
import { pauseTask, startTask, completeTask, getInProgressTaskId } from "../_services/TaskTimeUtils";
import { InsertDailyTask, InsertCompletedTask } from "../_services/InsertDailyTasks";

export const useTasks = () => {
    const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
    const [focusedTask, setFocusedTask] = useState<Task | null>(null);
    const [startedFocusedTask, setStartedFocusedTask] = useState<boolean>(false);

    // Fetch tasks from API
    const fetchTasks = async () => {
        try {
            const tasks = await getTodaysTasks("America/Los_Angeles");
            setDailyTasks(tasks);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };
    const fetchInProgressTask = async () => {
        try {
            const inProgressTask: Task | null = await getInProgressTaskId();
            if(inProgressTask)
            {
                setStartedFocusedTask(true);
                setFocusedTask(inProgressTask);
            }
        } catch(error) {
            console.log("Error fetching in progress task", error);
        }
    }

    useEffect(()=>{
        fetchTasks();
        fetchInProgressTask();
    }, [])

    const lockIntoTask = async (taskToFocus: Task) => {
        // If you're trying to focus the same task, do nothing
        if(taskToFocus.task_id==focusedTask?.task_id) return;
        // If a task is already focused, pause it first before starting next task
        if(focusedTask!=null)
        {
            await handlePauseTask(focusedTask);
        }
        setFocusedTask(taskToFocus);
    };

    const handleStartTask = async (task: Task) => {
        await startTask(task);
        setStartedFocusedTask(true);
    };

    const handlePauseTask = async (task: Task) => {
        await pauseTask(task);
        setStartedFocusedTask(false);
        fetchTasks(); 
    };

    const handleCompleteTask = async (task: Task) => {
        await completeTask(task);
        setFocusedTask(null);
        setStartedFocusedTask(false);
        fetchTasks();
    };


    const addNewTask = async (taskName: string) => {
        const newTask = await InsertDailyTask(taskName);
        setDailyTasks((prev)=>[...prev,newTask]);
    };

    return {
        dailyTasks,
        focusedTask,
        startedFocusedTask,
        lockIntoTask,
        handleStartTask,
        handlePauseTask,
        handleCompleteTask,
        addNewTask,
    };
};
