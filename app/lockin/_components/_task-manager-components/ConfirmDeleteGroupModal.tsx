"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDeleteModalProps {
  groupToDelete: Group | null;
  setGroupToDelete: Dispatch<SetStateAction<Group | null>>;
  handleDeleteGroup: (group: Group) => void;
}
const ConfirmDeleteGroupModal: React.FC<ConfirmDeleteModalProps> = ({
  groupToDelete,
  setGroupToDelete,
  handleDeleteGroup,
}) => {
  const [open, setOpen] = useState(false);
  const handleConfirmDelete = () => {
    if (groupToDelete == null) return;
    handleDeleteGroup(groupToDelete);
    setGroupToDelete(null);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setGroupToDelete(null);
    }
  };

  useEffect(() => {
    if (groupToDelete) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [groupToDelete]);

  if (!groupToDelete) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Confirm Group Deletion
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <div>
            <span>Are you sure you want to delete the group </span>
            <span className="px-2 bg-app-bg rounded-xl">
              {groupToDelete.name}
            </span>
            <span>?</span>
          </div>

          <div className="mt-3 text-center">
            <span>All tasks associated with this group will be moved out.</span>
          </div>

          <div className="flex justify-center items-center align-middle space-x-8">
            <button
              onClick={() => handleConfirmDelete()}
              className="mt-8 p-2 text-center text-app-text rounded-xl font-bold bg-red-800 w-fit btn-hover"
            >
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteGroupModal;
