"use client";
import { supabase } from "@/utils/supabase/supabase";
export const startTask = async (task: Task) => {
    // Updates the unique task and returns it
    const taskId = task.task_id;

    // Handling in DB
    const nowUTC = new Date().toISOString();
    const {data, error} = await supabase
    .from("tasks")
    .update({ last_start_time: nowUTC })
    .eq("task_id", taskId)
    .select();

    if(error) throw(error);
    
    // Handling realtime update
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const channel = supabase.channel(`status_${userId}`);
    channel.send({
        type: "broadcast",
        event: "status_update",
        payload: {
            task: data[0],
        }
    });

    return data[0] as Task;
}
export const pauseTask= async (task: Task): Promise<Task>  => {
    // Pauses the unique task by updating its seconds and setting last start to null and returns it

    const taskId = task.task_id;
    const {data: curTask, error: errorFetch} = await supabase
    .from("tasks")
    .select("last_start_time, seconds_spent")
    .eq("task_id", taskId)
    .single();

    if(errorFetch) throw(errorFetch);

    // Allowed null values for unstarted tasks. Do not proceed if the task has not been started.
    if(curTask.last_start_time == null) return curTask as Task;

    // Calculate the second difference between now and the last start time
    const lastStartTimeString = curTask?.last_start_time;
    const nowUTC = new Date();
    const lastStartTimeUTC = new Date(lastStartTimeString);

    const additionalSeconds = Math.floor((nowUTC.getTime()-lastStartTimeUTC.getTime())/1000);
    const newSecondsSpent = additionalSeconds + curTask.seconds_spent;

    // Update task time
    const {data: updatedTask, error: errorUpdate} = await supabase
    .from("tasks")
    .update({ 
        seconds_spent: newSecondsSpent,
        last_start_time: null,
    })
    .eq("task_id", taskId)
    .select("*");

    if(errorUpdate) throw(errorUpdate);
    
    // Send updated task to friends
    const newTaskStatus: Task = updatedTask[0];
    await broadcastUpdatedTask(newTaskStatus);

    // Add new working interval
    let newDay;
    if(lastStartTimeUTC.getDay() != nowUTC.getDay()) {
        newDay = new Date(lastStartTimeUTC);
        newDay.setHours(23, 59, 59, 999);
        const { error: errorFirstInterval } = await supabase
        .from("task_intervals")
        .insert({
          end_time: newDay.toISOString(),
          start_time: curTask.last_start_time,
          task_id: taskId,
        });
        if(errorFirstInterval) throw(errorFirstInterval);

        const startOfNextDay = new Date(newDay.getTime()+1);
        
        const { error: errorSecondInterval } = await supabase
        .from("task_intervals")
        .insert({
          end_time: nowUTC.toISOString(),
          start_time: startOfNextDay.toISOString(), 
          task_id: taskId,
        });
        if(errorSecondInterval) throw(errorSecondInterval);
    }
    else {
    const {error: errorSetInterval} = await supabase
    .from("task_intervals")
    .insert({
        task_id: taskId,
        start_time: curTask.last_start_time,
        end_time: nowUTC.toISOString()
    });

    if(errorSetInterval) throw(errorSetInterval);
    }
    return updatedTask[0] as Task;
}
export const completeTask= async (task: Task) => {
    // Updates the unique task and returns it

    // We do not want the task to forever count last start time because it's finished
    await pauseTask(task);
    const taskId = task.task_id;
    
    const {data, error} = await supabase
    .from("tasks")
    .update({ is_complete: true })
    .eq("task_id", taskId)
    .select();
    
    if(error) throw(error);
    return data[0] as Task;
}

export const getTaskSeconds = async(taskId: number) => {
    const{data, error} = await supabase
    .from("tasks")
    .select("seconds_spent, last_start_time")
    .eq("task_id", taskId)
    .single();

    if(error) throw error;

    let lastStartTime = new Date();
    const currentTime = new Date();

    if(data.last_start_time != null) lastStartTime = new Date(data.last_start_time);  // Assuming last_start_time is in UTC
    const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - lastStartTime.getTime()) / 1000);

    const totalSecondsSpent = timeDifferenceInSeconds + data.seconds_spent;
    return totalSecondsSpent;
}

export const getInProgressTask = async(): Promise<Task|null> => {
    // Find a task, if any, that is in progress and return its id. If no task in progress, return null
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("getInProgressTaskId - Error getting user ID!");
        return null;
    }

    const {data, error} = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id",userId)
    .not("last_start_time", "is", null);
    if(error) throw(error);

    if(data) return data[0] as Task;
    return null;
}
export const getSecondsSinceLastStart = async (taskId: number) => {
    const { data, error } = await supabase
        .from("tasks")
        .select("last_start_time")
        .eq("task_id", taskId)
        .single();

    if (error) throw error;

    // If task isn't started yet, 0 sec have passed basically
    if(data.last_start_time==null) return 0;

    // Convert to Date objects and find diff
    const lastStartTime = new Date(data.last_start_time);  // Assuming last_start_time is in UTC
    const currentTime = new Date();

    const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - lastStartTime.getTime()) / 1000);

    return timeDifferenceInSeconds;
}

export const getDayStartEnd = () => {
    const now = new Date();
    const today = new Date(now);

    // Define the start and end of the day in the user's time zone
    const startOfDayLocal = new Date(today);
    startOfDayLocal.setHours(0, 0, 0, 0); // 00:00 local time

    const endOfDayLocal = new Date(today);
    endOfDayLocal.setHours(23, 59, 59, 999); // 23:59 local time

    // Convert the start and end of the day to UTC to use in Supabase
    const startOfDayUTC = startOfDayLocal.toISOString();
    const endOfDayUTC = endOfDayLocal.toISOString();
    return {startOfDayUTC, endOfDayUTC};

}

export const broadcastUpdatedTask = async(updatedTask: Task) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const channel = supabase.channel(`status_${userId}`);
    channel.send({
        type: "broadcast",
        event: "status_update",
        payload: {
            task: updatedTask,
        }
    });

}