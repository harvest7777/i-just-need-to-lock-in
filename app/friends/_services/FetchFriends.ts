"use client";
import { Friend } from "./FriendSchema";
import { createClient } from "@/utils/supabase/client"
export const getNameFromUUID = async(uuid: string): Promise<string> => {
    const supabase = await createClient();
    const{data, error} = await supabase
    .from("profiles")
    .select("name")
    .eq("user_id", uuid)
    .single();
    if(error) throw(error);
    return data? data.name: "";
}

export const FetchPendingFriends = async() => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    //want to fetch all columns where you are the recipient and the request has not been accepted
    const{data, error} = await supabase
    .from("friends")
    .select("*")
    .eq("recipient", userId)
    .eq("is_accepted", false);

    if(error) throw(error);
    const friends: Friend[] = await Promise.all(
        data.map(async (row) => {
          const name = await getNameFromUUID(row.initiator); // Fetch name asynchronously
          return {
            user_id: row.initiator,
            name,
            is_accepted: false,
            created: row.created_at, // Ensure this matches your schema
          };
        })
      );
      
      return friends;

}