"use client";
import { createClient } from "@/utils/supabase/client";
import { Task } from "./TaskSchema";
export const RenameTask = async (task: Task, newName: string) => {
    const supabase = createClient();
    const{data, error} = await supabase
    .from("tasks")
    .update({name: newName})
    .eq("task_id", task.task_id)
    .select();

    if(error) throw(error);
    return data[0] as Task;
}