// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface CompletedTasksProps {
  dailyTasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ dailyTasks }) => {
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
    </div>
  );
};

export default CompletedTasks;
