"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { insertCompletedTask } from "../_services/InsertTask";
import { useState, useEffect } from "react";
import { fetchIncompleteTasksToday } from "../_services/FetchTasks";
import { Task } from "../_services/TaskSchema";
import { startTask, pauseTask, markComplete } from "../_services/TimeUtils"; // Import your time utils

interface FormData {
  taskName: string;
}

export default function AddTask() {
  // Destructure `reset` from useForm hook
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await insertCompletedTask(data.taskName, false); 
      const fetchedTasks = await fetchIncompleteTasksToday("America/Los_Angeles"); // Use fetchTasks to get tasks
      setTasks(sortTasks(fetchedTasks)); // Sort the tasks before setting the state
    } catch(error) {
      console.log(error);
    }
    // Reset the form after submission
    reset(); 
    console.log(data);
  };

  const [tasks, setTasks] = useState<Task[]>([]); 

  useEffect(() => {
    const fetchAndSetTasks = async () => {
      const fetchedTasks = await fetchIncompleteTasksToday("America/Los_Angeles"); // Use fetchTasks to get tasks
      setTasks(sortTasks(fetchedTasks)); // Sort tasks when initially fetched
    };
    fetchAndSetTasks();
  }, []);

  // Function to sort tasks (e.g., by task_id or by creation time)
  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => a.task_id - b.task_id); // Sort by task_id, adjust based on your needs
  };

  // Handlers for buttons
  const handleStart = async (taskId: number) => {
    await startTask(taskId);
    // Re-fetch tasks to reflect changes
    const fetchedTasks = await fetchIncompleteTasksToday("America/Los_Angeles");
    setTasks(sortTasks(fetchedTasks)); // Sort tasks after updating
  };

  const handlePause = async (task: Task) => {
    await pauseTask(task);
    // Re-fetch tasks to reflect changes
    const fetchedTasks = await fetchIncompleteTasksToday("America/Los_Angeles");
    setTasks(sortTasks(fetchedTasks)); // Sort tasks after updating
  };

  const handleMarkComplete = async (task: Task) => {
    await markComplete(task);
    // Re-fetch tasks to reflect changes
    const fetchedTasks = await fetchIncompleteTasksToday("America/Los_Angeles");
    setTasks(sortTasks(fetchedTasks)); // Sort tasks after updating
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input wrapper */}
        <div className="flex flex-row">
          <div className="flex flex-col">
            <input
              placeholder="Feed the dog"
              {...register("taskName", { required: "Task is required" })}
            />
            {errors.taskName && <p>{errors.taskName.message}</p>}
          </div>
          <button type="submit">Add task</button>
        </div>
      </form>
      <ul>
        {tasks.map((task) => (
          <div className="flex space-x-4" key={task.task_id}>
            <li>
              {task.is_complete ? "Completed: " : ""} {task.name}
            </li>
            {!task.is_complete && (
              <>
                <button onClick={() => handleStart(task.task_id)}>Start</button>
                <button onClick={() => handlePause(task)}>Pause</button>
              </>
            )}
            <button onClick={() => handleMarkComplete(task)}>Mark Complete</button>
          </div>
        ))}
      </ul>
    </>
  );
}
