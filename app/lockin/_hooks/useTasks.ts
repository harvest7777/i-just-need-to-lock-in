// useTasks.ts
import { useState, useEffect } from "react";
import { Task } from "../_services/TaskSchema";
import { getTodaysTasks } from "../_services/FetchDailyTasks";
import { pauseTask, startTask, completeTask } from "../_services/TaskTimeUtils";
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
            console.log(tasks);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [startedFocusedTask]);

    const lockIntoTask = async (taskToFocus: Task) => {
        // If a task is already focused, pause it first
        if(focusedTask!=null)
        {
            await handlePauseTask(focusedTask.task_id);
        }
        setFocusedTask(taskToFocus);
        handleStartTask(taskToFocus.task_id);
    };

    const handleStartTask = async (taskId: number) => {
        await startTask(taskId);
        setStartedFocusedTask(true);
    };

    const handlePauseTask = async (taskId: number) => {
        await pauseTask(taskId);
        setStartedFocusedTask(false);
        fetchTasks(); // Refresh task list after pausing
    };

    const handleCompleteTask = async (taskId: number) => {
        await completeTask(taskId);
        setFocusedTask(null);
        setStartedFocusedTask(false);
        fetchTasks(); // Refresh task list after completing
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
