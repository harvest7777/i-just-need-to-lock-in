import { supabase } from "@/utils/supabase/supabase";
import { Friend } from "./FriendSchema";
export const AddFriend = async(friendUUID: string): Promise<Friend|null> => {
    // This will insert a row where you are the initiator, friendUUID is the recipient
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    // check if a relationship exists already
    const {data} = await supabase
    .from("friends")
    .select("*")
    .or(`and(initiator.eq.${userId},recipient.eq.${friendUUID}),and(initiator.eq.${friendUUID},recipient.eq.${userId})`);
    if(data?.length !== 0) return null;

    const{data: newFriend } = await supabase
    .from("friends")
    .insert({
        initiator: userId,
        recipient: friendUUID
    })
    .select(`
        created_at,
        recipient,
        profiles!recipient(name)
      `);
    interface Profile {
        name: string;
    }
    interface dataReturned {
        recipient: string;
        created_at: string;
        profiles: Profile;
    }
    if(newFriend == null) return null;
    const fetchedData: dataReturned = newFriend[0] as unknown as dataReturned;
    const sentFriend: Friend = {
        user_id: fetchedData.recipient,
        name: fetchedData.profiles.name,
        is_accepted: false,
        created: fetchedData.created_at
    }
    return sentFriend;
    
}

export const AcceptFriend = async (friendUUID: string) => {
    
    const{error} = await supabase
    .from("friends")
    .update({is_accepted: true})
    .eq('initiator', friendUUID);

    if(error) throw error;
}