"use client";

import { Dispatch, SetStateAction } from "react";

import { IoMdClose } from "react-icons/io";
import { IoCheckmarkOutline } from "react-icons/io5";

import { acceptFriend, deleteFriend } from "@/app/(api)/friendServices";

interface IncomingFriendsProps {
    setAcceptedFriends: Dispatch<SetStateAction<Friend[]>>;
    pendingFriends: Friend[];
    setPendingFriends: Dispatch<SetStateAction<Friend[]>>;
}

export default function IncomingFriends({setAcceptedFriends, pendingFriends, setPendingFriends}: IncomingFriendsProps) {
    const handleAccept = async (friendUUID: string) => {
        await acceptFriend(friendUUID);
        const acceptedFriend = pendingFriends.find(friend =>friend.user_id===friendUUID);
        if(acceptedFriend)
        {
            setAcceptedFriends((prev)=>[...prev, acceptedFriend])
            setPendingFriends((prev)=> prev.filter(friend=>friend.user_id!==friendUUID))
        }
    }
    const handleDecline = async (friendUUID: string) => {
        await deleteFriend(friendUUID);
        setPendingFriends((prev) => prev.filter(friend => friend.user_id != friendUUID));
    }
    return (
        <div className="w-full">
        {pendingFriends.length > 0 ? (
            pendingFriends.map((friend) => (
                <div key={friend.user_id} className="flex space-x-1">
                    <p className="w-3/5">{friend.name}</p>
                    <IoCheckmarkOutline onClick={()=>handleAccept(friend.user_id)} className="w-1/5 text-2xl btn-hover hover:text-green-600"/>
                    <IoMdClose onClick={() => handleDecline(friend.user_id)} className="text-2xl btn-hover hover:text-red-800 w-1/5"/>
                </div>
            ))
        ) : (<p className="text-center">No pending friend requests</p>)}
        </div>
    )
}
