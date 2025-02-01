import { supabase } from "@/utils/supabase/supabase";

export const getOffsetIntervals = async (offset:number):Promise<TaskInterval[]> => {
    const {startOfOffsetDayUTC, endOfOffsetDayUTC} = getOffsetDayStartEnd(offset);

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
    .gte("start_time", startOfOffsetDayUTC)
    .lte("end_time", endOfOffsetDayUTC);

    if (error) {
        console.log("getTaskIntervals() - Error fetching intervals")
        throw error;
    }
    return data as TaskInterval[];

}

export const getOffsetDayStartEnd = (offset:number) => {
    const now = new Date();
    const today = new Date(now);

    // Define the start and end of the day in the user's time zone
    const startOfDayLocal = new Date(today);
    startOfDayLocal.setHours(0, 0, 0, 0); // 00:00 local time
    startOfDayLocal.setDate((startOfDayLocal.getDate()-offset));

    const endOfDayLocal = new Date(today);
    endOfDayLocal.setHours(23, 59, 59, 999); // 23:59 local time
    endOfDayLocal.setDate((endOfDayLocal.getDate()-offset));

    // Convert the start and end of the day to UTC to use in Supabase
    const startOfOffsetDayUTC = startOfDayLocal.toISOString();
    const endOfOffsetDayUTC = endOfDayLocal.toISOString();
    return {startOfOffsetDayUTC, endOfOffsetDayUTC};

}
