"use client";

import React from "react";
import Link from "next/link";

import { MdOutlineManageAccounts } from "react-icons/md";

import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { usePendingFriends } from "../_hooks/usePendingFriends";

const FriendsList = React.memo(function FriendsList() {
  const { acceptedFriends, friendActivity } = useAcceptedFriends();
  const { pendingFriends } = usePendingFriends();
  return (
    <div className="w-full p-2 flex flex-col items-center max-h-[calc(100vh-100px)] overflow-auto">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-xl pl-2">Friends</h1>

        <Link className="relative" href="/manage-friends">
          {pendingFriends.length > 0 && <div className="absolute top-[-5px] right-[-5px] z-40 w-3 h-3 bg-red-600 rounded-full " />}
          <MdOutlineManageAccounts className="text-2xl btn-hover hover:text-app-highlight" />
        </Link>
      </div>

      {acceptedFriends.length !== 0 && (
        <div className="w-full">
          {acceptedFriends.map((friend) => (
            <div className="pl-2 w-full rounded-md" key={friend.user_id}>
              {friendActivity.get(friend.user_id)?.last_start_time != null && (
                <div>
                  <p className="font-semibold">{friend.name}</p>
                  <p className="italic">🔒{friendActivity.get(friend.user_id)?.name}</p>
                </div>
              )}
            </div>

          ))}
          {acceptedFriends.map((friend) => (
            <div className="pl-2 w-full rounded-md" key={friend.user_id}>
              {friendActivity.get(friend.user_id)?.last_start_time == null && (
                <div>
                  <p className="font-semibold">{friend.name}</p>
                  <p className="italic text-neutral-400">Unlocked</p>
                </div>
              )}
            </div>

          ))}

        </div>
      )}
    </div>
  )
})
export default FriendsList
