"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { IoMdClose } from "react-icons/io";

import ConfirmRemoveFriendModal from "./ConfirmRemoveFriendModal";

// List all friends with option to remove them
interface FriendsManagerProps {
  acceptedFriends: Friend[];
  setAcceptedFriends: Dispatch<SetStateAction<Friend[]>>;
}
export default function FriendsManager({ acceptedFriends, setAcceptedFriends }: FriendsManagerProps) {
  const [friendToRemove, setFriendToRemove] = useState<Friend | null>(null);

  return (

    <div className="w-full flex flex-col divide-y divide-gray-700 ">
      <ConfirmRemoveFriendModal friendToRemove={friendToRemove} setFriendToRemove={setFriendToRemove} setAcceptedFriends={setAcceptedFriends} />
      {acceptedFriends.length > 0 ? (
        acceptedFriends.map((friend) => (
          <div key={friend.user_id} className="flex justify-between align-middle items-center py-3 px-2">
            <p className="flex-1">{friend.name}</p>
            <IoMdClose onClick={() => setFriendToRemove(friend)} className="flex-none text-2xl btn-hover hover:text-red-600" />
          </div>
        ))
      ) : (
        <p className="text-center">No friends</p>
      )}
    </div>
  )
}
