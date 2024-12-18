import React from "react";
import { Task } from "../_services/TaskSchema";

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
    <div className="w-full flex md:flex-row flex-col justify-center align-middle items-center space-y-2 space-x-5">
      <h1 className="font-semibold text-center text-2xl">{focusedTask?.name}</h1>
      {/* Button container */}
        {!startedFocusedTask ? (
          <button
            onClick={() => handleStartTask(focusedTask)}
            className="bg-emerald-400 text-white font-bold p-2 outline rounded-lg outline-green-900"
          >
            START
          </button>
        ) : (
          <button
            onClick={() => handlePauseTask(focusedTask.task_id)}
            className="bg-yellow-400 outline rounded-lg font-bold outline-yellow-800 text-white p-2"
          >
            PAUSE
          </button>
        )}
        <button
          onClick={() => handleCompleteTask(focusedTask.task_id)}
          className="bg-red-500 text-white font-bold rounded-lg p-2 outline outline-red-900"
        >
          FINISH
        </button>
    </div>
  );
};

export default LockedInTask;
