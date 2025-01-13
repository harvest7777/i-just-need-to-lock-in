"use client";
import FriendsManager from "./_components/friends_manager"
import IncomingFriends from "./_components/incoming_friends";
import AddFriendForm from "./_components/add_friend_form";
import SearchFriendForm from "./_components/search_friend_form";
import { useAcceptedFriends } from "../friends/_hooks/useAcceptedFriends"
import { usePendingFriends } from "../friends/_hooks/usePendingFriends";
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from "react";
import { AddFriend } from "../friends/_services/AddFriend";
export default function ManageFriendsPage() {
    // Accepting, declining, and removing friends require coupling between accepted and pending friends
    const {acceptedFriends, setAcceptedFriends} = useAcceptedFriends();
    const {pendingFriends, setPendingFriends} = usePendingFriends();
    
    const [window, setWindow] = useState<string>("all")
    return (
        <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center">
            <p className="text-2xl">Locking in is better with friends. Lets add some!</p>
        </div>

        <div className="flex justify-between space-x-2 md:w-2/5 w-3/5 my-4">
            <p onClick={()=>setWindow("all")} className={`p-2 w-1/3 text-center bg-appFg rounded-xl btn-hover ${window==="all" && "font-bold"}`}>All</p>
            <p onClick={()=>setWindow("incoming")} className={`p-2 w-1/3 text-center bg-appFg rounded-xl btn-hover ${window==="incoming" && "font-bold"}`}>Pending</p>
            <p onClick={()=>setWindow("add")} className={`p-2 w-1/3 text-center bg-appFg rounded-xl btn-hover ${window==="add" && "font-bold"}`}>Add</p>
        </div>
        <div className="md:w-2/5 w-3/5">
            {window==="all"&& <div className="bg-appFg rounded-2xl p-2">
                <FriendsManager acceptedFriends={acceptedFriends} setAcceptedFriends={setAcceptedFriends}/>
            </div>}
            {window==="incoming"&& <div className="bg-appFg rounded-2xl p-2">
                <IncomingFriends pendingFriends={pendingFriends} setPendingFriends={setPendingFriends} setAcceptedFriends={setAcceptedFriends}/>
            </div>}
            {window=="add"&& <div className="flex flex-col gap-y-2">
                <div className="rounded-2xl">
                <SearchFriendForm acceptedFriends={acceptedFriends}/>
                </div>
            </div>}
        </div>
        </div>
    )
}