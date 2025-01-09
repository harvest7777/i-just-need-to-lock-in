"use client";
import { goToManageFriendsAction } from "@/app/actions";
import { useAcceptedFriends } from "../../friends/_hooks/useAcceptedFriends";
import { MdOutlineManageAccounts } from "react-icons/md";
export default function FriendsList() {
    const {acceptedFriends, friendActivity} = useAcceptedFriends();
    return(
        <div className="w-full p-2 flex flex-col items-center">
            <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-xl pl-2">Friends</h1>
            <MdOutlineManageAccounts onClick={()=>goToManageFriendsAction()} className="text-2xl btn-hover hover:text-emerald-600"/>
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