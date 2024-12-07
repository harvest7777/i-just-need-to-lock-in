// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface CompletedTasksProps {
  dailyTasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ dailyTasks }) => {
  const totalSeconds = dailyTasks
    ?.filter((task) => task.is_complete)
    .reduce((sum, task) => sum + task.seconds_spent, 0) || 0;

  const totalMinutes = Math.floor(totalSeconds / 60); // Total minutes
  const hours = Math.floor(totalMinutes / 60); // Total hours
  const minutes = totalMinutes % 60; // Remaining minutes

  const timeDisplay =
    hours > 0
      ? `${hours} hr${hours > 1 ? "s" : ""}: ${minutes} min`
      : `${minutes} min`;

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bold text-center text-2xl">Completed</h1>
      {dailyTasks?.map((task) =>
        task.is_complete ? (
          <div className="flex space-x-2 w-full" key={task.task_id}>
            <p className="w-3/4 bg-green-300">{task.name}</p>
            <p className="w-1/4 bg-orange-200">{task.seconds_spent}</p>
          </div>
        ) : null
      )}
      <p className="mt-4 text-lg font-medium">Total: {timeDisplay}</p>
      <p className="mt-4 text-lg font-medium">Good job! ^.^</p>
    </div>
  );
};

export default CompletedTasks;
