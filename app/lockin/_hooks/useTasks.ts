// useTasks.ts
import { useState, useEffect } from "react";
import { Task } from "../_services/TaskSchema";
import { getTaskIntervals, getTodaysTasks } from "../_services/FetchDailyTasks";
import { pauseTask, startTask, completeTask, getInProgressTaskId } from "../_services/TaskTimeUtils";
import { InsertDailyTask, InsertCompletedTask } from "../_services/InsertDailyTasks";
import { TaskInterval } from "../_services/TaskInterval";

export const useTasks = () => {
    const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
    const [focusedTask, setFocusedTask] = useState<Task | null>(null);
    const [startedFocusedTask, setStartedFocusedTask] = useState<boolean>(false);
    const [taskIntervals, setTaskIntervals] = useState<TaskInterval[]>([]);

    // Fetch all tasks, in progress task, and all intervals from API
    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getTodaysTasks("America/Los_Angeles");
            const fetchedTaskIntervals = await getTaskIntervals("America/Los_Angeles");
            setDailyTasks(fetchedTasks);
            setTaskIntervals(fetchedTaskIntervals);

            const inProgressTask: Task | null = await getInProgressTaskId();
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

    const updateTaskAndStates = (task: Task, updatedTask: Task) => {
        // Find the old task and replace it with new task. 
        // This also means new interval and new states because you only update on pause and complete

        setDailyTasks((prev) => prev.map((task)=> (
            task.task_id===updatedTask.task_id? updatedTask: task
        )))

        // The task intervals need to be updated if a last start time exists
        let startTime: string = "";
        console.log("last start",task.last_start_time);
        if(task.last_start_time) startTime=task.last_start_time;
        
        let endTime: string = new Date().toISOString().replace("Z","+00:00");

        const newInterval: TaskInterval = {
            task_id: task.task_id,
            start_time: startTime,
            end_time: endTime
        }
        console.log("new interval from client side:",newInterval)
        // Client side state updates
        setTaskIntervals((prev)=>[...prev, newInterval]);

    };

    const handleStartTask = async (task: Task) => {
        const startedTask = await startTask(task);
        console.log("started",startedTask);
        setDailyTasks((prev) => prev.map((task)=> (
            task.task_id===startedTask.task_id? startedTask: task
        )))
        setFocusedTask(startedTask);
        setStartedFocusedTask(true);
    };

    const handlePauseTask = async (task: Task) => {
        const updatedTask: Task = await pauseTask(task);
        updateTaskAndStates(task, updatedTask);
        setFocusedTask(updatedTask);
        setStartedFocusedTask(false);
    };

    const handleCompleteTask = async (task: Task) => {
        const completedTask = await completeTask(task);
        updateTaskAndStates(task, completedTask);
        setFocusedTask(null);
        setStartedFocusedTask(false);
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
        taskIntervals
    };
};
