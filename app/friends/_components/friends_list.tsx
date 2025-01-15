"use client";
import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { MdOutlineManageAccounts } from "react-icons/md";
import Link from "next/link";
export default function FriendsList() {
    const {acceptedFriends, friendActivity} = useAcceptedFriends();
    console.log("re rendered", { acceptedFriends, friendActivity });

    return(
        <div className="w-full p-2 flex flex-col items-center">
            <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-xl pl-2">Friends</h1>
            <Link href="/manage-friends">
                <MdOutlineManageAccounts className="text-2xl btn-hover hover:text-emerald-600"/>
            </Link>
            </div>
            {acceptedFriends.length !== 0? (
                acceptedFriends.map((friend) => (
                    <div className="pl-2 w-full rounded-md" key={friend.user_id}>
                        <p className="font-semibold">{friend.name}</p>
                        <p className="italic">{friendActivity.get(friend.user_id)?.last_start_time? `🔒${friendActivity.get(friend.user_id)?.name}`: ("Not locked in")}</p>
                    </div>
                ))
            ):(
                <p className="italic"></p>
            )}
            </div>
    )
}