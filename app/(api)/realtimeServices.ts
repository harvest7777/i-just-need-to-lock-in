import { supabase } from "@/utils/supabase/supabase";

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

export const getFriendActivity = async(friends: Friend[]): Promise<Map<string, Task>> => { 
  let map = new Map();
  await Promise.all( friends.map(async (friend) => {
    const {data,error} = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", friend.user_id)
    .not("last_start_time", "is", null);
    if(error) throw error;

    if(data && data.length >0)map.set(friend.user_id,data[0]);
  }));
  return map;
}
