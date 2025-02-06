"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { IoMdClose } from "react-icons/io";

import ConfirmRemoveFriendModal from "./ConfirmRemoveFriendModal";

// List all friends with option to remove them
interface FriendsManagerProps {
    acceptedFriends: Friend[];
    setAcceptedFriends: Dispatch<SetStateAction<Friend[]>>;
}
export default function FriendsManager({acceptedFriends, setAcceptedFriends}: FriendsManagerProps) {
    const [friendToRemove, setFriendToRemove] = useState<Friend|null>(null);

    return (
        
        <div className="w-full">
            <ConfirmRemoveFriendModal friendToRemove={friendToRemove} setFriendToRemove={setFriendToRemove} setAcceptedFriends={setAcceptedFriends}/>
            {acceptedFriends.length > 0? (
                acceptedFriends.map((friend) => (
                    <div key={friend.user_id} className="flex space-x-1">
                        <p className="w-4/5">{friend.name}</p>
                        <IoMdClose onClick={()=>setFriendToRemove(friend)} className="w-1/5 text-2xl btn-hover hover:text-red-600"/>
                    </div>
                ))
            ): (
                <p className="text-center">No friends</p>
            )}
        </div>
    )
}
