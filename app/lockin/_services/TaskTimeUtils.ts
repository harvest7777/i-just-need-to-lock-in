"use client";
import { createClient } from "@/utils/supabase/client";

export const startTask = async (taskId: number) => {
    // Updates the unique task and returns it
    const supabase = await createClient();
    const nowUTC = new Date().toISOString();

    const {data, error} = await supabase
    .from("tasks")
    .update({ last_start_time: nowUTC })
    .eq("task_id", taskId)
    .select();

    if(error) throw(error);
    return data;
}
export const pauseTask= async (taskId: number) => {
    // Pauses the unique task by updating its seconds and setting last start to null and returns it
    const supabase = await createClient();

    const {data: curTask, error: errorFetch} = await supabase
    .from("tasks")
    .select("last_start_time, seconds_spent")
    .eq("task_id", taskId)
    .single();

    if(errorFetch) throw(errorFetch);
    // Allowed null values for unstarted tasks. Do not proceed if the task has not been started.
    if(curTask.last_start_time == null) return;

    // Calculate the minute difference between now and the last start time
    const lastStartTimeString = curTask?.last_start_time;
    const nowUTC = new Date();
    const lastStartTimeUTC = new Date(lastStartTimeString);

    const additionalSeconds = Math.floor((nowUTC.getTime()-lastStartTimeUTC.getTime())/1000);
    const newSecondsSpent = additionalSeconds + curTask.seconds_spent;

    const {data: updatedTask, error: errorUpdate} = await supabase
    .from("tasks")
    .update({ 
        seconds_spent: newSecondsSpent,
        last_start_time: null,
    })
    .eq("task_id", taskId)
    .select();

    if(errorUpdate) throw(errorUpdate);

    const {error: errorSetInterval} = await supabase
    .from("task_intervals")
    .insert({
        task_id: taskId,
        start_time: curTask.last_start_time,
        end_time: nowUTC
    });

    if(errorSetInterval) throw(errorSetInterval);

    return updatedTask;

}
export const completeTask= async (taskId: number) => {
    // Updates the unique task and returns it
    const supabase = await createClient();

    // We do not want the task to forever count last start time because it's finished
    await pauseTask(taskId);

    const {data, error} = await supabase
    .from("tasks")
    .update({ is_complete: true })
    .eq("task_id", taskId)
    .select();
    
    console.log(data);
    if(error) throw(error);
    return data;
}

export const getTaskSeconds = async(taskId: number) => {
    const supabase = await createClient();
    const{data, error} = await supabase
    .from("tasks")
    .select("seconds_spent")
    .eq("task_id", taskId)
    .single();

    if(error) throw error;
    return data.seconds_spent;
}