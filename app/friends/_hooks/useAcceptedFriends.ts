"use client";

import { useState, useEffect } from "react";
import { Friend } from "../_services/FriendSchema";
import { FetchAcceptedFriends } from "../_services/FetchFriends";
export const useAcceptedFriends = () => {
    const [acceptedFriends, setAcceptedFriends] = useState<Friend[]>([]);
    const getAndSetAcceptedFriends = async() => {
        const friends = await FetchAcceptedFriends();
        setAcceptedFriends(friends);
    }
    useEffect(()=>{
        getAndSetAcceptedFriends();
    },[])

    return {acceptedFriends, setAcceptedFriends};
}