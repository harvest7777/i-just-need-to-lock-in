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
                console.log("task in progress", inProgressTask);
                setStartedFocusedTask(true);

                setFocusedTask(inProgressTask);
            }
        } catch(error) {
            console.log("Error fetching in progress task", error);
        }
    }

    useEffect(() => {
    }, [startedFocusedTask, focusedTask]);

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
            await handlePauseTask(focusedTask.task_id);
        }

        setFocusedTask(taskToFocus);
    };

    const handleStartTask = async (taskId: number) => {
        await startTask(taskId);
        setStartedFocusedTask(true);
    };

    const handlePauseTask = async (taskId: number) => {
        await pauseTask(taskId);
        setStartedFocusedTask(false);
        fetchTasks(); 
    };


    const handleCompleteTask = async (taskId: number) => {
        await completeTask(taskId);
        setFocusedTask(null);
        setStartedFocusedTask(false);
    };


    const addNewTask = async (taskName: string) => {
        await InsertDailyTask(taskName);
        fetchTasks(); // Refresh task list after adding new task
    };

    const addCompletedTask = async (taskName: string, secondsSpent: number) => {
        await InsertCompletedTask(taskName, secondsSpent);
        fetchTasks(); // Refresh task list after adding completed task
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
        addCompletedTask,
    };
};
