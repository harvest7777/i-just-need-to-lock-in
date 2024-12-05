"use client";
import { useState, useEffect } from "react";
import { Task } from "../_services/TaskSchema";
import { getTodaysTasks } from "../_services/FetchDailyTasks";
import { pauseTask, startTask, completeTask } from "../_services/TaskTimeUtils";
import { InsertDailyTask } from "../_services/InsertDailyTasks";
import { useForm} from "react-hook-form";

interface FormData {
    taskName: string;  // Define the task name input field
  }
  
export default function LockIn() {
    const [dailyTasks, setDailyTasks] = useState<Task[]>();
    const [focusedTask, setFocusedTask] = useState<Task|null>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    // Handle form submission
    const onSubmit = (data: FormData) => {
        // Add the new task to the tasks list
        console.log("Submitting!");
        InsertDailyTask(data.taskName); 
        // Reset the form fields after submission
        reset();
    };
    const fetchTasks = async () => {
            try {
                const tasks = await getTodaysTasks("America/Los_Angeles")
                setDailyTasks(tasks);
            } catch(error) {
                console.log("Error fetching tasks", error);
            }
        }

    const lockIntoTask = (taskToFocus: Task) => {
        console.log("locking in");
        setFocusedTask(taskToFocus);
    } 

    const handlePauseTask = async (taskId: number) => {
        pauseTask(taskId);
        // TODO: Refactor this to only update the task that got changed
        fetchTasks();
    }
    const handleCompleteTask = async (taskId: number) => {
        completeTask(taskId);
        setFocusedTask(null);
        // TODO: Refactor this to only update the task that got changed
        fetchTasks();
       
    }
    // On every page load, fetch ALL the tasks from today
    useEffect(() => {
        fetchTasks();
    }, [dailyTasks])
    return(
        // Page container
        <div className="flex flex-col items-center">
            <div className="flex space-x-40">
                {/* Completed tasks container */}
                <div>
                    <h1 className="font-bold text-center text-2xl">Completed tasks</h1>
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
                <div>
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
                            className="border p-2 rounded"
                            />
                            {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
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
                    <button onClick={() => startTask(focusedTask.task_id)}>START</button>
                    <button onClick={() => handlePauseTask(focusedTask.task_id)}>PAUSE</button>
                    <button onClick={() => handleCompleteTask(focusedTask.task_id)}>COMPLETE</button>
                </div>
            )}
        </div>
    )
}