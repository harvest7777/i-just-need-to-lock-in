"use client";
import FriendsManager from "./_components/friends_manager"
import IncomingFriends from "./_components/incoming_friends";
import SearchFriendForm from "./_components/search_friend_form";
import { useAcceptedFriends } from "../friends/_hooks/useAcceptedFriends"
import { usePendingFriends } from "../friends/_hooks/usePendingFriends";
import { useState,useEffect } from "react";
import { useSentFriends } from "../friends/_hooks/useSentFriends";
export default function ManageFriendsPage() {
    // Accepting, declining, and removing friends require coupling between accepted and pending friends
    const {acceptedFriends, setAcceptedFriends} = useAcceptedFriends();
    const {pendingFriends, setPendingFriends} = usePendingFriends();
    const {sentFriends ,setSentFriends} = useSentFriends(); 
    const [window, setWindow] = useState<string>("all")
    return (
        <div className="w-full flex flex-col items-center">

        <div className="flex justify-between space-x-2 md:w-2/5 w-full my-4 mt-10">
            <p onClick={()=>setWindow("all")} className={`p-2 w-1/3 text-center bg-appFg rounded-xl btn-hover ${window==="all" && "font-bold"}`}>All</p>
            <div className="relative w-1/3 btn-hover" >
                {pendingFriends.length > 0 && <div className="absolute top-[-5px] right-[-5px] z-40 w-3 h-3 bg-red-600 rounded-full "/>}
                <p onClick={()=>setWindow("incoming")} className={`p-2 w-full text-center bg-appFg rounded-xl ${window==="incoming" && "font-bold"}`}>Pending</p>
            </div>
            <p onClick={()=>setWindow("add")} className={`p-2 w-1/3 text-center bg-appFg rounded-xl btn-hover ${window==="add" && "font-bold"}`}>Add</p>
        </div>
        <div className="md:w-2/5 w-full">
            {window==="all"&& <div className="bg-appFg rounded-2xl p-2">
                <FriendsManager acceptedFriends={acceptedFriends} setAcceptedFriends={setAcceptedFriends}/>
            </div>}
            {window==="incoming"&& <div className="bg-appFg rounded-2xl p-2">
                <IncomingFriends pendingFriends={pendingFriends} setPendingFriends={setPendingFriends} setAcceptedFriends={setAcceptedFriends}/>
            </div>}
            {window=="add"&& <div className="flex flex-col gap-y-2">
                <div className="rounded-2xl">
                <SearchFriendForm acceptedFriends={acceptedFriends} sentFriends={sentFriends} setSentFriends={setSentFriends}/>
                </div>
            </div>}
        </div>
        </div>
    )
}