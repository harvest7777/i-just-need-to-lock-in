import { createClient } from "@/utils/supabase/client";

export const AddFriend = async(friendUUID: string) => {
    // This will insert a row where you are the initiator, friendUUID is the recipient
    const supabase = createClient();
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    // check if a relationship exists already
    const {data} = await supabase
    .from("friends")
    .select("*")
    .or(`and(initiator.eq.${userId},recipient.eq.${friendUUID}),and(initiator.eq.${friendUUID},recipient.eq.${userId})`);

    if(data?.length==0) {
        await supabase
        .from("friends")
        .insert({
            initiator: userId,
            recipient: friendUUID
        })
    }
    
}

export const AcceptFriend = async (friendUUID: string) => {
    const supabase = createClient();
    
    const{error} = await supabase
    .from("friends")
    .update({is_accepted: true})
    .eq('initiator', friendUUID);

    if(error) throw error;
}