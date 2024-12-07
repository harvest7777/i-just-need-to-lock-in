"use client";
import { createClient } from "@/utils/supabase/client";

export const InsertDailyTask = async (taskName: string) => {
    const supabase = await createClient();
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    const{data, error} = await supabase
    .from("tasks")
    .insert({
        user_id: userId,
        name: taskName,        
    })

    if(error) throw error;
    return data;
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