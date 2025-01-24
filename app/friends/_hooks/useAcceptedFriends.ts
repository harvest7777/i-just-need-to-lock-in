"use client";

import { useState, useEffect } from "react";
import { Friend } from "../_services/FriendSchema";
import { FetchAcceptedFriends, getFriendActivity } from "../_services/FetchFriends";
import { supabase } from "@/utils/supabase/supabase";
export const useAcceptedFriends = () => {
    const [acceptedFriends, setAcceptedFriends] = useState<Friend[]>([]);
    const [friendActivity, setFriendActivity] = useState<Map<string, Task>>(new Map());
    
    const getAndSetAcceptedFriends = async() => {
        const friends = await FetchAcceptedFriends();
        const map: Map<string, Task> = await getFriendActivity(friends);
        setAcceptedFriends(friends);
        setFriendActivity(map);
    }

    const handleVisibilityChange = () => {
        if (document.visibilityState==="visible") {
            getAndSetAcceptedFriends();
            console.log("doc is visible")
        }
    }

    useEffect(()=>{
        getAndSetAcceptedFriends();
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {document.removeEventListener('visibilitychange', handleVisibilityChange)};
    },[])

    useEffect(()=>{
        // Subscribe to all your friend's channel when you fetch acceptedFriends
        const friendsSubscriptions = acceptedFriends.map((friend)=> {
            const channel = supabase.channel(`status_${friend.user_id}`);
            channel.on("broadcast", {event:"status_update"}, (message) => {
                // When friend's work status changes, update their activity
                
                const {task} = message.payload;
                const newTask = task as Task;
                
                setFriendActivity((prev)=> {
                    const updatedMap = new Map(prev);
                    updatedMap.set(friend.user_id,newTask);
                    return updatedMap;
                });
                
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