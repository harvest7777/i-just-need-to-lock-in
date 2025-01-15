"use client";

import { useState, useEffect } from "react";
import { Friend } from "../_services/FriendSchema";
import { FetchAcceptedFriends, getFriendActivity } from "../_services/FetchFriends";
import { supabase } from "@/utils/supabase/supabase";
import { Task } from "@/app/lockin/_services/TaskSchema";
export const useAcceptedFriends = () => {
    const [acceptedFriends, setAcceptedFriends] = useState<Friend[]>([]);
    const [friendActivity, setFriendActivity] = useState<Map<string, Task>>(new Map());

    // Fetch current friend activity and sets state
    const syncFriendActivity = async (friends: Friend[]) => {
        const map: Map<string, Task> = await getFriendActivity(friends);
        setFriendActivity(map);
    }
    
    const getAndSetAcceptedFriends = async() => {
        const friends = await FetchAcceptedFriends();
        await syncFriendActivity(friends);
        setAcceptedFriends(friends);
    }

    useEffect(()=>{
        getAndSetAcceptedFriends();
    },[])

    useEffect(()=>{
        // Subscribe to all your friend's channel when you fetch acceptedFriends
        const friendsSubscriptions = acceptedFriends.map((friend)=> {
            const channel = supabase.channel(`status_${friend.user_id}`);
            channel.on("broadcast", {event:"status_update"}, (message) => {
                // When friend's work status changes, update their activity
                const {task} = message.payload;
                setFriendActivity((map)=> new Map(map.set(friend.user_id, task)));
            }).subscribe();
            return channel;
        })
        // Cleanup
        return() => {
            friendsSubscriptions.forEach((channel) => {
                channel.unsubscribe();
            })
        }
    },[acceptedFriends])


    return {acceptedFriends, setAcceptedFriends, friendActivity};
}