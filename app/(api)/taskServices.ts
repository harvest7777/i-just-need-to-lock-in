import { supabase } from "@/utils/supabase/supabase";
import { getDayStartEnd } from "@/app/(helpers)/getDayStartEnd";

export const getTodaysTasks = async (): Promise<Task[]> => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("getTodaysTasks() - Error fetching user ID");
        throw new Error("Error getting user ID");
    }

    const {data, error} = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("is_complete", false);
    
    if(error) {
        console.log("getTodaysTasks() - Error fetching daily tasks");
        throw (error);
    }
    
    return data as Task[];
}

export const getCompletedTasks = async(): Promise<Task[]> => {
    const { startOfDayUTC, endOfDayUTC} = getDayStartEnd();
    
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("getCompleteTasks() - Error fetching user ID");
        throw new Error("Error getting user ID");
    }
    const{data, error} = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("is_complete", true)
    .gte("updated_at", startOfDayUTC)
    .lte("updated_at", endOfDayUTC);

    if(error) {
        console.log("Error fetching cmopleted tasks");
        throw error;
    }
    return data as Task[];
    
}

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

export const renameTask = async (task: Task, newName: string) => {
    const{data, error} = await supabase
    .from("tasks")
    .update({name: newName})
    .eq("task_id", task.task_id)
    .select();

    if(error) throw(error);
    return data[0] as Task;
}

export const deleteTask = async(task: Task) => {
    const{data,error} = await supabase
    .from("tasks")
    .delete()
    .eq("task_id",task.task_id)
    .select("*");
    if(error) throw error;
    return data[0] as Task;
}

export const markTaskIncomplete = async (task: Task):Promise<Task> => {
    const{data,error} = await supabase
    .from("tasks")
    .update({is_complete: false})
    .eq("task_id",task.task_id)
    .select("*")
    .single();
    if(error) throw error;
    if(data==null) throw new Error("Error marking task as incomplete");
    return data as Task;

}

export const updateTaskGroup = async(task: Task, groupId: number|null):Promise<Task> => {
    const {data, error} = await supabase
    .from("tasks")
    .update({group_id: groupId})
    .eq("task_id", task.task_id)
    .select("*")
    .single();

    if(error) throw error;
    return data as Task;
}