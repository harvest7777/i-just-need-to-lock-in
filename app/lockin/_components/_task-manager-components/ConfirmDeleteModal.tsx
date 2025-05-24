"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ConfirmDeleteModalProps {
  taskToDelete: Task | null;
  setTaskToDelete: Dispatch<SetStateAction<Task | null>>;
  handleDeleteTask: (task: Task) => void;
}
const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  taskToDelete,
  setTaskToDelete,
  handleDeleteTask,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setTaskToDelete(null);
    }
  };

  useEffect(() => {
    if (taskToDelete) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [taskToDelete]);

  const handleConfirmDelete = () => {
    if (taskToDelete == null) return;
    handleDeleteTask(taskToDelete);
    setTaskToDelete(null);
  };

  if (!taskToDelete) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Confirm Task Deletion
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <span>Are you sure you want to delete </span>
            <span className="px-2 bg-app-bg rounded-xl">
              {taskToDelete.name}
            </span>
            <span>?</span>
          </div>

          <div className="mt-3 text-center">
            <span>
              You will lose all data associated with this task. This action can
              not be undone.
            </span>
          </div>
          <button
            onClick={() => handleConfirmDelete()}
            className="mt-8 p-2 text-center text-app-text rounded-xl font-bold bg-red-800 w-fit btn-hover"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
