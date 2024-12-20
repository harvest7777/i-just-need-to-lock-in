"use client";
import { createClient } from "@/utils/supabase/client";
import { Task } from "./TaskSchema";
export const InsertDailyTask = async (taskName: string) => {
    // Create a new task in the DB and return it
    const supabase = await createClient();
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    const{data, error} = await supabase
    .from("tasks")
    .insert({
        user_id: userId,
        name: taskName,        
    })
    .select("*");

    if(error) throw error;
    return data[0] as Task;
}
export const InsertCompletedTask= async (taskName: string, taskSeconds: number) => {
    const supabase = await createClient();
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    const{data, error} = await supabase
    .from("tasks")
    .insert({
        user_id: userId,
        name: taskName,        
        seconds_spent: taskSeconds,
        is_complete: true,
    })

    if(error) throw error;
    return data;
}