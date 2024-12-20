import React from "react";
import { Task } from "../_services/TaskSchema";
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";

interface LockedInTaskProps {
  focusedTask: Task;
  startedFocusedTask: boolean;
  handleStartTask: (task: Task) => void;
  handlePauseTask: (taskId: number) => void;
  handleCompleteTask: (taskId: number) => void;
}

const LockedInTask: React.FC<LockedInTaskProps> = ({
  focusedTask,
  startedFocusedTask,
  handleStartTask,
  handlePauseTask,
  handleCompleteTask,
}) => {
  return (
    <div className="w-full flex items-center align-middle justify-center space-x-5">
      <h1 className="font-semibold text-2xl ">{focusedTask?.name}</h1>
      {/* Button container */}
        {!startedFocusedTask ? (
          <CiPlay1 className="text-4xl btn-hover" onClick={()=>handleStartTask(focusedTask)}/>
        ) : (
          <CiPause1 className="text-4xl btn-hover" onClick={()=>handlePauseTask(focusedTask.task_id)}/>
        )}
        <IoCheckmarkOutline className="text-4xl btn-hover" onClick={()=>handleCompleteTask(focusedTask.task_id)}/>
    </div>
  );
};

export default LockedInTask;
