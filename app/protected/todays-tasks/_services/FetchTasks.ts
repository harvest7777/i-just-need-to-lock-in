// services/tasksService.ts
import { createClient } from "@/utils/supabase/client";

// Define a Task type
interface Task {
  task_id: number;
  name: string;
  is_complete: boolean;
  minutes_spent?: number;
}

// Fetch all tasks from the database
export const fetchTasks = async (): Promise<Task[]> => {
  const supabase = await createClient();
  
  // Fetch tasks from your "tasks" table
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  console.log(data);
  return data;
};

export const fetchIncompleteTasksToday = async (userTimeZone: string): Promise<Task[]> => {
  const supabase = await createClient();

  // Get the current date in the user's time zone
  const now = new Date().toLocaleString("en-US", { timeZone: userTimeZone });
  const today = new Date(now);

  // Define the start and end of the day in the user's time zone
  const startOfDayLocal = new Date(today);
  startOfDayLocal.setHours(0, 0, 0, 0); // 00:00 local time

  const endOfDayLocal = new Date(today);
  endOfDayLocal.setHours(23, 59, 59, 999); // 23:59 local time

  // Convert the start and end of the day to UTC
  const startOfDayUTC = startOfDayLocal.toISOString();
  const endOfDayUTC = endOfDayLocal.toISOString();

  // Fetch incomplete tasks for the user's "today" period in UTC
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("is_complete", false)
    .gte("created_at", startOfDayUTC)
    .lte("created_at", endOfDayUTC);

  if (error) {
    console.error("Error fetching incomplete tasks for today:", error);
    return [];
  }

  console.log(data);
  return data;
};

export const fetchCompletedTasksToday = async (userTimeZone: string): Promise<Task[]> => {
  const supabase = await createClient();

  // Get the current date in the user's time zone
  const now = new Date().toLocaleString("en-US", { timeZone: userTimeZone });
  const today = new Date(now);

  // Define the start and end of the day in the user's time zone
  const startOfDayLocal = new Date(today);
  startOfDayLocal.setHours(0, 0, 0, 0); // 00:00 local time

  const endOfDayLocal = new Date(today);
  endOfDayLocal.setHours(23, 59, 59, 999); // 23:59 local time

  // Convert the start and end of the day to UTC
  const startOfDayUTC = startOfDayLocal.toISOString();
  const endOfDayUTC = endOfDayLocal.toISOString();

  // Fetch incomplete tasks for the user's "today" period in UTC
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("is_complete", true)
    .gte("created_at", startOfDayUTC)
    .lte("created_at", endOfDayUTC);

  if (error) {
    console.error("Error fetching incomplete tasks for today:", error);
    return [];
  }

  console.log(data);
  return data;
};