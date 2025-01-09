"use client";

import { IoMdClose } from "react-icons/io";
import { Friend } from "@/app/friends/_services/FriendSchema";
import { DeleteFriend } from "@/app/friends/_services/TerminateFriend";
import { Dispatch, SetStateAction } from "react";
// List all friends with option to remove them
interface FriendsManagerProps {
    acceptedFriends: Friend[];
    setAcceptedFriends: Dispatch<SetStateAction<Friend[]>>;
}
export default function FriendsManager({acceptedFriends, setAcceptedFriends}: FriendsManagerProps) {
    const handleRemove = async (friendUUID: string) => {
        await DeleteFriend(friendUUID);
        setAcceptedFriends((prev)=>prev.filter(friend=>friend.user_id!=friendUUID));
    }
    return (
        <div className="w-full">
            {acceptedFriends.length > 0? (
                acceptedFriends.map((friend) => (
                    <div key={friend.user_id} className="flex space-x-1">
                        <p className="w-4/5">{friend.name}</p>
                        <IoMdClose onClick={()=>handleRemove(friend.user_id)} className="w-1/5 text-2xl btn-hover hover:text-red-600"/>
                    </div>
                ))
            ): (
                <p>No friends</p>
            )}
        </div>
    )
}
