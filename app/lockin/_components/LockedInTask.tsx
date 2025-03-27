import React from "react";

import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";

interface LockedInTaskProps {
  focusedTask: Task;
  startedFocusedTask: boolean;
  handleStartTask: (task: Task) => void;
  handlePauseTask: (task: Task) => void;
  handleCompleteTask: (task: Task) => void;
}

const LockedInTask: React.FC<LockedInTaskProps> = ({
  focusedTask,
  startedFocusedTask,
  handleStartTask,
  handlePauseTask,
  handleCompleteTask,
}) => {
  return (
    <div className="w-full flex items-center align-middle justify-center space-x-5 p-4 rounded-xl outline-2 outline-app-bg">
      {/* Button container */}
      <h1 className="font-semibold md:text-2xl text-xl text-center"> {startedFocusedTask ? "🔒" : "🔓"} {focusedTask?.name}</h1>
      {!startedFocusedTask ? (
        <CiPlay1 className="text-4xl btn-hover flex-none" onClick={() => handleStartTask(focusedTask)} />
      ) : (
        <CiPause1 className="text-4xl btn-hover flex-none" onClick={() => handlePauseTask(focusedTask)} />
      )}
      <IoCheckmarkOutline className="text-4xl btn-hover flex-none" onClick={() => handleCompleteTask(focusedTask)} />
    </div>
  );
};

export default LockedInTask;
