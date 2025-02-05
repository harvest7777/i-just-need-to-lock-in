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
