"use client";
import { useState, useEffect } from "react";

import { getSentFriends } from "@/app/(api)/friendServices";

export const useSentFriends = () => {
    const [sentFriends, setSentFriends] = useState<Friend[]>([]);
    const initialize = async () => {
        const fetchedSentFriends = await getSentFriends();
        setSentFriends(fetchedSentFriends);
    }
    useEffect(()=>{
        initialize();
    },[])
    return {sentFriends, setSentFriends};
}