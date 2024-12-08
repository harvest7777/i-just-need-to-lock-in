"use client";
import { createClient } from "@/utils/supabase/client";

export const getTodaysTasks = async (userTimeZone: string) => {
    // Get the current date in the user's time zone
    const now = new Date().toLocaleString("en-US", { timeZone: userTimeZone });
    const today = new Date(now);

    // Define the start and end of the day in the user's time zone
    const startOfDayLocal = new Date(today);
    startOfDayLocal.setHours(0, 0, 0, 0); // 00:00 local time

    const endOfDayLocal = new Date(today);
    endOfDayLocal.setHours(23, 59, 59, 999); // 23:59 local time

    // Convert the start and end of the day to UTC to use in Supabase
    const startOfDayUTC = startOfDayLocal.toISOString();
    const endOfDayUTC = endOfDayLocal.toISOString();

    const supabase = await createClient();
    const {data, error} = await supabase
    .from("tasks")
    .select("*")
    .gte("created_at", startOfDayUTC)
    .lte("created_at", endOfDayUTC);

    if(error) {
        throw error;
    }
    return data;
}

export const getTodaysIntervals = async (userTimeZone: string) => {
    // Get the current date in the user's time zone
    const now = new Date().toLocaleString("en-US", { timeZone: userTimeZone });
    const today = new Date(now);

    // Define the start and end of the day in the user's time zone
    const startOfDayLocal = new Date(today);
    startOfDayLocal.setHours(0, 0, 0, 0); // 12:00 AM local time

    const endOfDayLocal = new Date(today);
    endOfDayLocal.setHours(23, 59, 59, 999); // 11:59 PM local time

    // Convert the start and end of the day to UTC to use in Supabase
    const startOfDayUTC = startOfDayLocal.toISOString();
    const endOfDayUTC = endOfDayLocal.toISOString();

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("task_intervals")
        .select("*")
        .gte("start_time", startOfDayUTC)
        .lte("end_time", endOfDayUTC);

    if (error) throw error;

    // Initialize the 24 intervals array (1 for each hour of the day)
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
    return intervals; // You can return either minutes or hours depending on what you need
}
