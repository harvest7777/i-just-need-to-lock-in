"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { deleteFriend } from "@/app/(api)/friendServices";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmRemoveFriendModalProps {
  friendToRemove: Friend | null;
  setFriendToRemove: Dispatch<SetStateAction<Friend | null>>;
  setAcceptedFriends: Dispatch<SetStateAction<Friend[] | null>>;
}
const ConfirmRemoveFriendModal: React.FC<ConfirmRemoveFriendModalProps> = ({
  friendToRemove,
  setFriendToRemove,
  setAcceptedFriends,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setFriendToRemove(null);
    }
  };

  useEffect(() => {
    if (friendToRemove) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [friendToRemove]);

  const handleConfirmDelete = async () => {
    if (friendToRemove == null) return;
    await deleteFriend(friendToRemove.user_id);
    setAcceptedFriends((prev) =>
      prev!.filter((friend) => friend.user_id != friendToRemove.user_id)
    );
    setFriendToRemove(null);
  };

  if (!friendToRemove) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Confirm Remove Friend
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <span>Are you sure you want to remove </span>
            <span className="px-2 bg-app-bg rounded-xl">
              {friendToRemove.name}
            </span>
            <span> as a friend?</span>
          </div>

          <div className="mt-3 text-center">
            <span>
              You will lose access to their task status unless they accept you
              as friend again. This action can not be undone.
            </span>
          </div>
          <div className="flex justify-center items-center align-middle space-x-8">
            <button
              onClick={() => handleConfirmDelete()}
              className="mt-8 p-2 text-center  rounded-xl font-bold bg-red-800 w-fit btn-hover"
            >
              Remove
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRemoveFriendModal;
