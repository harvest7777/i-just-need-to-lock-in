"use client";
import { useState, useEffect } from "react"
import { FetchPendingFriends, getNameFromUUID } from "../_services/FetchFriends";
import { Friend } from "../_services/FriendSchema";
import { createClient } from "@/utils/supabase/client";

interface PayloadNewResponse {
    created_at: string;
    id: number;
    initiator: string;
    is_accepted: boolean;
    recipient: string;
}
export const usePendingFriends= () => {
    const [pendingFriends, setPendingFriends] = useState<Friend[]>([]);

    // For state variable
    const getAndSetPendingFriends = async() => {
        const friends = await FetchPendingFriends();
        setPendingFriends(friends);
    }

    // To subscribe to db
    const subscribeFriendsTable = async () => {

        const supabase = await createClient();
        const user = supabase.auth.getUser();
        const userId =(await user).data.user?.id;

        supabase
        .channel('friends')
        .on("postgres_changes", { event: 'INSERT', schema: 'public', table: 'friends', filter: `recipient=eq.${userId}` }, handlePayload)
        .subscribe()
   }

    // For realtime response
    const handlePayload = async(payload: {new: PayloadNewResponse}) => {
        // Friends schema doesn't include name, so we gotta fetch it
        const friendName = await getNameFromUUID(payload.new.initiator);

        // Make a new friend from the payload data
        const newFriend: Friend = {
            user_id: payload.new.initiator,
            name: friendName,
            is_accepted: payload.new.is_accepted,
            created: payload.new.created_at
        }

        setPendingFriends((prev)=>[...prev, newFriend]);
    }

    useEffect(()=>{
        // Wanna always update the list of pending friends
        subscribeFriendsTable();
        getAndSetPendingFriends();
            
    },[]) ;

    return {pendingFriends};
}