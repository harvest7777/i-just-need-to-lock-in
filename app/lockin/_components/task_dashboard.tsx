"use client";
import { useState, useEffect } from "react";
import { Task } from "../_services/TaskSchema";
import { getTodaysTasks } from "../_services/FetchDailyTasks";
import { pauseTask, startTask, completeTask } from "../_services/TaskTimeUtils";
import { InsertDailyTask, InsertCompletedTask } from "../_services/InsertDailyTasks";
import { useForm} from "react-hook-form";

interface FormData {
    taskName: string;  // Define the task name input field
  }

interface CompletedTaskFormData {
    completedTaskName: string;
    completedTaskMinutes: number;
}
  
export default function LockIn() {
    // Used to determine which tasks are completed or not
    const [dailyTasks, setDailyTasks] = useState<Task[]>();

    // Focused task must be able to be started, paused, ended
    const [focusedTask, setFocusedTask] = useState<Task|null>(null);
    const [startedFocusedTask, setStartedFocusedTask] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const { register: registerCompletedTask, handleSubmit: handleCompletedTaskSubmit, reset: resetCompletedTaskForm, formState: { errors: completedTaskErrors } } = useForm<CompletedTaskFormData>();

    // Submit for regular task
    const onSubmit = (data: FormData) => {
        InsertDailyTask(data.taskName); 
        reset();
    };

    // Submit for completed task
    const onCompletedTaskSubmit = (data: CompletedTaskFormData) => {
        InsertCompletedTask(data.completedTaskName, data.completedTaskMinutes);
        resetCompletedTaskForm(); 
      };
    
    // Fetch tasks to get the most up to date daily tasks in PST
    const fetchTasks = async () => {
            try {
                const tasks = await getTodaysTasks("America/Los_Angeles")
                setDailyTasks(tasks);
            } catch(error) {
                console.log("Error fetching tasks", error);
            }
        }

    // Focus an incomplete task
    const lockIntoTask = (taskToFocus: Task) => {
        setFocusedTask(taskToFocus);
    } 

    const handleStartTask= async (taskId: number) => {
        startTask(taskId);
        setStartedFocusedTask(true);
    }

    // Pause a task and refresh
    const handlePauseTask = async (taskId: number) => {
        pauseTask(taskId);
        setStartedFocusedTask(false);
        // TODO: Refactor this to only update the task that got changed
        fetchTasks();
    }

    // Complete a task and refresh
    const handleCompleteTask = async (taskId: number) => {
        completeTask(taskId);
        setFocusedTask(null);
        // TODO: Refactor this to only update the task that got changed
        fetchTasks();
       
    }
    // On every page load, fetch ALL the tasks from today
    useEffect(() => {
        fetchTasks();
    }, [dailyTasks, startedFocusedTask])

    return(
        // Page container
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center space-x-16">
                {/* Completed tasks container */}
                <div className="flex flex-col items-center w-1/3 ">
                    <h1 className="font-bold text-center text-2xl">Completed tasks</h1>
                    <form onSubmit={handleCompletedTaskSubmit(onCompletedTaskSubmit)} className="flex flex-row space-x-2 w-full justify-center">
                        {/* Task name container */}
                        <div className="flex flex-col w-1/2">
                            <input
                                id="completedTaskName"
                                type="text"
                                placeholder="Completed task name"
                                {...registerCompletedTask("completedTaskName", { required: "Task name is required" })}
                                className="border p-2 rounded"
                            />
                            {completedTaskErrors.completedTaskName && <p className="text-red-500">{completedTaskErrors.completedTaskName.message}</p>}
                        </div>

                        {/* Minutes container */}
                        <div className="flex flex-col w-1/4">
                            <input
                                id="completedTaskMinutes"
                                type="number"
                                placeholder="Minutes spent"
                                {...registerCompletedTask("completedTaskMinutes", { required: "Minutes are required", min: 1 })}
                                className="border p-2 rounded"
                            />
                            {completedTaskErrors.completedTaskMinutes && <p className="text-red-500">{completedTaskErrors.completedTaskMinutes.message}</p>}

                        </div>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded h-10 w-1/4">Add</button>
                    </form>
                    
                    {dailyTasks?.map((task) => 
                    // Task container
                    task.is_complete && (
                    <div className="flex space-x-2" key={task.task_id}>
                        <p className="w-44">{task.name}</p>
                        <p>{task.minutes_spent}</p>
                    </div>                   
                    )
                    )}
                </div>
                {/* Incomplete tasks container */}
                <div className="w-1/3 flex flex-col items-center">
                    <h1 className="font-bold text-center text-2xl">Incomplete tasks</h1>
                    {/* Task add container */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row space-x-2">
                        {/* Task input field container */}
                        <div className="flex flex-row">
                            <input
                            id="taskName"
                            type="text"
                            placeholder="add a task"
                            {...register("taskName", { required: "Task name is required" })}  // Register input field with validation
                            className="border p-2 rounded h-10"
                            />
                            {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
                        </div>
                        <button type="submit" className="bg-blue-500 h-10 text-white p-2 rounded">Add</button>
                    </form>
 
                    {dailyTasks?.map((task) => 
                    // Task container
                    !task.is_complete && (
                    <div className="flex space-x-2" key={task.task_id}>
                        <p className="w-44">{task.name}</p> 
                        <p>{task.minutes_spent}</p>
                        <button onClick={() => lockIntoTask(task)}>LOCK INTO THIS TASK</button>
                    </div>                   
                    )
                    )}
                </div>
            </div>
            {focusedTask && (
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">CURRENT LOCKED IN TASK:</h1>
                    <h1 className="text-xl font-semibold">{focusedTask?.name}</h1>
                    {!startedFocusedTask? (
                        <button onClick={() => handleStartTask(focusedTask.task_id)}>START</button>
                    ): (
                        <button onClick={() => handlePauseTask(focusedTask.task_id)}>PAUSE</button>
                    )}
                    <button onClick={() => handleCompleteTask(focusedTask.task_id)}>COMPLETE</button>
                </div>
            )}
        </div>
    )
}