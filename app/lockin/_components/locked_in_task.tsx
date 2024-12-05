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
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">CURRENT LOCKED IN TASK:</h1>
      <h1 className="text-xl font-semibold">{focusedTask?.name}</h1>
      {!startedFocusedTask ? (
        <button
          onClick={() => handleStartTask(focusedTask.task_id)}
          className="bg-green-500 text-white p-2 rounded"
        >
          START
        </button>
      ) : (
        <button
          onClick={() => handlePauseTask(focusedTask.task_id)}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          PAUSE
        </button>
      )}
      <button
        onClick={() => handleCompleteTask(focusedTask.task_id)}
        className="bg-red-500 text-white p-2 rounded"
      >
        COMPLETE
      </button>
    </div>
  );
};

export default LockedInTask;
