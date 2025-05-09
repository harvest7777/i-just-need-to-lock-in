import { Dispatch, SetStateAction, useState } from "react";

import { IoMdClose } from "react-icons/io";
import PreLoaderSmall from "@/app/_components/PreLoaderSmall";

import ConfirmRemoveFriendModal from "./ConfirmRemoveFriendModal";

// List all friends with option to remove them
interface FriendsManagerProps {
  acceptedFriends: Friend[] | null;
  setAcceptedFriends: Dispatch<SetStateAction<Friend[] | null>>;
}
export default function FriendsManager({
  acceptedFriends,
  setAcceptedFriends,
}: FriendsManagerProps) {
  const [friendToRemove, setFriendToRemove] = useState<Friend | null>(null);

  if (acceptedFriends === null) {
    return <PreLoaderSmall />;
  }
  return (
    <div className="w-full flex flex-col divide-y divide-gray-700 ">
      <ConfirmRemoveFriendModal
        friendToRemove={friendToRemove}
        setFriendToRemove={setFriendToRemove}
        setAcceptedFriends={setAcceptedFriends}
      />
      {acceptedFriends.length > 0 ? (
        acceptedFriends.map((friend) => (
          <div
            key={friend.user_id}
            className="flex justify-between align-middle items-center py-3 px-2"
          >
            <p className="flex-1">{friend.name}</p>
            <IoMdClose
              onClick={() => setFriendToRemove(friend)}
              className="flex-none text-2xl btn-hover hover:text-red-800"
            />
          </div>
        ))
      ) : (
        <p className="text-center p-2">No friends</p>
      )}
    </div>
  );
}
