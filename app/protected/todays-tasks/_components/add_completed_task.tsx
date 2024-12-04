"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { insertCompletedTask } from "../_services/InsertTask";
import { fetchCompletedTasksToday, fetchIncompleteTasksToday } from "../_services/FetchTasks";
import { Task } from "../_services/TaskSchema";
// Define the type for form data
interface FormData {
  taskName: string;
  taskMinutes: string;
}

export default function AddCompletedTask() {
  // State for completed tasks
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  // Destructure necessary methods from React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  // Fetch completed tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchCompletedTasksToday("America/Los_Angeles"); // Fetch the tasks
        setCompletedTasks(tasks); // Update state with fetched tasks
      } catch (error) {
        console.log("Error fetching completed tasks.", error);
      }
    };

    loadTasks();
  }, []);

  // Submit handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const tasksMinutesNumber: number = parseInt(data.taskMinutes, 10);
    if (data.taskName && tasksMinutesNumber >= 0) {
      try {
        await insertCompletedTask(data.taskName, true, tasksMinutesNumber); // Insert new task
        reset();  // Reset form after submission
        const tasks = await fetchCompletedTasksToday("America/Los_Angeles"); // Reload tasks after insert
        setCompletedTasks(tasks); // Update the task list
      } catch (error) {
        console.log("Error submitting completed task.", error);
      }
    }
  };

  return (
    <>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        {/* Task Name Input */}
        <div>
          <input
            placeholder="Task name"
            {...register("taskName", { required: "Task name is required" })}
          />
          {errors.taskName && <p>{errors.taskName.message}</p>}
        </div>

        {/* Task Minutes Input */}
        <div>
          <input
            type="number"
            placeholder="Minutes spent"
            {...register("taskMinutes", {
              required: "Minutes spent is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid number"
              }
            })}
          />
          {errors.taskMinutes && <p>{errors.taskMinutes.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit">Add Completed Task</button>
      </form>

      {/* Completed Tasks List */}
      <div>
        <h2>Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                {task.name} - {task.minutes_spent} minutes
              </li>
            ))}
          </ul>
        ) : (
          <p>No completed tasks available.</p>
        )}
      </div>
    </>
  );
}
