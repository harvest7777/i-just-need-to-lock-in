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