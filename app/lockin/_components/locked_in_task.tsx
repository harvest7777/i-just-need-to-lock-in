import React from "react";
import { Task } from "../_services/TaskSchema";

interface LockedInTaskProps {
  focusedTask: Task;
  startedFocusedTask: boolean;
  handleStartTask: (taskId: number) => void;
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
    <div className="w-full bg-green-50">
      <div className="w-full flex flex-row justify-center">
        <h1 className="font-semibold text-center text-2xl bg-purple-200 whitespace-nowrap">{focusedTask?.name}</h1>
      </div>
      {/* Button container */}
      <div className="flex flex-col space-y-2">
        {!startedFocusedTask ? (
          <button
            onClick={() => handleStartTask(focusedTask.task_id)}
            className="bg-green-500 text-white p-2 outline outline-green-900"
          >
            START
          </button>
        ) : (
          <button
            onClick={() => handlePauseTask(focusedTask.task_id)}
            className="bg-yellow-500 outline outline-yellow-800 text-white p-2"
          >
            PAUSE
          </button>
        )}
        <button
          onClick={() => handleCompleteTask(focusedTask.task_id)}
          className="bg-red-500 text-white p-2 outline outline-red-900"
        >
          COMPLETE
        </button>
      </div>
    </div>
  );
};

export default LockedInTask;
