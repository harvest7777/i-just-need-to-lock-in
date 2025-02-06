"use client";
import { useState, useEffect } from "react"

import { supabase } from "@/utils/supabase/supabase";

import { getPendingFriends } from "@/app/(api)/friendServices";
import { getNameFromUUID } from "@/app/(api)/profileServices";

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
        const friends = await getPendingFriends();
        setPendingFriends(friends);
    }
    const handleVisibilityChange = () => {
        if (document.visibilityState==="visible") {
            getAndSetPendingFriends();
        }
    }

    // Update pending friends with new payload
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

    // Subscribe to the database and listen for any new friend requests where the user is the recipient 
    const subscribeFriendsTable = async () => {

        const user = supabase.auth.getUser();
        const userId =(await user).data.user?.id;

        const channel = supabase
        .channel('friends')
        .on("postgres_changes", { event: 'INSERT', schema: 'public', table: 'friends', filter: `recipient=eq.${userId}` }, handlePayload)
        .subscribe();

        return channel;
   }

    useEffect(()=>{
        // Wanna always update the list of pending friends
        let channel: any;

        const initialize = async () => {
            channel = await subscribeFriendsTable();
            getAndSetPendingFriends();
        }

        initialize();
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if(channel) {
                supabase.removeChannel(channel);
            }
        }
            
    },[]) ;

    return {pendingFriends, setPendingFriends};
}