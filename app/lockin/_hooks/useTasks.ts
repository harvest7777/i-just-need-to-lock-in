// useTasks.ts
import { useState, useEffect } from "react";
import { Task } from "../_services/TaskSchema";
import { getTaskIntervals, getTodaysTasks } from "../_services/FetchDailyTasks";
import { pauseTask, startTask, completeTask, getInProgressTaskId } from "../_services/TaskTimeUtils";
import { insertDailyTask } from "../_services/InsertDailyTasks";
import { TaskInterval } from "../_services/TaskInterval";
import { renameTask } from "../_services/UpdateDailyTasks";
import { deleteTask } from "../_services/UpdateDailyTasks";

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
        if(task.last_start_time) startTime=task.last_start_time;
        
        let endTime: string = new Date().toISOString().replace("Z","+00:00");

        const newInterval: TaskInterval = {
            task_id: task.task_id,
            start_time: startTime,
            end_time: endTime
        }
        // Client side state updates
        setTaskIntervals((prev)=>[...prev, newInterval]);

    };

    const handleStartTask = async (task: Task) => {
        // This comes first to update immediately on ui
        setStartedFocusedTask(true);
        const startedTask = await startTask(task);
        // We must update the daily task with our new task data
        setDailyTasks((prev) => prev.map((task)=> (
            task.task_id===startedTask.task_id? startedTask: task
        )));
        // We must update the focused task with the new task data
        setFocusedTask(startedTask);
    };

    const handlePauseTask = async (task: Task) => {
        // If you are pausing a task that's not focused, do nothing
        if(task.task_id!=focusedTask?.task_id) return;

        // Immediately update on ui
        setStartedFocusedTask(false);
        // Pause the task and update it on the UI with the new total seconds spent
        const updatedTask: Task = await pauseTask(task);
        updateTaskAndStates(task, updatedTask);
        setFocusedTask(updatedTask);
    };

    const handleCompleteTask = async (task: Task) => {
        // Immediately update on ui
        setStartedFocusedTask(false);
        const completedTask = await completeTask(task);
        updateTaskAndStates(task, completedTask);
        setFocusedTask(null);
    };

    const addNewTask = async (taskName: string) => {
        const newTask = await insertDailyTask(taskName);
        setDailyTasks((prev)=>[...prev,newTask]);
    };

    const handleRenameTask = async(task: Task, newName: string) => {
        // Rename task in DB and immediately update on client side
        const renamedTask = await renameTask(task, newName);
        setDailyTasks((prev) => prev.map((task)=> (
            task.task_id===renamedTask.task_id? renamedTask: task
        )));
        if(focusedTask?.task_id===renamedTask.task_id) focusedTask.name=renamedTask.name;

    };

    const handleDeleteTask = async(task: Task) => {
        // If trying to delete focused task, pause and reset states
        if(focusedTask?.task_id==task.task_id) {
            await handlePauseTask(task);
            setFocusedTask(null);
            setStartedFocusedTask(false);
        }
        // Delete the task from db and immediately update on client side
        const deletedTask = await deleteTask(task);
        setDailyTasks((prev)=> prev.filter((t) => t.task_id!=deletedTask.task_id));
        setTaskIntervals((prev)=>prev.filter((t)=> t.task_id!=deletedTask.task_id));
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
        taskIntervals,
        handleRenameTask,
        handleDeleteTask
    };
};
