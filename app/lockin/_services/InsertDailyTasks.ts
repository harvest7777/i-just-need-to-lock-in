"use client";
import { supabase } from "@/utils/supabase/supabase";
export const insertDailyTask = async (taskName: string): Promise<Task> => {
    // Create a new task in the DB and return it
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("insertDailyTask - Error fetching user ID");
        throw new Error("Couldn't get userId");
    }

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
export const insertCompletedTask= async (taskName: string, taskSeconds: number) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("insertCompletedTask - Error fetching user ID");
        return;
    }

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