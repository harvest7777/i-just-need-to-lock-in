import { createClient } from "@/utils/supabase/client"
export const DeleteFriend = async(friendUUID: string) => {
    const supabase = createClient();
    const{error} = await supabase
    .from("friends")
    .delete()
    .or(`recipient.eq.${friendUUID},initiator.eq.${friendUUID}`)
    .select();
    
    if(error) throw error;
}