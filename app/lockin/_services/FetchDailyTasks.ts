"use client";
import { supabase } from "@/utils/supabase/supabase";
import { getDayStartEnd } from "./TaskTimeUtils";
import { TaskInterval } from "./TaskIntervalSchema";

export const getTodaysTasks = async (userTimeZone: string): Promise<Task[]> => {
    const {startOfDayUTC, endOfDayUTC} = getDayStartEnd(userTimeZone);

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("getTodaysTasks() - Error fetching user ID");
        throw new Error("Error getting user ID");
    }

    const {data, error} = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", startOfDayUTC)
    .lte("created_at", endOfDayUTC);

    if(error) {
        console.log("getTodaysTasks() - Error fetching daily tasks");
        throw (error);
    }
    
    return data as Task[];
}

export const getTaskIntervals = async(userTimeZone: string): Promise<TaskInterval[]> => {
    const { startOfDayUTC, endOfDayUTC} = getDayStartEnd(userTimeZone);

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("getTaskIntervals() - Error fetching user ID");
        throw new Error("Error getting user ID");
    }

    const { data, error } = await supabase
    .from("task_intervals")
    .select(`
        *,
        tasks !inner(user_id)
    `)
    .eq("tasks.user_id", userId)
    .gte("start_time", startOfDayUTC)
    .lte("end_time", endOfDayUTC);

    if (error) {
        console.log("getTaskIntervals() - Error fetching intervals")
        throw error;
    }
    return data as TaskInterval[];
}
export const calculateHourlyIntervals = (data: TaskInterval[]) => {
    const intervals = Array(24).fill(0);

    for(const task of data) {
        const startTime = new Date(task.start_time);
        const endTime = new Date(task.end_time);

        const startTimeMinutes = startTime.getHours()*60+startTime.getMinutes(); 
        const endTimeMinutes = endTime.getHours()*60+endTime.getMinutes(); 

        for (let i = 0; i < 24; i++) {
            const intervalStart = i * 60;  // Start of interval in minutes (e.g., 0, 60, 120, ...)
            const intervalEnd = (i + 1) * 60; // End of interval in minutes (e.g., 60, 120, 180, ...)

            // Calculate the overlap between the task and the interval
            const overlapStart = Math.max(intervalStart, startTimeMinutes)
            const overlapEnd = Math.min(intervalEnd, endTimeMinutes);

            // If the task's time overlaps with the interval, add the overlap duration (in minutes)
            if (overlapStart < overlapEnd) {
                intervals[i] += (overlapEnd - overlapStart); // Add the overlap in minutes
            }
        }

    }
    return intervals; 
}