"use client";
import FriendsManager from "./_components/friends_manager"
import IncomingFriends from "./_components/incoming_friends";
import AddFriendForm from "./_components/add_friend_form";
import { useAcceptedFriends } from "../friends/_hooks/useAcceptedFriends"
import { usePendingFriends } from "../friends/_hooks/usePendingFriends";
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from "react";
export default function ManageFriendsPage() {
    // Accepting, declining, and removing friends require coupling between accepted and pending friends
    const {acceptedFriends, setAcceptedFriends} = useAcceptedFriends();
    const {pendingFriends, setPendingFriends} = usePendingFriends();
    
    const [userId, setUserId] = useState<string|null>(null);
    const [window, setWindow] = useState<string>("all")
    useEffect(() => {
        const fetchUserId = async () => {
            const supabase = createClient();
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error("Error fetching user:", error.message);
            } 
            if(user?.id) setUserId(user.id);
        };

        fetchUserId();
    }, []); 
    return (
        <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center">
            <p className="text-2xl">Locking in is better with friends. Add some with their id!</p>
            <p className="italic">Your id: {userId}</p>
        </div>
        <div className="md:w-1/5 w-2/5 mt-5">
            <AddFriendForm/>
        </div>

        <div className="flex space-x-2 md:w-1/5 w-2/5 my-2">
            <p onClick={()=>setWindow("all")} className={`w-1/2 text-center bg-appFg rounded-xl btn-hover ${window==="all" && "font-bold"}`}>All</p>
            <p onClick={()=>setWindow("incoming")} className={`w-1/2 text-center bg-appFg rounded-xl btn-hover ${window==="incoming" && "font-bold"}`}>Incoming</p>
        </div>
        <div className="md:w-1/5 w-2/5 bg-appFg rounded-2xl p-2">
            {window==="all"&&<FriendsManager acceptedFriends={acceptedFriends} setAcceptedFriends={setAcceptedFriends}/>}
            {window==="incoming"&&<IncomingFriends pendingFriends={pendingFriends} setPendingFriends={setPendingFriends} setAcceptedFriends={setAcceptedFriends}/>}
        </div>
        </div>
    )
}