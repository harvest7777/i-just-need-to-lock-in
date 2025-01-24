"use client";
import { useState, useEffect } from "react";
import { FetchSentFriends } from "../_services/FetchFriends";
import { Friend } from "../_services/FriendSchema";

export const useSentFriends = () => {
    const [sentFriends, setSentFriends] = useState<Friend[]>([]);
    const getSentFriends = async () => {
        const fetchedSentFriends = await FetchSentFriends();
        setSentFriends(fetchedSentFriends);
    }
    useEffect(()=>{
        getSentFriends();
    },[])
    return {sentFriends, setSentFriends};
}