// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface IncompleteTasksProps {
  dailyTasks: Task[];
  lockIntoTask: (task: Task) => void;
}

const IncompleteTasks : React.FC<IncompleteTasksProps> = ({ dailyTasks, lockIntoTask }) => {
  return (
    <div className="flex flex-col items-center w-full">
        <h1 className="font-bold text-center text-2xl">Remaining</h1>
            {dailyTasks?.map((task) => 
            // Task container
            !task.is_complete && (
            <div className="my-2 flex space-x-2 w-full" key={task.task_id}>
                <p className="w-2/3 bg-orange-200 text-left">{task.name}</p> 
                <button className="w-1/3 bg-yellow-100" onClick={() => lockIntoTask(task)}>Focus</button>
                <p className="w-1/3 bg-slate-300">{task.seconds_spent}</p>
            </div>                   
            )
            )}
    </div>
  );
};

export default IncompleteTasks;
