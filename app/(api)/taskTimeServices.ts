import { supabase } from "@/utils/supabase/supabase";
import { broadcastUpdatedTask } from "@/app/(api)/realtimeServices";

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

export const getTodaysWorkingTime = async (task: Task, taskIntervals: TaskInterval[]): Promise<number> => {
    let secondsSinceLastStart = await getSecondsSinceLastStart(task.task_id);

    // calculate how long you spent working today when tasks refresh
    const now = new Date();

    const startOfDay = new Date();
    startOfDay.setHours(0,0,0); //12 am 

    const lastStart = new Date(now.getTime() - (secondsSinceLastStart*1000));
    // if you started the task before today, only count today's working time
    if(lastStart.getDay()!=startOfDay.getDay()) {
        let offset=0;
        offset = Math.floor((startOfDay.getTime()-lastStart.getTime())/1000);
        secondsSinceLastStart-=offset;
    }

    let seconds=0;

    // calcaulte seconds spent during each interval today
    taskIntervals
    .filter((interval) => interval.task_id==task.task_id)
    .map((interval) => {
        const start = new Date(interval.start_time);
        const end = new Date(interval.end_time);
        const intervalSeconds = Math.floor((end.getTime()-start.getTime())/1000);
        seconds+=intervalSeconds;
    })
    return seconds + secondsSinceLastStart;
}

export const cancelLastStart = async(task: Task|null) => {
    if(task==null) return;
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
        console.log("cancelLastStart() - Error getting user ID");
        throw new Error("couldn't get user id");
    }
    const { data, error} = await supabase
    .from("tasks")
    .update({last_start_time: null})
    .eq("user_id", userId)
    .eq("task_id", task.task_id);
    console.log(data);
    if(error) throw error;
}
