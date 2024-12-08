// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface CompletedTasksProps {
  dailyTasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ dailyTasks }) => {
  const totalSeconds = dailyTasks
    .reduce((sum, task) => sum + task.seconds_spent, 0) || 0;

  const totalMinutes = Math.floor(totalSeconds / 60); // Total minutes
  const hours = Math.floor(totalMinutes / 60); // Total hours
  const minutes = totalMinutes % 60; // Remaining minutes

  const timeDisplay =
    hours > 0
      ? `${hours} hr${hours > 1 ? "s" : ""}: ${minutes} min`
      : `${minutes} min`;

  return (
    <div className="flex flex-col items-center w-full p-2">
      <h1 className="text-center text-2xl">Finished Sessions</h1>
      {dailyTasks?.map((task) =>
        task.is_complete ? (
          <div className="flex space-x-2 w-full my-1" key={task.task_id}>
            <p className="pl-2 w-2/3 bg-emerald-400 rounded-md">{task.name}</p>
            <p className="w-1/3 bg-neutral-200 rounded-md text-center">{Math.round(task.seconds_spent/60)}m</p>
          </div>
        ) : null
      )}
      <p className="mt-4 text-lg font-medium">Total: {timeDisplay}</p>
      <p className="text-lg font-medium">Good job! ^.^</p>
    </div>
  );
};

export default CompletedTasks;
