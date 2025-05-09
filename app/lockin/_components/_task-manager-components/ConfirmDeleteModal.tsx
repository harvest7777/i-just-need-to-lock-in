"use client";

import { Dispatch, SetStateAction } from "react";

interface ConfirmDeleteModalProps {
  taskToDelete: Task | null;
  setTaskToDelete: Dispatch<SetStateAction<Task | null>>;
  handleDeleteTask: (task: Task) => void;
}
const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ taskToDelete, setTaskToDelete, handleDeleteTask }) => {
  const handleConfirmDelete = () => {
    if (taskToDelete == null) return;
    handleDeleteTask(taskToDelete);
    setTaskToDelete(null);
  }
  const handleCancel = () => {
    setTaskToDelete(null);
  }
  return (
    (taskToDelete) &&
    <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Modal Content */}
      <div className="relative md:w-3/5 w-11/12 bg-app-fg p-3 rounded-xl h-fit md:mt-28 text-xl flex flex-col justify-center items-center">
        <div className="mt-3">
          <span>Are you sure you want to delete </span>
          <span className="px-2 bg-app-bg rounded-xl">{taskToDelete.name}</span>
          <span>?</span>
        </div>

        <div className="mt-3 text-center">
          <span>You will lose all data associated with this task. This action can not be undone.</span>
        </div>
        <div className="flex justify-center items-center align-middle space-x-8">
          <p onClick={() => handleConfirmDelete()} className="mt-3 p-2 text-center text-app-text rounded-xl font-bold bg-red-800 w-fit btn-hover">Delete</p>
          <p onClick={() => handleCancel()} className="mt-3 p-2 text-center text-app-text rounded-xl font-bold bg-app-bg w-fit btn-hover">Cancel</p>
        </div>
      </div>
    </div>

  );
}

export default ConfirmDeleteModal;
