"use client";

import { useEffect, useState } from "react";

import FriendsManager from "./_components/FriendsManager"
import IncomingFriends from "./_components/IncomingFriends";
import SearchFriendForm from "./_components/SearchFriendForm";

import { getUserId } from "../(api)/profileServices";
import { useAcceptedFriends } from "../friends/_hooks/useAcceptedFriends"
import { usePendingFriends } from "../friends/_hooks/usePendingFriends";
import { useSentFriends } from "../friends/_hooks/useSentFriends";
import HeaderCard from "@/components/ui/header-card";

export default function ManageFriendsPage() {
  // Accepting, declining, and removing friends require coupling between accepted and pending friends
  const { acceptedFriends, setAcceptedFriends } = useAcceptedFriends();
  const { pendingFriends, setPendingFriends } = usePendingFriends();
  const { sentFriends, setSentFriends } = useSentFriends();
  const [userId, setUserId] = useState<string>("");
  const [window, setWindow] = useState<string>("all")

  const initialize = async () => {
    const fetchedUserId = await getUserId();
    setUserId(fetchedUserId);
  }
  useEffect(() => {
    initialize();
  }, [])
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-neutral-400">Your user ID: {userId}</h1>
      <div className="flex justify-between space-x-2 md:w-2/5 w-full my-4">
        <p onClick={() => setWindow("all")} className={`p-2 w-1/3 text-center bg-app-fg rounded-xl btn-hover ${window === "all" && "font-bold"}`}>All</p>
        <div className="relative w-1/3 btn-hover" >
          {pendingFriends.length > 0 && <div className="absolute top-[-5px] right-[-5px] z-40 w-3 h-3 bg-red-600 rounded-full " />}
          <p onClick={() => setWindow("incoming")} className={`p-2 w-full text-center bg-app-fg rounded-xl ${window === "incoming" && "font-bold"}`}>Pending</p>
        </div>
        <p onClick={() => setWindow("add")} className={`p-2 w-1/3 text-center bg-app-fg rounded-xl btn-hover ${window === "add" && "font-bold"}`}>Add</p>
      </div>
      <div className="md:w-2/5 w-full">
        {window === "all" && <div className="bg-app-fg rounded-2xl p-2 py-0">
          <FriendsManager acceptedFriends={acceptedFriends} setAcceptedFriends={setAcceptedFriends} />
        </div>}
        {window === "incoming" && <div className="bg-app-fg rounded-2xl p-2">
          <IncomingFriends pendingFriends={pendingFriends} setPendingFriends={setPendingFriends} setAcceptedFriends={setAcceptedFriends} />
        </div>}
        {window == "add" && <div className="flex flex-col gap-y-2">
          <div className="rounded-2xl">
            <SearchFriendForm acceptedFriends={acceptedFriends} sentFriends={sentFriends} setSentFriends={setSentFriends} />
          </div>
        </div>}
      </div>
    </div>
  )
}
