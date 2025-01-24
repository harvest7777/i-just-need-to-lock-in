import { Dispatch, SetStateAction } from "react";
import { completeTask, pauseTask, startTask } from "../_services/TaskTimeUtils";

export interface useLockIntoTaskProps {
    focusedTask: Task|null;
    setFocusedTask: Dispatch<SetStateAction<Task|null>>;
    setDailyTasks: Dispatch<SetStateAction<Task[]>>;
    setTaskIntervals: Dispatch<SetStateAction<TaskInterval[]>>;
    setStartedFocusedTask: Dispatch<SetStateAction<boolean>>;
}

export const useLockIntoTask = ({focusedTask, setFocusedTask, setDailyTasks, setTaskIntervals, setStartedFocusedTask}: useLockIntoTaskProps) => {
    const lockIntoTask = async (taskToFocus: Task) => {
        // If you're trying to focus the same task, do nothing
        if(taskToFocus.task_id==focusedTask?.task_id) return;
        // If a task is already focused, pause it first before starting next task
        if(focusedTask!=null)
        {
            await handlePauseTask(focusedTask);
        }
        setFocusedTask(taskToFocus);
    }

    const updateTaskAndStates = (task: Task, updatedTask: Task) => {
        // Find the old task and replace it with new task. 
        // This also means new interval and new states because you only update on pause and complete

        setDailyTasks((prev) => prev.map((task)=> (
            task.task_id===updatedTask.task_id? updatedTask: task
        )))

        // The task intervals need to be updated if a last start time exists
        let startTime = task.last_start_time;
        
        let endTime: string = new Date().toISOString().replace("Z","+00:00");

        if(startTime==null) return;
        const newInterval: TaskInterval = {
            id: task.task_id,
            task_id: task.task_id,
            start_time: startTime,
            end_time: endTime
        }
        // Client side state updates
        setTaskIntervals((prev)=>[...prev, newInterval]);
    }

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

    return {lockIntoTask, handleStartTask, handlePauseTask, handleCompleteTask};
}