"use client";
import { createClient } from "@/utils/supabase/client";

export const AddFriend = async(friendUUID: string) => {
    // This will insert a row where you are the initiator, friendUUID is the recipient
    const supabase = createClient();
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    const {error} = await supabase
    .from("friends")
    .insert({
        initiator: userId,
        recipient: friendUUID
    })
    if(error) throw error;
}

export const AcceptFriend = async (friendUUID: string) => {
    const supabase = createClient();
    
    const{error} = await supabase
    .from("friends")
    .update({is_accepted: true})
    .eq('initiator', friendUUID);

    if(error) throw error;
}