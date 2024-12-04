import { createClient } from "@/utils/supabase/client";
import { Task } from "./TaskSchema";

// Function to start a task
export const startTask = async (taskId: number) => {
  const nowUTC = new Date().toISOString();
  return await createClient().from("tasks").update({ last_start_time: nowUTC }).eq("task_id", taskId);
};

// Function to pause a task
export const pauseTask = async (task: Task) => {
  const nowUTC = new Date();
  const lastStartTime = task.last_start_time ? new Date(task.last_start_time) : null;
  if (lastStartTime == null) return;

  const minutesElapsed = Math.floor((nowUTC.getTime() - lastStartTime.getTime()) / 60000); // Ensure it's an integer

  return await createClient()
    .from("tasks")
    .update({
      minutes_spent: Math.max((task.minutes_spent || 0) + minutesElapsed, 0), // Ensure non-negative value
      last_start_time: null,
    })
    .eq("task_id", task.task_id);
};

// Function to mark a task complete
export const markComplete = async (task: Task) => {
  const nowUTC = new Date();
  let minutesSpent = task.minutes_spent || 0;

  if (task.last_start_time) {
    const lastStartTime = new Date(task.last_start_time);
    const minutesElapsed = Math.floor((nowUTC.getTime() - lastStartTime.getTime()) / 60000); // Ensure it's an integer
    minutesSpent += minutesElapsed;
  }

  return await createClient()
    .from("tasks")
    .update({
      is_complete: true,
      minutes_spent: Math.max(minutesSpent, 0), // Ensure non-negative value
      last_start_time: null,
    })
    .eq("task_id", task.task_id);
};
