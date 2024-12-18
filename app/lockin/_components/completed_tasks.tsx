// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface CompletedTasksProps {
  dailyTasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ dailyTasks }) => {

  return (
    <div className="flex flex-col items-center w-full p-2">
      {dailyTasks?.map((task) =>
        task.is_complete ? (
          <div className="flex w-full my-1" key={task.task_id}>
            <p className="italic pl-2 w-2/3 bg-neutral-200 line-through text-neutral-400 rounded-l-md rounded-bl-md">{task.name}</p>
            <p className="w-1/3 italic bg-neutral-200 text-neutral-400 rounded-r-md rounded-tr-md text-center">{Math.round(task.seconds_spent/60)}m</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default CompletedTasks;
