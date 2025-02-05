import { supabase } from "@/utils/supabase/supabase";
import { getDayStartEnd } from "@/app/(helpers)/getDayStartEnd";

export const getTaskIntervals = async(): Promise<TaskInterval[]> => {
    const { startOfDayUTC, endOfDayUTC} = getDayStartEnd();

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
