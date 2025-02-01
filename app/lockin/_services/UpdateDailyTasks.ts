"use client";
import { createClient } from "@/utils/supabase/client";
export const renameTask = async (task: Task, newName: string) => {
    const supabase = createClient();
    const{data, error} = await supabase
    .from("tasks")
    .update({name: newName})
    .eq("task_id", task.task_id)
    .select();

    if(error) throw(error);
    return data[0] as Task;
}

export const deleteTask = async(task: Task) => {
    const supabase = createClient();
    const{data,error} = await supabase
    .from("tasks")
    .delete()
    .eq("task_id",task.task_id)
    .select("*");
    if(error) throw error;
    return data[0] as Task;
}

export const markTaskIncomplete = async (task: Task):Promise<Task> => {
    const supabase = createClient();
    const{data,error} = await supabase
    .from("tasks")
    .update({is_complete: false})
    .eq("task_id",task.task_id)
    .select("*")
    .single();
    if(error) throw error;
    if(data==null) throw new Error("Error marking task as incomplete");
    return data as Task;

}