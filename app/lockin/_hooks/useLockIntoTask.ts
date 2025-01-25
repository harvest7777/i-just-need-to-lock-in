import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { completeTask, pauseTask, startTask } from "../_services/TaskTimeUtils";
import JSConfetti from "js-confetti";

export interface useLockIntoTaskProps {
    focusedTask: Task|null;
    setFocusedTask: Dispatch<SetStateAction<Task|null>>;
    setDailyTasks: Dispatch<SetStateAction<Task[]>>;
    setTaskIntervals: Dispatch<SetStateAction<TaskInterval[]>>;
    setStartedFocusedTask: Dispatch<SetStateAction<boolean>>;
}

export const useLockIntoTask = ({focusedTask, setFocusedTask, setDailyTasks, setTaskIntervals, setStartedFocusedTask}: useLockIntoTaskProps) => {
    const jsConfettiRef = useRef<JSConfetti | null>(null);

    // lazy load confetti
    useEffect(() => {
        if (typeof window !== "undefined") {
            jsConfettiRef.current = new JSConfetti();
        }
    }, []);
    
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

        // The task intervals need to be updated if the task was in progress
        let startTime = task.last_start_time;
        let endTime = new Date();

        // the task was not in progress
        if(startTime==null) return;


        const nowUTC = new Date();
        const lastStartTimeUTC = new Date(startTime);

        let newInterval: TaskInterval;
        
        // if task carried on to a new day
        if(lastStartTimeUTC.getDay() != nowUTC.getDay()) {
        const newDay = new Date();
        newDay.setHours(0, 0, 0, 0);
        newInterval = {
                id: task.task_id,
                task_id: task.task_id,
                start_time: newDay.toISOString(),
                end_time: endTime.toISOString()
            }
        } else {
        newInterval = {
            id: task.task_id,
            task_id: task.task_id,
            start_time: startTime,
            end_time: endTime.toISOString()
            }
        }
        // Client side state updates
        if(newInterval) setTaskIntervals((prev)=>[...prev, newInterval]);
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
        const completedTask = await completeTask(task);
        if(jsConfettiRef.current) {
            jsConfettiRef.current.addConfetti({
                confettiColors: [
                    '#ff3e3e', // Bright Red
                    '#ff9f00', // Vibrant Orange
                    '#ffdc3e', // Sunny Yellow
                    '#3eff3e', // Bright Green
                    '#3eb5ff', // Sky Blue
                    '#763eff', // Deep Purple
                    '#ff3ec9', // Hot Pink
                    '#ffffff', // White
                ],
                confettiRadius: 7,
                confettiNumber: 350,
            });
        }

        setStartedFocusedTask(false);
        updateTaskAndStates(task, completedTask);
        setFocusedTask(null);

    };

    return {lockIntoTask, handleStartTask, handlePauseTask, handleCompleteTask};
}