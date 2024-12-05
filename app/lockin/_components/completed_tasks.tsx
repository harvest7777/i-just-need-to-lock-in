// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface CompletedTasksProps {
  dailyTasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ dailyTasks }) => {
  return (
    <div className="flex flex-col items-center w-1/3">
      <h1 className="font-bold text-center text-2xl">Completed</h1>
      {dailyTasks?.map((task) =>
        task.is_complete ? (
          <div className="flex space-x-2" key={task.task_id}>
            <p className="w-44">{task.name}</p>
            <p>{task.minutes_spent}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default CompletedTasks;
