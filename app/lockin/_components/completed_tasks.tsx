// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface CompletedTasksProps {
  dailyTasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ dailyTasks }) => {

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
    </div>
  );
};

export default CompletedTasks;
