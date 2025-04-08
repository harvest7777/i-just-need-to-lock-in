"use client";

import React from "react";
import Link from "next/link";

import { MdOutlineManageAccounts } from "react-icons/md";
import PreLoaderSmall from "@/app/lockin/_components/PreLoaderSmall";

import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { usePendingFriends } from "../_hooks/usePendingFriends";
import { useTaskStore } from "@/app/lockin/_hooks/useTaskStore";

const FriendsList = React.memo(function FriendsList() {
  const { acceptedFriends, friendActivity } = useAcceptedFriends();
  const { pendingFriends } = usePendingFriends();
  const pomodoroEnabled = useTaskStore((state) => state.pomodoroEnabled);
  const now = new Date();

  const getLastActiveDisplay = (seconds: number): string => {
    if (seconds < 60) return "just now"
    const minutes: number = Math.round((seconds / 60));
    if (minutes < 60) return minutes + " minutes ago";
    const hours: number = Math.round((seconds / 60 / 60));
    if (hours < 24) return hours + " hours ago"
    const days: number = Math.round((seconds / 60 / 60 / 24));
    if (days < 7) return days + " days ago"
    const weeks: number = Math.round((seconds / 60 / 60 / 24 / 7));
    if (weeks < 4) return weeks + " weeks ago"
    return "a long time ago ):"
  }
  if (acceptedFriends === null) {
    return (

      <div className="w-full p-2 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-xl pl-2">Friends</h1>

          <Link
            onClick={(e) => {
              if (pomodoroEnabled) {
                e.preventDefault();
              }
            }}
            className={`relative text-2xl btn-hover hover:text-app-highlight ${pomodoroEnabled && 'hover:cursor-not-allowed'}`}
            href="/manage-friends">
            {pendingFriends.length > 0 && <div className="absolute top-[-5px] right-[-5px] z-40 w-3 h-3 bg-red-800 rounded-full " />}
            <MdOutlineManageAccounts />
          </Link>
        </div>
        <PreLoaderSmall />
      </div>
    )
  }
  return (
    <div className="w-full p-2 flex flex-col items-center max-h-[calc(100vh-100px)] overflow-auto">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-xl pl-2">Friends</h1>

        <Link onClick={(e) => {
          if (pomodoroEnabled) {
            e.preventDefault();
          }
        }}
          className={`relative text-2xl btn-hover hover:text-app-highlight ${pomodoroEnabled && 'hover:cursor-not-allowed'}`}
          href="/manage-friends">
          {pendingFriends.length > 0 && <div className="absolute top-[-5px] right-[-5px] z-40 w-3 h-3 bg-red-800 rounded-full " />}
          <MdOutlineManageAccounts />
        </Link>
      </div>
      {acceptedFriends.length === 0 && (
        <div className="italic text-app-bg p-2">
          <span>Locking in is better with friends. Click the</span>
          <MdOutlineManageAccounts className="inline align-top text-xl mx-2" />
          <span>to add some!</span>
        </div>
      )}

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
          {
            acceptedFriends
              .slice()
              .sort((a, b) => {
                if (a.last_active === null && b.last_active === null) return 0;
                if (a.last_active === null) return 1;  // a is null → after b
                if (b.last_active === null) return -1; // b is null → after a

                const aTime = new Date(a.last_active!).getTime();
                const bTime = new Date(b.last_active!).getTime();
                return bTime - aTime; // most recent first
              })
              .filter(friend => friendActivity.get(friend.user_id)?.last_start_time == null)
              .map((friend) => {
                let lastActiveDisplay = null;
                if (friend.last_active !== null) {
                  const lastActive = new Date(friend.last_active!);
                  let diffSeconds = Math.round((now.getTime() - lastActive.getTime()) / 1000);
                  lastActiveDisplay = getLastActiveDisplay(diffSeconds);
                }

                return (
                  <div className="pl-2 w-full rounded-md" key={friend.user_id}>
                    <p className="font-semibold">{friend.name}</p>
                    {lastActiveDisplay && <p className="italic text-app-bg">{lastActiveDisplay}</p>}
                    {!lastActiveDisplay && <p className="italic text-app-bg">unlocked</p>}
                  </div>
                )
              })
          }

        </div>
      )}
    </div>
  )
})
export default FriendsList
