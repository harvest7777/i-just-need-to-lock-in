import { createClient } from "@/utils/supabase/client"
export const DeleteFriend = async(friendUUID: string) => {
    const supabase = createClient();
    const{error} = await supabase
    .from("friends")
    .delete()
    .or(`recipient.eq.${friendUUID},initiator.eq.${friendUUID}`)
    .eq("is_accepted", true)
    .select();
    
    if(error) throw error;
}